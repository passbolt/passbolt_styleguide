
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */

import * as React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import {withLoading} from "./LoadingContext";
import {withActionFeedback} from "./ActionFeedbackContext";
import EditUserGroup from "../components/UserGroup/EditUserGroup/EditUserGroup";
import {withDialog} from "./DialogContext";
import {DateTime} from "luxon";
import {withTranslation} from "react-i18next";
import {isUserSuspended, isAccountRecoveryRequested, isMissingMetadataKey} from "../../shared/utils/userUtils";
import {withRbac} from "../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../shared/services/rbacs/uiActionEnumeration";
import {withRoles} from "./RoleContext";
import RolesCollection from "../../shared/models/entity/role/rolesCollection";

/**
 * Context related to users ( filter, current selections, etc.)
 */
export const UserWorkspaceContext = React.createContext({
  filter: {
    type: null, // Filter type
    payload: null // Filter payload
  },
  sorter: {
    propertyName: 'user', // The name of the property to sort on
    asc: false // True if the sort must be descendant
  },
  filteredUsers: [], // The current list of filtered users
  selectedUsers: [], // The current list of selected users
  details: {
    user: null, // The user to focus details on
    group: null, // The user group to focus details on
    locked: true // The details display is locked
  },
  scrollTo: {
    user: null // The user to scroll to
  },
  groupToEdit: null, // The group to edit
  isAccessAllowed: () => {}, // is the current user allowed to access the user workspace
  onUserScrolled: () => {}, // Whenever one scrolled to a user
  onDetailsLocked: () => {}, // Lock or unlock detail  (hide or display the group or user details)
  onSorterChanged: () => {}, // Whenever the sorter changed
  onUserSelected: {
    single: () => {}, // Whenever a single user has been selected
    none: () => {} // Whenever none users have been selected
  },
  onRefreshSelectedUsers:  () => {}, // Whenever a component request to refresh the selected users
  onGroupToEdit: () => {}, // Whenever a group will be edited
  shouldDisplaySuspendedUsersFilter: () => {}, // returns true if the 'Suspended user' filter should be displayed in the UI
});

/**
 * The related context provider
 */
class UserWorkspaceContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initializeProperties();
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      filter: {type: UserWorkspaceFilterTypes.NONE}, // The current user search filter
      sorter: {
        propertyName: 'modified', // The name of the property to sort on
        asc: false // True if the sort must be descendant
      },
      filteredUsers: [], // The current list of filtered users
      selectedUsers: [], // The current list of selected users
      details: {
        user: null, // The user to focus details on
        group: null, // The group to focus details on
        locked: true // The details display is locked
      },
      scrollTo: {
        user: null // The user to scroll to
      },
      groupToEdit: null, // The group to edit
      isAccessAllowed: this.isAccessAllowed.bind(this), // is the current user allowed to access the user workspace
      getTranslatedRoleName: this.getTranslatedRoleName.bind(this), // Tools to retrieve a user translated role name
      onUserScrolled: this.handleUserScrolled.bind(this), // Whenever one scrolled to a user
      onDetailsLocked: this.handleDetailsLocked.bind(this), // Lock or unlock detail  (hide or display the group or user details)
      onSorterChanged: this.handleSorterChange.bind(this), // Whenever the sorter changed
      onUserSelected: {
        single: this.handleUserSelected.bind(this), // Whenever a single user has been selected
        none: this.handleNoneUsersSelected.bind(this), // Whenever none users have been selected
      },
      onGroupToEdit: this.handleGroupToEdit.bind(this), // Whenever a group will be edited
      onRefreshSelectedUsers:  this.handleRefreshSelectedUsers.bind(this), // Whenever a component request to refresh the selected users
      isAttentionRequired: this.isAttentionRequired.bind(this), // Whenever a user needs attention
      shouldDisplaySuspendedUsersFilter: this.shouldDisplaySuspendedUsersFilter.bind(this), // returns true if the 'Suspended user' filter should be displayed in the UI
    };
  }

  /**
   * Initialize class properties out of the state ( for performance purpose )
   * @returns {void}
   */
  initializeProperties() {
    this.users = null; // A cache of the last known list of users from the App context
    this.groups = []; // A cache of the last known list of groups from the App context
    this.routeLocationKey = null; // The current route location key being resolved, it will be used to avoid double execution of the route change handler.
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    if (this.isAccessAllowed()) {
      this.populate();
      this.handleUsersWaitedFor();
    }
  }

  /**
   * Returns true if the current user allowed to access the user workspace
   * @returns {boolean}
   */
  isAccessAllowed() {
    return this.props.rbacContext.canIUseAction(uiActions.USERS_VIEW_WORKSPACE);
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  async componentDidUpdate(prevProps, prevState) {
    await this.handleFilterChange(prevState.filter);
    this.handleUsersLoaded();
    await this.handleUsersChange();
    await this.handleGroupsChange();
    await this.handleRouteChange(prevProps.location);
  }

  /**
   * Handles the user search filter change
   * @param {Object} previousFilter
   */
  async handleFilterChange(previousFilter) {
    const hasFilterChanged = previousFilter !== this.state.filter;
    if (hasFilterChanged) {
      // Avoid a side-effect whenever one inputs a specific user url (it unselect the user otherwise )
      const isNotNonePreviousFilter = previousFilter.type !== UserWorkspaceFilterTypes.NONE;
      if (isNotNonePreviousFilter) {
        this.populate();
        await this.unselectAll();
      }
    }
  }

  /**
   * Handle the users changes
   * @returns {void}
   */
  async handleUsersChange() {
    const hasUsersChanged = this.props.context.users && this.props.context.users !== this.users;
    if (hasUsersChanged) {
      this.users = this.props.context.users;
      await this.search(this.state.filter);
      await this.updateDetails();
      await this.unselectUsersNotFiltered();
    }
  }

  /**
   * Handle the groups change
   * @returns {void}
   */
  async handleGroupsChange() {
    const hasGroupsChanged = this.props.context.groups && this.props.context.groups !== this.groups;
    if (hasGroupsChanged) {
      this.groups = this.props.context.groups;
      await this.refreshSearchFilter();
      await this.updateDetails();
    }
  }

  /**
   * Handle the refresh of selected users, to retrieve updated users during action
   * @returns {void}
   */
  handleRefreshSelectedUsers() {
    const selectedUserIds = new Set(this.state.selectedUsers.map(user => user.id));
    const selectedUsers = this.props.context.users.filter(user => selectedUserIds.has(user.id));
    this.setState({selectedUsers});
  }

  /**
   * Handle the route location change
   * @param previousLocation Previous router location
   */
  async handleRouteChange(previousLocation) {
    const hasLocationChanged = this.props.location.key !== previousLocation.key; // Did the route change as per react-dom-router
    /*
     * Multiple componentDidUpdate can be triggered with the same route change.
     * Avoid this by storing and checking the last route key change resolved by the component.
     * @deprecated to removed with react-router-dom v6.1.0 @see https://github.com/supasate/connected-react-router/issues/129#issuecomment-446212160
     */
    const hasLocationChangedRouter5 = this.props.location.key !== this.routeLocationKey;
    this.routeLocationKey = this.props.location.key;
    const isAppFirstLoad = this.state.filter.type === UserWorkspaceFilterTypes.NONE;

    if ((hasLocationChanged && hasLocationChangedRouter5) || isAppFirstLoad) {
      await this.handleGroupRouteChange();
      await this.handleUserRouteChange();
    }
  }

  /**
   * Handle the group view route change
   *  E.g. /groups/view/:selectedGroupId
   */
  async handleGroupRouteChange() {
    const hasUsersAndGroups = this.users !== null && this.groups !== null;
    if (hasUsersAndGroups) {
      const groupId = this.props.match.params.selectedGroupId;
      if (groupId && this.props.context.groups) {
        const group = this.props.context.groups.find(group => group.id === groupId);
        if (group) { // Known group
          await this.search({type: UserWorkspaceFilterTypes.GROUP, payload: {group}});
          await this.detailGroup(group);

          // Case of edit path
          const isEditRoute = this.props.location.pathname.includes('edit');
          if (isEditRoute) {
            await this.updateGroupToEdit(group);
            this.props.dialogContext.open(EditUserGroup);
          }
        } else { // Unknown group
          this.handleUnknownGroup();
        }
      }
    }
  }

  /**
   * Handle the user view route change
   */
  async handleUserRouteChange() {
    const isUserLocation = this.props.location.pathname.includes('users')
      || this.props.location.pathname.includes('account-recovery-requests/review');

    if (isUserLocation) {
      const userId = this.props.match.params.selectedUserId;
      if (userId) { // Case of user view
        await this.handleSingleUserRouteChange(userId);
      } else { // Case of all and applied filters
        await this.handleAllUserRouteChange();
      }
    }
  }

  /**
   * Handle the user view route change with a user id
   * E.g. /users/view/:userId
   */
  async handleSingleUserRouteChange(userId) {
    const hasUsers = this.users !== null;
    if (hasUsers) {
      const user = this.users.find(user => user.id === userId);
      const hasNoneFilter = this.state.filter.type === UserWorkspaceFilterTypes.NONE;
      if (hasNoneFilter) { // Case of user view by url bar inputting
        await this.search({type: UserWorkspaceFilterTypes.ALL});
      }
      // If the user does not exist, it should display an error
      if (user) {
        await this.selectFromRoute(user);
        await this.scrollTo(user);
        await this.detailUser(user);
      } else {
        this.handleUnknownUser();
      }
    }
  }

  /**
   * Handle the user view route change without a user id in the path
   * E.g. /password
   */
  async handleAllUserRouteChange() {
    const hasUsers = this.users !== null;
    if (hasUsers) {
      const filter = this.props.location.state?.filter || {type: UserWorkspaceFilterTypes.ALL};
      await this.search(filter);
      await this.detailNothing();
    }
  }

  /**
   * Handle the lock detail display
   */
  async handleDetailsLocked() {
    await this.lockDetails();
  }

  /**
   * Handle an unknown user ( passe by route parameter user identifier )
   */
  handleUnknownUser() {
    this.props.actionFeedbackContext.displayError("The user does not exist");
    this.props.history.push({pathname: "/app/users"});
  }

  /**
   * Handle an unknown user ( passe by route parameter user identifier )
   */
  handleUnknownGroup() {
    this.props.actionFeedbackContext.displayError("The group does not exist");
    this.props.history.push({pathname: "/app/users"});
  }

  /**
   * Handle the scrolling of a user
   */
  async handleUserScrolled() {
    await this.scrollNothing();
  }

  /**
   * Handle the change of sorter ( on property or direction )
   * @param {string} propertyName The name of the property to sort on
   */
  async handleSorterChange(propertyName) {
    await this.updateSorter(propertyName);
    await this.sort();
  }

  /**
   * Handle the single user selection
   * @param {User} user The selected user
   */
  async handleUserSelected(user) {
    await this.select(user);
    this.redirectAfterSelection();
  }

  /**
   * Handle the single user selection
   */
  async handleNoneUsersSelected() {
    await this.unselectAll();
    await this.detailNothing();
  }

  /**
   * Handle the will to edit a group
   * @param group
   */
  async handleGroupToEdit(group) {
    await this.updateGroupToEdit(group);
  }

  /**
   * Handle the wait for the initial user to be loaded
   */
  handleUsersWaitedFor() {
    this.props.loadingContext.add();
  }

  /**
   * Handle the intial loading of the users
   */
  handleUsersLoaded() {
    const hasUsersBeenInitialized = this.users === null && this.props.context.users;
    if (hasUsersBeenInitialized) {
      this.props.loadingContext.remove();
      this.handleUsersLoaded = () => {};
    }
  }

  /**
   * Returns true if the given user requires attention from an admin.
   * @param {User} user
   * @returns {Boolean}
   */
  isAttentionRequired(user) {
    return Boolean(user.pending_account_recovery_request) || user.missing_metadata_key_ids?.length > 0;
  }

  /**
   * Populate the context with initial data such as users and groups
   */
  populate() {
    this.props.context.port.request("passbolt.users.update-local-storage");
    this.props.context.port.request("passbolt.groups.update-local-storage");
  }

  /** USER SEARCH  **/

  /**
   * Search for the users which matches the given filter and sort them
   * @param {Object} filter
   */
  async search(filter) {
    const isRecentlyModifiedFilter = filter.type === UserWorkspaceFilterTypes.RECENTLY_MODIFIED;
    const searchOperations = {
      [UserWorkspaceFilterTypes.GROUP]: this.searchByGroup.bind(this),
      [UserWorkspaceFilterTypes.TEXT]: this.searchByText.bind(this),
      [UserWorkspaceFilterTypes.RECENTLY_MODIFIED]: this.searchByRecentlyModified.bind(this),
      [UserWorkspaceFilterTypes.SUSPENDED_USER]: this.searchBySuspendedUsers.bind(this),
      [UserWorkspaceFilterTypes.ALL]: this.searchAll.bind(this),
      [UserWorkspaceFilterTypes.NONE]: () => { /* No search */ },
      [UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST]: this.searchByAccountRecoveryRequestUsers.bind(this),
      [UserWorkspaceFilterTypes.MISSING_METADATA_KEY]: this.searchByMissingMetadataKeyUsers.bind(this),
    };
    await searchOperations[filter.type](filter);
    if (!isRecentlyModifiedFilter) {
      await this.sort();
    } else {
      await this.resetSorter();
    }
  }

  /**
   * All filter ( no filter at all )
   * @param {string} filter The All filter
   */
  async searchAll(filter) {
    this.setState({filter, filteredUsers: this.users});
  }

  /**
   * Filter the users which belongs to the given group
   * @param {string} filter The group filter
   */
  async searchByGroup(filter) {
    const group = filter.payload.group;
    const usersGroupIds = group.groups_users.map(groupUser => groupUser.user_id);
    const filteredUsers = this.users.filter(user => usersGroupIds.some(userId => userId === user.id));
    this.setState({filter, filteredUsers});
  }

  /**
   * Filter the users which textual properties matched some user text words
   * @param {string} filter A textual filter
   */
  async searchByText(filter) {
    const text = filter.payload;
    const words =  (text && text.split(/\s+/)) || [''];

    // Test match of some escaped test words against the name / username
    const escapeWord = word =>  word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordToRegex = word =>  new RegExp(escapeWord(word), 'i');
    const matchWord = (word, value) => wordToRegex(word).test(value);

    const matchUsernameProperty = (word, user) => matchWord(word, user.username);
    const matchNameProperty = (word, user) =>  matchWord(word, user.profile.first_name) || matchWord(word, user.profile.last_name);
    const matchUser = (word, user) => matchUsernameProperty(word, user) || matchNameProperty(word, user);
    const matchText = user => words.every(word => matchUser(word, user));

    const filteredUsers = this.users.filter(matchText);
    this.setState({filter, filteredUsers});
  }

  /**
   * Keep the most recently modified users ( current state: just sort everything with the most recent modified users )
   * @param {string} filter A recently modified filter
   */
  async searchByRecentlyModified(filter) {
    const recentlyModifiedSorter = (user1, user2) => DateTime.fromISO(user2.modified) < DateTime.fromISO(user1.modified) ? -1 : 1;
    const filteredUsers = this.users.sort(recentlyModifiedSorter);
    this.setState({filter, filteredUsers});
  }

  /**
   * Keep only the currently suspended users
   * @param {string} filter A suspended users filter
   */
  async searchBySuspendedUsers(filter) {
    const filteredUsers = this.users.filter(u => isUserSuspended(u));
    this.setState({filter, filteredUsers});
  }

  /**
   * Keep only the users who have account recovery requests
   * @param {string} filter A account recovery request users filter
   */
  async searchByAccountRecoveryRequestUsers(filter) {
    const filteredUsers = this.users.filter(user => isAccountRecoveryRequested(user));
    this.setState({filter, filteredUsers});
  }

  /**
   * Keep only the users who have missing metadata keys
   * @param {string} filter A missing metadata key users filter
   */
  async searchByMissingMetadataKeyUsers(filter) {
    const filteredUsers = this.users.filter(user => isMissingMetadataKey(user));
    this.setState({filter, filteredUsers});
  }

  /**
   * Refresh the filter in case of its payload is outdated due to the updated list of users
   */
  async refreshSearchFilter() {
    const hasGroupFilter = this.state.filter.type === UserWorkspaceFilterTypes.GROUP;
    if (hasGroupFilter) {
      const isGroupStillExist = this.groups.some(group => group.id === this.state.filter.payload.group.id);
      if (isGroupStillExist) { // Case of group exists but may have somme applied changes on it
        const updatedGroup = this.groups.find(group => group.id === this.state.filter.payload.group.id);
        const filter = Object.assign(this.state.filter, {payload: {group: updatedGroup}});
        await this.search(filter);
      } else { // Case of filter group deleted
        const filter = {type: UserWorkspaceFilterTypes.ALL};
        this.props.history.push({pathname: '/app/users', state: {filter}});
      }
    }
  }

  /** USER SELECTION */

  /**
   * Select the given user as the single selected users if not already selected as single. Otherwise unselect it
   * @param {User} user The user to select
   */
  async select(user) {
    const mustUnselect = this.state.selectedUsers.length === 1 && this.state.selectedUsers[0].id === user.id;
    this.setState({selectedUsers: mustUnselect ? [] : [user]});
  }

  /**
   * Selects the given user when one comes from the navigation route
   * @param {User} user An user
   */
  async selectFromRoute(user) {
    const selectedUsers = [user];
    this.setState({selectedUsers});
  }

  /**
   * Unselect all the users
   */
  async unselectAll() {
    const hasSelectedUsers = this.state.selectedUsers.length !== 0;
    if (hasSelectedUsers) {
      this.setState({selectedUsers: []});
    }
  }

  /**
   * Remove from the selected users those which are not present in regard of the current displayed list
   */
  async unselectUsersNotFiltered() {
    const matchId = selectedUser => user => user.id === selectedUser.id;
    const matchSelectedUser = selectedUser => this.state.filteredUsers.some(matchId(selectedUser));
    const selectedUsers = this.state.selectedUsers.filter(matchSelectedUser);
    this.setState({selectedUsers});
  }

  /**
   * Navigate to the appropriate url after some users selection operation
   */
  redirectAfterSelection() {
    const hasUsersAndGroups = this.users !== null && this.groups !== null;
    if (hasUsersAndGroups) {
      const hasUserSelected = this.state.selectedUsers.length === 1;
      if (hasUserSelected) { // Case of selected user
        this.props.history.push(`/app/users/view/${this.state.selectedUsers[0].id}`);
      } else {
        const {filter} = this.state;
        const isGroupFilter = filter.type === UserWorkspaceFilterTypes.GROUP;
        if (isGroupFilter) {
          const mustRedirect = this.props.location.pathname !== `/app/groups/view/${this.state.filter.payload.group.id}`;
          if (mustRedirect) {
            this.props.history.push({pathname: `/app/groups/view/${this.state.filter.payload.group.id}`});
          }
        } else {
          const mustRedirect = this.props.location.pathname !== '/app/users';
          if (mustRedirect) {
            this.props.history.push({pathname: `/app/users`, state: {filter}});
          }
        }
      }
    }
  }


  /** USER SORTER **/

  /**
   * Update the users sorter given a property name
   * @param propertyName
   */
  async updateSorter(propertyName) {
    const hasSortPropertyChanged = this.state.sorter.propertyName !== propertyName;
    const asc = hasSortPropertyChanged  || !this.state.sorter.asc;
    const sorter = {propertyName, asc};
    this.setState({sorter});
  }

  /**
   * Reset the user sorter
   */
  async resetSorter() {
    const sorter = {propertyName: 'modified', asc: false};
    this.setState({sorter});
  }

  /**
   * Sort the users given the current sorter
   */
  async sort() {
    const reverseSorter = sorter => (s1, s2) => -sorter(s1, s2);
    const baseSorter =  sorter => this.state.sorter.asc ? sorter : reverseSorter(sorter);
    const keySorter = (key, sorter) => baseSorter((s1, s2) => sorter(s1[key], s2[key]));
    const plainObjectSorter = sorter => baseSorter(sorter);

    const dateSorter = (d1, d2) => !d1 ? -1 : (!d2 ? 1 : DateTime.fromISO(d1) < DateTime.fromISO(d2) ? -1 : 1);
    const stringSorter = (s1, s2) => (s1 || "").localeCompare(s2 || "");
    const mfaSorter = (u1, u2) => (u2.is_mfa_enabled === u1.is_mfa_enabled) ? 0 : u2.is_mfa_enabled ? -1 : 1;
    const accountRecoveryUserSettingStatusSorter = (u1, u2) => (u2?.account_recovery_user_setting?.status === u1?.account_recovery_user_setting?.status) ? 0 : u2?.account_recovery_user_setting?.status ? -1 : 1;
    const getUserFullName = user => `${user.profile.first_name} ${user.profile.last_name}`;
    const nameSorter = (u1, u2) => getUserFullName(u1).localeCompare(getUserFullName(u2));
    const roleNameSorter = (roleIdU1, roleIdU2) => this.getTranslatedRoleName(roleIdU1).localeCompare(this.getTranslatedRoleName(roleIdU2));
    const suspendedSorter = (u1, u2) => (isUserSuspended(u1) === isUserSuspended(u2)) ? 0 : isUserSuspended(u2) ? -1 : 1;
    const dateOrStringSorter = ['modified', 'last_logged_in'].includes(this.state.sorter.propertyName) ? dateSorter : stringSorter;

    const isNameProperty = this.state.sorter.propertyName === 'profile';
    const isMfaProperty = this.state.sorter.propertyName === 'is_mfa_enabled';
    const isRoleNameProperty = this.state.sorter.propertyName === 'role_id';
    const isSuspendedProperty = this.state.sorter.propertyName === 'disabled';
    const isAccountRecoveryUserSettingStatusProperty = this.state.sorter.propertyName === 'account_recovery_user_setting.status';

    let propertySorter;
    if (isNameProperty) {
      propertySorter = plainObjectSorter(nameSorter);
    } else if (isMfaProperty) {
      propertySorter = plainObjectSorter(mfaSorter);
    } else if (isRoleNameProperty) {
      propertySorter = keySorter("role_id", roleNameSorter);
    } else if (isAccountRecoveryUserSettingStatusProperty) {
      propertySorter = plainObjectSorter(accountRecoveryUserSettingStatusSorter);
    } else if (isSuspendedProperty) {
      propertySorter = plainObjectSorter(suspendedSorter);
    } else {
      propertySorter = keySorter(this.state.sorter.propertyName, dateOrStringSorter);
    }

    this.setState({filteredUsers: this.state.filteredUsers.sort(propertySorter)});
  }

  /** USER DETAILS  **/

  /**
   * Set the details focus on the given group
   * @param group The group to focus on
   */
  async detailGroup(group) {
    const locked = this.state.details.locked;
    this.setState({details: {group, user: null, locked}});
  }

  /**
   * Set the details focus on the given user
   * @param user The user to focus on
   */
  async detailUser(user) {
    const locked = this.state.details.locked;
    this.setState({details: {group: null, user, locked}});
  }

  /**
   * Remove the details on something
   */
  async detailNothing() {
    const hasDetails = this.state.details.user || this.state.details.group;
    if (hasDetails) {
      const locked = this.state.details.locked;
      this.setState({details: {group: null, user: null, locked}});
    }
  }

  /**
   * Lock the group or user details display ( hide or show )
   * @returns {Promise<void>}
   */
  async lockDetails() {
    const details = this.state.details;
    const locked = this.state.details.locked;
    this.setState({details: Object.assign({}, details, {locked: !locked})});
  }

  /**
   * Update the current details with the current list of users or groups
   * Note: The user details will be reset whenever the user is not part of the filtered list.
   */
  async updateDetails() {
    const hasDetails = this.state.details.user || this.state.details.group;
    if (hasDetails) {
      const hasUserDetails = this.state.details.user;
      const locked = this.state.details.locked;
      if (hasUserDetails) { // Case of user details
        const updatedUserDetails = this.state.filteredUsers.find(user => user.id === this.state.details.user.id) || null;
        this.setState({details: {user: updatedUserDetails, group: null, locked}});
      } else { // Case of group details
        const updatedGroupDetails = this.groups.find(group => group.id === this.state.details.group.id);
        this.setState({details: {group: updatedGroupDetails, user: null, locked}});
      }
    }
  }

  /** USER SCROLLING **/

  /**
   * Set the user to scroll to
   * @param user A user
   */
  async scrollTo(user) {
    this.setState({scrollTo: {user}});
  }

  /**
   * Unset the user to scroll to
   */
  async scrollNothing() {
    this.setState({scrollTo: {}});
  }

  /** GROUP EDIT **/

  /**
   * Updates the group to edit
   * @param groupToEdit The group to edit
   */
  async updateGroupToEdit(groupToEdit) {
    this.setState({groupToEdit});
  }

  /** Common roles getters **/

  /**
   * Get the translated role name by role id
   * @param {string} id The role id
   * @return {string}
   */
  getTranslatedRoleName(id) {
    const role = this.props.roleContext.getRole(id);
    if (!role) {
      return "";
    }

    /*
     * The i18n parser can't find the translation for default role names.
     * To fix that we can use it in comment
     * this.translate("admin")
     * this.translate("user")
     */
    return role.isAReservedRole()
      ? this.props.t(role.name)
      : role.name; //it is a custom role, we do not handle translation
  }

  /**
   * Returns true if the 'Suspended user' filter should be displayed in the UI
   * @returns {boolean}
   */
  shouldDisplaySuspendedUsersFilter() {
    return this.props.context.siteSettings.canIUse('disableUser') && this.props.context.loggedInUser.role.name === "admin";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <UserWorkspaceContext.Provider value={this.state}>
        {this.props.children}
      </UserWorkspaceContext.Provider>
    );
  }
}

