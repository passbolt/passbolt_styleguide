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
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import SecretDataV4StandaloneTotpEntity from "./secretDataV4StandaloneTotpEntity";
import TotpEntity from "../totp/totpEntity";
import {defaultTotpDto} from "../totp/totpDto.test.data";

describe("SecretDataV4StandaloneEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV4StandaloneTotpEntity.name, SecretDataV4StandaloneTotpEntity.getSchema());
    });

    it("validates totp property", () => {
      expect.assertions(3);

      const successScenario = [
        {scenario: "a valid totp", value: defaultTotpDto()},
      ];
      const failScenario = [
        {scenario: "The totp validation should failed.", value: defaultTotpDto({
          algorithm: "not an algorithm"
        })},
      ];
      assertEntityProperty.assertAssociation(SecretDataV4StandaloneTotpEntity, "totp", {}, successScenario, failScenario);
      assertEntityProperty.required(SecretDataV4StandaloneTotpEntity, "totp");
    });
  });

  describe("::associations", () => {
    it("associations should have totp in associations", () => {
      expect.assertions(1);
      expect(SecretDataV4StandaloneTotpEntity.associations).toStrictEqual({totp: TotpEntity});
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(2);
      const dto = {
        totp: defaultTotpDto(),
      };
      const entity = new SecretDataV4StandaloneTotpEntity(dto);

      expect(entity._props.password).toStrictEqual(dto.password);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(1);
      const dto = {
        totp: defaultTotpDto({secret_key: ""})
      };
      const entity = SecretDataV4StandaloneTotpEntity.createFromDefault({}, {validate: false});

      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });

    it("create with data provided", () => {
      expect.assertions(1);
      const dto = {
        totp: defaultTotpDto()
      };
      const entity = SecretDataV4StandaloneTotpEntity.createFromDefault(dto);

      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
  });

  describe("::getDefaultProp", () => {
    it("get default totp", () => {
      expect.assertions(1);
      expect(SecretDataV4StandaloneTotpEntity.getDefaultProp("totp")).toStrictEqual(TotpEntity.createFromDefault({}, {validate: false}).toDto());
    });

    it("get default unknown", () => {
      expect.assertions(1);
      expect(SecretDataV4StandaloneTotpEntity.getDefaultProp("unknown")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV4StandaloneTotpEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return true", () => {
      const dto = {
        totp: defaultTotpDto(),
      };
      const entity = new SecretDataV4StandaloneTotpEntity(dto);
      dto.totp.digits = 7;
      expect(entity.areSecretsDifferent(dto)).toBeTruthy();
    });

    it("should return false", () => {
      const dto = {
        totp: defaultTotpDto(),
      };
      const entity = new SecretDataV4StandaloneTotpEntity(dto);
      expect(entity.areSecretsDifferent(dto)).toBeFalsy();
    });
  });
});
