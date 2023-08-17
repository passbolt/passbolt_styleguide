import PropTypes from "prop-types";
import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";

const BROWSED_RESOURCES_LIMIT = 500;

class FilterResourcesByRecentlyModifiedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.initEventHandlers();
  }

  componentDidMount() {
    this.props.context.focusSearch();
    if (this.props.context.searchHistory[this.props.location.pathname]) {
      this.props.context.updateSearch(this.props.context.searchHistory[this.props.location.pathname]);
    }
    this.findAndLoadResources();
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleSelectResourceClick = this.handleSelectResourceClick.bind(this);
  }

  initState() {
    return {
      resources: null
    };
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  handleGoBackClick(ev) {
    ev.preventDefault();
    // Clean the search and remove the search history related to this page.
    this.props.context.updateSearch("");
    delete this.props.context.searchHistory[this.props.location.pathname];
    this.props.history.goBack();
  }

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

  async findAndLoadResources() {
    const storageData = await this.props.context.storage.local.get(["resources"]);
    if (storageData.resources) {
      const resources = storageData.resources;
      this.sortResourcesByModifiedDesc(resources);
      this.setState({resources});
    }
  }

  sortResourcesByModifiedDesc(resources) {
    resources.sort((resource1, resource2) => new Date(resource2.modified) - new Date(resource1.modified));
  }

  /**
   * Get the resources to display
   * @return {array} The list of resources.
   */
  getBrowsedResources() {
    let resources = this.state.resources;

    if (this.props.context.search.length) {
      /*
       * @todo optimization. Memoize result to avoid filtering each time the component is rendered.
       * @see reactjs doc https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
       */
      resources = this.filterResourcesBySearch(resources, this.props.context.search);
    }

    return resources.slice(0, BROWSED_RESOURCES_LIMIT);
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
        match &= (regexes[i].test(resource.name)
          || regexes[i].test(resource.username)
          || regexes[i].test(resource.uri)
          || regexes[i].test(resource.description));
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

  isReady() {
    return this.state.resources != null;
  }

  render() {
    const isReady = this.isReady();
    const isSearching = this.props.context.search.length > 0;
    let browsedResources;

    if (isReady) {
      browsedResources = this.getBrowsedResources();
    }

    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Go back")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title">
              <Trans>Recently modified</Trans>
            </span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" className="secondary-action button-transparent button" title={this.translate("Cancel")}>
            <Icon name="close"/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </Link>
        </div>
        <div className="list-container">
          <ul className="list-items">
            {!isReady &&
              <li className="empty-entry">
                <Icon name="spinner"/>
                <p className="processing-text">
                  <Trans>Retrieving your passwords</Trans>
                </p>
              </li>
            }
            {isReady &&
              <React.Fragment>
                {!browsedResources.length &&
                  <li className="empty-entry">
                    <p>
                      {isSearching && <Trans>No result match your search. Try with another search term.</Trans>}
                      {!isSearching && <>
                        <Trans>It does feel a bit empty here.</Trans>&nbsp;
                        <Trans>Create your first password or wait for a team member to share one with you.</Trans>
                      </>}
                    </p>
                  </li>
                }
                {(browsedResources.length > 0) &&
                  browsedResources.map(resource =>
                    <li className="browse-resource-entry" key={resource.id}>
                      <a href="#" onClick={ev => this.handleSelectResourceClick(ev, resource.id)}>
                        <div className="inline-resource-entry">
                          <div className='inline-resource-name'>
                            <span className="title">{resource.name}</span>
                            <span className="username"> {resource.username ? `(${resource.username})` : ""}</span>
                          </div>
                          <span className="url">{resource.uri}</span>
                        </div>
                      </a>
                    </li>
                  )}
              </React.Fragment>
            }
          </ul>
        </div>
        <div className="submit-wrapper">
          <Link to="/webAccessibleResources/quickaccess/resources/create" id="popupAction" className="button primary big full-width" role="button">
            <Trans>Create new</Trans>
          </Link>
        </div>
      </div>
    );
  }
}

FilterResourcesByRecentlyModifiedPage.propTypes = {
  context: PropTypes.any, // The application context
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withTranslation('common')(FilterResourcesByRecentlyModifiedPage)));
