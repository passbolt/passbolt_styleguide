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
 * @since         5.3.2
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import ClipboardServiceWorkerService from "./clipboardServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ClipboardServiceWorkerService", () => {
  describe("::copyTemporarily", () => {
    it("requests the service worker with the expected event and parameters.", async () => {
      expect.assertions(2);
      const port = new MockPort();
      const service = new ClipboardServiceWorkerService(port);
      const clipboardContent = "clipboard-content";

      jest.spyOn(port, "request");

      await service.copyTemporarily(clipboardContent);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", clipboardContent);
    });

    it("should throw an error if the given parameter is not a valid string.", async () => {
      expect.assertions(1);
      const port = new MockPort();
      const service = new ClipboardServiceWorkerService(port);

      const clipboardContent = 42;

      await expect(() => service.copyTemporarily(clipboardContent)).rejects.toThrowError();
    });
  });

  describe("::copy", () => {
    it("requests the service worker with the expected event and parameters.", async () => {
      expect.assertions(2);
      const port = new MockPort();
      const service = new ClipboardServiceWorkerService(port);
      const clipboardContent = "clipboard-content";

      jest.spyOn(port, "request");

      await service.copy(clipboardContent);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith("passbolt.clipboard.copy", clipboardContent);
    });

    it("should throw an error if the given parameter is not a valid string.", async () => {
      expect.assertions(1);
      const port = new MockPort();
      const service = new ClipboardServiceWorkerService(port);

      const clipboardContent = 42;

      await expect(() => service.copy(clipboardContent)).rejects.toThrowError();
    });
  });
});
