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
 * @since         5.8.0
 */

import {
  mockUserFullProfile,
  mockUserFirstNameOnly,
  mockUserLastNameOnly,
  createMockUsers
} from "./DisplayDragUser.test.data";
import DisplayDragUserPage from "./DisplayDragUser.test.page";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DisplayDragUser", () => {
  describe("Single user selection", () => {
    it("renders with single user - full profile", () => {
      expect.assertions(3);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.messageText).toContain("John Doe");
      expect(page.hasCountBadge).toBe(false);
      expect(page.userAvatar).toBeTruthy();
    });

    it("displays full name with only first name", () => {
      expect.assertions(1);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFirstNameOnly]
        }
      });

      expect(page.messageText).toContain("Alice");
    });

    it("displays full name with only last name", () => {
      expect.assertions(1);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserLastNameOnly]
        }
      });

      expect(page.messageText).toContain("Johnson");
    });

    it("applies item-1 class for single selection", () => {
      expect.assertions(2);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.hasClass("item-1")).toBe(true);
      expect(page.hasClass("item-n")).toBe(false);
    });
  });

  describe("Multiple user selection", () => {
    it("renders with two users", () => {
      expect.assertions(2);

      const users = createMockUsers(2);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.messageText).toContain("FirstName0 LastName0");
      expect(page.countText).toBe("2");
    });

    it("renders with three users", () => {
      expect.assertions(2);

      const users = createMockUsers(3);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.countText).toBe("3");
      expect(page.hasClass("item-3")).toBe(true);
    });

    it("applies item-n class for more than three users", () => {
      expect.assertions(3);

      const users = createMockUsers(5);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.hasClass("item-n")).toBe(true);
      expect(page.hasClass("item-5")).toBe(false);
      expect(page.countText).toBe("5");
    });

    it("displays count badge for multiple users", () => {
      expect.assertions(2);

      const users = createMockUsers(2);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.hasCountBadge).toBe(true);
      expect(page.countText).toBe("2");
    });
  });

  describe("User count display", () => {
    it("displays exact count for less than 100 users", () => {
      expect.assertions(1);

      const users = createMockUsers(50);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.countText).toBe("50");
    });

    it("displays 99+ for 100 users", () => {
      expect.assertions(1);

      const users = createMockUsers(100);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.countText).toBe("99+");
    });

    it("displays 99+ for more than 100 users", () => {
      expect.assertions(1);

      const users = createMockUsers(250);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.countText).toBe("99+");
    });
  });

  describe("Avatar rendering", () => {
    it("always renders UserAvatar component", () => {
      expect.assertions(1);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.userAvatar).toBeTruthy();
    });

    it("passes correct user to UserAvatar component", () => {
      expect.assertions(1);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.avatarUsername).toBe("john.doe@passbolt.com");
    });

    it("passes correct baseUrl to UserAvatar component", () => {
      expect.assertions(1);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.avatarBaseUrl).toBe("https://passbolt.test");
    });

    it("applies drag-image class to avatar", () => {
      expect.assertions(1);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.avatarHasClass("drag-image")).toBe(true);
    });

    it("passes first selected user to UserAvatar when multiple users selected", () => {
      expect.assertions(1);

      const users = createMockUsers(3);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.avatarUsername).toBe("user0@passbolt.com");
    });
  });

  describe("Component structure", () => {
    it("renders message span with user info", () => {
      expect.assertions(2);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.messageElement).toBeTruthy();
      expect(page.messageText).toContain("John Doe");
    });

    it("renders drag-and-drop container", () => {
      expect.assertions(1);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.dragAndDropContainer).toBeTruthy();
    });

    it("renders count span only for multiple selections", () => {
      expect.assertions(2);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(page.hasCountBadge).toBe(false);

      page.rerender({
        userWorkspaceContext: {
          selectedUsers: createMockUsers(2)
        }
      });

      expect(page.hasCountBadge).toBe(true);
    });
  });

  describe("Context integration", () => {
    it("uses AppContext for userSettings", () => {
      expect.assertions(2);

      const mockGetTrustedDomain = jest.fn(() => "https://custom.domain.test");
      const testContext = {
        userSettings: {
          getTrustedDomain: mockGetTrustedDomain
        }
      };

      const page = new DisplayDragUserPage({
        context: testContext,
        userWorkspaceContext: {
          selectedUsers: [mockUserFullProfile]
        }
      });

      expect(mockGetTrustedDomain).toHaveBeenCalled();
      expect(page.avatarBaseUrl).toBe("https://custom.domain.test");
    });

    it("uses UserWorkspaceContext for selected users", () => {
      expect.assertions(1);

      const users = createMockUsers(3);

      const page = new DisplayDragUserPage({
        userWorkspaceContext: {
          selectedUsers: users
        }
      });

      expect(page.countText).toBe("3");
    });
  });
});
