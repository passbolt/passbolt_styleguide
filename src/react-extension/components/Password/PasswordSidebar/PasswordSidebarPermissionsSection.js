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
import UserAvatar from "../../Common/Avatar/UserAvatar";
import GroupAvatar from "../../Common/Avatar/GroupAvatar";
import Icon from "../../Common/Icons/Icon";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

const PERMISSIONS_LABEL = {
  1: 'can read',
  7: 'can update',
  15: 'is owner'
};

/**
 * This component display the permission section (Shared With)
 */
class PasswordSidebarPermissionsSection extends React.Component {
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
      permissions: null,
      open: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermissionsEditClickEvent = this.handlePermissionsEditClickEvent.bind(this);
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  /**
   * Returns the current detailed resource
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Get the folder permissions.
   */
  async fetch() {
    const permissions = await this.context.port.request('passbolt.resources.find-permissions', this.resource.id);
    if(permissions) {
      permissions.sort((permissionA, permissionB) => this.sortPermissions(permissionA,permissionB) );
    }
    this.setState({permissions});
  }

  /**
   * Sort permission by user firstname and by group name
   * @param permissionA
   * @param permissionB
   * @returns {number}
   */
  sortPermissions (permissionA, permissionB) {
      // permission have user sort by firstname and lastname
      if (permissionA.user && permissionB.user) {
        if(permissionA.user.profile.first_name === permissionB.user.profile.first_name) {
          return permissionA.user.profile.last_name < permissionB.user.profile.last_name ? -1 : 1;
        }
        return permissionA.user.profile.first_name < permissionB.user.profile.first_name ? -1 : 1;
      }
      // sort after group permission user
      else if (!permissionA.user && permissionB.user) {
        return 1;
      }
      else if (permissionA.user && !permissionB.user) {
        return -1;
      }
      // otherwise, sort by group
      else {
        return permissionA.group.name < permissionB.group.name ? -1 : 1;
      }
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Handle when the user edits the permissions.
   */
  handlePermissionsEditClickEvent() {
    //this.props.onEditPermissions(this.props.folder);
  }

  /**
   * Get a permission aro name
   * @param {object} permission The permission
   */
  getPermissionAroName(permission) {
    if (permission.user) {
      const profile = permission.user.profile;
      return `${profile.first_name} ${profile.last_name} (${permission.user.username})`;
    } else {
      return permission.group.name;
    }
  }

  /**
   * check if no permission is present
   * @returns {boolean}
   */
  isLoading() {
    return !this.state.permissions
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {

    return (
      <div className={`sharedwith accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4><a onClick={this.handleTitleClickEvent} role="button">Shared with</a></h4>
        </div>
        <div className="accordion-content">
          <a onClick={this.handlePermissionsEditClickEvent} className="section-action">
            <Icon name="edit"/>
            <span className="visuallyhidden">modify</span>
          </a>
          {this.isLoading() &&
          <div className="processing-wrapper">
            <span className="processing-text">Retrieving permissions</span>
          </div>
          }
          {!this.isLoading() &&
          <ul className="shared-with ready">
            {this.state.permissions && this.state.permissions.map(permission =>
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
            )}
          </ul>
          }
        </div>
      </div>
    );

  }

}

PasswordSidebarPermissionsSection.contextType = AppContext;

PasswordSidebarPermissionsSection.propTypes = {
  resourceWorkspaceContext: PropTypes.object
};

export default withResourceWorkspace(PasswordSidebarPermissionsSection);
