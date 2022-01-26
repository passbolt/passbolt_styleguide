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
 * @since         3.6.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";

export const AccountRecoveryUserContext = React.createContext({
  accountRecoveryOrganizationPolicy: null, // The current organization policy
  status: null, // The current account recovery user settings status
  findAccountRecoveryPolicy: () => {},
  getOrganizationPolicy: () => {},
  getRequestor: () => {},
  getRequestedDate: () => {},
  getPolicy: () => {},
});

const ACCOUNT_RECOVERY_STATUS_PENDING = 'pending';

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
      findAccountRecoveryPolicy: this.findAccountRecoveryPolicy.bind(this), // Whenever the account recovery policy is requested
      getOrganizationPolicy: this.getOrganizationPolicy.bind(this),
      getRequestor: this.getRequestor.bind(this),
      getRequestedDate: this.getRequestedDate.bind(this),
      getPolicy: this.getPolicy.bind(this),
    };
  }

  /**
   * Find the account recovery policy
   */
  async findAccountRecoveryPolicy() {
    const accountRecoveryOrganizationPolicy = await this.props.accountRecoveryUserService.getOrganizationAccountRecoverySettings();
    const status = this.props.context.loggedInUser.account_recovery_user_setting ? this.props.context.loggedInUser.account_recovery_user_setting : ACCOUNT_RECOVERY_STATUS_PENDING;
    this.setState({
      accountRecoveryOrganizationPolicy,
      status
    });
  }

  getOrganizationPolicy() {
    return this.state.accountRecoveryOrganizationPolicy;
  }

  getRequestedDate() {
    return this.getOrganizationPolicy().modified;
  }

  getRequestor() {
    return this.getOrganizationPolicy().creator;
  }

  getPolicy() {
    return this.getOrganizationPolicy().policy;
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
