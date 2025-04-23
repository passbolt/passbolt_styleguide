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
import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {decryptedMetadataPrivateKeyDto, defaultMetadataPrivateKeyDto} from "./metadataPrivateKeyEntity.test.data";
import MetadataKeyEntity from "./metadataKeyEntity";
import {defaultMetadataKeyDto, minimalMetadataKeyDto} from "./metadataKeyEntity.test.data";
import MetadataPrivateKeysCollection from "./metadataPrivateKeysCollection";
import {v4 as uuidv4} from "uuid";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";
import EntityValidationError from "../abstract/entityValidationError";

describe("MetadataKeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataKeyEntity.name, MetadataKeyEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(MetadataKeyEntity, "id");
      assertEntityProperty.notRequired(MetadataKeyEntity, "id");
      assertEntityProperty.nullable(MetadataKeyEntity, "id");
    });

    it("validates fingerprint property", () => {
      assertEntityProperty.fingerprint(MetadataKeyEntity, "fingerprint");
      assertEntityProperty.string(MetadataKeyEntity, "fingerprint");
      assertEntityProperty.required(MetadataKeyEntity, "fingerprint");
    });

    it("validates armored_key property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "armored_key");
      assertEntityProperty.required(MetadataKeyEntity, "armored_key");
      assertEntityProperty.maxLength(MetadataKeyEntity, "armored_key", 10_000);
      assertEntityProperty.armoredPublicKey(MetadataKeyEntity, "armored_key");
    });

    it("validates created property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "created");
      assertEntityProperty.dateTime(MetadataKeyEntity, "created");
      assertEntityProperty.notRequired(MetadataKeyEntity, "created");
      assertEntityProperty.nullable(MetadataKeyEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "modified");
      assertEntityProperty.dateTime(MetadataKeyEntity, "modified");
      assertEntityProperty.notRequired(MetadataKeyEntity, "modified");
      assertEntityProperty.nullable(MetadataKeyEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(MetadataKeyEntity, "created_by");
      assertEntityProperty.notRequired(MetadataKeyEntity, "created_by");
      assertEntityProperty.nullable(MetadataKeyEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(MetadataKeyEntity, "modified_by");
      assertEntityProperty.notRequired(MetadataKeyEntity, "modified_by");
      assertEntityProperty.nullable(MetadataKeyEntity, "modified_by");
    });

    it("validates deleted property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "deleted");
      assertEntityProperty.dateTime(MetadataKeyEntity, "deleted");
      assertEntityProperty.notRequired(MetadataKeyEntity, "deleted");
      assertEntityProperty.nullable(MetadataKeyEntity, "deleted");
    });

    it("validates expired property", () => {
      assertEntityProperty.string(MetadataKeyEntity, "expired");
      assertEntityProperty.dateTime(MetadataKeyEntity, "expired");
      assertEntityProperty.notRequired(MetadataKeyEntity, "expired");
      assertEntityProperty.nullable(MetadataKeyEntity, "expired");
    });

    it("validates metadata_private_keys property", () => {
      const metadataKeyDto = defaultMetadataKeyDto();
      const successScenarios = [
        {scenario: "a valid option", value: [defaultMetadataPrivateKeyDto({metadata_key_id: metadataKeyDto.id})]},
      ];
      const failScenarios = [
        {scenario: "with invalid metadata private key build rule", value: defaultMetadataPrivateKeyDto()},
      ];
      assertEntityProperty.assertAssociation(MetadataKeyEntity, "metadata_private_keys", metadataKeyDto, successScenarios, failScenarios);
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(10);
      const dto = minimalMetadataKeyDto();
      const entity = new MetadataKeyEntity(dto);

      expect(entity._props.id).toBeUndefined();
      expect(entity._props.fingerprint).toStrictEqual(dto.fingerprint);
      expect(entity._props.armored_key).toStrictEqual(dto.armored_key);
      expect(entity._props.created).toBeUndefined();
      expect(entity._props.created_by).toBeUndefined();
      expect(entity._props.modified).toBeUndefined();
      expect(entity._props.modified_by).toBeUndefined();
      expect(entity._props.deleted).toBeUndefined();
      expect(entity._props.expired).toBeUndefined();
      expect(entity._props.metadata_private_keys).toBeUndefined();
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(11);
      const dto = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
      const entity = new MetadataKeyEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.fingerprint).toStrictEqual(dto.fingerprint);
      expect(entity._props.armored_key).toStrictEqual(dto.armored_key);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
      expect(entity._props.deleted).toStrictEqual(dto.deleted);
      expect(entity._props.expired).toStrictEqual(dto.expired);
      expect(entity._props.metadata_private_keys).toBeUndefined();
      expect(entity._metadata_private_keys).toStrictEqual(new MetadataPrivateKeysCollection(dto.metadata_private_keys));
    });

    it("constructor throw an error if the id and the private metadata key ids are different", () => {
      expect.assertions(1);
      const dto = defaultMetadataKeyDto({metadata_private_keys: [defaultMetadataPrivateKeyDto()]});
      expect(() => new MetadataKeyEntity(dto)).toThrowEntityValidationError("id:metadata_private_keys", "same_id");
    });
  });

  describe("::getters", () => {
    it("`created` should return the right value", () => {
      expect.assertions(2);
      const dto1 = minimalMetadataKeyDto();
      const entity1 = new MetadataKeyEntity(dto1);

      const dto2 = defaultMetadataKeyDto({created: "2024-10-05T12:10:00+00:00"});
      const entity2 = new MetadataKeyEntity(dto2);

      expect(entity1.created).toBeNull();
      expect(entity2.created).toStrictEqual(dto2.created);
    });

    it("`metadataPrivateKeys` should return the right value", () => {
      expect.assertions(2);
      const dto1 = minimalMetadataKeyDto();
      const entity1 = new MetadataKeyEntity(dto1);

      const dto2 = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
      const entity2 = new MetadataKeyEntity(dto2);

      expect(entity1.metadataPrivateKeys).toBeNull();
      expect(entity2.metadataPrivateKeys).toStrictEqual(new MetadataPrivateKeysCollection(dto2.metadata_private_keys));
    });

    it("`id` should return the right value", () => {
      expect.assertions(1);
      const id = uuidv4();
      const dto1 = minimalMetadataKeyDto({id: id});
      const entity1 = new MetadataKeyEntity(dto1);

      expect(entity1.id).toStrictEqual(id);
    });

    it("`armoredKey` should return the right value", () => {
      expect.assertions(1);
      const armoredKey = pgpKeys.metadataKey.public;
      const dto1 = minimalMetadataKeyDto({armored_key: armoredKey});
      const entity1 = new MetadataKeyEntity(dto1);

      expect(entity1.armoredKey).toStrictEqual(armoredKey);
    });

    it("`fingerprint` should return the right value", () => {
      expect.assertions(1);
      const dto1 = minimalMetadataKeyDto();
      const entity1 = new MetadataKeyEntity(dto1);

      expect(entity1.fingerprint).toStrictEqual(dto1.fingerprint);
    });

    it("`expired` should return the right value", () => {
      expect.assertions(3);
      const dto1 = minimalMetadataKeyDto();
      const entity1 = new MetadataKeyEntity(dto1);
      expect(entity1.expired).toBeNull();
      const dto2 = minimalMetadataKeyDto({expired: null});
      const entity2 = new MetadataKeyEntity(dto2);
      expect(entity2.expired).toBeNull();
      const dto3 = minimalMetadataKeyDto({expired: "2022-10-11T08:09:00+00:00"});
      const entity3 = new MetadataKeyEntity(dto3);
      expect(entity3.expired).toStrictEqual(dto3.expired);
    });
  });
  describe("::toDto", () => {
    it("minimal to dto", () => {
      expect.assertions(5);
      // minimal set with the data property
      const dto1 = minimalMetadataKeyDto({});
      const entity1 = new MetadataKeyEntity(dto1);
      expect(entity1.toDto()).toEqual(dto1);
      // all properties but no association
      const dto3 = defaultMetadataKeyDto();
      const entity3 = new MetadataKeyEntity(dto3);
      expect(entity3.toDto()).toEqual(dto3);
      // all properties and all associations
      const dto4 = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
      const entity4 = new MetadataKeyEntity(dto4);
      expect(entity4.toDto()).not.toEqual(dto4);
      expect(entity4.toDto()).toEqual({...dto4, "metadata_private_keys": undefined});
      // all properties and all associations with contain metdata private keys
      const dto5 = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
      const entity5 = new MetadataKeyEntity(dto5);
      expect(entity5.toDto({metadata_private_keys: true})).toEqual(dto5);
    });

    it("contains metadata private keys", () => {
      expect.assertions(1);
      const dto = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
      const entity = new MetadataKeyEntity(dto);
      expect(entity.toDto({metadata_private_keys: true})).toEqual(dto);
    });
  });

  describe("::toContentCodeConfirmTrustRequestDto", () => {
    it("contains metadata private keys without data", () => {
      expect.assertions(1);
      const dto = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
      const entity = new MetadataKeyEntity(dto);
      dto.metadata_private_keys.forEach(privateKey => delete privateKey.data);
      expect(entity.toContentCodeConfirmTrustRequestDto()).toEqual(dto);
    });
  });

  describe("::assertFingerprintPublicAndPrivateKeysMatch", () => {
    it("should return if private key is not decrypted", () => {
      expect.assertions(1);

      const dto = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
      const entity = new MetadataKeyEntity(dto);

      expect(() => entity.assertFingerprintPublicAndPrivateKeysMatch()).not.toThrow();
    });

    it("should return if no private keys are set", () => {
      expect.assertions(1);

      const dto = defaultMetadataKeyDto({});
      const entity = new MetadataKeyEntity(dto);

      expect(() => entity.assertFingerprintPublicAndPrivateKeysMatch()).not.toThrow();
    });

    it("should throw an error if fingerprint does not match between public key and private keys", () => {
      expect.assertions(2);
      const metadataKeyId =  uuidv4();
      const dto = defaultMetadataKeyDto({
        id: metadataKeyId,
        fingerprint: "1039097B2E1D31979FF662502714A820FAEF4FF3",
        metadata_private_keys: [decryptedMetadataPrivateKeyDto({metadata_key_id: metadataKeyId})]
      });
      const entity = new MetadataKeyEntity(dto);

      try {
        entity.assertFingerprintPublicAndPrivateKeysMatch();
      } catch (error) {
        const entityValidationError = new EntityValidationError();
        entityValidationError.addError('metadata_private_keys.0.fingerprint', 'fingerprint_match', 'The fingerprint of the metadata private key does not match the fingerprint of the metadata public key');

        expect(error).toBeInstanceOf(EntityValidationError);
        expect(error).toEqual(entityValidationError);
      }
    });

    it("should succeed if fingerprint match between public key and private keys", () => {
      expect.assertions(1);
      const metadataKeyId =  uuidv4();
      const dto = defaultMetadataKeyDto({
        id: metadataKeyId,
        fingerprint: pgpKeys.metadataKey.fingerprint,
        metadata_private_keys: [decryptedMetadataPrivateKeyDto({metadata_key_id: metadataKeyId})]
      });
      const entity = new MetadataKeyEntity(dto);

      expect(() => entity.assertFingerprintPublicAndPrivateKeysMatch()).not.toThrow();
    });
  });
});
