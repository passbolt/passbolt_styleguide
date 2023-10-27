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
 * @since         4.4.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withTranslation} from "react-i18next";
import PasswordExpirySettingsViewModel from "../../../../shared/models/passwordExpirySettings/PasswordExpirySettingsViewModel";

/**
 * The Administration User Passphrase Policies Context
 * @type {React.Context<Object>}
 */
export const AdministrationPasswordExpiryContext = React.createContext({
  getSettings: () => {}, // Returns settings for UI changes
  setSettingsBulk: () => {}, // set multiple settings value at once
  findSettings: () => {}, // request the settings from the background page
  isProcessing: () => {}, // returns true if data is under processing
  validateData: () => {}, // runs the current data validation
  save: () => {}, // saves the data on the API
  getErrors: () => {}, // returns the latest validation errors available
  hasSettingsChanges: () => {}, // returns true if the data has changed
});

/**
 * The Administration User passphrase Policies context provider
 */
export class AdministrationPasswordExpiryContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      processing: false,
      errors: null,
      hasBeenValidated: false,
      isDataModified: false,
      settings: new PasswordExpirySettingsViewModel(), // the current password expiry settings
      findSettings: this.findSettings.bind(this), // find the current password expiry settings
      getSettings: this.getSettings.bind(this), // returns the settings that have been fetch previously
      setSettingsBulk: this.setSettingsBulk.bind(this), // set given fields with the given values.
      isProcessing: this.isProcessing.bind(this), // returns true if data is under processing
      validateData: this.validateData.bind(this), // runs the current data validation
      save: this.save.bind(this), // saves the data on the API
      getErrors: this.getErrors.bind(this), // returns the latest validation errors available
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // returns true if the data has changed
    };
  }

  /**
   * Find the password expiry settings
   * @return {Promise<void>}
   */
  async findSettings() {
    this.setState({processing: true});

    const result = await this.props.context.port.request("passbolt.password-expiry.find");
    const settings = PasswordExpirySettingsViewModel.fromEntityDto(result);

    //Init saved setting
    this.setState({
      settings,
      currentSettings: settings,
      processing: false,
    });
  }

  /**
   * Returns the settings that have been fetch previously.
   * @returns {object}
   */
  getSettings() {
    return this.state.settings;
  }

  /**
   * Set given fields with the given values.
   */
  setSettingsBulk(keyValuePairs) {
    let newSettings = this.state.settings;
    const keys = Object.keys(keyValuePairs);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      newSettings = newSettings.cloneWithMutation(key, keyValuePairs[key]);
    }
    const isDataModified = PasswordExpirySettingsViewModel.isDataDifferent(newSettings, this.state.currentSettings);
    if (!this.state.hasBeenValidated) {
      this.setState({settings: newSettings, isDataModified});
      return;
    }

    const errors = newSettings.validate();
    this.setState({errors, settings: newSettings, isDataModified});
  }

  /**
   * Returns true if data is under processing
   * @returns {boolean}
   */
  isProcessing() {
    return this.state.processing;
  }

  /**
   * runs the current data validation
   * @returns {boolean}
   */
  validateData() {
    const validattionError = this.state.settings.validate();
    const hasErrors = validattionError.hasErrors();
    const errors = hasErrors ? validattionError : null;
    this.setState({errors, hasBeenValidated: true});
    return !hasErrors;
  }

  /**
   * Saves the data on the API.
   * Can actually save the current settings, or can ask for deletion of settings if the feature is disabled.
   * If an admin tries to delete the settings when there is no settings yet, nothing happens.
   * @returns {Promise<void>}
   */
  async save() {
    const isSettingsDisabled = this.state.settings.isSettingsDisabled;
    if (isSettingsDisabled && !this.state.settings.id) {
      return;
    }

    this.setState({processing: true});
    const newState = {processing: false};

    try {
      const hasToDeleteSettings = isSettingsDisabled && Boolean(this.state.settings.id);
      const newSettings = hasToDeleteSettings
        ? await this.doDeleteSettings()
        : await this.doSaveSettings();

      newState.settings = newSettings;
      newState.currentSettings = newSettings;
      newState.isDataModified = false;
    } finally {
      this.setState(newState);
    }
  }

  /**
   * Deletes the current settings
   * @returns {Promise<PasswordExpirySettingsViewModel>}
   * @private
   */
  async doDeleteSettings() {
    this.props.context.port.request("passbolt.password-expiry.delete", this.state.settings.id);
    return new PasswordExpirySettingsViewModel();
  }

  /**
   * Saves the current settings
   * @returns {Promise<PasswordExpirySettingsViewModel>}
   * @private
   */
  async doSaveSettings() {
    const passwordExpirySettingsEntityDto = await this.props.context.port.request("passbolt.password-expiry.save", this.state.settings.toEntityDto());
    return new PasswordExpirySettingsViewModel(passwordExpirySettingsEntityDto);
  }

  /**
   * Returns the latest validation errors available
   * @returns {EntityValidationError|null}
   */
  getErrors() {
    return this.state.errors;
  }

  /**
   * Returns true if the data has changed
   * @returns {boolean}
   */
  hasSettingsChanges() {
    return this.state.isDataModified;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdministrationPasswordExpiryContext.Provider value={this.state}>
        {this.props.children}
      </AdministrationPasswordExpiryContext.Provider>
    );
  }
}

AdministrationPasswordExpiryContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
};

export default withAppContext(withTranslation('common')(AdministrationPasswordExpiryContextProvider));

/**
 * Administration User Passphrase Policies Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminPasswordExpiry(WrappedComponent) {
  return class WithAdminPasswordExpiryContext extends React.Component {
    render() {
      return (
        <AdministrationPasswordExpiryContext.Consumer>
          {adminPasswordExpiryContext => (
            <WrappedComponent
              adminPasswordExpiryContext={adminPasswordExpiryContext}
              {...this.props}
            />
          )}
        </AdministrationPasswordExpiryContext.Consumer>
      );
    }
  };
}
