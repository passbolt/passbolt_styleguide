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
import Icon from "../../../../react/components/Common/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import AppContext from "../../../contexts/AppContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";

/**
 * This component displays the group details about members
 */
class DisplayUserGroupDetailsMembers extends React.Component {
  /**
   * Default constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      open: false // Flag for the expand / collapse mode
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
  }

  /**
   * Returns the current user to detail
   */
  get group() {
    return this.props.userWorkspaceContext.details.group;
  }

  /**
   * The members the current selected group has composed of
   */
  get members() {
    console.log(this.group);
    const groupUserRole = groupUser => groupUser.is_admin ? "Admin" : "Member";
    const groupUsers = this.group.groups_users.map(groupUser => ({id: groupUser.user_id, role: groupUserRole(groupUser)}));
    const findUser = groupUser => this.context.users.find(user => user.id === groupUser.id);
    return groupUsers.map(groupUser => Object.assign({}, findUser(groupUser), {role: groupUser.role}));
  }

  /**
   * Returns the base url
   */
  get baseUrl() {
    return this.context.userSettings.getTrustedDomain();
  }

  /**
   * Handle the click on the title
   */
  handleTitleClicked() {
    this.setState({open: !this.state.open});
  }

  /**
   * Render the component
   */
  render() {
    const members = this.members;
    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClicked}  role="button">
              Group Members
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </a>
          </h4>
        </div>
        <ul className="accordion-content">
          {this.state.open &&
          members.map(member => (
            <li
              key={member.id}
              className="permission usercard-col-2">
              <div className="content-wrapper">
                <div className="content">
                  <div className="name">{`${member.profile.first_name} ${member.profile.last_name}`}</div>
                  <div className="subinfo">{member.role}</div>
                </div>
              </div>
              <UserAvatar
                group={member}
                baseUrl={this.baseUrl}/>
            </li>
          ))
          }
        </ul>
      </div>
    );
  }
}

DisplayUserGroupDetailsMembers.contextType = AppContext;
DisplayUserGroupDetailsMembers.propTypes = {
  userWorkspaceContext: PropTypes.object // The user workspace context
};

export default withUserWorkspace(DisplayUserGroupDetailsMembers);
