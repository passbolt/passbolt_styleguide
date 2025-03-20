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
 * Unit tests on DisplayUsersWorkspaceFilterBar in regard of specifications
 */

import {UserWorkspaceFilterTypes} from "../../../contexts/UserWorkspaceContext";
import DisplayUsersWorkspaceFilterBarPage from "./DisplayUsersWorkspaceFilterBar.test.page";
import {defaultProps, propsFilterBySuspended} from "./DisplayUsersWorkspaceFilterBar.test.data";
import each from "jest-each";
import {waitForTrue} from "../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

describe("As a signed-in users I can see filters", () => {
  it('As LU I see the filter dropdown button', async() => {
    expect.assertions(4);
    const props = defaultProps();
    const page = new DisplayUsersWorkspaceFilterBarPage(props);
    await page.openDropdownFilterButton();
    expect(page.exists()).toBeTruthy();
    expect(page.dropdownFilterButton.textContent).toBe("All statuses");
    expect(page.filterSelected).toBeUndefined();
    expect(page.filterItemsLength).toBe(1);
  });

  it('As LU I should be able to remove filter', async() => {
    expect.assertions(3);
    const props = propsFilterBySuspended();
    const page = new DisplayUsersWorkspaceFilterBarPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.dropdownFilterButton).toBeNull();

    await page.removeSelectedFilter();

    const pathname = '/app/users';
    const state = {
      filter: {
        type: UserWorkspaceFilterTypes.ALL
      }
    };
    expect(props.history.push).toBeCalledWith({pathname, state});
  });

  each([
    {filter: UserWorkspaceFilterTypes.SUSPENDED_USER, itemSelected: "Suspended", itemIndex: 1},
  ]).describe("I should be able to filter", scenario => {
    it(`for: ${scenario.filter}`, async() => {
      expect.assertions(1);
      const props = defaultProps(); // The props
      const page = new DisplayUsersWorkspaceFilterBarPage(props);
      await waitForTrue(() => page.exists());

      await page.openDropdownFilterButton();
      await page.selectFilter(scenario.itemIndex);

      const pathname = scenario.pathname || '/app/users';
      const state = {
        filter: {
          type: scenario.filter
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });
  });

  each([
    {filter: UserWorkspaceFilterTypes.SUSPENDED_USER, itemSelected: "Suspended"},
  ]).describe("I should be able to identify the filters", scenario => {
    it(`for: ${scenario.filter}`, async() => {
      expect.assertions(2);
      const props = defaultProps({
        userWorkspaceContext: {
          filter: {
            type: scenario.filter
          }
        }
      }); // The props
      const page = new DisplayUsersWorkspaceFilterBarPage(props);
      await waitForTrue(() => page.exists());

      expect(page.filterSelected).toBe(scenario.itemSelected);
      expect(page.dropdownFilterButton).toBeNull();
    });
  });

  each([
    {filter: UserWorkspaceFilterTypes.NONE},
    {filter: UserWorkspaceFilterTypes.ALL},
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
      const page = new DisplayUsersWorkspaceFilterBarPage(props);
      await waitForTrue(() => page.exists());

      expect(page.dropdownFilterButton.textContent).toBe("All statuses");
      expect(page.filterSelected).toBeUndefined();
    });
  });
});
