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
 * @since         2.13.0
 */
import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import FilterResourcesByTagsContextualMenu from "./FilterResourcesByTagsContextualMenu";
import FilterResourcesByTagsList from "./FilterResourcesByTagsList";
import {withContextualMenu} from "../../../contexts/ContextualMenuContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withAppContext} from "../../../contexts/AppContext";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";

/**
 * This component display the tag to filter the resources
 */
class FilterResourcesByTags extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: true,
      title: this.translate("Tags"),
      filterType: null, // type of the filter selected
      moreMenuOpen: false // more menu open
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleTitleContextualMenuEvent = this.handleTitleContextualMenuEvent.bind(this);
    this.handleTitleMoreClickEvent = this.handleTitleMoreClickEvent.bind(this);
    this.handleCloseMoreMenu = this.handleCloseMoreMenu.bind(this);
    this.handleFilterTagsType = this.handleFilterTagsType.bind(this);
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Handle when the user requests to display the contextual menu on the root folder.
   * @param {ReactEvent} event The event
   */
  handleTitleContextualMenuEvent(event) {
    // Prevent the browser contextual menu to pop up.
    event.preventDefault();
    this.showContextualMenu(event.pageY, event.pageX);
  }

  /**
   * Close the more menu
   */
  handleCloseMoreMenu() {
    this.setState({moreMenuOpen: false});
  }

  /**
   * Handle when the user requests to display the contextual menu on the tag title section.
   * @param {ReactEvent} event The event
   */
  handleTitleMoreClickEvent(event) {
    const moreMenuOpen = !this.state.moreMenuOpen;
    this.setState({moreMenuOpen});
    if (moreMenuOpen) {
      const {left, top} = event.currentTarget.getBoundingClientRect();
      this.showContextualMenu(top + 18, left, "right");
    }
  }

  /**
   * Show the contextual menu
   * @param {int} left The left position to display the menu
   * @param {int} top The top position to display the menu
   * @param {string} className The className to display the menu
   */
  showContextualMenu(top, left, className = "") {
    const onFilterSelected = this.handleFilterTagsType;
    const onBeforeHide = this.handleCloseMoreMenu;
    const contextualMenuProps = {left, onFilterSelected, onBeforeHide, top, className};
    this.props.contextualMenuContext.show(FilterResourcesByTagsContextualMenu, contextualMenuProps);
  }

  /**
   * Handle when the user wants to filter tags
   * @param {string} filterType
   */
  handleFilterTagsType(filterType) {
    if (this.isAllFilterRequire(filterType)) {
      // apply all filter
      const filter = {type: ResourceWorkspaceFilterTypes.ALL};
      this.props.history.push({pathname: '/app/passwords', state: {filter}});
    }
    this.setState({filterType}, () => {
      this.updateTitle();
    });
  }

  /**
   * Check if the all filter is required
   * @param filterType
   * @returns {boolean}
   */
  isAllFilterRequire(filterType) {
    const filter = this.props.resourceWorkspaceContext.filter;
    const isSharedTag = filter.type === ResourceWorkspaceFilterTypes.TAG && filter.payload.tag.is_shared;
    return !isSharedTag && filterType === 'shared' || isSharedTag && filterType === 'personal';
  }

  // Zero conditional statements
  /**
   * get the title
   * @returns {{shared: string, default: string, personal: string}}
   */
  get titles() {
    return {
      personal: this.translate("My tags"),
      shared: this.translate("Shared tags"),
      default: this.translate("Tags")
    };
  }

  /**
   * update the title of the filter tag
   */
  updateTitle() {
    const title = this.titles[this.state.filterType] || this.titles.default;
    this.setState({title});
  }

  /**
   * Get tags from resources
   * @returns {array} all tags from resources
   */
  getTagsFromResources() {
    if (this.props.context.resources) {
      // get all tags, flat in array and reduce to have unique tag)
      const tags =  this.props.context.resources.map(resource => resource.tags).flat().reduce((accumulator, resourceTags) => {
        if (resourceTags) {
          !accumulator.find(tag => tag.id === resourceTags.id) && accumulator.push(resourceTags);
        }
        return accumulator;
      }, []);
      // sort array alphabetically
      return tags.sort((tagA, tagB) => tagA.slug.localeCompare(tagB.slug));
    }
    return null;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="navigation-secondary-tree navigation-secondary navigation-tags accordion">
        <ul className="accordion-header">
          <li className={`node root ${this.state.open ? "open" : "close"}`}>
            <div className="row title">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <h3>
                    <span className="folders-label" onClick={this.handleTitleClickEvent} onContextMenu={this.handleTitleContextualMenuEvent}>
                      <a role="button">
                        <>
                          {this.state.open &&
                            <Icon name="caret-down"/>
                          }
                          {!this.state.open &&
                            <Icon name="caret-right"/>
                          }
                        </>
                        {this.state.title}
                      </a>
                    </span>
                  </h3>
                </div>
              </div>
              <div className="dropdown right-cell more-ctrl">
                <a className={`button ${this.state.moreMenuOpen ? "open" : ""}`} onClick={this.handleTitleMoreClickEvent}><Icon name="3-dots-h"/></a>
              </div>
            </div>
          </li>
        </ul>
        {this.state.open &&
        <FilterResourcesByTagsList
          tags={this.getTagsFromResources()}
          filterType={this.state.filterType}
        />
        }
      </div>
    );
  }
}

FilterResourcesByTags.propTypes = {
  context: PropTypes.any, // The application context
  contextualMenuContext: PropTypes.any, // The contextual menu context
  resourceWorkspaceContext: PropTypes.object,
  history: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withRouter(withAppContext(withResourceWorkspace(withContextualMenu(withTranslation('common')(FilterResourcesByTags)))));
