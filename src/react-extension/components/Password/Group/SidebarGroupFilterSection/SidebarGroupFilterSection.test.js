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
 * Unit tests on SidebarGroupFilterSection in regard of specifications
 */
import {defaultAppContext, defaultProps, groupsMock} from "./SidebarGroupFilterSection.test.data";
import SidebarGroupFilterSectionPage from "./SidebarGroupFilterSection.test.page";
import MockPort from "../../../../test/mock/MockPort";

beforeEach(() => {
  jest.resetModules();
});

describe("See groups", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe(' As LU I can see groups', () => {
    /**
     * Given a user belongs to 10 groups
     * Then I should see the 10 groups on the left sidebar
     * And I should see the groups sorted alphabetically
     * And I should be able to see each group name
     */

    beforeEach(() => {
      page = new SidebarGroupFilterSectionPage(context, props);
    });

    it('I should see the 10 groups made on the resource', () => {
      expect(page.displayGroupList.exists()).toBeTruthy();
      expect(page.displayGroupList.count()).toBe(9);
    });

    it('I should be able to identify each group name', () => {
      expect(page.displayGroupList.name(1)).toBe('Leadership team');
      expect(page.displayGroupList.name(2)).toBe('Management');
      expect(page.displayGroupList.name(3)).toBe('Marketing');
      expect(page.displayGroupList.name(4)).toBe('Operations');
      expect(page.displayGroupList.name(5)).toBe('Procurement');
      expect(page.displayGroupList.name(6)).toBe('Quality assurance');
      expect(page.displayGroupList.name(7)).toBe('Resource planning');
      expect(page.displayGroupList.name(8)).toBe('Sales');
      expect(page.displayGroupList.name(9)).toBe('Traffic');
    });

    it('I should be able to see the filtered group name selected', async() => {
      expect(page.displayGroupList.groupSelected()).not.toBeNull();
    });
  });

  describe(' As LU I shouldn\'t see the group section', () => {
    // force context to have no groups belongs to the user
    const appContext = {
      port: new MockPort(),
      groups: [groupsMock[3]]
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given a user belongs to 0 groups
     * Then I shouldn't see the group section
     */

    beforeEach(() => {
      page = new SidebarGroupFilterSectionPage(context, props);
    });

    it('I shouldn\'t see the groups section', () => {
      expect(page.displayGroupList.exists()).toBeFalsy();
    });
  });
});
