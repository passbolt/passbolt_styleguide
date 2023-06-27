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
 * @since         3.9.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../../../Common/Inputs/FormSubmitButton/FormCancelButton";
import FormSubmitButton from "../../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withAdminSelfRegistration} from "../../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";

class ConfirmDeletionSelfRegistrationSettings extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handle close button click.
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Go to the next process
   * @param {Event} event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.props.onSubmit();
    this.props.onClose();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isProcessing = this.props.adminSelfRegistrationContext.isProcessing();

    return (
      <DialogWrapper
        title={this.props.t("Disable self registration")}
        onClose={this.handleClose}
        disabled={isProcessing}
        className="delete-self-registration-settings-dialog">
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <p>
              <Trans>Are you sure to disable the self registration for the organization ?</Trans>
            </p>
            <p>
              <Trans>Users will not be able to self register anymore.</Trans> <Trans>Only administrators would be able to invite users to register. </Trans>
            </p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton
              onClick={this.handleClose}
              disabled={isProcessing}/>
            <FormSubmitButton
              value={this.props.t("Save")}
              disabled={isProcessing}
              processing={isProcessing}
              warning={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmDeletionSelfRegistrationSettings.propTypes = {
  adminSelfRegistrationContext: PropTypes.object, // The self registration workspace context
  onClose: PropTypes.func, // Callback when the dialog must be closed
  onSubmit: PropTypes.func, // The submit callback
  t: PropTypes.func, // The translation function
};
export default withAdminSelfRegistration(withTranslation('common')(ConfirmDeletionSelfRegistrationSettings));


