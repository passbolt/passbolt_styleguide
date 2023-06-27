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
import UserDirectoryService from '../../../../shared/services/api/userDirectory/UserDirectoryService';
import UserService from '../../../../shared/services/api/user/UserService';
import UserDirectoryModel from '../../../../shared/models/userDirectory/UserDirectoryModel';
import UserDirectoryDTO from '../../../../shared/models/userDirectory/UserDirectoryDTO';

/**
 * The Administration user directory Context
 * @type {React.Context<Object>}
 */
export const AdminUserDirectoryContext = React.createContext({
  getCurrentSettings: () => {}, // Returns settings saved
  getSettings: () => {}, // Returns settings for UI changes
  setSettings: () => {}, // Set the settings object with changes
  hadDisabledSettings: () => {}, // returns true if the config is present even if disabled
  getUsers: () => {}, // Returns users for UI changes
  hasSettingsChanges: () => {}, // Check if the policy has changes
  findUserDirectorySettings: () => {}, // Find the current user directory settings and store it in the state
  save: () => {}, // Save settings
  delete: () => {}, // Save the current settings
  test: () => {}, // Test settings method
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  getErrors: () => {}, // Return current errors
  setError: () => {}, // Init errors object message
  simulateUsers: () => {}, // synchronize users directory request.
  requestSynchronization: () => {}, // request a synchronization,
  mustOpenSynchronizePopUp: () => {}, // return the mustSynchronize value
  synchronizeUsers: () => {}, // simulate synchronize users directory
  isSubmitted: () => {}, // returns the value submitted
  setSubmitted: () => {}, // Set the submitted variab
  setErrors: () => {}, // Set errors to object object
  clearContext: () => {}, // put the data to its default state value
});

/**
 * The Administration user directory context provider
 */
