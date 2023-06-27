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
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import SsoProviders from "../components/Administration/ManageSsoSettings/SsoProviders.data";
import {withDialog} from "./DialogContext";
import NotifyError from "../components/Common/Error/NotifyError/NotifyError";
import {withTranslation} from "react-i18next";
import TestSsoSettingsDialog from "../components/Administration/TestSsoSettingsDialog/TestSsoSettingsDialog";
import ConfirmDeleteSsoSettingsDialog from "../components/Administration/ConfirmDeleteSsoSettingsDialog/ConfirmDeleteSsoSettingsDialog";
import {withActionFeedback} from "./ActionFeedbackContext";

// taken from Validator.isUUID()
const UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;

export const AdminSsoContext = React.createContext({
  ssoConfig: null, // The current sso configuration
  canDeleteSettings: () => {}, // Returns true if it is possible to call for a settings deletion
  isProcessing: () => {}, // true when the form is being processed
  loadSsoConfiguration: () => {}, // Load the current sso configuration and store it in the state
  getSsoConfiguration: () => {}, // Return the current sso configuration from the context state
  isSsoConfigActivated: () => {}, // Returns true if the sso settings are set to active
  isDataReady: () => {}, // Returns true if the data has been loaded from the API already
  save: () => {}, // Save the sso configuration changes
  disableSso: () => {}, // Disable the SSO configuration
  hasFormChanged: () => {}, // Returns true if the current form changed
  validateData: () => {}, // Validates the current data in the state
  saveAndTestConfiguration: () => {}, // Saves the current settings as a new draft and run the test dialog
  openTestDialog: () => {}, // Opens the test SSO settings dialog
  handleError: () => {}, // Handles error by displaying a NotifyError dialog
  getErrors: () => {}, // Returns the errors detected during validation
  deleteSettings: () => {}, // Delete the current SSO settings
  showDeleteConfirmationDialog: () => {}, // Show the delete SSO settings confirmation dialog
  shouldFocusOnError: () => {}, // Returns true the first time it is asked after a form validation process detected an error
});

/**
 * The related context provider
 */
