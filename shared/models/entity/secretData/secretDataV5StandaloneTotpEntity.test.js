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
import SecretDataV5StandaloneTotpEntity from "./secretDataV5StandaloneTotpEntity";
import TotpEntity from "../totp/totpEntity";
import {defaultTotpDto} from "../totp/totpDto.test.data";
import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";

describe("SecretDataV5StandaloneEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5StandaloneTotpEntity.name, SecretDataV5StandaloneTotpEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(SecretDataV5StandaloneTotpEntity, "object_type");
      assertEntityProperty.required(SecretDataV5StandaloneTotpEntity, "object_type");
      assertEntityProperty.enumeration(SecretDataV5StandaloneTotpEntity, "object_type", [SECRET_DATA_OBJECT_TYPE], ["any other values"]);
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
      assertEntityProperty.assertAssociation(SecretDataV5StandaloneTotpEntity, "totp", {object_type: SECRET_DATA_OBJECT_TYPE}, successScenario, failScenario);
      assertEntityProperty.required(SecretDataV5StandaloneTotpEntity, "totp");
    });
  });

  describe("::associations", () => {
    it("associations should have totp in associations", () => {
      expect.assertions(1);
      expect(SecretDataV5StandaloneTotpEntity.associations).toStrictEqual({totp: TotpEntity});
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(1);
      const dto = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        totp: defaultTotpDto()
      };
      const entity = new SecretDataV5StandaloneTotpEntity(dto);

      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(2);
      const dto = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        totp: defaultTotpDto({secret_key: ""})
      };
      const entity = SecretDataV5StandaloneTotpEntity.createFromDefault({}, {validate: false});

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });

    it("create with data provided", () => {
      expect.assertions(2);
      const dto = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        totp: defaultTotpDto()
      };
      const entity = SecretDataV5StandaloneTotpEntity.createFromDefault(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
  });
});
