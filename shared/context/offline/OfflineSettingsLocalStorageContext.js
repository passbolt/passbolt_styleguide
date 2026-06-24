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
 * @since         5.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../AppContext/AppContext";
import OfflineSettingsEntity from "../../models/entity/offline/offlineSettingsEntity";
import { OFFLINE_GET_OR_FIND_OFFLINE_SETTINGS_EVENT } from "../../services/serviceWorker/offline/offlineModeSettingsServiceWorkerService";

export const OfflineSettingsLocalStorageContext = React.createContext({
  get: () => {}, // Get the offline settings from the local storage and/or init them if not the case already
  offlineSettings: null, // the current offline settings loaded from the local storage
  updateLocalStorage: () => {}, // triggers an update of the local storage
});

/**
 * The offline settings local storage context provider
 */
export class OfflineSettingsLocalStorageContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.runningLocalStorageUpdatePromise = null;
    this.initEventHandlers();
  }

  /**
   * Returns the default component state
   * @returns {Object}
   */
  get defaultState() {
    return {
      get: this.get.bind(this), // Get the offline settings from the local storage and/or init them if not the case already
      offlineSettings: null, // the current offline settings loaded from the local storage
      updateLocalStorage: this.updateLocalStorage.bind(this), // triggers an update of the local storage
    };
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleStorageChange = this.handleStorageChange.bind(this);
  }

  /**
   * ComponentDidMount hook.
   * Invoked immediately after component is inserted into the tree
   */
  componentDidMount() {
    this.props.context.storage.onChanged.addListener(this.handleStorageChange);
  }

  /**
   * componentWillUnmount hook.
   */
  componentWillUnmount() {
    this.props.context.storage.onChanged.removeListener(this.handleStorageChange);
  }

  /**
   * Handles update of the offline settings in the local storage.
   */
  handleStorageChange(changes) {
    if (changes[this.storageKey] && changes[this.storageKey].newValue) {
      this.set(changes[this.storageKey].newValue);
    }
  }

  /**
   * Set offlineSettings.
   * @param {Object} offlineSettings The offline settings to set.
   * @private
   */
  set(offlineSettings) {
    const offlineSettingsEntity = new OfflineSettingsEntity(offlineSettings);
    this.setState({ offlineSettings: offlineSettingsEntity });
  }

  /**
   * Get the offline settings from the local storage and/or init them if not the case already.
   * @returns {OfflineSettingsEntity|null}
   */
  get() {
    if (this.state.offlineSettings === null) {
      this.loadLocalStorage();
      return null;
    }

    return this.state.offlineSettings;
  }

  /**
   * Get the storage key.
   * @returns {string}
   */
  get storageKey() {
    return `offline_settings-${this.props.context.account?.id}`;
  }

  /**
   * Load the offline settings from the local storage if it is available.
   * If the local storage is not yet initialised, then it asks for its initialisation.
   * @returns {Promise<void>}
   * @private
   */
  async loadLocalStorage() {
    const storageData = await this.props.context.storage.local.get([this.storageKey]);
    if (!storageData[this.storageKey]) {
      this.updateLocalStorage();
      return;
    }

    this.set(storageData[this.storageKey]);
  }

  /**
   * Forces the update of the offline settings in the local storage.
   * @return {Promise<void>}
   */
  async updateLocalStorage() {
    if (this.runningLocalStorageUpdatePromise === null) {
      this.runningLocalStorageUpdatePromise = this.props.context.port.request(
        OFFLINE_GET_OR_FIND_OFFLINE_SETTINGS_EVENT,
      );
      const offlineSettings = await this.runningLocalStorageUpdatePromise;
      if (offlineSettings) {
        this.set(offlineSettings);
      }
      this.runningLocalStorageUpdatePromise = null;
    } else {
      await this.runningLocalStorageUpdatePromise;
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <OfflineSettingsLocalStorageContext.Provider value={this.state}>
        {this.props.children}
      </OfflineSettingsLocalStorageContext.Provider>
    );
  }
}

OfflineSettingsLocalStorageContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};
export default withAppContext(OfflineSettingsLocalStorageContextProvider);

/**
 * Offline Settings Local Storage Context Consumer HOC
 * @param WrappedComponent
 */
export function withOfflineSettingsLocalStorage(WrappedComponent) {
  return class WithOfflineSettingsLocalStorage extends React.Component {
    render() {
      return (
        <OfflineSettingsLocalStorageContext.Consumer>
          {(offlineSettingsLocalStorageContext) => (
            <WrappedComponent
              offlineSettingsLocalStorageContext={offlineSettingsLocalStorageContext}
              offlineSettings={offlineSettingsLocalStorageContext.get()}
              {...this.props}
            />
          )}
        </OfflineSettingsLocalStorageContext.Consumer>
      );
    }
  };
}
