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
import { defaultSessionKeysBundleDto } from "./sessionKeysBundleEntity.test.data";
import { v4 as uuidv4 } from "uuid";

/**
 * Default session keys bundles dtos
 * @param {object} data
 * @param {object} options
 * @returns {*[]}
 */
export const defaultSessionKeysBundlesDtos = (data = {}, options = {}) => {
  const count = options?.count || 10;
  data.user_id = data.user_id || uuidv4(); // Validate same user id build rules
  const dtos = [];
  for (let i = 0; i < count; i++) {
    const dto = defaultSessionKeysBundleDto(data, options);
    dtos.push(dto);
  }

  return dtos;
};
