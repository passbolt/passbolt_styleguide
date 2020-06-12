/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React from "react";
import Icon from "../../../Common/Icons/Icon";
import PropTypes from "prop-types";
import FolderSidebarInformationSection from "./FolderSidebarInformationSection";
import FolderSidebarPermissionsSection from "./FolderSidebarPermissionsSection";
import Clipboard from "../../../../legacy/util/clipboard";

class FolderSidebar extends React.Component {

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      permissions: [],
      permissionsSectionOpen: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handlePermalinkClick = this.handlePermalinkClick.bind(this);
    this.handlePermissionSectionClose = this.handlePermissionSectionClose.bind(this);
    this.handlePermissionSectionOpen = this.handlePermissionSectionOpen.bind(this);
  }

  /**
   * Handle when the user closes the sidebar.
   */
  handleCloseClick() {
    this.props.onClose();
  }

  /**
   * Handle when the user copies the permalink.
   */
  handlePermalinkClick() {
    const permalink = `${APP_URL}app/folders/view/${this.props.folder.id}`;
    Clipboard.copy(permalink, 'permalink');
  }

  /**
   * Handle when the user closes the permissions section.
   */
  handlePermissionSectionClose() {
    const permissionsSectionOpen = false;
    this.setState({permissionsSectionOpen});
  }

  /**
   * Handle when the user opens the permissions section.
   */
  handlePermissionSectionOpen() {
    const permissionsSectionOpen = true;
    this.findFolderPermission();
    this.setState({permissionsSectionOpen});
  }

  /**
   * Find the folder permissions
   * @returns {Promise<void>}
   */
  async findFolderPermission() {
      const permissions = await port.request('passbolt.folders.find-permissions');
      this.setState({permissions});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="panel aside ready">
        <div className="sidebar resource">
          <div className="sidebar-header">
            <div className="logo">
              <Icon name="folder"/>
            </div>
            <h3>
              <span className="name">{this.props.folder.name}
                <a className="title-link" title="Copy the link to this folder"  onClick={this.handlePermalinkClick}>
                    <i className="fa fa-link"></i>
                    <span className="visuallyhidden">Copy the link to this folder</span>
                </a>
              </span>
              <span className="type">folder</span>
            </h3>
            <a className="dialog-close" onClick={this.handleCloseClick}>
              <Icon name="close"/>
              <span className="visuallyhidden">Close</span>
            </a>
          </div>
          <FolderSidebarInformationSection
            folder={this.props.folder}
            folders={this.props.folders}
            onSelectFolderParent={this.props.onSelectFolderParent}
            onSelectRoot={this.props.onSelectRoot}
            users={this.props.users}/>
          <FolderSidebarPermissionsSection
            folder={this.props.folder}
            onEditPermissions={this.props.onEditPermissions}
            onClose={this.handlePermissionSectionClose}
            onOpen={this.handlePermissionSectionOpen}
            open={this.state.permissionsSectionOpen}
            permissions={this.state.permissions}
            groups={this.props.groups}
            users={this.props.users}/>
        </div>
      </div>
    );
  }
}

FolderSidebar.propTypes = {
  folder: PropTypes.object,
  folders: PropTypes.array,
  groups: PropTypes.array,
  onClose: PropTypes.func,
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  onEditPermissions: PropTypes.func,
  users: PropTypes.array
};

export default FolderSidebar;
