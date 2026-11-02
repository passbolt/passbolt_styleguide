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

import InFormCredentialsFormField from "./InFormCredentialsFormField";
import { initializeWindow } from "./InformManager.test.data";

describe("InFormCredentialsFormField", () => {
  // mock port in window
  initializeWindow();

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  describe("InFormCredentialsFormField::constructor", () => {
    it("should default the options", () => {
      expect.assertions(6);

      const form = document.createElement("form");
      const credentialsFormField = new InFormCredentialsFormField(form);

      expect(credentialsFormField.field).toBe(form);
      expect(credentialsFormField.usernameField).toBeUndefined();
      expect(credentialsFormField.passwordField).toBeUndefined();
      expect(credentialsFormField.isPseudoForm).toBe(false);
      expect(credentialsFormField.otpField).toBeUndefined();
      expect(credentialsFormField.confirmPasswordFields).toEqual([]);
    });

    it("should assign the fields and the options", () => {
      expect.assertions(6);

      const container = document.createElement("div");
      const usernameField = document.createElement("input");
      const passwordField = document.createElement("input");
      const otpField = document.createElement("input");
      const confirmPasswordFields = [document.createElement("input")];

      const credentialsFormField = new InFormCredentialsFormField(container, {
        usernameField,
        passwordField,
        isPseudoForm: true,
        otpField,
        confirmPasswordFields,
      });

      expect(credentialsFormField.field).toBe(container);
      expect(credentialsFormField.usernameField).toBe(usernameField);
      expect(credentialsFormField.passwordField).toBe(passwordField);
      expect(credentialsFormField.isPseudoForm).toBe(true);
      expect(credentialsFormField.otpField).toBe(otpField);
      expect(credentialsFormField.confirmPasswordFields).toBe(confirmPasswordFields);
    });
  });

  describe("InFormCredentialsFormField::submitButton", () => {
    it("should return the submit button of the form", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='text'/><button type='submit'>Sign in</button></form>";
      const form = document.querySelector("form");
      const button = document.querySelector("button");
      const credentialsFormField = new InFormCredentialsFormField(form);

      expect(credentialsFormField.submitButton).toBe(button);
    });

    it("should return null when the form has no submit button", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='text'/></form>";
      const form = document.querySelector("form");
      const credentialsFormField = new InFormCredentialsFormField(form);

      expect(credentialsFormField.submitButton).toBeNull();
    });
  });

  describe("InFormCredentialsFormField::autosave", () => {
    it("should emit the autosave event with the filled credentials", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='text' value='ada'/><input type='password' value='secret'/></form>";
      const form = document.querySelector("form");
      const usernameField = document.querySelector("input[type='text']");
      const passwordField = document.querySelector("input[type='password']");

      jest.spyOn(window.port, "emit");
      const credentialsFormField = new InFormCredentialsFormField(form, { usernameField, passwordField });

      credentialsFormField.autosave();

      expect(window.port.emit).toHaveBeenCalledWith("passbolt.web-integration.autosave", {
        name: document.title,
        username: "ada",
        password: "secret",
        url: document.URL,
      });
    });

    it("should emit the autosave event with an empty password when there is no password field", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='text' value='ada'/></form>";
      const form = document.querySelector("form");
      const usernameField = document.querySelector("input");

      jest.spyOn(window.port, "emit");
      const credentialsFormField = new InFormCredentialsFormField(form, { usernameField });

      credentialsFormField.autosave();

      expect(window.port.emit).toHaveBeenCalledWith("passbolt.web-integration.autosave", {
        name: document.title,
        username: "ada",
        password: "",
        url: document.URL,
      });
    });

    it("should emit the autosave event with an empty username when there is no username field", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='password' value='secret'/></form>";
      const form = document.querySelector("form");
      const passwordField = document.querySelector("input");

      jest.spyOn(window.port, "emit");
      const credentialsFormField = new InFormCredentialsFormField(form, { passwordField });

      credentialsFormField.autosave();

      expect(window.port.emit).toHaveBeenCalledWith("passbolt.web-integration.autosave", {
        name: document.title,
        username: "",
        password: "secret",
        url: document.URL,
      });
    });

    it("should not emit the autosave event when no field is filled", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='text'/><input type='password'/></form>";
      const form = document.querySelector("form");
      const usernameField = document.querySelector("input[type='text']");
      const passwordField = document.querySelector("input[type='password']");

      jest.spyOn(window.port, "emit");
      const credentialsFormField = new InFormCredentialsFormField(form, { usernameField, passwordField });

      credentialsFormField.autosave();

      expect(window.port.emit).not.toHaveBeenCalled();
    });

    it("should not emit the autosave event twice", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='text' value='ada'/><input type='password' value='secret'/></form>";
      const form = document.querySelector("form");
      const usernameField = document.querySelector("input[type='text']");
      const passwordField = document.querySelector("input[type='password']");

      jest.spyOn(window.port, "emit");
      const credentialsFormField = new InFormCredentialsFormField(form, { usernameField, passwordField });

      credentialsFormField.autosave();
      credentialsFormField.autosave();

      expect(window.port.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe("InFormCredentialsFormField::handleAutoSaveEvent", () => {
    it("should autosave on form submit", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='text' value='ada'/><input type='password' value='secret'/></form>";
      const form = document.querySelector("form");
      const usernameField = document.querySelector("input[type='text']");
      const passwordField = document.querySelector("input[type='password']");

      jest.spyOn(window.port, "emit");
      const credentialsFormField = new InFormCredentialsFormField(form, { usernameField, passwordField });

      credentialsFormField.handleAutoSaveEvent();
      form.dispatchEvent(new Event("submit"));

      expect(window.port.emit).toHaveBeenCalledTimes(1);
    });

    it("should autosave on submit button click", () => {
      expect.assertions(1);

      document.body.innerHTML =
        "<form><input type='text' value='ada'/><input type='password' value='secret'/><button type='submit'>Sign in</button></form>";
      const form = document.querySelector("form");
      const usernameField = document.querySelector("input[type='text']");
      const passwordField = document.querySelector("input[type='password']");

      jest.spyOn(window.port, "emit");
      const credentialsFormField = new InFormCredentialsFormField(form, { usernameField, passwordField });

      credentialsFormField.handleAutoSaveEvent();
      document.querySelector("button").dispatchEvent(new Event("click"));

      expect(window.port.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe("InFormCredentialsFormField::destroy", () => {
    it("should no longer autosave after destroy", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><input type='text' value='ada'/><input type='password' value='secret'/></form>";
      const form = document.querySelector("form");
      const usernameField = document.querySelector("input[type='text']");
      const passwordField = document.querySelector("input[type='password']");

      jest.spyOn(window.port, "emit");
      const credentialsFormField = new InFormCredentialsFormField(form, { usernameField, passwordField });

      credentialsFormField.handleAutoSaveEvent();
      credentialsFormField.destroy();

      form.dispatchEvent(new Event("submit"));

      expect(window.port.emit).not.toHaveBeenCalled();
    });
  });
});
