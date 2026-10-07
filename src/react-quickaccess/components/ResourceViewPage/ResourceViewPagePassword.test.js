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
 * @since         5.18.0
 */

import ResourceViewPagePasswordPage from "./ResourceViewPagePassword.test.page";
import { defaultProps, noUsernameProps, revealedPasswordProps } from "./ResourceViewPagePassword.test.data";
import { defaultSecretRowState } from "./secretRowState.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ResourceViewPagePassword", () => {
  describe("As LU, I should see the username row", () => {
    it("As LU, I should see the username and copy it from its value or its action", async () => {
      expect.assertions(6);
      const props = defaultProps();
      const page = new ResourceViewPagePasswordPage(props);

      expect(page.rows.length).toStrictEqual(2);
      expect(page.usernameLabel.textContent).toStrictEqual("Username");
      expect(page.usernameLink.textContent).toStrictEqual("admin@passbolt.com");
      expect(page.usernameCopyButton.classList.contains("disabled")).toBeFalsy();

      await page.click(page.usernameLink);
      await page.click(page.usernameCopyButton);
      expect(props.onCopyUsername).toHaveBeenCalledTimes(2);
      expect(page.hasTimer(page.usernameCopyButton)).toBeFalsy();
    });

    it("As LU, I should see the username copy status icons", () => {
      expect.assertions(3);
      const page = new ResourceViewPagePasswordPage(defaultProps());
      expect(page.usernameCopyIconState).toStrictEqual("default");

      page.rerender(defaultProps({ usernameCopyStatus: "processing" }));
      expect(page.usernameCopyIconState).toStrictEqual("processing");

      page.rerender(defaultProps({ usernameCopyStatus: "done" }));
      expect(page.usernameCopyIconState).toStrictEqual("done");
    });

    it("As LU, I should be told when the resource has no username", () => {
      expect.assertions(3);
      const page = new ResourceViewPagePasswordPage(noUsernameProps());

      expect(page.usernameLink).toBeNull();
      expect(page.usernameEmpty.textContent).toStrictEqual("no username provided");
      expect(page.usernameCopyButton.classList.contains("disabled")).toBeTruthy();
    });
  });

  describe("As LU, I should see the password row", () => {
    it("As LU, I should see the masked password with its css classes, the copy sentence and the title", () => {
      expect.assertions(8);
      const page = new ResourceViewPagePasswordPage(defaultProps());

      expect(page.passwordLabel.textContent).toStrictEqual("Password");
      expect(page.secret.classList.contains("secret-copy")).toBeTruthy();
      expect(page.secret.parentElement.classList.contains("password-wrapper")).toBeTruthy();
      expect(page.valueText).toStrictEqual("Copy to clipboard");
      expect(page.secret.getAttribute("title")).toStrictEqual("Click to copy");
      expect(page.previewButton.classList.contains("password-view")).toBeTruthy();
      expect(page.previewIconState).toStrictEqual("idle");
      expect(page.copyIconState).toStrictEqual("default");
    });

    it("As LU, I should see the revealed password with its characters and its value as title", () => {
      expect.assertions(3);
      const page = new ResourceViewPagePasswordPage(revealedPasswordProps());

      expect(page.revealedPasswordText).toStrictEqual("secret-decrypted");
      expect(page.secret.getAttribute("title")).toStrictEqual("secret-decrypted");
      expect(page.secret.classList.contains("secret-copy")).toBeFalsy();
    });

    it("As LU, I should copy by clicking the value or the copy action, and preview by clicking the eye", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const page = new ResourceViewPagePasswordPage(props);

      await page.click(page.valueButton);
      expect(props.password.onCopy).toHaveBeenCalledTimes(1);

      await page.click(page.copyButton);
      expect(props.password.onCopy).toHaveBeenCalledTimes(2);

      await page.click(page.previewButton);
      expect(props.password.onPreview).toHaveBeenCalledTimes(1);
    });

    it("As LU, I should not see the preview action without the preview right", () => {
      expect.assertions(2);
      const page = new ResourceViewPagePasswordPage(defaultProps({ canPreview: false }));

      expect(page.previewButton).toBeNull();
      expect(page.copyButton).not.toBeNull();
    });

    it("As LU, I should not see the copy action and the value should be disabled without the copy right", () => {
      expect.assertions(3);
      const page = new ResourceViewPagePasswordPage(defaultProps({ canCopy: false }));

      expect(page.copyButton).toBeNull();
      expect(page.valueButton.hasAttribute("disabled")).toBeTruthy();
      expect(page.usernameCopyButton).not.toBeNull();
    });

    it("As LU, I should see the eye disabled and spinning while the secret decrypts", () => {
      expect.assertions(2);
      const page = new ResourceViewPagePasswordPage(
        defaultProps({ password: defaultSecretRowState({ decrypting: true }) }),
      );

      expect(page.previewButton.hasAttribute("disabled")).toBeTruthy();
      expect(page.previewIconState).toStrictEqual("decrypting");
    });

    it("As LU, I should see the copy status icon and the clipboard timer", () => {
      expect.assertions(5);
      const page = new ResourceViewPagePasswordPage(defaultProps());

      expect(page.copyIconState).toStrictEqual("default");
      expect(page.hasTimer(page.copyButton)).toBeFalsy();

      page.rerender(defaultProps({ password: defaultSecretRowState({ copyStatus: "processing" }) }));
      expect(page.copyIconState).toStrictEqual("processing");

      page.rerender(defaultProps({ password: defaultSecretRowState({ copyStatus: "done", showTimer: true }) }));
      expect(page.copyIconState).toStrictEqual("done");
      expect(page.hasTimer(page.copyButton)).toBeTruthy();
    });
  });
});
