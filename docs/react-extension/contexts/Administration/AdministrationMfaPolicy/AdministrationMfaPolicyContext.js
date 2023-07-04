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
 * @since         3.10.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import MfaPolicyViewModel from '../../../../shared/models/mfaPolicy/MfaPolicyViewModel';
import MfaPolicyService from "../../../../shared/services/api/mfaPolicy/MfaPolicyService";
import MfaPolicyDto from '../../../../shared/models/mfaPolicy/MfaPolicyDto';

/**
 * The Administration Mfa policy Context
 * @type {React.Context<Object>}
 */
export const AdminMfaPolicyContext = React.createContext({
  getCurrentSettings: () => {}, // Returns settings saved
  getSettings: () => {}, // Returns settings for UI changes
  setSettings: () => {}, // Set settings for UI changes
  hasSettingsChanges: () => {}, // Check if the policy has changes
  findSettings: () => {}, // Find the current self registraiton settings and store it in the state
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  clearContext: () => {}, // put the data to its default state value
  save: () => {}, // Save settings,
});

/**
 * The Administration mfa policy context provider
 */
export class AdminMfaPolicyContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.mfaPolicyService = new MfaPolicyService(
      apiClientOptions
    );
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      settings: new MfaPolicyViewModel(),
      currentSettings: new MfaPolicyViewModel(), // The current settings
      processing: true, // Context is processing data
      getCurrentSettings: this.getCurrentSettings.bind(this), // Returns settings saved
      getSettings: this.getSettings.bind(this), // Returns settings for UI changes
      setSettings: this.setSettings.bind(this), // Set settings for UI changes
      findSettings: this.findSettings.bind(this), // Find the current self registraiton settings and store it in the state
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // Check if setting has changes
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this),
      clearContext: this.clearContext.bind(this), // put the data to its default state value
      save: this.save.bind(this), // Save the policy changes
    };
  }

  /**
   * Find the self registration settings
   * @return {Promise<void>}
   */
  async findSettings(callback = () => {}) {
    this.setProcessing(true);
    const result = await this.mfaPolicyService.find();
    const currentSettings = new MfaPolicyViewModel(result);
    //Init saved setting
    this.setState({currentSettings});
    this.setState({settings: currentSettings}, callback);
    this.setProcessing(false);
  }

  /**
   * Whenever the save has been requested
   */
  async save() {
    this.setProcessing(true);
    const newSettings = new MfaPolicyDto(this.state.settings);
    await this.mfaPolicyService.save(newSettings);
    await this.findSettings();
  }

  /**
   * Returns the setting actually saved inside DB
   * @returns {object}
   */
  getCurrentSettings() {
    return this.state.currentSettings;
  }

  /**
   * Returns the settings that have been fetch previously.
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
  setSettings(key, value, callback = () => {}) {
    const newSettings = Object.assign({}, this.state.settings, {[key]: value});
    this.setState({settings: newSettings}, callback);
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
      <AdminMfaPolicyContext.Provider value={this.state}>
        {this.props.children}
      </AdminMfaPolicyContext.Provider>
    );
  }
}

AdminMfaPolicyContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
  actionFeedbackContext: PropTypes.object, // The action feedback context
};

export default withAppContext(AdminMfaPolicyContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminMfaPolicy(WrappedComponent) {
  return class WithAdminMfaPolicy extends React.Component {
    render() {
      return (
        <AdminMfaPolicyContext.Consumer>
          {adminMfaPolicyContext => (
            <WrappedComponent
              adminMfaPolicyContext={adminMfaPolicyContext}
              {...this.props}
            />
          )}
        </AdminMfaPolicyContext.Consumer>
      );
    }
  };
}
