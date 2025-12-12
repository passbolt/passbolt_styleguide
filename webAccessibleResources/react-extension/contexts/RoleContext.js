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
 * @since         5.8.0
 */

import React from "react";
import PropTypes from "prop-types";
import RolesCollection from "../../shared/models/entity/role/rolesCollection";
import RoleServiceWorkerService from "../../shared/services/serviceWorker/role/roleServiceWorkerService";
import {withAppContext} from "../../shared/context/AppContext/AppContext";

export const RoleContext = React.createContext({
  getRole: () => {},
  getAllRoles: () => {},
  refreshRoles: () => {},
});

export class RoleContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState();
    this.runningLocalStorageUpdatePromise = null;
    this.roleServiceWorkerService = new RoleServiceWorkerService(props.context.port);
    this.initEventHandlers();
  }

  /**
   * Returns the default component state
   */
  defaultState() {
    return {
      rolesCollection: null,
      getRole: this.getRole.bind(this),
      getAllRoles: this.getAllRoles.bind(this),
      refreshRoles: this.refreshRoles.bind(this),
    };
  }

  /**
   * @inheritdoc
   */
  componentDidMount() {
    this.props.context.storage.onChanged.addListener(this.handleStorageChange);
  }

  /**
   * @inheritdoc
   */
  componentWillUnmount() {
    this.props.context.storage.onChanged.removeListener(this.handleStorageChange);
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleStorageChange = this.handleStorageChange.bind(this);
  }

  /**
   * Handles update of the metadata type settings in the local storage.
   */
  handleStorageChange(changes) {
    if (!changes[this.storageKey]) {
      return;
    }

    this.set(changes[this.storageKey].newValue);
  }

  /**
   * Set roles from dto.
   * @param {Array} rolesCollectionDto The roles collection dto to set.
   * @private
   */
  set(rolesCollectionDto) {
    const rolesCollection = new RolesCollection(rolesCollectionDto);
    this.setState({rolesCollection});
  }

  /**
   * Get the storage key.
   * @returns {string}
   */
  get storageKey() {
    return 'roles';
  }

  /**
   * Get a role given its id.
   * If the role is not find, returns null and triggers a refresh of the local storage
   * @param {string} roleId
   * @returns {RoleEntity|null}
   */
  getRole(roleId) {
    const role = this.state.rolesCollection?.getById(roleId);
    if (!role) {
      this.refreshRoles();
      return null;
    }

    return role;
  }

  /**
   * Load the roles from the local storage if it is available.
   * If the local storage is not yet initialised, then it asks for its initialisation.
   * @returns {Promise<void>}
   * @private
   */
  async loadLocalStorage() {
    const storageData = await this.props.context.storage.local.get([this.storageKey]);
    if (!storageData[this.storageKey]) {
      this.refreshRoles();
      return;
    }

    this.set(storageData[this.storageKey]);
  }


  /**
   * Returns all known roles.
   * @returns {RolesCollection|null}
   */
  getAllRoles() {
    if (!this.state.rolesCollection) {
      this.loadLocalStorage();
      return null;
    }

    return this.state.rolesCollection;
  }

  /**
   * Triggers a role local storage update.
   * @returns {Promise<void>}
   */
  async refreshRoles() {
    if (this.runningLocalStorageUpdatePromise !== null) {
      await this.runningLocalStorageUpdatePromise;
      return;
    }

    this.runningLocalStorageUpdatePromise = this.roleServiceWorkerService.updateResourceLocalStorage();
    await this.runningLocalStorageUpdatePromise;
    this.runningLocalStorageUpdatePromise = null;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <RoleContext.Provider value={this.state}>
        {this.props.children}
      </RoleContext.Provider>
    );
  }
}

RoleContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children component
};

RoleContextProvider.displayName = 'RoleContextProvider';

export default withAppContext(RoleContextProvider);

/**
 * Role Context Consumer HOC
 * @param WrappedComponent
 */
export function withRoles(WrappedComponent) {
  return class withRoles extends React.Component {
    render() {
      return (
        <RoleContext.Consumer>
          {context => <WrappedComponent
            roleContext={context}
            roles={context.getAllRoles()}
            {...this.props}
          />}
        </RoleContext.Consumer>
      );
    }
  };
}
