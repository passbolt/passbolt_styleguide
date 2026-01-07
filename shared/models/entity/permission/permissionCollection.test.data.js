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
 * @since         4.8.0
 */

import { defaultPermissionDto } from "./permissionEntity.test.data";

/**
 * Build dtos.
 * @param {object} data The data to override the default dto.
 * @param {object} options Options to pass to the permission factory.
 * @param {integer} [options.count=10] The number of permissions to create
 * @returns {object}
 */
export const defaultPermissionsDtos = (data = {}, options = {}) => {
  const dtos = [];
  const count = options.count || 10;
  const acoForeignKey = crypto.randomUUID();
  for (let i = 0; i < count; i++) {
    const dto = defaultPermissionDto({ aco_foreign_key: acoForeignKey, ...data }, options);
    dtos.push(dto);
  }
  return dtos;
};
