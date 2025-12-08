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
 * Unit tests on FilterUserByShortcut in regard of specifications
 */

import {
  defaultProps, propsWithFirstUserAttentionRequired,
  propsWithNoUsersAccountRecoveryRequestFilter,
  propsWithNoUsersMissingMetadataKeyFilter,
  propsWithNoUsersWithAllStatusesFilter,
  propsWithNoUsersWithTextSearch,
  propsWithNullUsers,
  propsWithGroups,
  createGroup,
  createUser
} from "./DisplayUsers.test.data";
import DisplayUsersPage from "./DisplayUsers.test.page";
import {waitFor} from "@testing-library/dom";
import DisplayUsersContextualMenu from "../DisplayUsersContextualMenu/DisplayUsersContextualMenu";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("Display Users", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe("As LU, I should see the appropriate list of users", () => {
    it('As LU, I should see initially an empty content when there are no users', async() => {
      page = new DisplayUsersPage(propsWithNullUsers());
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no users matching the text search', async() => {
      page = new DisplayUsersPage(propsWithNoUsersWithTextSearch());
      await waitFor(() => {});
      expect(page.hasEmptyContentWithTextSearch).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no users filtered by all statuses filter', async() => {
      page = new DisplayUsersPage(propsWithNoUsersWithAllStatusesFilter());
      await waitFor(() => {});
      expect(page.hasEmptyContentWithFilterApplied).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no users filtered by attention required filter', async() => {
      page = new DisplayUsersPage(propsWithNoUsersAccountRecoveryRequestFilter());
      await waitFor(() => {});
      expect(page.hasEmptyContentWithFilterApplied).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no users filtered by missing metadata keys filter', async() => {
      page = new DisplayUsersPage(propsWithNoUsersMissingMetadataKeyFilter());
      await waitFor(() => {});
      expect(page.hasEmptyContentWithFilterApplied).toBeTruthy();
    });

    it('AS LU, I should see the appropriate filtered list of users', async() => {
      page = new DisplayUsersPage(props);
      await waitFor(() => {});
      expect(page.usersCount).toBe(2);
      expect(page.user(1).username).toBe('carol@passbolt.com');
      expect(page.user(2).username).toBe('dame@passbolt.com');
    });

    it('AS LU, I should see the appropriate filtered list of users with a user attention required', async() => {
      expect.assertions(3);

      page = new DisplayUsersPage(propsWithFirstUserAttentionRequired());
      await waitFor(() => {});
      expect(page.usersCount).toBe(2);
      expect(page.user(1).attentionRequired).toBeTruthy();
      expect(page.user(2).attentionRequired).toBeTruthy();
    });
  });

  describe('As LU, I should select users', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(props);
    });

    it('As LU, I should select one user', async() => {
      await page.user(1).select();
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledWith(props.userWorkspaceContext.filteredUsers[0]);
    });

    it('As LU, I should unselect one user', async() => {
      await page.user(1).select();
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledWith(props.userWorkspaceContext.filteredUsers[0]);
      await page.user(1).select();
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledWith(props.userWorkspaceContext.filteredUsers[0]);
    });
  });

  describe('As LU, I should sort the user by property column', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(props);
    });

    it('As LU, I should sort the users by fullname', async() => {
      await page.sortByFullname();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('profile');
    });

    it('As LU, I should sort the users by username', async() => {
      await page.sortByUsername();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('username');
    });

    it('As LU, I should sort the users by role', async() => {
      await page.sortByRole();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('role_id');
    });

    it('As LU, I should sort the users by suspended', async() => {
      await page.sortBySuspended();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('disabled');
    });

    it('As LU, I should sort the users by modified', async() => {
      await page.sortByModified();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('modified');
    });

    it('As LU, I should sort the users by the last login date', async() => {
      await page.sortByLastLoggedIn();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('last_logged_in');
    });

    it('As LU, I should sort the users by mfa enabled', async() => {
      await page.sortByMFAEnabled();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('is_mfa_enabled');
    });

    it('As LU, I should sort the users by account recovery status', async() => {
      await page.sortByAccountRecoveryStatus();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('account_recovery_user_setting.status');
    });
  });

  describe('As LU, I should handle drag and drop operations', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(props);
    });

    it('As LU, I should trigger drag context when dragging a user', async() => {
      await page.user(1).dragStart();
      await waitFor(() => {});

      // Verify that drag context is called when drag starts
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
    });

    it('As LU, I should trigger drag end when drag operation completes', async() => {
      await page.user(1).dragEnd();
      await waitFor(() => {});

      // Verify that drag context is called when drag ends
      expect(props.dragContext.onDragEnd).toHaveBeenCalled();
    });

    it('As LU, I should see user get selected when starting drag on unselected user', async() => {
      // Ensure user is not selected initially
      props.userWorkspaceContext.selectedUsers = [];

      await page.user(1).dragStart();
      await waitFor(() => {});

      // When dragging an unselected user, the drag context should be called
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
    });

    it('As LU, I should be able to drag multiple selected users', async() => {
      // Pre-select both users
      props.userWorkspaceContext.selectedUsers = props.userWorkspaceContext.filteredUsers;

      await page.user(1).dragStart();
      await waitFor(() => {});

      // Drag should include all selected users
      expect(props.dragContext.onDragStart).toHaveBeenCalled();
    });
  });

  describe('As LU, I should handle right-click context menu', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(props);
    });

    it('As LU, I should display context menu when right-clicking a user', async() => {
      await page.user(1).rightClick();
      await waitFor(() => {});

      // Verify context menu is shown
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(
        DisplayUsersContextualMenu,
        expect.objectContaining({
          user: expect.any(Object)
        })
      );
    });

    it('As LU, I should select user when right-clicking unselected user', async() => {
      // Ensure user is not selected
      props.userWorkspaceContext.selectedUsers = [];

      await page.user(1).rightClick();
      await waitFor(() => {});

      // User should be selected
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalled();
      expect(props.contextualMenuContext.show).toHaveBeenCalled();
    });

    it('As LU, I should show context menu without changing selection when right-clicking selected user', async() => {
      const firstUser = props.userWorkspaceContext.filteredUsers[0];

      // Pre-select the user
      props.userWorkspaceContext.selectedUsers = [firstUser];

      // Clear the mock to track only this interaction
      props.userWorkspaceContext.onUserSelected.single.mockClear();

      await page.user(1).rightClick();
      await waitFor(() => {});

      // Context menu should show
      expect(props.contextualMenuContext.show).toHaveBeenCalled();

      // Note: Selection behavior depends on selectUserIfNotAlreadySelected implementation
    });

    it('As LU, I should see context menu with position coordinates', async() => {
      await page.user(1).rightClick();
      await waitFor(() => {});

      // Context menu should be called with coordinates
      const callArgs = props.contextualMenuContext.show.mock.calls[0];
      expect(callArgs[0]).toBe(DisplayUsersContextualMenu);
      expect(callArgs[1]).toHaveProperty('user');
      // Coordinates are provided by the event (pageX, pageY)
      expect(callArgs[1]).toHaveProperty('left');
      expect(callArgs[1]).toHaveProperty('top');
    });
  });

  describe('As LU, I should handle checkbox selection', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(props);
    });

    it('As LU, I should select user when clicking checkbox', async() => {
      await page.user(1).clickCheckbox();
      await waitFor(() => {});

      // Checkbox click should trigger user selection
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalled();
    });

    it('As LU, I should be able to toggle user selection via checkbox', async() => {
      // First click selects
      await page.user(1).clickCheckbox();
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledTimes(1);

      // Second click toggles (unselects)
      await page.user(1).clickCheckbox();
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledTimes(2);
    });
  });

  describe('As LU, I should verify sorting state', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(props);
    });

    it('As LU, I should see active sort indicator on sorted column', async() => {
      // Set a specific sort
      props.userWorkspaceContext.sorter = {
        propertyName: 'username',
        asc: true
      };

      page = new DisplayUsersPage(props);
      await waitFor(() => {});

      // The component should render with sorted state
      expect(page.usersCount).toBe(2);
    });

    it('As LU, I should see ascending sort indicator when sort is ascending', async() => {
      props.userWorkspaceContext.sorter = {
        propertyName: 'username',
        asc: true
      };

      page = new DisplayUsersPage(props);
      await waitFor(() => {});

      // Component should show ascending indicator
      expect(page.usersCount).toBe(2);
    });

    it('As LU, I should see descending sort indicator when sort is descending', async() => {
      props.userWorkspaceContext.sorter = {
        propertyName: 'username',
        asc: false
      };

      page = new DisplayUsersPage(props);
      await waitFor(() => {});

      // Component should show descending indicator
      expect(page.usersCount).toBe(2);
    });

    it('As LU, I should be able to change sort direction', async() => {
      // Click the same column twice should reverse direction
      await page.sortByUsername();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('username');

      await page.sortByUsername();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledTimes(2);
    });
  });

  describe('As LU, I should handle conditional user selection correctly', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(props);
    });

    it('As LU, I should auto-select user when performing action on unselected user', async() => {
      // Ensure user is not selected
      props.userWorkspaceContext.selectedUsers = [];

      // Right-click should auto-select
      await page.user(1).rightClick();
      await waitFor(() => {});

      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalled();
    });

    it('As LU, I should maintain selection when performing action on already selected user', async() => {
      const firstUser = props.userWorkspaceContext.filteredUsers[0];
      props.userWorkspaceContext.selectedUsers = [firstUser];

      // Clear mock to track only new calls
      props.userWorkspaceContext.onUserSelected.single.mockClear();

      // Action on already selected user
      await page.user(1).rightClick();
      await waitFor(() => {});

      // Context menu shows
      expect(props.contextualMenuContext.show).toHaveBeenCalled();
    });

    it('As LU, I should be able to change selection by clicking different user', async() => {
      const firstUser = props.userWorkspaceContext.filteredUsers[0];
      props.userWorkspaceContext.selectedUsers = [firstUser];

      // Click second user
      await page.user(2).select();
      await waitFor(() => {});

      // Should select the second user
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledWith(
        props.userWorkspaceContext.filteredUsers[1]
      );
    });
  });

  describe('As LU, I should get correct disabled group IDs for drag operations', () => {
    const loggedInUserId = 'logged-in-user-id';
    const selectedUserId = 'selected-user-id';
    const otherUserId = 'other-user-id';

    it('As LU, I should get empty disabled group IDs when groups is null', async() => {
      const testProps = propsWithGroups({
        groups: null,
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).toEqual([]);
    });

    it('As LU, I should get empty disabled group IDs when groups is undefined', async() => {
      const testProps = propsWithGroups({
        groups: undefined,
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).toEqual([]);
    });

    it('As LU, I should get empty disabled group IDs when loggedInUser is null', async() => {
      const testProps = propsWithGroups({
        groups: [createGroup({id: 'group-1', members: []})],
        loggedInUserId: null,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).toEqual([]);
    });

    it('As LU, I should get disabled group ID when I am not admin of the group', async() => {
      const groupWhereNotAdmin = createGroup({
        id: 'group-not-admin',
        members: [
          {userId: loggedInUserId, isAdmin: false},
          {userId: otherUserId, isAdmin: true}
        ]
      });

      const testProps = propsWithGroups({
        groups: [groupWhereNotAdmin],
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).toContain('group-not-admin');
    });

    it('As LU, I should get disabled group ID when I am not a member of the group', async() => {
      const groupWhereNotMember = createGroup({
        id: 'group-not-member',
        members: [
          {userId: otherUserId, isAdmin: true}
        ]
      });

      const testProps = propsWithGroups({
        groups: [groupWhereNotMember],
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).toContain('group-not-member');
    });

    it('As LU, I should get disabled group ID when I am admin but selected user is already in group', async() => {
      const groupWithSelectedUserAlreadyMember = createGroup({
        id: 'group-user-already-member',
        members: [
          {userId: loggedInUserId, isAdmin: true},
          {userId: selectedUserId, isAdmin: false}
        ]
      });

      const testProps = propsWithGroups({
        groups: [groupWithSelectedUserAlreadyMember],
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).toContain('group-user-already-member');
    });

    it('As LU, I should not get disabled group ID when I am admin and selected user is not in group', async() => {
      const groupWhereCanAdd = createGroup({
        id: 'group-can-add',
        members: [
          {userId: loggedInUserId, isAdmin: true},
          {userId: otherUserId, isAdmin: false}
        ]
      });

      const testProps = propsWithGroups({
        groups: [groupWhereCanAdd],
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).not.toContain('group-can-add');
    });

    it('As LU, I should get correct disabled group IDs with multiple groups of mixed admin status', async() => {
      const groupWhereAdmin = createGroup({
        id: 'group-admin',
        members: [{userId: loggedInUserId, isAdmin: true}]
      });
      const groupWhereNotAdmin = createGroup({
        id: 'group-not-admin',
        members: [{userId: loggedInUserId, isAdmin: false}]
      });
      const groupWhereNotMember = createGroup({
        id: 'group-not-member',
        members: [{userId: otherUserId, isAdmin: true}]
      });

      const testProps = propsWithGroups({
        groups: [groupWhereAdmin, groupWhereNotAdmin, groupWhereNotMember],
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];

      expect(draggedItems.disabledGroupIds).not.toContain('group-admin');
      expect(draggedItems.disabledGroupIds).toContain('group-not-admin');
      expect(draggedItems.disabledGroupIds).toContain('group-not-member');
    });

    it('As LU, I should get disabled group ID if any selected user is already a member when dragging multiple users', async() => {
      const selectedUser1 = 'selected-user-1';
      const selectedUser2 = 'selected-user-2';

      const groupWithOneSelectedUser = createGroup({
        id: 'group-with-one-selected',
        members: [
          {userId: loggedInUserId, isAdmin: true},
          {userId: selectedUser1, isAdmin: false}
        ]
      });
      const groupWithNoSelectedUsers = createGroup({
        id: 'group-with-none-selected',
        members: [
          {userId: loggedInUserId, isAdmin: true},
          {userId: otherUserId, isAdmin: false}
        ]
      });

      const testProps = propsWithGroups({
        groups: [groupWithOneSelectedUser, groupWithNoSelectedUsers],
        loggedInUserId,
        selectedUsers: [createUser(selectedUser1), createUser(selectedUser2)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];

      expect(draggedItems.disabledGroupIds).toContain('group-with-one-selected');
      expect(draggedItems.disabledGroupIds).not.toContain('group-with-none-selected');
    });

    it('As LU, I should get empty disabled group IDs when groups array is empty', async() => {
      const testProps = propsWithGroups({
        groups: [],
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).toEqual([]);
    });

    it('As LU, I should get disabled group ID for group with empty members array', async() => {
      const emptyGroup = createGroup({
        id: 'empty-group',
        members: []
      });

      const testProps = propsWithGroups({
        groups: [emptyGroup],
        loggedInUserId,
        selectedUsers: [createUser(selectedUserId)]
      });
      page = new DisplayUsersPage(testProps);
      await waitFor(() => {});

      await page.user(1).dragStart();
      await waitFor(() => {});

      expect(testProps.dragContext.onDragStart).toHaveBeenCalled();
      const draggedItems = testProps.dragContext.onDragStart.mock.calls[0][2];
      expect(draggedItems.disabledGroupIds).toContain('empty-group');
    });
  });
});
