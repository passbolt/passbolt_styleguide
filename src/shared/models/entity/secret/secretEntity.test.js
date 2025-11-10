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
 * @since         2.13.0
 */
import SecretEntity from "./secretEntity";
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {SCENARIO_EMPTY} from "../../../../../test/assert/assertEntityProperty";
import {minimalDto, readSecret} from "./secretEntity.test.data";
import EntityValidationError from "../abstract/entityValidationError";
import {
  defaultSecretDataV5DefaultDto
} from "../secretData/secretDataV5DefaultEntity.test.data";
import SecretDataV5DefaultEntity
  from "../secretData/secretDataV5DefaultEntity";

describe("SecretEntity", () => {
  describe("SecretEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretEntity.name, SecretEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(SecretEntity, "id");
      assertEntityProperty.uuid(SecretEntity, "id");
      assertEntityProperty.notRequired(SecretEntity, "id");
    });

    it("validates user_id property", () => {
      assertEntityProperty.string(SecretEntity, "user_id");
      assertEntityProperty.uuid(SecretEntity, "user_id");
      assertEntityProperty.notRequired(SecretEntity, "user_id");
    });

    it("validates resource_id property", () => {
      assertEntityProperty.string(SecretEntity, "resource_id");
      assertEntityProperty.uuid(SecretEntity, "resource_id");
      assertEntityProperty.notRequired(SecretEntity, "resource_id");
    });

    it("validates secret_revision_id property", () => {
      assertEntityProperty.string(SecretEntity, "secret_revision_id");
      assertEntityProperty.uuid(SecretEntity, "secret_revision_id");
      assertEntityProperty.notRequired(SecretEntity, "secret_revision_id");
    });

    it("validates data property", () => {
      assertEntityProperty.string(SecretEntity, "data");
      // @todo the following empty, begin & end rules are not valid json schema valid.
      assertEntityProperty.assert(SecretEntity, "data", [], [SCENARIO_EMPTY], "empty");
      const failBeginScenario = [{scenario: "begin", value: " -----END PGP MESSAGE-----"}];
      assertEntityProperty.assert(SecretEntity, "data", [], failBeginScenario, "begin");
      const failEndScenario = [{scenario: "end", value: "-----BEGIN PGP MESSAGE----- "}];
      assertEntityProperty.assert(SecretEntity, "data", [], failEndScenario, "end");
      assertEntityProperty.required(SecretEntity, "data");
    });

    it("validates created property", () => {
      assertEntityProperty.string(SecretEntity, "created");
      assertEntityProperty.dateTime(SecretEntity, "created");
      assertEntityProperty.notRequired(SecretEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(SecretEntity, "modified");
      assertEntityProperty.dateTime(SecretEntity, "modified");
      assertEntityProperty.notRequired(SecretEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(SecretEntity, "created_by");
      assertEntityProperty.notRequired(SecretEntity, "created_by");
      assertEntityProperty.nullable(SecretEntity, "created_by");
    });

    it("validates modified_by property", () => {
      assertEntityProperty.uuid(SecretEntity, "modified_by");
      assertEntityProperty.notRequired(SecretEntity, "modified_by");
      assertEntityProperty.nullable(SecretEntity, "modified_by");
    });
  });

  describe("SecretEntity::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(1);

      const dto = minimalDto();
      const entity = new SecretEntity(dto);
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("constructor works if valid complete DTO is provided", () => {
      expect.assertions(1);

      const dto = readSecret();
      const entity = new SecretEntity(dto);
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("constructor should make sure `data` is a valid openpgp message", () => {
      expect.assertions(1);

      const dto = minimalDto({data: "wrong-format"});
      expect(() => new SecretEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::assertValidMessage", () => {
    it("should throw an error if the data is not a string", () => {
      expect.assertions(1);

      const expectedError = new EntityValidationError('This is not a valid OpenPGP armored message');
      expectedError.addError('data', 'empty', 'The OpenPGP armored message should not be empty.');

      expect(() => SecretEntity.assertValidMessage(42)).toThrow(expectedError);
    });

    it("should throw an error if the data is not a starting with the expected delimiter", () => {
      expect.assertions(1);

      const expectedError = new EntityValidationError('This is not a valid OpenPGP armored message');
      expectedError.addError('data', 'begin', 'The OpenPGP armored message should contain a start delimiter.');

      expect(() => SecretEntity.assertValidMessage("It's a string!")).toThrow(expectedError);
    });

    it("should throw an error if the data is not a ending with the expected delimiter", () => {
      expect.assertions(1);

      const expectedError = new EntityValidationError('This is not a valid OpenPGP armored message');
      expectedError.addError('data', 'begin', 'The OpenPGP armored message should contain a start delimiter.');

      expect(() => SecretEntity.assertValidMessage("-----BEGIN PGP MESSAGE-----")).toThrow(expectedError);
    });
  });

  describe("::getters", () => {
    it("should provide the right values when everything is set", () => {
      expect.assertions(5);

      const dto = readSecret();
      const entity = new SecretEntity(dto);

      expect(entity.id).toStrictEqual(dto.id);
      expect(entity.data).toStrictEqual(dto.data);
      expect(entity.userId).toStrictEqual(dto.user_id);
      expect(entity.resourceId).toStrictEqual(dto.resource_id);
      expect(entity.secretRevisionId).toStrictEqual(dto.secret_revision_id);
    });

    it("should provide the default values with minimal dto", () => {
      expect.assertions(4);

      const dto = minimalDto();
      const entity = new SecretEntity(dto);

      expect(entity.id).toBeNull();
      expect(entity.data).toStrictEqual(dto.data);
      expect(entity.userId).toBeNull();
      expect(entity.resourceId).toBeNull();
    });
  });

  describe("::setters", () => {
    describe("::data", () => {
      it("`data` could be set with a string", () => {
        expect.assertions(6);
        const dto = readSecret();
        const entity = new SecretEntity(dto);

        expect(entity.data).toStrictEqual(dto.data);
        expect(entity._data).toBeUndefined();

        entity.data = new SecretDataV5DefaultEntity(defaultSecretDataV5DefaultDto());
        expect(entity._data).toBeInstanceOf(SecretDataV5DefaultEntity);
        expect(entity._props.data).toBeUndefined();

        entity.data = dto.data;
        expect(entity._props.data).toStrictEqual(dto.data);
        expect(entity._data).toBeUndefined();
      });

      it("`data` should assert the parameter", () => {
        expect.assertions(1);
        const dto = readSecret();
        const entity = new SecretEntity(dto);

        expect(() => { entity.data = {test: "test"}; }).toThrow(TypeError);
      });
    });
  });

  describe("::isDataDecrypted", () => {
    it("should return false if the data is encrypted and true if the data is decrypted", () => {
      expect.assertions(2);

      const dto = readSecret();
      const entity = new SecretEntity(dto);
      expect(entity.isDataDecrypted).toBeFalsy();

      entity.data = new SecretDataV5DefaultEntity(defaultSecretDataV5DefaultDto());
      expect(entity.isDataDecrypted).toBeTruthy();
    });
  });
});

