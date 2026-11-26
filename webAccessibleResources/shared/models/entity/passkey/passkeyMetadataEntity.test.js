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
import PasskeyMetadataEntity from "./passkeyMetadataEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultPasskeyMetadataDto } from "./passkeyMetadataEntity.test.data";

const BASE64URL_PATTERN_SCENARIOS = [
  { scenario: "base64", value: "yuDS1TCepE+VXzAgRc2VJw/1" },
  { scenario: "padded", value: "yuDS1TCepE-VXzAgRc2VJw==" },
  { scenario: "length that does not decode", value: "yuDS1TCepE-VXzAgRc2VJwAAA" },
];

describe("PasskeyMetadataEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(PasskeyMetadataEntity.name, PasskeyMetadataEntity.getSchema());
    });

    it("validates rp_id property", () => {
      assertEntityProperty.string(PasskeyMetadataEntity, "rp_id");
      assertEntityProperty.required(PasskeyMetadataEntity, "rp_id");
      assertEntityProperty.minLength(PasskeyMetadataEntity, "rp_id", 1);
      assertEntityProperty.maxLength(PasskeyMetadataEntity, "rp_id", 253);
      assertEntityProperty.assert(
        PasskeyMetadataEntity,
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
      assertEntityProperty.string(PasskeyMetadataEntity, "credential_id");
      assertEntityProperty.required(PasskeyMetadataEntity, "credential_id");
      assertEntityProperty.minLength(PasskeyMetadataEntity, "credential_id", 22);
      assertEntityProperty.maxLength(PasskeyMetadataEntity, "credential_id", 1364);
      assertEntityProperty.assert(
        PasskeyMetadataEntity,
        "credential_id",
        [{ scenario: "base64url", value: "yuDS1TCepE-VXzAgRc2VJw" }],
        BASE64URL_PATTERN_SCENARIOS,
        "pattern",
      );
    });

    it("validates user_handle property", () => {
      assertEntityProperty.string(PasskeyMetadataEntity, "user_handle");
      assertEntityProperty.required(PasskeyMetadataEntity, "user_handle");
      assertEntityProperty.minLength(PasskeyMetadataEntity, "user_handle", 2);
      assertEntityProperty.maxLength(PasskeyMetadataEntity, "user_handle", 86);
      assertEntityProperty.assert(
        PasskeyMetadataEntity,
        "user_handle",
        [{ scenario: "one byte", value: "AA" }],
        BASE64URL_PATTERN_SCENARIOS,
        "pattern",
      );
    });

    it("validates prf_support property", () => {
      assertEntityProperty.boolean(PasskeyMetadataEntity, "prf_support");
      assertEntityProperty.required(PasskeyMetadataEntity, "prf_support");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(5);

      const dto = defaultPasskeyMetadataDto();
      const entity = new PasskeyMetadataEntity(dto);

      expect(entity.rpId).toStrictEqual(dto.rp_id);
      expect(entity.credentialId).toStrictEqual(dto.credential_id);
      expect(entity.userHandle).toStrictEqual(dto.user_handle);
      expect(entity.prfSupport).toStrictEqual(dto.prf_support);
      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("drops the properties it does not know", () => {
      expect.assertions(1);

      const entity = new PasskeyMetadataEntity(defaultPasskeyMetadataDto({ unknown: "value" }));

      expect(entity.toDto()).toStrictEqual(defaultPasskeyMetadataDto());
    });
  });
});
