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

import ResourceViewPageTotpPage from "./ResourceViewPageTotp.test.page";
import { defaultProps, revealedTotpProps } from "./ResourceViewPageTotp.test.data";
import { copiedSecretState, copyingSecretState, decryptingSecretState } from "./secretState.test.data";
import { TotpCodeGeneratorService } from "../../../shared/services/otp/TotpCodeGeneratorService";

beforeEach(() => {
  jest.resetModules();
});

describe("ResourceViewPageTotp", () => {
  it("As LU, I should see the masked TOTP with its css classes, the copy sentence and the title", () => {
    expect.assertions(8);
    const page = new ResourceViewPageTotpPage(defaultProps());

    expect(page.label.textContent).toStrictEqual("TOTP");
    expect(page.secret.classList.contains("secret-copy")).toBeTruthy();
    expect(page.secret.parentElement.classList.contains("totp-wrapper")).toBeTruthy();
    expect(page.valueText).toStrictEqual("Copy TOTP to clipboard");
    expect(page.secret.getAttribute("title")).toStrictEqual("Click to copy");
    expect(page.previewButton.classList.contains("totp-view")).toBeTruthy();
    expect(page.previewIconState).toStrictEqual("idle");
    expect(page.copyIconState).toStrictEqual("default");
  });

  it("As LU, I should see the revealed TOTP code, the title staying the copy sentence", () => {
    expect.assertions(3);
    const props = revealedTotpProps();
    const page = new ResourceViewPageTotpPage(props);

    expect(page.totpCode.textContent.replace(/\s/, "")).toStrictEqual(TotpCodeGeneratorService.generate(props.totp));
    expect(page.secret.getAttribute("title")).toStrictEqual("Click to copy");
    expect(page.secret.classList.contains("secret-copy")).toBeFalsy();
  });

  it("As LU, I should copy by clicking the masked value, the revealed code or the copy action, and preview by clicking the eye", async () => {
    expect.assertions(4);
    const props = defaultProps();
    const page = new ResourceViewPageTotpPage(props);

    await page.click(page.valueButton);
    expect(props.onCopy).toHaveBeenCalledWith("totp");

    await page.click(page.copyButton);
    expect(props.onCopy).toHaveBeenCalledTimes(2);

    await page.click(page.previewButton);
    expect(props.onPreview).toHaveBeenCalledWith("totp");

    const revealedProps = revealedTotpProps();
    page.rerender(revealedProps);
    await page.click(page.valueButton);
    expect(revealedProps.onCopy).toHaveBeenCalledWith("totp");
  });

  it("As LU, I should not see the preview action without the preview right", () => {
    expect.assertions(2);
    const page = new ResourceViewPageTotpPage(defaultProps({ canPreview: false }));

    expect(page.previewButton).toBeNull();
    expect(page.copyButton).not.toBeNull();
  });

  it("As LU, I should not see the copy action and the value should be disabled without the copy right", () => {
    expect.assertions(2);
    const page = new ResourceViewPageTotpPage(defaultProps({ canCopy: false }));

    expect(page.copyButton).toBeNull();
    expect(page.valueButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("As LU, I should see the eye disabled and spinning while the secret decrypts, and the copy status icons", () => {
    expect.assertions(6);
    const page = new ResourceViewPageTotpPage(defaultProps(decryptingSecretState("totp")));

    expect(page.previewButton.hasAttribute("disabled")).toBeTruthy();
    expect(page.previewIconState).toStrictEqual("decrypting");
    expect(page.hasTimer).toBeFalsy();

    page.rerender(defaultProps(copyingSecretState("totp")));
    expect(page.copyIconState).toStrictEqual("processing");

    page.rerender(defaultProps(copiedSecretState("totp")));
    expect(page.copyIconState).toStrictEqual("done");
    expect(page.hasTimer).toBeTruthy();
  });

  it("As LU, I should see the TOTP row idle while another row decrypts or copies", () => {
    expect.assertions(4);
    const page = new ResourceViewPageTotpPage(defaultProps(decryptingSecretState("password")));

    expect(page.previewButton.hasAttribute("disabled")).toBeFalsy();
    expect(page.previewIconState).toStrictEqual("idle");

    page.rerender(defaultProps(copiedSecretState("password")));
    expect(page.copyIconState).toStrictEqual("default");
    expect(page.hasTimer).toBeFalsy();
  });
});
