/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";

class ConfirmDisableUserMFA extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props, context) {
    super(props, context);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      actions: {
        processing: false // Action flag of processing
      }
    };
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Returns the current selected user
   */
  get user() {
    return this.props.userWorkspaceContext.selectedUsers[0];
  }

  /**
   * Returns true if the confirm action is processing
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns truc if the actions must be disabled
   */
  get areActionsDisabled() {
    return this.isProcessing;
  }

  /**
   * Handle the will to confirm
   */
  handleConfirm(event) {
    event.preventDefault();
    this.disableMFA();
  }

  /**
   * Handle the will to close
   */
  handleClose() {
    this.close();
  }

  /**
   * Disable the selected user's MFA
   */
  async disableMFA() {
    await this.setState({actions: {processing: true}});
    await this.context.port.request("passbolt.mfa.disable-for-user", this.user.id)
      .then(this.onDisableMFASuccess.bind(this))
      .catch(this.onDisableMFAFailure.bind(this));
  }

  /**
   * Whenever the user MFA has been disabled successfully
   */
  async onDisableMFASuccess() {
    await this.setState({actions: {processing: false}});
    this.props.actionFeedbackContext.displaySuccess("Multi-factor authentication has been disabled successfully");
    this.props.onClose();
  }

  /**
   * Whenever the user MFA has been disabled with failure
   */
  async onDisableMFAFailure(error) {
    await this.setState({actions: {processing: false}});
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Close the current dialog
   */
  close() {
    this.props.onClose();
  }

  /**
   * Render the component
   */
  render() {
    const name = `${this.user.profile.first_name} ${this.user.profile.last_name}`;
    const username = this.user.username;
    return (
      <DialogWrapper
        title="Are you sure?"
        onClose={this.handleClose}
        disabled={this.areActionsDisabled}>
        <form
          onSubmit={this.handleConfirm}
          noValidate>

          <div className="form-content">
            <p>You are about to disable second-factor authentication (MFA) for the user <strong>{name} ({username})</strong>.</p>
            <p>Warning: Existing settings will be lost. This action cannot be undone.</p>
          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value="Disable MFA"
              warning={true}
              processing={this.isProcessing}
              disabled={this.areActionsDisabled}/>
            <FormCancelButton
              disabled={this.areActionsDisabled}
              onClick={this.handleClose}/>
          </div>

        </form>

      </DialogWrapper>
    );
  }
}

ConfirmDisableUserMFA.contextType = AppContext;

ConfirmDisableUserMFA.propTypes = {
  actionFeedbackContext: PropTypes.any, // The action feedback context
  onClose: PropTypes.func,
  dialogContext: PropTypes.any, // The dialog context
  userWorkspaceContext: PropTypes.any, // The user workspace context
};

export default withUserWorkspace(withActionFeedback(withDialog(ConfirmDisableUserMFA)));
