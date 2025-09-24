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
  METADATA_KEYS_CREATE_EVENT,
  METADATA_KEYS_FIND_ALL_EVENT,
  METADATA_KEYS_GENERATE_EVENT,
  METADATA_KEYS_RESUME_ROTATE_EVENT, METADATA_KEYS_ROTATE_EVENT,
  METADATA_SHARE_METADATA_PRIVATE_KEYS_EVENT
} from "./metadataKeysServiceWorkerService";
import {defaultMetadataKeysDtos} from "../../../models/entity/metadata/metadataKeysCollection.test.data";
import MetadataKeysCollection from "../../../models/entity/metadata/metadataKeysCollection";
import {ExternalGpgKeyEntityFixtures} from "../../../models/entity/gpgkey/externalGpgKeyEntity.test.fixtures";
import ExternalGpgKeyPairEntity from "../../../models/entity/gpgkey/external/externalGpgKeyPairEntity";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";
import {defaultMetadataKeyDto} from "../../../models/entity/metadata/metadataKeyEntity.test.data";
import MetadataKeyEntity from "../../../models/entity/metadata/metadataKeyEntity";
import {v4 as uuidv4} from "uuid";

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

  describe("::generateKeyPair", () => {
    it("requests the service worker with the expected event and return the request output.", async() => {
      expect.assertions(4);
      const externalGpgKeyDto = ExternalGpgKeyEntityFixtures.minimal_dto;
      const dto = {
        public_key: externalGpgKeyDto,
        private_key: externalGpgKeyDto
      };
      jest.spyOn(port, "request").mockReturnValue(dto);
      const externalGpgKeyPair = await service.generateKeyPair();
      expect(port.request).toHaveBeenCalledWith(METADATA_KEYS_GENERATE_EVENT);
      expect(externalGpgKeyPair).toBeInstanceOf(ExternalGpgKeyPairEntity);
      expect(externalGpgKeyPair.publicKey.armoredKey).toEqual(dto.public_key.armored_key);
      expect(externalGpgKeyPair.privateKey.armoredKey).toEqual(dto.private_key.armored_key);
    });
  });

  describe("::createKey", () => {
    it("requests the service worker with the expected event and return the request output.", async() => {
      expect.assertions(3);
      const dto = {
        public_key: {
          armored_key: pgpKeys.eddsa_ed25519.public,
        },
        private_key: {
          armored_key: pgpKeys.eddsa_ed25519.private,
        },
      };
      const generatedKeyPair = new ExternalGpgKeyPairEntity(dto);

      const metadataKeyDto = defaultMetadataKeyDto({armored_key: dto.public_key.armored_key});
      jest.spyOn(port, "request").mockReturnValue(metadataKeyDto);
      const metadataKey = await service.createKey(generatedKeyPair);
      expect(port.request).toHaveBeenCalledWith(METADATA_KEYS_CREATE_EVENT, dto);
      expect(metadataKey).toBeInstanceOf(MetadataKeyEntity);
      expect(metadataKey.armoredKey).toEqual(dto.public_key.armored_key);
    });

    it("throws if the given generated metadata key pair is not of type ExternalGpgKeyPairEntity.", async() => {
      expect.assertions(1);
      await expect(() => service.createKey(42)).rejects.toThrow(TypeError);
    });
  });

  describe("::share", () => {
    it("requests the service worker with the expected event.", async() => {
      expect.assertions(1);

      jest.spyOn(port, "request").mockReturnValue(() => {});
      const userId = uuidv4();

      await service.share(userId);

      expect(port.request).toHaveBeenCalledWith(METADATA_SHARE_METADATA_PRIVATE_KEYS_EVENT, userId);
    });
  });

  describe("::rotate", () => {
    it("requests the service worker with the expected event.", async() => {
      expect.assertions(1);

      const dto = {
        public_key: {
          armored_key: pgpKeys.eddsa_ed25519.public,
        },
        private_key: {
          armored_key: pgpKeys.eddsa_ed25519.private,
        },
      };
      const generatedKeyPair = new ExternalGpgKeyPairEntity(dto);
      const currentMetadataKeyId = uuidv4();

      jest.spyOn(port, "request").mockReturnValue(() => {});

      await service.rotate(generatedKeyPair, currentMetadataKeyId);

      expect(port.request).toHaveBeenCalledWith(METADATA_KEYS_ROTATE_EVENT, generatedKeyPair, currentMetadataKeyId);
    });
  });

  describe("::resumeRotation", () => {
    it("requests the service worker with the expected event.", async() => {
      expect.assertions(1);

      jest.spyOn(port, "request").mockReturnValue(() => {});
      const metadataKeyId = uuidv4();

      await service.resumeRotation(metadataKeyId);

      expect(port.request).toHaveBeenCalledWith(METADATA_KEYS_RESUME_ROTATE_EVENT, metadataKeyId);
    });
  });
});
