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
 * Unit tests on DisplayMfaVerifyDelegatedExpired in regard of specifications
 */
import DisplayMfaVerifyDelegatedExpiredPage from "./DisplayMfaVerifyDelegatedExpired.test.page";
import { defaultProps } from "./DisplayMfaVerifyDelegatedExpired.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayMfaVerifyDelegatedExpired", () => {
  it("As a mobile user I should see that the verification link is no longer valid", () => {
    expect.assertions(3);
    const page = new DisplayMfaVerifyDelegatedExpiredPage(defaultProps());

    expect(page.icon).not.toBeNull();
    expect(page.title.textContent).toStrictEqual("This verification link is no longer valid.");
    expect(page.message.textContent).toStrictEqual(
      "It has already been used, or it expired. Start the verification again from the application.",
    );
  });

  it("As a mobile user I can return to the application", () => {
    expect.assertions(2);
    const page = new DisplayMfaVerifyDelegatedExpiredPage(defaultProps());

    expect(page.returnToApplicationButton.textContent).toStrictEqual("Return to app");
    expect(page.returnToApplicationButton.getAttribute("href")).toStrictEqual(
      "passbolt://mfa/webauthn/callback?error=state_invalid",
    );
  });
});
