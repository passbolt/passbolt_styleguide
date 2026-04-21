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

import { ActionFeedbackContext } from "../../../contexts/ActionFeedbackContext";
import { fireEvent, waitFor } from "@testing-library/react";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import DeleteUserWithConflictsPage from "./DeleteUserWithConflicts.test.page";
import { defaultContext, defaultProps } from "./DeleteUserWithConflicts.test.data";
import { users } from "../../../../shared/models/entity/user/userEntity.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Delete User Dialog", () => {
  let page, context, props, mockContextRequest;

  describe("As AD I can delete a user", () => {
    /**
     * Given a selected user
     * Then I should see the name of the user I can delete
     * Then I can delete it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      context = defaultContext(); // The applicative context
      props = defaultProps(); // The props to pass
      mockContextRequest = (context, implementation) =>
        jest.spyOn(context.port, "request").mockImplementation(implementation);
      page = new DeleteUserWithConflictsPage(context, props);
    });

    it("As AD I should know what user I am deleting", () => {
      expect(page.displayDeleteUserWithConflictsDialog.exists()).toBeTruthy();
      // title
      expect(page.displayDeleteUserWithConflictsDialog.dialogTitle).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.dialogTitle.textContent).toBe("You cannot delete this user!");
      // close button
      expect(page.displayDeleteUserWithConflictsDialog.closeButton).not.toBeNull();
      // submit button
      expect(page.displayDeleteUserWithConflictsDialog.saveButton).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.saveButton.textContent).toBe("Delete");
      // cancel button
      expect(page.displayDeleteUserWithConflictsDialog.cancelButton).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.cancelButton.textContent).toBe("Cancel");
      // user name
      const userA = users.ada;
      expect(page.displayDeleteUserWithConflictsDialog.userName.textContent).toBe(
        `${userA.profile.first_name} ${userA.profile.last_name}`,
      );
    });

    it("As AD I should see a toaster message after deleting a user", async () => {
      const userA = users.ada;
      const submitButton = page.displayDeleteUserWithConflictsDialog.saveButton;
      // Mock the request function to make it the expected result
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, "displaySuccess").mockImplementation(() => {});
      await page.displayDeleteUserWithConflictsDialog.click(submitButton);
      const permissionTransfer = {
        owners: [
          {
            aco_foreign_key: context.deleteUserWithConflictsDialogProps.errors.resources.sole_owner[0].id,
            id: context.deleteUserWithConflictsDialogProps.errors.resources.sole_owner[0].permissions[1].id,
          },
          {
            aco_foreign_key: context.deleteUserWithConflictsDialogProps.errors.folders.sole_owner[0].id,
            id: context.deleteUserWithConflictsDialogProps.errors.folders.sole_owner[0].permissions[1].id,
          },
        ],
        managers: [
          {
            group_id: context.deleteUserWithConflictsDialogProps.errors.groups.sole_manager[0].id,
            id: context.deleteUserWithConflictsDialogProps.errors.groups.sole_manager[0].groups_users[1].id,
          },
        ],
      };

      expect(context.port.request).toHaveBeenCalledWith("passbolt.users.delete", userA.id, permissionTransfer);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });

    it("As AD I should see a processing feedback while submitting the form", async () => {
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(
        () =>
          new Promise((resolve) => {
            updateResolve = resolve;
          }),
      );

      // Mock the request function to make it the expected result
      mockContextRequest(context, requestMockImpl);
      page.displayDeleteUserWithConflictsDialog.clickWithoutWaitFor(
        page.displayDeleteUserWithConflictsDialog.saveButton,
      );
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.displayDeleteUserWithConflictsDialog.hasCancelButtonDisabled()).toBeTruthy();
        expect(page.displayDeleteUserWithConflictsDialog.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.displayDeleteUserWithConflictsDialog.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it("As AD I should be able to cancel the operation by clicking on the close button", async () => {
      const closeButton = page.displayDeleteUserWithConflictsDialog.closeButton;

      await page.displayDeleteUserWithConflictsDialog.click(closeButton);
      expect(props.onClose).toBeCalled();
    });

    it("As AD I should be able to cancel the operation by clicking on the cancel button", async () => {
      const cancelButton = page.displayDeleteUserWithConflictsDialog.cancelButton;

      await page.displayDeleteUserWithConflictsDialog.click(cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it("As AD I should be able to cancel the edition with the keyboard (escape)", () => {
      // Escape key pressed event
      const escapeKeyDown = { keyCode: 27 };
      fireEvent.keyDown(page.displayDeleteUserWithConflictsDialog.dialogTitle, escapeKeyDown);

      expect(props.onClose).toBeCalled();
    });

    it("As LU I want to see a long resource/tag/folders name fitting its delete dialog", async () => {
      expect(page.displayDeleteUserWithConflictsDialog.userName.classList.contains("dialog-variable")).toBeTruthy();
    });

    it("Displays an error when the API call fail", async () => {
      const submitButton = page.displayDeleteUserWithConflictsDialog.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, "request").mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.displayDeleteUserWithConflictsDialog.click(submitButton);

      // Throw general error message
      expect(page.displayDeleteUserWithConflictsDialog.errorDialog).not.toBeNull();
      expect(page.displayDeleteUserWithConflictsDialog.errorDialogMessage).not.toBeNull();
    });
  });
});
