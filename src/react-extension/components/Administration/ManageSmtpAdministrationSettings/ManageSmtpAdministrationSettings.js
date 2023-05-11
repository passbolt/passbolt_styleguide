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
 * @since         3.8.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withDialog} from "../../../contexts/DialogContext";
import Icon from "../../../../shared/components/Icons/Icon";
import SmtpProviders from "./SmtpProviders.data";
import Password from "../../../../shared/components/Password/Password";
import Select from "../../Common/Select/Select";
import {withAdminSmtpSettings} from "../../../contexts/AdminSmtpSettingsContext";
import DisplayAdministrationSmtpSettingsActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSmtpSettingsActions/DisplayAdministrationSmtpSettingsActions";

/*
 * Supported authentication methods.
 */
const AUTHENTICATION_METHOD_NONE = "None";
const AUTHENTICATION_METHOD_USERNAME = "Username only";
const AUTHENTICATION_METHOD_USERNAME_PASSWORD = "Username & password";

export class ManageSmtpAdministrationSettings extends React.Component {
  /**
   * The no authentication method.
   * @returns {string}
   */
  static get AUTHENTICATION_METHOD_NONE() {
    return AUTHENTICATION_METHOD_NONE;
  }

  /**
   * The authentication method username only
   * @returns {string}
   */
  static get AUTHENTICATION_METHOD_USERNAME() {
    return AUTHENTICATION_METHOD_USERNAME;
  }

  /**
   * The authentication method username and password
   * @returns {string}
   */
  static get AUTHENTICATION_METHOD_USERNAME_PASSWORD() {
    return AUTHENTICATION_METHOD_USERNAME_PASSWORD;
  }

  /**
   * Constructor
   * @param {Object} props
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      showAdvancedSettings: false,
      source: "db",
    };
  }

  /**
   * Creates the React ref for the forms to be able to focus fields having errors
   */
  createRefs() {
    this.usernameFieldRef = React.createRef();
    this.passwordFieldRef = React.createRef();
    this.hostFieldRef = React.createRef();
    this.portFieldRef = React.createRef();
    this.clientFieldRef = React.createRef();
    this.senderEmailFieldRef = React.createRef();
    this.senderNameFieldRef = React.createRef();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationSmtpSettingsActions);
    await this.props.adminSmtpSettingsContext.findSmtpSettings();

    const settings = this.props.adminSmtpSettingsContext.getCurrentSmtpSettings();

