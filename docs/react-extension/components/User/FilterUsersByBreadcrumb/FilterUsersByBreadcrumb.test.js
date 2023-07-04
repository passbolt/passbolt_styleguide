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
 * Unit tests on FilterUserByShortcut in regard of specifications
 */

import FilterUsersByBreadcrumbPage from "./FilterUsersByBreadcrumb.test.page";
import {
  defaultAppContext, propsWithEmptyGroupNameFilter, propsWithEmptyTextFilter,
  propsWithFilter,
  propsWithGroupFilter,
  propsWithTextFilter
} from "./FilterUsersByBreadcrumb.test.data";
import {UserWorkspaceFilterTypes} from "../../../contexts/UserWorkspaceContext";
import {waitFor} from "@babel/core/lib/gensync-utils/async";

beforeEach(() => {
  jest.resetModules();
});

describe("Display User Workspace Breadcrumb", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  it('As LU, I should see "All Users" if the filter is set to All Users', async() => {
    page = new FilterUsersByBreadcrumbPage(context, propsWithFilter(UserWorkspaceFilterTypes.ALL));
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe('All users');
  });

  it('As LU, I should see "Recently Modified" if the filter is set to Recently Modified', async() => {
    page = new FilterUsersByBreadcrumbPage(context, propsWithFilter(UserWorkspaceFilterTypes.RECENTLY_MODIFIED));
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe('All users');
    expect(page.breadcrumbLabels(2)).toBe('Recently modified');
  });

  it('As LU, I should see the search text if the filter is set to an non-empty Text', async() => {
    page = new FilterUsersByBreadcrumbPage(context, propsWithTextFilter());
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe('All users');
    expect(page.breadcrumbLabels(2)).toBe('Search: Ada');
  });

  it('As LU, I should see All Users if the filter is set to an non-empty Text', async() => {
    page = new FilterUsersByBreadcrumbPage(context, propsWithEmptyTextFilter());
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe('All users');
    expect(page.breadcrumbLabels(2)).toBeUndefined();
  });

  it('As LU, I should see the group name if the filter is set to Group', async() => {
    page = new FilterUsersByBreadcrumbPage(context, propsWithGroupFilter());
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe('All users');
    expect(page.breadcrumbLabels(2)).toBe('My super group (group)');
  });

  it('As LU, I should see the N/A if the filter is set to Group and the group name is empty', async() => {
    page = new FilterUsersByBreadcrumbPage(context, propsWithEmptyGroupNameFilter());
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe('All users');
    expect(page.breadcrumbLabels(2)).toBe("N/A (group)");
  });
});

