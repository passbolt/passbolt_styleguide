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
import { isValidPasskeyRpId, parseRpIdFromUris } from "./passkeyRpIdUtils";

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

  describe("::parseRpIdFromUris", () => {
    it("should return the relying party id of a single https uri", () => {
      expect.assertions(2);
      expect(parseRpIdFromUris(["https://example.com"])).toStrictEqual("example.com");
      expect(parseRpIdFromUris(["https://localhost"])).toStrictEqual("localhost");
    });

    it.each([
      ["http", ["http://example.com"]],
      ["a port", ["https://example.com:8443"]],
      ["a path", ["https://example.com/login"]],
      ["a root path", ["https://example.com/"]],
      ["a query", ["https://example.com?a=b"]],
      ["a fragment", ["https://example.com#a"]],
      ["user info", ["https://user@example.com"]],
      ["an uppercase host", ["https://Example.com"]],
      ["an uppercase scheme", ["HTTPS://example.com"]],
      ["an ip address", ["https://127.0.0.1"]],
      ["no scheme", ["example.com"]],
      ["two entries", ["https://example.com", "https://example.com"]],
      ["no entry", []],
      ["a null entry", [null]],
      ["a too long host", [`https://${[LABEL_63, LABEL_63, LABEL_63, "a".repeat(58)].join(".")}.com`]],
    ])("should return null for %s", (_, uris) => {
      expect.assertions(1);
      expect(parseRpIdFromUris(uris)).toBeNull();
    });

    it("should return null when the uris are not an array", () => {
      expect.assertions(3);
      expect(parseRpIdFromUris(undefined)).toBeNull();
      expect(parseRpIdFromUris(null)).toBeNull();
      expect(parseRpIdFromUris("https://example.com")).toBeNull();
    });
  });
});
