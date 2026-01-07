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
import ResourceTypesCollection from "../../models/entity/resourceType/resourceTypesCollection";

export const ResourceTypesLocalStorageContext = React.createContext({
  get: () => {}, // Get the resource types from the local storage and/or init them if not the case already
  resourceTypes: null, // the current resource types loaded from the local storage
  updateLocalStorage: () => {}, // triggers an update of the local storage
});

/**
 * The resource types local storage context provider
 */
export class ResourceTypesLocalStorageContextProvider extends React.Component {
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
      get: this.get.bind(this), // Get the resource types from the local storage and/or init them if not the case already
      resourceTypes: null, // the current resource types loaded from the local storage
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
   * Handles update of the resource types in the local storage.
   */
  handleStorageChange(changes) {
    if (changes.resourceTypes) {
      this.set(changes.resourceTypes.newValue);
    }
  }

  /**
   * Set resourceTypes.
   * @param {Array<Object>} resourceTypes The resource types to set.
   * @private
   */
  set(resourceTypes) {
    const resourceTypesCollection = new ResourceTypesCollection(resourceTypes);
    this.setState({ resourceTypes: resourceTypesCollection });
  }

  /**
   * Get the resource types from the local storage and/or init them if not the case already.
   * @returns {ResourceTypesCollection|null}
   */
  get() {
    if (this.state.resourceTypes === null) {
      this.loadLocalStorage();
      return null;
    }

    return this.state.resourceTypes;
  }

  /**
   * Load the resource types from the local storage if it is available.
   * If the local storage is not yet initialised, then it asks for its initialisation.
   * @returns {Promise<void>}
   * @private
   */
  async loadLocalStorage() {
    const storageData = await this.props.context.storage.local.get(["resourceTypes"]);
    if (!storageData.resourceTypes) {
      this.updateLocalStorage();
      return;
    }

    this.set(storageData.resourceTypes);
  }

  /**
   * Forces the update of the resource types in the local storage.
   * @return {Promise<void>}
   */
  async updateLocalStorage() {
    if (this.runningLocalStorageUpdatePromise === null) {
      this.runningLocalStorageUpdatePromise = this.props.context.port.request("passbolt.resource-type.get-or-find-all");
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
      <ResourceTypesLocalStorageContext.Provider value={this.state}>
        {this.props.children}
      </ResourceTypesLocalStorageContext.Provider>
    );
  }
}

ResourceTypesLocalStorageContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};
export default withAppContext(ResourceTypesLocalStorageContextProvider);

/**
 * Resource Types Local Storage Context Consumer HOC
 * @param WrappedComponent
 */
export function withResourceTypesLocalStorage(WrappedComponent) {
  return class withResourceTypesLocalStorage extends React.Component {
    render() {
      return (
        <ResourceTypesLocalStorageContext.Consumer>
          {(resourceTypesLocalStorageContext) => (
            <WrappedComponent
              resourceTypesLocalStorageContext={resourceTypesLocalStorageContext}
              resourceTypes={resourceTypesLocalStorageContext.get()}
              {...this.props}
            />
          )}
        </ResourceTypesLocalStorageContext.Consumer>
      );
    }
  };
}
