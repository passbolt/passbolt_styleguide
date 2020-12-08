import React from "react";
import PropTypes from "prop-types";

export const AuthenticationContext = React.createContext({
  port: null, // The contextual port
  storage: null, // The context storage
  state: null, // The state in the authentication process
  process: null, // The authentication sub-process name
  onInitializeSetupRequested: () => {}, // Whenever the initialization of the setup is requested
  onInitializeRecoverRequested: () => {}, // Whenever the initialization of the recover is requested
  onGenerateGpgKeyRequested: () => {}, // Whenever the generation of gpg key is requested
  onGoToGenerateGpgKeyRequested: () => {}, // Whenever the user wants to go back to the key generation
  onGoToImportGpgKeyRequested: () => {}, // Whenever one wants to go to the import gpg key area
  onCheckImportedGpgKeyPassphraseRequested: () => {}, // Whenever one wants to check the passphrae of an imported gpg key
  onImportGpgKeyRequested: () => {}, // Whenever the import of gpg key is requested
  onDownloadRecoveryKitRequested: () => {}, // Whenever the download of the recovery kit is requested
  onRecoveryKitDownloaded: () => {}, // Whenever the recovery kit has been downloaded
  onSaveSecurityTokenRequested: () => {}, // Whenever the security token save is requested
  onCompleteSetupRequested: () => {} ,// Whenever the the setup complete is requested
  onCompleteRecoverRequested: () => {} // Whenever the the recover complete is requested
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
      onGenerateGpgKeyRequested: this.onGenerateGpgKeyRequested.bind(this),
      onGoToGenerateGpgKeyRequested: this.onGoToGenerateGpgKeyRequested.bind(this),
      onGoToImportGpgKeyRequested: this.onGoToImportGpgKeyRequested.bind(this),
      onCheckImportedGpgKeyPassphraseRequested: this.onCheckImportedGpgKeyPassphraseRequested.bind(this),
      onImportGpgKeyRequested: this.onImportGpgKeyRequested.bind(this),
      onDownloadRecoveryKitRequested: this.onDownloadRecoveryKitRequested.bind(this),
      onRecoveryKitDownloaded: this.onRecoveryKitDownloaded.bind(this),
      onSaveSecurityTokenRequested: this.onSaveSecurityTokenRequested.bind(this),
      onCompleteSetupRequested: this.onCompleteSetupRequested.bind(this),
      onCompleteRecoverRequested: this.onCompleteRecoverRequested.bind(this)
    };
  }

  /**
   * Initialize the authentication setup
   */
  async onInitializeSetupRequested() {
    const setupInfo = await this.state.port.request('passbolt.setup.info');
    await this.setState({
      state: AuthenticationContextState.SETUP_INITIALIZED,
      setupInfo,
      process: 'setup'
    });
  }


  /**
   * Initialize the authentication recover
   */
  async onInitializeRecoverRequested() {
    const setupInfo = await this.state.port.request('passbolt.recover.info');
    await this.setState({
      state: AuthenticationContextState.RECOVER_INITIALIZED,
      setupInfo,
      process: 'recover'
    });
  }

  /**
   * Whenever the generates of a gpgp key given an user passphrase is requested
   * @param passphrase A passphrase
   */
  async onGenerateGpgKeyRequested(passphrase) {
    const armored_key = await this.state.port.request('passbolt.setup.generate-key', passphrase);
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
    await this.state.port.request('passbolt.setup.complete');
    await this.setState({state: AuthenticationContextState.SETUP_COMPLETED});
  }

  /**
   * Wheneve the authentication recover must be completed
   */
  async onCompleteRecoverRequested() {
    await this.state.port.request('passbolt.recover.complete');
    await this.setState({state: AuthenticationContextState.RECOVER_COMPLETED});
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
};
