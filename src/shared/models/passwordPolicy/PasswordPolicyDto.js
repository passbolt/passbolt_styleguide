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

/**
 * Model related to the password policy dto for API during the transfert
 */
class PasswordPolicyDto {
  /**
   * Constructor
   * @param {PasswordPolicyViewModel} settings
   */
  constructor(settings = {}) {
    this.external_services = settings.policyPassphraseExternalServices;
    this.generator_passwords_length = settings.passwordLength;
    this.generator_passphrase_words = settings.passphraseWordsLength;
    this.generator_passwords_mask_upper = settings.upper;
    this.generator_passwords_mask_lower = settings.lower;
    this.generator_passwords_mask_digit = settings.digit;
    this.generator_passwords_mask_char1 = settings.special_char1;
    this.generator_passwords_mask_parenthesis = settings.parenthesis;
    this.generator_passwords_mask_char2 = settings.special_char2;
    this.generator_passwords_mask_char3 = settings.special_char3;
    this.generator_passwords_mask_char4 = settings.special_char4;
    this.generator_passwords_mask_char5 = settings.special_char5;
    this.generator_passwords_mask_emoji = settings.emoji;
    this.generator_passwords_look_alike_chars = settings.lookAlikeCharacters;
    this.generator_passphrase_words_separator = settings.wordsSeparator;
    this.generator_passphrase_words_case = settings.wordCase;
    this.generator_default_password_type = settings.provider;
  }
}

export default PasswordPolicyDto;
