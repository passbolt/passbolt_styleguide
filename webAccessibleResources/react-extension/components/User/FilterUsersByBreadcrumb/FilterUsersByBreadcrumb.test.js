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
  defaultAppContext,
  propsWithEmptyGroupNameFilter,
  propsWithEmptyTextFilter,
  propsWithFilter,
  propsWithGroupFilter,
  propsWithTextFilter,
} from "./FilterUsersByBreadcrumb.test.data";
import { UserWorkspaceFilterTypes } from "../../../contexts/UserWorkspaceContext";
import { waitFor } from "@babel/core/lib/gensync-utils/async";

beforeEach(() => {
  jest.resetModules();
});

describe("Display User Workspace Breadcrumb", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  it('As LU, I should see "Home" if the filter is set to All users', async () => {
    expect.assertions(3);
    page = new FilterUsersByBreadcrumbPage(context, propsWithFilter(UserWorkspaceFilterTypes.ALL));
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("Home");
    expect(page.itemNumberDisplayed).toContain("3");
  });

  it('As LU, I should see "Recently Modified" if the filter is set to Recently Modified', async () => {
    expect.assertions(3);
    page = new FilterUsersByBreadcrumbPage(context, propsWithFilter(UserWorkspaceFilterTypes.RECENTLY_MODIFIED));
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("Recently modified");
    expect(page.itemNumberDisplayed).toContain("3");
  });

  it('As LU, I should see "Suspended user" if the filter is set to Suspended user', async () => {
    expect.assertions(2);
    page = new FilterUsersByBreadcrumbPage(context, propsWithFilter(UserWorkspaceFilterTypes.SUSPENDED_USER));
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("Suspended users");
  });

  it('As LU, I should see users with attention state "Account Recovery Requests" if the filter is set to Account Recovery Requests', async () => {
    expect.assertions(2);
    page = new FilterUsersByBreadcrumbPage(context, propsWithFilter(UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST));
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("Account Recovery Requests");
  });

  it('As LU, I should see users with attention state "Missing Metadata Key" if the filter is set to Missing Metadata Key', async () => {
    expect.assertions(2);
    page = new FilterUsersByBreadcrumbPage(context, propsWithFilter(UserWorkspaceFilterTypes.MISSING_METADATA_KEY));
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("Missing Metadata Key");
  });

  it('As LU, I should see "Suspended user" if the filter is set to Suspended user', async () => {
    expect.assertions(2);
    page = new FilterUsersByBreadcrumbPage(context, propsWithFilter(UserWorkspaceFilterTypes.SUSPENDED_USER));
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("Suspended users");
  });

  it("As LU, I should see the search text if the filter is set to an non-empty Text", async () => {
    expect.assertions(3);
    page = new FilterUsersByBreadcrumbPage(context, propsWithTextFilter());
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("Search: Ada");
    expect(page.itemNumberDisplayed).toContain("1");
  });

  it("As LU, I should see All users if the filter is set to an non-empty Text", async () => {
    expect.assertions(3);
    page = new FilterUsersByBreadcrumbPage(context, propsWithEmptyTextFilter());
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBeUndefined();
    expect(page.itemNumberDisplayed).toContain("0");
  });

  it("As LU, I should see the group name if the filter is set to Group", async () => {
    expect.assertions(3);
    page = new FilterUsersByBreadcrumbPage(context, propsWithGroupFilter());
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("My super group (group)");
    expect(page.itemNumberDisplayed).toContain("6");
  });

  it("As LU, I should see the N/A if the filter is set to Group and the group name is empty", async () => {
    expect.assertions(3);
    page = new FilterUsersByBreadcrumbPage(context, propsWithEmptyGroupNameFilter());
    await waitFor(() => {});
    expect(page.breadcrumbLabels(1)).toBe("All users");
    expect(page.breadcrumbLabels(2)).toBe("N/A (group)");
    expect(page.itemNumberDisplayed).toContain("0");
  });
});
