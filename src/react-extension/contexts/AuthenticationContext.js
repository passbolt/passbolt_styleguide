/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import UserSettings from "../../lib/Settings/UserSettings";
import AppContext from "./AppContext";

export const AuthenticationContext = React.createContext({
  port: null, // The contextual port
  storage: null, // The context storage
  state: null, // The state in the authentication process
  process: null, // The authentication sub-process name
  error: null, // An authentication error object
  onInitializeSetupRequested: () => {
  }, // Whenever the initialization of the setup is requested
  onInitializeRecoverRequested: () => {
  }, // Whenever the initialization of the recover is requested
  onInitializeLoginRequested: () => {
  }, // Whenever the initialization of the login is requested
  onGenerateGpgKeyRequested: () => {
  }, // Whenever the generation of gpg key is requested
  onGoToGenerateGpgKeyRequested: () => {
  }, // Whenever the user wants to go back to the key generation
  onGoToImportGpgKeyRequested: () => {
  }, // Whenever one wants to go to the import gpg key area
  onCheckImportedGpgKeyPassphraseRequested: () => {
  }, // Whenever one wants to check the passphrase of an imported gpg key
  onImportGpgKeyRequested: () => {
  }, // Whenever the import of gpg key is requested
  onDownloadRecoveryKitRequested: () => {
  }, // Whenever the download of the recovery kit is requested
  onRecoveryKitDownloaded: () => {
  }, // Whenever the recovery kit has been downloaded
  onSaveSecurityTokenRequested: () => {
  }, // Whenever the security token save is requested
  onCompleteSetupRequested: () => {
  }, // Whenever the the setup complete is requested
  onCompleteRecoverRequested: () => {
  }, // Whenever the the recover complete is requested
  onPassphraseLost: () => {
  }, // Whenever the user lost his passphrase
  onCheckLoginPassphraseRequested: () => {
  }, // Whenever the user enters his passphrase in order to login
  onTryLoginAgainRequested: () => {
  }, // Whenever the user wants to log in again
  onAcceptLoginNewServerKeyRequested: () => {
  }, // Whenever the user accepted the server Key
  onVerifyServerKeyRequested: () => {
  }, // Whenever the check of server key is requested
  onGetServerKeyRequested: () => {
  }, // Whenever the server key is requested.
  onUnexpectedError: () => {
  }, // Whenever an unexpected error occurred.
});

/**
 * The related context provider
 */
