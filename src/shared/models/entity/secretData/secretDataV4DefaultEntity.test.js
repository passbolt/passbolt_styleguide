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
import SecretDataV4DefaultEntity from "./secretDataV4DefaultEntity";
import {defaultSecretDataV4DefaultData, minimalDefaultSecretDataV4DefaultData} from "./secretDataV4DefaultEntity.test.data";


describe("SecretDataV4DefaultEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV4DefaultEntity.name, SecretDataV4DefaultEntity.getSchema());
    });

    it("validates password property", () => {
      assertEntityProperty.string(SecretDataV4DefaultEntity, "password");
      assertEntityProperty.required(SecretDataV4DefaultEntity, "password");
      assertEntityProperty.maxLength(SecretDataV4DefaultEntity, "password", 4096);
    });

    it("validates description property", () => {
      assertEntityProperty.string(SecretDataV4DefaultEntity, "description");
      assertEntityProperty.nullable(SecretDataV4DefaultEntity, "description");
      assertEntityProperty.maxLength(SecretDataV4DefaultEntity, "description", 10000);
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(1);
      const dto = minimalDefaultSecretDataV4DefaultData();
      const entity = new SecretDataV4DefaultEntity(dto);

      expect(entity.password).toStrictEqual(dto.password);
    });
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV4DefaultData();
      const entity = new SecretDataV4DefaultEntity(dto);

      expect(entity.password).toStrictEqual(dto.password);
      expect(entity.description).toStrictEqual(dto.description);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(2);
      const entity = SecretDataV4DefaultEntity.createFromDefault({});

      expect(entity.password).toStrictEqual("");
      expect(entity.description).toStrictEqual("");
    });

    it("create with data provided", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV4DefaultData();
      const entity = SecretDataV4DefaultEntity.createFromDefault(dto);

      expect(entity.password).toStrictEqual(dto.password);
      expect(entity.description).toStrictEqual(dto.description);
    });
  });

  describe("::getDefaultProp", () => {
    it("get default password", () => {
      expect.assertions(1);
      expect(SecretDataV4DefaultEntity.getDefaultProp("password")).toStrictEqual("");
    });

    it("get default description", () => {
      expect.assertions(1);
      expect(SecretDataV4DefaultEntity.getDefaultProp("description")).toStrictEqual("");
    });

    it("get default unknown", () => {
      expect.assertions(1);
      expect(SecretDataV4DefaultEntity.getDefaultProp("unknown")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV4DefaultEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return true", () => {
      const dto = defaultSecretDataV4DefaultData();
      const entity = new SecretDataV4DefaultEntity(dto);
      expect(entity.areSecretsDifferent({password: "this-is-a-secret-password"})).toBeTruthy();
    });

    it("should return false", () => {
      const dto = defaultSecretDataV4DefaultData();
      const entity = new SecretDataV4DefaultEntity(dto);
      expect(entity.areSecretsDifferent(dto)).toBeFalsy();
    });
  });
});
