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
import PasswordCreateDialog from "./components/Password/PasswordCreateDialog/PasswordCreateDialog";
import PasswordEditDialog from "./components/Password/PasswordEditDialog/PasswordEditDialog";
import AppContext from './contexts/AppContext';
import PropTypes from "prop-types";
import MainMenu from "./components/Common/Navigation/MainMenu/MainMenu";
import PasswordWorkspace from "./components/Password/PasswordWorkspace/PasswordWorkspace";
import SiteSettings from "./lib/Settings/SiteSettings";
import UserSettings from "./lib/Settings/UserSettings";
import ActionFeedbackContextProvider from "./contexts/ActionFeedbackContext";
import ShareActionFeedbacks from "./components/Share/ShareActionFeedbacks";
import DialogContextProvider from "./contexts/DialogContext";
import ManageDialogs from "./components/Dialog/ManageDialogs";
import HandleFolderMoveStrategyDialogEvents
  from "./components/Folder/HandleFolderMoveStrategyDialogEvents/HandleFolderMoveStrategyDialogEvents";
import HandleProgressDialogEvents
  from "./components/ProgressDialog/HandleProgressDialogEvents/HandleProgressDialogEvents";
import HandleErrorDialogEvents from "./components/Error/HandleErrorDialogEvents/HandleErrorDialogEvents";
import HandlePassphraseEntryDialogEvents
  from "./components/Passphrase/HandlePassphraseEntryDialogEvents/HandlePassphraseEntryDialogEvents";
import ContextualMenuContextProvider from "./contexts/Common/ContextualMenuContext";
import ManageContextualMenu from "./components/ManageContextualMenu";



