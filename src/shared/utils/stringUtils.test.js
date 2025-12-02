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
import {capitalizeFirstLetter, snakeCaseToCamelCase} from "./stringUtils";

describe("stringUtils", () => {
  describe('::snakeCaseToCamelCase', () => {
    it("should transform string snake case to camel case", () => {
      expect.assertions(6);

      expect(snakeCaseToCamelCase("test")).toStrictEqual("test");
      expect(snakeCaseToCamelCase('Test')).toBe('Test');
      expect(snakeCaseToCamelCase('foreign_key')).toBe('foreignKey');
      expect(snakeCaseToCamelCase('foreign_key_id')).toBe('foreignKeyId');
      expect(snakeCaseToCamelCase('foreignKeyId')).toBe('foreignKeyId');
      expect(snakeCaseToCamelCase('camel_case.strikes_again')).toBe('camelCase.strikesAgain');
    });

    it("should not crash if null is given", () => {
      expect.assertions(1);
      expect(() => snakeCaseToCamelCase(null)).not.toThrow();
    });
  });

  describe('::capitalizeFirstLetter', () => {
    it("should transform string to capitalize the first letter", () => {
      expect.assertions(4);
      expect(capitalizeFirstLetter("")).toStrictEqual("");
      expect(capitalizeFirstLetter("admin")).toStrictEqual("Admin");
      expect(capitalizeFirstLetter('User')).toBe('User');
      expect(capitalizeFirstLetter('group manager')).toBe('Group manager');
    });

    it("should not crash if null is given", () => {
      expect.assertions(1);
      expect(() => capitalizeFirstLetter(null)).not.toThrow();
    });
  });
});
