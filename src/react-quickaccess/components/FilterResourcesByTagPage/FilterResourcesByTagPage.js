import PropTypes from "prop-types";
import React from "react";
import {Link, withRouter} from "react-router-dom";
import {withAppContext} from "../../contexts/AppContext";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";

const BROWSED_RESOURCES_LIMIT = 500;
const BROWSED_TAGS_LIMIT = 500;

class FilterResourcesByTagPage extends React.Component {
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

    /*
     * If a tag is selected, the component aims to display the resources marked by this tag.
     * Load the resources
     */
    if (this.props.match.params.id) {
      this.findAndLoadResources();
    } else {
      // Otherwise list the tags the user has resources marked with.
      this.findAndLoadTags();
    }
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleSelectTagClick = this.handleSelectTagClick.bind(this);
    this.handleSelectResourceClick = this.handleSelectResourceClick.bind(this);
  }

  initState() {
    let selectedTag = null;

    // The selected tag to use to filter the resources is passed via the history.push state option.
    if (this.props.location.state && this.props.location.state.selectedTag) {
      selectedTag = this.props.location.state.selectedTag;
    }

    return {
      selectedTag: selectedTag,
      tags: null,
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

  handleSelectTagClick(ev, tagId) {
    ev.preventDefault();
    this.props.context.searchHistory[this.props.location.pathname] = this.props.context.search;
    this.props.context.updateSearch("");
    // Push the tag as state of the component.
    const selectedTag = this.state.tags.find(tag => tag.id === tagId);
    this.props.history.push(`/data/quickaccess/resources/tag/${tagId}`, {selectedTag});
  }

  handleSelectResourceClick(ev, resourceId) {
    ev.preventDefault();
    /*
     * Add a search history for the current page.
     * It will allow the page to restore the search when the user will come back after clicking goBack (caveat, the workflow is not this one).
     * By instance when you select a tag that you have filtered you expect the page to be filtered as when you left it.
     */
    this.props.context.searchHistory[this.props.location.pathname] = this.props.context.search;
    this.props.context.updateSearch("");
    this.props.history.push(`/data/quickaccess/resources/view/${resourceId}`);
  }

  async findAndLoadTags() {
    const tags = await this.props.context.port.request("passbolt.tags.find-all");
    this.sortTagsAlphabetically(tags);
    this.setState({tags});
  }

  async findAndLoadResources() {
    const filters = {'has-tag': this.props.location.state.selectedTag.slug};
    const resources = await this.props.context.port.request('passbolt.resources.find-all', {filters});
    this.sortResourcesAlphabetically(resources);
    this.setState({resources});
  }

  sortTagsAlphabetically(tags) {
    tags.sort((tag1, tag2) => {
      const tag1Slug = tag1.slug.toUpperCase();
      const tag2Slug = tag2.slug.toUpperCase();
      if (tag1Slug > tag2Slug) {
        return 1;
      } else if (tag2Slug > tag1Slug) {
        return -1;
      }
      return 0;
    });
  }

  sortResourcesAlphabetically(resources) {
    resources.sort((resource1, resource2) => {
      const resource1Name = resource1.name.toUpperCase();
      const resource2Name = resource2.name.toUpperCase();
      if (resource1Name > resource2Name) {
        return 1;
      } else if (resource2Name > resource1Name) {
        return -1;
      }
      return 0;
    });
  }

  /**
   * Get the tags to display
   * @return {array} The list of tags.
   */
  getBrowsedTags() {
    let tags = this.state.tags;

    if (this.props.context.search.length) {
      /*
       * @todo optimization. Memoize result to avoid filtering each time the component is rendered.
       * @see reactjs doc https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
       */
      tags = this.filterTagsBySearch(tags, this.props.context.search);
    }

    return tags.slice(0, BROWSED_TAGS_LIMIT);
  }

  /**
   * Filter tags by keywords.
   * Search on the slug
   * @param {array} tags The list of tags to filter.
   * @param {string} needle The needle to search.
   * @return {array} The filtered tags.
   */
  filterTagsBySearch(tags, needle) {
    // Split the search by words
    const needles = needle.split(/\s+/);
    // Prepare the regexes for each word contained in the search.
    const regexes = needles.map(needle => new RegExp(this.escapeRegExp(needle), 'i'));

    return tags.filter(tag => {
      let match = true;
      for (const i in regexes) {
        // To match a resource would have to match all the words of the search.
        match &= regexes[i].test(tag.slug);
      }

      return match;
    });
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
    return this.state.tags !== null
      || this.state.resources != null;
  }

  render() {
    const isReady = this.isReady();
    const isSearching = this.props.context.search.length > 0;
    const listTagsOnly = this.state.selectedTag === null;
    let browsedTags, browsedResources;

    if (isReady) {
      if (listTagsOnly) {
        browsedTags = this.getBrowsedTags();
      } else {
        browsedResources = this.getBrowsedResources();
      }
    }

    return (
      <div className="index-list">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Go back")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title">
              {this.state.selectedTag && this.state.selectedTag.slug || <Trans>Tags</Trans>}
            </span>
          </a>
          <Link to="/data/quickaccess.html" className="secondary-action button-transparent button" title={this.translate("Cancel")}>
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
                  {listTagsOnly ? <Trans>Retrieving your tags</Trans> : <Trans>Retrieving your passwords</Trans>}
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
                          <a href="#" onClick={ev => this.handleSelectTagClick(ev, tag.id)}>
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
                          {isSearching && <Trans>No result match your search. Try with another search term.</Trans>}
                          {/* The below scenario should not happen */}
                          {!isSearching && <Trans>No passwords are marked with this tag yet. Mark a password with this
                            tag or wait for a team member to mark a password with this tag.</Trans>}
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
              </React.Fragment>
            }
          </ul>
        </div>
        <div className="submit-wrapper">
          <Link to="/data/quickaccess/resources/create" id="popupAction" className="button primary big full-width" role="button">
            <Trans>Create new</Trans>
          </Link>
        </div>
      </div>
    );
  }
}

FilterResourcesByTagPage.propTypes = {
  context: PropTypes.any, // The application context
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withTranslation('common')(FilterResourcesByTagPage)));
