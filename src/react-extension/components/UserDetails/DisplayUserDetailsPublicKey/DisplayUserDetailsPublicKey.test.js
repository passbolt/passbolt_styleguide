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

import {defaultAppContext, defaultProps, mockGpgKey, mockInvalidGpgKey} from "./DisplayUserDetailsPublicKey.test.data";
import DisplayUserDetailsPublicKeyPage from "./DisplayUserDetailsPublicKey.test.page";
import {DateTime} from "luxon";

beforeEach(() => {
  jest.resetModules();
});

function formatDate(data) {
  try {
    return DateTime.fromJSDate(new Date(data)).setLocale("en-US").toLocaleString(DateTime.DATETIME_FULL);
  } catch (error) {
    return "";
  }
}

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
    expect.assertions(1);
    expect(page.isCollapsed).toBeTruthy();
  });

  it('As LU I should see the information area when I collapse the area', async() => {
    expect.assertions(2);
    await page.toggleCollapse();
    expect(page.isCollapsed).toBeFalsy();

    await page.toggleCollapse();
    expect(page.isCollapsed).toBeTruthy();
  });

  it('As LU I should copy the public key', async() => {
    expect.assertions(2);
    jest.spyOn(props.actionFeedbackContext, "displaySuccess").mockImplementationOnce(() => {});
    await page.toggleCollapse();
    await page.copyPublicKey();
    expect(context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", "54c6278e-f824-5fda-91ff-3e946b18d994");
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
  });

  it('As LU I should see the appropriate detailed user fingerprint', async() => {
    expect.assertions(2);
    await page.toggleCollapse();
    expect(page.fingerprint).toContain('03F6 0E95 8F4C B297 23AC<br>DF76 1353 B5B1 5D9B 054F');
    expect(page.type).toBe('RSA');
  });

  it('As LU I should see the details of an invalid key', async() => {
    expect.assertions(4);
    jest.spyOn(context.port, 'request').mockImplementation(jest.fn(() => mockInvalidGpgKey));

    await page.toggleCollapse();
    expect(page.fingerprint).toContain('C694 577F F69D E85C 0793<br>5DF3 10FC 3004 99AE 900B');
    expect(page.type).toBe('RSA');
    expect(page.created).toBe(formatDate('2020-08-19T14:56:54+00:00'));
    expect(page.expires).toBe('n/a');
  });
});
