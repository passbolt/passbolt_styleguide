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
 * @since         5.7.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../AppContext/AppContext";
import SecretRevisionsSettingsEntity from "../../models/entity/secretRevision/secretRevisionsSettingsEntity";
import SecretRevisionsSettingsServiceWorkerService from "../../services/serviceWorker/secretRevision/secretRevisionsSettingsServiceWorkerService";

export const SecretRevisionsSettingsContext = React.createContext({
  get: () => {}, // Get the secret revisions settings from the api
  secretRevisionsSettings: null, // the current secret revisions settings loaded from the api
});

/**
 * The secret revisions settings local storage context provider
 */
export class SecretRevisionsSettingsContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.secretRevisionsSettingsServiceWorkerService = new SecretRevisionsSettingsServiceWorkerService(
      props.context.port,
    );
    this.runningUpdatePromise = null;
  }

  /**
   * Returns the default component state
   * @returns {Object}
   */
  get defaultState() {
    return {
      get: this.get.bind(this), // Get the secret revisions settings from the local storage and/or init them if not the case already
      secretRevisionsSettings: null, // the current secret revisions settings loaded from the local storage
    };
  }

  /**
   * Set secretRevisionsSettings.
   * @param {SecretRevisionsSettingsEntity} secretRevisionsSettings The secret revisions settings to set.
   * @throws {TypeError} If the secretRevisionsSettings parameter is not a valid SecretRevisionsSettingsEntity
   * @private
   */
  set(secretRevisionsSettings) {
    if (!(secretRevisionsSettings instanceof SecretRevisionsSettingsEntity)) {
      throw new TypeError("The given data is not of type SecretRevisionsSettingsEntity");
    }
    this.setState({ secretRevisionsSettings: secretRevisionsSettings });
  }

  /**
   * Get the secret revisions settings from the local storage and/or init them if not the case already.
   * @returns {SecretRevisionsSettingsEntity|null}
   */
  get() {
    if (this.state.secretRevisionsSettings === null) {
      this.findSettings();
      return null;
    }

    return this.state.secretRevisionsSettings;
  }

  /**
   * Load the secret revisions settings from the local storage if it is available.
   * If the local storage is not yet initialised, then it asks for its initialisation.
   * @returns {Promise<void>}
   * @private
   */
  async findSettings() {
    if (this.runningUpdatePromise === null) {
      this.runningUpdatePromise = this.secretRevisionsSettingsServiceWorkerService.findSettings();
      const data = await this.runningUpdatePromise;
      this.set(data);
      this.runningUpdatePromise = null;
    } else {
      await this.runningUpdatePromise;
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <SecretRevisionsSettingsContext.Provider value={this.state}>
        {this.props.children}
      </SecretRevisionsSettingsContext.Provider>
    );
  }
}

SecretRevisionsSettingsContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};
export default withAppContext(SecretRevisionsSettingsContextProvider);

/**
 * Metadata Types Settings Local Storage Context Consumer HOC
 * @param WrappedComponent
 */
export function withSecretRevisionsSettings(WrappedComponent) {
  return class withSecretRevisionsSettingsTypesLocalStorage extends React.Component {
    render() {
      return (
        <SecretRevisionsSettingsContext.Consumer>
          {(secretRevisionsSettingsContext) => (
            <WrappedComponent
              secretRevisionsSettingsContext={secretRevisionsSettingsContext}
              secretRevisionsSettings={secretRevisionsSettingsContext.get()}
              {...this.props}
            />
          )}
        </SecretRevisionsSettingsContext.Consumer>
      );
    }
  };
}
