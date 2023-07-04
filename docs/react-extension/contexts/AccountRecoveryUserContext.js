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
import {withAppContext} from "../../shared/context/AppContext/AppContext";

export const AccountRecoveryUserContext = React.createContext({
  accountRecoveryOrganizationPolicy: null, // The current organization policy
  status: null, // The current account recovery user settings status
  isDataLoaded: false, // True when the data has been loaded
  findAccountRecoveryPolicy: () => {},
  getOrganizationPolicy: () => {},
  getRequestor: () => {},
  getRequestedDate: () => {},
  getPolicy: () => {},
  getUserAccountRecoverySubscriptionStatus: () => {},
  isAccountRecoveryChoiceRequired: () => {},
  isPolicyEnabled: () => {},
  loadAccountRecoveryPolicy: () => {},
  reloadAccountRecoveryPolicy: () => {},
  isReady: () => {},
});

const ACCOUNT_RECOVERY_STATUS_PENDING = 'pending';
const ACCOUNT_RECOVERY_POLICY_MANDATORY = "mandatory";
const ACCOUNT_RECOVERY_POLICY_OPT_OUT = "opt-out";
const ACCOUNT_RECOVERY_POLICY_DISABLED = 'disabled';
const ACCOUNT_RECOVERY_STATUS_APPROVED = 'approved';
/**
 * The related context provider
 */
export class AccountRecoveryUserContextProvider extends React.Component {
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
      accountRecoveryOrganizationPolicy: null, // The current organization policy
      status: null, // The current account recovery user settings status
      isDataLoaded: false, // True when the data has been loaded
      findAccountRecoveryPolicy: this.findAccountRecoveryPolicy.bind(this), // Whenever the account recovery policy is requested
      getOrganizationPolicy: this.getOrganizationPolicy.bind(this), // The current organization account recovery policy details
      getRequestor: this.getRequestor.bind(this), // The current organization account recovery policy requestor
      getRequestedDate: this.getRequestedDate.bind(this), // The date at when the requestor asked for user to subscribe to the account recovery program
      getPolicy: this.getPolicy.bind(this), // The current organization account recovery policy
      getUserAccountRecoverySubscriptionStatus: this.getUserAccountRecoverySubscriptionStatus.bind(this), // The user account recovery program subscription status
      setUserAccountRecoveryStatus: this.setUserAccountRecoveryStatus.bind(this), // Sets the status of the current user account recovery setting
      isAccountRecoveryChoiceRequired: this.isAccountRecoveryChoiceRequired.bind(this), // Returns true if the user has to decide to participate or not for the account recovery program
      isPolicyEnabled: this.isPolicyEnabled.bind(this), // Return true is the policy is enabled
      loadAccountRecoveryPolicy: this.loadAccountRecoveryPolicy.bind(this), // Run the initial load of the account recovery policy
      reloadAccountRecoveryPolicy: this.reloadAccountRecoveryPolicy.bind(this), // Reload the account recovery policy regardless of having it cached or not
      isReady: this.isReady.bind(this), // True when the data has been loaded
    };
  }

  /**
   * Run the initial load of the account recovery policy.
   */
  async loadAccountRecoveryPolicy() {
    if (this.state.isDataLoaded) {
      return;
    }

    await this.findAccountRecoveryPolicy();
  }

  /**
   * Reload the account recovery policy regardless of having it cached or not.
   */
  async reloadAccountRecoveryPolicy() {
    await this.findAccountRecoveryPolicy();
  }

  /**
   * Find the account recovery policy
   */
  async findAccountRecoveryPolicy() {
    if (!this.props.context.siteSettings.canIUse('accountRecovery')) {
      return;
    }

    const loggedInUser = this.props.context.loggedInUser;
    if (!loggedInUser) {
      return;
    }

    const accountRecoveryOrganizationPolicy = await this.props.accountRecoveryUserService.getOrganizationAccountRecoverySettings();
    const status = loggedInUser.account_recovery_user_setting?.status || AccountRecoveryUserContextProvider.STATUS_PENDING;
    this.setState({
      accountRecoveryOrganizationPolicy,
      status,
      isDataLoaded: true
    });
  }

  /**
   * Returns true when the data has been loaded
   * @returns {boolean}
   */
  isReady() {
    return this.state.isDataLoaded;
  }

  /**
   * Returns the full organization policy settings.
   * @returns {object}
   */
  getOrganizationPolicy() {
    return this.state.accountRecoveryOrganizationPolicy;
  }

  /**
   * Get the date at when an administrator asked users to set their account recovery policy setting.
   * @returns {object}
   */
  getRequestedDate() {
    return this.getOrganizationPolicy()?.modified;
  }

  /**
   * Get the user that asked the account recovery policy settings to be set.
   * @returns {object}
   */
  getRequestor() {
    return this.getOrganizationPolicy()?.creator;
  }

  /**
   * Get the organization policy.
   * @returns {string}
   */
  getPolicy() {
    return this.getOrganizationPolicy()?.policy;
  }

  /**
   * Get the current user account recovery setting status.
   * @returns {string}
   */
  getUserAccountRecoverySubscriptionStatus() {
    return this.state.status;
  }

  /**
   * Set the current user account recovery setting.
   * @param {string} status
   */
  setUserAccountRecoveryStatus(status) {
    this.setState({status: status});
  }

  /**
   * Returns true if the current user has to choose for an account recovery setting.
   * In that case, the organization account recovery setting has to be set with "mandatory" or "opt-out",
   * plus the user shouldn't have made a choice yet.
   * @returns {bool}
   */
  isAccountRecoveryChoiceRequired() {
    if (this.getOrganizationPolicy() === null) {
      return false;
    }

    const policy = this.getPolicy();
    return this.state.status === AccountRecoveryUserContextProvider.STATUS_PENDING
      && policy !== AccountRecoveryUserContextProvider.POLICY_DISABLED;
  }

  /**
   * Return true if the policy is not set to POLICY_DISABLED
   * @returns {boolean}
   */
  isPolicyEnabled() {
    const policy = this.getPolicy();
    return policy && policy !== AccountRecoveryUserContextProvider.POLICY_DISABLED;
  }

  static get STATUS_PENDING() {
    return ACCOUNT_RECOVERY_STATUS_PENDING;
  }

  static get POLICY_DISABLED() {
    return ACCOUNT_RECOVERY_POLICY_DISABLED;
  }

  static get POLICY_MANDATORY() {
    return ACCOUNT_RECOVERY_POLICY_MANDATORY;
  }

  static get POLICY_OPT_OUT() {
    return ACCOUNT_RECOVERY_POLICY_OPT_OUT;
  }

  static get STATUS_APPROVED() {
    return ACCOUNT_RECOVERY_STATUS_APPROVED;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AccountRecoveryUserContext.Provider value={this.state}>
        {this.props.children}
      </AccountRecoveryUserContext.Provider>
    );
  }
}

AccountRecoveryUserContextProvider.propTypes = {
  context: PropTypes.any.isRequired, // The application context
  children: PropTypes.any, // The children components
  accountRecoveryUserService: PropTypes.object.isRequired // The service responsible to fetch the account recovery user data
};
export default withAppContext(AccountRecoveryUserContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAccountRecovery(WrappedComponent) {
  return class WithAccountRecovery extends React.Component {
    render() {
      return (
        <AccountRecoveryUserContext.Consumer>
          {
            accountRecoveryContext => <WrappedComponent accountRecoveryContext={accountRecoveryContext} {...this.props} />
          }
        </AccountRecoveryUserContext.Consumer>
      );
    }
  };
}
