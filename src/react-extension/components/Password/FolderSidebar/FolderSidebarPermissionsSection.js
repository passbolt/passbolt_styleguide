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
import PropTypes from "prop-types";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import GroupAvatar from "../../Common/Avatar/GroupAvatar";
import Icon from "../../Common/Icons/Icon";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import ShareDialog from "../../Share/ShareDialog";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

class FolderSidebarPermissionsSection extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermissionsEditClickEvent = this.handlePermissionsEditClickEvent.bind(this);
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleFolderChange(prevProps.resourceWorkspaceContext.details.folder);
  }


  /**
   * Check if the folder has changed and fetch
   * @param previousFolder
   */
  handleFolderChange(previousFolder) {
    const hasFolderChanged = this.folder.id !== previousFolder.id;
    if(hasFolderChanged && this.props.open) {
      this.props.onOpen();
    }
  }

  /**
   * handle when the users click on the section header.
   * Open/Close it.
   */
  handleTitleClickEvent() {
    if (this.props.open) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  }

  /**
   * Handle when the user edits the folder permissions.
   */
  handlePermissionsEditClickEvent() {
    this.context.setContext({shareDialogProps: {folderIds: [this.folder.id]}});
    this.props.dialogContext.open(ShareDialog);
  }

  /**
   * Returns the current detailed resource
   */
  get folder() {
    return this.props.resourceWorkspaceContext.details.folder;
  }

  /**
   * Get a permission aro name
   * @param {object} permission The permission
   */
  getPermissionAroName(permission) {
    if (permission.user) {
      const profile = permission.user.profile;
      return `${profile.first_name} ${profile.last_name}`;
    } else {
      return permission.group.name;
    }
  }

  /**
   * Get a permission aro name
   * @param {object} permission The permission
   */
  getPermissionLabel(permission) {
    switch (permission.type) {
      case 1:
        return "can read";
      case 7:
        return "can update";
      case 15:
        return "is owner";
    }
  }

  /**
   * Get the permissions.
   * @return {array}
   */
  getPermissions() {
    const permissions = this.props.permissions;
    if (permissions) {
      permissions.sort((permission1, permission2) => {
        const permission1Name = permission1.user ? `${permission1.user.profile.first_name} ${permission1.user.profile.last_name}`.toLowerCase() : permission1.group.name.toLowerCase();
        const permission2Name = permission2.user ? `${permission2.user.profile.first_name} ${permission2.user.profile.last_name}`.toLowerCase() : permission2.group.name.toLowerCase();
        if (permission1Name < permission2Name) {
          return -1;
        }
        if (permission1Name > permission2Name) {
          return 1;
        }
        return 0;
      });
    }

    return permissions;
  }

  /**
   * Check if the user can share the folder.
   * @returns {boolean}
   */
  canShare() {
    return this.folder && this.folder.permission.type === 15;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canShare = this.canShare();
    const permissions = this.getPermissions();

    return (
      <div className={`sharedwith accordion sidebar-section ${this.props.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4><a onClick={this.handleTitleClickEvent} role="button">Shared with</a></h4>
        </div>
        <div className="accordion-content">
          {canShare &&
          <a onClick={this.handlePermissionsEditClickEvent} className="section-action">
            <Icon name="edit"/>
            <span className="visuallyhidden">modify</span>
          </a>
          }
          <div>
            <ul className="shared-with ready">
              {permissions === null &&
              <div className="processing-wrapper">
                <span className="processing-text">Retrieving permissions </span>
              </div>
              }
              {permissions && permissions.map(permission => (
                <li key={permission.id} className="usercard-col-2">
                  <div className="content-wrapper">
                    <div className="content">
                      <div className="name">{this.getPermissionAroName(permission)}</div>
                      <div className="subinfo">{this.getPermissionLabel(permission)}</div>
                    </div>
                  </div>
                  {permission.user &&
                  <UserAvatar user={permission.user} baseUrl={this.context.userSettings.getTrustedDomain()}/>
                  }
                  {permission.group &&
                  <GroupAvatar group={permission.group} baseUrl={this.context.userSettings.getTrustedDomain()}/>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

FolderSidebarPermissionsSection.contextType = AppContext;

FolderSidebarPermissionsSection.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  permissions: PropTypes.array,
  users: PropTypes.array,
  resourceWorkspaceContext: PropTypes.object,
  dialogContext: PropTypes.any
};

export default withDialog(withResourceWorkspace(FolderSidebarPermissionsSection));
