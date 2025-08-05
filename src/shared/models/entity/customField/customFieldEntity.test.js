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
import CustomFieldEntity from "./customFieldEntity";
import {customFieldWithAllInMetadata, customFieldWithAllInSecret, defaultCustomField, emptyCustomFieldDto} from "./customFieldEntity.test.data";
import {isUUID} from "validator";
import {v4 as uuidv4} from "uuid";

describe("CustomFieldEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(CustomFieldEntity.name, CustomFieldEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(CustomFieldEntity, "id");
      assertEntityProperty.required(CustomFieldEntity, "id");
      assertEntityProperty.notNullable(CustomFieldEntity, "id");
    });

    it("validates type property", () => {
      const successScenarios = [
        "text",
        "password",
        "boolean",
        "number",
        "uri"
      ];

      const failScenarios = [
        "https://www.passbolt.com",
        "string",
      ];

      assertEntityProperty.enumeration(CustomFieldEntity, "type", successScenarios, failScenarios);
      assertEntityProperty.required(CustomFieldEntity, "type");
      assertEntityProperty.notNullable(CustomFieldEntity, "type");
    });

    it("validates metadata_key property", () => {
      assertEntityProperty.string(CustomFieldEntity, "metadata_key");
      assertEntityProperty.nullable(CustomFieldEntity, "metadata_key");
      assertEntityProperty.maxLength(CustomFieldEntity, "metadata_key", 255);
    });

    it("validates secret_key property", () => {
      assertEntityProperty.string(CustomFieldEntity, "secret_key");
      assertEntityProperty.nullable(CustomFieldEntity, "secret_key");
      assertEntityProperty.maxLength(CustomFieldEntity, "secret_key", 255);
    });

    it("validates metadata_value property", () => {
      const successScenarios = [
        {scenario: "a valid string value", value: "string value"},
        {scenario: "a valid number value", value: 42},
        {scenario: "a valie boolean value", value: true},
      ];

      const failScenarios = [
        {scenario: "an invalid array", value: ["array"]},
        {scenario: "an invalid object", value: {object: "object"}},
      ];

      assertEntityProperty.assert(CustomFieldEntity, "metadata_value", successScenarios, failScenarios, "type");
      assertEntityProperty.nullable(CustomFieldEntity, "metadata_value");
    });

    it("validates secret_value property", () => {
      const successScenarios = [
        {scenario: "a valid string value", value: "string value"},
        {scenario: "a valid number value", value: 42},
        {scenario: "a valie boolean value", value: true},
      ];

      const failScenarios = [
        {scenario: "an invalid array", value: ["array"]},
        {scenario: "an invalid object", value: {object: "object"}},
      ];

      assertEntityProperty.assert(CustomFieldEntity, "secret_value", successScenarios, failScenarios, "type");
      assertEntityProperty.nullable(CustomFieldEntity, "secret_value");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(6);
      const dto = defaultCustomField();
      const entity = new CustomFieldEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.type).toStrictEqual(dto.type);
      expect(entity._props.metadata_key).toStrictEqual(dto.metadata_key);
      expect(entity._props.metadata_value).toStrictEqual(dto.metadata_value);
      expect(entity._props.secret_key).toStrictEqual(dto.secret_key);
      expect(entity._props.secret_value).toStrictEqual(dto.secret_value);
    });

    it("validateBuildRules: both metadata key and secret key defined", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        metadata_key: "key",
        secret_key: "key",
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: both metadata value and secret value defined", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        metadata_value: "value",
        secret_value: "value",
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: forbidden mix secret_key + metadata_value", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        metadata_value: "value",
        secret_key: "value",
      });
      delete dto?.metadata_key;
      delete dto?.secret_value_key;

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: type is not matching value type for text", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        type: "text",
        secret_value: 42,
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: type is not matching value type for password", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        type: "password",
        secret_value: 42,
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: type is not matching value type for number", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        type: "number",
        secret_value: "42",
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: type is not matching value type for boolean", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        type: "boolean",
        secret_value: "test",
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });


    it("validateBuildRules: type is not matching value type for uri", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        type: "uri",
        secret_value: 42,
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: text exceed maxLength", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        type: "text",
        secret_value: "a".repeat(20001),
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: password exceed maxLength", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        type: "password",
        secret_value: "a".repeat(4097),
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });
  });

  describe("::getters", () => {
    it("::key (from secret_key) ", () => {
      expect.assertions(1);

      const dto = customFieldWithAllInSecret();
      const entity = new CustomFieldEntity(dto);

      expect(entity.key).toStrictEqual(dto.secret_key);
    });

    it("::key (from metadata_key) ", () => {
      expect.assertions(1);

      const dto = customFieldWithAllInMetadata();
      const entity = new CustomFieldEntity(dto);

      expect(entity.key).toStrictEqual(dto.metadata_key);
    });

    it("::value (from secret_value) ", () => {
      expect.assertions(1);
      const dto = defaultCustomField();
      const entity = new CustomFieldEntity(dto);
      expect(entity.value).toStrictEqual(dto.secret_value);
    });

    it("::value (from metadata_value) ", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        metadata_value: 'Value',
      });
      delete dto.secret_value;

      const entity = new CustomFieldEntity(dto);
      expect(entity.value).toStrictEqual(dto.metadata_value);
    });
  });

  describe("::areFieldsDifferent", () => {
    it("returns false if all props are similar", () => {
      expect.assertions(1);
      const dto = defaultCustomField();
      const entity = new CustomFieldEntity(dto);
      expect(CustomFieldEntity.areFieldsDifferent(entity, entity)).toStrictEqual(false);
    });

    it("returns true if ids are different", () => {
      expect.assertions(1);
      const dtoA = defaultCustomField();
      const dtoB = defaultCustomField();
      const entityA = new CustomFieldEntity(dtoA);
      const entityB = new CustomFieldEntity(dtoB);
      expect(CustomFieldEntity.areFieldsDifferent(entityA, entityB)).toStrictEqual(true);
    });

    it("returns true if id are the same but value is transferred from secret to metadata", () => {
      expect.assertions(2);
      const dtoA = defaultCustomField();
      const dtoB = defaultCustomField({
        id: dtoA.id,
        metadata_key: dtoA.metadata_key,
        metadata_value: dtoA.secret_value
      });
      delete dtoB.secret_value;
      const entityA = new CustomFieldEntity(dtoA);
      const entityB = new CustomFieldEntity(dtoB);

      expect(CustomFieldEntity.areFieldsDifferent(entityA, entityB)).toStrictEqual(true);
      expect(entityA.value).toStrictEqual(entityB.value);
    });

    it("should throw an error if the types or not the expected ones", () => {
      expect.assertions(2);
      const dto = defaultCustomField();
      const entity = new CustomFieldEntity(dto);

      expect(() => CustomFieldEntity.areFieldsDifferent(entity, null)).toThrowError();
      expect(() => CustomFieldEntity.areFieldsDifferent(null, entity)).toThrowError();
    });
  });

  describe("::createFromDefault", () => {
    it("returns a CustomFieldEntity with default data set when no parameter is given", () => {
      expect.assertions(7);
      const entity = CustomFieldEntity.createFromDefault();
      expect(entity).toBeInstanceOf(CustomFieldEntity);
      expect(isUUID(entity._props.id)).toStrictEqual(true);
      expect(entity._props.type).toStrictEqual("text");
      expect(entity._props.metadata_key).toStrictEqual("");
      expect(entity._props.secret_key).toBeUndefined();
      expect(entity._props.metadata_value).toBeUndefined();
      expect(entity._props.secret_value).toStrictEqual("");
    });

    it("returns a CustomFieldEntity with data set from the given parameters", () => {
      expect.assertions(7);
      const dto = {
        id: uuidv4(),
        type: "number",
        metadata_key: null,
        secret_key: "Secret key",
        metadata_value: null,
        secret_value: 42,
      };
      const entity = CustomFieldEntity.createFromDefault(dto);
      expect(entity).toBeInstanceOf(CustomFieldEntity);
      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.type).toStrictEqual(dto.type);
      expect(entity._props.metadata_key).toBeNull();
      expect(entity._props.secret_key).toStrictEqual(dto.secret_key);
      expect(entity._props.metadata_key).toBeNull();
      expect(entity._props.secret_value).toStrictEqual(dto.secret_value);
    });
  });

  describe("::isEmpty", () => {
    it("should return true if both the key and the value is not set (event if ID is set)", () => {
      expect.assertions(1);

      const dto = emptyCustomFieldDto();
      const entity = new CustomFieldEntity(dto);

      expect(entity.isEmpty()).toStrictEqual(true);
    });

    it("should return false if both the key and the value is not set (event if ID is set)", () => {
      expect.assertions(1);

      const dto = defaultCustomField();
      const entity = new CustomFieldEntity(dto);

      expect(entity.isEmpty()).toStrictEqual(false);
    });
  });
});
