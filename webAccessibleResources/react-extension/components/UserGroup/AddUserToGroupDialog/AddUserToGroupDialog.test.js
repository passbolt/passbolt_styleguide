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

/**
 * Unit tests on AddUserToGroupDialog in regard of specifications
 */
import { ActionFeedbackContext } from "../../../contexts/ActionFeedbackContext";
import { fireEvent, waitFor } from "@testing-library/react";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import { defaultAppContext, defaultProps, mockGroup, mockGroupDto, mockUser } from "./AddUserToGroupDialog.test.data";
import AddUserToGroupDialogPage from "./AddUserToGroupDialog.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See Add User To Group Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const user = mockUser();
  const group = mockGroup();

  const mockContextRequest = (context, implementation) =>
    jest.spyOn(context.port, "request").mockImplementation(implementation);

  describe("As AD I can add a user from a group", () => {
    /**
     * Given a selected user
     * Then I should see the name of the user I can add
     * Then I should see the group from which the user is addd
     * Then I can add it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      context.setContext({
        addUserToGroupDialogProps: {
          user: user,
          group: group,
        },
      });
      page = new AddUserToGroupDialogPage(context, props);
    });

    it("As AD I should know what user I am adding", () => {
      expect.assertions(9);
      expect(page.displayAddUserToGroupDialog.exists()).toBeTruthy();
      // title
      expect(page.displayAddUserToGroupDialog.dialogTitle).not.toBeNull();
      expect(page.displayAddUserToGroupDialog.dialogTitle.textContent).toBe("Add user?");
      // close button
      expect(page.displayAddUserToGroupDialog.closeButton).not.toBeNull();
      // submit button
      expect(page.displayAddUserToGroupDialog.saveButton).not.toBeNull();
      expect(page.displayAddUserToGroupDialog.saveButton.textContent).toBe("Add");
      // cancel button
      expect(page.displayAddUserToGroupDialog.cancelButton).not.toBeNull();
      expect(page.displayAddUserToGroupDialog.cancelButton.textContent).toBe("Cancel");
      // user name
      expect(page.displayAddUserToGroupDialog.getUser.textContent).toBe(
        `${user.profile.first_name} ${user.profile.last_name} (${user.username})`,
      );
    });

    it("As AD I should see a toaster message after adding a user from a group", async () => {
      expect.assertions(2);
      const submitButton = page.displayAddUserToGroupDialog.saveButton;
      // Mock the request function to make it the expected result
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, "displaySuccess").mockImplementation(() => {});

      await page.displayAddUserToGroupDialog.click(submitButton);
      expect(context.port.request).toHaveBeenCalledWith("passbolt.groups.update", mockGroupDto());
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });

    it("As AD I should see a processing feedback while submitting the form", async () => {
      expect.assertions(3);
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
      page.displayAddUserToGroupDialog.clickWithoutWaitFor(page.displayAddUserToGroupDialog.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.displayAddUserToGroupDialog.hasCancelButtonDisabled()).toBeTruthy();
        expect(page.displayAddUserToGroupDialog.saveButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.displayAddUserToGroupDialog.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it("As AD I should be able to cancel the operation by clicking on the close button", async () => {
      expect.assertions(1);
      const closeButton = page.displayAddUserToGroupDialog.closeButton;

      await page.displayAddUserToGroupDialog.click(closeButton);
      expect(props.onClose).toBeCalled();
    });

    it("As AD I should be able to cancel the operation by clicking on the cancel button", async () => {
      expect.assertions(1);
      const cancelButton = page.displayAddUserToGroupDialog.cancelButton;

      await page.displayAddUserToGroupDialog.click(cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it("As AD I should be able to cancel the edition with the keyboard (escape)", () => {
      expect.assertions(1);
      // Escape key pressed event
      const escapeKeyDown = { keyCode: 27 };
      fireEvent.keyDown(page.displayAddUserToGroupDialog.dialogTitle, escapeKeyDown);

      expect(props.onClose).toBeCalled();
    });

    it("Displays an error when the API call fail", async () => {
      expect.assertions(2);
      const submitButton = page.displayAddUserToGroupDialog.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, "request").mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.displayAddUserToGroupDialog.click(submitButton);

      // Throw general error message
      expect(page.displayAddUserToGroupDialog.errorDialog).not.toBeNull();
      expect(page.displayAddUserToGroupDialog.errorDialogMessage).not.toBeNull();
    });

    it("As AD I want to see a user and group names fitting its add dialog", async () => {
      expect.assertions(2);
      expect(page.displayAddUserToGroupDialog.getUser.classList.contains("dialog-variable")).toBeTruthy();
      expect(page.displayAddUserToGroupDialog.getGroup.classList.contains("dialog-variable")).toBeTruthy();
    });
  });
});
