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
} from "./DisplayResourcesWorkspace.test.data";
import DisplayResourceWorkspacePage from "./DisplayResourcesWorkspace.test.page";

jest.mock("../../ResourceDetails/DisplayResourceDetails/DisplayResourceDetails", () => () => <span className="sidebar resource"></span>);
jest.mock("../../ResourceFolderDetails/DisplayResourceFolderDetails/DisplayResourceFolderDetails", () => () => <span className="sidebar folder"></span>);
jest.mock("../DisplayResourcesList/DisplayResourcesList", () => () => <></>);
jest.mock("../FilterResourcesByBreadcrumb/FilterResourcesByBreadcrumb", () => () => <></>);
jest.mock("../FilterResourcesByText/FilterResourcesByText", () => () => <></>);
jest.mock("../FilterResourcesByTags/FilterResourcesByTags", () => () => <span className="tag"></span>);
jest.mock("../FilterResourcesByGroups/FilterResourcesByGroups", () => () => <></>);
jest.mock("../FilterResourcesByFolders/FilterResourcesByFolders", () => () => <span className="folder_tree"></span>);
jest.mock("../FilterResourcesByShortcuts/FilterResourcesByShortcuts", () => () => <></>);
jest.mock("./DisplayResourcesWorkspaceMenu", () => () => <></>);
jest.mock("./DisplayResourcesWorkspaceMainMenu", () => () => <></>);
jest.mock("../../Common/Navigation/Header/Logo");
jest.mock("../../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu", () => () => <></>);

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
      page = new DisplayResourceWorkspacePage(context, props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.sidebarResource).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.sidebarFolder).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.folderTree).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.tag).toBeTruthy();
    });

    it('As LU I cannot see the resource sidebar via the workspace if I deactivate the details', () => {
      const props = defaultPropsFolderAndResourceLocked(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(context, props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.sidebarResource).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.sidebarFolder).toBeFalsy();
    });

    it('As LU I cannot see the resource sidebar via the workspace if I have no resource selected', () => {
      const props = defaultPropsWithNoResourceAndNoFolder(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(context, props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.sidebarResource).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.sidebarFolder).toBeFalsy();
    });

    it('As LU I cannot see the folder tree and tag if I have no access', () => {
      const appContext = {
        siteSettings: {
          canIUse: () => false,
        }
      };
      const props = defaultPropsWithNoResourceAndNoFolder(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(defaultAppContext(appContext), props);
      expect(page.displayResourceWorkspacePageObject.folderTree).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.tag).toBeFalsy();
    });
  });
});
