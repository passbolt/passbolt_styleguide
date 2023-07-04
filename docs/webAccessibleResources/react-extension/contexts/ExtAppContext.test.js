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

import {defaultAppContext} from "./ExtAppContext.test.data";
import ExtAppContextProvider from "./ExtAppContext";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("ExtApp Context", () => {
  let extAppContext; // The extAppContext to text

  describe('As LU I should complete an authentication setup', () => {
    beforeEach(() => {
      extAppContext = new ExtAppContextProvider(defaultAppContext());
      const setStateMock = state => extAppContext.state = Object.assign(extAppContext.state, state);
      jest.spyOn(extAppContext, 'setState').mockImplementation(setStateMock);
    });

    it('As LU I should start with the state isSessionLogoutByUser false', () => {
      expect.assertions(1);
      // expectations
      expect(extAppContext.state.isSessionLogoutByUser).toBeFalsy();
    });

    it('As LU I should listen on expired session', () => {
      expect.assertions(3);
      // data mocked
      const callback = () => "Hello";
      // mock function
      jest.spyOn(extAppContext, "onExpiredSession");
      jest.spyOn(extAppContext.props.port, "on");
      // process
      extAppContext.onExpiredSession(callback);
      // expectations
      expect(extAppContext.onExpiredSession).toHaveBeenCalledWith(callback);
      expect(extAppContext.props.port.on).toHaveBeenCalledWith('passbolt.auth.after-logout', expect.any(Function));
      expect(extAppContext.state.isSessionLogoutByUser).toBeFalsy();
    });

    it('As LU I should logout with the state isSessionLogoutByUser true', () => {
      expect.assertions(1);
      // process
      extAppContext.onLogoutRequested();
      // expectations
      expect(extAppContext.state.isSessionLogoutByUser).toBeTruthy();
    });
  });
});
