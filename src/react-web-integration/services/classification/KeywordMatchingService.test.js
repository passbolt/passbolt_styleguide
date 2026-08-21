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

import KeywordMatchingService from "./KeywordMatchingService";
import TextNormalizer from "../../lib/InForm/TextNormalizer";
import { FieldRole } from "./Taxonomy";
import { Keywords } from "./KeywordsDictionary";

describe("KeywordMatchingService", () => {
  describe("KeywordMatchingService::matchesAny", () => {
    it("should match a keyword as a substring of the concatenated form for recall", () => {
      expect.assertions(1);

      const normalized = TextNormalizer.normalizeForMatch("confirmPassword");

      expect(KeywordMatchingService.matchesAny(normalized, ["password"])).toBe(true);
    });

    it("should match all-attached attributes written without separators", () => {
      expect.assertions(1);

      expect(KeywordMatchingService.matchesAny("confirmpassword", ["password"])).toBe(true);
    });

    it("should require an exact segment for SHORT_AMBIGUOUS tokens (precision)", () => {
      expect.assertions(1);

      const normalized = TextNormalizer.normalizeForMatch("newsletter");

      expect(KeywordMatchingService.matchesAny(normalized, ["new"])).toBe(false);
    });

    it("should match a SHORT_AMBIGUOUS token when it stands as its own segment", () => {
      expect.assertions(1);

      const normalized = TextNormalizer.normalizeForMatch("newPassword");

      expect(KeywordMatchingService.matchesAny(normalized, ["new"])).toBe(true);
    });

    it("should return true as soon as one keyword in the set matches", () => {
      expect.assertions(1);

      expect(KeywordMatchingService.matchesAny("username", ["password", "name"])).toBe(true);
    });

    it("should return false when no keyword matches", () => {
      expect.assertions(1);

      expect(KeywordMatchingService.matchesAny("firstname", ["password", "email"])).toBe(false);
    });

    it("should match the digit-glued token 2fa even when normalization splits 2FA into 2 fa", () => {
      expect.assertions(2);

      expect(KeywordMatchingService.matchesAny(TextNormalizer.normalizeForMatch("2FA"), ["2fa"])).toBe(true);
      expect(KeywordMatchingService.matchesAny(TextNormalizer.normalizeForMatch("Field2FA"), ["2fa"])).toBe(true);
    });

    it("should not match a SHORT_AMBIGUOUS token buried inside a larger segment", () => {
      expect.assertions(1);

      const normalized = TextNormalizer.normalizeForMatch("notpassword");

      expect(KeywordMatchingService.matchesAny(normalized, ["otp"])).toBe(false);
    });

    it("should return false on empty/null input without throwing", () => {
      expect.assertions(2);

      expect(KeywordMatchingService.matchesAny("", ["password"])).toBe(false);
      expect(KeywordMatchingService.matchesAny(null, ["password"])).toBe(false);
    });

    it("should return false on whitespace-only input", () => {
      expect.assertions(2);

      expect(KeywordMatchingService.matchesAny("   ", ["password"])).toBe(false);
      expect(KeywordMatchingService.matchesAny("   ", ["new"])).toBe(false);
    });

    it("should match precomposed CJK/Hangul keywords against decomposed input", () => {
      expect.assertions(2);

      expect(KeywordMatchingService.matchesAny(TextNormalizer.normalizeForMatch("パスワード"), Keywords.PASSWORD)).toBe(
        true,
      );
      expect(KeywordMatchingService.matchesAny(TextNormalizer.normalizeForMatch("이메일"), Keywords.EMAIL)).toBe(true);
    });
  });

  describe("KeywordMatchingService::roleFromAutocomplete", () => {
    it("should map a single autocomplete token to its role", () => {
      expect.assertions(3);

      expect(KeywordMatchingService.roleFromAutocomplete("username")).toBe(FieldRole.USERNAME);
      expect(KeywordMatchingService.roleFromAutocomplete("current-password")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(KeywordMatchingService.roleFromAutocomplete("one-time-code")).toBe(FieldRole.TOTP);
    });

    it("should prefer the rightmost token when several map to a role", () => {
      expect.assertions(2);

      expect(KeywordMatchingService.roleFromAutocomplete("username current-password")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(KeywordMatchingService.roleFromAutocomplete("current-password username")).toBe(FieldRole.USERNAME);
    });

    it("should skip unmapped grouping tokens and return the only mapped role", () => {
      expect.assertions(1);

      expect(KeywordMatchingService.roleFromAutocomplete("section-blue shipping email")).toBe(FieldRole.EMAIL);
    });

    it("should return null for tokens that only exist on Object.prototype", () => {
      expect.assertions(2);

      expect(KeywordMatchingService.roleFromAutocomplete("constructor")).toBeNull();
      expect(KeywordMatchingService.roleFromAutocomplete("hasOwnProperty")).toBeNull();
    });

    it("should be case-insensitive on tokens", () => {
      expect.assertions(1);

      expect(KeywordMatchingService.roleFromAutocomplete("New-Password")).toBe(FieldRole.NEW_PASSWORD);
    });

    it("should treat off/on as carrying no role signal", () => {
      expect.assertions(2);

      expect(KeywordMatchingService.roleFromAutocomplete("off")).toBeNull();
      expect(KeywordMatchingService.roleFromAutocomplete("on")).toBeNull();
    });

    it("should return null when no token maps to a role", () => {
      expect.assertions(1);

      expect(KeywordMatchingService.roleFromAutocomplete("name")).toBeNull();
    });

    it("should return null on empty/null/undefined input without throwing", () => {
      expect.assertions(3);

      expect(KeywordMatchingService.roleFromAutocomplete("")).toBeNull();
      expect(KeywordMatchingService.roleFromAutocomplete(null)).toBeNull();
      expect(KeywordMatchingService.roleFromAutocomplete(undefined)).toBeNull();
    });
  });

  describe("KeywordMatchingService::autocompleteDeclaresType", () => {
    it("should report a concrete field type when the author names one", () => {
      expect.assertions(2);

      expect(KeywordMatchingService.autocompleteDeclaresType("username")).toBe(true);
      expect(KeywordMatchingService.autocompleteDeclaresType("section-blue shipping email")).toBe(true);
    });

    it("should ignore section-* prefixes", () => {
      expect.assertions(1);

      expect(KeywordMatchingService.autocompleteDeclaresType("section-foo")).toBe(false);
    });

    it("should ignore AUTOCOMPLETE_NON_TYPE grouping/switch tokens", () => {
      expect.assertions(4);

      expect(KeywordMatchingService.autocompleteDeclaresType("off")).toBe(false);
      expect(KeywordMatchingService.autocompleteDeclaresType("on")).toBe(false);
      expect(KeywordMatchingService.autocompleteDeclaresType("shipping")).toBe(false);
      expect(KeywordMatchingService.autocompleteDeclaresType("section-blue shipping")).toBe(false);
    });

    it("should return false on empty/null/undefined input without throwing", () => {
      expect.assertions(3);

      expect(KeywordMatchingService.autocompleteDeclaresType("")).toBe(false);
      expect(KeywordMatchingService.autocompleteDeclaresType(null)).toBe(false);
      expect(KeywordMatchingService.autocompleteDeclaresType(undefined)).toBe(false);
    });
  });
});
