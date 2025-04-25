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
import MetadataPrivateKeyEntity from "./metadataPrivateKeyEntity";
import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {decryptedMetadataPrivateKeyDto, defaultMetadataPrivateKeyDto, minimalMetadataPrivateKeyDto} from "./metadataPrivateKeyEntity.test.data";
import EntityValidationError from "../abstract/entityValidationError";
import {defaultPgpMessage} from "../../../../../test/assert/assertEntityProperty.test.data";
import {defaultMetadataPrivateKeyDataDto} from "./metadataPrivateKeyDataEntity.test.data";
import MetadataPrivateKeyDataEntity from "./metadataPrivateKeyDataEntity";

describe("MetadataPrivateKeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataPrivateKeyEntity.name, MetadataPrivateKeyEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "id");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "id");
      assertEntityProperty.nullable(MetadataPrivateKeyEntity, "id");
    });

    it("validates metadata_key_id property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "metadata_key_id");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "metadata_key_id");
      assertEntityProperty.nullable(MetadataPrivateKeyEntity, "metadata_key_id");
    });

    it("validates user_id property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "user_id");
      assertEntityProperty.required(MetadataPrivateKeyEntity, "user_id");
      assertEntityProperty.nullable(MetadataPrivateKeyEntity, "user_id");
    });

    it("validates data_signed_by_current_user property", () => {
      /*
       * The marshall set the value to null and by the way the property will never fail
       * assertEntityProperty.string(MetadataPrivateKeyEntity, "data_signed_by_current_user");
       * assertEntityProperty.dateTime(MetadataPrivateKeyEntity, "data_signed_by_current_user");
       * assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "data_signed_by_current_user");
       */
      assertEntityProperty.nullable(MetadataPrivateKeyEntity, "data_signed_by_current_user");
    });

    it("validates data property", () => {
      assertEntityProperty.required(MetadataPrivateKeyEntity, "data");

      const dataStringSuccessScenarios = [
        {scenario: "PGP Message with comments in the header", value: defaultPgpMessage({withCrc: true, withComments: true})},
        {scenario: "PGP Message without comments in the header", value: defaultPgpMessage({withCrc: true, withComments: false})},
      ];
      for (let i = 0; i < dataStringSuccessScenarios.length; i++) {
        const scenario = dataStringSuccessScenarios[i];
        const dto = defaultMetadataPrivateKeyDto({data: scenario.value});

        expect(() => new MetadataPrivateKeyEntity(dto)).not.toThrow();
      }

      const dataStringFailScenarios = [
        {scenario: "PGP Message without CRC", value: defaultPgpMessage({withCrc: false})},
        {scenario: "PGP Message without CRC and multiple blocks", value: defaultPgpMessage({withCrc: false, withDuplicates: true})},
        {scenario: "PGP Message with wrong extra characters", value: defaultPgpMessage({withCrc: true, withWrongExtraCharacters: true})},
        {scenario: "PGP Message with wrong extra characters and multiple blocks", value: defaultPgpMessage({withCrc: true, withWrongExtraCharacters: true, withDuplicates: true})},
        {scenario: "PGP Message with comments in the header and multiple blocks", value: defaultPgpMessage({withCrc: true, withComments: true, withDuplicates: true})},
        {scenario: "PGP Message without comments in the header and multiple blocks", value: defaultPgpMessage({withCrc: true, withComments: false, withDuplicates: true})},
      ];
      for (let i = 0; i < dataStringFailScenarios.length; i++) {
        const scenario = dataStringFailScenarios[i];
        const dto = defaultMetadataPrivateKeyDto({data: scenario.value});

        expect(() => new MetadataPrivateKeyEntity(dto)).toThrow(EntityValidationError);
      }

      const dataObjectSuccessScenarios = [
        {scenario: "valid entity dto", value: defaultMetadataPrivateKeyDataDto()},
      ];
      for (let i = 0; i < dataObjectSuccessScenarios.length; i++) {
        const scenario = dataObjectSuccessScenarios[i];
        const dto = defaultMetadataPrivateKeyDto({data: scenario.value});

        expect(() => new MetadataPrivateKeyEntity(dto)).not.toThrow();
      }

      const dataObjectFailScenarios = [
        {scenario: "invalid entity object", value: {}},
        {scenario: "integer", value: 42},
        {scenario: "boolean", value: false},
      ];
      for (let i = 0; i < dataObjectFailScenarios.length; i++) {
        const scenario = dataObjectFailScenarios[i];
        const dto = defaultMetadataPrivateKeyDto({data: scenario.value});

        expect(() => new MetadataPrivateKeyEntity(dto)).toThrow(EntityValidationError);
      }
    });

    it("validates created property", () => {
      assertEntityProperty.string(MetadataPrivateKeyEntity, "created");
      assertEntityProperty.dateTime(MetadataPrivateKeyEntity, "created");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(MetadataPrivateKeyEntity, "modified");
      assertEntityProperty.dateTime(MetadataPrivateKeyEntity, "modified");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "created_by");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(MetadataPrivateKeyEntity, "modified_by");
      assertEntityProperty.notRequired(MetadataPrivateKeyEntity, "modified_by");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(9);
      const dto = minimalMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity._props.id).toBeUndefined();
      expect(entity._props.metadata_key_id).toBeUndefined();
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.data).toStrictEqual(dto.data);
      expect(entity._props.data_signed_by_current_user).toBeUndefined();
      expect(entity._props.created).toBeUndefined();
      expect(entity._props.created_by).toBeUndefined();
      expect(entity._props.modified).toBeUndefined();
      expect(entity._props.modified_by).toBeUndefined();
    });

    it("constructor works if valid DTO is provided: with data", () => {
      expect.assertions(9);
      const dto = defaultMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.metadata_key_id).toStrictEqual(dto.metadata_key_id);
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.data).toStrictEqual(dto.data);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
      expect(entity._props.data_signed_by_current_user).toBeNull();
    });

    it("constructor works if valid DTO is provided: with armored_key", () => {
      expect.assertions(8);
      const dto = defaultMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.metadata_key_id).toStrictEqual(dto.metadata_key_id);
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.data).toStrictEqual(dto.data);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
      expect(entity._props.modified_by).toStrictEqual(dto.modified_by);
    });

    it("constructor fails if both data and the decrypted data (_data) are given", () => {
      expect.assertions(1);
      const entity = new MetadataPrivateKeyEntity(defaultMetadataPrivateKeyDto());
      entity._data = defaultMetadataPrivateKeyDataDto();

      expect(() => entity.validateBuildRules()).toThrowEntityValidationError("data", "only-one-defined");
    });
  });

  describe("::getters", () => {
    it("`metadataKeyId` should return the right value", () => {
      expect.assertions(2);
      const dto1 = minimalMetadataPrivateKeyDto();
      const entity1 = new MetadataPrivateKeyEntity(dto1);

      const dto2 = defaultMetadataPrivateKeyDto();
      const entity2 = new MetadataPrivateKeyEntity(dto2);

      expect(entity1.metadataKeyId).toBeNull();
      expect(entity2.metadataKeyId).toStrictEqual(dto2.metadata_key_id);
    });

    it("`id` should return the right value", () => {
      expect.assertions(2);
      const dto1 = minimalMetadataPrivateKeyDto({
        id: null
      });
      const entity1 = new MetadataPrivateKeyEntity(dto1);

      const dto2 = defaultMetadataPrivateKeyDto();
      const entity2 = new MetadataPrivateKeyEntity(dto2);

      expect(entity1.id).toBeNull();
      expect(entity2.id).toStrictEqual(dto2.id);
    });

    it("`data` should return the right value: with string", () => {
      expect.assertions(1);
      const dto = defaultMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.data).toStrictEqual(dto.data);
    });

    it("`data` should return the right value: with a MetadataPrivateKeyDataEntity", () => {
      expect.assertions(2);
      const dto = defaultMetadataPrivateKeyDto({
        data: defaultMetadataPrivateKeyDataDto()
      });
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.data).toBeInstanceOf(MetadataPrivateKeyDataEntity);
      expect(entity.data.toDto()).toStrictEqual(dto.data);
    });

    it("`userId` should return the right value", () => {
      expect.assertions(2);
      const dto1 = minimalMetadataPrivateKeyDto();
      const entity1 = new MetadataPrivateKeyEntity(dto1);

      const dto2 = defaultMetadataPrivateKeyDto();
      const entity2 = new MetadataPrivateKeyEntity(dto2);

      expect(entity1.userId).toBeNull();
      expect(entity2.userId).toStrictEqual(dto2.user_id);
    });

    it("`data_signed_by_current_user` should null if not set", () => {
      expect.assertions(1);
      const dto = minimalMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.isDataSignedByCurrentUser).toBeNull();
    });

    it("`data_signed_by_current_user` should the right value", () => {
      expect.assertions(1);
      const dto = minimalMetadataPrivateKeyDto();

      const entity = new MetadataPrivateKeyEntity(dto);
      entity.isDataSignedByCurrentUser = "2022-10-11T08:09:00+00:00";

      expect(entity.isDataSignedByCurrentUser).toBeTruthy();
    });
  });

  describe("::setters", () => {
    describe("::data", () => {
      it("`data` could be set with a string", () => {
        expect.assertions(6);
        const dto = defaultMetadataPrivateKeyDto();
        const entity = new MetadataPrivateKeyEntity(dto);

        expect(entity.data).toStrictEqual(dto.data);
        expect(entity._data).toBeUndefined();

        entity.data = new MetadataPrivateKeyDataEntity(defaultMetadataPrivateKeyDataDto());
        expect(entity._data).toBeInstanceOf(MetadataPrivateKeyDataEntity);
        expect(entity._props.data).toBeUndefined();

        const pgpMessage = defaultPgpMessage();
        entity.data = pgpMessage;
        expect(entity._props.data).toStrictEqual(pgpMessage);
        expect(entity._data).toBeUndefined();
      });

      it("`data` should assert the parameter", () => {
        expect.assertions(1);
        const entity = new MetadataPrivateKeyEntity(defaultMetadataPrivateKeyDto());

        expect(() => { entity.isDataSignedByCurrentUser = "test"; }).toThrow(EntityValidationError);
      });

      it("`data_signed_by_current_user` could be set with a date", () => {
        expect.assertions(1);
        const dto = defaultMetadataPrivateKeyDto();
        const entity = new MetadataPrivateKeyEntity(dto);

        entity.isDataSignedByCurrentUser = "2022-10-11T08:09:00+00:00";

        expect(entity.isDataSignedByCurrentUser).toBeTruthy();
      });

      it("`data_signed_by_current_user` could be set with a null", () => {
        expect.assertions(1);
        const dto = defaultMetadataPrivateKeyDto();
        const entity = new MetadataPrivateKeyEntity(dto);

        expect(entity.isDataSignedByCurrentUser).toBe(null);
      });

      it("`data_signed_by_current_user` should assert the parameter", () => {
        expect.assertions(1);
        const entity = new MetadataPrivateKeyEntity(defaultMetadataPrivateKeyDto());

        expect(() => { entity.isDataSignedByCurrentUser = "test"; }).toThrow(EntityValidationError);
      });
    });
  });

  describe("::isDecrypted", () => {
    it("should return true if the data is decrypted", () => {
      expect.assertions(1);

      const dto = decryptedMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.isDecrypted).toStrictEqual(true);
    });

    it("should return false if the data is encrypted", () => {
      expect.assertions(1);

      const dto = defaultMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.isDecrypted).toStrictEqual(false);
    });
  });

  describe("::toDto", () => {
    it("should export all fields from props: with data encrypted", () => {
      expect.assertions(1);

      const dto = defaultMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("should export all fields from props: with data decrypted", () => {
      expect.assertions(1);

      const dto = decryptedMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.toDto()).toStrictEqual(dto);
    });
  });

  describe("::toContentCodeConfirmTrustRequestDto", () => {
    it("should export all fields from props except data encrypted", () => {
      expect.assertions(1);

      const dto = defaultMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);
      delete dto.data;

      expect(entity.toContentCodeConfirmTrustRequestDto()).toStrictEqual(dto);
    });

    it("should export all fields from props except data decrypted", () => {
      expect.assertions(1);

      const dto = decryptedMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);
      delete dto.data;

      expect(entity.toContentCodeConfirmTrustRequestDto()).toStrictEqual(dto);
    });
  });

  describe("::toDataDto", () => {
    it("should export the data field", () => {
      expect.assertions(1);

      const dto = defaultMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      expect(entity.toDataDto()).toStrictEqual({data: dto.data});
    });
  });

  describe("::toJSON", () => {
    it("should export all fields from props: with data encrypted", () => {
      expect.assertions(1);

      const dto = defaultMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      const parsedData = JSON.parse(JSON.stringify(entity));

      expect(parsedData).toStrictEqual(dto);
    });

    it("should export all fields from props: with data decrypted", () => {
      expect.assertions(1);

      const dto = decryptedMetadataPrivateKeyDto();
      const entity = new MetadataPrivateKeyEntity(dto);

      const parsedData = JSON.parse(JSON.stringify(entity));

      expect(parsedData).toStrictEqual(dto);
    });
  });
});
