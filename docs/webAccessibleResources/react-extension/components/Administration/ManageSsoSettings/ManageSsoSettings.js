/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";
import DisplayAdministrationSsoActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSsoActions/DisplayAdministrationSsoActions";
import {withAdminSso} from "../../../contexts/AdminSsoContext";
import SsoProviders from "./SsoProviders.data";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Password from "../../../../shared/components/Password/Password";

/**
 * This component displays the SSO administration settings
 */
class ManageSsoSettings extends React.Component {
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
      loading: true,
      providers: [],
      advancedSettingsOpened: false,
    };
  }

  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationSsoActions);
    await this.props.adminSsoContext.loadSsoConfiguration();
    this.setState({
      loading: false,
      providers: this.props.adminSsoContext.getSsoConfiguration()?.providers || []
    });
  }

  componentDidUpdate() {
    if (!this.props.adminSsoContext.shouldFocusOnError()) {
      return;
    }

    const errors = this.props.adminSsoContext.getErrors();
    const fieldToFocus = this.getFirstFieldInError(errors, ["url", "client_id", "tenant_id", "client_secret", "client_secret_expiry"]);
    switch (fieldToFocus) {
      case "url":
        this.urlInputRef.current.focus();
        break;
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
      case "prompt":
        this.promptInputRef.current.focus();
        break;
      case "email_claim":
        this.emailClaimInputRef.current.focus();
        break;
    }
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProviderInputChange = this.handleProviderInputChange.bind(this);
    this.handleSsoSettingToggle = this.handleSsoSettingToggle.bind(this);
    this.handleCopyRedirectUrl = this.handleCopyRedirectUrl.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAdvancedSettingsCLick = this.handleAdvancedSettingsCLick.bind(this);
  }

  createRefs() {
    this.urlInputRef = React.createRef();
    this.clientIdInputRef = React.createRef();
    this.tenantIdInputRef = React.createRef();
    this.clientSecretInputRef = React.createRef();
    this.clientSecretExpiryInputRef = React.createRef();
    this.promptInputRef = React.createRef();
    this.emailClaimInputRef = React.createRef();
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
   * Handle provider input change.
   */
  handleProviderInputChange(event) {
    this.props.adminSsoContext.changeProvider({
      id: event.target.value
    });
  }

  /**
   * Handle the SSO settings toggle
   */
  handleSsoSettingToggle() {
    this.props.adminSsoContext.disableSso();
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
    await navigator.clipboard.writeText(this.fullRedirectUrl);
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The redirection URL has been copied to the clipboard."));
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const context = this.props.adminSsoContext;
    if (!context.hasFormChanged() || !context.validateData()) {
      return;
    }
    await context.saveAndTestConfiguration();
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminSsoContext.isProcessing() || this.state.loading;
  }

  /**
   * Get the supported SSO providers.
   * @returns {Array<{value: string, label: string}}
   */
  get supportedSsoProviders() {
    const providerIdList = this.state.providers;
    /*
     * providers must be known on both side (API / Bext) in order to work.
     * Obviously, the API can't work with an unknown provider.
     * On Bext side, we can't provide a third-party SSO provider specific form if it's is unknown
     */
    return providerIdList.map(providerId => {
      const providerData = SsoProviders.find(provider => provider.id === providerId);
      if (providerData && !providerData.disabled) {
        return {
          value: providerData.id,
          label: providerData.name
        };
      }
    });
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
    const ssoConfig = this.props.adminSsoContext.getSsoConfiguration();
    const trustedDomain = this.props.context.userSettings.getTrustedDomain();
    return `${trustedDomain}/sso/${ssoConfig?.provider}/redirect`;
  }

  /**
   * Returns true if the data is loaded.
   * Useful to avoid UI blinking during data loading.
   * @returns {boolean}
   */
  isReady() {
    return this.props.adminSsoContext.isDataReady();
  }

  /**
   * Returns the first field with an error (first in the given list)
   * @param {object} errors a map of erroneous field
   * @param {Array<string>} fieldPriority the ordered list of field to check
   * @returns {string|null}
   */
  getFirstFieldInError(errors, fieldPriority) {
    for (let i = 0; i < fieldPriority.length; i++) {
      const fieldName = fieldPriority[i];
      if (typeof(errors[fieldName]) !== "undefined") {
        return fieldName;
      }
    }
    return null;
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
    const isSsoActivated = ssoContext.isSsoConfigActivated();
    const errors = ssoContext.getErrors();
    return (
      <div className="row">
        <div className="third-party-provider-settings sso-settings col8 main-column">
          <h3>
            <span className="input toggle-switch form-element">
              <input type="checkbox" className="toggle-switch-checkbox checkbox" name="ssoToggle"
                onChange={this.handleSsoSettingToggle} checked={isSsoActivated} disabled={this.hasAllInputDisabled()}
                id="ssoToggle"/>
              <label htmlFor="ssoToggle"><Trans>Single Sign-On</Trans></label>
            </span>
          </h3>
          {this.props.adminSsoContext.hasFormChanged() &&
            <div className="warning message" id="sso-setting-overridden-banner">
              <p>
                <Trans>Warning, Don&apos;t forget to save your settings to apply your modification.</Trans>
              </p>
            </div>
          }
          {this.isReady() && !isSsoActivated &&
            <>
              <h4 className="no-border"><Trans>Select a provider</Trans></h4>
              <div className="provider-list">
                {SsoProviders.map(provider =>
                  <div key={provider.id} className={`provider button ${provider.disabled ? "disabled" : ""}`} id={provider.id} onClick={() => this.props.adminSsoContext.changeProvider(provider)}>
                    <div className="provider-logo">
                      {provider.icon}
                    </div>
                    <p className="provider-name">{provider.name}<br/>
                      {provider.disabled &&
                        <Trans>(not yet available)</Trans>
                      }
                    </p>
                  </div>
                )}
              </div>
            </>
          }
          {this.isReady() && isSsoActivated &&
            <form className="form" onSubmit={this.handleFormSubmit}>
              <div className="select-wrapper input">
                <label htmlFor="sso-provider-input"><Trans>Single Sign-On provider</Trans></label>
                <Select id="sso-provider-input" name="provider" items={this.supportedSsoProviders} value={ssoConfig?.provider} onChange={this.handleProviderInputChange}/>
              </div>
              {ssoConfig?.provider === "azure" &&
                <>
                  <hr/>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Login URL</Trans></label>
                    <input id="sso-azure-url-input" type="text" className="fluid form-element" name="url" ref={this.urlInputRef}
                      value={ssoConfig?.data?.url} onChange={this.handleInputChange} placeholder={this.translate("Login URL")}
                      disabled={this.hasAllInputDisabled()}/>
                    {errors.url &&
                      <div className="error-message">{errors.url}</div>
                    }
                    <p>
                      <Trans>The Azure AD authentication endpoint. See <a href="https://learn.microsoft.com/en-us/azure/active-directory/develop/authentication-national-cloud#azure-ad-authentication-endpoints" rel="noopener noreferrer" target="_blank">alternatives</a>.</Trans>
                    </p>
                  </div>
                  <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Redirect URL</Trans></label>
                    <div className="button-inline">
                      <input id="sso-redirect-url-input" type="text" className="fluid form-element disabled" name="redirect_url"
                        value={this.fullRedirectUrl} placeholder={this.translate("Redirect URL")} readOnly disabled={true}/>
                      <button type="button" onClick={this.handleCopyRedirectUrl} className="copy-to-clipboard button-icon">
                        <Icon name="copy-to-clipboard"/>
                      </button>
                    </div>
                    <p>
                      <Trans>The URL to provide to Azure when registering the application.</Trans>
                    </p>
                  </div>
                  <hr/>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Application (client) ID</Trans></label>
                    <input id="sso-azure-client-id-input" type="text" className="fluid form-element" name="client_id" ref={this.clientIdInputRef}
                      value={ssoConfig?.data?.client_id} onChange={this.handleInputChange} placeholder={this.translate("Application (client) ID")}
                      disabled={this.hasAllInputDisabled()}/>
                    {errors.client_id &&
                      <div className="error-message">{errors.client_id}</div>
                    }
                    <p>
                      <Trans>The public identifier for the app in Azure in UUID format.</Trans> <a href="https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id" rel="noopener noreferrer" target="_blank"><Trans>Where to find it?</Trans></a>
                    </p>
                  </div>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Directory (tenant) ID</Trans></label>
                    <input id="sso-azure-tenant-id-input" type="text" className="fluid form-element" name="tenant_id" ref={this.tenantIdInputRef}
                      value={ssoConfig?.data?.tenant_id} onChange={this.handleInputChange} placeholder={this.translate("Directory ID")}
                      disabled={this.hasAllInputDisabled()}/>
                    {errors.tenant_id &&
                      <div className="error-message">{errors.tenant_id}</div>
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
                      value={ssoConfig?.data?.client_secret}
                      preview={true}
                      inputRef={this.clientSecretInputRef}/>
                    {errors.client_secret &&
                      <div className="error-message">{errors.client_secret}</div>
                    }
                    <p>
                      <Trans>Allows Azure and Passbolt API to securely share information.</Trans> <a href="https://learn.microsoft.com/en-us/azure/marketplace/create-or-update-client-ids-and-secrets#add-a-client-id-and-client-secret" rel="noopener noreferrer" target="_blank"><Trans>Where to find it?</Trans></a>
                    </p>
                  </div>
                  <div className={`input text date-wrapper required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Secret expiry</Trans></label>
                    <div className="button-inline">
                      <input id="sso-azure-secret-expiry-input" type="date" className={`fluid form-element ${ssoConfig.data.client_secret_expiry ? "" : "empty"}`} name="client_secret_expiry"  ref={this.clientSecretExpiryInputRef}
                        value={ssoConfig?.data?.client_secret_expiry} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                      <Icon name="calendar"/>
                    </div>
                    {errors.client_secret_expiry &&
                      <div className="error-message">{errors.client_secret_expiry}</div>
                    }
                  </div>
                  <div className="warning message">
                    <Trans><b>Warning</b>: This secret will expire after some time (typically a few months). Make sure you save the expiry date and rotate it on time.</Trans>
                  </div>
                  <div>
                    <div className={`accordion operation-details ${this.state.advancedSettingsOpened ? "" : "closed"}`}>
                      <div className="accordion-header" onClick={this.handleAdvancedSettingsCLick}>
                        <button type="button" className="link no-border" id="advanced-settings-panel-button">
                          <Trans>Advanced settings</Trans>&nbsp;<Icon name={this.state.advancedSettingsOpened ? "caret-down" : "caret-right"}/>
                        </button>
                      </div>
                    </div>
                  </div>
                  {this.state.advancedSettingsOpened &&
                    <>
                      <div className={`select-wrapper input required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                        <label htmlFor="email-claim-input"><Trans>Email claim</Trans></label>
                        <Select id="email-claim-input" name="email_claim" items={this.emailClaimList} value={ssoConfig.data?.email_claim} onChange={this.handleInputChange}/>
                        <p><Trans>Defines which Azure field needs to be used as Passbolt username.</Trans></p>
                      </div>
                      {ssoConfig.data?.email_claim === "upn" &&
                        <div className="warning message">
                          <Trans><b>Warning</b>: UPN is not active by default on Azure and requires a specific option set on Azure to be working.</Trans>
                        </div>
                      }
                      <div className={`select-wrapper input required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                        <label htmlFor="prompt-input"><Trans>Prompt</Trans></label>
                        <Select id="prompt-input" name="prompt" items={this.promptOptionList} value={ssoConfig.data?.prompt} onChange={this.handleInputChange}/>
                        <p><Trans>Defines the Azure login behaviour by prompting the user to fully login each time or not.</Trans></p>
                      </div>
                    </>
                  }
                </>
              }
              {ssoConfig?.provider === "google" &&
                <>
                  <hr/>
                  <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Redirect URL</Trans></label>
                    <div className="button-inline">
                      <input id="sso-redirect-url-input" type="text" className="fluid form-element disabled" name="redirect_url"
                        value={this.fullRedirectUrl} placeholder={this.translate("Redirect URL")} readOnly disabled={true}/>
                      <a onClick={this.handleCopyRedirectUrl} className="copy-to-clipboard button button-icon">
                        <Icon name="copy-to-clipboard"/>
                      </a>
                    </div>
                    <p>
                      <Trans>The URL to provide to Google when registering the application.</Trans>
                    </p>
                  </div>
                  <hr/>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Application (client) ID</Trans></label>
                    <input id="sso-google-client-id-input" type="text" className="fluid form-element" name="client_id" ref={this.clientIdInputRef}
                      value={ssoConfig?.data?.client_id} onChange={this.handleInputChange} placeholder={this.translate("Application (client) ID")}
                      disabled={this.hasAllInputDisabled()}/>
                    {errors.client_id &&
                      <div className="error-message">{errors.client_id}</div>
                    }
                    <p>
                      <Trans>The public identifier for the app in Google in UUID format.</Trans> <a href="https://developers.google.com/identity/openid-connect/openid-connect#authenticationuriparameters" rel="noopener noreferrer" target="_blank"><Trans>Where to find it?</Trans></a>
                    </p>
                  </div>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Secret</Trans></label>
                    <Password
                      id="sso-google-secret-input"
                      className="fluid form-element"
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      name="client_secret"
                      placeholder={this.translate("Secret")}
                      disabled={this.hasAllInputDisabled()}
                      value={ssoConfig?.data?.client_secret}
                      preview={true}
                      inputRef={this.clientSecretInputRef}/>
                    {errors.client_secret &&
                      <div className="error-message">{errors.client_secret}</div>
                    }
                    <p>
                      <Trans>Allows Google and Passbolt API to securely share information.</Trans> <a href="https://developers.google.com/identity/openid-connect/openid-connect#authenticationuriparameters" rel="noopener noreferrer" target="_blank"><Trans>Where to find it?</Trans></a>
                    </p>
                  </div>
                </>
              }
            </form>
          }
        </div>
        <div className="col4 last">
          <div className="sidebar-help warning message" id="sso-setting-security-warning-banner">
            <h3><Trans>Important notice:</Trans></h3>
            <p>
              <Trans>Enabling SSO changes the security risks.</Trans> <Trans>For example an attacker with a local machine access maybe be able to access secrets, if the user is still logged in with the Identity provider.</Trans> <Trans>Make sure users follow screen lock best practices.</Trans>
              <a href="https://help.passbolt.com/configure/sso" target="_blank" rel="noopener noreferrer"><Trans>Learn more</Trans></a>
            </p>
          </div>
          <div className="sidebar-help">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about SSO, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/sso" target="_blank" rel="noopener noreferrer">
              <Icon name="document"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
          {ssoConfig?.provider === "azure" &&
          <div className="sidebar-help">
            <h3><Trans>How do I configure a AzureAD SSO?</Trans></h3>
            <a className="button" href="https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-setup-sso" target="_blank" rel="noopener noreferrer">
              <Icon name="external-link"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
          }
          {ssoConfig?.provider === "google" &&
          <div className="sidebar-help">
            <h3><Trans>How do I configure a Google SSO?</Trans></h3>
            <a className="button" href="https://developers.google.com/identity/openid-connect/openid-connect" target="_blank" rel="noopener noreferrer">
              <Icon name="external-link"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
          }
        </div>
      </div>
    );
  }
}

ManageSsoSettings.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminSsoContext: PropTypes.object, // The administration sso configuration context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withAdministrationWorkspace(withAdminSso(withTranslation('common')(ManageSsoSettings)))));
