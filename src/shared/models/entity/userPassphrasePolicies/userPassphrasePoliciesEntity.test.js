/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import each from "jest-each";
import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "..//abstract/entityValidationError";
import UserPassphrasePoliciesEntity from "./userPassphrasePoliciesEntity";
import { defaultUserPassphrasePoliciesDto } from "./userPassphrasePoliciesEntity.test.data";

describe("UserPassphrasePolicies entity", () => {
  it("schema must validate", () => {
    EntitySchema.validateSchema(UserPassphrasePoliciesEntity.ENTITY_NAME, UserPassphrasePoliciesEntity.getSchema());
  });

  it("should accept a mininal valid DTO", () => {
    expect.assertions(1);
    const minmalDto = defaultUserPassphrasePoliciesDto();

    expect(() => new UserPassphrasePoliciesEntity(minmalDto)).not.toThrow();
  });

  it("should throw an exception if required fields are not present", () => {
    const requiredFieldNames = UserPassphrasePoliciesEntity.getSchema().required;
    const requiredFieldCount = 2;
    expect.assertions(requiredFieldCount * 2 + 1);

    expect(requiredFieldNames.length).toStrictEqual(requiredFieldCount);

    for (let i = 0; i < requiredFieldNames.length; i++) {
      const fieldName = requiredFieldNames[i];
      const dto = defaultUserPassphrasePoliciesDto();
      delete dto[fieldName];
      try {
        new UserPassphrasePoliciesEntity(dto);
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.hasError(fieldName, "required")).toStrictEqual(true);
      }
    }
  });

  each([
    { dto: { id: "string but not uuid" }, errorType: "format" },
    { dto: { id: -1 }, errorType: "type" },

    { dto: { external_dictionary_check: 0 }, errorType: "type" },

    { dto: { entropy_minimum: true }, errorType: "type" },
    { dto: { entropy_minimum: "50" }, errorType: "type" },
    { dto: { entropy_minimum: 30 }, errorType: "minimum" },
    { dto: { entropy_minimum: 250 }, errorType: "maximum" },

    { dto: { created: "string but not a date" }, errorType: "format" },
    { dto: { created: -1 }, errorType: "type" },

    { dto: { created_by: "string but not uuid" }, errorType: "format" },
    { dto: { created_by: -1 }, errorType: "type" },

    { dto: { modified: "string but not a date" }, errorType: "format" },
    { dto: { modified: -1 }, errorType: "type" },

    { dto: { modified_by: "string but not uuid" }, errorType: "format" },
    { dto: { modified_by: -1 }, errorType: "type" },
  ]).describe("should throw an exception if DTO contains invalid values", (scenario) => {
    it(`scenario: ${JSON.stringify(scenario)}`, () => {
      expect.assertions(2);
      const fieldName = Object.keys(scenario.dto)[0];
      const erroneousDto = defaultUserPassphrasePoliciesDto(scenario.dto);

      try {
        new UserPassphrasePoliciesEntity(erroneousDto);
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.hasError(fieldName, scenario.errorType)).toStrictEqual(true);
      }
    });
  });
});
