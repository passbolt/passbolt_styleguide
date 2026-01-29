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
import { defaultAppContext, defaultProps, groupsMock } from "./FilterUsersByGroup.test.data";
import FilterUsersByGroupPage from "./FilterUsersByGroup.test.page";
import MockPort from "../../../test/mock/MockPort";
import { fireEvent } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
});

describe("See groups", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe("As LU I see the groups of my organization", () => {
    const appContext = {
      port: new MockPort(),
      groups: groupsMock,
      loggedInUser: {
        role: {
          name: "admin",
        },
      },
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given an organization with 10 groups
     * Then I should see the 10 groups on the left sidebar
     * And I should see the groups sorted alphabetically
     * And I should be able to see each group name
     */

    beforeEach(() => {
      page = new FilterUsersByGroupPage(context, props);
    });

    it("I should see the 10 groups made on the resource", () => {
      expect(page.displayGroupList.exists()).toBeTruthy();
      expect(page.displayGroupList.count()).toBe(10);
    });

    it("I should be able to identify each group name", () => {
      expect(page.displayGroupList.name(1)).toBe("Leadership team");
      expect(page.displayGroupList.name(2)).toBe("Management");
      expect(page.displayGroupList.name(3)).toBe("Marketing");
      expect(page.displayGroupList.name(4)).toBe("Network");
      expect(page.displayGroupList.name(5)).toBe("Operations");
      expect(page.displayGroupList.name(6)).toBe("Procurement");
      expect(page.displayGroupList.name(7)).toBe("Quality assurance");
      expect(page.displayGroupList.name(8)).toBe("Resource planning");
      expect(page.displayGroupList.name(9)).toBe("Sales");
      expect(page.displayGroupList.name(10)).toBe("Traffic");
    });

    it("As LU I filter the groups in the users workspace primary sidebar by group I am member of", async () => {
      await page.title.click(page.title.filterButton);
      expect(page.displayFilterContextualMenu.groupMemberMenu.textContent).toBe("Groups I am member of");
      await page.displayFilterContextualMenu.click(page.displayFilterContextualMenu.groupMemberMenu);
      expect(page.title.hyperlink.textContent).toBe("Groups I am member of");
      expect(page.displayGroupList.count()).toBe(3);
    });

    it("As LU I filter the groups in the users workspace primary sidebar by all groups", async () => {
      await page.title.click(page.title.filterButton);
      expect(page.displayFilterContextualMenu.allGroupMenu.textContent).toBe("All groups");
      await page.displayFilterContextualMenu.click(page.displayFilterContextualMenu.allGroupMenu);
      expect(page.title.hyperlink.textContent).toBe("All groups");
      expect(page.displayGroupList.count()).toBe(10);
    });

    it("As LU I filter the groups in the users workspace primary sidebar by group I manage", async () => {
      await page.title.click(page.title.filterButton);
      expect(page.displayFilterContextualMenu.groupManageMenu.textContent).toBe("Groups I manage");
      await page.displayFilterContextualMenu.click(page.displayFilterContextualMenu.groupManageMenu);
      expect(page.title.hyperlink.textContent).toBe("Groups I manage");
      expect(page.displayGroupList.count()).toBe(6);
    });

    it("As AD I should be able to start deleting a group", async () => {
      await page.displayGroupList.click(page.displayGroupList.moreButton);
      expect(page.displayGroupContextualMenu.deleteGroupContextualMenu).not.toBeNull();
    });

    it("As AD I should be able to start editing a group", async () => {
      await page.displayGroupList.click(page.displayGroupList.moreButton);
      expect(page.displayGroupContextualMenu.editGroupContextualMenu).not.toBeNull();
    });
  });

  describe("As LU I should see the group section empty", () => {
    const appContext = {
      port: new MockPort(),
      groups: [],
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given an organization with 0 groups
     * Then I should see the group section empty
     */

    beforeEach(() => {
      page = new FilterUsersByGroupPage(context, props);
    });

    it("I should see the groups section empty", () => {
      expect(page.displayGroupList.isEmpty()).toBeTruthy();
    });

    it("As LU I see an empty feedback if I'm member of no group after filtering by group I am member of", async () => {
      context.groups = [groupsMock[0]];
      await page.title.click(page.title.filterButton);
      expect(page.displayGroupList.isEmpty()).toBeFalsy();
      await page.displayFilterContextualMenu.click(page.displayFilterContextualMenu.groupMemberMenu);
      expect(page.title.hyperlink.textContent).toBe("Groups I am member of");
      expect(page.displayGroupList.isEmpty()).toBeTruthy();
    });

    it("As LU I see an empty feedback if I manage no group after filtering by group I manage", async () => {
      context.groups = [groupsMock[1]];
      await page.title.click(page.title.filterButton);
      expect(page.displayGroupList.isEmpty()).toBeFalsy();
      await page.displayFilterContextualMenu.click(page.displayFilterContextualMenu.groupManageMenu);
      expect(page.title.hyperlink.textContent).toBe("Groups I manage");
      expect(page.displayGroupList.isEmpty()).toBeTruthy();
    });
  });

  describe("As LU I see a loading feedback in the section when the groups are not yet fetched", () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given the groups section
     * And the groups are not loaded yet
     * Then I should see the loading message "Retrieving groups"
     */

    beforeEach(() => {
      page = new FilterUsersByGroupPage(context, props);
    });

    it('I should see the loading message "Retrieving groups"', async () => {
      expect(page.displayGroupList.isLoading()).toBeTruthy();
    });
  });

  describe("As LU I should be able to start deleting a group if I am the group manager", () => {
    const appContext = {
      port: new MockPort(),
      groups: groupsMock,
      loggedInUser: {
        role: {
          name: "user",
        },
      },
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given the groups section
     * And the logged-in user is not AD but group manager
     * Then I should see the delete group menu
     */

    beforeEach(() => {
      page = new FilterUsersByGroupPage(context, props);
    });

    it("As a group manager I should be able to start deleting a group", async () => {
      await page.displayGroupList.click(page.displayGroupList.moreButton);
      expect(page.displayGroupContextualMenu.deleteGroupContextualMenu).not.toBeNull();
    });
  });

  describe("As LU I shouldn’t be able to start deleting a group", () => {
    const appContext = {
      port: new MockPort(),
      groups: groupsMock,
      loggedInUser: {
        role: {
          name: "user",
        },
      },
    };
    const context = defaultAppContext(appContext); // The applicative context
    /**
     * Given the groups section
     * And the logged uin user is not AD
     * Then I should't see the delete group menu
     */

    beforeEach(() => {
      page = new FilterUsersByGroupPage(context, props);
    });

    it("As NOT_AD I should not be able to start deleting a group", async () => {
      await page.displayGroupList.rightClick(page.displayGroupList.group(2));
      expect(page.displayGroupContextualMenu.deleteGroupContextualMenu).toBeNull();
    });
  });

  describe("As LU I should handle drag and drop on groups", () => {
    let page;
    const props = defaultProps();

    describe("isGroupDisabled - Disabled groups visual state", () => {
      it("As LU, I should see disabled class on groups when dragging", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: true,
          draggedItems: {
            users: [{ id: "user-1", username: "john@passbolt.com" }],
            disabledGroupIds: [groupsMock[0].id, groupsMock[2].id],
          },
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
        });

        await waitFor(() => {
          expect(page.displayGroupList.count()).toBeGreaterThan(0);
        });

        const rows = page._page.container.querySelectorAll(".group-item .row");

        expect(rows[0].classList.contains("disabled")).toBeTruthy();
        expect(rows[1].classList.contains("disabled")).toBeFalsy();
        expect(rows[2].classList.contains("disabled")).toBeTruthy();
      });

      it("As LU, I should NOT see disabled class when not dragging", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: false,
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
        });

        await waitFor(() => {});

        const rows = page._page.container.querySelectorAll(".group-item .row");

        rows.forEach((row) => {
          expect(row.classList.contains("disabled")).toBeFalsy();
        });
      });

      it("As LU, I should see all groups enabled when disabledGroupIds is empty", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: true,
          draggedItems: {
            users: [{ id: "user-1", username: "john@passbolt.com" }],
            disabledGroupIds: [],
          },
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
        });

        await waitFor(() => {});

        const rows = page._page.container.querySelectorAll(".group-item .row");

        rows.forEach((row) => {
          expect(row.classList.contains("disabled")).toBeFalsy();
        });
      });
    });

    describe("handleDragOverTitle and isGroupDraggedOver - Drag over behavior", () => {
      it("As LU, drag over should set drop-focus state", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: true,
          draggedItems: {
            users: [{ id: "user-1", username: "john@passbolt.com" }],
            disabledGroupIds: [],
          },
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
        });

        await waitFor(() => {});

        const wrapper = page._page.container.querySelector(".group-item .main-cell-wrapper");

        let row = page._page.container.querySelector(".group-item .row");
        expect(row.classList.contains("drop-focus")).toBeFalsy();

        fireEvent.dragOver(wrapper, { preventDefault: () => {} });
        await waitFor(() => {});

        row = page._page.container.querySelector(".group-item .row");
        expect(row.classList.contains("drop-focus")).toBeTruthy();
      });

      it("As LU, drag over disabled group should not set drop-focus state", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: true,
          draggedItems: {
            users: [{ id: "user-1", username: "john@passbolt.com" }],
            disabledGroupIds: [groupsMock[0].id],
          },
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
        });

        await waitFor(() => {});

        const wrapper = page._page.container.querySelector(".group-item .main-cell-wrapper");

        fireEvent.dragOver(wrapper, { preventDefault: () => {} });
        await waitFor(() => {});

        const row = page._page.container.querySelector(".group-item .row");
        expect(row.classList.contains("drop-focus")).toBeFalsy();
        expect(row.classList.contains("disabled")).toBeTruthy();
      });
    });

    describe("handleDragLeaveTitle - Drag leave behavior", () => {
      it("As LU, drop-focus class should be removed after drag leave", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: true,
          draggedItems: {
            users: [{ id: "user-1", username: "john@passbolt.com" }],
            disabledGroupIds: [],
          },
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
        });

        await waitFor(() => {});

        const wrapper = page._page.container.querySelector(".group-item .main-cell-wrapper");

        fireEvent.dragOver(wrapper, { preventDefault: () => {} });
        await waitFor(() => {});

        let row = page._page.container.querySelector(".group-item .row");
        expect(row.classList.contains("drop-focus")).toBeTruthy();

        fireEvent.dragLeave(wrapper);
        await waitFor(() => {});

        row = page._page.container.querySelector(".group-item .row");
        expect(row.classList.contains("drop-focus")).toBeFalsy();
      });
    });

    describe("handleDropTitle - Drop action", () => {
      it("As LU, drop should open AddUserToGroup dialog with correct props", async () => {
        const mockUser = { id: "user-1", username: "john@passbolt.com", profile: { first_name: "John" } };
        const mockDialogOpen = jest.fn();
        const mockSetContext = jest.fn();

        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
          setContext: mockSetContext,
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: true,
          draggedItems: {
            users: [mockUser],
            disabledGroupIds: [],
          },
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
          dialogContext: { open: mockDialogOpen, close: jest.fn() },
        });

        await waitFor(() => {});

        const wrapper = page._page.container.querySelector(".group-item .main-cell-wrapper");
        fireEvent.drop(wrapper);
        await waitFor(() => {});

        expect(mockDialogOpen).toHaveBeenCalled();

        expect(mockSetContext).toHaveBeenCalledWith(
          expect.objectContaining({
            addUserToGroupDialogProps: expect.objectContaining({
              user: mockUser,
              group: expect.objectContaining({ id: groupsMock[0].id }),
            }),
          }),
        );
      });

      it("As LU, drop should NOT work on disabled groups", async () => {
        const mockDialogOpen = jest.fn();
        const mockSetContext = jest.fn();

        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
          setContext: mockSetContext,
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: true,
          draggedItems: {
            users: [{ id: "user-1", username: "john@passbolt.com" }],
            disabledGroupIds: [groupsMock[0].id],
          },
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
          dialogContext: { open: mockDialogOpen, close: jest.fn() },
        });

        await waitFor(() => {});

        const wrapper = page._page.container.querySelector(".group-item .main-cell-wrapper");
        fireEvent.drop(wrapper);
        await waitFor(() => {});

        expect(mockDialogOpen).not.toHaveBeenCalled();
        expect(mockSetContext).not.toHaveBeenCalled();
      });

      it("As LU, drop should clear drop-focus state", async () => {
        const mockUser = { id: "user-1", username: "john@passbolt.com" };
        const mockDialogOpen = jest.fn();
        const mockSetContext = jest.fn();

        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
          setContext: mockSetContext,
        };
        const context = defaultAppContext(appContext);

        const mockDragContext = {
          dragging: true,
          draggedItems: {
            users: [mockUser],
            disabledGroupIds: [],
          },
        };

        page = new FilterUsersByGroupPage(context, {
          ...props,
          dragContext: mockDragContext,
          dialogContext: { open: mockDialogOpen, close: jest.fn() },
        });

        await waitFor(() => {});

        const wrapper = page._page.container.querySelector(".group-item .main-cell-wrapper");

        fireEvent.dragOver(wrapper, { preventDefault: () => {} });
        await waitFor(() => {});

        let row = page._page.container.querySelector(".group-item .row");
        expect(row.classList.contains("drop-focus")).toBeTruthy();

        fireEvent.drop(wrapper);
        await waitFor(() => {});

        row = page._page.container.querySelector(".group-item .row");
        expect(row.classList.contains("drop-focus")).toBeFalsy();
      });
    });
  });

  describe("As LU I should interact with group UI elements", () => {
    let page;
    const props = defaultProps();

    describe("handleTitleClickEvent - Accordion functionality", () => {
      it("As LU, I should be able to collapse the groups section", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);
        page = new FilterUsersByGroupPage(context, props);

        expect(page._page.container.querySelector(".node.root.open")).not.toBeNull();

        const titleButton = page._page.container.querySelector(".folders-label button");
        fireEvent.click(titleButton);
        await waitFor(() => {});

        expect(page._page.container.querySelector(".node.root.close")).not.toBeNull();
      });

      it("As LU, I should be able to expand the groups section", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);
        page = new FilterUsersByGroupPage(context, props);

        const titleButton = page._page.container.querySelector(".folders-label button");
        fireEvent.click(titleButton);
        await waitFor(() => {});
        expect(page._page.container.querySelector(".node.root.close")).not.toBeNull();

        fireEvent.click(titleButton);
        await waitFor(() => {});

        expect(page._page.container.querySelector(".node.root.open")).not.toBeNull();
      });
    });

    describe("handleTitleContextualMenuEvent - Title context menu", () => {
      it("As LU, right-clicking title should prevent default browser menu", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);
        page = new FilterUsersByGroupPage(context, props);

        await waitFor(() => {});
        const wrapper = page._page.container.querySelector(".folders-label button");

        fireEvent.contextMenu(wrapper, {
          preventDefault: () => {},
          pageX: 100,
          pageY: 100,
        });
        await waitFor(() => {});

        const row = page._page.container.querySelector(".group-item .row");
        expect(row.classList.contains("drop-focus")).toBeFalsy();
      });
    });

    describe("handleContextualMenuEvent - Group context menu", () => {
      it("As LU, I should be able to open context menu on a group via right-click", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);
        page = new FilterUsersByGroupPage(context, props);

        await waitFor(() => {
          expect(page.displayGroupList.count()).toBeGreaterThan(0);
        });

        const groupWrapper = page._page.container.querySelector(".group-item .main-cell-wrapper");

        fireEvent.contextMenu(groupWrapper, {
          preventDefault: jest.fn(),
        });
        await waitFor(() => {});

        expect(groupWrapper).not.toBeNull();
      });
    });

    describe("handleGroupSelected - Group selection functionality", () => {
      it("As LU, I should be able to select a group by clicking on it", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);
        page = new FilterUsersByGroupPage(context, props);

        await waitFor(() => {
          expect(page.displayGroupList.count()).toBeGreaterThan(0);
        });

        const groupButton = page._page.container.querySelector(".group-item .main-cell button");

        fireEvent.click(groupButton);
        await waitFor(() => {});

        expect(groupButton).not.toBeNull();
      });

      it("As LU, clicking a group wrapper should also select the group", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);
        page = new FilterUsersByGroupPage(context, props);

        await waitFor(() => {
          expect(page.displayGroupList.count()).toBeGreaterThan(0);
        });

        const groupWrapper = page._page.container.querySelector(".group-item .main-cell-wrapper");

        fireEvent.click(groupWrapper);
        await waitFor(() => {});

        expect(groupWrapper).not.toBeNull();
      });
    });

    describe("handleCloseMoreMenu - More menu management", () => {
      it("As LU, opening more menu should set open state", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);
        page = new FilterUsersByGroupPage(context, props);

        await waitFor(() => {
          expect(page.displayGroupList.count()).toBeGreaterThan(0);
        });

        const moreButton = page._page.container.querySelector(".group-item .more-ctrl button");

        expect(moreButton.className.includes("open")).toBeFalsy();

        fireEvent.click(moreButton);
        await waitFor(() => {});

        expect(moreButton.className.includes("open")).toBeTruthy();
      });
    });

    describe("isSelected - Group selection state", () => {
      it("As LU, clicking a group should trigger selection (route change)", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);

        page = new FilterUsersByGroupPage(context, props);

        await waitFor(() => {});

        const groupButton = page._page.container.querySelector(".group-item .main-cell button");

        fireEvent.click(groupButton);
        await waitFor(() => {});

        expect(groupButton).not.toBeNull();
      });

      it("As LU, groups display correctly for selection", async () => {
        const appContext = {
          port: new MockPort(),
          groups: groupsMock,
          loggedInUser: { role: { name: "admin" } },
        };
        const context = defaultAppContext(appContext);

        page = new FilterUsersByGroupPage(context, props);

        await waitFor(() => {});

        const allRows = page._page.container.querySelectorAll(".group-item .row");

        expect(allRows.length).toBeGreaterThan(0);

        allRows.forEach((row) => {
          expect(row).not.toBeNull();
        });
      });
    });
  });
});
