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
 * Unit tests on FilterResourcesByBreadcrumb in regard of specifications
 */


import {defaultAppContext, defaultResourceWorkspaceContext} from "./FilterResourcesByBreadcrumb.test.data";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import FilterResourcesByBreadcrumbPage from "./FilterResourcesByBreadcrumb.test.page";
import {createMemoryHistory} from "history";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I can see a Breadcrumb", () => {
  /**
   * As LU I should see the breadcrumb
   * And I should be able to identify each item
   */
  let page; // The page to test against
  const context = defaultAppContext({
    getHierarchyFolderCache: () => [{name: "subfolder_1", id: "1"}, {name: "subfolder_2", id: "2"}]
  }); // The applicative context

  it('As LU I should not see a breadcrumb when items are not loaded yet', () => {
    const resourceWorkspaceContext = {
      filter: {
        type: ResourceWorkspaceFilterTypes.NONE,
        payload: null
      },
      filteredResources: null
    };
    page = new FilterResourcesByBreadcrumbPage(context, resourceWorkspaceContext);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(0);
    expect(page.displayBreadcrumb.itemNumberDisplayed).toBeUndefined();
  });

  it('As LU I should see a breadcrumb for home', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.ALL, null, 10); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(1);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("10");
  });

  it('As LU I should see a breadcrumb for a tag', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.TAG, {tag: {slug: "tag"}}, 5); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.item(2)).toBe("tag (tag)");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("5");
  });

  it('As LU I should see a breadcrumb for resources shared with me', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.SHARED_WITH_ME); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.item(2)).toBe("Shared with me");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("0");
  });

  it('As LU I should see a breadcrumb for resources expired', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.EXPIRED); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.item(2)).toBe("Expired");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("0");
  });

  it('As LU I should see a breadcrumb for resources favorite', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.FAVORITE); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.item(2)).toBe("Favorite");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("0");
  });

  it('As LU I should see a breadcrumb for resources I own', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.ITEMS_I_OWN); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.item(2)).toBe("Items I own");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("0");
  });

  it('As LU I should see a breadcrumb for prvaite resources', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.PRIVATE); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.item(2)).toBe("Private");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("0");
  });

  it('As LU I should see a breadcrumb for a folder', async() => {
    const resourceWorkspaceContext = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.FOLDER, {folder: {name: "folder", id: "3"}}, 1); // The props to pass
    const history = createMemoryHistory();
    page = new FilterResourcesByBreadcrumbPage(context, resourceWorkspaceContext, history);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(4);
    expect(page.displayBreadcrumb.item(1)).toBe("My workspace");
    expect(page.displayBreadcrumb.item(2)).toBe("subfolder_1");
    expect(page.displayBreadcrumb.item(3)).toBe("subfolder_2");
    expect(page.displayBreadcrumb.item(4)).toBe("folder");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("1");
    // check if click on subfolder_1 call has the correct id
    await page.displayBreadcrumb.clickOnBreadCrumb(2);
    expect(history.location.pathname).toStrictEqual(`/app/folders/view/1`);
  });

  it('As LU I should see a breadcrumb for a group', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.GROUP, {group: {name: "group"}}, 100); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.item(2)).toBe("group (group)");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("100");
  });

  it('As LU I should see a breadcrumb for none filter', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.NONE); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(0);
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("0");
  });

  it('As LU I should see a breadcrumb for the root folder', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.ROOT_FOLDER); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(1);
    expect(page.displayBreadcrumb.item(1)).toBe("My workspace");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("0");
  });

  it('As LU I should see a breadcrumb for a search text', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.TEXT, "text", 3); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("Home");
    expect(page.displayBreadcrumb.item(2)).toBe("Search: text");
    expect(page.displayBreadcrumb.itemNumberDisplayed).toContain("3");
  });
});
