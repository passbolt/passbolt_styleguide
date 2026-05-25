/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import { withRbac } from "../../../shared/context/Rbac/RbacContext";
import { uiActions } from "../../../shared/services/rbacs/uiActionEnumeration";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { filterResourcesBySearch } from "../../../shared/utils/filterUtils";
import { withResourcesLocalStorage } from "../../contexts/ResourceLocalStorageContext";
import memoize from "memoize-one";
import { withResourceTypesLocalStorage } from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { withMetadataTypesSettingsLocalStorage } from "../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import DisplayResourceUrisBadge from "../../../react-extension/components/Resource/DisplayResourceUrisBadge/DisplayResourceUrisBadge";
import CanSuggestService from "../../../shared/services/canSuggestService/canSuggestService";
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import GoSVG from "../../../img/svg/go.svg";
import sanitizeUrl, { urlProtocols } from "../../../react-extension/lib/Sanitize/sanitizeUrl";
import { resourceLinkAuthorizedProtocols } from "../../../react-extension/contexts/ResourceWorkspaceContext";
import FilterSVG from "../../../img/svg/filter.svg";
import UsersSVG from "../../../img/svg/users.svg";
import TagV2SVG from "../../../img/svg/tag_v2.svg";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { withMetadataKeysSettingsLocalStorage } from "../../../shared/context/MetadataKeysSettingsLocalStorageContext/MetadataKeysSettingsLocalStorageContext";

const SUGGESTED_RESOURCES_LIMIT = 20;
const BROWSED_RESOURCES_LIMIT = 100;

class HomePage extends React.Component {
  /**
   * Should be true after the first HomePage mount
   * @type {boolean}
   * @private
   */
  static isInitialised = false;

  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  /**
   * Returns the component default state
   * @return {object}
   */
  get defaultState() {
    return {
      activeTabUrl: null,
      usingOnThisTab: false,
      autofillOnLaunch: false, // Whether clicking the launch action should navigate then autofill.
      launchingResource: false, // True while a launch-with-autofill request is in progress.
    };
  }

  /**
   * ComponentDidMount hook.
   * Invoked immediately after component is inserted into the tree
   */
  componentDidMount() {
    /*
     * Given the specific nature of QuickA's usage—focused on quickly consuming and creating passwords rather
     * than ongoing resource management — The local storage should be updated only the first time the application
     * is open.
     */
    if (!HomePage.isInitialised) {
      this.props.resourcesLocalStorageContext.updateLocalStorage();
      HomePage.isInitialised = true;
    }

    // Reset the search and any search history.
    this.props.context.searchHistory = [];
    this.props.context.updateSearch("");
    this.props.context.focusSearch();

    this.loadActiveTabUrl();
    this.loadAutofillSettings();

    // Enable arrow-key navigation through the suggested/browse/filter list.
    document.addEventListener("keydown", this.handleListKeyDown);
  }

