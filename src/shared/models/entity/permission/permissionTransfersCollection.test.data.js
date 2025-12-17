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
 * @since         4.9.4
 */

import { defaultPermissionTransferDto } from "./permissionTransferEntity.test.data";

/**
 * Build permission transfers collection dtos.
 * @param {number} [permissionTransferCount=10] The number of permission transfer.
 * @returns {object}
 */
export const defaultPermissionTransfersCollectionDtos = (permissionTransferCount = 10) => {
  const dtos = [];
  for (let i = 0; i < permissionTransferCount; i++) {
    const dto = defaultPermissionTransferDto();
    dtos.push(dto);
  }
  return dtos;
};
