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
 * @since         4.12.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import ResourceTypesCollection from "../../../models/entity/resourceType/resourceTypesCollection";
import {resourceTypesCollectionDto} from "../../../models/entity/resourceType/resourceTypesCollection.test.data";
import ResourceTypesServiceWorkerService, {RESOURCE_TYPE_FIND_DELETED_AND_NON_DELETED_EVENT, RESOURCE_TYPE_UPDATE_ALL_DELETED_STATUS_EVENT} from "./resourceTypesServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ResourceTypesServiceWorkerService", () => {
  describe("::findAllByDeletedAndNonDeleted", () => {
    it("requests the service worker with the expected event and return the count details.", async() => {
      expect.assertions(4);

      const dto = resourceTypesCollectionDto();

      const port = new MockPort();
      jest.spyOn(port, "request").mockReturnValue(dto);

      const service = new ResourceTypesServiceWorkerService(port);
      const resourceTypesCollection = await service.findAllByDeletedAndNonDeleted();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(RESOURCE_TYPE_FIND_DELETED_AND_NON_DELETED_EVENT);
      expect(resourceTypesCollection).toBeInstanceOf(ResourceTypesCollection);
      expect(resourceTypesCollection.toDto()).toEqual(dto);
    });
  });

  describe("::updateAllDeletedStatus", () => {
    it("requests the service worker with the expected event and collection for updating the resource types deletion status.", async() => {
      expect.assertions(2);

      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesCollectionDto());

      const port = new MockPort();
      jest.spyOn(port, "request").mockReturnValue();

      const service = new ResourceTypesServiceWorkerService(port);
      await service.updateAllDeletedStatus(resourceTypesCollection);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(RESOURCE_TYPE_UPDATE_ALL_DELETED_STATUS_EVENT, resourceTypesCollection);
    });
  });
});
