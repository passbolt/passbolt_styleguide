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
 * Unit tests on SidebarGroupSection in regard of specifications
 */
import {defaultAppContext, defaultProps, groupsMock} from "./DisplayGroups.test.data";
import DisplayGroupsPage from "./DisplayGroups.test.page";
import MockPort from "../../../test/mock/MockPort";

beforeEach(() => {
  jest.resetModules();
});

describe("See groups", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe('As LU I see the groups of my organization', () => {
    const appContext = {
      port: new MockPort(),
      groups: groupsMock
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given an organization with 10 groups
     * Then I should see the 10 groups on the left sidebar
     * And I should see the groups sorted alphabetically
     * And I should be able to see each group name
     */

    beforeEach(() => {
      page = new DisplayGroupsPage(context, props);
    });

    it('I should see the 10 groups made on the resource', () => {
      expect(page.displayGroupList.exists()).toBeTruthy();
      expect(page.displayGroupList.count()).toBe(10);
    });

    it('I should be able to identify each group name', () => {
      expect(page.displayGroupList.name(1)).toBe('Leadership team');
      expect(page.displayGroupList.name(2)).toBe('Management');
      expect(page.displayGroupList.name(3)).toBe('Marketing');
      expect(page.displayGroupList.name(4)).toBe('Network');
      expect(page.displayGroupList.name(5)).toBe('Operations');
      expect(page.displayGroupList.name(6)).toBe('Procurement');
      expect(page.displayGroupList.name(7)).toBe('Quality assurance');
      expect(page.displayGroupList.name(8)).toBe('Resource planning');
      expect(page.displayGroupList.name(9)).toBe('Sales');
      expect(page.displayGroupList.name(10)).toBe('Traffic');
    });
  });

  describe(' As LU I should see the group section empty', () => {
    const appContext = {
      port: new MockPort(),
      groups: []
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given an organization with 0 groups
     * Then I should see the group section empty
     */

    beforeEach(() => {
      page = new DisplayGroupsPage(context, props);
    });

    it('I should see the groups section empty', () => {
      expect(page.displayGroupList.isEmpty()).toBeTruthy();
    });
  });

  describe('As LU I see a loading feedback in the section when the groups are not yet fetched', () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given the groups section
     * And the groups are not loaded yet
     * Then I should see the loading message “Retrieving groups”
     */

    beforeEach(() => {
      page = new DisplayGroupsPage(context, props);
    });

    it('I should see the loading message “Retrieving groups”', async() => {
      expect(page.displayGroupList.isLoading()).toBeTruthy();
    });
  });
});
