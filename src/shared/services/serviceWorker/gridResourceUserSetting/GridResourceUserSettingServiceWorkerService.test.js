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
 * @since         5.0.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import GridResourceUserSettingServiceWorkerService, {
  RESOURCES_GRID_USER_SETTINGS_GET_EVENT,
  RESOURCES_GRID_USER_SETTINGS_RESET_EVENT,
  RESOURCES_GRID_USER_SETTINGS_SET_EVENT,
} from "./GridResourceUserSettingServiceWorkerService";
import { defaultGridUserSettingData } from "../../../models/entity/gridUserSetting/gridUserSettingEntity.test.data";
import GridUserSettingEntity from "../../../models/entity/gridUserSetting/gridUserSettingEntity";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GridResourceUserSettingServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new GridResourceUserSettingServiceWorkerService(port);
  });

  describe("::getSetting", () => {
    it("requests the service worker with the expected event and return settings entity.", async () => {
      expect.assertions(3);
      const dto = defaultGridUserSettingData();
      jest.spyOn(port, "request").mockReturnValue(dto);
      const settings = await service.getSetting();
      expect(port.request).toHaveBeenCalledWith(RESOURCES_GRID_USER_SETTINGS_GET_EVENT);
      expect(settings).toBeInstanceOf(GridUserSettingEntity);
      expect(settings.toDto({ columns_setting: true, sorter: true })).toEqual(dto);
    });

    it("returns null if no settings found.", async () => {
      expect.assertions(2);
      jest.spyOn(port, "request").mockReturnValue(null);
      const settings = await service.getSetting();
      expect(port.request).toHaveBeenCalledWith(RESOURCES_GRID_USER_SETTINGS_GET_EVENT);
      expect(settings).toBeNull();
    });

    it("returns null if something went wrong while retrieving the settings.", async () => {
      expect.assertions(2);
      jest.spyOn(port, "request").mockImplementation(() => {
        throw new Error("unexpected error");
      });
      const settings = await service.getSetting();
      expect(port.request).toHaveBeenCalledWith(RESOURCES_GRID_USER_SETTINGS_GET_EVENT);
      expect(settings).toBeNull();
    });
  });

  describe("::setSetting", () => {
    it("requests the service worker with the expected event.", async () => {
      expect.assertions(1);
      const settings = new GridUserSettingEntity(defaultGridUserSettingData());
      jest.spyOn(port, "request").mockImplementation(jest.fn);
      await service.setSetting(settings);
      expect(port.request).toHaveBeenCalledWith(
        RESOURCES_GRID_USER_SETTINGS_SET_EVENT,
        settings.toDto({ columns_setting: true, sorter: true }),
      );
    });

    it("throws if the parameter is not of the right type.", async () => {
      expect.assertions(1);
      await expect(() => service.setSetting(42)).rejects.toThrow(TypeError);
    });
  });

  describe("::resetSetting", () => {
    it("requests the service worker with the expected event.", async () => {
      expect.assertions(1);
      jest.spyOn(port, "request").mockImplementation(jest.fn);
      await service.resetSettings();
      expect(port.request).toHaveBeenCalledWith(RESOURCES_GRID_USER_SETTINGS_RESET_EVENT);
    });
  });
});
