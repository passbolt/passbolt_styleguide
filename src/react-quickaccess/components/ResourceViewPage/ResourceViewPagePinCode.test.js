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

import ResourceViewPagePinCodePage from "./ResourceViewPagePinCode.test.page";
import { defaultProps, revealedPinCodeProps } from "./ResourceViewPagePinCode.test.data";
import { defaultSecretRowState } from "./secretRowState.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ResourceViewPagePinCode", () => {
  it("As LU, I should see the masked PIN code with its css classes, the copy sentence and the title", () => {
    expect.assertions(8);
    const page = new ResourceViewPagePinCodePage(defaultProps());

    expect(page.label.textContent).toStrictEqual("Pin code");
    expect(page.secret.classList.contains("secret-copy")).toBeTruthy();
    expect(page.secret.parentElement.classList.contains("password-wrapper")).toBeTruthy();
    expect(page.valueText).toStrictEqual("Copy to clipboard");
    expect(page.secret.getAttribute("title")).toStrictEqual("Click to copy");
    expect(page.previewButton.classList.contains("password-view")).toBeTruthy();
    expect(page.previewIconState).toStrictEqual("idle");
    expect(page.copyIconState).toStrictEqual("default");
  });

  it("As LU, I should see the revealed PIN code with its characters and its value as title", () => {
    expect.assertions(3);
    const page = new ResourceViewPagePinCodePage(revealedPinCodeProps());

    expect(page.revealedPinCodeText).toStrictEqual("482913");
    expect(page.secret.getAttribute("title")).toStrictEqual("482913");
    expect(page.secret.classList.contains("secret-copy")).toBeFalsy();
  });

  it("As LU, I should copy by clicking the value or the copy action, and preview by clicking the eye", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const page = new ResourceViewPagePinCodePage(props);

    await page.click(page.valueButton);
    expect(props.pinCode.onCopy).toHaveBeenCalledTimes(1);

    await page.click(page.copyButton);
    expect(props.pinCode.onCopy).toHaveBeenCalledTimes(2);

    await page.click(page.previewButton);
    expect(props.pinCode.onPreview).toHaveBeenCalledTimes(1);
  });

  it("As LU, I should not see the preview action without the preview right", () => {
    expect.assertions(2);
    const page = new ResourceViewPagePinCodePage(defaultProps({ canPreview: false }));

    expect(page.previewButton).toBeNull();
    expect(page.copyButton).not.toBeNull();
  });

  it("As LU, I should not see the copy action and the value should be disabled without the copy right", () => {
    expect.assertions(2);
    const page = new ResourceViewPagePinCodePage(defaultProps({ canCopy: false }));

    expect(page.copyButton).toBeNull();
    expect(page.valueButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("As LU, I should see the eye disabled and spinning while the secret decrypts, and the copy status icons", () => {
    expect.assertions(6);
    const page = new ResourceViewPagePinCodePage(
      defaultProps({ pinCode: defaultSecretRowState({ decrypting: true }) }),
    );

    expect(page.previewButton.hasAttribute("disabled")).toBeTruthy();
    expect(page.previewIconState).toStrictEqual("decrypting");
    expect(page.hasTimer).toBeFalsy();

    page.rerender(defaultProps({ pinCode: defaultSecretRowState({ copyStatus: "processing" }) }));
    expect(page.copyIconState).toStrictEqual("processing");

    page.rerender(defaultProps({ pinCode: defaultSecretRowState({ copyStatus: "done", showTimer: true }) }));
    expect(page.copyIconState).toStrictEqual("done");
    expect(page.hasTimer).toBeTruthy();
  });
});
