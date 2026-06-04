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
import PermissionChangesService from "./permissionChangesService";
import { PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY } from "../serviceWorker/permission/permissionServiceWorkerService";
import { defaultPermissionDto } from "../../models/entity/permission/permissionEntity.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PermissionChangesService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new PermissionChangesService(port);
  });

  describe("::rebaseChangesForResource", () => {
    it("stamps the aco_foreign_key on an is_new delta and never fetches resource permissions", async () => {
      expect.assertions(2);

      const resourceId = uuidv4();
      const aroId = uuidv4();
      jest.spyOn(port, "request");

      const rebased = await service.rebaseChangesForResource(
        [{ is_new: true, aro: "User", aro_foreign_key: aroId, aco: "Resource", aco_foreign_key: null, type: 1 }],
        resourceId,
      );

      expect(rebased).toEqual([
        { is_new: true, aro: "User", aro_foreign_key: aroId, aco: "Resource", aco_foreign_key: resourceId, type: 1 },
      ]);
      // No `findPermissions` call is needed when every delta is `is_new` — the lookup would be wasted.
      expect(port.request).not.toHaveBeenCalledWith(
        PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
        expect.anything(),
        expect.anything(),
      );
    });

    it("replaces the folder permission id on a delete delta with the resource permission id looked up by aro_foreign_key", async () => {
      expect.assertions(2);

      const resourceId = uuidv4();
      const readerAroId = uuidv4();
      const inheritedResourcePermId = uuidv4();
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => [
        defaultPermissionDto({
          id: inheritedResourcePermId,
          aco: "Resource",
          aco_foreign_key: resourceId,
          aro: "User",
          aro_foreign_key: readerAroId,
          type: 1,
        }),
      ]);
      jest.spyOn(port, "request");

      const rebased = await service.rebaseChangesForResource(
        [
          {
            id: "stale-folder-permission-id",
            delete: true,
            aro: "User",
            aro_foreign_key: readerAroId,
            aco: "Resource",
            aco_foreign_key: null,
            type: 1,
          },
        ],
        resourceId,
      );

      expect(port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, resourceId, "Resource");
      expect(rebased).toEqual([
        {
          id: inheritedResourcePermId,
          delete: true,
          aro: "User",
          aro_foreign_key: readerAroId,
          aco: "Resource",
          aco_foreign_key: resourceId,
          type: 1,
        },
      ]);
    });

    it("replaces the folder permission id on a type-update delta with the resource permission id", async () => {
      expect.assertions(1);

      const resourceId = uuidv4();
      const aroId = uuidv4();
      const inheritedResourcePermId = uuidv4();
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => [
        defaultPermissionDto({
          id: inheritedResourcePermId,
          aco: "Resource",
          aco_foreign_key: resourceId,
          aro: "User",
          aro_foreign_key: aroId,
          type: 1,
        }),
      ]);

      const rebased = await service.rebaseChangesForResource(
        [
          {
            id: "stale-folder-permission-id",
            aro: "User",
            aro_foreign_key: aroId,
            aco: "Resource",
            aco_foreign_key: null,
            type: 15,
          },
        ],
        resourceId,
      );

      expect(rebased[0]).toMatchObject({
        id: inheritedResourcePermId,
        aco_foreign_key: resourceId,
        type: 15,
      });
    });

    it("drops a non-is_new delta when the resource has no inherited permission for that aro_foreign_key", async () => {
      expect.assertions(1);

      const resourceId = uuidv4();
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => []);

      const rebased = await service.rebaseChangesForResource(
        [
          {
            id: "stale-folder-permission-id",
            delete: true,
            aro: "User",
            aro_foreign_key: uuidv4(),
            aco: "Resource",
            aco_foreign_key: null,
            type: 1,
          },
        ],
        resourceId,
      );

      expect(rebased).toEqual([]);
    });

    it("mixes is_new and delete deltas in a single rebase: is_new is just stamped, delete uses the resource perm lookup", async () => {
      expect.assertions(2);

      const resourceId = uuidv4();
      const newAroId = uuidv4();
      const inheritedReaderAroId = uuidv4();
      const inheritedReaderPermId = uuidv4();
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => [
        defaultPermissionDto({
          id: inheritedReaderPermId,
          aco: "Resource",
          aco_foreign_key: resourceId,
          aro: "User",
          aro_foreign_key: inheritedReaderAroId,
          type: 1,
        }),
      ]);

      const rebased = await service.rebaseChangesForResource(
        [
          {
            is_new: true,
            aro: "User",
            aro_foreign_key: newAroId,
            aco: "Resource",
            aco_foreign_key: null,
            type: 15,
          },
          {
            id: "stale-folder-permission-id",
            delete: true,
            aro: "User",
            aro_foreign_key: inheritedReaderAroId,
            aco: "Resource",
            aco_foreign_key: null,
            type: 1,
          },
        ],
        resourceId,
      );

      expect(rebased).toHaveLength(2);
      expect(rebased).toEqual([
        expect.objectContaining({ is_new: true, aro_foreign_key: newAroId, aco_foreign_key: resourceId }),
        expect.objectContaining({
          id: inheritedReaderPermId,
          delete: true,
          aro_foreign_key: inheritedReaderAroId,
          aco_foreign_key: resourceId,
        }),
      ]);
    });

    it("returns an empty array when given no changes and never touches the port", async () => {
      expect.assertions(2);

      jest.spyOn(port, "request");
      const rebased = await service.rebaseChangesForResource([], uuidv4());

      expect(rebased).toEqual([]);
      expect(port.request).not.toHaveBeenCalled();
    });
  });
});
