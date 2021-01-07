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
 * @since         2.11.0
 */

/**
 * Unit tests on FilterUserByShortcut in regard of specifications
 */

import {defaultAppContext, defaultProps, mockGpgKey} from "./DisplayUserDetailsPublicKey.test.data";
import DisplayUserDetailsPublicKeyPage from "./DisplayUserDetailsPublicKey.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("Display User Details Information", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  beforeEach(() => {
    page = new DisplayUserDetailsPublicKeyPage(context, props);
    const requestGpgMockImpl = jest.fn(() => mockGpgKey);
    mockContextRequest(context, requestGpgMockImpl);
  });

  it('As LU I should not initially see the information area as expanded', () => {
    expect(page.isCollapsed).toBeTruthy();
  });

  it('As LU I should see the information area when I collapse the area', async() => {
    await page.toggleCollapse();
    expect(page.isCollapsed).toBeFalsy();

    await page.toggleCollapse();
    expect(page.isCollapsed).toBeTruthy();
  });

  it('As LU I should copy the public key', async() => {
    jest.spyOn(props.actionFeedbackContext, "displaySuccess").mockImplementationOnce(() => {});
    await page.toggleCollapse();
    await page.copyPublicKey();
    expect(context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", "54c6278e-f824-5fda-91ff-3e946b18d994");
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
  });

  it('As LU I should see the appropriate detailed user fingerprint', async() => {
    await page.toggleCollapse();
    expect(page.fingerprint).toContain('03F6 0E95 8F4C B297 23AC<br>DF76 1353 B5B1 5D9B 054F');
    expect(page.type).toBe('RSA');
  });
});
