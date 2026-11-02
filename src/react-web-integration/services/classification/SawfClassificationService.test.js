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

import SawfClassificationService from "./SawfClassificationService";
import { FieldRole, FormRole } from "./Taxonomy";

describe("SawfClassificationService", () => {
  describe("SawfClassificationService::parseSawf", () => {
    it("should return a set with a single token", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf("password")).toEqual(new Set(["password"]));
    });

    it("should split multiple comma-separated tokens", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf("password,new")).toEqual(new Set(["password", "new"]));
    });

    it("should trim surrounding spaces from tokens", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf(" password , new ")).toEqual(new Set(["password", "new"]));
    });

    it("should lowercase tokens", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf("Password,NEW")).toEqual(new Set(["password", "new"]));
    });

    it("should not treat a space as a separator", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf("one time")).toEqual(new Set(["one time"]));
    });

    it("should return an empty set for an empty string", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf("")).toEqual(new Set([]));
    });

    it("should return an empty set for null", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf(null)).toEqual(new Set([]));
    });

    it("should return an empty set for undefined", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf(undefined)).toEqual(new Set([]));
    });

    it("should deduplicate repeated tokens", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf("password,password")).toEqual(new Set(["password"]));
    });

    it("should drop empty segments between commas", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf("password,,new")).toEqual(new Set(["password", "new"]));
    });

    it("should drop an empty segment from a trailing comma", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf("password,")).toEqual(new Set(["password"]));
    });

    it("should return an empty set for whitespace-only or commas-only values", () => {
      expect.assertions(2);

      expect(SawfClassificationService.parseSawf("   ")).toEqual(new Set([]));
      expect(SawfClassificationService.parseSawf(",,,")).toEqual(new Set([]));
    });

    it("should preserve internal spaces while trimming surrounding ones", () => {
      expect.assertions(1);

      expect(SawfClassificationService.parseSawf(" one time , x ")).toEqual(new Set(["one time", "x"]));
    });
  });

  describe("SawfClassificationService::sawfFieldRole", () => {
    it("should resolve a bare otp token to totp", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("otp")).toBe(FieldRole.TOTP);
    });

    it("should resolve a bare username token to username", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("username")).toBe(FieldRole.USERNAME);
    });

    it("should resolve a bare email token to email", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("email")).toBe(FieldRole.EMAIL);
    });

    it("should resolve a bare password token to password", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("password")).toBe(FieldRole.PASSWORD);
    });

    it("should prefer otp over username", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("otp,username")).toBe(FieldRole.TOTP);
    });

    it("should prefer username over email", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("username,email")).toBe(FieldRole.USERNAME);
    });

    it("should prefer email over password", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("email,password")).toBe(FieldRole.EMAIL);
    });

    it("should resolve to the highest-priority role when several base tokens are present", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("phone,email,username")).toBe(FieldRole.USERNAME);
    });

    it("should resolve a secondary email to other", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("email,secondary")).toBe(FieldRole.OTHER);
    });

    it("should ignore a secondary extra on a username", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("username,secondary")).toBe(FieldRole.USERNAME);
    });

    it("should resolve a password with confirmation to password-confirmation", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("password,confirmation")).toBe(FieldRole.PASSWORD_CONFIRMATION);
    });

    it("should resolve a password with new to new-password", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("password,new")).toBe(FieldRole.NEW_PASSWORD);
    });

    it("should prefer confirmation over new for a password", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("password,confirmation,new")).toBe(
        FieldRole.PASSWORD_CONFIRMATION,
      );
    });

    it("should ignore an unrecognized extra and resolve to bare password", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("password,current")).toBe(FieldRole.PASSWORD);
    });

    it("should ignore a secondary extra on a password", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("password,secondary")).toBe(FieldRole.PASSWORD);
    });

    it("should resolve a lone code token to other", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("code")).toBe(FieldRole.OTHER);
    });

    it("should resolve an action/login value to other (it declares no field)", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("action,login")).toBe(FieldRole.OTHER);
    });

    it("should resolve an unknown value to other", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("unknown")).toBe(FieldRole.OTHER);
    });

    it("should resolve an empty string to other", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("")).toBe(FieldRole.OTHER);
    });

    it("should resolve null to other", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole(null)).toBe(FieldRole.OTHER);
    });

    it("should be case-insensitive when resolving a role", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFieldRole("OTP")).toBe(FieldRole.TOTP);
    });
  });

  describe("SawfClassificationService::sawfFormRole", () => {
    it("should map a login token to LOGIN", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFormRole("login")).toBe(FormRole.LOGIN);
    });

    it("should map a register token to SIGNUP", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFormRole("register")).toBe(FormRole.SIGNUP);
    });

    it("should map a change_password token to CHANGE_PASSWORD", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFormRole("change_password")).toBe(FormRole.CHANGE_PASSWORD);
    });

    it("should prefer login over register when both are present", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFormRole("login,register")).toBe(FormRole.LOGIN);
    });

    it("should prefer register over change_password when both are present", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFormRole("register,change_password")).toBe(FormRole.SIGNUP);
    });

    it("should prefer login over register and change_password when all are present", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFormRole("login,register,change_password")).toBe(FormRole.LOGIN);
    });

    it("should map forgot_password to OTHER", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFormRole("forgot_password")).toBe(FormRole.OTHER);
    });

    it("should map unrelated tokens to OTHER", () => {
      expect.assertions(2);

      expect(SawfClassificationService.sawfFormRole("newsletter")).toBe(FormRole.OTHER);
      expect(SawfClassificationService.sawfFormRole("payment")).toBe(FormRole.OTHER);
    });

    it("should map an empty or null value to OTHER", () => {
      expect.assertions(3);

      expect(SawfClassificationService.sawfFormRole("")).toBe(FormRole.OTHER);
      expect(SawfClassificationService.sawfFormRole(null)).toBe(FormRole.OTHER);
      expect(SawfClassificationService.sawfFormRole(undefined)).toBe(FormRole.OTHER);
    });

    it("should be case-insensitive", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfFormRole("LOGIN")).toBe(FormRole.LOGIN);
    });
  });

  describe("SawfClassificationService::sawfActionHint", () => {
    it("should return null when no action token is present", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("login")).toBeNull();
    });

    it("should return null for an intent token that lacks the action gate", () => {
      expect.assertions(2);

      expect(SawfClassificationService.sawfActionHint("change_password")).toBeNull();
      expect(SawfClassificationService.sawfActionHint("register")).toBeNull();
    });

    it("should map action,login to LOGIN", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("action,login")).toBe(FormRole.LOGIN);
    });

    it("should map action,register to SIGNUP", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("action,register")).toBe(FormRole.SIGNUP);
    });

    it("should map action,change_password to CHANGE_PASSWORD", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("action,change_password")).toBe(FormRole.CHANGE_PASSWORD);
    });

    it("should prefer change_password over login", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("action,login,change_password")).toBe(FormRole.CHANGE_PASSWORD);
    });

    it("should prefer register over login", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("action,login,register")).toBe(FormRole.SIGNUP);
    });

    it("should return null for action with a non-matching intent", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("action,forgot_password")).toBeNull();
    });

    it("should return null for a lone action token", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("action")).toBeNull();
    });

    it("should return null for an empty or null value", () => {
      expect.assertions(3);

      expect(SawfClassificationService.sawfActionHint("")).toBeNull();
      expect(SawfClassificationService.sawfActionHint(null)).toBeNull();
      expect(SawfClassificationService.sawfActionHint(undefined)).toBeNull();
    });

    it("should be case-insensitive", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfActionHint("ACTION,LOGIN")).toBe(FormRole.LOGIN);
    });
  });

  describe("SawfClassificationService::sawfMultiStep", () => {
    it("should return true for a step token", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfMultiStep("step")).toBe(true);
    });

    it("should return true for a final token", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfMultiStep("final")).toBe(true);
    });

    it("should return true when a step token coexists with other tokens", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfMultiStep("login,step")).toBe(true);
    });

    it("should return true when both step and final are present", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfMultiStep("step,final")).toBe(true);
    });

    it("should return false when neither step nor final is present", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfMultiStep("login")).toBe(false);
    });

    it("should return false for an empty or null value", () => {
      expect.assertions(3);

      expect(SawfClassificationService.sawfMultiStep("")).toBe(false);
      expect(SawfClassificationService.sawfMultiStep(null)).toBe(false);
      expect(SawfClassificationService.sawfMultiStep(undefined)).toBe(false);
    });

    it("should be case-insensitive", () => {
      expect.assertions(1);

      expect(SawfClassificationService.sawfMultiStep("STEP")).toBe(true);
    });
  });
});
