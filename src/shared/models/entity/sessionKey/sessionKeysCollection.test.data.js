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
 * @since         4.10.1
 */
import {defaultSessionKeyDto} from "./sessionKeyEntity.test.data";

export const defaultSessionKeysDtos = (count = 2, data = {}) => {
  const dtos = [];
  for (let i = 0; i < count; i += 2) {
    const dto1 = defaultSessionKeyDto({session_key: generateSessionKey(i), ...data});
    const dto2 = defaultSessionKeyDto({session_key: generateSessionKey(i + 1), ...data});
    dtos.push(dto1, dto2);
  }

  return dtos;
};

/**
 * Given an index, generates a string that is matching the session key regular expression
 * @param {number} index
 * @returns {string}
 */
function generateSessionKey(index) {
  const indexString = index.toString();
  return `9:${indexString.padStart(64, "0")}`;
}
