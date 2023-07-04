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

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I can see a Breadcrumb", () => {
  /**
   * As LU I should see the breadcrumb
   * And I should be able to identify each item
   */
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  it('As LU I should see a breadcrumb for all items', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.ALL); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(1);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
  });

  it('As LU I should see a breadcrumb for a tag', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.TAG, {tag: {slug: "tag"}}); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("tag (tag)");
  });

  it('As LU I should see a breadcrumb for resources shared with me', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.SHARED_WITH_ME); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("Shared with me");
  });

  it('As LU I should see a breadcrumb for resources recently modified', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("Recently modified");
  });

  it('As LU I should see a breadcrumb for resources favorite', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.FAVORITE); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("Favorite");
  });

  it('As LU I should see a breadcrumb for resources I own', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.ITEMS_I_OWN); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("Items I own");
  });

  it('As LU I should see a breadcrumb for a folder', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.FOLDER, {folder: {name: "folder"}}); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("folder (folder)");
  });

  it('As LU I should see a breadcrumb for a group', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.GROUP, {group: {name: "group"}}); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("group (group)");
  });

  it('As LU I should see a breadcrumb for none filter', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.NONE); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(0);
  });

  it('As LU I should see a breadcrumb for the root folder', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.ROOT_FOLDER); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("root (folder)");
  });

  it('As LU I should see a breadcrumb for a search text', () => {
    const props = defaultResourceWorkspaceContext(ResourceWorkspaceFilterTypes.TEXT, "text"); // The props to pass
    page = new FilterResourcesByBreadcrumbPage(context, props);
    expect(page.displayBreadcrumb.exists()).toBeTruthy();
    expect(page.displayBreadcrumb.count).toBe(2);
    expect(page.displayBreadcrumb.item(1)).toBe("All items");
    expect(page.displayBreadcrumb.item(2)).toBe("Search: text");
  });
});
