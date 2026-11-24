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
 * @since         5.18.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../contexts/DialogContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import PasskeyVerificationOptions from "../../../../shared/components/PasskeyVerificationOptions/PasskeyVerificationOptions";
import PasskeyVerificationPreferenceEntity from "../../../../shared/models/entity/passkey/passkeyVerificationPreferenceEntity";
import PasskeyVerificationPreferenceServiceWorkerService from "../../../../shared/services/serviceWorker/passkey/passkeyVerificationPreferenceServiceWorkerService";
import { PASSKEY_VERIFICATION_STRICT } from "../../../../shared/constants/passkey.const";

/**
 * Lets the user change how passbolt verifies passkey requests requiring user verification.
 */
class DisplayUserPasskeySettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: PASSKEY_VERIFICATION_STRICT, // The selected preference, strict until the user chose
      loading: true, // True while the saved preference loads
      processing: false, // True while saving
    };
    this.passkeyVerificationPreferenceServiceWorkerService = new PasskeyVerificationPreferenceServiceWorkerService(
      props.context.port,
    );
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    try {
      const preference = await this.passkeyVerificationPreferenceServiceWorkerService.get();
      this.setState({ value: preference?.value ?? PASSKEY_VERIFICATION_STRICT });
    } catch (error) {
      this.props.dialogContext.open(NotifyError, { error });
    } finally {
      this.setState({ loading: false });
    }
  }

  /**
   * Whether the preference cannot be changed or saved (loading or saving).
   * @returns {boolean}
   */
  get isDisabled() {
    return this.state.loading || this.state.processing;
  }

  /**
   * Handle a preference change.
   * @param {string} value The selected preference.
   */
  handleChange(value) {
    this.setState({ value });
  }

  /**
   * Save the selected preference.
   * @param {ReactEvent} event The submit event.
   * @returns {Promise<void>}
   */
  async handleSubmit(event) {
    event.preventDefault();
    if (this.isDisabled) {
      return;
    }
    this.setState({ processing: true });
    try {
      const preference = new PasskeyVerificationPreferenceEntity({ value: this.state.value });
      await this.passkeyVerificationPreferenceServiceWorkerService.update(preference);
      await this.props.actionFeedbackContext.displaySuccess(
        this.props.t("The passkey setting has been updated successfully"),
      );
    } catch (error) {
      this.props.dialogContext.open(NotifyError, { error });
    } finally {
      this.setState({ processing: false });
    }
  }

  render() {
    return (
      <>
        <div className="main-column profile-passkey-settings">
          <div className="main-content">
            <form onSubmit={this.handleSubmit}>
              <h3>
                <Trans>Passkeys</Trans>
              </h3>
              <p>
                <Trans>Choose how Passbolt handles passkey requests from sites that require user verification.</Trans>
              </p>
              <PasskeyVerificationOptions
                value={this.state.value}
                onChange={this.handleChange}
                disabled={this.isDisabled}
              />
            </form>
          </div>
        </div>
        <div className="actions-wrapper">
          <button
            className={`button primary form ${this.state.processing ? "processing" : ""}`}
            type="submit"
            disabled={this.isDisabled}
            onClick={this.handleSubmit}
          >
            <Trans>Save</Trans>
          </button>
        </div>
      </>
    );
  }
}

DisplayUserPasskeySettings.propTypes = {
  context: PropTypes.object, // The application context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.object, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withActionFeedback(withTranslation("common")(DisplayUserPasskeySettings))));
