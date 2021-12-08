/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.5.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";

export const AdminAccountRecoveryContext = React.createContext({
  currentPolicy: null, // The current policy
  newPolicy: null, // The new policy
  hasChanged: false, // If the policy has changed
  step: null, // Step for the save process
  findAccountRecoveryPolicy: () => {
  }, // Whenever the account recovery policy is requested
  changePolicy: () => {
  }, // Whenever the policy has changed
  initiateSaveRequested: () => {
  }, // Whenever the initialization of the save is requested
  confirmSaveRequested: () => {
  }, // Whenever the confirmation of save is requested
  save: () => {
  } // Whenever the save is requested
});

/**
 * The related context provider
 */
export class AdminAccountRecoveryContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState, props.value);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      currentPolicy: null, // The current policy
      newPolicy: null, // The new policy
      hasChanged: false, // If the policy has changed
      step: AdminAccountRecoveryContextState.INITIAL_STATE, // Step for the save process
      findAccountRecoveryPolicy: this.findAccountRecoveryPolicy.bind(this), // Whenever the account recovery policy is requested
      changePolicy: this.changePolicy.bind(this), // Whenever the policy has changed
      initiateSaveRequested: this.initiateSaveRequested.bind(this), // Whenever the initialization of the save is requested
      confirmSaveRequested: this.confirmSaveRequested.bind(this), // Whenever the confirmation of save is requested
      save: this.save.bind(this) // Whenever the save is requested
    };
  }

  /**
   * Find the account recovery policy
   */
  async findAccountRecoveryPolicy() {
    const currentPolicy = await this.props.context.port.request('passbolt.account-recovery.get');
    await this.setState({currentPolicy});
  }


  /**
   * Change the policy
   *
   * @param newPolicy
   * @returns {Promise<void>}
   */
  async changePolicy(newPolicy) {
    const hasChanged = this.checkDiffBetweenPolicy(this.state.currentPolicy, newPolicy);
    await this.setState({newPolicy, hasChanged});
  }

  /**
   * Check difference between two policies
   * @param currentPolicy
   * @param newPolicy
   * @returns {boolean}
   */
  checkDiffBetweenPolicy(currentPolicy, newPolicy) {
    if (currentPolicy.policy !== newPolicy.policy) {
      return true;
    } else if (currentPolicy.account_recovery_organization_public_key && newPolicy.account_recovery_organization_public_key) {
      if (currentPolicy.account_recovery_organization_public_key.fingerprint !==  newPolicy.account_recovery_organization_public_key.fingerprint) {
        return true;
      }
    } else if (newPolicy.account_recovery_organization_public_key) {
      return true;
    }
    return false;
  }

  /**
   * Whenever the initiate save is requested
   */
  async initiateSaveRequested() {
    const step = AdminAccountRecoveryContextState.DISPLAY_SUMMARY;
    await this.setState({step});
  }

  /**
   * Whenever the confirm save is requested
   */
  async confirmSaveRequested() {
    const step = AdminAccountRecoveryContextState.ENTER_CURRENT_ORK;
    await this.setState({step});
  }

  /**
   * Whenever the save has been requested
   */
  async save() {
    await this.props.context.port.request('passbolt.account-recovery.save-organization-settings', this.state.newPolicy);
    const currentPolicy = this.state.newPolicy;
    await this.setState({currentPolicy});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminAccountRecoveryContext.Provider value={this.state}>
        {this.props.children}
      </AdminAccountRecoveryContext.Provider>
    );
  }
}

AdminAccountRecoveryContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  value: PropTypes.any, // The initial value of the context
  children: PropTypes.any // The children components
};
export default withAppContext(AdminAccountRecoveryContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminAccountRecovery(WrappedComponent) {
  return class WithAdminAccountRecovery extends React.Component {
    render() {
      return (
        <AdminAccountRecoveryContext.Consumer>
          {
            AdminAccountRecoveryContext => <WrappedComponent adminAccountRecoveryContext={AdminAccountRecoveryContext} {...this.props} />
          }
        </AdminAccountRecoveryContext.Consumer>
      );
    }
  };
}

/**
 * The admin account recovery types of state
 */
export const AdminAccountRecoveryContextState = {
  INITIAL_STATE: 'Initial State',
  DISPLAY_SUMMARY: 'Display summary',
  ENTER_CURRENT_ORK: 'Enter current ork',
};
