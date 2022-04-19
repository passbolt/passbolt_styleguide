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
import {withAppContext} from "../AppContext";

// The authentication account recovery workflow states.
export const AuthenticationAccountRecoveryWorkflowStates = {
  VERIFY_PASSPHRASE: "Validate Passphrase",
  RECOVERING_ACCOUNT: "Recovering Account",
  SIGNING_IN: 'Signing in',
  LOADING: "Loading",
  UNEXPECTED_ERROR: "Unexpected Error",
};

/**
 * The authentication account recovery context.
 * Handle the business logic of the account recovery and the associated workflow
 * @type {React.Context<Object>}
 */
export const AuthenticationAccountRecoveryContext = React.createContext({
  // Workflow data.
  state: null, // The recover workflow current state
  error: null, // The current error

  // Workflow mutators.
  verifyPassphrase: () => {
  }, // Verify the user wants to check the account recovery temporary gpgkey passphrase
  complete: () => {
  }, // Complete the account recovery
  goToRestartFromScratch: () => {
  }, // Go to restart from scratch
});

/**
 * The authentication recover context provider.
 * Handle the business logic of the recover and the associated workflow.
 */
export class AuthenticationAccountRecoveryContextProvider extends React.Component {
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
      // Workflow data.
      state: AuthenticationAccountRecoveryWorkflowStates.LOADING, // The account recovery workflow current state
      error: null, // The current error
      account: null, // The account recovery associated account.

      // Public workflow mutators.
      verifyPassphrase: this.verifyPassphrase.bind(this), // Verify the user wants to check the account recovery temporary gpgkey passphrase
      complete: this.complete.bind(this), // Complete the account recovery request
      goToRestartFromScratch: this.goToRestartFromScratch.bind(this), // Go to restart from scratch
    };
  }

  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initialize();
  }

  /**
   * Initialize the authentication account recovery workflow
   * @returns {Promise<void>}
   */
  async initialize() {
    if (!(await this.verifyCanContinueAccountRecovery())) {
      return;
    }
    await this.goToValidatePassphrase();
  }

  /**
   * Verify the user can continue the account recovery process.
   * @returns {Promise<void>}
   */
  async verifyCanContinueAccountRecovery() {
    try {
      await this.props.context.port.request("passbolt.account-recovery.continue");
      return true;
    } catch (error) {
      // It shouldn't occur. For any errors at this stage, the background page will destroy the iframe an let the application served by the API take care of it.
      await this.handleUnexpectedError(error);
      return false;
    }
  }

  /**
   * Go to the validate account passphrase.
   * @returns {Promise<void>}
   */
  async goToValidatePassphrase() {
    try {
      const account = await this.props.context.port.request("passbolt.account-recovery.get-account");
      await this.setState({state: AuthenticationAccountRecoveryWorkflowStates.VERIFY_PASSPHRASE, account: account});
    } catch (error) {
      await this.handleUnexpectedError(error);
    }
  }

  /**
   * Verify the user account recovery temporary gpgkey passphrase.
   * @param {string} passphrase The passphrase.
   * @returns {Promise<void>}
   * @throw {Error} If an expected errors is returned by the background page, rethrow it for the caller component.
   *  Errors of type: InvalidMasterPasswordError.
   */
  async verifyPassphrase(passphrase) {
    try {
      await this.props.context.port.request("passbolt.account-recovery.verify-passphrase", passphrase);
    } catch (error) {
      if (error.name === "InvalidMasterPasswordError") {
        throw error;
      }
      await this.handleUnexpectedError(error);
    }
  }

  /**
   * Complete the account recovery.
   * @param {string} passphrase The passphrase.
   * @param {boolean} rememberMe (Optional) Should the passphrase be remembered? Default false.
   * @returns {Promise<void>}
   */
  async complete(passphrase, rememberMe = false) {
    const accountRecovered = await this.recoverAccount(passphrase);
    if (!accountRecovered) {
      return;
    }
    await this.signIn(passphrase, rememberMe);
  }

  /**
   * Recover the account
   * @param {string} passphrase The passphrase.
   * @returns {Promise<boolean>}
   */
  async recoverAccount(passphrase) {
    await this.setState({state: AuthenticationAccountRecoveryWorkflowStates.RECOVERING_ACCOUNT});
    try {
      await this.props.context.port.request("passbolt.account-recovery.recover-account", passphrase);
      return true;
    } catch (error) {
      // @todo Should we handle differently request already completed error?
      await this.handleUnexpectedError(error);
      return false;
    }
  }

  /**
   * Sign-in.
   * @param {string} passphrase The passphrase.
   * @param {boolean} rememberMe (Optional) Should the passphrase be remembered? Default false.
   * @returns {Promise<void>}
   */
  async signIn(passphrase, rememberMe = false) {
    await this.setState({state: AuthenticationAccountRecoveryWorkflowStates.SIGNING_IN});
    try {
      await this.props.context.port.request("passbolt.account-recovery.sign-in", passphrase, rememberMe);
    } catch (error) {
      await this.handleUnexpectedError(error);
    }
  }

  /**
   * Go to the restart from scratch screen.
   * @returns {Promise<void>}
   */
  async goToRestartFromScratch() {
    await this.props.context.port.request("passbolt.account-recovery.destroy-iframe");
  }

  /**
   * Handle unexpected error.
   * @param {Object} error The error.
   * @returns {Promise<void>}
   */
  async handleUnexpectedError(error) {
    await this.setState({state: AuthenticationAccountRecoveryWorkflowStates.UNEXPECTED_ERROR, error: error});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AuthenticationAccountRecoveryContext.Provider value={this.state}>
        {this.props.children}
      </AuthenticationAccountRecoveryContext.Provider>
    );
  }
}

AuthenticationAccountRecoveryContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any // The children components
};
export default withAppContext(AuthenticationAccountRecoveryContextProvider);

/**
 * Authentication account recovery context consumer HOC
 * @param {React.Component} WrappedComponent The component to wrap
 */
export function withAuthenticationAccountRecoveryContext(WrappedComponent) {
  return class WithAuthenticationContext extends React.Component {
    render() {
      return (
        <AuthenticationAccountRecoveryContext.Consumer>
          {
            authenticationAccountRecoveryContext => <WrappedComponent
              authenticationAccountRecoveryContext={authenticationAccountRecoveryContext} {...this.props} />
          }
        </AuthenticationAccountRecoveryContext.Consumer>
      );
    }
  };
}