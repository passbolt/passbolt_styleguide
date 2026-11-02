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
 * @since         5.17.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { withMfa } from "../../../contexts/MFAContext";
import { withDialog } from "../../../contexts/DialogContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";

/**
 * This component asks the user to confirm the deletion of a passkey.
 */
class DeletePasskeyDialog extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      processing: false,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Handle form submit event.
   * @param {ReactEvent} event The react event
   * @returns {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (!this.state.processing) {
      await this.delete();
    }
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
  }

  /**
   * Delete the passkey.
   * @returns {Promise<void>}
   */
  async delete() {
    this.setState({ processing: true });
    try {
      await this.props.mfaContext.deletePasskey(this.props.passkey.id);
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The passkey has been deleted successfully."));
      this.props.onClose();
      this.props.onDeleted();
    } catch (error) {
      console.error(error);
      this.setState({ processing: false });
      this.props.dialogContext.open(NotifyError, { error });
    }
  }

  /**
   * The passkey name to display
   * @returns {string}
   */
  get passkeyName() {
    return this.props.passkey.name ?? this.props.t("Passkey");
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper
        title={this.props.t("Delete passkey")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="delete-passkey-dialog"
      >
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              <Trans>
                Are you sure you want to delete the passkey{" "}
                <strong className="dialog-variable">{{ name: this.passkeyName }}</strong>?
              </Trans>
            </p>
            <p>
              <Trans>Once the passkey is deleted, it will be removed permanently and will not be recoverable.</Trans>
            </p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.state.processing} onClick={this.handleCloseClick} />
            <FormSubmitButton
              disabled={this.state.processing}
              processing={this.state.processing}
              value={this.props.t("Delete passkey")}
              warning={true}
            />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DeletePasskeyDialog.propTypes = {
  passkey: PropTypes.object.isRequired, // The passkey to delete
  onDeleted: PropTypes.func.isRequired, // Called once the passkey is deleted
  onClose: PropTypes.func, // Called when the dialog is closed
  mfaContext: PropTypes.object, // The mfa context
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withMfa(withDialog(withActionFeedback(withTranslation("common")(DeletePasskeyDialog))));
