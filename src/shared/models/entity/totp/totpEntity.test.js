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
 * @since         4.5.0
 */
import TotpEntity from "./totpEntity";
import each from "jest-each";
import {defaultTotpDto} from "./totpDto.test.data";
import * as assertEntityProperty from "passbolt-styleguide/test/assert/assertEntityProperty";
import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";

describe("Totp entity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(TotpEntity.name, TotpEntity.getSchema());
    });

    it("validates secret_key property", () => {
      assertEntityProperty.string(TotpEntity, "secret_key");
      assertEntityProperty.minLength(TotpEntity, "secret_key", 1);
      assertEntityProperty.required(TotpEntity, "secret_key");
    });

    it("validates period property", () => {
      assertEntityProperty.integer(TotpEntity, "period");
      assertEntityProperty.minimum(TotpEntity, "period", 1);
      assertEntityProperty.required(TotpEntity, "period");
    });

    it("validates digits property", () => {
      assertEntityProperty.integer(TotpEntity, "digits");
      assertEntityProperty.minimum(TotpEntity, "digits", 6);
      assertEntityProperty.maximum(TotpEntity, "digits", 8);
      assertEntityProperty.required(TotpEntity, "digits");
    });

    it("validates algorithm property", () => {
      assertEntityProperty.string(TotpEntity, "algorithm");
      assertEntityProperty.enumeration(TotpEntity, "algorithm", ["SHA1", "SHA256", "SHA512"], ["RSA", "BASE64", "test"]);
      assertEntityProperty.required(TotpEntity, "algorithm");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(1);
      const dto = defaultTotpDto();
      const entity = new TotpEntity(dto);
      expect(entity.toDto()).toStrictEqual(dto);
    });

    each([
      {scenario: 'empty dto', dto: {}},
      {scenario: 'secret key not base32', dto: defaultTotpDto({secret_key: " 871H KBKB "})},
      {scenario: 'digits is not valid', dto: defaultTotpDto({digits: 10})},
      {scenario: 'period is not valid', dto: defaultTotpDto({period: 0})},
      {scenario: 'algorithm is not valid', dto: defaultTotpDto({algorithm: "AAA"})},
    ]).describe("constructor returns validation error if dto is not valid", test => {
      it(`Should not validate: ${test.scenario}`, async() => {
        expect.assertions(1);
        expect(() => new TotpEntity(test.dto)).toThrow(EntityValidationError);
      });
    });
  });

  describe("::marshal", () => {
    it("should sanitize the secret_key", () => {
      expect.assertions(1);
      const entity = new TotpEntity(defaultTotpDto({secret_key: " 572H +KBKéàùêB=_%$ "}));
      expect(entity.secretKey).toStrictEqual("572HKBKB");
    });

    it("Sanitising twice should give the same result", () => {
      expect.assertions(1);
      const entity = new TotpEntity(defaultTotpDto({secret_key: " 572H +KBKéàùêB=_%$ "}));
      const entity2 = new TotpEntity(entity.toDto());
      expect(entity2.secretKey).toStrictEqual("572HKBKB");
    });

    it("Sanitize valid DTO should remain the same", () => {
      expect.assertions(1);
      const entity = new TotpEntity(defaultTotpDto());
      expect(entity.secretKey).toStrictEqual(defaultTotpDto().secret_key);
    });
  });

  describe("::hasSecretKey", () => {
    it("should have a secret key", () => {
      expect.assertions(1);
      const entity = new TotpEntity(defaultTotpDto({secret_key: " 572H +KBKéàùêB=_%$ "}));
      expect(entity.hasSecretKey).toBeTruthy();
    });

    it("should not have a secret key", () => {
      expect.assertions(1);
      const entity = new TotpEntity(defaultTotpDto({secret_key: "    "}), {validate: false});
      expect(entity.secretKey).toBeFalsy();
    });
  });
});
