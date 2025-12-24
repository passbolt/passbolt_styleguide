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
import NotifyError from "../components/Common/Error/NotifyError/NotifyError";
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import { withDialog } from "./DialogContext";
import { withTranslation } from "react-i18next";
import { withActionFeedback } from "./ActionFeedbackContext";
import SsoProviders from "../components/Administration/ManageSsoSettings/SsoProviders.data";
import TestSsoSettingsDialog from "../components/Administration/TestSsoSettingsDialog/TestSsoSettingsDialog";
import ConfirmDeleteSsoSettingsDialog from "../components/Administration/ConfirmDeleteSsoSettingsDialog/ConfirmDeleteSsoSettingsDialog";
import AzureSsoSettingsEntity from "../../shared/models/entity/ssoSettings/AzureSsoSettingsEntity";
import AzureSsoSettingsViewModel from "../../shared/models/ssoSettings/AzureSsoSettingsViewModel";
import OAuth2SsoSettingsEntity from "../../shared/models/entity/ssoSettings/OAuth2SsoSettingsEntity";
import OAuth2SsoSettingsViewModel from "../../shared/models/ssoSettings/OAuth2SsoSettingsViewModel";
import GoogleSsoSettingsEntity from "../../shared/models/entity/ssoSettings/GoogleSsoSettingsEntity";
import GoogleSsoSettingsViewModel from "../../shared/models/ssoSettings/GoogleSsoSettingsViewModel";
import AdfsSsoSettingsEntity from "../../shared/models/entity/ssoSettings/AdfsSsoSettingsEntity";
import AdfsSsoSettingsViewModel from "../../shared/models/ssoSettings/AdfsSsoSettingsViewModel";

