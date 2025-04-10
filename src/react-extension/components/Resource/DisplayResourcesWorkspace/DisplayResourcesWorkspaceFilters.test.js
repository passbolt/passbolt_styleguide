/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

/**
 * Unit tests on FilterResourcesByBreadcrumb in regard of specifications
 */


import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import DisplayResourcesWorkspaceFiltersPage from "./DisplayResourcesWorkspaceFilters.test.page";
import {defaultProps, propsFilterByPrivate} from "./DisplayResourcesWorkspaceFilters.test.data";
import each from "jest-each";
import {waitForTrue} from "../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

describe("As a signed-in users I can see filters", () => {
  it('As LU I see the filter dropdown button', async() => {
    expect.assertions(4);
    const props = defaultProps();
    const page = new DisplayResourcesWorkspaceFiltersPage(props);
    await page.openDropdownFilterButton();
    expect(page.exists()).toBeTruthy();
    expect(page.dropdownFilterButton.textContent).toBe("All items");
    expect(page.filterSelected).toBeUndefined();
    expect(page.filterItemsLength).toBe(5);
  });

  it('As LU I should be able to remove filter', async() => {
    expect.assertions(3);
    const props = propsFilterByPrivate();
    const page = new DisplayResourcesWorkspaceFiltersPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.dropdownFilterButton).toBeNull();

    await page.removeSelectedFilter();

    const pathname = '/app/passwords';
    const state = {
      filter: {
        type: ResourceWorkspaceFilterTypes.ALL
      }
    };
    expect(props.history.push).toBeCalledWith({pathname, state});
  });

  each([
    {filter: ResourceWorkspaceFilterTypes.FAVORITE, itemSelected: "Starred", itemIndex: 1},
    {filter: ResourceWorkspaceFilterTypes.SHARED_WITH_ME, itemSelected: "Shared with me", itemIndex: 2},
    {filter: ResourceWorkspaceFilterTypes.ITEMS_I_OWN, itemSelected: "Items I own", itemIndex: 3},
    {filter: ResourceWorkspaceFilterTypes.PRIVATE, itemSelected: "Private", itemIndex: 4},
    {filter: ResourceWorkspaceFilterTypes.EXPIRED, itemSelected: "Expired", pathname: "/app/passwords/filter/expired", itemIndex: 5},
  ]).describe("I should be able to filter", scenario => {
    it(`for: ${scenario.filter}`, async() => {
      expect.assertions(1);
      const props = defaultProps(); // The props
      const page = new DisplayResourcesWorkspaceFiltersPage(props);
      await waitForTrue(() => page.exists());

      await page.openDropdownFilterButton();
      await page.selectFilter(scenario.itemIndex);

      const pathname = scenario.pathname || '/app/passwords';
      const state = {
        filter: {
          type: scenario.filter
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });
  });

  each([
    {filter: ResourceWorkspaceFilterTypes.FAVORITE, itemSelected: "Starred"},
    {filter: ResourceWorkspaceFilterTypes.SHARED_WITH_ME, itemSelected: "Shared with me"},
    {filter: ResourceWorkspaceFilterTypes.ITEMS_I_OWN, itemSelected: "Items I own"},
    {filter: ResourceWorkspaceFilterTypes.PRIVATE, itemSelected: "Private"},
    {filter: ResourceWorkspaceFilterTypes.EXPIRED, itemSelected: "Expired"},
  ]).describe("I should be able to identify the filters", scenario => {
    it(`for: ${scenario.filter}`, async() => {
      expect.assertions(2);
      const props = defaultProps({
        resourceWorkspaceContext: {
          filter: {
            type: scenario.filter
          }
        }
      }); // The props
      const page = new DisplayResourcesWorkspaceFiltersPage(props);
      await waitForTrue(() => page.exists());

      expect(page.filterSelected).toBe(scenario.itemSelected);
      expect(page.dropdownFilterButton).toBeNull();
    });
  });

  each([
    {filter: ResourceWorkspaceFilterTypes.NONE},
    {filter: ResourceWorkspaceFilterTypes.ALL},
    {filter: ResourceWorkspaceFilterTypes.ROOT_FOLDER},
    {filter: ResourceWorkspaceFilterTypes.GROUP},
    {filter: ResourceWorkspaceFilterTypes.TAG},
    {filter: ResourceWorkspaceFilterTypes.FOLDER},
  ]).describe("I should not see the filters button", scenario => {
    it(`for: ${scenario.filter}`, async() => {
      expect.assertions(2);
      const props = defaultProps({
        resourceWorkspaceContext: {
          filter: {
            type: scenario.filter
          }
        }
      }); // The props
      const page = new DisplayResourcesWorkspaceFiltersPage(props);
      await waitForTrue(() => page.exists());

      expect(page.dropdownFilterButton.textContent).toBe("All items");
      expect(page.filterSelected).toBeUndefined();
    });
  });
});
