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
 * Unit tests on EditUserGroup in regard of specifications
 */
import {defaultAppContext, defaultProps, mockGpgKey} from "./EditUserGroup.test.data";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import EditUserGroupTestPage from "./EditUserGroup.test.page";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Edit User Group", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  props.onClose = jest.fn();

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start adding a group', () => {
    let requestMock;
    beforeEach(async() => {
      const requestGpgMockImpl = jest.fn(() => mockGpgKey);
      requestMock = mockContextRequest(context, requestGpgMockImpl);
      page = new EditUserGroupTestPage(context, props);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('As AD I should change the name of the group', async() => {
      expect.assertions(3);
      expect(page.groupName).toBe("Leadership team");

      const newGroupName = "A different group name";
      page.groupName = newGroupName;

      await page.save();

      const [requestName, groupChanges] = requestMock.mock.calls[requestMock.mock.calls.length - 1];
      expect(requestName).toBe('passbolt.groups.update');
      expect(groupChanges.name).toBe(newGroupName);
    });

    it('As AD I should change the role of a group member', async() => {
      expect.assertions(3);
      expect(page.groupMember(2).role).toBe("Group Manager");

      page.groupMember(2).role = 1;

      await page.save();

      const [requestName, groupChanges] = requestMock.mock.calls[requestMock.mock.calls.length - 1];
      expect(requestName).toBe('passbolt.groups.update');
      expect(groupChanges.groups_users[1].is_admin).toBeFalsy();
    });

    it('As AD I should remove a user from a group', async() => {
      expect.assertions(3);
      expect(page.groupMembersCount).toBe(2);

      await page.removeGroupMember(1);
      await page.save();

      const [requestName, groupChanges] = requestMock.mock.calls[requestMock.mock.calls.length - 1];
      expect(requestName).toBe('passbolt.groups.update');
      expect(groupChanges.groups_users.length).toBe(1);
    });

    it('As non-GM I should not add a new user to the group', async() => {
      expect.assertions(1);
      // The current logged in user is not GM
      expect(page.canAdd).toBeFalsy();
    });

    it('AS GM I should add a new user to the group', async() => {
      expect.assertions(5);
      // Set the context in order the logged in user to be a group manager
      const propsWithGroupManager = defaultProps();
      propsWithGroupManager.userWorkspaceContext.groupToEdit.groups_users[0].user_id = context.loggedInUser.id;
      page = new EditUserGroupTestPage(context, propsWithGroupManager);
      await waitFor(() => {});

      expect(page.canAdd).toBeTruthy();

      await page.type('dame', page.usernameInput);
      jest.runOnlyPendingTimers();
      await waitFor(() => {});
      await page.click(page.getAutocompleteItem(0));

      expect(page.groupMembersCount).toBe(3);
      expect(page.groupMember(3).name).toBe("Dame Steve Shirley");

      await page.save();

      const [requestName, groupChanges] = requestMock.mock.calls[requestMock.mock.calls.length - 1];
      expect(requestName).toBe('passbolt.groups.update');
      expect(groupChanges.groups_users.length).toBe(3);
    });

    it('As AD I should see a processing feedback while submitting the form', async() => {
      let saveResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        saveResolve = resolve;
      }));
      mockContextRequest(context, requestMockImpl);

      page.saveWithoutWaitFor();

      await waitFor(() => {
        expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.cancelButton.classList.contains("disabled")).toBeTruthy();
        saveResolve();
      });
    });

    it('As AD I can stop editing a group by clicking on the cancel button', async() => {
      expect.assertions(1);
      await page.cancel();
      expect(props.onClose).toBeCalled();
    });

    it('As AD I can stop editing a group by closing the dialog', async() => {
      expect.assertions(1);
      await page.close();
      expect(props.onClose).toBeCalled();
    });


    it('As AD I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      expect.assertions(1);
      const error = new Error("Some error");
      mockContextRequest(context, () => Promise.reject(error));
      jest.spyOn(props.dialogContext, 'open').mockImplementation(() => {});
      await page.save();
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });

    it('As AD I should see an error message if the group name already exists', async() => {
      const existingGroupName = "An existing group name";
      page.groupName = existingGroupName;

      // Mock the request function to make it return an error.
      const mockSaveResult = {body: {name: {
        group_unique: "The group name test already exists."
      }}};

      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Could not validate group data.", mockSaveResult);
      });

      await page.save();

      await waitFor(() => expect(page.groupNameErrorMessage).toBe("The group name already exists."));
    });

    it('As AD I should see an error message when the editing group has no group manager anymore', async() => {
      expect.assertions(1);
      page.groupMember(1).role = 1;
      page.groupMember(2).role = 1;
      await waitFor(() => {});
      expect(page.hasNoManager).toBeTruthy();
    });
  });
});
