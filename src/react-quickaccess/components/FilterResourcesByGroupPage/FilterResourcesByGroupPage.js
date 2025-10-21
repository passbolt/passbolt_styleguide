import PropTypes from "prop-types";
import React from "react";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {sortResourcesAlphabetically} from "../../../shared/utils/sortUtils";
import {escapeRegExp, filterResourcesBySearch} from "../../../shared/utils/filterUtils";
import memoize from "memoize-one";
import {withResourcesLocalStorage} from "../../contexts/ResourceLocalStorageContext";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import {
  withResourceTypesLocalStorage
} from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import DisplayResourceUrisBadge
  from "../../../react-extension/components/Resource/DisplayResourceUrisBadge/DisplayResourceUrisBadge";
import CaretLeftSVG from "../../../img/svg/caret_left.svg";
import CloseSVG from "../../../img/svg/close.svg";
import {
  withMetadataKeysSettingsLocalStorage
} from "../../../shared/context/MetadataKeysSettingsLocalStorageContext/MetadataKeysSettingsLocalStorageContext";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";

const BROWSED_RESOURCES_LIMIT = 500;
const BROWSED_GROUPS_LIMIT = 500;

class FilterResourcesByGroupPage extends React.Component {
  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
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
    if (this.props.location?.state?.selectedGroup) {
      this.findAndLoadGroupResourceIds();
    } else {
      this.findAndLoadGroups();
    }
  }

  /**
   * Returns the component default state
   * @return {object}
   */
  get defaultState() {
    return {
      groups: null,
      groupResourceIds: null,
    };
  }

  /**
   * Initializes event handlers
   */
  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleSelectGroupClick = this.handleSelectGroupClick.bind(this);
    this.handleSelectResourceClick = this.handleSelectResourceClick.bind(this);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
   * Handles the click event on a group from the list.
   * @param {Event} ev
   * @param {Object} selectedGroup
   */
  handleSelectGroupClick(ev, selectedGroup) {
    ev.preventDefault();
    this.props.context.searchHistory[this.props.location.pathname] = this.props.context.search;
    this.props.context.updateSearch("");
    this.props.history.push(`/webAccessibleResources/quickaccess/resources/group/${selectedGroup.id}`, {selectedGroup});
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
     * By instance when you select a group that you have filtered you expect the page to be filtered as when you left it.
     */
    this.props.context.searchHistory[this.props.location.pathname] = this.props.context.search;
    this.props.context.updateSearch("");
    this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resourceId}`);
  }

  /**
   * Find and load groups.
   * @returns {Promise<void>}
   */
  async findAndLoadGroups() {
    const groups = await this.props.context.port.request('passbolt.groups.find-my-groups');
    this.sortGroupsAlphabetically(groups);
    this.setState({groups});
  }

  /**
   * Find and load group resource ids.
   * @returns {Promise<void>}
   */
  async findAndLoadGroupResourceIds() {
    const groupResourceIds = await this.props.context.port.request('passbolt.resources.find-all-ids-by-is-shared-with-group', this.props.location.state.selectedGroup.id);
    this.setState({groupResourceIds});
  }

  /**
   * Find resources by ids.
   * @param {array} resources The list of resources to filter.
   * @param {array} ids The list of ids to filter on.
   * @return {Array<Object>} The list of resources filtered.
   */
  filterResourcesByIds = memoize((resources, ids) => {
    const groupResources = resources.filter(resource => ids.includes(resource.id));

    sortResourcesAlphabetically(groupResources);
    return groupResources;
  });

  /**
   * Sort an array of groups alphabetically
   * @param {Array} groups The array of group to filter.
   */
  sortGroupsAlphabetically(groups) {
    groups.sort((group1, group2) =>
      group1.name.localeCompare(group2.name, undefined, {sensitivity: 'base'})
    );
  }

  /**
   * Filter groups by keywords.
   * Search on the name
   * @param {array} groups The list of groups to filter.
   * @param {string} needle The needle to search.
   * @param {number} [limit = Number.MAX_SAFE_INTEGER] the count limit of results.
   * @return {array} The filtered groups.
   */
  filterGroupsBySearch = memoize((groups, needle, limit = Number.MAX_SAFE_INTEGER) => {
    // Split the search by words
    const needles = needle.split(/\s+/);
    // Prepare the regexes for each word contained in the search.
    const regexes = needles.map(needle => new RegExp(escapeRegExp(needle), 'i'));

    let filterCount = 0;
    return groups.filter(group => {
      if (filterCount >= limit) {
        return false;
      }

      let match = true;
      for (const i in regexes) {
        // To match a resource would have to match all the words of the search.
        match &= regexes[i].test(group.name);
      }
      filterCount++;
      return match;
    });
  });

  /**
   * Get the resources to display
   * @param {Array<Object>} resources the resource list to filter from
   * @param {Array} groupResourceIds The list of resources shared with the group
   * @param {string} search the keyword to search for in the list if any
   * @return {Array<Object>} The list of resources.
   */
  filterSearchedResources = memoize((resources, groupResourceIds, search) =>  {
    const groupResources = this.filterResourcesByIds(resources, groupResourceIds);

    return search
      ? filterResourcesBySearch(groupResources, search, BROWSED_RESOURCES_LIMIT)
      : groupResources.slice(0, BROWSED_RESOURCES_LIMIT);
  });

  /**
   * Get the groups to display
   * @param {Array<Object>} groups the group list to filter from
   * @param {string} search the keyword to search for in the list if any
   * @return {Array<Object>} The list of resources.
   */
  filterSearchedGroups = memoize((groups, search) => search
    ? this.filterGroupsBySearch(groups, search, BROWSED_GROUPS_LIMIT)
    : groups.slice(0, BROWSED_GROUPS_LIMIT));

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
    return this.props.metadataTypeSettings.isDefaultResourceTypeV5 && this.userHasMissingKeys && !this.props.metadataKeysSettings?.allowUsageOfPersonalKeys;
  }

  render() {
    const isSearching = this.props.context.search.length > 0;
    const listGroupsOnly = !this.props.location?.state?.selectedGroup;
    let isReady, browsedGroups, browsedResources;

    if (listGroupsOnly) {
      isReady = this.state.groups !== null;
      if (isReady) {
        browsedGroups = this.filterSearchedGroups(this.state.groups, this.props.context.search);
      }
    } else {
      isReady = this.props.resources !== null && this.state.groupResourceIds !== null;
      if (isReady) {
        browsedResources = this.filterSearchedResources(this.props.resources, this.state.groupResourceIds, this.props.context.search);
      }
    }

    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Go back")}>
            <CaretLeftSVG/>
            <span className="primary-action-title">
              {this.state.selectedGroup && this.state.selectedGroup.name || <Trans>Groups</Trans>}
            </span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" className="secondary-action button-transparent button" title={this.translate("Cancel")}>
            <CloseSVG className="close"/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </Link>
        </div>
        <div className="list-container">
          <ul className="list-items">
            {!isReady &&
              <li className="empty-entry">
                <SpinnerSVG/>
                <p className="processing-text">
                  {listGroupsOnly ? <Trans>Retrieving your groups</Trans> : <Trans>Retrieving your passwords</Trans>}
                </p>
              </li>
            }
            {isReady &&
              <React.Fragment>
                {listGroupsOnly &&
                  <React.Fragment>
                    {(!browsedGroups.length) &&
                      <li className="empty-entry">
                        <p>
                          {isSearching && <Trans>No result match your search. Try with another search term.</Trans>}
                          {!isSearching && <Trans>You are not member of any group. Wait for a group manager to add you in a group.</Trans>}
                        </p>
                      </li>
                    }
                    {(browsedGroups.length > 0) &&
                      browsedGroups.map(group => (
                        <li key={group.id} className="filter-entry">
                          <a href="#" onClick={ev => this.handleSelectGroupClick(ev, group)}>
                            <span className="filter">{group.name}</span>
                          </a>
                        </li>
                      ))
                    }
                  </React.Fragment>
                }
                {!listGroupsOnly &&
                  <React.Fragment>
                    {!browsedResources.length &&
                      <li className="empty-entry">
                        <p>
                          {isSearching && <Trans>No result match your search. Try with another search term.</Trans>}
                          {!isSearching && <Trans>No passwords are shared with this group yet. Share a password with this group or wait for a team
                            member to share one with this group.</Trans>}
                        </p>
                      </li>
                    }
                    {(browsedResources?.length > 0) &&
                      browsedResources.map(resource =>
                        <li className="browse-resource-entry" key={resource.id}>
                          <a href="#" onClick={ev => this.handleSelectResourceClick(ev, resource.id)}>
                            <div className="inline-resource-entry">
                              <div className='inline-resource-name'>
                                <span className="title">{resource.metadata.name}</span>
                                <span className="username"> {resource.metadata.username ? `(${resource.metadata.username})` : ""}</span>
                              </div>
                              <div className="uris">
                                <span className="url">{resource.metadata.uris?.[0]}</span>
                                {resource.metadata.uris?.length > 1 &&
                                  <DisplayResourceUrisBadge additionalUris={resource.metadata.uris?.slice(1)}/>
                                }
                              </div>
                            </div>
                          </a>
                        </li>
                      )}
                  </React.Fragment>
                }
              </React.Fragment>
            }
          </ul>
        </div>
        {this.hasMetadataTypesSettings() && this.canCreatePassword() &&
        <div className="submit-wrapper">
          <Link to={`/webAccessibleResources/quickaccess/resources/${this.shouldDisplayActionAbortedMissingMetadataKeys ? "action-aborted-missing-metadata-keys" : "create"}`} id="popupAction" className="button primary big full-width" role="button">
            <Trans>Create new</Trans>
          </Link>
        </div>
        }
      </div>
    );
  }
}

FilterResourcesByGroupPage.propTypes = {
  context: PropTypes.any, // The application context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  metadataKeysSettings: PropTypes.instanceOf(MetadataKeysSettingsEntity), // The metadata key settings
  location: PropTypes.object,
  history: PropTypes.object,
  resources: PropTypes.array,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withResourceTypesLocalStorage(withResourcesLocalStorage(withMetadataTypesSettingsLocalStorage(withMetadataKeysSettingsLocalStorage(withTranslation('common')(FilterResourcesByGroupPage)))))));
