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
 * @since         5.7.0
 */
import GroupsCollection from "../../../models/entity/group/groupsCollection";
import GroupsUsersCollection from "../../../models/entity/groupUser/groupsUsersCollection";

export const GROUPS_FIND_MY_GROUPS = "passbolt.groups.find-my-groups";
export const GROUPS_GET_BY_IDS = "passbolt.groups.get-by-ids";
export const GROUPS_USERS_GET_BY_GROUP_ID = "passbolt.groups_users.get-by-group-id";

export default class GroupServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find all the groups the current user is member of.
   * @returns {Promise<GroupsCollection>}
   */
  async findMyGroups() {
    const groupsDto = await this.port.request(GROUPS_FIND_MY_GROUPS);
    return new GroupsCollection(groupsDto);
  }

  /**
   * Get the groups matching the given ids. The list comes from the service-worker local-storage cache
   * when initialised, otherwise it is fetched from the API.
   * @param {Array<string>} groupIds The ids of the groups to retrieve.
   * @returns {Promise<GroupsCollection>}
   */
  async getByIds(groupIds) {
    const groupsDto = await this.port.request(GROUPS_GET_BY_IDS, groupIds);
    return new GroupsCollection(groupsDto);
  }

  /**
   * Get the members of the group matching the given id. The list comes from the service-worker
   * local-storage cache when initialised, otherwise it is fetched from the API.
   * @param {string} groupId The id of the group whose members are requested.
   * @returns {Promise<GroupsUsersCollection>}
   */
  async getGroupsUsersByGroupId(groupId) {
    const groupsUsersDto = await this.port.request(GROUPS_USERS_GET_BY_GROUP_ID, groupId);
    return new GroupsUsersCollection(groupsUsersDto);
  }
}
