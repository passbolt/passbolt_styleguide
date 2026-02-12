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
 * @since         4.2.0
 */

import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import PasswordPoliciesDto from "../../../../shared/models/passwordPolicies/PasswordPoliciesDto";
import PasswordPoliciesViewModel from "../../../../shared/models/passwordPolicies/PasswordPoliciesViewModel";
import { withTranslation } from "react-i18next";
import { MASKS, SecretGeneratorComplexity } from "../../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";

const PASSBOLT_MINIMAL_ENTROPY_REQUIREMENT = 80;
const PASSBOLT_MINIMAL_ENTROPY_ADVISED = 112;

/**
 * The Administration Password policies Context
 * @type {React.Context<Object>}
 */
export const AdminPasswordPoliciesContext = React.createContext({
  getSettings: () => {}, // Returns settings for UI changes
  getSettingsErrors: () => {}, // Returns settings for UI changes
  setSettings: () => {}, // Set settings for UI changes
  hasSettingsChanges: () => {}, // Check if the policies have changes
  findSettings: () => {}, // Find the current self registraiton settings and store it in the state
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  isDataValid: () => {}, // returns true if the password policies setting data is valid
  clearContext: () => {}, // put the data to its default state value
  save: () => {}, // Save settings,
  validateData: () => {}, // returns true if the password policies setting data is valid
  getPasswordGeneratorMasks: () => {}, // returns all the available password masks
  getEntropyForPassphraseConfiguration: () => {}, //returns the maximum entropy a secret can be with the current passphrase default configuration.
  getEntropyForPasswordConfiguration: () => {}, //returns the maximum entropy a secret can be with the current password default configuration.
  getMinimalRequiredEntropy: () => {}, //returns the minimal entropy a generator must follow that Passbolt requires
  getMinimalAdvisedEntropy: () => {}, //returns the minimal entropy advised by Passbolt to have a secredt considered strong
  isSourceChanging: () => {}, //returns true if the source of the configuration was 'env'
});

/**
 * The Administration password policies context provider
 */
export class AdminPasswordPoliciesContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.hasDataBeenValidated = false;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      settings: new PasswordPoliciesViewModel(),
      errors: {}, // the error message for each erroneous field
      currentSettings: new PasswordPoliciesViewModel(), // The current settings
      processing: true, // Context is processing data
      getSettings: this.getSettings.bind(this), // Returns settings for UI changes
      getSettingsErrors: this.getSettingsErrors.bind(this), // Returns settings for UI changes
      setSettings: this.setSettings.bind(this), // Set settings for UI changes
      findSettings: this.findSettings.bind(this), // Find the current self registraiton settings and store it in the state
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // Check if setting has changes
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this),
      clearContext: this.clearContext.bind(this), // put the data to its default state value
      save: this.save.bind(this), // Save the policies changes
      validateData: this.validateData.bind(this), // returns true if the password policies setting data is valid
      getPasswordGeneratorMasks: this.getPasswordGeneratorMasks.bind(this), // returns all the available password masks
      getEntropyForPassphraseConfiguration: this.getEntropyForPassphraseConfiguration.bind(this), //returns the maximum entropy a secret can be with the current passphrase default configuration.
      getEntropyForPasswordConfiguration: this.getEntropyForPasswordConfiguration.bind(this), //returns the maximum entropy a secret can be with the current password default configuration.
      getMinimalRequiredEntropy: this.getMinimalRequiredEntropy.bind(this), //returns the minimal entropy a generator must follow that Passbolt requires
      getMinimalAdvisedEntropy: this.getMinimalAdvisedEntropy.bind(this), //returns the minimal entropy advised by Passbolt to have a secredt considered strong
      isSourceChanging: this.isSourceChanging.bind(this), //returns true if the source of the configuration was 'env'
    };
  }

  /**
   * Find the self registration settings
   * @return {Promise<void>}
   */
  async findSettings(callback = () => {}) {
    this.setProcessing(true);
    const result = await this.props.context.port.request("passbolt.password-policies.get-admin-settings");
    const currentSettings = new PasswordPoliciesViewModel(result);
    //Init saved setting
    this.setState({ currentSettings, settings: currentSettings }, callback);
    this.setProcessing(false);
  }

  /**
   * Returns true if the password policies data is valid.
   * @returns {boolean}
   */
  validateData() {
    this.hasDataBeenValidated = true;
    let isValid = true;
    const errors = {};
    const settings = this.state.settings;
    const hasAtLeast1MaskActivated =
      settings.mask_upper ||
      settings.mask_lower ||
      settings.mask_digit ||
      settings.mask_parenthesis ||
      settings.mask_char1 ||
      settings.mask_char2 ||
      settings.mask_char3 ||
      settings.mask_char4 ||
      settings.mask_char5 ||
      settings.mask_emoji;

    if (!hasAtLeast1MaskActivated) {
      isValid = false;
      errors.masks = this.props.t("At least 1 set of characters must be selected");
    }

    if (settings.passwordLength < 8) {
      isValid = false;
      errors.passwordLength = this.props.t("The password length must be set to 8 at least");
    }

    if (settings.wordsCount < 4) {
      isValid = false;
      errors.wordsCount = this.props.t("The passphrase word count must be set to 4 at least");
    }

    if (settings.wordsSeparator.length > 10) {
      isValid = false;
      errors.wordsSeparator = this.props.t("The words separator should be at a maximum of 10 characters long");
    }

    const minimalEntropyRequired = this.getMinimalRequiredEntropy();
    if (this.getEntropyForPassphraseConfiguration() < minimalEntropyRequired) {
      isValid = false;
      errors.passphraseMinimalRequiredEntropy = this.props.t(
        "The passphrase generator will not generate strong enough passphrase. Minimum of {{minimum}}bits is required",
        { minimum: minimalEntropyRequired },
      );
    }

    if (this.getEntropyForPasswordConfiguration() < minimalEntropyRequired) {
      isValid = false;
      errors.passwordMinimalRequiredEntropy = this.props.t(
        "The password generator will not generate strong enough password. Minimum of {{minimum}}bits is required",
        { minimum: minimalEntropyRequired },
      );
    }
    this.setState({ errors });
    return isValid;
  }

  /**
   * Returns the maximum entropy a secret can be with the current passphrase default configuration.
   * @returns {number}
   */
  getEntropyForPassphraseConfiguration() {
    const settings = this.getSettings();
    return SecretGeneratorComplexity.entropyPassphrase(settings.wordsCount, settings.wordsSeparator);
  }

  /**
   * Returns the maximum entropy a secret can be with the current password default configuration.
   * @returns {number}
   */
  getEntropyForPasswordConfiguration() {
    const passwordPoliciesDto = new PasswordPoliciesDto(this.getSettings());
    const passwordGeneratorSettings = passwordPoliciesDto.password_generator_settings;
    return SecretGeneratorComplexity.evaluateMaxPasswordEntropy(passwordGeneratorSettings);
  }

  /**
   * Returns all the available password masks.
   * @returns {Object}
   */
  getPasswordGeneratorMasks() {
    return MASKS;
  }

  /**
   * Returns the minimal entropy a generator must follow that Passbolt requires
   * @returns {number};
   */
  getMinimalRequiredEntropy() {
    return PASSBOLT_MINIMAL_ENTROPY_REQUIREMENT;
  }

  /**
   * Returns the minimal entropy advised by Passbolt to have a secredt considered strong
   * @returns {number};
   */
  getMinimalAdvisedEntropy() {
    return PASSBOLT_MINIMAL_ENTROPY_ADVISED;
  }

  /**
   * Whenever the save has been requested
   * @returns {Promise<void>}
   */
  async save() {
    this.setProcessing(true);
    try {
      const newSettings = new PasswordPoliciesDto(this.state.settings);
      const result = await this.props.context.port.request("passbolt.password-policies.save", newSettings);
      const currentSettings = new PasswordPoliciesViewModel(result);
      this.setState({ currentSettings, settings: currentSettings });
    } finally {
      this.setProcessing(false);
    }
  }

  /**
   * Returns the settings that have been fetch previously.
   * @returns {object}
   */
  getSettings() {
    return this.state.settings;
  }

  /**
   * Returns the settings error from the latest data validation.
   * @returns {object}
   */
  getSettingsErrors() {
    return this.state.errors;
  }

  /**
   * Handle settings changes.
   * @param {string} key the name of the changed field
   * @param {*} value the new value to set
   * @returns {void}
   */
  setSettings(key, value) {
    const newSettings = Object.assign({}, this.state.settings, { [key]: value });
    this.setState({ settings: newSettings }, () => {
      if (this.hasDataBeenValidated) {
        this.validateData();
      }
    });
  }

  /**
   * Returns true when the data is under processing
   * @returns {boolean}
   *
   */
  isProcessing() {
    return this.state.processing;
  }

  /**
   * Handle processing change.
   * @param {Boolean} processing value
   * @returns {void}
   */
  setProcessing(processing) {
    this.setState({ processing });
  }

  /**
   * Check if there are changes to apply
   * @returns {Boolean}
   */
  hasSettingsChanges() {
    return JSON.stringify(this.state.currentSettings) !== JSON.stringify(this.state.settings);
  }

  /**
   * Returns true if the source of the configuration was 'env'
   * @returns {Boolean}
   */
  isSourceChanging() {
    return this.state.currentSettings?.source !== "db" && this.state.currentSettings?.source !== "default";
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const { currentSettings, settings, processing } = this.defaultState;
    this.setState({
      currentSettings,
      settings,
      processing,
    });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminPasswordPoliciesContext.Provider value={this.state}>
        {this.props.children}
      </AdminPasswordPoliciesContext.Provider>
    );
  }
}

AdminPasswordPoliciesContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
  actionFeedbackContext: PropTypes.object, // The action feedback context
};

export default withAppContext(withTranslation("common")(AdminPasswordPoliciesContextProvider));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminPasswordPolicies(WrappedComponent) {
  return class WithAdminPasswordPolicies extends React.Component {
    render() {
      return (
        <AdminPasswordPoliciesContext.Consumer>
          {(adminPasswordPoliciesContext) => (
            <WrappedComponent adminPasswordPoliciesContext={adminPasswordPoliciesContext} {...this.props} />
          )}
        </AdminPasswordPoliciesContext.Consumer>
      );
    }
  };
}
