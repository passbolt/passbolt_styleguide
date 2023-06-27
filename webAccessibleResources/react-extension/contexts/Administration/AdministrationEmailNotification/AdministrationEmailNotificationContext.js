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
import EmailNotificationService from "../../../../shared/services/api/emailNotification/EmailNotificationService";
import EmailNotificationModel from "../../../../shared/models/emailNotification/EmailNotificationModel";
import EmailNotificationDTO from "../../../../shared/models/emailNotification/EmailNotificationDTO";

/**
 * The Administration Email Notification Context
 * @type {React.Context<Object>}
 */
export const AdminEmailNotificationContext = React.createContext({
  getCurrentSettings: () => {}, // Returns settings saved
  getSettings: () => {}, // Returns settings for UI changes
  setSettings: () => {}, // Set the settings object with changes
  hasSettingsChanges: () => {}, // Check if the policy has changes
  findEmailNotificationSettings: () => {}, // Find the current email notification settings and store it in the state
  save: () => {}, // Save settings
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  clearContext: () => {}, // put the data to its default state value
});

/**
 * The Administration Email Notification context provider
 */
export class AdminEmailNotificationContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.emailNotificationService = new EmailNotificationService(apiClientOptions);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      currentSettings: null, // The current settings
      settings: new EmailNotificationModel(), // Change done to the settings object
      processing: true, // Context is processing data
      getCurrentSettings: this.getCurrentSettings.bind(this), // Returns settings saved
      getSettings: this.getSettings.bind(this), // Returns settings for UI changes
      setSettings: this.setSettings.bind(this),  // Set the settings object with changes
      findEmailNotificationSettings: this.findEmailNotificationSettings.bind(this), // Find the current settings and store it in the state
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // Check if setting has changes
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this),
      save: this.save.bind(this), // Save the policy changes
      clearContext: this.clearContext.bind(this), // put the data to its default state value
    };
  }

  /**
   * Find the email notification settings
   * @return {Promise<void>}
   */
  async findEmailNotificationSettings() {
    this.setProcessing(true);
    const result = (await this.emailNotificationService.find());
    const currentSettings = new EmailNotificationModel(result);
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
   * Returns the Email Notification settings that have been fetch previously.
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
    const newSettings = new EmailNotificationDTO(this.state.settings);
    await this.emailNotificationService.save(newSettings);
    await this.findEmailNotificationSettings();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminEmailNotificationContext.Provider value={this.state}>
        {this.props.children}
      </AdminEmailNotificationContext.Provider>
    );
  }
}

AdminEmailNotificationContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(AdminEmailNotificationContextProvider);


/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminEmailNotification(WrappedComponent) {
  return class WithAdminEmailNotification extends React.Component {
    render() {
      return (
        <AdminEmailNotificationContext.Consumer>
          {
            adminEmailNotificationContext => <WrappedComponent adminEmailNotificationContext={adminEmailNotificationContext} {...this.props} />
          }
        </AdminEmailNotificationContext.Consumer>
      );
    }
  };
}


