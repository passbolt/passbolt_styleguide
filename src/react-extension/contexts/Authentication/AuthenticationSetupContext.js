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
import SetupServiceWorkerService from "../../../shared/services/serviceWorker/setup/setupServiceWorkerService";

// The authentication setup workflow states.
export const AuthenticationSetupWorkflowStates = {
  CHOOSE_ACCOUNT_RECOVERY_PREFERENCE: 'Join account recovery program',
  CHOOSE_SECURITY_TOKEN: 'Choose security token',
  DOWNLOAD_RECOVERY_KIT: 'Download recovery kit',
  GENERATE_GPG_KEY: 'Generate gpg key',
  IMPORT_GPG_KEY: 'Import gpg key',
  INTRODUCE_EXTENSION: 'Introduce extension',
  LOADING: 'Loading',
  SIGNING_IN: 'Signing in',
  COMPLETING_SETUP: 'Completing setup',
  UNEXPECTED_ERROR: 'Unexpected Error',
  UNEXPECTED_METADATA_ENCRYPTION_ENABLEMENT_ERROR: "Unexpected metadata encryption enablement error",
  VALIDATE_PASSPHRASE: 'Validate passphrase',
  CONFIGURING_SSO: "Configuring SSO",
  CHECKING_POST_SETUP_METADATA_TASKS: "Checking post setup metadata tasks",
  ENABLING_METADATA_ENCRYPTION: "Enabling metadata encryption",
};

/**
 * The authentication setup context.
 * Handle the business logic of the setup and the manage the workflow.
 * @type {React.Context<{}>}
 */
export const AuthenticationSetupContext = React.createContext({
  // Workflow data.
  state: null, // The setup workflow current state
  gpgKeyGenerated: null, // Did the user generate a key?
  error: null, // The current error

  // Workflow mutators.
  goToGenerateGpgKey: () => {
  }, // Whenever the user wants to go to the generate key step.
  generateGpgKey: () => {
  }, // Whenever the user wants to generate a new key.
  downloadRecoveryKit: () => {
  }, // Whenever the user want to download the generated key.
  handleRecoveryKitDownloaded: () => {
  }, // Whenever the user has completed the download of its generated gpg key
  goToImportGpgKey: () => {
  }, // Whenever the user wants to go the import gpg key step.
  importGpgKey: () => {
  }, // Whenever the user wants to import a gpg key.
  checkPassphrase: () => {
  }, // Whenever the user want to check the passphrase of its imported gpg key.
  chooseAccountRecoveryPreference: () => {
  }, // Whenever the user wants to set its account recovery preferences.
  chooseSecurityToken: () => {
  }, // Whenever the user wants to choose its security token preference.
  validatePrivateKey: () => {
  }, // Whenever we need to verify the imported private key
  goToAdministrationWorkspace: () => {
  }, // Whenever an error occured on the metadata encryption enablement and the user clicked on continue
});

/**
 * The authentication setup context.
 * Handle the business logic of the setup and the manage the workflow.
 */
