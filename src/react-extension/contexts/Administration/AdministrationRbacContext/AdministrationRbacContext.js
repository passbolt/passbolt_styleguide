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
 * @since         4.O.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../AppContext";
import RbacsCollection from "../../../../shared/models/entity/rbac/rbacsCollection";
import RbacService from "../../../../shared/services/api/rbac/rbacService";
import RoleService from "../../../../shared/services/api/role/roleService";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection";
import RbacEntity from "../../../../shared/models/entity/rbac/rbacEntity";

/**
 * The Administration RBACS Context
 * @type {React.Context<Object>}
 */
export const AdminRbacContext = React.createContext({
  processing: false, // Is it processing.
  rbacs: null, // The rbacs settings.
  rbacsUpdated: {}, // The rbacs updated settings.
  loadSettings: () => {}, // Load the settings.
  getCtlFunctionForActionAndRole: () => {}, // Get the control function defined for a given role and a given action
  updateRbacControlFunction: () => {}, // Update a rbac control function.
  save: () => {}, // Save settings
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  // clearContext: () => {}, // put the data to its default state value
});

export class AdminRbacContextProvider extends React.Component {
  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.rbacService = new RbacService(apiClientOptions);
    this.roleService = new RoleService(apiClientOptions);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      processing: false,
      rbacs: null,
      rbacsUpdated: new RbacsCollection([]),
      loadSettings: this.loadSettings.bind(this),
      getCtlFunctionForActionAndRole: this.getCtlFunctionForActionAndRole.bind(this),
      updateRbacControlFunction: this.updateRbacControlFunction.bind(this),
      isProcessing: this.isProcessing.bind(this),
      save: this.save.bind(this)
    };
  }

  /**
   * Load the rbac settings.
   * @return {Promise<void>}
   */
  async loadSettings() {
    // @todo handle entry point missing.
    const rbacs = await this.findRbacs();
    const roles = await this.findRoles();

    this.setState({rbacs, roles});
  }

  /**
   * Fetch the rbacs.
   * @return {Promise<RbacsCollection>}
   */
  async findRbacs() {
    const rbacsDto = await this.rbacService.findAll({ui_action: true});
    return new RbacsCollection(rbacsDto);
  }

  /**
   * Find the roles.
   * @return {Promise<RolesCollection>}
   */
  async findRoles() {
    const rolesDto = await this.roleService.findAll();
    return new RolesCollection(rolesDto);
  }

  /**
   * Get the control function defined for a given role and a given action
   * @param {string} roleId The role to get the control for.
   * @param {string} actionName The action name to get the control function for.
   * @return {string|null}
   */
  getCtlFunctionForActionAndRole(roleId, actionName) {
    const role = this.state.roles.getFirst('id', roleId);
    let rbac = this.state.rbacsUpdated.findRbacByRoleAndUiActionName(role, actionName);
    if (!rbac) {
      rbac = this.state.rbacs.findRbacByRoleAndUiActionName(role, actionName);
    }
    if (!rbac) {
      return null;
    }

    return rbac?.controlFunction;
  }

  /**
   * Update a rbac setting.
   * @param {RoleEntity} role The role to update the rbac for.
   * @param {string} actionName The action to update the rbac for.
   * @param {string} controlFunction The new control function for the rbac.
   */
  updateRbacControlFunction(role, actionName, controlFunction) {
    const rbacsUpdated = this.state.rbacsUpdated;
    const rbac = this.state.rbacs.findRbacByRoleAndUiActionName(role, actionName);

    // If the function is has the original one, remove it from the list of changes.
    if (rbac.controlFunction === controlFunction) {
      rbacsUpdated.remove(rbac);
    } else {
      // If the control function is not the rbac to the list of changes.
      const clonedRbac = new RbacEntity(rbac.toDto({ui_action: true, action: true}));
      clonedRbac.controlFunction = controlFunction;
      rbacsUpdated.addOrReplace(clonedRbac);
    }

    this.setState({rbacsUpdated});
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
  hasLocaleChanges() {
    return this.state.rbacsUpdated !== this.state.currentLocale;
  }

  // /**
  //  * Puts the state to its default in order to avoid keeping the data users didn't want to save.
  //  */
  // clearContext() {
  //   const {currentLocale, locale, processing} = this.defaultState;
  //   this.setState({
  //     currentLocale, locale, processing
  //   });
  // }

  /**
   * Whenever the save has been requested
   */
  async save() {
    this.setProcessing(true);
    const rbacsUpdatedDto = this.state.rbacsUpdated.toBulkUpdateDto();
    const rbacsUpdatedResultDto = await this.rbacService.updateAll(rbacsUpdatedDto, {ui_action: true, action: true});
    const rbacs = this.state.rbacs;
    rbacsUpdatedResultDto.forEach(rbacUpdatedResultDto => rbacs.addOrReplace(new RbacEntity(rbacUpdatedResultDto)));
    const rbacsUpdated = new RbacsCollection([]);
    this.setState({rbacs, rbacsUpdated});
    this.setProcessing(false);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminRbacContext.Provider value={this.state}>
        {this.props.children}
      </AdminRbacContext.Provider>
    );
  }
}

AdminRbacContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(AdminRbacContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminRbac(WrappedComponent) {
  return class WithAdminRbac extends React.Component {
    render() {
      return (
        <AdminRbacContext.Consumer>
          {
            adminRbacContext => <WrappedComponent adminRbacContext={adminRbacContext} {...this.props} />
          }
        </AdminRbacContext.Consumer>
      );
    }
  };
}
