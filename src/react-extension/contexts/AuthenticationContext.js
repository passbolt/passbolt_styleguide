import React from "react";
import PropTypes from "prop-types";

export const AuthenticationContext = React.createContext({
  port: null, // The contextual port
  storage: null, // The context storage
  state: null, // The state in the authentication process
  userId: null, // The current user id
  username: null, // The current username
  first_name: null, // the current user first name
  last_name: null, // the current user last name
  token: null, // The current authentication token
  server_public_key: null, // the current server public key
  armored_key: null, // The current armored key
  onInitializeSetupRequested: () => {}, // Whenever the initialization of the setup is requested
  onGenerateGpgKeyRequested: () => {}, // Whenever the generation of gpg key is requested
  onImportGpgKeyRequested: () => {}, // Whenever the import of gpg key is requested
  onDownloadRecoveryKitRequested: () => {}, // Whenever the download of the recovery kit is requested
  onRecoveryKitDownloaded: () => {} // Whenever the recovery kit has been downloaded
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
      onGenerateGpgKeyRequested: this.onGenerateGpgKeyRequested.bind(this),
      onImportGpgKeyRequested: this.onImportGpgKeyRequested.bind(this),
      onDownloadRecoveryKitRequested: this.onDownloadRecoveryKitRequested.bind(this),
      onRecoveryKitDownloaded: this.onRecoveryKitDownloaded.bind(this)
    };
  }

  /**
   * Initialize the authentication setup
   * @param userId The user identifier
   * @param token The provided token
   */
  async onInitializeSetupRequested(userId, token) {
    const setupInformation = await this.state.port.request('passbolt.setup.info', userId, token);
    const {username, first_name, last_name, server_public_key} = setupInformation;
    await this.setState({
      userId,
      username,
      first_name,
      last_name,
      token,
      server_public_key,
      state: AuthenticationContextState.SETUP_INITIALIZED
    });
  }

  /**
   * Whenever the generates of a gpgp key given an user passphrase is requested
   * @param passphrase A passphrase
   */
  async onGenerateGpgKeyRequested(passphrase) {
    const keyLength = 2048;
    const keyAlgorithm = "RSA-DSA";
    const keyInfo = {
      ownerName: `${this.state.first_name} ${this.state.last_name}`,
      ownerEmail: this.state.username,
      comment: "Generated with passbolt",
      length: keyLength,
      algorithm: keyAlgorithm
    };
    const armored_key = await this.state.port.request('passbolt.keyring.generateKeyPair', keyInfo, passphrase);
    await this.setState({state: AuthenticationContextState.GPG_KEY_GENERATED, armored_key});
  }

  /**
   * Whenever the import of a gpg key is requested
   */
  async onImportGpgKeyRequested() {
    await this.setState({state: AuthenticationContextState.GPG_KEY_IMPORT_REQUESTED});
  }

  /**
   * Whenever the download of the recovery kit is requested
   */
  async onDownloadRecoveryKitRequested() {
    const filename = 'passbolt-recovery-kit.asc';
    await this.state.port.request('passbolt.keyring.key.backup', this.state.armoredKey, filename);
  }

  /**
   * Whenever the recovery kit has been downloaded
   */
  async onRecoveryKitDownloaded() {
    await this.setState({state: AuthenticationContextState.RECOVERY_KIT_DOWNLOADED});
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

AuthenticationContextProvider.propTypes = {
  value:  PropTypes.any, // The initial value of the context
  children: PropTypes.any // The children components
};
export default AuthenticationContextProvider;


/**
 * The authentication types of state
 */
export const AuthenticationContextState = {
  INITIAL_STATE: 'Initial State',
  SETUP_INITIALIZED: 'Setup Initialized',
  GPG_KEY_GENERATED: 'Gpg Key Initialized',
  GPG_KEY_IMPORT_REQUESTED: 'Gpg Key Import Requested',
  RECOVERY_KIT_DOWNLOADED: 'Recovery Kit Downloaded'
};
