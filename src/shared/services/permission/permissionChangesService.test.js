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
import PermissionChangesService from "./permissionChangesService";
import PermissionSnapshotEntity from "../../models/entity/permission/permissionSnapshotEntity";
import PermissionsCollection from "../../models/entity/permission/permissionsCollection";
import PermissionEntity from "../../models/entity/permission/permissionEntity";
import { defaultPermissionDto } from "../../models/entity/permission/permissionEntity.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PermissionChangesService", () => {
  const service = new PermissionChangesService();

  /**
   * Build a `PermissionSnapshotEntity` over a set of permissions targeting `folderId` with
   * sensible defaults for groups/users (unused in `buildResourcePermissionChanges`).
   */
  function snapshotWithPermissions(permissionsDto) {
    return new PermissionSnapshotEntity({
      permissions: permissionsDto,
      groups: [],
      users: [],
      created: "2026-04-21T12:24:00+00:00",
    });
  }

  describe("::buildResourcePermissionChanges", () => {
    it("emits every row as is_new targeting the new resource when there are no dialog edits", () => {
      expect.assertions(3);

      const resourceId = uuidv4();
      const operatorId = uuidv4();
      const readerId = uuidv4();
      const folderId = uuidv4();
      const snapshot = snapshotWithPermissions([
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "User",
          aro_foreign_key: operatorId,
          type: 15,
        }),
        defaultPermissionDto({
          aco: "Folder",
          aco_foreign_key: folderId,
          aro: "User",
          aro_foreign_key: readerId,
          type: 1,
        }),
      ]);

      const changes = service.buildResourcePermissionChanges(snapshot, [], resourceId, operatorId);

      expect(changes).toHaveLength(2);
      expect(changes[0]).toMatchObject({
        is_new: true,
        aro: "User",
        aro_foreign_key: operatorId,
        aco: "Resource",
        aco_foreign_key: resourceId,
        type: 15,
      });
      expect(changes[1]).toMatchObject({
        is_new: true,
        aro: "User",
        aro_foreign_key: readerId,
        aco: "Resource",
        aco_foreign_key: resourceId,
        type: 1,
      });
    });

    it("drops a snapshot row when the operator's dialog edits include a matching `delete` delta", () => {
      expect.assertions(1);

      const folderId = uuidv4();
      const resourceId = uuidv4();
      const operatorId = uuidv4();
      const readerId = uuidv4();
      const snapshot = snapshotWithPermissions([
        defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: operatorId, type: 15 }),
        defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: readerId, type: 1 }),
      ]);
      const dialogChanges = [
        { delete: true, aro: "User", aro_foreign_key: readerId, aco: "Resource", aco_foreign_key: null, type: 1 },
      ];

      const changes = service.buildResourcePermissionChanges(snapshot, dialogChanges, resourceId, operatorId);

      expect(changes).toHaveLength(1);
    });

    it("patches the type of a snapshot row when the operator's dialog edits include a type-update delta", () => {
      expect.assertions(3);

      const folderId = uuidv4();
      const resourceId = uuidv4();
      const operatorId = uuidv4();
      const readerId = uuidv4();
      const snapshot = snapshotWithPermissions([
        defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: operatorId, type: 15 }),
        defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: readerId, type: 1 }),
      ]);
      const dialogChanges = [
        { aro: "User", aro_foreign_key: readerId, aco: "Resource", aco_foreign_key: null, type: 15 },
      ];

      const changes = service.buildResourcePermissionChanges(snapshot, dialogChanges, resourceId);

      expect(changes).toHaveLength(2);
      expect(changes[0]).toMatchObject({ is_new: true, aro_foreign_key: operatorId, type: 15 });
      expect(changes[1]).toMatchObject({ is_new: true, aro_foreign_key: readerId, type: 15 });
    });

    it("appends a brand-new aro from the operator's dialog edits with aco_foreign_key stamped", () => {
      expect.assertions(2);

      const folderId = uuidv4();
      const resourceId = uuidv4();
      const operatorId = uuidv4();
      const newAroId = uuidv4();
      const snapshot = snapshotWithPermissions([
        defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: operatorId, type: 15 }),
      ]);
      const dialogChanges = [
        { is_new: true, aro: "User", aro_foreign_key: newAroId, aco: "Resource", aco_foreign_key: null, type: 1 },
      ];

      const changes = service.buildResourcePermissionChanges(snapshot, dialogChanges, resourceId, operatorId);

      expect(changes).toHaveLength(2);
      expect(changes[1]).toMatchObject({
        is_new: true,
        aro_foreign_key: newAroId,
        aco: "Resource",
        aco_foreign_key: resourceId,
        type: 1,
      });
    });
  });

  describe("::buildAuthoritativeMovePermissions", () => {
    const resourceId = uuidv4();
    const otherResourceId = uuidv4();
    const ownerId = uuidv4();
    const recipientId = uuidv4();

    /**
     * Build a PermissionsCollection seed from the given permission DTOs.
     */
    function seed(permissionDtos) {
      return new PermissionsCollection(permissionDtos, { assertAtLeastOneOwner: false });
    }

    /**
     * Build a move-dialog item, {id, permissions}, seeded with the given permissions.
     */
    function item(itemId, permissionDtos) {
      return { id: itemId, permissions: seed(permissionDtos) };
    }

    /**
     * A resource permission DTO for the given ARO and type. Targets `resourceId` by default.
     */
    function resourcePermission(aroForeignKey, type, acoForeignKey = resourceId) {
      return defaultPermissionDto({
        aco: PermissionEntity.ACO_RESOURCE,
        aco_foreign_key: acoForeignKey,
        aro: PermissionEntity.ARO_USER,
        aro_foreign_key: aroForeignKey,
        type,
      });
    }

    it("returns each item's seeded permissions unchanged when there are no changes", () => {
      expect.assertions(3);
      const items = [
        item(resourceId, [
          resourcePermission(ownerId, PermissionEntity.PERMISSION_OWNER),
          resourcePermission(recipientId, PermissionEntity.PERMISSION_READ),
        ]),
      ];

      const result = service.buildAuthoritativeMovePermissions(items, [], PermissionEntity.ACO_RESOURCE);

      const target = result.get(resourceId);
      expect(target.length).toBe(2);
      expect(target.getByAro(PermissionEntity.ARO_USER, ownerId).type).toBe(PermissionEntity.PERMISSION_OWNER);
      expect(target.getByAro(PermissionEntity.ARO_USER, recipientId).type).toBe(PermissionEntity.PERMISSION_READ);
    });

    it("adds a recipient introduced by a create change", () => {
      expect.assertions(2);
      const items = [item(resourceId, [resourcePermission(ownerId, PermissionEntity.PERMISSION_OWNER)])];
      const changes = [
        {
          is_new: true,
          aro: PermissionEntity.ARO_USER,
          aro_foreign_key: recipientId,
          aco: PermissionEntity.ACO_RESOURCE,
          aco_foreign_key: resourceId,
          type: PermissionEntity.PERMISSION_READ,
        },
      ];

      const result = service.buildAuthoritativeMovePermissions(items, changes, PermissionEntity.ACO_RESOURCE);

      const target = result.get(resourceId);
      expect(target.length).toBe(2);
      expect(target.getByAro(PermissionEntity.ARO_USER, recipientId).type).toBe(PermissionEntity.PERMISSION_READ);
    });

    it("removes a recipient targeted by a delete change (authoritative removal)", () => {
      expect.assertions(2);
      const items = [
        item(resourceId, [
          resourcePermission(ownerId, PermissionEntity.PERMISSION_OWNER),
          resourcePermission(recipientId, PermissionEntity.PERMISSION_READ),
        ]),
      ];
      const changes = [
        {
          delete: true,
          aro: PermissionEntity.ARO_USER,
          aro_foreign_key: recipientId,
          aco: PermissionEntity.ACO_RESOURCE,
          aco_foreign_key: resourceId,
          type: PermissionEntity.PERMISSION_READ,
        },
      ];

      const result = service.buildAuthoritativeMovePermissions(items, changes, PermissionEntity.ACO_RESOURCE);

      const target = result.get(resourceId);
      expect(target.length).toBe(1);
      expect(target.getByAro(PermissionEntity.ARO_USER, recipientId)).toBeUndefined();
    });

    it("applies an exact type on update, including a downgrade (authoritative)", () => {
      expect.assertions(1);
      const items = [
        item(resourceId, [
          resourcePermission(ownerId, PermissionEntity.PERMISSION_OWNER),
          resourcePermission(recipientId, PermissionEntity.PERMISSION_OWNER),
        ]),
      ];
      const changes = [
        {
          aro: PermissionEntity.ARO_USER,
          aro_foreign_key: recipientId,
          aco: PermissionEntity.ACO_RESOURCE,
          aco_foreign_key: resourceId,
          type: PermissionEntity.PERMISSION_READ,
        },
      ];

      const result = service.buildAuthoritativeMovePermissions(items, changes, PermissionEntity.ACO_RESOURCE);

      expect(result.get(resourceId).getByAro(PermissionEntity.ARO_USER, recipientId).type).toBe(
        PermissionEntity.PERMISSION_READ,
      );
    });

    it("keeps per-item identity: a change targeting one item does not affect another", () => {
      expect.assertions(3);
      const items = [
        item(resourceId, [resourcePermission(ownerId, PermissionEntity.PERMISSION_OWNER)]),
        item(otherResourceId, [resourcePermission(ownerId, PermissionEntity.PERMISSION_OWNER, otherResourceId)]),
      ];
      // Add a recipient to the first resource only.
      const changes = [
        {
          is_new: true,
          aro: PermissionEntity.ARO_USER,
          aro_foreign_key: recipientId,
          aco: PermissionEntity.ACO_RESOURCE,
          aco_foreign_key: resourceId,
          type: PermissionEntity.PERMISSION_READ,
        },
      ];

      const result = service.buildAuthoritativeMovePermissions(items, changes, PermissionEntity.ACO_RESOURCE);

      expect(result.get(resourceId).getByAro(PermissionEntity.ARO_USER, recipientId).type).toBe(
        PermissionEntity.PERMISSION_READ,
      );
      expect(result.get(otherResourceId).getByAro(PermissionEntity.ARO_USER, recipientId)).toBeUndefined();
      expect(result.get(otherResourceId).length).toBe(1);
    });

    it("stamps each target permission with the item's aco type and id", () => {
      expect.assertions(2);
      const items = [item(resourceId, [resourcePermission(ownerId, PermissionEntity.PERMISSION_OWNER)])];

      const result = service.buildAuthoritativeMovePermissions(items, [], PermissionEntity.ACO_RESOURCE);

      const permission = result.get(resourceId).getByAro(PermissionEntity.ARO_USER, ownerId);
      expect(permission.aco).toBe(PermissionEntity.ACO_RESOURCE);
      expect(permission.acoForeignKey).toBe(resourceId);
    });
  });

  describe("::hasPermissionsDelta", () => {
    /**
     * Build a resource PermissionsCollection from the given (aroForeignKey, type) entries.
     */
    function resourcePerms(resourceId, entries) {
      return new PermissionsCollection(
        entries.map(([aroForeignKey, type]) =>
          defaultPermissionDto({
            aco: PermissionEntity.ACO_RESOURCE,
            aco_foreign_key: resourceId,
            aro: PermissionEntity.ARO_USER,
            aro_foreign_key: aroForeignKey,
            type,
          }),
        ),
        { assertAtLeastOneOwner: false },
      );
    }

    it("is false when both sets are empty", () => {
      expect.assertions(1);
      const resourceId = uuidv4();
      expect(service.hasPermissionsDelta(resourcePerms(resourceId, []), resourcePerms(resourceId, []))).toBe(false);
    });

    it("is false when the applied set is identical to the current one", () => {
      expect.assertions(1);
      const resourceId = uuidv4();
      const ownerId = uuidv4();
      const bettyId = uuidv4();
      const entries = [
        [ownerId, PermissionEntity.PERMISSION_OWNER],
        [bettyId, PermissionEntity.PERMISSION_READ],
      ];
      expect(service.hasPermissionsDelta(resourcePerms(resourceId, entries), resourcePerms(resourceId, entries))).toBe(
        false,
      );
    });

    it("is true when a recipient's level changes, same recipient count", () => {
      expect.assertions(1);
      const resourceId = uuidv4();
      const ownerId = uuidv4();
      const bettyId = uuidv4();
      const current = resourcePerms(resourceId, [
        [ownerId, PermissionEntity.PERMISSION_OWNER],
        [bettyId, PermissionEntity.PERMISSION_READ],
      ]);
      const applied = resourcePerms(resourceId, [
        [ownerId, PermissionEntity.PERMISSION_OWNER],
        [bettyId, PermissionEntity.PERMISSION_UPDATE],
      ]);
      expect(service.hasPermissionsDelta(current, applied)).toBe(true);
    });

    it("is true when a recipient is swapped for another, same recipient count", () => {
      expect.assertions(1);
      const resourceId = uuidv4();
      const ownerId = uuidv4();
      const bettyId = uuidv4();
      const carolId = uuidv4();
      const current = resourcePerms(resourceId, [
        [ownerId, PermissionEntity.PERMISSION_OWNER],
        [bettyId, PermissionEntity.PERMISSION_READ],
      ]);
      const applied = resourcePerms(resourceId, [
        [ownerId, PermissionEntity.PERMISSION_OWNER],
        [carolId, PermissionEntity.PERMISSION_READ],
      ]);
      expect(service.hasPermissionsDelta(current, applied)).toBe(true);
    });

    it("is true when a recipient is added", () => {
      expect.assertions(1);
      const resourceId = uuidv4();
      const ownerId = uuidv4();
      const bettyId = uuidv4();
      const current = resourcePerms(resourceId, [[ownerId, PermissionEntity.PERMISSION_OWNER]]);
      const applied = resourcePerms(resourceId, [
        [ownerId, PermissionEntity.PERMISSION_OWNER],
        [bettyId, PermissionEntity.PERMISSION_READ],
      ]);
      expect(service.hasPermissionsDelta(current, applied)).toBe(true);
    });

    it("is true when a recipient is removed", () => {
      expect.assertions(1);
      const resourceId = uuidv4();
      const ownerId = uuidv4();
      const bettyId = uuidv4();
      const current = resourcePerms(resourceId, [
        [ownerId, PermissionEntity.PERMISSION_OWNER],
        [bettyId, PermissionEntity.PERMISSION_READ],
      ]);
      const applied = resourcePerms(resourceId, [[ownerId, PermissionEntity.PERMISSION_OWNER]]);
      expect(service.hasPermissionsDelta(current, applied)).toBe(true);
    });
  });
});
