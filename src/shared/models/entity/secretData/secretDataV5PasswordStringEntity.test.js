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
 * @since         5.0.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {
  defaultSecretDataV5PasswordStringDto,
  minimalDefaultSecretDataV5PasswordStringDto
} from "./secretDataV5PasswordStringEntity.test.data";
import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";
import SecretDataV5PasswordStringEntity from "./secretDataV5PasswordStringEntity";

describe("secretDataV5PasswordStringEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5PasswordStringEntity.name, SecretDataV5PasswordStringEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(SecretDataV5PasswordStringEntity, "object_type");
      assertEntityProperty.required(SecretDataV5PasswordStringEntity, "object_type");
      assertEntityProperty.enumeration(SecretDataV5PasswordStringEntity, "object_type", [SECRET_DATA_OBJECT_TYPE], ["any other values"]);
    });

    it("validates password property", () => {
      assertEntityProperty.string(SecretDataV5PasswordStringEntity, "password");
      assertEntityProperty.nullable(SecretDataV5PasswordStringEntity, "password");
      assertEntityProperty.maxLength(SecretDataV5PasswordStringEntity, "password", 4096);
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(2);
      const dto = minimalDefaultSecretDataV5PasswordStringDto();
      const entity = new SecretDataV5PasswordStringEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toBeNull();
    });
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(2);

      const dto = defaultSecretDataV5PasswordStringDto();
      const entity = new SecretDataV5PasswordStringEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toStrictEqual(dto.password);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(2);
      const dto = minimalDefaultSecretDataV5PasswordStringDto();
      const entity = SecretDataV5PasswordStringEntity.createFromDefault({});

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toStrictEqual("");
    });

    it("create with data provided", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV5PasswordStringDto();
      const entity = SecretDataV5PasswordStringEntity.createFromDefault(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toStrictEqual(dto.password);
    });
  });

  describe("::getDefaultProp", () => {
    it("get default password", () => {
      expect.assertions(1);
      expect(SecretDataV5PasswordStringEntity.getDefaultProp("password")).toStrictEqual("");
    });

    it("get default unknown", () => {
      expect.assertions(1);
      expect(SecretDataV5PasswordStringEntity.getDefaultProp("unknown")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV5PasswordStringEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });
});
