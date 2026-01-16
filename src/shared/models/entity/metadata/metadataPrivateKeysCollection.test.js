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
import { defaultMetadataPrivateKeyDataDto } from "./metadataPrivateKeyDataEntity.test.data";
import MetadataPrivateKeyEntity from "./metadataPrivateKeyEntity";
import { defaultMetadataPrivateKeyDto } from "./metadataPrivateKeyEntity.test.data";
import MetadataPrivateKeysCollection from "./metadataPrivateKeysCollection";
import {
  defaultMetadataPrivateKeysDtos,
  defaultMinimalMetadataPrivateKeysDtos,
} from "./metadataPrivateKeysCollection.test.data";
import { v4 as uuidv4 } from "uuid";
import { pgpKeys } from "../../../../../test/fixture/pgpKeys/keys";

describe("MetadataPrivateKeysCollection", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataPrivateKeysCollection.name, MetadataPrivateKeysCollection.getSchema());
    });
  });

  describe("::constructor", () => {
    it("works with empty data", () => {
      expect.assertions(1);

      const collection = new MetadataPrivateKeysCollection([]);

      expect(collection).toHaveLength(0);
    });

    it("works if valid minimal DTO is provided", () => {
      expect.assertions(3);

      const dtos = defaultMinimalMetadataPrivateKeysDtos();
      dtos[0].user_id = uuidv4();
      dtos[1].user_id = uuidv4();
      const collection = new MetadataPrivateKeysCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0]._props.user_id).toEqual(dtos[0].user_id);
      expect(collection.items[1]._props.user_id).toEqual(dtos[1].user_id);
    });

    it("works if valid complete DTOs are provided", () => {
      expect.assertions(3);

      const dtos = defaultMetadataPrivateKeysDtos();
      const collection = new MetadataPrivateKeysCollection(dtos);

      expect(collection).toHaveLength(2);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
      expect(collection.items[1]._props.id).toEqual(dtos[1].id);
    });

    it("works if valid complete entities are provided", () => {
      expect.assertions(3);

      const dtos = defaultMetadataPrivateKeysDtos();
      const entity1 = new MetadataPrivateKeyEntity(dtos[0]);
      const entity2 = new MetadataPrivateKeyEntity(dtos[1]);

      const collection = new MetadataPrivateKeysCollection([entity1, entity2]);

      expect(collection).toHaveLength(2);
      expect(collection.items[0]._props.id).toEqual(entity1._props.id);
      expect(collection.items[1]._props.id).toEqual(entity2._props.id);
    });

    it("should throw if the collection schema does not validate", () => {
      expect.assertions(1);

      expect(() => new MetadataPrivateKeysCollection({})).toThrowEntityValidationError("items");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate their schema", () => {
      expect.assertions(2);

      const dtos = defaultMetadataPrivateKeysDtos();
      delete dtos[1].data;
      delete dtos[1].armored_key;

      const collection = new MetadataPrivateKeysCollection(dtos, { ignoreInvalidEntity: true });

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
    });

    it("should throw if one of data item does not validate the unique id build rule", () => {
      expect.assertions(1);

      const dtos = defaultMetadataPrivateKeysDtos();
      dtos[1].id = dtos[0].id;

      expect(() => new MetadataPrivateKeysCollection(dtos)).toThrowCollectionValidationError("1.id.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the unique id build rule", () => {
      expect.assertions(2);

      const dtos = defaultMetadataPrivateKeysDtos();
      dtos[1].id = dtos[0].id;

      const collection = new MetadataPrivateKeysCollection(dtos, { ignoreInvalidEntity: true });

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
    });

    it("should throw if one of data item does not validate the unique user_id build rule", () => {
      expect.assertions(1);

      const dtos = defaultMetadataPrivateKeysDtos();
      dtos[1].user_id = dtos[0].user_id;

      expect(() => new MetadataPrivateKeysCollection(dtos)).toThrowCollectionValidationError("1.user_id.unique");
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the unique user_id build rule", () => {
      expect.assertions(2);

      const dtos = defaultMetadataPrivateKeysDtos();
      dtos[1].user_id = dtos[0].user_id;

      const collection = new MetadataPrivateKeysCollection(dtos, { ignoreInvalidEntity: true });

      expect(collection.items).toHaveLength(1);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
    });

    it("should throw if one of data item does not validate the same_metadata_key build rule", () => {
      expect.assertions(1);

      const dtos = defaultMetadataPrivateKeysDtos();
      dtos[1].metadata_key_id = uuidv4();

      expect(() => new MetadataPrivateKeysCollection(dtos)).toThrowCollectionValidationError(
        "1.metadata_key_id.same_metadata_key",
      );
    });

    it("should not throw if the collection has many items without metadata_key_id", () => {
      expect.assertions(1);

      const dtos = defaultMetadataPrivateKeysDtos(4);
      delete dtos[0].metadata_key_id;
      delete dtos[3].metadata_key_id;

      const collection = new MetadataPrivateKeysCollection(dtos);

      expect(collection).toHaveLength(4);
    });

    it("should throw if the collection contains multiple items without metadata_key_id but has at least 2 items with different ids", () => {
      expect.assertions(1);

      const dtos = defaultMetadataPrivateKeysDtos(4);
      delete dtos[0].metadata_key_id;
      delete dtos[1].metadata_key_id;
      dtos[3].metadata_key_id = uuidv4();

      expect(() => new MetadataPrivateKeysCollection(dtos)).toThrowCollectionValidationError(
        "3.metadata_key_id.same_metadata_key",
      );
    });

    it("should, with enabling the ignore invalid option, ignore items which do not validate the unique same_metadata_key build rule", () => {
      expect.assertions(4);

      const dtos = defaultMetadataPrivateKeysDtos(4);
      dtos[2].metadata_key_id = uuidv4();

      const collection = new MetadataPrivateKeysCollection(dtos, { ignoreInvalidEntity: true });

      expect(collection.items).toHaveLength(3);
      expect(collection.items[0]._props.id).toEqual(dtos[0].id);
      expect(collection.items[1]._props.id).toEqual(dtos[1].id);
      expect(collection.items[2]._props.id).toEqual(dtos[3].id);
    });
  });

  describe("::hasDecryptedPrivateKeys", () => {
    it("should return true if at least 1 key in the collection is decrypted", () => {
      expect.assertions(1);

      const metadata_key_id = uuidv4();
      const data = defaultMetadataPrivateKeyDataDto();
      const dtos = [
        defaultMetadataPrivateKeyDto({ metadata_key_id }),
        defaultMetadataPrivateKeyDto({ metadata_key_id, data }),
      ];

      const collection = new MetadataPrivateKeysCollection(dtos);

      expect(collection.hasDecryptedPrivateKeys()).toStrictEqual(true);
    });

    it("should return false of none of the key in the collection is decrypted", () => {
      expect.assertions(1);

      const metadata_key_id = uuidv4();
      const dtos = [
        defaultMetadataPrivateKeyDto({ metadata_key_id }),
        defaultMetadataPrivateKeyDto({ metadata_key_id }),
      ];
      const collection = new MetadataPrivateKeysCollection(dtos);

      expect(collection.hasDecryptedPrivateKeys()).toStrictEqual(false);
    });

    it("should return false if the collection is empty", () => {
      expect.assertions(1);

      const collection = new MetadataPrivateKeysCollection([]);

      expect(collection.hasDecryptedPrivateKeys()).toStrictEqual(false);
    });
  });

  describe("::hasEncryptedPrivateKeys", () => {
    it("should return true if at least 1 key in the collection is encrypted", () => {
      expect.assertions(1);

      const metadata_key_id = uuidv4();
      const data = pgpKeys.metadataKey.encryptedMetadataPrivateKeyDataMessage;
      const dtos = [
        defaultMetadataPrivateKeyDto({ metadata_key_id }),
        defaultMetadataPrivateKeyDto({ metadata_key_id, data }),
      ];

      const collection = new MetadataPrivateKeysCollection(dtos);

      expect(collection.hasEncryptedPrivateKeys()).toStrictEqual(true);
    });

    it("should return false of none of the key in the collection is encrypted", () => {
      expect.assertions(1);

      const metadata_key_id = uuidv4();
      const data = defaultMetadataPrivateKeyDataDto();
      const dtos = [
        defaultMetadataPrivateKeyDto({ metadata_key_id, data }),
        defaultMetadataPrivateKeyDto({ metadata_key_id, data }),
      ];
      const collection = new MetadataPrivateKeysCollection(dtos);

      expect(collection.hasEncryptedPrivateKeys()).toStrictEqual(false);
    });

    it("should return false if the collection is empty", () => {
      expect.assertions(1);

      const collection = new MetadataPrivateKeysCollection([]);

      expect(collection.hasEncryptedPrivateKeys()).toStrictEqual(false);
    });
  });

  describe("::pushMany", () => {
    it("[performance] should ensure performance adding large dataset remains effective.", async () => {
      const count = 10_000;
      const dtos = defaultMetadataPrivateKeysDtos(count);

      const start = performance.now();
      const collection = new MetadataPrivateKeysCollection(dtos);
      const time = performance.now() - start;
      expect(collection).toHaveLength(count);
      expect(time).toBeLessThan(10_000);
    });
  });
});
