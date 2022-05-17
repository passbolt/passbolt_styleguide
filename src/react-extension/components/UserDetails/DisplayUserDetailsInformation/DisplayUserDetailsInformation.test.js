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
 * Unit tests on DisplayUserDetailsInformation in regard of specifications
 */

import {defaultProps} from "./DisplayUserDetailsInformation.test.data";
import DisplayUserDetailsInformationPage from "./DisplayUserDetailsInformation.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("Display User Details Information", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new DisplayUserDetailsInformationPage(props);
  });

  it('As LU I should initially see the information area as expanded', () => {
    expect(page.isCollapsed).toBeFalsy();
  });

  it('As LU I should not see the information area when I collapse the area', async() => {
    await page.toggleCollapse();
    expect(page.isCollapsed).toBeTruthy();

    await page.toggleCollapse();
    expect(page.isCollapsed).toBeFalsy();
  });

  it('As LU I should see the detailed user role', () => {
    expect(page.role).toBe('Admin');
  });

  it('As LU I should see the detailed user status', () => {
    expect(page.status).toBe('Activated');
  });

  it('As LU I should see the detailed account recovery status', () => {
    expect(page.accountRecoveryStatus).toBe('Pending');
  });

  it('As LU I should see the detailed mfa status', () => {
    expect(page.mfaStatus).toBe('Disabled');
  });
});
