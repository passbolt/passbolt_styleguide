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
import {
  defaultProps,
  defaultPropsWithAttentionRequiredUsers,
  defaultPropsWithoutAttentionRequiredUsers,
  propsFilterBySuspended,
  propsWithAttentionRequiredUsersNotAdmin,
  propsWithAttentionRequiredUsersNotAdminWithRbacAllowed,
  propsWithUsersFilteredByAccountRecovery,
  propsWithUsersFilteredByMissingMetadata
} from "./DisplayUsersWorkspaceFilterBar.test.data";
import each from "jest-each";
import {waitForTrue} from "../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

describe("As a signed-in users I can see filters", () => {
  it('As LU I see the all statuses filter dropdown button', async() => {
    expect.assertions(4);
    const props = defaultProps();
    const page = new DisplayUsersWorkspaceFilterBarPage(props);
    await page.openDropdownFilterButton();
    expect(page.exists()).toBeTruthy();
    expect(page.dropdownFilterButton.textContent).toBe("All statuses");
    expect(page.filterSelected).toBeUndefined();
    expect(page.filterItemsLength).toBe(1);
  });

  describe("As a signed-in admin I can see attention required filter", () => {
    it('As LA I see the attention required request filter if there is a user in either one of the attention states', async() => {
      expect.assertions(7);
      const filterOptions = ['Account Recovery Requests', 'Missing Metadata Key'];
      const props = defaultPropsWithAttentionRequiredUsers();
      const page = new DisplayUsersWorkspaceFilterBarPage(props);

      await page.openAttentionRequiredFilterButton();
      await waitForTrue(() => page.exists());
      expect(page.exists()).toBeTruthy();
      expect(page.dropdownFilterButton.textContent).toBe("All statuses");
      expect(page.attentionRequiredFilterButton.textContent).toBe("Attention Required");
      expect(page.filterSelected).toBeUndefined();
      // checking the filter options
      expect(page.attentionFilterOptions.length).toBe(2);
      Array.from(page.attentionFilterOptions).map((el, index) => {
        expect(el.textContent).toBe(filterOptions[index]);
      });
    });
    it('As LA I do not see the attention required request filter if there are no users in either one of the attention states', async() => {
      expect.assertions(4);
      const props = defaultPropsWithoutAttentionRequiredUsers();
      const page = new DisplayUsersWorkspaceFilterBarPage(props);
      await waitForTrue(() => page.exists());
      expect(page.exists()).toBeTruthy();
      expect(page.dropdownFilterButton.textContent).toBe("All statuses");
      expect(page.attentionRequiredFilterButton).toBeUndefined();
      expect(page.filterSelected).toBeUndefined();
    });

    it('As LU I can see the attention required request filter if I am a user having rbac permission', async() => {
      expect.assertions(6);
      const props = propsWithAttentionRequiredUsersNotAdminWithRbacAllowed();
      const page = new DisplayUsersWorkspaceFilterBarPage(props);
      await waitForTrue(() => page.exists());
      await page.openAttentionRequiredFilterButton();
      expect(page.exists()).toBeTruthy();
      expect(page.dropdownFilterButton.textContent).toBe("All statuses");
      expect(page.attentionRequiredFilterButton.textContent).toBe("Attention Required");
      expect(page.filterSelected).toBeUndefined();
      // checking the filter options
      expect(page.attentionFilterOptions.length).toBe(1);
      expect(page.attentionFilterOptions[0].textContent).toBe("Account Recovery Requests");
    });

    it('As LU I do not see the attention required request filter if I am not an admin user', async() => {
      expect.assertions(4);
      const props = propsWithAttentionRequiredUsersNotAdmin();
      const page = new DisplayUsersWorkspaceFilterBarPage(props);
      await waitForTrue(() => page.exists());
      expect(page.exists()).toBeTruthy();
      expect(page.dropdownFilterButton.textContent).toBe("All statuses");
      expect(page.attentionRequiredFilterButton).toBeUndefined();
      expect(page.filterSelected).toBeUndefined();
    });
  });

  each([
    {filter: UserWorkspaceFilterTypes.SUSPENDED_USER, props: propsFilterBySuspended()},
    {filter: UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST, props: propsWithUsersFilteredByAccountRecovery()},
    {filter: UserWorkspaceFilterTypes.MISSING_METADATA_KEY, props: propsWithUsersFilteredByMissingMetadata()},

  ]).describe('As LU I should be able to remove filter', scenario => {
    it(`for:  ${scenario.filter}`, async() => {
      expect.assertions(4);
      const props = scenario.props;
      const page = new DisplayUsersWorkspaceFilterBarPage(props);

      expect(page.exists()).toBeTruthy();
      expect(page.dropdownFilterButton).toBeNull();
      expect(page.attentionRequiredFilterButton).toBeUndefined();

      await page.removeSelectedFilter();

      const pathname = '/app/users';
      const state = {
        filter: {
          type: UserWorkspaceFilterTypes.ALL
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });
  });

  each([
    {filter: UserWorkspaceFilterTypes.SUSPENDED_USER, itemSelected: "Suspended", itemIndex: 1, props: defaultProps(), button: 'openDropdownFilterButton'},
    {filter: UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST, itemSelected: "Account Recovery Requests", itemIndex: 1, props: defaultPropsWithAttentionRequiredUsers(), button: 'openAttentionRequiredFilterButton'}, // For Admins and user having rbac allowed only
    {filter: UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST, itemSelected: "Account Recovery Requests", itemIndex: 1, props: propsWithAttentionRequiredUsersNotAdminWithRbacAllowed(), button: 'openAttentionRequiredFilterButton'}, // For Admins and user having rbac allowed only
    {filter: UserWorkspaceFilterTypes.MISSING_METADATA_KEY, itemSelected: "Missing Metadata Key", itemIndex: 2, props: defaultPropsWithAttentionRequiredUsers(), button: 'openAttentionRequiredFilterButton'}, // For Admins only
  ]).describe("as LU I should be able to filter", scenario => {
    it(`for: ${scenario.filter}`, async() => {
      expect.assertions(1);
      const props = scenario.props; // The props
      const page = new DisplayUsersWorkspaceFilterBarPage(props);
      await waitForTrue(() => page.exists());

      await page[scenario.button]();
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
    {filter: UserWorkspaceFilterTypes.SUSPENDED_USER, itemSelected: "Suspended", props: defaultProps},
    {filter: UserWorkspaceFilterTypes.MISSING_METADATA_KEY, itemSelected: "Missing Metadata Key", props: defaultPropsWithAttentionRequiredUsers}, // For Admins only
    {filter: UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST, itemSelected: "Account Recovery Requests", props: defaultPropsWithAttentionRequiredUsers}, // For Admins and user having rbac allowed only
    {filter: UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST, itemSelected: "Account Recovery Requests", props: propsWithAttentionRequiredUsersNotAdminWithRbacAllowed}, // For Admins and user having rbac allowed only
  ]).describe("As LU I should be able to identify the filters", scenario => {
    it(`for: ${scenario.filter}`, async() => {
      expect.assertions(3);
      const props = scenario.props({
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
      expect(page.attentionRequiredFilterButton).toBeUndefined();
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
