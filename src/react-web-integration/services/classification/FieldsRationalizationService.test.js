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

import FieldsRationalizationService from "./FieldsRationalizationService";
import { FieldRole, FormRole } from "./Taxonomy";
import { defaultScope } from "./FieldsRationalizationService.test.data";

describe("FieldsRationalizationService", () => {
  describe("FieldsRationalizationService::rescueLoginPassword", () => {
    it("should promote the first type=password field to current-password on a login form with no resolved password", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.USERNAME, type: "text" },
          { id: "password", role: FieldRole.OTHER, type: "password" },
        ]),
      );

      expect(roles.get("password")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("username")).toBe(FieldRole.USERNAME);
    });

    it("should not promote a type=password field when the form role is not login", () => {
      expect.assertions(1);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [{ id: "password", role: FieldRole.OTHER, type: "password" }]),
      );

      expect(roles.get("password")).toBe(FieldRole.OTHER);
    });

    it("should not promote another field when a current-password already exists", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.USERNAME, type: "text" },
          { id: "currentPassword", role: FieldRole.CURRENT_PASSWORD, type: "password" },
          { id: "extraPassword", role: FieldRole.OTHER, type: "password" },
        ]),
      );

      expect(roles.get("currentPassword")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("extraPassword")).toBe(FieldRole.OTHER);
    });

    it("should not promote another field when a generic password role exists", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.USERNAME, type: "text" },
          { id: "genericPassword", role: FieldRole.PASSWORD, type: "password" },
          { id: "extraPassword", role: FieldRole.OTHER, type: "password" },
        ]),
      );

      // The generic password is defaulted to current-password by a later pass, but the OTHER
      // type=password field is never rescued because a password role already existed.
      expect(roles.get("genericPassword")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("extraPassword")).toBe(FieldRole.OTHER);
    });

    it("should promote only the first type=password field when multiple exist", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.USERNAME, type: "text" },
          { id: "password1", role: FieldRole.OTHER, type: "password" },
          { id: "password2", role: FieldRole.OTHER, type: "password" },
        ]),
      );

      expect(roles.get("password1")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("password2")).toBe(FieldRole.OTHER);
    });

    it("should promote even an author-declared new-password when no password role is resolved on login", () => {
      expect.assertions(1);

      // rescueLoginPassword runs before enforceLoginConsistency and only checks type=password, so it
      // overrides the declared new-password (its _byDeclared guard never gets a chance).
      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.USERNAME, type: "text" },
          { id: "newPassword", role: FieldRole.NEW_PASSWORD, type: "password", byDeclared: true },
        ]),
      );

      expect(roles.get("newPassword")).toBe(FieldRole.CURRENT_PASSWORD);
    });
  });

  describe("FieldsRationalizationService::rescueUsername", () => {
    it("should promote a text field preceding the password to username on a login form", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.OTHER, type: "text" },
          { id: "password", role: FieldRole.CURRENT_PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("username")).toBe(FieldRole.USERNAME);
      expect(roles.get("password")).toBe(FieldRole.CURRENT_PASSWORD);
    });

    it("should promote an email field preceding the password to email on a login form", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "email", role: FieldRole.OTHER, type: "email" },
          { id: "password", role: FieldRole.CURRENT_PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("email")).toBe(FieldRole.EMAIL);
      expect(roles.get("password")).toBe(FieldRole.CURRENT_PASSWORD);
    });

    it("should skip a totp field during the back-scan and grab an earlier eligible field", () => {
      expect.assertions(3);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.OTHER, type: "text" },
          { id: "otp", role: FieldRole.TOTP, type: "text" },
          { id: "password", role: FieldRole.CURRENT_PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("otp")).toBe(FieldRole.TOTP);
      expect(roles.get("username")).toBe(FieldRole.USERNAME);
      expect(roles.get("password")).toBe(FieldRole.CURRENT_PASSWORD);
    });

    it("should skip a button preceding the password and grab an earlier eligible field", () => {
      expect.assertions(3);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.OTHER, type: "text" },
          { id: "submitButton", role: FieldRole.OTHER, type: "text", tagName: "BUTTON" },
          { id: "password", role: FieldRole.CURRENT_PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("submitButton")).toBe(FieldRole.OTHER);
      expect(roles.get("username")).toBe(FieldRole.USERNAME);
      expect(roles.get("password")).toBe(FieldRole.CURRENT_PASSWORD);
    });

    it("should not rescue a username when one already exists", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.USERNAME, type: "text" },
          { id: "unrelatedField", role: FieldRole.OTHER, type: "text" },
          { id: "password", role: FieldRole.CURRENT_PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("username")).toBe(FieldRole.USERNAME);
      expect(roles.get("unrelatedField")).toBe(FieldRole.OTHER);
    });

    it("should not rescue a username when the form role is not login", () => {
      expect.assertions(1);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "unrelatedField", role: FieldRole.OTHER, type: "text" },
          { id: "password", role: FieldRole.PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("unrelatedField")).toBe(FieldRole.OTHER);
    });

    it("should leave roles unchanged when nothing eligible precedes the password", () => {
      expect.assertions(1);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "unrelatedField", role: FieldRole.OTHER, type: "checkbox" },
          { id: "password", role: FieldRole.CURRENT_PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("unrelatedField")).toBe(FieldRole.OTHER);
    });

    it("should not rescue a username when the password is the first field", () => {
      expect.assertions(1);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [{ id: "password", role: FieldRole.CURRENT_PASSWORD, type: "password" }]),
      );

      expect(roles.get("password")).toBe(FieldRole.CURRENT_PASSWORD);
    });

    it("should rescue only the field immediately preceding the password when several precede it", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "unrelatedField", role: FieldRole.OTHER, type: "text" },
          { id: "username", role: FieldRole.OTHER, type: "text" },
          { id: "password", role: FieldRole.CURRENT_PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("username")).toBe(FieldRole.USERNAME);
      expect(roles.get("unrelatedField")).toBe(FieldRole.OTHER);
    });
  });

  describe("FieldsRationalizationService::dedupeKeepFirst", () => {
    it("should keep the first username and demote the second to other in DOM order", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "username1", role: FieldRole.USERNAME },
          { id: "username2", role: FieldRole.USERNAME },
        ]),
      );

      expect(roles.get("username1")).toBe(FieldRole.USERNAME);
      expect(roles.get("username2")).toBe(FieldRole.OTHER);
    });

    it("should keep only the first of three usernames and demote the other two to other", () => {
      expect.assertions(3);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "username1", role: FieldRole.USERNAME },
          { id: "username2", role: FieldRole.USERNAME },
          { id: "username3", role: FieldRole.USERNAME },
        ]),
      );

      expect(roles.get("username1")).toBe(FieldRole.USERNAME);
      expect(roles.get("username2")).toBe(FieldRole.OTHER);
      expect(roles.get("username3")).toBe(FieldRole.OTHER);
    });

    it("should leave a single username field unchanged", () => {
      expect.assertions(1);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [{ id: "username", role: FieldRole.USERNAME }]),
      );

      expect(roles.get("username")).toBe(FieldRole.USERNAME);
    });

    it("should keep the first current-password and demote the second to other in DOM order", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "currentPassword1", role: FieldRole.CURRENT_PASSWORD, type: "password" },
          { id: "currentPassword2", role: FieldRole.CURRENT_PASSWORD, type: "password" },
        ]),
      );

      expect(roles.get("currentPassword1")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("currentPassword2")).toBe(FieldRole.OTHER);
    });
  });

  describe("FieldsRationalizationService::fixOrphanConfirmation", () => {
    it("should rewrite an orphan password-confirmation to current-password via the later generic-password default", () => {
      expect.assertions(1);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "confirmPassword", role: FieldRole.PASSWORD_CONFIRMATION, type: "password" },
        ]),
      );

      expect(roles.get("confirmPassword")).toBe(FieldRole.CURRENT_PASSWORD);
    });

    it("should not rewrite a password-confirmation when a new-password is present on a non-login form", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "newPassword", role: FieldRole.NEW_PASSWORD, type: "password" },
          { id: "confirmPassword", role: FieldRole.PASSWORD_CONFIRMATION, type: "password" },
        ]),
      );

      expect(roles.get("newPassword")).toBe(FieldRole.NEW_PASSWORD);
      expect(roles.get("confirmPassword")).toBe(FieldRole.PASSWORD_CONFIRMATION);
    });
  });

  describe("FieldsRationalizationService::enforceLoginConsistency", () => {
    it("should strip a non-declared password-confirmation from a login form", () => {
      expect.assertions(3);

      // A resolved current-password keeps rescueLoginPassword inert and a declared new-password keeps
      // fixOrphanConfirmation inert, so enforceLoginConsistency rewrites the inferred confirmation to
      // current — which the final CURRENT_PASSWORD dedupe then demotes to other.
      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "currentPassword", role: FieldRole.CURRENT_PASSWORD, type: "password", byDeclared: false },
          { id: "newPassword", role: FieldRole.NEW_PASSWORD, type: "password", byDeclared: true },
          { id: "confirmPassword", role: FieldRole.PASSWORD_CONFIRMATION, type: "password", byDeclared: false },
        ]),
      );

      expect(roles.get("currentPassword")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("newPassword")).toBe(FieldRole.NEW_PASSWORD);
      expect(roles.get("confirmPassword")).toBe(FieldRole.OTHER);
    });

    it("should not rewrite a new-password on a non-login (signup) form", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.SIGNUP, [
          { id: "username", role: FieldRole.USERNAME },
          { id: "newPassword", role: FieldRole.NEW_PASSWORD, type: "password", byDeclared: false },
        ]),
      );

      expect(roles.get("username")).toBe(FieldRole.USERNAME);
      expect(roles.get("newPassword")).toBe(FieldRole.NEW_PASSWORD);
    });

    it("should not rewrite a password-confirmation on a non-login (other) form", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "newPassword", role: FieldRole.NEW_PASSWORD, type: "password", byDeclared: false },
          { id: "confirmPassword", role: FieldRole.PASSWORD_CONFIRMATION, type: "password", byDeclared: false },
        ]),
      );

      expect(roles.get("newPassword")).toBe(FieldRole.NEW_PASSWORD);
      expect(roles.get("confirmPassword")).toBe(FieldRole.PASSWORD_CONFIRMATION);
    });
  });

  describe("FieldsRationalizationService::defaultGenericPasswords", () => {
    it("should default a leftover generic password to current-password on a non-login form", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "username", role: FieldRole.USERNAME },
          { id: "genericPassword", role: FieldRole.PASSWORD, type: "password", byDeclared: false },
        ]),
      );

      expect(roles.get("username")).toBe(FieldRole.USERNAME);
      expect(roles.get("genericPassword")).toBe(FieldRole.CURRENT_PASSWORD);
    });

    it("should default a stray generic password to current-password on a signup form", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.SIGNUP, [
          { id: "username", role: FieldRole.USERNAME },
          { id: "newPassword", role: FieldRole.NEW_PASSWORD, type: "password", byDeclared: true },
          { id: "genericPassword", role: FieldRole.PASSWORD, type: "password", byDeclared: false },
        ]),
      );

      expect(roles.get("newPassword")).toBe(FieldRole.NEW_PASSWORD);
      expect(roles.get("genericPassword")).toBe(FieldRole.CURRENT_PASSWORD);
    });
  });

  describe("FieldsRationalizationService::rationalize (ordering)", () => {
    it("should keep at most one current-password when login coercion promotes a second one on a login form", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.USERNAME },
          { id: "currentPassword", role: FieldRole.CURRENT_PASSWORD, type: "password", byDeclared: false },
          { id: "newPassword", role: FieldRole.NEW_PASSWORD, type: "password", byDeclared: false },
        ]),
      );

      expect(roles.get("currentPassword")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("newPassword")).toBe(FieldRole.OTHER);
    });

    it("should keep only the first current-password after the generic default promotes two generic passwords", () => {
      expect.assertions(2);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.OTHER, [
          { id: "password1", role: FieldRole.PASSWORD, type: "password", byDeclared: false },
          { id: "password2", role: FieldRole.PASSWORD, type: "password", byDeclared: false },
        ]),
      );

      expect(roles.get("password1")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("password2")).toBe(FieldRole.OTHER);
    });

    it("should not dedupe a declared new-password against a current-password on a login form", () => {
      expect.assertions(3);

      const roles = FieldsRationalizationService.rationalize(
        defaultScope(FormRole.LOGIN, [
          { id: "username", role: FieldRole.USERNAME },
          { id: "currentPassword", role: FieldRole.CURRENT_PASSWORD, type: "password", byDeclared: false },
          { id: "newPassword", role: FieldRole.NEW_PASSWORD, type: "password", byDeclared: true },
        ]),
      );

      expect(roles.get("username")).toBe(FieldRole.USERNAME);
      expect(roles.get("currentPassword")).toBe(FieldRole.CURRENT_PASSWORD);
      expect(roles.get("newPassword")).toBe(FieldRole.NEW_PASSWORD);
    });

    it("should return an empty map for an empty scope without throwing", () => {
      expect.assertions(1);

      const roles = FieldsRationalizationService.rationalize(defaultScope(FormRole.LOGIN, []));

      expect(roles.size).toBe(0);
    });
  });
});
