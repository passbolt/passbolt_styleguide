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
 * Unit tests on ReturnToApplication in regard of specifications
 */
import ReturnToApplicationPage from "./ReturnToApplication.test.page";
import { defaultProps } from "./ReturnToApplication.test.data";
import { ApiMfaVerifyContextState } from "../../../contexts/ApiMfaVerifyContext";

beforeEach(() => {
  jest.resetModules();
});

describe("ReturnToApplication", () => {
  it("As a mobile user I should see the link to return to the application", () => {
    expect.assertions(2);
    const page = new ReturnToApplicationPage(defaultProps());

    expect(page.link.textContent).toStrictEqual("Return to app");
    expect(page.link.getAttribute("href")).toStrictEqual("passbolt://mfa/webauthn/callback?error=cancelled");
  });

  it.each([
    ["the verification is not delegated by an application", undefined],
    ["there is no outcome to return", jest.fn(() => null)],
  ])("As a user I should not see the link if %s", (_, getReturnToApplicationUrl) => {
    expect.assertions(1);
    const page = new ReturnToApplicationPage(defaultProps({ apiMfaVerifyContext: { getReturnToApplicationUrl } }));

    expect(page.link).toBeNull();
  });

  it("As a mobile user I should not see the link while the browser prompt is pending", () => {
    expect.assertions(1);
    const props = defaultProps({ apiMfaVerifyContext: { state: ApiMfaVerifyContextState.CEREMONY_STATE } });
    const page = new ReturnToApplicationPage(props);

    expect(page.link).toBeNull();
  });
});
