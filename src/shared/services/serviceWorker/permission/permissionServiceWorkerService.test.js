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
import MockPort from "../../../../react-extension/test/mock/MockPort";
import PermissionServiceWorkerService, {
  PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY,
  PERMISSIONS_FIND_BY_IDS_FOR_SHARE,
  RESOURCES_CREATE,
  RESOURCES_UPDATE,
  SHARE_FOLDERS_SAVE,
  SHARE_RESOURCES_SAVE,
} from "./permissionServiceWorkerService";
import { defaultPermissionsDtos } from "../../../models/entity/permission/permissionCollection.test.data";
import PermissionsCollection from "../../../models/entity/permission/permissionsCollection";

describe("PermissionServiceWorkerService", () => {
  describe("::findPermissions", () => {
    it("should call the right service worker event with the given acoId and acoType, and return a PermissionsCollection", async () => {
      expect.assertions(4);

      const acoId = crypto.randomUUID();
      const acoType = "Resource";
      const dtos = defaultPermissionsDtos({ aco: acoType, aco_foreign_key: acoId });

      const port = new MockPort();
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => dtos);
      jest.spyOn(port, "request");

      const service = new PermissionServiceWorkerService(port);
      const result = await service.findPermissions(acoId, acoType);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, acoId, acoType);
      expect(result).toBeInstanceOf(PermissionsCollection);
      expect(result.length).toStrictEqual(dtos.length);
    });

    it("should work with Folder ACO type", async () => {
      expect.assertions(3);

      const acoId = crypto.randomUUID();
      const acoType = "Folder";
      const dtos = defaultPermissionsDtos({ aco: acoType, aco_foreign_key: acoId });

      const port = new MockPort();
      port.addRequestListener(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, () => dtos);
      jest.spyOn(port, "request");

      const service = new PermissionServiceWorkerService(port);
      const result = await service.findPermissions(acoId, acoType);

      expect(port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, acoId, acoType);
      expect(result).toBeInstanceOf(PermissionsCollection);
      expect(result.length).toStrictEqual(dtos.length);
    });
  });

  describe("::findByIdsForShare", () => {
    it("should call the right service worker event with the given resources ids and return the resource DTOs", async () => {
      expect.assertions(3);

      const resourcesIds = [crypto.randomUUID(), crypto.randomUUID()];
      const resourcesDtos = resourcesIds.map((id) => ({ id, permissions: [] }));

      const port = new MockPort();
      port.addRequestListener(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, () => resourcesDtos);
      jest.spyOn(port, "request");

      const service = new PermissionServiceWorkerService(port);
      const result = await service.findByIdsForShare(resourcesIds);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, resourcesIds);
      expect(result).toStrictEqual(resourcesDtos);
    });
  });

  describe("::saveResourcesPermissions", () => {
    it("should call the right service worker event with the given resources ids and permission changes", async () => {
      expect.assertions(2);

      const resourcesIds = [crypto.randomUUID(), crypto.randomUUID()];
      const permissionChangesDto = [{ aro: "User", aro_foreign_key: crypto.randomUUID(), type: 7 }];

      const port = new MockPort();
      port.addRequestListener(SHARE_RESOURCES_SAVE, () => undefined);
      jest.spyOn(port, "request");

      const service = new PermissionServiceWorkerService(port);
      await service.saveResourcesPermissions(resourcesIds, permissionChangesDto);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(SHARE_RESOURCES_SAVE, resourcesIds, permissionChangesDto);
    });

    it("should throw and not call the port when the resources ids are invalid", async () => {
      expect.assertions(3);

      const port = new MockPort();
      jest.spyOn(port, "request");
      const service = new PermissionServiceWorkerService(port);
      const validChanges = [{ aro: "User", aro_foreign_key: crypto.randomUUID(), type: 7 }];

      await expect(service.saveResourcesPermissions([], validChanges)).rejects.toThrow(
        "The given resourcesIds should be a non-empty array.",
      );
      await expect(service.saveResourcesPermissions(["not-a-uuid"], validChanges)).rejects.toThrow(
        "The given resourcesIds should only contain valid UUIDs.",
      );
      expect(port.request).not.toHaveBeenCalled();
    });
  });

  describe("::saveFoldersPermissions", () => {
    it("should call the right service worker event with the given folder id and permission changes", async () => {
      expect.assertions(2);

      const folderId = crypto.randomUUID();
      const permissionChangesDto = [{ aro: "Group", aro_foreign_key: crypto.randomUUID(), type: 1 }];

      const port = new MockPort();
      port.addRequestListener(SHARE_FOLDERS_SAVE, () => undefined);
      jest.spyOn(port, "request");

      const service = new PermissionServiceWorkerService(port);
      await service.saveFoldersPermissions(folderId, permissionChangesDto);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(SHARE_FOLDERS_SAVE, folderId, permissionChangesDto);
    });

    it("should throw and not call the port when the folder id is invalid", async () => {
      expect.assertions(2);

      const port = new MockPort();
      jest.spyOn(port, "request");
      const service = new PermissionServiceWorkerService(port);
      const validChanges = [{ aro: "Group", aro_foreign_key: crypto.randomUUID(), type: 1 }];

      await expect(service.saveFoldersPermissions("not-a-uuid", validChanges)).rejects.toThrow(
        "The given folderId should be a valid UUID.",
      );
      expect(port.request).not.toHaveBeenCalled();
    });
  });

  describe("::createResource", () => {
    it("should call the right service worker event with the given resource, secret and permission changes", async () => {
      expect.assertions(2);

      const resourceDto = { metadata: { name: "Passbolt" } };
      const secretDto = { password: "secret" };
      const permissionChanges = [{ aro: "User", aro_foreign_key: crypto.randomUUID(), type: 7, is_new: true }];

      const port = new MockPort();
      port.addRequestListener(RESOURCES_CREATE, () => undefined);
      jest.spyOn(port, "request");

      const service = new PermissionServiceWorkerService(port);
      await service.createResource(resourceDto, secretDto, permissionChanges);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(RESOURCES_CREATE, resourceDto, secretDto, permissionChanges);
    });
  });

  describe("::updateResource", () => {
    it("should call the right service worker event with the given resource, secret and permission changes", async () => {
      expect.assertions(2);

      const resourceDto = { id: crypto.randomUUID(), metadata: { name: "Passbolt" } };
      const secretDto = { password: "secret" };
      const permissionChanges = [{ aro: "Group", aro_foreign_key: crypto.randomUUID(), type: 1, is_new: true }];

      const port = new MockPort();
      port.addRequestListener(RESOURCES_UPDATE, () => undefined);
      jest.spyOn(port, "request");

      const service = new PermissionServiceWorkerService(port);
      await service.updateResource(resourceDto, secretDto, permissionChanges);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(RESOURCES_UPDATE, resourceDto, secretDto, permissionChanges);
    });
  });
});
