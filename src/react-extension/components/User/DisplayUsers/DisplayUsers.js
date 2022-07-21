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
import {withAppContext} from "../../../contexts/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withRouter} from "react-router-dom";
import {withContextualMenu} from "../../../contexts/ContextualMenuContext";
import {UserWorkspaceFilterTypes, withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import DisplayUsersContextualMenu from "../DisplayUsersContextualMenu/DisplayUsersContextualMenu";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";


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
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.props.accountRecoveryContext.loadAccountRecoveryPolicy();
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
    /*
     * We want the td to extend the clickable area of the checkbox.
     * If we propagate the event, the tr will listen to the click and select only the clicked row.
     */
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

  /**
   * Check if the logged in user is admin
   * @return {boolean}
   */
  isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Returns true if the accountRecovery feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  hasAttentionRequiredColumn() {
    return this.props.context.siteSettings.canIUse("accountRecovery") && this.isLoggedInUserAdmin();
  }

  /**
   * Returns true if the mfa feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  hasMfaColumn() {
    return this.props.context.siteSettings.canIUse("multiFactorAuthentication") && this.isLoggedInUserAdmin();
  }

  /**
   * Returns true if the accountRecovery feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  hasAccountRecoveryColumn() {
    return this.props.context.siteSettings.canIUse("accountRecovery")
      && this.isLoggedInUserAdmin()
      && this.props.accountRecoveryContext.isPolicyEnabled();
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string} The formatted date
   */
  formatDateTimeAgo(date) {
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  renderItem(index, key) {
    const user = this.users[index];
    const isSelected = this.isUserSelected(user);
    const modifiedFormatted = this.formatDateTimeAgo(user.modified);
    const lastLoggedInFormatted = user.last_logged_in ? this.formatDateTimeAgo(user.last_logged_in) : "";
    const roleName = this.props.userWorkspaceContext.getTranslatedRoleName(user.role_id);
    const mfa = user.is_mfa_enabled ? this.translate("Enabled") : this.translate("Disabled");
    const rowClassName = `${isSelected ? "selected" : ""} ${user.active ? "" : "inactive"}`;
    const hasUserAttentionRequired = Boolean(user.pending_account_recovery_request);

    return (
      <tr
        id={`user_${user.id}`} key={key}
        className={rowClassName}
        onClick={event => this.handleUserSelected(event, user)}
        onContextMenu={event => this.handleUserRightClick(event, user)}>
        <td className="cell-multiple-select selections s-cell">
          <div className="input checkbox">
            <input type="checkbox" id={`checkbox_multiple_select_checkbox_${user.id}`} checked={isSelected} readOnly={true} onClick={ev => this.handleCheckboxWrapperClick(ev, user)}/>
            <span className="visually-hidden"><Trans>Select user</Trans></span>
          </div>
        </td>
        {this.hasAttentionRequiredColumn() &&
          <td className="s-cell attention-required">
            {hasUserAttentionRequired &&
            <Icon name="exclamation" baseline={true}/>
            }
          </td>
        }
        <td className="cell-name l-cell">
          <div title={`${user.profile.first_name} ${user.profile.last_name}`}>
            {`${user.profile.first_name} ${user.profile.last_name}`}
          </div>
        </td>
        <td className="cell-username l-cell username">
          <div title={user.username}>
            {user.username}
          </div>
        </td>
        <td className="cell-role m-cell role">
          <div title={roleName}>
            {roleName}
          </div>
        </td>
        <td className="cell-modified m-cell">
          <div title={user.modified}>
            {modifiedFormatted}
          </div>
        </td>
        <td className="cell-last_logged_in m-cell">
          <div title={user.last_logged_in}>
            {lastLoggedInFormatted}
          </div>
        </td>
        {this.hasMfaColumn() &&
        <td className="cell-is_mfa_enabled m-cell">
          <div>
            {mfa}
          </div>
        </td>
        }
        {this.hasAccountRecoveryColumn() &&
        <td className="cell-is_account_recovery_enabled m-cell">
          <div>
            {{
              "approved": <Trans>Approved</Trans>,
              "rejected": <Trans>Rejected</Trans>,
              [undefined]: <Trans>Pending</Trans>,
            }[user?.account_recovery_user_setting?.status]}
          </div>
        </td>
        }
      </tr>
    );
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
           filterType === UserWorkspaceFilterTypes.TEXT &&
          <div className="empty-content">
            <h2><Trans>None of the users matched this search.</Trans></h2>
            <p className="try-another-search"><Trans>Try another search or use the left panel to navigate into your organization.</Trans></p>
          </div>
          }
          {!isEmpty &&
          <React.Fragment>
            <div className="tableview-header">
              <table>
                <thead>
                  <tr>
                    <th className="cell-multiple-select selections s-cell">
                      <div className="input checkbox">
                        <input type="checkbox" name="select all" checked={false} readOnly={true}/>
                        <span className="visually-hidden"><Trans>Select all</Trans></span>
                      </div>
                    </th>
                    {this.hasAttentionRequiredColumn() &&
                    <th className="s-cell attention-required">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "attentionRequired")}>
                        <div className="cell-header">
                          <span className="cell-header-text">
                            <Icon name="exclamation" baseline={true}/>
                          </span>
                          <span className="cell-header-icon-sort">
                            {this.isSortedColumn("attentionRequired") && this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-up"/>
                            }
                            {this.isSortedColumn("attentionRequired") && !this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-down"/>
                            }
                          </span>
                        </div>
                      </a>
                    </th>
                    }
                    <th className="cell-name l-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "name")}>
                        <div className="cell-header">
                          <span className="cell-header-text">
                            <Trans>Name</Trans>
                          </span>
                          <span className="cell-header-icon-sort">
                            {this.isSortedColumn("name") && this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-up"/>
                            }
                            {this.isSortedColumn("name") && !this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-down"/>
                            }
                          </span>
                        </div>
                      </a>
                    </th>
                    <th className="cell-username l-cell username sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "username")}>
                        <div className="cell-header">
                          <span className="cell-header-text">
                            <Trans>Username</Trans>
                          </span>
                          <span className="cell-header-icon-sort">
                            {this.isSortedColumn("username") && this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-up"/>
                            }
                            {this.isSortedColumn("username") && !this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-down"/>
                            }
                          </span>
                        </div>
                      </a>
                    </th>
                    <th className="cell-role m-cell role sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "role.name")}>
                        <div className="cell-header">
                          <span className="cell-header-text">
                            <Trans>Role</Trans>
                          </span>
                          <span className="cell-header-icon-sort">
                            {this.isSortedColumn("role.name") && this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-up"/>
                            }
                            {this.isSortedColumn("role.name") && !this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-down"/>
                            }
                          </span>
                        </div>
                      </a>
                    </th>
                    <th className="cell-modified m-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "modified")}>
                        <div className="cell-header">
                          <span className="cell-header-text">
                            <Trans>Modified</Trans>
                          </span>
                          <span className="cell-header-icon-sort">
                            {this.isSortedColumn("modified") && this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-up"/>
                            }
                            {this.isSortedColumn("modified") && !this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-down"/>
                            }
                          </span>
                        </div>
                      </a>
                    </th>
                    <th className="cell-last_logged_in m-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "last_logged_in")}>
                        <div className="cell-header">
                          <span className="cell-header-text">
                            <Trans>Last logged in</Trans>
                          </span>
                          <span className="cell-header-icon-sort">
                            {this.isSortedColumn("last_logged_in") && this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-up"/>
                            }
                            {this.isSortedColumn("last_logged_in") && !this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-down"/>
                            }
                          </span>
                        </div>
                      </a>

                    </th>
                    {this.hasMfaColumn() &&
                      <th className="cell-is_mfa_enabled m-cell sortable">
                        <a onClick={ev => this.handleSortByColumnClick(ev, "is_mfa_enabled")}>
                          <div className="cell-header">
                            <span className="cell-header-text">
                              <Trans>MFA</Trans>
                            </span>
                            <span className="cell-header-icon-sort">
                              {this.isSortedColumn("is_mfa_enabled") && this.isSortedAsc() &&
                              <Icon baseline={true} name="caret-up"/>
                              }
                              {this.isSortedColumn("is_mfa_enabled") && !this.isSortedAsc() &&
                              <Icon baseline={true} name="caret-down"/>
                              }
                            </span>
                          </div>
                        </a>
                      </th>
                    }
                    {this.hasAccountRecoveryColumn() &&
                    <th className="cell-account_recovery_user_setting_status m-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "account_recovery_user_setting.status")}>
                        <div className="cell-header">
                          <span className="cell-header-text">
                            <Trans>Account recovery</Trans>
                          </span>
                          <span className="cell-header-icon-sort">
                            {this.isSortedColumn("account_recovery_user_setting.status") && this.isSortedAsc() &&
                              <Icon baseline={true} name="caret-up"/>
                            }
                            {this.isSortedColumn("account_recovery_user_setting.status") && !this.isSortedAsc() &&
                            <Icon baseline={true} name="caret-down"/>
                            }
                          </span>
                        </div>
                      </a>
                    </th>
                    }
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
                minSize={20}
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

DisplayUsers.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.any, // The user workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  contextualMenuContext: PropTypes.any, // The contextual menu context
  accountRecoveryContext: PropTypes.object, // The account recovery context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withActionFeedback(withContextualMenu(withUserWorkspace(withAccountRecovery(withTranslation('common')(DisplayUsers)))))));
