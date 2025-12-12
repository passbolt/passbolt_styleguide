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
 * @since         5.8.0
 */
import React from "react";
import PropTypes from "prop-types";
import AppContext, {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {getUserFormattedName} from "../../../../shared/utils/userUtils";

class DisplayDragUser extends React.Component {
  /**
   * the user selected
   * @returns {Array<object>}
   */
  get selectedUsers() {
    return this.props.userWorkspaceContext.selectedUsers;
  }

  /**
   * is multiple users selected
   * @returns {boolean}
   */
  isMultipleSelected() {
    return this.selectedUsers.length > 1;
  }

  /**
   * has more than three users selected
   * @returns {boolean}
   */
  hasMoreThanThreeUsersSelected() {
    return this.selectedUsers.length > 3;
  }

  /**
   * Get the number of users
   * @returns {string}
   */
  get numberOfUsers() {
    return this.selectedUsers.length > 99 ? '99+' : this.props.userWorkspaceContext.selectedUsers.length.toString();
  }

  /**
   * Get the first user's full name
   * @returns {string}
   */
  get firstUserFullName() {
    const user = this.selectedUsers[0];
    return getUserFormattedName(user);
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    const fullName = this.firstUserFullName;
    const username = this.selectedUsers[0]?.username;

    return (
      <div className={`drag-and-drop ${this.hasMoreThanThreeUsersSelected() ? "item-n" : `item-${this.numberOfUsers}`}`}>
        <UserAvatar className="drag-image" user={this.selectedUsers[0]} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
        <span className="message">{fullName || username}</span>
        {this.isMultipleSelected() &&
          <span className="count">
            {this.numberOfUsers}
          </span>
        }
      </div>
    );
  }
}

DisplayDragUser.contextType = AppContext;

DisplayDragUser.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.any
};

export default withAppContext(withUserWorkspace(DisplayDragUser));
