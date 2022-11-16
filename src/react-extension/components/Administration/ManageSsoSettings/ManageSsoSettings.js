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
import DisplayAdministrationSsoActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSsoAction/DisplayAdministrationSsoActions";
import {withAdminSso} from "../../../contexts/AdminSsoContext";
import SsoProviders from "./SsoProviders.data";
import {withAppContext} from "../../../contexts/AppContext";

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
      processing: false,
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
    this.handleShowDatePicker = this.handleShowDatePicker.bind(this);
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
    const ssoConfig = this.props.adminSsoContext.getSsoConfiguration();
    await navigator.clipboard.writeText(ssoConfig.data.redirect_url);
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The redirection URL has been copied to the clipboard."));
  }

  /**
   * Handles the click on the "show date picker" button
   */
  handleShowDatePicker(event) {
    event.preventDefault();
    this.datePickerRef.current.showPicker();
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return this.hasAzureError();
  }

  /**
   * If Azure form has an error
   * @returns {boolean}
   */
  hasAzureError() {
    const data = this.state.ssoConfig?.data;
    return !data?.url
      || !data?.tenant_id
      || !data?.client_id
      || !data?.client_secret
      || !data?.client_secret_expiry;
  }

  /**
   * save Sso settings
   * @returns {Promise<void>}
   */
  async saveSso() {
    await this.props.administrationWorkspaceContext.onSaveSsoRequested({...this.state.ssoConfig});
  }

  /**
   * Handle save operation success.
   * @returns {Promise<void>}
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The SSO settings for the organization were updated."));
    this.setState({processing: false});
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   * @returns {Promise<void>}
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
   * @returns {Promise<void>}
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
    const trustedDomain = this.props.context.userSettings.getTrustedDomain();
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
          {this.isReady() && !isSsoActivated &&
            <>
              <h4 className="no-border"><Trans>Select a provider</Trans></h4>
              <div className="provider-list">
                {SsoProviders.map(provider =>
                  <div key={provider.id} className={`provider button ${provider.disabled ? "disabled" : ""}`} id={provider.id} onClick={() => this.props.adminSsoContext.changeProvider(provider)}>
                    <div className="provider-logo">
                      <img src={`${trustedDomain}/img/third_party/${provider.icon}`}/>
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
            <form className="form">
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
                    <p>
                      <Trans>The Azure AD authentication endpoint. See <a href="" rel="noopener noreferrer">alternatives</a>.</Trans>
                    </p>
                  </div>
                  <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Redirect URL</Trans></label>
                    <div className="button-inline">
                      <input id="sso-redirect-url-input" type="text" className="fluid form-element disabled" name="redirect_url"
                        value={ssoConfig?.data?.redirect_url} placeholder={this.translate("Redirect URL")} readOnly disabled={true}/>
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
                    <p>
                      <Trans>The public identifier for the app in Azure in UUID format. <a href="" rel="noopener noreferrer">Where to find?</a></Trans>
                    </p>
                  </div>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Directory (tenant) ID</Trans></label>
                    <input id="sso-azure-tenant-id-input" type="text" className="fluid form-element" name="tenant_id"
                      value={ssoConfig?.data?.tenant_id} onChange={this.handleInputChange} placeholder={this.translate("Directory ID")}
                      disabled={this.hasAllInputDisabled()}/>
                    <p>
                      <Trans>The Azure Active Directory tenant ID, in UUID format. <a href="" rel="noopener noreferrer">Where to find?</a></Trans>
                    </p>
                  </div>
                  <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Secret</Trans></label>
                    <input id="sso-azure-secret-input" type="text" className="fluid form-element" name="client_secret"
                      value={ssoConfig?.data?.client_secret} onChange={this.handleInputChange} placeholder={this.translate("Secret")}
                      disabled={this.hasAllInputDisabled()}/>
                    <p>
                      <Trans>Allows Azure and Passbolt API to securely share information. <a href="" rel="noopener noreferrer">Where to find?</a></Trans>
                    </p>
                  </div>
                  <div className={`input text input-wrapper required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                    <label><Trans>Secret expiry</Trans></label>
                    <div className="button-inline">
                      <input id="sso-azure-secret-expiry-input" type="date" ref={this.datePickerRef} className={`fluid form-element ${ssoConfig.data.client_secret_expiry ? "" : "empty"}`} name="client_secret_expiry"
                        value={ssoConfig?.data?.client_secret_expiry} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}/>
                      <a onClick={this.handleShowDatePicker} className="show-date-picker button button-icon">
                        <Icon name="calendar"/>
                      </a>
                    </div>
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
