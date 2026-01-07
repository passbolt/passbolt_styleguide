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

import MockPort from "../../../../react-extension/test/mock/MockPort";
import GettingStartedWithEncryptedMetadataServiceWorkerService from "./gettingStartedWithEncryptedMetadataServiceWorkerService";
import MetadataGettingStartedSettingsEntity from "../../../models/entity/metadata/metadataGettingStartedSettingsEntity";
import { enableMetadataGettingStartedSettingsDto } from "../../../models/entity/metadata/metadataGettingStartedSettingsEntity.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GettingStartedWithEncryptedMetadataServiceWorkerService", () => {
  describe("::enableEncryptedMetadata", () => {
    it("requests the service worker with the expected event and return metadata keys collection.", async () => {
      expect.assertions(2);

      const event = "passbolt.metadata.enable-encrypted-metadata-for-existing-instance";
      const port = new MockPort();
      const serviceWorkerService = new GettingStartedWithEncryptedMetadataServiceWorkerService(port);
      jest.spyOn(port, "request").mockImplementation(() => {});

      await serviceWorkerService.enableEncryptedMetadata();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::keepLegacyClearTextMetadata", () => {
    it("requests the service worker with the expected event and return the request output.", async () => {
      expect.assertions(2);

      const event = "passbolt.metadata.keep-cleartext-metadata-for-existing-instance";
      const port = new MockPort();
      const serviceWorkerService = new GettingStartedWithEncryptedMetadataServiceWorkerService(port);
      jest.spyOn(port, "request").mockImplementation(() => {});

      await serviceWorkerService.keepLegacyClearTextMetadata();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::findGettingStartedSettings", () => {
    it("requests the service worker with the expected event and return the request output.", async () => {
      expect.assertions(4);

      const dto = enableMetadataGettingStartedSettingsDto();
      const event = "passbolt.metadata.find-getting-started-settings";
      const port = new MockPort();
      const serviceWorkerService = new GettingStartedWithEncryptedMetadataServiceWorkerService(port);
      jest.spyOn(port, "request").mockImplementation(() => dto);

      const result = await serviceWorkerService.findGettingStartedSettings();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
      expect(result).toBeInstanceOf(MetadataGettingStartedSettingsEntity);
      expect(result).toStrictEqual(new MetadataGettingStartedSettingsEntity(dto));
    });
  });
});
