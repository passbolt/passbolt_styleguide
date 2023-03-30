/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import PasswordPolicyDto from "../../../../shared/models/passwordPolicy/PasswordPolicyDto";
import PasswordPolicyService from "../../../../shared/services/api/passwordPolicy/PasswordPolicyService";
import PasswordPolicyViewModel from "../../../../shared/models/passwordPolicy/PasswordPolicyViewModel";
import {withTranslation} from "react-i18next";

/**
 * The Administration Password policy Context
 * @type {React.Context<Object>}
 */
export const AdminPasswordPolicyContext = React.createContext({
  getSettings: () => {}, // Returns settings for UI changes
  getSettingsErrors: () => {}, // Returns settings for UI changes
  setSettings: () => {}, // Set settings for UI changes
  hasSettingsChanges: () => {}, // Check if the policy has changes
  findSettings: () => {}, // Find the current self registraiton settings and store it in the state
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  isDataValid: () => {}, // returns true if the password policies setting data is valid
  clearContext: () => {}, // put the data to its default state value
  resetSettings: () => {}, // reset settings
  save: () => {}, // Save settings,
  validateData: () => {}, // returns true if the password policies setting data is valid
});

/**
 * The Administration password policy context provider
 */
export class AdminPasswordPolicyContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.passwordPolicyService = new PasswordPolicyService(apiClientOptions);
    this.hasDataBeenValidated = false;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      settings: new PasswordPolicyViewModel(),
      errors: {}, // the error message for each erroneous field
      currentSettings: new PasswordPolicyViewModel(), // The current settings
      processing: true, // Context is processing data
      getSettings: this.getSettings.bind(this), // Returns settings for UI changes
      getSettingsErrors: this.getSettingsErrors.bind(this), // Returns settings for UI changes
      setSettings: this.setSettings.bind(this), // Set settings for UI changes
      findSettings: this.findSettings.bind(this), // Find the current self registraiton settings and store it in the state
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // Check if setting has changes
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this),
      clearContext: this.clearContext.bind(this), // put the data to its default state value
      save: this.save.bind(this), // Save the policy changes
      resetSettings: this.resetSettings.bind(this), // reset settings
      validateData: this.validateData.bind(this), // returns true if the password policies setting data is valid
    };
  }

  /**
   * Find the self registration settings
   * @return {Promise<void>}
   */
  async findSettings(callback = () => {}) {
    this.setProcessing(true);
    const result = await this.passwordPolicyService.find();
    const currentSettings = new PasswordPolicyViewModel(result);
    //Init saved setting
    this.setState({currentSettings, settings: currentSettings}, callback);
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
    const hasAtLeast1MaskActivated = settings.upper ||
      settings.lower ||
      settings.digit ||
      settings.special_char1 ||
      settings.parenthesis ||
      settings.special_char2 ||
      settings.special_char3 ||
      settings.special_char4 ||
      settings.special_char5 ||
      settings.emoji;

    if (!hasAtLeast1MaskActivated) {
      isValid = false;
      errors.masks = this.props.t("At least 1 set of characters must be selected");
    }

    if (settings.passwordLength < 8) {
      isValid = false;
      errors.passwordLength = this.props.t("The password length must be set to 8 at least");
    }

    if (settings.passphraseWordsLength < 4) {
      isValid = false;
      errors.passphraseWordsLength = this.props.t("The passphrase word cound must be set to 4 at least");
    }

    this.setState({errors});
    return isValid;
  }

  /**
   * Whenever the save has been requested
   * @returns {Promise<void>}
   */
  async save() {
    this.setProcessing(true);
    try {
      const newSettings = new PasswordPolicyDto(this.state.settings);
      const result = await this.passwordPolicyService.save(newSettings);
      const currentSettings = new PasswordPolicyViewModel(result);
      this.setState({currentSettings, settings: currentSettings});
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
   * Reset setting s with inital value
   * @returns {object}
   */
  resetSettings() {
    this.setState({settings: this.state.currentSettings});
  }

  /**
   * Handle settings changes.
   * @param {string} key the name of the changed field
   * @param {*} value the new value to set
   * @returns {void}
   */
  setSettings(key, value) {
    const newSettings = Object.assign({}, this.state.settings, {[key]: value});
    this.setState({settings: newSettings}, () => {
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
    this.setState({processing});
  }

  /**
   * Check if there are changes to apply
   * @returns {Boolean}
   */
  hasSettingsChanges() {
    return JSON.stringify(this.state.currentSettings) !== JSON.stringify(this.state.settings);
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {currentSettings, settings, processing} = this.defaultState;
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
      <AdminPasswordPolicyContext.Provider value={this.state}>
        {this.props.children}
      </AdminPasswordPolicyContext.Provider>
    );
  }
}

AdminPasswordPolicyContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
  actionFeedbackContext: PropTypes.object, // The action feedback context
};

export default withAppContext(withTranslation('common')(AdminPasswordPolicyContextProvider));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminPasswordPolicy(WrappedComponent) {
  return class WithAdminPasswordPolicy extends React.Component {
    render() {
      return (
        <AdminPasswordPolicyContext.Consumer>
          {adminPasswordPolicyContext => (
            <WrappedComponent
              adminPasswordPolicyContext={adminPasswordPolicyContext}
              {...this.props}
            />
          )}
        </AdminPasswordPolicyContext.Consumer>
      );
    }
  };
}
