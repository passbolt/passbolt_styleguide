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
import { ApiMfaVerifyContextState, withApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";
import SelectAnotherMfaProvider from "../SelectAnotherMfaProvider/SelectAnotherMfaProvider";
import PasskeySVG from "../../../../img/svg/passkey.svg";
import SpinnerSVG from "../../../../img/svg/spinner.svg";

/**
 * The passkey MFA verification screen.
 */
class VerifyWithPasskey extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = {
      remember: false, // Whether to remember the device for a month
    };
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleToggleRemember = this.handleToggleRemember.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Returns true while the browser prompt is pending
   * @returns {boolean}
   */
  get isProcessing() {
    return this.props.apiMfaVerifyContext.state === ApiMfaVerifyContextState.CEREMONY_STATE;
  }

  /**
   * Handle the remember checkbox change
   */
  handleToggleRemember() {
    this.setState({ remember: !this.state.remember });
  }

  /**
   * Handle the form submission
   * @param {Event} event The submit event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.apiMfaVerifyContext.onVerifyRequested(this.state.remember);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const processingClassName = this.isProcessing ? "processing" : "";
    return (
      <form onSubmit={this.handleSubmit}>
        <PasskeySVG className="centered-login-provider-icon" />
        <h1 className="centered-text login-title">
          <Trans>Additional Authentication with Passkey</Trans>
        </h1>
        {this.props.apiMfaVerifyContext.isRememberMeForAMonthEnabled && (
          <div className="input checkbox">
            <input
              id="remember"
              type="checkbox"
              name="remember"
              checked={this.state.remember}
              onChange={this.handleToggleRemember}
              disabled={this.isProcessing}
            />
            <label htmlFor="remember">
              <Trans>Remember this device for a month.</Trans>
            </label>
          </div>
        )}
        <div className="form-actions">
          <button
            type="submit"
            className={`button primary big full-width ${processingClassName}`}
            disabled={this.isProcessing}
          >
            <Trans>Verify with Passkey</Trans>
            {this.isProcessing && <SpinnerSVG />}
          </button>
          <SelectAnotherMfaProvider />
        </div>
      </form>
    );
  }
}

VerifyWithPasskey.propTypes = {
  apiMfaVerifyContext: PropTypes.object, // The api MFA verify context
};

export default withApiMfaVerifyContext(withTranslation("common")(VerifyWithPasskey));
