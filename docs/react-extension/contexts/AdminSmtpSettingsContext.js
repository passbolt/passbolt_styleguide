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
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import SmtpSettingsModel from "../../shared/models/smtpSettings/SmtpSettingsModel";
import SmtpTestSettingsModel from "../../shared/models/smtpSettings/SmtpTestSettingsModel";
import SmtpProviders from "../components/Administration/ManageSmtpAdministrationSettings/SmtpProviders.data";
import {withDialog} from "./DialogContext";
import NotifyError from "../components/Common/Error/NotifyError/NotifyError";
import {withActionFeedback} from "./ActionFeedbackContext";
import {withTranslation} from "react-i18next";
import DomainUtil from "../lib/Domain/DomainUtil";
import AppEmailValidatorService from "../../shared/services/validator/AppEmailValidatorService";

export const AdminSmtpSettingsContext = React.createContext({
  getCurrentSmtpSettings: () => {}, // Returns the current SMTP settings
  findSmtpSettings: () => {}, // Find the current smtp settings and store it in the state
  changeProvider: () => {}, // Handles change of provider
  setData: () => {}, // Set a field of the form
  isSettingsModified: () => {}, // returns settingsModified state
  isSettingsValid: () => {}, // returns true if the current form data is valid
  getErrors: () => {}, // returns all the detected form errors
  validateData: () => {}, // validates the current data
  getFieldToFocus: () => {}, // return the field name to be focused on
  saveSmtpSettings: () => {}, // calls the service to save the settings currently set in the state
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  hasProviderChanged: () => {}, // returns true if the last state change is a provider change
  sendTestMailTo: () => {}, // calls the service to run a "send test email"
  isDataReady: () => {}, // returns true when the data is loaded for the server
  clearContext: () => {}, // put the data to its default state value
});

/**
 * The related context provider
 */
