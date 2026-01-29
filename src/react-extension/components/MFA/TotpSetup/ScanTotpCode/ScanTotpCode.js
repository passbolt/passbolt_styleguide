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
 * @since         4.4.0
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import QRCode from "qrcode";
import { withAppContext } from "../../../../../shared/context/AppContext/AppContext";
import { MfaSettingsWorkflowStates, withMfa } from "../../../../contexts/MFAContext";

/**
 * This component will display scan for the totp setup
 */
class ScanTotpCode extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createInputRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      qrCode: null,
      toptCode: "",
      uri: "",
      isSubmitted: false,
      error: {
        isRequired: false,
        invalidCode: false,
      },
    };
  }

  async componentDidMount() {
    this.focusOnOtpInput();
    await this.getQrCode();
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.otpInputRef = React.createRef();
  }

  /**
   * Put the focus on the otp input
   */
  focusOnOtpInput() {
    this.otpInputRef.current.focus();
  }

  /**
   * Return Issuer
   * The domain name without http(s):// and trailing /
   * @returns {string} return the issuer
   */
  getIssuer() {
    const domain = this.props.context.userSettings.getTrustedDomain();
    const parsedUrl = new URL(domain);
    let issuer = parsedUrl.hostname + parsedUrl.pathname;

    issuer = issuer.replace(":", "");
    issuer = issuer.replace(/\/$/, "");

    return issuer;
  }

  /**
   * Get totp uri from bext
   * @returns the totp code
   */
  async getQrCodeUri() {
    const uri = await this.props.context.port.request("passbolt.mfa-setup.get-totp-code");
    this.setState({ uri });
    return uri;
  }

  /**
   * Handle change of generic form input.
   * @param {object} event
   */
  handleInputChange(event) {
    const target = event.target;
    const toptCode = target.value;
    if (this.state.toptCode !== "") {
      this.setError("isRequired", false);
    }
    this.setState({ toptCode });
  }

  /**
   * handle the valdation click
   * @param event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.setState({ isSubmitted: true });
      if (this.state.toptCode === "") {
        this.setError("isRequired", true);
      } else {
        await this.props.mfaContext.validateTotpCode(this.state.uri, this.state.toptCode);
        this.props.mfaContext.navigate(MfaSettingsWorkflowStates.VIEWCONFIGURATION);
        await this.props.mfaContext.findMfaSettings();
      }
    } catch (error) {
      console.error(`Invalid TOTP code:`, error);
      this.setError("invalidCode", true);
    }
  }

  /**
   * set an error to object
   */
  setError(key, value) {
    const error = Object.assign({}, this.state.error, { [key]: value });
    this.setState({ error });
  }

  /**
   * handle the cancelation when setup the provider
   */
  handleCancelClick() {
    this.props.mfaContext.goToProviderList();
  }

  /**
   * Populates the component with data
   * @param {Uint8ClampedArray} content
   * @returns {Promise<void>}
   */
  async getQrCode() {
    const totpUri = await this.getQrCodeUri();
    const qrCode = await QRCode.toDataURL(
      [
        {
          data: totpUri,
          mode: "byte",
        },
      ],
      {
        type: "image/jpeg",
        quality: 1,
      },
    );
    this.setState({ qrCode });
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.mfaContext.isProcessing();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="main-column mfa-setup totp-scan-code">
          <div className="main-content totp-setup">
            <h3>
              <Trans>Time based One Time Password (TOTP)</Trans>
            </h3>
            <h4 className="no-border">
              <Trans>Scan this bar code</Trans>
            </h4>
            <div className="totp-setup-form">
              <div className="qrcode">
                <img id="qr-canvas" src={this.state.qrCode} />
              </div>
              <div className="input-verify">
                <form onSubmit={this.handleSubmit}>
                  <div className="input text required">
                    <label htmlFor="totp">
                      <Trans>One Time Password (OTP)</Trans>
                    </label>
                    <input
                      type="text"
                      name="totp"
                      placeholder="123456"
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      disabled={this.hasAllInputDisabled()}
                      ref={this.otpInputRef}
                    />
                    {this.state.error.isRequired && this.state.isSubmitted && (
                      <div className="code-required error-message">
                        <Trans>A OTP code is required.</Trans>
                      </div>
                    )}
                    {this.state.error.invalidCode && this.state.isSubmitted && (
                      <div className="invalid-code error-message">
                        <Trans>This OTP is not valid.</Trans>
                      </div>
                    )}
                  </div>
                  <div className="helptext">
                    <Trans>Enter the six digit number as presented on your phone or tablet.</Trans>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <button
            className="button cancel secondary"
            type="button"
            disabled={this.hasAllInputDisabled()}
            onClick={this.handleCancelClick}
          >
            <span>
              <Trans>Cancel</Trans>
            </span>
          </button>
          <button
            className="button primary form"
            type="button"
            disabled={this.hasAllInputDisabled()}
            onClick={this.handleSubmit}
          >
            <span>
              <Trans>Validate</Trans>
            </span>
          </button>
        </div>
      </>
    );
  }
}

ScanTotpCode.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa Context
  port: PropTypes.object,
};

export default withAppContext(withMfa(withTranslation("common")(ScanTotpCode)));
