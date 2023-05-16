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
  defaultContext,
  defaultProps, propsWithFirstUserAttentionRequired,
  propsWithNoUsersWithTextSearch,
  propsWithNullUsers
} from "./DisplayUsers.test.data";
import DisplayUsersPage from "./DisplayUsers.test.page";
import {waitFor} from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
});

describe("Display Users", () => {
  let page; // The page to test against
  const context = defaultContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe("As LU, I should see the appropriate list of users", () => {
    it('As LU, I should see initially an empty content when there are no users', async() => {
      page = new DisplayUsersPage(context, propsWithNullUsers());
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no users matching the text search', async() => {
      page = new DisplayUsersPage(context, propsWithNoUsersWithTextSearch());
      await waitFor(() => {});
      expect(page.hasEmptyContentWithTextSearch).toBeTruthy();
    });

    it('AS LU, I should see the appropriate filtered list of users', async() => {
      page = new DisplayUsersPage(context, props);
      await waitFor(() => {});
      expect(page.usersCount).toBe(2);
      expect(page.user(1).username).toBe('carol@passbolt.com');
      expect(page.user(2).username).toBe('dame@passbolt.com');
    });

    it('AS LU, I should see the appropriate filtered list of users with a user attention required', async() => {
      page = new DisplayUsersPage(context, propsWithFirstUserAttentionRequired());
      await waitFor(() => {});
      expect(page.usersCount).toBe(2);
      expect(page.user(1).attentionRequired).toBeTruthy();
    });
  });

  describe('As LU, I should select users', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(context, props);
    });

    it('As LU, I should select one user', async() => {
      jest.spyOn(props.userWorkspaceContext.onUserSelected, 'single').mockImplementationOnce(() => {});
      await page.user(1).select();
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledWith(props.userWorkspaceContext.filteredUsers[0]);
    });

    it('As LU, I should unselect one user', async() => {
      jest.spyOn(props.userWorkspaceContext.onUserSelected, 'single').mockImplementationOnce(() => {});
      await page.user(1).select();
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledWith(props.userWorkspaceContext.filteredUsers[0]);
      await page.user(1).select();
      expect(props.userWorkspaceContext.onUserSelected.single).toHaveBeenCalledWith(props.userWorkspaceContext.filteredUsers[0]);
    });
  });

  describe('As LU, I should sort the user by property column', () => {
    beforeEach(() => {
      page = new DisplayUsersPage(context, props);
    });

    it('As AD, I should sort the users by attention required', async() => {
      jest.spyOn(props.userWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByAttentionRequired();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('attentionRequired');
    });

    it('As LU, I should sort the users by fullname', async() => {
      jest.spyOn(props.userWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByFullname();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('name');
    });

    it('As LU, I should sort the users by username', async() => {
      jest.spyOn(props.userWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByUsername();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('username');
    });

    it('As LU, I should sort the users by role', async() => {
      jest.spyOn(props.userWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByRole();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('role.name');
    });

    it('As LU, I should sort the users by modified', async() => {
      jest.spyOn(props.userWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByModified();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('modified');
    });

    it('As LU, I should sort the users by the last login date', async() => {
      jest.spyOn(props.userWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByLastLoggedIn();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('last_logged_in');
    });

    it('As LU, I should sort the users by mfa enabled', async() => {
      jest.spyOn(props.userWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByMFAEnabled();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('is_mfa_enabled');
    });


    it('As LU, I should sort the users by account recovery status', async() => {
      jest.spyOn(props.userWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByAccountRecoveryStatus();
      expect(props.userWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('account_recovery_user_setting.status');
    });
  });
});


