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
 * Model related to the password policies use only with the UI
 */
class PasswordPoliciesViewModel {
  /**
   * Constructor
   * @param {PasswordPoliciesDto} settings
   */
  constructor(settings = {}) {
    this.provider = settings?.default_generator === "passphrase" ? "passphrase" : "password";
    this.policyPassphraseExternalServices = Boolean(settings?.external_dictionary_check);
    this.source = settings?.source ?? "default";

    const passwordSettings = settings?.password_generator_settings;
    this.passwordLength = passwordSettings?.length ?? 18;
    this.mask_upper = passwordSettings?.mask_upper ?? false;
    this.mask_lower = passwordSettings?.mask_lower ?? false;
    this.mask_digit = passwordSettings?.mask_digit ?? false;
    this.mask_parenthesis = passwordSettings?.mask_parenthesis ?? false;
    this.mask_char1 = passwordSettings?.mask_char1 ?? false;
    this.mask_char2 = passwordSettings?.mask_char2 ?? false;
    this.mask_char3 = passwordSettings?.mask_char3 ?? false;
    this.mask_char4 = passwordSettings?.mask_char4 ?? false;
    this.mask_char5 = passwordSettings?.mask_char5 ?? false;
    this.mask_emoji = passwordSettings?.mask_emoji ?? false;
    this.excludeLookAlikeCharacters = passwordSettings?.exclude_look_alike_chars ?? false;

    const passphraseSettings = settings?.passphrase_generator_settings;
    this.wordsCount = passphraseSettings?.words ?? 9;
    this.wordsSeparator = passphraseSettings?.word_separator ?? " ";
    this.wordCase = passphraseSettings?.word_case ?? "lowercase";
  }
}

export default PasswordPoliciesViewModel;