class ReactExtension extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.bindCallbacks();
    this.initEventHandlers();
  }

  async componentDidMount() {
    this.getSiteSettings();
    this.getUserSettings();
    this.getLoggedInUser();
    this.getResources();
    this.getResourceTypes();
    this.getFolders();
  }

  getDefaultState(props) {
    return {
      port: props.port,
      storage: props.storage,

      user: null,
      resources: null,
      folders: null,

      siteSettings: null,
      userSettings: null,

      setContext: (context) => {
        this.setState(context);
      },

      // passphrase dialog
      passphraseRequestId: '',

      // Resource create / edit dialogs
      showResourceCreateDialog: false,
      resourceCreateDialogProps: {
        folderParentId: null
      },
      showPasswordEditDialog: false,
      passwordEditDialogProps: {
        id: null
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

      // tag dialog
      tagToEdit: null, // The current tag to edit
      tagToDelete: null, // The current tag to delete

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
    this.handleResourceCreateDialogOpenEvent = this.handleResourceCreateDialogOpenEvent.bind(this);
    this.handleResourceCreateDialogCloseEvent = this.handleResourceCreateDialogCloseEvent.bind(this);
    this.handleResourceEditDialogOpenEvent = this.handleResourceEditDialogOpenEvent.bind(this);
    this.handleResourceEditDialogCloseEvent = this.handleResourceEditDialogCloseEvent.bind(this);
  }

  initEventHandlers() {
    this.props.storage.onChanged.addListener(this.handleStorageChange);
    this.props.port.on('passbolt.react-app.is-ready', this.handleIsReadyEvent);
    this.props.port.on('passbolt.resources.open-create-dialog', this.handleResourceCreateDialogOpenEvent);
    this.props.port.on('passbolt.resources.open-edit-dialog', this.handleResourceEditDialogOpenEvent);

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

  async getLoggedInUser() {
    const currentUser = await this.props.port.request("passbolt.user.get");
    this.setState({currentUser});
  }

  async getResources() {
    const storageData = await this.props.storage.local.get(["resources"]);
    if (storageData.resources && storageData.resources.length) {
      const resources = storageData.resources;
      this.setState({resources: resources});
    }
  }

  async getResourceTypes() {
    const storageData = await this.props.storage.local.get(["resourceTypes"]);
    if (storageData.resourceTypes && storageData.resourceTypes.length) {
      const resourceTypes = storageData.resourceTypes;
      this.setState({resourceTypes: resourceTypes});
    }
  }

  async getFolders() {
    const storageData = await this.props.storage.local.get(["folders"]);
    if (storageData.folders && storageData.folders.length) {
      const folders = storageData.folders;
      this.setState({folders: folders});
    }
  }

  async getUserSettings() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    const userSettings = new UserSettings(storageData._passbolt_data.config);
    this.setState({userSettings});
  }

  async getSiteSettings() {
    const settings = await this.props.port.request("passbolt.site.settings");
    const siteSettings = new SiteSettings(settings);
    this.setState({siteSettings});
  }

  handleStorageChange(changes) {
    if (changes.resources) {
      const resources = changes.resources.newValue;
      this.setState({resources: resources});
    }
    if (changes.resourceTypes) {
      const resourceTypes = changes.resourceTypes.newValue;
      this.setState({resourceTypes: resourceTypes});
    }
    if (changes.folders) {
      const folders = changes.folders.newValue;
      this.setState({folders: folders});
    }
  }


  /*
   * =============================================================
   *  Resource Dialogs Events
   * =============================================================
   */

  handleResourceCreateDialogOpenEvent(folderParentId) {
    const showResourceCreateDialog = true;
    const resourceCreateDialogProps = {folderParentId: folderParentId};
    this.setState({showResourceCreateDialog, resourceCreateDialogProps});
  }

  handleResourceCreateDialogCloseEvent() {
    const showResourceCreateDialog = false;
    const resourceCreateDialogProps = {};
    this.setState({showResourceCreateDialog, resourceCreateDialogProps});
  }

  handleResourceEditDialogOpenEvent(id) {
    const showPasswordEditDialog = true;
    const passwordEditDialogProps = {id};
    this.setState({showPasswordEditDialog, passwordEditDialogProps});
  }

  handleResourceEditDialogCloseEvent() {
    const showPasswordEditDialog = false;
    const passwordEditDialogProps = {};
    this.setState({showPasswordEditDialog, passwordEditDialogProps});
  }

  /*
   * =============================================================
   *  View
   * =============================================================
   */
  render() {
    const isReady = this.isReady();
    const areResourcesLoaded = this.state.resources !== null && this.state.resources.length > 0;
    const areFoldersLoaded = this.state.folders !== null && this.state.folders.length > 0;

    return (
      <AppContext.Provider value={this.state}>
        <ActionFeedbackContextProvider>
          <DialogContextProvider>
            <ContextualMenuContextProvider>

              { /* Contextual Menu Management */}
              <ManageContextualMenu/>

            { /* Action Feedback Management */ }
            <ShareActionFeedbacks/>

            { /* Dialogs Management */ }
            <HandlePassphraseEntryDialogEvents/>
            <HandleFolderMoveStrategyDialogEvents/>
            <HandleProgressDialogEvents/>
            <HandleErrorDialogEvents/>
            <ManageDialogs/>

            <Router>
              <div id="container" className="page">
            {isReady &&
            <div id="app" className={`app ${isReady ? "ready" : ""}`} tabIndex="1000">
              {this.state.showResourceCreateDialog &&
              <PasswordCreateDialog onClose={this.handleResourceCreateDialogCloseEvent}
                folderParentId={this.state.resourceCreateDialogProps.folderParentId}
                resourceTypes={this.state.resourceTypes}
              />
              }
              {this.state.showPasswordEditDialog && areResourcesLoaded &&
              <PasswordEditDialog onClose={this.handleResourceEditDialogCloseEvent}
                id={this.state.passwordEditDialogProps.id}
                resourceTypes={this.state.resourceTypes}
              />
              }

              <div className="header first">
                <MainMenu onClick={this.handleWorkspaceSelect} baseUrl={this.state.userSettings.getTrustedDomain()}/>
              </div>


              <Switch>
                <Route path={[
                  "/app/folders/view/:filterByFolderId",
                  "/app/passwords/view/:selectedResourceId",
                  "/app/passwords",
                ]}>
                  <PasswordWorkspace onMenuItemClick={this.handleWorkspaceSelect}/>
                </Route>
              </Switch>
            </div>
            }
          </div>
            </Router>
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
