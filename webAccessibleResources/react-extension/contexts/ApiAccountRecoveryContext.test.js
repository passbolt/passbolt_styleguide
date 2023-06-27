/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import {v4 as uuidv4} from "uuid";
import {enableFetchMocks} from "jest-fetch-mock";
import mockComponentSetState from "../test/mock/components/React/mockSetState";
import {
  ApiAccountRecoveryContextProvider,
  ApiAccountRecoveryContextState
} from "./ApiAccountRecoveryContext";
import {defaultProps} from "./ApiAccountRecoveryContext.test.data";
import {mockApiResponse} from "../../../test/mocks/mockApiResponse";

beforeEach(() => {
  enableFetchMocks();
});

describe("ApiAccountRecoveryContextProvider", () => {
  describe("ApiAccountRecoveryContextProvider::constructor", () => {
    it("The machine state should be by default set to: INITIAL_STATE", async() => {
      const props = defaultProps();
      const contextProvider = new ApiAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      expect(contextProvider.state.state).toEqual(ApiAccountRecoveryContextState.INITIAL_STATE);
    });
  });

  describe("ApiAccountRecoveryContextProvider::initialize", () => {
    it("should redirect the user to the unexpected error page if an uncaught error occurred during the 'can continue' check", async() => {
      const mockApiContinueFetch = fetch.doMockOnceIf(/account-recovery\/continue/, () => Promise.reject(new Error("Unexpected Error")));

      const props = defaultProps();
      const contextProvider = new ApiAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);
      contextProvider.state.userId = uuidv4();
      contextProvider.state.authenticationToken = uuidv4();

      expect.assertions(3);
      await contextProvider.onInitializeAccountRecoveryRequested();
      expect(mockApiContinueFetch).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(ApiAccountRecoveryContextState.UNEXPECTED_ERROR_STATE);
      expect(contextProvider.state.unexpectedError.message).toEqual("Unexpected Error");
    });

    it("should display a dedicated error if the user is already signed in and the machine state should be set to: ERROR_ALREADY_SIGNED_IN_STATE", async() => {
      fetch.mockResponse(JSON.stringify({header: {}, body: {}}), {status: 403, ok: false});

      const props = defaultProps();
      const contextProvider = new ApiAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);
      contextProvider.state.userId = uuidv4();
      contextProvider.state.authenticationToken = uuidv4();

      expect.assertions(1);
      await contextProvider.onInitializeAccountRecoveryRequested();
      expect(contextProvider.state.state).toEqual(ApiAccountRecoveryContextState.ERROR_ALREADY_SIGNED_IN_STATE);
    });

    it("should display a dedicated error if the token is expired and the machine state should be set to: TOKEN_EXPIRED_STATE", async() => {
      fetch.mockResponse(JSON.stringify({header: {}, body: {token: {isActive: "Inactive token message"}}}), {status: 400, ok: false});

      const props = defaultProps();
      const contextProvider = new ApiAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);
      contextProvider.state.userId = uuidv4();
      contextProvider.state.authenticationToken = uuidv4();

      expect.assertions(1);
      await contextProvider.onInitializeAccountRecoveryRequested();
      expect(contextProvider.state.state).toEqual(ApiAccountRecoveryContextState.TOKEN_EXPIRED_STATE);
    });

    it("Should give the wrong browser feedback to the user in case of success and the machine state should be set to: RESTART_FROM_SCRATCH", async() => {
      const mockApiContinueFetch = fetch.doMockOnceIf(/account-recovery\/continue/, () => mockApiResponse());

      const props = defaultProps();
      const contextProvider = new ApiAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);
      contextProvider.state.userId = uuidv4();
      contextProvider.state.authenticationToken = uuidv4();

      expect.assertions(2);
      await contextProvider.onInitializeAccountRecoveryRequested();
      expect(mockApiContinueFetch).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(ApiAccountRecoveryContextState.RESTART_FROM_SCRATCH);
    });
  });
});
