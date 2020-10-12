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
import UserBadgeMenu from "../../Common/Navigation/Header/UserBadgeMenu";
import FoldersTree from "../FoldersTree/FoldersTree";
import Grid from "../Grid/Grid";
import FolderSidebar from "../FolderSidebar/FolderSidebar";
import PasswordSidebar from "../PasswordSidebar/PasswordSidebar";
import AppContext from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import SidebarTagFilterSection from "../../Tag/SidebarTagFilterSection/SidebarTagFilterSection";
import PropTypes from "prop-types";
import PasswordSearchBar from "../PasswordSearchBar/PasswordSearchBar";
import FilterResourcesByShortcuts from "../FilterResourcesByShortcuts/FilterResourcesByShortcuts";
import PasswordBreadcrumb from "../PasswordBreadcrumb/PasswordBreadcrumb";
import PasswordWorkspaceMenu from "./PasswordWorkspaceMenu";
import Logo from "../../../../react/components/Common/Navigation/Header/Logo";
import PasswordWorkspaceMainMenu from "./PasswordWorkspaceMainMenu";
import SidebarGroupFilterSection from "../Group/SidebarGroupFilterSection/SidebarGroupFilterSection";

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
    this.handleFilterByFolder = this.handleFilterByFolder.bind(this);
    this.handleSelectRootFolder = this.handleSelectRootFolder.bind(this);
    this.handleSelectResources = this.handleSelectResources.bind(this);
    this.handleRightSelectResource = this.handleRightSelectResource.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
   * Has lock for the detail display
   * @returns {boolean}
   */
  hasLockDetail() {
    return this.props.resourceWorkspaceContext.lockDisplayDetail;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const canUseFolders = this.context.siteSettings.canIUse("folders");
    const canUseTags = this.context.siteSettings.canIUse("tags");

    return (
      <div>
        <div className="header second">
          <Logo/>
          <PasswordSearchBar
            onSearch={this.handleSearch}
            placeholder="Search passwords"/>
          <UserBadgeMenu baseUrl={this.context.userSettings.getTrustedDomain()} user={this.context.currentUser}/>
        </div>
        <div className="header third">
          <div className="col1 main-action-wrapper">
            <PasswordWorkspaceMainMenu/>
          </div>
          <PasswordWorkspaceMenu/>
        </div>
        <div className="panel main">
          <div className="tabs-content">
            <div className="tab-content selected">
              <div className="reports-workspace">
                <div className="panel left">
                  <FilterResourcesByShortcuts/>
                  {canUseFolders &&
                  <FoldersTree/>
                  }
                  <SidebarGroupFilterSection/>
                  {canUseTags &&
                  <SidebarTagFilterSection/>
                  }
                </div>
                <div className="panel middle">
                  <PasswordBreadcrumb/>
                  <Grid
                    selectedResources={this.state.selectedResources}
                    search={this.state.search}
                    onRightSelect={this.handleRightSelectResource}
                    onSelect={this.handleSelectResources}/>
                  {this.props.resourceWorkspaceContext.details.folder && this.hasLockDetail() &&
                    <FolderSidebar
                      groups={this.state.groups}
                      onEditPermissions={this.handleEditFolderPermissions}
                      onSelectFolderParent={this.handleFilterByFolder}
                      onSelectRoot={this.handleSelectRootFolder}
                      users={this.state.users}/>
                  }
                  {this.props.resourceWorkspaceContext.details.resource && this.hasLockDetail() &&
                    <PasswordSidebar
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
  history: PropTypes.any,
  resourceWorkspaceContext: PropTypes.any
};

export default withRouter(withResourceWorkspace(Workspace));
