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
import FileSVG from "../../../../img/svg/file.svg";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import DisplayAdministrationMfaActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationMfaActions/DisplayAdministrationMfaActions";
import {withAdminMfa} from "../../../contexts/Administration/AdministrationMfa/AdministrationMfaContext";
import MfaFormService from '../../../../shared/services/forms/Mfa/MfaFormService';
import Password from "../../../../shared/components/Password/Password";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {createSafePortal} from "../../../../shared/utils/portals";

/**
 * This component allows to display the MFA for the administration
 */
class DisplayMfaAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.mfaFormService = MfaFormService.getInstance(this.props.adminMfaContext, this.props.t);
    this.bindCallbacks();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationMfaActions);
    if (this.isRunningUnderHttps) {
      this.props.adminMfaContext.findMfaSettings();
    }
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminMfaContext.clearContext();
    MfaFormService.killInstance();
    this.mfaFormService = null;
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.props.adminMfaContext.setSettings(name, value);
    this.validateInput(name, value);
  }

  /**
   * validate the input
   * @params {string} The input name
   * @params {string} The input valude
   * @returns {void}
   */
  validateInput(name, value) {
    switch (name) {
      case 'yubikeyClientIdentifier':
        this.mfaFormService.validateYubikeyClientIdentifier(value);
        break;
      case 'yubikeySecretKey':
        this.mfaFormService.validateYubikeySecretKey(value);
        break;
      case 'duoHostname':
        this.mfaFormService.validateDuoHostname(value);
        break;
      case 'duoClientId':
        this.mfaFormService.validateDuoClientId(value);
        break;
      case 'duoClientSecret':
        this.mfaFormService.validateDuoClientSecret(value);
        break;
    }
  }

  /**
   * Returns true if the current URL is using the protocol HTTPS
   * @returns {boolean}
   */
  get isRunningUnderHttps() {
    const trustedDomain = this.props.context.trustedDomain;
    const url = new URL(trustedDomain);
    return url.protocol === "https:";
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminMfaContext.isProcessing();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isSubmitted = this.props.adminMfaContext.isSubmitted();
    const settings = this.props.adminMfaContext.getSettings();
    const errors = this.props.adminMfaContext.getErrors();
    const hasSaveWarning = this.props.adminMfaContext.getCurrentSettings() !== null && this.props.adminMfaContext.hasSettingsChanges();

    return (
      <div className="row">
        <div className="mfa-settings main-column">
          <div className="main-content">
            <h3 className="title">Multi Factor Authentication</h3>
            {!this.isRunningUnderHttps &&
              <p><Trans>Sorry the multi factor authentication feature is only available in a secure context (HTTPS).</Trans></p>
            }
            {this.isRunningUnderHttps &&
              <>
                <p><Trans>In this section you can choose which multi factor authentication will be available.</Trans></p>
                <div className="provider-section">
                  <h4 className="no-border">
                    <span className="input toggle-switch form-element ready">
                      <input id="totp-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="totpProviderToggle"
                        onChange={this.handleInputChange} checked={settings.totpProviderToggle} disabled={this.hasAllInputDisabled()}/>
                      <label htmlFor="totp-provider-toggle-button"><Trans>Time-based One Time Password</Trans></label>
                    </span>
                  </h4>
                  {!settings.totpProviderToggle &&
                    <p className="description">
                      <Trans>The Time-based One Time Password provider is disabled for all users.</Trans>
                    </p>
                  }
                  {settings.totpProviderToggle &&
                    <p className="description">
                      <Trans>The Time-based One Time Password provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.</Trans>
                    </p>
                  }
                </div>
                <div className="provider-section">
                  <h4>
                    <span className="input toggle-switch form-element">
                      <input id="yubikey-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="yubikeyToggle"
                        onChange={this.handleInputChange} checked={settings.yubikeyToggle} disabled={this.hasAllInputDisabled()}/>
                      <label htmlFor="yubikey-provider-toggle-button">Yubikey</label>
                    </span>
                  </h4>
                  {!settings.yubikeyToggle &&
                    <p className="description">
                      <Trans>The Yubikey provider is disabled for all users.</Trans>
                    </p>
                  }
                  {settings.yubikeyToggle &&
                    <>
                      <p className="description">
                        <Trans>The Yubikey provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.</Trans>
                      </p>
                      <div className={`input text required yubikey ${errors.yubikeyClientIdentifierError && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                        <label><Trans>Client identifier</Trans></label>
                        <input
                          id="yubikeyClientIdentifier" name="yubikeyClientIdentifier"
                          className="required fluid form-element ready"
                          type="text" aria-required={true}
                          onChange={this.handleInputChange} value={settings.yubikeyClientIdentifier}
                          placeholder="123456789" disabled={this.hasAllInputDisabled()}/>
                        {(errors.yubikeyClientIdentifierError  && isSubmitted) &&
                          <div className="yubikey_client_identifier error-message">{errors.yubikeyClientIdentifierError}</div>
                        }
                      </div>
                      <div className={`input required input-secret ${errors.yubikeySecretKeyError && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                        <label><Trans>Secret key</Trans></label>
                        <Password
                          id="yubikeySecretKey"
                          onChange={this.handleInputChange}
                          autoComplete="off"
                          name="yubikeySecretKey"
                          placeholder="**********"
                          disabled={this.hasAllInputDisabled()}
                          value={settings.yubikeySecretKey}
                          preview={true}></Password>
                        {(errors.yubikeySecretKeyError && isSubmitted) &&
                          <div className="yubikey_secret_key error-message">{errors.yubikeySecretKeyError}</div>
                        }
                      </div>
                    </>
                  }
                </div>
                <div className="provider-section">
                  <h4>
                    <span className="input toggle-switch form-element ready">
                      <input id="duo-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="duoToggle"
                        onChange={this.handleInputChange} checked={settings.duoToggle} disabled={this.hasAllInputDisabled()}/>
                      <label htmlFor="duo-provider-toggle-button">Duo</label>
                    </span>
                  </h4>
                  {!settings.duoToggle &&
                    <p className="description">
                      <Trans>The Duo provider is disabled for all users.</Trans>
                    </p>
                  }
                  {settings.duoToggle &&
                    <>
                      <p className="description enabled">
                        <Trans>The Duo provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.</Trans>
                      </p>
                      <div className={`input text required ${errors.duoHostnameError  && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                        <label><Trans>Hostname</Trans></label>
                        <input id="duoHostname" type="text" name="duoHostname" aria-required={true} className="required fluid form-element ready"
                          placeholder="api-24zlkn4.duosecurity.com" value={settings.duoHostname}
                          onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                        {(errors.duoHostnameError  && isSubmitted) &&
                          <div className="duo_hostname error-message">{errors.duoHostnameError}</div>
                        }
                      </div>
                      <div className={`input text required ${errors.duoClientIdError  && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                        <label><Trans>Client id</Trans></label>
                        <input id="duoClientId" type="text" name="duoClientId" aria-required={true} className="required fluid form-element ready"
                          placeholder="HASJKDSQJO213123KQSLDF" value={settings.duoClientId}
                          onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                        {(errors.duoClientIdError  && isSubmitted) &&
                          <div className="duo_client_id error-message">{errors.duoClientIdError}</div>
                        }
                      </div>
                      <div className={`input text required ${errors.duoClientSecretError  && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                        <label><Trans>Client secret</Trans></label>
                        <Password
                          id="duoClientSecret"
                          onChange={this.handleInputChange}
                          autoComplete="off"
                          name="duoClientSecret"
                          placeholder="**********"
                          disabled={this.hasAllInputDisabled()}
                          value={settings.duoClientSecret}
                          preview={true}></Password>
                        {(errors.duoClientSecretError  && isSubmitted) &&
                          <div className="duo_client_secret error-message">{errors.duoClientSecretError}</div>
                        }
                      </div>
                    </>
                  }
                </div>
              </>
            }
          </div>
          {hasSaveWarning &&
            <div className="warning message">
              <div>
                <p>
                  <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                </p>
              </div>
            </div>
          }
        </div>
        <DisplayAdministrationMfaActions />
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>Check out our Multi Factor Authentication configuration guide.</Trans></p>
            <a className="button" href="https://passbolt.com/docs/admin/authentication/mfa/" target="_blank" rel="noopener noreferrer">
              <FileSVG />
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

DisplayMfaAdministration.propTypes = {
  context: PropTypes.object, // the app context
  adminMfaContext: PropTypes.object, // The administration workspace context
  createPortal: PropTypes.func, // The mocked create portal react dom primitive if test needed.
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminMfa(withAdministrationWorkspace(withTranslation('common')(DisplayMfaAdministration))));
