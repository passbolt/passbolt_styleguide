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
import {defaultAppContext, defaultProps, mockGroup} from "./DeleteUserGroup.test.data";
import DeleteUserGroupPage from "./DeleteUserGroup.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See Delete Group Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const group = mockGroup();

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As AD I can delete a group', () => {
    /**
     * Given a selected group
     * Then I should see the name of the group I can delete
     * Then I can delete it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      context.setContext({deleteGroupDialogProps: {
        group
      }});
      page = new DeleteUserGroupPage(context, props);
    });

    it('As AD I should know what group I am deleting', () => {
      expect(page.displayDeleteGroupDialog.exists()).toBeTruthy();
      // title
      expect(page.displayDeleteGroupDialog.dialogTitle).not.toBeNull();
      expect(page.displayDeleteGroupDialog.dialogTitle.textContent).toBe("Delete group?");
      // close button
      expect(page.displayDeleteGroupDialog.closeButton).not.toBeNull();
      // submit button
      expect(page.displayDeleteGroupDialog.saveButton).not.toBeNull();
      expect(page.displayDeleteGroupDialog.saveButton.textContent).toBe('Delete');
      // cancel button
      expect(page.displayDeleteGroupDialog.cancelButton).not.toBeNull();
      expect(page.displayDeleteGroupDialog.cancelButton.textContent).toBe('Cancel');
      // user name
      expect(page.displayDeleteGroupDialog.groupName.textContent).toBe(`${group.name}`);
    });

    it('As AD I should see a toaster message after deleting a group', async() => {
      const submitButton = page.displayDeleteGroupDialog.saveButton;
      // Mock the request function to make it the expected result
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {
      });

      await page.displayDeleteGroupDialog.click(submitButton);
      expect(context.port.request).toHaveBeenCalledWith("passbolt.groups.delete", group.id);
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
      page.displayDeleteGroupDialog.clickWithoutWaitFor(page.displayDeleteGroupDialog.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.displayDeleteGroupDialog.hasCancelButtonDisabled()).toBeTruthy();
        expect(page.displayDeleteGroupDialog.saveButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.displayDeleteGroupDialog.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I should be able to cancel the operation by clicking on the close button', async() => {
      const closeButton = page.displayDeleteGroupDialog.closeButton;

      await page.displayDeleteGroupDialog.click(closeButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should be able to cancel the operation by clicking on the cancel button', async() => {
      const cancelButton = page.displayDeleteGroupDialog.cancelButton;

      await page.displayDeleteGroupDialog.click(cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should be able to cancel the edition with the keyboard (escape)', () => {
      // Escape key pressed event
      const escapeKeyDown = {keyCode: 27};
      fireEvent.keyDown(page.displayDeleteGroupDialog.dialogTitle, escapeKeyDown);

      expect(props.onClose).toBeCalled();
    });

    it('Displays an error when the API call fail', async() => {
      const submitButton = page.displayDeleteGroupDialog.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.displayDeleteGroupDialog.click(submitButton);

      // Throw general error message
      expect(page.displayDeleteGroupDialog.errorDialog).not.toBeNull();
      expect(page.displayDeleteGroupDialog.errorDialogMessage).not.toBeNull();
    });

    it('As LU I want to see a long  resource/tag/folders name fitting its delete dialog', async() => {
      expect(page.displayDeleteGroupDialog.tagName.classList.contains("dialog-variable")).toBeTruthy();
    });
  });
});
