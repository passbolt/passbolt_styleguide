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
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import RbacsCollection from "../../../../shared/models/entity/rbac/rbacsCollection";
import RbacService from "../../../../shared/services/api/rbac/rbacService";
import RoleService from "../../../../shared/services/api/role/roleService";
import RbacEntity from "../../../../shared/models/entity/rbac/rbacEntity";

/**
 * The Administration RBACS Context
 * @type {React.Context<Object>}
 */
export const AdminRbacContext = React.createContext({
  processing: false, // Is it processing.
  rbacs: null, // The rbacs settings.
  rbacsUpdated: {}, // The updated rbacs settings.
  setRbacs: () => {}, // Set the rbacs.
  setRbacsUpdated: () => {}, //  Set the updated rbacs.
  save: () => {}, // Save settings
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  hasSettingsChanges: () => {}, // returns true if a setting has changed and the UI must be enabled
  clearContext: () => {}, // put the data to its default state value
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
      setRbacs: this.setRbacs.bind(this),
      setRbacsUpdated: this.setRbacsUpdated.bind(this),
      isProcessing: this.isProcessing.bind(this),
      hasSettingsChanges: this.hasSettingsChanges.bind(this),
      save: this.save.bind(this),
      clearContext: this.clearContext.bind(this)
    };
  }

  /**
   * Set the rbacs
   * @param {RbacsCollection} rbacs The rbacs collection to set.
   * @return {void}
   */
  async setRbacs(rbacs) {
    this.setState({rbacs});
  }

  /**
   * Set the updated rbacs
   * @param {RbacsCollection} rbacsUpdated The updated rbacs collection to set.
   * @return {void}
   */
  async setRbacsUpdated(rbacsUpdated) {
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
  hasSettingsChanges() {
    return this.state.rbacsUpdated.rbacs.length > 0;
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {rbacs, rbacsUpdated, processing} = this.defaultState;
    this.setState({rbacs, rbacsUpdated, processing});
  }

  /**
   * Whenever the save has been requested
   */
  async save() {
    this.setProcessing(true);
    try {
      const rbacsUpdatedDto = this.state.rbacsUpdated.toBulkUpdateDto();
      const rbacsUpdatedResultDto = await this.rbacService.updateAll(rbacsUpdatedDto, {ui_action: true, action: true});
      const rbacs = this.state.rbacs;
      rbacsUpdatedResultDto.forEach(rbacUpdatedResultDto => rbacs.addOrReplace(new RbacEntity(rbacUpdatedResultDto)));
      const rbacsUpdated = new RbacsCollection([]);
      this.setState({rbacs, rbacsUpdated});
    } finally {
      this.setProcessing(false);
    }
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
