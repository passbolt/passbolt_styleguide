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
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import DeleteUserWithConflictsPage from "./DeleteUserWithConflicts.test.page";
import {
  defaultAppContext,
  defaultProps,
  mockFoldersError,
  mockGroupsError,
  mockResourcesError,
  mockUsers
} from "./DeleteUserWithConflicts.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Delete User Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const deleteUserWithConflictsDialogProps = {
    user: mockUsers[0],
    errors: {
      folders: {
        sole_owner: mockFoldersError
      },
      resources: {
        sole_owner: mockResourcesError
      },
      groups: {
        sole_manager: mockGroupsError
      }
    }
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
      page = new DeleteUserWithConflictsPage(context, props);
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
      expect(page.displayDeleteUserWithConflictsDialog.saveButton.textContent).toBe('Delete');
      // cancel button
      expect(page.displayDeleteUserWithConflictsDialog.cancelButton).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.cancelButton.textContent).toBe('Cancel');
      // user name
      expect(page.displayDeleteUserWithConflictsDialog.userName.textContent).toBe(`${mockUsers[0].profile.first_name} ${mockUsers[0].profile.last_name}`);
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
          {aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a", id: "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c"},
          {aco_foreign_key: "f9f79749-4bce-4e61-8016-68c942a8f2d9", id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a77"},
          {aco_foreign_key: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093", id: "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf"},
          {aco_foreign_key: "6592f71b-8874-5e91-bf6d-829b8ad188f5", id: "c5355878-fb96-5c21-8bb5-e8de4b24db8b"},
          {aco_foreign_key: "7ecd7376-8540-58c1-88d9-678c027d464a", id: "e8ffb030-09f5-54cd-ad64-68e3e983a3d4"}
        ],
        managers: [
          {group_id: "469edf9d-ca1e-5003-91d6-3a46755d5a50", id: "a932a3ce-82bc-59b6-ac4e-bf325435e534"}
        ],
      };

      expect(context.port.request).toHaveBeenCalledWith("passbolt.users.delete", mockUsers[0].id, permissionTransfer);
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
        expect(page.displayDeleteUserWithConflictsDialog.hasCancelButtonDisabled()).toBeTruthy();
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

    it('As LU I want to see a long  resource/tag/folders name fitting its delete dialog', async() => {
      expect(page.displayDeleteUserWithConflictsDialog.userName.classList.contains("dialog-variable")).toBeTruthy();
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
