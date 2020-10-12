/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SARL (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */
import PropTypes from "prop-types";
import React from "react";
import ReactList from "react-list";
import moment from 'moment/moment';
import 'moment-timezone/builds/moment-timezone-with-data-2012-2022';
import AppContext from "../../../contexts/AppContext";
import Icon from "../../Common/Icons/Icon";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withRouter} from "react-router-dom";
import {withContextualMenu} from "../../../../react/contexts/Common/ContextualMenuContext";
import {UserWorkspaceFilterTypes, withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import DisplayUsersContextualMenu from "../DisplayUsersContextualMenu/DisplayUsersContextualMenu";


/**
 * This component allows to display the filtered users into a grid
 */
class DisplayUsers extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createRefs();
  }

  /**
   * Returns the component default state
   */
  getDefaultState() {
    return {};
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleUserSelected = this.handleUserSelected.bind(this);
    this.handleUserRightClick = this.handleUserRightClick.bind(this);
    this.handleCheckboxWrapperClick = this.handleCheckboxWrapperClick.bind(this);
    this.handleSortByColumnClick = this.handleSortByColumnClick.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.listRef = React.createRef();
    this.dragFeedbackElement = React.createRef();
  }

  /**
   * Whenever the component has been updated
   */
  componentDidUpdate() {
    this.handleUserScroll();
  }

  /**
   * Handles the user scroll ( with a specific manual user url /users/view/:id )
   */
  handleUserScroll() {
    const userToScroll = this.props.userWorkspaceContext.scrollTo.user;
    if (userToScroll) {
      this.scrollTo(userToScroll.id);
      this.props.userWorkspaceContext.onUserScrolled();
    }
  }


  /**
   * Handle the user selection
   * @param event The DOM event
   * @param user The selected user
   */
  async handleUserSelected(event, user) {
    event.preventDefault();
    event.stopPropagation();
    await this.selectUser(user);
  }

  /**
   * Handle the right click on a user
   * @param event A DOM event
   * @param user A user
   */
  async handleUserRightClick(event, user) {
    // Prevent the default contextual menu to popup.
    event.preventDefault();
    this.displayContextualMenu(event, user);
    await this.selectUserIfNotAlreadySelected(user);
  }

  /**
   * Handle the checkbox click wrapping
   * @param event An event
   * @param user An user
   */
  handleCheckboxWrapperClick(event, user) {
    event.stopPropagation();
    this.props.userWorkspaceContext.onUserSelected.single(user);
  }

  /**
   * Handle the user sorter change
   * @param event A DOM event
   * @param sortProperty The user property to sort on
   */
  async handleSortByColumnClick(event, sortProperty) {
    this.props.userWorkspaceContext.onSorterChanged(sortProperty);
  }


  /**
   * Returns the current list of filtered users to display
   */
  get users() {
    return this.props.userWorkspaceContext.filteredUsers;
  }

  /**
   * Returns the current list of selected users
   */
  get selectedUsers() {
    return this.props.userWorkspaceContext.selectedUsers;
  }

  /**
   * Returns true if the given user is selected
   * @param user A user
   */
  isUserSelected(user) {
    return this.props.userWorkspaceContext.selectedUsers.some(selectedUser => user.id === selectedUser.id);
  }

  /**
   * Displays the contextual menu for the given user and following the given event
   * @param event A dom event
   * @param user A user
   */
  displayContextualMenu(event, user) {
    const left = event.pageX;
    const top = event.pageY;
    const contextualMenuProps = {left, top, user};
    this.props.contextualMenuContext.show(DisplayUsersContextualMenu, contextualMenuProps);
  }

  /**
   * Select the user.
   * @param user An user
   */
  async selectUser(user) {
    await this.props.userWorkspaceContext.onUserSelected.single(user);
  }


  /**
   * Scroll to the given user
   * @param userId An user identifier
   */
  scrollTo(userId) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    const [visibleStartIndex, visibleEndIndex] = this.listRef.current.getVisibleRange();
    const isInvisible = userIndex < visibleStartIndex || userIndex > visibleEndIndex;

    if (isInvisible) {
      this.listRef.current.scrollTo(userIndex);
    }
  }

  /**
   * Select the user if not already selected.
   * @param user An user
   */
  async selectUserIfNotAlreadySelected(user) {
    const [selectedUser] = this.props.userWorkspaceContext.selectedUsers;
    const isUserNotAlreadySelected = !selectedUser || selectedUser.id !== user.id;
    if (isUserNotAlreadySelected) {
      await this.selectUser(user);
    }
  }

  /**
   * Render the users table
   * @param items Items to display
   * @param ref The table element reference
   * @returns {JSX.Element}
   */
  renderTable(items, ref) {
    const tableStyle = {
      MozUserSelect: "none",
      WebkitUserSelect: "none",
      msUserSelect: "none"
    };
    return (
      <table style={tableStyle}>
        <tbody ref={ref}>
          {items}
        </tbody>
      </table>
    );
  }

  /**
   * Check if the grid is sorted for a given column
   * @param column The column name
   */
  isSortedColumn(column) {
    return this.props.userWorkspaceContext.sorter.propertyName === column;
  }

  /**
   * Check if the sort is ascendant.
   * @returns {boolean}
   */
  isSortedAsc() {
    return this.props.userWorkspaceContext.sorter.asc;
  }

  renderItem(index, key) {
    const user = this.users[index];
    const isSelected = this.isUserSelected(user);
    const serverTimezone = this.context.siteSettings.getServerTimezone();
    const modifiedFormatted = moment.tz(user.modified, serverTimezone).fromNow();
    const lastLoggedInFormatted = user.last_logged_in ? moment.tz(user.last_logged_in, serverTimezone).fromNow() : "";
    const rowClassName = `${isSelected ? "selected" : ""} ${user.active ? "" : "inactive"}`;

    return (
      <tr
        id={`user_${user.id}`} key={key}
        className={rowClassName}
        onClick={event => this.handleUserSelected(event, user)}
        onContextMenu={event => this.handleUserRightClick(event, user)}>
        <td
          className="cell_multipleSelect selections s-cell"
          onClick={ev => this.handleCheckboxWrapperClick(ev, user)}>
          <div className="ready">
            <div className="input checkbox">
              <input type="checkbox" id={`checkbox_multiple_select_checkbox_${user.id}`} checked={isSelected} readOnly={true}/>
              <label htmlFor={`checkbox_multiple_select_checkbox_${user.id}`}></label>
            </div>
          </div>
        </td>
        <td className="cell_name m-cell uri">
          <div title={user.name}>
            {`${user.profile.first_name} ${user.profile.last_name}`}
          </div>
        </td>
        <td className="cell_username m-cell username">
          <div title={user.username}>
            {user.username}
          </div>
        </td>
        <td className="cell_modified m-cell">
          <div title={user.modified}>
            {modifiedFormatted}
          </div>
        </td>
        <td className="cell_last_logged_in m-cell">
          <div title={user.last_logged_in}>
            {lastLoggedInFormatted}
          </div>
        </td>
      </tr>
    );
  }

  /**
   * Renders the component
   */
  render() {
    const isReady = this.users !== null;
    const isEmpty = isReady && this.users.length === 0;
    const filterType = this.props.userWorkspaceContext.filter.type;

    return (
      <div className={`tableview ready ${isEmpty ? "empty" : ""}`}>
        {!isReady &&
        <div className="empty-content">
        </div>
        }
        {isReady &&
        <React.Fragment>
          {isEmpty &&
          (filterType === UserWorkspaceFilterTypes.TEXT || filterType === UserWorkspaceFilterTypes.RECENTLY_MODIFIED) &&
          <div className="empty-content">
            <h2>None of the users matched this search.</h2>
            <p>Try another search or use the left panel to navigate into your organization.</p>
          </div>
          }
          {isEmpty &&  filterType === UserWorkspaceFilterTypes.GROUP &&
          <div className="empty-content">
            <h2>No passwords are shared with this group yet.</h2>
            <p>Share a password with this group or wait for a team member to share one with this group.</p>
          </div>
          }
          {!isEmpty &&
          <React.Fragment>
            <div className="tableview-header">
              <table>
                <thead>
                  <tr>
                    <th className="cell_multipleSelect selections s-cell">
                      <div className="input checkbox">
                        <input
                          type="checkbox"
                          name="select all"/>
                        <label htmlFor="js-passwords-select-all">select all</label>
                      </div>
                    </th>
                    <th className="cell_name m-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "name")}>
                        Name
                        {this.isSortedColumn("name") && this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-up"/>
                        }
                        {this.isSortedColumn("name") && !this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-down"/>
                        }
                      </a>
                    </th>
                    <th className="cell_username m-cell username sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "username")}>
                        Username
                        {this.isSortedColumn("username") && this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-up"/>
                        }
                        {this.isSortedColumn("username") && !this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-down"/>
                        }
                      </a>
                    </th>
                    <th className="cell_modified m-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "modified")}>
                        Modified
                        {this.isSortedColumn("modified") && this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-up"/>
                        }
                        {this.isSortedColumn("modified") && !this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-down"/>
                        }
                      </a>
                    </th>
                    <th className="cell_last_logged_in m-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "last_logged_in")}>
                        Last logged in
                        {this.isSortedColumn("last_logged_in") && this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-up"/>
                        }
                        {this.isSortedColumn("last_logged_in") && !this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-down"/>
                        }
                      </a>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tableview-content scroll">
              <ReactList
                itemRenderer={(index, key) => this.renderItem(index, key)}
                itemsRenderer={(items, ref) => this.renderTable(items, ref)}
                length={this.users.length}
                pageSize={20}
                type="uniform"
                ref={this.listRef}>
              </ReactList>
            </div>
          </React.Fragment>
          }
        </React.Fragment>
        }
      </div>
    );
  }
}

DisplayUsers.contextType = AppContext;

DisplayUsers.propTypes = {
  userWorkspaceContext: PropTypes.any, // The user workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  contextualMenuContext: PropTypes.any, // The contextual menu context
};

export default withRouter(withActionFeedback(withContextualMenu(withUserWorkspace(DisplayUsers))));
