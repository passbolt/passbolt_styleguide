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
 * @since         5.16.0
 */
import MockPort from "../../../../react-extension/test/mock/MockPort";
import MoveItemsServiceWorkerService, {
  MOVE_FOLDER_BY_ID,
  MOVE_RESOURCES_BY_IDS,
} from "./moveItemsServiceWorkerService";
import { defaultPermissionsDtos } from "../../../models/entity/permission/permissionCollection.test.data";
import PermissionsCollection from "../../../models/entity/permission/permissionsCollection";

describe("MoveItemsServiceWorkerService", () => {
  describe("::moveFolder", () => {
    it("should request the move with the operator-confirmed permissions serialized per item", async () => {
      expect.assertions(2);

      const folderId = crypto.randomUUID();
      const destinationFolderId = crypto.randomUUID();
      const folderPermissions = new PermissionsCollection(
        defaultPermissionsDtos({ aco: "Folder", aco_foreign_key: folderId }),
        { assertAtLeastOneOwner: false },
      );
      const confirmedPermissions = new Map([[folderId, folderPermissions]]);

      const port = new MockPort();
      port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(port, "request");

      const service = new MoveItemsServiceWorkerService(port);
      await service.moveFolder(folderId, destinationFolderId, confirmedPermissions);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(MOVE_FOLDER_BY_ID, folderId, destinationFolderId, {
        [folderId]: folderPermissions.toDto(),
      });
    });

    it("should request the move with null permissions when none are confirmed (move to root)", async () => {
      expect.assertions(1);

      const folderId = crypto.randomUUID();
      const port = new MockPort();
      port.addRequestListener(MOVE_FOLDER_BY_ID, () => undefined);
      jest.spyOn(port, "request");

      const service = new MoveItemsServiceWorkerService(port);
      await service.moveFolder(folderId, null);

      expect(port.request).toHaveBeenCalledWith(MOVE_FOLDER_BY_ID, folderId, null, null);
    });

    it("should throw and not call the port when the parameters are invalid", async () => {
      expect.assertions(3);

      const port = new MockPort();
      jest.spyOn(port, "request");
      const service = new MoveItemsServiceWorkerService(port);

      await expect(service.moveFolder("not-a-uuid", null)).rejects.toThrow(
        "The given folderId should be a valid UUID.",
      );
      await expect(service.moveFolder(crypto.randomUUID(), "not-a-uuid")).rejects.toThrow(
        "The given destinationFolderId should be a valid UUID or null.",
      );
      expect(port.request).not.toHaveBeenCalled();
    });
  });

  describe("::moveResources", () => {
    it("should request the move with the operator-confirmed permissions serialized per item", async () => {
      expect.assertions(2);

      const resourceIds = [crypto.randomUUID(), crypto.randomUUID()];
      const destinationFolderId = crypto.randomUUID();
      const permissionsByResourceId = new Map(
        resourceIds.map((resourceId) => [
          resourceId,
          new PermissionsCollection(defaultPermissionsDtos({ aco: "Resource", aco_foreign_key: resourceId }), {
            assertAtLeastOneOwner: false,
          }),
        ]),
      );

      const port = new MockPort();
      port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(port, "request");

      const service = new MoveItemsServiceWorkerService(port);
      await service.moveResources(resourceIds, destinationFolderId, permissionsByResourceId);

      const expectedDto = Object.fromEntries(
        [...permissionsByResourceId].map(([resourceId, permissions]) => [resourceId, permissions.toDto()]),
      );
      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(MOVE_RESOURCES_BY_IDS, resourceIds, destinationFolderId, expectedDto);
    });

    it("should request the move with null permissions when none are confirmed", async () => {
      expect.assertions(1);

      const resourceIds = [crypto.randomUUID()];
      const destinationFolderId = crypto.randomUUID();
      const port = new MockPort();
      port.addRequestListener(MOVE_RESOURCES_BY_IDS, () => undefined);
      jest.spyOn(port, "request");

      const service = new MoveItemsServiceWorkerService(port);
      await service.moveResources(resourceIds, destinationFolderId);

      expect(port.request).toHaveBeenCalledWith(MOVE_RESOURCES_BY_IDS, resourceIds, destinationFolderId, null);
    });

    it("should throw and not call the port when the parameters are invalid", async () => {
      expect.assertions(4);

      const port = new MockPort();
      jest.spyOn(port, "request");
      const service = new MoveItemsServiceWorkerService(port);

      await expect(service.moveResources([], crypto.randomUUID())).rejects.toThrow(
        "The given resourceIds should be a non-empty array.",
      );
      await expect(service.moveResources(["not-a-uuid"], crypto.randomUUID())).rejects.toThrow(
        "The given resourceIds should only contain valid UUIDs.",
      );
      await expect(service.moveResources([crypto.randomUUID()], "not-a-uuid")).rejects.toThrow(
        "The given destinationFolderId should be a valid UUID or null.",
      );
      expect(port.request).not.toHaveBeenCalled();
    });
  });
});
