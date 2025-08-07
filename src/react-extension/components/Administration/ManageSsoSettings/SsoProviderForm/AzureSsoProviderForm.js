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
 * @since         4.5.0
 */
import React from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {withActionFeedback} from "../../../../contexts/ActionFeedbackContext";
import {withAdminSso} from "../../../../contexts/AdminSsoContext";
import {withAppContext} from "../../../../../shared/context/AppContext/AppContext";
import Select from "../../../Common/Select/Select";
import Password from "../../../../../shared/components/Password/Password";
import AzureSsoSettingsEntity from "../../../../../shared/models/entity/ssoSettings/AzureSsoSettingsEntity";
import CopySVG from "../../../../../img/svg/copy.svg";
import CalendarSVG from "../../../../../img/svg/copy.svg";
import CaretDownSVG from "../../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../../img/svg/caret_right.svg";
import {withClipboard} from "../../../../contexts/Clipboard/ManagedClipboardServiceProvider";

/**
 * This component displays the Azure SSO settings form
 */
class AzureSsoProviderForm extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      advancedSettingsOpened: false,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCopyRedirectUrl = this.handleCopyRedirectUrl.bind(this);
    this.handleAdvancedSettingsCLick = this.handleAdvancedSettingsCLick.bind(this);
  }

  createRefs() {
    this.clientIdInputRef = React.createRef();
    this.tenantIdInputRef = React.createRef();
    this.clientSecretInputRef = React.createRef();
    this.clientSecretExpiryInputRef = React.createRef();
  }

  componentDidUpdate() {
    if (!this.props.adminSsoContext.consumeFocusOnError()) {
      return;
    }

    const errors = this.props.adminSsoContext.getErrors();
    const fieldToFocus = this.getFirstFieldInError(errors, ["client_id", "tenant_id", "client_secret", "client_secret_expiry"]);

    switch (fieldToFocus) {
      case "client_id":
        this.clientIdInputRef.current.focus();
        break;
      case "tenant_id":
        this.tenantIdInputRef.current.focus();
        break;
      case "client_secret":
        this.clientSecretInputRef.current.focus();
        break;
      case "client_secret_expiry":
        this.clientSecretExpiryInputRef.current.focus();
        break;
    }
  }

  /**
   * Returns the first field with an error (first in the given list)
   * @param {EntityValidationError} errors
   * @param {Array<string>} fieldPriority the ordered list of field to check
   * @returns {string|null}
   */
  getFirstFieldInError(errors, fieldPriority) {
    for (let i = 0; i < fieldPriority.length; i++) {
      const fieldName = fieldPriority[i];
      if (errors.hasError(fieldName)) {
        return fieldName;
      }
    }
    return null;
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
    this.props.adminSsoContext.setValue(name, value);
  }

  /**
   * Handle advanced settings panel button click
   */
  handleAdvancedSettingsCLick() {
    this.setState({
      advancedSettingsOpened: !this.state.advancedSettingsOpened
    });
  }

  /**
   * Handle the copy to clipboard button
   */
  async handleCopyRedirectUrl() {
    await this.props.clipboardContext.copy(this.fullRedirectUrl, this.translate("The redirection URL has been copied to the clipboard."));
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminSsoContext.isProcessing();
  }

  /**
   * Returns an array of string from the errors so React can display them.
   * @param {Object} errors
   * @returns {Array<string>}
   */
  displayErrors(errors) {
    return Object.values(errors);
  }

  /**
   * Get the different URLs Azure supports for the URL select input.
   * @returns {Array<{value: string, label: string}}
   */
  get availableUrlList() {
    return AzureSsoSettingsEntity.SUPPORTED_URLS.map(url => ({
      value: url, label: url,
    }));
  }


  /**
   * Get the different options for email claim select input.
   * @returns {Array<{value: string, label: string}}
   */
  get emailClaimList() {
    return [
      {value: "email", label: this.translate("Email")},
      {value: "preferred_username", label: this.translate("Preferred username")},
      {value: "upn", label: this.translate("UPN")},
    ];
  }

  /**
   * Get the different options for prompt select input.
   * @returns {Array<{value: string, label: string}}
   */
  get promptOptionList() {
    return [
      {value: "login", label: this.translate("Login")},
      {value: "none", label: this.translate("None")},
    ];
  }

  /**
   * Get the full redirection URL;
   */
  get fullRedirectUrl() {
    const trustedDomain = this.props.context.userSettings.getTrustedDomain();
    return `${trustedDomain}/sso/azure/redirect`;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const ssoContext = this.props.adminSsoContext;
    const ssoConfig = ssoContext.getSsoConfiguration();
    const errors = ssoContext.getErrors();
    return (
      <>
        <div className={`select-wrapper input required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label htmlFor="sso-azure-url-input"><Trans>Login URL</Trans></label>
          <Select id="sso-azure-url-input" name="url" items={this.availableUrlList} value={ssoConfig.url} onChange={this.handleInputChange}/>
          <p>
            <Trans>The Azure AD authentication endpoint. See <a href="https://learn.microsoft.com/en-us/azure/active-directory/develop/authentication-national-cloud#azure-ad-authentication-endpoints" rel="noopener noreferrer" target="_blank">alternatives</a>.</Trans>
          </p>
        </div>
        <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Redirect URL</Trans></label>
          <div className="button-inline">
            <input id="sso-redirect-url-input" type="text" className="fluid form-element disabled" name="redirect_url"
              value={this.fullRedirectUrl} placeholder={this.translate("Redirect URL")} readOnly disabled={true}/>
            <button type="button" onClick={this.handleCopyRedirectUrl} className="copy-to-clipboard button button-icon">
              <CopySVG/>
            </button>
          </div>
          <p>
            <Trans>The URL to provide to Azure when registering the application.</Trans>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Application (client) ID</Trans></label>
          <input id="sso-azure-client-id-input" type="text" className="fluid form-element" name="client_id" ref={this.clientIdInputRef}
            value={ssoConfig.client_id} onChange={this.handleInputChange} placeholder={this.translate("Application (client) ID")}
            disabled={this.hasAllInputDisabled()}/>
          {errors?.hasError('client_id') &&
            <div className="error-message">{this.displayErrors(errors.getError('client_id'))}</div>
          }
          <p>
            <Trans>The public identifier for the app in Azure in UUID format.</Trans> <a href="https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id" rel="noopener noreferrer" target="_blank"><Trans>Where to find it?</Trans></a>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Directory (tenant) ID</Trans></label>
          <input id="sso-azure-tenant-id-input" type="text" className="fluid form-element" name="tenant_id" ref={this.tenantIdInputRef}
            value={ssoConfig.tenant_id} onChange={this.handleInputChange} placeholder={this.translate("Directory ID")}
            disabled={this.hasAllInputDisabled()}/>
          {errors?.hasError('tenant_id') &&
            <div className="error-message">{this.displayErrors(errors.getError('tenant_id'))}</div>
          }
          <p>
            <Trans>The Azure Active Directory tenant ID, in UUID format.</Trans> <a href="https://learn.microsoft.com/en-gb/azure/active-directory/fundamentals/active-directory-how-to-find-tenant" rel="noopener noreferrer" target="_blank"><Trans>Where to find it?</Trans></a>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Secret</Trans></label>
          <Password
            id="sso-azure-secret-input"
            className="fluid form-element"
            onChange={this.handleInputChange}
            autoComplete="off"
            name="client_secret"
            placeholder={this.translate("Secret")}
            disabled={this.hasAllInputDisabled()}
            value={ssoConfig.client_secret}
            preview={true}
            inputRef={this.clientSecretInputRef}/>
          {errors?.hasError('client_secret') &&
            <div className="error-message">{this.displayErrors(errors.getError('client_secret'))}</div>
          }
          <p>
            <Trans>Allows Azure and Passbolt API to securely share information.</Trans> <a href="https://learn.microsoft.com/en-us/azure/marketplace/create-or-update-client-ids-and-secrets#add-a-client-id-and-client-secret" rel="noopener noreferrer" target="_blank"><Trans>Where to find it?</Trans></a>
          </p>
        </div>
        <div className={`input text date-wrapper required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Secret expiry</Trans></label>
          <div className="button-inline">
            <input id="sso-azure-secret-expiry-input" type="date" className={`fluid form-element ${ssoConfig.client_secret_expiry ? "" : "empty"}`} name="client_secret_expiry" ref={this.clientSecretExpiryInputRef}
              value={ssoConfig.client_secret_expiry || ""} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
            <CalendarSVG/>
          </div>
          {errors?.hasError('client_secret_expiry') &&
            <div className="error-message">{this.displayErrors(errors.getError('client_secret_expiry'))}</div>
          }
        </div>
        <div className="warning message">
          <div>
            <Trans><b>Warning</b>: This secret will expire after some time (typically a few months). Make sure you save the expiry date and rotate it on time.</Trans>
          </div>
        </div>
        <div>
          <div className={`accordion operation-details ${this.state.advancedSettingsOpened ? "" : "closed"}`}>
            <div className="accordion-header" onClick={this.handleAdvancedSettingsCLick}>
              <button type="button" className="link no-border" id="advanced-settings-panel-button">
                {this.state.advancedSettingsOpened ? <CaretDownSVG className="caret-down"/> : <CaretRightSVG className="caret-right"/>}
                <Trans>Advanced settings</Trans>
              </button>
            </div>
          </div>
        </div>
        {this.state.advancedSettingsOpened &&
          <>
            <div className={`select-wrapper input required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="email-claim-input"><Trans>Email claim</Trans></label>
              <Select id="email-claim-input" name="email_claim" items={this.emailClaimList} value={ssoConfig.email_claim} onChange={this.handleInputChange}/>
              <p><Trans>Defines which Azure field needs to be used as Passbolt username.</Trans></p>
            </div>
            {ssoConfig.email_claim === "upn" &&
              <div className="warning message">
                <div>
                  <Trans><b>Warning</b>: UPN is not active by default on Azure and requires a specific option set on Azure to be working.</Trans>
                </div>
              </div>
            }
            {ssoConfig.email_claim === "email" &&
              <div className="warning message">
                <div>
                  <Trans><b>Warning</b>: using Azure email field to map with Passbolt username is generally unsafe (see. noauth vulnerability class).</Trans>
                </div>
              </div>
            }
            <div className={`select-wrapper input required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="prompt-input"><Trans>Prompt</Trans></label>
              <Select id="prompt-input" name="prompt" items={this.promptOptionList} value={ssoConfig.prompt} onChange={this.handleInputChange}/>
              <p><Trans>Defines the Azure login behaviour by prompting the user to fully login each time or not.</Trans></p>
            </div>
            <div className="input-wrapper form-element">
              <div className="toggle-swith-title"><Trans>Login hint</Trans></div>
              <div className="input toggle-switch">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="login_hint"
                  onChange={this.handleInputChange} checked={ssoConfig.login_hint} disabled={this.hasAllInputDisabled()}
                  id="login_hint-input"/>
                <label htmlFor="login_hint-input"><Trans>If checked, users signing in with Microsoft Azure must use their Passbolt email address.</Trans></label>
              </div>
            </div>
          </>
        }
      </>
    );
  }
}

AzureSsoProviderForm.propTypes = {
  adminSsoContext: PropTypes.object, // The administration sso configuration context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  context: PropTypes.any, // The application context
  clipboardContext: PropTypes.object, // the clipboard context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withAdminSso(withClipboard(withTranslation('common')(AzureSsoProviderForm)))));
