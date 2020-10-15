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
import DeleteUserDialog from "../DeleteUser/DeleteUserDialog";
import DeleteUserWithConflictsDialog from "../DeleteUser/DeleteUserWithConflictsDialog";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ConfirmDisableUserMFA from "../DisableUserMFA/ConfirmDisableUserMFA";

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
    this.createRefs();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      moreMenuOpen: false // Display flag for the more button menu
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDetailsLockedEvent = this.handleDetailsLockedEvent.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
    this.handleDisableMfaEvent = this.handleDisableMfaEvent.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.moreMenuRef = React.createRef();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent);
  }

  /**
   * Whenever the component will unmount
   */
  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent);
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
   * Handle delete click event
   */
  async handleDeleteClickEvent() {
    try {
      await this.context.port.request("passbolt.users.delete-dry-run", this.selectedUser.id);
      this.displayDeleteUserDialog();
    } catch (error) {
      if (error.name === "DeleteDryRunError") {
        this.displayDeleteUserWithConflictsDialog(error.errors);
      } else {
        this.handleError(error);
      }
    }
  }

  /**
   * Display delete user dialog when there is not conflict to solve
   */
  displayDeleteUserDialog() {
    const deleteUserDialogProps = {
      user: this.selectedUser
    };
    this.context.setContext({deleteUserDialogProps});
    this.props.dialogContext.open(DeleteUserDialog);
  }

  /**
   * Display delete user dialog when there is conflict to solve.
   */
  displayDeleteUserWithConflictsDialog(errors) {
    const deleteUserWithConflictsDialogProps = {
      user: this.selectedUser,
      errors: errors,
    };
    this.context.setContext({deleteUserWithConflictsDialogProps});
    this.props.dialogContext.open(DeleteUserWithConflictsDialog);
  }

  /**
   * Display error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Handle the open or close the more menu
   */
  handleMoreClickEvent() {
    this.toggleMoreMenu();
  }

  /**
   * Handle the will of disable MFA for a user
   */
  handleDisableMfaEvent() {
    this.disableMFA();
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the menu
    if (this.moreMenuRef.current.contains(event.target)) {
      return;
    }
    this.closeMoreMenu();
  }

  /**
   * Get selected user
   * @returns {user|null}
   */
  get selectedUser() {
    return this.props.userWorkspaceContext.selectedUsers[0];
  }

  /**
   * Returns true if the more actions are available
   */
  get hasMoreActionAllowed() {
    return this.hasOneUserSelected();
  }

  /**
   * Returns true if the current user has the plugin capability to disable MFA
   */
  get haveDisableMfaCapability() {
    const hasSettingsCapability = this.context.siteSettings.settings.passbolt.plugins.multiFactorAuthentication;
    const hasContextualCapability = this.selectedUser && this.selectedUser.is_mfa_enabled;
    return hasContextualCapability && hasSettingsCapability;
  }

  /**
   * Check if the users workspace has one user selected.
   * @return {boolean}
   */
  hasOneUserSelected() {
    return this.props.userWorkspaceContext.selectedUsers.length === 1;
  }

  /**
   * Check if the button is disabled.
   * @returns {boolean}
   */
  isButtonDisabled() {
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
   * Disable the selected user's MFA
   */
  disableMFA() {
    this.closeMoreMenu();
    this.props.dialogContext.open(ConfirmDisableUserMFA);
  }


  /**
   * Toggles the more menu
   */
  toggleMoreMenu() {
    const moreMenuOpen = !this.state.moreMenuOpen;
    this.setState({moreMenuOpen});
  }

  /**
   * Close the more menu
   */
  closeMoreMenu() {
    this.setState({moreMenuOpen: false});
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
              <a className={`button ready ${this.isButtonDisabled() ? "disabled" : ""}`} onClick={this.handleEditClickEvent}>
                <Icon name="edit"/>
                <span>edit</span>
              </a>
            </li>
            <li>
              <a className={`button ready ${this.isButtonDisabled() ? "disabled" : ""}`} onClick={this.handleDeleteClickEvent}>
                <Icon name="trash"/>
                <span>delete</span>
              </a>
            </li>
            <div className="dropdown" ref={this.moreMenuRef}>
              <a
                className={`button ready ${this.hasMoreActionAllowed ? "" : "disabled"}`}
                onClick={this.handleMoreClickEvent}>
                <span>more</span>
                <Icon name="caret-down"/>
              </a>
              <ul className={`dropdown-content menu ready ${this.state.moreMenuOpen ? "visible" : ""}`}>
                <li id="disable-mfa-action" className="">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <a
                          id="disable-mfa"
                          onClick={this.handleDisableMfaEvent}
                          className={this.haveDisableMfaCapability ? '' : 'disabled'}>
                          <span>Disable MFA</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
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
  actionFeedbackContext: PropTypes.object // the action feeedback context
};

export default withActionFeedback(withDialog(withUserWorkspace(DisplayUserWorkspaceActions)));
