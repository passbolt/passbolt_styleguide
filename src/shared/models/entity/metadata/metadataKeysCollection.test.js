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
 * @since         4.10.0
 */
import EntitySchema from "../abstract/entitySchema";
import MetadataKeyEntity from "./metadataKeyEntity";
import {defaultMetadataKeyDto} from "./metadataKeyEntity.test.data";
import MetadataKeysCollection from "./metadataKeysCollection";
import {
  defaultDecryptedSharedMetadataKeysDtos,
  defaultMetadataKeysDtos,
  defaultMinimalMetadataKeysDtos
} from "./metadataKeysCollection.test.data";
import {defaultMetadataPrivateKeyDataDto} from "./metadataPrivateKeyDataEntity.test.data";
import {defaultMetadataPrivateKeyDto} from "./metadataPrivateKeyEntity.test.data";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";

describe("MetadataKeysCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataKeysCollection.name, MetadataKeysCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);

      const collection = new MetadataKeysCollection([]);

      expect(collection).toHaveLength(0);
    });

    it("works if valid minimal DTO is provided", () => {
      expect.assertions(3);

      const dtos = defaultMinimalMetadataKeysDtos();
      const collection = new MetadataKeysCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0]._props.fingerprint).toEqual(dtos[0].fingerprint);
      expect(collection.items[1]._props.fingerprint).toEqual(dtos[1].fingerprint);
    });

    it("works if valid complete DTOs are provided", () => {
      expect.assertions(3);

      const dtos = defaultMetadataKeysDtos();
      const collection = new MetadataKeysCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
      expect(collection.items[1]._props.id).toEqual(dtos[1].id);
    });

    it("works if valid complete entities are provided", () => {
      expect.assertions(3);

      const dtos = defaultMetadataKeysDtos();
      const entity1 = new MetadataKeyEntity(dtos[0]);
      const entity2 = new MetadataKeyEntity(dtos[1]);

      const collection = new MetadataKeysCollection([entity1, entity2]);

      expect(collection).toHaveLength(2);
      expect(collection.items[0]._props.id).toEqual(entity1._props.id);
      expect(collection.items[1]._props.id).toEqual(entity2._props.id);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);

      expect(() => new MetadataKeysCollection({}))
        .toThrowEntityValidationError("items");
    });

    it("should throw if one of data item does not validate the unique id build rule", () => {
      expect.assertions(1);

      const dtos = defaultMetadataKeysDtos();
      dtos[1].id = dtos[0].id;

      expect(() => new MetadataKeysCollection(dtos))
        .toThrowCollectionValidationError("1.id.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the unique id build rule", () => {
      expect.assertions(2);

      const dtos = defaultMetadataKeysDtos();
      dtos[1].id = dtos[0].id;

      const collection = new MetadataKeysCollection(dtos, {ignoreInvalidEntity: true});

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
    });

    it("should throw if one of data item does not validate the collection entity schema", () => {
      expect.assertions(1);

      const dtos = defaultMetadataKeysDtos(2, {fingerprint: "abcd".repeat(10)});

      expect(() => new MetadataKeysCollection(dtos))
        .toThrowCollectionValidationError("1.fingerprint.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate their schema", () => {
      expect.assertions(2);

      const dtos = defaultMetadataKeysDtos(2, {fingerprint: "abcd".repeat(10)});

      const collection = new MetadataKeysCollection(dtos, {ignoreInvalidEntity: true});

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
    });

    it("should not throw if the collection has many items without metadata_key_id", () => {
      expect.assertions(1);

      const dtos = defaultMetadataKeysDtos(4);
      delete dtos[0].metadata_key_id;
      delete dtos[3].metadata_key_id;

      const collection = new MetadataKeysCollection(dtos);

      expect(collection).toHaveLength(4);
    });
  });

  describe("::getFirstByLatestCreated", () => {
    it("should return the sole element in the list", () => {
      expect.assertions(1);

      const dtos = [defaultMetadataKeyDto({})];

      const collection = new MetadataKeysCollection(dtos);

      expect(collection.getFirstByLatestCreated()._props.id).toStrictEqual(dtos[0].id);
    });

    it("should return the latest created key from the collection", () => {
      expect.assertions(1);

      const dtos = defaultMetadataKeysDtos(4);
      dtos[0].created = "2024-10-01T12:10:00+00:00";
      dtos[1].created = "2024-10-05T12:10:00+00:00";
      dtos[2].created = "2024-10-03T12:10:00+00:00";
      dtos[3].created = "2024-10-04T12:10:00+00:00";

      const collection = new MetadataKeysCollection(dtos);

      expect(collection.getFirstByLatestCreated()._props.id).toStrictEqual(dtos[1].id);
    });

    it("should ignore the key with null creation date if there are other keys with a date set", () => {
      expect.assertions(1);

      const dtos = defaultMetadataKeysDtos(4);
      delete dtos[0].created;
      dtos[1].created = "2024-10-05T12:10:00+00:00";
      dtos[2].created = "2024-10-03T12:10:00+00:00";
      dtos[3].created = "2024-10-04T12:10:00+00:00";

      const collection = new MetadataKeysCollection(dtos);

      expect(collection.getFirstByLatestCreated()._props.id).toStrictEqual(dtos[1].id);
    });

    it("should return the last key in the list if no creation date is available", () => {
      expect.assertions(1);

      const dtos = defaultMetadataKeysDtos(4);
      delete dtos[0].created;
      delete dtos[1].created;
      delete dtos[2].created;
      delete dtos[3].created;

      const collection = new MetadataKeysCollection(dtos);

      expect(collection.getFirstByLatestCreated()._props.id).toStrictEqual(dtos[3].id);
    });

    it("should return null if no key is in the collection", () => {
      expect.assertions(1);

      const collection = new MetadataKeysCollection([]);

      expect(collection.getFirstByLatestCreated()).toBeNull();
    });
  });

  describe("::hasDecryptedKeys", () => {
    it("should return false if the collection has not metadata private keys", () => {
      expect.assertions(1);

      const dtos = [
        defaultMetadataKeyDto(),
      ];
      const collection = new MetadataKeysCollection(dtos);

      expect(collection.hasDecryptedKeys()).toStrictEqual(false);
    });

    it("should return true if none of the items has an encrypted metadata private key", () => {
      expect.assertions(1);

      const metadataKeyDto = defaultMetadataKeyDto();
      const keyData = defaultMetadataPrivateKeyDataDto();
      metadataKeyDto.metadata_private_keys = [defaultMetadataPrivateKeyDto({metadata_key_id: metadataKeyDto.id, data: keyData})];
      const dtos = [metadataKeyDto];
      const collection = new MetadataKeysCollection(dtos);

      expect(collection.hasDecryptedKeys()).toStrictEqual(true);
    });

    it("should return false if none of the items has an encrypted metadata private key", () => {
      expect.assertions(1);

      const collection = new MetadataKeysCollection(defaultMetadataKeysDtos({}, {withMetadataPrivateKeys: true}));

      expect(collection.hasDecryptedKeys()).toStrictEqual(false);
    });
  });

  describe("::hasEncryptedKeys", () => {
    it("should return false if the collection has not metadata private keys", () => {
      expect.assertions(1);

      const dtos = [
        defaultMetadataKeyDto(),
      ];
      const collection = new MetadataKeysCollection(dtos);

      expect(collection.hasEncryptedKeys()).toStrictEqual(false);
    });

    it("should return false if none of the items has an encrypted metadata private key", () => {
      expect.assertions(1);

      const dtos = defaultMetadataKeysDtos();
      const collection = new MetadataKeysCollection(dtos);

      expect(collection.hasEncryptedKeys()).toStrictEqual(false);
    });

    it("should return true if one of the items has an encrypted metadata private key", () => {
      expect.assertions(1);

      const dtos = defaultDecryptedSharedMetadataKeysDtos();
      dtos[0].metadata_private_keys[0].data = pgpKeys.metadataKey.encryptedMetadataPrivateKeyDataMessage;
      const collection = new MetadataKeysCollection(dtos);

      expect(collection.hasEncryptedKeys()).toStrictEqual(true);
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async() => {
      const count = 10_000;
      const dtos = defaultMetadataKeysDtos(count);

      const start = performance.now();
      const collection = new MetadataKeysCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(10_000);
    });
  });
});
