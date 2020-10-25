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
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import AppContext from "../../../contexts/AppContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";

/**
 * This component displays a group member for the group details members
 */
class DisplayUserGroupDetailsMembersGroupMember extends React.Component {
  /**
   * Get the user associated to the group user
   * @return {object}
   */
  get user() {
    return this.context.users.find(user => user.id === this.props.groupUser.user_id);
  }

  /**
   * Get the user role name in this group.
   * @return {object}
   */
  get roleName() {
    return this.props.groupUser.is_admin ? "Group manager" : "Member";
  }

  /**
   * Returns the base url
   */
  get baseUrl() {
    return this.context.userSettings.getTrustedDomain();
  }

  /**
   * Render the component
   */
  render() {
    return (
      <li
        className="permission usercard-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</div>
            <div className="subinfo">{this.roleName}</div>
          </div>
        </div>
        <UserAvatar
          user={this.user}
          baseUrl={this.baseUrl}/>
      </li>
    );
  }
}

DisplayUserGroupDetailsMembersGroupMember.contextType = AppContext;
DisplayUserGroupDetailsMembersGroupMember.propTypes = {
  groupUser: PropTypes.object, // The group user
  userWorkspaceContext: PropTypes.object // The user workspace context
};

export default withUserWorkspace(DisplayUserGroupDetailsMembersGroupMember);
