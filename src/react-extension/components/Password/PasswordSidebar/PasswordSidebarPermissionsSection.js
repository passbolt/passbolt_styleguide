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

const PERMISSIONS_LABEL = {
  1: 'can read',
  7: 'can update',
  15: 'is owner'
};

class PasswordSidebarPermissionsSection extends React.Component {
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
    this.props.onEditPermissions(this.props.folder);
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className={`sharedwith accordion sidebar-section ${this.props.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4><a onClick={this.handleTitleClickEvent} role="button">Shared with</a></h4>
        </div>
        <div className="accordion-content">
          <a onClick={this.handlePermissionsEditClickEvent} className="section-action">
            <Icon name="edit"/>
            <span className="visuallyhidden">modify</span>
          </a>
          <div>
            <ul className="shared-with ready">
              {this.props.permissions && this.props.permissions.map(permission => (
                <li key={permission.id} className="usercard-col-2">
                  <div className="content-wrapper">
                    <div className="content">
                      <div className="name">{this.getPermissionAroName(permission)}</div>
                      <div className="subinfo">{PERMISSIONS_LABEL[permission.type]}</div>
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

PasswordSidebarPermissionsSection.propTypes = {
  folder: PropTypes.object,
  onEditPermissions: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  permissions: PropTypes.array,
  users: PropTypes.array,
};

export default PasswordSidebarPermissionsSection;
