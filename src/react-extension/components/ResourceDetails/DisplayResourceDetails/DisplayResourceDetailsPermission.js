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
import Icon from "../../../../shared/components/Icons/Icon";
import {withAppContext} from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withDialog} from "../../../contexts/DialogContext";
import ShareDialog from "../../Share/ShareDialog";
import {Trans, withTranslation} from "react-i18next";

const PERMISSIONS_LABEL = {
  1: 'can read',
  7: 'can update',
  15: 'is owner'
};

/**
 * This component display the permission section (Shared With)
 */
class DisplayResourceDetailsPermission extends React.Component {
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
      open: false,
      loading: true,
    };
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
    await this.handleResourceChange(prevProps.resourceWorkspaceContext.details.resource);
    await this.handleResourcePermissionsRefresh(prevProps.resourceWorkspaceContext.refresh.permissions);
  }

  /**
   * Returns the current detailed resource
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Check if the resource has changed and fetch
   * @param previousResource
   */
  handleResourceChange(previousResource) {
    const hasResourceChanged = this.resource.id !== previousResource.id;
    if (hasResourceChanged && this.state.open) {
      this.fetch();
    }
  }

  /**
   * Handle the refresh of resource permissions
   * @param hasPreviouslyRefreshed True if one previously refreshed the permissions
   */
  async handleResourcePermissionsRefresh(hasPreviouslyRefreshed) {
    const mustRefresh = !hasPreviouslyRefreshed && this.props.resourceWorkspaceContext.refresh.permissions;
    if (mustRefresh) {
      await this.fetch();
      await this.props.resourceWorkspaceContext.onResourcePermissionsRefreshed();
    }
  }

  /**
   * Get the folder permissions.
   */
  async fetch() {
    this.setState({loading: true});
    const permissions = await this.props.context.port.request('passbolt.resources.find-permissions', this.resource.id);
    if (permissions) {
      permissions.sort((permissionA, permissionB) => this.sortPermissions(permissionA, permissionB));
    }
    this.setState({permissions, loading: false});
  }

  /**
   * Sort permission by user firstname and by group name
   * @param permissionA
   * @param permissionB
   * @returns {number}
   */
  sortPermissions(permissionA, permissionB) {
    // permission have user sort by firstname and lastname
    if (permissionA.user && permissionB.user) {
      if (permissionA.user.profile.first_name === permissionB.user.profile.first_name) {
        return permissionA.user.profile.last_name < permissionB.user.profile.last_name ? -1 : 1;
      }
      return permissionA.user.profile.first_name < permissionB.user.profile.first_name ? -1 : 1;
    } else if (!permissionA.user && permissionB.user) { // sort after group permission user
      return 1;
    } else if (permissionA.user && !permissionB.user) {
      return -1;
    } else { // otherwise, sort by group
      return permissionA.group.name < permissionB.group.name ? -1 : 1;
    }
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    if (open) {
      this.fetch();
    }
    this.setState({open});
  }

  /**
   * Handle when the user edits the permissions.
   */
  handlePermissionsEditClickEvent() {
    const resourcesIds = [this.resource.id];
    this.props.context.setContext({shareDialogProps: {resourcesIds}});
    this.props.dialogContext.open(ShareDialog);
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
    return this.state.loading;
  }

  /**
   * Check if the user can share the folder.
   * @returns {boolean}
   */
  canShare() {
    return this.resource.permission && this.resource.permission.type === 15;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className={`sharedwith accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClickEvent} role="button">
              <Trans>Shared with</Trans>
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </a>
          </h4>
        </div>
        <div className="accordion-content">
          {this.canShare() &&
          <a onClick={this.handlePermissionsEditClickEvent} className="section-action button button-transparent">
            <Icon name="edit"/>
            <span className="visuallyhidden"><Trans>modify</Trans></span>
          </a>
          }
          {this.isLoading() &&
          <div className="processing-wrapper">
            <Icon name="spinner"/>
            <span className="processing-text"><Trans>Retrieving permissions</Trans></span>
          </div>
          }
          {!this.isLoading() &&
          <ul className="shared-with ready">
            {this.state.permissions && this.state.permissions.map(permission =>
              <li key={permission.id} className="usercard-col-2">
                <div className="content-wrapper">
                  <div className="content">
                    <div className="name">{this.getPermissionAroName(permission)}</div>
                    <div className="subinfo">{this.props.t(PERMISSIONS_LABEL[permission.type])}</div>
                  </div>
                </div>
                {permission.user &&
                <UserAvatar user={permission.user} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
                }
                {permission.group &&
                <GroupAvatar group={permission.group} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
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

DisplayResourceDetailsPermission.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.object,
  dialogContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withResourceWorkspace(withTranslation('common')(DisplayResourceDetailsPermission))));
