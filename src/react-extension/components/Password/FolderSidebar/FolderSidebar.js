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

const LIMIT_ACTIVITIES_PER_PAGE = 5;

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
    this.handleActivitySectionClose = this.handleActivitySectionClose.bind(this);
    this.handleActivitySectionMore = this.handleActivitySectionMore.bind(this);
    this.handleActivitySectionOpen = this.handleActivitySectionOpen.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handlePermalinkClick = this.handlePermalinkClick.bind(this);
    this.handlePermissionSectionClose = this.handlePermissionSectionClose.bind(this);
    this.handlePermissionSectionOpen = this.handlePermissionSectionOpen.bind(this);
  }

  /**
   * Handle when the user closes the activity section.
   */
  handleActivitySectionClose() {
    const activitySectionOpen = false;
    this.setState({activitySectionOpen});
  }

  /**
   * Handle when the user wants to see more activities in the activity section.
   */
  handleActivitySectionMore() {
    const activitiesPage = this.state.activitiesPage + 1;
    const activitySectionMoreProcessing = true;
    this.setState({activitiesPage, activitySectionMoreProcessing}, () => this.findFolderActivities());
  }

  /**
   * Handle when the user opens the activity section.
   */
  handleActivitySectionOpen() {
    const activitySectionOpen = true;
    const activities = [];
    const activitiesPage = 1;
    this.setState({activities, activitiesPage, activitySectionOpen}, () => this.findFolderActivities());
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
  handlePermalinkClick() {
    const baseUrl = this.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/folders/view/${this.props.resourceWorkspaceContext.details.folder.id}`;
    this.context.port.emit('passbolt.clipboard.write', permalink);
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
   * Find the folder activities
   * @returns {Promise<void>}
   */
  async findFolderActivities() {
    const newActivities = await this.context.port.request('passbolt.folders.action-log', this.props.resourceWorkspaceContext.details.folder.id, this.state.activitiesPage, LIMIT_ACTIVITIES_PER_PAGE);
    const activities = [...(this.state.activities || []), ...newActivities];
    const activitySectionMoreProcessing = false;
    this.setState({activities, activitySectionMoreProcessing});
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
          <FolderSidebarActivitySection
            activities={this.state.activities}
            folder={this.props.resourceWorkspaceContext.details.folder}
            moreProcessing={this.state.activitySectionMoreProcessing}
            onClose={this.handleActivitySectionClose}
            onOpen={this.handleActivitySectionOpen}
            onMore={this.handleActivitySectionMore}
            open={this.state.activitySectionOpen}/>
        </div>
      </div>
    );
  }
}

FolderSidebar.contextType = AppContext;

FolderSidebar.propTypes = {
  groups: PropTypes.array,
  onClose: PropTypes.func,
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  onEditPermissions: PropTypes.func,
  users: PropTypes.array,
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withResourceWorkspace(withActionFeedback(FolderSidebar));
