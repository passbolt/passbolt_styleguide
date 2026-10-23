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
 * Unit tests on OrchestrateApiMfaVerifyDelegated in regard of specifications
 */
import OrchestrateApiMfaVerifyDelegatedPage from "./OrchestrateApiMfaVerifyDelegated.test.page";
import { defaultProps } from "./OrchestrateApiMfaVerifyDelegated.test.data";
import { ApiMfaVerifyDelegatedContextState } from "../../../contexts/ApiMfaVerifyDelegatedContext";

beforeEach(() => {
  jest.resetModules();
});

describe("OrchestrateApiMfaVerifyDelegated", () => {
  const screens = ["loadingSpinner", "verifyWithPasskey", "success", "expired", "unsupported", "error"];

  it.each([
    [ApiMfaVerifyDelegatedContextState.VERIFY_STATE, "verifyWithPasskey"],
    [ApiMfaVerifyDelegatedContextState.CEREMONY_STATE, "verifyWithPasskey"],
    [ApiMfaVerifyDelegatedContextState.PROCESSING_STATE, "loadingSpinner"],
    [ApiMfaVerifyDelegatedContextState.VERIFIED_STATE, "success"],
    [ApiMfaVerifyDelegatedContextState.EXPIRED_STATE, "expired"],
    [ApiMfaVerifyDelegatedContextState.UNSUPPORTED_STATE, "unsupported"],
    [ApiMfaVerifyDelegatedContextState.ERROR_STATE, "error"],
  ])("should display the screen of the %s", (state, screen) => {
    expect.assertions(screens.length);
    const page = new OrchestrateApiMfaVerifyDelegatedPage(defaultProps({ apiMfaVerifyContext: { state } }));

    screens.forEach((name) => expect(page[name] !== null).toStrictEqual(name === screen));
  });
});
