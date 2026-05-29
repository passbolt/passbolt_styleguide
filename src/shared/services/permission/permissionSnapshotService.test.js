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
 * @since         5.13.0
 */

import { v4 as uuidv4 } from "uuid";
import MockPort from "../../../react-extension/test/mock/MockPort";
import PermissionSnapshotService from "./permissionSnapshotService";
import PermissionSnapshotEntity from "../../models/entity/permission/permissionSnapshotEntity";
import { KEYRING_SYNC_EVENT } from "../serviceWorker/keyring/keyringServiceWorkerService";
import { PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY } from "../serviceWorker/permission/permissionServiceWorkerService";
import { GROUPS_GET_BY_IDS } from "../serviceWorker/group/groupServiceWorkerService";
import { USERS_GET_BY_IDS } from "../serviceWorker/user/userServiceWorkerService";
import { defaultPermissionDto } from "../../models/entity/permission/permissionEntity.test.data";
import { defaultGroupsDtos } from "../../models/entity/group/groupsCollection.test.data";
import { defaultUsersDtos } from "../../models/entity/user/usersCollection.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PermissionSnapshotService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new PermissionSnapshotService(port);
  });

  describe("::buildSnapshotForResourceCreation", () => {
    it("synchronises the keyring then fetches the parent folder permissions, groups, and users referenced by them, and returns a PermissionSnapshotEntity", async () => {
      expect.assertions(8);

      const folderId = uuidv4();
      const groupIds = [uuidv4(), uuidv4()];
      const userIds = [uuidv4()];
      const permissionsDto = [
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "Group",
          aro_foreign_key: groupIds[0],
          type: 15,
        }),
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "Group",
          aro_foreign_key: groupIds[1],
          type: 7,
        }),
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "User",
          aro_foreign_key: userIds[0],
          type: 1,
        }),
      ];
      const groupsDto = defaultGroupsDtos(2);
      const usersDto = defaultUsersDtos(1);
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => permissionsDto);
      port.addRequestListener(GROUPS_GET_BY_IDS, () => groupsDto);
      port.addRequestListener(USERS_GET_BY_IDS, () => usersDto);
      jest.spyOn(port, "request");

      const snapshot = await service.buildSnapshotForResourceCreation(folderId);

      expect(port.request).toHaveBeenCalledWith(KEYRING_SYNC_EVENT);
      expect(port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, folderId, "Folder");
      expect(port.request).toHaveBeenCalledWith(GROUPS_GET_BY_IDS, groupIds);
      expect(port.request).toHaveBeenCalledWith(USERS_GET_BY_IDS, userIds);
      expect(snapshot).toBeInstanceOf(PermissionSnapshotEntity);
      expect(snapshot.permissions.toDto()).toStrictEqual(permissionsDto);
      expect(snapshot.groups.toDto()).toStrictEqual(groupsDto);
      expect(snapshot.users.toDto()).toStrictEqual(usersDto);
    });

    it("requests empty groups and users when the parent folder has no permissions, and still returns a PermissionSnapshotEntity", async () => {
      expect.assertions(5);

      const folderId = uuidv4();
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => []);
      port.addRequestListener(GROUPS_GET_BY_IDS, () => []);
      port.addRequestListener(USERS_GET_BY_IDS, () => []);
      jest.spyOn(port, "request");

      const snapshot = await service.buildSnapshotForResourceCreation(folderId);

      expect(port.request).toHaveBeenCalledWith(GROUPS_GET_BY_IDS, []);
      expect(port.request).toHaveBeenCalledWith(USERS_GET_BY_IDS, []);
      expect(snapshot).toBeInstanceOf(PermissionSnapshotEntity);
      expect(snapshot.groups).toHaveLength(0);
      expect(snapshot.users).toHaveLength(0);
    });

    it("synchronises the keyring before the permission fetch, and fetches the permissions before the groups and users", async () => {
      expect.assertions(3);

      const folderId = uuidv4();
      const callOrder = [];
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {
        callOrder.push(KEYRING_SYNC_EVENT);
      });
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => {
        callOrder.push(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY);
        return [];
      });
      port.addRequestListener(GROUPS_GET_BY_IDS, () => {
        callOrder.push(GROUPS_GET_BY_IDS);
        return [];
      });
      port.addRequestListener(USERS_GET_BY_IDS, () => {
        callOrder.push(USERS_GET_BY_IDS);
        return [];
      });

      await service.buildSnapshotForResourceCreation(folderId);

      expect(callOrder.indexOf(KEYRING_SYNC_EVENT)).toBeLessThan(
        callOrder.indexOf(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY),
      );
      expect(callOrder.indexOf(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY)).toBeLessThan(
        callOrder.indexOf(GROUPS_GET_BY_IDS),
      );
      expect(callOrder.indexOf(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY)).toBeLessThan(
        callOrder.indexOf(USERS_GET_BY_IDS),
      );
    });

    it("propagates the error when the keyring synchronisation fails", async () => {
      expect.assertions(1);

      const folderId = uuidv4();
      const failure = new Error("Keyring sync failed");
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {
        throw failure;
      });

      await expect(service.buildSnapshotForResourceCreation(folderId)).rejects.toThrow("Keyring sync failed");
    });
  });
});
