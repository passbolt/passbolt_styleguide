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

import FormClassificationService from "./FormClassificationService";
import { FieldRole, FormRole } from "./Taxonomy";
import { defaultScope } from "./FormClassificationService.test.data";

describe("FormClassificationService", () => {
  describe("FormClassificationService::classify", () => {
    it("should classify as change-password when current and new password are both present", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.CURRENT_PASSWORD, FieldRole.NEW_PASSWORD] }),
        ),
      ).toBe(FormRole.CHANGE_PASSWORD);
    });

    it("should classify as change-password on a change-password button", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.PASSWORD], buttonText: "Change password" }),
        ),
      ).toBe(FormRole.CHANGE_PASSWORD);
    });

    it("should classify as change-password on a password-update ancestor heading", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.PASSWORD], headings: ["Update password"] }),
        ),
      ).toBe(FormRole.CHANGE_PASSWORD);
    });

    it("should classify as change-password even when signup signals coexist", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.CURRENT_PASSWORD, FieldRole.NEW_PASSWORD], buttonText: "Register" }),
        ),
      ).toBe(FormRole.CHANGE_PASSWORD);
    });

    it("should classify as signup for a new password without a current one", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(defaultScope({ roles: [FieldRole.USERNAME, FieldRole.NEW_PASSWORD] })),
      ).toBe(FormRole.SIGNUP);
    });

    it("should classify as signup when two or more passwords are present", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(defaultScope({ roles: [FieldRole.PASSWORD, FieldRole.PASSWORD] })),
      ).toBe(FormRole.SIGNUP);
    });

    it("should classify as signup when two or more username/email fields are present", () => {
      expect.assertions(1);

      expect(FormClassificationService.classify(defaultScope({ roles: [FieldRole.USERNAME, FieldRole.EMAIL] }))).toBe(
        FormRole.SIGNUP,
      );
    });

    it("should classify as signup on a register heading", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.USERNAME, FieldRole.PASSWORD], buttonText: "Register" }),
        ),
      ).toBe(FormRole.SIGNUP);
    });

    it("should count a password confirmation toward the password total", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.PASSWORD, FieldRole.PASSWORD_CONFIRMATION] }),
        ),
      ).toBe(FormRole.SIGNUP);
    });

    it("should stay signup when a login heading coexists with two passwords", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.PASSWORD, FieldRole.PASSWORD], buttonText: "Sign in" }),
        ),
      ).toBe(FormRole.SIGNUP);
    });

    it("should stay signup when a login heading coexists with two username/email fields", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.USERNAME, FieldRole.EMAIL], buttonText: "Sign in" }),
        ),
      ).toBe(FormRole.SIGNUP);
    });

    it("should prefer login over signup when a login heading is present with a single credential", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.USERNAME, FieldRole.NEW_PASSWORD], buttonText: "Sign in" }),
        ),
      ).toBe(FormRole.LOGIN);
    });

    it("should classify as login for a single password with a username", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(defaultScope({ roles: [FieldRole.USERNAME, FieldRole.PASSWORD] })),
      ).toBe(FormRole.LOGIN);
    });

    it("should classify as login on a login heading with no password field", () => {
      expect.assertions(1);

      expect(FormClassificationService.classify(defaultScope({ roles: [], buttonText: "Sign in" }))).toBe(
        FormRole.LOGIN,
      );
    });

    it("should not let generic words trigger change-password on a login form", () => {
      expect.assertions(2);

      const login = [FieldRole.USERNAME, FieldRole.PASSWORD];

      expect(FormClassificationService.classify(defaultScope({ roles: login, headings: ["Change language"] }))).toBe(
        FormRole.LOGIN,
      );
      expect(FormClassificationService.classify(defaultScope({ roles: login, headings: ["normal times"] }))).toBe(
        FormRole.LOGIN,
      );
    });

    it("should classify as other for a lone username with no password or heading", () => {
      expect.assertions(1);

      expect(FormClassificationService.classify(defaultScope({ roles: [FieldRole.USERNAME] }))).toBe(FormRole.OTHER);
    });

    it("should ignore a field whose id is absent from the roles map", () => {
      expect.assertions(1);

      const partialScope = {
        roles: new Map(),
        fields: [{ fieldId: "ghost" }],
        form: { ancestorHeadings: [], buttonText: "" },
      };

      expect(FormClassificationService.classify(partialScope)).toBe(FormRole.OTHER);
    });

    it("should classify as other for an empty scope", () => {
      expect.assertions(1);

      expect(FormClassificationService.classify(defaultScope())).toBe(FormRole.OTHER);
    });

    it("should veto to other when a login heading coexists with an exclude heading", () => {
      expect.assertions(1);

      expect(FormClassificationService.classify(defaultScope({ roles: [], headings: ["Sign in", "Contact us"] }))).toBe(
        FormRole.OTHER,
      );
    });

    it("should classify as signup on a signup heading with no fields", () => {
      expect.assertions(1);

      expect(FormClassificationService.classify(defaultScope({ roles: [], buttonText: "Register" }))).toBe(
        FormRole.SIGNUP,
      );
    });

    it("should ignore totp and other fields when counting credentials", () => {
      expect.assertions(1);

      expect(
        FormClassificationService.classify(
          defaultScope({ roles: [FieldRole.USERNAME, FieldRole.PASSWORD, FieldRole.TOTP, FieldRole.OTHER] }),
        ),
      ).toBe(FormRole.LOGIN);
    });

    describe.each([
      { locale: "en", login: "Sign in", signup: "Create account", change: "Change password", exclude: "Newsletter" },
      { locale: "fr", login: "Connexion", signup: "Inscription", change: "Changer mot de passe", exclude: "Recherche" },
      { locale: "de", login: "Anmelden", signup: "Registrieren", change: "Passwort ändern", exclude: "Kontakt" },
      {
        locale: "es",
        login: "Iniciar sesión",
        signup: "Registrarse",
        change: "Cambiar contraseña",
        exclude: "Contacto",
      },
      { locale: "it", login: "Accedi", signup: "Registrati", change: "Cambia password", exclude: "Ricerca" },
      { locale: "pt", login: "Entrar", signup: "Criar conta", change: "Alterar senha", exclude: "Contato" },
    ])("headings in $locale", ({ login, signup, change, exclude }) => {
      it("should classify a login heading as login", () => {
        expect.assertions(1);

        expect(FormClassificationService.classify(defaultScope({ roles: [], buttonText: login }))).toBe(FormRole.LOGIN);
      });

      it("should classify a signup heading as signup even on a login-shaped form", () => {
        expect.assertions(1);

        expect(
          FormClassificationService.classify(
            defaultScope({ roles: [FieldRole.USERNAME, FieldRole.PASSWORD], buttonText: signup }),
          ),
        ).toBe(FormRole.SIGNUP);
      });

      it("should classify a change-password heading as change-password", () => {
        expect.assertions(1);

        expect(
          FormClassificationService.classify(defaultScope({ roles: [FieldRole.PASSWORD], buttonText: change })),
        ).toBe(FormRole.CHANGE_PASSWORD);
      });

      it("should veto a login-shaped form to other on an exclude heading", () => {
        expect.assertions(1);

        expect(
          FormClassificationService.classify(
            defaultScope({ roles: [FieldRole.USERNAME, FieldRole.PASSWORD], buttonText: exclude }),
          ),
        ).toBe(FormRole.OTHER);
      });
    });
  });
});
