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
import ApiAppContext from "../../../contexts/ApiAppContext";
import {withActionFeedback} from "../../../../react-extension/contexts/ActionFeedbackContext";
import XRegExp from "xregexp";
import {ApiClientOptions} from "../../../lib/apiClient/apiClientOptions";
import {ApiClient} from "../../../lib/apiClient/apiClient";
import Icon from "../../Common/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";

/**
 * This component allows to display the MFA for the administration
 */
class DisplayMfaAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props, context) {
    super(props);
    this.state = this.defaultState;
    this.apiClient = new ApiClient(new ApiClientOptions().setBaseUrl(context.trustedDomain).setResourceName("mfa/settings"));
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      loading: true, // component is loading or not
      processing: false, // component is processing or not

      // ONE TIME PASSWORD
      totpProviderToggle: true, // One Time Password toggle value

      // YUBIKEY
      yubikeyToggle: false, //  yubikey toggle value
      yubikeyClientIdentifier: "", // yubikey client identifier
      yubikeyClientIdentifierError: null, // yubikey client identifier error
      yubikeySecretKey: "", // yubikey secret key
      yubikeySecretKeyError: null, // yubikey secret key error

      // DUO
      duoToggle: false, //  duo toggle value
      duoHostname: "", // duo hostname
      duoHostnameError: null, // duo hostname error
      duoIntegrationKey: "", // duo integration key
      duoIntegrationKeyError: null, // duo integration key error
      duoSalt: "", // duo salt
      duoSaltError: null, // duo salt error
      duoSecretKey: "", // duo secret key
      duoSecretKeyError: null, // duo secret key error
    };
  }

  async componentDidMount() {
    this.findAllMfaSettings();
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleMustSave(prevProps.administrationWorkspaceContext.mustSaveSettings);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle the must save change
   * @param previousMustSaveSettings Previous must save settings
   */
  async handleMustSave(previousMustSaveSettings) {
    const hasMustSaveChanged = this.props.administrationWorkspaceContext.mustSaveSettings !== previousMustSaveSettings;
    if (hasMustSaveChanged && this.props.administrationWorkspaceContext.mustSaveSettings) {
      await this.handleFormSubmit();
      this.props.administrationWorkspaceContext.onResetActionsSettings();
    }
  }

  /**
   * fetch the mfa settings
   */
  async findAllMfaSettings() {
    const result = await this.apiClient.findAll();
    const body = result.body;
    const providers = body.providers;
    // OTP
    const totpProviderToggle = providers.includes("totp");
    // YUBIKEY
    const yubikeyToggle = providers.includes("yubikey");
    let yubikeyClientIdentifier = "";
    let yubikeySecretKey = "";

    if (yubikeyToggle) {
      yubikeyClientIdentifier = body.yubikey.clientId;
      yubikeySecretKey = body.yubikey.secretKey;
    }
    // DUO
    const duoToggle = providers.includes("duo");
    let duoHostname = "";
    let duoIntegrationKey = "";
    let duoSalt = "";
    let duoSecretKey = "";
    if (duoToggle) {
      duoHostname = body.duo.hostName;
      duoIntegrationKey = body.duo.integrationKey;
      duoSalt = body.duo.salt;
      duoSecretKey = body.duo.secretKey;
    }

    this.setState({
      loading: false,
      totpProviderToggle,
      yubikeyToggle,
      yubikeyClientIdentifier,
      yubikeySecretKey,
      duoToggle,
      duoHostname,
      duoIntegrationKey,
      duoSalt,
      duoSecretKey
    });
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
    this.handleEnabledSaveButton();
  }

  /**
   * Handle enabled the save button
   */
  handleEnabledSaveButton() {
    if (!this.props.administrationWorkspaceContext.isSaveEnabled) {
      this.props.administrationWorkspaceContext.onSaveEnabled();
    }
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * If otp provider is checked
   * @returns {boolean}
   */
  isOtpProviderChecked() {
    return this.state.totpProviderToggle;
  }

  /**
   * If yubikey provider is checked
   * @returns {boolean}
   */
  isYubikeyChecked() {
    return this.state.yubikeyToggle;
  }

  /**
   * If duo provider is checked
   * @returns {boolean}
   */
  isDuoChecked() {
    return this.state.duoToggle;
  }

  /**
   * Validate the form.
   * @returns {Promise<boolean>}
   */
  async validate() {
    // Validate the form inputs.
    await Promise.all([
      this.validateYubikeyInput(),
      this.validateDuoInput(),
    ]);
  }

  /**
   * Validate the yubikey input.
   * @returns {Promise<void>}
   */
  async validateYubikeyInput() {
    let yubikeyClientIdentifierError = null;
    let yubikeySecretKeyError = null;
    if (this.isYubikeyChecked()) {
      const yubikeyClientIdentifier = this.state.yubikeyClientIdentifier.trim();
      if (!yubikeyClientIdentifier.length) {
        yubikeyClientIdentifierError = "A client identifier is required.";
      } else if (!XRegExp("^[0-9]{1,64}$").test(yubikeyClientIdentifier)) {
        yubikeyClientIdentifierError = "The client identifier should be an integer.";
      }
      const yubikeySecretKey = this.state.yubikeySecretKey.trim();
      if (!yubikeySecretKey.length) {
        yubikeySecretKeyError = "A secret key is required.";
      } else if (!XRegExp("^[a-zA-Z0-9\\/=+]{10,128}$").test(yubikeySecretKey)) {
        yubikeySecretKeyError = "This secret key is not valid.";
      }
    }
    return this.setState({yubikeyClientIdentifierError, yubikeySecretKeyError});
  }

  /**
   * Validate the duo input.
   * @returns {Promise<void>}
   */
  async validateDuoInput() {
    let duoHostnameError = null;
    let duoIntegrationKeyError = null;
    let duoSaltError = null;
    let duoSecretKeyError = null;

    if (this.isDuoChecked()) {
      const duoHostname = this.state.duoHostname.trim();
      if (!duoHostname.length) {
        duoHostnameError = "A hostname is required.";
      } else if (!XRegExp("^api-[a-fA-F0-9]{8,16}\\.duosecurity\\.com$").test(duoHostname)) {
        duoHostnameError = "This is not a valid hostname.";
      }

      const duoIntegrationKey = this.state.duoIntegrationKey.trim();
      if (!duoIntegrationKey.length) {
        duoIntegrationKeyError = "An integration key is required.";
      } else if (!XRegExp("^[a-zA-Z0-9]{16,32}$").test(duoIntegrationKey)) {
        duoIntegrationKeyError = "This is not a valid integration key.";
      }

      const duoSalt = this.state.duoSalt.trim();
      if (!duoSalt.length) {
        duoSaltError = "A salt is required.";
      } else if (!XRegExp("^.{40,128}$").test(duoSalt)) {
        duoSaltError = "The salt should be between 40 and 128 characters in length.";
      }

      const duoSecretKey = this.state.duoSecretKey.trim();
      if (!duoSecretKey.length) {
        duoSecretKeyError = "A secret key is required.";
      } else if (!XRegExp("^[a-zA-Z0-9]{32,128}$").test(duoSecretKey)) {
        duoSecretKeyError = "This is not a valid secret key.";
      }
    }
    return this.setState({duoHostnameError, duoIntegrationKeyError, duoSaltError, duoSecretKeyError});
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.hasYubikeyError() || this.hasDuoError();
  }

  /**
   * If yubukey form has an error
   * @returns {boolean}
   */
  hasYubikeyError() {
    return this.state.yubikeyClientIdentifierError !== null || this.state.yubikeySecretKeyError !== null;
  }

  /**
   * If duo form has an error
   * @returns {boolean}
   */
  hasDuoError() {
    return this.state.duoHostnameError !== null || this.state.duoIntegrationKeyError !== null || this.state.duoSaltError !== null || this.state.duoSecretKeyError !== null;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit() {
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      await this.validate();
      if (this.hasValidationError()) {
        await this.toggleProcessing();
        return;
      }
      try {
        await this.saveMfa();
        await this.handleSaveSuccess();
      } catch (error) {
        await this.handleSaveError(error);
      }
    }
  }

  /**
   * save MFA settings
   * @returns {Promise<*>}
   */
  async saveMfa() {
    const providers = [];
    if (this.state.totpProviderToggle) {
      providers.push("totp");
    }

    let yubikey = null;
    if (this.state.yubikeyToggle) {
      providers.push("yubikey");
      yubikey = {
        clientId: this.state.yubikeyClientIdentifier,
        secretKey: this.state.yubikeySecretKey
      };
    }

    let duo = null;
    if (this.state.duoToggle) {
      providers.push("duo");
      duo = {
        hostName: this.state.duoHostname,
        integrationKey: this.state.duoIntegrationKey,
        salt: this.state.duoSalt,
        secretKey: this.state.duoSecretKey
      };
    }
    await this.apiClient.create({providers, yubikey, duo});
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess("The multi factor authentication settings for the organization were updated.");
    this.setState({processing: false});
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      await this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  async handleError(error) {
    await this.props.actionFeedbackContext.displayError(error.message);
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return this.setState({processing: !prev});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <div className="mfa-settings col8">
          <form className="form ready">
            <div className="provider-section totp">
              <h3>
                <span className="input toggle-switch form-element ready">
                  <input id="totp-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="totpProviderToggle"
                    onChange={this.handleInputChange} checked={this.state.totpProviderToggle} disabled={this.hasAllInputDisabled()}/>
                  <label className="toggle-switch-button" htmlFor="totp-provider-toggle-button"/>
                </span>
                <label>Time-based One Time Password</label>
              </h3>
              {!this.isOtpProviderChecked() &&
              <p className="description">
                The Time-based One Time Password provider is disabled for all users.
              </p>
              }
              {this.isOtpProviderChecked() &&
              <p className="description">
                The Time-based One Time Password provider is enabled for all users. They can setup this provider in
                their
                profile and use it as second factor authentication.
              </p>
              }
            </div>
            <div className="provider-section yubikey">
              <h3>
                <span className="input toggle-switch form-element">
                  <input id="yubikey-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="yubikeyToggle"
                    onChange={this.handleInputChange} checked={this.state.yubikeyToggle} disabled={this.hasAllInputDisabled()}/>
                  <label className="toggle-switch-button" htmlFor="yubikey-provider-toggle-button"/>
                </span>
                <label>Yubikey</label>
              </h3>
              {!this.isYubikeyChecked() &&
              <p className="description">
                The Yubikey provider is disabled for all users.
              </p>
              }
              {this.isYubikeyChecked() &&
              <div>
                <p className="description">
                  The Yubikey provider is enabled for all users. They can setup this provider in their profile and use
                  it as
                  second factor authentication.
                </p>
                <div className="form-content">
                  <div className="input text required">
                    <label>Client identifier</label>
                    <input id="yubikeyClientIdentifier" type="text" name="yubikeyClientIdentifier" required="required" className="required fluid form-element ready" placeholder="123456789"
                      onChange={this.handleInputChange} value={this.state.yubikeyClientIdentifier} disabled={this.hasAllInputDisabled()}/>
                    {this.state.yubikeyClientIdentifierError &&
                    <div className="yubikey_client_identifier message error">{this.state.yubikeyClientIdentifierError}</div>
                    }
                  </div>
                  <div className="input text required">
                    <label>Secret key</label>
                    <input id="yubikeySecretKey" name="yubikeySecretKey" required="required" className="required fluid form-element" placeholder="**********" type="password"
                      onChange={this.handleInputChange} value={this.state.yubikeySecretKey} disabled={this.hasAllInputDisabled()}/>
                    {this.state.yubikeySecretKeyError &&
                    <div className="yubikey_secret_key message error">{this.state.yubikeySecretKeyError}</div>
                    }
                  </div>
                </div>
              </div>
              }
            </div>
            <div className="provider-section duo">
              <h3>
                <span className="input toggle-switch form-element ready">
                  <input id="duo-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="duoToggle"
                    onChange={this.handleInputChange} checked={this.state.duoToggle} disabled={this.hasAllInputDisabled()}/>
                  <label className="toggle-switch-button" htmlFor="duo-provider-toggle-button"/>
                </span>
                <label>Duo</label>
              </h3>
              {!this.isDuoChecked() &&
              <p className="description">
                The Duo provider is disabled for all users.
              </p>
              }
              {this.isDuoChecked() &&
              <div>
                <p className="description enabled">
                  The Duo provider is enabled for all users. They can setup this provider in their profile and use it as
                  second factor authentication.
                </p>
                <div className="form-content">
                  <div className="input text required">
                    <label>Hostname</label>
                    <input id="duoHostname" type="text" name="duoHostname" required="required" className="required fluid form-element ready"
                      placeholder="api-24zlkn4.duosecurity.com" value={this.state.duoHostname}
                      onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                    {this.state.duoHostnameError &&
                    <div className="duo_hostname message error">{this.state.duoHostnameError}</div>
                    }
                  </div>
                  <div className="input text required">
                    <label>Integration key</label>
                    <input id="duoIntegrationKey" type="text" name="duoIntegrationKey" required="required" className="required fluid form-element ready"
                      placeholder="HASJKDSQJO213123KQSLDF" value={this.state.duoIntegrationKey}
                      onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                    {this.state.duoIntegrationKeyError &&
                    <div className="duo_integration_key message error">{this.state.duoIntegrationKeyError}</div>
                    }
                  </div>
                  <div className="input text required">
                    <label>Salt</label>
                    <input id="duoSalt" name="duoSalt" required="required" className="required fluid form-element ready" placeholder="**********" type="password"
                      value={this.state.duoSalt} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                    {this.state.duoSaltError &&
                    <div className="duo_salt message error">{this.state.duoSaltError}</div>
                    }
                  </div>
                  <div className="input text required">
                    <label>Secret key</label>
                    <input id="duoSecretKey" name="duoSecretKey" required="required" className="required fluid form-element ready" placeholder="**********" type="password"
                      value={this.state.duoSecretKey} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                    {this.state.duoSecretKeyError &&
                    <div className="duo_secret_key message error">{this.state.duoSecretKeyError}</div>
                    }
                  </div>
                </div>
              </div>
              }
            </div>
          </form>
        </div>
        <div className="col4 last">
          <h2>Need help?</h2>
          <p>Check out our Multi Factor Authentication configuration guide</p>
          <a className="button" href="https://help.passbolt.com/configure">
            <Icon name="life-ring"/>
            <span>Read documentation</span>
          </a>
        </div>
      </div>
    );
  }
}

DisplayMfaAdministration.contextType = ApiAppContext;

DisplayMfaAdministration.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withActionFeedback(withAdministrationWorkspace(DisplayMfaAdministration));
