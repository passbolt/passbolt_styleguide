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
import { GROUPS_FIND_BY_IDS_FOR_SHARE } from "../serviceWorker/group/groupServiceWorkerService";
import { defaultPermissionDto } from "../../models/entity/permission/permissionEntity.test.data";
import { defaultGroupDto } from "../../models/entity/group/groupEntity.test.data";
import { defaultGroupUser } from "../../models/entity/groupUser/groupUserEntity.test.data";
import { defaultUserDto } from "../../models/entity/user/userEntity.test.data";

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
      expect.assertions(7);

      const folderId = uuidv4();
      const groupIds = [uuidv4(), uuidv4()];
      const memberA = defaultUserDto({ username: "member-a@passbolt.com" });
      const memberB = defaultUserDto({ username: "member-b@passbolt.com" });
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
          aro_foreign_key: uuidv4(),
          type: 1,
        }),
      ];
      const groupsDto = [
        defaultGroupDto({
          id: groupIds[0],
          name: "Group 0",
          groups_users: [defaultGroupUser({ group_id: groupIds[0], user_id: memberA.id, user: memberA })],
        }),
        defaultGroupDto({
          id: groupIds[1],
          name: "Group 1",
          groups_users: [defaultGroupUser({ group_id: groupIds[1], user_id: memberB.id, user: memberB })],
        }),
      ];
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => permissionsDto);
      port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => groupsDto);
      jest.spyOn(port, "request");

      const snapshot = await service.buildSnapshotForResourceCreation(folderId);

      expect(port.request).toHaveBeenCalledWith(KEYRING_SYNC_EVENT);
      expect(port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, folderId, "Folder");
      expect(port.request).toHaveBeenCalledWith(GROUPS_FIND_BY_IDS_FOR_SHARE, groupIds);
      expect(snapshot).toBeInstanceOf(PermissionSnapshotEntity);
      expect(snapshot.permissions.toDto()).toStrictEqual(permissionsDto);
      expect(snapshot.groups.toDto()).toStrictEqual(groupsDto);
      expect(snapshot.users.toDto()).toStrictEqual([memberA, memberB]);
    });

    it("skips the group fetch when the parent folder has no group permissions, derives no users, and still returns a PermissionSnapshotEntity", async () => {
      expect.assertions(4);

      const folderId = uuidv4();
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => []);
      port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);
      jest.spyOn(port, "request");

      const snapshot = await service.buildSnapshotForResourceCreation(folderId);

      expect(port.request).not.toHaveBeenCalledWith(GROUPS_FIND_BY_IDS_FOR_SHARE, []);
      expect(snapshot).toBeInstanceOf(PermissionSnapshotEntity);
      expect(snapshot.groups).toHaveLength(0);
      expect(snapshot.users).toHaveLength(0);
    });

    it("synchronises the keyring before the permission fetch, and fetches the permissions before the groups", async () => {
      expect.assertions(3);

      const folderId = uuidv4();
      const groupId = uuidv4();
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => [
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "Group",
          aro_foreign_key: groupId,
          type: 1,
        }),
      ]);
      port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => [defaultGroupDto({ id: groupId, name: "Group 0" })]);
      jest.spyOn(port, "request");

      await service.buildSnapshotForResourceCreation(folderId);

      // Deterministic prefix: keyring sync first, then the permission fetch.
      expect(port.request).toHaveBeenNthCalledWith(1, KEYRING_SYNC_EVENT);
      expect(port.request).toHaveBeenNthCalledWith(2, PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, folderId, "Folder");
      // Groups are fetched after the permission fetch.
      const events = port.request.mock.calls.map(([event]) => event);
      expect(events.indexOf(GROUPS_FIND_BY_IDS_FOR_SHARE)).toBeGreaterThan(
        events.indexOf(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY),
      );
    });

    it("derives the snapshot users from the permissioned groups members, deduplicated across groups, excluding directly-permissioned non-members", async () => {
      expect.assertions(3);

      const folderId = uuidv4();
      const groupAId = uuidv4();
      const groupBId = uuidv4();
      const directUserId = uuidv4();
      const sharedMember = defaultUserDto({ username: "shared@passbolt.com" });
      const soloMember = defaultUserDto({ username: "solo@passbolt.com" });
      const permissionsDto = [
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "Group",
          aro_foreign_key: groupAId,
          type: 1,
        }),
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "Group",
          aro_foreign_key: groupBId,
          type: 1,
        }),
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "User",
          aro_foreign_key: directUserId,
          type: 15,
        }),
      ];
      const groupsDto = [
        defaultGroupDto({
          id: groupAId,
          name: "Group A",
          groups_users: [
            defaultGroupUser({ group_id: groupAId, user_id: sharedMember.id, user: sharedMember, is_admin: true }),
            defaultGroupUser({ group_id: groupAId, user_id: soloMember.id, user: soloMember }),
          ],
        }),
        defaultGroupDto({
          id: groupBId,
          name: "Group B",
          groups_users: [defaultGroupUser({ group_id: groupBId, user_id: sharedMember.id, user: sharedMember })],
        }),
      ];
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => permissionsDto);
      port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => groupsDto);
      jest.spyOn(port, "request");

      const snapshot = await service.buildSnapshotForResourceCreation(folderId);

      expect(snapshot.users.toDto()).toStrictEqual([sharedMember, soloMember]);
      expect(snapshot.users.items.find((u) => u.id === directUserId)).toBeUndefined();
      expect(port.request).not.toHaveBeenCalledWith("passbolt.users.get-by-ids", expect.anything());
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

  describe("::buildSnapshotForResourcesShare", () => {
    it("returns one PermissionSnapshotEntity per resource, each built from the resource itself", async () => {
      expect.assertions(4);

      const resourcesIds = [uuidv4(), uuidv4()];
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, (acoId) => [
        defaultPermissionDto({
          aco: "Resource",
          aco_foreign_key: acoId,
          aro: "User",
          aro_foreign_key: uuidv4(),
          type: 15,
        }),
      ]);
      port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);
      jest.spyOn(port, "request");

      const snapshots = await service.buildSnapshotForResourcesShare(resourcesIds);

      expect(snapshots).toHaveLength(2);
      expect(snapshots[0]).toBeInstanceOf(PermissionSnapshotEntity);
      // Each snapshot is captured from its own resource (ACO_RESOURCE).
      expect(port.request).toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        resourcesIds[0],
        "Resource",
      );
      expect(port.request).toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        resourcesIds[1],
        "Resource",
      );
    });

    it("synchronises the keyring only once for the whole selection, before any permission fetch", async () => {
      expect.assertions(3);

      const resourcesIds = [uuidv4(), uuidv4(), uuidv4()];
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => []);
      port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);
      jest.spyOn(port, "request");

      await service.buildSnapshotForResourcesShare(resourcesIds);

      const events = port.request.mock.calls.map(([event]) => event);
      // The keyring is synced once, not once per resource.
      expect(events.filter((event) => event === KEYRING_SYNC_EVENT)).toHaveLength(1);
      // ...while each resource still gets its own permission fetch.
      expect(events.filter((event) => event === PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY)).toHaveLength(3);
      // The single keyring sync happens before any permission fetch.
      expect(events.indexOf(KEYRING_SYNC_EVENT)).toBeLessThan(
        events.indexOf(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY),
      );
    });

    it("returns an empty array for an empty selection without synchronising the keyring", async () => {
      expect.assertions(2);
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      jest.spyOn(port, "request");

      const snapshots = await service.buildSnapshotForResourcesShare([]);

      expect(snapshots).toStrictEqual([]);
      expect(port.request).not.toHaveBeenCalled();
    });
  });

  describe("::buildSnapshotForFolderShare", () => {
    it("synchronises the keyring then captures the folder's own permissions (ACO_FOLDER) and returns a PermissionSnapshotEntity", async () => {
      expect.assertions(3);

      const folderId = uuidv4();
      const userId = uuidv4();
      const permissionsDto = [
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "User",
          aro_foreign_key: userId,
          type: 15,
        }),
      ];
      port.addRequestListener(KEYRING_SYNC_EVENT, () => {});
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => permissionsDto);
      port.addRequestListener(GROUPS_FIND_BY_IDS_FOR_SHARE, () => []);
      jest.spyOn(port, "request");

      const snapshot = await service.buildSnapshotForFolderShare(folderId);

      expect(port.request).toHaveBeenCalledWith(KEYRING_SYNC_EVENT);
      expect(port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, folderId, "Folder");
      expect(snapshot).toBeInstanceOf(PermissionSnapshotEntity);
    });
  });
});
