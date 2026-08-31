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
import FolderServiceWorkerService, { FOLDER_UPDATE_EVENT, FOLDER_DELETE_EVENT } from "./folderServiceWorkerService";
import { v4 as uuidv4 } from "uuid";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("FolderServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new FolderServiceWorkerService(port);
  });

  describe("::update", () => {
    it("requests the service worker with the event and returns the result", async () => {
      expect.assertions(2);
      const folderDto = { id: "folder-id", name: "My folder" };

      // 2. Mock the request method directly on the port instance
      port.request = jest.fn().mockReturnValue(folderDto);

      const result = await service.update(folderDto);

      expect(port.request).toHaveBeenCalledWith(FOLDER_UPDATE_EVENT, folderDto);
      expect(result).toEqual(folderDto);
    });
  });
  describe("::delete", () => {
    it("requests the service worker with the expected event, the folder id and the cascade option", async () => {
      expect.assertions(1);
      const folderId = uuidv4();
      jest.spyOn(port, "request").mockResolvedValue(folderId);

      await service.delete(folderId, false);

      expect(port.request).toHaveBeenCalledWith(FOLDER_DELETE_EVENT, folderId, false);
    });

    it("requests the service worker with the cascade option enabled", async () => {
      expect.assertions(1);
      const folderId = uuidv4();
      jest.spyOn(port, "request").mockResolvedValue(folderId);

      await service.delete(folderId, true);

      expect(port.request).toHaveBeenCalledWith(FOLDER_DELETE_EVENT, folderId, true);
    });

    it("defaults the cascade option to false", async () => {
      expect.assertions(1);
      const folderId = uuidv4();
      jest.spyOn(port, "request").mockResolvedValue(folderId);

      await service.delete(folderId);

      expect(port.request).toHaveBeenCalledWith(FOLDER_DELETE_EVENT, folderId, false);
    });

    it("throws if the folder id is not a valid uuid and does not request the service worker.", async () => {
      expect.assertions(2);
      jest.spyOn(port, "request");

      await expect(service.delete("not-a-uuid")).rejects.toThrow("The given parameter is not a valid UUID");

      expect(port.request).not.toHaveBeenCalled();
    });
  });
});
