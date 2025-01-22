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
import MetadataKeysServiceWorkerService, {
  METADATA_KEYS_FIND_ALL_EVENT,
  METADATA_KEYS_GENERATE_EVENT
} from "./metadataKeysServiceWorkerService";
import {defaultMetadataKeysDtos} from "../../../models/entity/metadata/metadataKeysCollection.test.data";
import MetadataKeysCollection from "../../../models/entity/metadata/metadataKeysCollection";
import {ExternalGpgKeyEntityFixtures} from "../../../models/entity/gpgkey/externalGpgKeyEntity.test.fixtures";
import ExternalGpgKeyPairEntity from "../../../models/entity/gpgkey/external/externalGpgKeyPairEntity";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MetadataKeysServiceWorkerService", () => {
  let port, service;

  beforeEach(() => {
    port = new MockPort();
    service = new MetadataKeysServiceWorkerService(port);
  });

  describe("::findAll", () => {
    it("requests the service worker with the expected event and return metadata keys collection.", async() => {
      expect.assertions(3);
      const dto = defaultMetadataKeysDtos();
      jest.spyOn(port, "request").mockReturnValue(dto);
      const settings = await service.findAll();
      expect(port.request).toHaveBeenCalledWith(METADATA_KEYS_FIND_ALL_EVENT);
      expect(settings).toBeInstanceOf(MetadataKeysCollection);
      expect(settings.toDto()).toEqual(dto);
    });
  });

  describe("::generatePrivate", () => {
    it("requests the service worker with the expected event and return the request output.", async() => {
      expect.assertions(4);
      const externalGpgKeyDto = ExternalGpgKeyEntityFixtures.minimal_dto;
      const dto = {
        public_key: externalGpgKeyDto,
        private_key: externalGpgKeyDto
      };
      jest.spyOn(port, "request").mockReturnValue(dto);
      const externalGpgKeyPair = await service.generatePrivate();
      expect(port.request).toHaveBeenCalledWith(METADATA_KEYS_GENERATE_EVENT);
      expect(externalGpgKeyPair).toBeInstanceOf(ExternalGpgKeyPairEntity);
      expect(externalGpgKeyPair.publicKey.armoredKey).toEqual(dto.public_key.armored_key);
      expect(externalGpgKeyPair.privateKey.armoredKey).toEqual(dto.private_key.armored_key);
    });
  });
});
