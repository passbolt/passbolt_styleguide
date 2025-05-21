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
import UserKeyPoliciesSettingsEntity from "./UserKeyPoliciesSettingsEntity";
import {defaultUserKeyPoliciesSettingsDto, rsaUserKeyPoliciesSettingsDto} from "./UserKeyPoliciesSettingsEntity.test.data";
import EntityValidationError from "../abstract/entityValidationError";

describe("UserKeyPoliciesSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(UserKeyPoliciesSettingsEntity.ENTITY_NAME, UserKeyPoliciesSettingsEntity.getSchema());
    });

    it("validates preferred_key_type property", () => {
      assertEntityProperty.string(UserKeyPoliciesSettingsEntity, "preferred_key_type");
      assertEntityProperty.required(UserKeyPoliciesSettingsEntity, "preferred_key_type");
      assertEntityProperty.enumeration(UserKeyPoliciesSettingsEntity, "preferred_key_type", ["rsa", "curve"]);
    });

    it("validates preferred_key_size property", () => {
      assertEntityProperty.integer(UserKeyPoliciesSettingsEntity, "preferred_key_size");
      assertEntityProperty.notRequired(UserKeyPoliciesSettingsEntity, "preferred_key_size");
      assertEntityProperty.enumeration(UserKeyPoliciesSettingsEntity, "preferred_key_size", [3072, 4096]);
      assertEntityProperty.nullable(UserKeyPoliciesSettingsEntity, "preferred_key_size");
    });

    it("validates preferred_key_curve property", () => {
      assertEntityProperty.string(UserKeyPoliciesSettingsEntity, "preferred_key_curve");
      assertEntityProperty.notRequired(UserKeyPoliciesSettingsEntity, "preferred_key_curve");
      assertEntityProperty.enumeration(UserKeyPoliciesSettingsEntity, "preferred_key_curve", ["curve25519_legacy+ed25519_legacy"]);
      assertEntityProperty.nullable(UserKeyPoliciesSettingsEntity, "preferred_key_curvepreferred_key_curve");
    });

    it("validates source property", () => {
      assertEntityProperty.string(UserKeyPoliciesSettingsEntity, "source");
      assertEntityProperty.notRequired(UserKeyPoliciesSettingsEntity, "source");
      assertEntityProperty.enumeration(UserKeyPoliciesSettingsEntity, "source", ["file", "env", "default"]);
    });
  });

  describe("::constructor", () => {
    it("works if valid curve DTO is provided", () => {
      expect.assertions(5);

      const dto = defaultUserKeyPoliciesSettingsDto();
      const entity = new UserKeyPoliciesSettingsEntity(dto);

      expect(entity.toDto()).toEqual(dto);
      expect(entity.preferredKeyType).toBe(dto.preferred_key_type);
      expect(entity.preferredKeySize).toBeNull();
      expect(entity.preferredKeyCurve).toBe(dto.preferred_key_curve);
      expect(entity.source).toBe(dto.source);
    });

    it("works if valid rsa DTO is provided", () => {
      expect.assertions(5);

      const dto = rsaUserKeyPoliciesSettingsDto();
      const entity = new UserKeyPoliciesSettingsEntity(dto);

      expect(entity.toDto()).toEqual(dto);
      expect(entity.preferredKeyType).toBe(dto.preferred_key_type);
      expect(entity.preferredKeySize).toBe(dto.preferred_key_size);
      expect(entity.preferredKeyCurve).toBeNull();
      expect(entity.source).toBe(dto.source);
    });

    it("should marshall the data for rsa key", () => {
      expect.assertions(2);

      const dto = rsaUserKeyPoliciesSettingsDto({
        preferred_key_type: "RSA",
      });
      delete dto?.preferred_key_size;
      const entity = new UserKeyPoliciesSettingsEntity(dto);

      expect(entity.preferredKeyType).toBe("rsa");
      expect(entity.preferredKeySize).toBe(3072);
    });

    it("should marshall the data for curve key", () => {
      expect.assertions(2);

      const dto = defaultUserKeyPoliciesSettingsDto({
        preferred_key_type: "CURVE",
      });
      delete dto?.preferred_key_curve;
      const entity = new UserKeyPoliciesSettingsEntity(dto);

      expect(entity.preferredKeyType).toBe("curve");
      expect(entity.preferredKeyCurve).toBe("curve25519_legacy+ed25519_legacy");
    });

    it("should validate build rules for a rsa key", () => {
      expect.assertions(1);

      const dto = rsaUserKeyPoliciesSettingsDto({
        preferred_key_curve: "curve25519_legacy+ed25519_legacy",
      });
      expect(() => new UserKeyPoliciesSettingsEntity(dto)).toThrow(EntityValidationError);
    });

    it("should validate build rules for a curve key", () => {
      expect.assertions(1);

      const dto = defaultUserKeyPoliciesSettingsDto({
        preferred_key_size: 4096,
      });
      expect(() => new UserKeyPoliciesSettingsEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::createFromDefault", () => {
    it("should create a valid entity without provided data", () => {
      expect.assertions(4);

      const entity = UserKeyPoliciesSettingsEntity.createFromDefault();
      expect(entity.preferredKeyType).toStrictEqual("rsa");
      expect(entity.preferredKeySize).toStrictEqual(3072);
      expect(entity.preferredKeyCurve).toBeNull();
      expect(entity.source).toStrictEqual("default");
    });

    it("should create a valid entity based on the provided data", () => {
      expect.assertions(4);

      const entity = UserKeyPoliciesSettingsEntity.createFromDefault({
        preferred_key_type: "curve",
        source: "env",
      });
      expect(entity.preferredKeyType).toStrictEqual("curve");
      expect(entity.preferredKeySize).toBeNull();
      expect(entity.preferredKeyCurve).toStrictEqual("curve25519_legacy+ed25519_legacy");
      expect(entity.source).toStrictEqual("env");
    });
  });
});
