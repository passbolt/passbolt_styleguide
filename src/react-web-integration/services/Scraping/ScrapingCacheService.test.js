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
 * @since         5.15.0
 */

import ScrapingCacheService from "./ScrapingCacheService";
import TextNormalizer from "../../lib/InForm/TextNormalizer";
import { QUALIFICATION_TOKEN_ATTRS } from "../../lib/InForm/ScrapingDictionary";

/**
 * Create a detached input carrying the given attributes.
 * @param {Object<string, string>} [attributes] The attributes to set.
 * @returns {HTMLInputElement} The element.
 */
function input(attributes = {}) {
  const element = document.createElement("input");
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  return element;
}

describe("ScrapingCacheService", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    ScrapingCacheService._payloadByElement = new WeakMap();
    ScrapingCacheService._keywordsByElement = new WeakMap();
  });

  describe("ScrapingCacheService::getField / setField", () => {
    it("should return null for an element that has not been scraped", () => {
      expect.assertions(1);

      expect(ScrapingCacheService.getField(input())).toBeNull();
    });

    it("should return the payload stored for an element", () => {
      expect.assertions(1);

      const element = input();
      const payload = { role: "username" };
      ScrapingCacheService.setField(element, payload);

      expect(ScrapingCacheService.getField(element)).toBe(payload);
    });

    it("should return the stored payload from setField for call-site chaining", () => {
      expect.assertions(1);

      const payload = { role: "password" };

      expect(ScrapingCacheService.setField(input(), payload)).toBe(payload);
    });

    it("should overwrite a previously stored payload for the same element", () => {
      expect.assertions(1);

      const element = input();
      ScrapingCacheService.setField(element, { role: "username" });
      const next = { role: "password" };
      ScrapingCacheService.setField(element, next);

      expect(ScrapingCacheService.getField(element)).toBe(next);
    });

    it("should keep payloads isolated per element", () => {
      expect.assertions(2);

      const a = input();
      const b = input();
      const payloadA = { role: "username" };
      const payloadB = { role: "password" };
      ScrapingCacheService.setField(a, payloadA);
      ScrapingCacheService.setField(b, payloadB);

      expect(ScrapingCacheService.getField(a)).toBe(payloadA);
      expect(ScrapingCacheService.getField(b)).toBe(payloadB);
    });
  });

  describe("ScrapingCacheService::keywords", () => {
    it("should tokenize the qualification attributes into a deduplicated set", () => {
      expect.assertions(1);

      const element = input({ id: "user-name", name: "username", placeholder: "Your email" });

      expect(ScrapingCacheService.keywords(element)).toEqual(new Set(["user", "name", "username", "your", "email"]));
    });

    it("should deduplicate a token repeated across several attributes", () => {
      expect.assertions(1);

      // "login" appears in id, name and title but must collapse to a single token.
      const element = input({ id: "login", name: "login", title: "Login" });

      expect(ScrapingCacheService.keywords(element)).toEqual(new Set(["login"]));
    });

    it("should return an empty set when no qualification attribute is present", () => {
      expect.assertions(1);

      expect(ScrapingCacheService.keywords(input())).toEqual(new Set());
    });

    it("should ignore attributes that are not part of the qualification list", () => {
      expect.assertions(1);

      // `value` and `style` are not qualification-token attributes and must not leak into the tokens.
      const element = input({ value: "secret", style: "color: red" });

      expect(ScrapingCacheService.keywords(element)).toEqual(new Set());
    });

    it("should delegate tokenization to TextNormalizer.tokenize over the joined attribute values", () => {
      expect.assertions(2);

      const spy = jest.spyOn(TextNormalizer, "tokenize");
      const element = input({ id: "firstName", name: "lastName" });
      ScrapingCacheService.keywords(element);

      expect(spy).toHaveBeenCalledTimes(1);
      // Attribute values are concatenated (in QUALIFICATION_TOKEN_ATTRS order) and passed as one string.
      expect(spy).toHaveBeenCalledWith("firstName lastName");
    });

    it("should join present attribute values in QUALIFICATION_TOKEN_ATTRS order, skipping absent ones", () => {
      expect.assertions(1);

      const spy = jest.spyOn(TextNormalizer, "tokenize");
      // `title` precedes `type` in the list; `name` is absent and must be skipped without a gap.
      const element = input({ type: "email", title: "Login", id: "field" });
      ScrapingCacheService.keywords(element);

      expect(spy).toHaveBeenCalledWith("field Login email");
    });

    it("should return a cached set on subsequent calls without recomputing", () => {
      expect.assertions(2);

      const element = input({ id: "username" });
      const first = ScrapingCacheService.keywords(element);
      const spy = jest.spyOn(TextNormalizer, "tokenize");
      const second = ScrapingCacheService.keywords(element);

      expect(second).toBe(first);
      expect(spy).not.toHaveBeenCalled();
    });

    it("should cover every qualification attribute as a token source", () => {
      expect.assertions(QUALIFICATION_TOKEN_ATTRS.length);

      for (const attr of QUALIFICATION_TOKEN_ATTRS) {
        const element = input({ [attr]: "signup" });

        expect(ScrapingCacheService.keywords(element)).toEqual(new Set(["signup"]));
      }
    });
  });

  describe("ScrapingCacheService::invalidate", () => {
    it("should drop the cached payload so getField misses again", () => {
      expect.assertions(1);

      const element = input();
      ScrapingCacheService.setField(element, { role: "username" });
      ScrapingCacheService.invalidate(element);

      expect(ScrapingCacheService.getField(element)).toBeNull();
    });

    it("should drop the cached keywords so they are recomputed on the next call", () => {
      expect.assertions(1);

      const element = input({ id: "username" });
      const first = ScrapingCacheService.keywords(element);
      ScrapingCacheService.invalidate(element);
      const recomputed = ScrapingCacheService.keywords(element);

      // Same content, but a freshly built set (not the invalidated instance).
      expect(recomputed).not.toBe(first);
    });

    it("should leave other elements' cached entries untouched", () => {
      expect.assertions(2);

      const a = input();
      const b = input();
      const payloadB = { role: "password" };
      ScrapingCacheService.setField(a, { role: "username" });
      ScrapingCacheService.setField(b, payloadB);
      ScrapingCacheService.invalidate(a);

      expect(ScrapingCacheService.getField(a)).toBeNull();
      expect(ScrapingCacheService.getField(b)).toBe(payloadB);
    });
  });

  describe("ScrapingCacheService zero DOM pollution", () => {
    it("should never mutate the element while caching keywords", () => {
      expect.assertions(2);

      const element = input({ id: "username", name: "username" });
      const before = element.outerHTML;
      ScrapingCacheService.keywords(element);

      expect(element.getAttributeNames().sort()).toEqual(["id", "name"]);
      expect(element.outerHTML).toEqual(before);
    });

    it("should never mutate the element while storing a payload", () => {
      expect.assertions(1);

      const element = input({ id: "username" });
      const before = element.outerHTML;
      ScrapingCacheService.setField(element, { role: "username" });

      expect(element.outerHTML).toEqual(before);
    });
  });
});
