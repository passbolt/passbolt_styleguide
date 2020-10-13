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
import AppContext from "../../../contexts/AppContext";
import Icon from "../../Common/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import EditUserDialog from "../EditUser/EditUserDialog";
import {withDialog} from "../../../contexts/Common/DialogContext";

/**
 * This component is a container of multiple actions applicable on user
 */
class DisplayUserWorkspaceActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDetailsLockedEvent = this.handleDetailsLockedEvent.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
  }


  /**
   * Handle view detail click event
   */
  handleDetailsLockedEvent() {
    // lock or unlock the detail resource or folder
    this.props.userWorkspaceContext.onDetailsLocked();
  }

  /**
   * Has lock for the detail display
   * @returns {boolean}
   */
  hasDetailsLocked() {
    return this.props.userWorkspaceContext.details.locked;
  }

  /**
   * Handle edit click event
   */
  handleEditClickEvent() {
    const editUserDialogProps = {
      id: this.selectedUser.id
    };
    this.context.setContext({editUserDialogProps});
    this.props.dialogContext.open(EditUserDialog);
  }

  /**
   * Get selected user
   * @returns {user|null}
   */
  get selectedUser() {
    return this.props.userWorkspaceContext.selectedUsers[0];
  }

  /**
   * Check if the users workspace has one user selected.
   * @return {boolean}
   */
  hasOneUserSelected() {
    return this.props.userWorkspaceContext.selectedUsers.length === 1;
  }

  /**
   * Check if the edit button is disabled.
   * @returns {boolean}
   */
  isEditButtonDisabled() {
    return !this.hasOneUserSelected();
  }

  /**
   * Can update the resource
   * @returns {boolean}
   */
  isLoggedInUserAdmin() {
    return this.context.loggedInUser && this.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          {this.isLoggedInUserAdmin() &&
          <ul className="ready">
            <li>
              <a className={`button ready ${this.isEditButtonDisabled() ? "disabled" : ""}`} onClick={this.handleEditClickEvent}>
                <Icon name="edit"/>
                <span>edit</span>
              </a>
            </li>
          </ul>
          }
        </div>
        <div className="actions secondary">
          <ul className="ready">
            <li>
              <a
                className={`button toggle info ${this.hasDetailsLocked() ? "selected" : ""}`}
                onClick={this.handleDetailsLockedEvent}>
                <Icon name="info-circle"/>
                <span className="visuallyhidden">view detail</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayUserWorkspaceActions.contextType = AppContext;

DisplayUserWorkspaceActions.propTypes = {
  userWorkspaceContext: PropTypes.any, // the user workspace context
  dialogContext: PropTypes.any, // the dialog context
};

export default withDialog(withUserWorkspace(DisplayUserWorkspaceActions));
