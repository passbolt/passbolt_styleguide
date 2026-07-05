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
import PasskeyEntity, { PASSKEY_ALGORITHM_ES256 } from "./passkeyEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultPasskeyDto } from "./passkeyEntity.test.data";

describe("passkeyEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(PasskeyEntity.name, PasskeyEntity.getSchema());
    });

    it("validates credential_id property", () => {
      assertEntityProperty.string(PasskeyEntity, "credential_id");
      assertEntityProperty.required(PasskeyEntity, "credential_id");
      assertEntityProperty.maxLength(PasskeyEntity, "credential_id", 1024);
    });

    it("validates rp_id property", () => {
      assertEntityProperty.string(PasskeyEntity, "rp_id");
      assertEntityProperty.required(PasskeyEntity, "rp_id");
      assertEntityProperty.maxLength(PasskeyEntity, "rp_id", 253);
    });

    it("validates private_key property", () => {
      assertEntityProperty.string(PasskeyEntity, "private_key");
      assertEntityProperty.required(PasskeyEntity, "private_key");
      assertEntityProperty.maxLength(PasskeyEntity, "private_key", 4096);
    });

    it("validates user_name property", () => {
      assertEntityProperty.string(PasskeyEntity, "user_name");
      assertEntityProperty.notRequired(PasskeyEntity, "user_name");
      assertEntityProperty.nullable(PasskeyEntity, "user_name");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(5);

      const dto = defaultPasskeyDto();
      const entity = new PasskeyEntity(dto);

      expect(entity.credentialId).toStrictEqual(dto.credential_id);
      expect(entity.rpId).toStrictEqual("example.com");
      expect(entity.userName).toStrictEqual("burak@example.com");
      expect(entity.algorithm).toStrictEqual(-7);
      expect(entity.counter).toStrictEqual(0);
    });

    it("throws when a required field is missing", () => {
      expect.assertions(4);

      const missingCredentialId = defaultPasskeyDto();
      delete missingCredentialId.credential_id;
      expect(() => new PasskeyEntity(missingCredentialId)).toThrow();

      const missingRpId = defaultPasskeyDto();
      delete missingRpId.rp_id;
      expect(() => new PasskeyEntity(missingRpId)).toThrow();

      const missingPrivateKey = defaultPasskeyDto();
      delete missingPrivateKey.private_key;
      expect(() => new PasskeyEntity(missingPrivateKey)).toThrow();

      const missingAlgorithm = defaultPasskeyDto();
      delete missingAlgorithm.algorithm;
      expect(() => new PasskeyEntity(missingAlgorithm)).toThrow();
    });
  });

  describe("::createFromDefault", () => {
    it("creates with the ES256 default algorithm", () => {
      expect.assertions(2);
      const entity = PasskeyEntity.createFromDefault({}, { validate: false });
      expect(entity.algorithm).toStrictEqual(PASSKEY_ALGORITHM_ES256);
      expect(entity.counter).toStrictEqual(0);
    });
  });

  describe("::getters", () => {
    it("returns null for optional fields when absent", () => {
      expect.assertions(2);
      const dto = defaultPasskeyDto();
      delete dto.user_handle;
      delete dto.public_key;
      const entity = new PasskeyEntity(dto);
      expect(entity.userHandle).toBeNull();
      expect(entity.publicKey).toBeNull();
    });
  });
});
