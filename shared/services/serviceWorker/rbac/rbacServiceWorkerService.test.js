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
import RbacsCollection from "../../../models/entity/rbac/rbacsCollection";
import RbacServiceWorkerService from "./rbacServiceWorkerService";
import { userSettingsRbacsCollectionData } from "../../../models/entity/rbac/rbacsCollection.test.data";

describe("RbacServiceWorkerService", () => {
  describe("::findAll", () => {
    it("should call for the right service worker event and return the right collection", async () => {
      expect.assertions(4);

      const event = "passbolt.rbacs.find-me";
      const dto = userSettingsRbacsCollectionData();

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const service = new RbacServiceWorkerService(port);
      const collection = await service.findMe();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
      expect(collection).toBeInstanceOf(RbacsCollection);
      expect(collection.toDto()).toStrictEqual(dto);
    });
  });
});
