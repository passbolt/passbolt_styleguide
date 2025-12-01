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
      rolesCollection: new RolesCollection(),
      getRole: this.getRole.bind(this),
      getAllRoles: this.getAllRoles.bind(this),
      refreshRoles: this.refreshRoles.bind(this),
    };
  }

  /**
   * @inheritdoc
   */
  async componentDidMount() {
    this.props.context.storage.onChanged.addListener(this.handleStorageChange);
    await this.refreshRoles();
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

    const rolesCollectionDto = changes[this.storageKey].newValue;
    this.setState({rolesCollection: new RolesCollection(rolesCollectionDto)});
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
   * @returns {Promise<RoleEntity|null>}
   */
  async getRole(roleId) {
    const role = this.state.rolesCollection?.getById(roleId);
    if (!role) {
      this.refreshRoles();
      return null;
    }

    return role;
  }

  /**
   * Returns all known roles.
   * @returns {RolesCollection}
   */
  getAllRoles() {
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
          {context => <WrappedComponent {...this.props}
            roleContext={context}
            roles={context.getAllRoles()}
          />}
        </RoleContext.Consumer>
      );
    }
  };
}
