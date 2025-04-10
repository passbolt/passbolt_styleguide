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
import {defaultResourceWorkspaceContext} from '../../../contexts/ResourceWorkspaceContext.test.data';
import {resourceAllTypesDtosCollectionAndVariousPermission} from '../../../../shared/models/entity/resource/resourcesCollection.test.data';
import ColumnsResourceSettingCollection from '../../../../shared/models/entity/resource/columnsResourceSettingCollection';

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
jest.mock("./DisplayResourcesWorkspaceFilters", () => () => <span className="actions-filter"></span>);
jest.mock("../../Common/Footer/Footer", () => () => <span className="footer"></span>);

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

    it('As LU I can see the workspace filter button.', () => {
      const props = defaultProps();
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.filterButton).toBeTruthy();
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
      expect(page.displayResourceWorkspacePageObject.hasSidebarResource).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.hasSidebarFolder).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.folderTree).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.tag).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.footer).toBeTruthy();
    });

    it('As LU I cannot see the resource sidebar via the workspace if I deactivate the details', () => {
      const props = defaultPropsFolderAndResourceLocked(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.hasSidebarResource).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.hasSidebarFolder).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.footer).toBeFalsy();
    });

    it('As LU I cannot see the resource sidebar via the workspace if I have no resource selected', () => {
      const props = defaultProps(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.hasSidebarResource).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.hasSidebarFolder).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.footer).toBeFalsy();
    });

    it('As LU I I should the multiple resources sidebar if I have multiple resources selected', () => {
      const props = defaultProps(); // The resourceWorkspaceContext to pass
      props.resourceWorkspaceContext.selectedResources = resourceAllTypesDtosCollectionAndVariousPermission();
      props.resourceWorkspaceContext.lockDisplayDetail = true;
      page = new DisplayResourceWorkspacePage(props);
      expect(page.displayResourceWorkspacePageObject.exists()).toBeTruthy();
      expect(page.displayResourceWorkspacePageObject.hasSidebarEmpty).toBeFalsy();
      expect(page.displayResourceWorkspacePageObject.hasSidebarMultipleResources).toBeTruthy();
    });
  });

  describe("As LU I can toggle columns of the resource workspace grid.", () => {
    it('As LU I can toggle the resource sidebar', async() => {
      expect.assertions(2);

      const props = defaultProps(); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);

      expect(page.displayResourceWorkspacePageObject.infoButton).not.toBeNull();

      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.infoButton);
      expect(props.resourceWorkspaceContext.onLockDetail).toHaveBeenCalled();
    });

    it('As LU I can unselect and select a column resource', async() => {
      expect.assertions(4);

      const props = defaultProps({
        resourceWorkspaceContext: defaultResourceWorkspaceContext({
          columnsResourceSetting: new ColumnsResourceSettingCollection([
            {id: "favorite", label: "Favorite", position: 1, show: true},
            {id: "attentionRequired", label: "Attention", position: 2, show: true},
            {id: "name", label: "Name", position: 4, show: true},
            {id: "expired", label: "Expiry", position: 5, show: true},
            {id: "username", label: "Username", position: 6, show: true},
            {id: "password", label: "Password", position: 7, show: true},
            {id: "totp", label: "TOTP", position: 8, show: true},
            {id: "uri", label: "URI", position: 9, show: true},
            {id: "modified", label: "Modified", position: 10, show: true},
            {id: "location", label: "Location", position: 11, show: true}]),
        }),
      }); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);

      expect(page.displayResourceWorkspacePageObject.menuColumnView).not.toBeNull();
      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.menuColumnView);
      expect(page.displayResourceWorkspacePageObject.menuColumnViewItem(3)).not.toBeNull();
      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.menuColumnViewItem(3));
      expect(props.resourceWorkspaceContext.onChangeColumnView).toHaveBeenCalledWith('name', false);
      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.menuColumnViewItem(6));
      expect(props.resourceWorkspaceContext.onChangeColumnView).toHaveBeenCalledWith('password', false);
    });

    it('As LU I can reset custom column settings', async() => {
      expect.assertions(5);

      const props = defaultProps({
        resourceWorkspaceContext: defaultResourceWorkspaceContext({
          columnsResourceSetting: new ColumnsResourceSettingCollection([
            {id: "favorite", label: "Favorite", position: 1, show: true},
            {id: "attentionRequired", label: "Attention", position: 2, show: true},
            {id: "name", label: "Name", position: 4, show: true},
            {id: "expired", label: "Expiry", position: 5, show: true},
            {id: "username", label: "Username", position: 6, show: true},
            {id: "password", label: "Password", position: 7, show: true},
            {id: "totp", label: "TOTP", position: 8, show: true},
            {id: "uri", label: "URI", position: 9, show: true},
            {id: "modified", label: "Modified", position: 10, show: true},
            {id: "location", label: "Location", position: 11, show: true}]),
        }),
      }); // The resourceWorkspaceContext to pass
      page = new DisplayResourceWorkspacePage(props);

      expect(page.displayResourceWorkspacePageObject.menuColumnView).not.toBeNull();
      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.menuColumnView);
      expect(page.displayResourceWorkspacePageObject.menuColumnViewItem(3)).not.toBeNull();
      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.menuColumnViewItem(3));
      expect(props.resourceWorkspaceContext.onChangeColumnView).toHaveBeenCalledWith('name', false);
      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.menuColumnViewItem(6));
      expect(props.resourceWorkspaceContext.onChangeColumnView).toHaveBeenCalledWith('password', false);
      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.menuColumnViewResetButton);
      expect(props.resourceWorkspaceContext.resetGridColumnsSettings).toHaveBeenCalled();
    });
  });

  describe("As LU I can see the empty sidebar", () => {
    it('As LU I can toggle the resource sidebar', async() => {
      expect.assertions(3);

      const props = defaultProps({
        resourceWorkspaceContext: defaultResourceWorkspaceContext({
          lockDisplayDetail: true,
        })
      });
      page = new DisplayResourceWorkspacePage(props);

      expect(page.displayResourceWorkspacePageObject.infoButton).not.toBeNull();
      expect(page.displayResourceWorkspacePageObject.hasSidebarEmpty).toStrictEqual(true);

      await page.displayResourceWorkspacePageObject.clickOn(page.displayResourceWorkspacePageObject.infoButton);
      expect(props.resourceWorkspaceContext.onLockDetail).toHaveBeenCalled();
    });
  });
});
