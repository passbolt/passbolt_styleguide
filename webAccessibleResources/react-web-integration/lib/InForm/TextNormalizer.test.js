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

import TextNormalizer from "./TextNormalizer";

describe("TextNormalizer", () => {
  describe("TextNormalizer::normalize", () => {
    it.each([
      { scenario: "null", input: null },
      { scenario: "undefined", input: undefined },
      { scenario: "an empty string", input: "" },
    ])("should return an empty string for $scenario", ({ input }) => {
      expect.assertions(1);

      expect(TextNormalizer.normalize(input)).toBe("");
    });

    it.each([
      { scenario: "a number", input: 42, expected: "42" },
      { scenario: "a boolean", input: true, expected: "true" },
    ])("should coerce $scenario to a string", ({ input, expected }) => {
      expect.assertions(1);

      expect(TextNormalizer.normalize(input)).toBe(expected);
    });

    it("should collapse whitespace sequences into a single space and trim", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalize("  Sign   in\t\tnow \n")).toBe("Sign in now");
    });

    it("should collapse Unicode control and invisible formatting characters", () => {
      expect.assertions(1);

      // Zero-width space (U+200B), left-to-right mark (U+200E) and a NULL control char (U+0000).
      expect(TextNormalizer.normalize("Sign\u200Bin\u200E\u0000 now")).toBe("Sign in now");
    });

    it("should preserve the case and inner content of the text", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalize("Créer un Compte")).toBe("Créer un Compte");
    });

    it.each([
      { scenario: "a tab", input: "a\tb" },
      { scenario: "a newline", input: "a\nb" },
      { scenario: "a carriage return", input: "a\rb" },
      { scenario: "a form feed", input: "a\fb" },
      { scenario: "a vertical tab", input: "a\vb" },
      { scenario: "a non-breaking space", input: "a\u00A0b" },
      { scenario: "an em space", input: "a\u2003b" },
      { scenario: "a line separator", input: "a\u2028b" },
    ])("should collapse $scenario into a single space", ({ input }) => {
      expect.assertions(1);

      expect(TextNormalizer.normalize(input)).toBe("a b");
    });

    it.each([
      { scenario: "only whitespace", input: "   \t\n  " },
      { scenario: "only control characters", input: "\u0000\u200B\u200E" },
    ])("should return an empty string for $scenario", ({ input }) => {
      expect.assertions(1);

      expect(TextNormalizer.normalize(input)).toBe("");
    });

    it("should preserve inner punctuation and symbols", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalize("  Log in (now)! go/back  ")).toBe("Log in (now)! go/back");
    });
  });

  describe("TextNormalizer::tokenize", () => {
    it.each([
      { scenario: "null", input: null },
      { scenario: "undefined", input: undefined },
      { scenario: "an empty string", input: "" },
    ])("should return an empty string for $scenario", ({ input }) => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize(input)).toBe("");
    });

    it("should lowercase, split on non-alphanumeric runs and join with single spaces", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("Sign-In / Log_In!")).toBe("sign in log in");
    });

    it("should split camelCase identifiers into separate tokens", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("userName")).toBe("user name");
    });

    it("should split acronym boundaries in camelCase identifiers", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("HTMLParser")).toBe("html parser");
    });

    it("should fold Latin diacritics", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("Créer Compte")).toBe("creer compte");
    });

    it("should reject tokens shorter than two characters", () => {
      expect.assertions(1);

      // "a" and "1" are dropped; "of" and "42" survive.
      expect(TextNormalizer.tokenize("a of 1 42")).toBe("of 42");
    });

    it("should keep digits as valid token characters", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("step2 of3")).toBe("step2 of3");
    });

    it("should split a multi-word camelCase identifier", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("getUserEmailById")).toBe("get user email by id");
    });

    it("should split PascalCase identifiers", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("FirstName")).toBe("first name");
    });

    it("should collapse repeated and mixed delimiters", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("sign___up -- now")).toBe("sign up now");
    });

    it("should treat emoji and symbols as delimiters", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("Log in 🔒 now")).toBe("log in now");
    });

    it("should keep CJK characters as a single token", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("登录")).toBe("登录");
    });

    it("should not treat the German sharp s as a diacritic", () => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize("Straße")).toBe("straße");
    });

    it.each([
      { scenario: "only short tokens", input: "a b c 1 2" },
      { scenario: "only delimiters", input: "-- // .. __" },
    ])("should return an empty string for $scenario", ({ input }) => {
      expect.assertions(1);

      expect(TextNormalizer.tokenize(input)).toBe("");
    });
  });

  describe("TextNormalizer::normalizeForMatch", () => {
    it.each([
      { scenario: "null", input: null },
      { scenario: "undefined", input: undefined },
      { scenario: "an empty string", input: "" },
    ])("should return an empty string for $scenario", ({ input }) => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch(input)).toBe("");
    });

    it.each([
      { separator: "space", input: "sign up" },
      { separator: "underscore", input: "sign_up" },
      { separator: "hyphen", input: "sign-up" },
      { separator: "dot", input: "sign.up" },
      { separator: "slash", input: "sign/up" },
    ])("should translate the $separator separator into a space", ({ input }) => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch(input)).toBe("sign up");
    });

    it("should lowercase, fold diacritics and trim", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch("  Créer-Compte  ")).toBe("creer compte");
    });

    it("should split camelCase before matching", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch("firstName")).toBe("first name");
    });

    it("should preserve short tokens that tokenize would drop", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch("cc-id")).toBe("cc id");
    });

    it("should collapse consecutive and mixed separators into a single space", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch("first__name -- last..name")).toBe("first name last name");
    });

    it("should trim leading and trailing separators", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch("__first-name__")).toBe("first name");
    });

    it("should handle combined camelCase and separators", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch("user_firstName")).toBe("user first name");
    });

    it("should keep CJK characters intact", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch("用户名")).toBe("用户名");
    });

    it("should not treat the German sharp s as a diacritic", () => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch("Straße")).toBe("straße");
    });
  });

  describe("TextNormalizer i18n safeguards", () => {
    it.each([
      { scenario: "Devanagari (Hindi)", input: "पासवर्ड" },
      { scenario: "Bengali", input: "পাসওয়ার্ড" },
      { scenario: "Tamil", input: "கடவுச்சொல்" },
      { scenario: "Thai", input: "รหัสผ่าน" },
    ])("should preserve Brahmic/Thai vowel signs for $scenario", ({ input }) => {
      expect.assertions(1);

      // The fold logic must not strip \p{M} generically: on the match path (the one used for field
      // classification) the script survives intact — only lowercased/trimmed — never mangled into
      // base consonants. NB: tokenize legitimately splits these apart, as spacing/combining marks are
      // neither \p{L} nor \p{N}; that path is meant for Latin UI-label scraping.
      // Expected is the NFD form (fold decomposes) lowercased — the marks survive, only Latin-block
      // combining marks (U+0300–U+036F) are ever stripped.
      expect(TextNormalizer.normalizeForMatch(input)).toBe(input.normalize("NFD").toLowerCase());
    });

    it.each([
      { scenario: "Greek accents", input: "Ολοκλήρωση", expected: "ολοκληρωση" },
      { scenario: "Cyrillic breve (й → и)", input: "Войти", expected: "воити" },
      { scenario: "German umlaut folded, eszett kept", input: "Grüße", expected: "gruße" },
      { scenario: "French cedilla and accents", input: "Créez ça", expected: "creez ca" },
      { scenario: "Spanish tilde-n folded", input: "Contraseña", expected: "contrasena" },
    ])("should fold combining diacritics for $scenario", ({ input, expected }) => {
      expect.assertions(1);

      expect(TextNormalizer.normalizeForMatch(input)).toBe(expected);
    });

    it("should preserve Hangul content through NFD decomposition", () => {
      expect.assertions(1);

      // Hangul syllables NFD-decompose into conjoining jamo, but no jamo falls in U+0300–U+036F, so
      // nothing is stripped — the content survives, only re-expressed in decomposed form.
      const input = "비밀번호";
      expect(TextNormalizer.normalizeForMatch(input)).toBe(input.normalize("NFD").toLowerCase());
    });
  });
});
