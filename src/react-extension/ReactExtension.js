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
 * @since         2.12.0
 */

/* eslint-disable no-unused-vars */
import Simplebar from "simplebar/dist/simplebar";
/* eslint-enable no-unused-vars */
import React, {Component} from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import AppContext from './contexts/AppContext';
import PropTypes from "prop-types";
import DisplayMainMenu from "./components/navigation/DisplayMainMenu";
import PasswordWorkspace from "./components/Password/PasswordWorkspace/PasswordWorkspace";
import SiteSettings from "./lib/Settings/SiteSettings";
import UserSettings from "./lib/Settings/UserSettings";
import ResourceTypesSettings from "./lib/Settings/ResourceTypesSettings";
import ActionFeedbackContextProvider from "./contexts/ActionFeedbackContext";
import ShareActionFeedbacks from "./components/Share/ShareActionFeedbacks";
import DialogContextProvider from "./contexts/Common/DialogContext";
import ManageDialogs from "./components/Common/Dialog/ManageDialogs/ManageDialogs";
import HandlePassphraseEntryDialogEvents
  from "./components/Passphrase/HandlePassphraseEntryDialogEvents/HandlePassphraseEntryDialogEvents";
import HandleProgressDialogEvents
  from "./components/ProgressDialog/HandleProgressDialogEvents/HandleProgressDialogEvents";
import HandleErrorDialogEvents from "./components/Error/HandleErrorDialogEvents/HandleErrorDialogEvents";
import ResourceWorkspaceContextProvider from "./contexts/ResourceWorkspaceContext";
import UserWorkspaceContextProvider from "./contexts/UserWorkspaceContext";
import ContextualMenuContextProvider from "./contexts/Common/ContextualMenuContext";
import ManageContextualMenu from "./components/ManageContextualMenu";
import HandleFolderMoveStrategyDialogEvents
  from "./components/Folder/HandleFolderMoveStrategyDialogEvents/HandleFolderMoveStrategyDialogEvents";
import ManageLoading from "./components/Common/Loading/ManageLoading/ManageLoading";
import LoadingContextProvider from "./contexts/Common/LoadingContext";
import Footer from "./components/Footer/Footer";
import DisplayUserWorkspace from "./components/User/DisplayUserWorkspace/DisplayUserWorkspace";
import HandleRouteFallback from "./components/Route/HandleRouteFallback";
import DisplayUserSettingsWorkspace
  from "./components/UserSetting/DisplayUserSettingsWorkspace/DisplayUserSettingsWorkspace";
import HandleSessionExpired
  from "./components/Auth/HandleSessionExpired/HandleSessionExpired";

