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
 * @since         5.17.0
 */

import React from "react";
import { render } from "@testing-library/react";
import { containsUnsafeUrl, linkifyText } from "./linkifyUtils";

const renderNodes = (text) => render(<span>{linkifyText(text)}</span>);

const IGNORED_URLS = [
  "javascript:alert(1)",
  "vbscript:msgbox(1)",
  "data:text/html,<script>alert(1)</script>",
  "file:///etc/passwd",
  "ftp://files.example.com/key.asc",
  "ldap://directory.example.com:389",
  "ssh://user@host",
];

const REJECTED_URLS = ["https://[", "https://:80", "https://a:b:c", "http://]"];

describe("linkifyUtils", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("::linkifyText", () => {
    it("should return the string untouched when it embeds no URL", () => {
      expect.assertions(2);
      const { container } = renderNodes("Set the PASSBOLT_SECURITY_SSO_EGRESS_GUARD_ENABLED variable.");
      expect(container.querySelectorAll("a")).toHaveLength(0);
      expect(container.textContent).toEqual("Set the PASSBOLT_SECURITY_SSO_EGRESS_GUARD_ENABLED variable.");
    });

    it("should turn a URL into an anchor that opens in a new tab safely", () => {
      expect.assertions(4);
      const { container } = renderNodes("See. https://www.passbolt.com/help/tech/install#toc_gpg");
      const link = container.querySelector("a");
      expect(link.getAttribute("href")).toEqual("https://www.passbolt.com/help/tech/install#toc_gpg");
      expect(link.getAttribute("target")).toEqual("_blank");
      expect(link.getAttribute("rel")).toEqual("noopener noreferrer");
      expect(link.textContent).toEqual("https://www.passbolt.com/help/tech/install#toc_gpg");
    });

    it("should keep the text around the URL and leave backticks literal", () => {
      expect.assertions(3);
      const text =
        "See `timedatectl | grep -i -A 1 clock`. More information: https://www.passbolt.com/docs/hosting/configure/ntp/";
      const { container } = renderNodes(text);
      expect(container.textContent).toEqual(text);
      expect(container.querySelectorAll("a")).toHaveLength(1);
      expect(container.querySelector("a").getAttribute("href")).toEqual(
        "https://www.passbolt.com/docs/hosting/configure/ntp/",
      );
    });

    it("should give back a trailing backtick when the URL sits inside a command", () => {
      expect.assertions(2);
      const text = "Run `curl https://www.passbolt.com/docs/`";
      const { container } = renderNodes(text);
      expect(container.querySelector("a").getAttribute("href")).toEqual("https://www.passbolt.com/docs/");
      expect(container.textContent).toEqual(text);
    });

    it("should not swallow the full stop that ends the sentence into the href", () => {
      expect.assertions(2);
      const { container } = renderNodes("Read https://www.passbolt.com/docs/.");
      expect(container.querySelector("a").getAttribute("href")).toEqual("https://www.passbolt.com/docs/");
      expect(container.textContent).toEqual("Read https://www.passbolt.com/docs/.");
    });

    it("should keep a bracket the URL opened and give back one it did not", () => {
      expect.assertions(3);
      const text = "(see https://en.wikipedia.org/wiki/Network_Time_Protocol_(NTP)).";
      const { container } = renderNodes(text);
      expect(container.querySelector("a").getAttribute("href")).toEqual(
        "https://en.wikipedia.org/wiki/Network_Time_Protocol_(NTP)",
      );
      expect(container.querySelector("a").textContent).toEqual(
        "https://en.wikipedia.org/wiki/Network_Time_Protocol_(NTP)",
      );
      expect(container.textContent).toEqual(text);
    });

    it("should linkify every URL of a string, with the href normalised by sanitizeUrl", () => {
      expect.assertions(3);
      const text = "First http://one.example.com then https://two.example.com end";
      const { container } = renderNodes(text);
      const links = container.querySelectorAll("a");
      expect(links).toHaveLength(2);
      expect(Array.from(links).map((link) => link.getAttribute("href"))).toEqual([
        "http://one.example.com/",
        "https://two.example.com/",
      ]);
      expect(container.textContent).toEqual(text);
    });

    it("should link an upper-case URL with the href normalised by sanitizeUrl, keeping its text", () => {
      expect.assertions(2);
      const { container } = renderNodes("See HTTPS://WWW.PASSBOLT.COM/DOCS/");
      expect(container.querySelector("a").getAttribute("href")).toEqual("https://www.passbolt.com/DOCS/");
      expect(container.querySelector("a").textContent).toEqual("HTTPS://WWW.PASSBOLT.COM/DOCS/");
    });

    it("should render markup coming from the server as text and never as HTML", () => {
      expect.assertions(2);
      const text = '<img src=x onerror="alert(1)"> and <script>alert(1)</script>';
      const { container } = renderNodes(text);
      expect(container.querySelectorAll("img, script")).toHaveLength(0);
      expect(container.textContent).toEqual(text);
    });

    it.each(IGNORED_URLS)("should never turn %s into an anchor", (url) => {
      expect.assertions(2);
      const text = `Open ${url} now`;
      const { container } = renderNodes(text);
      expect(container.querySelectorAll("a")).toHaveLength(0);
      expect(container.textContent).toEqual(text);
    });

    it("should not take a user:group pair of a command for a URL", () => {
      expect.assertions(2);
      const text = "sudo chown -Rf www-data:www-data /var/www/html/config/jwt/";
      const { container } = renderNodes(text);
      expect(container.querySelectorAll("a")).toHaveLength(0);
      expect(container.textContent).toEqual(text);
    });

    it("should leave a URL sanitizeUrl rejects as plain text, losing none of the sentence", () => {
      expect.assertions(3);
      jest.spyOn(console, "error").mockImplementation(() => {});
      const text = "Set the full base url to https://[ then see https://www.passbolt.com/docs/";
      const { container } = renderNodes(text);
      expect(container.querySelectorAll("a")).toHaveLength(1);
      expect(container.querySelector("a").getAttribute("href")).toEqual("https://www.passbolt.com/docs/");
      expect(container.textContent).toEqual(text);
    });

    it("should return the same nodes on consecutive calls", () => {
      expect.assertions(2);
      const text = "See https://www.passbolt.com/docs/";
      const { container: first } = renderNodes(text);
      const { container: second } = renderNodes(text);
      expect(linkifyText(text)).toHaveLength(2);
      expect(second.innerHTML).toEqual(first.innerHTML);
    });

    it("should return an empty array for an empty or non string input", () => {
      expect.assertions(3);
      expect(linkifyText("")).toEqual([]);
      expect(linkifyText(null)).toEqual([]);
      expect(linkifyText(undefined)).toEqual([]);
    });
  });

  describe("::containsUnsafeUrl", () => {
    beforeEach(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it.each(REJECTED_URLS)("should be true for %s, which sanitizeUrl rejects", (url) => {
      expect.assertions(1);
      expect(containsUnsafeUrl(`Open ${url} now`)).toBe(true);
    });

    it("should be false for an http and an https URL", () => {
      expect.assertions(3);
      expect(containsUnsafeUrl("See http://php.net/manual/en/gnupg.installation.php")).toBe(false);
      expect(containsUnsafeUrl("See https://www.passbolt.com/docs/.")).toBe(false);
      expect(containsUnsafeUrl("See HTTPS://WWW.PASSBOLT.COM/DOCS/")).toBe(false);
    });

    it.each(IGNORED_URLS)("should be false for %s, which the matcher never examines", (url) => {
      expect.assertions(1);
      expect(containsUnsafeUrl(`Fetch it from ${url} before retrying.`)).toBe(false);
    });

    it("should be false for a string with no URL", () => {
      expect.assertions(2);
      expect(containsUnsafeUrl("Set debug = false; in /var/www/html/config/passbolt.php")).toBe(false);
      expect(containsUnsafeUrl("sudo chown -Rf root:www-data /var/www/html/config/jwt/")).toBe(false);
    });

    it("should be true when a rejected URL sits beside a safe one", () => {
      expect.assertions(1);
      expect(containsUnsafeUrl("See https://www.passbolt.com/docs/ or https://[")).toBe(true);
    });

    it("should be false for an empty or non string input", () => {
      expect.assertions(3);
      expect(containsUnsafeUrl("")).toBe(false);
      expect(containsUnsafeUrl(null)).toBe(false);
      expect(containsUnsafeUrl(undefined)).toBe(false);
    });

    it("should warn naming the source and the rejected URL", () => {
      expect.assertions(2);
      containsUnsafeUrl("Set the full base url to https://[ in passbolt.php", "ssl-fullbaseurl");
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/ssl-fullbaseurl.*https:\/\/\[/));
    });

    it("should not warn when every URL is safe", () => {
      expect.assertions(1);
      containsUnsafeUrl("See https://www.passbolt.com/docs/");
      expect(console.warn).not.toHaveBeenCalled();
    });
  });
});
