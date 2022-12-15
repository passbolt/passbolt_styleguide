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
import {withAppContext} from "../../../contexts/AppContext";
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
    };
  }

  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationSsoActions);
    await this.props.adminSsoContext.loadSsoConfiguration();
    this.setState({
      loading: false
    });
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
  }

  createRefs() {
    this.datePickerRef = React.createRef();
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
   */
  get supportedSsoProviders() {
    const supportedProviders = this.props.adminSsoContext.getProviderList();
    return supportedProviders.map(provider => ({
      value: provider.id,
      label: provider.name
    }));
  }

  /**
   * Get the full redirection URL;
   */
  get fullRedirectUrl() {
    const ssoConfig = this.props.adminSsoContext.getSsoConfiguration();
    const trustedDomain = this.props.context.userSettings.getTrustedDomain();
    return `${trustedDomain}${ssoConfig?.data?.redirect_url}`;
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
                    <input id="sso-azure-url-input" type="text" className="fluid form-element" name="url"
                      value={ssoConfig?.data?.url} onChange={this.handleInputChange} placeholder={this.translate("Login URL")}
                      disabled={this.hasAllInputDisabled()}/>
                    {errors.url &&
                      <div className="error-message">{errors.url}</div>
                    }
                    <p>
                      <Trans>The Azure AD authentication endpoint. See <a href="" rel="noopener noreferrer">alternatives</a>.</Trans>
                    </p>
                  </div>
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
                      <Trans>The URL to provide to Azure when registering the application.</Trans>
                    </p>
                  </div>
                  <hr/>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Application (client) ID</Trans></label>
                    <input id="sso-azure-client-id-input" type="text" className="fluid form-element" name="client_id"
                      value={ssoConfig?.data?.client_id} onChange={this.handleInputChange} placeholder={this.translate("Application (client) ID")}
                      disabled={this.hasAllInputDisabled()}/>
                    {errors.client_id &&
                      <div className="error-message">{errors.client_id}</div>
                    }
                    <p>
                      <Trans>The public identifier for the app in Azure in UUID format. <a href="" rel="noopener noreferrer">Where to find it?</a></Trans>
                    </p>
                  </div>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Directory (tenant) ID</Trans></label>
                    <input id="sso-azure-tenant-id-input" type="text" className="fluid form-element" name="tenant_id"
                      value={ssoConfig?.data?.tenant_id} onChange={this.handleInputChange} placeholder={this.translate("Directory ID")}
                      disabled={this.hasAllInputDisabled()}/>
                    {errors.tenant_id &&
                      <div className="error-message">{errors.tenant_id}</div>
                    }
                    <p>
                      <Trans>The Azure Active Directory tenant ID, in UUID format. <a href="" rel="noopener noreferrer">Where to find it?</a></Trans>
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
                      preview={true}/>
                    {errors.client_secret &&
                      <div className="error-message">{errors.client_secret}</div>
                    }
                    <p>
                      <Trans>Allows Azure and Passbolt API to securely share information. <a href="" rel="noopener noreferrer">Where to find it?</a></Trans>
                    </p>
                  </div>
                  <div className={`input text date-wrapper required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Secret expiry</Trans></label>
                    <div className="button-inline">
                      <input id="sso-azure-secret-expiry-input" type="date" className={`fluid form-element ${ssoConfig.data.client_secret_expiry ? "" : "empty"}`} name="client_secret_expiry"
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
                </>
              }
            </form>
          }
        </div>
        <div className="col4 last">
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
