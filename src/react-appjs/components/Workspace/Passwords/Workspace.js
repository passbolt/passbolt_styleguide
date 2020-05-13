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
import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import Logo from "../../Common/Header/Logo";
import SearchBar from "../../Common/Header/SearchBar";
import ProfileMenu from "../../Common/Header/ProfileMenu";
import FoldersTree from "./FoldersTree/FoldersTree";
import FoldersTreeItemContextualMenu from "./FoldersTree/FoldersTreeItemContextualMenu";
import Grid from "./Grid/Grid";
import FolderSidebar from "./FolderSidebar/FolderSidebar";

class Workspace extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.ActionBar = this.ActionBar.bind(this);
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      contextualMenu: {
        folder: null,
        left: 0,
        show: false,
        top: 0,
      },
      filterType: "default",
      folders: null,
      resources: null,
      search: "",
      selectedResources: [],
      selectedFolder: null,
      showFolderSidebar: false,
      users: null
    }
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleEditFolderPermissions = this.handleEditFolderPermissions.bind(this);
    this.handleFoldersTreeContextualMenuHideEvent = this.handleFoldersTreeContextualMenuHideEvent.bind(this);
    this.handleFoldersTreeContextualMenuShowEvent = this.handleFoldersTreeContextualMenuShowEvent.bind(this);
    this.handleSelectFolder = this.handleSelectFolder.bind(this);
    this.handleSelectRoot = this.handleSelectRoot.bind(this);
    this.handleGridSelectEvent = this.handleGridSelectEvent.bind(this);
    this.handleGridRightSelectEvent = this.handleGridRightSelectEvent.bind(this);
    this.handleSearchEvent = this.handleSearchEvent.bind(this);
  }

  async componentDidMount() {
    this.findFolders();
    this.findGroups();
    this.findResources();
    this.findUsers();
  }

  /**
   * Find all folders.
   * @returns {Promise<void>}
   */
  async findFolders() {
    const folders = await port.request('passbolt.folders.find-all');
    this.setState({folders});
  }

  /**
   * Find all groups.
   * @returns {Promise<void>}
   */
  async findGroups() {
    const groups = await port.request('passbolt.groups.find-all');
    this.setState({groups});
  }

  /**
   * Find all resources.
   * @returns {Promise<void>}
   */
  async findResources() {
    const resources = await port.request('passbolt.resources.find-all');
    this.setState({resources});
  }

  /**
   * Find all userS.
   * @returns {Promise<void>}
   */
  async findUsers() {
    const users = await port.request('passbolt.users.find-all');
    this.setState({users});
  }

  /**
   * Handle when the user edits the folder permissions.
   * @param {object} folder the folder to edit the permissions
   */
  handleEditFolderPermissions(folder) {
    console.log(`The user edits the permissions of the folder ${folder.name}`);
  }

  /**
   * Handle when the user wants to display the contextual menu of a folder.
   */
  handleFoldersTreeContextualMenuHideEvent() {
    const contextualMenu = {show: false};
    this.setState({contextualMenu});
  }

  /**
   * Handle when the user wants to display the contextual menu of a folder.
   * @param {Object} folder The folder
   * @param {int} top The top position of the contextual menu
   * @param {int} left The left position of the contextual menu
   * @param {Element} foldersListElement The folders list element
   */
  handleFoldersTreeContextualMenuShowEvent(folder, top, left, foldersListElement) {
    const show = true;
    const contextualMenu = {folder, left, show, top, foldersListElement};
    this.setState({contextualMenu});
  }

  /**
   * Handle when the user selects a folder.
   * @param {object} selectedFolder The selected folder
   */
  handleSelectFolder(selectedFolder) {
    const showFolderSidebar = true;
    this.setState({selectedFolder, showFolderSidebar});
  }

  /**
   * Handle when the user selects the root folder.
   */
  handleSelectRoot() {
    const selectedFolder = null;
    const showFolderSidebar = false;
    this.setState({selectedFolder, showFolderSidebar});
  }

  /**
   * Handle when the user selects an element in the grid.
   * @param {array} resources The selected resources
   */
  handleGridSelectEvent(resources) {
    const selectedResources = resources;
    const showFolderSidebar = false;
    this.setState({selectedResources, showFolderSidebar});
  }

  /**
   * Handle when the user right selects an element in the grid.
   * @param {ReactEvent} event The event
   * @param {object} resource The selected resource
   */
  handleGridRightSelectEvent(event, resource) {
    const selectedResources = [resource];
    const showFolderSidebar = false;
    this.setState({selectedResources, showFolderSidebar});
  }

  /**
   * Handle when the user searches.
   * @param search
   */
  handleSearchEvent(search) {
    this.setState({search});
  }

  onMenuItemClick(menuItem) {
    this.props.onMenuItemClick(menuItem);
  }

  ActionBar() {
    return (
      <div className="header third">
        <div className="col1">
        </div>
        <div className="col2_3 actions-wrapper">
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.contextualMenu.show &&
        <FoldersTreeItemContextualMenu
          folder={this.state.contextualMenu.folder}
          foldersListElementRef={this.state.contextualMenu.foldersListElement}
          left={this.state.contextualMenu.left}
          onDestroy={this.handleFoldersTreeContextualMenuHideEvent}
          top={this.state.contextualMenu.top}/>
        }
        <div className="header second">
          <Logo/>
          <SearchBar
            onSearch={this.handleSearchEvent}
            placeholder="Search passwords"
            search={this.state.search}/>
          <ProfileMenu onClick={this.onMenuItemClick.bind(this)}/>
        </div>
        <div className="header third">
          <div className="col1 main-action-wrapper">
          </div>
          <div className="col2_3 actions-wrapper">
          </div>
        </div>
        <this.ActionBar/>
        <div className="panel main">
          <div className="tabs-content">
            <div className="tab-content selected">
              <div className="reports-workspace">
                <div className="panel left">
                  <FoldersTree
                    folders={this.state.folders}
                    onContextualMenu={this.handleFoldersTreeContextualMenuShowEvent}
                    onSelect={this.handleSelectFolder}
                    onSelectRoot={this.handleSelectRoot}
                    selectedFolder={this.state.selectedFolder}/>
                </div>
                <div className="panel middle">
                  <Grid
                    resources={this.state.resources}
                    selectedResources={this.state.selectedResources}
                    search={this.state.search}
                    filterType={this.state.filterType}
                    onRightSelect={this.handleGridRightSelectEvent}
                    onSelect={this.handleGridSelectEvent}/>
                  {this.state.showFolderSidebar &&
                  <FolderSidebar
                    folder={this.state.selectedFolder}
                    folders={this.state.folders}
                    groups={this.state.groups}
                    onEditPermissions={this.handleEditFolderPermissions}
                    onSelectFolderParent={this.handleSelectFolder}
                    onSelectRoot={this.handleSelectRoot}
                    users={this.state.users}/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Workspace.propTypes = {
  onMenuItemClick: PropTypes.func,
};

export default Workspace;
