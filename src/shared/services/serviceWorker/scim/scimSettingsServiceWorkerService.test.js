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
 * @since         5.5.0
 */
import ScimSettingsEntity from "../../../models/entity/scimSettings/scimSettingsEntity";
import ScimSettingsServiceWorkerService, {
  SCIM_FIND_SETTINGS_EVENT,
  SCIM_CREATE_SETTINGS_EVENT,
  SCIM_UPDATE_SETTINGS_EVENT,
  SCIM_DISABLE_SETTINGS_EVENT
} from "./scimSettingsServiceWorkerService";
import {v4 as uuidv4} from "uuid";
import {defaultScimSettingsDto, scimSettingsWithoutIdDto, scimSettingsWithSettingIdDto} from "./scimSettingsServiceWorkerService.test.data";

describe("ScimSettingsServiceWorkerService", () => {
  let portMock, service;

  beforeEach(() => {
    portMock = {
      request: jest.fn()
    };
    service = new ScimSettingsServiceWorkerService(portMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findSettings", () => {
    it("should find SCIM settings", async() => {
      const settingsDto = defaultScimSettingsDto();
      portMock.request.mockResolvedValue(settingsDto);

      const result = await service.findSettings();

      expect(portMock.request).toHaveBeenCalledWith(SCIM_FIND_SETTINGS_EVENT);
      expect(result).toBeInstanceOf(ScimSettingsEntity);
      expect(result.toDto()).toEqual(settingsDto);
    });
  });

  describe("saveSettings", () => {
    it("should create SCIM settings", async() => {
      const settingsDto = scimSettingsWithSettingIdDto();
      const formSettings = new ScimSettingsEntity(settingsDto);
      portMock.request.mockResolvedValue(settingsDto);

      const result = await service.createSettings(formSettings);

      expect(portMock.request).toHaveBeenCalledWith(SCIM_CREATE_SETTINGS_EVENT, settingsDto);
      expect(result).toBeInstanceOf(ScimSettingsEntity);
      expect(result.toDto()).toEqual(settingsDto);
    });

    it("should update SCIM settings", async() => {
      const settingsDto = scimSettingsWithoutIdDto();
      const formSettings = new ScimSettingsEntity(settingsDto);
      const id = uuidv4();
      portMock.request.mockResolvedValue(settingsDto);

      const result = await service.updateSettings(formSettings, id);

      expect(portMock.request).toHaveBeenCalledWith(SCIM_UPDATE_SETTINGS_EVENT, id, settingsDto);
      expect(result).toBeInstanceOf(ScimSettingsEntity);
      expect(result.toDto()).toEqual(settingsDto);
    });

    it("should throw TypeError if settings is not a ScimSettingsEntity", async() => {
      await expect(service.updateSettings({})).rejects.toThrow(TypeError);
    });
  });

  describe("disableSettings", () => {
    it("should disable SCIM settings", async() => {
      portMock.request.mockResolvedValue(null);

      await service.disableSettings();

      expect(portMock.request).toHaveBeenCalledWith(SCIM_DISABLE_SETTINGS_EVENT);
    });
  });
});