    this.setState({showAdvancedSettings: settings.provider?.id === "other"});
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminSmtpSettingsContext.clearContext();
  }

  /**
   * componentDidUpdate
   * Invoked immediately after state or props is updated.
   * It is used to focus on a field if needed or to show the advanced settings panel if needed.
   */
  componentDidUpdate() {
    const smtpContext = this.props.adminSmtpSettingsContext;
    const fieldToFocus = smtpContext.getFieldToFocus();
    if (fieldToFocus) {
      this[`${fieldToFocus}FieldRef`]?.current?.focus();
    }

    if (smtpContext.hasProviderChanged()) {
      this.setState({showAdvancedSettings: smtpContext.getCurrentSmtpSettings().provider?.id === "other"});
    }
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleAdvancedSettingsToggle = this.handleAdvancedSettingsToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleProviderChange = this.handleProviderChange.bind(this);
    this.handleAuthenticationMethodChange = this.handleAuthenticationMethodChange.bind(this);
  }

  /**
   * Handle provider change from select field.
   * @params {ReactEvent} The react event
   */
  handleProviderChange(event) {
    const providerId = event.target.value;
    const provider = SmtpProviders.find(item => item.id === providerId);
    this.props.adminSmtpSettingsContext.changeProvider(provider);
  }

  /**
   * Handle provider change from select field.
   * @params {ReactEvent} The react event
   */
  handleAuthenticationMethodChange(event) {
    let username = null;
    let password = null;

    if (event.target.value === AUTHENTICATION_METHOD_USERNAME) {
      username = "";
    } else if (event.target.value === AUTHENTICATION_METHOD_USERNAME_PASSWORD) {
      username = "";
      password = "";
    }

    this.props.adminSmtpSettingsContext.setData({username, password});
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    this.props.adminSmtpSettingsContext.setData({[target.name]: target.value});
  }

  /**
   * Handles the click on the advanced settings toggle.
   */
  handleAdvancedSettingsToggle() {
    this.setState({showAdvancedSettings: !this.state.showAdvancedSettings});
  }

  /**
   * Returns true if there is a processing happening with the SMTP settings.
   * @returns {boolean}
   */
  isProcessing() {
    return this.props.adminSmtpSettingsContext.isProcessing();
  }

  /**
   * Return the list of available providers.
   * @returns {Array<object>}
   */
  get providerList() {
    return SmtpProviders.map(item => ({
      value: item.id,
      label: item.name
    }));
  }

  /**
   * Return the list of available authentication method.
   * @returns {Array<object>}
   */
  get authenticationMethodList() {
    return [
      {value: AUTHENTICATION_METHOD_NONE, label: this.translate('None')},
      {value: AUTHENTICATION_METHOD_USERNAME, label: this.translate('Username only')},
      {value: AUTHENTICATION_METHOD_USERNAME_PASSWORD, label: this.translate('Username & password')},
    ];
  }

  /**
   * Returns a list of available choice for the 'TLS' select field.
   * @returns {Array<object>}
   */
  get tlsSelectList() {
    return [
      {
        value: true,
        label: this.translate("Yes"),
      },
      {
        value: false,
        label: this.translate("No"),
      }
    ];
  }

  /**
   * Return the selected authentication method.
   * @return {string}
   */
  get authenticationMethod() {
    const smtpContext = this.props.adminSmtpSettingsContext;
    const smtpSettings = smtpContext.getCurrentSmtpSettings();

    if (smtpSettings?.username === null) {
      return AUTHENTICATION_METHOD_NONE;
    } else if (smtpSettings?.password === null) {
      return AUTHENTICATION_METHOD_USERNAME;
    } else {
      return AUTHENTICATION_METHOD_USERNAME_PASSWORD;
    }
  }

  /**
   * Return true if the username field should be displayed
   * @return {boolean}
   */
  shouldDisplayUsername() {
    return this.authenticationMethod === AUTHENTICATION_METHOD_USERNAME
      || this.authenticationMethod === AUTHENTICATION_METHOD_USERNAME_PASSWORD;
  }

  /**
   * Return true if the password field should be displayed
   * @return {boolean}
   */
  shouldDisplayPassword() {
    return this.authenticationMethod === AUTHENTICATION_METHOD_USERNAME_PASSWORD;
  }

  /**
   * Returns true if the source of the settings is from a config file instead of DB and the user has modified a field.
   * @returns {boolean}
   */
  shouldShowSourceWarningMessage() {
    const smtpContext = this.props.adminSmtpSettingsContext;
    return smtpContext.getCurrentSmtpSettings().source !== "db" && smtpContext.isSettingsModified();
  }

  /**
   * Returns true if the data is loaded.
   * Useful to avoid UI blinking during data loading.
   * @returns {boolean}
   */
  isReady() {
    return this.props.adminSmtpSettingsContext.isDataReady();
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
    const settings = this.props.adminSmtpSettingsContext.getCurrentSmtpSettings();
    const errors = this.props.adminSmtpSettingsContext.getErrors();
    return (
      <div className="grid grid-responsive-12">
        <div className="row">
          <div className="third-party-provider-settings smtp-settings col8 main-column">
            <h3><Trans>Email server</Trans></h3>
            {this.isReady() && !settings?.provider &&
              <>
                <h4 className="no-border"><Trans>Select a provider</Trans></h4>
                <div className="provider-list">
                  {SmtpProviders.map(provider =>
                    <div key={provider.id} className="provider button" id={provider.id} onClick={() => this.props.adminSmtpSettingsContext.changeProvider(provider)}>
                      <div className="provider-logo">
                        {provider.id === "other" &&
                          <Icon name="envelope"/>
                        }
                        {provider.id !== "other" &&
                          <img src={`${this.props.context.trustedDomain}/img/third_party/${provider.icon}`}/>
                        }
                      </div>
                      <p className="provider-name">{provider.name}</p>
                    </div>
                  )}
                </div>
              </>
            }
            {this.isReady() && settings?.provider &&
              <>
                {this.shouldShowSourceWarningMessage() &&
                  <div className="warning message">
                    <Trans><b>Warning:</b> These are the settings provided by a configuration file. If you save it, will ignore the settings on file and use the ones from the database.</Trans>
                  </div>
                }
                <form className="form">
                  <h4 className="no-border"><Trans>SMTP server configuration</Trans></h4>
                  <div className={`select-wrapper input required ${this.isProcessing() ? 'disabled' : ''}`}>
                    <label htmlFor="smtp-settings-form-provider"><Trans>Email provider</Trans></label>
                    <Select id="smtp-settings-form-provider" name="provider" items={this.providerList} value={settings.provider.id} onChange={this.handleProviderChange} disabled={this.isProcessing()}/>
                  </div>
                  <div className={`select-wrapper input required ${this.isProcessing() ? 'disabled' : ''}`}>
                    <label htmlFor="smtp-settings-form-authentication-method"><Trans>Authentication method</Trans></label>
                    <Select id="smtp-settings-form-authentication-method" name="authentication-method" items={this.authenticationMethodList} value={this.authenticationMethod} onChange={this.handleAuthenticationMethodChange} disabled={this.isProcessing()}/>
                  </div>
                  {this.shouldDisplayUsername() &&
                    <div className={`input text ${errors.username ? "error" : ""} ${this.isProcessing() ? 'disabled' : ''}`}>
                      <label htmlFor="smtp-settings-form-username"><Trans>Username</Trans></label>
                      <input id="smtp-settings-form-username" ref={this.usernameFieldRef} name="username" className="fluid" maxLength="256" type="text"
                        autoComplete="off" value={settings.username} onChange={this.handleInputChange} placeholder={this.translate("Username")}
                        disabled={this.isProcessing()}/>
                      {errors.username &&
                        <div className="error-message">{errors.username}</div>
                      }
                    </div>
                  }
                  {this.shouldDisplayPassword() &&
                    <div className={`input-password-wrapper input ${errors.password ? "error" : ""} ${this.isProcessing() ? 'disabled' : ''}`}>
                      <label htmlFor="smtp-settings-form-password"><Trans>Password</Trans></label>
                      <Password id="smtp-settings-form-password"
                        name="password"
                        autoComplete="new-password"
                        placeholder={this.translate("Password")}
                        preview={true}
                        value={settings.password}
                        onChange={this.handleInputChange}
                        disabled={this.isProcessing()}
                        inputRef={this.passwordFieldRef}/>
                      {errors.password &&
                        <div className="password error-message">{errors.password}</div>
                      }
                    </div>
                  }
                  <div className="accordion-header">
                    <button type="button" className="link no-border" onClick={this.handleAdvancedSettingsToggle}>
                      <Icon name={this.state.showAdvancedSettings ? "caret-down" : "caret-right"}/><Trans>Advanced settings</Trans>
                    </button>
                  </div>
                  {this.state.showAdvancedSettings &&
                    <div className="advanced-settings">
                      <div className={`input text required ${errors.host ? "error" : ""} ${this.isProcessing() ? 'disabled' : ''}`}>
                        <label htmlFor="smtp-settings-form-host"><Trans>SMTP host</Trans></label>
                        <input id="smtp-settings-form-host" ref={this.hostFieldRef} name="host" aria-required={true} className="fluid" maxLength="256" type="text"
                          autoComplete="off" value={settings.host} onChange={this.handleInputChange} placeholder={this.translate("SMTP server address")}
                          disabled={this.isProcessing()}/>
                        {errors.host &&
                        <div className="error-message">{errors.host}</div>
                        }
                      </div>
                      <div className={`input text required ${errors.tls ? "error" : ""} ${this.isProcessing() ? 'disabled' : ''}`}>
                        <label htmlFor="smtp-settings-form-tls"><Trans>Use TLS</Trans></label>
                        <Select id="smtp-settings-form-tls" name="tls" items={this.tlsSelectList} value={settings.tls} onChange={this.handleInputChange} disabled={this.isProcessing()}/>
                      </div>
                      <div className={`input text required ${errors.port ? "error" : ""} ${this.isProcessing() ? 'disabled' : ''}`}>
                        <label htmlFor="smtp-settings-form-port"><Trans>Port</Trans></label>
                        <input id="smtp-settings-form-port" aria-required={true} ref={this.portFieldRef} name="port" className="fluid" maxLength="256" type="text"
                          autoComplete="off" value={settings.port} onChange={this.handleInputChange} placeholder={this.translate("Port number")}
                          disabled={this.isProcessing()}/>
                        {errors.port &&
                        <div className="error-message">{errors.port}</div>
                        }
                      </div>
                      <div className={`input text ${errors.client ? "error" : ""} ${this.isProcessing() ? 'disabled' : ''}`}>
                        <label htmlFor="smtp-settings-form-client"><Trans>SMTP client</Trans></label>
                        <input id="smtp-settings-form-client" ref={this.clientFieldRef} name="client" maxLength="2048" type="text"
                          autoComplete="off" value={settings.client} onChange={this.handleInputChange} placeholder={this.translate("SMTP client address")}
                          disabled={this.isProcessing()}/>
                        {errors.client &&
                          <div className="error-message">{errors.client}</div>
                        }
                      </div>
                    </div>
                  }
                  <h4><Trans>Sender configuration</Trans></h4>
                  <div className={`input text required ${errors.sender_name ? "error" : ""} ${this.isProcessing() ? 'disabled' : ''}`}>
                    <label htmlFor="smtp-settings-form-sender-name"><Trans>Sender name</Trans></label>
                    <input id="smtp-settings-form-sender-name" ref={this.senderNameFieldRef} name="sender_name" aria-required={true} className="fluid" maxLength="256" type="text"
                      autoComplete="off" value={settings.sender_name} onChange={this.handleInputChange} placeholder={this.translate("Sender name")}
                      disabled={this.isProcessing()}/>
                    {errors.sender_name &&
                    <div className="error-message">{errors.sender_name}</div>
                    }
                    <p>
                      <Trans>This is the name users will see in their mailbox when passbolt sends a notification.</Trans>
                    </p>
                  </div>
                  <div className={`input text required ${errors.sender_email ? "error" : ""} ${this.isProcessing() ? 'disabled' : ''}`}>
                    <label htmlFor="smtp-settings-form-sender-name"><Trans>Sender email</Trans></label>
                    <input id="smtp-settings-form-sender-email" ref={this.senderEmailFieldRef} name="sender_email" aria-required={true} className="fluid" maxLength="256" type="text"
                      autoComplete="off" value={settings.sender_email} onChange={this.handleInputChange} placeholder={this.translate("Sender email")}
                      disabled={this.isProcessing()}/>
                    {errors.sender_email &&
                    <div className="error-message">{errors.sender_email}</div>
                    }
                    <p>
                      <Trans>This is the email address users will see in their mail box when passbolt sends a notification.<br/>It&apos;s a good practice to provide a working email address that users can reply to.</Trans>
                    </p>
                  </div>
                </form>
              </>
            }
          </div>
          <div className="col4 last">
            <div className="sidebar-help">
              <h3><Trans>Why do I need an SMTP server?</Trans></h3>
              <p><Trans>Passbolt needs an smtp server in order to send invitation emails after an account creation and to send email notifications.</Trans></p>
              <a className="button" href="https://help.passbolt.com/configure/email/setup" target="_blank" rel="noopener noreferrer">
                <Icon name="document"/>
                <span><Trans>Read the documentation</Trans></span>
              </a>
            </div>
            {settings?.provider && settings?.provider.id !== "other" &&
            <div className="sidebar-help">
              <h3><Trans>How do I configure a {settings.provider.name} SMTP server?</Trans></h3>
              <a className="button" href={settings.provider.help_page} target="_blank" rel="noopener noreferrer">
                <Icon name="link"/>
                <span><Trans>See the {settings.provider.name} documentation</Trans></span>
              </a>
            </div>
            }
            {settings?.provider && (settings.provider.id === "google-mail" || settings.provider.id === "google-workspace") &&
            <div className="sidebar-help">
              <h3><Trans>Why shouldn&apos;t I use my login password ?</Trans></h3>
              <p><Trans>In order to use the &quot;Username & Password&quot; authentication method with Google, you will need to enable MFA on your Google Account. The password should not be your login password, you have to create an &quot;App Password&quot; generated by Google.. However, the email remain the same.</Trans></p>
              <a className="button" href="https://support.google.com/mail/answer/185833" target="_blank" rel="noopener noreferrer">
                <Icon name="document"/>
                <span><Trans>More informations</Trans></span>
              </a>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

ManageSmtpAdministrationSettings.propTypes = {
  context: PropTypes.object, // Application context
  dialogContext: PropTypes.any, // The dialog context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminSmtpSettingsContext: PropTypes.object, // The administration SMTP settings context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdminSmtpSettings(withDialog(withAdministrationWorkspace(withTranslation('common')(ManageSmtpAdministrationSettings)))));
