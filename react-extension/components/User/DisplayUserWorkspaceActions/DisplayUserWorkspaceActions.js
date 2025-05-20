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
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DropdownMenuItem from "../../Common/Dropdown/DropdownMenuItem";
import LinkSVG from "../../../../img/svg/link.svg";
import SendSVG from "../../../../img/svg/send.svg";
import FingerprintDisabledSVG from "../../../../img/svg/fingerprint_disabled.svg";
import BuoySVG from "../../../../img/svg/buoy.svg";
import CloseSVG from "../../../../img/svg/close.svg";
import CopySVG from "../../../../img/svg/copy.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import EmailSVG from "../../../../img/svg/email.svg";
import KeySVG from "../../../../img/svg/key.svg";
import DeleteSVG from "../../../../img/svg/delete.svg";
import EditSVG from "../../../../img/svg/edit.svg";
import MetadataKeySVG from "../../../../img/svg/metadata_key.svg";
import ConfirmShareMissingMetadataKeys from "../ConfirmShareMissingMetadataKeys/ConfirmShareMissingMetadataKeys";

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
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleDisableMfaEvent = this.handleDisableMfaEvent.bind(this);
    this.handleCopyPermalinkEvent = this.handleCopyPermalinkEvent.bind(this);
    this.handleCopyEmailClickEvent = this.handleCopyEmailClickEvent.bind(this);
    this.handleCopyPublicKeyEvent = this.handleCopyPublicKeyEvent.bind(this);
    this.handleResendInviteClickEvent = this.handleResendInviteClickEvent.bind(this);
    this.handleReviewRecoveryRequestEvent = this.handleReviewRecoveryRequestEvent.bind(this);
    this.handleClearSelectionClick = this.handleClearSelectionClick.bind(this);
    this.handleShareMissingMetadataKeysEvent = this.handleShareMissingMetadataKeysEvent.bind(this);
  }

  /**
   * Returns true if the current user can delete the current selected user
   */
  get canDelete() {
    return  this.selectedUser && this.props.context.loggedInUser.id !== this.selectedUser.id;
  }

  /**
   * Handle the will of copying the user permalink
   */
  handleCopyPermalinkEvent() {
    this.copyPermalink();
  }

  /**
   * Handle the will of copying the user email address
   */
  async handleCopyEmailClickEvent() {
    await ClipBoard.copy(this.selectedUser.username, this.props.context.port);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The email address has been copied to clipboard"));
  }

  /**
   * Handle the will of copying the user public key
   */
  async handleCopyPublicKeyEvent() {
    const gpgKeyInfo = await this.props.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.selectedUser.id);
    await ClipBoard.copy(gpgKeyInfo?.armored_key, this.props.context.port);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The public key has been copied to clipboard"));
  }

  /**
   * Handle the will of
   */
  handleResendInviteClickEvent() {
    this.resendInvite();
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
   * Handle share missing metadata keys click event
   */
  handleShareMissingMetadataKeysEvent() {
    const shareMissingMetadataKeysDialogProps = {
      user: this.selectedUser,
    };
    this.props.context.setContext({shareMissingMetadataKeysDialogProps});
    this.props.dialogContext.open(ConfirmShareMissingMetadataKeys);
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
   * Can the logged in user use the mfa capability.
   */
  get canIUseMfa() {
    return this.hasOneUserSelected()
      && this.props.context.siteSettings.canIUse("multiFactorAuthentication")
      && this.selectedUser.is_mfa_enabled;
  }

  /**
   * Returns true if the logged in user can use the resend capability.
   */
  get canIUseResend() {
    return !this.isActiveUser;
  }

  /**
   * Returns true if the selected user is active
   */
  get isActiveUser() {
    return this.selectedUser?.active;
  }

  /**
   * Check if the user can use the review recovery request capability.
   */
  get canIReviewAccountRecoveryRequest() {
    return this.hasOneUserSelected()
      && this.props.context.siteSettings.canIUse("accountRecovery")
      && Boolean(this.selectedUser.pending_account_recovery_request);
  }

  /**
   * Check if the user can use the share missing data key capability.
   */
  get canIShareMissingMetadataKeys() {
    return this.hasOneUserSelected()
      && this.props.context.siteSettings.canIUse("metadata")
      && this.selectedUser.missing_metadata_keys_ids?.length > 0;
  }

  /**
   * Check if the users workspace has one user selected.
   * @return {boolean}
   */
  hasOneUserSelected() {
    return this.props.userWorkspaceContext.selectedUsers.length === 1;
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
   * Handle the event on the 'close' icon to clear the current selection.
   * @returns {Promise<void>}
   */
  async handleClearSelectionClick() {
    await this.props.userWorkspaceContext.onUserSelected.none();
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
    const count = this.props.userWorkspaceContext.selectedUsers?.length;

    return (
      <div className="actions" ref={this.props.actionsButtonRef}>
        <div className="actions-wrapper">
          <ul>
            {this.hasOneUserSelected() &&
              <li id="copy-action">
                <Dropdown>
                  <DropdownButton className="button-action-contextual">
                    <CopySVG/>
                    <span><Trans>Copy</Trans></span>
                    <CaretDownSVG/>
                  </DropdownButton>
                  <DropdownMenu className="menu-action-contextual">
                    <DropdownMenuItem>
                      <button id="copy-user-email" type="button" className="no-border" onClick={this.handleCopyEmailClickEvent}>
                        <EmailSVG/>
                        <span><Trans>Copy email address</Trans></span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button id="copy-user-permalink" type="button" className="no-border" onClick={this.handleCopyPermalinkEvent}>
                        <LinkSVG/>
                        <span><Trans>Copy permalink</Trans></span>
                      </button>
                    </DropdownMenuItem>
                    {this.isActiveUser &&
                      <DropdownMenuItem>
                        <button id="copy-user-public-key" type="button" className="no-border" onClick={this.handleCopyPublicKeyEvent}>
                          <KeySVG/>
                          <span><Trans>Copy public key</Trans></span>
                        </button>
                      </DropdownMenuItem>
                    }
                  </DropdownMenu>
                </Dropdown>
              </li>
            }
            {this.isLoggedInUserAdmin() &&
              <>
                {this.hasOneUserSelected() &&
                  <li>
                    <button id="edit-user" type="button" className="button-action-contextual" onClick={this.handleEditClickEvent}>
                      <EditSVG/>
                      <span><Trans>Edit</Trans></span>
                    </button>
                  </li>
                }
                {this.canDelete &&
                  <li>
                    <button id="delete-user" type="button" className="button-action-contextual" onClick={this.handleDeleteClickEvent}>
                      <DeleteSVG/>
                      <span><Trans>Delete</Trans></span>
                    </button>
                  </li>
                }
                {this.canIUseResend &&
                  <li>
                    <button id="resend-invite-user" className="button-action-contextual" type="button" onClick={this.handleResendInviteClickEvent}>
                      <SendSVG/>
                      <span><Trans>Resend invite</Trans></span>
                    </button>
                  </li>
                }
                {this.canIUseMfa &&
                  <li>
                    <button id="disable-mfa-action" className="button-action-contextual" type="button" onClick={this.handleDisableMfaEvent}>
                      <FingerprintDisabledSVG/>
                      <span><Trans>Disable MFA</Trans></span>
                    </button>
                  </li>
                }
                {this.canIReviewAccountRecoveryRequest &&
                  <li>
                    <button id="review-recovery" className="button-action-contextual" type="button" onClick={this.handleReviewRecoveryRequestEvent}>
                      <BuoySVG/>
                      <span><Trans>Review recovery request</Trans></span>
                    </button>
                  </li>
                }
                {this.canIShareMissingMetadataKeys &&
                  <li>
                    <button id="share-metadata-keys" className="button-action-contextual" type="button" onClick={this.handleShareMissingMetadataKeysEvent}>
                      <MetadataKeySVG/>
                      <span><Trans>Share metadata keys</Trans></span>
                    </button>
                  </li>
                }
              </>
            }
          </ul>
          <span className="counter"><Trans count={count}>{{count}} selected</Trans></span>
          <button type="button" className="button-transparent inline" onClick={this.handleClearSelectionClick}>
            <CloseSVG/>
          </button>
        </div>
      </div>
    );
  }
}

DisplayUserWorkspaceActions.propTypes = {
  actionsButtonRef: PropTypes.object, // The forwarded ref of the buttons container
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.any, // the user workspace context
  workflowContext: PropTypes.any, // the workflow context
  dialogContext: PropTypes.any, // the dialog context
  actionFeedbackContext: PropTypes.object, // the action feeedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withWorkflow(withDialog(withUserWorkspace(withTranslation('common')(DisplayUserWorkspaceActions))))));
