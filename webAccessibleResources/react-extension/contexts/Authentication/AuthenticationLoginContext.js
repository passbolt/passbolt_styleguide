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
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {withSso} from "../SsoContext";
import SsoProviders from "../../components/Administration/ManageSsoSettings/SsoProviders.data";

const EXPECTED_SSO_LOGIN_ERROR = ["SsoDisabledError", "SsoProviderMismatchError"];

// The authentication login workflow states.
export const AuthenticationLoginWorkflowStates = {
  ACCEPT_NEW_SERVER_KEY: "Accept new server key",
  LOADING: "Loading",
  SIGN_IN: "Sign in",
  SIGN_IN_SSO: "Sign in SSO",
  SIGN_IN_ERROR: "Sign in error",
  SIGNING_IN: "Signing in",
  INITIATE_ACCOUNT_RECOVERY: "Initiate account recovery",
  HELP_CREDENTIALS_LOST: "Help credentials lost",
  UNEXPECTED_ERROR: "Unexpected error",
  CHECK_MAILBOX: "Check mailbox",
  SSO_DISABLED_ERROR: "SSO disabled error",
  SSO_PROVIDER_MISMATCH_ERROR: "SSO provider mismatch error",
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
  newSsoProvider: null, //The new SSO provider the user should use to sign in in case of a provider change

  // Public workflow mutators.
  checkPassphrase: () => {
  }, // Whenever a user passphrase check is required.
  signIn: () => {
  }, // Whenever a user sign-in is required.
  handleSsoSignIn: () => {
  }, // Whenever a user sign-in via SSO is required.
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
  handleSsoLoginError: () => {
  }, // Handles the SSO login error
  getSsoProvider: () => {
  }, // Returns the current SSO provider if any
  isSsoAvailable: () => {
  }, // Returns true is the SSO feature is enabled
  handleUserConfirmSsoDisable: () => {
  }, // Whenere the user confirms the SSO feature has been disabled by an admin
  handleUserConfirmSsoProviderChange: () => {
  }, // Whenere the user confirms the SSO provider has been changed by an admin
  getNewSsoProvider: () => {
  }, // returns the new provider found from the API configuration
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
      newSsoProvider: null, //The new SSO provider the user should use to sign in in case of a provider change

      // Public workflow mutators.
      checkPassphrase: this.checkPassphrase.bind(this), // Whenever a user passphrase check is required.
      signIn: this.signIn.bind(this), // Whenever a user sign-in is required.
      handleSsoSignIn: this.handleSsoSignIn.bind(this), // Whenever a user sign-in via SSO is required.
      handleSwitchAccount: this.handleSwitchAccount.bind(this), // Whenever a switch account is required.
      acceptNewServerKey: this.acceptNewServerKey.bind(this), // Whenever a new server gpg key is accepted.
      needHelpCredentialsLost: this.needHelpCredentialsLost.bind(this), // Whenever a user lost its passphrase.
      requestHelpCredentialsLost: this.requestHelpCredentialsLost.bind(this), // Whenever the user wants to request help because it lost its credentials.
      goToValidatePassphrase: this.goToValidatePassphrase.bind(this), // Whenever the users wants to go to the validate passphrase.
      handleSsoLoginError: this.handleSsoLoginError.bind(this), // Handles the SSO login error
      getSsoProvider: this.getSsoProvider.bind(this), // Returns the current SSO provider if any
      isSsoAvailable: this.isSsoAvailable.bind(this), // Returns the current SSO provider if any
      handleSwitchToPassphrase: this.handleSwitchToPassphrase.bind(this), // Whenever the user want to sign-in via passphrase
      handleSwitchToSso: this.handleSwitchToSso.bind(this), // Whenever the user want to sign-in via sso
      handleUserConfirmSsoDisable: this.handleUserConfirmSsoDisable.bind(this), // Whenere the user confirms the SSO feature has been disabled by an admin
      handleUserConfirmSsoProviderChange: this.handleUserConfirmSsoProviderChange.bind(this), // Whenere the user confirms the SSO provider has been changed by an admin
      getNewSsoProvider: this.getNewSsoProvider.bind(this), // returns the new provider found from the API configuration
    };
  }

  /**
   * Whenever the component is initialized
   */
  async componentDidMount() {
    await this.initialize();
  }

  /**
   * Initialize the authentication login workflow
   * @returns {Promise<void>}
   */
  async initialize() {
    await this.props.ssoContext.loadSsoConfiguration();
    const isKeyVerified = await this.verifyServerKey();
    if (!isKeyVerified) {
      return;
    }

    if (!this.isSsoAvailable()) {
      this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN});
      return;
    }

    const isSsoLoginErrorState = await this.props.context.port.request("passbolt.sso.has-sso-login-error");
    if (isSsoLoginErrorState) {
      const ssoError = await this.props.context.port.request("passbolt.sso.get-qualified-sso-login-error");
      const isExpectedError = EXPECTED_SSO_LOGIN_ERROR.findIndex(errorType => errorType === ssoError.name) > -1;
      if (isExpectedError) {
        /*
         * By this we avoid the blocking case where if the user hits an SSO login error URL with an SSO kit provider matching the API one.
         * If we don't manage that case, the user will have the unexpected error displayed with the "Try again" button that refreshes the page.
         * As the parameter 'case' is kept in the URL with a refresh, the UI will loop over and over on that state and blocks the user.
         */
        this.handleSsoLoginError(ssoError);
        return;
      }
    }

    this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN_SSO});
  }

  /**
   * Verify the server key.
   * @returns {Promise<void>}
   */
  async verifyServerKey() {
    try {
      await this.props.context.port.request('passbolt.auth.verify-server-key');
      return true;
    } catch (error) {
      await this.handleVerifyServerKeyFailure(error);
    }
    return false;
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
   * Whenever the user wants to sign in using SSO.
   * @returns {Promise<void>}
   */
  async handleSsoSignIn() {
    try {
      await this.props.ssoContext.runSignInProcess();
      this.setState({state: AuthenticationLoginWorkflowStates.SIGNING_IN});
    } catch (e) {
      if (e.name !== "UserAbortsOperationError") {
        this.handleSsoLoginError(e);
      }
    }
  }

  /**
   * Whenever the user want to sign-in via SSO
   * @returns {Promise<void>}
   */
  async handleSwitchToSso() {
    this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN_SSO});
  }

  /**
   * Whenever the user want to sign-in via passphrase
   * @returns {Promise<void>}
   */
  async handleSwitchToPassphrase() {
    this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN});
  }

  /**
   * Whenever the user wants to switch account.
   */
  handleSwitchAccount() {
    const url = `${this.props.context.userSettings.getTrustedDomain()}/users/recover?locale=${this.props.context.locale}`;
    window.open(url, '_parent', 'noopener,noreferrer');
  }

  /**
   * Handles the SSO login error
   * @param {error} e
   */
  handleSsoLoginError(e) {
    const newState = {
      state: AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR,
      error: e
    };

    if (e.name === "SsoDisabledError") {
      newState.state = AuthenticationLoginWorkflowStates.SSO_DISABLED_ERROR;
    } else if (e.name === "SsoProviderMismatchError") {
      newState.state = AuthenticationLoginWorkflowStates.SSO_PROVIDER_MISMATCH_ERROR;
      newState.newSsoProvider = e.configuredProvider;
    }
    this.setState(newState);
  }

  /**
   * Handles the confirmation of the removal of the SSO kit and switch the state to SIGN_IN
   */
  async handleUserConfirmSsoDisable() {
    await this.props.context.port.request('passbolt.sso.delete-local-kit');
    await this.props.ssoContext.loadSsoConfiguration();
    this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN});
  }

  /**
   * Returns the new SSO provider the user should use to sign in.
   * @returns {Object}
   */
  getNewSsoProvider() {
    return SsoProviders.find(provider => this.state.newSsoProvider === provider.id);
  }

  /**
   * Handles the confirmation of the removal of the SSO kit and switch the state to SIGN_IN
   * @returns {Promise<void>}
   */
  async handleUserConfirmSsoProviderChange() {
    const provider = this.getNewSsoProvider().id;
    await this.props.context.port.request('passbolt.sso.update-provider-local-kit', provider);
    await this.props.ssoContext.loadSsoConfiguration();
    this.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN_SSO});
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
   * Returns the current SSO provider if any, null otherwise
   * @returns {object}
   */
  getSsoProvider() {
    const ssoProvider = this.props.ssoContext.getProvider();
    if (!ssoProvider) {
      return null;
    }
    return SsoProviders.find(provider => provider.id === ssoProvider);
  }

  /**
   * Returns true if the user has an SSO kit registered locally
   * @returns {boolean}
   */
  isSsoAvailable() {
    return this.props.ssoContext.hasUserAnSsoKit();
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
  children: PropTypes.any, // The children components
  ssoContext: PropTypes.object, // The SSO user context
};
export default withAppContext(withSso(AuthenticationLoginContextProvider));

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
