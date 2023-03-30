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

export const defaultPasswordPolicyDto = data => {
  const defaultData = {};
  return Object.assign(defaultData, data);
};

export const configuredPasswordPolicyDto = data => {
  const defaultData = defaultPasswordPolicyDto({
    external_services: true,
    generator_passwords_length: 12,
    generator_passphrase_words: 8,
    generator_passwords_mask_upper: true,
    generator_passwords_mask_lower: true,
    generator_passwords_mask_digit: true,
    generator_passwords_mask_char1: true,
    generator_passwords_mask_parenthesis: true,
    generator_passwords_mask_char2: true,
    generator_passwords_mask_char3: true,
    generator_passwords_mask_char4: true,
    generator_passwords_mask_char5: true,
    generator_passwords_mask_emoji: false,
    generator_passwords_look_alike_chars: true,
    generator_passphrase_words_separator: " ",
    generator_passphrase_words_case: "lower",
    generator_default_password_type: "password",
  });
  return Object.assign(defaultData, data);
};
