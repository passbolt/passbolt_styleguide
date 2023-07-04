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
 * @since         4.2.0
 */

/**
 * Model related to the password policies dto for API
 */
class PasswordPoliciesDto {
  /**
   * Constructor
   * @param {PasswordPoliciesViewModel} settings
   */
  constructor(settings = {}) {
    this.default_generator = settings.provider;
    this.external_dictionary_check = settings.policyPassphraseExternalServices;
    this.password_generator_settings = {
      length: settings.passwordLength,
      mask_upper: settings.mask_upper,
      mask_lower: settings.mask_lower,
      mask_digit: settings.mask_digit,
      mask_parenthesis: settings.mask_parenthesis,
      mask_char1: settings.mask_char1,
      mask_char2: settings.mask_char2,
      mask_char3: settings.mask_char3,
      mask_char4: settings.mask_char4,
      mask_char5: settings.mask_char5,
      mask_emoji: settings.mask_emoji,
      exclude_look_alike_chars: settings.excludeLookAlikeCharacters,
    };
    this.passphrase_generator_settings = {
      words: settings.wordsCount,
      word_separator: settings.wordsSeparator,
      word_case: settings.wordCase,
    };
    this.source = settings.source;
  }
}

export default PasswordPoliciesDto;
