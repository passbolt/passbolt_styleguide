/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */
import PasswordMask from './PasswordMask';

/**
 * Model related to the password configuration
 */
class PasswordConfiguration {
  /**
   * Constructor
   * @param {object} configuration
   * @param {PasswordPolicyViewModel} settings
   */
  constructor(configuration, settings = {}) {
    this.default_options = configuration ? this.getDefaultOptions(configuration, settings) : {};
    this.masks = this.getPasswordMasks(configuration, settings);
    this.name = configuration?.name;
    this.type = configuration?.type;
  }

  /**
   * Returns the default_options data matching the configuration type
   * @param {Object} configuration the default configuration
   * @param {Object} settings the organisation password policies settings
   * @returns {Object}
   */
  getDefaultOptions(configuration, settings) {
    if (configuration.type === "passphrase") {
      return this.getDefaultOptionsPassphrase(configuration, settings);
    }
    return this.getDefaultOptionsPassword(configuration, settings);
  }

  /**
   * Returns the password masks if the configuration type is `password` or an empty if the type is `passphrase`
   * @param {Object} configuration the default configuration
   * @param {Object} settings the organisation password policies settings
   * @returns {Array<PasswordMask>}
   */
  getPasswordMasks(configuration, settings) {
    if (configuration.type === "passphrase") {
      return;
    }
    return configuration.masks.map(mask => new PasswordMask(mask, settings));
  }

  /**
   * Returns the default_options for the password configuration type
   * @param {Object} configuration the default configuration
   * @param {Object} settings the organisation password policies settings
   * @returns {Object}
   */
  getDefaultOptionsPassword(configuration, settings) {
    return {
      length: settings.passwordLength ? settings.passwordLength : configuration.default_options?.length,
      min_length: configuration.default_options?.min_length,
      max_length: configuration.default_options?.max_length,
      look_alike: settings.lookAlikeCharacters !== undefined ? settings.lookAlikeCharacters : configuration.default_options?.look_alike,
    };
  }

  /**
   * Returns the default_options for the password configuration type
   * @param {Object} configuration the default configuration
   * @param {Object} settings the organisation password policies settings
   * @returns {Object}
   */
  getDefaultOptionsPassphrase(configuration, settings) {
    return {
      word_count: settings.passphraseWordsLength ? settings.passphraseWordsLength : configuration.default_options?.word_count,
      max_word: configuration.default_options?.max_word,
      min_word: configuration.default_options?.min_word,
      separator: settings.wordsSeparator ? settings.wordsSeparator : configuration.default_options?.separator,
      word_case: settings.wordCase ? settings.wordCase : configuration.default_options?.word_case,
    };
  }
}

export default PasswordConfiguration;

