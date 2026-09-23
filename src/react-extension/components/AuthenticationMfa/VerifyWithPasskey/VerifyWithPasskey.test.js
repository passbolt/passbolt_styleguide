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

/**
 * Unit tests on VerifyWithPasskey in regard of specifications
 */
import VerifyWithPasskeyPage from "./VerifyWithPasskey.test.page";
import { defaultProps, processingProps, withoutRememberMeProps } from "./VerifyWithPasskey.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("VerifyWithPasskey", () => {
  it("As a user I should see the passkey verification screen", () => {
    expect.assertions(4);
    const page = new VerifyWithPasskeyPage(defaultProps());

    expect(page.logo).not.toBeNull();
    expect(page.title.textContent).toStrictEqual("Additional Authentication with Passkey");
    expect(page.verifyButton.textContent).toStrictEqual("Verify with Passkey");
    expect(page.verifyButton.disabled).toStrictEqual(false);
  });

  it("As a user I should see the remember checkbox only if the organization allows it", () => {
    expect.assertions(2);
    const page = new VerifyWithPasskeyPage(defaultProps());
    expect(page.rememberCheckbox.checked).toStrictEqual(false);

    const pageWithoutRememberMe = new VerifyWithPasskeyPage(withoutRememberMeProps());
    expect(pageWithoutRememberMe.rememberCheckbox).toBeNull();
  });

  it("As a user I can verify without remembering the device", () => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new VerifyWithPasskeyPage(props);

    page.verify();

    expect(props.apiMfaVerifyContext.onVerifyRequested).toHaveBeenCalledWith(false);
  });

  it("As a user I can verify and remember the device", () => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new VerifyWithPasskeyPage(props);

    page.toggleRemember();
    page.verify();

    expect(props.apiMfaVerifyContext.onVerifyRequested).toHaveBeenCalledWith(true);
  });

  it("As a user I should see the link to another provider inside the form actions", () => {
    expect.assertions(2);
    const page = new VerifyWithPasskeyPage(defaultProps());

    expect(page.anotherProviderLink.textContent).toStrictEqual("Or try with another provider");
    expect(page.anotherProviderLink.getAttribute("href")).toStrictEqual(
      "https://localhost:6006/mfa/verify/totp?redirect=%2Fapp%2Fpasswords",
    );
  });

  it("As a user I cannot interact with the screen while the browser prompt is pending", () => {
    expect.assertions(4);
    const page = new VerifyWithPasskeyPage(processingProps());

    expect(page.verifyButton.classList.contains("processing")).toStrictEqual(true);
    expect(page.verifyButton.disabled).toStrictEqual(true);
    expect(page.rememberCheckbox.disabled).toStrictEqual(true);
    expect(page.anotherProviderLink).toBeNull();
  });
});
