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
import { isRpIdOfUrl, isValidPasskeyRpId } from "./passkeyRpIdUtils";

const LABEL_63 = "a".repeat(63);

describe("passkeyRpIdUtils", () => {
  describe("::isValidPasskeyRpId", () => {
    it.each([
      "example.com",
      "localhost",
      "login.example.co.uk",
      "my_site.example.com",
      "1password.com",
      "xn--bcher-kva.example",
      "xn--p1ai",
      `${LABEL_63}.com`,
      `${[LABEL_63, LABEL_63, LABEL_63, "a".repeat(57)].join(".")}.com`,
    ])("should accept %s", (rpId) => {
      expect.assertions(1);
      expect(isValidPasskeyRpId(rpId)).toStrictEqual(true);
    });

    it.each([
      "",
      "127.0.0.1",
      "[::1]",
      "Example.com",
      "bücher.example",
      "example.com.",
      ".example.com",
      "example..com",
      "-example.com",
      "example-.com",
      "example.-com",
      "example.com-",
      "example.c_m",
      "example.1com",
      "example.com:443",
      `${"a".repeat(64)}.com`,
      `${[LABEL_63, LABEL_63, LABEL_63, "a".repeat(58)].join(".")}.com`,
    ])("should refuse %s", (rpId) => {
      expect.assertions(1);
      expect(isValidPasskeyRpId(rpId)).toStrictEqual(false);
    });

    it("should refuse a value which is not a string", () => {
      expect.assertions(3);
      expect(isValidPasskeyRpId(null)).toStrictEqual(false);
      expect(isValidPasskeyRpId(undefined)).toStrictEqual(false);
      expect(isValidPasskeyRpId(["example.com"])).toStrictEqual(false);
    });
  });

  describe("::isRpIdOfUrl", () => {
    it.each([
      ["github.com", "https://github.com/login", true],
      ["github.com", "https://www.github.com/", true],
      ["github.com", "https://notgithub.com/", false],
      ["www.github.com", "https://github.com/", false],
      ["github.com", "not a url", false],
      ["github.com", null, false],
      [null, "https://github.com/", false],
    ])("should tell whether %s belongs to the site of %s", (rpId, url, expected) => {
      expect.assertions(1);
      expect(isRpIdOfUrl(rpId, url)).toBe(expected);
    });
  });
});
