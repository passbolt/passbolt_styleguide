/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.7.0
 */

/**
 * Unit tests on the `data-passbolt-ignore` opt-out attribute, which lets a website exclude a field,
 * a form or a whole section from the passbolt in-form integration.
 */

import InFormCallToActionField from "./InFormCallToActionField";
import InFormCredentialsFormField from "./InFormCredentialsFormField";
import InFormFieldSelector from "./InFormFieldSelector";

describe("In-form field opt-out (data-passbolt-ignore)", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("InFormCallToActionField::findAll", () => {
    it("detects a username field when it is not opted out", () => {
      expect.assertions(1);
      document.body.innerHTML = `<input type="text" name="username">`;
      const fields = InFormCallToActionField.findAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);
      expect(fields).toHaveLength(1);
    });

    it("excludes a field carrying the data-passbolt-ignore attribute", () => {
      expect.assertions(1);
      document.body.innerHTML = `<input type="text" name="username" data-passbolt-ignore>`;
      const fields = InFormCallToActionField.findAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);
      expect(fields).toHaveLength(0);
    });

    it("excludes a password field nested in a container carrying the data-passbolt-ignore attribute", () => {
      expect.assertions(1);
      document.body.innerHTML = `<div data-passbolt-ignore><input type="password" name="password"></div>`;
      const fields = InFormCallToActionField.findAll(InFormFieldSelector.PASSWORD_FIELD_SELECTOR);
      expect(fields).toHaveLength(0);
    });

    it("only excludes the opted-out field and keeps the others", () => {
      expect.assertions(2);
      document.body.innerHTML = `
        <input type="text" name="username" id="kept">
        <input type="text" name="email" id="ignored" data-passbolt-ignore>
      `;
      const fields = InFormCallToActionField.findAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);
      expect(fields).toHaveLength(1);
      expect(fields[0].id).toBe("kept");
    });
  });

  describe("InFormCredentialsFormField::findAll", () => {
    it("detects a form when it is not opted out", () => {
      expect.assertions(1);
      document.body.innerHTML = `<form><input type="text" name="username"><input type="password" name="password"></form>`;
      expect(InFormCredentialsFormField.findAll()).toHaveLength(1);
    });

    it("excludes a form carrying the data-passbolt-ignore attribute from auto-save detection", () => {
      expect.assertions(1);
      document.body.innerHTML = `<form data-passbolt-ignore><input type="text" name="username"><input type="password" name="password"></form>`;
      expect(InFormCredentialsFormField.findAll()).toHaveLength(0);
    });

    it("excludes a form nested in a container carrying the data-passbolt-ignore attribute", () => {
      expect.assertions(1);
      document.body.innerHTML = `<section data-passbolt-ignore><form><input type="password" name="password"></form></section>`;
      expect(InFormCredentialsFormField.findAll()).toHaveLength(0);
    });
  });

  describe("InFormCallToActionField::isOptedOut", () => {
    it("returns false when neither the field nor its ancestors carry the attribute", () => {
      expect.assertions(1);
      document.body.innerHTML = `<div><input type="text" name="username"></div>`;
      const field = document.querySelector("input");
      expect(InFormCallToActionField.isOptedOut(field)).toBe(false);
    });

    it("returns true when the field itself carries the attribute", () => {
      expect.assertions(1);
      document.body.innerHTML = `<input type="text" name="username" data-passbolt-ignore>`;
      const field = document.querySelector("input");
      expect(InFormCallToActionField.isOptedOut(field)).toBe(true);
    });

    it("returns true when an ancestor carries the attribute", () => {
      expect.assertions(1);
      document.body.innerHTML = `<div data-passbolt-ignore><span><input type="text" name="username"></span></div>`;
      const field = document.querySelector("input");
      expect(InFormCallToActionField.isOptedOut(field)).toBe(true);
    });
  });
});