  /**
   * ComponentWillUnmount hook. Remove the keyboard navigation listener.
   */
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleListKeyDown);
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleUseOnThisTabClick = this.handleUseOnThisTabClick.bind(this);
    this.handleLaunchResourceClick = this.handleLaunchResourceClick.bind(this);
    this.handleOpenResourceClick = this.handleOpenResourceClick.bind(this);
    this.handleListKeyDown = this.handleListKeyDown.bind(this);
  }

  /**
   * Loads the autofill on launch settings into the state.
   * Falls back to autofill disabled (the plain open-in-new-tab behaviour) on error.
   * @returns {Promise<void>}
   */
  async loadAutofillSettings() {
    try {
      const settings = await this.props.context.port.request("passbolt.autofill-settings.get");
      this.setState({ autofillOnLaunch: Boolean(settings?.autofillOnLaunch) });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Handles the click on a search-result row's launch action when autofill on launch is enabled.
   * Asks the background to navigate to the resource URI and autofill the login form (never submits),
   * then closes the quickaccess window.
   *
   * The background work (navigate, wait for the page, passphrase prompt, decrypt, fill) runs in the
   * service worker independently of this popup, and the passphrase prompt opens its own quickaccess
   * window. We therefore dispatch the request and close immediately rather than awaiting the full
   * chain, awaiting would keep this popup open until navigation steals focus and tears it down,
   * leaving the awaited response unresolved.
   * @param {Event} event
   * @param {Object} resource
   * @returns {void}
   */
  handleLaunchResourceClick(event, resource) {
    event.preventDefault();
    if (this.state.launchingResource) {
      return;
    }
    this.setState({ launchingResource: true });
    // Fire-and-forget: do not await; the controller continues in the background after the popup closes.
    this.props.context.port
      .request("passbolt.quickaccess.launch-resource", resource.id, this.props.context.getOpenerTabId())
      .catch((error) => console.error(error));
    this.props.context.closeWindow();
  }

  /**
   * Handles the click on a search-result row's launch action when autofill on launch is disabled.
   * Opens the resource URI in a tab without decrypting or autofilling any secret. The background
   * reuses the opener tab when it is blank (e.g. an incognito new-tab page), otherwise opens a new
   * tab, matching the autofill-enabled behaviour. The popup is closed immediately.
   * @param {Event} event
   * @param {Object} resource
   * @returns {void}
   */
  handleOpenResourceClick(event, resource) {
    event.preventDefault();
    const uri = resource.metadata?.uris?.[0];
    if (!uri) {
      return;
    }
    // Fire-and-forget: do not await; navigation continues in the background after the popup closes.
    this.props.context.port
      .request("passbolt.quickaccess.open-resource-uri", uri, this.props.context.getOpenerTabId())
      .catch((error) => console.error(error));
    this.props.context.closeWindow();
  }

  /**
   * Loads the currently active tab URL, if any, into the state.
   * @returns {Promise<void>}
   */
  async loadActiveTabUrl() {
    try {
      const activeTabUrl = await this.props.context.port.request(
        "passbolt.active-tab.get-url",
        this.props.context.getOpenerTabId(),
      );
      this.setState({ activeTabUrl });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Arrow-key navigation through the result list (suggested, browse, and filter entries).
   * ArrowDown/ArrowUp move focus between the primary control of each row; ArrowUp from the first
   * row returns focus to the search field. Enter activates the focused control natively, and Tab
   * still reaches per-row actions (e.g. the launch button).
   * @param {KeyboardEvent} event
   */
  handleListKeyDown(event) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }
    const items = Array.from(
      document.querySelectorAll(
        ".index-list li.suggested-resource-entry > button, " +
          ".index-list li.browse-resource-entry > a:not(.launch-resource-button), " +
          ".index-list li.filter-entry > a",
      ),
    );
    if (items.length === 0) {
      return;
    }
    const currentIndex = items.indexOf(document.activeElement);
    if (event.key === "ArrowDown") {
      const next = currentIndex === -1 ? items[0] : items[Math.min(currentIndex + 1, items.length - 1)];
      this.focusListItem(next);
      event.preventDefault();
    } else if (currentIndex > 0) {
      this.focusListItem(items[currentIndex - 1]);
      event.preventDefault();
    } else if (currentIndex === 0) {
      const searchInput = document.querySelector("input[name='search']");
      if (searchInput) {
        searchInput.focus();
        event.preventDefault();
      }
    }
  }

  /**
   * Focus a result-list item and scroll it into view.
   * @param {HTMLElement} item
   */
  focusListItem(item) {
    if (!item) {
      return;
    }
    item.focus();
    item.scrollIntoView?.({ block: "nearest" });
  }

  /**
   * Get the resources for the suggested section.
   * @param {Array} resources The list of resources to filter.
   * @param {string} activeTabUrl the active tab url
   * @return {Array<Object>} The list of filtered resources.
   */
  filterSuggestedResources = memoize((resources, activeTabUrl) => {
    if (!activeTabUrl) {
      return [];
    }

    const suggestedResources = [];

    for (const i in resources) {
      const resource = resources[i];
      if (CanSuggestService.canSuggestUris(activeTabUrl, resource.metadata.uris)) {
        suggestedResources.push(resource);
        if (suggestedResources.length === SUGGESTED_RESOURCES_LIMIT) {
          break;
        }
      }
    }

    // Sort the resources by uri lengths, the greater on top.
    return suggestedResources.sort((a, b) => {
      const aUrisLength = a.metadata.uris[0].length || 0;
      const bUrisLength = b.metadata.uris[0].length || 0;
      return bUrisLength - aUrisLength;
    });
  });

  /**
   * Get the resources for the browse section.
   * @param {array} resources The list of resources to filter.
   * @param {string} search the current search to apply
   * @returns {Array<Object>} The list of resources.
   */
  filterSearchedResources = memoize((resources, search) => {
    if (search && resources) {
      return filterResourcesBySearch(resources, search, BROWSED_RESOURCES_LIMIT);
    }
    return [];
  });

  /**
   * Handles the click event of the button "Use on this tab".
   * @returns {Promise<void>}
   */
  async handleUseOnThisTabClick(resource) {
    this.setState({ usingOnThisTab: true });
    try {
      await this.props.context.port.request(
        "passbolt.quickaccess.use-resource-on-current-tab",
        resource.id,
        this.props.context.getOpenerTabId(),
      );
      await this.props.context.closeWindow();
    } catch (error) {
      if (error && error.name === "UserAbortsOperationError") {
        this.setState({ usingOnThisTab: false });
      } else {
        console.error("An error occured", error);
        this.setState({
          usingOnThisTab: false,
          useOnThisTabError: this.props.t(
            "Unable to use the password on this page. Copy and paste the information instead.",
          ),
        });
      }
    }
  }

  /**
   * Handles the click on a search-result row's "open in a new tab" action.
   * Navigates a new browser tab to the resource's stored URI without decrypting
   * or autofilling any secret. The background controller sanitises the URI.
   * @param {Event} event
   * @param {Object} resource
   * @returns {Promise<void>}
   */
  sanitizeResourceUrl(url) {
    return sanitizeUrl(url, {
      whiteListedProtocols: resourceLinkAuthorizedProtocols,
      defaultProtocol: urlProtocols.HTTPS,
    });
  }

  /**
   * Is password resource
   * @param {string} resourceTypeId
   * @returns {boolean}
   */
  isPasswordResource(resourceTypeId) {
    return this.props.resourceTypes?.getFirstById(resourceTypeId)?.hasPassword();
  }

  /**
   * Is OTP resource
   * @param {string} resourceTypeId
   * @returns {boolean}
   */
  isOTPResource(resourceTypeId) {
    return this.props.resourceTypes?.getFirstById(resourceTypeId)?.hasTotp();
  }

  /**
   * Get resource filtered by resource type to have only resource with password and totp
   * @return {Array}
   */
  get resourcesFilterByResourceTypePasswordAndTotp() {
    const keepOnlyResourcesPasswordAndTotp = (resource) =>
      this.isPasswordResource(resource.resource_type_id) || this.isOTPResource(resource.resource_type_id);
    return this.props.resources.filter(keepOnlyResourcesPasswordAndTotp);
  }

  /**
   * Has metadata types settings
   * @returns {boolean}
   */
  hasMetadataTypesSettings() {
    return Boolean(this.props.metadataTypeSettings);
  }

  /**
   * Can create password
   * @returns {boolean}
   */
  canCreatePassword() {
    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      return this.props.resourceTypes?.hasOneWithSlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    } else {
      return false;
    }
  }

  /**
   * User has missing keys
   * @return {boolean}
   */
  get userHasMissingKeys() {
    return this.props.context.loggedInUser.missing_metadata_key_ids?.length > 0;
  }

  /**
   * Should display action aborted missing metadata keys
   * @return {boolean}
   */
  get shouldDisplayActionAbortedMissingMetadataKeys() {
    return (
      this.props.metadataTypeSettings.isDefaultResourceTypeV5 &&
      this.userHasMissingKeys &&
      !this.props.metadataKeysSettings?.allowUsageOfPersonalKeys
    );
  }

  /**
   * Component renderer.
   * @returns {JSX}
   */
  render() {
    const isReady = this.props.resources !== null && this.props.resourceTypes != null;
    const hasSearch = this.props.context.search?.length > 0;
    const showSuggestedSection = !hasSearch;
    const showBrowsedResourcesSection = hasSearch;
    const showFiltersSection = !hasSearch;
    const canUseTag =
      this.props.context.siteSettings.canIUse("tags") && this.props.rbacContext.canIUseAction(uiActions.TAGS_USE);
    let browsedResources, suggestedResources;

    if (isReady) {
      const resources = this.resourcesFilterByResourceTypePasswordAndTotp;
      browsedResources = this.filterSearchedResources(resources, this.props.context.search);
      suggestedResources = this.filterSuggestedResources(resources, this.state.activeTabUrl);
    }

    return (
      <div className="index-list">
        <div className="list-container">
          {showSuggestedSection && (
            <div className={`list-section`}>
              <div className="list-title">
                <h2>
                  <Trans>Suggested</Trans>
                </h2>
              </div>
              <ul className="list-items">
                {!isReady && (
                  <li className="empty-entry">
                    <SpinnerSVG />
                    <p className="processing-text">
                      <Trans>Retrieving your passwords</Trans>
                    </p>
                  </li>
                )}
                {isReady && suggestedResources.length === 0 && (
                  <li className="empty-entry">
                    <p>
                      <Trans>No passwords found for the current page. You can use the search.</Trans>
                    </p>
                  </li>
                )}
                {isReady &&
                  suggestedResources.length > 0 &&
                  suggestedResources.map((resource) => (
                    <li className="suggested-resource-entry" key={resource.id}>
                      <button
                        type="button"
                        className="resource-details link"
                        onClick={() => this.handleUseOnThisTabClick(resource)}
                      >
                        <div className="inline-resource-name">
                          <span className="title">{resource.metadata.name}</span>
                          <span className="username">
                            {" "}
                            {resource.metadata.username ? `(${resource.metadata.username})` : ""}
                          </span>
                        </div>
                        <div className="uris">
                          <span className="url">{resource.metadata.uris?.[0]}</span>
                          {resource.metadata.uris?.length > 1 && (
                            <DisplayResourceUrisBadge additionalUris={resource.metadata.uris?.slice(1)} />
                          )}
                        </div>
                      </button>
                      <Link
                        className="chevron-right-wrapper"
                        to={`/webAccessibleResources/quickaccess/resources/view/${resource.id}`}
                      >
                        <CaretRightSVG />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {showBrowsedResourcesSection && (
            <div className="list-section">
              <div className="list-title">
                <h2>
                  <Trans>Browse</Trans>
                </h2>
              </div>
              <ul className="list-items">
                <React.Fragment>
                  {!isReady && (
                    <li className="empty-entry">
                      <SpinnerSVG />
                      <p className="processing-text">
                        <Trans>Retrieving your passwords</Trans>
                      </p>
                    </li>
                  )}
                  {isReady && browsedResources.length === 0 && (
                    <li className="empty-entry">
                      <p>
                        <Trans>No result match your search. Try with another search term.</Trans>
                      </p>
                    </li>
                  )}
                  {isReady &&
                    browsedResources.length > 0 &&
                    browsedResources.map((resource) => (
                      <li className="browse-resource-entry" key={resource.id}>
                        <Link to={`/webAccessibleResources/quickaccess/resources/view/${resource.id}`}>
                          <div className="inline-resource-entry">
                            <div className="inline-resource-name">
                              <span className="title">{resource.metadata.name}</span>
                              <span className="username">
                                {" "}
                                {resource.metadata.username ? `(${resource.metadata.username})` : ""}
                              </span>
                            </div>
                            <div className="uris">
                              <span className="url">{resource.metadata.uris?.[0]}</span>
                              {resource.metadata.uris?.length > 1 && (
                                <DisplayResourceUrisBadge additionalUris={resource.metadata.uris?.slice(1)} />
                              )}
                            </div>
                          </div>
                          <CaretRightSVG />
                        </Link>
                        {this.sanitizeResourceUrl(resource.metadata.uris?.[0]) &&
                          (this.state.autofillOnLaunch ? (
                            <button
                              type="button"
                              className="launch-resource-button"
                              disabled={this.state.launchingResource}
                              onClick={(event) => this.handleLaunchResourceClick(event, resource)}
                              title={this.props.t("Open and autofill")}
                            >
                              <GoSVG />
                              <span className="visually-hidden">
                                <Trans>Open and autofill</Trans>
                              </span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="launch-resource-button"
                              onClick={(event) => this.handleOpenResourceClick(event, resource)}
                              title={this.props.t("Open in a new tab")}
                            >
                              <GoSVG />
                              <span className="visually-hidden">
                                <Trans>Open in a new tab</Trans>
                              </span>
                            </button>
                          ))}
                      </li>
                    ))}
                </React.Fragment>
              </ul>
            </div>
          )}
          {showFiltersSection && (
            <div className="list-section">
              <div className="list-title">
                <h2>
                  <Trans>Browse</Trans>
                </h2>
              </div>
              <ul className="list-items">
                <li className="filter-entry">
                  <Link to={"/webAccessibleResources/quickaccess/more-filters"}>
                    <FilterSVG />
                    <span className="filter-title">
                      <Trans>Filters</Trans>
                    </span>
                    <CaretRightSVG />
                  </Link>
                </li>
                <li className="filter-entry">
                  <Link to={"/webAccessibleResources/quickaccess/resources/group"}>
                    <UsersSVG />
                    <span className="filter-title">
                      <Trans>Groups</Trans>
                    </span>
                    <CaretRightSVG />
                  </Link>
                </li>
                {canUseTag && (
                  <li className="filter-entry">
                    <Link to={"/webAccessibleResources/quickaccess/resources/tag"}>
                      <TagV2SVG />
                      <span className="filter-title">
                        <Trans>Tags</Trans>
                      </span>
                      <CaretRightSVG />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        {this.hasMetadataTypesSettings() && this.canCreatePassword() && (
          <div className="submit-wrapper button-after-list input">
            <Link
              to={`/webAccessibleResources/quickaccess/resources/${this.shouldDisplayActionAbortedMissingMetadataKeys ? "action-aborted-missing-metadata-keys" : "create"}`}
              id="popupAction"
              className="button primary big full-width"
              role="button"
            >
              <Trans>Create new</Trans>
            </Link>
            {this.state.useOnThisTabError && <div className="error-message">{this.state.useOnThisTabError}</div>}
          </div>
        )}
      </div>
    );
  }
}

HomePage.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  resources: PropTypes.array, // The resources from the local storage
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  resourcesLocalStorageContext: PropTypes.object, // The resources local storage context
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  metadataKeysSettings: PropTypes.instanceOf(MetadataKeysSettingsEntity), // The metadata key settings
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withRbac(
    withRouter(
      withResourceTypesLocalStorage(
        withResourcesLocalStorage(
          withMetadataTypesSettingsLocalStorage(
            withMetadataKeysSettingsLocalStorage(withTranslation("common")(HomePage)),
          ),
        ),
      ),
    ),
  ),
);
