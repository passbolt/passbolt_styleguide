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
  defaultProps,
  defaultPropsFolderAndResourceLocked,
  defaultPropsWithFolderAndResource,
  propsWithDenyUiAction
} from "./DisplayResourcesWorkspace.test.data";
import DisplayResourceWorkspacePage from "./DisplayResourcesWorkspace.test.page";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

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

describe("DisplayResourcesWorkspace", () => {
  let page; // The page to test against

  describe('As LU I can use the workspace primary sidebar.', () => {
    it('As LU I can see the workspace primary sidebar.', () => {
      const props = defaultProps();
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.folderTree).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.tag).toBeTruthy();
    });

    it('As LU I cannot see the folders section if disabled by API flags.', () => {
      const appContext = {
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      };
      const context = defaultUserAppContext(appContext);
      const props = defaultProps({context}); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.folderTree).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.tag).toBeFalsy();
    });

    it('As LU I cannot see the folders section if denied by RBAC.', () => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.tag).toBeFalsy();
    });

    it('As LU I cannot see the tags section if denied by RBAC.', () => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.folderTree).toBeFalsy();
    });
  });

  describe('As LU I can use the workspace secondary sidebar.', () => {
    /**
     * Given a selected resource with the details activate
     * Then I should see the resource sidebar
     */

    it('As LU I can see the resource sidebar via the workspace if I have a resource selected an the details activate', () => {
      const props = defaultPropsWithFolderAndResource(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.sidebarResource).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.sidebarFolder).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.folderTree).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.tag).toBeTruthy();
    });

    it('As LU I cannot see the resource sidebar via the workspace if I deactivate the details', () => {
      const props = defaultPropsFolderAndResourceLocked(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.sidebarResource).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.sidebarFolder).toBeFalsy();
    });

    it('As LU I cannot see the resource sidebar via the workspace if I have no resource selected', () => {
      const props = defaultProps(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.sidebarResource).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.sidebarFolder).toBeFalsy();
    });
  });
});