class ReactExtension extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.bindCallbacks();
    this.initEventHandlers();
  }

  async componentDidMount() {
    await this.getSiteSettings();
    this.getUserSettings();
    this.getLoggedInUser();
    this.getResources();
    this.getResourceTypes();
    this.getFolders();
    this.getGroups();
    this.getUsers();
    this.getRoles();
  }

  getDefaultState(props) {
    return {
      port: props.port,
      storage: props.storage,

      user: null,
      resources: null,
      folders: null,
      users: null, // The current list of all users
      groups: null,

      siteSettings: null,
      userSettings: null,

      setContext: context => {
        this.setState(context);
      },

      // passphrase dialog
      passphraseRequestId: '',

      // Resource create / edit / delete dialogs
      resourceCreateDialogProps: {
        folderParentId: null
      },

      passwordEditDialogProps: {
        id: null
      },
      passwordDeleteDialogProps: {
        resources: null
      },

      // folder dialogs
      folder: {},
      folderCreateDialogProps: {
        folderParentId: null
      },
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

      // progress dialog
      progressDialogProps: {},

      // error dialog
      errorDialogProps: {
        title: null,
        message: null
      },

      // Resource comment dialog
      resourceCommentId: null, // Selected resource comment id
      mustRefreshComments: false // Flag telling whether the current list of comments should be refreshed
    };
  }

  bindCallbacks() {
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.handleIsReadyEvent = this.handleIsReadyEvent.bind(this);
  }

  initEventHandlers() {
    this.props.storage.onChanged.addListener(this.handleStorageChange);
    this.props.port.on('passbolt.react-app.is-ready', this.handleIsReadyEvent);
  }

  handleIsReadyEvent(requestId) {
    if (this.isReady()) {
      this.props.port.emit(requestId, "SUCCESS");
    } else {
      this.props.port.emit(requestId, "ERROR");
    }
  }

  isReady() {
    return this.state.userSettings !== null && this.state.siteSettings !== null;
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
    const loggedInUser = await this.props.port.request("passbolt.users.find-logged-in-user");
    this.setState({loggedInUser});
  }

  /**
   * Get the list of site settings from background page and set it in the state
   * Using SiteSettings
   */
  async getSiteSettings() {
    const settings = await this.props.port.request("passbolt.site.settings");
    const siteSettings = new SiteSettings(settings);
    this.setState({siteSettings});
  }

  /**
   * Get the list of resources from local storage and set it in the state
   */
  async getResources() {
    const storageData = await this.props.storage.local.get(["resources"]);
    if (storageData.resources && storageData.resources.length) {
      const resources = storageData.resources;
      this.setState({resources: resources});
    }
  }

  /**
   * Get the list of folders from local storage and set it in the state
   */
  async getFolders() {
    const storageData = await this.props.storage.local.get(["folders"]);
    if (storageData.folders && storageData.folders.length) {
      const folders = storageData.folders;
      this.setState({folders: folders});
    }
  }

  /**
   * Returns the list of all groups
   */
  async getGroups() {
    const storageData = await this.props.storage.local.get(["groups"]);
    if (storageData.groups && storageData.groups.length) {
      const groups = storageData.groups;
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
    const storageData = await this.props.storage.local.get(["roles"]);
    if (storageData.roles && storageData.roles.length) {
      const roles = storageData.roles;
      this.setState({roles});
    }
  }

  /**
   * Get the list of resource types from local storage and set it in the state
   * Using ResourceTypesSettings
   */
  async getResourceTypes() {
    const storageData = await this.props.storage.local.get(["resourceTypes"]);
    let resourceTypes = [];
    if (storageData.resourceTypes && storageData.resourceTypes.length) {
      resourceTypes = storageData.resourceTypes;
    }
    const resourceTypesSettings = new ResourceTypesSettings(this.state.siteSettings, resourceTypes);
    this.setState({resourceTypesSettings});
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
    if (changes.resourceTypes && changes.resourceTypes.newValue) {
      const resourceTypes = changes.resourceTypes.newValue;
      const resourceTypesSettings = new ResourceTypesSettings(this.state.siteSettings, resourceTypes);
      this.setState({resourceTypesSettings});
    }
    if (changes.folders && changes.folders.newValue) {
      const folders = changes.folders.newValue;
      this.setState({folders});
    }
    if (changes.users && changes.users.newValue) {
      const users = changes.users.newValue;
      this.setState({users});
    }
    if (changes.groups && changes.groups.newValue) {
      const groups = changes.groups.newValue;
      this.setState({groups});
    }
    if (changes.roles && changes.roles.newValue) {
      const roles = changes.roles.newValue;
      this.setState({roles});
    }
  }

  /*
   * =============================================================
   *  View
   * =============================================================
   */
  render() {
    const isReady = this.isReady();

    return (
      <AppContext.Provider value={this.state}>
        <ActionFeedbackContextProvider>
          <DialogContextProvider>
            <ContextualMenuContextProvider>
              <LoadingContextProvider>

                { /* Action Feedback Management */}
                <ShareActionFeedbacks/>

                { /* Dialogs Management */}
                <HandlePassphraseEntryDialogEvents/>
                <HandleFolderMoveStrategyDialogEvents/>
                <HandleProgressDialogEvents/>
                <HandleErrorDialogEvents/>
                <HandleSessionExpired/>

                <Router>
                  <Switch>
                    <Route path={[
                      "/app/folders/view/:filterByFolderId",
                      "/app/passwords/view/:selectedResourceId",
                      "/app/passwords",
                    ]}>
                      {isReady &&
                      <ResourceWorkspaceContextProvider>
                        <ManageDialogs/>
                        <ManageContextualMenu/>
                        <div id="container" className="page password">
                          <div id="app" className={`app ${isReady ? "ready" : ""}`} tabIndex="1000">
                            <div className="header first">
                              <DisplayMainMenu/>
                            </div>
                            <PasswordWorkspace onMenuItemClick={this.handleWorkspaceSelect}/>
                          </div>
                        </div>
                      </ResourceWorkspaceContextProvider>
                      }

                    </Route>
                    <Route path={[
                      "/app/groups/view/:selectedGroupId",
                      "/app/users/view/:selectedUserId",
                      "/app/users",
                    ]}>
                      {isReady &&
                      <UserWorkspaceContextProvider>
                        <ManageDialogs/>
                        <ManageContextualMenu/>
                        <div id="container" className="page user">
                          <div id="app" className={`app ${isReady ? "ready" : ""}`} tabIndex="1000">
                            <div className="header first">
                              <DisplayMainMenu/>
                            </div>
                            <DisplayUserWorkspace/>
                          </div>
                        </div>
                      </UserWorkspaceContextProvider>
                      }
                    </Route>
                    <Route path={"/app/settings"}>
                      {isReady &&
                        <>
                          <ManageDialogs/>
                          <div id="container" className="page settings">
                            <div id="app" className={`app ${isReady ? "ready" : ""}`} tabIndex="1000">
                              <div className="header first">
                                <DisplayMainMenu/>
                              </div>
                              <DisplayUserSettingsWorkspace/>
                            </div>
                          </div>
                        </>
                      }

                    </Route>
                    <Route path="/">
                      <HandleRouteFallback/>
                    </Route>
                  </Switch>
                </Router>
                <ManageLoading/>
                <Footer/>
              </LoadingContextProvider>
            </ContextualMenuContextProvider>
          </DialogContextProvider>
        </ActionFeedbackContextProvider>
      </AppContext.Provider>
    );
  }
}

ReactExtension.contextType = AppContext;

ReactExtension.propTypes = {
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default ReactExtension;
