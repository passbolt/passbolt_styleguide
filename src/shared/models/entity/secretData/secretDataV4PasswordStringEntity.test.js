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
import SecretDataV4PasswordStringEntity from "./secretDataV4PasswordStringEntity";



describe("secretDataV4PasswordStringEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV4PasswordStringEntity.name, SecretDataV4PasswordStringEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(SecretDataV4PasswordStringEntity, "password");
      assertEntityProperty.required(SecretDataV4PasswordStringEntity, "password");
      assertEntityProperty.maxLength(SecretDataV4PasswordStringEntity, "password", 4096);
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(1);
      const dto = {password: "password"};
      const entity = new SecretDataV4PasswordStringEntity(dto);

      expect(entity.password).toStrictEqual("password");
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(1);
      const entity = SecretDataV4PasswordStringEntity.createFromDefault({});

      expect(entity.password).toStrictEqual("");
    });

    it("create with data provided", () => {
      expect.assertions(1);
      const dto = {password: "password"};
      const entity = SecretDataV4PasswordStringEntity.createFromDefault(dto);

      expect(entity.password).toStrictEqual(dto.password);
    });
  });

  describe("::getDefaultProp", () => {
    it("get default password", () => {
      expect.assertions(1);
      expect(SecretDataV4PasswordStringEntity.getDefaultProp("password")).toStrictEqual("");
    });

    it("get default unknown", () => {
      expect.assertions(1);
      expect(SecretDataV4PasswordStringEntity.getDefaultProp("unknown")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV4PasswordStringEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });
});