export class AdminUserDirectoryContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.userDirectoryService = new UserDirectoryService(props.context.getApiClientOptions());
    this.userService = new UserService(props.context.getApiClientOptions());
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      users: [], //The users from server
      errors: this.initErrors(), // The errors provided by forms
      mustSynchronize: false, // request a synchronization with a popup
      currentSettings: null, // The current settings
      settings: new UserDirectoryModel(), // Change done to the settings object
      submitted: false, // The informations about the form state
      processing: true, // Context is processing data
      getCurrentSettings: this.getCurrentSettings.bind(this), // Returns settings saved
      getSettings: this.getSettings.bind(this), // Returns settings for UI changes
      setSettings: this.setSettings.bind(this),  // Set the settings object with changes
      hadDisabledSettings: this.hadDisabledSettings.bind(this), // returns true if the config is present even if disabled
      findUserDirectorySettings: this.findUserDirectorySettings.bind(this), // Find the current settings and store it in the state
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // Check if setting has changes
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      isSubmitted: this.isSubmitted.bind(this), // returns the value submitted
      setSubmitted: this.setSubmitted.bind(this), // Set the submitted variable
      setProcessing: this.setProcessing.bind(this), // Set the processing
      simulateUsers: this.simulateUsers.bind(this), // synchronize users directory request.
      synchronizeUsers: this.synchronizeUsers.bind(this), // simulate synchronize users directory
      save: this.save.bind(this), // Save the policy changes
      delete: this.delete.bind(this), // Save the current settings
      test: this.test.bind(this), // test the settings for the user directory
      getErrors: this.getErrors.bind(this), // Return current errors
      setError: this.setError.bind(this), // Set an error to object object
      setErrors: this.setErrors.bind(this), // Set errors to object object
      getUsers: this.getUsers.bind(this), // return the users object
      requestSynchronization: this.requestSynchronization.bind(this), // request a synchronization,
      mustOpenSynchronizePopUp: this.mustOpenSynchronizePopUp.bind(this), // return the mustSynchronize value
      clearContext: this.clearContext.bind(this), // put the data to its default state value
    };
  }

  /**
   * init the errors object
   * @return {Promise<void>}
   */
  initErrors() {
    return {
      hostError: null, // host error
      portError: null, // port error
      domainError: null, // domain error
    };
  }

  /**
   * Find the User directory settings
   * @return {Promise<void>}
   */
  async findUserDirectorySettings() {
    this.setProcessing(true);
    const result = await this.userDirectoryService.findAll();
    const usersResult = await this.userService.findAll();

    const userLogged = usersResult.body.find(user => this.props.context.loggedInUser.id === user.id);

    const currentSettings = new UserDirectoryModel(result, userLogged.id);
    //Init users
    this.setState({users: this.sortUsers(usersResult.body)});
    //Init saved setting
    this.setState({currentSettings});
    //Init setting which will interact with UI
    this.setState({settings: Object.assign({}, currentSettings)});

    this.setProcessing(false);
  }

  /**
   * sort users
   * @param {Array<User>} users
   * @return {Promise<void>}
   */
  sortUsers(users) {
    const getUserFullName = user => `${user.profile.first_name} ${user.profile.last_name}`;
    const nameSorter = (u1, u2) => getUserFullName(u1).localeCompare(getUserFullName(u2));
    return users.sort(nameSorter);
  }

  /**
   * Returns the setting actually saved inside DB
   * @returns {object}
   */
  getCurrentSettings() {
    return this.state.currentSettings;
  }

  /**
   * Returns the User directory settings that have been fetch previously.
   * @returns {object}
   */
  getSettings() {
    return this.state.settings;
  }

  /**
   * Request to open the synchronization popup
   * @returns {object}
   */
  requestSynchronization(result) {
    this.setState({mustSynchronize: result});
  }

  /**
   * Return the mustSynchronize value
   * @returns {object}
   */
  mustOpenSynchronizePopUp() {
    return this.state.mustSynchronize;
  }

  /**
   * Handle settings changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  setSettings(key, value) {
    const newSettings = Object.assign({}, this.state.settings, {[key]: value});
    this.setState({settings: newSettings});
  }

  /**
   * returns true if the config is present even if disabled
   * @returns {boolean}
   */
  hadDisabledSettings() {
    const settings = this.getCurrentSettings();
    return Boolean(settings?.port) && Boolean(settings?.host) && !settings?.userDirectoryToggle;
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
    const newSettings = new UserDirectoryDTO(this.state.settings);
    await this.userDirectoryService.update(newSettings);
    await this.findUserDirectorySettings();
  }

  /**
   * Whenever the delete has been requested
   */
  async delete() {
    this.setProcessing(true);
    await this.userDirectoryService.delete();
    await this.findUserDirectorySettings();
  }

  /**
   * Whenever the test has been requested
   */
  async test() {
    this.setProcessing(true);
    const newSettings = new UserDirectoryDTO(this.state.settings);
    const result  = await this.userDirectoryService.test(newSettings);
    this.setProcessing(false);
    return result;
  }

  /**
   * Whenever the simulate users has been requested
   */
  async simulateUsers() {
    return this.userDirectoryService.simulate();
  }

  /**
   * Whenever the synchronize users has been requested
   */
  async synchronizeUsers() {
    return this.userDirectoryService.synchronize();
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
   * return the users object
   */
  getUsers() {
    return this.state.users;
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
      <AdminUserDirectoryContext.Provider value={this.state}>
        {this.props.children}
      </AdminUserDirectoryContext.Provider>
    );
  }
}

AdminUserDirectoryContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(AdminUserDirectoryContextProvider);


/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminUserDirectory(WrappedComponent) {
  return class WithAdminUserDirectory extends React.Component {
    render() {
      return (
        <AdminUserDirectoryContext.Consumer>
          {
            adminUserDirectoryContext => <WrappedComponent adminUserDirectoryContext={adminUserDirectoryContext} {...this.props} />
          }
        </AdminUserDirectoryContext.Consumer>
      );
    }
  };
}

