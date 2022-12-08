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
 * Unit tests on CreateUserDialog in regard of specifications
 */
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import EditUserPage from "./EditUser.test.page";
import {defaultAppContext, defaultProps} from "./EditUser.test.data";

beforeEach(() => {
  jest.resetModules();
});
const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";

describe("See the Create Dialog User", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const editUserDialogProps = {
    id: "8e3874ae-4b40-590b-968a-418f704b9d9a"
  };

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start adding a user', () => {
    /**
     * I should see the create user dialog
     */
    beforeEach(() => {
      context.setContext({editUserDialogProps});
      page = new EditUserPage(context, props);
    });

    it('As AD I see a success toaster message after editing a user with success', async() => {
      expect(page.editUser.exists()).toBeTruthy();
      // edit user
      const userMeta = {
        id: editUserDialogProps.id,
        profile: {
          first_name: "user",
          last_name: "admin",
        },
        is_admin: true,
      };
      // check fields in the form
      expect(page.editUser.firstName.value).toBe(context.users[0].profile.first_name);
      expect(page.editUser.lastName.value).toBe(context.users[0].profile.last_name);
      expect(page.editUser.email.value).toBe(context.users[0].username);
      // Fill the form
      page.editUser.fillInput(page.editUser.firstName, userMeta.profile.first_name);
      page.editUser.fillInput(page.editUser.lastName, userMeta.profile.last_name);
      await page.editUser.click(page.editUser.isAdmin);

      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const userDto = {
        id: editUserDialogProps.id,
        username: "firstname@passbolt.com",
        profile: {
          first_name: "user",
          last_name: "admin",
        },
        role_id: context.roles[0].id,
      };

      await page.editUser.click(page.editUser.saveButton);

      expect(context.port.request).toHaveBeenCalledWith("passbolt.users.update", userDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toBeCalled();
    });

    it('As AD I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      // Mock the request function to make it the expected result
      mockContextRequest(context, requestMockImpl);
      page.editUser.clickWithoutWaitFor(page.editUser.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.editUser.firstName.getAttribute("disabled")).not.toBeNull();
        expect(page.editUser.lastName.getAttribute("disabled")).not.toBeNull();
        expect(page.editUser.email.getAttribute("disabled")).not.toBeNull();
        expect(page.editUser.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.editUser.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I shouldn’t be able to submit the form if there is an invalid field', async() => {
      expect(page.editUser.exists()).toBeTruthy();
      // empty the form
      page.editUser.fillInput(page.editUser.firstName, "");
      page.editUser.fillInput(page.editUser.lastName, "");
      await page.editUser.click(page.editUser.saveButton);

      // Throw error message
      expect(page.editUser.firstNameErrorMessage.textContent).toBe("A first name is required.");
      expect(page.editUser.lastNameErrorMessage.textContent).toBe("A last name is required.");
    });

    it('As AD I can stop editing a user by clicking on the cancel button', async() => {
      expect(page.editUser.exists()).toBeTruthy();
      await page.editUser.click(page.editUser.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I can stop editing a user by closing the dialog', async() => {
      expect(page.editUser.exists()).toBeTruthy();
      await page.editUser.click(page.editUser.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I can stop adding a user with the keyboard (escape)', async() => {
      expect(page.editUser.exists()).toBeTruthy();
      await page.editUser.escapeKey(page.editUser.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.editUser.click(page.editUser.saveButton);

      // Throw general error message
      expect(page.editUser.errorDialog).not.toBeNull();
      expect(page.editUser.errorDialogMessage).not.toBeNull();
    });
    it("As a user I should see a feedback when firstname or lastname field content is truncated by a field limit", async() => {
      expect.assertions(2);
      page.editUser.fillInput(page.editUser.firstName, 'a'.repeat(128));
      page.editUser.fillInput(page.editUser.lastName, 'a'.repeat(128));

      await page.editUser.keyUpInput(page.editUser.firstName);
      await page.editUser.keyUpInput(page.editUser.lastName);

      expect(page.editUser.firstnameWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.editUser.lastnameWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });
  });
});
