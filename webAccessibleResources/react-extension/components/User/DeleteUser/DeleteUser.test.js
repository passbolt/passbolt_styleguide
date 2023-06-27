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
import DeleteUserPage from "./DeleteUser.test.page";
import {defaultAppContext, defaultProps, mockUser} from "./DeleteUser.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Delete User Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const user = mockUser();

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As AD I can delete a user', () => {
    /**
     * Given a selected user
     * Then I should see the name of the user I can delete
     * Then I can delete it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      context.setContext({deleteUserDialogProps: {user}});
      page = new DeleteUserPage(context, props);
    });

    it('As AD I should know what user I am deleting', () => {
      expect(page.displayDeleteUserDialog.exists()).toBeTruthy();
      // title
      expect(page.displayDeleteUserDialog.dialogTitle).not.toBeNull();
      expect(page.displayDeleteUserDialog.dialogTitle.textContent).toBe("Delete user?");
      // close button
      expect(page.displayDeleteUserDialog.closeButton).not.toBeNull();
      // submit button
      expect(page.displayDeleteUserDialog.saveButton).not.toBeNull();
      expect(page.displayDeleteUserDialog.saveButton.textContent).toBe('Delete');
      // cancel button
      expect(page.displayDeleteUserDialog.cancelButton).not.toBeNull();
      expect(page.displayDeleteUserDialog.cancelButton.textContent).toBe('Cancel');
      // user name
      expect(page.displayDeleteUserDialog.userName.textContent).toBe(`${user.profile.first_name} ${user.profile.last_name} (${user.username})`);
    });

    it('As AD I should see a toaster message after deleting a user', async() => {
      const submitButton = page.displayDeleteUserDialog.saveButton;
      // Mock the request function to make it the expected result
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {
      });

      await page.displayDeleteUserDialog.click(submitButton);
      expect(context.port.request).toHaveBeenCalledWith("passbolt.users.delete", user.id);
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
      page.displayDeleteUserDialog.clickWithoutWaitFor(page.displayDeleteUserDialog.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.displayDeleteUserDialog.hasCancelButtonDisabled()).toBeTruthy();
        expect(page.displayDeleteUserDialog.saveButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.displayDeleteUserDialog.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I should be able to cancel the operation by clicking on the close button', async() => {
      const closeButton = page.displayDeleteUserDialog.closeButton;

      await page.displayDeleteUserDialog.click(closeButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should be able to cancel the operation by clicking on the cancel button', async() => {
      const cancelButton = page.displayDeleteUserDialog.cancelButton;

      await page.displayDeleteUserDialog.click(cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should be able to cancel the edition with the keyboard (escape)', () => {
      // Escape key pressed event
      const escapeKeyDown = {keyCode: 27};
      fireEvent.keyDown(page.displayDeleteUserDialog.dialogTitle, escapeKeyDown);

      expect(props.onClose).toBeCalled();
    });

    it('Displays an error when the API call fail', async() => {
      const submitButton = page.displayDeleteUserDialog.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.displayDeleteUserDialog.click(submitButton);

      // Throw general error message
      expect(page.displayDeleteUserDialog.errorDialog).not.toBeNull();
      expect(page.displayDeleteUserDialog.errorDialogMessage).not.toBeNull();
    });
    it('As LU I want to see a long  resource/tag/folders name fitting its delete dialog', async() => {
      expect(page.displayDeleteUserDialog.userName.classList.contains("dialog-variable")).toBeTruthy();
    });
  });
});
