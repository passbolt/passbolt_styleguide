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
import { defaultUserTransferDto } from "./groupTransfer.test.data";

/**
 * Default user transfers collection
 * @param {number} [userTransferCount = 10] number of user transfer dto
 * @param {object} [data] The data to override properties
 * @returns {*[]}
 */
export const defaultUserTransfersCollectionDto = (userTransferCount = 10, data = {}) => {
  const dtos = [];
  for (let i = 0; i < userTransferCount; i++) {
    const dto = defaultUserTransferDto(data);
    dtos.push(dto);
  }
  return dtos;
};
