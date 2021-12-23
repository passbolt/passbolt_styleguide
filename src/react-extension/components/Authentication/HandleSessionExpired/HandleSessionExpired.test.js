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
});

describe("As LU I should handle session expired", () => {
  const props = defaultProps(); // The props to pass
  const mockContextRequest = implementation => jest.spyOn(props.context, 'onCheckIsAuthenticatedRequested').mockImplementation(implementation);

  /**
   * I should see the session expired dialog
   */
  beforeEach(() => {
    jest.useFakeTimers();
    new HandleSessionExpiredPage(props);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('As LU I should have no change if the session is not expired', () => {
    // Mock the request function to make it the expected result
    const requestMockImpl = () => true;
    mockContextRequest(requestMockImpl);
    expect(props.context.onCheckIsAuthenticatedRequested).not.toBeCalled();
    // Fast-forward until all timers have been executed
    jest.runOnlyPendingTimers();
    expect(props.context.onCheckIsAuthenticatedRequested).toHaveBeenCalled();
    expect(props.dialogContext.open).not.toBeCalled();
  });


  it('As LU I should open a dialog if the session is expired',  async() => {
    const requestMockImpl = () => false;
    mockContextRequest(requestMockImpl);
    // Fast-forward until all timers have been executed
    jest.runOnlyPendingTimers();
    // Need 2 promises resolved to open the dialog
    await Promise.resolve();
    await Promise.resolve();
    expect(props.context.onCheckIsAuthenticatedRequested).toHaveBeenCalled();
    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyExpiredSession);
  });
});
