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

import FieldFeatureService from "./FieldFeatureService";

describe("FieldFeatureService", () => {
  describe("FieldFeatureService::fieldText", () => {
    it("should aggregate all sources in order and apply normalization", () => {
      expect.assertions(1);

      const field = {
        attributes: { name: "userName", id: "loginId" },
        label: { text: "Email" },
        inputDescription: { ariaLabel: "Your Email", placeholder: "Enter email" },
      };

      expect(FieldFeatureService.fieldText(field)).toBe("user name login id email your email enter email");
    });

    it("should ignore aria-labelledby (IDREF list, not label text)", () => {
      expect.assertions(1);

      const field = { attributes: { name: "user" }, inputDescription: { ariaLabelledby: "lbl-42 hint-7" } };

      expect(FieldFeatureService.fieldText(field)).toBe("user");
    });

    it("should drop empty and nullish fragments before joining", () => {
      expect.assertions(1);

      const field = {
        attributes: { name: "", id: "login" },
        label: { text: null },
        inputDescription: { ariaLabel: undefined, placeholder: "pw" },
      };

      expect(FieldFeatureService.fieldText(field)).toBe("login pw");
    });

    it("should preserve duplicate fragments across sources", () => {
      expect.assertions(1);

      const field = { attributes: { name: "email", id: "email" } };

      expect(FieldFeatureService.fieldText(field)).toBe("email email");
    });

    it("should return an empty string when every source is empty", () => {
      expect.assertions(1);

      const field = { attributes: {}, label: {}, inputDescription: {} };

      expect(FieldFeatureService.fieldText(field)).toBe("");
    });

    it("should not throw and return empty when sub-objects are missing", () => {
      expect.assertions(1);

      expect(FieldFeatureService.fieldText({})).toBe("");
    });
  });

  describe("FieldFeatureService::autoCompleteHasOtp", () => {
    it("should return true when the one-time-code token is present alone", () => {
      expect.assertions(1);

      expect(FieldFeatureService.autoCompleteHasOtp({ autoComplete: "one-time-code" })).toBe(true);
    });

    it("should return true when one-time-code is one token among several", () => {
      expect.assertions(1);

      expect(FieldFeatureService.autoCompleteHasOtp({ autoComplete: "section-blue one-time-code" })).toBe(true);
    });

    it("should be case-insensitive", () => {
      expect.assertions(1);

      expect(FieldFeatureService.autoCompleteHasOtp({ autoComplete: "One-Time-Code" })).toBe(true);
    });

    it("should return false when the token is absent", () => {
      expect.assertions(1);

      expect(FieldFeatureService.autoCompleteHasOtp({ autoComplete: "username current-password" })).toBe(false);
    });

    it("should require a whole token, not a substring", () => {
      expect.assertions(1);

      expect(FieldFeatureService.autoCompleteHasOtp({ autoComplete: "one-time-code-x" })).toBe(false);
    });

    it("should return false on empty/null/undefined/missing autoComplete without throwing", () => {
      expect.assertions(4);

      expect(FieldFeatureService.autoCompleteHasOtp({ autoComplete: "" })).toBe(false);
      expect(FieldFeatureService.autoCompleteHasOtp({ autoComplete: null })).toBe(false);
      expect(FieldFeatureService.autoCompleteHasOtp({ autoComplete: undefined })).toBe(false);
      expect(FieldFeatureService.autoCompleteHasOtp({})).toBe(false);
    });
  });

  describe("FieldFeatureService::looksNumeric", () => {
    it("should return true for a numeric inputMode (numeric, tel, decimal)", () => {
      expect.assertions(3);

      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "numeric" } })).toBe(true);
      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "tel" } })).toBe(true);
      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "decimal" } })).toBe(true);
    });

    it("should tolerate surrounding whitespace and casing on inputMode", () => {
      expect.assertions(1);

      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "  Numeric  " } })).toBe(true);
    });

    it("should return false for a non-numeric inputMode", () => {
      expect.assertions(2);

      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "text" } })).toBe(false);
      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "email" } })).toBe(false);
    });

    it("should return true for a pattern constrained to digits via \\d or [0-9]", () => {
      expect.assertions(2);

      expect(FieldFeatureService.looksNumeric({ attributes: { pattern: "\\d{6}" } })).toBe(true);
      expect(FieldFeatureService.looksNumeric({ attributes: { pattern: "[0-9]{6}" } })).toBe(true);
    });

    it("should NOT treat a digit inside a quantifier as a numeric pattern", () => {
      expect.assertions(2);

      expect(FieldFeatureService.looksNumeric({ attributes: { pattern: "a{3}" } })).toBe(false);
      expect(FieldFeatureService.looksNumeric({ attributes: { pattern: "[A-Za-z]{2,20}" } })).toBe(false);
    });

    it("should return false when both inputMode and pattern are empty or missing", () => {
      expect.assertions(2);

      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "", pattern: "" } })).toBe(false);
      expect(FieldFeatureService.looksNumeric({})).toBe(false);
    });

    it("should return true when only one of the two signals is present", () => {
      expect.assertions(2);

      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "text", pattern: "[0-9]*" } })).toBe(true);
      expect(FieldFeatureService.looksNumeric({ attributes: { inputMode: "tel", pattern: "[A-Z]+" } })).toBe(true);
    });
  });

  describe("FieldFeatureService::isFillable", () => {
    it("should return true when neither disabled nor readonly is set", () => {
      expect.assertions(1);

      expect(FieldFeatureService.isFillable({ attributes: { disabled: false, readonly: false } })).toBe(true);
    });

    it("should return false when disabled is true", () => {
      expect.assertions(1);

      expect(FieldFeatureService.isFillable({ attributes: { disabled: true, readonly: false } })).toBe(false);
    });

    it("should return false when readonly is true", () => {
      expect.assertions(1);

      expect(FieldFeatureService.isFillable({ attributes: { disabled: false, readonly: true } })).toBe(false);
    });

    it("should return true when attributes is empty or missing", () => {
      expect.assertions(2);

      expect(FieldFeatureService.isFillable({ attributes: {} })).toBe(true);
      expect(FieldFeatureService.isFillable({})).toBe(true);
    });
  });
});
