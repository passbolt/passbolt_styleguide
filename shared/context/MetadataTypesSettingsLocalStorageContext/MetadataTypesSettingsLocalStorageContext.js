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
 * @since         4.10.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../AppContext/AppContext";
import MetadataTypesSettingsEntity from "../../models/entity/metadata/metadataTypesSettingsEntity";

export const MetadataTypesSettingsLocalStorageContext = React.createContext({
  get: () => {}, // Get the metadata type settings from the local storage and/or init them if not the case already
  metadataTypeSettings: null, // the current metadata type settings loaded from the local storage
  updateLocalStorage: () => {}, // triggers an update of the local storage
});

/**
 * The metadata type settings local storage context provider
 */
export class MetadataTypesSettingsLocalStorageContextProvider extends React.Component {
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
      get: this.get.bind(this), // Get the metadata type settings from the local storage and/or init them if not the case already
      metadataTypeSettings: null, // the current metadata type settings loaded from the local storage
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
   * Handles update of the metadata type settings in the local storage.
   */
  handleStorageChange(changes) {
    if (changes[this.storageKey]) {
      this.set(changes[this.storageKey].newValue);
    }
  }

  /**
   * Set metadataTypeSettings.
   * @param {Object} metadataTypeSettings The metadata type settings to set.
   * @private
   */
  set(metadataTypeSettings) {
    const metadataTypeSettingsCollection = new MetadataTypesSettingsEntity(metadataTypeSettings);
    this.setState({ metadataTypeSettings: metadataTypeSettingsCollection });
  }

  /**
   * Get the metadata type settings from the local storage and/or init them if not the case already.
   * @returns {MetadataTypesSettingsEntity|null}
   */
  get() {
    if (this.state.metadataTypeSettings === null) {
      this.loadLocalStorage();
      return null;
    }

    return this.state.metadataTypeSettings;
  }

  /**
   * Get the storage key.
   * @returns {string}
   */
  get storageKey() {
    return `metadata_types_settings-${this.props.context.account?.id}`;
  }

  /**
   * Load the metadata type settings from the local storage if it is available.
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
   * Forces the update of the metadata type settings in the local storage.
   * @return {Promise<void>}
   */
  async updateLocalStorage() {
    if (this.runningLocalStorageUpdatePromise === null) {
      this.runningLocalStorageUpdatePromise = this.props.context.port.request(
        "passbolt.metadata.get-or-find-metadata-types-settings",
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
      <MetadataTypesSettingsLocalStorageContext.Provider value={this.state}>
        {this.props.children}
      </MetadataTypesSettingsLocalStorageContext.Provider>
    );
  }
}

MetadataTypesSettingsLocalStorageContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};
export default withAppContext(MetadataTypesSettingsLocalStorageContextProvider);

/**
 * Metadata Types Settings Local Storage Context Consumer HOC
 * @param WrappedComponent
 */
export function withMetadataTypesSettingsLocalStorage(WrappedComponent) {
  return class withMetadataTypesSettingsTypesLocalStorage extends React.Component {
    render() {
      return (
        <MetadataTypesSettingsLocalStorageContext.Consumer>
          {(metadataTypeSettingsLocalStorageContext) => (
            <WrappedComponent
              metadataTypeSettingsLocalStorageContext={metadataTypeSettingsLocalStorageContext}
              metadataTypeSettings={metadataTypeSettingsLocalStorageContext.get()}
              {...this.props}
            />
          )}
        </MetadataTypesSettingsLocalStorageContext.Consumer>
      );
    }
  };
}
