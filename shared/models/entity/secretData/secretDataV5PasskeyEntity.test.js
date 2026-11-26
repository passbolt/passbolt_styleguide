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
 * @since         5.18.0
 */
import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";
import {
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_PASSKEY_SLUG,
} from "../resourceType/resourceTypeSchemasDefinition";
import SecretDataV5PasskeyEntity from "./secretDataV5PasskeyEntity";
import PasskeySecretEntity from "../passkey/passkeySecretEntity";
import PasskeyHmacCredentialsEntity from "../passkey/passkeyHmacCredentialsEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultSecretDataV5PasskeyDto } from "./secretDataV5PasskeyEntity.test.data";
import { defaultPasskeySecretDto } from "../passkey/passkeySecretEntity.test.data";
import { defaultPasskeyHmacCredentialsDto } from "../passkey/passkeyHmacCredentialsEntity.test.data";

describe("SecretDataV5PasskeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5PasskeyEntity.name, SecretDataV5PasskeyEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "object_type");
      assertEntityProperty.enumeration(
        SecretDataV5PasskeyEntity,
        "object_type",
        [SECRET_DATA_OBJECT_TYPE],
        ["any other values", "PASSBOLT_PASSKEY_SECRET_DATA"],
      );
    });

    it("validates resource_type_slug property", () => {
      assertEntityProperty.string(SecretDataV5PasskeyEntity, "resource_type_slug");
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "resource_type_slug");
      assertEntityProperty.enumeration(
        SecretDataV5PasskeyEntity,
        "resource_type_slug",
        [RESOURCE_TYPE_V5_PASSKEY_SLUG],
        ["any other values", RESOURCE_TYPE_V5_DEFAULT_SLUG],
      );
    });

    it("validates username property", () => {
      assertEntityProperty.string(SecretDataV5PasskeyEntity, "username");
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "username");
      assertEntityProperty.notNullable(SecretDataV5PasskeyEntity, "username");
      assertEntityProperty.maxLength(SecretDataV5PasskeyEntity, "username", 255);
    });

    it("validates passkey property", () => {
      const dto = defaultSecretDataV5PasskeyDto();
      const successScenarios = [{ scenario: "valid passkey", value: defaultPasskeySecretDto() }];
      const failScenarios = [
        { scenario: "missing private key", value: defaultPasskeySecretDto({ private_key: undefined }) },
        { scenario: "invalid relying party id", value: defaultPasskeySecretDto({ rp_id: "https://example.com" }) },
      ];
      assertEntityProperty.assertAssociation(
        SecretDataV5PasskeyEntity,
        "passkey",
        dto,
        successScenarios,
        failScenarios,
      );
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "passkey");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(10);

      const dto = defaultSecretDataV5PasskeyDto();
      const entity = new SecretDataV5PasskeyEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.username).toStrictEqual(dto.username);
      expect(entity.passkey).toBeInstanceOf(PasskeySecretEntity);
      expect(entity.rpId).toStrictEqual(dto.passkey.rp_id);
      expect(entity.credentialId).toStrictEqual(dto.passkey.credential_id);
      expect(entity.userDisplayName).toStrictEqual(dto.passkey.user_display_name);
      expect(entity.algorithm).toStrictEqual(dto.passkey.algorithm);
      expect(entity.privateKey).toStrictEqual(dto.passkey.private_key);
      expect(entity.hmacCredentials).toBeInstanceOf(PasskeyHmacCredentialsEntity);
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("accepts an empty username", () => {
      expect.assertions(1);

      const dto = defaultSecretDataV5PasskeyDto({ username: "" });

      expect(new SecretDataV5PasskeyEntity(dto).toDto()).toStrictEqual(dto);
    });

    it("drops the properties of the other secret types", () => {
      expect.assertions(1);

      const entity = new SecretDataV5PasskeyEntity(defaultSecretDataV5PasskeyDto({ password: "secret" }));

      expect(entity.toDto()).toStrictEqual(defaultSecretDataV5PasskeyDto());
    });

    it("throws if the passkey is null", () => {
      expect.assertions(1);

      const dto = defaultSecretDataV5PasskeyDto({ passkey: null });

      expect(() => new SecretDataV5PasskeyEntity(dto)).toThrow(EntityValidationError);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(1);
      const entity = SecretDataV5PasskeyEntity.createFromDefault({}, { validate: false });

      expect(entity.toDto()).toStrictEqual({
        object_type: SECRET_DATA_OBJECT_TYPE,
        resource_type_slug: RESOURCE_TYPE_V5_PASSKEY_SLUG,
      });
    });

    it("create with data provided", () => {
      expect.assertions(1);
      const dto = defaultSecretDataV5PasskeyDto();
      const entity = SecretDataV5PasskeyEntity.createFromDefault(dto);

      expect(entity.toDto()).toStrictEqual(dto);
    });
  });

  describe("::getDefaultProp", () => {
    it("has no default property", () => {
      expect.assertions(2);
      expect(SecretDataV5PasskeyEntity.getDefaultProp("username")).toBeUndefined();
      expect(SecretDataV5PasskeyEntity.getDefaultProp("passkey")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV5PasskeyEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return false for the same secret", () => {
      expect.assertions(1);
      const dto = defaultSecretDataV5PasskeyDto();
      const entity = new SecretDataV5PasskeyEntity(dto);
      expect(entity.areSecretsDifferent(defaultSecretDataV5PasskeyDto())).toStrictEqual(false);
    });

    it("should return true when the username differs", () => {
      expect.assertions(1);
      const entity = new SecretDataV5PasskeyEntity(defaultSecretDataV5PasskeyDto());
      expect(entity.areSecretsDifferent(defaultSecretDataV5PasskeyDto({ username: "bob@example.com" }))).toStrictEqual(
        true,
      );
    });

    it.each([
      { prop: "rp_id", value: "example.org" },
      { prop: "credential_id", value: "AAAAAAAAAAAAAAAAAAAAAA" },
      { prop: "user_display_name", value: "Bob" },
    ])("should return true when the passkey $prop differs", ({ prop, value }) => {
      expect.assertions(1);
      const entity = new SecretDataV5PasskeyEntity(defaultSecretDataV5PasskeyDto());
      const otherDto = defaultSecretDataV5PasskeyDto({ passkey: defaultPasskeySecretDto({ [prop]: value }) });
      expect(entity.areSecretsDifferent(otherDto)).toStrictEqual(true);
    });

    it("should return true when the hmac credentials differ", () => {
      expect.assertions(2);
      const entity = new SecretDataV5PasskeyEntity(defaultSecretDataV5PasskeyDto());
      const otherHmacCredentials = defaultPasskeyHmacCredentialsDto({
        cred_with_uv: "_xRz7NJyQFi8hVFLoITHvgl2qI_BJOk7YNNfTuhS6wE",
      });
      const otherDto = defaultSecretDataV5PasskeyDto({
        passkey: defaultPasskeySecretDto({ hmac_credentials: otherHmacCredentials }),
      });
      const withoutHmacDto = defaultSecretDataV5PasskeyDto({
        passkey: defaultPasskeySecretDto({ hmac_credentials: undefined }),
      });
      expect(entity.areSecretsDifferent(otherDto)).toStrictEqual(true);
      expect(entity.areSecretsDifferent(withoutHmacDto)).toStrictEqual(true);
    });
  });
});
