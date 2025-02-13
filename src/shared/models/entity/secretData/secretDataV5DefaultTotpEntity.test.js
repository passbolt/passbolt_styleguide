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
import {defaultTotpDto} from "./secretDataV4DefaultTotpEntity.test.data";
import SecretDataV5DefaultTotpEntity from "./secretDataV5DefaultTotpEntity";
import {defaultSecretDataV5DefaultTotpEntityDto, minimalSecretDataV5DefaultTotpEntityDto} from "./secretDataV5DefaultTotpEntity.test.data";

describe("SecretDataV5DefaultTotpEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5DefaultTotpEntity.name, SecretDataV5DefaultTotpEntity.getSchema());
    });

    it("validates password property", () => {
      assertEntityProperty.string(SecretDataV5DefaultTotpEntity, "password");
      assertEntityProperty.nullable(SecretDataV5DefaultTotpEntity, "password");
      assertEntityProperty.maxLength(SecretDataV5DefaultTotpEntity, "password", 4096);
    });

    it("validates totp property", () => {
      expect.assertions(3);

      const dto = minimalSecretDataV5DefaultTotpEntityDto();

      const successScenario = [
        {scenario: "a valid totp", value: defaultTotpDto()},
      ];
      const failScenario = [
        {scenario: "The totp validation should failed.", value: defaultTotpDto({
          algorithm: "not an algorithm"
        })},
      ];
      assertEntityProperty.assertAssociation(SecretDataV5DefaultTotpEntity, "totp", dto, successScenario, failScenario);
      assertEntityProperty.required(SecretDataV5DefaultTotpEntity, "totp");
    });

    it("validates description property", () => {
      assertEntityProperty.string(SecretDataV5DefaultTotpEntity, "description");
      assertEntityProperty.nullable(SecretDataV5DefaultTotpEntity, "description");
      assertEntityProperty.maxLength(SecretDataV5DefaultTotpEntity, "description", 10000);
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal valid DTO is provided", () => {
      expect.assertions(2);
      const dto = minimalSecretDataV5DefaultTotpEntityDto();
      const entity = new SecretDataV5DefaultTotpEntity(dto);

      expect(entity._props.password).toStrictEqual(dto.password);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(3);

      const dto = defaultSecretDataV5DefaultTotpEntityDto();
      const entity = new SecretDataV5DefaultTotpEntity(dto);

      expect(entity._props.password).toStrictEqual(dto.password);
      expect(entity._props.description).toStrictEqual(dto.description);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
  });
});
