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
 * @since         5.17.0
 */

import SecretPropertyRowPage from "./SecretPropertyRow.test.page";
import {
  customFieldProps,
  defaultProps,
  noteProps,
  pinCodeProps,
  revealedNoteProps,
  revealedPasswordProps,
  revealedTotpProps,
  totpProps,
} from "./SecretPropertyRow.test.data";
import { TotpCodeGeneratorService } from "../../../shared/services/otp/TotpCodeGeneratorService";

beforeEach(() => {
  jest.resetModules();
});

describe("SecretPropertyRow", () => {
  describe("As LU, each kind of row should carry the css classes of the stylesheet", () => {
    it.each([
      ["password", "secret-password", "password-wrapper", "password-view", "copy-password", true],
      ["totp", "secret-totp", "totp-wrapper", "totp-view", "copy-totp", true],
      ["pin_code", "secret-pin-code", "password-wrapper", "password-view", "copy-pin-code", true],
      ["note", "secret-note", "password-wrapper", "password-view", "copy-note", false],
      ["custom_field", "secret-custom-fields", "password-wrapper", "password-view", "copy-custom-field", true],
    ])(
      "As LU, a masked %s row should have its secret, wrapper, preview and copy classes",
      (type, secretClass, wrapperClass, viewClass, copyClass, hasCopyMask) => {
        expect.assertions(5);
        const page = new SecretPropertyRowPage(defaultProps({ type }));

        expect(page.secret.classList.contains(secretClass)).toBeTruthy();
        expect(page.secret.classList.contains("secret-copy")).toStrictEqual(hasCopyMask);
        expect(page.secret.parentElement.classList.contains(wrapperClass)).toBeTruthy();
        expect(page.previewButton.classList.contains(viewClass)).toBeTruthy();
        expect(page.copyButton.classList.contains(copyClass)).toBeTruthy();
      },
    );
  });

  describe("As LU, I should see the value masked or revealed", () => {
    it("As LU, I should see a masked password with its label, the copy sentence and the click to copy title", () => {
      expect.assertions(5);
      const page = new SecretPropertyRowPage(defaultProps());

      expect(page.label.textContent).toStrictEqual("Password");
      expect(page.valueText).toStrictEqual("Copy to clipboard");
      expect(page.secret.getAttribute("title")).toStrictEqual("Click to copy");
      expect(page.previewIconState).toStrictEqual("idle");
      expect(page.copyIconState).toStrictEqual("default");
    });

    it("As LU, I should see a revealed password with its characters and its value as title", () => {
      expect.assertions(3);
      const page = new SecretPropertyRowPage(revealedPasswordProps());

      expect(page.revealedPasswordText).toStrictEqual("secret-decrypted");
      expect(page.secret.getAttribute("title")).toStrictEqual("secret-decrypted");
      expect(page.secret.classList.contains("secret-copy")).toBeFalsy();
    });

    it("As LU, I should see a revealed pin code with its characters", () => {
      expect.assertions(2);
      const page = new SecretPropertyRowPage(pinCodeProps({ revealed: true, value: "482913" }));

      expect(page.revealedPasswordText).toStrictEqual("482913");
      expect(page.secret.getAttribute("title")).toStrictEqual("482913");
    });

    it("As LU, I should see the TOTP copy sentence when masked and the code without title when revealed", () => {
      expect.assertions(4);
      const page = new SecretPropertyRowPage(totpProps());

      expect(page.valueText).toStrictEqual("Copy TOTP to clipboard");
      expect(page.secret.getAttribute("title")).toStrictEqual("Click to copy");

      const props = revealedTotpProps();
      page.rerender(props);
      expect(page.totpCode.textContent.replace(/\s/, "")).toStrictEqual(TotpCodeGeneratorService.generate(props.value));
      expect(page.secret.hasAttribute("title")).toBeFalsy();
    });

    it("As LU, I should see the note placeholder without mask when hidden and the note block without title when revealed", () => {
      expect.assertions(5);
      const page = new SecretPropertyRowPage(noteProps());

      expect(page.encryptedNote).not.toBeNull();
      expect(page.secret.classList.contains("secret-copy")).toBeFalsy();
      expect(page.secret.getAttribute("title")).toStrictEqual("Click to copy");

      const props = revealedNoteProps();
      page.rerender(props);
      expect(page.notePreviewed.textContent).toStrictEqual(props.value);
      expect(page.secret.hasAttribute("title")).toBeFalsy();
    });

    it("As LU, I should see a custom field without key read no key, and its empty value read the empty sentence", () => {
      expect.assertions(3);
      const page = new SecretPropertyRowPage(customFieldProps({ label: "" }));

      expect(page.label.textContent).toStrictEqual("no key");
      expect(page.label.classList.contains("empty")).toBeTruthy();

      page.rerender(customFieldProps({ label: "", revealed: true, value: "" }));
      expect(page.valueText).toStrictEqual("There is no value");
    });
  });

  describe("As LU, I should copy and preview through the row actions", () => {
    it("As LU, I should copy by clicking the value or the copy action, and preview by clicking the eye", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const page = new SecretPropertyRowPage(props);

      await page.click(page.valueButton);
      expect(props.onCopy).toHaveBeenCalledTimes(1);

      await page.click(page.copyButton);
      expect(props.onCopy).toHaveBeenCalledTimes(2);

      await page.click(page.previewButton);
      expect(props.onPreview).toHaveBeenCalledTimes(1);
    });

    it("As LU, I should copy a masked TOTP or note by clicking its value", async () => {
      expect.assertions(2);
      const totp = totpProps();
      const page = new SecretPropertyRowPage(totp);
      await page.click(page.valueButton);
      expect(totp.onCopy).toHaveBeenCalledTimes(1);

      const note = noteProps();
      page.rerender(note);
      await page.click(page.encryptedNote);
      expect(note.onCopy).toHaveBeenCalledTimes(1);
    });

    it("As LU, I should not see the preview action without the preview right", () => {
      expect.assertions(2);
      const page = new SecretPropertyRowPage(defaultProps({ canPreview: false }));

      expect(page.previewButton).toBeNull();
      expect(page.copyButton).not.toBeNull();
    });

    it("As LU, I should not see the copy action and the value should be disabled without the copy right", () => {
      expect.assertions(6);
      const page = new SecretPropertyRowPage(defaultProps({ canCopy: false }));

      expect(page.copyButton).toBeNull();
      expect(page.valueButton.hasAttribute("disabled")).toBeTruthy();

      page.rerender(totpProps({ canCopy: false }));
      expect(page.copyButton).toBeNull();
      expect(page.valueButton.hasAttribute("disabled")).toBeTruthy();

      page.rerender(noteProps({ canCopy: false }));
      expect(page.copyButton).toBeNull();
      expect(page.encryptedNote.hasAttribute("disabled")).toBeTruthy();
    });

    it("As LU, I should see the eye disabled and spinning while the secret decrypts", () => {
      expect.assertions(2);
      const page = new SecretPropertyRowPage(defaultProps({ decrypting: true }));

      expect(page.previewButton.hasAttribute("disabled")).toBeTruthy();
      expect(page.previewIconState).toStrictEqual("decrypting");
    });

    it("As LU, I should see the copy status icon and the clipboard timer", () => {
      expect.assertions(5);
      const page = new SecretPropertyRowPage(defaultProps());

      expect(page.copyIconState).toStrictEqual("default");
      expect(page.hasTimer).toBeFalsy();

      page.rerender(defaultProps({ copyStatus: "processing" }));
      expect(page.copyIconState).toStrictEqual("processing");

      page.rerender(defaultProps({ copyStatus: "done", showTimer: true }));
      expect(page.copyIconState).toStrictEqual("done");
      expect(page.hasTimer).toBeTruthy();
    });
  });
});
