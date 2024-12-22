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
 * @since         4.11.0
 */

import MockPort from "../../../react-extension/test/mock/MockPort";
import MetadataSettingsServiceWorkerService, {
  METADATA_GET_OR_FIND_SETTINGS_EVENT, METADATA_SAVE_TYPES_SETTINGS_EVENT
} from "./metadataSettingsServiceWorkerService";
import MetadataTypesSettingsEntity from "../../models/entity/metadata/metadataTypesSettingsEntity";
import {defaultMetadataTypesSettingsV4Dto} from "../../models/entity/metadata/metadataTypesSettingsEntity.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MetadataSettingsServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new MetadataSettingsServiceWorkerService(port);
  });

  describe("::getOrFindTypesSettings", () => {
    it("requests the service worker with the expected event.", async() => {
      expect.assertions(1);
      jest.spyOn(port, "request").mockImplementation(jest.fn);
      await service.getOrFindTypesSettings();
      expect(port.request).toHaveBeenCalledWith(METADATA_GET_OR_FIND_SETTINGS_EVENT);
    });
  });

  describe("::saveTypesSettings", () => {
    it("requests the service worker with the expected event and parameters.", async() => {
      expect.assertions(1);
      const settings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto());
      jest.spyOn(port, "request").mockImplementation(jest.fn);
      await service.saveTypesSettings(settings);
      expect(port.request).toHaveBeenCalledWith(METADATA_SAVE_TYPES_SETTINGS_EVENT, settings.toDto());
    });

    it("throws if the given metadata types settings is not of type MetadataTypesSettingsEntity.", async() => {
      expect.assertions(1);
      await expect(() => service.saveTypesSettings(42)).rejects.toThrow(TypeError);
    });
  });
});
