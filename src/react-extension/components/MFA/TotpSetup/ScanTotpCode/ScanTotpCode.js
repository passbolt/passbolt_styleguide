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

import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import * as OTPAuth from "otpauth";
import {Trans} from 'react-i18next';
import QRCode from 'qrcode';
import {TotpCodeGeneratorService} from "../../../../../shared/services/otp/TotpCodeGeneratorService";
import {withAppContext} from "../../../../../shared/context/AppContext/AppContext";
import {MfaSettingsWorkflowStates, withMfa} from "../../../../contexts/MFAContext";
import Icon from "../../../../../shared/components/Icons/Icon";

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
        invalidCode: false
      }
    };
  }

  async componentDidMount() {
    await this.getQrCode();
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

    issuer = issuer.replace(':', '');
    issuer = issuer.replace(/\/$/, '');

    return issuer;
  }

  /**
   * Generate the totp code for QR code
   * @returns the totp code
   */
  generateTotpUri() {
    const username = this.props.context.userSettings.username;
    const arr = new Uint32Array(32);
    const secretBuffer = window.crypto.getRandomValues(arr);
    const secret = new OTPAuth.Secret({buffer: secretBuffer, size: 32});
    const issuer = this.getIssuer();

    const uri = TotpCodeGeneratorService.generateUri({
      label: username,
      secret_key: secret.base32,
      issuer
    });
    this.setState({uri});
    // Convert to Google Authenticator key URI
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
    this.setState({toptCode});
  }

  /**
   * handle the valdation click
   * @param event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.setState({isSubmitted: true});
      if (this.state.toptCode === "") {
        this.setError("isRequired", true);
      } else {
        await this.props.mfaContext.validateTotpCode(this.state.uri, this.state.toptCode);
        this.props.mfaContext.navigate(MfaSettingsWorkflowStates.VIEWCONFIGURATION);
        await this.props.mfaContext.findMfaSettings();
      }
    } catch (error) {
      this.setError("invalidCode", true);
    }
  }

  /**
   * set an error to object
   */
  setError(key, value) {
    const error = Object.assign({}, this.state.error, {[key]: value});
    this.setState({error});
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
    const totpUri = this.generateTotpUri();
    const qrCode = await QRCode.toDataURL([{
      data: totpUri,
      mode: 'byte'
    }], {
      type: 'image/jpeg',
      quality: 1,
    });
    this.setState({qrCode});
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
      <div className="grid grid-responsive-12">
        <div className="row mfa-setup totp-scan-code">
          <div className="col8 main-column totp-setup">
            <h3><Trans>Time based One Time Password (TOTP)</Trans></h3>
            <h4 className="no-border"><Trans>Scan this bar code</Trans></h4>
            <div className="qrcode">
              <img id="qr-canvas" src={this.state.qrCode} />
            </div>
            <div className="input-verify">
              <form onSubmit={this.handleSubmit}>
                <div className="input text required">
                  <label htmlFor="totp"><Trans>One Time Password (OTP)</Trans></label>
                  <input type="text" name="totp" placeholder="123456" autoComplete="off" onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()} />
                  {(this.state.error.isRequired && this.state.isSubmitted) &&
                <div className="code-required error-message"><Trans>A OTP code is required.</Trans></div>
                  }
                  {(this.state.error.invalidCode && this.state.isSubmitted) &&
                <div className="invalid-code error-message"><Trans>This OTP is not valid.</Trans></div>
                  }
                </div>
                <div className="helptext">
                  <Trans>Enter the six digit number as presented on your phone or tablet.</Trans>
                </div>
              </form>
            </div>
            <div className="actions-wrapper">
              <button
                className="button cancel"
                type='button'
                disabled={this.hasAllInputDisabled()}
                onClick={this.handleCancelClick}>
                <span><Trans>Cancel</Trans></span>
              </button>
              <button
                className="button primary"
                type='button'
                disabled={this.hasAllInputDisabled()}
                onClick={this.handleSubmit}>
                <span><Trans>Validate</Trans></span>
              </button>
            </div>
          </div>
          <div className="col4 last">
            <div className="sidebar-help">
              <h3><Trans>Requirements</Trans></h3>
              <p><Trans>To proceed you need to install an application that supports Time Based One Time Passwords (TOTP) on your phone or tablet such as:</Trans><a href="https://support.google.com/accounts/answer/1066447" target="_blank" rel="noopener noreferrer">Google Authenticator</a> <Trans>or</Trans> <a href="https://freeotp.github.io/" target="_blank" rel="noopener noreferrer">FreeOTP</a>.</p>
              <a className="button" href="https://help.passbolt.com/start" target="_blank" rel="noopener noreferrer">
                <Icon name="document" />
                <span><Trans>Read the documentation</Trans></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ScanTotpCode.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa context
};

export default withAppContext(withMfa(withTranslation("common")(ScanTotpCode)));
