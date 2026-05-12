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
import OfflineSettingsEntity from "../../../models/entity/offline/offlineSettingsEntity";
import OfflineModeSettingsServiceWorkerService, {
  OFFLINE_FIND_SETTINGS_EVENT,
  OFFLINE_SAVE_SETTINGS_EVENT,
  OFFLINE_DELETE_SETTINGS_EVENT,
} from "./offlineModeSettingsServiceWorkerService";
import { v4 as uuidv4 } from "uuid";
import {
  defaultOfflineSettingsDto,
  defaultOfflineSettingsDtoFromApi,
} from "../../../models/entity/offline/offlineSettingsEntity.test.data";

describe("OfflineModeSettingsServiceWorkerService", () => {
  let portMock, service;

  beforeEach(() => {
    portMock = {
      request: jest.fn(),
    };
    service = new OfflineModeSettingsServiceWorkerService(portMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findSettings", () => {
    it("should find offline settings", async () => {
      const settingsDto = defaultOfflineSettingsDtoFromApi();
      portMock.request.mockResolvedValue(settingsDto);

      const result = await service.findSettings();

      expect(portMock.request).toHaveBeenCalledWith(OFFLINE_FIND_SETTINGS_EVENT);
      expect(result).toBeInstanceOf(OfflineSettingsEntity);
      expect(result.toDto()).toEqual(settingsDto);
    });

    it("should return null if no settings found", async () => {
      portMock.request.mockResolvedValue(null);

      const result = await service.findSettings();

      expect(portMock.request).toHaveBeenCalledWith(OFFLINE_FIND_SETTINGS_EVENT);
      expect(result).not.toBeInstanceOf(OfflineSettingsEntity);
      expect(result).toBeNull();
    });
  });

  describe("saveSettings", () => {
    it("should save offline settings", async () => {
      const settingsDto = defaultOfflineSettingsDto();
      const formSettings = new OfflineSettingsEntity(settingsDto);
      portMock.request.mockResolvedValue(settingsDto);

      const result = await service.saveSettings(formSettings);

      expect(portMock.request).toHaveBeenCalledWith(OFFLINE_SAVE_SETTINGS_EVENT, formSettings.toDto());
      expect(result).toBeInstanceOf(OfflineSettingsEntity);
      expect(result.toDto()).toEqual(settingsDto);
    });

    it("should throw TypeError if settings is not an OfflineSettingsEntity", async () => {
      await expect(service.saveSettings({})).rejects.toThrow(TypeError);
    });
  });

  describe("disableSettings", () => {
    it("should disable offline settings", async () => {
      portMock.request.mockResolvedValue(null);
      const id = uuidv4();

      await service.disableSettings(id);

      expect(portMock.request).toHaveBeenCalledWith(OFFLINE_DELETE_SETTINGS_EVENT, id);
    });

    it("should not call the service worker if the id is not a valid uuid", async () => {
      await service.disableSettings("not-a-uuid");

      expect(portMock.request).not.toHaveBeenCalled();
    });
  });
});
