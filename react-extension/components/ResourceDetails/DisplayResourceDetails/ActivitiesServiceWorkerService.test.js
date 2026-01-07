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
 * @since         5.4.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import ActivitiesServiceWorkerService, {
  RESOURCE_ACTIVITIES_FIND_ALL_EVENT,
  LIMIT_ACTIVITIES_PER_PAGE,
} from "./ActivitiesServiceWorkerService";
import { v4 as uuidv4 } from "uuid";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ActivitiesServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new ActivitiesServiceWorkerService(port);
  });

  describe("::findAllFromResourceId", () => {
    it("requests the service worker for all activities event with resourceId, page and default limit", async () => {
      expect.assertions(1);
      jest.spyOn(port, "request").mockReturnValue(() => {});
      const resourceId = uuidv4();
      await service.findAllFromResourceId(resourceId, { page: 1 });

      expect(port.request).toHaveBeenCalledWith(RESOURCE_ACTIVITIES_FIND_ALL_EVENT, "Resource", resourceId, {
        page: 1,
        limit: LIMIT_ACTIVITIES_PER_PAGE,
      });
    });

    it("requests the service worker for all activities event with resourceId, page and limit.", async () => {
      expect.assertions(1);
      jest.spyOn(port, "request").mockReturnValue(() => {});
      const resourceId = uuidv4();
      await service.findAllFromResourceId(resourceId, { page: 1, limit: 4 });

      expect(port.request).toHaveBeenCalledWith(RESOURCE_ACTIVITIES_FIND_ALL_EVENT, "Resource", resourceId, {
        page: 1,
        limit: 4,
      });
    });
  });
});
