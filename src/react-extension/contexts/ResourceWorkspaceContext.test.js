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
 * Unit tests on ResourceWorkspaceContext in regard of specifications
 */

import {defaultAppContext} from "./ResourceWorkspaceContext.test.data";
import ResourceWorkspaceContextPage from "./ResourceWorkspaceContext.test.page";
import {ResourceWorkspaceFilterTypes} from "./ResourceWorkspaceContext";

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

describe("Resource Workspace Context", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  beforeEach(() => {
    page = new ResourceWorkspaceContextPage(context);
  });

  describe("As LU I should have the appropriate search filter at any time", () => {
    it("AS LU I should have an initial filter set to NONE", () => {
      expect(page.filter).toBeDefined();
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.NONE);
    });

    it("AS LU I should have an ALL ITEMS filter when I went to /app/passwords without filter", async() => {
      await page.goToAllItems();
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.ALL);
    });

    it("AS LU I should have an RECENTLY-MODIFIED filter when I went to /app/passwords with such a filter", async() => {
      await page.goToRecentlyModified();
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED);
    });

    it("AS LU I should have an SHARED-WITH-ME filter when I went to /app/passwords with such a filter", async() => {
      await page.goToShareWithMe();
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.SHARED_WITH_ME);
    });

    it("AS LU I should have an ITEMS-I-OWN filter when I went to /app/passwords with such a filter", async() => {
      await page.goToItemsIOwn();
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.ITEMS_I_OWN);
    });

    it("AS LU I should have an FAVORITE filter when I went to /app/passwords with such a filter", async() => {
      await page.goToFavorite();
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.FAVORITE);
    });

    it("AS LU I should have an TEXT filter when I went to /app/passwords with such a filter", async() => {
      await page.goToText("some text");
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.TEXT);
    });

    it("AS LU I should have an GROUP filter when I went to /app/passwords with such a filter", async() => {
      await page.goToGroup({group: {id: 'some group id'}});
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.GROUP);
    });

    it("AS LU I should have an TAG filter when I went to /app/passwords with such a filter", async() => {
      await page.goToTag({tag: {id: 'some tag id'}});
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.TAG);
    });

    it("AS LU I should have an FOLDER filter when I went to /app/folders/{folder-id} with such a filter", async() => {
      await page.goToFolder(context.folders[0]);
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.FOLDER);
    });

    it("AS LU I should have an ROOT-FOLDER filter when I went to /app/folders/{folder-id} with such a filter", async() => {
      await page.goToRootFolder();
      expect(page.filter.type).toBe(ResourceWorkspaceFilterTypes.ROOT_FOLDER);
    });
  });

  describe("As LU I should have the appropriate search filtered results at any time", () => {
    it("AS LU I should have all resources when the filter is ALL-ITEMS", async() => {
      await page.goToAllItems();
      expect(page.filteredResources).toStrictEqual(context.resources);
    });

    it("AS LU I should have all resources all resources when the filter is RECENTLY-MODIFIED", async() => {
      await page.goToRecentlyModified();
      expect(page.filteredResources).toBe(context.resources);
    });

    it.todo("AS LU I should have the most recent created resource when the filter is RECENTLY-MODIFIED");

    it("AS LU I should have resources shared with me when the filter is SHARED-WITH-ME", async() => {
      const expectedResourcesCount = 16;
      await page.goToShareWithMe();
      expect(page.filteredResources).toHaveLength(expectedResourcesCount);
    });

    it("AS LU I should have my own resources when the filter is ITEMS-I-OWN", async() => {
      const expectedResourcesCount = 1;
      await page.goToItemsIOwn();
      expect(page.filteredResources).toHaveLength(expectedResourcesCount);
    });

    it("AS LU I should have my favorite resources when the filter is FAVORITE", async() => {
      const expectedResourcesCount = 1;
      await page.goToFavorite();
      expect(page.filteredResources).toHaveLength(expectedResourcesCount);
    });

    it("AS LU I should have resources matching a text when the filter is TEXT", async() => {
      const expectedResourcesCount = 1;
      await page.goToText("docker");
      expect(page.filteredResources).toHaveLength(expectedResourcesCount);
      expect(page.filteredResources[0].name).toBe("Docker");
    });

    it("AS LU I should have resources belonged to a group when the filter is GROUP", async() => {
      const mockGroupResources = context.resources.slice(0, 3);
      const expectedResourcesCount = 3;
      const leadershipTeamGroup = {group: {id: "516c2db6-0aed-52d8-854f-b3f3499995e7"}};
      mockContextRequest(context, (path, args) => {
        const isGroupResourcesRequest = path === "passbolt.resources.find-all" && args.filters;
        return isGroupResourcesRequest ? mockGroupResources : context.port.request;
      });
      await page.goToAllItems();
      await page.goToGroup(leadershipTeamGroup);
      expect(page.filteredResources).toHaveLength(expectedResourcesCount);
    });

    it("AS LU I should have resources with a specific tag when the filter is TAG", async() => {
      const charlieTag = {tag: {id: '1c8afebc-7e23-51bd-a0b6-2e695afeb32f'}};
      const expectedResourcesCount = 1;
      await page.goToTag(charlieTag);
      expect(page.filteredResources).toHaveLength(expectedResourcesCount);
    });

    it("AS LU I should have resources belonged to a folder if the filter is FOLDER", async() => {
      const privateFolderId = "907c3f61-f416-5834-86d2-e721501ee493";
      const privateFolder = context.folders.find(folder => folder.id === privateFolderId);
      const expectedResourcesCount = 1;
      await page.goToFolder(privateFolder);
      expect(page.filteredResources).toHaveLength(expectedResourcesCount);
    });

    it("AS LU I should have resources belonged to a root folder the filter is ROOT-FOLDER", async() => {
      const expectedResourcesCount = 16;
      await page.goToRootFolder();
      expect(page.filteredResources).toHaveLength(expectedResourcesCount);
    });
  });

  describe("As LU I should hav the appropriate selected resources at any time", () => {
    it("As LU I should have an initial set of selected resources to empty", () => {
      expect(page.selectedResources).toBeDefined();
      expect(page.selectedResources).toHaveLength(0);
    });

    it("As LU I should have all resources as selected when the All Selection event has been fired", async() => {
      await page.goToAllItems();
      await page.selectAll();
      expect(page.selectedResources).toHaveLength(context.resources.length);
    });

    it("As LU I should have none resources as selected when the None Selection event has been fired", async() => {
      await page.goToAllItems();
      await page.selectAll();
      await page.selectNone();
      expect(page.selectedResources).toHaveLength(0);
    });

    it("As LU I should have one selected resource when the Single Selection event has been fired", async() => {
      await page.goToAllItems();
      const resourceToSelect = context.resources[0];
      page.select(resourceToSelect);
      expect(page.selectedResources).toHaveLength(1);
      expect(page.selectedResources[0]).toBe(resourceToSelect);
    });

    it("As LU I should have multiple resources as selected when the Multiple Selection event has been fired", async() => {
      await page.goToAllItems();
      const resourcesToSelect = [context.resources[0], context.resources[3]];
      await page.selectMultiple(resourcesToSelect);
      expect(page.selectedResources).toHaveLength(2);
      expect(page.selectedResources[0]).toBe(context.resources[0]);
      expect(page.selectedResources[1]).toBe(context.resources[3]);
    });

    it("As LU I should have a range of selected resources when the Range Selection event has been fired", async() => {
      await page.goToAllItems();
      const resourcesToSelect = [context.resources[0], context.resources[3]];
      await page.selectRange(resourcesToSelect);
      const expectResourceMatch = (resource, index) => expect(resource).toBe(context.resources[index]);
      expect(page.selectedResources).toHaveLength(4);
      page.selectedResources.slice(0, 4).forEach(expectResourceMatch);
    });
  });

  describe("As LU I should have the appropriate details at any time", () => {
    it("As LU, I should detail a folder when a folder is selected as filter", async() => {
      const folder = context.folders[0];
      await page.goToFolder(folder);
      expect(page.details.folder).toBe(folder);
      expect(page.lockDisplayDetail).toBeTruthy();
    });

    it("As LU, I should detail a resource when a resource is selected", async() => {
      const resource = context.resources[0];
      await page.goToAllItems();
      await page.select(resource);
      expect(page.details.resource).toBe(resource);
      expect(page.lockDisplayDetail).toBeTruthy();
    });

    it("As LU, I should detail nothing when the detail visibility lock is removed", async() => {
      const resource = context.resources[0];
      await page.toggleLockDetails();
      await page.select(resource);
      expect(page.details.resource).toBe(resource);
      expect(page.lockDisplayDetail).toBeFalsy();
    });

    it("As LU, I should detail nothing when several resources are selected", async() => {
      await page.goToAllItems();
      await page.selectAll();
      expect(page.details.folder).toBeNull();
      expect(page.details.resource).toBeNull();
    });
  });

  describe("As LU I be able to follow a resource uri", () => {
    it("As LU I be able to follow a safe resource uri", () => {
      const resource = context.resources[0];
      jest.spyOn(window, 'open').mockImplementationOnce(() => {});
      page.goToResourceUri(resource.uri);
      expect(window.open).toHaveBeenCalledWith("https://passbolt.dev/", "_blank", "noopener,noreferrer");
    });

    it("As LU I not be able to follow an unsafe resource uri", () => {
      const resource = context.resources[0];
      resource.uri = "javascript://mars-attack";
      jest.spyOn(window, 'open').mockImplementationOnce(() => {});
      page.goToResourceUri(resource.uri);
      expect(window.open).toHaveBeenCalledTimes(0);
    });
  });

  describe("As LU I should be able to load resource columns setting", () => {
    it("As LU I should be able to load resource columns setting empty", async() => {
      expect.assertions(2);
      await page.goToAllItems();
      const defaultColumnsSetting = [
        {id: "favorite", label: "Favorite", position: 1, show: true},
        {id: "name", label: "Name", position: 2, show: true},
        {id: "username", label: "Username", position: 3, show: true},
        {id: "password", label: "Password", position: 4, show: true},
        {id: "totp", label: "TOTP", position: 5, show: true},
        {id: "uri", label: "URI", position: 6, show: true},
        {id: "modified", label: "Modified", position: 7, show: true}
      ];
      expect(page.columnsResourceSetting.items.length).toStrictEqual(7);
      expect(page.columnsResourceSetting.toDto()).toStrictEqual(defaultColumnsSetting);
    });

    it("As LU I should be able to load resource columns setting", async() => {
      expect.assertions(3);
      const columnsSetting = [
        {id: "favorite", label: "Favorite", position: 1, show: true},
        {id: "name", label: "Name", width: 200, position: 2, show: true},
        {id: "username", label: "Username", position: 3, show: false},
        {id: "password", label: "Password", width: 300, position: 4, show: true},
        {id: "totp", label: "TOTP", position: 5, width: 190, show: true},
        {id: "uri", label: "URI", position: 6, show: false},
        {id: "modified", label: "Modified", width: 250, position: 7, show: true}
      ];
      const sorter = {
        propertyName: 'name',
        asc: true
      };
      const gridSetting = {
        columns_setting: columnsSetting,
        sorter: sorter
      };
      mockContextRequest(context, path => {
        const isGridSettingRequest = path === "passbolt.resources.get-grid-setting";
        return isGridSettingRequest ? gridSetting : context.port.request;
      });
      await page.goToAllItems();
      await page.goToRootFolder();
      expect(page.columnsResourceSetting.items.length).toStrictEqual(7);
      expect(page.columnsResourceSetting.toDto()).toStrictEqual(columnsSetting);
      expect(page.sorter.toDto()).toStrictEqual(sorter);
    });
  });

  describe("As LU I should be able to show/hide a resource column", () => {
    it("As LU I should be able to show a resource column", async() => {
      expect.assertions(1);
      await page.goToAllItems();
      await page.onChangeColumnView("name", true);
      expect(page.columnsResourceSetting.items[1].show).toBeTruthy();
    });

    it("As LU I should be able to hide a resource column", async() => {
      expect.assertions(1);
      await page.goToAllItems();
      await page.onChangeColumnView("name", false);
      expect(page.columnsResourceSetting.items[1].show).toBeFalsy();
    });
  });

  describe("As LU I should be able to update the resource columns setting", () => {
    it("As LU I should be able to show a resource column", async() => {
      expect.assertions(2);
      const columnsSetting = [
        {id: "favorite", label: "Favorite", position: 1, width: 20},
        {id: "username", label: "Username", position: 2, width: 200},
        {id: "password", label: "Password", position: 3, width: 100},
        {id: "totp", label: "TOTP", position: 5, width: 190},
        {id: "uri", label: "URI", position: 4, width: 300},
        {id: "modified", label: "Modified", position: 5, width: 250}
      ];
      const mergedColumnsSetting = [
        {id: "favorite", label: "Favorite", position: 1, width: 20, show: true},
        {id: "name", label: "Name", position: 2, show: false},
        {id: "username", label: "Username", position: 2, width: 200, show: true},
        {id: "password", label: "Password", position: 3, width: 100, show: true},
        {id: "totp", label: "TOTP", position: 5, width: 190, show: true},
        {id: "uri", label: "URI", position: 4, width: 300, show: true},
        {id: "modified", label: "Modified", position: 5, width: 250, show: true}
      ];
      await page.goToAllItems();
      await page.onChangeColumnView("name", false);
      await page.onChangeColumnsSettings(columnsSetting);
      expect(page.columnsResourceSetting.length).toStrictEqual(7);
      expect(page.columnsResourceSetting.toDto()).toStrictEqual(mergedColumnsSetting);
    });
  });
});
