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
 * Unit tests on FolderSidebarPermissionSection in regard of specifications
 */


import {
  defaultAppContext,
  defaultProps, permissionMock,
} from "./DisplayResourceFolderDetailsPermissions.test.data";
import DisplayResourceFolderDetailsPermissionsPage from "./DisplayResourceFolderDetailsPermissions.test.page";
import ShareDialog from "../../Share/ShareDialog";

beforeEach(() => {
  jest.resetModules();
});

describe("See permissions", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);
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
      page = new DisplayResourceFolderDetailsPermissionsPage(context, props);
      mockContextRequest(permissionFoundRequestMockImpl);
    });

    it('I should see the 4 permissions made on the resource', async() => {
      await page.title.click();
      expect(page.title.hyperlink.textContent).toBe("Shared with");

      expect(page.displayPermissionList.exists()).toBeTruthy();
      expect(page.displayPermissionList.count()).toBe(5);
      await page.displayPermissionList.edit();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog);
    });

    it('I should be able to identify each permission name', async() => {
      await page.title.click();
      expect(page.displayPermissionList.name(1)).toBe('Ada Lovelace');
      expect(page.displayPermissionList.name(2)).toBe('Admin User');
      expect(page.displayPermissionList.name(3)).toBe('Admin User2');
      expect(page.displayPermissionList.name(4)).toBe('Accounting');
      expect(page.displayPermissionList.name(5)).toBe('Marketing');
      expect(context.port.request).toHaveBeenCalledWith("passbolt.folders.find-permissions", props.resourceWorkspaceContext.details.folder.id);
    });

    it('I should be able to see each permission type', async() => {
      await page.title.click();
      expect(page.displayPermissionList.type(1)).toBe('can read');
      expect(page.displayPermissionList.type(2)).toBe('is owner');
      expect(page.displayPermissionList.type(3)).toBe('is owner');
      expect(page.displayPermissionList.type(4)).toBe('can update');
      expect(page.displayPermissionList.type(5)).toBe('can update');
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
      page = new DisplayResourceFolderDetailsPermissionsPage(context, props);
    });

    it('I should see the loading message “Retrieving permissions”', async() => {
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
