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
 * @since         5.15.0
 */

/**
 * Unit tests on ShareChanges in regard of specifications
 */
import ShareChanges from "./ShareChanges";
import {
  ada,
  betty,
  board,
  carol,
  defaultSharedResourcesDtos,
  mixedOwnershipResourcesDtos,
} from "./ShareChanges.test.data";
import {
  ownerPermissionDto,
  readFolderPermissionDto,
} from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import { defaultUserDto } from "../../../../shared/models/entity/user/userEntity.test.data";
import { defaultProfileDto } from "../../../../shared/models/entity/profile/ProfileEntity.test.data";
import { v4 as uuidv4 } from "uuid";

describe("ShareChanges", () => {
  describe("::aggregatePermissionsByAro", () => {
    it("aggregates one row per recipient, sorted by user first name or group name", () => {
      expect.assertions(3);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      const rows = shareChanges.aggregatePermissionsByAro();

      expect(rows.map((row) => row.id)).toEqual([ada.id, betty.id, board.id, carol.id]);
      expect(rows.map((row) => row.aro)).toEqual([ada, betty, board, carol]);
      expect(rows.map((row) => row.permissions.length)).toEqual([2, 2, 2, 1]);
    });

    it("exposes the aggregated permission type when it is uniform across all resources", () => {
      expect.assertions(4);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      const rows = shareChanges.aggregatePermissionsByAro();
      const adaRow = rows.find((row) => row.id === ada.id);
      const boardRow = rows.find((row) => row.id === board.id);

      expect(adaRow.type).toBe(15);
      expect(adaRow.variesDetails).toBeUndefined();
      expect(boardRow.type).toBe(1);
      expect(boardRow.variesDetails).toBeUndefined();
    });

    it("flags a recipient having different permission types as varies, with the resource names per type", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      const rows = shareChanges.aggregatePermissionsByAro();
      const bettyRow = rows.find((row) => row.id === betty.id);

      expect(bettyRow.type).toBe(-1);
      expect(bettyRow.variesDetails).toEqual({ 0: [], 1: ["cakephp"], 7: ["apache"], 15: [] });
    });

    it("flags a recipient missing a permission on some resources as varies, with those resources under no access", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      const rows = shareChanges.aggregatePermissionsByAro();
      const carolRow = rows.find((row) => row.id === carol.id);

      expect(carolRow.type).toBe(-1);
      expect(carolRow.variesDetails).toEqual({ 0: ["cakephp"], 1: ["apache"], 7: [], 15: [] });
    });
  });

  describe("::addAroPermissions", () => {
    it("returns a read row for the new recipient and stages a new read permission per resource", () => {
      expect.assertions(3);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const dan = defaultUserDto({ profile: defaultProfileDto({ first_name: "Dan" }) });

      const row = shareChanges.addAroPermissions(dan);

      expect(row).toEqual({ id: dan.id, aro: dan, type: 1, permissions: [] });
      expect(shareChanges.getChanges()).toEqual([
        {
          is_new: true,
          aro: "User",
          aro_foreign_key: dan.id,
          aco: "Resource",
          aco_foreign_key: resources[0].id,
          type: 1,
        },
        {
          is_new: true,
          aro: "User",
          aro_foreign_key: dan.id,
          aco: "Resource",
          aco_foreign_key: resources[1].id,
          type: 1,
        },
      ]);
      expect(shareChanges.hasChanges(dan.id)).toBe(true);
    });
  });

  describe("::updateAroPermissions", () => {
    it("stages a permission update per resource, cloning the original permission without mutating it", () => {
      expect.assertions(5);
      const resources = defaultSharedResourcesDtos();
      const originalAdaPermissions = resources.map((resource) =>
        resource.permissions.find((permission) => permission.aro_foreign_key === ada.id),
      );
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissions(ada.id, 1);

      const changes = shareChanges.getChanges();
      expect(changes.length).toBe(2);
      expect(changes).toEqual([
        { ...originalAdaPermissions[0], type: 1 },
        { ...originalAdaPermissions[1], type: 1 },
      ]);
      expect(changes[0].is_new).toBeUndefined();
      // The originals are left untouched: the staged changes are deep clones.
      expect(originalAdaPermissions[0].type).toBe(15);
      expect(originalAdaPermissions[1].type).toBe(15);
    });

    it("stages nothing for the resources already granted at the requested type", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Betty can already update "apache", only "cakephp" needs a change.
      shareChanges.updateAroPermissions(betty.id, 7);

      const changes = shareChanges.getChanges();
      expect(changes.length).toBe(1);
      expect(changes[0]).toEqual(expect.objectContaining({ aco_foreign_key: resources[1].id, type: 7 }));
    });

    it("stages a new permission for the resources where the recipient has none", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Carol has a permission on "apache" only.
      shareChanges.updateAroPermissions(carol.id, 15);

      const changes = shareChanges.getChanges();
      expect(changes).toEqual([
        expect.objectContaining({ aco_foreign_key: resources[0].id, aro_foreign_key: carol.id, type: 15 }),
        {
          is_new: true,
          aro: "User",
          aro_foreign_key: carol.id,
          aco: "Resource",
          aco_foreign_key: resources[1].id,
          type: 15,
        },
      ]);
      expect(changes[0].is_new).toBeUndefined();
    });

    it("clears the staged changes when the recipient is set back to its original permission", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissions(ada.id, 1);
      shareChanges.updateAroPermissions(ada.id, 15);

      expect(shareChanges.getChanges()).toEqual([]);
      expect(shareChanges.hasChanges(ada.id)).toBe(false);
    });

    it("never stages a change on a resource the operator does not own, even when the recipient holds a different permission there", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Ada already owns "apache", so nothing to change there. She does not own "cakephp", so her
      // update permission on it stays as it is, even though it differs from what was asked for.
      shareChanges.updateAroPermissions(ada.id, 15);

      expect(shareChanges.getChanges()).toEqual([]);
      expect(shareChanges.hasChanges(ada.id)).toBe(false);
    });

    it("stages a change only on the resource the operator owns, in a mixed-ownership selection", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Betty can update the owned "apache", so making her owner there is a change that can be staged.
      // She has nothing on the not-owned "cakephp", so granting her anything there is impossible.
      shareChanges.updateAroPermissions(betty.id, 15);

      const changes = shareChanges.getChanges();
      expect(changes).toEqual([expect.objectContaining({ aco_foreign_key: resources[0].id, type: 15 })]);
      expect(changes.some((change) => change.aco_foreign_key === resources[1].id)).toBe(false);
    });
  });

  describe("::updateAroPermissionsByAco", () => {
    it("stages the per-aco target types, without mutating the original permissions", () => {
      expect.assertions(3);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const originalType = resources[0].permissions[1].type;

      shareChanges.updateAroPermissionsByAco(betty, new Map([[resources[0].id, 15]]));

      const changes = shareChanges.getChanges();
      expect(changes).toEqual([expect.objectContaining({ aco_foreign_key: resources[0].id, type: 15 })]);
      expect(changes[0].id).toBe(resources[0].permissions[1].id);
      expect(resources[0].permissions[1].type).toBe(originalType);
    });

    it("never stages anything on an aco the operator does not own, whatever the target asks for", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissionsByAco(
        betty,
        new Map([
          [resources[0].id, 15],
          [resources[1].id, 15],
        ]),
      );

      const changes = shareChanges.getChanges();
      expect(changes).toEqual([expect.objectContaining({ aco_foreign_key: resources[0].id, type: 15 })]);
      expect(changes.some((change) => change.aco_foreign_key === resources[1].id)).toBe(false);
    });

    it("stages a deletion on an owned aco the target sets to null", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissionsByAco(betty, new Map([[resources[0].id, null]]));

      const changes = shareChanges.getChanges();
      expect(changes).toEqual([expect.objectContaining({ aco_foreign_key: resources[0].id, delete: true })]);
      expect(shareChanges.getAroChangeStatus(betty.id)).toBe(ShareChanges.CHANGE_STATUS_REMOVED);
    });

    it("leaves an aco absent from the target strictly untouched", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      /*
       * Only the first resource is covered. The second must keep Betty's permission even though
       * nothing was said about it. This is a move that only changes part of the selection.
       */
      shareChanges.updateAroPermissionsByAco(betty, new Map([[resources[0].id, null]]));

      expect(shareChanges.getChanges()).toEqual([
        expect.objectContaining({ aco_foreign_key: resources[0].id, delete: true }),
      ]);
      expect(shareChanges.getChanges().some((change) => change.aco_foreign_key === resources[1].id)).toBe(false);
    });

    it("stages nothing for a recipient holding permissions only on the acos the operator does not own", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Carol only has a permission on "cakephp", which the operator does not own.
      shareChanges.updateAroPermissionsByAco(carol, new Map([[resources[0].id, null]]));

      expect(shareChanges.getChanges()).toEqual([]);
      expect(shareChanges.getAroChangeStatus(carol.id)).toBeNull();
    });

    it("stages nothing for an aco already at its target type", () => {
      expect.assertions(1);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Betty already updates "apache".
      shareChanges.updateAroPermissionsByAco(betty, new Map([[resources[0].id, 7]]));

      expect(shareChanges.getChanges()).toEqual([]);
    });

    it("stages a new permission for a recipient that holds none, deriving the aro type", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissionsByAco(board, new Map([[resources[0].id, 1]]));

      expect(shareChanges.getChanges()).toEqual([
        expect.objectContaining({
          is_new: true,
          aro: "Group",
          aro_foreign_key: board.id,
          aco_foreign_key: resources[0].id,
          type: 1,
        }),
      ]);
      expect(shareChanges.getAroChangeStatus(board.id)).toBe(ShareChanges.CHANGE_STATUS_ADDED);
    });

    it("drops the changes previously staged for the aro before staging the target", () => {
      expect.assertions(1);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissions(betty.id, 15);
      shareChanges.updateAroPermissionsByAco(betty, new Map([[resources[0].id, 1]]));

      expect(shareChanges.getChanges()).toEqual([
        expect.objectContaining({ aco_foreign_key: resources[0].id, type: 1 }),
      ]);
    });

    it("derives the change status from the staged set, per aco", () => {
      expect.assertions(3);
      const resources = defaultSharedResourcesDtos();

      // Keeping Betty on one resource and dropping her from the other reads as modified.
      const modified = new ShareChanges(resources);
      modified.updateAroPermissionsByAco(
        betty,
        new Map([
          [resources[0].id, 15],
          [resources[1].id, null],
        ]),
      );
      expect(modified.getAroChangeStatus(betty.id)).toBe(ShareChanges.CHANGE_STATUS_MODIFIED);

      // Dropping Betty everywhere reads as removed.
      const removed = new ShareChanges(resources);
      removed.updateAroPermissionsByAco(
        betty,
        new Map([
          [resources[0].id, null],
          [resources[1].id, null],
        ]),
      );
      expect(removed.getAroChangeStatus(betty.id)).toBe(ShareChanges.CHANGE_STATUS_REMOVED);

      // Matching what Betty already has on each resource reads as unchanged.
      const unchanged = new ShareChanges(resources);
      unchanged.updateAroPermissionsByAco(
        betty,
        new Map([
          [resources[0].id, 7],
          [resources[1].id, 1],
        ]),
      );
      expect(unchanged.getAroChangeStatus(betty.id)).toBeNull();
    });
  });

  describe("::stageTargetPermissions", () => {
    it("stages the level each recipient ends up with on the re-permissioned acos", () => {
      expect.assertions(1);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const targetRows = [
        { aro: ada, permissions: [{ aco_foreign_key: resources[0].id, type: 15 }] },
        { aro: betty, permissions: [{ aco_foreign_key: resources[0].id, type: 15 }] },
      ];

      shareChanges.stageTargetPermissions(targetRows, [resources[0].id]);

      expect(shareChanges.getChanges()).toEqual([
        expect.objectContaining({ aro_foreign_key: betty.id, aco_foreign_key: resources[0].id, type: 15 }),
      ]);
    });

    it("stages a new permission for a recipient the target grants", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const targetRows = [
        { aro: ada, permissions: [{ aco_foreign_key: resources[0].id, type: 15 }] },
        { aro: betty, permissions: [{ aco_foreign_key: resources[0].id, type: 7 }] },
        { aro: board, permissions: [{ aco_foreign_key: resources[0].id, type: 1 }] },
      ];

      shareChanges.stageTargetPermissions(targetRows, [resources[0].id]);

      expect(shareChanges.getChanges()).toEqual([
        expect.objectContaining({ is_new: true, aro_foreign_key: board.id, aco_foreign_key: resources[0].id, type: 1 }),
      ]);
      expect(shareChanges.getAroChangeStatus(board.id)).toBe(ShareChanges.CHANGE_STATUS_ADDED);
    });

    it("stages a removal for a recipient missing from the target", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const targetRows = [{ aro: ada, permissions: [{ aco_foreign_key: resources[0].id, type: 15 }] }];

      shareChanges.stageTargetPermissions(targetRows, [resources[0].id]);

      expect(shareChanges.getChanges()).toEqual([
        expect.objectContaining({ aro_foreign_key: betty.id, aco_foreign_key: resources[0].id, delete: true }),
      ]);
      expect(shareChanges.getAroChangeStatus(betty.id)).toBe(ShareChanges.CHANGE_STATUS_REMOVED);
    });

    it("leaves the acos that are not re-permissioned untouched", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      // Only "apache" is re-permissioned. Carol and the Board are dropped there, "cakephp" is left alone.
      const targetRows = [
        { aro: ada, permissions: [{ aco_foreign_key: resources[0].id, type: 15 }] },
        { aro: betty, permissions: [{ aco_foreign_key: resources[0].id, type: 7 }] },
      ];

      shareChanges.stageTargetPermissions(targetRows, [resources[0].id]);

      expect(shareChanges.getChanges().some((change) => change.aco_foreign_key === resources[1].id)).toBe(false);
    });

    it("never stages anything on an aco the operator does not own", () => {
      expect.assertions(1);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const targetRows = [
        {
          aro: board,
          permissions: [
            { aco_foreign_key: resources[0].id, type: 1 },
            { aco_foreign_key: resources[1].id, type: 1 },
          ],
        },
      ];

      shareChanges.stageTargetPermissions(targetRows, [resources[0].id, resources[1].id]);

      expect(shareChanges.getChanges().some((change) => change.aco_foreign_key === resources[1].id)).toBe(false);
    });
  });

  describe("::deleteAroPermissions", () => {
    it("stages a delete of each original permission of the recipient", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const originalBettyPermissions = resources.map((resource) =>
        resource.permissions.find((permission) => permission.aro_foreign_key === betty.id),
      );
      const shareChanges = new ShareChanges(resources);

      shareChanges.deleteAroPermissions(betty.id);

      expect(shareChanges.getChanges()).toEqual([
        { ...originalBettyPermissions[0], delete: true },
        { ...originalBettyPermissions[1], delete: true },
      ]);
    });

    it("clears the previously staged updates of the recipient", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissions(betty.id, 15);
      shareChanges.deleteAroPermissions(betty.id);

      const changes = shareChanges.getChanges();
      expect(changes.length).toBe(2);
      expect(changes.every((change) => change.delete === true)).toBe(true);
    });

    it("stages nothing when deleting a recipient added during the session", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const dan = defaultUserDto({ profile: defaultProfileDto({ first_name: "Dan" }) });

      shareChanges.addAroPermissions(dan);
      shareChanges.deleteAroPermissions(dan.id);

      expect(shareChanges.getChanges()).toEqual([]);
      expect(shareChanges.hasChanges(dan.id)).toBe(false);
    });

    it("never stages a deletion on a resource the operator does not own", () => {
      expect.assertions(2);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Carol's only permission is on the not-owned "cakephp", so nothing can be staged for her.
      shareChanges.deleteAroPermissions(carol.id);

      expect(shareChanges.getChanges()).toEqual([]);
      expect(shareChanges.hasChanges(carol.id)).toBe(false);
    });
  });

  describe("::revertAroPermissions", () => {
    it("clears the pending deletion of a recipient", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.deleteAroPermissions(betty.id);
      shareChanges.revertAroPermissions(betty.id);

      expect(shareChanges.getChanges()).toEqual([]);
      expect(shareChanges.getAroChangeStatus(betty.id)).toBeNull();
    });

    it("clears a modification followed by a deletion", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissions(betty.id, 15);
      shareChanges.deleteAroPermissions(betty.id);
      shareChanges.revertAroPermissions(betty.id);

      expect(shareChanges.getChanges()).toEqual([]);
      expect(shareChanges.getAroChangeStatus(betty.id)).toBeNull();
    });

    it("keeps the initially new marker, the recipient falls back to the added status", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const rows = shareChanges.aggregatePermissionsByAro();
      const adaRow = rows.find((row) => row.id === ada.id);

      shareChanges.markPermissionHasChanged(adaRow);
      shareChanges.deleteAroPermissions(ada.id);
      shareChanges.revertAroPermissions(ada.id);

      expect(shareChanges.getAroChangeStatus(ada.id)).toBe(ShareChanges.CHANGE_STATUS_ADDED);
      expect(shareChanges.getResourcesChanges()).toEqual([]);
    });
  });

  describe("::getOriginalAroPermissionType", () => {
    it("returns the uniform original type, unaffected by the pending changes", () => {
      expect.assertions(3);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      expect(shareChanges.getOriginalAroPermissionType(ada.id)).toBe(15);
      expect(shareChanges.getOriginalAroPermissionType(board.id)).toBe(1);

      shareChanges.updateAroPermissions(ada.id, 1);
      expect(shareChanges.getOriginalAroPermissionType(ada.id)).toBe(15);
    });

    it("returns -1 when the original type varies across the resources", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      expect(shareChanges.getOriginalAroPermissionType(betty.id)).toBe(-1);
    });

    it("returns -1 when the recipient misses a permission on some resources", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      expect(shareChanges.getOriginalAroPermissionType(carol.id)).toBe(-1);
    });

    it("returns null for a recipient without original permissions", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const dan = defaultUserDto({ profile: defaultProfileDto({ first_name: "Dan" }) });

      shareChanges.addAroPermissions(dan);

      expect(shareChanges.getOriginalAroPermissionType(dan.id)).toBeNull();
    });
  });

  describe("::getResourcesChanges / ::getFoldersChanges", () => {
    it("splits the staged changes by ACO type", () => {
      expect.assertions(2);
      const resourceId = uuidv4();
      const folderId = uuidv4();
      const resource = {
        id: resourceId,
        metadata: { name: "apache" },
        permission: { type: 15 },
        permissions: [ownerPermissionDto({ aco_foreign_key: resourceId, aro_foreign_key: ada.id, user: ada })],
      };
      const folder = {
        id: folderId,
        metadata: { name: "budget" },
        permission: { type: 15 },
        permissions: [readFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: ada.id, user: ada })],
      };
      const shareChanges = new ShareChanges([resource], [folder]);

      shareChanges.updateAroPermissions(ada.id, 7);

      expect(shareChanges.getResourcesChanges()).toEqual([
        expect.objectContaining({ aco: "Resource", aco_foreign_key: resourceId, aro_foreign_key: ada.id, type: 7 }),
      ]);
      expect(shareChanges.getFoldersChanges()).toEqual([
        expect.objectContaining({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: ada.id, type: 7 }),
      ]);
    });

    it("stages a new permission on every ACO for a recipient present on only some of them", () => {
      expect.assertions(2);
      const resourceId = uuidv4();
      const folderId = uuidv4();
      const resource = {
        id: resourceId,
        metadata: { name: "apache" },
        permission: { type: 15 },
        permissions: [ownerPermissionDto({ aco_foreign_key: resourceId, aro_foreign_key: ada.id, user: ada })],
      };
      const folder = {
        id: folderId,
        metadata: { name: "budget" },
        permission: { type: 15 },
        permissions: [readFolderPermissionDto({ aco_foreign_key: folderId, aro_foreign_key: betty.id, user: betty })],
      };
      const shareChanges = new ShareChanges([resource], [folder]);

      // Betty has a permission on the folder only: a new one is staged on the resource too.
      shareChanges.updateAroPermissions(betty.id, 7);

      expect(shareChanges.getResourcesChanges()).toEqual([
        { is_new: true, aro: "User", aro_foreign_key: betty.id, aco: "Resource", aco_foreign_key: resourceId, type: 7 },
      ]);
      expect(shareChanges.getFoldersChanges()).toEqual([
        expect.objectContaining({ aco: "Folder", aco_foreign_key: folderId, aro_foreign_key: betty.id, type: 7 }),
      ]);
    });
  });

  describe("::getResourcesWithNoOwner", () => {
    it("returns nothing when the permissions are untouched", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      expect(shareChanges.getResourcesWithNoOwner()).toEqual([]);
    });

    it("returns the resources whose only owner gets removed", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.deleteAroPermissions(ada.id);

      expect(shareChanges.getResourcesWithNoOwner().map((aco) => aco.id)).toEqual([resources[0].id, resources[1].id]);
    });

    it("returns the resources whose only owner gets demoted", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissions(ada.id, 1);

      expect(shareChanges.getResourcesWithNoOwner().map((aco) => aco.id)).toEqual([resources[0].id, resources[1].id]);
    });

    it("returns nothing when another recipient is promoted owner in place of the removed one", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.deleteAroPermissions(ada.id);
      shareChanges.updateAroPermissions(betty.id, 15);

      expect(shareChanges.getResourcesWithNoOwner()).toEqual([]);
    });

    it("does not flag a not-owned resource whose sole owner would have been revoked by an out-of-scope deletion", () => {
      expect.assertions(1);
      const resources = mixedOwnershipResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Carol is the only owner of the not-owned "cakephp", where deleting her stages nothing, so it
      // must not be flagged either. Getting this wrong would disable Save for the whole dialog.
      shareChanges.deleteAroPermissions(carol.id);

      expect(shareChanges.getResourcesWithNoOwner()).toEqual([]);
    });
  });

  describe("::getAroChangeStatus", () => {
    it("returns null for the recipients without pending changes", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      expect(shareChanges.getAroChangeStatus(ada.id)).toBeNull();
      // An untouched varies recipient has no pending changes either.
      expect(shareChanges.getAroChangeStatus(betty.id)).toBeNull();
    });

    it("returns added for a recipient granted its permissions during the session", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const dan = defaultUserDto({ profile: defaultProfileDto({ first_name: "Dan" }) });

      shareChanges.addAroPermissions(dan);

      expect(shareChanges.getAroChangeStatus(dan.id)).toBe(ShareChanges.CHANGE_STATUS_ADDED);
    });

    it("returns modified when the permission type of an existing recipient changes", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissions(ada.id, 1);

      expect(shareChanges.getAroChangeStatus(ada.id)).toBe(ShareChanges.CHANGE_STATUS_MODIFIED);
    });

    it("returns modified for an existing recipient even when the pending changes are only new permissions", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Carol can already read "apache": aligning on read stages a single new permission on "cakephp".
      shareChanges.updateAroPermissions(carol.id, 1);

      expect(shareChanges.getAroChangeStatus(carol.id)).toBe(ShareChanges.CHANGE_STATUS_MODIFIED);
    });

    it("returns modified for an existing recipient with mixed updated and new permissions", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      // Carol gets an update on "apache" and a new permission on "cakephp".
      shareChanges.updateAroPermissions(carol.id, 15);

      expect(shareChanges.getAroChangeStatus(carol.id)).toBe(ShareChanges.CHANGE_STATUS_MODIFIED);
    });

    it("returns removed when the permissions of an existing recipient are pending deletion", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.deleteAroPermissions(betty.id);
      // Carol has a permission on "apache" only, deletion also reads as removed.
      shareChanges.deleteAroPermissions(carol.id);

      expect(shareChanges.getAroChangeStatus(betty.id)).toBe(ShareChanges.CHANGE_STATUS_REMOVED);
      expect(shareChanges.getAroChangeStatus(carol.id)).toBe(ShareChanges.CHANGE_STATUS_REMOVED);
    });

    it("returns null again when the recipient is set back to its original permission", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);

      shareChanges.updateAroPermissions(ada.id, 1);
      shareChanges.updateAroPermissions(ada.id, 15);

      expect(shareChanges.getAroChangeStatus(ada.id)).toBeNull();
    });

    it("returns added for a recipient marked as initially new, whatever its later updates", () => {
      expect.assertions(3);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const rows = shareChanges.aggregatePermissionsByAro();
      const adaRow = rows.find((row) => row.id === ada.id);

      shareChanges.markPermissionHasChanged(adaRow);
      expect(shareChanges.getAroChangeStatus(ada.id)).toBe(ShareChanges.CHANGE_STATUS_ADDED);

      shareChanges.updateAroPermissions(ada.id, 1);
      expect(shareChanges.getAroChangeStatus(ada.id)).toBe(ShareChanges.CHANGE_STATUS_ADDED);

      shareChanges.updateAroPermissions(ada.id, 15);
      expect(shareChanges.getAroChangeStatus(ada.id)).toBe(ShareChanges.CHANGE_STATUS_ADDED);
    });

    it("returns added for a recipient marked as initially new, even when its permissions are pending deletion", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const rows = shareChanges.aggregatePermissionsByAro();
      const adaRow = rows.find((row) => row.id === ada.id);

      shareChanges.markPermissionHasChanged(adaRow);
      shareChanges.deleteAroPermissions(ada.id);

      expect(shareChanges.getAroChangeStatus(ada.id)).toBe(ShareChanges.CHANGE_STATUS_ADDED);
    });
  });

  describe("::markPermissionHasChanged", () => {
    it("stages a display-only marker excluded from the emitted changes", () => {
      expect.assertions(2);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const rows = shareChanges.aggregatePermissionsByAro();
      const adaRow = rows.find((row) => row.id === ada.id);

      shareChanges.markPermissionHasChanged(adaRow);

      expect(shareChanges.hasChanges(ada.id)).toBe(true);
      // The marker carries no ACO: it never reaches the changes emitted on save.
      expect(shareChanges.getResourcesChanges()).toEqual([]);
    });

    it("keeps the marker when the recipient's permissions are later updated then restored", () => {
      expect.assertions(1);
      const resources = defaultSharedResourcesDtos();
      const shareChanges = new ShareChanges(resources);
      const rows = shareChanges.aggregatePermissionsByAro();
      const adaRow = rows.find((row) => row.id === ada.id);

      shareChanges.markPermissionHasChanged(adaRow);
      shareChanges.updateAroPermissions(ada.id, 1);
      shareChanges.updateAroPermissions(ada.id, 15);

      expect(shareChanges.hasChanges(ada.id)).toBe(true);
    });
  });
});
