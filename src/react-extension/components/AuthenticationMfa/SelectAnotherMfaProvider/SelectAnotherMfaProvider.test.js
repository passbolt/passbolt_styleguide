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
 * Unit tests on SelectAnotherMfaProvider in regard of specifications
 */
import SelectAnotherMfaProviderPage from "./SelectAnotherMfaProvider.test.page";
import { defaultProps } from "./SelectAnotherMfaProvider.test.data";
import { ApiMfaVerifyContextState } from "../../../contexts/ApiMfaVerifyContext";

beforeEach(() => {
  jest.resetModules();
});

describe("SelectAnotherMfaProvider", () => {
  it("As a user I should see the link to the next provider", () => {
    expect.assertions(2);
    const page = new SelectAnotherMfaProviderPage(defaultProps());

    expect(page.link.textContent).toStrictEqual("Or try with another provider");
    expect(page.link.getAttribute("href")).toStrictEqual(
      "https://localhost:6006/mfa/verify/totp?redirect=%2Fapp%2Fpasswords",
    );
  });

  it("As a user I should not see the link if passkey is my only provider", () => {
    expect.assertions(1);
    const props = defaultProps({ apiMfaVerifyContext: { getNextProviderUrl: jest.fn(() => null) } });
    const page = new SelectAnotherMfaProviderPage(props);

    expect(page.link).toBeNull();
  });

  it("As a user I should not see the link while the browser prompt is pending", () => {
    expect.assertions(1);
    const props = defaultProps({ apiMfaVerifyContext: { state: ApiMfaVerifyContextState.CEREMONY_STATE } });
    const page = new SelectAnotherMfaProviderPage(props);

    expect(page.link).toBeNull();
  });
});
