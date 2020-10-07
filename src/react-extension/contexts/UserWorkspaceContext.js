
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
  },
  onSorterChanged: () => {}, // Whenever the sorter changed
  onUserSelected: {
    single: () => {}// Whenever a single resource has been selected
  },
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
      },
      onSorterChanged: this.handleSorterChange.bind(this), // Whenever the sorter changed
      onUserSelected: {
        single: this.handleUserSelected.bind(this)// Whenever a single user has been selected
      },
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
      const isNotNonePreviousFilter = previousFilter.type !== ResourceWorkspaceFilterTypes.NONE;
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
    if (hasUsersChanged) {
      this.users = this.context.users;
      await this.search(this.state.filter);
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
      await this.handleUserRouteChange();
    }
  }

  /**
   * Handle the user view route change
   */
  async handleUserRouteChange() {
    const isUserLocation = this.props.location.pathname.includes('users');
    if (isUserLocation) {
      const filter = (this.props.location.state && this.props.location.state.filter) || {type: ResourceWorkspaceFilterTypes.ALL};
      await this.search(filter);
      await this.detailNothing();
    }
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
   */
  async searchByGroup() {
    // TODO
  }

  /**
   * Filter the users which textual properties matched some user text words
   * @param filter A textual filter
   */
  async searchByText(filter) {
    const text = filter.payload;
    const words =  (text && text.split(/\s+/)) || [''];

    // Test match of some escaped test words against the name / usernmae / uri / description /tags resource properties
    const escapeWord = word =>  word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordToRegex = word =>  new RegExp(escapeWord(word), 'i');
    const matchSomeWords = value => words.some(word => wordToRegex(word).test(value));

    const matchUsernameProperty = user => matchSomeWords(user.username);
    const matchNameProperty = user => matchSomeWords(user.profile.first_name) || matchSomeWords(user.profile.last_name);

    const matchText = user => matchUsernameProperty(user) || matchNameProperty(user);

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
   * Select the given user in a multiple selection mode
   * @param user An user
   * @returns {Promise<void>}
   */
  async selectMultiple(user) {
    const hasNotSameId = selectedUser => selectedUser.id !== user.id;
    const selectionWithoutUser = this.state.selectedUsers.filter(hasNotSameId);
    const mustUnselect = this.state.selectedUsers.length !== selectionWithoutUser.length;
    const selectedUsers = mustUnselect ? selectionWithoutUser : [...this.state.selectedUsers, user];
    await this.setState({selectedUsers});
  }

  /**
   * Select the given user in a range selection mode
   * @param user An user
   * @returns {Promise<void>}
   */
  async selectRange(user) {
    const hasNoSelection = this.state.selectedUsers.length === 0;

    if (hasNoSelection) {
      await this.select(user);
    } else {
      const hasSameId = user => selectedUser => selectedUser.id === user.id;
      const findIndex = user => this.state.filteredUsers.findIndex(hasSameId(user));
      const startRangeIndex = findIndex(this.state.selectedUsers[0]);
      const endRangeIndex = findIndex(user);

      let selectedUsers;
      if (startRangeIndex > endRangeIndex) { // Down range selection
        selectedUsers = this.state.filteredUsers.slice(endRangeIndex, startRangeIndex + 1).reverse();
      } else { // Up range selection
        selectedUsers = this.state.filteredUsers.slice(startRangeIndex, endRangeIndex + 1);
      }
      await this.setState({selectedUsers});
    }
  }

  /**
   * Select all the users
   */
  async selectAll() {
    await this.setState({selectedUsers: [...this.state.filteredUsers]});
  }

  /**
   * Unselect all the users
   */
  async unselectAll() {
    const hasSelectedUsers = this.state.selectedUsers.length !== 0;
    if (hasSelectedUsers) {
      await this.setState({selectedUsers: []});
    }
  }

  /** User Sorter **/

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
    const nameSorter = (u1, u2) => {
      return `${u1.profile.first_name} ${u1.profile.last_name}`.localeCompare(`${u2.profile.first_name} ${u2.profile.last_name}`);
    };
    const dateOrStringsorter = ['modified', 'last_logged_in'].includes(this.state.sorter.propertyName) ? dateSorter : stringSorter;

    const isNameProperty = this.state.sorter.propertyName === 'name';
    const propertySorter = isNameProperty ? plainObjectSorter(nameSorter) : keySorter(this.state.sorter.propertyName, dateOrStringsorter);

    await this.setState({filteredUsers: this.state.filteredUsers.sort(propertySorter)});
  }

  /** USER DETAILS  **/

  /**
   * Set the details focus on the given group
   * @param group The group to focus on
   */
  async detailGroup(group) {
    await this.setState({details: {group, user: null}});
  }

  /**
   * Set the details focus on the given user
   * @param user The user to focus on
   */
  async detailResource(user) {
    await this.setState({details: {group: null, user}});
  }

  /**
   * Remove the details on something
   */
  async detailNothing() {
    const hasDetails = this.state.details.user || this.state.details.group;
    if (hasDetails) {
      await this.setState({details: {group: null, user: null}});
    }
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
  children: PropTypes.any,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  actionFeedbackContext: PropTypes.object,
  loadingContext: PropTypes.object // The loading context
};

export default withRouter(withLoading(UserWorkspaceContextProvider));


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
