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

export const GROUPS_FIND_MY_GROUPS = "passbolt.groups.find-my-groups";
export const GROUPS_FIND_BY_IDS_FOR_SHARE = "passbolt.groups.find-by-ids-for-share";

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
   * Find the groups matching the given ids, with their member users embedded (user with profile and
   * gpgkey). The list is always fetched fresh from the API so the share/permission-review workflow
   * validates against current group data, never a cache.
   * @param {Array<string>} groupIds The ids of the groups to retrieve.
   * @returns {Promise<GroupsCollection>}
   */
  async findByIdsForShare(groupIds) {
    const groupsDto = await this.port.request(GROUPS_FIND_BY_IDS_FOR_SHARE, groupIds);
    return new GroupsCollection(groupsDto);
  }
}
