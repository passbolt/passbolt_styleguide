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
 * @since         3.6.0
 */
import { v4 as uuidv4 } from "uuid";
import { defaultGroupUser } from "../groupUser/groupUserEntity.test.data";
import { defaultUserDto } from "../user/userEntity.test.data";

export const minimumGroupUserDto = (data = {}) => ({
  name: "Current group",
  ...data,
});

/**
 * Build default group dto as the API would return.
 * @param {object} data The data to override the default dto.
 * @param {Object} [options]
 * @param {boolean} [options.withModifier=false] Add modifier default dto.
 * @param {boolean} [options.withCreator=false] Add creator default dto.
 * @param {boolean} [options.withMyGroupUser=false] Add my group user default dto.
 * @param {boolean|integer} [options.withGroupsUsers=0] Add groups users default dto.
 * @returns {object}
 */
export const defaultGroupDto = (data = {}, options = {}) => {
  const groupId = data.id || uuidv4();
  const defaultData = {
    id: groupId,
    name: "Current group",
    created: "2022-01-13T13:19:04.661Z",
    modified: "2022-01-13T13:19:04.661Z",
    created_by: uuidv4(),
    modified_by: uuidv4(),
    ...data,
  };

  if (!data.my_group_user && options?.withMyGroupUser) {
    defaultData.my_group_user = defaultGroupUser({ group_id: groupId, is_admin: true });
  }

  if (!data.creator && options?.withCreator) {
    defaultData.creator = defaultUserDto();
  }

  if (!data.modifier && options?.withModifier) {
    defaultData.modifier = defaultUserDto();
  }

  if (!data.groups_users && options?.withGroupsUsers) {
    const groupsUsersCount = typeof options?.withGroupsUsers === "number" ? options?.withGroupsUsers : 1;
    defaultData.groups_users = [];
    for (let i = 0; i < groupsUsersCount; i++) {
      const groupUserDto = defaultGroupUser({ user_id: uuidv4(), group_id: groupId, is_admin: true });
      defaultData.groups_users.push(groupUserDto);
    }
  }

  return defaultData;
};
