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
import {withAppContext} from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import EditUser from "../EditUser/EditUser";
import ConfirmDisableUserMFA from "../ConfirmDisableUserMFA/ConfirmDisableUserMFA";
import DeleteUserWithConflicts from "../DeleteUser/DeleteUserWithConflicts";
import DeleteUser from "../DeleteUser/DeleteUser";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {Trans, withTranslation} from "react-i18next";
import {withWorkflow} from "../../../contexts/WorkflowContext";
import HandleReviewAccountRecoveryRequestWorkflow
  from "../../AccountRecovery/HandleReviewAccountRecoveryRequestWorkflow/HandleReviewAccountRecoveryRequestWorkflow";

class DisplayUsersContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermalinkCopy = this.handlePermalinkCopy.bind(this);
    this.handlePublicKeyCopy = this.handlePublicKeyCopy.bind(this);
    this.handleUsernameCopy = this.handleUsernameCopy.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleResendInviteClickEvent = this.handleResendInviteClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleDisableMfaEvent = this.handleDisableMfaEvent.bind(this);
    this.handleReviewRecoveryRequestClickEvent = this.handleReviewRecoveryRequestClickEvent.bind(this);
  }

  /**
   * Can the logged in user use the mfa capability.
   */
  get canIUseMfa() {
    return this.props.context.siteSettings.canIUse("multiFactorAuthentication") && this.isLoggedInUserAdmin();
  }

  /**
   * Returns true if the currrent user can disable the MFA of a user
   */
  get canDisableMfaForUser() {
    return this.props.user.is_mfa_enabled;
  }

  /**
   * the resource selected
   * @returns {*}
   */
  get user() {
    return this.props.user;
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
    return this.user && !this.user.active;
  }

  /**
   * Handle the copy of user permalink
   */
  async handlePermalinkCopy() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/users/view/${this.user.id}`;
    await this.props.context.port.request("passbolt.clipboard.copy", permalink);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The permalink has been copied to clipboard"));
    this.props.hide();
  }

  /**
   * Handle the copy of the username
   */
  async handleUsernameCopy() {
    const username = `${this.user.username}`;
    await this.props.context.port.request("passbolt.clipboard.copy", username);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The email has been copied to clipboard"));
    this.props.hide();
  }

  /**
   * Handle the copy of public key
   */
  async handlePublicKeyCopy() {
    const gpgkeyInfo = await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);
    await this.props.context.port.request("passbolt.clipboard.copy", gpgkeyInfo.armored_key);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The public key has been copied to clipboard"));
    this.props.hide();
  }

  /**
   * handle edit user
   */
  handleEditClickEvent() {
    const editUserDialogProps = {
      id: this.user.id
    };
    this.props.context.setContext({editUserDialogProps});
    this.props.dialogContext.open(EditUser);
    this.props.hide();
  }

  /**
   * Handle the will of resending an invite
   */
  handleResendInviteClickEvent() {
    this.resendInvite();
  }

  /**
   * Handle the will of disable MFA for a user
   */
  handleDisableMfaEvent() {
    this.disableMFA();
  }

  /**
   * Handle delete click event
   */
  async handleDeleteClickEvent() {
    try {
      await this.props.context.port.request("passbolt.users.delete-dry-run", this.user.id);
      this.displayDeleteUserDialog();
    } catch (error) {
      if (error.name === "DeleteDryRunError") {
        this.displayDeleteUserWithConflictsDialog(error.errors);
      } else {
        this.handleError(error);
      }
    }
    this.props.hide();
  }

  /**
   * Display delete user dialog when there is not conflict to solve
   */
  displayDeleteUserDialog() {
    const deleteUserDialogProps = {
      user: this.user
    };
    this.props.context.setContext({deleteUserDialogProps});
    this.props.dialogContext.open(DeleteUser);
  }

  /**
   * Display delete user dialog when there is conflict to solve.
   */
  displayDeleteUserWithConflictsDialog(errors) {
    const deleteUserWithConflictsDialogProps = {
      user: this.user,
      errors: errors
    };
    this.props.context.setContext({deleteUserWithConflictsDialogProps});
    this.props.dialogContext.open(DeleteUserWithConflicts);
  }

  /**
   * Handle review recovery request click event
   */
  handleReviewRecoveryRequestClickEvent() {
    const accountRecoveryRequestId = this.user.pending_account_recovery_request.id;
    this.props.workflowContext.start(HandleReviewAccountRecoveryRequestWorkflow, {accountRecoveryRequestId});
    this.props.hide();
  }

  /**
   * Display error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Check if the user can use the edit capability.
   * @returns {boolean}
   */
  canIUseEdit() {
    return this.isLoggedInUserAdmin();
  }

  /**
   * Check if the user can use the delete capability.
   * @param user An user
   */
  canIUseDelete() {
    return this.isLoggedInUserAdmin();
  }

  /**
   * Check if the user can use the review recovery request capability.
   */
  canIReviewAccountRecoveryRequest() {
    return this.props.context.siteSettings.canIUse("accountRecovery") && this.isLoggedInUserAdmin();
  }

  /**
   * Can delete the user. A user cannot deleted its own account.
   * @returns {boolean}
   */
  canDeleteUser() {
    return this.props.context.loggedInUser.id !== this.user.id;
  }

  /**
   * Check if the public key of the user could be copied.
   * It's not the case if users are inactive as they don't have public key at this stage.
   * @return {boolean}
   */
  canCopyPublicKey() {
    return this.user.active;
  }

  /**
   * Has a pending account recovery for the user.
   * @returns {boolean}
   */
  hasPendingAccountRecoveryRequest() {
    return this.user && Boolean(this.user.pending_account_recovery_request);
  }

  /**
   * Can update the resource
   * @returns {boolean}
   */
  isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Disable the selected user's MFA
   */
  disableMFA() {
    this.props.dialogContext.open(ConfirmDisableUserMFA);
    this.props.hide();
  }

  /**
   * Resend an invite to the given user
   */
  resendInvite() {
    this.props.context.port.request("passbolt.users.resend-invite", this.user.username)
      .then(this.onResendInviteSuccess.bind(this))
      .catch(this.onResendInviteFailure.bind(this));
  }

  /**
   * Whenever the resend invite succeeds
   */
  onResendInviteSuccess() {
    this.props.actionFeedbackContext.displaySuccess(this.translate("The invite has been resent successfully"));
    this.props.hide();
  }

  /**
   * Whenever the resend invite fails
   * @param error An error
   */
  onResendInviteFailure(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.hide();
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
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuWrapper
        hide={this.props.hide}
        left={this.props.left}
        top={this.props.top}>
        <li
          key="copy-user-permalink"
          className="opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handlePermalinkCopy}>
                  <span><Trans>Copy permalink</Trans></span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li
          key="copy-public-key"
          className="opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a
                  onClick={this.handlePublicKeyCopy}
                  className={this.canCopyPublicKey() ? '' : 'disabled'}>
                  <span><Trans>Copy public key</Trans></span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li
          key="copy-username"
          className="separator-after opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handleUsernameCopy}>
                  <span><Trans>Copy email address</Trans></span>
                </a>
              </div>
            </div>
          </div>
        </li>
        {this.canIUseEdit() &&
        <li key="edit-user" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="edit" onClick={this.handleEditClickEvent}><span><Trans>Edit</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        }
        {this.canIUseResend &&
        <li key="resend-invite-user" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="resend"
                  onClick={this.handleResendInviteClickEvent}
                  className={`${this.canResendInviteToUser ? "" : "disabled"}`}><span><Trans>Resend invite</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        }
        {this.canIUseMfa &&
        <li key="disable-user-mfa" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a
                  id="disable-mfa"
                  onClick={this.handleDisableMfaEvent}
                  className={this.canDisableMfaForUser ? '' : 'disabled'}>
                  <span><Trans>Disable MFA</Trans></span>
                </a>
              </div>
            </div>
          </div>
        </li>
        }
        {this.canIUseDelete() &&
        <li key="delete-user" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="delete" onClick={this.handleDeleteClickEvent} className={`${!this.canDeleteUser() ? "disabled" : ""}`}><span><Trans>Delete</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        }
        {this.canIReviewAccountRecoveryRequest() &&
        <li key="review-recovery-user" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="review-recovery" onClick={this.handleReviewRecoveryRequestClickEvent} className={`${!this.hasPendingAccountRecoveryRequest() ? "disabled" : ""}`}><span><Trans>Review recovery request</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        }
      </ContextualMenuWrapper>
    );
  }
}

DisplayUsersContextualMenu.propTypes = {
  context: PropTypes.any, // The application context
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  workflowContext: PropTypes.any, // the workflow context
  dialogContext: PropTypes.any, // the dialog context
  user: PropTypes.object, // user selected
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withWorkflow(withDialog(withActionFeedback(withTranslation('common')(DisplayUsersContextualMenu)))));

