/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.2.0
 */

import React from "react";
import AppContext from "../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import SiteSettings from "../../shared/lib/Settings/SiteSettings";
import UserSettings from "../../shared/lib/Settings/UserSettings";
import RbacsCollection from "../../shared/models/entity/rbac/rbacsCollection";
import AccountEntity from "../../shared/models/entity/account/accountEntity";
import RoleServiceWorkerService from "../../shared/services/serviceWorker/role/roleServiceWorkerService";

/**
 * The ExtApp context provider
 */
class ExtAppContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.roleServiceWorkerService = new RoleServiceWorkerService(props.port);
    this.bindCallbacks();
    this.initEventHandlers();
    this.hierarchyFolderCache = {}; // A cache of the last known list of folders hierarchy by ID from the App context
  }

  async componentDidMount() {
    await this.getSiteSettings();
    await this.getExtensionVersion();
    this.getUserSettings();
    this.getLoggedInUser();
    this.initLocale();
    this.getResources();
    this.getFolders();
    await this.getAccount();
    this.getGroups();
    this.getUsers();
    this.getRoles();
    const skeleton = document.getElementById("temporary-skeleton");
    if (skeleton) {
      skeleton.remove();
    }
  }

  bindCallbacks() {
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.handleIsReadyEvent = this.handleIsReadyEvent.bind(this);
  }

  initEventHandlers() {
    this.props.storage.onChanged.addListener(this.handleStorageChange);
  }

  getDefaultState(props) {
    return {
      name: "browser-extension", // The application name

      port: props.port,
      storage: props.storage,
      user: null,
      resources: null,
      folders: null,
      foldersMapById: [], // A list of folders map by ID from the App context
      users: null, // The current list of all users
      groups: null,

      loggedInUser: null,
      account: null, // The account
      rbacs: null,
      siteSettings: null,
      userSettings: null,
      extensionVersion: null, // The extension version
      locale: null, // The locale
      isSessionLogoutByUser: false, // Is the session logout by the user

      setContext: context => {
        this.setState(context);
      },

      // passphrase dialog
      passphraseRequestId: '',

      // folder dialogs
      folder: {},
      folderMoveStrategyProps: {
        requestId: null,
        folderId: null,
        foldersIds: [],
        resourcesIds: []
      },

      // share dialog
      shareDialogProps: {
        foldersIds: null,
        resourcesIds: null,
      },

      // user dialog
      editUserDialogProps: {
        id: null // The id of the current user to edit
      },

      deleteUserDialogProps: {
        user: null
      },

      deleteUserWithConflictsDialogProps: {
        user: null, // The user to delete
        errors: {}, // The dry run errors
      },

      // tag dialog
      tagToEdit: null, // The current tag to edit
      tagToDelete: null, // The current tag to delete

      // group dialog
      deleteGroupDialogProps: {
        group: null, // the group to delete
        numberResourcesOwned: null
      },

      deleteGroupWithConflictsDialogProps: {
        group: null, // the group to delete
        errors: {}, // The dry run errors
      },

      // Resource comment dialog
      resourceCommentId: null, // Selected resource comment id
      mustRefreshComments: false, // Flag telling whether the current list of comments should be refreshed

      // Navigation
      onLogoutRequested: () => this.onLogoutRequested(),

      // Expired session
      onExpiredSession: this.onExpiredSession.bind(this),

      // Subscription
      onGetSubscriptionKeyRequested: () => this.onGetSubscriptionKeyRequested(),

      // Locale
      onUpdateLocaleRequested: this.onUpdateLocaleRequested.bind(this),

      // Get folder hierarchy
      getHierarchyFolderCache: this.getHierarchyFolderCache.bind(this)
    };
  }

  handleIsReadyEvent(requestId) {
    if (this.isReady()) {
      this.props.port.emit(requestId, "SUCCESS");
    } else {
      this.props.port.emit(requestId, "ERROR");
    }
  }

  /**
   * Check if the application is ready to render with minimal data.
   * @returns {boolean}
   */
  isReady() {
    return this.state.loggedInUser !== null
      && this.state.rbacs !== null
      && this.state.userSettings !== null
      && this.state.siteSettings !== null
      && this.state.locale !== null;
  }

  /*
   * =============================================================
   *  State initialization
   * =============================================================
   */
  /**
   * Get the current user info from background page and set it in the state
   */
  async getLoggedInUser() {
    const canIUseRbac = this.state.siteSettings.canIUse('rbacs');
    const loggedInUser = await this.props.port.request("passbolt.users.find-logged-in-user");
    const rbacsDto = canIUseRbac ? await this.props.port.request("passbolt.rbacs.find-me") : [];
    const rbacs = new RbacsCollection(rbacsDto);
    this.setState({loggedInUser, rbacs});
  }

  /**
   * Get the list of site settings from background page and set it in the state
   * Using SiteSettings
   */
  async getSiteSettings() {
    const settings = await this.props.port.request("passbolt.organization-settings.get");
    const siteSettings = new SiteSettings(settings);
    this.setState({siteSettings});
  }

  /**
   * Get extension version
   */
  async getExtensionVersion() {
    const extensionVersion = await this.props.port.request("passbolt.addon.get-version");
    this.setState({extensionVersion});
  }

  /**
   * Get the list of resources from local storage and set it in the state
   */
  async getResources() {
    const storageData = await this.props.storage.local.get(["resources"]);
    if (storageData.resources) {
      const resources = storageData.resources;
      this.setState({resources: resources});
    }
  }

  /**
   * Get the list of folders from local storage and set it in the state
   */
  async getFolders() {
    const storageData = await this.props.storage.local.get(["folders"]);
    if (storageData.folders) {
      const folders = storageData.folders;
      const foldersMapById = folders.reduce((result, folder) => {
        result[folder.id] = folder;
        return result;
      }, {});
      this.hierarchyFolderCache = {};
      this.setState({folders, foldersMapById});
    }
  }

  /**
   * Returns the list of all groups
   */
  async getGroups() {
    const storageKey = `groups-${this.state.account.id}`;
    const storageData = await this.props.storage.local.get(storageKey);
    if (storageData[storageKey]) {
      const groups = storageData[storageKey];
      this.setState({groups: groups});
    }
  }

  /**
   * Get the list of users from local storage and set it in the state
   */
  async getUsers() {
    const storageData = await this.props.storage.local.get(["users"]);
    if (storageData.users && storageData.users.length) {
      const users = storageData.users;
      this.setState({users: users});
    }
  }

  /**
   * Get the list of roles from local storage and set it in the state
   */
  async getRoles() {
    const roles = this.roleServiceWorkerService.findAll();
    this.setState({roles});
  }

  /**
   * Get the list of user settings from local storage and set it in the state
   * Using UserSettings
   */
  async getUserSettings() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    const userSettings = new UserSettings(storageData._passbolt_data.config);
    this.setState({userSettings});
  }

  /**
   * Init the locale
   */
  async initLocale() {
    const {locale} = await this.props.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Get the account
   * @returns {Promise<void>}
   */
  async getAccount() {
    const accountDto = await this.props.port.request("passbolt.account.get");
    const account = new AccountEntity(accountDto);
    this.setState({account});
  }

  /**
   * Get the hierarchy of a folder by ID in cache
   * @param {string} id The id of the folder
   * @returns {array<object>} Array of folders
   */
  getHierarchyFolderCache(id) {
    // When resources are not in a folder
    if (id === null) {
      return [];
    }
    // Process the hierarchy with a cache map by folder id
    if (typeof this.hierarchyFolderCache[id] === "undefined") {
      this.hierarchyFolderCache[id] = this.getHierarchyFolder(id);
    }
    return this.hierarchyFolderCache[id];
  }

  /**
   * Get the hierarchy of a folder by ID in cache
   * @param {string} id The id of the folder
   * @returns {*[]}
   */
  getHierarchyFolder(id) {
    const hierarchy = [];
    let currentFolderId = id;
    while (currentFolderId) {
      const folder = this.state.foldersMapById[currentFolderId];
      // Prevent issue if foldersMapById is not loaded yet
      if (!folder) {
        return hierarchy;
      }
      hierarchy.unshift(folder);
      currentFolderId = folder.folder_parent_id;
    }
    return hierarchy;
  }

  /*
   * =============================================================
   *  State changes on local storage change
   * =============================================================
   */
  /**
   * Handle the change in the storage
   * @param changes
   */
  handleStorageChange(changes) {
    if (changes.resources && changes.resources.newValue) {
      const resources = changes.resources.newValue;
      this.setState({resources});
    }
    if (changes._passbolt_data && changes._passbolt_data.newValue) {
      const userData = changes._passbolt_data.newValue;
      const userSettings = new UserSettings(userData.config);
      this.setState({userSettings});
    }
    if (changes.folders && changes.folders.newValue) {
      const folders = changes.folders.newValue;
      const foldersMapById = folders.reduce((result, folder) => {
        result[folder.id] = folder;
        return result;
      }, {});
      this.hierarchyFolderCache = {};
      this.setState({folders, foldersMapById});
    }
    if (changes.users && changes.users.newValue) {
      const users = changes.users.newValue;
      this.setState({users});
    }
    const storageKey = `groups-${this.state.account.id}`;
    if (changes[storageKey] && changes[storageKey].newValue) {
      const groups = changes[storageKey].newValue;
      this.setState({groups});
    }
    if (changes.roles && changes.roles.newValue) {
      const roles = changes.roles.newValue;
      this.setState({roles});
    }
  }

  /**
   * Listen when the user wants to logout.
   */
  onLogoutRequested() {
    const requestLogout = () => this.props.port.request('passbolt.auth.logout', true);
    // Indicate that the session is logout by the user before requesting a logout
    this.setState({isSessionLogoutByUser: true}, requestLogout);
  }

  /**
   * Listen when the user session is expired.
   * @param {function} callback The callback to execute
   */
  onExpiredSession(callback) {
    const displayExpiredSession = () => {
      if (!this.state.isSessionLogoutByUser) {
        callback();
        // Flush resources to not leave sensitive data
        this.setState({resources: []});
      }
    };
    this.props.port.on('passbolt.auth.after-logout', displayExpiredSession);
  }

  /**
   * Whenever the subscription key is requested
   */
  async onGetSubscriptionKeyRequested() {
    return await this.props.port.request("passbolt.subscription.get");
  }

  /**
   * Whenever the update of the locale is requested
   */
  async onUpdateLocaleRequested() {
    const {locale} = await this.props.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.isReady() && this.props.children}
      </AppContext.Provider>
    );
  }
}

ExtAppContextProvider.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
  children: PropTypes.any // The children components
};

export default ExtAppContextProvider;
