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
 * Unit tests on TagDeleteDialog in regard of specifications
 */
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import DeleteResourceTagPage from "./DeleteResourceTag.test.page";
import {defaultAppContext, defaultProps} from "./DeleteResourceTag.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Delete Tag Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const tagToDelete = {
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    slug: "tardis",
    is_shared: false
  };

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start deleting a tag', () => {
    /**
     * I should see the tag delete dialog
     */
    beforeEach(() => {
      context.setContext({tagToDelete});
      page = new DeleteResourceTagPage(context, props);
    });

    it('matches the styleguide', async() => {
      // Dialog title exists and correct
      expect(page.tagDelete.exists()).toBeTruthy();
      expect(page.title.header.textContent).toBe("Delete tag?");

      // Close button exists
      expect(page.tagDelete.dialogClose).not.toBeNull();

      // Name input field exists.
      expect(page.tagDelete.tagName.textContent).toBe(context.tagToDelete.slug);

      // Save button exists
      expect(page.tagDelete.saveButton.textContent).toBe("Delete");

      // Cancel button exists
      expect(page.tagDelete.cancelButton.textContent).toBe("Cancel");
    });

    it('As LU I see a success toaster message after deleting a tag with success', async() => {
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.tagDelete.click(page.tagDelete.saveButton);

      expect(context.port.request).toHaveBeenCalledWith("passbolt.tags.delete", tagToDelete.id);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      // Mock the request function to make it the expected result
      mockContextRequest(context, requestMockImpl);
      page.tagDelete.clickWithoutWaitFor(page.tagDelete.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.tagDelete.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.tagDelete.cancelButtonDisabled).not.toBeNull();
        expect(page.tagDelete.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As LU I can stop deleting a user by clicking on the cancel button', async() => {
      expect(page.tagDelete.exists()).toBeTruthy();
      await page.tagDelete.click(page.tagDelete.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop deleteing a user by closing the dialog', async() => {
      expect(page.tagDelete.exists()).toBeTruthy();
      await page.tagDelete.click(page.tagDelete.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop adding a user with the keyboard (escape)', async() => {
      expect(page.tagDelete.exists()).toBeTruthy();
      await page.tagDelete.escapeKey(page.tagDelete.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.tagDelete.click(page.tagDelete.saveButton);

      // Throw general error message
      expect(page.tagDelete.errorDialog).not.toBeNull();
      expect(page.tagDelete.errorDialogMessage).not.toBeNull();
    });
  });
});
