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
import React, { Component} from "react";

import ErrorDialog from "./components/Common/ErrorDialog/ErrorDialog";
import FolderCreateDialog from "./components/Folder/FolderCreateDialog/FolderCreateDialog";
import FolderRenameDialog from "./components/Folder/FolderRenameDialog/FolderRenameDialog";
import PassphraseEntryDialog from "./components/Passphrase/PassphraseEntryDialog/PassphraseEntryDialog";
import PasswordCreateDialog from "./components/Password/PasswordCreateDialog/PasswordCreateDialog";
import PasswordEditDialog from "./components/Password/PasswordEditDialog/PasswordEditDialog";
import ProgressDialog from "./components/ProgressDialog/ProgressDialog";
import ShareDialog from "./components/Share/ShareDialog";
import FolderDeleteDialog from "./components/Folder/FolderDeleteDialog/FolderDeleteDialog";

class App extends Component{
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindEventHandlers();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    let shareResources = await port.request('passbolt.share.get-resources-ids');
    this.setState({shareResources});
  }

  getDefaultState() {
    return {
      showStart: true,
      showErrorDialog: false,
      showFolderCreateDialog: false,
      showFolderDeleteDialog: false,
      showFolderRenameDialog: false,
      showPassphraseEntryDialog: false,
      showPasswordCreateDialog: false,
      showPasswordEditDialog: false,
      showProgressDialog: false,
      showShareDialog: false
    }
  }

  async getResetState() {
    const state = this.getDefaultState();
    state.shareResources = this.state.shareResources;
    state.showStart = false;
    return state;
  }

  async onShowDialog(slug) {
    const state = await this.getResetState();
    state[slug] = true;
    this.setState(state);
  }

  bindEventHandlers() {
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onShowDialog = this.onShowDialog.bind(this);
  }

  async onDialogClose() {
    const state = await this.getResetState();
    state.showStart = true;
    this.setState(state);
  }

  render(){
    return(
      <div id="container" className="page">
        {this.state.showStart &&
        <div style={{padding:'1em'}}>
          <h1>Misc</h1>
          <ul>
            <li><a onClick={() => this.onShowDialog('showProgressDialog')}>Progress dialog</a></li>
            <li><a onClick={() => this.onShowDialog('showPassphraseEntryDialog')}>Passphrase entry dialog</a></li>
            <li><a onClick={() => this.onShowDialog('showShareDialog')}>Share dialog</a></li>
            <li><a onClick={() => this.onShowDialog('showErrorDialog')}>Show error dialog</a></li>
          </ul>
          <h1>Password</h1>
          <ul>
            <li><a onClick={() => this.onShowDialog('showPasswordCreateDialog')}>Create password dialog</a></li>
            <li><a onClick={() => this.onShowDialog('showPasswordEditDialog')}>Edit password dialog</a></li>
          </ul>
          <h1>Folder</h1>
          <ul>
            <li><a onClick={() => this.onShowDialog('showFolderCreateDialog')}>Create folder dialog</a></li>
            <li><a onClick={() => this.onShowDialog('showFolderDeleteDialog')}>Delete folder dialog</a></li>
            <li><a onClick={() => this.onShowDialog('showFolderRenameDialog')}>Rename folder dialog</a></li>
          </ul>
        </div>
        }
        {this.state.showPasswordCreateDialog &&
        <PasswordCreateDialog onClose={this.onDialogClose}/>
        }
        {this.state.showPasswordEditDialog &&
        <PasswordEditDialog onClose={this.onDialogClose} id='8e3874ae-4b40-590b-968a-418f704b9d9a'/>
        }
        {this.state.showFolderCreateDialog &&
        <FolderCreateDialog onClose={this.onDialogClose} folderParentId='123e4567-e89b-12d3-a456-426655440000'/>
        }
        {this.state.showFolderRenameDialog &&
        <FolderRenameDialog onClose={this.onDialogClose} folderId='0d0a4b82-4757-4389-88bf-3dd18c1b8d75'/>
        }
        {this.state.showFolderDeleteDialog &&
        <FolderDeleteDialog onClose={this.onDialogClose} folderId='0d0a4b82-4757-4389-88bf-3dd18c1b8d75'/>
        }
        {this.state.showPassphraseEntryDialog &&
        <PassphraseEntryDialog onClose={this.onDialogClose}/>
        }
        {this.state.showProgressDialog &&
        <ProgressDialog title="Progress dialog test" message="Please wait..."  goals={3}/>
        }
        {this.state.showShareDialog &&
        <ShareDialog onClose={this.onDialogClose} resourcesIds={this.state.shareResources}/>
        }
        {this.state.showErrorDialog &&
        <ErrorDialog onClose={this.onDialogClose} title="test title" message="test message"/>
        }
      </div>
    );
  }
}

export default App;
