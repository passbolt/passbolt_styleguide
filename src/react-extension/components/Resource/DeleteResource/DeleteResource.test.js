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


import {defaultAppContext, defaultPropsOneResource} from "./DeleteResource.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import DeleteResourcePage from "./DeleteResource.test.page";
import {fireEvent, waitFor} from "@testing-library/react";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {defaultPropsMultipleResource} from "../DisplayResourcesWorkspace/DisplayResourcesWorkspaceMenu.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

describe("See Password Delete Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  describe('As LU I can delete one resource', () => {
    const propsOneResource = defaultPropsOneResource(); // The props to pass

    /**
     * Given a selected resource
     * Then I should see the name of the resource I can delete
     * Then I can delete it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      page = new DeleteResourcePage(context, propsOneResource);
    });

    it('As LU I should know what resource I am deleting', () => {
      expect.assertions(9);
      expect(page.deleteResourcePageObject.exists()).toBeTruthy();
      // title
      expect(page.deleteResourcePageObject.dialogTitle).not.toBeNull();
      expect(page.deleteResourcePageObject.dialogTitle.textContent).toBe("Delete password?");
      // close button
      expect(page.deleteResourcePageObject.closeButton).not.toBeNull();
      // submit button
      expect(page.deleteResourcePageObject.saveButton).not.toBeNull();
      expect(page.deleteResourcePageObject.saveButton.textContent).toBe('Delete');
      // cancel button
      expect(page.deleteResourcePageObject.cancelButton).not.toBeNull();
      expect(page.deleteResourcePageObject.cancelButton.textContent).toBe('Cancel');
      // resource name
      expect(page.deleteResourcePageObject.resourceName).not.toBeNull();
    });

    it('As LU I should see a toaster message after deleting a resource', async() => {
      const submitButton = page.deleteResourcePageObject.saveButton;
      // Mock the request function to make it the expected result
      expect.assertions(1);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(message => {
        expect(message).toBe("The password has been deleted successfull");
      });

      await page.deleteResourcePageObject.click(submitButton);
      // ensure that the process really finishes before leaving the unit test.
      await waitFor(() => {
        if (ActionFeedbackContext._currentValue.displaySuccess.mock.calls.length == 0) {
          throw new Error("Reousrce deletion didn't finish its process.");
        }
      });
    });

    it('As LU I should be able to cancel the operation by clicking on the cancel button', async() => {
      const cancelButton = page.deleteResourcePageObject.cancelButton;

      await page.deleteResourcePageObject.click(cancelButton);

      expect.assertions(1);
      expect(propsOneResource.onClose).toHaveBeenCalledTimes(1);
    });

    it('As LU I should be able to cancel the edition with the keyboard (escape)', () => {
      // Escape key pressed event
      const escapeKeyDown = {keyCode: 27};
      fireEvent.keyDown(page.deleteResourcePageObject.dialogTitle, escapeKeyDown);

      expect.assertions(1);
      expect(propsOneResource.onClose).toHaveBeenCalledTimes(1);
    });

    it('Displays an error when the API call fail', async() => {
      const submitButton = page.deleteResourcePageObject.saveButton;
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.deleteResourcePageObject.click(submitButton);

      // Throw general error message
      expect.assertions(2);
      expect(page.deleteResourcePageObject.errorDialog).not.toBeNull();
      expect(page.deleteResourcePageObject.errorDialogMessage).not.toBeNull();
    });

    it('As LU I want to see a long  resource/tag/folders name fitting its delete dialog', async() => {
      expect(page.deleteResourcePageObject.tagName.classList.contains("dialog-variable")).toBeTruthy();
    });
  });

  describe('As LU I can delete multiple resources', () => {
    const propsMultipleResource = defaultPropsMultipleResource(); // The props to pass

    /**
     * Given multiple selected resource
     * Then I can delete it
     * Then I should see a toaster message
     */

    beforeEach(() => {
      page = new DeleteResourcePage(context, propsMultipleResource);
    });

    it('As LU I should see a toaster message after deleting multiple resource', async() => {
      const submitButton = page.deleteResourcePageObject.saveButton;
      // Mock the request function to make it the expected result
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {
      });

      await page.deleteResourcePageObject.click(submitButton);
      expect.assertions(1);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledTimes(1);
    });
  });
});
