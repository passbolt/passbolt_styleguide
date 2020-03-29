import React, { Component} from "react";
import {hot} from "react-hot-loader";
import FolderCreateDialog from "./components/Folder/FolderCreateDialog/FolderCreateDialog";
import ErrorDialog from "./components/Common/ErrorDialog/ErrorDialog";
import ShareDialog from "./components/Share/ShareDialog";
import Autocomplete from "./components/Common/Autocomplete/Autocomplete";
// import "./App.css";

class App extends Component{
  constructor() {
    super();
    this.state = this.getDefaultState();
    this.bindEventHandlers();
  }

  async componentDidMount() {
    let shareResources = await port.request('passbolt.share.get-resources-ids');
    this.setState({shareResources});
  }

  getDefaultState() {
    return {
      showStart: true,
      showFolderCreateDialog: false,
      showShareDialog: false
    }
  }

  bindEventHandlers() {
    this.onDialogClose = this.onDialogClose.bind(this);
  }

  onDialogClose() {
    this.setState({shareResources: this.state.shareResources, ...this.getDefaultState()});
  }

  showFolderCreateDialog () {
    this.setState({showFolderCreateDialog: true, showStart:false});
  }

  showShareDialog () {
    this.setState({showShareDialog: true, showStart:false});
  }

  async getShareFixtures() {
    return await port.request('passbolt.share.get-resources-ids');
  }

  render(){
    return(
      <div id="container" className="page">
        <div>
          <h1>Demo</h1>
          <ul>
            <li><a onClick={this.showFolderCreateDialog.bind(this)}>Create folder dialog</a></li>
            <li><a onClick={this.showShareDialog.bind(this)}>Share dialog</a></li>
          </ul>
        </div>
        {this.state.showFolderCreateDialog &&
        <FolderCreateDialog onClose={this.onDialogClose} folderParentId='123e4567-e89b-12d3-a456-426655440000'/>
        }
        {this.state.showShareDialog &&
        <ShareDialog onClose={this.onDialogClose} resourcesIds={this.state.shareResources} />
        }
      </div>
    );
  }
}

export default hot(module)(App);
