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
import SecretDataV4DefaultTotpEntity from "./secretDataV4DefaultTotpEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {
  defaultSecretDataV4DefaultTotpEntityDto,
  minimalSecretDataV4DefaultTotpEntityDto,
} from "./secretDataV4DefaultTotpEntity.test.data";
import TotpEntity from "../totp/totpEntity";
import { defaultTotpDto } from "../totp/totpDto.test.data";

describe("SecretDataV4DefaultTotpEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV4DefaultTotpEntity.name, SecretDataV4DefaultTotpEntity.getSchema());
    });

    it("validates password property", () => {
      assertEntityProperty.string(SecretDataV4DefaultTotpEntity, "password");
      assertEntityProperty.required(SecretDataV4DefaultTotpEntity, "password");
      assertEntityProperty.maxLength(SecretDataV4DefaultTotpEntity, "password", 4096);
    });

    it("validates totp property", () => {
      expect.assertions(3);

      const dto = minimalSecretDataV4DefaultTotpEntityDto();

      const successScenario = [{ scenario: "a valid totp", value: defaultTotpDto() }];
      const failScenario = [
        {
          scenario: "The totp validation should failed.",
          value: defaultTotpDto({
            algorithm: "not an algorithm",
          }),
        },
      ];
      assertEntityProperty.assertAssociation(SecretDataV4DefaultTotpEntity, "totp", dto, successScenario, failScenario);
      assertEntityProperty.required(SecretDataV4DefaultTotpEntity, "totp");
    });

    it("validates description property", () => {
      assertEntityProperty.string(SecretDataV4DefaultTotpEntity, "description");
      assertEntityProperty.nullable(SecretDataV4DefaultTotpEntity, "description");
      assertEntityProperty.maxLength(SecretDataV4DefaultTotpEntity, "description", 10000);
    });
  });

  describe("::associations", () => {
    it("associations should have totp in associations", () => {
      expect.assertions(1);
      expect(SecretDataV4DefaultTotpEntity.associations).toStrictEqual({ totp: TotpEntity });
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(2);
      const dto = minimalSecretDataV4DefaultTotpEntityDto();
      const entity = new SecretDataV4DefaultTotpEntity(dto);

      expect(entity.password).toStrictEqual(dto.password);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(3);

      const dto = defaultSecretDataV4DefaultTotpEntityDto();
      const entity = new SecretDataV4DefaultTotpEntity(dto);

      expect(entity.password).toStrictEqual(dto.password);
      expect(entity.description).toStrictEqual(dto.description);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(3);
      const dto = minimalSecretDataV4DefaultTotpEntityDto();
      dto.totp.secret_key = "";
      const entity = SecretDataV4DefaultTotpEntity.createFromDefault({}, { validate: false });

      expect(entity.password).toStrictEqual("");
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
      expect(entity.description).toBeUndefined();
    });

    it("create with data provided", () => {
      expect.assertions(3);
      const dto = defaultSecretDataV4DefaultTotpEntityDto();
      const entity = SecretDataV4DefaultTotpEntity.createFromDefault(dto);

      expect(entity.password).toStrictEqual(dto.password);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
      expect(entity.description).toStrictEqual(dto.description);
    });
  });

  describe("::getDefaultProp", () => {
    it("get default password", () => {
      expect.assertions(1);
      expect(SecretDataV4DefaultTotpEntity.getDefaultProp("password")).toStrictEqual("");
    });

    it("get default description", () => {
      expect.assertions(1);
      expect(SecretDataV4DefaultTotpEntity.getDefaultProp("description")).toStrictEqual("");
    });

    it("get default totp", () => {
      expect.assertions(1);
      expect(SecretDataV4DefaultTotpEntity.getDefaultProp("totp")).toStrictEqual(
        TotpEntity.createFromDefault({}, { validate: false }).toDto(),
      );
    });

    it("get default unknown", () => {
      expect.assertions(1);
      expect(SecretDataV4DefaultTotpEntity.getDefaultProp("unknown")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV4DefaultTotpEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return true", () => {
      const dto = defaultSecretDataV4DefaultTotpEntityDto();
      const entity = new SecretDataV4DefaultTotpEntity(dto);
      expect(entity.areSecretsDifferent({ password: dto.password, totp: dto.totp })).toBeTruthy();
    });

    it("should return false", () => {
      const dto = defaultSecretDataV4DefaultTotpEntityDto();
      const entity = new SecretDataV4DefaultTotpEntity(dto);
      expect(entity.areSecretsDifferent(dto)).toBeFalsy();
    });
  });
});
