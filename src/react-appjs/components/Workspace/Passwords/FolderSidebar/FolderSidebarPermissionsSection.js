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
import UserAvatar from "../../../Common/UserAvatar/UserAvatar";
import GroupAvatar from "../../../Common/UserAvatar/GroupAvatar";
import Icon from "../../../Common/Icons/Icon";

const PERMISSIONS_LABEL = {
  1: 'can read',
  7: 'can update',
  15: 'is owner'
};

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
    this.props.onEditPermissions(this.props.folder)
  }

  /**
   * Get a permission aro name
   * @param {object} permission The permission
   */
  getPermissionAroName(permission) {
    if (permission.user) {
      let profile = permission.user.profile;
      return `${profile.first_name} ${profile.last_name}`;
    } else {
      return permission.group.name;
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
        if (permission1Name < permission2Name) return -1;
        if (permission1Name > permission2Name) return 1;
        return 0;
      });
    }

    return permissions;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canShare = this.props.folder.permission.type === 15;
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
              {!this.props.permissions.length &&
              <div className="processing-wrapper">
                <span className="processing-text">Retrieving permissions </span>
              </div>
              }
              {permissions && permissions.map(permission => {
                return (
                  <li key={permission.id} className="usercard-col-2">
                    <div className="content-wrapper">
                      <div className="content">
                        <div className="name">{this.getPermissionAroName(permission)}</div>
                        <div className="subinfo">{PERMISSIONS_LABEL[permission.type]}</div>
                      </div>
                    </div>
                    {permission.user &&
                    <UserAvatar user={permission.user}/>
                    }
                    {permission.group &&
                    <GroupAvatar group={permission.group}/>
                    }
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

FolderSidebarPermissionsSection.propTypes = {
  folder: PropTypes.object,
  onEditPermissions: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  permissions: PropTypes.array,
  users: PropTypes.array,
};

export default FolderSidebarPermissionsSection;