export class AdminSsoContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.isSsoConfigExisting = false;
    this.hasError = false;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      ssoConfig: this.defaultSsoSettings, // The current sso configuration
      errors: {}, // The errors detected during the data validation
      isLoaded: false, // is the SSO settings data loading from the server finished
      hasSettingsChanged: false, // has the current form changed
      processing: false, // true when the form is being processed
      getErrors: this.getErrors.bind(this), // Returns the errors detected during validation
      hasFormChanged: this.hasFormChanged.bind(this), // Returns true if the current form changed
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      isDataReady: this.isDataReady.bind(this), // returns true if the data has been loaded from the API already
      loadSsoConfiguration: this.loadSsoConfiguration.bind(this), // Load the current sso configuration and store it in the state
      getSsoConfiguration: this.getSsoConfiguration.bind(this), // Return the current sso configuration from the context state
      isSsoConfigActivated: this.isSsoConfigActivated.bind(this), // Returns true if the sso settings are set to active
      changeProvider: this.changeProvider.bind(this), // change the provider
      disableSso: this.disableSso.bind(this), // Disable the SSO configuration
      setValue: this.setValue.bind(this), // Set an SSO settings value to the current config
      validateData: this.validateData.bind(this), // Validates the current data in the state
      saveAndTestConfiguration: this.saveAndTestConfiguration.bind(this), // Saves the current settings as a new draft and run the test dialog
      handleError: this.handleError.bind(this), // Handles error by displaying a NotifyError dialog
      deleteSettings: this.deleteSettings.bind(this), // Delete the current SSO settings
      canDeleteSettings: this.canDeleteSettings.bind(this), // Returns true if it is possible to call for a settings deletion
      showDeleteConfirmationDialog: this.showDeleteConfirmationDialog.bind(this), // Show the delete SSO settings confirmation dialog
      shouldFocusOnError: this.shouldFocusOnError.bind(this), // Returns true the first time it is asked after a form validation process detected an error
    };
  }

  /**
   * Returns a default empty SSO settings.
   * @returns {object}
   */
  get defaultSsoSettings() {
    return {
      provider: null,
      data: {
        url: "",
        client_id: "",
        tenant_id: "",
        client_secret: "",
        client_secret_expiry: "",
        prompt: "login",
        email_claim: "email",
      }
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTestConfigCloseDialog = this.handleTestConfigCloseDialog.bind(this); // Handles the closing of the SSO test configuration dialog
    this.handleSettingsActivation = this.handleSettingsActivation.bind(this); // Handles the UI processing after a successful settings activation
  }

  /**
   * Find the sso configuration
   * @return {Promise<void>}
   */
  async loadSsoConfiguration() {
    let ssoConfig = null;
    try {
      ssoConfig = await this.props.context.port.request("passbolt.sso.get-current");
    } catch (error) {
      this.props.dialogContext.open(NotifyError, {error});
    }

    this.isSsoConfigExisting = Boolean(ssoConfig?.provider);

    this.setState({
      ssoConfig: ssoConfig,
      isLoaded: true,
    });
  }

  /**
   * Returns true if an SSO settings exists
   * @returns {boolean}
   */
  isSsoSettingsExisting() {
    return this.state.ssoConfig?.provider;
  }

  /**
   * Get the current sso config from the context's state.
   * @returns {Object}
   */
  getSsoConfiguration() {
    return this.state.ssoConfig;
  }

  /**
   * Get the current SSO configuration with data ready for the background page.
   * @return {Object}
   * @private
   */
  getSsoConfigurationDto() {
    const config = this.getSsoConfiguration();
    return {
      provider: config.provider,
      data: Object.assign({}, config.data),
    };
  }

  /**
   * Returns true if the sso settings are set to active.
   * @returns {boolean}
   */
  isSsoConfigActivated() {
    return Boolean(this.state.ssoConfig?.provider);
  }

  /**
   * Returns true if the current form changed
   * @returns {boolean}
   */
  hasFormChanged() {
    return this.state.hasSettingsChanged;
  }

  /**
   * Set an SSO settings value to the current config
   * @param {string} key
   * @param {string} value
   */
  setValue(key, value) {
    const ssoConfig = this.getSsoConfiguration();
    ssoConfig.data[key] = value;
    this.setState({ssoConfig, hasSettingsChanged: true});
  }

  /**
   * Disable the Sso configuration.
   */
  disableSso() {
    const ssoConfig = Object.assign({}, this.state.ssoConfig, {provider: null, data: {}});
    this.setState({ssoConfig});
  }

  /**
   * Returns true if the data has finished to be loaded from the server.
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
   * Change the currently selected provider.
   */
  changeProvider(provider) {
    if (provider.disabled) {
      return;
    }

    const selectedProvider = SsoProviders.find(p => p.id === provider.id);

    this.setState({
      ssoConfig: {
        provider: selectedProvider.id,
        data: Object.assign({}, selectedProvider?.defaultConfig)
      }
    });
  }

  /**
   * Returns the errors detected during validation
   * @returns {object}
   */
  getErrors() {
    return this.state.errors;
  }

  /**
   * Validates the current data in the state
   * @returns {boolean} true if the data is valid, false otherwise
   */
  validateData() {
    const settings = this.state.getSsoConfiguration();
    const errors = {};

    const isProviderValid = this.validate_provider(settings.provider, errors);

    if (!isProviderValid) {
      this.setState({errors, hasSumittedForm: true});
      return false;
    }

    const validationCallback = `validateDataFromProvider_${settings.provider}`;
    const isFormValid = this[validationCallback](settings.data, errors);

    this.setState({errors, hasSumittedForm: true});

    return isFormValid;
  }

  /**
   * Validates the current data in the state.
   * @param {string} provider the provider id to validate
   * @param {object} errors a ref object to put the validation onto
   */
  validate_provider(provider, errors) {
    const isProviderValid = SsoProviders.find(p => p.id === provider);

    if (!isProviderValid) {
      errors.provider = this.props.t("The Single Sign-On provider must be a supported provider.");
    }

    return isProviderValid;
  }

  /**
   * Validates the current data in the state assuming the SSO provider is Azure
   * @param {string} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validateDataFromProvider_azure(data, errors) {
    const {url, client_id, tenant_id, client_secret, client_secret_expiry} = data;
    let isDataValid = true;
    if (!url?.length) { // Validation of url
      errors.url = this.props.t("The Login URL is required");
      isDataValid = false;
    } else if (!this.isValidUrl(url)) {
      errors.url = this.props.t("The Login URL must be a valid URL");
      isDataValid = false;
    }

    if (!client_id?.length) { // Validation of client_id
      errors.client_id = this.props.t("The Application (client) ID is required");
      isDataValid = false;
    } else if (!this.isValidUuid(client_id)) {
      errors.client_id = this.props.t("The Application (client) ID must be a valid UUID");
      isDataValid = false;
    }

    if (!tenant_id?.length) { // Validation of tenant_id
      errors.tenant_id = this.props.t("The Directory (tenant) ID is required");
      isDataValid = false;
    } else if (!this.isValidUuid(tenant_id)) {
      errors.tenant_id = this.props.t("The Directory (tenant) ID must be a valid UUID");
      isDataValid = false;
    }

    // Validation of client_secret
    if (!client_secret?.length) {
      errors.client_secret = this.props.t("The Secret is required");
      isDataValid = false;
    }

    // Validation of client_secret_expiry
    if (!client_secret_expiry) {
      errors.client_secret_expiry = this.props.t("The Secret expiry is required");
      isDataValid = false;
    }

    this.hasError = true;
    return isDataValid;
  }

  /**
   * Validates the current data in the state assuming the SSO provider is Azure
   * @param {string} data the data to validate
   * @param {object} errors a ref object to put the validation onto
   * @returns {boolean}
   */
  validateDataFromProvider_google(data, errors) {
    const {client_id, client_secret} = data;
    let isDataValid = true;
    if (!client_id?.length) { // Validation of client_id
      errors.client_id = this.props.t("The Application (client) ID is required");
      isDataValid = false;
    }

    // Validation of client_secret
    if (!client_secret?.length) {
      errors.client_secret = this.props.t("The Secret is required");
      isDataValid = false;
    }

    this.hasError = true;
    return isDataValid;
  }

  /**
   * Returns true the first time it is asked after a form validation process detected an error
   * @returns {boolean}
   */
  shouldFocusOnError() {
    const hasError = this.hasError;
    this.hasError = false;
    return hasError;
  }

  /**
   * Returns true if the url is valid;
   * @param {string} stringUrl
   */
  isValidUrl(stringUrl) {
    try {
      const url = new URL(stringUrl);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  }

  /**
   * Returns true if the UUID is valid;
   * @param {string} stringUuid
   */
  isValidUuid(stringUuid) {
    return UUID_REGEXP.test(stringUuid);
  }

  /**
   * Saves the current settings as a new draft and run the test dialog
   */
  async saveAndTestConfiguration() {
    this.setState({processing: true});
    const ssoSettings = this.getSsoConfigurationDto();

    let draftConfiguration;
    try {
      draftConfiguration = await this.props.context.port.request("passbolt.sso.save-draft", ssoSettings);
    } catch (e) {
      this.handleError(e);
      this.setState({processing: false});
      return;
    }

    await this.runTestConfig(draftConfiguration);
    const ssoConfig = Object.assign({}, this.state.ssoConfig, draftConfiguration);
    this.setState({ssoConfig});
  }

  /**
   * Returns true if a SSo configuration exist on the API and the user disabled the settings.
   * @returns {boolean}
   */
  canDeleteSettings() {
    const config = this.getSsoConfiguration();
    return this.isSsoConfigExisting && config.provider === null;
  }

  /**
   * Show the delete settings confirmation dialog.
   */
  showDeleteConfirmationDialog() {
    this.props.dialogContext.open(ConfirmDeleteSsoSettingsDialog);
  }

  /**
   * Delete the current SSO settings.
   * @return {Promise<void>}
   */
  async deleteSettings() {
    this.setState({processing: true});
    try {
      const ssoSettings = this.getSsoConfiguration();
      await this.props.context.port.request("passbolt.sso.delete-settings", ssoSettings.id);
      this.props.actionFeedbackContext.displaySuccess(this.props.t("The SSO settings has been deleted successfully"));
      this.isSsoConfigExisting = false;
      this.setState({
        ssoConfig: this.defaultSsoSettings,
        processing: false,
      });
    } catch (e) {
      this.handleError(e);
      this.setState({processing: false});
    }
  }

  /**
   * Opens the test SSO settings dialog
   *
   * @param {SsoConfigurationDto} draftConfiguration
   */
  async runTestConfig(draftConfiguration) {
    const selectedProvider = SsoProviders.find(provider => provider.id === draftConfiguration.provider);
    this.props.dialogContext.open(TestSsoSettingsDialog, {
      provider: selectedProvider,
      configurationId: draftConfiguration.id,
      handleClose: this.handleTestConfigCloseDialog,
      onSuccessfulSettingsActivation: this.handleSettingsActivation,
    });
  }

  /**
   * Handles the closing of the SSO test configuration dialog
   */
  handleTestConfigCloseDialog() {
    this.setState({processing: false});
  }

  /**
   * Handles the UI processing after a successful settings activation
   */
  handleSettingsActivation() {
    this.setState({hasSettingsChanged: false});
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
      <AdminSsoContext.Provider value={this.state}>
        {this.props.children}
      </AdminSsoContext.Provider>
    );
  }
}

AdminSsoContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  accountRecoveryContext: PropTypes.object, // The account recovery context
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};
export default withAppContext(withActionFeedback(withDialog(withTranslation('common')(AdminSsoContextProvider))));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminSso(WrappedComponent) {
  return class WithAdminSso extends React.Component {
    render() {
      return (
        <AdminSsoContext.Consumer>
          {
            adminSsoContext => <WrappedComponent adminSsoContext={adminSsoContext} {...this.props} />
          }
        </AdminSsoContext.Consumer>
      );
    }
  };
}
