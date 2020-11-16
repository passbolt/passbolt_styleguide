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
 * Unit tests on SidebarTagFilterSection in regard of specifications
 */
import {defaultAppContext, defaultProps, tagsMock} from "./SidebarTagFilterSection.test.data";
import SidebarTagFilterSectionPage from "./SidebarTagFilterSection.test.page";
import MockPort from "../../../test/mock/MockPort";

beforeEach(() => {
  jest.resetModules();
});

describe("See tags", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe('As LU I see the tags of my resources', () => {
    const appContext = {
      port: new MockPort(),
      resources: [
        {
          tags: tagsMock
        },
        {
          tags: tagsMock
        }
      ],
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given an organization with 5 tags
     * Then I should see the 5 tags on the left sidebar
     * And I should see the tags sorted alphabetically
     * And I should be able to see each tag name
     */

    beforeEach(() => {
      page = new SidebarTagFilterSectionPage(context, props);
    });

    it('I should see the 5 tags made on the resource', () => {
      expect(page.sidebarTagFilterSection.exists()).toBeTruthy();
      expect(page.sidebarTagFilterSection.count()).toBe(5);
    });

    it('I should be able to identify each tag name', () => {
      expect(page.sidebarTagFilterSection.name(1)).toBe('#git');
      expect(page.sidebarTagFilterSection.name(2)).toBe('gpg');
      expect(page.sidebarTagFilterSection.name(3)).toBe('slug');
      expect(page.sidebarTagFilterSection.name(4)).toBe('test');
      expect(page.sidebarTagFilterSection.name(5)).toBe('there’s always something to look at if you open your eyes!');
    });

    it('As LU I filter the tags in the resources workspace primary sidebar by personal tag', async() => {
      await page.title.click(page.title.filterButton);
      expect(page.sidebarTagFilterSectionsContextualMenu.personalTagMenu.textContent).toBe("My tags");
      await page.sidebarTagFilterSectionsContextualMenu.click(page.sidebarTagFilterSectionsContextualMenu.personalTagMenu);
      expect(page.title.hyperlink.textContent).toBe("My tags");
      expect(page.sidebarTagFilterSection.count()).toBe(4);
    });

    it('As LU I filter the tags in the resources workspace primary sidebar by all tags', async() => {
      await page.title.click(page.title.filterButton);
      expect(page.sidebarTagFilterSectionsContextualMenu.allTagMenu.textContent).toBe("All tags");
      await page.sidebarTagFilterSectionsContextualMenu.click(page.sidebarTagFilterSectionsContextualMenu.allTagMenu);
      expect(page.title.hyperlink.textContent).toBe("Filter by tags");
      expect(page.sidebarTagFilterSection.count()).toBe(5);
    });

    it('As LU I filter the tags in the resources workspace primary sidebar by shared tag', async() => {
      await page.title.click(page.title.filterButton);
      expect(page.sidebarTagFilterSectionsContextualMenu.sharedTagMenu.textContent).toBe("Shared tags");
      await page.sidebarTagFilterSectionsContextualMenu.click(page.sidebarTagFilterSectionsContextualMenu.sharedTagMenu);
      expect(page.title.hyperlink.textContent).toBe("Shared tags");
      expect(page.sidebarTagFilterSection.count()).toBe(1);
    });

    it('As LU I should be able to start deleting a tag', async() => {
      await page.sidebarTagFilterSection.click(page.sidebarTagFilterSection.moreButton);
      expect(page.displayTagListContextualMenu.deleteGroupContextualMenu).not.toBeNull();
    });

    it('As LU I should be able to start editing a tag', async() => {
      await page.sidebarTagFilterSection.click(page.sidebarTagFilterSection.moreButton);
      expect(page.displayTagListContextualMenu.editGroupContextualMenu).not.toBeNull();
    });
  });

  describe('As LU I should see the tag section empty', () => {
    const appContext = {
      port: new MockPort(),
      resources: [
        {
          tags: []
        }
      ]
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given an organization with 0 tags
     * Then I should see the tag section empty
     */

    beforeEach(() => {
      page = new SidebarTagFilterSectionPage(context, props);
    });

    it('I should see the tags section empty', () => {
      expect(page.sidebarTagFilterSection.isEmpty()).toBeTruthy();
    });

    it('As LU I see an empty feedback if I’m member of no tag after filtering by personal tag', async() => {
      context.resources[0].tags = [tagsMock[2]];
      await page.title.click(page.title.filterButton);
      expect(page.sidebarTagFilterSection.isEmpty()).toBeFalsy();
      await page.sidebarTagFilterSectionsContextualMenu.click(page.sidebarTagFilterSectionsContextualMenu.personalTagMenu);
      expect(page.title.hyperlink.textContent).toBe("My tags");
      expect(page.sidebarTagFilterSection.isEmpty()).toBeTruthy();
    });

    it('As LU I see an empty feedback if I manage no tag after filtering by shared tag', async() => {
      context.resources[0].tags = [tagsMock[1]];
      await page.title.click(page.title.filterButton);
      expect(page.sidebarTagFilterSection.isEmpty()).toBeFalsy();
      await page.sidebarTagFilterSectionsContextualMenu.click(page.sidebarTagFilterSectionsContextualMenu.sharedTagMenu);
      expect(page.title.hyperlink.textContent).toBe("Shared tags");
      expect(page.sidebarTagFilterSection.isEmpty()).toBeTruthy();
    });
  });

  describe('As LU I see a loading feedback in the section when the tags are not yet fetched', () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given the tags section
     * And the tags are not loaded yet
     * Then I should see the loading message “Retrieving tags”
     */

    beforeEach(() => {
      page = new SidebarTagFilterSectionPage(context, props);
    });

    it('I should see the loading message “Retrieving tags”', async() => {
      expect(page.sidebarTagFilterSection.isLoading()).toBeTruthy();
    });
  });

  describe('As LU I shouldn’t be able to start deleting a shared tag', () => {
    const appContext = {
      port: new MockPort(),
      resources: [
        {
          tags: [tagsMock[2]]
        }
      ]
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given the tags section
     * Then I should’t see the delete tag menu for a shared tag
     */

    beforeEach(() => {
      page = new SidebarTagFilterSectionPage(context, props);
    });

    it('As LU I shouldn’t be able to start deleting a shared tag', async() => {
      expect(page.sidebarTagFilterSection.moreButton).toBeNull();
    });
  });
});
