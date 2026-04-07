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
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import FindSmtpSettingsService from "../../shared/services/smtpSettings/findSmtpSettingsService";
import SaveSmtpSettingsService from "../../shared/services/smtpSettings/saveSmtpSettingsService";
import SmtpSettingsEntity from "../../shared/models/entity/smtpSettings/smtpSettingsEntity";
import SmtpSettingsFormEntity from "../../shared/models/entity/smtpSettings/smtpSettingsFormEntity";
import SendTestSmtpSettingsService from "../../shared/services/smtpSettings/sendTestSmtpSettingsService";
import SmtpProviders from "../components/Administration/ManageSmtpAdministrationSettings/SmtpProviders.data";
import { withDialog } from "./DialogContext";
import NotifyError from "../components/Common/Error/NotifyError/NotifyError";
import { withActionFeedback } from "./ActionFeedbackContext";
import { withTranslation } from "react-i18next";
import memoize from "memoize-one";

export const AdminSmtpSettingsContext = React.createContext({
  getCurrentSmtpSettings: () => {}, // Returns the current SMTP settings
  findSmtpSettings: () => {}, // Find the current smtp settings and store it in the state
  changeProvider: () => {}, // Handles change of provider
  changeAuthenticationMethod: () => {}, // Change the authentication method
  getAuthenticationMethod: () => {}, // Returns the current authentication method
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
    this.findSmtpSettingsService = new FindSmtpSettingsService(apiClientOptions);
    this.saveSmtpSettingsService = new SaveSmtpSettingsService(apiClientOptions);
    this.sendTestSmtpSettingsService = new SendTestSmtpSettingsService(apiClientOptions);
    this.fieldToFocus = null;
    this.providerHasChanged = false;
    this.originalSettings = null;
    this.formSettings = null;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      settings: {},
      isLoaded: false,
      processing: false,
      hasAlreadyBeenValidated: false,
      getCurrentSmtpSettings: this.getCurrentSmtpSettings.bind(this), // returns the SMTP settings
      findSmtpSettings: this.findSmtpSettings.bind(this), // Find the SMTP settings and store it in the state
      changeProvider: this.changeProvider.bind(this), // Handles change of provider
      changeAuthenticationMethod: this.changeAuthenticationMethod.bind(this), // Change the authentication method
      getAuthenticationMethod: this.getAuthenticationMethod.bind(this), // Returns the current authentication method
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
   * Memoized form validation. Re-computes only when the settings DTO changes.
   * @type {function}
   */
  validateForm = memoize(
    (
      settingsDto, // eslint-disable-line no-unused-vars
    ) => this.formSettings?.validate({ validateBuildRules: { siteSettings: this.props.context.siteSettings } }),
  );

  /**
   * Memoized change detection. Re-computes only when entities or DTO change.
   * @type {function}
   */

  hasSettingsChanges = memoize(
    (originalDto, formDto) => this.originalSettings?.hasDiffProps(this.formSettings) || false, // eslint-disable-line no-unused-vars
  );

  /**
   * Find the SMTP settings
   * @return {Promise<SmtpSettingsModel> | null}
   */
  async findSmtpSettings() {
    if (!this.props.context.siteSettings.canIUse("smtpSettings")) {
      return null;
    }

    let dto;

    try {
      const smtpEntity = await this.findSmtpSettingsService.find();
      dto = smtpEntity.toDto();
      dto.client = dto.client ?? "";
      dto.username = dto.username ?? null;
      dto.password = dto.password ?? null;
    } catch (e) {
      // In case of error, the user should still be able to update the settings.
      this.handleError(e);
      dto = SmtpSettingsFormEntity.createDefault().toFormDto();
    }

    dto.sender_email = dto.sender_email ?? this.props.context.loggedInUser.username;

    this.originalSettings = new SmtpSettingsFormEntity(dto, { validate: false });

    // Detect provider
    const originalDto = this.originalSettings.toFormDto();
    if (originalDto.host && originalDto.port) {
      const providerId = this.originalSettings.detectProvider(SmtpProviders);
      this.originalSettings.set("provider", providerId, { validate: false });
    }

    this.formSettings = new SmtpSettingsFormEntity(this.originalSettings.toDto(), { validate: false });
    this.setState({ settings: this.formSettings.toFormDto(), isLoaded: true });
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    this.originalSettings = null;
    this.formSettings = null;
    const { settings, isLoaded, processing, hasAlreadyBeenValidated } = this.defaultState;
    this.setState({
      settings,
      isLoaded,
      processing,
      hasAlreadyBeenValidated,
    });
  }

  /**
   * Register the settings against the API
   * @returns {Promise<void>}
   */
  async saveSmtpSettings() {
    this.setState({ processing: true });
    try {
      const apiDto = this.formSettings.toApiDto();
      const smtpSettingsEntity = SmtpSettingsEntity.createFromSettings(apiDto);
      await this.saveSmtpSettingsService.save(smtpSettingsEntity);
      this.props.actionFeedbackContext.displaySuccess(this.props.t("The SMTP settings have been saved successfully"));
      this.originalSettings = new SmtpSettingsFormEntity(this.formSettings.toDto(), { validate: false });
      this.setState({ settings: this.formSettings.toFormDto() });
    } catch (e) {
      this.handleError(e);
    } finally {
      this.setState({ processing: false });
    }
  }

  /**
   * Send a call to the API in order to send a test email
   * @returns {Promise<object>}
   */
  async sendTestMailTo(recipient) {
    const apiDto = this.formSettings.toApiDto();
    const smtpSettingsEntity = SmtpSettingsEntity.createFromSettings(apiDto);
    return await this.sendTestSmtpSettingsService.send(smtpSettingsEntity, recipient);
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
   * Change the authentication method.
   * @param {string} method The authentication method constant.
   */
  changeAuthenticationMethod(method) {
    this.formSettings.changeAuthenticationMethod(method);
    // Re-detect provider after auth method change
    const providerId = this.formSettings.detectProvider(SmtpProviders);
    this.formSettings.set("provider", providerId, { validate: false });
    this.setState({ settings: this.formSettings.toFormDto() });
    if (this.state.hasAlreadyBeenValidated) {
      this.validateData({ setFocus: false });
    }
  }

  /**
   * Returns the current authentication method.
   * @returns {string|null}
   */
  getAuthenticationMethod() {
    return this.formSettings?.getAuthenticationMethod() ?? null;
  }

  /**
   * Handle change of provider.
   * @param {object} provider The provider object from SmtpProviders.
   */
  changeProvider(provider) {
    const currentProviderId = this.formSettings?.toFormDto()?.provider;
    if (provider.id !== currentProviderId) {
      this.providerHasChanged = true;
      this.formSettings.applyProviderDefaults(provider);
      // Reset OAuth auth method when switching away from Office 365
      if (
        provider.id !== "office-365" &&
        this.formSettings.getAuthenticationMethod() === SmtpSettingsFormEntity.AUTHENTICATION_METHOD_OAUTH
      ) {
        this.formSettings.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_USERNAME_PASSWORD);
      }
      this.setState({ settings: this.formSettings.toFormDto() });
    }
  }

  /**
   * Set a given state field of this context.
   * @param {object} data Settings data to update as key value object.
   */
  setData(data) {
    for (const key in data) {
      this.formSettings.set(key, data[key], { validate: false });
    }
    // Re-detect provider after any data change
    const providerId = this.formSettings.detectProvider(SmtpProviders);
    this.formSettings.set("provider", providerId, { validate: false });
    // Reset OAuth auth method when provider is no longer Office 365
    if (
      providerId !== "office-365" &&
      this.formSettings.getAuthenticationMethod() === SmtpSettingsFormEntity.AUTHENTICATION_METHOD_OAUTH
    ) {
      this.formSettings.changeAuthenticationMethod(SmtpSettingsFormEntity.AUTHENTICATION_METHOD_USERNAME_PASSWORD);
    }

    this.setState({ settings: this.formSettings.toFormDto() });
    if (this.state.hasAlreadyBeenValidated) {
      this.validateData({ setFocus: false });
    }
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
   * Returns true if the current settings has been modified
   * @returns {boolean}
   */
  isSettingsModified() {
    return this.hasSettingsChanges(this.originalSettings?.toFormDto(), this.formSettings?.toFormDto());
  }

  /**
   * Returns all the errors found during the validation step
   * @returns {EntityValidationError|null}
   */
  getErrors() {
    if (!this.state.hasAlreadyBeenValidated) {
      return null;
    }
    return this.validateForm(this.state.settings);
  }

  /**
   * Validates the current data in the state
   * @returns {boolean} true if the data is valid, false otherwise
   */
  validateData({ setFocus = true } = {}) {
    const validationError = this.validateForm(this.state.settings);
    const isFormValid = !validationError;

    if (!isFormValid && setFocus) {
      const fieldPriority = [
        "username",
        "password",
        "oauth_username",
        "tenant_id",
        "client_id",
        "client_secret",
        "host",
        "tls",
        "port",
        "client",
        "sender_name",
        "sender_email",
      ];
      this.fieldToFocus = fieldPriority.find((field) => validationError.hasError(field));
    }

    this.setState({ hasAlreadyBeenValidated: true });
    return isFormValid;
  }

  /**
   * Returns the current SMTP settings that have been fetch previously.
   * @returns {object}
   */
  getCurrentSmtpSettings() {
    return this.state.settings;
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
    this.props.dialogContext.open(NotifyError, { error });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminSmtpSettingsContext.Provider value={this.state}>{this.props.children}</AdminSmtpSettingsContext.Provider>
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
export default withAppContext(
  withDialog(withActionFeedback(withTranslation("common")(AdminSmtpSettingsContextProvider))),
);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminSmtpSettings(WrappedComponent) {
  return class WithAdminSmtpSettings extends React.Component {
    render() {
      return (
        <AdminSmtpSettingsContext.Consumer>
          {(adminSmtpSettingsContext) => (
            <WrappedComponent adminSmtpSettingsContext={adminSmtpSettingsContext} {...this.props} />
          )}
        </AdminSmtpSettingsContext.Consumer>
      );
    }
  };
}
