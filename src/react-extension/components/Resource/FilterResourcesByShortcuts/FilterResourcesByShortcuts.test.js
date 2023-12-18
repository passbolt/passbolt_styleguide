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
 * Unit tests on FilterResourcesByShortcuts in regard of specifications
 */

import {defaultProps} from "./FilterResourcesByShortcuts.test.data";
import FilterResourcesByShortcutsPage from "./FilterResourcesByShortcuts.test.page";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import each from "jest-each";
import {waitForTrue} from "../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

describe("See Resource FilterResourcesByShortcuts", () => {
  describe(' As LU I can see the filter type selected', () => {
    /**
     * Given a selected filter type
     * And I should be able to identify the filter type selected
     */
    it('As LU I should see the filter by shortcuts', () => {
      const props = defaultProps(); // The prop
      const page = new FilterResourcesByShortcutsPage(props);
      expect(page.exists()).toBeTruthy();
    });
  });

  each([
    {filter: ResourceWorkspaceFilterTypes.ALL, itemSelected: "All items", itemIndex: 1},
    {filter: ResourceWorkspaceFilterTypes.FAVORITE, itemSelected: "Favorites", itemIndex: 2},
    {filter: ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED, itemSelected: "Recently modified", itemIndex: 3},
    {filter: ResourceWorkspaceFilterTypes.SHARED_WITH_ME, itemSelected: "Shared with me", itemIndex: 4},
    {filter: ResourceWorkspaceFilterTypes.ITEMS_I_OWN, itemSelected: "Owned by me", itemIndex: 5},
    {filter: ResourceWorkspaceFilterTypes.EXPIRED, itemSelected: "Expired", pathname: "/app/passwords/filter/expired", itemIndex: 6},
  ]).describe("I should be able to identify the filters", scenario => {
    it(`for: ${scenario.filter}`, async() => {
      const props = defaultProps({
        resourceWorkspaceContext: {
          filter: {
            type: scenario.filter
          }
        }
      }); // The props
      const page = new FilterResourcesByShortcutsPage(props);
      await waitForTrue(() => page.exists());

      await page.selectItem(scenario.itemIndex);
      expect(page.itemSelected).toBe(scenario.itemSelected);
      const pathname = scenario.pathname || '/app/passwords';
      const state = {
        filter: {
          type: scenario.filter
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });
  });
});
