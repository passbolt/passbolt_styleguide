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
 * @since         5.7.0
 */

/**
 * Unit tests on RemoveUserFromGroupDialog in regard of specifications
 */
import { ActionFeedbackContext } from "../../../contexts/ActionFeedbackContext";
import { fireEvent, waitFor } from "@testing-library/react";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import RemoveUserFromGroupPage from "./RemoveUserFromGroup.test.page";
import { defaultAppContext, defaultProps, mockGroup, mockGroupDto, mockUser } from "./RemoveUserFromGroup.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Remove User From Group Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const user = mockUser();
  const group = mockGroup();

  const mockContextRequest = (context, implementation) =>
    jest.spyOn(context.port, "request").mockImplementation(implementation);

  describe("As AD I can remove a user from a group", () => {
    /**
     * Given a selected user
     * Then I should see the name of the user I can remove
     * Then I should see the group from which the user is removed
     * Then I can remove it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      context.setContext({
        removeUserFromGroupDialogProps: {
          user: user,
          group: group,
        },
      });
      page = new RemoveUserFromGroupPage(context, props);
    });

    it("As AD I should know what user I am removing", () => {
      expect.assertions(9);
      expect(page.displayRemoveUserFromGroupDialog.exists()).toBeTruthy();
      // title
      expect(page.displayRemoveUserFromGroupDialog.dialogTitle).not.toBeNull();
      expect(page.displayRemoveUserFromGroupDialog.dialogTitle.textContent).toBe("Remove user?");
      // close button
      expect(page.displayRemoveUserFromGroupDialog.closeButton).not.toBeNull();
      // submit button
      expect(page.displayRemoveUserFromGroupDialog.saveButton).not.toBeNull();
      expect(page.displayRemoveUserFromGroupDialog.saveButton.textContent).toBe("Remove");
      // cancel button
      expect(page.displayRemoveUserFromGroupDialog.cancelButton).not.toBeNull();
      expect(page.displayRemoveUserFromGroupDialog.cancelButton.textContent).toBe("Cancel");
      // user name
      expect(page.displayRemoveUserFromGroupDialog.getUser.textContent).toBe(
        `${user.profile.first_name} ${user.profile.last_name} (${user.username})`,
      );
    });

    it("As AD I should see a toaster message after removing a user from a group", async () => {
      expect.assertions(2);
      const submitButton = page.displayRemoveUserFromGroupDialog.saveButton;
      // Mock the request function to make it the expected result
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, "displaySuccess").mockImplementation(() => {});

      await page.displayRemoveUserFromGroupDialog.click(submitButton);
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
      page.displayRemoveUserFromGroupDialog.clickWithoutWaitFor(page.displayRemoveUserFromGroupDialog.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.displayRemoveUserFromGroupDialog.hasCancelButtonDisabled()).toBeTruthy();
        expect(page.displayRemoveUserFromGroupDialog.saveButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.displayRemoveUserFromGroupDialog.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it("As AD I should be able to cancel the operation by clicking on the close button", async () => {
      expect.assertions(1);
      const closeButton = page.displayRemoveUserFromGroupDialog.closeButton;

      await page.displayRemoveUserFromGroupDialog.click(closeButton);
      expect(props.onClose).toBeCalled();
    });

    it("As AD I should be able to cancel the operation by clicking on the cancel button", async () => {
      expect.assertions(1);
      const cancelButton = page.displayRemoveUserFromGroupDialog.cancelButton;

      await page.displayRemoveUserFromGroupDialog.click(cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it("As AD I should be able to cancel the edition with the keyboard (escape)", () => {
      expect.assertions(1);
      // Escape key pressed event
      const escapeKeyDown = { keyCode: 27 };
      fireEvent.keyDown(page.displayRemoveUserFromGroupDialog.dialogTitle, escapeKeyDown);

      expect(props.onClose).toBeCalled();
    });

    it("Displays an error when the API call fail", async () => {
      expect.assertions(2);
      const submitButton = page.displayRemoveUserFromGroupDialog.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, "request").mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.displayRemoveUserFromGroupDialog.click(submitButton);

      // Throw general error message
      expect(page.displayRemoveUserFromGroupDialog.errorDialog).not.toBeNull();
      expect(page.displayRemoveUserFromGroupDialog.errorDialogMessage).not.toBeNull();
    });

    it("As AD I want to see a user and group names fitting its remove dialog", async () => {
      expect.assertions(2);
      expect(page.displayRemoveUserFromGroupDialog.getUser.classList.contains("dialog-variable")).toBeTruthy();
      expect(page.displayRemoveUserFromGroupDialog.getGroup.classList.contains("dialog-variable")).toBeTruthy();
    });
  });
});
