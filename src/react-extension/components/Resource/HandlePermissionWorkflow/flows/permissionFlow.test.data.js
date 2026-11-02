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
 * @since         5.16.0
 */
import { v4 as uuidv4 } from "uuid";
import GroupsCollection from "../../../../../shared/models/entity/group/groupsCollection";
import { GROUPS_FIND_BY_IDS_FOR_SHARE } from "../../../../../shared/services/serviceWorker/group/groupServiceWorkerService";
import { defaultGroupDto } from "../../../../../shared/models/entity/group/groupEntity.test.data";
import { defaultGroupUser } from "../../../../../shared/models/entity/groupUser/groupUserEntity.test.data";
import { defaultUserDto } from "../../../../../shared/models/entity/user/userEntity.test.data";

/**
 * Build a group the operator added in the ShareDialog, as the dialog displayed it (the `addedGroups`
 * option of `onConfirm`), together with the same group after somebody joined it.
 * @param {string} [name="Marketing"] The group name, distinct per group of a same collection.
 * @returns {{addedGroups: GroupsCollection, displayedGroupDto: object, grownGroupDto: object}}
 */
export function addedGroupFixture(name = "Marketing") {
  const groupId = uuidv4();
  const groupUserDto = (user) => defaultGroupUser({ group_id: groupId, user_id: user.id, user });
  const displayedGroupDto = defaultGroupDto({
    id: groupId,
    name,
    groups_users: [groupUserDto(defaultUserDto())],
  });
  const grownGroupDto = {
    ...displayedGroupDto,
    groups_users: [...displayedGroupDto.groups_users, groupUserDto(defaultUserDto())],
  };
  return { addedGroups: new GroupsCollection([displayedGroupDto]), displayedGroupDto, grownGroupDto };
}

/**
 * Make the group share fetch return the given groups matching the requested ids (the snapshots of
 * these tests reference no group).
 * @param {MockPort} port The mocked port.
 * @param {...object} groupDtos The groups to return.
 */
export function mockAddedGroupFetch(port, ...groupDtos) {
  port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, (groupIds) =>
    groupDtos.filter((groupDto) => groupIds.includes(groupDto.id)),
  );
}

// The flow tests translate with an identity `t`, so the message is the untranslated key.
export const ADDED_GROUP_CHANGED_ERROR_MESSAGE =
  "The groups you added {{groupNames}} changed during your review. Please retry the operation and verify them again.";
