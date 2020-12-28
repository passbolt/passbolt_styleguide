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
import Icon from "../../../../react/components/Common/Icons/Icon";
import SidebarTagFilterSectionContextualMenu from "./SidebarTagFilterSectionContextualMenu";
import DisplayTagList from "./DisplayTagList";
import {withContextualMenu} from "../../../../react/contexts/Common/ContextualMenuContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import AppContext from "../../../contexts/AppContext";
import {withRouter} from "react-router-dom";

/**
 * This component display the tag to filter the resources
 */
class SidebarTagFilterSection extends React.Component {
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
      title: "Filter by tags",
      filterType: null // type of the filter selected
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleTitleContextualMenuEvent = this.handleTitleContextualMenuEvent.bind(this);
    this.handleTitleMoreClickEvent = this.handleTitleMoreClickEvent.bind(this);
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
   * Handle when the user requests to display the contextual menu on the tag title section.
   * @param {ReactEvent} event The event
   */
  handleTitleMoreClickEvent(event) {
    this.showContextualMenu(event.pageY, event.pageX);
  }

  /**
   * Show the contextual menu
   * @param {int} left The left position to display the menu
   * @param {int} top The top position to display the menu
   */
  showContextualMenu(top, left) {
    const onFilterSelected = this.handleFilterTagsType;
    const contextualMenuProps = {left, onFilterSelected, top};
    this.props.contextualMenuContext.show(SidebarTagFilterSectionContextualMenu, contextualMenuProps);
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
      personal: "My tags",
      shared: "Shared tags",
      default: "Filter by tags"
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
    if (this.context.resources) {
      // get all tags, flat in array and reduce to have unique tag)
      const tags =  this.context.resources.map(resource => resource.tags).flat().reduce((accumulator, resourceTags) => {
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="folders navigation first accordion">
        <ul className="accordion-header">
          <li className={`node root ${this.state.open ? "open" : "close"}`}>
            <div className="row title">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <h3>
                    <span className="folders-label" onClick={this.handleTitleClickEvent}>
                      <Fragment>
                        {this.state.open &&
                        <Icon name="caret-down"/>
                        }
                        {!this.state.open &&
                        <Icon name="caret-right"/>
                        }
                      </Fragment>
                      <span
                        onContextMenu={this.handleTitleContextualMenuEvent}>{this.state.title}</span>
                    </span>
                  </h3>
                </div>
              </div>
              <div className="right-cell more-ctrl">
                <a className="filter" onClick={this.handleTitleMoreClickEvent}><Icon name="filter"/></a>
              </div>
            </div>
          </li>
        </ul>
        {this.state.open &&
        <DisplayTagList
          tags={this.getTagsFromResources()}
          filterType={this.state.filterType}
        />
        }
      </div>
    );
  }
}

SidebarTagFilterSection.contextType = AppContext;

SidebarTagFilterSection.propTypes = {
  contextualMenuContext: PropTypes.any, // The contextual menu context
  resourceWorkspaceContext: PropTypes.object,
  history: PropTypes.any
};

export default withRouter(withResourceWorkspace(withContextualMenu(SidebarTagFilterSection)));
