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
 * @since         5.2.0
 */
import CanSuggestService from "./canSuggestService";

describe("CanSuggestService", () => {
  describe("::canSuggestUris", () => {
    it("should suggest matching domain urls", () => {
      expect(CanSuggestService.canSuggestUris("https://www.passbolt.com", ["https://www.passbolt.com", "https://email"])).toBe(true);
      expect(CanSuggestService.canSuggestUris("https://email", ["https://www.passbolt.com", "https://email"])).toBe(true);
    });

    it("shouldn't suggest urls not matching the exact domain", () => {
      expect(CanSuggestService.canSuggestUris("https://www.not-passbolt.com", ["passbolt.com", "http://email", "email"])).toBe(false);
      expect(CanSuggestService.canSuggestUris("https://www.attacker-passbolt.com", ["passbolt.com", "http://email", "email"])).toBe(false);
      expect(CanSuggestService.canSuggestUris("https://email", ["passbolt.com", "http://email"])).toBe(false);
      expect(CanSuggestService.canSuggestUris("https://www.not-passbolt.com", null)).toBe(false);
      expect(CanSuggestService.canSuggestUris("https://www.not-passbolt.com", undefined)).toBe(false);
    });
  });

  describe("::canSuggestUri", () => {
    it("should suggest matching domain urls", () => {
      expect(CanSuggestService.canSuggestUri("ssh://www.passbolt.com", "ssh://www.passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("http://www.passbolt.com", "http://www.passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ftp://www.passbolt.com", "ftp://www.passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com", "https://www.passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com:443", "https://www.passbolt.com:443")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://email", "https://email")).toBe(true);
    });

    it("should suggest matching international domain urls", () => {
      expect(CanSuggestService.canSuggestUri(new URL("https://àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ.com").origin,
        "https://àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri(new URL("https://الش.com").origin, "https://الش.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri(new URL("https://Ид.com").origin, "https://Ид.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri(new URL("https://完善.com").origin, "https://完善.com")).toBe(true);
    });

    it("should suggest matching IPv4 and IPv6 urls", () => {
      expect(CanSuggestService.canSuggestUri("ssh://[0:0:0:0:0:0:0:1]", "ssh://[0:0:0:0:0:0:0:1]")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ssh://127.0.0.1", "ssh://127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("http://[0:0:0:0:0:0:0:1]", "http://[0:0:0:0:0:0:0:1]")).toBe(true);
      expect(CanSuggestService.canSuggestUri("http://127.0.0.1", "http://127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ftp://[0:0:0:0:0:0:0:1]", "ftp://[0:0:0:0:0:0:0:1]")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ftp://127.0.0.1", "ftp://127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://[0:0:0:0:0:0:0:1]", "https://[0:0:0:0:0:0:0:1]")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://127.0.0.1", "https://127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://[0:0:0:0:0:0:0:1]:443", "https://[0:0:0:0:0:0:0:1]:443")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://127.0.0.1:443", "https://127.0.0.1:443")).toBe(true);
    });

    it("should match and suggest short and long forms IPs", () => {
      expect(CanSuggestService.canSuggestUri("ssh://[0:0:0:0:0:0:0:1]", "ssh://[::1]")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ssh://[::1]", "ssh://[0:0:0:0:0:0:0:1]")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://127.1", "https://127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://127.0.0.1", "https://127.0.1")).toBe(true);
    });

    it("should suggest urls without defined scheme", () => {
      expect(CanSuggestService.canSuggestUri("http://127.0.0.1", "127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("http://www.passbolt.com", "www.passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://127.0.0.1", "127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com", "www.passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ftp://127.0.0.1", "127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ftp://www.passbolt.com", "www.passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ssh://127.0.0.1", "127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("ssh://www.passbolt.com", "www.passbolt.com")).toBe(true);
    });

    it("should suggest urls without defined port", () => {
      expect(CanSuggestService.canSuggestUri("http://127.0.0.1:8080", "127.0.0.1")).toBe(true);
      expect(CanSuggestService.canSuggestUri("http://127.0.0.1:4443", "127.0.0.1")).toBe(true);
    });

    it("should suggest url with a parent domain", () => {
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com", "passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com", "https://passbolt.com")).toBe(true);
      expect(CanSuggestService.canSuggestUri("https://billing.admin.passbolt.com", "passbolt.com")).toBe(true);
    });

    it("shouldn't suggest urls not matching the exact domain", () => {
      expect(CanSuggestService.canSuggestUri("https://www.not-passbolt.com", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://bolt.com", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://pass", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://www.attacker-passbolt.com", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://titan.email", "email")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://email", "http://email")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://titan.email", "https://email")).toBe(false);
    });

    it("shouldn't suggest IPs not matching the exact domain", () => {
      // fake IPs url with a subdomain "fake" trying to phish a suggested IP url.
      expect(CanSuggestService.canSuggestUri("https://fake.127.0.0.1", "127.0.0.1")).toBe(false);
      // fake IPs url with a subdomain "127", only composed of digit,  trying to phish a suggested IP url.
      expect(CanSuggestService.canSuggestUri("https://127.127.0.0.1", "127.0.0.1")).toBe(false);
      // invalid IPv6 url, one extra digit. The URL primitive throw an exception on this invalid url.
      expect(CanSuggestService.canSuggestUri("ssh://[0:0:0:0:0:0:0:0:1]", "ssh://[0:0:0:0:0:0:0:1]")).toBe(false);
    });

    it("shouldn't suggest urls with not matching subdomain to parent urls", () => {
      expect(CanSuggestService.canSuggestUri("https://passbolt.com", "www.passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://passbolt.com", "https://www.passbolt.com")).toBe(false);
    });

    it("should not suggest urls to an attacker url containing a subdomain looking alike a stored password url", () => {
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com.attacker.com", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com-attacker.com", "passbolt.com")).toBe(false);
    });

    it("should not suggest urls to an attacker url containing a parameter looking alike a stored password url", () => {
      expect(CanSuggestService.canSuggestUri("https://attacker.com?passbolt.com", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://attacker.com?passbolt.com", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://attacker.com?url=https://passbolt.com", "passbolt.com")).toBe(false);
    });

    it("should not suggest urls to an attacker url containing a hash looking alike a stored password url", () => {
      expect(CanSuggestService.canSuggestUri("https://attacker.com#passbolt.com", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://attacker.com#passbolt.com", "passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://attacker.com#url=https://passbolt.com", "passbolt.com")).toBe(false);
    });

    it("shouldn't suggest urls with a port looking alike a stored password url", () => {
      // This url is not considered valid by the URL primitive.
      expect(CanSuggestService.canSuggestUri("https://www.attacker.com:www.passbolt.com", "passbolt.com")).toBe(false);
    });

    it("shouldn't suggest IP urls to fake IPs urls", () => {
      expect(CanSuggestService.canSuggestUri("https://[::1]", "[::2]")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://[2001:4860:4860::8844]", "[2001:4860:4860::8888]")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://127.0.0.1", "127.0.0.2")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://127.1", "127.2")).toBe(false);
    });

    it("shouldn't suggest urls if the scheme is different", () => {
      expect(CanSuggestService.canSuggestUri("http://127.0.0.1", "https://127.0.0.1")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://127.0.0.1", "http://127.0.0.1")).toBe(false);
      expect(CanSuggestService.canSuggestUri("http://[::1]", "https://[::1]")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://[::1]", "http://[::1]")).toBe(false);
      expect(CanSuggestService.canSuggestUri("http://www.passbolt.com", "https://www.passbolt.com")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com", "http://www.passbolt.com")).toBe(false);

      expect(CanSuggestService.canSuggestUri("ftp://[::1]", "ftps://[::1]")).toBe(false);
      expect(CanSuggestService.canSuggestUri("ssh://[::1]", "https://[::1]")).toBe(false);
    });

    it("shouldn't suggest urls if the port is different", () => {
      expect(CanSuggestService.canSuggestUri("http://127.0.0.1", "127.0.0.1:444")).toBe(false);
      expect(CanSuggestService.canSuggestUri("http://www.passbolt.com", "www.passbolt.com:444")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://127.0.0.1", "127.0.0.1:80")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com", "www.passbolt.com:80")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://127.0.0.1:444", "127.0.0.1:443")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com:444", "www.passbolt.com:443")).toBe(false);

      /*
       * Ports are not deducted from urls schemes, that's why we expect http scheme to not match an url with a defined
       * port, even if it is the correct one.
       */
      expect(CanSuggestService.canSuggestUri("http://127.0.0.1", "127.0.0.1:80")).toBe(false);
      expect(CanSuggestService.canSuggestUri("https://www.passbolt.com", "www.passbolt.com:443")).toBe(false);
    });

    it("shouldn't suggest urls with no hostname to url with no hostname", () => {
      expect(CanSuggestService.canSuggestUri("https://no%20identified%20domain%20url.com", "no%20identified%20domain%20url")).toBe(false);
      expect(CanSuggestService.canSuggestUri("about:addons", "about:addons")).toBe(false);
      expect(CanSuggestService.canSuggestUri("about:addons", "no%20identified%20domain%20url")).toBe(false);
    });
  });
});

