
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
 * @since         3.8.0
 */

import XRegExp from 'xregexp';

/**
 * Model related to the MFA form settings
 */
class MfaFormService {
  /**
   * Constructor
   *
   * @param {context} context
   * @public
   */
  constructor(context, translation) {
    this.context = context;
    this.translation = translation;
  }

  /**
   * getInstance for singleton pattern
   * @param {context} context
   * @public
   */
  static getInstance(context, translation) {
    if (!this.instance) {
      this.instance = new MfaFormService(context, translation);
    }
    return this.instance;
  }

  /**
   * killInstance singleton
   * @param {context} context
   * @public
   */
  static killInstance() {
    this.instance = null;
  }

  /**
   * The input validation for forms
   * @param {string} inputValue
   * @param {string} regex
   * @param {Object} messages
   *
   * @return {Promise<Array<MFADto>>|null>}
   */
  validateInput(inputValue, regex, messages) {
    const value = inputValue.trim();
    if (!value.length) {
      return this.translation(messages.required);
    } else if (!XRegExp(regex).test(value)) {
      return this.translation(messages.regex);
    }
    return null;
  }

  /**
   * Validate the duo yubikey client identifier input.
   * @returns {Promise<void>}
   */
  validateYubikeyClientIdentifier(value) {
    const messages = {required: "A client identifier is required.", regex: "The client identifier should be an integer."};
    const result = this.validateInput(value, "^[0-9]{1,64}$", messages);
    this.context.setError("yubikeyClientIdentifierError", result);
    return result;
  }

  /**
   * Validate the duo secret key input.
   * @returns {Promise<void>}
   */
  validateYubikeySecretKey(value) {
    const messages = {required: "A secret key is required.", regex: "This secret key is not valid."};
    const result = this.validateInput(value, "^[a-zA-Z0-9\\/=+]{10,128}$", messages);
    this.context.setError('yubikeySecretKeyError', result);
    return result;
  }

  /**
   * Validate the duo hostname input.
   * @returns {Promise<void>}
   */
  validateDuoHostname(value) {
    const messages = {required: "A hostname is required.", regex: "This is not a valid hostname."};
    const result = this.validateInput(value, "^api-[a-fA-F0-9]{8,16}\\.duosecurity\\.com$", messages);
    this.context.setError("duoHostnameError", result);
    return result;
  }

  /**
   * Validate the duo client id input.
   * @returns {Promise<void>}
   */
  validateDuoClientId(value) {
    const messages = {required: "A client id is required.", regex: "This is not a valid client id."};
    const result = this.validateInput(value, "^[a-zA-Z0-9]{16,32}$", messages);
    this.context.setError("duoClientIdError", result);
    return result;
  }

  /**
   * Validate the duo client secret input.
   * @returns {Promise<void>}
   */
  validateDuoClientSecret(value) {
    const messages = {required: "A client secret is required.", regex: "This is not a valid client secret."};
    const result = this.validateInput(value, "^[a-zA-Z0-9]{32,128}$", messages);
    this.context.setError("duoClientSecretError", result);
    return result;
  }

  /**
   * Validate the Yubikey inputs.
   * @returns {Promise<void>}
   */
  validateYubikeyInputs() {
    let yubikeyClientIdentifierError = null;
    let yubikeySecretKeyError = null;
    const settings = this.context.getSettings();
    let result = {};

    if (settings.yubikeyToggle) {
      yubikeyClientIdentifierError = this.validateYubikeyClientIdentifier(settings.yubikeyClientIdentifier);
      yubikeySecretKeyError = this.validateYubikeySecretKey(settings.yubikeySecretKey);
      result = {yubikeyClientIdentifierError, yubikeySecretKeyError};
    }
    return  result;
  }

  /**
   * Validate the duo inputq.
   * @returns {Promise<void>}
   */
  validateDuoInputs() {
    let duoHostnameError = null;
    let duoClientIdError = null;
    let duoClientSecretError = null;
    let result = {};

    const settings = this.context.getSettings();
    if (settings.duoToggle) {
      duoHostnameError = this.validateDuoHostname(settings.duoHostname),
      duoClientIdError = this.validateDuoClientId(settings.duoClientId),
      duoClientSecretError = this.validateDuoClientSecret(settings.duoClientSecret);
      result =  {duoHostnameError, duoClientIdError, duoClientSecretError};
    }
    return result;
  }

  /**
   * Validate the form.
   * @returns {Promise<boolean>}
   */
  async validate() {
    // Validate the form inputs.
    const validation = Object.assign(this.validateYubikeyInputs(), this.validateDuoInputs());

    await this.context.setErrors(validation);
    //Check if we have errors
    return Object.values(validation).filter(x => x).length === 0;
  }
}

export default MfaFormService;

