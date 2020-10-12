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
import GroupAvatar from "../../../../react/components/Common/Avatar/GroupAvatar";

/**
 * This component displays the user details about information
 */
class DisplayUserDetailsGroups extends React.Component {
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
      open: true // Flag for the expand / collapse mode
    };
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
  }

  /**
   * The groups the current selected user belongs to
   */
  get groups() {
    const {groups} = this.context;
    const selectedUser = this.props.userWorkspaceContext.details.user;
    const belongsToGroup = group => group.groups_users.some(group_user => group_user.user_id === selectedUser.id);
    const groupUser = group => group.groups_users.find(group_user => group_user.user_id === selectedUser.id);
    const userRole = groupUser => groupUser.is_admin ? "Admin" : "Member";
    const roleMapper = group => Object.assign({}, group, {role: userRole(groupUser(group))});
    return groups
      .filter(belongsToGroup)
      .map(roleMapper);
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
    const groups = this.groups;
    const hasGroups = groups.length > 0;
    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClicked}  role="button">
              Groups
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </a>
          </h4>
        </div>
        <ul className="accordion-content">
          {this.state.open && hasGroups &&
            groups.map(group => (
              <li
                key={group.id}
                className="permission usercard-col-2">
                <div className="content-wrapper">
                  <div className="content">
                    <div className="name">{group.name}</div>
                    <div className="subinfo">{group.role}</div>
                  </div>
                </div>
                <GroupAvatar
                  group={group}
                  baseUrl={this.baseUrl}/>
              </li>
            ))
          }
          {!hasGroups &&
            <em className="empty-feedback empty-group-feedback">The user is not a member of any group yet</em>
          }

        </ul>
      </div>
    );
  }
}

DisplayUserDetailsGroups.contextType = AppContext;
DisplayUserDetailsGroups.propTypes = {
  userWorkspaceContext: PropTypes.object // The user workspace context
};

export default withUserWorkspace(DisplayUserDetailsGroups);
