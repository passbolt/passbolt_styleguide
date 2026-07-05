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

import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";

/**
 * Lets the user set an optional PIN for passkeys. When set, the PIN is asked during passkey
 * create/sign-in ceremonies (like a Windows Hello PIN). Leaving it unset means no PIN is asked.
 */
class DisplayPasskeyPinUserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get defaultState() {
    return {
      loading: true,
      pinSet: false,
      pin: "",
      confirmPin: "",
      processing: false,
      error: null,
      success: null,
    };
  }

  async componentDidMount() {
    try {
      const pinSet = await this.props.context.port.request("passbolt.fido2-pin.is-set");
      this.setState({ loading: false, pinSet: Boolean(pinSet) });
    } catch {
      this.setState({ loading: false });
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value, error: null, success: null });
  }

  async handleSave() {
    if (this.state.processing) {
      return;
    }
    if (!/^\d{4,12}$/.test(this.state.pin)) {
      this.setState({ error: this.props.t("The PIN must be 4 to 12 digits.") });
      return;
    }
    if (this.state.pin !== this.state.confirmPin) {
      this.setState({ error: this.props.t("The two PINs do not match.") });
      return;
    }
    this.setState({ processing: true, error: null, success: null });
    try {
      await this.props.context.port.request("passbolt.fido2-pin.set", this.state.pin);
      this.setState({
        processing: false,
        pinSet: true,
        pin: "",
        confirmPin: "",
        success: this.props.t("The passkey PIN has been saved."),
      });
    } catch (error) {
      this.setState({ processing: false, error: error?.message || this.props.t("The PIN could not be saved.") });
    }
  }

  async handleRemove() {
    if (this.state.processing) {
      return;
    }
    this.setState({ processing: true, error: null, success: null });
    try {
      await this.props.context.port.request("passbolt.fido2-pin.clear");
      this.setState({
        processing: false,
        pinSet: false,
        pin: "",
        confirmPin: "",
        success: this.props.t("The passkey PIN has been removed."),
      });
    } catch (error) {
      this.setState({ processing: false, error: error?.message || this.props.t("The PIN could not be removed.") });
    }
  }

  render() {
    return (
      <>
        <div className="main-column passkey-pin-settings">
          <div className="main-content">
            <h3>
              <Trans>Passkey PIN</Trans>
            </h3>
            <p className="description">
              <Trans>
                Set a PIN to use your passkeys with a short code instead of your passphrase — like a Windows Hello PIN.
              </Trans>{" "}
              <Trans>Without a PIN, your master passphrase is asked to use a passkey.</Trans>
            </p>

            <div className="message notice">
              <p className="text">
                <strong>
                  {this.state.pinSet ? (
                    <Trans>A passkey PIN is currently set.</Trans>
                  ) : (
                    <Trans>No passkey PIN is set — your master passphrase is used.</Trans>
                  )}
                </strong>
              </p>
            </div>

            <div className="input text required">
              <label htmlFor="passkey-pin">
                <Trans>New PIN (4-12 digits)</Trans>
              </label>
              <input
                id="passkey-pin"
                name="pin"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={this.state.pin}
                onChange={this.handleInputChange}
                disabled={this.state.loading || this.state.processing}
              />
            </div>
            <div className="input text required">
              <label htmlFor="passkey-pin-confirm">
                <Trans>Confirm PIN</Trans>
              </label>
              <input
                id="passkey-pin-confirm"
                name="confirmPin"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={this.state.confirmPin}
                onChange={this.handleInputChange}
                disabled={this.state.loading || this.state.processing}
              />
            </div>
            {this.state.error && <p className="error-message">{this.state.error}</p>}
            {this.state.success && <p className="success-message">{this.state.success}</p>}
          </div>
        </div>
        <div className="actions-wrapper">
          <button
            type="button"
            className={`button primary ${this.state.processing ? "processing" : ""}`}
            onClick={this.handleSave}
            disabled={this.state.loading || this.state.processing}
          >
            <Trans>Save PIN</Trans>
          </button>
          {this.state.pinSet && (
            <button
              type="button"
              className="button"
              onClick={this.handleRemove}
              disabled={this.state.loading || this.state.processing}
            >
              <Trans>Remove PIN</Trans>
            </button>
          )}
        </div>
      </>
    );
  }
}

DisplayPasskeyPinUserSettings.propTypes = {
  context: PropTypes.object, // The app context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(DisplayPasskeyPinUserSettings));
