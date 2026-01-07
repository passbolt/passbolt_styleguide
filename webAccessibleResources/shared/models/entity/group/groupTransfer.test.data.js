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
 * @since         4.9.3
 */

import { defaultPermissionTransferDto } from "../permission/permissionTransferEntity.test.data";
import { v4 as uuidv4 } from "uuid";

/**
 * Build default group transfer dto.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const defaultGroupTransferDto = (data = {}) => {
  const defaultData = {
    owners: [defaultPermissionTransferDto(data)],
  };

  return defaultData;
};

/**
 * Build default user transfer dto.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const defaultUserTransferDto = (data = {}) => {
  const id = data.id || uuidv4();

  const defaultData = {
    id: id,
    group_id: uuidv4(),
    ...data,
  };

  return defaultData;
};
