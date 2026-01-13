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
 * @since         6.0.0
 */
import each from "jest-each";
import { assertNumber } from "./assertions";

describe("Assertions", () => {
  describe("Assertions::assertNumber", () => {
    each([
      { scenario: "Positive number", value: 42 },
      { scenario: "Negative number", value: -42 },
      { scenario: "0", value: 0 },
      { scenario: "Float", value: 42.2 },
      { scenario: "undefined", value: undefined },
    ]).describe(`Should not throw an error if the parameter is valid`, (props) => {
      it(`Scenario: ${props.scenario}`, () => {
        expect.assertions(1);
        expect(() => assertNumber(props.value)).not.toThrow();
      });
    });

    each([
      { scenario: "String number", value: "1" },
      { scenario: "true", value: true },
      { scenario: "false", value: false },
      { scenario: "null", value: null },
      { scenario: "object", value: {} },
      { scenario: "array", value: {} },
    ]).describe(`Should throw an error if the parameter is not valid`, (props) => {
      it(`Scenario: ${props.scenario}`, () => {
        expect.assertions(1);
        expect(() => assertNumber(props.value)).toThrow();
      });
    });
  });
});
