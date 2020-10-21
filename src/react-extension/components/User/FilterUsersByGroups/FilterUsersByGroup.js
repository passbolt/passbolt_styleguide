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
import Icon from "../../../../react/components/Common/Icons/Icon";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {UserWorkspaceFilterTypes, withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withContextualMenu} from "../../../../react/contexts/Common/ContextualMenuContext";
import FilterUsersByGroupContextualMenu from "./FilterUsersByGroupContextualMenu";
import FilterUsersByGroupItemContextualMenu from "./FilterUsersByGroupItemContextualMenu";
import DisplayGroupContextualMenu from "./DisplayGroupContextualMenu";

/**
 * This component display groups to filter the users
 */
class FilterUsersByGroup extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      open: true, // open the group section
      title: "All groups", // title of the section
      filterType: null // type of the filter selected
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleTitleMoreClickEvent = this.handleTitleMoreClickEvent.bind(this);
    this.handleTitleContextualMenuEvent = this.handleTitleContextualMenuEvent.bind(this);
    this.handleFilterGroupType = this.handleFilterGroupType.bind(this);
    this.handleGroupSelected = this.handleGroupSelected.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
    this.handleContextualMenuEvent = this.handleContextualMenuEvent.bind(this);
  }

  /**
   * Handle when the user click on the title.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Handle when the user requests to display the contextual menu on the groups title.
   * @param {ReactEvent} event The event
   */
  handleTitleContextualMenuEvent(event) {
    // Prevent the browser contextual menu to pop up.
    event.preventDefault();
    this.showContextualMenu(event.pageY, event.pageX);
  }

  /**
   * Handle when the user requests to display the contextual menu on the groups title section.
   * @param {ReactEvent} event The event
   */
  handleTitleMoreClickEvent(event) {
    this.showContextualMenu(event.pageY, event.pageX);
  }

  /**
   * Handle when the user clicks right on a group
   * @param {ReactEvent} event The event
   * @param {Object} selectedTag The target group
   */
  handleContextualMenuEvent(event, group) {
    // Prevent the browser contextual menu to pop up.
    event.preventDefault();
    // No operation available if not admin user
    if (this.isLoggedInUserAdmin()) {
      this.showGroupContextualMenu(event.pageY, event.pageX, group);
    }
  }

  /**
   * Handle when the user clicks on the more button
   * @param {ReactEvent} event The event
   * @param {Object} group The target group
   */
  handleMoreClickEvent(event, group) {
    this.showGroupContextualMenu(event.pageY, event.pageX, group);
  }

  /**
   *
   */
  /**
   * Handle the selection of a group
   * @param event The Dom event
   * @param group The selected group
   */
  handleGroupSelected(event, group) {
    const {id} = group;
    this.props.history.push(`/app/groups/view/${id}`);
  }


  /**
   * Handle when the user wants to filter tags
   * @param {string} filterType
   */
  handleFilterGroupType(filterType) {
    this.setState({filterType}, () => {
      this.updateTitle();
    });
  }

  /**
   * Open the contextual menu for the current group
   * @param event The DOM event
   * @param group An user group
   */
  handleMoreClickEvent(event, group) {
    const top = event.pageY;
    const left = event.pageX;
    const contextualMenuProps = {group, left, top};
    this.props.contextualMenuContext.show(FilterUsersByGroupItemContextualMenu, contextualMenuProps);
  }

  // Zero conditional statements
  /**
   * get the title
   * @returns {{manage: string, default: string, member: string}}
   */
  get titles() {
    return {
      [filterByGroupsOptions.manage]: "Groups I manage",
      [filterByGroupsOptions.member]: "Groups I am member of",
      default: "All groups"
    };
  }

  /**
   * get the filter according to the type of the filter
   * @returns {{manage: (function(*): *), all: (function(*): *), member: (function(*): *)}}
   */
  get filters() {
    return {
      [filterByGroupsOptions.manage]: group => group.my_group_user && group.my_group_user.is_admin,
      [filterByGroupsOptions.member]: group => group.my_group_user && !group.my_group_user.is_admin,
      [filterByGroupsOptions.all]: group => group
    };
  }

  /**
   * filter tag to display only the type selected
   * @returns {*[filtered tags]}
   */
  get filteredGroups() {
    const filterType = this.state.filterType || filterByGroupsOptions.all;
    const filter = this.filters[filterType];
    return this.groupsSorted.filter(filter);
  }

  /**
   * Returns true if the current user is admin
   */
  get isCurrentUserAdmin() {
    return this.context.loggedInUser && this.context.loggedInUser.role.name === 'admin';
  }

  /**
   * get groups
   * @returns {*}
   */
  get groups() {
    return this.context.groups;
  }

  /**
   * get groups sorted
   * @returns {*|boolean}
   */
  get groupsSorted() {
    return this.groups.sort((groupA, groupB) => groupA.name.localeCompare(groupB.name));
  }

  /**
   * Show the contextual menu
   * @param {int} left The left position to display the menu
   * @param {int} top The top position to display the menu
   */
  showContextualMenu(top, left) {
    const onFilterSelected = this.handleFilterGroupType;
    const contextualMenuProps = {left, onFilterSelected, top};
    this.props.contextualMenuContext.show(FilterUsersByGroupContextualMenu, contextualMenuProps);
  }

  /**
   * Show the contextual menu for a group
   * @param {int} left The left position to display the menu
   * @param {int} top The top position to display the menu
   */
  showGroupContextualMenu(top, left, group) {
    const contextualMenuProps = {left, top, group};
    this.props.contextualMenuContext.show(DisplayGroupContextualMenu, contextualMenuProps);
  }

  /**
   * update the title of the filter tag
   */
  updateTitle() {
    const title = this.titles[this.state.filterType] || this.titles.default;
    this.setState({title});
  }

  /**
   * check if component loading
   * @returns {boolean}
   */
  isLoading() {
    return this.groups === null;
  }

  /**
   * has at least one group
   * @returns {*|boolean}
   */
  hasGroup() {
    return this.filteredGroups.length > 0;
  }



  /**
   * Returns true if the given group is selected
   * @param group A group
   */
  isSelected(group) {
    const isGroupFilter = this.props.userWorkspaceContext.filter.type === UserWorkspaceFilterTypes.GROUP;
    const filterPayload =  this.props.userWorkspaceContext.filter.payload;
    const groupPayload = filterPayload && filterPayload.group;
    const isGroupSelected = () => groupPayload.id === group.id;
    return isGroupFilter && isGroupSelected();
  }

  /**
   * Returns true if the contextual menu More can be shown
   * @param group The selected group
   */
  canShowMore(group) {
    const isGroupManager = group.my_group_user && group.my_group_user.is_admin;
    return this.isCurrentUserAdmin || isGroupManager;
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
                      <span onContextMenu={this.handleTitleContextualMenuEvent}>{this.state.title}</span>
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
        <div className="accordion-content">
          {this.isLoading() &&
          <div className="processing-wrapper">
            <span className="processing-text">Retrieving groups</span>
          </div>
          }
          {!this.isLoading() && !this.hasGroup() &&
          <em className="empty-content">empty</em>
          }
          {!this.isLoading() && this.hasGroup() &&
          <ul className="tree ready">
            {this.filteredGroups.map(group =>
              <li className="node root group-item" key={group.id}>
                <div className={`row  ${this.isSelected(group) ? "selected" : ""}`}>
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <a
                        title={group.name}
                        onClick={event => this.handleGroupSelected(event, group)}
                        onContextMenu={event => this.handleContextualMenuEvent(event, group)}>
                        <span className="ellipsis">{group.name}</span>
                      </a>
                    </div>
                    {this.canShowMore(group) &&
                    <div className="right-cell more-ctrl">
                      <a
                        onClick={event => this.handleMoreClickEvent(event, group)}>
                        <Icon name="plus-square"/>
                      </a>
                    </div>
                    }
                  </div>
                  {this.isLoggedInUserAdmin() &&
                  <div className="right-cell more-ctrl">
                    <a className="more" onClick={event => this.handleMoreClickEvent(event, group)}>
                      <Icon name="plus-square"/>
                    </a>
                  </div>
                  }
                </div>
              </li>
            )
            }
          </ul>
          }
        </div>
        }
      </div>
    );
  }
}

FilterUsersByGroup.contextType = AppContext;

FilterUsersByGroup.propTypes = {
  userWorkspaceContext: PropTypes.any, // user workspace context
  history: PropTypes.object,
  contextualMenuContext: PropTypes.any, // The contextual menu context
};

export default withRouter(withUserWorkspace(withContextualMenu(FilterUsersByGroup)));

export const filterByGroupsOptions = {
  all: "all",
  manage: "manage",
  member: "member"
};
