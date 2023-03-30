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
 * Model related to the password policy use only with the UI
 */
class PasswordPolicyViewModel {
  /**
   * Constructor
   * @param {PasswordPolicyDto} settings
   */
  constructor(settings = {}) {
    this.policyPassphraseExternalServices = settings.external_services ?? false;
    this.passwordLength = settings.generator_passwords_length ?? 18;
    this.passphraseWordsLength = settings.generator_passphrase_words ?? 9;
    this.upper = settings.generator_passwords_mask_upper ?? false;
    this.lower = settings.generator_passwords_mask_lower ?? false;
    this.digit = settings.generator_passwords_mask_digit ?? false;
    this.special_char1 = settings.generator_passwords_mask_char1 ?? false;
    this.parenthesis = settings.generator_passwords_mask_parenthesis ?? false;
    this.special_char2 = settings.generator_passwords_mask_char2 ?? false;
    this.special_char3 = settings.generator_passwords_mask_char3 ?? false;
    this.special_char4 = settings.generator_passwords_mask_char4 ?? false;
    this.special_char5 = settings.generator_passwords_mask_char5 ?? false;
    this.emoji = settings.generator_passwords_mask_emoji ?? false;
    this.lookAlikeCharacters = settings.generator_passwords_look_alike_chars ?? false;
    this.wordsSeparator = settings.generator_passphrase_words_separator ?? " ";
    this.wordCase = settings.generator_passphrase_words_case ?? "lowercase";
    this.provider = settings.generator_default_password_type ?? "password";
  }
}

export default PasswordPolicyViewModel;
