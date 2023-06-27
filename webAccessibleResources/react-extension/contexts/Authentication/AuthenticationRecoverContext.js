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
import {BROWSER_NAMES, detectBrowserName} from "../../../shared/lib/Browser/detectBrowserName";

// The authentication recover workflow states.
export const AuthenticationRecoverWorkflowStates = {
  CHECK_ACCOUNT_RECOVERY_EMAIL: 'Check account recovery email',
  CHOOSE_ACCOUNT_RECOVERY_SECURITY_TOKEN: 'Choose account recovery security token',
  CHOOSE_SECURITY_TOKEN: 'Choose security token',
  GENERATE_ACCOUNT_RECOVERY_GPG_KEY: 'Generate account recovery gpg key',
  HELP_CREDENTIALS_LOST: 'Help credentials lost',
  IMPORT_GPG_KEY: 'Import gpg key',
  INITIATE_ACCOUNT_RECOVERY: 'Initiate account recovery',
  INTRODUCE_EXTENSION: 'Introduce extension',
  LOADING: 'Loading',
  REQUESTING_ACCOUNT_RECOVERY: 'Requesting account recovery',
  SIGNING_IN: 'Signing in',
  COMPLETING_RECOVER: 'Completing recover',
  UNEXPECTED_ERROR: 'Unexpected Error',
  VALIDATE_PASSPHRASE: 'Validate passphrase',
  CHECK_MAILBOX: 'Check mailbox',
  RETRY_RECOVER: 'Retry recover',
};

/**
 * The authentication recover context.
 * Handle the business logic of the recover and the manage the workflow.
 * @type {React.Context<{}>}
 */
export const AuthenticationRecoverContext = React.createContext({
  // Workflow data.
  state: null, // The recover workflow current state
  error: null, // The current error

  // Workflow mutators.
  goToImportGpgKey: () => {
  }, // Whenever the user wants to go to the import key step.
  importGpgKey: () => {
  }, // Whenever the user imports its gpg key.
  checkPassphrase: () => {
  }, // Whenever the user want to check the passphrase of its imported gpg key.
  chooseSecurityToken: () => {
  }, // Whenever the user wants to choose its security token preference.
  needHelpCredentialsLost: () => {
  }, // Whenever the user who lost its credentials needs help.
  initiateAccountRecovery: () => {
  }, // Whenever the user wants to initiate an account recovery.
  generateAccountRecoveryGpgKey: () => {
  }, // Whenever the user wants to create an account recovery gpg key.
  chooseAccountRecoverySecurityToken: () => {
  }, // Whenever the user chose its account recovery security token preferences.
  validatePrivateKey: () => {
  }, // Whenever we need to verify the imported private key
  requestHelpCredentialsLost: () => {
  }, // Whenever the user wants to request help because it lost its credentials.
  hasKeyExpirationDate: () => {
  }, // Whenever the key to check has an expiration date
});

/**
 * The authentication recover context provider.
 * Handle the business logic of the recover and the associated workflow.
 */
