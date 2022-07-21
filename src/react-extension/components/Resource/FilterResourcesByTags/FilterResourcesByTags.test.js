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
import {
  defaultAppContext,
  defaultProps,
  defaultResourceWorkspaceContext, resource,
  tagsMock
} from "./FilterResourcesByTags.test.data";
import FilterResourcesByTags from "./FilterResourcesByTags.test.page";
import MockPort from "../../../test/mock/MockPort";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";

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
    const resourceWorkspaceContext = defaultResourceWorkspaceContext();
    const requestMockImpl = jest.fn((message, data) => data);
    const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);
    mockContextRequest(context, requestMockImpl);
    /**
     * Given an organization with 5 tags
     * Then I should see the 5 tags on the left sidebar
     * And I should see the tags sorted alphabetically
     * And I should be able to see each tag name
     */

    beforeEach(() => {
      page = new FilterResourcesByTags(context, props, resourceWorkspaceContext);
    });

    it('As LU I should see the 5 tags made on the resource', () => {
      expect(page.sidebarTagFilterSection.exists()).toBeTruthy();
      expect(page.sidebarTagFilterSection.count()).toBe(5);
    });

    it('As LU I should be able to identify each tag name', () => {
      expect(page.sidebarTagFilterSection.name(1)).toBe('#git');
      expect(page.sidebarTagFilterSection.name(2)).toBe('gpg');
      expect(page.sidebarTagFilterSection.name(3)).toBe('slug');
      expect(page.sidebarTagFilterSection.name(4)).toBe('test');
      expect(page.sidebarTagFilterSection.name(5)).toBe('there’s always something to look at if you open your eyes!');
    });

    it('As LU I should be able to drop a resource on tag', async() => {
      await page.sidebarTagFilterSection.onDropTag(3);
      expect(context.port.request).toHaveBeenCalledWith("passbolt.tags.add-resources-tag", {"resources": [resource.id], "tag": tagsMock[1]});
    });

    it('As LU I should see tags disabled if a resource is dragging', async() => {
      await page.sidebarTagFilterSection.onDropTag(3);
      expect(page.sidebarTagFilterSection.tagClassname(1)).toBe('row  disabled');
      expect(page.sidebarTagFilterSection.tagClassname(2)).toBe('row');
      expect(page.sidebarTagFilterSection.tagClassname(3)).toBe('row');
      expect(page.sidebarTagFilterSection.tagClassname(4)).toBe('row selected');
      expect(page.sidebarTagFilterSection.tagClassname(5)).toBe('row');
    });

    it('As LU I should see an error dialog if the drop operation fails for an unexpected reason', async() => {
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.sidebarTagFilterSection.onDropTag(3);

      // Throw general error message
      expect(page.sidebarTagFilterSection.errorDialogExist).toBeTruthy();
      expect(page.sidebarTagFilterSection.errorDialogExist).toBeTruthy();
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
      expect(page.title.hyperlink.textContent).toBe("Tags");
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
      expect(page.displayTagListContextualMenu.deleteTagContextualMenu).not.toBeNull();
      await page.sidebarTagFilterSection.click(page.displayTagListContextualMenu.deleteTagContextualMenu);
    });

    it('As LU I should be able to start editing a tag', async() => {
      await page.sidebarTagFilterSection.rightClick(page.sidebarTagFilterSection.tag(2));
      expect(page.displayTagListContextualMenu.editTagContextualMenu).not.toBeNull();
      await page.sidebarTagFilterSection.click(page.displayTagListContextualMenu.editTagContextualMenu);
    });

    it('As LU I can select a tag in a resource’s tags', async() => {
      await page.sidebarTagFilterSection.click(page.sidebarTagFilterSection.tag(3));
      expect(props.history.push).toHaveBeenCalled();
    });

    it('Filter my resources tags by shared tags should filter my resources by All items if it was previously filtered with a personal tag', async() => {
      expect(page.sidebarTagFilterSection.tagSelected).not.toBeNull();
      await page.title.click(page.title.filterButton);
      await page.sidebarTagFilterSectionsContextualMenu.click(page.sidebarTagFilterSectionsContextualMenu.sharedTagMenu);
      const pathname = '/app/passwords';
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.ALL,
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
    });
  });

  describe('As LU I should filter by personal tag if it was previously filtered with a shared tag', () => {
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
    const resourceWorkspaceContext = {
      filter: {
        type: ResourceWorkspaceFilterTypes.TAG,
        payload: {
          tag: {
            id: "3"
          }
        }
      }
    };
    const context = defaultAppContext(appContext); // The applicative context
    const contextResource = defaultResourceWorkspaceContext(resourceWorkspaceContext); // The applicative context
    /**
     * Given an organization with 0 tags
     * Then I should see the tag section empty
     */

    beforeEach(() => {
      page = new FilterResourcesByTags(context, props, contextResource);
    });

    it('Filter my resources tags by personal tags should filter my resources by All items if it was previously filtered with a shared tag', async() => {
      expect(page.sidebarTagFilterSection.tagSelected).not.toBeNull();
      await page.sidebarTagFilterSection.click(page.title.filterButton);
      await page.sidebarTagFilterSectionsContextualMenu.click(page.sidebarTagFilterSectionsContextualMenu.personalTagMenu);
      const pathname = '/app/passwords';
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.ALL,
        }
      };
      expect(props.history.push).toBeCalledWith({pathname, state});
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
    const resourceWorkspaceContext = defaultResourceWorkspaceContext();
    /**
     * Given an organization with 0 tags
     * Then I should see the tag section empty
     */

    beforeEach(() => {
      page = new FilterResourcesByTags(context, props, resourceWorkspaceContext);
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
      page = new FilterResourcesByTags(context, props);
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
    const resourceWorkspaceContext = defaultResourceWorkspaceContext();
    /**
     * Given the tags section
     * Then I should’t see the delete tag menu for a shared tag
     */

    beforeEach(() => {
      page = new FilterResourcesByTags(context, props, resourceWorkspaceContext);
    });

    it('As LU I shouldn’t be able to start deleting a shared tag', async() => {
      expect(page.sidebarTagFilterSection.moreButton).toBeNull();
    });
  });
});
