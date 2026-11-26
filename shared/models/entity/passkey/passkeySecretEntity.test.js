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
import PasskeySecretEntity from "./passkeySecretEntity";
import PasskeyHmacCredentialsEntity from "./passkeyHmacCredentialsEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultPasskeySecretDto } from "./passkeySecretEntity.test.data";
import { defaultPasskeyHmacCredentialsDto } from "./passkeyHmacCredentialsEntity.test.data";

const BASE64URL_PATTERN_SCENARIOS = [
  { scenario: "base64", value: "yuDS1TCepE+VXzAgRc2VJw/1" },
  { scenario: "padded", value: "yuDS1TCepE-VXzAgRc2VJw==" },
  { scenario: "length that does not decode", value: "yuDS1TCepE-VXzAgRc2VJwAAA" },
];

describe("PasskeySecretEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(PasskeySecretEntity.name, PasskeySecretEntity.getSchema());
    });

    it("validates rp_id property", () => {
      assertEntityProperty.string(PasskeySecretEntity, "rp_id");
      assertEntityProperty.required(PasskeySecretEntity, "rp_id");
      assertEntityProperty.minLength(PasskeySecretEntity, "rp_id", 1);
      assertEntityProperty.maxLength(PasskeySecretEntity, "rp_id", 253);
      assertEntityProperty.assert(
        PasskeySecretEntity,
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
      assertEntityProperty.string(PasskeySecretEntity, "credential_id");
      assertEntityProperty.required(PasskeySecretEntity, "credential_id");
      assertEntityProperty.minLength(PasskeySecretEntity, "credential_id", 22);
      assertEntityProperty.maxLength(PasskeySecretEntity, "credential_id", 1364);
      assertEntityProperty.assert(
        PasskeySecretEntity,
        "credential_id",
        [{ scenario: "base64url", value: "yuDS1TCepE-VXzAgRc2VJw" }],
        BASE64URL_PATTERN_SCENARIOS,
        "pattern",
      );
    });

    it("validates algorithm property", () => {
      assertEntityProperty.integer(PasskeySecretEntity, "algorithm");
      assertEntityProperty.required(PasskeySecretEntity, "algorithm");
      assertEntityProperty.enumeration(PasskeySecretEntity, "algorithm", [-7], [-8, -9, -257]);
    });

    it("validates private_key property", () => {
      assertEntityProperty.string(PasskeySecretEntity, "private_key");
      assertEntityProperty.required(PasskeySecretEntity, "private_key");
      assertEntityProperty.minLength(PasskeySecretEntity, "private_key", 90);
      assertEntityProperty.maxLength(PasskeySecretEntity, "private_key", 256);
      assertEntityProperty.assert(
        PasskeySecretEntity,
        "private_key",
        [{ scenario: "base64url", value: defaultPasskeySecretDto().private_key }],
        BASE64URL_PATTERN_SCENARIOS,
        "pattern",
      );
    });

    it("validates user_display_name property", () => {
      assertEntityProperty.string(PasskeySecretEntity, "user_display_name");
      assertEntityProperty.notRequired(PasskeySecretEntity, "user_display_name");
      assertEntityProperty.nullable(PasskeySecretEntity, "user_display_name");
      assertEntityProperty.maxLength(PasskeySecretEntity, "user_display_name", 255);
    });

    it("validates hmac_credentials property", () => {
      const dto = defaultPasskeySecretDto();
      const successScenarios = [{ scenario: "valid hmac credentials", value: defaultPasskeyHmacCredentialsDto() }];
      const failScenarios = [
        { scenario: "unknown algorithm", value: defaultPasskeyHmacCredentialsDto({ algorithm: "hmac-sha512" }) },
        { scenario: "missing secret", value: defaultPasskeyHmacCredentialsDto({ cred_without_uv: undefined }) },
        { scenario: "short secret", value: defaultPasskeyHmacCredentialsDto({ cred_with_uv: "AAAA" }) },
      ];
      assertEntityProperty.assertAssociation(
        PasskeySecretEntity,
        "hmac_credentials",
        dto,
        successScenarios,
        failScenarios,
      );
      assertEntityProperty.notRequired(PasskeySecretEntity, "hmac_credentials");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(7);

      const dto = defaultPasskeySecretDto();
      const entity = new PasskeySecretEntity(dto);

      expect(entity.rpId).toStrictEqual(dto.rp_id);
      expect(entity.credentialId).toStrictEqual(dto.credential_id);
      expect(entity.algorithm).toStrictEqual(dto.algorithm);
      expect(entity.privateKey).toStrictEqual(dto.private_key);
      expect(entity.userDisplayName).toStrictEqual(dto.user_display_name);
      expect(entity.hmacCredentials).toBeInstanceOf(PasskeyHmacCredentialsEntity);
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("constructor works without the optional properties", () => {
      expect.assertions(3);

      const dto = defaultPasskeySecretDto();
      delete dto.user_display_name;
      delete dto.hmac_credentials;
      const entity = new PasskeySecretEntity(dto);

      expect(entity.userDisplayName).toBeNull();
      expect(entity.hmacCredentials).toBeNull();
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("drops the properties it does not know", () => {
      expect.assertions(1);

      const entity = new PasskeySecretEntity(defaultPasskeySecretDto({ unknown: "value" }));

      expect(entity.toDto()).toStrictEqual(defaultPasskeySecretDto());
    });

    it("throws if the hmac credentials do not validate", () => {
      expect.assertions(1);

      const dto = defaultPasskeySecretDto({ hmac_credentials: { algorithm: "hmac-sha256" } });

      expect(() => new PasskeySecretEntity(dto)).toThrow(EntityValidationError);
    });

    it("throws if the hmac credentials are null", () => {
      expect.assertions(1);

      const dto = defaultPasskeySecretDto({ hmac_credentials: null });

      expect(() => new PasskeySecretEntity(dto)).toThrow(EntityValidationError);
    });
  });
});
