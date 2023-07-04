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
  VALIDATE_PASSPHRASE: 'Validate passphrase',
  CONFIGURING_SSO: "Configuring SSO",
  RETRY_SETUP: 'Retry setup',
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
    this.bindCallbacks();
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
    };
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.retrySetup = this.retrySetup.bind(this);
  }

  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initialize();
    // For MV3 to avoid unexpected error after service worker has been shutdown
    this.props.context.port._port.onDisconnect.addListener(this.retrySetup);
  }

  /**
   * Whenever the component is unmount
   */
  componentWillUnmount() {
    this.props.context.port._port.onDisconnect.removeListener(this.retrySetup);
  }

  /**
   * Initialize the authentication setup workflow
   * @returns {Promise<void>}
   */
  async initialize() {
    const isFirstInstall = await this.props.context.port.request('passbolt.setup.is-first-install');
    const isChromeBrowser = detectBrowserName() === BROWSER_NAMES.CHROME;
    await this.props.context.port.request('passbolt.setup.start');
    // In case of error the background page should just disconnect the extension setup application.
    let state = AuthenticationSetupWorkflowStates.GENERATE_GPG_KEY;
    if (isFirstInstall && isChromeBrowser) {
      state = AuthenticationSetupWorkflowStates.INTRODUCE_EXTENSION;
    }
    await this.setState({state});
  }

  /**
   * Force retry setup
   */
  retrySetup() {
    this.setState({state: AuthenticationSetupWorkflowStates.RETRY_SETUP});
  }

  /**
   * Whenever the user wants to go to the generate gpg key step.
   * @returns {Promise<void>}
   */
  async goToGenerateGpgKey() {
    await this.setState({
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
      const armoredKey = await this.props.context.port.request('passbolt.setup.generate-key', generateKeyDto);
      await this.setState({
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
      await this.props.context.port.request('passbolt.setup.download-recovery-kit');
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
      const accountRecoveryOrganizationPolicy = await this.props.context.port.request('passbolt.setup.get-account-recovery-organization-policy');
      await this.setState({
        state: AuthenticationSetupWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_PREFERENCE,
        accountRecoveryOrganizationPolicy: accountRecoveryOrganizationPolicy
      });
    } else {
      await this.setState({state: AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN});
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
    const accountRecoveryOrganizationPolicy = await this.props.context.port.request('passbolt.setup.get-account-recovery-organization-policy');

    return accountRecoveryOrganizationPolicy
      && accountRecoveryOrganizationPolicy?.policy !== 'disabled';
  }

  /**
   * Whenever the user wants to go to the import gpg key step.
   * @returns {Promise<void>}
   */
  async goToImportGpgKey() {
    await this.setState({
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
      await this.props.context.port.request("passbolt.setup.import-key", armoredKey);
      await this.setState({
        state: AuthenticationSetupWorkflowStates.VALIDATE_PASSPHRASE,
        gpgKeyGenerated: false,
      });
    } catch (error) {
      if (error.name === "GpgKeyError") {
        throw error;
      } else {
        await this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
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
      await this.props.context.port.request("passbolt.setup.verify-passphrase", passphrase);
      this.setState({rememberMe});

      if (await this.isAccountRecoveryOrganizationPolicyEnabled()) {
        this.setState({
          accountRecoveryOrganizationPolicy: await this.props.context.port.request('passbolt.setup.get-account-recovery-organization-policy'),
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
      await this.props.context.port.request('passbolt.setup.set-account-recovery-user-setting', status);
      await this.setState({state: AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN});
    } catch (error) {
      await this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever the user chose its security token.
   * @param {Object} securityTokenDto The security token dto
   * @returns {Promise<void>}
   */
  async chooseSecurityToken(securityTokenDto) {
    try {
      await this.props.context.port.request("passbolt.setup.set-security-token", securityTokenDto);
      this.setState({state: AuthenticationSetupWorkflowStates.COMPLETING_SETUP});
      await this.props.context.port.request('passbolt.setup.complete');
      this.setState({state: AuthenticationSetupWorkflowStates.SIGNING_IN});
      await this.props.context.port.request('passbolt.setup.sign-in', this.state.rememberMe);
    } catch (error) {
      await this.setState({state: AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR, error: error});
    }
  }

  /**
   * Whenever we need to verify the imported private key
   * @param {string} key the private to check in its armored form
   */
  async validatePrivateKey(key) {
    await this.props.context.port.request('passbolt.setup.validate-private-key', key);
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
