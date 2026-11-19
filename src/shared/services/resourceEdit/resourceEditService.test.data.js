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
 * @since         5.18.0
 */
import { v4 as uuidv4 } from "uuid";
import { defaultPermissionDto } from "../../models/entity/permission/permissionEntity.test.data";
import { defaultUserDto } from "../../models/entity/user/userEntity.test.data";

/**
 * Build a user permission on a resource, with its user.
 * @param {string} resourceId
 * @param {number} type
 * @param {string} username
 * @returns {object}
 */
const userPermissionDto = (resourceId, type, username) => {
  const userId = uuidv4();
  return defaultPermissionDto({
    aco_foreign_key: resourceId,
    aro_foreign_key: userId,
    type,
    user: defaultUserDto({ id: userId, username }, { withProfile: true }),
  });
};

/**
 * The permissions of a resource only accessible by its owner (the current user).
 * @param {string} resourceId
 * @returns {Array<object>}
 */
export const personalResourcePermissionsDtos = (resourceId) => [userPermissionDto(resourceId, 15, "ada@passbolt.com")];

/**
 * The permissions of a resource shared with another user.
 * @param {string} resourceId
 * @returns {Array<object>}
 */
export const sharedResourcePermissionsDtos = (resourceId) => [
  userPermissionDto(resourceId, 15, "ada@passbolt.com"),
  userPermissionDto(resourceId, 1, "betty@passbolt.com"),
];
