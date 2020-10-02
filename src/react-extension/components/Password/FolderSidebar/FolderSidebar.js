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
import Icon from "../../Common/Icons/Icon";
import PropTypes from "prop-types";
import FolderSidebarInformationSection from "./FolderSidebarInformationSection";
import FolderSidebarPermissionsSection from "./FolderSidebarPermissionsSection";
import FolderSidebarActivitySection from "./FolderSidebarActivitySection";
import AppContext from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";

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
      activities: null,
      activitiesPage: 1,
      activitySectionMoreProcessing: true,
      activitySectionOpen: false,
      permissions: null,
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
    this.props.resourceWorkspaceContext.onToggleSidebar();
  }

  /**
   * Handle when the user copies the permalink.
   */
  async handlePermalinkClick() {
    const baseUrl = this.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/folders/view/${this.props.resourceWorkspaceContext.details.folder.id}`;
    await this.context.port.request("passbolt.clipboard.copy", permalink);
    this.props.actionFeedbackContext.displaySuccess("The permalink has been copied to clipboard");
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
    this.setState({permissionsSectionOpen}, () => this.findFolderPermission());
  }

  /**
   * Find the folder permissions
   * @returns {Promise<void>}
   */
  async findFolderPermission() {
    const permissions = await this.context.port.request('passbolt.folders.find-permissions');
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
              <div className="title-wrapper">
                <span className="name">{this.props.resourceWorkspaceContext.details.folder.name}</span>
                <a className="title-link" title="Copy the link to this folder" onClick={this.handlePermalinkClick}>
                  <Icon name="link"/>
                  <span className="visuallyhidden">Copy the link to this folder</span>
                </a>
              </div>
              <span className="type">folder</span>
            </h3>
            <a className="dialog-close" onClick={this.handleCloseClick}>
              <Icon name="close"/>
              <span className="visuallyhidden">Close</span>
            </a>
          </div>
          <FolderSidebarInformationSection users={this.props.users}/>
          <FolderSidebarPermissionsSection
            folder={this.props.resourceWorkspaceContext.details.folder}
            onEditPermissions={this.props.onEditPermissions}
            onClose={this.handlePermissionSectionClose}
            onOpen={this.handlePermissionSectionOpen}
            open={this.state.permissionsSectionOpen}
            permissions={this.state.permissions}
            groups={this.props.groups}
            users={this.props.users}/>
          <FolderSidebarActivitySection/>
        </div>
      </div>
    );
  }
}

FolderSidebar.contextType = AppContext;

FolderSidebar.propTypes = {
  groups: PropTypes.array,
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  onEditPermissions: PropTypes.func,
  users: PropTypes.array,
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withResourceWorkspace(withActionFeedback(FolderSidebar));
