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
 * Unit tests on DeleteGroupDialog in regard of specifications
 */

import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {fireEvent, waitFor} from "@testing-library/react";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import DeleteUserGroupWithConflictsPage from "./DeleteUserGroupWithConflicts.test.page";
import {
  defaultAppContext,
  defaultProps,
  mockFolders,
  mockGroup,
  mockResources
} from "./DeleteUserGroupWithConflicts.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Delete Group Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const deleteGroupWithConflictsDialogProps = {
    group: mockGroup,
    errors: {
      folders: {
        sole_owner: mockFolders
      },
      resources: {
        sole_owner: mockResources
      },
    }
  };

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As AD I can delete a group', () => {
    /**
     * Given a selected group
     * Then I should see the name of the group I can delete
     * Then I can delete it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      context.setContext({deleteGroupWithConflictsDialogProps});
      page = new DeleteUserGroupWithConflictsPage(context, props);
    });

    it('As AD I should know what group I am deleting', () => {
      expect(page.displayDeleteGroupWithConflictsDialog.exists()).toBeTruthy();
      // title
      expect(page.displayDeleteGroupWithConflictsDialog.dialogTitle).not.toBeNull();
      expect(page.displayDeleteGroupWithConflictsDialog.dialogTitle.textContent).toBe("You cannot delete this group!");
      // close button
      expect(page.displayDeleteGroupWithConflictsDialog.closeButton).not.toBeNull();
      // submit button
      expect(page.displayDeleteGroupWithConflictsDialog.saveButton).not.toBeNull();
      expect(page.displayDeleteGroupWithConflictsDialog.saveButton.textContent).toBe('Delete');
      // cancel button
      expect(page.displayDeleteGroupWithConflictsDialog.cancelButton).not.toBeNull();
      expect(page.displayDeleteGroupWithConflictsDialog.cancelButton.textContent).toBe('Cancel');
      // group name
      expect(page.displayDeleteGroupWithConflictsDialog.groupName.textContent).toBe(`${mockGroup.name}`);
    });

    it('As AD I should see a toaster message after deleting a group', async() => {
      const submitButton = page.displayDeleteGroupWithConflictsDialog.saveButton;
      // Mock the request function to make it the expected result
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {
      });

      await page.displayDeleteGroupWithConflictsDialog.click(submitButton);
      const permissionTransfer = {
        owners: [
          {aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a", id: "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c"},
          {aco_foreign_key: "f9f79749-4bce-4e61-8016-68c942a8f2d9", id: "640ebc06-5ec1-5322-a1ae-6120ed2f3a77"},
          {aco_foreign_key: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093", id: "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf"},
          {aco_foreign_key: "6592f71b-8874-5e91-bf6d-829b8ad188f5", id: "c5355878-fb96-5c21-8bb5-e8de4b24db8b"},
          {aco_foreign_key: "7ecd7376-8540-58c1-88d9-678c027d464a", id: "e8ffb030-09f5-54cd-ad64-68e3e983a3d4"}
        ]
      };
      expect(context.port.request).toHaveBeenCalledWith("passbolt.groups.delete", mockGroup.id, permissionTransfer);
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
      page.displayDeleteGroupWithConflictsDialog.clickWithoutWaitFor(page.displayDeleteGroupWithConflictsDialog.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.displayDeleteGroupWithConflictsDialog.cancelButtonDisabled).not.toBeNull();
        expect(page.displayDeleteGroupWithConflictsDialog.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.displayDeleteGroupWithConflictsDialog.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I should be able to cancel the operation by clicking on the close button', async() => {
      const closeButton = page.displayDeleteGroupWithConflictsDialog.closeButton;

      await page.displayDeleteGroupWithConflictsDialog.click(closeButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should be able to cancel the operation by clicking on the cancel button', async() => {
      const cancelButton = page.displayDeleteGroupWithConflictsDialog.cancelButton;

      await page.displayDeleteGroupWithConflictsDialog.click(cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should be able to cancel the edition with the keyboard (escape)', () => {
      // Escape key pressed event
      const escapeKeyDown = {keyCode: 27};
      fireEvent.keyDown(page.displayDeleteGroupWithConflictsDialog.dialogTitle, escapeKeyDown);

      expect(props.onClose).toBeCalled();
    });

    it('Displays an error when the API call fail', async() => {
      const submitButton = page.displayDeleteGroupWithConflictsDialog.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.displayDeleteGroupWithConflictsDialog.click(submitButton);

      // Throw general error message
      expect(page.displayDeleteGroupWithConflictsDialog.errorDialog).not.toBeNull();
      expect(page.displayDeleteGroupWithConflictsDialog.errorDialogMessage).not.toBeNull();
    });
  });
});
