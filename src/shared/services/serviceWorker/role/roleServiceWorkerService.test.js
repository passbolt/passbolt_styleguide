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
 * @since         5.8.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import RolesCollection from "../../../models/entity/role/rolesCollection";
import {rolesCollectionData} from "../../../models/entity/role/rolesCollection.test.data";
import RoleServiceWorkerService from "./roleServiceWorkerService";

describe("RoleServiceWorkerService", () => {
  describe("::findAll", () => {
    it("should call for the right service worker event and return the right collection", async() => {
      expect.assertions(4);

      const event = "passbolt.role.get-all";
      const dto = rolesCollectionData;

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const service = new RoleServiceWorkerService(port);
      const collection = await service.findAll();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
      expect(collection).toBeInstanceOf(RolesCollection);
      expect(collection.toDto()).toStrictEqual(dto);
    });
  });
});
