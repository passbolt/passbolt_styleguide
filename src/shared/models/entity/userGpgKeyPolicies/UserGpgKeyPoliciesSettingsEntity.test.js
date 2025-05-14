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
 * @since         5.1.1
 */
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import UserGpgKeyPoliciesSettingsEntity from "./UserGpgKeyPoliciesSettingsEntity";
import {defaultUserGpgKeyPoliciesSettingsDto} from "./UserGpgKeyPoliciesSettingsEntity.test.data";

describe("UserGpgKeyPoliciesSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(UserGpgKeyPoliciesSettingsEntity.ENTITY_NAME, UserGpgKeyPoliciesSettingsEntity.getSchema());
    });

    it("validates preferred_key_type property", () => {
      assertEntityProperty.string(UserGpgKeyPoliciesSettingsEntity, "preferred_key_type");
      assertEntityProperty.required(UserGpgKeyPoliciesSettingsEntity, "preferred_key_type");
      assertEntityProperty.enumeration(UserGpgKeyPoliciesSettingsEntity, "preferred_key_type", ["rsa", "eddsa"]);
    });

    it("validates source property", () => {
      assertEntityProperty.string(UserGpgKeyPoliciesSettingsEntity, "source");
      assertEntityProperty.notRequired(UserGpgKeyPoliciesSettingsEntity, "source");
      assertEntityProperty.enumeration(UserGpgKeyPoliciesSettingsEntity, "source", ["file", "env", "default"]);
    });
  });

  describe("::constructor", () => {
    it("works if valid minimal DTO is provided", () => {
      expect.assertions(3);

      const dto = defaultUserGpgKeyPoliciesSettingsDto();
      const entity = new UserGpgKeyPoliciesSettingsEntity(dto);

      expect(entity.toDto()).toEqual(dto);
      expect(entity.preferredKeyType).toBe(dto.preferred_key_type);
      expect(entity.source).toBe(dto.source);
    });

    it("should marshall the data", () => {
      expect.assertions(1);

      const dto = defaultUserGpgKeyPoliciesSettingsDto({
        preferred_key_type: "RSA",
      });
      const entity = new UserGpgKeyPoliciesSettingsEntity(dto);

      expect(entity.preferredKeyType).toBe("rsa");
    });
  });

  describe("::createFromDefault", () => {
    it("should create a valid entity without provided data", () => {
      expect.assertions(2);

      const entity = UserGpgKeyPoliciesSettingsEntity.createFromDefault();
      expect(entity.preferredKeyType).toStrictEqual("rsa");
      expect(entity.source).toStrictEqual("default");
    });

    it("should create a valid entity based on the provided data", () => {
      expect.assertions(2);

      const entity = UserGpgKeyPoliciesSettingsEntity.createFromDefault({
        preferred_key_type: "eddsa",
        source: "env",
      });
      expect(entity.preferredKeyType).toStrictEqual("eddsa");
      expect(entity.source).toStrictEqual("env");
    });
  });
});
