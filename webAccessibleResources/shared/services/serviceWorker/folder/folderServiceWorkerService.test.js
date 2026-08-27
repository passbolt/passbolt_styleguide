import MockPort from "../../../../react-extension/test/mock/MockPort";
import FolderServiceWorkerService, { FOLDER_UPDATE_EVENT } from "./folderServiceWorkerService";

describe("FolderServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    // 1. Pass the port instance to the service
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
});
