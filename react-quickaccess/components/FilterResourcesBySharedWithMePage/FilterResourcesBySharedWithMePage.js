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
 * @since         2.0.0
 */

import PropTypes from "prop-types";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { filterResourcesBySearch } from "../../../shared/utils/filterUtils";
import { withResourcesLocalStorage } from "../../contexts/ResourceLocalStorageContext";
import memoize from "memoize-one";
import { withResourceTypesLocalStorage } from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import { withMetadataTypesSettingsLocalStorage } from "../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import DisplayResourceUrisBadge from "../../../react-extension/components/Resource/DisplayResourceUrisBadge/DisplayResourceUrisBadge";
import CaretLeftSVG from "../../../img/svg/caret_left.svg";
import CloseSVG from "../../../img/svg/close.svg";
import { withMetadataKeysSettingsLocalStorage } from "../../../shared/context/MetadataKeysSettingsLocalStorageContext/MetadataKeysSettingsLocalStorageContext";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";

const BROWSED_RESOURCES_LIMIT = 100;

class FilterResourcesBySharedWithMePage extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  /**
   * ComponentDidMount hook.
   * Invoked immediately after component is inserted into the tree
   */
  componentDidMount() {
    this.props.context.focusSearch();
    if (this.props.context.searchHistory[this.props.location.pathname]) {
      this.props.context.updateSearch(this.props.context.searchHistory[this.props.location.pathname]);
    }
  }

  /**
   * Initializes event handlers
   */
  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleSelectResourceClick = this.handleSelectResourceClick.bind(this);
  }

  /**
   * Handles the click event on the "Go back" button.
   * @param {Event} ev
   */
  handleGoBackClick(ev) {
    ev.preventDefault();
    // Clean the search and remove the search history related to this page.
    this.props.context.updateSearch("");
    delete this.props.context.searchHistory[this.props.location.pathname];
    this.props.history.goBack();
  }

  /**
   * Handles the click event on a resource from the list.
   * @param {Event} ev
   * @param {string} resourceId
   */
  handleSelectResourceClick(ev, resourceId) {
    ev.preventDefault();
    /*
     * Add a search history for the current page.
     * It will allow the page to restore the search when the user will come back after clicking goBack (caveat, the workflow is not this one).
     * By instance when you select a resource you expect the page to be filtered as when you left it.
     */
    this.props.context.searchHistory[this.props.location.pathname] = this.props.context.search;
    this.props.context.updateSearch("");
    this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resourceId}`);
  }

  /**
   * Filters the given resources by 'shared with me'
   * @param {Array<Object>} resources
   * @returns {Array<Object>}
   */
  filterBySharedWithMe = memoize((resources) => resources.filter((resource) => resource.permission.type < 15));

  /**
   * Get the resources to display
   * @param {Array<Object>} resources the resource list to filter from
   * @param {string} search the keyword to search for in the list if any
   * @return {Array<Object>} The list of resources.
   */
  filterSearchedResources = memoize((resources, search) => {
    const resourcesSharedWithMe = this.filterBySharedWithMe(resources);
    return search
      ? filterResourcesBySearch(resourcesSharedWithMe, search, BROWSED_RESOURCES_LIMIT)
      : resourcesSharedWithMe;
  });

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
    const isReady = this.props.resources != null;
    const isSearching = this.props.context.search.length > 0;
    let browsedResources;

    if (isReady) {
      browsedResources = this.filterSearchedResources(this.props.resources, this.props.context.search);
    }

    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.props.t("Go back")}>
            <CaretLeftSVG />
            <span className="primary-action-title">
              <Trans>Shared with me</Trans>
            </span>
          </a>
          <Link
            to="/webAccessibleResources/quickaccess/home"
            className="secondary-action button-transparent button"
            title={this.props.t("Cancel")}
          >
            <CloseSVG className="close" />
            <span className="visually-hidden">
              <Trans>Cancel</Trans>
            </span>
          </Link>
        </div>
        <div className="list-container">
          <ul className="list-items">
            {!isReady && (
              <li className="empty-entry">
                <SpinnerSVG />
                <p className="processing-text">
                  <Trans>Retrieving your passwords</Trans>
                </p>
              </li>
            )}
            {isReady && (
              <React.Fragment>
                {!browsedResources.length && (
                  <li className="empty-entry">
                    <p>
                      {isSearching && <Trans>No result match your search. Try with another search term.</Trans>}
                      {!isSearching && (
                        <Trans>
                          No passwords are shared with you yet. It does feel a bit empty here, wait for a team member to
                          share a password with you.
                        </Trans>
                      )}
                    </p>
                  </li>
                )}
                {browsedResources.length > 0 &&
                  browsedResources.map((resource) => (
                    <li className="browse-resource-entry" key={resource.id}>
                      <a href="#" onClick={(ev) => this.handleSelectResourceClick(ev, resource.id)}>
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
                      </a>
                    </li>
                  ))}
              </React.Fragment>
            )}
          </ul>
        </div>
        {this.hasMetadataTypesSettings() && this.canCreatePassword() && (
          <div className="submit-wrapper">
            <Link
              to={`/webAccessibleResources/quickaccess/resources/${this.shouldDisplayActionAbortedMissingMetadataKeys ? "action-aborted-missing-metadata-keys" : "create"}`}
              id="popupAction"
              className="button primary big full-width"
              role="button"
            >
              <Trans>Create new</Trans>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

FilterResourcesBySharedWithMePage.propTypes = {
  context: PropTypes.any, // The application context
  resources: PropTypes.array, // the available resources
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  metadataKeysSettings: PropTypes.instanceOf(MetadataKeysSettingsEntity), // The metadata key settings
  // Location and history props are injected by the withRouter decoration call.
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withRouter(
    withResourceTypesLocalStorage(
      withResourcesLocalStorage(
        withMetadataTypesSettingsLocalStorage(
          withMetadataKeysSettingsLocalStorage(withTranslation("common")(FilterResourcesBySharedWithMePage)),
        ),
      ),
    ),
  ),
);
