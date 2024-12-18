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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import EditUser from "../EditUser/EditUser";
import {withDialog} from "../../../contexts/DialogContext";
import DeleteUser from "../DeleteUser/DeleteUser";
import DeleteUserWithConflicts from "../DeleteUser/DeleteUserWithConflicts";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ConfirmDisableUserMFA from "../ConfirmDisableUserMFA/ConfirmDisableUserMFA";
import {Trans, withTranslation} from "react-i18next";
import HandleReviewAccountRecoveryRequestWorkflow
  from "../../AccountRecovery/HandleReviewAccountRecoveryRequestWorkflow/HandleReviewAccountRecoveryRequestWorkflow";
import {withWorkflow} from "../../../contexts/WorkflowContext";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import MoreHorizontalSVG from "../../../../img/svg/more_horizontal.svg";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DropdownMenuItem from "../../Common/Dropdown/DropdownMenuItem";
import LinkSVG from "../../../../img/svg/link.svg";
import SendSVG from "../../../../img/svg/send.svg";
import FingerprintDisabledSVG from "../../../../img/svg/fingerprint_disabled.svg";
import BuoySVG from "../../../../img/svg/buoy.svg";

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
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDetailsLockedEvent = this.handleDetailsLockedEvent.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleDisableMfaEvent = this.handleDisableMfaEvent.bind(this);
    this.handleCopyPermalinkEvent = this.handleCopyPermalinkEvent.bind(this);
    this.handleResendInviteClickEvent = this.handleResendInviteClickEvent.bind(this);
    this.handleReviewRecoveryRequestEvent = this.handleReviewRecoveryRequestEvent.bind(this);
  }

  /**
   * Returns true if the current user can delete the current selected user
   */
  get canDelete() {
    const isNotCurrentUser = this.selectedUser && this.props.context.loggedInUser.id !== this.selectedUser.id;
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
    this.props.context.setContext({editUserDialogProps});
    this.props.dialogContext.open(EditUser);
  }

  /**
   * Handle delete click event
   */
  async handleDeleteClickEvent() {
    try {
      await this.props.context.port.request("passbolt.users.delete-dry-run", this.selectedUser.id);
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
    this.props.context.setContext({deleteUserDialogProps});
    this.props.dialogContext.open(DeleteUser);
  }

  /**
   * Display delete user dialog when there is conflict to solve.
   */
  displayDeleteUserWithConflictsDialog(errors) {
    const deleteUserWithConflictsDialogProps = {
      user: this.selectedUser,
      errors: errors,
    };
    this.props.context.setContext({deleteUserWithConflictsDialogProps});
    this.props.dialogContext.open(DeleteUserWithConflicts);
  }

  /**
   * Display error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      message: error.message
    };
    this.props.context.setContext({errorDialogProps});
    this.props.dialogContext.open(NotifyError);
  }

  /**
   * Handle the will of disable MFA for a user
   */
  handleDisableMfaEvent() {
    this.disableMFA();
  }

  /**
   * Handle review recovery request click event
   */
  handleReviewRecoveryRequestEvent() {
    const accountRecoveryRequestId = this.selectedUser.pending_account_recovery_request.id;
    this.props.workflowContext.start(HandleReviewAccountRecoveryRequestWorkflow, {accountRecoveryRequestId});
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
    return this.props.context.siteSettings.canIUse("multiFactorAuthentication");
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
   * Check if the user can use the review recovery request capability.
   */
  canIReviewAccountRecoveryRequest() {
    return this.props.context.siteSettings.canIUse("accountRecovery") && this.isLoggedInUserAdmin();
  }

  /**
   * Has a pending account recovery for the user.
   * @returns {boolean}
   */
  hasPendingAccountRecoveryRequest() {
    return this.selectedUser && Boolean(this.selectedUser.pending_account_recovery_request);
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
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === "admin";
  }

  /**
   * Disable the selected user's MFA
   */
  disableMFA() {
    this.props.dialogContext.open(ConfirmDisableUserMFA);
  }

  /**
   * Copy the user permalink
   */
  async copyPermalink() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/users/view/${this.selectedUser.id}`;
    await ClipBoard.copy(permalink, this.props.context.port);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The permalink has been copied to clipboard"));
  }

  /**
   * Resend an invite to the given user
   */
  resendInvite() {
    this.props.context.port.request('passbolt.users.resend-invite', this.selectedUser.username)
      .then(this.onResendInviteSuccess.bind(this))
      .catch(this.onResendInviteFailure.bind(this));
  }

  /**
   * Whenever the resend invite succeeds
   */
  onResendInviteSuccess() {
    this.props.actionFeedbackContext.displaySuccess(this.translate("The invite has been resent successfully"));
  }

  /**
   * Whenever the resend invite fails
   * @param error An error
   */
  onResendInviteFailure(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
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
      <div className="actions-wrapper">
        <div className="actions">
          {this.isLoggedInUserAdmin() &&
          <ul>
            <li>
              <button type="button" disabled={this.isButtonDisabled()} onClick={this.handleEditClickEvent}>
                <Icon name="edit"/>
                <span><Trans>Edit</Trans></span>
              </button>
            </li>
            <li>
              <button type="button" disabled={!this.canDelete} onClick={this.handleDeleteClickEvent}>
                <Icon name="trash"/>
                <span><Trans>Delete</Trans></span>
              </button>
            </li>
            <li>
              <Dropdown>
                <DropdownButton className="more button-action-contextual button-action-icon" disabled={!this.hasMoreActionAllowed}>
                  <MoreHorizontalSVG/>
                </DropdownButton>
                <DropdownMenu className="menu-action-contextual">
                  <DropdownMenuItem separator={true}>
                    <button id="copy-user-permalink" type="button" className="no-border" disabled={!this.canCopyPermalink} onClick={this.handleCopyPermalinkEvent}>
                      <LinkSVG/>
                      <span><Trans>Copy permalink</Trans></span>
                    </button>
                  </DropdownMenuItem>
                  {this.canIUseResend &&
                    <DropdownMenuItem>
                      <button id="resend-invite-user" type="button" className="no-border" disabled={!this.canResendInviteToUser} onClick={this.handleResendInviteClickEvent}>
                        <SendSVG/>
                        <span><Trans>Resend invite</Trans></span>
                      </button>
                    </DropdownMenuItem>
                  }
                  {this.canIUseMfa &&
                    <DropdownMenuItem>
                      <button id="disable-mfa-action" type="button" className="no-border" disabled={!this.canDisableMfaForUser} onClick={this.handleDisableMfaEvent}>
                        <FingerprintDisabledSVG/>
                        <span><Trans>Disable MFA</Trans></span>
                      </button>
                    </DropdownMenuItem>
                  }
                  {this.canIReviewAccountRecoveryRequest() &&
                    <DropdownMenuItem>
                      <button id="review-recovery" type="button" className="no-border" disabled={!this.hasPendingAccountRecoveryRequest()} onClick={this.handleReviewRecoveryRequestEvent}>
                        <BuoySVG/>
                        <span><Trans>Review recovery request</Trans></span>
                      </button>
                    </DropdownMenuItem>
                  }
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
          }
        </div>
        <div className="actions secondary">
          <ul>
            <li>
              <button type="button"
                className={`button-toggle button-action button-action-icon info ${this.hasDetailsLocked() ? "active" : ""}`}
                onClick={this.handleDetailsLockedEvent}>
                <Icon name="info-circle" big={true}/>
                <span className="visuallyhidden"><Trans>View detail</Trans></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayUserWorkspaceActions.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.any, // the user workspace context
  workflowContext: PropTypes.any, // the workflow context
  dialogContext: PropTypes.any, // the dialog context
  actionFeedbackContext: PropTypes.object, // the action feeedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withWorkflow(withDialog(withUserWorkspace(withTranslation('common')(DisplayUserWorkspaceActions))))));
