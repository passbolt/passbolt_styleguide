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
 * @since         5.4.0
 */
import React from "react";
import PropKeys from "prop-types";
import { withAppContext } from "../AppContext/AppContext";
import MetadataKeysSettingsEntity from "../../models/entity/metadata/metadataKeysSettingsEntity";

export const MetadataKeysSettingsLocalStorageContext = React.createContext({
  get: () => {}, // Get the metadata key settings from the local storage and/or init them if not the case already
  metadataKeysSettings: null, // the current metadata key settings loaded from the local storage
  updateLocalStorage: () => {}, // triggers an update of the local storage
});

/**
 * The metadata key settings local storage context provider
 */
export class MetadataKeysSettingsLocalStorageContextProvider extends React.Component {
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
      get: this.get.bind(this), // Get the metadata key settings from the local storage and/or init them if not the case already
      metadataKeysSettings: null, // the current metadata key settings loaded from the local storage
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
   * Handles update of the metadata key settings in the local storage.
   */
  handleStorageChange(changes) {
    if (changes[this.storageKey]) {
      this.set(changes[this.storageKey].newValue);
    }
  }

  /**
   * Set metadataKeysSettings.
   * @param {Object} metadataKeysSettings The metadata keys settings to set.
   * @private
   */
  set(metadataKeysSettings) {
    const metadataKeysSettingsEntity = new MetadataKeysSettingsEntity(metadataKeysSettings);
    this.setState({ metadataKeysSettings: metadataKeysSettingsEntity });
  }

  /**
   * Get the metadata key settings from the local storage and/or init them if not the case already.
   * @returns {MetadataKeysSettingsEntity|null}
   */
  get() {
    if (this.state.metadataKeysSettings === null) {
      this.loadLocalStorage();
      return null;
    }

    return this.state.metadataKeysSettings;
  }

  /**
   * Get the storage key.
   * @returns {string}
   */
  get storageKey() {
    return `metadata_keys_settings-${this.props.context.account?.id}`;
  }

  /**
   * Load the metadata key settings from the local storage if it is available.
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
   * Forces the update of the metadata key settings in the local storage.
   * @return {Promise<void>}
   */
  async updateLocalStorage() {
    if (this.runningLocalStorageUpdatePromise === null) {
      this.runningLocalStorageUpdatePromise = this.props.context.port.request(
        "passbolt.metadata.get-or-find-metadata-keys-settings",
      );
      await this.runningLocalStorageUpdatePromise;
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
      <MetadataKeysSettingsLocalStorageContext.Provider value={this.state}>
        {this.props.children}
      </MetadataKeysSettingsLocalStorageContext.Provider>
    );
  }
}

MetadataKeysSettingsLocalStorageContextProvider.propTypes = {
  context: PropKeys.any, // The application context
  children: PropKeys.any, // The children components
};
export default withAppContext(MetadataKeysSettingsLocalStorageContextProvider);

/**
 * Metadata Keys Settings Local Storage Context Consumer HOC
 * @param WrappedComponent
 */
export function withMetadataKeysSettingsLocalStorage(WrappedComponent) {
  return class withMetadataKeysSettingsKeysLocalStorage extends React.Component {
    render() {
      return (
        <MetadataKeysSettingsLocalStorageContext.Consumer>
          {(metadataKeysSettingsLocalStorageContext) => (
            <WrappedComponent
              metadataKeysSettingsLocalStorageContext={metadataKeysSettingsLocalStorageContext}
              metadataKeysSettings={metadataKeysSettingsLocalStorageContext.get()}
              {...this.props}
            />
          )}
        </MetadataKeysSettingsLocalStorageContext.Consumer>
      );
    }
  };
}
