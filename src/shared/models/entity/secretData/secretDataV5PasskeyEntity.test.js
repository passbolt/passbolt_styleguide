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
import PasskeyHmacCredentialsEntity from "../passkey/passkeyHmacCredentialsEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultSecretDataV5PasskeyDto } from "./secretDataV5PasskeyEntity.test.data";
import { defaultPasskeyHmacCredentialsDto } from "../passkey/passkeyHmacCredentialsEntity.test.data";

const BASE64URL_PATTERN_SCENARIOS = [
  { scenario: "base64", value: "yuDS1TCepE+VXzAgRc2VJw/1" },
  { scenario: "padded", value: "yuDS1TCepE-VXzAgRc2VJw==" },
  { scenario: "length that does not decode", value: "yuDS1TCepE-VXzAgRc2VJwAAA" },
];

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

    it("validates rp_id property", () => {
      assertEntityProperty.string(SecretDataV5PasskeyEntity, "rp_id");
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "rp_id");
      assertEntityProperty.minLength(SecretDataV5PasskeyEntity, "rp_id", 1);
      assertEntityProperty.maxLength(SecretDataV5PasskeyEntity, "rp_id", 253);
      assertEntityProperty.assert(
        SecretDataV5PasskeyEntity,
        "rp_id",
        [
          { scenario: "a domain", value: "login.example.com" },
          { scenario: "localhost", value: "localhost" },
        ],
        [
          { scenario: "an ip address", value: "127.0.0.1" },
          { scenario: "uppercase", value: "Example.com" },
          { scenario: "a trailing dot", value: "example.com." },
          { scenario: "a url", value: "https://example.com" },
        ],
        "pattern",
      );
    });

    it("validates credential_id property", () => {
      assertEntityProperty.string(SecretDataV5PasskeyEntity, "credential_id");
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "credential_id");
      assertEntityProperty.minLength(SecretDataV5PasskeyEntity, "credential_id", 22);
      assertEntityProperty.maxLength(SecretDataV5PasskeyEntity, "credential_id", 1364);
      assertEntityProperty.assert(
        SecretDataV5PasskeyEntity,
        "credential_id",
        [{ scenario: "base64url", value: "yuDS1TCepE-VXzAgRc2VJw" }],
        BASE64URL_PATTERN_SCENARIOS,
        "pattern",
      );
    });

    it("validates user_handle property", () => {
      assertEntityProperty.string(SecretDataV5PasskeyEntity, "user_handle");
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "user_handle");
      assertEntityProperty.minLength(SecretDataV5PasskeyEntity, "user_handle", 2);
      assertEntityProperty.maxLength(SecretDataV5PasskeyEntity, "user_handle", 86);
      assertEntityProperty.assert(
        SecretDataV5PasskeyEntity,
        "user_handle",
        [{ scenario: "one byte", value: "AA" }],
        BASE64URL_PATTERN_SCENARIOS,
        "pattern",
      );
    });

    it("validates username property", () => {
      assertEntityProperty.string(SecretDataV5PasskeyEntity, "username");
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "username");
      assertEntityProperty.maxLength(SecretDataV5PasskeyEntity, "username", 255);
    });

    it("validates user_display_name property", () => {
      assertEntityProperty.string(SecretDataV5PasskeyEntity, "user_display_name");
      assertEntityProperty.notRequired(SecretDataV5PasskeyEntity, "user_display_name");
      assertEntityProperty.nullable(SecretDataV5PasskeyEntity, "user_display_name");
      assertEntityProperty.maxLength(SecretDataV5PasskeyEntity, "user_display_name", 255);
    });

    it("validates algorithm property", () => {
      assertEntityProperty.integer(SecretDataV5PasskeyEntity, "algorithm");
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "algorithm");
      assertEntityProperty.enumeration(SecretDataV5PasskeyEntity, "algorithm", [-7], [-8, -9, -257]);
    });

    it("validates private_key property", () => {
      assertEntityProperty.string(SecretDataV5PasskeyEntity, "private_key");
      assertEntityProperty.required(SecretDataV5PasskeyEntity, "private_key");
      assertEntityProperty.minLength(SecretDataV5PasskeyEntity, "private_key", 90);
      assertEntityProperty.maxLength(SecretDataV5PasskeyEntity, "private_key", 256);
      assertEntityProperty.assert(
        SecretDataV5PasskeyEntity,
        "private_key",
        [{ scenario: "base64url", value: defaultSecretDataV5PasskeyDto().private_key }],
        BASE64URL_PATTERN_SCENARIOS,
        "pattern",
      );
    });

    it("validates hmac_credentials property", () => {
      const dto = defaultSecretDataV5PasskeyDto();
      const successScenarios = [{ scenario: "valid hmac credentials", value: defaultPasskeyHmacCredentialsDto() }];
      const failScenarios = [
        { scenario: "unknown algorithm", value: defaultPasskeyHmacCredentialsDto({ algorithm: "hmac-sha512" }) },
        { scenario: "missing secret", value: defaultPasskeyHmacCredentialsDto({ cred_without_uv: undefined }) },
        { scenario: "short secret", value: defaultPasskeyHmacCredentialsDto({ cred_with_uv: "AAAA" }) },
      ];
      assertEntityProperty.assertAssociation(
        SecretDataV5PasskeyEntity,
        "hmac_credentials",
        dto,
        successScenarios,
        failScenarios,
      );
      assertEntityProperty.notRequired(SecretDataV5PasskeyEntity, "hmac_credentials");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(10);

      const dto = defaultSecretDataV5PasskeyDto();
      const entity = new SecretDataV5PasskeyEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.rpId).toStrictEqual(dto.rp_id);
      expect(entity.credentialId).toStrictEqual(dto.credential_id);
      expect(entity.userHandle).toStrictEqual(dto.user_handle);
      expect(entity.username).toStrictEqual(dto.username);
      expect(entity.userDisplayName).toStrictEqual(dto.user_display_name);
      expect(entity.algorithm).toStrictEqual(dto.algorithm);
      expect(entity.privateKey).toStrictEqual(dto.private_key);
      expect(entity.hmacCredentials).toBeInstanceOf(PasskeyHmacCredentialsEntity);
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("constructor works without the optional properties", () => {
      expect.assertions(3);

      const dto = defaultSecretDataV5PasskeyDto();
      delete dto.user_display_name;
      delete dto.hmac_credentials;
      const entity = new SecretDataV5PasskeyEntity(dto);

      expect(entity.userDisplayName).toBeNull();
      expect(entity.hmacCredentials).toBeNull();
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("drops the properties of the other secret types", () => {
      expect.assertions(1);

      const entity = new SecretDataV5PasskeyEntity(defaultSecretDataV5PasskeyDto({ password: "secret" }));

      expect(entity.toDto()).toStrictEqual(defaultSecretDataV5PasskeyDto());
    });

    it("throws if the hmac credentials do not validate", () => {
      expect.assertions(1);

      const dto = defaultSecretDataV5PasskeyDto({ hmac_credentials: { algorithm: "hmac-sha256" } });

      expect(() => new SecretDataV5PasskeyEntity(dto)).toThrow(EntityValidationError);
    });

    it("throws if the hmac credentials are null", () => {
      expect.assertions(1);

      const dto = defaultSecretDataV5PasskeyDto({ hmac_credentials: null });

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
      expect(SecretDataV5PasskeyEntity.getDefaultProp("rp_id")).toBeUndefined();
      expect(SecretDataV5PasskeyEntity.getDefaultProp("private_key")).toBeUndefined();
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

    it.each([
      { prop: "rp_id", value: "example.org" },
      { prop: "username", value: "bob@example.com" },
    ])("should return true when $prop differs", ({ prop, value }) => {
      expect.assertions(1);
      const entity = new SecretDataV5PasskeyEntity(defaultSecretDataV5PasskeyDto());
      expect(entity.areSecretsDifferent(defaultSecretDataV5PasskeyDto({ [prop]: value }))).toStrictEqual(true);
    });

    it("should return true when the hmac credentials differ", () => {
      expect.assertions(2);
      const entity = new SecretDataV5PasskeyEntity(defaultSecretDataV5PasskeyDto());
      const otherHmacCredentials = defaultPasskeyHmacCredentialsDto({
        cred_with_uv: "_xRz7NJyQFi8hVFLoITHvgl2qI_BJOk7YNNfTuhS6wE",
      });
      expect(
        entity.areSecretsDifferent(defaultSecretDataV5PasskeyDto({ hmac_credentials: otherHmacCredentials })),
      ).toStrictEqual(true);
      expect(entity.areSecretsDifferent(defaultSecretDataV5PasskeyDto({ hmac_credentials: undefined }))).toStrictEqual(
        true,
      );
    });
  });
});
