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
import {Link, withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {escapeRegExp, filterResourcesBySearch} from "../../../shared/utils/filterUtils";
import {withResourcesLocalStorage} from "../../contexts/ResourceLocalStorageContext";
import memoize from "memoize-one";
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

const BROWSED_RESOURCES_LIMIT = 100;
const BROWSED_TAGS_LIMIT = 100;

class FilterResourcesByTagPage extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  /**
   * Returns the currently selected tag if any, null otherwise
   * @returns {Object|null}
   */
  get selectedTag() {
    return this.props.location.state?.selectedTag || null;
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
    this.handleSelectTagClick = this.handleSelectTagClick.bind(this);
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
   * Handles the click event on a tag from the list.
   * @param {Event} ev
   * @param {Object} tag
   */
  handleSelectTagClick(ev, tag) {
    ev.preventDefault();
    this.props.context.searchHistory[this.props.location.pathname] = this.props.context.search;
    this.props.context.updateSearch("");

    // Push the tag as state of the component.
    this.props.history.push(`/webAccessibleResources/quickaccess/resources/tag/${tag.id}`, {selectedTag: tag});
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
     * By instance when you select a tag that you have filtered you expect the page to be filtered as when you left it.
     */
    this.props.context.searchHistory[this.props.location.pathname] = this.props.context.search;
    this.props.context.updateSearch("");
    this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resourceId}`);
  }

  /**
   * Returns all the tags extracted from the available resources.
   * @returns {Array<Object>}
   */
  getTagsFromResources = memoize(resources => {
    const allTagsById = {};

    resources.forEach(resource =>
      resource.tags?.forEach(tag => {
        if (!allTagsById[tag.id]) {
          allTagsById[tag.id] = tag;
        }
      })
    );

    return Object.values(allTagsById).sort((tag1, tag2) => {
      const tag1Slug = tag1.slug.toUpperCase();
      const tag2Slug = tag2.slug.toUpperCase();
      return tag1Slug.localeCompare(tag2Slug);
    });
  });

  /**
   * Filters the given resources by 'shared with me'
   * @param {Array<Object>} resources
   * @param {uuid} selectedTagId the id of the selected tag
   * @returns {Array<Object>}
   */
  filterResourcesByTag = memoize((resources, selectedTagId) => resources.filter(resource => resource.tags?.some(tag => selectedTagId === tag.id)));

  /**
   * Get the resources to display
   * @param {Array<Object>} resources the resource list to filter from
   * @param {string} search the keyword to search for in the list if any
   * @param {uuid} selectedTagId the id of the selected tag
   * @return {Array<Object>} The list of resources.
   */
  filterSearchedResources = memoize((resources, search, selectedTagId) => {
    const resourcesMatchingTag = this.filterResourcesByTag(resources, selectedTagId);
    return search
      ? filterResourcesBySearch(resourcesMatchingTag, search, BROWSED_RESOURCES_LIMIT)
      : resourcesMatchingTag;
  });

  /**
   * Get the tags to display
   * @param {Array<Object>} tags the tag list to filter from
   * @param {string} search the keyword to search for in the list if any
   * @return {Array<Object>} The list of tags.
   */
  filterSearchedTags = memoize((resources, search) => {
    const tags = this.getTagsFromResources(resources);
    // Split the search by words
    const searches = search.split(/\s+/);
    // Prepare the regexes for each word contained in the search.
    const regexes = searches.map(needle => new RegExp(escapeRegExp(needle), 'i'));

    let tagFoundCount = 0;
    return tags.filter(tag => {
      if (tagFoundCount > BROWSED_TAGS_LIMIT) {
        return false;
      }

      for (const i in regexes) {
        // To match a tag would have to match all the words of the search.
        const match = regexes[i].test(tag.slug);
        if (!match) {
          return false;
        }
      }

      tagFoundCount++;
      return true;
    });
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
   * Component renderer.
   * @returns {JSX}
   */
  render() {
    const isReady = this.props.resources !== null;
    const isSearching = this.props.context.search.length > 0;
    const selectedTag = this.selectedTag;
    const listTagsOnly = selectedTag === null;
    let browsedTags, browsedResources;

    if (isReady) {
      if (listTagsOnly) {
        browsedTags = this.filterSearchedTags(this.props.resources, this.props.context.search);
      } else {
        browsedResources = this.filterSearchedResources(this.props.resources, this.props.context.search, selectedTag?.id);
      }
    }

    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.props.t("Go back")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title">
              {selectedTag?.slug || <Trans>Tags</Trans>}
            </span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" className="secondary-action button-transparent button" title={this.props.t("Cancel")}>
            <Icon name="close"/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </Link>
        </div>
        <div className="list-container">
          <ul className="list-items">
            {!isReady &&
              <li className="empty-entry">
                <SpinnerSVG/>
                <p className="processing-text">
                  <Trans>Retrieving your tags</Trans>
                </p>
              </li>
            }
            {isReady &&
              <React.Fragment>
                {browsedTags &&
                  <React.Fragment>
                    {(!browsedTags.length) &&
                      <li className="empty-entry">
                        <p>
                          {isSearching && <Trans>No result match your search. Try with another search term.</Trans>}
                          {!isSearching && <Trans>No passwords are yet tagged. It does feel a bit empty here, tag your first password.</Trans>}
                        </p>
                      </li>
                    }
                    {(browsedTags.length > 0) &&
                      browsedTags.map(tag => (
                        <li className="filter-entry" key={tag.id}>
                          <a href="#" onClick={ev => this.handleSelectTagClick(ev, tag)}>
                            <span className="filter">{tag.slug}</span>
                          </a>
                        </li>
                      ))
                    }
                  </React.Fragment>
                }
                {!browsedTags &&
                  <React.Fragment>
                    {!browsedResources.length &&
                      <li className="empty-entry">
                        <p>
                          <Trans>No result match your search. Try with another search term.</Trans>
                        </p>
                      </li>
                    }
                    {(browsedResources.length > 0) &&
                      browsedResources.map(resource =>
                        <li className="browse-resource-entry" key={resource.id}>
                          <a href="#" onClick={ev => this.handleSelectResourceClick(ev, resource.id)}>
                            <div className="inline-resource-entry">
                              <div className='inline-resource-name'>
                                <span className="title">{resource.metadata.name}</span>
                                <span className="username"> {resource.metadata.username ? `(${resource.metadata.username})` : ""}</span>
                              </div>
                              <span className="url">{resource.metadata.uris?.[0]}</span>
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
          <Link to="/webAccessibleResources/quickaccess/resources/create" id="popupAction" className="button primary big full-width" role="button">
            <Trans>Create new</Trans>
          </Link>
        </div>
        }
      </div>
    );
  }
}

FilterResourcesByTagPage.propTypes = {
  context: PropTypes.any, // The application context
  resources: PropTypes.array, // The available resources
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withResourceTypesLocalStorage(withResourcesLocalStorage(withMetadataTypesSettingsLocalStorage(withTranslation('common')(FilterResourcesByTagPage))))));
