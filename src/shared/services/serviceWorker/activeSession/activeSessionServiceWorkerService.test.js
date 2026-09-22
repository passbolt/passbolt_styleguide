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
 * @since         6.0.0
 */

import ActiveSessionServiceWorkerService, {
  AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT,
} from "./activeSessionServiceWorkerService";
import { defaultUserActiveSessionDto } from "../../../models/entity/session/userActiveSessionEntity.test.data";
import UserActiveSessionEntity from "../../../models/entity/session/userActiveSessionEntity";

describe("OfflineModeSettingsServiceWorkerService", () => {
  let portMock, service;

  beforeEach(() => {
    portMock = {
      request: jest.fn(),
    };
    service = new ActiveSessionServiceWorkerService(portMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findAndUpdateAuthenticationStatus", () => {
    it("should find and update authentication status", async () => {
      const dto = defaultUserActiveSessionDto();
      portMock.request.mockResolvedValue(dto);

      const result = await service.findAndUpdateAuthenticationStatus();

      expect(portMock.request).toHaveBeenCalledWith(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT);
      expect(result).toBeInstanceOf(UserActiveSessionEntity);
      expect(result.toDto()).toEqual(dto);
    });

    it("should return null if no active session found", async () => {
      portMock.request.mockResolvedValue(null);

      const result = await service.findAndUpdateAuthenticationStatus();

      expect(portMock.request).toHaveBeenCalledWith(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT);
      expect(result).not.toBeInstanceOf(UserActiveSessionEntity);
      expect(result).toBeNull();
    });
  });
});