export class AdminSmtpSettingsContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.smtpSettingsModel = new SmtpSettingsModel(apiClientOptions);
    this.smtpTestSettingsModel = new SmtpTestSettingsModel(apiClientOptions); ///smtp/email.json
    this.fieldToFocus = null;
    this.providerHasChanged = false;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      settingsModified: false,
      currentSmtpSettings: { // The current SMTP settings
        provider: null,
        username: "",
        password: "",
        host: "",
        tls: true,
        port: "",
        client: "",
        sender_email: "",
        sender_name: "Passbolt",
      },
      errors: {},
      isLoaded: false,
      processing: false,
      hasSumittedForm: false,
      getCurrentSmtpSettings: this.getCurrentSmtpSettings.bind(this), // returns the SMTP settings
      findSmtpSettings: this.findSmtpSettings.bind(this), // Find the SMTP settings and store it in the state
      changeProvider: this.changeProvider.bind(this), // Handles change of provider
      setData: this.setData.bind(this), // Set a field of the form
      isSettingsModified: this.isSettingsModified.bind(this),
      getErrors: this.getErrors.bind(this),
      validateData: this.validateData.bind(this),
      getFieldToFocus: this.getFieldToFocus.bind(this),
      saveSmtpSettings: this.saveSmtpSettings.bind(this),
      isProcessing: this.isProcessing.bind(this),
      hasProviderChanged: this.hasProviderChanged.bind(this),
      sendTestMailTo: this.sendTestMailTo.bind(this),
      isDataReady: this.isDataReady.bind(this),
      clearContext: this.clearContext.bind(this),
    };
  }

  /**
   * Find the SMTP settings
   * @return {Promise<void>}
   */
  async findSmtpSettings() {
    if (!this.props.context.siteSettings.canIUse('smtpSettings')) {
      return;
    }

    let currentSmtpSettings = this.state.currentSmtpSettings;

    try {
      currentSmtpSettings = await this.smtpSettingsModel.findSmtpSettings();
      this.setState({currentSmtpSettings, isLoaded: true});
    } catch (e) {
      // In case of error, the user should still be able to update the settings.
      this.handleError(e);
    }

    if (!currentSmtpSettings.sender_email) {
      currentSmtpSettings.sender_email = this.props.context.loggedInUser.username;
    }
    if (currentSmtpSettings.host && currentSmtpSettings.port) {
      currentSmtpSettings.provider = this.detectProvider(currentSmtpSettings);
    }

    this.setState({currentSmtpSettings, isLoaded: true});
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {settingsModified, currentSmtpSettings, errors, isLoaded, processing, hasSumittedForm} = this.defaultState;
    this.setState({
      settingsModified, currentSmtpSettings, errors, isLoaded, processing, hasSumittedForm
    });
  }

  /**
   * Register the settings against the API
   * @returns {Promise<void>}
   */
  async saveSmtpSettings() {
    this._doProcess(async() => {
      try {
        const dto = {...this.state.currentSmtpSettings};
        delete dto.provider;
        dto.client = dto.client || null;
        await this.smtpSettingsModel.saveSmtpSettings(dto);
        this.props.actionFeedbackContext.displaySuccess(this.props.t("The SMTP settings have been saved successfully"));
        const newSettings = Object.assign({}, this.state.currentSmtpSettings, {"source": "db"});
        this.setState({currentSmtpSettings: newSettings});
      } catch (e) {
        this.handleError(e);
      }
    });
  }

  /**
   * Send a call to the API in order to send a test email
   * @returns {Promise<object>}
   */
  async sendTestMailTo(recipient) {
    return await this.smtpTestSettingsModel.sendTestEmail(this.getCurrentSmtpSettings(), recipient);
  }

  /**
   * Run the given callback by ensuring the "processing" state is handled properly.
   * @returns {Promise<void>}
   */
  _doProcess(callback) {
    this.setState({processing: true}, async() => {
      await callback();
      this.setState({processing: false});
    });
  }

  /**
   * Returns true if the provider field has been changed (if asked a second time in a row, it returns false).
   * @returns {boolean}
   */
  hasProviderChanged() {
    const hasChanged = this.providerHasChanged;
    this.providerHasChanged = false;
    return hasChanged;
  }

  /**
   * Handle change of provider.
   * @param {object} provider
   */
  changeProvider(provider) {
    if (provider.id !== this.state.currentSmtpSettings.provider?.id) {
      this.providerHasChanged = true;
      this.setState({
        settingsModified: true,
        currentSmtpSettings: {
          ...this.state.currentSmtpSettings,
          ...provider.defaultConfiguration,
          provider: provider
        }
      });
    }
  }

  /**
   * Set a given state field of this context.
   * @param {object} data Settings data to update as key value object.
   */
  setData(data) {
    const newSettings = Object.assign({}, this.state.currentSmtpSettings, data);
    const newState = {
      currentSmtpSettings: {
        ...newSettings,
        provider: this.detectProvider(newSettings)
      },
      settingsModified: true
    };

    this.setState(newState);
    if (this.state.hasSumittedForm) {
      this.validateData(newSettings);
    }
  }

  /**
   * Returns a provider based on the current configuration or the provider "other" if none detected
   * @param {object} settings the settings from which to detect the provider
   * @returns {object}
   */
  detectProvider(settings) {
    for (let i = 0; i < SmtpProviders.length; i++) {
      const provider = SmtpProviders[i];
      const foundConfiguration = provider.availableConfigurations.find(config =>
        config.host === settings.host
        && config.port === parseInt(settings.port, 10)
        && config.tls === settings.tls
      );

      if (foundConfiguration) {
        return provider;
      }
    }
    return SmtpProviders.find(provider => provider.id === "other");
  }

  /**
   * Returns true when the data is loaded from the server
   * @returns {boolean}
   */
  isDataReady() {
    return this.state.isLoaded;
  }

  /**
   * Returns true when the data is under processing
   * @returns {boolean}
   */
  isProcessing() {
    return this.state.processing;
  }

  /**
   * Returns true if the current settings has been modified in the state
   * @returns {boolean}
   */
  isSettingsModified() {
    return this.state.settingsModified;
  }

  /**
   * Returns all the errors found during the validation step
   * @returns {object}
   */
  getErrors() {
    return this.state.errors;
  }

  /**
   * Validates the current data in the state
   * @param {object} settings (Optional) The settings to validate, if not provided use the settings from the state.
   * @returns {boolean} true if the data is valid, false otherwise
   */
  validateData(settings) {
    settings = settings || this.state.currentSmtpSettings;
    const errors = {};

    let isFormValid = true;
    isFormValid = this.validate_host(settings.host, errors) && isFormValid;
    isFormValid = this.validate_sender_email(settings.sender_email, errors) && isFormValid;
    isFormValid = this.validate_sender_name(settings.sender_name, errors) && isFormValid;
    isFormValid = this.validate_username(settings.username, errors) && isFormValid;
    isFormValid = this.validate_password(settings.password, errors) && isFormValid;
    isFormValid = this.validate_port(settings.port, errors) && isFormValid;
    isFormValid = this.validate_tls(settings.tls, errors) && isFormValid;
    isFormValid = this.validate_client(settings.client, errors) && isFormValid;

    if (!isFormValid) {
      this.fieldToFocus = this.getFirstFieldInError(errors, ["username", "password", "host", "tls", "port", "client", "sender_name", "sender_email"]);
    }

    this.setState({errors, hasSumittedForm: true});

    return isFormValid;
  }

  /**
   * Returns true if the host value is valid
   * @param {string} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validate_host(data, errors) {
    if (typeof data !== "string") {
      errors.host = this.props.t("SMTP Host must be a valid string");
      return false;
    }

    if (data.length === 0) {
      errors.host = this.props.t("SMTP Host is required");
      return false;
    }
    return true;
  }

  /**
   * Returns true if the client value is valid
   * @param {string|null} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validate_client(data, errors) {
    if (data.length === 0 || (DomainUtil.isValidHostname(data) && data.length <= 2048)) {
      return true;
    }
    errors.client = this.props.t("SMTP client should be a valid domain or IP address");
    return false;
  }

  /**
   * Returns true if the sender_email value is valid
   * @param {string} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validate_sender_email(data, errors) {
    if (typeof data !== "string") {
      errors.sender_email = this.props.t("Sender email must be a valid email");
      return false;
    }

    if (data.length === 0) {
      errors.sender_email = this.props.t("Sender email is required");
      return false;
    }

    if (!AppEmailValidatorService.validate(data, this.props.context.siteSettings)) {
      errors.sender_email = this.props.t("Sender email must be a valid email");
      return false;
    }

    return true;
  }

  /**
   * Returns true if the sender_name value is valid
   * @param {string} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validate_sender_name(data, errors) {
    if (typeof data !== "string") {
      errors.sender_name = this.props.t("Sender name must be a valid string");
      return false;
    }

    if (data.length === 0) {
      errors.sender_name = this.props.t("Sender name is required");
      return false;
    }

    return true;
  }

  /**
   * Returns true if the username value is valid
   * @param {string|null} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validate_username(data, errors) {
    if (data === null) {
      return true;
    }
    if (typeof data !== "string") {
      errors.username = this.props.t("Username must be a valid string");
      return false;
    }

    return true;
  }

  /**
   * Returns true if the password value is valid
   * @param {string|null} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validate_password(data, errors) {
    if (data === null) {
      return true;
    }
    if (typeof data !== "string") {
      errors.password = this.props.t("Password must be a valid string");
      return false;
    }

    return true;
  }

  /**
   * Returns true if the tls value is valid
   * @param {string} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validate_tls(data, errors) {
    if (typeof data !== "boolean") {
      errors.tls = this.props.t("TLS must be set to 'Yes' or 'No'");
      return false;
    }

    return true;
  }

  /**
   * Returns true if the port value is valid
   * @param {string} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validate_port(data, errors) {
    const portNum = parseInt(data, 10);
    if (isNaN(portNum)) {
      errors.port = this.props.t("Port must be a valid number");
      return false;
    }

    if (portNum < 1 || portNum > 65535) {
      errors.port = this.props.t("Port must be a number between 1 and 65535");
      return false;
    }

    return true;
  }

  /**
   * Returns the first field with an error (first in the given list)
   * @param {object} errors a ref object to put the validation onto
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
   * Returns the current SMTP settings that have been fetch previously.
   * @returns {object}
   */
  getCurrentSmtpSettings() {
    return this.state.currentSmtpSettings;
  }

  /**
   * Returns the field name to focus on (if called twice in a row, the second time will return null).
   * @returns {string}
   */
  getFieldToFocus() {
    const field = this.fieldToFocus;
    this.fieldToFocus = null;
    return field;
  }

  /**
   * Handle exception by displaying a pop-up containing the details of the error.
   * @param {Error} error
   */
  handleError(error) {
    console.error(error);
    this.props.dialogContext.open(NotifyError, {error});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminSmtpSettingsContext.Provider value={this.state}>
        {this.props.children}
      </AdminSmtpSettingsContext.Provider>
    );
  }
}

AdminSmtpSettingsContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  children: PropTypes.any, // The children components
  t: PropTypes.func, // The translation function
};
export default withAppContext(withDialog(withActionFeedback(withTranslation("common")(AdminSmtpSettingsContextProvider))));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminSmtpSettings(WrappedComponent) {
  return class WithAdminSmtpSettings extends React.Component {
    render() {
      return (
        <AdminSmtpSettingsContext.Consumer>
          {
            adminSmtpSettingsContext => <WrappedComponent adminSmtpSettingsContext={adminSmtpSettingsContext} {...this.props} />
          }
        </AdminSmtpSettingsContext.Consumer>
      );
    }
  };
}
