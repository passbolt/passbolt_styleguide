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

import PasswordRoleResolutionService from "./PasswordRoleResolutionService";
import { FieldRole, FormRole } from "./Taxonomy";
import { defaultEntry, defaultContext } from "./PasswordRoleResolutionService.test.data";

describe("PasswordRoleResolutionService", () => {
  describe("PasswordRoleResolutionService::resolve", () => {
    describe("Step A — declared roles are authoritative", () => {
      it("should keep a declared PASSWORD_CONFIRMATION as PASSWORD_CONFIRMATION", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD_CONFIRMATION)];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });

      it("should keep a single declared NEW_PASSWORD as NEW_PASSWORD", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.NEW_PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
      });

      it("should demote the second declared NEW_PASSWORD to PASSWORD_CONFIRMATION positionally", () => {
        expect.assertions(2);

        const entries = [defaultEntry("p1", FieldRole.NEW_PASSWORD), defaultEntry("p2", FieldRole.NEW_PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });

      it("should keep a declared CURRENT_PASSWORD as CURRENT_PASSWORD", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.CURRENT_PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
      });

      it("should not write non-password roles into the output map", () => {
        expect.assertions(4);

        const entries = [
          defaultEntry("u1", FieldRole.USERNAME),
          defaultEntry("e1", FieldRole.EMAIL),
          defaultEntry("o1", FieldRole.OTHER),
          defaultEntry("c1", FieldRole.CURRENT_PASSWORD),
        ];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.has("u1")).toBe(false);
        expect(resolved.has("e1")).toBe(false);
        expect(resolved.has("o1")).toBe(false);
        expect(resolved.get("c1")).toBe(FieldRole.CURRENT_PASSWORD);
      });
    });

    describe("with a single generic password field", () => {
      it("should resolve the bare password to CURRENT_PASSWORD when a NEW_PASSWORD is already declared", () => {
        expect.assertions(2);

        const entries = [defaultEntry("p1", FieldRole.NEW_PASSWORD), defaultEntry("p2", FieldRole.PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.CURRENT_PASSWORD);
      });

      it("should resolve to CURRENT_PASSWORD when the declared form role is LOGIN", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.LOGIN }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
      });

      it("should resolve to NEW_PASSWORD when the declared form role is CHANGE_PASSWORD", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.CHANGE_PASSWORD }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
      });

      it("should resolve to NEW_PASSWORD when the declared form role is SIGNUP", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.SIGNUP }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
      });

      it("should resolve to NEW_PASSWORD when no role is declared and formIsSignup is true", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext({ formIsSignup: true }));

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
      });

      it("should resolve to NEW_PASSWORD when no marker is set but the field carries a creation keyword", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD, { name: "new" })];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
      });

      it("should default to CURRENT_PASSWORD when no marker, no keyword and formIsSignup is false", () => {
        expect.assertions(1);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD)];

        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
      });
    });

    describe("with two generic password fields", () => {
      it("should resolve to current + new when the declared form role is login", () => {
        expect.assertions(2);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD), defaultEntry("p2", FieldRole.PASSWORD)];
        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.LOGIN }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.NEW_PASSWORD);
      });

      it("should resolve to new + confirmation when the declared form role is signup", () => {
        expect.assertions(2);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD), defaultEntry("p2", FieldRole.PASSWORD)];
        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.SIGNUP }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });

      it("should resolve to new + confirmation when the form is signup by context", () => {
        expect.assertions(2);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD), defaultEntry("p2", FieldRole.PASSWORD)];
        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext({ formIsSignup: true }));

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });

      it("should resolve to new + confirmation when a creation keyword is present on either field", () => {
        expect.assertions(2);

        const entries = [
          defaultEntry("p1", FieldRole.PASSWORD),
          defaultEntry("p2", FieldRole.PASSWORD, { name: "confirmPassword" }),
        ];
        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });

      it("should resolve to current + new when the declared form role is change-password", () => {
        expect.assertions(2);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD), defaultEntry("p2", FieldRole.PASSWORD)];
        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.CHANGE_PASSWORD }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.NEW_PASSWORD);
      });

      it("should resolve to current + new when the form is change by context", () => {
        expect.assertions(2);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD), defaultEntry("p2", FieldRole.PASSWORD)];
        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext({ formIsChange: true }));

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.NEW_PASSWORD);
      });

      it("should default to new + confirmation when no marker is present", () => {
        expect.assertions(2);

        const entries = [defaultEntry("p1", FieldRole.PASSWORD), defaultEntry("p2", FieldRole.PASSWORD)];
        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });

      it("should prefer the declared login role over a change context and a creation keyword", () => {
        expect.assertions(2);

        const entries = [
          defaultEntry("p1", FieldRole.PASSWORD, { name: "newPassword" }),
          defaultEntry("p2", FieldRole.PASSWORD),
        ];
        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.LOGIN, formIsChange: true }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.NEW_PASSWORD);
      });
    });

    describe("with three or more generic password fields", () => {
      it("should resolve the first three to current + new + confirmation", () => {
        expect.assertions(3);

        const entries = [
          defaultEntry("p1", FieldRole.PASSWORD),
          defaultEntry("p2", FieldRole.PASSWORD),
          defaultEntry("p3", FieldRole.PASSWORD),
        ];
        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p3")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });

      it("should mark a fourth password field as other noise", () => {
        expect.assertions(4);

        const entries = [
          defaultEntry("p1", FieldRole.PASSWORD),
          defaultEntry("p2", FieldRole.PASSWORD),
          defaultEntry("p3", FieldRole.PASSWORD),
          defaultEntry("p4", FieldRole.PASSWORD),
        ];
        const resolved = PasswordRoleResolutionService.resolve(entries, defaultContext());

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p3")).toBe(FieldRole.PASSWORD_CONFIRMATION);
        expect(resolved.get("p4")).toBe(FieldRole.OTHER);
      });
    });

    describe("with the update-keyword cross veto", () => {
      it("should flip the first field from new to current on a signup form when it carries an update keyword", () => {
        expect.assertions(2);

        const entries = [
          defaultEntry("p1", FieldRole.PASSWORD, { name: "currentPassword" }),
          defaultEntry("p2", FieldRole.PASSWORD),
        ];
        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.SIGNUP }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.CURRENT_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });

      it("should not flip a field resolved to password confirmation even when it carries an update keyword", () => {
        expect.assertions(2);

        const entries = [
          defaultEntry("p1", FieldRole.PASSWORD),
          defaultEntry("p2", FieldRole.PASSWORD, { name: "changePassword" }),
        ];
        const resolved = PasswordRoleResolutionService.resolve(
          entries,
          defaultContext({ declaredFormRole: FormRole.SIGNUP }),
        );

        expect(resolved.get("p1")).toBe(FieldRole.NEW_PASSWORD);
        expect(resolved.get("p2")).toBe(FieldRole.PASSWORD_CONFIRMATION);
      });
    });
  });
});
