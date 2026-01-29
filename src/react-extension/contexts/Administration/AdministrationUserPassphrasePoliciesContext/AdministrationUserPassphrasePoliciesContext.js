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
import { withTranslation } from "react-i18next";
import UserPassphrasePoliciesViewModel from "../../../../shared/models/userPassphrasePolicies/UserPassphrasePoliciesViewModel";

/**
 * The Administration User Passphrase Policies Context
 * @type {React.Context<Object>}
 */
export const AdministrationUserPassphrasePoliciesContext = React.createContext({
  getSettings: () => {}, // Returns settings for UI changes
  setSettings: () => {}, // set the given value on the current policies
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
export class AdministrationUserPassphrasePoliciesContextProvider extends React.Component {
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
      settings: new UserPassphrasePoliciesViewModel(), // the current user passphrase policies settings
      findSettings: this.findSettings.bind(this), // find the User Passphrase Policies
      getSettings: this.getSettings.bind(this), // returns the settings that have been fetch previously
      setSettings: this.setSettings.bind(this), // set the given value on the current policies
      isProcessing: this.isProcessing.bind(this), // returns true if data is under processing
      validateData: this.validateData.bind(this), // runs the current data validation
      save: this.save.bind(this), // saves the data on the API
      getErrors: this.getErrors.bind(this), // returns the latest validation errors available
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // returns true if the data has changed
    };
  }

  /**
   * Find the User Passphrase Policies
   * @return {Promise<void>}
   */
  async findSettings() {
    this.setState({ processing: true });

    const result = await this.props.context.port.request("passbolt.user-passphrase-policies.find");
    const settings = UserPassphrasePoliciesViewModel.fromEntityDto(result);

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
   * Set the givent field with the given value.
   */
  setSettings(key, value) {
    const settings = this.state.settings.cloneWithMutation(key, value);
    const isDataModified = UserPassphrasePoliciesViewModel.isDataDifferent(settings, this.state.currentSettings);
    if (!this.state.hasBeenValidated) {
      this.setState({ settings, isDataModified });
      return;
    }

    const errors = settings.validate();
    this.setState({ errors, settings, isDataModified });
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
    this.setState({ errors, hasBeenValidated: true });
    return !hasErrors;
  }

  /**
   * Saves the data on the API
   */
  async save() {
    this.setState({ processing: true });

    try {
      const settingsDto = this.state.settings.toEntityDto();
      const result = await this.props.context.port.request("passbolt.user-passphrase-policies.save", settingsDto);
      const settings = UserPassphrasePoliciesViewModel.fromEntityDto(result);
      this.setState({
        settings,
        currentSettings: settings,
        processing: false,
        isDataModified: false,
      });
    } finally {
      this.setState({ processing: false });
    }
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
      <AdministrationUserPassphrasePoliciesContext.Provider value={this.state}>
        {this.props.children}
      </AdministrationUserPassphrasePoliciesContext.Provider>
    );
  }
}

AdministrationUserPassphrasePoliciesContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
};

export default withAppContext(withTranslation("common")(AdministrationUserPassphrasePoliciesContextProvider));

/**
 * Administration User Passphrase Policies Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminUserPassphrasePolicies(WrappedComponent) {
  return class WithAdminUserPassphrasePolicies extends React.Component {
    render() {
      return (
        <AdministrationUserPassphrasePoliciesContext.Consumer>
          {(adminUserPassphrasePoliciesContext) => (
            <WrappedComponent adminUserPassphrasePoliciesContext={adminUserPassphrasePoliciesContext} {...this.props} />
          )}
        </AdministrationUserPassphrasePoliciesContext.Consumer>
      );
    }
  };
}
