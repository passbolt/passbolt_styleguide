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
import FavoriteServiceWorkerService, {
  ADD_RESOURCE_TO_FAVORITES,
  REMOVE_RESOURCE_FROM_FAVORITES,
} from "./FavoriteServiceWorkerService";
import { v4 as uuidv4 } from "uuid";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("FavoriteServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new FavoriteServiceWorkerService(port);
  });

  describe("::addToFavorites", () => {
    it("should call the port with the correct action and resourceId", async () => {
      expect.assertions(2);
      jest.spyOn(port, "request").mockReturnValue(() => {});
      const resourceId = uuidv4();
      await service.addToFavorites(resourceId);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(ADD_RESOURCE_TO_FAVORITES, resourceId);
    });
  });

  describe("::removeFromFavorites", () => {
    it("should call the port with the correct action and resourceId", async () => {
      expect.assertions(2);
      jest.spyOn(port, "request").mockReturnValue(() => {});
      const resourceId = uuidv4();
      await service.removeFromFavorites(resourceId);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(REMOVE_RESOURCE_FROM_FAVORITES, resourceId);
    });
  });
});
