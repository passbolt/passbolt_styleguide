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

import FieldQualifierService from "./FieldQualifierService";
import ScrapingCacheService from "./ScrapingCacheService";
import ScrapingIdentityService from "./ScrapingIdentityService";

/**
 * Create a connected input carrying the given attributes.
 * @param {Object<string, string>} [attributes] The attributes to set.
 * @returns {HTMLInputElement} The connected input.
 */
function input(attributes = {}) {
  const element = document.createElement("input");
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  document.body.appendChild(element);
  return element;
}

/**
 * Build a minimal FieldScraping payload bound to an element, registering its identity so
 * `ScrapingIdentityService.elementFor(fieldId)` resolves back to it.
 * @param {HTMLInputElement} element The field element.
 * @param {{type?: string, autoComplete?: string}} [overrides] Payload overrides.
 * @returns {{fieldId: string, type: string, autoComplete: string}} The payload.
 */
function payload(element, overrides = {}) {
  return {
    fieldId: ScrapingIdentityService.fieldId(element),
    type: (element.type || "text").toLowerCase(),
    autoComplete: element.getAttribute("autocomplete") || "",
    ...overrides,
  };
}

describe("FieldQualifierService", () => {
  beforeEach(() => {
    ScrapingIdentityService._idByElement = new WeakMap();
    ScrapingIdentityService._elementById = new Map();
    ScrapingIdentityService._seq = 0;
    ScrapingCacheService._payloadByElement = new WeakMap();
    ScrapingCacheService._keywordsByElement = new WeakMap();
    document.body.innerHTML = "";
  });

  describe("FieldQualifierService::isPassword", () => {
    it("should qualify a field whose native type is password", () => {
      expect.assertions(1);

      const element = input({ type: "password" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(true);
    });

    it("should qualify a text field whose cached tokens include password", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "current-password" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(true);
    });

    it("should reject a field with neither the type nor the keyword", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "search" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(false);
    });

    it("should qualify a field whose password keyword is sourced from a non-name attribute", () => {
      expect.assertions(1);

      // "password" comes from aria-label, not name — QUALIFICATION_TOKEN_ATTRS is broad.
      const element = input({ type: "text", "aria-label": "Password" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(true);
    });

    it("should qualify a field whose password keyword is sourced from data-form-type", () => {
      expect.assertions(1);

      const element = input({ type: "text", "data-form-type": "password" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(true);
    });

    it("should match the password keyword case-insensitively", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "PASSWORD" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(true);
    });

    it("should not match a superstring token such as passphrase (token equality, not substring)", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "passphrase" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(false);
    });

    it("should not match the plural token passwords (token equality, not substring)", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "passwords" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(false);
    });

    it("should qualify on the native password type even without any keyword", () => {
      expect.assertions(1);

      const element = input({ type: "password", name: "secret" });

      expect(FieldQualifierService.isPassword(payload(element), element)).toBe(true);
    });
  });

  describe("FieldQualifierService::isUsername", () => {
    it("should fast-pass a field whose type is email", () => {
      expect.assertions(1);

      const element = input({ type: "email" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(true);
    });

    it("should qualify a candidate-type field with a whitelisted autoComplete", () => {
      expect.assertions(1);

      const element = input({ type: "text", autocomplete: "username" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(true);
    });

    it("should qualify a candidate-type field whose cached tokens intersect the username keywords", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "login" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(true);
    });

    it("should reject a candidate-type field carrying no username signal", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "search" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(false);
    });

    it("should reject a non-candidate type even when a username keyword is present", () => {
      expect.assertions(1);

      const element = input({ type: "number", name: "login" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(false);
    });

    it("should qualify a candidate type tel with a username keyword", () => {
      expect.assertions(1);

      // Exercise the raw "tel" type via override (payload defaults to "text").
      const element = input({ type: "tel", name: "phone" });

      expect(FieldQualifierService.isUsername(payload(element, { type: "tel" }), element)).toBe(true);
    });

    it("should qualify an untyped candidate field with a username keyword", () => {
      expect.assertions(1);

      // The "" (untyped) candidate type, exercised via override to reflect the dictionary.
      const element = input({ name: "username" });

      expect(FieldQualifierService.isUsername(payload(element, { type: "" }), element)).toBe(true);
    });

    it("should fast-pass a candidate field whose autoComplete is email", () => {
      expect.assertions(1);

      const element = input({ type: "text", autocomplete: "email" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(true);
    });

    it("should fast-pass a candidate field whose autoComplete is tel", () => {
      expect.assertions(1);

      const element = input({ type: "text", autocomplete: "tel" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(true);
    });

    it.each(["username", "email", "login", "user", "phone", "mobile", "telephone"])(
      "should qualify a candidate field whose cached tokens include the username keyword %s",
      (keyword) => {
        expect.assertions(1);

        const element = input({ type: "text", name: keyword });

        expect(FieldQualifierService.isUsername(payload(element), element)).toBe(true);
      },
    );

    it("should qualify on a whitelisted autoComplete even without any username keyword", () => {
      expect.assertions(1);

      // No username token anywhere; the autoComplete whitelist alone qualifies the field.
      const element = input({ type: "text", name: "field", autocomplete: "username" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(true);
    });

    it("should qualify on a username keyword when autoComplete is empty", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "user" });

      expect(FieldQualifierService.isUsername(payload(element, { autoComplete: "" }), element)).toBe(true);
    });

    it("should reject a candidate type whose only keyword is unrelated", () => {
      expect.assertions(1);

      const element = input({ type: "text", name: "firstname" });

      expect(FieldQualifierService.isUsername(payload(element), element)).toBe(false);
    });
  });

  describe("FieldQualifierService::qualifyLogin", () => {
    it("should pair the lone password with the first username candidate", () => {
      expect.assertions(1);

      const username = input({ type: "text", name: "login" });
      const password = input({ type: "password" });
      const pageScraping = { fields: [payload(username), payload(password)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_1",
        usernameFieldId: "field_0",
      });
    });

    it("should default usernameFieldId to null when no username candidate exists", () => {
      expect.assertions(1);

      const password = input({ type: "password" });
      const pageScraping = { fields: [payload(password)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_0",
        usernameFieldId: null,
      });
    });

    it("should return null when the page holds no password field", () => {
      expect.assertions(1);

      const username = input({ type: "text", name: "login" });
      const pageScraping = { fields: [payload(username)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toBeNull();
    });

    it("should return null when the page holds more than one password field", () => {
      expect.assertions(1);

      const pageScraping = { fields: [payload(input({ type: "password" })), payload(input({ type: "password" }))] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toBeNull();
    });

    it("should not offer the password field itself as the username candidate", () => {
      expect.assertions(1);

      // A single password field whose keywords would also match a username token: it must not pair with itself.
      const password = input({ type: "password", name: "user-password" });
      const pageScraping = { fields: [payload(password)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_0",
        usernameFieldId: null,
      });
    });

    it("should skip a field whose element no longer resolves", () => {
      expect.assertions(1);

      const password = input({ type: "password" });
      const pageScraping = {
        // A stale/unknown fieldId resolves to null via elementFor and is ignored.
        fields: [{ fieldId: "field_stale", type: "text", autoComplete: "" }, payload(password)],
      };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_0",
        usernameFieldId: null,
      });
    });

    it("should pick the first username candidate in fields order when several exist", () => {
      expect.assertions(1);

      const firstUsername = input({ type: "text", name: "login" });
      const secondUsername = input({ type: "email" });
      const password = input({ type: "password" });
      const pageScraping = { fields: [payload(firstUsername), payload(secondUsername), payload(password)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_2",
        usernameFieldId: "field_0",
      });
    });

    it("should follow fields order, not DOM order, when selecting the username candidate", () => {
      expect.assertions(1);

      // Append to the DOM in the opposite order to prove fields order governs selection.
      const domSecond = input({ type: "email" });
      const domFirst = input({ type: "text", name: "login" });
      const password = input({ type: "password" });
      // domFirst appears earlier in fields, so it must win over the DOM-earlier domSecond.
      const pageScraping = { fields: [payload(domFirst), payload(domSecond), payload(password)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_2",
        usernameFieldId: "field_0",
      });
    });

    it("should count a keyword-detected password toward the gate and return it as passwordFieldId", () => {
      expect.assertions(1);

      const username = input({ type: "text", name: "login" });
      // Not a native password type: qualifies via the "password" token only.
      const password = input({ type: "text", name: "current-password" });
      const pageScraping = { fields: [payload(username), payload(password)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_1",
        usernameFieldId: "field_0",
      });
    });

    it("should return null when a keyword password and a native password coexist (two passwords)", () => {
      expect.assertions(1);

      const keywordPassword = input({ type: "text", name: "current-password" });
      const nativePassword = input({ type: "password" });
      const pageScraping = { fields: [payload(keywordPassword), payload(nativePassword)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toBeNull();
    });

    it("should skip a username candidate whose element is stale and fall through to the next", () => {
      expect.assertions(1);

      const resolvableUsername = input({ type: "text", name: "login" });
      const password = input({ type: "password" });
      const pageScraping = {
        // A stale username-looking field resolves to null and must be skipped in favour of field_0.
        fields: [
          { fieldId: "field_stale", type: "email", autoComplete: "username" },
          payload(resolvableUsername),
          payload(password),
        ],
      };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_1",
        usernameFieldId: "field_0",
      });
    });

    it("should return null when the fields array is empty (zero passwords)", () => {
      expect.assertions(1);

      const pageScraping = { fields: [] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toBeNull();
    });

    it("should pair a separate real username rather than the username-ish password itself", () => {
      expect.assertions(1);

      // The password carries a username token too, but a genuine username field is present and must win.
      const password = input({ type: "password", name: "user-password" });
      const username = input({ type: "text", name: "login" });
      const pageScraping = { fields: [payload(password), payload(username)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_0",
        usernameFieldId: "field_1",
      });
    });

    it("should ignore a noise field that is neither a password nor a username candidate", () => {
      expect.assertions(1);

      const username = input({ type: "text", name: "login" });
      const noise = input({ type: "text", name: "search" });
      const password = input({ type: "password" });
      const pageScraping = { fields: [payload(username), payload(noise), payload(password)] };

      expect(FieldQualifierService.qualifyLogin(pageScraping)).toEqual({
        passwordFieldId: "field_2",
        usernameFieldId: "field_0",
      });
    });
  });
});
