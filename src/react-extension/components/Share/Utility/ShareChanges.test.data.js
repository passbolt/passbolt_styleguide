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
 * @since         5.15.0
 */
import {
  ownerPermissionDto,
  readGroupPermissionDto,
  readPermissionDto,
  updatePermissionDto,
} from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import { defaultUserDto } from "../../../../shared/models/entity/user/userEntity.test.data";
import { defaultProfileDto } from "../../../../shared/models/entity/profile/ProfileEntity.test.data";
import { defaultGroupDto } from "../../../../shared/models/entity/group/groupEntity.test.data";
import { defaultGroupUser } from "../../../../shared/models/entity/groupUser/groupUserEntity.test.data";
import { v4 as uuidv4 } from "uuid";

export const ada = defaultUserDto({
  username: "ada@passbolt.com",
  profile: defaultProfileDto({ first_name: "Ada", last_name: "Lovelace" }),
});

export const betty = defaultUserDto({
  username: "betty@passbolt.com",
  profile: defaultProfileDto({ first_name: "Betty", last_name: "Holberton" }),
});

export const carol = defaultUserDto({
  username: "carol@passbolt.com",
  profile: defaultProfileDto({ first_name: "Carol", last_name: "Shaw" }),
});

const boardId = uuidv4();
export const board = defaultGroupDto({
  id: boardId,
  name: "Board",
  groups_users: [
    defaultGroupUser({ group_id: boardId, user_id: betty.id, user: betty, is_admin: true }),
    defaultGroupUser({ group_id: boardId, user_id: carol.id, user: carol }),
  ],
});

/**
 * Build a move batch the operator owns only part of, where a staged change must never reach the
 * resource she does not own: "apache" is Ada's, "cakephp" is Carol's and Ada can only update it.
 * @returns {Array<object>}
 */
export function mixedOwnershipResourcesDtos() {
  const ownedId = uuidv4();
  const notOwnedId = uuidv4();
  return [
    {
      id: ownedId,
      metadata: { name: "apache" },
      permission: { type: 15 },
      permissions: [
        ownerPermissionDto({ aco_foreign_key: ownedId, aro_foreign_key: ada.id, user: ada }),
        updatePermissionDto({ aco_foreign_key: ownedId, aro_foreign_key: betty.id, user: betty }),
      ],
    },
    {
      id: notOwnedId,
      metadata: { name: "cakephp" },
      permission: { type: 7 },
      permissions: [
        updatePermissionDto({ aco_foreign_key: notOwnedId, aro_foreign_key: ada.id, user: ada }),
        ownerPermissionDto({ aco_foreign_key: notOwnedId, aro_foreign_key: carol.id, user: carol }),
      ],
    },
  ];
}

/**
 * Build two resources in the shape the ShareDialog feeds to ShareChanges, covering
 * each aggregation scenario:
 * - Ada owns both (uniform owner).
 * - Betty can update "apache" and read "cakephp" (varies by type).
 * - Carol can read "apache" only (varies by absence).
 * - The Board group can read both (uniform read).
 * @returns {Array<object>}
 */
export function defaultSharedResourcesDtos() {
  const resource1Id = uuidv4();
  const resource2Id = uuidv4();
  return [
    {
      id: resource1Id,
      metadata: { name: "apache" },
      permission: { type: 15 },
      permissions: [
        ownerPermissionDto({ aco_foreign_key: resource1Id, aro_foreign_key: ada.id, user: ada }),
        updatePermissionDto({ aco_foreign_key: resource1Id, aro_foreign_key: betty.id, user: betty }),
        readPermissionDto({ aco_foreign_key: resource1Id, aro_foreign_key: carol.id, user: carol }),
        readGroupPermissionDto({ aco_foreign_key: resource1Id, aro_foreign_key: board.id, group: board }),
      ],
    },
    {
      id: resource2Id,
      metadata: { name: "cakephp" },
      permission: { type: 15 },
      permissions: [
        ownerPermissionDto({ aco_foreign_key: resource2Id, aro_foreign_key: ada.id, user: ada }),
        readPermissionDto({ aco_foreign_key: resource2Id, aro_foreign_key: betty.id, user: betty }),
        readGroupPermissionDto({ aco_foreign_key: resource2Id, aro_foreign_key: board.id, group: board }),
      ],
    },
  ];
}

/**
 * Build a large share selection in the same shape as defaultSharedResourcesDtos, to exercise the
 * permission computation at a scale a "select all then share" reaches.
 * The first recipient owns every resource, the others alternate between update and read, and one in
 * seven is left out of a given resource so the varies aggregation is exercised too.
 * @param {object} [options]
 * @param {number} [options.resourceCount=500] The number of resources to share.
 * @param {number} [options.aroCount=100] The number of recipients holding a permission.
 * @returns {Array<object>}
 */
export function largeSharedResourcesDtos({ resourceCount = 500, aroCount = 100 } = {}) {
  const aros = Array.from({ length: aroCount }, (value, index) =>
    defaultUserDto({
      username: `user${index}@passbolt.com`,
      profile: defaultProfileDto({ first_name: `User${String(index).padStart(4, "0")}`, last_name: "Test" }),
    }),
  );

  return Array.from({ length: resourceCount }, (value, resourceIndex) => {
    const resourceId = uuidv4();
    const permissions = [];
    aros.forEach((aro, aroIndex) => {
      if (aroIndex !== 0 && (resourceIndex + aroIndex) % 7 === 0) {
        return;
      }
      const permissionDto =
        aroIndex === 0 ? ownerPermissionDto : aroIndex % 3 === 0 ? updatePermissionDto : readPermissionDto;
      permissions.push(permissionDto({ aco_foreign_key: resourceId, aro_foreign_key: aro.id, user: aro }));
    });
    return {
      id: resourceId,
      metadata: { name: `resource-${String(resourceIndex).padStart(4, "0")}` },
      permission: { type: 15 },
      permissions,
    };
  });
}
