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
 * Unit tests on DeleteUserDialog in regard of specifications
 */

import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {fireEvent, waitFor} from "@testing-library/react";
import PassboltApiFetchError from "../../../../react/lib/Common/Error/PassboltApiFetchError";
import DeleteUserWithConflictsDialogTestPage from "./DeleteUserWithConflictsDialog.test.page";
import {
  defaultAppContext,
  defaultProps,
  mockFolders,
  mockGroups,
  mockResources,
  mockUser
} from "./DeleteUserWithConflictsDialog.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Delete User Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const deleteUserWithConflictsDialogProps = {
    user: mockUser,
    folders: mockFolders,
    resources: mockResources,
    groups: mockGroups,
  };

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As AD I can delete a user', () => {
    /**
     * Given a selected user
     * Then I should see the name of the user I can delete
     * Then I can delete it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      context.setContext({deleteUserWithConflictsDialogProps});
      page = new DeleteUserWithConflictsDialogTestPage(context, props);
    });

    it('As AD I should know what user I am deleting', () => {
      expect(page.displayDeleteUserWithConflictsDialog.exists()).toBeTruthy();
      // title
      expect(page.displayDeleteUserWithConflictsDialog.dialogTitle).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.dialogTitle.textContent).toBe("You cannot delete this user!");
      // close button
      expect(page.displayDeleteUserWithConflictsDialog.closeButton).not.toBeNull();
      // submit button
      expect(page.displayDeleteUserWithConflictsDialog.saveButton).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.saveButton.value).toBe('Delete');
      // cancel button
      expect(page.displayDeleteUserWithConflictsDialog.cancelButton).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.cancelButton.textContent).toBe('Cancel');
      // user name
      expect(page.displayDeleteUserWithConflictsDialog.userName.textContent).toBe(`You are about to delete ${mockUser.profile.first_name} ${mockUser.profile.last_name}.`);
    });

    it('As AD I should see a toaster message after deleting a user', async() => {
      const submitButton = page.displayDeleteUserWithConflictsDialog.saveButton;
      // Mock the request function to make it the expected result
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {
      });

      await page.displayDeleteUserWithConflictsDialog.click(submitButton);
      const permissionTransfer = {
        owners: [
          {aco_foreign_key: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093", id: "17336097-cd30-57ab-bc40-89b31bcc513f"},
          {aco_foreign_key: "6592f71b-8874-5e91-bf6d-829b8ad188f5", id: "875cb5d4-fa9a-57cb-908d-3721264e98b1"},
          {aco_foreign_key: "7ecd7376-8540-58c1-88d9-678c027d464a", id: "64e2a52c-2a3b-5a0d-88f9-4b6776fae07c"},
          {aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a", id: "6f65173d-a5e8-5014-9659-e1bb4f19707d"},
          {aco_foreign_key: "f9f79749-4bce-4e61-8016-68c942a8f2d9", id: "fa5f5d7a-32cc-4c5b-9478-f58584ca4222"}
        ],
        managers: [
          {group_id: "469edf9d-ca1e-5003-91d6-3a46755d5a50", id: "a932a3ce-82bc-59b6-ac4e-bf325435e534"}
        ],
      };
      expect(context.port.request).toHaveBeenCalledWith("passbolt.users.delete", mockUser.id, permissionTransfer);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });

    it('As AD I should see a processing feedback while submitting the form', async() => {
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      // Mock the request function to make it the expected result
      mockContextRequest(context, requestMockImpl);
      page.displayDeleteUserWithConflictsDialog.clickWithoutWaitFor(page.displayDeleteUserWithConflictsDialog.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.displayDeleteUserWithConflictsDialog.cancelButtonDisabled).not.toBeNull();
        expect(page.displayDeleteUserWithConflictsDialog.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.displayDeleteUserWithConflictsDialog.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I should be able to cancel the operation by clicking on the close button', async() => {
      const closeButton = page.displayDeleteUserWithConflictsDialog.closeButton;

      await page.displayDeleteUserWithConflictsDialog.click(closeButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should be able to cancel the operation by clicking on the cancel button', async() => {
      const cancelButton = page.displayDeleteUserWithConflictsDialog.cancelButton;

      await page.displayDeleteUserWithConflictsDialog.click(cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should be able to cancel the edition with the keyboard (escape)', () => {
      // Escape key pressed event
      const escapeKeyDown = {keyCode: 27};
      fireEvent.keyDown(page.displayDeleteUserWithConflictsDialog.dialogTitle, escapeKeyDown);

      expect(props.onClose).toBeCalled();
    });

    it('Displays an error when the API call fail', async() => {
      const submitButton = page.displayDeleteUserWithConflictsDialog.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.displayDeleteUserWithConflictsDialog.click(submitButton);

      // Throw general error message
      expect(page.displayDeleteUserWithConflictsDialog.errorDialog).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.errorDialogMessage).not.toBeNull();
    });
  });
});
