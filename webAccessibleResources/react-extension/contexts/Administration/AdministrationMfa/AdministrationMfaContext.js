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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import MfaModel from '../../../../shared/models/Mfa/MfaModel';
import MfaDTO from '../../../../shared/models/Mfa/MfaDTO';
import MfaService from "../../../../shared/services/api/Mfa/MfaService";

/**
 * The Administration Email Notification Context
 * @type {React.Context<Object>}
 */
export const AdminMfaContext = React.createContext({
  getCurrentSettings: () => {}, // Returns settings saved
  getSettings: () => {}, // Returns settings for UI changes
  setSettings: () => {}, // Set the settings object with changes
  hasSettingsChanges: () => {}, // Check if the policy has changes
  findMfaSettings: () => {}, // Find the current Mfa settings and store it in the state
  save: () => {}, // Save settings
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  getErrors: () => {}, // Return current errors
  setError: () => {}, // Init errors object message
  isSubmitted: () => {}, // returns the value submitted
  setSubmitted: () => {}, // Set the submitted variab
  setErrors: () => {}, // Set errors to object object
  clearContext: () => {}, // put the data to its default state value
});

/**
 * The Administration Mfa context provider
 */
export class AdminMfaContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.mfaService = new MfaService(apiClientOptions);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      errors: this.initErrors(),
      currentSettings: null, // The current settings
      settings: new MfaModel(), // Change done to the settings object
      submitted: false, // The informations about the form state
      processing: true, // Context is processing data
      getCurrentSettings: this.getCurrentSettings.bind(this), // Returns settings saved
      getSettings: this.getSettings.bind(this), // Returns settings for UI changes
      setSettings: this.setSettings.bind(this),  // Set the settings object with changes
      findMfaSettings: this.findMfaSettings.bind(this), // Find the current settings and store it in the state
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // Check if setting has changes
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      isSubmitted: this.isSubmitted.bind(this), // returns the value submitted
      setSubmitted: this.setSubmitted.bind(this), // Set the submitted variable
      setProcessing: this.setProcessing.bind(this),
      save: this.save.bind(this), // Save the policy changes
      getErrors: this.getErrors.bind(this), // Return current errors
      setError: this.setError.bind(this), // Set an error to object object
      setErrors: this.setErrors.bind(this), // Set errors to object object
      clearContext: this.clearContext.bind(this), // put the data to its default state value
    };
  }

  /**
   * init the errors object
   * @return {Promise<void>}
   */
  initErrors() {
    return {
      yubikeyClientIdentifierError: null, // yubikey client identifier error
      yubikeySecretKeyError: null, // yubikey secret key error
      duoHostnameError: null, // duo hostname error
      duoClientIdError: null, // duo client key error
      duoClientSecretError: null, // duo secret key error
    };
  }

  /**
   * Find the Mfa settings
   * @return {Promise<void>}
   */
  async findMfaSettings() {
    this.setProcessing(true);
    const result = await this.mfaService.findAllSettings();
    const currentSettings = new MfaModel(result);
    //Init saved setting
    this.setState({currentSettings});
    //Init setting which will interact with UI
    this.setState({settings: Object.assign({}, currentSettings)});

    this.setProcessing(false);
  }

  /**
   * Returns the setting actually saved inside DB
   * @returns {object}
   */
  getCurrentSettings() {
    return this.state.currentSettings;
  }

  /**
   * Returns the Mfa settings that have been fetch previously.
   * @returns {object}
   */
  getSettings() {
    return this.state.settings;
  }

  /**
   * Handle settings changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async setSettings(key, value) {
    const newSettings = Object.assign({}, this.state.settings, {[key]: value});
    await this.setState({settings: newSettings});
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
   * @params {Boolean} processing value
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
   * return true if the form has been submitted
   * @returns {Boolean}
   */
  isSubmitted() {
    return this.state.submitted;
  }

  /**
   * rchange value for submitted
   * @returns {Boolean}
   */
  setSubmitted(submitted) {
    this.setState({submitted});
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {currentSettings, settings, processing} = this.defaultState;
    this.setState({
      currentSettings, settings, processing
    });
  }

  /**
   * Whenever the save has been requested
   */
  async save() {
    this.setProcessing(true);
    const newSettings = new MfaDTO(this.state.settings);
    await this.mfaService.save(newSettings);
    await this.findMfaSettings();
  }

  /**
   * return the errors object
   */
  getErrors() {
    return this.state.errors;
  }

  /**
   * set an error to object
   */
  setError(key, value) {
    const errors = Object.assign({}, this.state.errors, {[key]: value});
    this.setState({errors});
  }


  /**
   * set errors to object
   */
  setErrors(newErrors, callback = () => {}) {
    const errors = Object.assign({}, this.state.errors, newErrors);
    return this.setState({errors}, callback);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminMfaContext.Provider value={this.state}>
        {this.props.children}
      </AdminMfaContext.Provider>
    );
  }
}

AdminMfaContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(AdminMfaContextProvider);


/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminMfa(WrappedComponent) {
  return class WithAdminMfa extends React.Component {
    render() {
      return (
        <AdminMfaContext.Consumer>
          {
            adminMfaContext => <WrappedComponent adminMfaContext={adminMfaContext} {...this.props} />
          }
        </AdminMfaContext.Consumer>
      );
    }
  };
}
