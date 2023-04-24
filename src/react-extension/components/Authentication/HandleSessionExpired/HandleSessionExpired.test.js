/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.1
 */

/**
 * Unit tests on SessionExpired in regard of specifications
 */
import {defaultProps} from "./HandleSessionExpired.test.data";
import HandleSessionExpiredPage from "./HandleSessionExpired.test.page";
import NotifyExpiredSession from "../NotifyExpiredSession/NotifyExpiredSession";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("HandleSessionExpired", () => {
  describe("As LU I should handle session expired for ApiApp", () => {
    const props = defaultProps(); // The props to pass
    /**
     * I should see the session expired dialog
     */
    beforeEach(() => {
      new HandleSessionExpiredPage(props);
    });

    it('As LU I should add a callback for session expired in the app context', () => {
      expect.assertions(2);
      expect(props.context.onExpiredSession).toHaveBeenCalledWith(expect.any(Function));
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyExpiredSession);
    });
  });
});
