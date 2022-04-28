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

// The authentication login workflow states.
export const AuthenticationLoginWorkflowStates = {
  ACCEPT_NEW_SERVER_KEY: "Accept new server key",
  LOADING: "Loading",
  SIGN_IN: "Sign in",
  SIGN_IN_ERROR: "Sign in error",
  SIGNING_IN: "Signing in",
  INITIATE_ACCOUNT_RECOVERY: "Initiate account recovery",
  HELP_CREDENTIALS_LOST: "Help credentials lost",
  UNEXPECTED_ERROR: "Unexpected error",
  CHECK_MAILBOX: "Check mailbox",
};

/**
 * The authentication login context provider.
 * Handle the business logic of the login and the manage the workflow.
 * @type {React.Context<{}>}
 */
export const AuthenticationLoginContext = React.createContext({
  // Workflow data.
  state: null, // The current login workflow state.
  serverKey: null, // The server key, state used when the server key changed.
  error: null, // The current error if any, state used when an unexpected error occurred.

  // Public workflow mutators.
  checkPassphrase: () => {
  }, // Whenever a user passphrase check is required.
  signIn: () => {
  }, // Whenever a user sign-in is required.
  handleSwitchAccount: () => {
  }, // Whenever a switch account is required.
  acceptNewServerKey: () => {
  }, // Whenever a new server gpg key is accepted.
  needHelpCredentialsLost: () => {
  }, // Whenever a user lost its passphrase.
  requestHelpCredentialsLost: () => {
  }, // Whenever the user wants to request help because it lost its credentials.
  goToValidatePassphrase: () => {
  }, // Whenever the users wants to go to the validate passphrase.
});

/**
 * The authentication login context provider.
 * Handle the business logic of the login and the manage the workflow.
 */
export class AuthenticationLoginContextProvider extends React.Component {
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
      state: AuthenticationLoginWorkflowStates.LOADING, // The current login workflow state.
      serverKey: null, // The server key, state used when the server key changed.
      error: null, // The current error if any.

      // Public workflow mutators.
      checkPassphrase: this.checkPassphrase.bind(this), // Whenever a user passphrase check is required.
      signIn: this.signIn.bind(this), // Whenever a user sign-in is required.
      handleSwitchAccount: this.handleSwitchAccount.bind(this), // Whenever a switch account is required.
      acceptNewServerKey: this.acceptNewServerKey.bind(this), // Whenever a new server gpg key is accepted.
      needHelpCredentialsLost: this.needHelpCredentialsLost.bind(this), // Whenever a user lost its passphrase.
      requestHelpCredentialsLost: this.requestHelpCredentialsLost.bind(this), // Whenever the user wants to request help because it lost its credentials.
      goToValidatePassphrase: this.goToValidatePassphrase.bind(this), // Whenever the users wants to go to the validate passphrase.
    };
  }

  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initialize();
  }

  /**
   * Initialize the authentication login workflow
   * @returns {Promise<void>}
   */
  async initialize() {
    await this.verifyServerKey();
  }

  /**
   * Verify the server key.
   * @returns {Promise<void>}
   */
  async verifyServerKey() {
    try {
      await this.props.context.port.request('passbolt.auth.verify-server-key');
      await this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN});
    } catch (error) {
      await this.handleVerifyServerKeyFailure(error);
    }
  }

  /**
   * Whenever the verify server key has been done with failure
   * @param error An error occurred while the server key verification
   */
  async handleVerifyServerKeyFailure(error) {
    if (error.name === "KeyIsExpiredError") {
      // Nothing to do. @todo document why?
    } else if (error.name === "ServerKeyChangedError") {
      const serverKey = await this.props.context.port.request('passbolt.auth.get-server-key');
      await this.setState({state: AuthenticationLoginWorkflowStates.ACCEPT_NEW_SERVER_KEY, serverKey});
    } else if (error.name === "UserNotFoundError") {
      // This case should be treated by the background page itself, and the login form should not be displayed.
    } else {
      await this.setState({state: AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the user wants to check its passphrase.
   * @param {string} passphrase The user passphrase
   * @returns {Promise<void>}
   */
  async checkPassphrase(passphrase) {
    try {
      await this.props.context.port.request('passbolt.auth.verify-passphrase', passphrase);
    } catch (error) {
      if (error.name === "InvalidMasterPasswordError" || error.name === "GpgKeyError") {
        // Expected errors controlled by the component CheckPassphrase, throw it.
        throw error;
      } else {
        await this.setState({state: AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR, error: error});
      }
    }
  }

  /**
   * Whenever the user wants to sign in.
   * @param {string} passphrase The user passphrase
   * @param {boolean} rememberMe (Optional) Should the passphrase remembered? default false.
   * @returns {Promise<void>}
   */
  async signIn(passphrase, rememberMe = false) {
    await this.setState({state: AuthenticationLoginWorkflowStates.SIGNING_IN});
    try {
      await this.props.context.port.request('passbolt.auth.login', passphrase, rememberMe);
      this.props.context.port.request('passbolt.auth.post-login-redirect');
    } catch (error) {
      await this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN_ERROR, error});
    }
  }

  /**
   * Whenever the user wants to switch account.
   */
  handleSwitchAccount() {
    const url = `${this.props.context.userSettings.getTrustedDomain()}/users/recover?locale=${this.props.context.locale}`;
    window.open(url, '_parent', 'noopener,noreferrer');
  }

  /**
   * Whenever the user accepts the new server key.
   * @returns {Promise<void>}
   */
  async acceptNewServerKey() {
    try {
      await this.props.context.port.request('passbolt.auth.replace-server-key');
      this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN});
    } catch (error) {
      await this.setState({state: AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the user lost its passphrase.
   * @returns {Promise<void>}
   */
  async needHelpCredentialsLost() {
    const canIUserAccountRecovery = this.props.context.siteSettings.canIUse('accountRecovery');
    if (canIUserAccountRecovery) {
      await this.setState({state: AuthenticationLoginWorkflowStates.INITIATE_ACCOUNT_RECOVERY});
    } else {
      await this.setState({state: AuthenticationLoginWorkflowStates.HELP_CREDENTIALS_LOST});
    }
  }

  /**
   * Whenever the user wants to request help because it lost its credentials.
   * @returns {Promise<void>}
   */
  async requestHelpCredentialsLost() {
    try {
      await this.props.context.port.request('passbolt.auth.request-help-credentials-lost');
      await this.setState({state: AuthenticationLoginWorkflowStates.CHECK_MAILBOX});
    } catch (error) {
      await this.setState({state: AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the users wants to go to the validate passphrase.
   * @returns {Promise<void>}
   */
  async goToValidatePassphrase() {
    await this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AuthenticationLoginContext.Provider value={this.state}>
        {this.props.children}
      </AuthenticationLoginContext.Provider>
    );
  }
}

AuthenticationLoginContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any // The children components
};
export default withAppContext(AuthenticationLoginContextProvider);

/**
 * Authentication login context consumer HOC
 * @param {React.Component} WrappedComponent The component to wrap
 */
export function withAuthenticationLoginContext(WrappedComponent) {
  return class WithAuthenticationContext extends React.Component {
    render() {
      return (
        <AuthenticationLoginContext.Consumer>
          {
            AuthenticationLoginContext => <WrappedComponent
              authenticationLoginContext={AuthenticationLoginContext} {...this.props} />
          }
        </AuthenticationLoginContext.Consumer>
      );
    }
  };
}
