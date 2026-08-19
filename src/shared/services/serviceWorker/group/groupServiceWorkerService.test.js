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
import GroupsCollection from "../../../models/entity/group/groupsCollection";
import { defaultGroupDto } from "../../../models/entity/group/groupEntity.test.data";
import { defaultGroupsDtos } from "../../../models/entity/group/groupsCollection.test.data";
import { defaultUserDto } from "../../../models/entity/user/userEntity.test.data";
import { defaultGroupUser } from "../../../models/entity/groupUser/groupUserEntity.test.data";
import { v4 as uuidv4 } from "uuid";
import GroupServiceWorkerService, {
  GROUPS_FIND_MY_GROUPS,
  GROUPS_FIND_BY_IDS_FOR_SHARE,
  GROUPS_DELETE,
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
    it("requests the service worker with the expected event and returns a GroupsCollection.", async () => {
      expect.assertions(4);

      const groupsDto = defaultGroupsDtos(3);
      port.addRequestListener(GROUPS_FIND_MY_GROUPS, () => groupsDto);
      jest.spyOn(port, "request");

      const result = await service.findMyGroups();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(GROUPS_FIND_MY_GROUPS);
      expect(result).toBeInstanceOf(GroupsCollection);
      expect(result.toDto()).toStrictEqual(groupsDto);
    });
  });

  describe("::findByIdsForShare", () => {
    it("requests the service worker with the expected event, preserves member users, and returns a GroupsCollection.", async () => {
      expect.assertions(4);

      const member = defaultUserDto({ username: "member@passbolt.com" }, { withGpgkey: true });
      const groupsDto = [
        defaultGroupDto({ groups_users: [defaultGroupUser({ user_id: member.id, user: member })] }),
        ...defaultGroupsDtos(2),
      ];
      const requestedIds = groupsDto.map((group) => group.id);
      port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => groupsDto);
      jest.spyOn(port, "request");

      const result = await service.findByIdsForShare(requestedIds);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(GROUPS_FIND_BY_IDS_FOR_SHARE, requestedIds);
      expect(result).toBeInstanceOf(GroupsCollection);
      expect(result.toDto()).toStrictEqual(groupsDto);
    });
  });

  describe("::delete", () => {
    it("requests the service worker with the expected event and no transfer.", async () => {
      expect.assertions(2);

      const groupId = uuidv4();
      jest.spyOn(port, "request");

      await service.delete(groupId);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(GROUPS_DELETE, groupId, undefined);
    });

    it("requests the service worker with the expected event and the given ownership transfer.", async () => {
      expect.assertions(2);

      const groupId = uuidv4();
      const groupDeleteTransfer = { owners: [{ id: uuidv4(), aco_foreign_key: uuidv4() }] };
      jest.spyOn(port, "request");

      await service.delete(groupId, groupDeleteTransfer);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(GROUPS_DELETE, groupId, groupDeleteTransfer);
    });

    it("throws if the group id is not a valid uuid.", async () => {
      expect.assertions(2);

      jest.spyOn(port, "request");

      await expect(service.delete("not-a-uuid")).rejects.toThrow("The given groupId should be a valid UUID");
      expect(port.request).not.toHaveBeenCalled();
    });
  });
});
