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
 * Unit tests on DisplayUserDirectoryAdministration in regard of specifications
 */
import {
  defaultAppContext,
  defaultProps,
  mockUserDirectorySettings, mockUsers
} from "./DisplayUserDirectoryAdministration.test.data";
import fetchMock from "fetch-mock-jest";
import DisplayUserDirectoryAdministrationPage from "./DisplayUserDirectoryAdministration.test.page";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Create Dialog User", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockFetch = (url, data) => fetchMock.get(url, data);

  describe('As AD I should see the User DIrectory activation state on the administration settings page', () => {
    /**
     * I should see the User Directory activation state on the administration settings page
     */
    beforeEach(() => {
      mockFetch("http://localhost:3000/directorysync/settings.json?api-version=v2", mockUserDirectorySettings);
      mockFetch("http://localhost:3000/users.json?api-version=v2", mockUsers);
      page = new DisplayUserDirectoryAdministrationPage(context, props);
    });

    it('As AD I should see if the User Directory is enabled on my Passbolt instance', async() => {
      await waitFor(() => {
      });
      expect(page.displayUserDirectoryAdministration.exists()).toBeTruthy();
      // check fields in the form
      expect(page.displayUserDirectoryAdministration.userDirectory.checked).toBe(true);

      expect(page.displayUserDirectoryAdministration.activeDirectory.checked).toBe(true);
      expect(page.displayUserDirectoryAdministration.connectionType.value).toBe("plain");
      expect(page.displayUserDirectoryAdministration.serverHost.value).toBe("127.0.0.1");
      expect(page.displayUserDirectoryAdministration.port.value).toBe("389");
      expect(page.displayUserDirectoryAdministration.username.value).toBe("username");
      expect(page.displayUserDirectoryAdministration.password.value).toBe("password");
      expect(page.displayUserDirectoryAdministration.domainName.value).toBe("passbolt.local");
      expect(page.displayUserDirectoryAdministration.baseDn.value).toBe("DC=passbolt,DC=local");

      await page.displayUserDirectoryAdministration.click(page.displayUserDirectoryAdministration.directoryConfigurationTitle);
      expect(page.displayUserDirectoryAdministration.groupPath.value).toBe("");
      expect(page.displayUserDirectoryAdministration.userPath.value).toBe("");
      expect(page.displayUserDirectoryAdministration.groupObjectClass).toBeNull();
      expect(page.displayUserDirectoryAdministration.userObjectClass).toBeNull();
      expect(page.displayUserDirectoryAdministration.useEmailPrefix).toBeNull();
      await page.displayUserDirectoryAdministration.click(page.displayUserDirectoryAdministration.synchronizationOptionsTitle);
      expect(page.displayUserDirectoryAdministration.defaultUser.textContent).toBe("Admin User (admin@passbolt.com)");
      expect(page.displayUserDirectoryAdministration.defaultGroupAdminUser.textContent).toBe("Admin User (admin@passbolt.com)");
      expect(page.displayUserDirectoryAdministration.groupsParentGroup.value).toBe("");
      expect(page.displayUserDirectoryAdministration.usersParentGroup.value).toBe("");
      expect(page.displayUserDirectoryAdministration.enabledUsersOnly.checked).toBe(false);
      expect(page.displayUserDirectoryAdministration.createUsers.checked).toBe(true);
      expect(page.displayUserDirectoryAdministration.deleteUsers.checked).toBe(true);
      expect(page.displayUserDirectoryAdministration.createGroups.checked).toBe(true);
      expect(page.displayUserDirectoryAdministration.deleteGroups.checked).toBe(true);
      expect(page.displayUserDirectoryAdministration.updateGroups.checked).toBe(true);

      // click on OPEN LDAP
      await page.displayUserDirectoryAdministration.click(page.displayUserDirectoryAdministration.openLdap);
      expect(page.displayUserDirectoryAdministration.groupObjectClass.value).toBe("");
      expect(page.displayUserDirectoryAdministration.userObjectClass.value).toBe("");
      expect(page.displayUserDirectoryAdministration.enabledUsersOnly).toBeNull();
      expect(page.displayUserDirectoryAdministration.useEmailPrefix.checked).toBe(false);
      await page.displayUserDirectoryAdministration.click(page.displayUserDirectoryAdministration.useEmailPrefix);
      expect(page.displayUserDirectoryAdministration.useEmailPrefix.checked).toBe(true);
      expect(page.displayUserDirectoryAdministration.emailPrefix.value).toBe("");
      expect(page.displayUserDirectoryAdministration.emailSuffix.value).toBe("");
    });
  });

  describe('As AD I see all fields disabled if mfa setting are not yet fetched', () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given the groups section
     * And the groups are not loaded yet
     * Then I should see the loading message “Retrieving groups”
     */

    beforeEach(() => {
      page = new DisplayUserDirectoryAdministrationPage(context, props);
    });

    it('I should see all fields disabled”', () => {
      expect(page.displayUserDirectoryAdministration.userDirectory.getAttribute("disabled")).not.toBeNull();
    });
  });
});
