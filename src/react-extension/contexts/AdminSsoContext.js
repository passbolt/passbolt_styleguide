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
import AzureSsoSettingsFormEntity from "../../shared/models/entity/ssoSettings/AzureSsoSettingsFormEntity";
import OAuth2SsoSettingsEntity from "../../shared/models/entity/ssoSettings/OAuth2SsoSettingsEntity";
import OAuth2SsoSettingsFormEntity from "../../shared/models/entity/ssoSettings/OAuth2SsoSettingsFormEntity";
import GoogleSsoSettingsEntity from "../../shared/models/entity/ssoSettings/GoogleSsoSettingsEntity";
import GoogleSsoSettingsFormEntity from "../../shared/models/entity/ssoSettings/GoogleSsoSettingsFormEntity";
import AdfsSsoSettingsEntity from "../../shared/models/entity/ssoSettings/AdfsSsoSettingsEntity";
import AdfsSsoSettingsFormEntity from "../../shared/models/entity/ssoSettings/AdfsSsoSettingsFormEntity";
import PingOneSsoSettingsEntity from "../../shared/models/entity/ssoSettings/PingOneSsoSettingsEntity";
import PingOneSsoSettingsFormEntity from "../../shared/models/entity/ssoSettings/PingOneSsoSettingsFormEntity";
import memoize from "memoize-one";

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
    this.formSettings = null;
    this.originalSettings = null;
    this.cachedSsoConfig = {};
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      ssoConfig: null, // The current sso configuration DTO
      providers: [], // The list of the current available providers on the API.
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
   * Memoized form validation. Re-computes only when the settings DTO changes.
   * @type {function}
   */
  validateForm = memoize(
    (
      ssoConfigDto, // eslint-disable-line no-unused-vars
    ) => this.formSettings?.validate(),
  );

  /**
   * Memoized change detection. Re-computes only when entities or DTO change.
   * @type {function}
   */
  hasSettingsChanges = memoize(
    (originalDto, formDto) => this.originalSettings?.hasDiffProps(this.formSettings) || false, // eslint-disable-line no-unused-vars
  );

  /**
   * Returns the current sso config DTO for state synchronization.
   * @returns {object|null}
   * @private
   */
  getSsoConfigDto() {
    if (!this.formSettings) {
      return null;
    }
    return { provider: this.formSettings.provider, ...this.formSettings.toFormDto() };
  }

  /**
   * Find the sso configuration
   * @return {Promise<Object>}
   */
  async loadSsoConfiguration() {
    let ssoConfig = null;
    try {
      ssoConfig = await this.props.context.port.request("passbolt.sso.get-current");
    } catch (error) {
      this.props.dialogContext.open(NotifyError, { error });
      return {};
    }

    this.isSsoConfigExisting = Boolean(ssoConfig.provider);
    this.formSettings = this.getSsoProviderFormEntity(ssoConfig);
    this.originalSettings = this.getSsoProviderFormEntity(ssoConfig);

    this.setState({
      ssoConfig: this.getSsoConfigDto(),
      providers: ssoConfig.providers,
      isLoaded: true,
    });
    return ssoConfig;
  }

  /**
   * Returns the form entity matching the given SSO settings provider.
   * @param {object} settings
   * @returns {EntityV2|null}
   */
  getSsoProviderFormEntity(settings) {
    if (!settings?.provider) {
      return null;
    }

    switch (settings.provider) {
      case AzureSsoSettingsEntity.PROVIDER_ID: {
        return AzureSsoSettingsFormEntity.fromEntityDto(settings);
      }
      case GoogleSsoSettingsEntity.PROVIDER_ID: {
        return GoogleSsoSettingsFormEntity.fromEntityDto(settings);
      }
      case OAuth2SsoSettingsEntity.PROVIDER_ID: {
        return OAuth2SsoSettingsFormEntity.fromEntityDto(settings);
      }
      case AdfsSsoSettingsEntity.PROVIDER_ID: {
        return AdfsSsoSettingsFormEntity.fromEntityDto(settings);
      }
      case PingOneSsoSettingsEntity.PROVIDER_ID: {
        return PingOneSsoSettingsFormEntity.fromEntityDto(settings);
      }
    }

    return null;
  }

  /**
   * Get the current sso config from the context's state.
   * @returns {object}
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
   * @return {object}
   * @private
   */
  getSsoConfigurationDto() {
    return this.formSettings.toEntityDto();
  }

  /**
   * Returns true if the sso settings are set to active.
   * @returns {boolean}
   */
  isSsoConfigActivated() {
    return Boolean(this.formSettings);
  }

  /**
   * Returns true if the current form changed
   * @returns {boolean}
   */
  hasFormChanged() {
    if (this.originalSettings && this.formSettings) {
      return this.hasSettingsChanges(this.originalSettings.toFormDto(), this.formSettings.toFormDto());
    }

    return (
      (this.originalSettings !== null && this.formSettings === null) ||
      (this.originalSettings === null && this.formSettings !== null)
    );
  }

  /**
   * Set an SSO settings value to the current config
   * @param {string} key
   * @param {string} value
   */
  setValue(key, value) {
    this.formSettings.set(key, value, { validate: false });

    this.setState({ ssoConfig: this.getSsoConfigDto() }, () => {
      if (this.state.hasBeenValidated) {
        this.validateData();
      }
    });
  }

  /**
   * Disable the Sso configuration.
   */
  disableSso() {
    if (this.formSettings) {
      this.cachedSsoConfig[this.formSettings.provider] = this.formSettings;
    }
    this.formSettings = null;
    this.setState({ ssoConfig: null });
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

    if (this.formSettings?.provider) {
      this.cachedSsoConfig[this.formSettings.provider] = this.formSettings;
    }

    this.formSettings = this.getCachedSsoConfigOrDefault(provider.id);

    this.setState(
      {
        ssoConfig: this.getSsoConfigDto(),
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
   * @returns {EntityV2}
   */
  getCachedSsoConfigOrDefault(providerId) {
    if (this.cachedSsoConfig[providerId]) {
      return this.cachedSsoConfig[providerId];
    }

    const defaultProviderConfiguration = SsoProviders.find((provider) => provider.id === providerId);
    const entityDto = {
      id: this.formSettings?.id,
      provider: providerId,
      data: defaultProviderConfiguration.defaultConfig,
    };
    return this.getSsoProviderFormEntity(entityDto);
  }

  /**
   * Validates the current data in the state
   * @param {boolean} applyFieldFocusOnError if true a focus on the first erroneous field will be asked
   * @returns {boolean} true if the data is valid, false otherwise
   */
  validateData(applyFieldFocusOnError = false) {
    const validationError = this.validateForm(this.state.ssoConfig);
    const hasErrors = Boolean(validationError?.hasErrors());
    this.shouldFocusOnError = applyFieldFocusOnError && hasErrors;
    this.setState({ hasBeenValidated: true });
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
   * @returns {EntityValidationError|null}
   */
  getErrors() {
    if (!this.state.hasBeenValidated) {
      return null;
    }
    return this.validateForm(this.state.ssoConfig);
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
    this.formSettings = this.getSsoProviderFormEntity(draftConfiguration);
    this.setState({ ssoConfig: this.getSsoConfigDto() });
  }

  /**
   * Returns true if a SSo configuration exist on the API and the user disabled the settings.
   * @returns {boolean}
   */
  canDeleteSettings() {
    return this.isSsoConfigExisting && this.formSettings === null;
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
      await this.props.context.port.request("passbolt.sso.delete-settings", this.originalSettings.id);
      this.props.actionFeedbackContext.displaySuccess(this.props.t("The SSO settings have been deleted successfully"));
      this.isSsoConfigExisting = false;
      this.formSettings = null;
      this.originalSettings = null;
      this.setState({
        ssoConfig: null,
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
   * @param {object} draftConfiguration
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
    this.originalSettings = this.getSsoProviderFormEntity({
      id: this.formSettings.id,
      provider: this.formSettings.provider,
      data: this.formSettings.toFormDto(),
    });
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
