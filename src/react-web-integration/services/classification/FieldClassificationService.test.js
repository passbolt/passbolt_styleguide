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

import FieldClassificationService from "./FieldClassificationService";
import { FieldRole, Tier } from "./Taxonomy";
import { defaultField } from "./FieldClassificationService.test.data";

describe("FieldClassificationService", () => {
  describe("FieldClassificationService::classify", () => {
    describe("hard-exclude", () => {
      it.each([["checkbox"], ["submit"], ["radio"], ["hidden"]])(
        "should hard-exclude an INPUT of non-credential type %j to OTHER at tier NONE",
        (type) => {
          expect.assertions(2);

          const decision = FieldClassificationService.classify(defaultField({ type }));

          expect(decision.role).toBe(FieldRole.OTHER);
          expect(decision.tier).toBe(Tier.NONE);
        },
      );

      it("should not hard-exclude a plausible-but-unusual type (number) and let the ladder resolve it", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ type: "number", name: "login" }));

        expect(decision).toStrictEqual({ role: FieldRole.USERNAME, tier: Tier.ATTRIBUTE_KEYWORD });
      });

      it("should not hard-exclude a non-INPUT tag by the input-type rule", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(
          defaultField({ tagName: "SELECT", type: "", name: "username" }),
        );

        expect(decision).toStrictEqual({ role: FieldRole.USERNAME, tier: Tier.ATTRIBUTE_KEYWORD });
      });
    });

    describe("recovery veto", () => {
      it("should veto a field whose name is a recovery keyword to OTHER at tier ATTRIBUTE_KEYWORD", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ name: "backup" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.ATTRIBUTE_KEYWORD });
      });

      it("should veto a field whose label is a recovery keyword to OTHER at tier ATTRIBUTE_KEYWORD", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ labelText: "recovery code" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.ATTRIBUTE_KEYWORD });
      });

      it("should let a recovery keyword veto before the TOTP step even when an OTP signal is present", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ dataFormType: "otp", name: "backup" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.ATTRIBUTE_KEYWORD });
      });
    });

    describe("totp", () => {
      it("should classify a SAWF-declared otp field as TOTP at tier SAWF", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ dataFormType: "otp" }));

        expect(decision).toStrictEqual({ role: FieldRole.TOTP, tier: Tier.SAWF });
      });

      it("should classify an autocomplete one-time-code field as TOTP at tier AUTOCOMPLETE", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ autoComplete: "one-time-code" }));

        expect(decision).toStrictEqual({ role: FieldRole.TOTP, tier: Tier.AUTOCOMPLETE });
      });

      it("should classify a field whose name is a TOTP keyword as TOTP at tier ATTRIBUTE_KEYWORD", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ name: "authenticator" }));

        expect(decision).toStrictEqual({ role: FieldRole.TOTP, tier: Tier.ATTRIBUTE_KEYWORD });
      });

      it("should classify a field whose label is a TOTP keyword as TOTP at tier ATTRIBUTE_KEYWORD", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ labelText: "verificationcode" }));

        expect(decision).toStrictEqual({ role: FieldRole.TOTP, tier: Tier.ATTRIBUTE_KEYWORD });
      });

      it("should classify an ambiguous 'code' label corroborated by a plausible maxLength as TOTP", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(
          defaultField({
            labelText: "Saisissez votre code de double authentification :",
            name: "codeDA",
            maxLength: 6,
          }),
        );

        expect(decision).toStrictEqual({ role: FieldRole.TOTP, tier: Tier.ATTRIBUTE_KEYWORD });
      });

      it("should classify an ambiguous 'code' label corroborated by a numeric inputMode as TOTP", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(
          defaultField({ labelText: "Enter your code", inputMode: "numeric" }),
        );

        expect(decision).toStrictEqual({ role: FieldRole.TOTP, tier: Tier.ATTRIBUTE_KEYWORD });
      });

      it("should classify an ambiguous 'code' label corroborated by a digit-constrained pattern as TOTP", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(
          defaultField({ labelText: "Enter your code", pattern: "[0-9]{6}" }),
        );

        expect(decision).toStrictEqual({ role: FieldRole.TOTP, tier: Tier.ATTRIBUTE_KEYWORD });
      });

      it("should NOT classify an ambiguous 'code' token without any structural corroboration", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ labelText: "Enter your code" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.NONE });
      });

      it("should NOT classify an ambiguous 'code' token when maxLength is outside the OTP range", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(
          defaultField({ labelText: "Enter your code", maxLength: 20 }),
        );

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.NONE });
      });

      it("should let a recovery keyword veto an ambiguous 'code' token even with a plausible maxLength", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ labelText: "backup code", maxLength: 6 }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.ATTRIBUTE_KEYWORD });
      });
    });

    describe("Tier 1 — SAWF (declaredBySawf)", () => {
      it("should classify a data-form-type username as USERNAME at the SAWF tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ dataFormType: "username" }))).toStrictEqual({
          role: FieldRole.USERNAME,
          tier: Tier.SAWF,
        });
      });

      it("should demote a data-form-type secondary email to OTHER but keep the SAWF tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ dataFormType: "email,secondary" }))).toStrictEqual({
          role: FieldRole.OTHER,
          tier: Tier.SAWF,
        });
      });

      it("should decide an out-of-taxon data-form-type as OTHER at SAWF without falling through to a keyword", () => {
        expect.assertions(1);

        expect(
          FieldClassificationService.classify(defaultField({ dataFormType: "search", name: "username" })),
        ).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.SAWF });
      });

      it("should classify a data-form-type password,new as NEW_PASSWORD at the SAWF tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ dataFormType: "password,new" }))).toStrictEqual({
          role: FieldRole.NEW_PASSWORD,
          tier: Tier.SAWF,
        });
      });
    });

    describe("Tier 2 — autocomplete (declaredByAutocomplete)", () => {
      it("should classify an autocomplete username as USERNAME at the AUTOCOMPLETE tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ autoComplete: "username" }))).toStrictEqual({
          role: FieldRole.USERNAME,
          tier: Tier.AUTOCOMPLETE,
        });
      });

      it("should classify an autocomplete current-password as CURRENT_PASSWORD at the AUTOCOMPLETE tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ autoComplete: "current-password" }))).toStrictEqual({
          role: FieldRole.CURRENT_PASSWORD,
          tier: Tier.AUTOCOMPLETE,
        });
      });

      it("should not decide on autocomplete off and fall through to OTHER at the NONE tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ autoComplete: "off" }))).toStrictEqual({
          role: FieldRole.OTHER,
          tier: Tier.NONE,
        });
      });

      it("should not stop on an unmapped autocomplete type and fall through the cascade", () => {
        expect.assertions(1);

        // A valid-but-unmapped token (`tel`) is not one we handle: it must not decide here. With no other
        // signal the field falls through to OTHER at the NONE tier (rather than OTHER at AUTOCOMPLETE).
        expect(FieldClassificationService.classify(defaultField({ autoComplete: "tel" }))).toStrictEqual({
          role: FieldRole.OTHER,
          tier: Tier.NONE,
        });
      });

      it("should classify the non-spec 'password' autocomplete token as PASSWORD at the AUTOCOMPLETE tier", () => {
        expect.assertions(1);

        // `autocomplete="password"` is invalid per WHATWG (current-/new-password are the valid ones) but
        // widespread; it must not stop the cascade at OTHER — it resolves to the generic PASSWORD role.
        expect(
          FieldClassificationService.classify(defaultField({ type: "password", autoComplete: "password" })),
        ).toStrictEqual({
          role: FieldRole.PASSWORD,
          tier: Tier.AUTOCOMPLETE,
        });
      });

      it("should not let an invalid autocomplete token block the cascade, falling through to the input type", () => {
        expect.assertions(1);

        // An unknown/typo token is not an authoritative declaration: it must be ignored so a type=password
        // field is still classified PASSWORD at the INPUT_TYPE tier instead of being locked to OTHER.
        expect(
          FieldClassificationService.classify(defaultField({ type: "password", autoComplete: "pwd" })),
        ).toStrictEqual({
          role: FieldRole.PASSWORD,
          tier: Tier.INPUT_TYPE,
        });
      });
    });

    describe("Tier 3 — input type", () => {
      it("should classify a type=password field as PASSWORD at the INPUT_TYPE tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ type: "password" }))).toStrictEqual({
          role: FieldRole.PASSWORD,
          tier: Tier.INPUT_TYPE,
        });
      });

      it("should classify a type=email field as EMAIL at the INPUT_TYPE tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ type: "email" }))).toStrictEqual({
          role: FieldRole.EMAIL,
          tier: Tier.INPUT_TYPE,
        });
      });
    });

    describe("Tier 4 — explicit label / aria (strong text)", () => {
      it("should classify a field labelled 'Email address' as EMAIL at the EXPLICIT_LABEL tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ labelText: "Email address" }))).toStrictEqual({
          role: FieldRole.EMAIL,
          tier: Tier.EXPLICIT_LABEL,
        });
      });

      it("should classify a text field with an email-shaped placeholder as EMAIL at the EXPLICIT_LABEL tier", () => {
        expect.assertions(1);

        expect(
          FieldClassificationService.classify(defaultField({ type: "text", placeholder: "you@example.com" })),
        ).toStrictEqual({ role: FieldRole.EMAIL, tier: Tier.EXPLICIT_LABEL });
      });

      it("should classify a field labelled 'Password' as PASSWORD at the EXPLICIT_LABEL tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ labelText: "Password" }))).toStrictEqual({
          role: FieldRole.PASSWORD,
          tier: Tier.EXPLICIT_LABEL,
        });
      });

      it("should not classify a field labelled 'Forgot password' as PASSWORD and fall back to OTHER", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ labelText: "Forgot password" }))).toStrictEqual({
          role: FieldRole.OTHER,
          tier: Tier.NONE,
        });
      });

      it("should classify a field labelled 'Username' as USERNAME at the EXPLICIT_LABEL tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ labelText: "Username" }))).toStrictEqual({
          role: FieldRole.USERNAME,
          tier: Tier.EXPLICIT_LABEL,
        });
      });
    });

    describe("Tier 5 — name / id / placeholder keyword (weak text)", () => {
      it("should classify a field with name 'email' as EMAIL at the ATTRIBUTE_KEYWORD tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ name: "email" }))).toStrictEqual({
          role: FieldRole.EMAIL,
          tier: Tier.ATTRIBUTE_KEYWORD,
        });
      });

      it("should classify a type=text field with name 'password' as PASSWORD at the ATTRIBUTE_KEYWORD tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ type: "text", name: "password" }))).toStrictEqual({
          role: FieldRole.PASSWORD,
          tier: Tier.ATTRIBUTE_KEYWORD,
        });
      });

      it("should classify a field with name 'username' as USERNAME at the ATTRIBUTE_KEYWORD tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField({ name: "username" }))).toStrictEqual({
          role: FieldRole.USERNAME,
          tier: Tier.ATTRIBUTE_KEYWORD,
        });
      });

      it("should NOT classify a field with name 'user_firstname' as USERNAME (IDENTIFIER_EXCLUDE veto)", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ name: "user_firstname" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.NONE });
      });

      it("should NOT classify a field with name 'user_first_name' as USERNAME (IDENTIFIER_EXCLUDE veto)", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ name: "user_first_name" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.NONE });
      });

      it("should NOT classify a field with name 'email_firstname' as EMAIL (IDENTIFIER_EXCLUDE veto)", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ name: "email_firstname" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.NONE });
      });

      it("should NOT classify a field with name 'user_lastname' as USERNAME (IDENTIFIER_EXCLUDE veto)", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ name: "user_lastname" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.NONE });
      });

      it("should NOT classify a field with name 'user_last_name' as USERNAME (IDENTIFIER_EXCLUDE veto)", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ name: "user_last_name" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.NONE });
      });

      it("should NOT classify a field with name 'email_lastname' as EMAIL (IDENTIFIER_EXCLUDE veto)", () => {
        expect.assertions(1);

        const decision = FieldClassificationService.classify(defaultField({ name: "email_lastname" }));

        expect(decision).toStrictEqual({ role: FieldRole.OTHER, tier: Tier.NONE });
      });
    });

    describe("fallback", () => {
      it("should classify a plain text field carrying no signal as OTHER at the NONE tier", () => {
        expect.assertions(1);

        expect(FieldClassificationService.classify(defaultField())).toStrictEqual({
          role: FieldRole.OTHER,
          tier: Tier.NONE,
        });
      });
    });

    describe("precedence", () => {
      it("should let SAWF beat autocomplete when both declare a role", () => {
        expect.assertions(1);

        expect(
          FieldClassificationService.classify(
            defaultField({ dataFormType: "username", autoComplete: "current-password" }),
          ),
        ).toStrictEqual({ role: FieldRole.USERNAME, tier: Tier.SAWF });
      });

      it("should let the input type win over a conflicting label", () => {
        expect.assertions(1);

        expect(
          FieldClassificationService.classify(defaultField({ type: "password", labelText: "Email" })),
        ).toStrictEqual({ role: FieldRole.PASSWORD, tier: Tier.INPUT_TYPE });
      });

      it("should let a strong identifier label win over a weak email attribute", () => {
        expect.assertions(1);

        expect(
          FieldClassificationService.classify(defaultField({ labelText: "Username", name: "email" })),
        ).toStrictEqual({ role: FieldRole.USERNAME, tier: Tier.EXPLICIT_LABEL });
      });
    });
  });
});
