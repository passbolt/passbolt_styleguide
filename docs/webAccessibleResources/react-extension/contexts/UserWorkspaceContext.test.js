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
 * Unit tests on UserWorkspaceContext in regard of specifications
 */


import {defaultAppContext, defaultProps} from "./UserWorkspaceContext.test.data";
import UserWorkspaceContextPage from "./UserWorkspaceContext.test.page";
import {UserWorkspaceFilterTypes} from "./UserWorkspaceContext";

beforeEach(() => {
  jest.resetModules();
});

describe("User Workspace Context", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new UserWorkspaceContextPage(context, props);
  });

  describe("As LU I should have the appropriate search filter at any time", () => {
    it("AS LU I should have an initial filter set to NONE", () => {
      expect(page.filter).toBeDefined();
      expect(page.filter.type).toBe(UserWorkspaceFilterTypes.NONE);
    });

    it("AS LU I should have an ALL ITEMS filter when I went to /app/users without filter", async() => {
      await page.goToAllUsers();
      expect(page.filter.type).toBe(UserWorkspaceFilterTypes.ALL);
    });

    it("AS LU I should have an RECENTLY-MODIFIED filter when I went to /app/users with such a filter", async() => {
      await page.goToRecentlyModified();
      expect(page.filter.type).toBe(UserWorkspaceFilterTypes.RECENTLY_MODIFIED);
    });

    it("AS LU I should have an TEXT filter when I went to /app/users with such a filter", async() => {
      await page.goToText("some text");
      expect(page.filter.type).toBe(UserWorkspaceFilterTypes.TEXT);
    });

    it("AS LU I should have an GROUP filter when I went to /app/users with such a filter", async() => {
      await page.goToGroup({id: '516c2db6-0aed-52d8-854f-b3f3499995e7'});
      expect(page.filter.type).toBe(UserWorkspaceFilterTypes.GROUP);
    });
  });

  describe("As LU I should have the appropriate search filtered results at any time", () => {
    it("AS LU I should have all users when the filter is ALL-ITEMS", async() => {
      await page.goToAllUsers();
      expect(page.filteredUsers).toBe(context.users);
    });

    it("AS LU I should have all resources all users when the filter is RECENTLY-MODIFIED", async() => {
      await page.goToRecentlyModified();
      expect(page.filteredUsers).toBe(context.users);
    });

    it.todo("AS LU I should have the most recent created resource when the filter is RECENTLY-MODIFIED");


    it("AS LU I should have users matching a text when the filter is TEXT", async() => {
      const expectedResourcesCount = 1;
      await page.goToText("frances");
      expect(page.filteredUsers).toHaveLength(expectedResourcesCount);
      expect(page.filteredUsers[0].profile.first_name).toBe("Frances");
      expect(page.filteredUsers[0].profile.last_name).toBe("Allen");
    });

    it("AS LU I should have users belonged to a group when the filter is GROUP", async() => {
      const expectedResourcesCount = 2;
      const leadershipTeamGroup = {id: "516c2db6-0aed-52d8-854f-b3f3499995e7"};
      await page.goToGroup(leadershipTeamGroup);
      expect(page.filteredUsers).toHaveLength(expectedResourcesCount);
    });
  });

  describe("As LU I should have the appropriate selected user at any time", () => {
    it("As LU I should have an initial set of selected users to empty", () => {
      expect(page.selectedUsers).toBeDefined();
      expect(page.selectedUsers).toHaveLength(0);
    });

    it("As LU I should have one selected user when the Single Selection event has been fired", async() => {
      await page.goToAllUsers();
      const userToSelect = context.users[0];
      page.select(userToSelect);
      expect(page.selectedUsers).toHaveLength(1);
      expect(page.selectedUsers[0]).toBe(userToSelect);
    });

    it("As LU I should have none selected user when the Single Selection event has been fired on a selected user", async() => {
      await page.goToAllUsers();
      const userToSelect = context.users[0];
      page.select(userToSelect);
      page.select(userToSelect);
      expect(page.selectedUsers).toHaveLength(0);
    });
  });

  describe("As LU I should have the appropriate details at any time", () => {
    it("As LU, I should detail a group when a group is selected as filter", async() => {
      const group = context.groups[0];
      await page.goToGroup(group);
      expect(page.details.group).toBe(group);
      expect(page.lockDisplayDetail).toBeTruthy();
    });

    it("As LU, I should detail a user when a user is selected", async() => {
      const user = context.users[0];
      await page.select(user);
      expect(page.details.user).toBe(user);
      expect(page.lockDisplayDetail).toBeTruthy();
    });

    it("As LU, I should detail nothing when the detail visibility lock is removed", async() => {
      const user = context.users[0];
      await page.toggleLockDetails();
      await page.select(user);
      expect(page.details.user).toBe(user);
      expect(page.lockDisplayDetail).toBeFalsy();
    });
  });
});
