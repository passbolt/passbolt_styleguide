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

class PasswordsWorkspace extends Component {
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
      loading: true,
      breadcrumbs: [],
      folders: null,
      resources: null,
      selectedResources: [],
      search: "",
      filterType: "default"
    }
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFoldersTreeContextualMenuHideEvent = this.handleFoldersTreeContextualMenuHideEvent.bind(this);
    this.handleFoldersTreeContextualMenuShowEvent = this.handleFoldersTreeContextualMenuShowEvent.bind(this);
    this.handleFoldersTreeSelectEvent = this.handleFoldersTreeSelectEvent.bind(this);
    this.handleFoldersTreeSelectRootEvent = this.handleFoldersTreeSelectRootEvent.bind(this);
    this.handleGridSelectEvent = this.handleGridSelectEvent.bind(this);
    this.handleGridRightSelectEvent = this.handleGridRightSelectEvent.bind(this);
  }

  async componentDidMount() {
    const folders = await port.request('passbolt.folders.find-all');
    const resources = await port.request('passbolt.resources.find-all');
    this.setState({folders, resources});
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
   * Handle when the user select a folder.
   * @param {object} folder The selected folder
   */
  handleFoldersTreeSelectEvent(folder) {
    console.log(`The user selected the folder ${folder.name}`);
  }

  /**
   * Handle when the user select the root folder.
   */
  handleFoldersTreeSelectRootEvent() {
    console.log("The user selected the root folder");
  }

  /**
   * Handle when the user selects an element in the grid.
   * @param {array} resources The selected resources
   */
  handleGridSelectEvent(resources) {
    console.log(`The user selected the resources`);
    console.log(resources);
    const selectedResources = resources;
    this.setState({selectedResources});
  }

  /**
   * Handle when the user right selects an element in the grid.
   * @param {ReactEvent} event The event
   * @param {object} resource The selected resource
   */
  handleGridRightSelectEvent(event, resource) {
    console.log(`The user right selected the resource ${resource.name}`);
    const selectedResources = [resource];
    this.setState({selectedResources});
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
          <SearchBar disabled={true} placeholder=" "/>
          <ProfileMenu onClick={this.onMenuItemClick.bind(this)}/>
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
                    onSelect={this.handleFoldersTreeSelectEvent}
                    onSelectRoot={this.handleFoldersTreeSelectRootEvent}/>
                </div>
                <div className="panel middle">
                  <Grid
                    resources={this.state.resources}
                    selectedResources={this.state.selectedResources}
                    search={this.state.search}
                    filterType={this.state.filterType}
                    onRightSelect={this.handleGridRightSelectEvent}
                    onSelect={this.handleGridSelectEvent}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PasswordsWorkspace.propTypes = {
  onMenuItemClick: PropTypes.func,
};

export default PasswordsWorkspace;
