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
 * @since         5.18.0
 */

import SearchParamsValidator from "./SearchParamsValidator";

describe("SearchParamsValidator", () => {
  describe("SearchParamsValidator::validate", () => {
    it.each([
      { search: "" },
      { search: "?error=code" },
      { search: "error=Code" },
      { search: "?foo=bar&error=code" },
      { search: new URLSearchParams("error=code") },
    ])("should return true for $search", (testCase) => {
      expect.assertions(1);

      expect(SearchParamsValidator.validate(testCase.search)).toBe(true);
    });

    it.each([
      { search: undefined },
      { search: null },
      { search: 42 },
      { search: {} },
      { search: ["error=code"] },
      { search: "?error=" },
      { search: "?error=abc123" },
      { search: "?error=abc%3Cscript%3E" },
      { search: "?error=a-b" },
      { search: "?pathname=/app/users&error=code" },
    ])("should return false for $search", (testCase) => {
      expect.assertions(1);

      expect(SearchParamsValidator.validate(testCase.search)).toBe(false);
    });
  });

  describe("SearchParamsValidator::getErrorCode", () => {
    it.each([
      { search: "?error=code", expected: "code" },
      { search: "?foo=bar&error=code", expected: "code" },
      { search: new URLSearchParams("error=code"), expected: "code" },
      { search: "?error=first&error=second", expected: "first" },
      { search: "?foo=bar", expected: null },
      { search: "?error=abc%3Cscript%3E", expected: null },
      { search: "?pathname=/app/users&error=code", expected: null },
      { search: undefined, expected: null },
    ])("should return $expected for $search", (testCase) => {
      expect.assertions(1);

      expect(SearchParamsValidator.getErrorCode(testCase.search)).toBe(testCase.expected);
    });
  });
});
