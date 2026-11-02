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

import ClassificationService from "./ClassificationService";
import { FieldRole, FormRole } from "./Taxonomy";
import { MAX_CLASSIFIED_FIELDS } from "./KeywordsDictionary";
import { defaultField, defaultForm, defaultPage } from "./ClassificationService.test.data";

describe("ClassificationService", () => {
  describe("ClassificationService::consolidateDeclaredFormRole", () => {
    it("should return the form-level declared role when the form declares it (form-level wins)", () => {
      expect.assertions(1);

      const scope = {
        form: defaultForm({ dataFormType: "login" }),
        fields: [defaultField("f0", { dataFormType: "action,register" })],
      };

      expect(ClassificationService.consolidateDeclaredFormRole(scope)).toBe(FormRole.LOGIN);
    });

    it("should aggregate the fields' action hints when the form declares nothing", () => {
      expect.assertions(1);

      const scope = {
        form: defaultForm({ dataFormType: "" }),
        fields: [defaultField("f0", { dataFormType: "action,register" })],
      };

      expect(ClassificationService.consolidateDeclaredFormRole(scope)).toBe(FormRole.SIGNUP);
    });

    it("should tie-break the fields' action hints as change_password > register > login", () => {
      expect.assertions(1);

      const scope = {
        form: null,
        fields: [
          defaultField("f0", { dataFormType: "action,login" }),
          defaultField("f1", { dataFormType: "action,change_password" }),
        ],
      };

      expect(ClassificationService.consolidateDeclaredFormRole(scope)).toBe(FormRole.CHANGE_PASSWORD);
    });

    it("should return OTHER when nothing is declared at the form or field level", () => {
      expect.assertions(1);

      const scope = { form: null, fields: [defaultField("f0"), defaultField("f1")] };

      expect(ClassificationService.consolidateDeclaredFormRole(scope)).toBe(FormRole.OTHER);
    });
  });

  describe("ClassificationService::groupByScope", () => {
    it("should group fields by formId preserving scope insertion order and per-scope DOM order", () => {
      expect.assertions(7);

      const fields = [
        defaultField("a0", { formId: "formA" }),
        defaultField("b0", { formId: "formB" }),
        defaultField("a1", { formId: "formA" }),
        defaultField("b1", { formId: "formB" }),
        defaultField("a2", { formId: "formA" }),
      ];
      const forms = {
        formA: defaultForm({ dataFormType: "login" }),
        formB: defaultForm({ dataFormType: "register" }),
      };

      const scopes = ClassificationService.groupByScope(fields, forms);

      expect(scopes).toHaveLength(2);
      expect(scopes[0].scopeKey).toBe("formA");
      expect(scopes[1].scopeKey).toBe("formB");
      expect(scopes[0].fields.map((field) => field.fieldId)).toStrictEqual(["a0", "a1", "a2"]);
      expect(scopes[1].fields.map((field) => field.fieldId)).toStrictEqual(["b0", "b1"]);
      expect(scopes[0].form).toBe(forms.formA);
      expect(scopes[1].form).toBe(forms.formB);
    });

    it("should attach a null form when the formId is absent from the forms map", () => {
      expect.assertions(3);

      const fields = [defaultField("k0", { formId: "known" }), defaultField("u0", { formId: "unknown" })];
      const forms = { known: defaultForm({ dataFormType: "login" }) };

      const scopes = ClassificationService.groupByScope(fields, forms);

      expect(scopes).toHaveLength(2);
      expect(scopes[0].form).toBe(forms.known);
      expect(scopes[1].form).toBeNull();
    });
  });

  describe("ClassificationService::classifyFields", () => {
    it("should map a SAWF-declared field to its role and flag it as declared", () => {
      expect.assertions(2);

      const field = defaultField("f0", { dataFormType: "username" });

      const perField = ClassificationService.classifyFields([field]);

      expect(perField.get("f0")).toBe(FieldRole.USERNAME);
      expect(field._byDeclared).toBe(true);
    });

    it("should map an autocomplete-declared field to its role and flag it as declared", () => {
      expect.assertions(2);

      const field = defaultField("f0", { autoComplete: "username" });

      const perField = ClassificationService.classifyFields([field]);

      expect(perField.get("f0")).toBe(FieldRole.USERNAME);
      expect(field._byDeclared).toBe(true);
    });

    it("should map an inferred field to its role and flag it as not declared", () => {
      expect.assertions(2);

      const field = defaultField("f0", { type: "password" });

      const perField = ClassificationService.classifyFields([field]);

      expect(perField.get("f0")).toBe(FieldRole.PASSWORD);
      expect(field._byDeclared).toBe(false);
    });
  });

  describe("ClassificationService::flattenRoles", () => {
    it("should merge the scopes' role maps into a single fieldId to role object", () => {
      expect.assertions(1);

      const scopes = [
        {
          roles: new Map([
            ["a0", FieldRole.USERNAME],
            ["a1", FieldRole.PASSWORD],
          ]),
        },
        {
          roles: new Map([
            ["b0", FieldRole.EMAIL],
            ["b1", FieldRole.TOTP],
          ]),
        },
      ];

      expect(ClassificationService.flattenRoles(scopes)).toStrictEqual({
        a0: FieldRole.USERNAME,
        a1: FieldRole.PASSWORD,
        b0: FieldRole.EMAIL,
        b1: FieldRole.TOTP,
      });
    });
  });

  describe("ClassificationService::classify", () => {
    it("should classify a login page (username + password) as a LOGIN form with a current-password", () => {
      expect.assertions(4);

      const page = defaultPage(
        [
          defaultField("username", { formId: "f1", type: "text", name: "username" }),
          defaultField("password", { formId: "f1", type: "password" }),
        ],
        { f1: defaultForm() },
      );

      const result = ClassificationService.classify(page);

      expect(result.fields.username).toBe(FieldRole.USERNAME);
      expect(result.fields.password).toBe(FieldRole.CURRENT_PASSWORD);
      expect(result.forms.f1.role).toBe(FormRole.LOGIN);
      expect(result.forms.f1.multiStep).toBe(false);
    });

    it("should classify a signup page (two passwords + username, Register button) as SIGNUP with new + confirmation", () => {
      expect.assertions(4);

      const page = defaultPage(
        [
          defaultField("username", { formId: "f1", type: "text", name: "username" }),
          defaultField("pass1", { formId: "f1", type: "password" }),
          defaultField("pass2", { formId: "f1", type: "password" }),
        ],
        { f1: defaultForm({ buttonText: "Register" }) },
      );

      const result = ClassificationService.classify(page);

      expect(result.forms.f1.role).toBe(FormRole.SIGNUP);
      expect(result.fields.pass1).toBe(FieldRole.NEW_PASSWORD);
      expect(result.fields.pass2).toBe(FieldRole.PASSWORD_CONFIRMATION);
      expect(result.fields.username).toBe(FieldRole.USERNAME);
    });

    it("should classify a declared change_password form (current + new + confirm) as CHANGE_PASSWORD", () => {
      expect.assertions(4);

      const page = defaultPage(
        [
          defaultField("cur", { formId: "f1", type: "password" }),
          defaultField("new", { formId: "f1", type: "password" }),
          defaultField("conf", { formId: "f1", type: "password" }),
        ],
        { f1: defaultForm({ dataFormType: "change_password" }) },
      );

      const result = ClassificationService.classify(page);

      expect(result.forms.f1.role).toBe(FormRole.CHANGE_PASSWORD);
      expect(result.fields.cur).toBe(FieldRole.CURRENT_PASSWORD);
      expect(result.fields.new).toBe(FieldRole.NEW_PASSWORD);
      expect(result.fields.conf).toBe(FieldRole.PASSWORD_CONFIRMATION);
    });

    it("should let a declared form role (login) win over an inferred signup shape", () => {
      expect.assertions(1);

      const page = defaultPage(
        [
          defaultField("username", { formId: "f1", type: "text", name: "username" }),
          defaultField("pass1", { formId: "f1", type: "password" }),
          defaultField("pass2", { formId: "f1", type: "password" }),
        ],
        { f1: defaultForm({ dataFormType: "login" }) },
      );

      expect(ClassificationService.classify(page).forms.f1.role).toBe(FormRole.LOGIN);
    });

    it("should group six single-char boxes under a one-time-code heading into an OTP segment of TOTP fields", () => {
      expect.assertions(7);

      const boxes = Array.from({ length: 6 }, (unused, index) =>
        defaultField(`otp-${index}`, { formId: "f1", type: "text", maxLength: 1 }),
      );
      const page = defaultPage(boxes, { f1: defaultForm({ ancestorHeadings: ["One-time code"] }) });

      const result = ClassificationService.classify(page);

      expect(result.forms.f1.otpSegments).toStrictEqual([["otp-0", "otp-1", "otp-2", "otp-3", "otp-4", "otp-5"]]);
      expect(result.fields["otp-0"]).toBe(FieldRole.TOTP);
      expect(result.fields["otp-1"]).toBe(FieldRole.TOTP);
      expect(result.fields["otp-2"]).toBe(FieldRole.TOTP);
      expect(result.fields["otp-3"]).toBe(FieldRole.TOTP);
      expect(result.fields["otp-4"]).toBe(FieldRole.TOTP);
      expect(result.fields["otp-5"]).toBe(FieldRole.TOTP);
    });

    it("should flag multiStep true for a step-tokened form and false for a plain login form", () => {
      expect.assertions(2);

      const multiStepPage = defaultPage(
        [
          defaultField("username", { formId: "f1", type: "text", name: "username" }),
          defaultField("password", { formId: "f1", type: "password" }),
        ],
        { f1: defaultForm({ dataFormType: "login,step" }) },
      );
      const plainPage = defaultPage(
        [
          defaultField("username", { formId: "f2", type: "text", name: "username" }),
          defaultField("password", { formId: "f2", type: "password" }),
        ],
        { f2: defaultForm({ dataFormType: "login" }) },
      );

      expect(ClassificationService.classify(multiStepPage).forms.f1.multiStep).toBe(true);
      expect(ClassificationService.classify(plainPage).forms.f2.multiStep).toBe(false);
    });

    it("should cap classification at MAX_CLASSIFIED_FIELDS and drop any field beyond the cap", () => {
      expect.assertions(3);

      const fields = Array.from({ length: MAX_CLASSIFIED_FIELDS + 5 }, (unused, index) =>
        defaultField(`field-${index}`, { formId: "f1", type: "text", name: "username" }),
      );
      const page = defaultPage(fields, { f1: defaultForm() });

      const result = ClassificationService.classify(page);

      expect(Object.keys(result.fields)).toHaveLength(MAX_CLASSIFIED_FIELDS);
      expect(result.fields["field-0"]).toBeDefined();
      expect(result.fields[`field-${MAX_CLASSIFIED_FIELDS}`]).toBeUndefined();
    });

    it("should return a well-formed empty result for an empty page without throwing", () => {
      expect.assertions(1);

      expect(ClassificationService.classify({})).toStrictEqual({ fields: {}, forms: {} });
    });

    it("should build one forms entry per form and route each field to its form by formId", () => {
      expect.assertions(6);

      const page = defaultPage(
        [
          defaultField("u1", { formId: "loginForm", type: "text", name: "username" }),
          defaultField("p1", { formId: "loginForm", type: "password" }),
          defaultField("u2", { formId: "signupForm", type: "text", name: "username" }),
          defaultField("p2a", { formId: "signupForm", type: "password" }),
          defaultField("p2b", { formId: "signupForm", type: "password" }),
        ],
        { loginForm: defaultForm(), signupForm: defaultForm({ buttonText: "Register" }) },
      );

      const result = ClassificationService.classify(page);

      expect(Object.keys(result.forms)).toStrictEqual(["loginForm", "signupForm"]);
      expect(result.forms.loginForm.role).toBe(FormRole.LOGIN);
      expect(result.forms.signupForm.role).toBe(FormRole.SIGNUP);
      expect(result.fields.p1).toBe(FieldRole.CURRENT_PASSWORD);
      expect(result.fields.p2a).toBe(FieldRole.NEW_PASSWORD);
      expect(result.fields.p2b).toBe(FieldRole.PASSWORD_CONFIRMATION);
    });
  });
});
