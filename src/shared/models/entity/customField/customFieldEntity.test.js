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
import {defaultCustomField} from "./customFieldEntity.test.data";

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

    it("validateBuildRules: no key defined", () => {
      expect.assertions(1);
      const dto = defaultCustomField();
      delete dto?.metadata_key;
      delete dto?.secret_key;

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: both metadata key and secret key defined", () => {
      expect.assertions(1);
      const dto = defaultCustomField({
        metadata_key: "key",
        secret_key: "key",
      });

      expect(() => new CustomFieldEntity(dto)).toThrow();
    });

    it("validateBuildRules: no value defined", () => {
      expect.assertions(1);
      const dto = defaultCustomField();
      delete dto?.metadata_value;
      delete dto?.secret_value;

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
        secret_value: "a".repeat(5001),
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
});
