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
 * Unit tests on DisplayMfaVerifyDelegatedSuccess in regard of specifications
 */
import DisplayMfaVerifyDelegatedSuccessPage from "./DisplayMfaVerifyDelegatedSuccess.test.page";
import { defaultProps } from "./DisplayMfaVerifyDelegatedSuccess.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayMfaVerifyDelegatedSuccess", () => {
  it("As a mobile user I should see the confirmation that my passkey is verified", () => {
    expect.assertions(3);
    const page = new DisplayMfaVerifyDelegatedSuccessPage(defaultProps());

    expect(page.icon).not.toBeNull();
    expect(page.title.textContent).toStrictEqual("Passkey verified");
    expect(page.message.textContent).toStrictEqual("You can now return to the application.");
  });

  it("As a mobile user I can return to the application", () => {
    expect.assertions(2);
    const page = new DisplayMfaVerifyDelegatedSuccessPage(defaultProps());

    expect(page.returnToApplicationButton.textContent).toStrictEqual("Return to app");
    expect(page.returnToApplicationButton.getAttribute("href")).toStrictEqual(
      "passbolt://mfa/webauthn/callback?mfa_delegated_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNTdjMTBmNSJ9.c2lnbmF0dXJl",
    );
  });
});
