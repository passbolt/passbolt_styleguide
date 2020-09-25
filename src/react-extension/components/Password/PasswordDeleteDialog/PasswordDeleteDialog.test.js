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
 * Unit tests on DisplayComments in regard of specifications
 */


import {defaultAppContext, defaultPropsOneResource} from "./PasswordDeleteDialog.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PasswordDeleteDialogPage from "./PasswordDeleteDialogPage";
import {fireEvent} from "@testing-library/react";
import PassboltApiFetchError from "../../../../react/lib/Common/Error/PassboltApiFetchError";

beforeEach(() => {
  jest.resetModules();
});

describe("See Password Delete Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const propsOneResource = defaultPropsOneResource(); // The props to pass

  describe('As LU I can see the workspace menu with one resource selected owned', () => {
    /**
     * Given a selected resource
     * When I open the more menu
     * Then I should see the delete
     */

    beforeEach(() => {
      page = new PasswordDeleteDialogPage(context, propsOneResource);
    });

    it('As LU I should know what resource I am deleting', () => {
      expect(page.displayPasswordDeleteDialog.exists()).toBeTruthy();
      // title
      expect(page.displayPasswordDeleteDialog.dialogTitle).not.toBeNull();
      expect(page.displayPasswordDeleteDialog.dialogTitle.textContent).toBe("Delete password?");
      // close button
      expect(page.displayPasswordDeleteDialog.closeButton).not.toBeNull();
      // submit button
      expect(page.displayPasswordDeleteDialog.saveButton).not.toBeNull();
      expect(page.displayPasswordDeleteDialog.saveButton.value).toBe('Delete');
      // cancel button
      expect(page.displayPasswordDeleteDialog.cancelButton).not.toBeNull();
      expect(page.displayPasswordDeleteDialog.cancelButton.textContent).toBe('Cancel');
      // resource name
      expect(page.displayPasswordDeleteDialog.resourceName).not.toBeNull();
    });

    it('As LU I should see a toaster message after deleting a resource', async () => {
      const submitButton = page.displayPasswordDeleteDialog.saveButton;
      // Mock the request function to make it the expected result
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {
      });

      await page.displayPasswordDeleteDialog.click(submitButton);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });

    it('As LU I should be able to cancel the operation by clicking on the cancel button', async () => {
      const cancelButton = page.displayPasswordDeleteDialog.cancelButton;

      await page.displayPasswordDeleteDialog.click(cancelButton);
      expect(propsOneResource.onClose).toBeCalled();
    });

    it('As LU I should be able to cancel the edition with the keyboard (escape)', () => {
      // Escape key pressed event
      const escapeKeyDown = {keyCode: 27};
      fireEvent.keyDown(page.displayPasswordDeleteDialog.dialogTitle, escapeKeyDown);

      expect(propsOneResource.onClose).toBeCalled();
    });

    it('Displays an error when the API call fail', async () => {
      const submitButton = page.displayPasswordDeleteDialog.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.displayPasswordDeleteDialog.click(submitButton);

      // Throw general error message
      expect(page.displayPasswordDeleteDialog.errorDialog).not.toBeNull();
      expect(page.displayPasswordDeleteDialog.errorDialogMessage).not.toBeNull();
    });
  });
});
