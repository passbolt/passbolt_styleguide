/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.14.0
 */
import { v4 as uuidv4 } from "uuid";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { users as usersDtos } from "../../../../shared/models/entity/user/userEntity.test.data";
import { defaultResourceDto } from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultPermissionDto } from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import { defaultFolderDto } from "../../../../shared/models/entity/folder/folderEntity.test.data";
import { defaultGroupUser } from "../../../../shared/models/entity/groupUser/groupUserEntity.test.data";
import { defaultGroupDto } from "../../../../shared/models/entity/group/groupEntity.test.data";

/**
 * Returns the default app context for the unit test
 * @returns {object} data Data to override.
 * @param data
 */
export const defaultContext = (data = {}) => {
  const userA = usersDtos.ada;
  const userB = usersDtos.betty;
  const users = [userA, userB];

  const groupId = uuidv4();
  const groupsUsers = [
    defaultGroupUser({ groupId: groupId, user_id: userA.id, user: userA, is_admin: true }),
    defaultGroupUser({ groupId: groupId, user_id: userB.id, user: userB, is_admin: false }),
  ];
  const group = defaultGroupDto({ id: groupId, groups_users: groupsUsers });
  const groups = [group];

  const resourceId = uuidv4();
  const resourcePermissions = [
    defaultPermissionDto({ aco_foreign_key: resourceId, aro_foreign_key: userA.id }),
    defaultPermissionDto({ aco_foreign_key: resourceId, aro_foreign_key: userB.id, type: 1 }),
  ];
  const resource = defaultResourceDto({ id: resourceId, permissions: resourcePermissions });

  const folderId = uuidv4();
  const folderPermissions = [
    defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: userA.id }),
    defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: userB.id, type: 1 }),
  ];
  const folder = defaultFolderDto({ id: folderId, permissions: folderPermissions });

  const groupError = defaultGroupDto({ ...group, groups_users: groupsUsers });
  const errors = {
    resources: {
      sole_owner: [resource],
    },
    folders: {
      sole_owner: [folder],
    },
    groups: {
      sole_manager: [groupError],
    },
  };

  const deleteUserWithConflictsDialogProps = { user: userA, errors };
  const defaultData = defaultAppContext({ users, groups, deleteUserWithConflictsDialogProps });
  return Object.assign(defaultData, data);
};

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultProps() {
  return {
    onClose: jest.fn(),
  };
}
