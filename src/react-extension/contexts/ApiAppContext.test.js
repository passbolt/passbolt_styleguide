/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.11.0
 */

import {CsrfToken} from "../../shared/lib/apiClient/csrfToken";
import ApiAppContextProvider from "./ApiAppContext";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  jest.useFakeTimers();
  jest.clearAllTimers();
});

describe("ApiApp Context", () => {
  let apiAppContext; // The apiAppContext to text

  describe('As LU I should complete an authentication setup', () => {
    beforeEach(() => {
      jest.spyOn(document, "getElementsByTagName").mockImplementation(() => [{
        attributes: {
          href: {
            value: "http://localhost:6006"
          }
        }
      }]);
      jest.spyOn(CsrfToken, "getToken").mockImplementation(() => "my-csrf-token");
      apiAppContext = new ApiAppContextProvider();
      const setStateMock = state => apiAppContext.state = Object.assign(apiAppContext.state, state);
      jest.spyOn(apiAppContext, 'setState').mockImplementation(setStateMock);
    });

    it('As LU I should listen on expired session', async() => {
      expect.assertions(8);
      // data mocked
      const callback = jest.fn(() => "Hello");
      // mock function
      jest.spyOn(apiAppContext, "onExpiredSession");
      jest.spyOn(apiAppContext, "onCheckIsAuthenticatedRequested").mockImplementationOnce(() => true);
      // process
      apiAppContext.onExpiredSession(callback);
      // expectations
      expect(apiAppContext.onExpiredSession).toHaveBeenCalledWith(callback);
      expect(apiAppContext.onExpiredSession).toHaveBeenCalledTimes(1);
      expect(apiAppContext.onCheckIsAuthenticatedRequested).toHaveBeenCalledTimes(0);
      // advance timer
      jest.advanceTimersByTime(60000);
      await Promise.resolve();
      // expectations
      expect(apiAppContext.onCheckIsAuthenticatedRequested).toHaveBeenCalledTimes(1);
      expect(apiAppContext.onExpiredSession).toHaveBeenCalledTimes(2);
      // mock function
      jest.spyOn(apiAppContext, "onCheckIsAuthenticatedRequested").mockImplementationOnce(() => false);
      // advance timer
      jest.advanceTimersByTime(60000);
      await Promise.resolve();
      // expectations
      expect(apiAppContext.onExpiredSession).toHaveBeenCalledTimes(2);
      expect(apiAppContext.onCheckIsAuthenticatedRequested).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
