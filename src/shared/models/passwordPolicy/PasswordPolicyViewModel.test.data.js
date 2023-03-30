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

export const defaultPasswordPolicyViewModel = data => {
  const defaultData = {
    policyPassphraseExternalServices: true,
    passwordLength: 12,
    passphraseWordsLength: 8,
    upper: true,
    lower: true,
    digit: true,
    special_char1: true,
    parenthesis: true,
    special_char2: true,
    special_char3: true,
    special_char4: true,
    special_char5: true,
    emoji: false,
    lookAlikeCharacters: true,
    wordsSeparator: " ",
    wordCase: "lower",
    provider: "password",
  };
  return Object.assign(defaultData, data);
};
