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
 * @since         5.12.0
 */

import EntitySchema from "../abstract/entitySchema";
import { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";
import SecretDataV5StandalonePinCodeEntity from "./secretDataV5StandalonePinCodeEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import { defaultSecretDataV5StandalonePinCodeDto } from "./secretDataV5StandalonePinCodeEntity.test.data";

describe("secretDataV5StandalonePinCodeEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(
        SecretDataV5StandalonePinCodeEntity.name,
        SecretDataV5StandalonePinCodeEntity.getSchema(),
      );
    });

    it("validates object_type property", () => {
      assertEntityProperty.enumeration(
        SecretDataV5StandalonePinCodeEntity,
        "object_type",
        [SECRET_DATA_OBJECT_TYPE],
        ["any other values"],
      );
    });

    it("validates pin_code property", () => {
      assertEntityProperty.string(SecretDataV5StandalonePinCodeEntity, "pin_code");
      assertEntityProperty.required(SecretDataV5StandalonePinCodeEntity, "pin_code");
      assertEntityProperty.minLength(SecretDataV5StandalonePinCodeEntity, "pin_code", 4);
      assertEntityProperty.maxLength(SecretDataV5StandalonePinCodeEntity, "pin_code", 12);
    });

    it("validates description property", () => {
      assertEntityProperty.string(SecretDataV5StandalonePinCodeEntity, "description");
      assertEntityProperty.notRequired(SecretDataV5StandalonePinCodeEntity, "description");
      assertEntityProperty.nullable(SecretDataV5StandalonePinCodeEntity, "description");
      assertEntityProperty.maxLength(SecretDataV5StandalonePinCodeEntity, "description", 50000);
    });

    it("validates pin_code accepts only numeric strings", () => {
      expect.assertions(2);

      const dto = defaultSecretDataV5StandalonePinCodeDto({ pin_code: "1234" });
      const entity = new SecretDataV5StandalonePinCodeEntity(dto);
      expect(entity.pinCode).toStrictEqual("1234");

      expect(
        () => new SecretDataV5StandalonePinCodeEntity(defaultSecretDataV5StandalonePinCodeDto({ pin_code: "12ab" })),
      ).toThrow();
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(3);

      const dto = defaultSecretDataV5StandalonePinCodeDto();
      const entity = new SecretDataV5StandalonePinCodeEntity(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.pinCode).toStrictEqual(dto.pin_code);
      expect(entity.description).toStrictEqual(dto.description);
    });
  });

  describe("::createFromDefault", () => {
    it("create with no data provided", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV5StandalonePinCodeDto();
      const entity = SecretDataV5StandalonePinCodeEntity.createFromDefault({}, { validate: false });

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.pinCode).toStrictEqual("");
    });

    it("create with data provided", () => {
      expect.assertions(2);
      const dto = defaultSecretDataV5StandalonePinCodeDto();
      const entity = SecretDataV5StandalonePinCodeEntity.createFromDefault(dto);

      expect(entity.objectType).toStrictEqual(dto.object_type);
      expect(entity.pinCode).toStrictEqual(dto.pin_code);
    });
  });

  describe("::getDefaultProp", () => {
    it("get default pin_code", () => {
      expect.assertions(1);
      expect(SecretDataV5StandalonePinCodeEntity.getDefaultProp("pin_code")).toStrictEqual("");
    });

    it("get default unknown", () => {
      expect.assertions(1);
      expect(SecretDataV5StandalonePinCodeEntity.getDefaultProp("unknown")).toBeUndefined();
    });

    it("throw error if prop name is not a string", () => {
      expect.assertions(1);
      expect(() => SecretDataV5StandalonePinCodeEntity.getDefaultProp({})).toThrow(TypeError);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return true", () => {
      const dto = defaultSecretDataV5StandalonePinCodeDto();
      const entity = SecretDataV5StandalonePinCodeEntity.createFromDefault(dto);
      expect(entity.areSecretsDifferent({ pin_code: "9999" })).toBeTruthy();
    });

    it("should return false", () => {
      const dto = defaultSecretDataV5StandalonePinCodeDto();
      const entity = new SecretDataV5StandalonePinCodeEntity(dto);
      expect(entity.areSecretsDifferent(dto)).toBeFalsy();
    });
  });
});
