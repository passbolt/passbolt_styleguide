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

import MockPort from "../../../../react-extension/test/mock/MockPort";
import GroupsUsersCollection from "../../../models/entity/groupUser/groupsUsersCollection";
import { defaultGroupDto } from "../../../models/entity/group/groupEntity.test.data";
import GroupServiceWorkerService, {
  GROUPS_FIND_MY_GROUPS,
  GROUPS_GET_BY_IDS,
  GROUPS_USERS_GET_BY_GROUP_ID,
} from "./groupServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GroupServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new GroupServiceWorkerService(port);
  });

  describe("::findMyGroups", () => {
    it("requests the service worker with the expected event and return a group collection.", async () => {
      expect.assertions(2);

      jest.spyOn(port, "request").mockImplementation(() => {});
      await service.findMyGroups();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(GROUPS_FIND_MY_GROUPS);
    });
  });

  describe("::getByIds", () => {
    it("requests the service worker with the expected event and returns the raw dto array.", async () => {
      expect.assertions(3);

      const groupsDto = [defaultGroupDto(), defaultGroupDto(), defaultGroupDto()];
      const requestedIds = groupsDto.map((group) => group.id);
      port.addRequestListener(GROUPS_GET_BY_IDS, () => groupsDto);
      jest.spyOn(port, "request");

      const result = await service.getByIds(requestedIds);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(GROUPS_GET_BY_IDS, requestedIds);
      expect(result).toStrictEqual(groupsDto);
    });
  });

  describe("::getGroupsUsersByGroupId", () => {
    it("requests the service worker with the expected event and returns a GroupsUsersCollection.", async () => {
      expect.assertions(4);

      const groupDto = defaultGroupDto({}, { withGroupsUsers: 3 });
      const groupsUsersDto = groupDto.groups_users;
      port.addRequestListener(GROUPS_USERS_GET_BY_GROUP_ID, () => groupsUsersDto);
      jest.spyOn(port, "request");

      const result = await service.getGroupsUsersByGroupId(groupDto.id);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(GROUPS_USERS_GET_BY_GROUP_ID, groupDto.id);
      expect(result).toBeInstanceOf(GroupsUsersCollection);
      expect(result.toDto()).toStrictEqual(groupsUsersDto);
    });
  });
});
