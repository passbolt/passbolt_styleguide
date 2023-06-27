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
 * Unit tests on TagEditDialog in regard of specifications
 */
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import EditResourceTagPage from "./EditResourceTag.test.page";
import {defaultAppContext, defaultProps} from "./EditResourceTag.test.data";

beforeEach(() => {
  jest.resetModules();
});
const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";

describe("See the Edit Tag Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const tagToEdit = {
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    slug: "tardis",
    is_shared: false
  };

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start editing a tag', () => {
    /**
     * I should see the tag edit dialog
     */
    beforeEach(() => {
      context.setContext({tagToEdit});
      page = new EditResourceTagPage(context, props);
    });

    it('matches the styleguide', async() => {
      // Dialog title exists and correct
      expect(page.tagEdit.exists()).toBeTruthy();
      expect(page.title.header.textContent).toBe("Edit tag");

      // Close button exists
      expect(page.tagEdit.dialogClose).not.toBeNull();

      // Name input field exists.
      expect(page.tagEdit.tagName.value).toBe(context.tagToEdit.slug);

      // Save button exists
      expect(page.tagEdit.saveButton.textContent).toBe("Save");

      // Cancel button exists
      expect(page.tagEdit.cancelButton.textContent).toBe("Cancel");
    });

    it('As LU I see a success toaster message after editing a tag with success', async() => {
      const slugUpdated = "tardis-updated";
      // check fields in the form
      expect(page.tagEdit.tagName.value).toBe(tagToEdit.slug);
      // Fill the form
      page.tagEdit.fillInput(page.tagEdit.tagName, slugUpdated);

      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const tagDto = {
        id: tagToEdit.id,
        slug: slugUpdated,
        is_shared: false,
      };

      await page.tagEdit.click(page.tagEdit.saveButton);

      expect(context.port.request).toHaveBeenCalledWith("passbolt.tags.update", tagDto);
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
      page.tagEdit.clickWithoutWaitFor(page.tagEdit.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.tagEdit.tagName.getAttribute("disabled")).not.toBeNull();
        expect(page.tagEdit.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.tagEdit.cancelButtonDisabled).not.toBeNull();
        expect(page.tagEdit.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As LU I shouldn’t be able to submit the form if there is an invalid field', async() => {
      expect(page.tagEdit.exists()).toBeTruthy();
      // empty the form
      page.tagEdit.fillInput(page.tagEdit.tagName, "");
      await page.tagEdit.click(page.tagEdit.saveButton);

      // Throw error message
      expect(page.tagEdit.tagNameErrorMessage.textContent).toBe("A tag name is required.");
    });

    it('As LU I can stop editing a user by clicking on the cancel button', async() => {
      expect(page.tagEdit.exists()).toBeTruthy();
      await page.tagEdit.click(page.tagEdit.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop editing a user by closing the dialog', async() => {
      expect(page.tagEdit.exists()).toBeTruthy();
      await page.tagEdit.click(page.tagEdit.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop adding a user with the keyboard (escape)', async() => {
      expect(page.tagEdit.exists()).toBeTruthy();
      await page.tagEdit.escapeKey(page.tagEdit.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.tagEdit.click(page.tagEdit.saveButton);

      // Throw general error message
      expect(page.tagEdit.errorDialog).not.toBeNull();
      expect(page.tagEdit.errorDialogMessage).not.toBeNull();
    });

    it("As a user I should see a feedback when name field content is truncated by a field limit", async() => {
      expect.assertions(1);
      page.tagEdit.fillInput(page.tagEdit.tagName, 'a'.repeat(255));
      await page.tagEdit.keyUpInput(page.tagEdit.tagName);
      expect(page.tagEdit.nameWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });
  });
});
