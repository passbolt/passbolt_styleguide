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

export const defaultPasswordPoliciesViewModel = (data) => {
  const defaultData = {
    policyPassphraseExternalServices: true,
    passwordLength: 12,
    wordsCount: 8,
    mask_upper: true,
    mask_lower: true,
    mask_digit: true,
    mask_char1: true,
    mask_parenthesis: true,
    mask_char2: true,
    mask_char3: true,
    mask_char4: true,
    mask_char5: true,
    mask_emoji: false,
    excludeLookAlikeCharacters: true,
    wordsSeparator: " ",
    wordCase: "lowercase",
    provider: "password",
    source: "default",
  };
  return Object.assign(defaultData, data);
};