UserWorkspaceContextProvider.displayName = 'UserWorkspaceContextProvider';
UserWorkspaceContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The component children
  location: PropTypes.object, // The router location
  match: PropTypes.object, // The router match helper
  history: PropTypes.object, // The router history
  actionFeedbackContext: PropTypes.object, // The action feedback context
  loadingContext: PropTypes.object, // The loading context
  dialogContext: PropTypes.any, // The dialog context
  rbacContext: PropTypes.object, // The Rbac context
  roleContext: PropTypes.object, // The role context
  roles: PropTypes.instanceOf(RolesCollection), // The roles collection
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withRbac(withDialog(withActionFeedback(withLoading(withRoles(withTranslation('common')(UserWorkspaceContextProvider))))))));

/**
 * User Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withUserWorkspace(WrappedComponent) {
  return class WithUserWorkspace extends React.Component {
    render() {
      return (
        <UserWorkspaceContext.Consumer>
          {
            UserWorkspaceContext => <WrappedComponent userWorkspaceContext={UserWorkspaceContext} {...this.props} />
          }
        </UserWorkspaceContext.Consumer>
      );
    }
  };
}

/**
 * The list of user workspace search filter types
 */
export const UserWorkspaceFilterTypes = {
  NONE: 'NONE', // Initial filter at page load
  ALL: 'ALL', // All users
  GROUP: 'FILTER-BY-GROUP', // Users for a given group
  TEXT: 'FILTER-BY-TEXT-SEARCH', // Users matching some text words
  RECENTLY_MODIFIED: 'FILTER-BY-RECENTLY-MODIFIED', // Keep recently modified users
  SUSPENDED_USER: 'FILTER-BY-SUSPENDED-USER', // Keep only suspended users
  ACCOUNT_RECOVERY_REQUEST: 'ACCOUNT_RECOVERY_REQUEST',
  MISSING_METADATA_KEY: 'MISSING_METADATA_KEY',
};
