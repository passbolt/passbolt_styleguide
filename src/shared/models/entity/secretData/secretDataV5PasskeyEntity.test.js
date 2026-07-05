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
 * @since         5.13.0
 */

import EntitySchema from "../abstract/entitySchema";
import { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";
import SecretDataV5PasskeyEntity from "./secretDataV5PasskeyEntity";
import PasskeyEntity from "../passkey/passkeyEntity";
import { defaultSecretDataV5PasskeyDto } from "./secretDataV5PasskeyEntity.test.data";
import { defaultPasskeyDto } from "../passkey/passkeyEntity.test.data";

describe("secretDataV5PasskeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5PasskeyEntity.name, SecretDataV5PasskeyEntity.getSchema());
    });

    it("validates a full valid passkey secret", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV5PasskeyDto();
      const entity = new SecretDataV5PasskeyEntity(dto);
      expect(entity.passkey).toBeInstanceOf(PasskeyEntity);
      expect(entity.passkey.credentialId).toStrictEqual(dto.passkey.credential_id);
    });

    it("throws when a required passkey field is missing", () => {
      expect.assertions(1);
      const passkey = defaultPasskeyDto();
      delete passkey.credential_id;
      expect(() => new SecretDataV5PasskeyEntity({ object_type: SECRET_DATA_OBJECT_TYPE, passkey })).toThrow();
    });

    it("throws when object_type is not the expected enum", () => {
      expect.assertions(1);
      expect(
        () => new SecretDataV5PasskeyEntity(defaultSecretDataV5PasskeyDto({ object_type: "SOMETHING_ELSE" })),
      ).toThrow();
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(4);

      const dto = defaultSecretDataV5PasskeyDto();
      const entity = new SecretDataV5PasskeyEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.passkey.rpId).toStrictEqual("example.com");
      expect(entity.passkey.userName).toStrictEqual("burak@example.com");
      expect(entity.passkey.algorithm).toStrictEqual(-7);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(2);
      const entity = SecretDataV5PasskeyEntity.createFromDefault({}, { validate: false });

      expect(entity.objectType).toStrictEqual(SECRET_DATA_OBJECT_TYPE);
      expect(entity.passkey).toBeInstanceOf(PasskeyEntity);
    });

    it("create with data provided", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV5PasskeyDto();
      const entity = SecretDataV5PasskeyEntity.createFromDefault(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.passkey.credentialId).toStrictEqual(dto.passkey.credential_id);
    });
  });

  describe("::toDto", () => {
    it("serializes the passkey association back to a plain object", () => {
      expect.assertions(1);
      const dto = defaultSecretDataV5PasskeyDto();
      const entity = new SecretDataV5PasskeyEntity(dto);
      expect(entity.toDto()).toStrictEqual(dto);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return true when the passkey material differs", () => {
      const dto = defaultSecretDataV5PasskeyDto();
      const entity = new SecretDataV5PasskeyEntity(dto);
      const other = defaultSecretDataV5PasskeyDto({ passkey: defaultPasskeyDto({ counter: 42 }) });
      expect(entity.areSecretsDifferent(other)).toBeTruthy();
    });

    it("should return false when the passkey material is identical", () => {
      const dto = defaultSecretDataV5PasskeyDto();
      const entity = new SecretDataV5PasskeyEntity(dto);
      expect(entity.areSecretsDifferent(dto)).toBeFalsy();
    });
  });
});
