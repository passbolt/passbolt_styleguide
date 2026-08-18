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

export const board = defaultGroupDto({ name: "Board" });

/**
 * Build two resources in the controlled-mode shape the ShareDialog feeds to ShareChanges, covering
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
