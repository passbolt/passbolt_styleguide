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
 * Unit tests on DisplayResourceDetailsPermission in regard of specifications
 */


import {
  defaultProps, permissionMock,
} from "./DisplayResourceDetailsPermission.test.data";
import DisplayResourceDetailsPermissionPage from "./DisplayResourceDetailsPermission.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See permissions", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
  const permissionFoundRequestMockImpl = jest.fn(() => Promise.resolve(permissionMock));

  describe(' As LU I can see permissions of a resource with at least one permission', () => {
    /**
     * Given a selected resource having 1 permission
     * When I open the “Permission” section of the secondary sidebar
     * Then I should see the permission made on the resource
     * And I should be able to identify each permissions name
     * And I should be able to see each permissions type
     */

    beforeEach(() => {
      page = new DisplayResourceDetailsPermissionPage(props);
      mockContextRequest(permissionFoundRequestMockImpl);
    });

    it('I should see the 4 permissions made on the resource', async() => {
      expect.assertions(3);
      await page.title.click();
      expect(page.title.hyperlink.textContent).toBe("Shared with");

      expect(page.displayPermissionList.exists()).toBeTruthy();
      expect(page.displayPermissionList.count()).toBe(3);
    });

    it('I should be able to identify each permission name', async() => {
      expect.assertions(4);
      await page.title.click();
      expect(page.displayPermissionList.name(1)).toBe('Ada Lovelace (ada@passbolt.com)');
      expect(page.displayPermissionList.name(2)).toBe('Admin User (admin@passbolt.com)');
      expect(page.displayPermissionList.name(3)).toBe('Marketing');
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.permissions.find-aco-permissions-for-display", props.resourceWorkspaceContext.details.resource.id, "Resource");
    });

    it('I should be able to see each permission type', async() => {
      expect.assertions(3);
      await page.title.click();
      expect(page.displayPermissionList.type(1)).toBe('can read');
      expect(page.displayPermissionList.type(2)).toBe('is owner');
      expect(page.displayPermissionList.type(3)).toBe('can update');
    });
  });

  describe(' As LU I see a loading state when the permission are not loaded', () => {
    /**
     * Given a selected resource having permissions
     * When I open the “Permission” section of the secondary sidebar
     * And the permission are not loaded yet
     * Then I should see the loading message “Retrieving permissions”
     */

    let findResolve;
    const loadingFindMockImpl = jest.fn(() => new Promise(resolve => {
      findResolve = resolve;
    }));

    beforeEach(() => {
      mockContextRequest(loadingFindMockImpl);
      page = new DisplayResourceDetailsPermissionPage(props);
    });

    it('I should see the loading message “Retrieving permissions”', async() => {
      expect.assertions(2);
      await page.title.click();

      const inProgressFn = () => {
        expect(page.displayPermissionList.isLoading()).toBeTruthy();
        findResolve([]);
      };
      await page.displayPermissionList.waitForLoading(inProgressFn);
      expect(page.displayPermissionList.isLoading()).toBeFalsy();
    });
  });
});
