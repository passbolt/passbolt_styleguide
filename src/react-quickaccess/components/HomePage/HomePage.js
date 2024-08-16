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
 * @since         4.10.0
 */

import React from "react";
import {Link, withRouter} from "react-router-dom";
import canSuggestUrl from "./canSuggestUrl";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import {withRbac} from "../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../shared/services/rbacs/uiActionEnumeration";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {sortResourcesAlphabetically} from "../../../shared/utils/sortUtils";

const SUGGESTED_RESOURCES_LIMIT = 20;
const BROWSED_RESOURCES_LIMIT = 500;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.initEventHandlers();
  }

  componentDidMount() {
    // Reset the search and any search history.
    this.props.context.searchHistory = [];
    this.props.context.updateSearch("");
    this.props.context.focusSearch();
    this.findResources();
    this.getActiveTabUrl();
  }

  initEventHandlers() {
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.props.context.storage.onChanged.addListener(this.handleStorageChange);
    this.handleUseOnThisTabClick = this.handleUseOnThisTabClick.bind(this);
  }

  initState() {
    return {
      resources: null,
      activeTabUrl: null,
      usingOnThisTab: false
    };
  }

  handleStorageChange(changes) {
    if (changes.resources) {
      const resources = changes.resources.newValue;
      sortResourcesAlphabetically(resources);
      this.setState({resources});
    }
  }

  async findResources() {
    const storageData = await this.props.context.storage.local.get(["resources"]);
    if (storageData.resources) {
      const resources = storageData.resources;
      sortResourcesAlphabetically(resources);
      this.setState({resources});
    }
    this.props.context.port.request('passbolt.resources.update-local-storage');
  }

  async getActiveTabUrl() {
    try {
      const activeTabUrl = await this.props.context.port.request("passbolt.active-tab.get-url", this.props.context.getOpenerTabId());
      this.setState({activeTabUrl});
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get the resources for the suggested section.
   * @param {string} activeTabUrl the active tab url
   * @param {array} resources The list of resources to filter.
   * @return {array} The list of filtered resources.
   */
  getSuggestedResources(activeTabUrl, resources) {
    if (!activeTabUrl) {
      return [];
    }

    const suggestedResources = [];

    for (const i in resources) {
      if (!resources[i].metadata.uris?.[0]) {
        continue;
      }

      if (resources[i].metadata.uris?.length > 0 && canSuggestUrl(activeTabUrl, resources[i].metadata.uris[0]) && this.isPasswordResource(resources[i].resource_type_id)) {
        suggestedResources.push(resources[i]);
        if (suggestedResources.length === SUGGESTED_RESOURCES_LIMIT) {
          break;
        }
      }
    }

    // Sort the resources by uri lengths, the greater on top.
    suggestedResources.sort((a, b) => {
      const aUrisLength = a.metadata.uris?.[0]?.length || 0;
      const bUrisLength = b.metadata.uris?.[0]?.length || 0;
      return bUrisLength - aUrisLength;
    });

    return suggestedResources;
  }

  /**
   * Get the resources for the browse section.
   * @return {array} The list of resources.
   */
  getBrowsedResources() {
    let browsedResources = this.state.resources.slice(0);

    if (this.props.context.search.length) {
      /*
       * @todo optimization. Memoize result to avoid filtering each time the component is rendered.
       * @see reactjs doc https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
       */
      browsedResources = this.filterResourcesBySearch(browsedResources, this.props.context.search);
    }

    return browsedResources.slice(0, BROWSED_RESOURCES_LIMIT);
  }

  /**
   * Filter resources by keywords.
   * Search on the name, the username, the uri and the description of the resources.
   * @param {array} resources The list of resources to filter.
   * @param {string} needle The needle to search.
   * @return {array} The filtered resources.
   */
  filterResourcesBySearch(resources, needle) {
    // Split the search by words
    const needles = needle.split(/\s+/);
    // Prepare the regexes for each word contained in the search.
    const regexes = needles.map(needle => new RegExp(this.escapeRegExp(needle), 'i'));

    return resources.filter(resource => {
      let match = true;
      for (const i in regexes) {
        // To match a resource would have to match all the words of the search.
        match &= (regexes[i].test(resource.metadata.name)
          || regexes[i].test(resource.metadata.username)
          || regexes[i].test(resource.metadata.uris?.[0])
          || regexes[i].test(resource.metadata.description));
      }

      return match;
    });
  }

  /**
   * Escape a string that is to be treated as a literal string within a regular expression.
   * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
   * @param {string} value The string to escape
   */
  escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  async handleUseOnThisTabClick(resource) {
    this.setState({usingOnThisTab: true});
    try {
      await this.props.context.port.request('passbolt.quickaccess.use-resource-on-current-tab', resource.id, this.props.context.getOpenerTabId());
      window.close();
    } catch (error) {
      if (error && error.name === "UserAbortsOperationError") {
        this.setState({usingOnThisTab: false});
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
   * @return {boolean}
   */
  isPasswordResource(resourceId) {
    return !this.areResourceTypesEnabled || this.props.context.resourceTypesSettings.assertResourceTypeIdHasPassword(resourceId);
  }

  /**
   * Are resource types enabled resource
   * @return {boolean}
   */
  get areResourceTypesEnabled() {
    return this.props.context.resourceTypesSettings.areResourceTypesEnabled();
  }

  render() {
    const isReady = this.state.resources !== null && this.props.context.resourceTypesSettings != null;
    const showSuggestedSection = !this.props.context.search.length;
    const showBrowsedResourcesSection = this.props.context.search.length > 0;
    const showFiltersSection = !this.props.context.search.length;
    const canUseTag = this.props.context.siteSettings.canIUse('tags') && this.props.rbacContext.canIUseUiAction(uiActions.TAGS_USE);
    let browsedResources, suggestedResources;

    if (isReady) {
      if (showSuggestedSection) {
        suggestedResources = this.getSuggestedResources(this.state.activeTabUrl, this.state.resources);
      }
      if (showBrowsedResourcesSection) {
        browsedResources = this.getBrowsedResources();
      }
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
                    <Icon name="spinner"/>
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
                        <span className="url">{resource.metadata.uris[0]}</span>
                      </button>
                      <Link className="chevron-right-wrapper" to={`/webAccessibleResources/quickaccess/resources/view/${resource.id}`}>
                        <Icon name="chevron-right"/>
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
                      <Icon name="spinner"/>
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
                          <Icon name="chevron-right"/>
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
                  <Link to={"/webAccessibleResources/quickaccess/more-filters"}>
                    <Icon name="filter"/>
                    <span className="filter-title"><Trans>Filters</Trans></span>
                    <Icon name="chevron-right"/>
                  </Link>
                </li>
                <li className="filter-entry">
                  <Link to={"/webAccessibleResources/quickaccess/resources/group"}>
                    <Icon name="users"/>
                    <span className="filter-title"><Trans>Groups</Trans></span>
                    <Icon name="chevron-right"/>
                  </Link>
                </li>
                {canUseTag &&
                  <li className="filter-entry">
                    <Link to={"/webAccessibleResources/quickaccess/resources/tag"}>
                      <Icon name="tag"/>
                      <span className="filter-title"><Trans>Tags</Trans></span>
                      <Icon name="chevron-right"/>
                    </Link>
                  </li>
                }
              </ul>
            </div>
          }
        </div>
        <div className="submit-wrapper button-after-list input">
          <Link to={`/webAccessibleResources/quickaccess/resources/create`} id="popupAction" className="button primary big full-width" role="button">
            <Trans>Create new</Trans>
          </Link>
          {this.state.useOnThisTabError &&
          <div className="error-message">{this.state.useOnThisTabError}</div>
          }
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withRouter(withTranslation('common')(HomePage))));
