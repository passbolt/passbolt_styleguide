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
import canSuggestUrl from "./canSuggestUrl";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import { withRbac } from "../../../shared/context/Rbac/RbacContext";
import { uiActions } from "../../../shared/services/rbacs/uiActionEnumeration";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { filterResourcesBySearch } from "../../../shared/utils/filterUtils";
import { withResourcesLocalStorage } from "../../contexts/ResourceLocalStorageContext";
import memoize from "memoize-one";
import {
  withResourceTypesLocalStorage
} from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";

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
      usingOnThisTab: false
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
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleUseOnThisTabClick = this.handleUseOnThisTabClick.bind(this);
  }

  /**
   * Loads the currently active tab URL, if any, into the state.
   * @returns {Promise<void>}
   */
  async loadActiveTabUrl() {
    try {
      const activeTabUrl = await this.props.context.port.request("passbolt.active-tab.get-url", this.props.context.getOpenerTabId());
      this.setState({ activeTabUrl });
    } catch (error) {
      console.error(error);
    }
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
      if (resource.metadata?.uris?.[0] && this.isPasswordResource(resource.resource_type_id) && canSuggestUrl(activeTabUrl, resource.metadata.uris[0])) {
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
      await this.props.context.port.request('passbolt.quickaccess.use-resource-on-current-tab', resource.id, this.props.context.getOpenerTabId());
      window.close();
    } catch (error) {
      if (error && error.name === "UserAbortsOperationError") {
        this.setState({ usingOnThisTab: false });
      } else {
        console.error('An error occured', error);
        this.setState({
          usingOnThisTab: false,
          useOnThisTabError: this.props.t("Unable to use the password on this page. Copy and paste the information instead.")
        });
      }
    }
  }

  /**
   * Is password resource
   * @returns {boolean}
   */
  isPasswordResource(resourceId) {
    return this.props.resourceTypes?.getFirstById(resourceId)?.hasPassword();
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
   * Component renderer.
   * @returns {JSX}
   */
  render() {
    const isReady = this.props.resources !== null && this.props.resourceTypes != null;
    const hasSearch = this.props.context.search?.length > 0;
    const showSuggestedSection = !hasSearch;
    const showBrowsedResourcesSection = hasSearch;
    const showFiltersSection = !hasSearch;
    const canUseTag = this.props.context.siteSettings.canIUse('tags') && this.props.rbacContext.canIUseUiAction(uiActions.TAGS_USE);
    let browsedResources, suggestedResources;

    if (isReady) {
      browsedResources = this.filterSearchedResources(this.props.resources, this.props.context.search);
      suggestedResources = this.filterSuggestedResources(this.props.resources, this.state.activeTabUrl);
    }

    return (
      <div className="index-list">
        <div className="list-container">
          {showSuggestedSection &&
            <div className={`list-section`}>
              <div className="list-title">
                <h2><Trans>Suggested</Trans></h2>
              </div>
              <ul className="list-items">
                {!isReady &&
                  <li className="empty-entry">
                    <Icon name="spinner" />
                    <p className="processing-text"><Trans>Retrieving your passwords</Trans></p>
                  </li>
                }
                {(isReady && suggestedResources.length === 0) &&
                  <li className="empty-entry">
                    <p><Trans>No passwords found for the current page. You can use the search.</Trans></p>
                  </li>
                }
                {(isReady && suggestedResources.length > 0) &&
                  suggestedResources.map(resource => (
                    <li className="suggested-resource-entry" key={resource.id}>
                      <button type="button" className="resource-details link" onClick={() => this.handleUseOnThisTabClick(resource)}>
                        <div className="inline-resource-name">
                          <span className="title">{resource.metadata.name}</span>
                          <span className="username"> {resource.metadata.username ? `(${resource.metadata.username})` : ""}</span>
                        </div>
                        <span className="url">{resource.metadata.uris?.[0]}</span>
                      </button>
                      <Link className="chevron-right-wrapper" to={`/webAccessibleResources/quickaccess/resources/view/${resource.id}`}>
                        <Icon name="chevron-right" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          }
          {showBrowsedResourcesSection &&
            <div className="list-section">
              <div className="list-title">
                <h2><Trans>Browse</Trans></h2>
              </div>
              <ul className="list-items">
                <React.Fragment>
                  {!isReady &&
                    <li className="empty-entry">
                      <Icon name="spinner" />
                      <p className="processing-text"><Trans>Retrieving your passwords</Trans></p>
                    </li>
                  }
                  {(isReady && browsedResources.length === 0) &&
                    <li className="empty-entry">
                      <p><Trans>No result match your search. Try with another search term.</Trans></p>
                    </li>
                  }
                  {(isReady && browsedResources.length > 0) &&
                    browsedResources.map(resource => (
                      <li className="browse-resource-entry" key={resource.id}>
                        <Link to={`/webAccessibleResources/quickaccess/resources/view/${resource.id}`}>
                          <div className="inline-resource-entry">
                            <div className='inline-resource-name'>
                              <span className="title">{resource.metadata.name}</span>
                              <span className="username"> {resource.metadata.username ? `(${resource.metadata.username})` : ""}</span>
                            </div>
                            <span className="url">{resource.metadata.uris?.[0]}</span>
                          </div>
                          <Icon name="chevron-right" />
                        </Link>
                      </li>
                    ))}
                </React.Fragment>
              </ul>
            </div>
          }
          {showFiltersSection &&
            <div className="list-section">
              <div className="list-title">
                <h2><Trans>Browse</Trans></h2>
              </div>
              <ul className="list-items">
                <li className="filter-entry">
                  <Link to={"/webAccessibleResources/quickaccess/resources/shared-with-me"}>
                    <Icon name="share" />
                    <span className="filter-title"><Trans>Shared with me</Trans></span>
                    <Icon name="chevron-right" />
                  </Link>
                </li>
              </ul>
            </div>
          }
          {
            <div className="submit-wrapper button-after-list input">
              {this.state.useOnThisTabError &&
                <div className="error-message">{this.state.useOnThisTabError}</div>
              }
            </div>
          }
        </div>
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
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withRouter(withResourceTypesLocalStorage(withResourcesLocalStorage(withMetadataTypesSettingsLocalStorage(withTranslation('common')(HomePage)))))));
