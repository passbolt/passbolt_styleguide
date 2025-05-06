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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withRouter} from "react-router-dom";
import {withContextualMenu} from "../../../contexts/ContextualMenuContext";
import {UserWorkspaceFilterTypes, withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import DisplayUsersContextualMenu from "../DisplayUsersContextualMenu/DisplayUsersContextualMenu";
import {Trans, withTranslation} from "react-i18next";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";
import {isUserSuspended} from "../../../../shared/utils/userUtils";
import ColumnCheckboxModel from "../../../../shared/models/column/ColumnCheckboxModel";
import CellCheckbox from "../../../../shared/components/Table/CellChecbox";
import CellHeaderCheckbox from "../../../../shared/components/Table/CellHeaderCheckbox";
import CellHeaderDefault from "../../../../shared/components/Table/CellHeaderDefault";
import ColumnModifiedModel from "../../../../shared/models/column/ColumnModifiedModel";
import CellDate from "../../../../shared/components/Table/CellDate";
import GridTable from "../../../../shared/components/Table/GridTable";
import CellUserProfile from "../../../../shared/components/Table/CellUserProfile";
import ColumnUserUsernameModel from "../../../../shared/models/column/ColumnUserUsernameModel";
import CellUserRole from "../../../../shared/components/Table/CellUserRole";
import ColumnUserRoleModel from "../../../../shared/models/column/ColumnUserRoleModel";
import ColumnUserProfileModel from "../../../../shared/models/column/ColumnUserProfileModel";
import ColumnUserSuspendedModel from "../../../../shared/models/column/ColumnUserSuspendedModel";
import ColumnUserLastLoggedInModel from "../../../../shared/models/column/ColumnUserLastLoggedInModel";
import ColumnUserMfaModel from "../../../../shared/models/column/ColumnUserMfaModel";
import CellUserSuspended from "../../../../shared/components/Table/CellUserSuspended";
import CellUserMfa from "../../../../shared/components/Table/CellUserMfa";
import ColumnUserAccountRecoveryModel from "../../../../shared/models/column/ColumnUserAccountRecoveryModel";
import CellUserAccountRecovery from "../../../../shared/components/Table/CellUserAccountRecovery";
import ColumnsUserSettingCollection from "../../../../shared/models/entity/user/columnsUserSettingCollection";
import ColumnModel from "../../../../shared/models/column/ColumnModel";
import CircleOffSVG from "../../../../img/svg/circle_off.svg";

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
    // The grid columns
    this.defaultColumns = [];
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createRefs();
  }

  /**
   * Returns the component default state
   */
  getDefaultState() {
    return {
      columns: [], // The current list of columns to display.
    };
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleUserSelected = this.handleUserSelected.bind(this);
    this.handleUserRightClick = this.handleUserRightClick.bind(this);
    this.handleCheckboxWrapperClick = this.handleCheckboxWrapperClick.bind(this);
    this.handleSortByColumnClick = this.handleSortByColumnClick.bind(this);
    this.isRowInactive = this.isRowInactive.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.listRef = React.createRef();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.props.accountRecoveryContext.loadAccountRecoveryPolicy();
    this.initColumns();
    this.mergeAndSortColumns();
  }

  /**
   * Whenever the component has been updated
   */
  componentDidUpdate() {
    this.handleUserScroll();
  }

  /**
   * Init the grid columns.
   */
  initColumns() {
    this.defaultColumns.push(new ColumnCheckboxModel({cellRenderer: {component: CellCheckbox, props: {onClick: this.handleCheckboxWrapperClick}}, headerCellRenderer: {component: CellHeaderCheckbox, props: {disabled: true}}}));
    this.defaultColumns.push(new ColumnUserProfileModel({cellRenderer: {component: CellUserProfile, props: {hasAttentionRequiredFeature: this.hasAttentionRequiredColumn}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Name")}}}));
    this.defaultColumns.push(new ColumnUserUsernameModel({headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Username")}}}));
    this.defaultColumns.push(new ColumnUserRoleModel({cellRenderer: {component: CellUserRole}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Role")}}}));
    if (this.hasSuspendedColumn) {
      this.defaultColumns.push(new ColumnUserSuspendedModel({cellRenderer: {component: CellUserSuspended}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Suspended")}}}));
    }
    this.defaultColumns.push(new ColumnModifiedModel({cellRenderer: {component: CellDate, props: {locale: this.props.context.locale, t: this.props.t}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Modified")}}}));
    this.defaultColumns.push(new ColumnUserLastLoggedInModel({cellRenderer: {component: CellDate, props: {locale: this.props.context.locale, t: this.props.t}}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Last logged in")}}}));
    if (this.hasMfaColumn) {
      this.defaultColumns.push(new ColumnUserMfaModel({cellRenderer: {component: CellUserMfa}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("MFA")}}}));
    }
    if (this.hasAccountRecoveryColumn) {
      this.defaultColumns.push(new ColumnUserAccountRecoveryModel({cellRenderer: {component: CellUserAccountRecovery}, headerCellRenderer: {component: CellHeaderDefault, props: {label: this.translate("Account recovery")}}}));
    }
  }

  /**
   * Merge and sort columns
   */
  mergeAndSortColumns() {
    // Get the column with id as a key from the column to merge
    const columnsUserSetting = this.columnsUserSetting.toHashTable();
    // Merge the column values
    const columns = this.defaultColumns.map(column => Object.assign(new ColumnModel(column), columnsUserSetting[column.id]));
    // Sort the position of the column, the column with no position will be at the beginning
    columns.sort((columnA, columnB) => (columnA.position || 0) < (columnB.position || 0) ? -1 : 1);
    this.setState({columns});
  }

  /**
   * Handles the user scroll ( with a specific manual user url /users/view/:id )
   */
  handleUserScroll() {
    const userToScroll = this.props.userWorkspaceContext.scrollTo.user;
    const hasNotEmptyRange = this.listRef.current?.getVisibleRange().some(value => value);
    if (userToScroll && hasNotEmptyRange) {
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
   * @param sortProperty The user property to sort on
   */
  async handleSortByColumnClick(sortProperty) {
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
   * get columns user setting
   * @return {ColumnsSettingCollection}
   */
  get columnsUserSetting() {
    return ColumnsUserSettingCollection.DEFAULT;
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
  get isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Returns true if the accountRecovery feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  get hasAttentionRequiredColumn() {
    return this.props.context.siteSettings.canIUse("accountRecovery") && this.isLoggedInUserAdmin;
  }

  /**
   * Returns true if the mfa feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  get hasMfaColumn() {
    return this.props.context.siteSettings.canIUse("multiFactorAuthentication") && this.isLoggedInUserAdmin;
  }

  /**
   * Returns true if the suspended user feature is enabled.
   * @returns {boolean}
   */
  get hasSuspendedColumn() {
    return this.props.context.siteSettings.canIUse('disableUser') && this.isLoggedInUserAdmin;
  }

  /**
   * Returns true if the accountRecovery feature is enabled and if the logged in user is an admin.
   * @returns {boolean}
   */
  get hasAccountRecoveryColumn() {
    return this.props.context.siteSettings.canIUse("accountRecovery")
      && this.isLoggedInUserAdmin
      && this.props.accountRecoveryContext.isPolicyEnabled();
  }

  /**
   * Get selected users ids
   * @return {*}
   */
  get selectedUsersIds() {
    const getIds = user => user.id;
    return this.selectedUsers.map(getIds);
  }

  /**
   * Is row inactive
   * @param user
   * @returns {boolean}
   */
  isRowInactive(user) {
    return !user.active || (this.hasSuspendedColumn && isUserSuspended(user));
  }

  /**
   * Get the columns to display
   * @return {[]}
   */
  get columnsFiltered() {
    const filteredByColumnToDisplay = column => column.id === 'checkbox' || column.show;
    return this.state.columns.filter(filteredByColumnToDisplay);
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
    const isGridReady = isReady && this.users.length !== 0 && this.columnsFiltered.length !== 0;

    return (
      <>
        {!isReady &&
          <div className="tableview empty">
            <div className="empty-content">
            </div>
          </div>
        }
        {isEmpty &&
          <div className="tableview empty">
            {filterType === UserWorkspaceFilterTypes.TEXT &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>None of the users matched this search.</Trans></h1>
                  <p className="try-another-search"><Trans>Try another search or use the left panel to navigate into
                    your organization.</Trans></p>
                </div>
              </div>
            }
            {filterType === UserWorkspaceFilterTypes.SUSPENDED_USER &&
              <div className="empty-content">
                <CircleOffSVG/>
                <div className="message">
                  <h1><Trans>There is no users.</Trans></h1>
                  <p className="try-another-filter"><Trans>You could remove some filters.</Trans></p>
                </div>
              </div>
            }
          </div>
        }
        {isGridReady &&
          <GridTable
            columns={this.columnsFiltered}
            rows={this.users}
            sorter={this.props.userWorkspaceContext.sorter}
            onSortChange={this.handleSortByColumnClick}
            onRowClick={this.handleUserSelected}
            onRowContextMenu={this.handleUserRightClick}
            selectedRowsIds={this.selectedUsersIds}
            isRowInactive={this.isRowInactive}
            rowsRef={this.listRef}>
          </GridTable>
        }
      </>
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
