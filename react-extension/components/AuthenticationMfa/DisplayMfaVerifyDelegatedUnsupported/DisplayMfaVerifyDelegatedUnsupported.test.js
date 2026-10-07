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
 * Unit tests on DisplayMfaVerifyDelegatedUnsupported in regard of specifications
 */
import DisplayMfaVerifyDelegatedUnsupportedPage from "./DisplayMfaVerifyDelegatedUnsupported.test.page";
import { defaultProps } from "./DisplayMfaVerifyDelegatedUnsupported.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayMfaVerifyDelegatedUnsupported", () => {
  it("As a mobile user I should see that my browser cannot verify with a passkey", () => {
    expect.assertions(3);
    const page = new DisplayMfaVerifyDelegatedUnsupportedPage(defaultProps());

    expect(page.icon).not.toBeNull();
    expect(page.title.textContent).toStrictEqual("This browser cannot verify with a passkey.");
    expect(page.message.textContent).toStrictEqual(
      "Update your browser or your operating system, then start the verification again from the application.",
    );
  });

  it("As a mobile user I can return to the application", () => {
    expect.assertions(2);
    const page = new DisplayMfaVerifyDelegatedUnsupportedPage(defaultProps());

    expect(page.returnToApplicationButton.textContent).toStrictEqual("Return to app");
    expect(page.returnToApplicationButton.getAttribute("href")).toStrictEqual(
      "passbolt://mfa/webauthn/callback?error=browser_unsupported",
    );
  });
});
