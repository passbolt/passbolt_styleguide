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
import DisplayResourceDetailsInformation from "./DisplayResourceDetailsInformation";
import DisplayResourceDetailsTag from "./DisplayResourceDetailsTag";

import DisplayResourceDetailsPermission from "./DisplayResourceDetailsPermission";

class PasswordSidebar extends React.Component {

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
      permissionsSectionOpen: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermissionSectionClose = this.handlePermissionSectionClose.bind(this);
    this.handlePermissionSectionOpen = this.handlePermissionSectionOpen.bind(this);
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
    this.findPermissions();
    const permissionsSectionOpen = true;
    this.setState({permissionsSectionOpen});
  }

  /**
   * Get the folder permissions.
   */
  async findPermissions() {
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
            <div className="teaser-image">
              <Icon name="folder"/>
            </div>
            <h3>
              <div className="title-wrapper">
                <span className="name">{this.props.resource.name}</span>
                <a className="title-link" title="Copy the link to this password">
                  <Icon name="link"/>
                  <span className="visuallyhidden">Copy the link to this password</span>
                </a>
              </div>
              <span className="type">resource</span>
            </h3>
            <a className="dialog-close">
              <Icon name="close"/>
              <span className="visuallyhidden">Close</span>
            </a>
          </div>
          <DisplayResourceDetailsInformation
            resource={this.props.resource}
            folders={this.props.folders}
            onSelectFolderParent={this.props.onSelectFolderParent}
            onSelectRoot={this.props.onSelectRoot}
            users={this.props.users}/>
          {/*<PasswordSidebarPermissionsSection*/}
          {/*  resource={this.props.resource}*/}
          {/*  onEditPermissions={this.props.onEditPermissions}*/}
          {/*  onClose={this.handlePermissionSectionClose}*/}
          {/*  onOpen={this.handlePermissionSectionOpen}*/}
          {/*  open={this.state.permissionsSectionOpen}*/}
          {/*  permissions={this.state.permissions}*/}
          {/*  groups={this.props.groups}*/}
          {/*  users={this.props.users}/>*/}
          <DisplayResourceDetailsTag
            resource={this.props.resource}/>

        </div>
      </div>
    );
  }
}

PasswordSidebar.propTypes = {
  resource: PropTypes.object,
  folders: PropTypes.array,
  groups: PropTypes.array,
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  onEditPermissions: PropTypes.func,
  users: PropTypes.array,
};

export default PasswordSidebar;
