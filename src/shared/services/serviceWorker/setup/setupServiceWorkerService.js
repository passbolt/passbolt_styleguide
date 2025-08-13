/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.4.0
 */

import MetadataSetupSettingsEntity from "../../../models/entity/metadata/metadataSetupSettingsEntity";
import UserEntity from "../../../models/entity/user/userEntity";

const METADATA_FIND_SETUP_SETTINGS = "passbolt.metadata.find-setup-settings";
const METADATA_ENABLE_ENCRYPTION = "passbolt.metadata.enable";
const REDIRECT_USER_TO_POST_LOGIN_URL = "passbolt.auth.post-login-redirect";
const REDIRECT_USER_TO_ADMIN_WORSPACE = "passbolt.auth.post-login-redirect-to-admin-workspace";
const GET_CURRENT_LOGGED_IN_USER = "passbolt.users.find-logged-in-user";
const SETUP_IS_FIRST_INSTALL = "passbolt.setup.is-first-install";
const SETUP_START = "passbolt.setup.start";
const SETUP_GENERATE_KEY = "passbolt.setup.generate-key";
const SETUP_DOWNLOAD_RECOVERY_KIT = "passbolt.setup.download-recovery-kit";
const SETUP_GET_ACCOUNT_RECOVERY_ORGANISATION_POLICY = "passbolt.setup.get-account-recovery-organization-policy";
const SETUP_SET_ACCOUNT_RECOVERY_USER_SETTINGS = "passbolt.setup.set-account-recovery-user-setting";
const SETUP_IMPORT_KEY = "passbolt.setup.import-key";
const SETUP_VERIFY_PASSPHRASE = "passbolt.setup.verify-passphrase";
const SETUP_SET_SECURITY_TOKEN = "passbolt.setup.set-security-token";
const SETUP_COMPLETE = "passbolt.setup.complete";
const SETUP_SIGN_IN = "passbolt.setup.sign-in";
const SETUP_VALIDATE_PRIVATE_KEY = "passbolt.setup.validate-private-key";
const SETUP_GET_USER_PASSPHRASE_POLICIES = "passbolt.setup.get-user-passphrase-policies";

export default class SetupServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the metadata setup settings.
   * @returns {Promise<MetadataSetupSettingsEntity>}
   */
  async findMetadataSetupSettings() {
    const metadataSetupSettingsDto = await this.port.request(METADATA_FIND_SETUP_SETTINGS);
    return new MetadataSetupSettingsEntity(metadataSetupSettingsDto);
  }

  /**
   * Calls the service worker for enabling the metadata encryption by default.
   * @returns {Promise<void>}
   */
  async enableMetadataEncryption() {
    await this.port.request(METADATA_ENABLE_ENCRYPTION);
  }

  /**
   * Calls the service worker for redirecting the user to the computed post login URL.
   * @returns {Promise<void>}
   */
  async redirectUserToPostLoginUrl() {
    await this.port.request(REDIRECT_USER_TO_POST_LOGIN_URL);
  }

  /**
   * Calls the service worker for redirecting to the admin workspace
   * @returns {Promise<void>}
   */
  async goToAdministrationWorkspace() {
    await this.port.request(REDIRECT_USER_TO_ADMIN_WORSPACE);
  }

  /**
   * Calls the service worker to retrieve current logged in user information
   * @returns {Promise<UserEntity>}
   */
  async getCurrentLoggedInUser() {
    const userDto = await this.port.request(GET_CURRENT_LOGGED_IN_USER);
    return new UserEntity(userDto);
  }

  /**
   * Returns true if it is the time the extension is installed on this browser profile
   * @returns {Promise<boolean>}
   */
  async isFirstInstall() {
    return Boolean(await this.port.request(SETUP_IS_FIRST_INSTALL));
  }

  /**
   * Starts the setup process
   * @returns {Promise<void>}
   */
  async startSetup() {
    return await this.port.request(SETUP_START);
  }

  /**
   * Generate a private key given a passphrase.
   * @param {{passphrase: string}} generateKeyDto
   * @returns {Promise<string>} the generated private armored key string
   */
  async generateKey(generateKeyDto) {
    return await this.port.request(SETUP_GENERATE_KEY, generateKeyDto);
  }

  /**
   * Triggers a download of the account recovery kit.
   * @returns {Promise<void>}
   */
  async downloadRecoveryKit() {
    return await this.port.request(SETUP_DOWNLOAD_RECOVERY_KIT);
  }

  /**
   * Get the account recovery organisation policy
   * @returns {Promise<object>}
   */
  async getAccountRecoveryOrganisationPolicy() {
    return await this.port.request(SETUP_GET_ACCOUNT_RECOVERY_ORGANISATION_POLICY);
  }

  /**
   * Set the account recovery user settings
   * @param {string} status either "approved" or "rejected";
   * @returns {Promise<void>}
   */
  async setAccountRecoveryUserSettings(status) {
    return await this.port.request(SETUP_SET_ACCOUNT_RECOVERY_USER_SETTINGS, status);
  }

  /**
   * Imports the given armored private key string on the current account
   * @param {string} armoredKey the armored private key string
   * @returns {Promise<void>}
   */
  async importKey(armoredKey) {
    return await this.port.request(SETUP_IMPORT_KEY, armoredKey);
  }

  /**
   * Verifies that the given passphrase matches the given private key
   * @param {string} passphrase
   * @returns {Promise<void>}
   * @throws {Error} if the passphrase does not match the private key
   */
  async verifyPassphrase(passphrase) {
    return await this.port.request(SETUP_VERIFY_PASSPHRASE, passphrase);
  }

  /**
   * Set the security token on the current account
   * @param {object} securityTokenDto
   * @returns {Promise<void>}
   */
  async setSecurityToken(securityTokenDto) {
    return await this.port.request(SETUP_SET_SECURITY_TOKEN, securityTokenDto);
  }

  /**
   * Triggers the setup completion
   * @returns {Promise<void>}
   */
  async completeSetup() {
    return await this.port.request(SETUP_COMPLETE);
  }

  /**
   * Run the sign in process for the current user
   * @param {boolean} rememberMe should the session be kept alive
   * @returns {Promise<void>}
   */
  async signIn(rememberMe) {
    return await this.port.request(SETUP_SIGN_IN, rememberMe);
  }

  /**
   * Validates the givan private key
   * @param {string} key the armored private key string
   * @returns {Promise<void>}
   * @throws {Error} if the key is not valid
   */
  async validatePrivateKey(key) {
    return await this.port.request(SETUP_VALIDATE_PRIVATE_KEY, key);
  }

  /**
   * Get the user passphrase policies
   * @returns {Promise<object>}
   */
  async getUserPassphrasePolicies() {
    return await this.port.request(SETUP_GET_USER_PASSPHRASE_POLICIES);
  }
}
