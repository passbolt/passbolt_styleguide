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
 * @since         5.7.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import ResourceSecretRevisionsCollection from "../../../models/entity/secretRevision/resourceSecretRevisionsCollection";
import { defaultResourceSecretRevisionsDtos } from "../../../models/entity/secretRevision/resourceSecretRevisionsCollection.test.data";
import SecretRevisionsResourceServiceWorkerService from "./secretRevisionsResourceServiceWorkerService";
import { v4 as uuidv4 } from "uuid";

describe("SecretRevisionsResourceServiceWorkerService", () => {
  describe("::findAllByResourceIdForDisplay", () => {
    it("should call for the right service worker event and return the right collection", async () => {
      expect.assertions(4);

      const event = "passbolt.secret-revisions.find-all-by-resource-id-for-display";
      const dto = defaultResourceSecretRevisionsDtos();

      const port = new MockPort();
      port.addRequestListener(event, () => dto);
      jest.spyOn(port, "request");

      const resourceId = uuidv4();
      const service = new SecretRevisionsResourceServiceWorkerService(port);
      const collection = await service.findAllByResourceIdForDisplay(resourceId);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, resourceId);
      expect(collection).toBeInstanceOf(ResourceSecretRevisionsCollection);
      expect(collection.toDto()).toStrictEqual(dto);
    });

    it("should assert its parameters", async () => {
      expect.assertions(1);
      const port = new MockPort();

      const service = new SecretRevisionsResourceServiceWorkerService(port);
      await expect(() => service.findAllByResourceIdForDisplay(42)).rejects.toThrowError();
    });
  });
});
