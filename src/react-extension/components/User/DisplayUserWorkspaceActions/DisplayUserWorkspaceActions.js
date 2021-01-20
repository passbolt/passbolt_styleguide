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
import Icon from "../../../../react/components/Common/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import EditUserDialog from "../EditUser/EditUserDialog";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
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
    this.handleCopyPermalinkEvent = this.handleCopyPermalinkEvent.bind(this);
    this.handleResendInviteClickEvent = this.handleResendInviteClickEvent.bind(this);
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
   * Returns true if the current user can delete the current selected user
   */
  get canDelete() {
    const isNotCurrentUser = this.selectedUser && this.context.loggedInUser.id !== this.selectedUser.id;
    return !this.isButtonDisabled() && isNotCurrentUser;
  }

  /**
   * Handle view detail click event
   */
  handleDetailsLockedEvent() {
    // lock or unlock the detail resource or folder
    this.props.userWorkspaceContext.onDetailsLocked();
  }

  /**
   * Handle the will of copying the user permalink
   */
  handleCopyPermalinkEvent() {
    this.copyPermalink();
  }

  /**
   * Handle the will of
   */
  handleResendInviteClickEvent() {
    this.resendInvite();
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
    if (this.moreMenuRef.current && this.moreMenuRef.current.contains(event.target)) {
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
   * Returns true if the current user can copy a user permalink
   */
  get canCopyPermalink() {
    return Boolean(this.selectedUser);
  }

  /**
   * Can the logged in user use the mfa capability.
   */
  get canIUseMfa() {
    return this.context.siteSettings.canIUse("multiFactorAuthentication");
  }

  /**
   * Returns true if the current user can disable the MFA of a user
   */
  get canDisableMfaForUser() {
    return this.selectedUser && this.selectedUser.is_mfa_enabled;
  }

  /**
   * Returns true if the logged in user can use the resend capability.
   */
  get canIUseResend() {
    return this.isLoggedInUserAdmin();
  }

  /**
   * Returns true if the logged in user can resend an invite to the user
   */
  get canResendInviteToUser() {
    return this.selectedUser && !this.selectedUser.active;
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
    return this.context.loggedInUser && this.context.loggedInUser.role.name === "admin";
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
   * Copy the user permalink
   */
  async copyPermalink() {
    this.closeMoreMenu();
    const baseUrl = this.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/users/view/${this.selectedUser.id}`;
    await this.context.port.request("passbolt.clipboard.copy", permalink);
    this.props.actionFeedbackContext.displaySuccess("The permalink has been copied to clipboard");
  }

  /**
   * Resend an invite to the given user
   */
  resendInvite() {
    this.context.port.request('passbolt.users.resend-invite', this.selectedUser.username)
      .then(this.onResendInviteSuccess.bind(this))
      .catch(this.onResendInviteFailure.bind(this));
  }

  /**
   * Whenever the resend invite succeeds
   */
  onResendInviteSuccess() {
    this.props.actionFeedbackContext.displaySuccess("The invite has been resent successfully");
    this.toggleMoreMenu();
  }

  /**
   * Whenever the resend invite fails
   * @param error An error
   */
  onResendInviteFailure(error) {
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    this.toggleMoreMenu();
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
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
                <span>Edit</span>
              </a>
            </li>
            <li>
              <a className={`button ready ${!this.canDelete ? "disabled" : ""}`} onClick={this.handleDeleteClickEvent}>
                <Icon name="trash"/>
                <span>Delete</span>
              </a>
            </li>
            <div className="dropdown" ref={this.moreMenuRef}>
              <a
                className={`button ready ${this.hasMoreActionAllowed ? "" : "disabled"}`}
                onClick={this.handleMoreClickEvent}>
                <span>More</span>
                <Icon name="caret-down"/>
              </a>
              <ul className={`dropdown-content menu ready ${this.state.moreMenuOpen ? "visible" : ""}`}>
                <li id="copy-user-permalink" className="separator-after">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <a
                          onClick={this.handleCopyPermalinkEvent}
                          className={`${this.canCopyPermalink ? "" : "disabled"}`}>
                          <span>Copy permalink to clipboard</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                {this.canIUseResend &&
                <li id="resend-invite-user" className="separator-after">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <a onClick={this.handleResendInviteClickEvent}
                          className={`${this.canResendInviteToUser ? "" : "disabled"}`}>
                          <span>Resend invite</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                }
                {this.canIUseMfa &&
                <li id="disable-mfa-action" className="">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <a
                          id="disable-mfa"
                          onClick={this.handleDisableMfaEvent}
                          className={this.canDisableMfaForUser ? '' : 'disabled'}>
                          <span>Disable MFA</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                }
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
                <span className="visuallyhidden">View detail</span>
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
