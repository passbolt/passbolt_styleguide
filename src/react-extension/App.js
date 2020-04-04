import React, { Component} from "react";
import FolderCreateDialog from "./components/Folder/FolderCreateDialog/FolderCreateDialog";
import ErrorDialog from "./components/Common/ErrorDialog/ErrorDialog";
import ShareDialog from "./components/Share/ShareDialog";
import PasswordCreateDialog from "./components/Password/PasswordCreateDialog/PasswordCreateDialog";
import PasswordEditDialog from "./components/Password/PasswordEditDialog/PasswordEditDialog";
import ProgressDialog from "./components/ProgressDialog/ProgressDialog";
import PassphraseEntryDialog from "./components/Passphrase/PassphraseEntryDialog/PassphraseEntryDialog";

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
            <li><a onClick={() => this.onShowDialog('showFolderRenameDialog')}>Rename folder dialog</a></li>
          </ul>
        </div>
        }
        {this.state.showPasswordCreateDialog &&
        <PasswordCreateDialog onClose={this.onDialogClose}/>
        }
        {this.state.showPasswordEditDialog &&
        <PasswordEditDialog onClose={this.onDialogClose}/>
        }
        {this.state.showFolderCreateDialog &&
        <FolderCreateDialog onClose={this.onDialogClose} folderParentId='123e4567-e89b-12d3-a456-426655440000'/>
        }
        {this.state.showFolderRenameDialog &&
        <FolderRenameDialog onClose={this.onDialogClose}/>
        }
        {this.state.showPassphraseEntryDialog &&
        <PassphraseEntryDialog onClose={this.onDialogClose}/>
        }
        {this.state.showProgressDialog &&
        <ProgressDialog onClose={this.onDialogClose}/>
        }
        {this.state.showShareDialog &&
        <ShareDialog onClose={this.onDialogClose} resourcesIds={this.state.shareResources} />
        }
        {this.state.showErrorDialog &&
        <ErrorDialog onClose={this.onDialogClose} title="test title" message="test message"/>
        }
      </div>
    );
  }
}

export default App;
