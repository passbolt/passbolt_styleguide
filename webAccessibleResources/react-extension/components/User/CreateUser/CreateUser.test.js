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
 * Unit tests on CreateUser in regard of specifications
 */
import CreateUserPage from "./CreateUser.test.page";
import {defaultAppContext, defaultProps} from "./CreateUser.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
});
const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";

describe("See the Create Dialog User", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start adding a user', () => {
    /**
     * I should see the create user dialog
     */
    beforeEach(() => {
      page = new CreateUserPage(context, props);
    });

    it('As AD I see a success toaster message after adding a user with success', async() => {
      expect(page.createUser.exists()).toBeTruthy();
      // create user
      const userMeta = {
        profile: {
          first_name: "user",
          last_name: "admin",
        },
        username: "   admin@passbolt.com   ",
        is_admin: true,
      };
      // Fill the form
      page.createUser.fillInput(page.createUser.firstName, userMeta.profile.first_name);
      page.createUser.fillInput(page.createUser.lastName, userMeta.profile.last_name);
      page.createUser.fillInput(page.createUser.username, userMeta.username);
      await page.createUser.click(page.createUser.isAdmin);

      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const userDto = {
        profile: {
          first_name: "user",
          last_name: "admin",
        },
        username: "admin@passbolt.com",
        role_id: context.roles[0].id,
      };
      await page.createUser.click(page.createUser.saveButton);

      expect(context.port.request).toHaveBeenCalledWith("passbolt.users.create", userDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should see a processing feedback while submitting the form', async() => {
      // Fill the form
      page.createUser.fillInput(page.createUser.firstName, "firstname");
      page.createUser.fillInput(page.createUser.lastName, "lastname");
      page.createUser.fillInput(page.createUser.username, "user@passbolt.com");

      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      // Mock the request function to make it the expected result
      mockContextRequest(context, requestMockImpl);
      page.createUser.clickWithoutWaitFor(page.createUser.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.createUser.firstName.getAttribute("disabled")).not.toBeNull();
        expect(page.createUser.lastName.getAttribute("disabled")).not.toBeNull();
        expect(page.createUser.username.getAttribute("disabled")).not.toBeNull();
        expect(page.createUser.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.createUser.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I shouldn’t be able to submit the form if there is an invalid field', async() => {
      expect(page.createUser.exists()).toBeTruthy();
      await page.createUser.click(page.createUser.saveButton);

      // Throw error message
      expect(page.createUser.firstNameErrorMessage.textContent).toBe("A first name is required.");
      expect(page.createUser.lastNameErrorMessage.textContent).toBe("A last name is required.");
      expect(page.createUser.usernameErrorMessage.textContent).toBe("A username is required.");

      page.createUser.fillInput(page.createUser.username, "aa");
      await page.createUser.click(page.createUser.saveButton);
      expect(page.createUser.usernameErrorMessage.textContent).toBe("The username should be a valid username address.");
    });

    it('As AD I can stop adding a user by clicking on the cancel button', async() => {
      expect(page.createUser.exists()).toBeTruthy();
      await page.createUser.click(page.createUser.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I can stop adding a user by closing the dialog', async() => {
      expect(page.createUser.exists()).toBeTruthy();
      await page.createUser.click(page.createUser.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I can stop adding a user with the keyboard (escape)', async() => {
      expect(page.createUser.exists()).toBeTruthy();
      await page.createUser.escapeKey(page.createUser.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      // Fill the form
      page.createUser.fillInput(page.createUser.firstName, "firstname");
      page.createUser.fillInput(page.createUser.lastName, "lastname");
      page.createUser.fillInput(page.createUser.username, "user@passbolt.com");

      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.createUser.click(page.createUser.saveButton);

      // Throw general error message
      expect(page.createUser.errorDialog).not.toBeNull();
      expect(page.createUser.errorDialogMessage).not.toBeNull();
    });

    it('As AD I should see an error message if the username already exists', async() => {
      // Fill the form
      page.createUser.fillInput(page.createUser.firstName, "firstname");
      page.createUser.fillInput(page.createUser.lastName, "lastname");
      page.createUser.fillInput(page.createUser.username, "user@passbolt.com");

      const data = {
        body: {
          username: {
            uniqueUsername: "This username is already in use."
          }
        }
      };

      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Could not validate user data.", data);
      });

      await page.createUser.click(page.createUser.saveButton);

      // display username error message
      expect(page.createUser.usernameErrorMessage.textContent).toBe("This username is already in use.");
    });

    it("As a user I should see a feedback when firstname, username or lastname field content is truncated by a field limit", async() => {
      expect.assertions(3);
      page.createUser.fillInput(page.createUser.firstName, 'a'.repeat(128));
      page.createUser.fillInput(page.createUser.username, 'a'.repeat(128));
      page.createUser.fillInput(page.createUser.lastName, 'a'.repeat(128));

      await page.createUser.keyUpInput(page.createUser.firstName);
      await page.createUser.keyUpInput(page.createUser.username);
      await page.createUser.keyUpInput(page.createUser.lastName);

      expect(page.createUser.usernameWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.createUser.firstnameWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.createUser.lastnameWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });
  });
});
