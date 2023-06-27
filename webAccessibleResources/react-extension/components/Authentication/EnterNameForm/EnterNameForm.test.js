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
 * Unit tests on EnterNameForm in regard of specifications
 */
import EnterNameFormPage from "./EnterNameForm.test.page";
import {defaultProps} from "./EnterNameForm.test.data";
import {waitFor} from "@testing-library/react";
import fetchMock from "fetch-mock-jest";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see the Enter Name Form Page", () => {
  let page; // The page to test against
  const props = defaultProps(); // The applicative context


  describe('As AN I can start adding a name', () => {
    /**
     * I should see the enter name form
     */
    beforeEach(() => {
      fetchMock.reset();
      page = new EnterNameFormPage(props);
    });

    it('As AN I should be redirected after enter a name with success', async() => {
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('New here? Enter your name to get started.');
      expect(page.haveAccount.textContent).toBe('I already have an account');
      expect(page.registerButton.textContent).toBe('Sign up');
      // Fill the form
      page.insertFirstname("firstname");
      page.insertLastname("lastname");
      jest.spyOn(props.apiTriageContext, 'onRegistrationRequested').mockImplementation(() => {});
      await page.register();
      expect(props.apiTriageContext.onRegistrationRequested).toHaveBeenCalledWith("firstname", "lastname");
    });

    it('As AN I should see a processing feedback while submitting the form', async() => {
      // Fill the form
      page.insertFirstname("firstname");
      page.insertLastname("lastname");

      page.registerWithoutWaitFor();
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.firstname.getAttribute("disabled")).not.toBeNull();
        expect(page.lastname.getAttribute("disabled")).not.toBeNull();
        expect(page.registerButton.getAttribute("disabled")).not.toBeNull();
        expect(page.registerButton.className).toBe('button primary disabled processing big full-width');
      });
    });

    it('As AN I shouldn’t be able to submit the form if there is an invalid field', async() => {
      await page.register();

      // Throw error message
      expect(page.firstnameErrorMessage).toBe("A first name is required.");
      expect(page.lastnameErrorMessage).toBe("A last name is required.");


      page.insertFirstname("");
      page.insertLastname("");
      await page.register();
      expect(page.firstnameErrorMessage).toBe("A first name is required.");
      expect(page.lastnameErrorMessage).toBe("A last name is required.");
    });

    /*
     * it('As AN I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
     *   // Fill the form
     *   page.insertFirstname("firstname");
     *   page.insertLastname("lastname");
     *
     *   // Mock the request function to make it return an error.
     *   const error = {
     *     status: 500
     *   };
     *   mockFetchPost("http://localhost/users/register.json?api-version=v2", Promise.reject(error));
     *
     *   jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
     *
     *   await page.register();
     *
     *   // Throw general error message
     *   expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("There was an unexpected error, please retry later...");
     * });
     */
  });
});
