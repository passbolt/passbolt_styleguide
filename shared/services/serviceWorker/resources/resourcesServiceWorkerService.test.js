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
 * @since         5.3.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import ResourcesServiceWorkerService, {
  RESOURCES_UPDATE_LOCAL_STORAGE_BY_PARENT_FOLDER_ID,
} from "./resourcesServiceWorkerService";
import { v4 as uuidv4 } from "uuid";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ResourcesServiceWorkerService", () => {
  /** @type {MockPort} */
  let port,
    /** @type {ResourcesServiceWorkerService} */
    service;

  beforeEach(() => {
    port = new MockPort();
    service = new ResourcesServiceWorkerService(port);
  });

  describe("::updateResourceLocalStorageForParentFolderId", () => {
    it("requests the service worker with the expected event and parameter.", async () => {
      expect.assertions(2);
      const parentFolderId = uuidv4();

      jest.spyOn(port, "request");

      await service.updateResourceLocalStorageForParentFolderId(parentFolderId);
      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(RESOURCES_UPDATE_LOCAL_STORAGE_BY_PARENT_FOLDER_ID, parentFolderId);
    });

    it("should assert its parameter.", async () => {
      expect.assertions(1);
      const parentFolderId = "test";
      await expect(() => service.updateResourceLocalStorageForParentFolderId(parentFolderId)).rejects.toThrow();
    });
  });
});
