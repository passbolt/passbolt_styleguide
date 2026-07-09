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
 * @since         5.13.0
 */
import { v4 as uuidv4 } from "uuid";
import OfflineModeServiceWorkerService, {
  OFFLINE_MARK_RESOURCE_OFFLINE_EVENT,
  OFFLINE_UNMARK_ITEM_OFFLINE_EVENT,
} from "./offlineModeServiceWorkerService";
import { defaultOfflineItemDto } from "../../../models/entity/offline/offlineItemEntity.test.data";

describe("OfflineModeServiceWorkerService", () => {
  let portMock, service;

  beforeEach(() => {
    portMock = {
      request: jest.fn(),
    };
    service = new OfflineModeServiceWorkerService(portMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("markResource", () => {
    it("should unmark offline item", async () => {
      expect.assertions(2);
      const id = uuidv4();
      const offlineItemDto = defaultOfflineItemDto({ foreign_key: id });
      portMock.request.mockResolvedValue(offlineItemDto);

      const offlineItemEntity = await service.markResource(id);

      expect(portMock.request).toHaveBeenCalledWith(OFFLINE_MARK_RESOURCE_OFFLINE_EVENT, id);
      expect(offlineItemEntity.toDto()).toStrictEqual(offlineItemDto);
    });

    it("should throw an error if the id is not a valid uuid", async () => {
      expect.assertions(2);
      expect(() => service.markResource("not-a-uuid")).rejects.toThrow("The given resourceID should be a valid UUID");
      expect(portMock.request).not.toHaveBeenCalled();
    });
  });

  describe("unmarkItem", () => {
    it("should unmark offline item", async () => {
      expect.assertions(1);
      portMock.request.mockResolvedValue(null);
      const id = uuidv4();

      await service.unmarkItem(id);

      expect(portMock.request).toHaveBeenCalledWith(OFFLINE_UNMARK_ITEM_OFFLINE_EVENT, id);
    });

    it("should throw an error if the id is not a valid uuid", async () => {
      expect.assertions(2);
      expect(() => service.unmarkItem("not-a-uuid")).rejects.toThrow("The given id should be a valid UUID");
      expect(portMock.request).not.toHaveBeenCalled();
    });
  });
});
