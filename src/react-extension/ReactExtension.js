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
import ErrorDialog from "./components/Common/Dialog/ErrorDialog/ErrorDialog";
import PasswordCreateDialog from "./components/Password/PasswordCreateDialog/PasswordCreateDialog";
import PasswordEditDialog from "./components/Password/PasswordEditDialog/PasswordEditDialog";
import FolderCreateDialog from "./components/Folder/FolderCreateDialog/FolderCreateDialog";
import FolderRenameDialog from "./components/Folder/FolderRenameDialog/FolderRenameDialog";
import FolderDeleteDialog from "./components/Folder/FolderDeleteDialog/FolderDeleteDialog";
import ProgressDialog from "./components/ProgressDialog/ProgressDialog";
import PassphraseEntryDialog from "./components/Passphrase/PassphraseEntryDialog/PassphraseEntryDialog";
import ShareDialog from "./components/Share/ShareDialog";
import FolderMoveStrategyDialog from "./components/Folder/FolderMoveStrategyDialog/FolderMoveStrategyDialog";
import AppContext from './contexts/AppContext';
import PropTypes from "prop-types";
import MainMenu from "./components/Common/Navigation/MainMenu/MainMenu";
import PasswordWorkspace from "./components/Password/PasswordWorkspace/PasswordWorkspace";
import SiteSettings from "./lib/Settings/SiteSettings";
import UserSettings from "./lib/Settings/UserSettings";
import ActionFeedbackContextProvider from "./contexts/ActionFeedbackContext";
import ShareActionFeedbacks from "./components/Share/ShareActionFeedbacks";
import TagEditDialog from "./components/Tag/TagEditDialog/TagEditDialog";
import TagDeleteDialog from "./components/Tag/TagDeleteDialog/TagDeleteDialog";
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
      showPassphraseEntryDialog: false,
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
      showFolderCreateDialog: false,
      folderCreateDialogProps: {
        folderParentId: null
      },
      showFolderRenameDialog: false,
      showFolderDeleteDialog: false,
      showFolderMoveStrategyDialog: false,
      folderMoveStrategyProps: {
        requestId: null,
        folderId: null,
        foldersIds: [],
        resourcesIds: []
      },

      // share dialog
      showShareDialog: false,
      shareDialogProps: {
        foldersIds: null,
        resourcesIds: null,
      },

      // tag dialog
      showTagEditDialog: false,
      tagEditDialogProps: {
        id: null,
        slug: null,
      },
      showTagDeleteDialog: false,
      tagDeleteDialogProps: {
        id: null,
      },

      // progress dialog
      showProgressDialog: false,
      progressDialogProps: {},

      // error dialog
      showErrorDialog: false,
      errorDialogProps: {
        title: null,
        message: null
      },

      // Resource comment dialog
      resourceCommentId: null, // Selected resource comment id
      showDeleteCommentDialog: false, // Flag telling whether the delete comment should be displayed
      mustRefreshComments: false // Flag telling whether the current list of comments should be refreshed
    };
  }

  bindCallbacks() {
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.handleIsReadyEvent = this.handleIsReadyEvent.bind(this);
    this.handleErrorDialogOpenEvent = this.handleErrorDialogOpenEvent.bind(this);
    this.handleErrorDialogCloseEvent = this.handleErrorDialogCloseEvent.bind(this);
    this.handlePassphraseEntryRequestEvent = this.handlePassphraseEntryRequestEvent.bind(this);
    this.handlePassphraseDialogClose = this.handlePassphraseDialogClose.bind(this);
    this.handleProgressDialogOpenEvent = this.handleProgressDialogOpenEvent.bind(this);
    this.handleProgressDialogUpdateEvent = this.handleProgressDialogUpdateEvent.bind(this);
    this.handleProgressDialogUpdateGoalsEvent = this.handleProgressDialogUpdateGoalsEvent.bind(this);
    this.handleProgressDialogCloseEvent = this.handleProgressDialogCloseEvent.bind(this);
    this.handleResourceCreateDialogOpenEvent = this.handleResourceCreateDialogOpenEvent.bind(this);
    this.handleResourceCreateDialogCloseEvent = this.handleResourceCreateDialogCloseEvent.bind(this);
    this.handleResourceEditDialogOpenEvent = this.handleResourceEditDialogOpenEvent.bind(this);
    this.handleResourceEditDialogCloseEvent = this.handleResourceEditDialogCloseEvent.bind(this);
    this.handleFolderCreateDialogOpenEvent = this.handleFolderCreateDialogOpenEvent.bind(this);
    this.handleFolderCreateDialogCloseEvent = this.handleFolderCreateDialogCloseEvent.bind(this);
    this.handleFolderRenameDialogOpenEvent = this.handleFolderRenameDialogOpenEvent.bind(this);
    this.handleFolderRenameDialogCloseEvent = this.handleFolderRenameDialogCloseEvent.bind(this);
    this.handleFolderDeleteDialogOpenEvent = this.handleFolderDeleteDialogOpenEvent.bind(this);
    this.handleFolderDeleteDialogCloseEvent = this.handleFolderDeleteDialogCloseEvent.bind(this);
    this.handleFolderMoveStrategyRequestEvent = this.handleFolderMoveStrategyRequestEvent.bind(this);
    this.handleFolderMoveStrategyDialogCloseEvent = this.handleFolderMoveStrategyDialogCloseEvent.bind(this);
    this.handleShareDialogOpenEvent = this.handleShareDialogOpenEvent.bind(this);
    this.handleShareDialogCloseEvent = this.handleShareDialogCloseEvent.bind(this);
    this.handleTagEditDialogOpenEvent = this.handleTagEditDialogOpenEvent.bind(this);
    this.handleTagEditDialogCloseEvent = this.handleTagEditDialogCloseEvent.bind(this);
    this.handleTagDeleteDialogOpenEvent = this.handleTagDeleteDialogOpenEvent.bind(this);
    this.handleTagDeleteDialogCloseEvent = this.handleTagDeleteDialogCloseEvent.bind(this);
  }

  initEventHandlers() {
    this.props.storage.onChanged.addListener(this.handleStorageChange);
    this.props.port.on('passbolt.react-app.is-ready', this.handleIsReadyEvent);
    this.props.port.on('passbolt.errors.open-error-dialog', this.handleErrorDialogOpenEvent);
    this.props.port.on('passbolt.progress.open-progress-dialog', this.handleProgressDialogOpenEvent);
    this.props.port.on("passbolt.progress.update", this.handleProgressDialogUpdateEvent);
    this.props.port.on("passbolt.progress.update-goals", this.handleProgressDialogUpdateGoalsEvent);
    this.props.port.on('passbolt.progress.close-progress-dialog', this.handleProgressDialogCloseEvent);
    this.props.port.on('passbolt.resources.open-create-dialog', this.handleResourceCreateDialogOpenEvent);
    this.props.port.on('passbolt.resources.open-edit-dialog', this.handleResourceEditDialogOpenEvent);
    this.props.port.on('passbolt.folders.open-create-dialog', this.handleFolderCreateDialogOpenEvent);
    this.props.port.on('passbolt.folders.open-rename-dialog', this.handleFolderRenameDialogOpenEvent);
    this.props.port.on('passbolt.folders.open-delete-dialog', this.handleFolderDeleteDialogOpenEvent);
    this.props.port.on('passbolt.share.open-share-dialog', this.handleShareDialogOpenEvent);
    this.props.port.on('passbolt.tags.open-edit-dialog', this.handleTagEditDialogOpenEvent);
    this.props.port.on('passbolt.tags.open-delete-dialog', this.handleTagDeleteDialogOpenEvent);

    // requests: dialogs that return responses to controllers
    this.props.port.on('passbolt.passphrase.request', this.handlePassphraseEntryRequestEvent);
    this.props.port.on('passbolt.folders.move-strategy.request', this.handleFolderMoveStrategyRequestEvent);
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
   *  Generic error dialog events
   * =============================================================
   */

  handleErrorDialogOpenEvent(title, message) {
    const showErrorDialog = true;
    const errorDialogProps = {title: title, message: message};
    this.setState({showErrorDialog, errorDialogProps});
  }

  handleErrorDialogCloseEvent() {
    const showErrorDialog = false;
    const errorDialogProps = {};
    this.setState({showErrorDialog, errorDialogProps});
  }

  /*
   * =============================================================
   *  Passphrase  Events
   * =============================================================
   */

  handlePassphraseEntryRequestEvent(requestId) {
    const showPassphraseEntryDialog = true;
    const passphraseRequestId = requestId;
    this.setState({showPassphraseEntryDialog, passphraseRequestId});
  }

  handlePassphraseDialogClose() {
    const showPassphraseEntryDialog = false;
    const passphraseRequestId = {};
    this.setState({showPassphraseEntryDialog, passphraseRequestId});
  }

  /*
   * =============================================================
   *  Progress dialog events
   * =============================================================
   */

  handleProgressDialogOpenEvent(title, goals, message) {
    const showProgressDialog = true;
    const progressDialogProps = {title: title, message: message, goals: goals};
    this.setState({showProgressDialog, progressDialogProps});
  }

  handleProgressDialogUpdateEvent(message, completed) {
    const progressDialogProps = this.state.progressDialogProps;
    progressDialogProps.message = message || progressDialogProps.message;
    progressDialogProps.completed = completed;
    this.setState({progressDialogProps});
  }

  handleProgressDialogUpdateGoalsEvent(goals) {
    const progressDialogProps = this.state.progressDialogProps;
    progressDialogProps.goals = goals;
    this.setState({progressDialogProps});
  }

  handleProgressDialogCloseEvent() {
    const showProgressDialog = false;
    const progressDialogProps = {};
    this.setState({showProgressDialog, progressDialogProps});
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
   *  Share Dialog Events
   * =============================================================
   */

  handleShareDialogOpenEvent(itemsToShare) {
    const showShareDialog = true;
    const shareDialogProps = itemsToShare;
    this.setState({showShareDialog, shareDialogProps});
  }

  handleShareDialogCloseEvent() {
    const showShareDialog = false;
    const shareDialogProps = {};
    this.setState({showShareDialog, shareDialogProps});
  }

  /*
   * =============================================================
   *  Folder Dialogs Events
   * =============================================================
   */

  handleFolderCreateDialogOpenEvent(folderParentId) {
    const showFolderCreateDialog = true;
    const folderCreateDialogProps = {folderParentId: folderParentId};
    this.setState({showFolderCreateDialog, folderCreateDialogProps});
  }

  handleFolderCreateDialogCloseEvent() {
    const showFolderCreateDialog = false;
    const folderCreateDialogProps = {};
    this.setState({showFolderCreateDialog, folderCreateDialogProps});
  }

  handleFolderRenameDialogOpenEvent(folderId) {
    const showFolderRenameDialog = true;
    const folder = {id: folderId};
    this.setState({showFolderRenameDialog, folder});
  }

  handleFolderRenameDialogCloseEvent() {
    const showFolderRenameDialog = false;
    const folder = null;
    this.setState({showFolderRenameDialog, folder});
  }

  handleFolderDeleteDialogOpenEvent(folderId) {
    const showFolderDeleteDialog = true;
    const folder = {id: folderId};
    this.setState({showFolderDeleteDialog, folder});
  }

  handleFolderDeleteDialogCloseEvent() {
    const showFolderDeleteDialog = false;
    const folder = null;
    this.setState({showFolderDeleteDialog, folder});
  }

  handleFolderMoveStrategyRequestEvent(requestId, folderId, foldersIds, resourcesIds) {
    const showProgressDialog = false;
    const showFolderMoveStrategyDialog = true;
    const folderMoveStrategyProps = {requestId, folderId, foldersIds, resourcesIds};
    this.setState({showProgressDialog, showFolderMoveStrategyDialog, folderMoveStrategyProps});
  }

  handleFolderMoveStrategyDialogCloseEvent() {
    const showProgressDialog = true;
    const showFolderMoveStrategyDialog = false;
    const folderMoveStrategyProps = {};
    this.setState({showProgressDialog, showFolderMoveStrategyDialog, folderMoveStrategyProps});
  }

  /*
   * =============================================================
   *  Tags Dialogs Events
   * =============================================================
   */

  handleTagEditDialogOpenEvent(tag) {
    const showTagEditDialog = true;
    const tagEditDialogProps = tag;
    this.setState({showTagEditDialog, tagEditDialogProps});
  }

  handleTagEditDialogCloseEvent() {
    const showTagEditDialog = false;
    const tagEditDialogProps = {};
    this.setState({showTagEditDialog, tagEditDialogProps});
  }

  handleTagDeleteDialogOpenEvent(tag) {
    const showTagDeleteDialog = true;
    const tagDeleteDialogProps = tag;
    this.setState({showTagDeleteDialog, tagDeleteDialogProps});
  }

  handleTagDeleteDialogCloseEvent() {
    const showTagDeleteDialog = false;
    const tagDeleteDialogProps = {};
    this.setState({showTagDeleteDialog, tagDeleteDialogProps});
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
          <ShareActionFeedbacks/>
          <ContextualMenuContextProvider>
            <ManageContextualMenu/>
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
                {this.state.showFolderCreateDialog &&
                <FolderCreateDialog onClose={this.handleFolderCreateDialogCloseEvent}
                  folderParentId={this.state.folderCreateDialogProps.folderParentId}/>
                }
                {this.state.showFolderMoveStrategyDialog && areFoldersLoaded &&
                <FolderMoveStrategyDialog onClose={this.handleFolderMoveStrategyDialogCloseEvent}
                  folderId={this.state.folderMoveStrategyProps.folderId}
                  foldersIds={this.state.folderMoveStrategyProps.foldersIds}
                  resourcesIds={this.state.folderMoveStrategyProps.resourcesIds}
                  requestId={this.state.folderMoveStrategyProps.requestId}
                />
                }
                {this.state.showFolderRenameDialog && areFoldersLoaded &&
                <FolderRenameDialog onClose={this.handleFolderRenameDialogCloseEvent} folderId={this.state.folder.id}/>
                }
                {this.state.showFolderDeleteDialog && areFoldersLoaded &&
                <FolderDeleteDialog onClose={this.handleFolderDeleteDialogCloseEvent} folderId={this.state.folder.id}/>
                }
                {this.state.showShareDialog &&
                <ShareDialog resourcesIds={this.state.shareDialogProps.resourcesIds}
                  foldersIds={this.state.shareDialogProps.foldersIds}
                  onClose={this.handleShareDialogCloseEvent}/>
                }
                {this.state.showTagEditDialog && areResourcesLoaded &&
                <TagEditDialog onClose={this.handleTagEditDialogCloseEvent}
                               tag={this.state.tagEditDialogProps}
                />
                }
                {this.state.showTagDeleteDialog && areResourcesLoaded &&
                <TagDeleteDialog onClose={this.handleTagDeleteDialogCloseEvent}
                               tag={this.state.tagDeleteDialogProps}
                />
                }
                {
                  /*
                   * Hello traveller, leave these dialogs at the end
                   * so that they are displayed on top of your new dialog
                   */
                }
                {this.state.showProgressDialog &&
                <ProgressDialog title={this.state.progressDialogProps.title}
                  goals={this.state.progressDialogProps.goals}
                  message={this.state.progressDialogProps.message}
                  completed={this.state.progressDialogProps.completed}/>
                }
                {this.state.showPassphraseEntryDialog &&
                <PassphraseEntryDialog requestId={this.state.passphraseRequestId}
                  onClose={this.handlePassphraseDialogClose}/>
                }
                {this.state.showErrorDialog &&
                <ErrorDialog title={this.state.errorDialogProps.title}
                  message={this.state.errorDialogProps.message}
                  onClose={this.handleErrorDialogCloseEvent}/>
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
