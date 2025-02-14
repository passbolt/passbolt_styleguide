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
import SecretDataV4StandaloneEntity from "./secretDataV4StandaloneEntity";

describe("SecretDataV4StandaloneEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SecretDataV4StandaloneEntity.name, SecretDataV4StandaloneEntity.getSchema());
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
      assertEntityProperty.assertAssociation(SecretDataV4StandaloneEntity, "totp", {}, successScenario, failScenario);
      assertEntityProperty.required(SecretDataV4StandaloneEntity, "totp");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid DTO is provided", () => {
      expect.assertions(2);
      const dto = {
        totp: defaultTotpDto(),
      };
      const entity = new SecretDataV4StandaloneEntity(dto);

      expect(entity._props.password).toStrictEqual(dto.password);
      expect(entity.totp.toDto()).toStrictEqual(dto.totp);
    });
  });
});