export class AuthenticationSetupContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.setupServiceWorkerService = new SetupServiceWorkerService(props.context.port);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      // Workflow data.
      state: AuthenticationSetupWorkflowStates.LOADING, // The setup workflow current state
      gpgKeyGenerated: null, // Did the user generate a key?
      error: null, // The current error
      rememberMe: false, // The user remember me choice
      userPassphrasePolicies: null, // the current user passphrase policies to use

      // Public workflow mutators.
      goToGenerateGpgKey: this.goToGenerateGpgKey.bind(this), // Whenever the user wants to go to the generate key step.
      generateGpgKey: this.generateGpgKey.bind(this), // Whenever the user wants to generate a new key.
      downloadRecoveryKit: this.downloadRecoveryKit.bind(this), // Whenever the user want to download the generated key.
      handleRecoveryKitDownloaded: this.handleRecoveryKitDownloaded.bind(this), // Whenever the user has completed the download of its generated gpg key
      goToImportGpgKey: this.goToImportGpgKey.bind(this), // Whenever the user wants to go the import gpg key step.
      importGpgKey: this.importGpgKey.bind(this), // Whenever the user wants to import a gpg key.
      checkPassphrase: this.checkPassphrase.bind(this), // Whenever the user want to check the passphrase of its imported gpg key.
      chooseAccountRecoveryPreference: this.chooseAccountRecoveryPreference.bind(this), // Whenever the user wants to set its account recovery preferences.
      chooseSecurityToken: this.chooseSecurityToken.bind(this), // Whenever the user wants to choose its security token preference.
      validatePrivateKey: this.validatePrivateKey.bind(this), // Whenever we need to verify the imported private key
      goToAdministrationWorkspace: this.goToAdministrationWorkspace.bind(this), // Whenever an error occured on the metadata encryption enablement and the user clicked on continue
    };
  }

  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initialize();
  }

  /**
   * Initialize the authentication setup workflow
   * @returns {Promise<void>}
   */
  async initialize() {
    const isFirstInstall = await this.setupServiceWorkerService.isFirstInstall();
    const isChromeBrowser = detectBrowserName() === BROWSER_NAMES.CHROME;
    await this.setupServiceWorkerService.startSetup();
    const userPassphrasePolicies = await this.setupServiceWorkerService.getUserPassphrasePolicies();
    // In case of error the background page should just disconnect the extension setup application.
    let state = AuthenticationSetupWorkflowStates.GENERATE_GPG_KEY;
    if (isFirstInstall && isChromeBrowser) {
      state = AuthenticationSetupWorkflowStates.INTRODUCE_EXTENSION;
    }
    this.setState({state, userPassphrasePolicies});
  }

  /**
   * Whenever the user wants to go to the generate gpg key step.
   */
  goToGenerateGpgKey() {
    this.setState({
      state: AuthenticationSetupWorkflowStates.GENERATE_GPG_KEY
    });
  }

  /**
   * Whenever the the user wants to generate a gpg key.
   * @param {string} passphrase The passphrase used to encrypt the generated gpg key
   * @return {Promise<void>}
   */
  async generateGpgKey(passphrase) {
    const generateKeyDto = {passphrase};
    try {
      const armoredKey = await this.setupServiceWorkerService.generateKey(generateKeyDto);
      this.setState({
        state: AuthenticationSetupWorkflowStates.DOWNLOAD_RECOVERY_KIT,
        armored_key: armoredKey,
        gpgKeyGenerated: true,
      });
    } catch (error) {
      this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the user wants to download the recovery kit.
   * @returns {Promise<void>}
   */
  async downloadRecoveryKit() {
    try {
      await this.setupServiceWorkerService.downloadRecoveryKit();
    } catch (error) {
      this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the user wants to download the recovery kit.
   * @returns {Promise<void>}
   */
  async handleRecoveryKitDownloaded() {
    if (await this.isAccountRecoveryOrganizationPolicyEnabled()) {
      const accountRecoveryOrganizationPolicy = await this.setupServiceWorkerService.getAccountRecoveryOrganisationPolicy();
      this.setState({
        state: AuthenticationSetupWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_PREFERENCE,
        accountRecoveryOrganizationPolicy: accountRecoveryOrganizationPolicy
      });
    } else {
      this.setState({state: AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN});
    }
  }

  /**
   * Is account recovery organization policy enabled.
   * @returns {Promise<boolean>}
   */
  async isAccountRecoveryOrganizationPolicyEnabled() {
    if (!this.props.context.siteSettings.canIUse('accountRecovery')) {
      return false;
    }
    const accountRecoveryOrganizationPolicy = await this.setupServiceWorkerService.getAccountRecoveryOrganisationPolicy();

    return accountRecoveryOrganizationPolicy
      && accountRecoveryOrganizationPolicy?.policy !== 'disabled';
  }

  /**
   * Whenever the user wants to go to the import gpg key step.
   * @returns {Promise<void>}
   */
  async goToImportGpgKey() {
    this.setState({
      state: AuthenticationSetupWorkflowStates.IMPORT_GPG_KEY
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
      await this.setupServiceWorkerService.importKey(armoredKey);
      this.setState({
        state: AuthenticationSetupWorkflowStates.VALIDATE_PASSPHRASE,
        gpgKeyGenerated: false,
      });
    } catch (error) {
      if (error.name === "GpgKeyError") {
        throw error;
      } else {
        this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
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
      await this.setupServiceWorkerService.verifyPassphrase(passphrase);
      this.setState({rememberMe});

      if (await this.isAccountRecoveryOrganizationPolicyEnabled()) {
        this.setState({
          accountRecoveryOrganizationPolicy: await this.setupServiceWorkerService.getAccountRecoveryOrganisationPolicy(),
          state: AuthenticationSetupWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_PREFERENCE
        });
      } else {
        this.setState({state: AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN});
      }
    } catch (error) {
      if (error.name === "InvalidMasterPasswordError") {
        throw error;
      } else {
        this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
      }
    }
  }

  /**
   * Whenever the user set its account recovery preference.
   * @param {string} status The user choice. Can be "approved" or "rejected".
   * @returns {Promise<void>}
   */
  async chooseAccountRecoveryPreference(status) {
    try {
      await this.setupServiceWorkerService.setAccountRecoveryUserSettings(status);
      this.setState({state: AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN});
    } catch (error) {
      this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the user chose its security token.
   * @param {Object} securityTokenDto The security token dto
   * @returns {Promise<void>}
   */
  async chooseSecurityToken(securityTokenDto) {
    try {
      await this.setupServiceWorkerService.setSecurityToken(securityTokenDto);
      this.setState({state: AuthenticationSetupWorkflowStates.COMPLETING_SETUP});

      await this.setupServiceWorkerService.completeSetup();
      this.setState({state: AuthenticationSetupWorkflowStates.SIGNING_IN});

      await this.setupServiceWorkerService.signIn(this.state.rememberMe);

      const isUserAdmin = await this.isLoggedInUserAdmin();
      if (isUserAdmin) {
        await this.runPostSetupProcess();
      } else {
        await this.setupServiceWorkerService.redirectUserToPostLoginUrl();
      }
    } catch (error) {
      this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Returns true if the currently logged in user is an admin user.
   * @returns {Promise<boolean>}
   */
  async isLoggedInUserAdmin() {
    const user = await this.setupServiceWorkerService.getCurrentLoggedInUser();
    return user.role.isAdmin();
  }

  /**
   * Whenever the user finishes the setup process and is signed in.
   * @returns {Promise<void>}
   */
  async runPostSetupProcess() {
    try {
      this.setState({state: AuthenticationSetupWorkflowStates.CHECKING_POST_SETUP_METADATA_TASKS});
      const metadataSetupSettings = await this.setupServiceWorkerService.findMetadataSetupSettings();
      if (metadataSetupSettings.enableEncryptedMetadataOnInstall) {
        this.setState({state: AuthenticationSetupWorkflowStates.ENABLING_METADATA_ENCRYPTION});
        await this.setupServiceWorkerService.enableMetadataEncryption();
      }
      await this.setupServiceWorkerService.redirectUserToPostLoginUrl();
    } catch (e) {
      const error = new Error(e.message);
      error.details = JSON.parse(JSON.stringify(e));
      this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_METADATA_ENCRYPTION_ENABLEMENT_ERROR, error: error});
    }
  }

  /**
   * Whenever we need to verify the imported private key
   * @param {string} key the private to check in its armored form
   */
  async validatePrivateKey(key) {
    await this.setupServiceWorkerService.validatePrivateKey(key);
  }

  /**
   * Callback to redirect the current user to the admin workspace.
   * It is used when the metadata encryption enablement fails for any reason.
   * @returns {Promise<void>}
   */
  async goToAdministrationWorkspace() {
    await this.setupServiceWorkerService.goToAdministrationWorkspace();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AuthenticationSetupContext.Provider value={this.state}>
        {this.props.children}
      </AuthenticationSetupContext.Provider>
    );
  }
}

AuthenticationSetupContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any // The children components
};
export default withAppContext(AuthenticationSetupContextProvider);

/**
 * Authentication setup context consumer HOC
 * @param {React.Component} WrappedComponent The component to wrap
 */
export function withAuthenticationSetupContext(WrappedComponent) {
  return class WithAuthenticationContext extends React.Component {
    render() {
      return (
        <AuthenticationSetupContext.Consumer>
          {
            AuthenticationSetupContext => <WrappedComponent
              authenticationSetupContext={AuthenticationSetupContext} {...this.props} />
          }
        </AuthenticationSetupContext.Consumer>
      );
    }
  };
}