class AuthenticationContextProvider extends React.Component {
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
      state: AuthenticationContextState.INITIAL_STATE,
      onInitializeSetupRequested: this.onInitializeSetupRequested.bind(this),
      onInitializeRecoverRequested: this.onInitializeRecoverRequested.bind(this),
      onInitializeLoginRequested: this.onInitializeLoginRequested.bind(this),
      onGenerateGpgKeyRequested: this.onGenerateGpgKeyRequested.bind(this),
      onGoToGenerateGpgKeyRequested: this.onGoToGenerateGpgKeyRequested.bind(this),
      onGoToImportGpgKeyRequested: this.onGoToImportGpgKeyRequested.bind(this),
      onCheckImportedGpgKeyPassphraseRequested: this.onCheckImportedGpgKeyPassphraseRequested.bind(this),
      onImportGpgKeyRequested: this.onImportGpgKeyRequested.bind(this),
      onDownloadRecoveryKitRequested: this.onDownloadRecoveryKitRequested.bind(this),
      onRecoveryKitDownloaded: this.onRecoveryKitDownloaded.bind(this),
      onSaveSecurityTokenRequested: this.onSaveSecurityTokenRequested.bind(this),
      onCompleteSetupRequested: this.onCompleteSetupRequested.bind(this),
      onCompleteRecoverRequested: this.onCompleteRecoverRequested.bind(this),
      onPassphraseLost: this.onPassphraseLost.bind(this),
      onCheckLoginPassphraseRequested: this.onCheckLoginPassphraseRequested.bind(this),
      onLoginRequested: this.onLoginRequested.bind(this),
      onAcceptLoginNewServerKeyRequested: this.onAcceptLoginNewServerKeyRequested.bind(this),
      onVerifyServerKeyRequested: this.onVerifyServerKeyRequested.bind(this),
      onGetServerKeyRequested: this.onGetServerKeyRequested.bind(this),
      onTryLoginAgainRequested: this.onTryLoginAgainRequested.bind(this),
      onUnexpectedError: this.onUnexpectedError.bind(this),
    };
  }

  /**
   * Initialize the authentication setup
   */
  async onInitializeSetupRequested() {
    const setupInfo = await this.state.port.request('passbolt.setup.info');
    // update the locale to use the user locale
    this.context.onUpdateLocaleRequested();
    // In case of error the background page should just disconnect the extension setup application.
    await this.setState({
      state: AuthenticationContextState.SETUP_INITIALIZED,
      setupInfo,
      process: AuthenticationContextProcess.SETUP
    });
  }


  /**
   * Initialize the authentication recover
   */
  async onInitializeRecoverRequested() {
    const recoverInfo = await this.state.port.request('passbolt.recover.info');
    // update the locale to use the user locale
    await this.context.onUpdateLocaleRequested();
    // In case of error the background page should just disconnect the extension setup application.
    await this.setState({
      state: AuthenticationContextState.RECOVER_INITIALIZED,
      recoverInfo,
      process: AuthenticationContextProcess.RECOVER
    });
  }

  /**
   * Initialize the authentication login
   */
  async onInitializeLoginRequested() {
    const storageData = await this.state.storage.local.get(["_passbolt_data"]);
    const userSettings = new UserSettings(storageData._passbolt_data.config);
    const loginInfo = {userSettings};
    await this.setState({
      state: AuthenticationContextState.LOGIN_INITIALIZED,
      loginInfo,
      process: AuthenticationContextProcess.LOGIN,
    });
  }

  /**
   * Whenever one wants to verify the server key
   */
  async onVerifyServerKeyRequested() {
    await this.state.port.request('passbolt.auth.verify-server-key')
      .then(this.onVerifyServerKeySuccess.bind(this))
      .catch(this.onVerifyServerKeyFailure.bind(this));
  }

  /**
   * Whenver the verify server key has been done with success
   */
  async onVerifyServerKeySuccess() {
    await this.setState({state: AuthenticationContextState.LOGIN_SERVER_KEY_CHECKED});
  }

  /**
   * Whenever the verify server key has been done with failure
   * @param error An error occurred while the server key verification
   */
  async onVerifyServerKeyFailure(error) {
    if (error.name === "KeyIsExpiredError") {
      // Nothing to do.
    } else if (error.name === "ServerKeyChangedError") {
      await this.setState({state: AuthenticationContextState.LOGIN_SERVER_KEY_CHANGED});
    } else if (error.name === "UserNotFoundError") {
      // This case should be treated by the background page itself, and the login form should not be displayed.
    } else {
      await this.onUnexpectedError(error);
    }
  }

  /**
   * Whenever an unexpected error occured
   * @param {object} error The error
   * @returns {Promise<void>}
   */
  async onUnexpectedError(error) {
    const state = AuthenticationContextState.UNEXPECTED_ERROR;
    await this.setState({state, error});
  }

  /**
   * Whenever the generates of a gpgp key given an user passphrase is requested
   * @param passphrase A passphrase
   */
  async onGenerateGpgKeyRequested(passphrase) {
    const generateKeyDto = {passphrase};
    const armored_key = await this.state.port.request('passbolt.setup.generate-key', generateKeyDto);
    await this.setState({state: AuthenticationContextState.GPG_KEY_GENERATED, armored_key});
  }

  /**
   * Whenever the user wants to go back to the key generation
   */
  async onGoToGenerateGpgKeyRequested() {
    await this.setState({state: AuthenticationContextState.SETUP_INITIALIZED});
  }

  /**
   * Whenever the access to the import of a gpg key is requested
   */
  async onGoToImportGpgKeyRequested() {
    await this.setState({state: AuthenticationContextState.GPG_KEY_TO_IMPORT_REQUESTED});
  }

  /**
   * Whenever the import of a gpg key is requested
   * @param armoredKey The armored key to import
   */
  async onImportGpgKeyRequested(armoredKey) {
    await this.state.port.request(`passbolt.${this.state.process}.import-key`, armoredKey);
    await this.setState({state: AuthenticationContextState.GPG_KEY_VALIDATED});
  }

  /**
   * Whenever the passphrase of an imported gpg key must be checked
   * @param passphrase A passphrase private key
   * @param rememeberMe Flag if if need to remember the passphrase
   */
  async onCheckImportedGpgKeyPassphraseRequested(passphrase, rememberMe) {
    await this.state.port.request(`passbolt.${this.state.process}.verify-passphrase`, passphrase, rememberMe);
    await this.onGpgKeyImported();
  }

  /**
   * Whenever the import of a gpg key is requested
   * @param armoredKey The armored key to import
   */
  async onGpgKeyImported() {
    await this.setState({state: AuthenticationContextState.GPG_KEY_IMPORTED});
  }

  /**
   * Whenever the download of the recovery kit is requested
   */
  async onDownloadRecoveryKitRequested() {
    await this.state.port.request('passbolt.setup.download-recovery-kit');
  }

  /**
   * Whenever the recovery kit has been downloaded
   */
  async onRecoveryKitDownloaded() {
    await this.setState({state: AuthenticationContextState.RECOVERY_KIT_DOWNLOADED});
  }

  /**
   * Whenever the security token must be saved
   * @param securityToken The security token
   */
  async onSaveSecurityTokenRequested(securityToken) {
    await this.state.port.request(`passbolt.${this.state.process}.set-security-token`, securityToken);
    await this.setState({
      state: AuthenticationContextState.SECURITY_TOKEN_SAVED,
      securityToken: securityToken
    });
  }

  /**
   * Wheneve the authentication setup must be completed
   */
  async onCompleteSetupRequested() {
    await this.state.port.request('passbolt.setup.complete')
      .then(this.onSetupSuccess.bind(this))
      .catch(this.onUnexpectedError.bind(this));
  }

  /**
   * Whenever the setup operation succeed
   */
  async onSetupSuccess() {
    await this.setState({state: AuthenticationContextState.SETUP_COMPLETED});
  }

  /**
   * Whenever the authentication recover must be completed
   */
  async onCompleteRecoverRequested() {
    await this.state.port.request('passbolt.recover.complete')
      .then(this.onRecoverSuccess.bind(this))
      .catch(this.onUnexpectedError.bind(this));
  }

  /**
   * Whenever the recover operation succeed
   */
  async onRecoverSuccess() {
    await this.setState({state: AuthenticationContextState.RECOVER_COMPLETED});
  }

  /**
   * Whenever the user lost his passphrase
   */
  async onPassphraseLost() {
    await this.setState({state: AuthenticationContextState.PASSPHRASE_LOST});
  }

  /**
   * Whenever the user enters his passphrase in order to login
   * @param passphrase The user passphrase
   */
  async onCheckLoginPassphraseRequested(passphrase) {
    await this.state.port.request('passbolt.auth.verify-passphrase', passphrase);
    await this.setState({state: AuthenticationContextState.LOGIN_PASSPHRASE_CHECKED});
  }

  /**
   * Whenever the user must be logged in
   * @param passphrase The user passphrase
   * @param rememberMe The flag telling to remmember the passphrase
   */
  async onLoginRequested(passphrase, rememberMe) {
    await this.setState({state: AuthenticationContextState.LOGIN_IN_PROGRESS});
    await this.state.port.request('passbolt.auth.login', passphrase, rememberMe)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFailure.bind(this));
  }

  /**
   * Whenever the log in operation succeeded
   */
  async onLoginSuccess() {
    await this.state.port.request('passbolt.auth.post-login-redirect');
    await this.setState({state: AuthenticationContextState.LOGIN_COMPLETED});
  }

  /**
   * Whenever the log in operation failed
   */
  async onLoginFailure(error) {
    await this.setState({
      state: AuthenticationContextState.LOGIN_FAILED,
      error
    });
  }

  /**
   * Whenever the users could not log in and wants to try to log in again
   */
  async onTryLoginAgainRequested() {
    await this.setState({state: AuthenticationContextState.LOGIN_INITIALIZED});
  }

  /**
   * Whenever the server key is requested.
   * @return {Promise<object>}
   */
  async onGetServerKeyRequested() {
    return this.state.port.request('passbolt.auth.get-server-key');
  }

  /**
   * Whenever the user accepts the new server key
   */
  async onAcceptLoginNewServerKeyRequested() {
    await this.state.port.request('passbolt.auth.replace-server-key');
    await this.setState({state: AuthenticationContextState.LOGIN_NEW_SERVER_KEY_ACCEPTED});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AuthenticationContext.Provider value={this.state}>
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

AuthenticationContextProvider.contextType = AppContext;

AuthenticationContextProvider.propTypes = {
  value: PropTypes.any, // The initial value of the context
  children: PropTypes.any // The children components
};
export default AuthenticationContextProvider;

/**
 * The authentication types of process
 */
export const AuthenticationContextProcess = {
  SETUP: 'setup',
  RECOVER: 'recover',
  LOGIN: 'login'
};

/**
 * The authentication types of state
 */
export const AuthenticationContextState = {
  INITIAL_STATE: 'Initial State',
  SETUP_INITIALIZED: 'Setup Initialized',
  RECOVER_INITIALIZED: 'Recover Initialized',
  SETUP_COMPLETED: 'Setup Completed',
  RECOVER_COMPLETED: 'Recover Completed',
  GPG_KEY_GENERATED: 'Gpg Key Initialized',
  GPG_KEY_TO_IMPORT_REQUESTED: 'Gpg Key  To Import Requested',
  GPG_KEY_VALIDATED: "Imported Gpg key validated",
  GPG_KEY_IMPORTED: 'Gpg Key Imported',
  RECOVERY_KIT_DOWNLOADED: 'Recovery Kit Downloaded',
  SECURITY_TOKEN_SAVED: 'Security Token Saved',
  SETUP_COMPLETE_REQUESTED: 'Setup Complete Requested',
  PASSPHRASE_LOST: 'Passphrase lost',
  LOGIN_INITIALIZED: 'Login Initialized',
  LOGIN_SERVER_KEY_CHANGED: 'Login Server Key Changed',
  LOGIN_SERVER_KEY_CHECKED: 'Login Server Key Checked',
  LOGIN_NEW_SERVER_KEY_ACCEPTED: 'Login New Server Key Accepted',
  LOGIN_PASSPHRASE_CHECKED: 'Login Passphrase Checked',
  LOGIN_IN_PROGRESS: 'Login In Progress',
  LOGIN_FAILED: 'Login Failed',
  LOGIN_COMPLETED: 'Login Completed',
  UNEXPECTED_ERROR: 'Unexpected Error',
};
