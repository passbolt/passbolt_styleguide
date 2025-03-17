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
import SecretDataV5DefaultEntity from "./secretDataV5DefaultEntity";
import {defaultSecretDataV5DefaultDto, minimalDefaultSecretDataV5DefaultDto} from "./secretDataV5DefaultEntity.test.data";
import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";

describe("SecretDataV5DefaultEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5DefaultEntity.name, SecretDataV5DefaultEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.enumeration(SecretDataV5DefaultEntity, "object_type", [SECRET_DATA_OBJECT_TYPE], ["any other values"]);
    });

    it("validates password property", () => {
      assertEntityProperty.string(SecretDataV5DefaultEntity, "password");
      assertEntityProperty.required(SecretDataV5DefaultEntity, "password");
      assertEntityProperty.nullable(SecretDataV5DefaultEntity, "password");
      assertEntityProperty.maxLength(SecretDataV5DefaultEntity, "password", 4096);
    });

    it("validates description property", () => {
      assertEntityProperty.string(SecretDataV5DefaultEntity, "description");
      assertEntityProperty.nullable(SecretDataV5DefaultEntity, "description");
      assertEntityProperty.maxLength(SecretDataV5DefaultEntity, "description", 10000);
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(3);
      const dto = minimalDefaultSecretDataV5DefaultDto();
      const entity = new SecretDataV5DefaultEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toBeNull();
      expect(entity.description).toBeUndefined();
    });
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(3);

      const dto = defaultSecretDataV5DefaultDto();
      const entity = new SecretDataV5DefaultEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toStrictEqual(dto.password);
      expect(entity.description).toStrictEqual(dto.description);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(3);
      const dto = minimalDefaultSecretDataV5DefaultDto();
      const entity = SecretDataV5DefaultEntity.createFromDefault({});

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toStrictEqual("");
      expect(entity.description).toBeUndefined();
    });

    it("create with data provided", () => {
      expect.assertions(3);
      const dto = defaultSecretDataV5DefaultDto();
      const entity = SecretDataV5DefaultEntity.createFromDefault(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.password).toStrictEqual(dto.password);
      expect(entity.description).toStrictEqual(dto.description);
    });
  });

  describe("::getDefaultProp", () => {
    it("get default password", () => {
      expect.assertions(1);
      expect(SecretDataV5DefaultEntity.getDefaultProp("password")).toStrictEqual("");
    });

    it("get default description", () => {
      expect.assertions(1);
      expect(SecretDataV5DefaultEntity.getDefaultProp("description")).toStrictEqual("");
    });

    it("get default unknown", () => {
      expect.assertions(1);
      expect(SecretDataV5DefaultEntity.getDefaultProp("unknown")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV5DefaultEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return true", () => {
      const dto = minimalDefaultSecretDataV5DefaultDto();
      const entity = SecretDataV5DefaultEntity.createFromDefault(dto);
      expect(entity.areSecretsDifferent({password: ""})).toBeTruthy();
    });

    it("should return false", () => {
      const dto = defaultSecretDataV5DefaultDto();
      const entity = new SecretDataV5DefaultEntity(dto);
      expect(entity.areSecretsDifferent(dto)).toBeFalsy();
    });
  });
});
