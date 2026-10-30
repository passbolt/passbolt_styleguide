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
 * @since         5.18.0
 */

import SessionTimestampsServiceWorkerService, {
  SESSION_TIMESTAMPS_GET_EVENT,
} from "./sessionTimestampsServiceWorkerService";
import { defaultSessionTimestampsDto } from "../../../models/entity/sessionTimestamps/sessionTimestampsEntity.test.data";
import SessionTimestampsEntity from "../../../models/entity/sessionTimestamps/sessionTimestampsEntity";

describe("SessionTimestampsServiceWorkerService", () => {
  let portMock, service;

  beforeEach(() => {
    portMock = {
      request: jest.fn(),
    };
    service = new SessionTimestampsServiceWorkerService(portMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("::get", () => {
    it("should get the session timestamps", async () => {
      expect.assertions(3);
      const dto = defaultSessionTimestampsDto();
      portMock.request.mockResolvedValue(dto);

      const result = await service.get();

      expect(portMock.request).toHaveBeenCalledWith(SESSION_TIMESTAMPS_GET_EVENT);
      expect(result).toBeInstanceOf(SessionTimestampsEntity);
      expect(result.toDto()).toEqual(dto);
    });

    it("should return null if no session timestamps are stored", async () => {
      expect.assertions(2);
      portMock.request.mockResolvedValue(null);

      const result = await service.get();

      expect(portMock.request).toHaveBeenCalledWith(SESSION_TIMESTAMPS_GET_EVENT);
      expect(result).toBeNull();
    });
  });
});
