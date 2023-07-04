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
import Icon from "../../../../shared/components/Icons/Icon";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import ShareDialog from "../../Share/ShareDialog";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";

class DisplayResourceFolderDetailsPermissions extends React.Component {
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
    await this.handleFolderChange(prevProps.resourceWorkspaceContext.details.folder);
  }

  /**
   * Check if the folder has changed and fetch
   * @param previousFolder
   */
  handleFolderChange(previousFolder) {
    const hasFolderChanged = this.folder.id !== previousFolder.id;
    if (hasFolderChanged && this.state.open) {
      this.fetch();
    }
  }

  /**
   * Get the folder permissions.
   */
  async fetch() {
    this.setState({loading: true});
    const permissions = await this.props.context.port.request('passbolt.folders.find-permissions', this.folder.id);
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
   * handle when the users click on the section header.
   * Open/Close it.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    if (open) {
      this.fetch();
    }
    this.setState({open});
  }

  /**
   * Handle when the user edits the folder permissions.
   */
  handlePermissionsEditClickEvent() {
    const foldersIds = [this.folder.id];
    this.props.context.setContext({shareDialogProps: {foldersIds}});
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
        return this.translate("can read");
      case 7:
        return this.translate("can update");
      case 15:
        return this.translate("is owner");
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
    return this.folder.permission && this.folder.permission.type === 15;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <Trans>Shared with</Trans>
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </button>
          </h4>
        </div>
        <div className="accordion-content">
          {this.canShare() &&
          <button type="button" onClick={this.handlePermissionsEditClickEvent} className="section-action button-transparent">
            <Icon name="edit"/>
            <span className="visuallyhidden"><Trans>modify</Trans></span>
          </button>
          }
          <div>
            <ul className="shared-with ready">
              {this.isLoading() &&
              <div className="processing-wrapper">
                <Icon name="spinner"/>
                <span className="processing-text"><Trans>Retrieving permissions</Trans></span>
              </div>
              }
              {this.state.permissions && this.state.permissions.map(permission => (
                <li key={permission.id} className="usercard-col-2">
                  <div className="content-wrapper">
                    <div className="content">
                      <div className="name">{this.getPermissionAroName(permission)}</div>
                      <div className="subinfo">{this.getPermissionLabel(permission)}</div>
                    </div>
                  </div>
                  {permission.user &&
                  <UserAvatar user={permission.user} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
                  }
                  {permission.group &&
                  <GroupAvatar group={permission.group}/>
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

DisplayResourceFolderDetailsPermissions.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.object,
  dialogContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withResourceWorkspace(withTranslation('common')(DisplayResourceFolderDetailsPermissions))));
