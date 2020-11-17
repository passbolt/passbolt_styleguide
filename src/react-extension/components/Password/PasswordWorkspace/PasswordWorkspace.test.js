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
 * Unit tests on PasswordWorkspace in regard of specifications
 */

import React from 'react';
import {
  defaultAppContext,
  defaultPropsFolderAndResourceLocked,
  defaultPropsWithFolderAndResource,
  defaultPropsWithNoResourceAndNoFolder
} from "./PasswordWorkspace.test.data";
import PasswordWorkspacePage from "./PasswordWorkspace.test.page";

jest.mock("../PasswordSidebar/PasswordSidebar", () => () => <span className="sidebar resource"></span>);
jest.mock("../FolderSidebar/FolderSidebar", () => () => <span className="sidebar folder"></span>);
jest.mock("../Grid/Grid", () => () => <></>);
jest.mock("../PasswordBreadcrumb/PasswordBreadcrumb", () => () => <></>);
jest.mock("../PasswordSearchBar/PasswordSearchBar", () => () => <></>);
jest.mock("../../Tag/SidebarTagFilterSection/SidebarTagFilterSection", () => () => <span className="tag"></span>);
jest.mock("../Group/SidebarGroupFilterSection/SidebarGroupFilterSection", () => () => <></>);
jest.mock("../FoldersTree/FoldersTree", () => () => <span className="folder_tree"></span>);
jest.mock("../FilterResourcesByShortcuts/FilterResourcesByShortcuts", () => () => <></>);
jest.mock("./PasswordWorkspaceMenu", () => () => <></>);
jest.mock("./PasswordWorkspaceMainMenu", () => () => <></>);
jest.mock("../../../../react/components/Common/Navigation/Header/Logo");
jest.mock("../../../../react/components/Common/Navigation/Header/UserBadgeMenu", () => () => <></>);

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the Workspace", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context


  describe('As LU I can see the resource sidebar via the workspace', () => {
    /**
     * Given a selected resource with the details activate
     * Then I should see the resource sidebar
     */

    it('As LU I can see the resource sidebar via the workspace if I have a resource selected an the details activate', () => {
      const props = defaultPropsWithFolderAndResource(); // The resourceWorkspaceContext to pass
      page = new PasswordWorkspacePage(context, props);
      expect(page.displayPasswordWorkspace.exists()).toBeTruthy();
      expect(page.displayPasswordWorkspace.sidebarResource).toBeTruthy();
      expect(page.displayPasswordWorkspace.sidebarFolder).toBeTruthy();
      expect(page.displayPasswordWorkspace.folderTree).toBeTruthy();
      expect(page.displayPasswordWorkspace.tag).toBeTruthy();
    });

    it('As LU I cannot see the resource sidebar via the workspace if I deactivate the details', () => {
      const props = defaultPropsFolderAndResourceLocked(); // The resourceWorkspaceContext to pass
      page = new PasswordWorkspacePage(context, props);
      expect(page.displayPasswordWorkspace.exists()).toBeTruthy();
      expect(page.displayPasswordWorkspace.sidebarResource).toBeFalsy();
      expect(page.displayPasswordWorkspace.sidebarFolder).toBeFalsy();
    });

    it('As LU I cannot see the resource sidebar via the workspace if I have no resource selected', () => {
      const props = defaultPropsWithNoResourceAndNoFolder(); // The resourceWorkspaceContext to pass
      page = new PasswordWorkspacePage(context, props);
      expect(page.displayPasswordWorkspace.exists()).toBeTruthy();
      expect(page.displayPasswordWorkspace.sidebarResource).toBeFalsy();
      expect(page.displayPasswordWorkspace.sidebarFolder).toBeFalsy();
    });

    it('As LU I cannot see the folder tree and tag if I have no access', () => {
      const appContext = {
        siteSettings: {
          canIUse: () => false,
        }
      };
      const props = defaultPropsWithNoResourceAndNoFolder(); // The resourceWorkspaceContext to pass
      page = new PasswordWorkspacePage(defaultAppContext(appContext), props);
      expect(page.displayPasswordWorkspace.folderTree).toBeFalsy();
      expect(page.displayPasswordWorkspace.tag).toBeFalsy();
    });
  });
});
