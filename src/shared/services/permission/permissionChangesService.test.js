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
    it("emits every non-operator snapshot row as is_new targeting the new resource when there are no dialog edits", () => {
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

      expect(changes).toHaveLength(1);
      expect(changes[0]).toMatchObject({
        is_new: true,
        aro: "User",
        aro_foreign_key: readerId,
        aco: "Resource",
        aco_foreign_key: resourceId,
        type: 1,
      });
      // Operator row is the implicit owner on the newly-created resource and must not be emitted.
      expect(changes.find((change) => change.aro_foreign_key === operatorId)).toBeUndefined();
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

      expect(changes).toEqual([]);
    });

    it("patches the type of a snapshot row when the operator's dialog edits include a type-update delta", () => {
      expect.assertions(2);

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

      const changes = service.buildResourcePermissionChanges(snapshot, dialogChanges, resourceId, operatorId);

      expect(changes).toHaveLength(1);
      expect(changes[0]).toMatchObject({ is_new: true, aro_foreign_key: readerId, type: 15 });
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

      expect(changes).toHaveLength(1);
      expect(changes[0]).toMatchObject({
        is_new: true,
        aro_foreign_key: newAroId,
        aco: "Resource",
        aco_foreign_key: resourceId,
        type: 1,
      });
    });

    it("excludes the operator's own row from the output even when the snapshot lists it explicitly", () => {
      expect.assertions(2);

      const folderId = uuidv4();
      const resourceId = uuidv4();
      const operatorId = uuidv4();
      const readerId = uuidv4();
      const snapshot = snapshotWithPermissions([
        defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: operatorId, type: 15 }),
        defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: readerId, type: 1 }),
      ]);

      const changes = service.buildResourcePermissionChanges(snapshot, [], resourceId, operatorId);

      expect(changes).toHaveLength(1);
      expect(changes.find((change) => change.aro_foreign_key === operatorId)).toBeUndefined();
    });

    it("returns an empty array when the snapshot has only the operator and the dialog has no edits", () => {
      expect.assertions(1);

      const folderId = uuidv4();
      const resourceId = uuidv4();
      const operatorId = uuidv4();
      const snapshot = snapshotWithPermissions([
        defaultPermissionDto({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: operatorId, type: 15 }),
      ]);

      expect(service.buildResourcePermissionChanges(snapshot, [], resourceId, operatorId)).toEqual([]);
    });
  });
});