export class AuthenticationRecoverContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      // Workflow data.
      state: AuthenticationRecoverWorkflowStates.LOADING, // The recover workflow current state
      error: null, // The current error
      rememberMe: null, // The user remember me choice

      // Public workflow mutators.
      goToImportGpgKey: this.goToImportGpgKey.bind(this), // Whenever the user wants to go to the import key step.
      importGpgKey: this.importGpgKey.bind(this), // Whenever the user imports its gpg key.
      checkPassphrase: this.checkPassphrase.bind(this), // Whenever the user want to check the passphrase of its imported gpg key.
      chooseSecurityToken: this.chooseSecurityToken.bind(this), // Whenever the user wants to choose its security token preference.
      needHelpCredentialsLost: this.needHelpCredentialsLost.bind(this), // Whenever the user who lost its credentials needs help.
      requestHelpCredentialsLost: this.requestHelpCredentialsLost.bind(this), // Whenever the user wants to request help because it lost its credentials.
      initiateAccountRecovery: this.initiateAccountRecovery.bind(this), // Whenever the user wants to initiate an account recovery.
      generateAccountRecoveryGpgKey: this.generateAccountRecoveryGpgKey.bind(this), // Whenever the user wants to create an account recovery gpg key.
      chooseAccountRecoverySecurityToken: this.chooseAccountRecoverySecurityToken.bind(this), // Whenever the user chose its account recovery security token preferences.
      validatePrivateKey: this.validatePrivateKey.bind(this), // Whenever we need to verify the imported private key
      hasKeyExpirationDate: this.hasKeyExpirationDate.bind(this), // Whenever the expiration date needs to be checked
    };
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.retryRecover = this.retryRecover.bind(this);
  }

  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initialize();
    // For MV3 to avoid unexpected error after service worker has been shutdown
    this.props.context.port._port.onDisconnect.addListener(this.retryRecover);
  }

  /**
   * Whenever the component is unmount
   */
  componentWillUnmount() {
    this.props.context.port._port.onDisconnect.removeListener(this.retryRecover);
  }

  /**
   * Initialize the authentication recover workflow
   * @returns {Promise<void>}
   */
  async initialize() {
    await this.props.context.port.request('passbolt.recover.start');
    // The user locale is retrieved by the recover start, update the application locale
    await this.props.context.initLocale();

    const isLostPassphraseCase = await this.props.context.port.request('passbolt.recover.lost-passphrase-case');
    if (isLostPassphraseCase) {
      const hasUserEnrolledToAccountRecovery = await this.props.context.port.request('passbolt.recover.has-user-enabled-account-recovery');
      const state = hasUserEnrolledToAccountRecovery
        ? AuthenticationRecoverWorkflowStates.GENERATE_ACCOUNT_RECOVERY_GPG_KEY
        : AuthenticationRecoverWorkflowStates.HELP_CREDENTIALS_LOST;
      this.setState({state});
      return;
    }

    const isFirstInstall = await this.props.context.port.request('passbolt.recover.first-install');
    const isChromeBrowser = detectBrowserName() === BROWSER_NAMES.CHROME;

    const state = isFirstInstall && isChromeBrowser
      ? AuthenticationRecoverWorkflowStates.INTRODUCE_EXTENSION
      : AuthenticationRecoverWorkflowStates.IMPORT_GPG_KEY;

    this.setState({state});
  }

  /**
   * Force retry recover
   */
  retryRecover() {
    this.setState({state: AuthenticationRecoverWorkflowStates.RETRY_RECOVER});
  }

  /**
   * Whenever the user wants to go to the import gpg key step.
   * @returns {Promise<void>}
   */
  async goToImportGpgKey() {
    await this.setState({
      state: AuthenticationRecoverWorkflowStates.IMPORT_GPG_KEY
    });
  }

  /**
   * Whenever the user wants to import its gpg key.
   * @param {string} armoredKey The user gpg private key.
   * @returns {Promise<void>}
   * @throw {Error} If an expected errors is returned by the background page, rethrow it for the caller component.
   *  Errors of type: GpgKeyError.
   */
  async importGpgKey(armoredKey) {
    try {
      await this.props.context.port.request("passbolt.recover.import-key", armoredKey);
      await this.setState({state: AuthenticationRecoverWorkflowStates.VALIDATE_PASSPHRASE});
    } catch (error) {
      if (error.name === "GpgKeyError") {
        throw error;
      } else {
        await this.setState({state: AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR, error: error});
      }
    }
  }

  /**
   * Whenever the user imported a gpg key and wants to validate its passphrase.
   * @param {string} passphrase The user passphrase.
   * @param {boolean} rememberMe (Optional) Should the passphrase be remembered? Default false.
   * @returns {Promise<void>}
   * @throw {Error} If an expected errors is returned by the background page, rethrow it for the caller component.
   *  Errors of type: InvalidMasterPasswordError.
   */
  async checkPassphrase(passphrase, rememberMe = false) {
    try {
      await this.props.context.port.request("passbolt.recover.verify-passphrase", passphrase, rememberMe);
      await this.setState({
        state: AuthenticationRecoverWorkflowStates.CHOOSE_SECURITY_TOKEN,
        rememberMe: rememberMe
      });
    } catch (error) {
      if (error.name === "InvalidMasterPasswordError") {
        throw error;
      } else {
        await this.setState({state: AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR, error: error});
      }
    }
  }

  /**
   * Whenever the user chose its security token.
   * @param {Object} securityTokenDto The security token dto
   * @returns {Promise<void>}
   */
  async chooseSecurityToken(securityTokenDto) {
    try {
      await this.props.context.port.request("passbolt.recover.set-security-token", securityTokenDto);
      this.setState({state: AuthenticationRecoverWorkflowStates.COMPLETING_RECOVER});
      await this.props.context.port.request('passbolt.recover.complete');
      this.setState({state: AuthenticationRecoverWorkflowStates.SIGNING_IN});
      await this.props.context.port.request("passbolt.recover.sign-in", this.state.rememberMe);
    } catch (error) {
      await this.setState({state: AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the user who lost its credentials needs help.
   * @returns {Promise<void>}
   */
  async needHelpCredentialsLost() {
    const hasUserAccountRecoveryEnabled = await this.props.context.port.request("passbolt.recover.has-user-enabled-account-recovery");
    if (hasUserAccountRecoveryEnabled) {
      await this.setState({state: AuthenticationRecoverWorkflowStates.INITIATE_ACCOUNT_RECOVERY});
    } else {
      await this.setState({state: AuthenticationRecoverWorkflowStates.HELP_CREDENTIALS_LOST});
    }
  }

  /**
   * Whenever the user wants to initiate the account recovery process.
   * @returns {Promise<void>}
   */
  async initiateAccountRecovery() {
    await this.setState({state: AuthenticationRecoverWorkflowStates.GENERATE_ACCOUNT_RECOVERY_GPG_KEY});
  }

  /**
   * Whenever the user wants to request help because it lost its credentials.
   * @returns {Promise<void>}
   */
  async requestHelpCredentialsLost() {
    try {
      await this.props.context.port.request('passbolt.recover.request-help-credentials-lost');
      await this.setState({state: AuthenticationRecoverWorkflowStates.CHECK_MAILBOX});
    } catch (error) {
      await this.setState({state: AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the generation of an account recovery request gpg key is requested by the user.
   * @param {string} passphrase The passphrase used to encrypt the generated gpg key
   * @return {Promise<void>}
   */
  async generateAccountRecoveryGpgKey(passphrase) {
    const generateKeyDto = {passphrase};
    try {
      await this.props.context.port.request('passbolt.recover.generate-account-recovery-request-key', generateKeyDto);
      await this.setState({state: AuthenticationRecoverWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_SECURITY_TOKEN});
    } catch (error) {
      await this.setState({state: AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the user set its account recovery security token.
   * @param {Object} securityTokenDto The security token dto.
   * @returns {Promise<void>}
   */
  async chooseAccountRecoverySecurityToken(securityTokenDto) {
    try {
      await this.props.context.port.request('passbolt.recover.set-security-token', securityTokenDto);
      this.setState({state: AuthenticationRecoverWorkflowStates.REQUESTING_ACCOUNT_RECOVERY});
      await this.props.context.port.request('passbolt.recover.initiate-account-recovery-request');
      this.setState({state: AuthenticationRecoverWorkflowStates.CHECK_ACCOUNT_RECOVERY_EMAIL});
    } catch (error) {
      await this.setState({state: AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever we need to verify the imported private key
   * @param {string} key the private to check in its armored form
   */
  async validatePrivateKey(key) {
    await this.props.context.port.request('passbolt.recover.validate-private-key', key);
  }

  /**
   * Returns true if the key has an expiry date
   * @param {string} key the private to check in its armored form
   * @returns {Promise<boolean>}
   */
  async hasKeyExpirationDate(armoredKey) {
    const keyInfo = await this.props.context.port.request('passbolt.keyring.get-key-info', armoredKey);
    return keyInfo.expires && keyInfo.expires !== 'Infinity';
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AuthenticationRecoverContext.Provider value={this.state}>
        {this.props.children}
      </AuthenticationRecoverContext.Provider>
    );
  }
}

AuthenticationRecoverContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any // The children components
};
export default withAppContext(AuthenticationRecoverContextProvider);

/**
 * Authentication recover context consumer HOC
 * @param {React.Component} WrappedComponent The component to wrap
 */
export function withAuthenticationRecoverContext(WrappedComponent) {
  return class WithAuthenticationContext extends React.Component {
    render() {
      return (
        <AuthenticationRecoverContext.Consumer>
          {
            AuthenticationRecoverContext => <WrappedComponent
              authenticationRecoverContext={AuthenticationRecoverContext} {...this.props} />
          }
        </AuthenticationRecoverContext.Consumer>
      );
    }
  };
}
