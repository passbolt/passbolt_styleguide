import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import ReactExtension from "../../../../src/react-extension/ReactExtension.js";
import port from "../../mock/port";
import storage from "../../mock/storage";
import {BrowserRouter as Router, Link} from "react-router-dom";

class DemoReactExtension extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
    this.initEventHandlers();
    this.createElementRefs();
  }

  async componentDidMount() {
    const currentDemoName = window.localStorage.getItem("currentDemoName");
    const currentDemoOptions = window.localStorage.getItem("currentDemoOptions");
    if (currentDemoName) {
      let options = JSON.parse(currentDemoOptions);
      this.handleStartDemo(currentDemoName, options);
    }
  }

  getDefaultState() {
    return {
      showDemoMenu: true,
    };
  }

  bindCallbacks() {
    this.handleBackToDemoMenu = this.handleBackToDemoMenu.bind(this);
    this.handleStartDemo = this.handleStartDemo.bind(this);
  }

  initEventHandlers() {
  }

  createElementRefs() {
    this.reactExtensionElement = React.createRef();
  }

  handleBackToDemoMenu() {
    window.localStorage.setItem("currentDemoName", "");
    window.localStorage.setItem("currentDemoOptions", null);
    const showDemoMenu = true;
    this.setState({showDemoMenu});
  }

  async handleStartDemo(name, options) {
    console.log(`Load demo scenario: ${name}`);
    options = options || {};

    // Hide the menu and render the demo.
    const showDemoMenu = false;
    await new Promise(resolve => {
      this.setState({showDemoMenu}, resolve());
    });

    // Put the demo in the desired state.
    switch (name) {
      case "showPasswordCreateDialog":
        const showResourceCreateDialog = true;
        this.reactExtensionElement.current.setState({showResourceCreateDialog});
        break;
      case "showPasswordEditDialog":
        const showPasswordEditDialog = true;
        const passwordEditDialogProps = {id: options.id};
        this.reactExtensionElement.current.setState({passwordEditDialogProps, showPasswordEditDialog});
        break;
      case "showPasswordShareDialog":
        const showShareDialog = true;
        const itemsToShare = await storage.local.get(["resources", "folders"]);
        const resourcesIdsToShare = itemsToShare.resources.map(item => item.id);
        const foldersIdsToShare = null;
        const shareDialogProps = {
          resourcesIds: resourcesIdsToShare,
          foldersIds: foldersIdsToShare,
        };
        this.reactExtensionElement.current.setState({shareDialogProps, showShareDialog});
      break;
      case "showFolderCreateDialog":
        const showFolderCreateDialog = true;
        const folderCreateDialogProps = {folder_parent_id: options.folder_parent_id};
        this.reactExtensionElement.current.setState({folderCreateDialogProps, showFolderCreateDialog});
        break;
      case "showFolderRenameDialog":
        const showFolderRenameDialog = true;
        const folderToRename = await this.getFolder(options.id);
        this.reactExtensionElement.current.setState({folder: folderToRename, showFolderRenameDialog});
        break;
      case "showFolderDeleteDialog":
        const showFolderDeleteDialog = true;
        const folderToDelete = await this.getFolder(options.id);
        this.reactExtensionElement.current.setState({folder: folderToDelete, showFolderDeleteDialog});
        break;
      case "showFolderMoveStrategyDialog":
        const showFolderMoveStrategyDialog = true;
        const itemstoMove = await storage.local.get(["resources", "folders"]);
        const resourcesIdsToMove = itemstoMove.resources.map(item => item.id);
        const foldersIdsToMove = itemstoMove.folders.map(item => item.id);
        const folderMoveStrategyProps = {
          folderId: options.id,
          resourcesIds: resourcesIdsToMove,
          foldersIds: foldersIdsToMove,
          requestId: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093"
        };
        this.reactExtensionElement.current.setState({folderMoveStrategyProps, showFolderMoveStrategyDialog});
        break;
      case "showPassphraseEntryDialog":
        const showPassphraseEntryDialog = true;
        this.reactExtensionElement.current.setState({showPassphraseEntryDialog});
        break;
      case "showProgressDialog":
        const showProgressDialog = true;
        const progressDialogProps = {
          message: "Please wait...",
          goals: 3,
        };
        this.reactExtensionElement.current.setState({progressDialogProps, showProgressDialog});
        break;
      case "showErrorDialog":
        const showErrorDialog = true;
        const errorDialogProps = {
          title: "Error title",
          message: "Error description ..."
        };
        this.reactExtensionElement.current.setState({errorDialogProps, showErrorDialog});
        break;
      case "showLoadingDialogPlaceholder":
        alert('scenario not implemented');
        {/*<div className={`dialog-wrapper`}>*/}
        {/*  <div className="placeholder">*/}
        {/*    <div className="loading">*/}
        {/*      <span className="visually-hidden">Please wait...</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        break;
    }

    window.localStorage.setItem("currentDemoName", name);
    window.localStorage.setItem("currentDemoOptions", JSON.stringify(options));
  }

  async getFolder(id) {
    const storageData = await storage.local.get('folders');
    return storageData.folders.find(item => item.id === id);
  }

  render() {
    const backToDemoMenuLinkStyle = {
      position: "absolute",
      zIndex: 999,
      top: 0,
      left: 0,
      backgroundColor: "black",
      color: "white"
    };

    return (
      <div id="container" className="page">
        <Router>
          {this.state.showDemoMenu &&
          <div style={{padding: '1em'}}>
            <h1>Misc</h1>
            <ul>
              <li><a onClick={() => this.handleStartDemo('showProgressDialog')}>Progress dialog</a></li>
              <li><a onClick={() => this.handleStartDemo('showPassphraseEntryDialog')}>Passphrase entry dialog</a></li>
              <li><a onClick={() => this.handleStartDemo('showPasswordShareDialog')}>Share dialog</a></li>
              <li><a onClick={() => this.handleStartDemo('showErrorDialog')}>Show error dialog</a></li>
              <li>
                <a onClick={() => this.handleStartDemo('showLoadingDialogPlaceholder')}>Show loading dialog placeholder</a>
              </li>
            </ul>
            <h1>Password</h1>
            <ul>
              <li>
                <Link to="/app/passwords" onClick={() => this.handleStartDemo('showPasswordsWorkspace')}>Workspace</Link>
              </li>
              <li><a onClick={() => this.handleStartDemo('showPasswordCreateDialog')}>Create password dialog</a></li>
              <li>
                <a onClick={() => this.handleStartDemo('showPasswordEditDialog', {id: "8e3874ae-4b40-590b-968a-418f704b9d9a"})}>Edit password dialog</a>
              </li>
            </ul>
            <h1>Folder</h1>
            <ul>
              <li>
                <a onClick={() => this.handleStartDemo('showFolderCreateDialog', {folder_parent_id: "123e4567-e89b-12d3-a456-426655440000"})}>Create folder dialog</a>
              </li>
              <li>
                <a onClick={() => this.handleStartDemo('showFolderDeleteDialog', {id: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093"})}>Delete folder dialog</a>
              </li>
              <li>
                <a onClick={() => this.handleStartDemo('showFolderRenameDialog', {id: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093"})}>Rename folder dialog</a>
              </li>
              <li>
                <a onClick={() => this.handleStartDemo('showFolderMoveStrategyDialog', {id: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093"})}>Move folder strategy dialog</a>
              </li>
            </ul>
          </div>
          }
          {!this.state.showDemoMenu &&
          <Fragment>
            <Link to="/" onClick={this.handleBackToDemoMenu} style={backToDemoMenuLinkStyle}>&#60; back</Link>
            <ReactExtension ref={this.reactExtensionElement} port={port} storage={storage}/>
          </Fragment>
          }
        </Router>
      </div>
    )
  }
}

const domContainer = document.getElementById("root");
ReactDOM.render(<DemoReactExtension/>, domContainer);
