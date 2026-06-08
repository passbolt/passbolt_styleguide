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
 * @since         5.13.0
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import { withDialog } from "../../../contexts/DialogContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";

class ConfirmDowngradeSubscriptionDialog extends Component {
  constructor(props) {
    super(props);

    this.state = this.defaultState;

    this.bindCallbacks();
  }

  /**
   * Returns the component default state
   * @return {object}
   */
  get defaultState() {
    return {
      processing: false,
      confirmed: false,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  handleConfirmChange(event) {
    this.setState({ confirmed: event.target.checked });
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing) {
      return;
    }

    this.setState({ processing: true });

    try {
      await this.props.onSubmit();
    } catch (error) {
      console.error(error);
    }

    this.setState({ processing: false });
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <DialogWrapper
        title={this.translate("Are you sure you want to downgrade?")}
        onClose={this.props.onClose}
        disabled={this.state.processing}
        className="confirm-downgrade-subscription-dialog"
      >
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              <Trans>You are about to downgrade your subscription from Passbolt Pro to Community Edition.</Trans>
            </p>
            <p>
              <Trans>
                All settings and data specific to the Pro edition will be permanently lost, including Single Sign-On
                (SSO) configuration, directory synchronization (AD/SCIM), advanced role-based policies, audit logs and
                account recovery settings.
              </Trans>
            </p>
            <p>
              <Trans>
                All ongoing processes such as an import will be stopped and the data could be lost. Please make sure
                your users are not actively using the platform during the process. This process should take a few
                seconds.
              </Trans>
            </p>
            <p>
              <Trans>You and your team will be disconnected at the end of the process.</Trans>
            </p>
            <p>
              <Trans>Your team will also lose access to premium technical support. This action cannot be undone.</Trans>
            </p>
            <div className="input checkbox">
              <input
                id="confirm-downgrade"
                type="checkbox"
                name="confirmed"
                checked={this.state.confirmed}
                disabled={this.state.processing}
                onChange={this.handleConfirmChange}
              />
              <label htmlFor="confirm-downgrade">
                <Trans>I confirm I want to downgrade and accept the data loss.</Trans>
              </label>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.state.processing} onClick={this.props.onClose} />
            <FormSubmitButton
              warning
              disabled={this.state.processing || !this.state.confirmed}
              processing={this.state.processing}
              value={this.translate("Downgrade and lose data")}
            />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmDowngradeSubscriptionDialog.propTypes = {
  context: PropTypes.any,
  dialogContext: PropTypes.any,
  actionFeedbackContext: PropTypes.any,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  t: PropTypes.func,
};

export default withAppContext(
  withDialog(withActionFeedback(withTranslation("common")(ConfirmDowngradeSubscriptionDialog))),
);
