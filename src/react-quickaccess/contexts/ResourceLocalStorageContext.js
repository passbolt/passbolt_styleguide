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
 * @since         4.9.4
 */
import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import { sortResourcesAlphabetically } from "../../shared/utils/sortUtils";

export const ResourceLocalStorageContext = React.createContext({
  get: () => {}, // Get the resources from the local storage and/or init them if not the case already
  resources: null, // the current resources loaded from the local storage
  updateLocalStorage: () => {}, // triggers an update of the local storage
});

/**
 * The resource local storage context provider
 */
export class ResourceLocalStorageContextProvider extends React.Component {
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
      get: this.get.bind(this), // Get the resources from the local storage and/or init them if not the case already
      resources: null, // the current resources loaded from the local storage
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
   * Handles update of the resources in the local storage.
   */
  handleStorageChange(changes) {
    if (changes.resources) {
      this.set(changes.resources.newValue);
    }
  }

  /**
   * Set resources. Resources are sorted alphabetically.
   * @param {Array<Object>} resources The resources to set.
   * @private
   */
  set(resources) {
    sortResourcesAlphabetically(resources);
    this.setState({ resources });
  }

  /**
   * Get the resources from the local storage and/or init them if not the case already.
   * @returns {Array<Object>|null}
   */
  get() {
    if (this.state.resources === null) {
      this.loadLocalStorage();
      return null;
    }

    return this.state.resources;
  }

  /**
   * Load the resources from the local storage if it is available.
   * If the local storage is not yet initialised, then it asks for its initialisation.
   * @returns {Promise<void>}
   * @private
   */
  async loadLocalStorage() {
    const storageData = await this.props.context.storage.local.get(["resources"]);
    if (!storageData.resources) {
      this.updateLocalStorage();
      return;
    }

    this.set(storageData.resources);
  }

  /**
   * Forces the update of the resources in the local storage.
   * @return {Promise<void>}
   */
  async updateLocalStorage() {
    if (this.runningLocalStorageUpdatePromise === null) {
      this.runningLocalStorageUpdatePromise = this.props.context.port.request(
        "passbolt.resources.update-local-storage",
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
      <ResourceLocalStorageContext.Provider value={this.state}>
        {this.props.children}
      </ResourceLocalStorageContext.Provider>
    );
  }
}

ResourceLocalStorageContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};
export default withAppContext(ResourceLocalStorageContextProvider);

/**
 * Resources Local Storage Context Consumer HOC
 * @param WrappedComponent
 */
export function withResourcesLocalStorage(WrappedComponent) {
  return class withResourcesLocalStorage extends React.Component {
    render() {
      return (
        <ResourceLocalStorageContext.Consumer>
          {(resourceLocalStorageContext) => (
            <WrappedComponent
              resourcesLocalStorageContext={resourceLocalStorageContext}
              resources={resourceLocalStorageContext.get()}
              {...this.props}
            />
          )}
        </ResourceLocalStorageContext.Consumer>
      );
    }
  };
}
