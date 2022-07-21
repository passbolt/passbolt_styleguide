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


import {
  defaultAppContext, defaultProps
} from "./FilterResourcesByShortcuts.test.data";
import FilterResourcesByShortcutsPage from "./FilterResourcesByShortcuts.test.page";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";

beforeEach(() => {
  jest.resetModules();
});

describe("See Resource FilterResourcesByShortcuts", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  describe(' As LU I can see the filter type selected', () => {
    /**
     * Given a selected filter type
     * And I should be able to identify the filter type selected
     */

    it('As LU I should see the filter by shortcuts', () => {
      const props = defaultProps(ResourceWorkspaceFilterTypes.ALL); // The props
      page = new FilterResourcesByShortcutsPage(context, props);
      expect(page.exists()).toBeTruthy();
    });

    it('I should be able to identify the filter all items', async() => {
      const props = defaultProps(ResourceWorkspaceFilterTypes.ALL); // The props
      page = new FilterResourcesByShortcutsPage(context, props);
      await page.selectItem(1);
      expect(page.itemSelected).toBe("All items");
      const pathname = '/app/passwords';
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.ALL
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });

    it('As LU I should be able to identify the filter owned by me', async() => {
      const props = defaultProps(ResourceWorkspaceFilterTypes.ITEMS_I_OWN); // The props
      page = new FilterResourcesByShortcutsPage(context, props);
      await page.selectItem(5);
      expect(page.itemSelected).toBe("Owned by me");
      const pathname = '/app/passwords';
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.ITEMS_I_OWN
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });

    it('I should be able to identify the filter favorite', async() => {
      const props = defaultProps(ResourceWorkspaceFilterTypes.FAVORITE); // The props
      page = new FilterResourcesByShortcutsPage(context, props);
      await page.selectItem(2);
      expect(page.itemSelected).toBe("Favorites");
      const pathname = '/app/passwords';
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.FAVORITE
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });

    it('I should be able to identify the filter recently modified', async() => {
      const props = defaultProps(ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED); // The props
      page = new FilterResourcesByShortcutsPage(context, props);
      await page.selectItem(3);
      expect(page.itemSelected).toBe("Recently modified");
      const pathname = '/app/passwords';
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });

    it('I should be able to identify the filter shared with me', async() => {
      const props = defaultProps(ResourceWorkspaceFilterTypes.SHARED_WITH_ME); // The props
      page = new FilterResourcesByShortcutsPage(context, props);
      await page.selectItem(4);
      expect(page.itemSelected).toBe("Shared with me");
      const pathname = '/app/passwords';
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.SHARED_WITH_ME
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });
  });
});
