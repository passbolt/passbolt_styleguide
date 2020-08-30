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
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../Common/Navigation/Header/Logo";
import SearchBar from "../../Common/Navigation/Search/SearchBar";
import UserBadgeMenu from "../../Common/Navigation/Header/UserBadgeMenu";
import Breadcrumbs from "../../Common/Navigation/Breadcrumbs/Breadcrumbs";
import FoldersTree from "../FoldersTree/FoldersTree";
import FoldersTreeItemContextualMenu from "../FoldersTree/FoldersTreeItemContextualMenu";
import Grid from "../Grid/Grid";
import FolderSidebar from "../FolderSidebar/FolderSidebar";
import PasswordSidebar from "../PasswordSidebar/PasswordSidebar";
import FoldersTreeRootFolderContextualMenu from "../FoldersTree/FoldersTreeRootFolderContextualMenu";
import AppContext from "../../../contexts/AppContext";

class Workspace extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @return {*}
   */
  getDefaultState() {
    return {
      folderContextualMenu: {
        folder: null,
        foldersTreeListElementRef: null,
        left: 0,
        show: false,
        top: 0,
      },
      filterType: "default",
      folders: null,
      resources: null,
      rootFolderContextualMenu: {
        foldersTreeTitleElementRef: null,
        left: 0,
        show: false,
        top: 0,
      },
      search: "",
      selectedResources: [],
      selectedFolders: [],
      users: null,

      filterByFolder: false,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleEditFolderPermissions = this.handleEditFolderPermissions.bind(this);
    this.handleFoldersTreeContextualMenuOnFolderHideEvent = this.handleFoldersTreeContextualMenuOnFolderHideEvent.bind(this);
    this.handleFoldersTreeContextualMenuOnRootFolderHideEvent = this.handleFoldersTreeContextualMenuOnRootFolderHideEvent.bind(this);
    this.handleFoldersTreeFolderContextualMenu = this.handleFoldersTreeFolderContextualMenu.bind(this);
    this.handleFoldersTreeRootFolderContextualMenu = this.handleFoldersTreeRootFolderContextualMenu.bind(this);
    this.handleFilterByFolder = this.handleFilterByFolder.bind(this);
    this.handleSelectRootFolder = this.handleSelectRootFolder.bind(this);
    this.handleSelectResources = this.handleSelectResources.bind(this);
    this.handleRightSelectResource = this.handleRightSelectResource.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.updateFoldersLocalStorage();
    this.updateResourcesLocalStorage();
    /*
     * this.findGroups();
     * this.findUsers();
     */

    this.filterByFolderFromRoute();
    this.selectResourceFromRoute();
  }

  /**
   * componentWillUnmount
   * Invoked immediately before the component is removed from the tree
   * @return {void}
   */
  componentWillUnmount() {
    if (this.filterByFolderFromRouteInterval) {
      clearInterval(this.filterByFolderFromRouteInterval);
    }
    if (this.selectResourceFromRouteInterval) {
      clearInterval(this.selectResourceFromRouteInterval);
    }
  }

  /**
   * Filter by folder based on the route.
   * @return {void}
   */
  filterByFolderFromRoute() {
    const routeFilterByFolderId = this.props.match.params.filterByFolderId;
    if (!routeFilterByFolderId) {
      return;
    }

    this.filterByFolderFromRouteInterval = setInterval(() => {
      if (this.context.folders !== null) {
        const folder = this.context.folders.find(item => item.id === routeFilterByFolderId);
        if (folder) {
          this.handleFilterByFolder(folder);
        } else {
          // @todo display an error notification
        }
        clearInterval(this.filterByFolderFromRouteInterval);
      }
    }, 200);
  }

  /**
   * Select a resource based on the route.
   * @return {void}
   */
  selectResourceFromRoute() {
    const routeSelectedResourceId = this.props.match.params.selectedResourceId;
    if (!routeSelectedResourceId) {
      return;
    }

    this.selectResourceFromRouteInterval = setInterval(() => {
      if (this.context.resources !== null) {
        const selectedResource = this.context.resources.find(item => item.id === routeSelectedResourceId);
        if (selectedResource) {
          const selectedResources = [selectedResource];
          this.handleSelectResources(selectedResources);
        } else {
          // @todo display an error notification
        }
        clearInterval(this.selectResourceFromRouteInterval);
      }
    }, 200);
  }

  /**
   * Find all folders.
   * @return {Promise<void>}
   */
  async updateFoldersLocalStorage() {
    this.context.port.request("passbolt.plugin.folders.update-local-storage");
  }

  /**
   * Find all groups.
   * @return {Promise<void>}
   */
  async findGroups() {
    const groups = await port.request("passbolt.groups.find-all");
    this.setState({groups});
  }

  /**
   * Find all resources.
   * @return {Promise<void>}
   */
  async updateResourcesLocalStorage() {
    this.context.port.request("passbolt.plugin.resources.update-local-storage");
  }

  /**
   * Find all users.
   * @return {Promise<void>}
   */
  async findUsers() {
    const users = await port.request("passbolt.users.find-all");
    this.setState({users});
  }

  /**
   * Handle when the user edits the folder permissions.
   * @param {object} folder the folder to edit the permissions
   */
  handleEditFolderPermissions(folder) {
    console.error(`TODO: The user edits the permissions of the folder ${folder.name}`);
  }

  /**
   * Handle when the user wants to hide the contextual menu of a folder.
   */
  handleFoldersTreeContextualMenuOnFolderHideEvent() {
    const folderContextualMenu = {show: false};
    this.setState({folderContextualMenu});
  }

  /**
   * Handle when the user wants to hide the contextual menu of the folder.
   */
  handleFoldersTreeContextualMenuOnRootFolderHideEvent() {
    const rootFolderContextualMenu = {show: false};
    this.setState({rootFolderContextualMenu});
  }

  /**
   * Handle when the user wants to display the contextual menu of a folder.
   * @param {Object} folder The folder
   * @param {int} top The top position of the contextual menu
   * @param {int} left The left position of the contextual menu
   * @param {Element} foldersTreeListElementRef The folders tree list element
   */
  handleFoldersTreeFolderContextualMenu(folder, top, left, foldersTreeListElementRef) {
    const show = true;
    const folderContextualMenu = {folder, left, show, top, foldersTreeListElementRef};
    this.setState({folderContextualMenu});
  }

  /**
   * Handle when the user wants to display the contextual menu of the root folder.
   * @param {int} top The top position of the contextual menu
   * @param {int} left The left position of the contextual menu
   * @param {Element} foldersTreeTitleElementRef The folders tree title element
   */
  handleFoldersTreeRootFolderContextualMenu(top, left, foldersTreeTitleElementRef) {
    const show = true;
    const rootFolderContextualMenu = {left, show, top, foldersTreeTitleElementRef};
    this.setState({rootFolderContextualMenu});
  }

  /**
   * Handle when the user filters by folder.
   * @param {object} folder The target folder
   */
  handleFilterByFolder(folder) {
    const selectedResources = [];
    const filterByFolder = folder;
    const selectedFolders = [folder];
    this.setState({filterByFolder, selectedFolders, selectedResources}, () => {
      this.props.history.push(`/app/folders/view/${folder.id}`);
    });
  }

  /**
   * Handle when the user selects the root folder.
   */
  handleSelectRootFolder() {
    const filterByFolder = null;
    const selectedFolders = [];
    const selectedResources = [];
    this.setState({filterByFolder, selectedFolders, selectedResources}, () => {
      this.props.history.push(`/app/passwords`);
    });
  }

  /**
   * Handle when the user selects an element in the grid.
   * @param {array} resources The selected resources
   */
  handleSelectResources(resources) {
    const selectedFolders = [];
    const selectedResources = resources;
    this.setState({selectedFolders, selectedResources}, () => {
      if (resources.length === 1) {
        this.props.history.push(`/app/passwords/view/${resources[0].id}`);
      }
    });
  }

  /**
   * Handle when the user right selects an element in the grid.
   * @param {ReactEvent} event The event
   * @param {object} selectedResource The selected resource
   */
  handleRightSelectResource(event, selectedResource) {
    const selectedResources = [selectedResource];
    this.handleSelectResources(selectedResources);
  }

  /**
   * Handle when the user searches.
   * @param search
   */
  handleSearch(search) {
    this.setState({search});
  }

  /**
   * Get the highlighted folder
   * @return {null|Object}
   */
  getHighlightedFolder() {
    if (this.state.selectedFolders.length === 1) {
      return this.state.selectedFolders[0];
    }
    return null;
  }

  /**
   * Get the highlighted
   * @return {null|Object}
   */
  getHighlightedResource() {
    if (this.state.selectedResources.length === 1 && !this.state.selectedFolders.length) {
      return this.state.selectedResources[0];
    }
    return null;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const highlightedFolder = this.getHighlightedFolder();
    const highlightedResource = this.getHighlightedResource();

    return (
      <div>
        {this.state.folderContextualMenu.show &&
        <FoldersTreeItemContextualMenu
          folder={this.state.folderContextualMenu.folder}
          foldersTreeListElementRef={this.state.folderContextualMenu.foldersTreeListElementRef}
          left={this.state.folderContextualMenu.left}
          onDestroy={this.handleFoldersTreeContextualMenuOnFolderHideEvent}
          top={this.state.folderContextualMenu.top}/>
        }
        {this.state.rootFolderContextualMenu.show &&
        <FoldersTreeRootFolderContextualMenu
          folders={this.context.folders}
          foldersTreeTitleElementRef={this.state.rootFolderContextualMenu.foldersTreeTitleElementRef}
          left={this.state.rootFolderContextualMenu.left}
          onDestroy={this.handleFoldersTreeContextualMenuOnRootFolderHideEvent}
          top={this.state.rootFolderContextualMenu.top}/>
        }
        <div className="header second">
          <Logo/>
          <SearchBar
            onSearch={this.handleSearch}
            placeholder="Search passwords"
            search={this.state.search}/>
          <UserBadgeMenu baseUrl={this.context.userSettings.getTrustedDomain()} user={this.context.currentUser}/>
        </div>
        <div className="header third">
          <div className="col1 main-action-wrapper">
          </div>
          <div className="col2_3 actions-wrapper">
          </div>
        </div>
        <div className="panel main">
          <div className="tabs-content">
            <div className="tab-content selected">
              <div className="reports-workspace">
                <div className="panel left">
                  <FoldersTree
                    folders={this.context.folders}
                    onFolderContextualMenu={this.handleFoldersTreeFolderContextualMenu}
                    onRootFolderContextualMenu={this.handleFoldersTreeRootFolderContextualMenu}
                    onSelect={this.handleFilterByFolder}
                    onSelectRoot={this.handleSelectRootFolder}
                    selectedFolder={this.state.filterByFolder}/>
                </div>
                <div className="panel middle">
                  <Breadcrumbs/>
                  <Grid
                    resources={this.context.resources}
                    selectedResources={this.state.selectedResources}
                    search={this.state.search}
                    filterType={this.state.filterType}
                    onRightSelect={this.handleRightSelectResource}
                    onSelect={this.handleSelectResources}/>
                  {highlightedFolder &&
                  <FolderSidebar
                    folder={highlightedFolder}
                    folders={this.context.folders}
                    groups={this.state.groups}
                    onEditPermissions={this.handleEditFolderPermissions}
                    onSelectFolderParent={this.handleFilterByFolder}
                    onSelectRoot={this.handleSelectRootFolder}
                    users={this.state.users}/>
                  }
                  {highlightedResource &&
                  <PasswordSidebar
                    resource={highlightedResource}
                    folders={this.context.folders}
                    groups={this.state.groups}
                    onEditPermissions={this.handleEditFolderPermissions}
                    onSelectFolderParent={this.handleFilterByFolder}
                    onSelectRoot={this.handleSelectRootFolder}
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

Workspace.contextType = AppContext;

Workspace.propTypes = {
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(Workspace);
