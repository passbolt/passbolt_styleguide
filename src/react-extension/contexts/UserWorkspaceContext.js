
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
import AppContext from "./AppContext";
import {withLoading} from "../../react/contexts/Common/LoadingContext";
import {withRouter} from "react-router-dom";
import {ResourceWorkspaceFilterTypes} from "./ResourceWorkspaceContext";
import {withActionFeedback} from "./ActionFeedbackContext";
import moment from "moment";

/**
 * Context related to resources ( filter, current selections, etc.)
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
  onUserScrolled: () => {}, // Whenever one scrolled to a user
  onLockDetail: () => {}, // Lock or unlock detail  (hide or display the group or user details)
  onSorterChanged: () => {}, // Whenever the sorter changed
  onUserSelected: {
    single: () => {}// Whenever a single resource has been selected
  },
  onGroupToEdit: () => {} // Whenever a group will be edited
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
      filter: {type: UserWorkspaceFilterTypes.NONE}, // The current resource search filter
      sorter: {
        propertyName: 'modified', // The name of the property to sort on
        asc: false // True if the sort must be descendant
      },
      filteredUsers: [], // The current list of filtered users
      selectedUsers: [], // The current list of selected resources
      details: {
        user: null, // The user to focus details on
        group: null, // The group to focus details on
        locked: true // The details display is locked
      },
      scrollTo: {
        user: null // The resource to scroll to
      },
      groupToEdit: null, // The group to edit
      onUserScrolled: this.handleUserScrolled.bind(this), // Whenever one scrolled to a user
      onDetailsLocked: this.handleDetailsLocked.bind(this), // Lock or unlock detail  (hide or display the group or user details)
      onSorterChanged: this.handleSorterChange.bind(this), // Whenever the sorter changed
      onUserSelected: {
        single: this.handleUserSelected.bind(this)// Whenever a single user has been selected
      },
      onGroupToEdit: this.handleGroupToEdit.bind(this) // Whenever a group will be edited
    };
  }

  /**
   * Initialize class properties out of the state ( for performance purpose )
   */
  initializeProperties() {
    this.users = null; // A cache of the last known list of users from the App context
    this.groups = []; // A cache of the last known list of groups from the App context
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.populate();
    this.handleUsersWaitedFor();
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  async componentDidUpdate(prevProps, prevState) {
    await this.handleFilterChange(prevState.filter);
    await this.handleUsersLoaded();
    await this.handleUsersChange();
    await this.handleGroupsChange();
    await this.handleRouteChange(prevProps.location);
  }

  /**
   * Handles the user search filter change
   */
  async handleFilterChange(previousFilter) {
    const hasFilterChanged = previousFilter !== this.state.filter;
    if (hasFilterChanged) {
      this.populate();

      // Avoid a side-effect whenever one inputs a specific resource url (it unselect the resource otherwise )
      const isNotNonePreviousFilter = previousFilter.type !== UserWorkspaceFilterTypes.NONE;
      if (isNotNonePreviousFilter) {
        await this.unselectAll();
      }
    }
  }

  /**
   * Handle the users changes
   */
  async handleUsersChange() {
    const hasUsersChanged = this.context.users && this.context.users !== this.users;
    const areUsersFirstLoad = this.users === null;
    if (hasUsersChanged) {
      this.users = this.context.users;
      await this.search(this.state.filter);
      await this.updateDetails();
      await this.unselectUnknownUsers();
      if (!areUsersFirstLoad) {
        await this.redirectAfterSelection();
      }
    }
  }

  /**
   * Handle the groups change
   */
  async handleGroupsChange() {
    const hasGroupsChanged = this.context.groups && this.context.groups !== this.groups;
    if (hasGroupsChanged) {
      this.groups = this.context.groups;
      await this.refreshSearchFilter();
      await this.updateDetails();
    }
  }

  /**
   * Handle the route location change
   * @param previousLocation Previous router location
   */
  async handleRouteChange(previousLocation) {
    const hasLocationChanged = this.props.location.key !== previousLocation.key;
    const isAppFirstLoad = this.state.filter.type === ResourceWorkspaceFilterTypes.NONE;
    if (hasLocationChanged || isAppFirstLoad) {
      await this.handleGroupRouteChange();
      await this.handleUserRouteChange();
    }
  }

  /**
   * Handle the group view route change
   *  E.g. /groups/view/:selectedGroupId
   */
  async handleGroupRouteChange() {
    const groupId = this.props.match.params.selectedGroupId;
    if (groupId) {
      const group = this.context.groups.find(group => group.id === groupId);
      await this.search({type: UserWorkspaceFilterTypes.GROUP, payload: {group}});
      await this.detailGroup(group);
    }
  }

  /**
   * Handle the user view route change
   */
  async handleUserRouteChange() {
    const isUserLocation = this.props.location.pathname.includes('users');
    const userId = this.props.match.params.selectedUserId;
    if (isUserLocation) {
      if (userId) { // Case of password view
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
    const user = this.users.find(user => user.id === userId);
    const hasNoneFilter = this.state.filter.type === UserWorkspaceFilterTypes.NONE;
    if (hasNoneFilter) { // Case of password view by url bar inputting
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


  /**
   * Handle the resource view route change without a resource id in the path
   * E.g. /password
   */
  async handleAllUserRouteChange() {
    const hasUsers = this.users !== null;
    if (hasUsers) {
      const filter = (this.props.location.state && this.props.location.state.filter) || {type: UserWorkspaceFilterTypes.ALL};
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
   * Handle an unknown user ( passe by route parameter resource identifier )
   */
  handleUnknownUser() {
    this.props.actionFeedbackContext.displayError("The user does not exist");
  }

  /**
   * Handle the scrolling of a resource
   */
  async handleUserScrolled() {
    await this.scrollNothing();
  }

  /**
   * Handle the change of sorter ( on property or direction )
   * @param propertyName The name of the property to sort on
   */
  async handleSorterChange(propertyName) {
    await this.updateSorter(propertyName);
    await this.sort();
  }

  /**
   * Handle the single user selection
   * @param user The selected user
   */
  async handleUserSelected(user) {
    await this.select(user);
    this.redirectAfterSelection();
  }

  /**
   * Handle the will to edit a group
   * @param group
   */
  async handleGroupToEdit(group) {
    await this.updateGroupToEdit(group);
  }

  /**
   * Handle the wait for the initial resources to be loaded
   */
  handleUsersWaitedFor() {
    this.props.loadingContext.add();
  }

  /**
   * Handle the intial loading of the users
   */
  handleUsersLoaded() {
    const hasUsersBeenInitialized = this.users === null && this.context.users;
    if (hasUsersBeenInitialized) {
      this.props.loadingContext.remove();
      this.handleUsersLoaded = () => {};
    }
  }



  /**
   * Populate the context with initial data such as resources and folders
   */
  populate() {
    this.context.port.request("passbolt.users.update-local-storage");
    this.context.port.request("passbolt.groups.update-local-storage");
  }

  /** USER SEARCH  **/

  /**
   * Search for the users which matches the given filter and sort them
   * @param filter
   */
  async search(filter) {
    const isRecentlyModifiedFilter = filter.type === UserWorkspaceFilterTypes.RECENTLY_MODIFIED;
    const searchOperations = {
      [UserWorkspaceFilterTypes.GROUP]: this.searchByGroup.bind(this),
      [UserWorkspaceFilterTypes.TEXT]: this.searchByText.bind(this),
      [UserWorkspaceFilterTypes.RECENTLY_MODIFIED]: this.searchByRecentlyModified.bind(this),
      [UserWorkspaceFilterTypes.ALL]: this.searchAll.bind(this),
      [UserWorkspaceFilterTypes.NONE]: () => { /* No search */ }
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
   * @param filter The All filter
   */
  async searchAll(filter) {
    await this.setState({filter, filteredUsers: this.users});
  }

  /**
   * Filter the users which belongs to the given group
   * @param filter The group filter
   */
  async searchByGroup(filter) {
    const group = filter.payload.group;
    const usersGroupIds = group.groups_users.map(groupUser => groupUser.user_id);
    const filteredUsers = this.users.filter(user => usersGroupIds.some(userId => userId === user.id));
    await this.setState({filter, filteredUsers});
  }

  /**
   * Filter the users which textual properties matched some user text words
   * @param filter A textual filter
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
    await this.setState({filter, filteredUsers});
  }

  /**
   * Keep the most recently modified users ( current state: just sort everything with the most recent modified resource )
   * @param filter A recently modified filter
   */
  async searchByRecentlyModified(filter) {
    const recentlyModifiedSorter = (user1, user2) => moment(user2.modified).diff(moment(user1.modified));
    const filteredUsers = this.users.sort(recentlyModifiedSorter);
    await this.setState({filter, filteredUsers});
  }

  /**
   * Refresh the filter in case of its payload is outdated due to the updated list of resources
   */
  async refreshSearchFilter() {
    const hasGroupFilter = this.state.filter.type === UserWorkspaceFilterTypes.GROUP;
    if (hasGroupFilter) {
      const isGroupStillExist = this.groups.some(group => group.id === this.state.filter.payload.group.id);
      if (isGroupStillExist) { // Case of group exists but may have somme applied changes on it
        const updatedGroup = this.groups.find(group => group.id === this.state.filter.payload.group.id);
        const filter = Object.assign(this.state.filter, {payload: {group: updatedGroup}});
        await this.setState({filter});
      } else { // Case of filter group deleted
        const filter = {type: UserWorkspaceFilterTypes.ALL};
        this.props.history.push({pathname: '/app/users', state: {filter}});
      }
    }
  }

  /** USER SELECTION */

  /**
   * Select the given user as the single selected users if not already selected as single. Otherwise unselect it
   * @param resource The resource to select
   */
  async select(user) {
    const mustUnselect = this.state.selectedUsers.length === 1 && this.state.selectedUsers[0].id === user.id;
    await this.setState({selectedUsers: mustUnselect ? [] : [user]});
  }

  /**
   * Selects the given user when one comes from the navigation route
   * @param user An user
   */
  async selectFromRoute(user) {
    const selectedUsers = [user];
    await this.setState({selectedUsers});
  }

  /**
   * Unselect all the resources
   */
  async unselectAll() {
    const hasSelectedUsers = this.state.selectedUsers.length !== 0;
    if (hasSelectedUsers) {
      await this.setState({selectedUsers: []});
    }
  }

  /**
   * Remove from the selected resources those which are not known resources in regard of the current resources list
   */
  async unselectUnknownUsers() {
    const matchId = selectedUser => user => user.id === selectedUser.id;
    const matchSelectedUser = selectedUser => this.users.some(matchId(selectedUser));
    const selectedUsers = this.state.selectedUsers.filter(matchSelectedUser);
    await this.setState({selectedUsers});
  }

  /**
   * Navigate to the appropriate url after some resources selection operation
   */
  redirectAfterSelection() {
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


  /** USER SORTER **/

  /**
   * Update the users sorter given a property name
   * @param propertyName
   */
  async updateSorter(propertyName) {
    const hasSortPropertyChanged = this.state.sorter.propertyName !== propertyName;
    const asc = hasSortPropertyChanged  || !this.state.sorter.asc;
    const sorter = {propertyName, asc};
    await this.setState({sorter});
  }

  /**
   * Reset the user sorter
   */
  async resetSorter() {
    const sorter = {propertyName: 'modified', asc: false};
    this.setState({sorter});
  }

  /**
   * Sort the resources given the current sorter
   */
  async sort() {
    const reverseSorter = sorter => (s1, s2) => -sorter(s1, s2);
    const baseSorter =  sorter => this.state.sorter.asc ? sorter : reverseSorter(sorter);
    const keySorter = (key, sorter) => baseSorter((s1, s2) => sorter(s1[key], s2[key]));
    const plainObjectSorter = sorter => baseSorter(sorter);

    const dateSorter = (d1, d2) => !d1 ? -1 : (!d2 ? 1 : moment(d1).diff(moment(d2)));
    const stringSorter = (s1, s2) => s1.localeCompare(s2);
    const mfaSorter = (u1, u2) => (u2.is_mfa_enabled === u1.is_mfa_enabled) ? 0 : u2.is_mfa_enabled ? -1 : 1;
    const getUserFullName = user => `${user.profile.first_name} ${user.profile.last_name}`;
    const nameSorter = (u1, u2) => getUserFullName(u1).localeCompare(getUserFullName(u2));
    const dateOrStringsorter = ['modified', 'last_logged_in'].includes(this.state.sorter.propertyName) ? dateSorter : stringSorter;

    const isNameProperty = this.state.sorter.propertyName === 'name';
    const isMfaProperty = this.state.sorter.propertyName === 'is_mfa_enabled';

    let propertySorter;
    if (isNameProperty) {
      propertySorter = plainObjectSorter(nameSorter);
    } else if (isMfaProperty) {
      propertySorter = plainObjectSorter(mfaSorter);
    } else {
      propertySorter = keySorter(this.state.sorter.propertyName, dateOrStringsorter);
    }

    await this.setState({filteredUsers: this.state.filteredUsers.sort(propertySorter)});
  }

  /** USER DETAILS  **/

  /**
   * Set the details focus on the given group
   * @param group The group to focus on
   */
  async detailGroup(group) {
    const locked = this.state.details.locked;
    await this.setState({details: {group, user: null, locked}});
  }

  /**
   * Set the details focus on the given user
   * @param user The user to focus on
   */
  async detailUser(user) {
    const locked = this.state.details.locked;
    await this.setState({details: {group: null, user, locked}});
  }

  /**
   * Remove the details on something
   */
  async detailNothing() {
    const hasDetails = this.state.details.user || this.state.details.group;
    if (hasDetails) {
      const locked = this.state.details.locked;
      await this.setState({details: {group: null, user: null, locked}});
    }
  }

  /**
   * Lock the group or user details display ( hide or show )
   * @returns {Promise<void>}
   */
  async lockDetails() {
    const details = this.state.details;
    const locked = this.state.details.locked;
    await this.setState({details: Object.assign({}, details, {locked: !locked})});
  }


  /**
   * Update the current details with the current list of users or groups
   */
  async updateDetails() {
    const hasDetails = this.state.details.user || this.state.details.group;
    if (hasDetails) {
      const hasUserDetails = this.state.details.user;
      if (hasUserDetails) { // Case of user details
        const updatedUserDetails = this.users.find(user => user.id === this.state.details.user.id);
        await this.setState({details: {user: updatedUserDetails}});
      } else { // Case of group details
        const updatedGroupDetails = this.groups.find(group => group.id === this.state.details.group.id);
        await this.setState({details: {group: updatedGroupDetails}});
      }
    }
  }

  /** USER SCROLLING **/

  /**
   * Set the user to scroll to
   * @param resource A resource
   */
  async scrollTo(user) {
    await this.setState({scrollTo: {user}});
  }

  /**
   * Unset the resource to scroll to
   */
  async scrollNothing() {
    await this.setState({scrollTo: {}});
  }



  /** GROUP EDIT **/

  /**
   * Updates the group to edit
   * @param groupToEdit The group to edit
   */
  async updateGroupToEdit(groupToEdit) {
    await this.setState({groupToEdit});
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
UserWorkspaceContextProvider.contextType = AppContext;
UserWorkspaceContextProvider.propTypes = {
  children: PropTypes.any, // The component children
  location: PropTypes.object, // The router location
  match: PropTypes.object, // The router match helper
  history: PropTypes.object, // The router history
  actionFeedbackContext: PropTypes.object, // The action feedback context
  loadingContext: PropTypes.object // The loading context
};

export default withRouter(withActionFeedback(withLoading(UserWorkspaceContextProvider)));


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
  ALL: 'ALL', // All resources
  GROUP: 'FILTER-BY-GROUP', // Resources for a given group
  TEXT: 'FILTER-BY-TEXT-SEARCH', // Resources matching some text words
  RECENTLY_MODIFIED: 'FILTER-BY-RECENTLY-MODIFIERD', // Keep recently modified resources
};
