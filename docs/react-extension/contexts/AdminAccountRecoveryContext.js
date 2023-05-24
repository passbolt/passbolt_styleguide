/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";
import {withAccountRecovery} from "./AccountRecoveryUserContext";

export const AdminAccountRecoveryContext = React.createContext({
  currentPolicy: null, // The current policy
  policyChanges: {}, // The policy changes
  findAccountRecoveryPolicy: () => {}, // Find the current policy and store it in the state
  getKeyInfo: () => {}, // Request an amored key info
  changePolicy: () => {}, // Change the policy type
  changePublicKey: () => {}, // Change the policy public key
  hasPolicyChanges: () => {}, // Check if the policy has changes
  resetChanges: () => {}, // Reset the changes made on the policy
  downloadPrivateKey: () => {}, // Download the generated new policy private key
  save: () => {}, // Save the policy changes
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
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      currentPolicy: null, // The current policy
      policyChanges: {}, // The policy changes
      findAccountRecoveryPolicy: this.findAccountRecoveryPolicy.bind(this), // Find the current policy and store it in the state
      getKeyInfo: this.getKeyInfo.bind(this), // Request an amored key info
      changePolicy: this.changePolicy.bind(this), // Change the policy type
      changePublicKey: this.changePublicKey.bind(this), // Change the policy public key
      hasPolicyChanges: this.hasPolicyChanges.bind(this), // Check if the policy has changes
      resetChanges: this.resetChanges.bind(this), // Reset the changes made on the policy
      downloadPrivateKey: this.downloadPrivateKey.bind(this), // Download the generated new policy private key
      save: this.save.bind(this), // Save the policy changes
    };
  }

  /**
   * Find the account recovery policy
   * @return {Promise<void>}
   */
  async findAccountRecoveryPolicy() {
    if (!this.props.context.siteSettings.canIUse('accountRecovery')) {
      return;
    }
    const currentPolicy = await this.props.context.port.request("passbolt.account-recovery.get-organization-policy");
    this.setState({currentPolicy});
  }

  /**
   * Change the policy
   * @param {string} policy The new policy. Any of: mandatory, opt-out, opt-in, disable.
   * @return {Promise<void>}
   */
  async changePolicy(policy) {
    const policyChanges = this.state.policyChanges;

    // If same policy than the current one, remove it from the changes if any.
    if (policy === this.state.currentPolicy?.policy) {
      delete policyChanges.policy;
    } else {
      policyChanges.policy = policy;
    }

    // If disabled policy, remove any public key change from the changes.
    if (policy === "disabled") {
      delete policyChanges.publicKey;
    }

    await this.setState({policyChanges});
  }

  /**
   * Change the public key
   * @param {string} publicKey The new public key in armored format.
   * @returns {Promise<void>}
   */
  async changePublicKey(publicKey) {
    const policyChanges = {...this.state.policyChanges, publicKey};
    await this.setState({policyChanges});
  }

  /**
   * Check if there are changes to apply
   * @returns {Boolean}
   */
  hasPolicyChanges() {
    return Boolean(this.state.policyChanges?.publicKey)
      || Boolean(this.state.policyChanges?.policy);
  }

  /**
   * Get the key info.
   * @param {object} armoredKey The account recovery organization key
   * @returns {Promise<object>} The key info dto
   */
  async getKeyInfo(armoredKey) {
    if (!armoredKey) {
      return null;
    }

    return this.props.context.port.request('passbolt.keyring.get-key-info', armoredKey);
  }

  /**
   * Reset the policy changes
   */
  async resetChanges() {
    const policyChanges = {};
    await this.setState({policyChanges});
  }

  /**
   * Whenever the user wants to download the newly generated organization private key
   * @param {string} privateKey The organization private key
   * @returns {Promise<void>}
   */
  async downloadPrivateKey(privateKey) {
    await this.props.context.port.request("passbolt.account-recovery.download-organization-generated-key", privateKey);
  }

  /**
   * Whenever the save has been requested
   * @param {string} privateGpgKeyDto The current organization private key
   */
  async save(privateGpgKeyDto) {
    const policySaveDto = this.buildPolicySaveDto();
    const currentPolicy = await this.props.context.port.request('passbolt.account-recovery.save-organization-policy', policySaveDto, privateGpgKeyDto);
    const policyChanges = {};
    this.setState({currentPolicy, policyChanges});
    this.props.accountRecoveryContext.reloadAccountRecoveryPolicy();
  }

  /**
   * Build the policy save dto.
   * @returns {object}
   */
  buildPolicySaveDto() {
    const policySaveDto = {};
    if (this.state.policyChanges.policy) {
      policySaveDto.policy = this.state.policyChanges.policy;
    }
    if (this.state.policyChanges.publicKey) {
      policySaveDto.account_recovery_organization_public_key = {
        armored_key: this.state.policyChanges.publicKey
      };
    }
    return policySaveDto;
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
  children: PropTypes.any, // The children components
  accountRecoveryContext: PropTypes.object, // The account recovery context
};
export default withAppContext(withAccountRecovery(AdminAccountRecoveryContextProvider));

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
            adminAccountRecoveryContext => <WrappedComponent adminAccountRecoveryContext={adminAccountRecoveryContext} {...this.props} />
          }
        </AdminAccountRecoveryContext.Consumer>
      );
    }
  };
}

