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
 * Unit tests on OrchestrateApiMfaVerify in regard of specifications
 */
import OrchestrateApiMfaVerifyPage from "./OrchestrateApiMfaVerify.test.page";
import { defaultProps } from "./OrchestrateApiMfaVerify.test.data";
import { ApiMfaVerifyContextState } from "../../../contexts/ApiMfaVerifyContext";

beforeEach(() => {
  jest.resetModules();
});

describe("OrchestrateApiMfaVerify", () => {
  it("should request the initialization on mount", () => {
    expect.assertions(1);
    const props = defaultProps({ apiMfaVerifyContext: { state: ApiMfaVerifyContextState.INITIAL_STATE } });

    new OrchestrateApiMfaVerifyPage(props);

    expect(props.apiMfaVerifyContext.onInitializeRequested).toHaveBeenCalledTimes(1);
  });

  it.each([
    [ApiMfaVerifyContextState.INITIAL_STATE, "loadingSpinner"],
    [ApiMfaVerifyContextState.VERIFY_STATE, "verifyWithPasskey"],
    [ApiMfaVerifyContextState.CEREMONY_STATE, "verifyWithPasskey"],
    [ApiMfaVerifyContextState.PROCESSING_STATE, "loadingSpinner"],
    [ApiMfaVerifyContextState.ERROR_STATE, "error"],
  ])("should display the screen of the %s", (state, screen) => {
    expect.assertions(3);
    const page = new OrchestrateApiMfaVerifyPage(defaultProps({ apiMfaVerifyContext: { state } }));

    ["loadingSpinner", "verifyWithPasskey", "error"].forEach((name) =>
      expect(page[name] !== null).toStrictEqual(name === screen),
    );
  });
});
