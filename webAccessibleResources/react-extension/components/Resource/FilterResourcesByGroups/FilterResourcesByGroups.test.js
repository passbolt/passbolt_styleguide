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
 * Unit tests on FilterResourcesByGroups in regard of specifications
 */
import {defaultProps, groupsMock} from "./FilterResourcesByGroups.test.data";
import SidebarGroupFilterSectionPage from "./FilterResourcesByGroups.test.page";
import MockPort from "../../../test/mock/MockPort";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";

beforeEach(() => {
  jest.resetModules();
});

describe("See groups", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe(' As LU I can see groups', () => {
    /**
     * Given a user belongs to 10 groups
     * Then I should see the 10 groups on the left sidebar
     * And I should see the groups sorted alphabetically
     * And I should be able to see each group name
     */

    beforeEach(() => {
      page = new SidebarGroupFilterSectionPage(props);
    });

    it('I should see the 10 groups made on the resource', async() => {
      await page.title.click();
      await page.title.click();
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
      await page.displayGroupList.click(page.displayGroupList.group(8));
      expect(page.displayGroupList.groupSelected).not.toBeNull();
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.GROUP,
          payload: {
            group: groupsMock[8]
          }
        }
      };
      const pathname = '/app/passwords';
      expect(props.history.push).toHaveBeenCalledWith({pathname, state});
    });
  });

  describe(' As LU I shouldn\'t see the group section', () => {
    // force context to have no groups belongs to the user
    const context = {
      context: {
        port: new MockPort(),
        groups: [groupsMock[3]]
      }
    };
    const props = defaultProps(context); // The props
    /**
     * Given a user belongs to 0 groups
     * Then I shouldn't see the group section
     */

    beforeEach(() => {
      page = new SidebarGroupFilterSectionPage(props);
    });

    it('I shouldn\'t see the groups section', () => {
      expect(page.displayGroupList.exists()).toBeFalsy();
    });
  });
});
