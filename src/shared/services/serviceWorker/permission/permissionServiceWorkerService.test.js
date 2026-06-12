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
});
