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
 * @since         5.5.0
 */
import "../../../../../test/mocks/mockPortal";
import {defaultAppContext} from '../../../contexts/ApiAppContext.test.data';
import {defaultProps} from './DisplayUserDirectoryAdministrationTeasing.test.data';
import DisplayUserDirectoryAdministrationTeasingPage from './DisplayUserDirectoryAdministrationTeasing.test.page';
import {waitFor} from '@testing-library/dom';

/**
 * Unit tests on DisplayUserDirectoryAdministrationTeasing in regard of specifications
 */
describe("DisplayUserDirectoryAdministrationTeasing", () => {
  let page, props;
  const context = defaultAppContext();

  beforeEach(() => {
    jest.resetModules();

    props = defaultProps();
  });

  /**
   * For an Admin CE user
   * When I go to the Users Directory page
   * I should see the correct title and paragraph text
   * And I should see the upgrade button
   * And the help text and documentation button
   */
  it('As CE AD I should see all details about the password policy', async() => {
    expect.assertions(11);
    page = new DisplayUserDirectoryAdministrationTeasingPage(context, props);
    const expectedUsersDirectoryDescriptions = [
      "Automate user onboarding and offboarding.",
      "Sync user attributes efficiently.",
      "Ensure data consistency and security compliance."
    ];
    await waitFor(() => {});
    expect(page.exists()).toBeTruthy();
    expect(page.title).toBe("Users Directory");
    expect(page.usersDirectoryFirstLine).toBe("Simplify user management provisioning through integration with existing directories.");
    expect(page.upgradeButton).toBeTruthy();
    expect(page.upgradeButton.getAttribute("href")).toBe("https://www.passbolt.com/ce-to-pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product");

    const actualDescriptions = Array.from(page.usersDirectoryDescription).map(li => li.textContent.trim());
    expect(actualDescriptions).toEqual(expectedUsersDirectoryDescriptions);

    await waitFor(() => {});
    expect(page.helpBox).not.toBeNull();
    expect(page.helpBoxTitle).toBe("Need some help?");
    expect(page.helpBoxDescription).toBe("Check out our ldap configuration guide.");
    expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
    expect(page.helpBoxButton.getAttribute("href")).toBe("https://www.passbolt.com/docs/admin/user-provisioning/users-directory/");
  });
});