export const AdminSsoContext = React.createContext({
  ssoConfig: null, // The current sso configuration
  canDeleteSettings: () => {}, // Returns true if it is possible to call for a settings deletion
  isProcessing: () => {}, // true when the form is being processed
  loadSsoConfiguration: () => {}, // Load the current sso configuration and store it in the state
  getSsoConfiguration: () => {}, // Return the current sso configuration from the context state
  getProviderList: () => {}, // Returns a list of the available providers on the API
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
    this.shouldFocusOnError = false;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      ssoConfig: null, // The current sso configuration
      providers: [], // The list of the current available providers on the API.
      errors: null,
      originalConfig: null, // the current configuration from the API
      cachedSsoConfig: {}, // The currently cached SSO configuration,
      isLoaded: false, // is the SSO settings data loading from the server finished
      processing: false, // true when the form is being processed
      hasBeenValidated: false, // true when the has been validated once but not submitted
      hasFormChanged: this.hasFormChanged.bind(this), // Returns true if the current form changed
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      isDataReady: this.isDataReady.bind(this), // returns true if the data has been loaded from the API already
      loadSsoConfiguration: this.loadSsoConfiguration.bind(this), // Load the current sso configuration and store it in the state
      getSsoConfiguration: this.getSsoConfiguration.bind(this), // Return the current sso configuration from the context state
      getProviderList: this.getProviderList.bind(this), // Returns a list of the available providers on the API
      isSsoConfigActivated: this.isSsoConfigActivated.bind(this), // Returns true if the sso settings are set to active
      changeProvider: this.changeProvider.bind(this), // change the provider
      disableSso: this.disableSso.bind(this), // Disable the SSO configuration
      setValue: this.setValue.bind(this), // Set an SSO settings value to the current config
      validateData: this.validateData.bind(this), // Validates the current data in the state
      saveAndTestConfiguration: this.saveAndTestConfiguration.bind(this), // Saves the current settings as a new draft and run the test dialog
      handleError: this.handleError.bind(this), // Handles error by displaying a NotifyError dialog
      getErrors: this.getErrors.bind(this), // Returns the errors detected during validation
      deleteSettings: this.deleteSettings.bind(this), // Delete the current SSO settings
      canDeleteSettings: this.canDeleteSettings.bind(this), // Returns true if it is possible to call for a settings deletion
      showDeleteConfirmationDialog: this.showDeleteConfirmationDialog.bind(this), // Show the delete SSO settings confirmation dialog
      consumeFocusOnError: this.consumeFocusOnError.bind(this), // Returns true the first time it is asked after a form validation process detected an error
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
      this.props.dialogContext.open(NotifyError, { error });
      return;
    }

    this.isSsoConfigExisting = Boolean(ssoConfig.provider);
    const registeredConfig = this.getSsoProviderViewModel(ssoConfig);

    this.setState({
      ssoConfig: registeredConfig,
      originalConfig: registeredConfig,
      providers: ssoConfig.providers,
      isLoaded: true,
    });
  }

  /**
   * Constructor
   * @param {SsoSettingsDto} settings
   * @returns {SsoSettingsViewModel}
   */
  getSsoProviderViewModel(settings) {
    if (!settings?.provider) {
      return null;
    }

    switch (settings.provider) {
      case AzureSsoSettingsEntity.PROVIDER_ID: {
        return AzureSsoSettingsViewModel.fromEntityDto(settings);
      }
      case GoogleSsoSettingsEntity.PROVIDER_ID: {
        return GoogleSsoSettingsViewModel.fromEntityDto(settings);
      }
      case OAuth2SsoSettingsEntity.PROVIDER_ID: {
        return OAuth2SsoSettingsViewModel.fromEntityDto(settings);
      }
      case AdfsSsoSettingsEntity.PROVIDER_ID: {
        return AdfsSsoSettingsViewModel.fromEntityDto(settings);
      }
    }

    return null;
  }

  /**
   * Get the current sso config from the context's state.
   * @returns {Object}
   */
  getSsoConfiguration() {
    return this.state.ssoConfig;
  }

  /**
   * Returns a list of the available providers on the API.
   * @returns {Array<string>}
   */
  getProviderList() {
    return this.state.providers;
  }

  /**
   * Get the current SSO configuration with data ready for the background page.
   * @return {Object}
   * @private
   */
  getSsoConfigurationDto() {
    return this.state.ssoConfig.toEntityDto();
  }

  /**
   * Returns true if the sso settings are set to active.
   * @returns {boolean}
   */
  isSsoConfigActivated() {
    return Boolean(this.state.ssoConfig);
  }

  /**
   * Returns true if the current form changed
   * @returns {boolean}
   */
  hasFormChanged() {
    return (
      (this.state.originalConfig !== null && this.state.ssoConfig === null) ||
      (this.state.originalConfig === null && this.state.ssoConfig !== null) ||
      this.state.originalConfig?.isDataDifferent(this.state.ssoConfig)
    );
  }

  /**
   * Set an SSO settings value to the current config
   * @param {string} key
   * @param {string} value
   */
  setValue(key, value) {
    const ssoConfig = this.state.ssoConfig.cloneWithMutation(key, value);

    this.setState({ ssoConfig }, () => {
      if (this.state.hasBeenValidated) {
        this.validateData();
      }
    });
  }

  /**
   * Disable the Sso configuration.
   */
  disableSso() {
    const cachedSsoConfig = this.state.cachedSsoConfig;
    cachedSsoConfig[this.state.ssoConfig.provider] = this.state.ssoConfig;
    const ssoConfig = null;
    this.setState({ ssoConfig, cachedSsoConfig });
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

    const cachedSsoConfig = this.state.cachedSsoConfig;
    const currentProviderConfig = this.state.ssoConfig?.provider;
    if (currentProviderConfig) {
      cachedSsoConfig[currentProviderConfig] = this.state.ssoConfig;
    }

    this.setState(
      {
        ssoConfig: this.getCachedSsoConfigOrDefault(provider.id),
        cachedSsoConfig,
      },
      () => {
        if (this.state.hasBeenValidated) {
          this.validateData();
        }
      },
    );
  }

  /**
   * For the given provider returns the SSO config cached or the default configuration if none exists yet.
   * @param {string} providerId
   * @returns {SsoSettingsViewModel}
   */
  getCachedSsoConfigOrDefault(providerId) {
    if (this.state.cachedSsoConfig[providerId]) {
      return this.state.cachedSsoConfig[providerId];
    }

    const defaultProviderConfiguration = SsoProviders.find((provider) => provider.id === providerId);
    const entityDto = {
      id: this.state.ssoConfig?.id,
      provider: providerId,
      data: defaultProviderConfiguration.defaultConfig,
    };
    return this.getSsoProviderViewModel(entityDto);
  }

  /**
   * Validates the current data in the state
   * @param {boolean} applyFieldFocusOnError if true a focus on the first erroneous field will be asked
   * @returns {boolean} true if the data is valid, false otherwise
   */
  validateData(applyFieldFocusOnError = false) {
    const validattionError = this.state.ssoConfig.validate();
    const hasErrors = validattionError.hasErrors();
    const errors = hasErrors ? validattionError : null;
    this.setState({ errors, hasBeenValidated: true });
    this.shouldFocusOnError = applyFieldFocusOnError && hasErrors;
    return !hasErrors;
  }

  /**
   * Returns true the first time it is asked after a form validation process detected an error
   * @returns {boolean}
   */
  consumeFocusOnError() {
    const doFocusOnError = this.shouldFocusOnError;
    this.shouldFocusOnError = false;
    return doFocusOnError;
  }

  /**
   * Returns the error set during validation.
   * @returns {EntityValidationError}
   */
  getErrors() {
    return this.state.errors;
  }

  /**
   * Saves the current settings as a new draft and run the test dialog
   */
  async saveAndTestConfiguration() {
    this.setState({ processing: true });
    const ssoSettings = this.getSsoConfigurationDto();

    let draftConfiguration;
    try {
      draftConfiguration = await this.props.context.port.request("passbolt.sso.save-draft", ssoSettings);
    } catch (e) {
      this.handleError(e);
      this.setState({ processing: false });
      return;
    }

    await this.runTestConfig(draftConfiguration);
    const ssoConfig = this.getSsoProviderViewModel(draftConfiguration);
    this.setState({ ssoConfig });
  }

  /**
   * Returns true if a SSo configuration exist on the API and the user disabled the settings.
   * @returns {boolean}
   */
  canDeleteSettings() {
    return this.isSsoConfigExisting && this.state.ssoConfig === null;
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
    this.setState({ processing: true });
    try {
      const ssoSettingsId = this.state.originalConfig.id;
      await this.props.context.port.request("passbolt.sso.delete-settings", ssoSettingsId);
      this.props.actionFeedbackContext.displaySuccess(this.props.t("The SSO settings have been deleted successfully"));
      this.isSsoConfigExisting = false;
      this.setState({
        ssoConfig: null,
        originalConfig: null,
        processing: false,
      });
    } catch (e) {
      this.handleError(e);
      this.setState({ processing: false });
    }
  }

  /**
   * Opens the test SSO settings dialog
   *
   * @param {SsoConfigurationDto} draftConfiguration
   */
  async runTestConfig(draftConfiguration) {
    const selectedProvider = SsoProviders.find((provider) => provider.id === draftConfiguration.provider);
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
    this.setState({ processing: false });
  }

  /**
   * Handles the UI processing after a successful settings activation
   */
  handleSettingsActivation() {
    this.isSsoConfigExisting = true;
    this.setState({ originalConfig: this.state.ssoConfig });
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
    return <AdminSsoContext.Provider value={this.state}>{this.props.children}</AdminSsoContext.Provider>;
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
export default withAppContext(withActionFeedback(withDialog(withTranslation("common")(AdminSsoContextProvider))));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminSso(WrappedComponent) {
  return class WithAdminSso extends React.Component {
    render() {
      return (
        <AdminSsoContext.Consumer>
          {(adminSsoContext) => <WrappedComponent adminSsoContext={adminSsoContext} {...this.props} />}
        </AdminSsoContext.Consumer>
      );
    }
  };
}
