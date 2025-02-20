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
import SecretDataV5StandaloneEntity from "./secretDataV5StandaloneEntity";
import SecretDataV5DefaultEntity from "./secretDataV5DefaultEntity";

describe("SecretDataV5StandaloneEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV5StandaloneEntity.name, SecretDataV5StandaloneEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(SecretDataV5DefaultEntity, "object_type");
      assertEntityProperty.required(SecretDataV5DefaultEntity, "object_type");
      assertEntityProperty.enumeration(SecretDataV5DefaultEntity, "object_type", ["PASSBOLT_SECRET_DATA"], ["any other values"]);
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
      assertEntityProperty.assertAssociation(SecretDataV5StandaloneEntity, "totp", {object_type: "PASSBOLT_SECRET_DATA"}, successScenario, failScenario);
      assertEntityProperty.required(SecretDataV5StandaloneEntity, "totp");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(1);
      const dto = {
        object_type: "PASSBOLT_SECRET_DATA",
        totp: defaultTotpDto()
      };
      const entity = new SecretDataV5StandaloneEntity(dto);

      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
  });
});
