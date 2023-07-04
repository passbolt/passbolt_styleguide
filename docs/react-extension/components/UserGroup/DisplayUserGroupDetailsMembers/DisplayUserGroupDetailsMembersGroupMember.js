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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {withTranslation} from "react-i18next";

/**
 * This component displays a group member for the group details members
 */
class DisplayUserGroupDetailsMembersGroupMember extends React.Component {
  /**
   * Get the user associated to the group user
   * @return {object}
   */
  get user() {
    return this.props.context.users.find(user => user.id === this.props.groupUser.user_id);
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
    return this.props.context.userSettings.getTrustedDomain();
  }

  /**
   * Render the component
   */
  render() {
    return (
      <li
        key={this.user.id}
        className="permission usercard-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</div>
            <div className="subinfo">{this.props.t(this.roleName)}</div>
          </div>
        </div>
        <UserAvatar
          user={this.user}
          baseUrl={this.baseUrl}/>
      </li>
    );
  }
}

DisplayUserGroupDetailsMembersGroupMember.propTypes = {
  context: PropTypes.any, // The application context
  groupUser: PropTypes.object, // The group user
  userWorkspaceContext: PropTypes.object, // The user workspace context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withUserWorkspace(withTranslation('common')(DisplayUserGroupDetailsMembersGroupMember)));
