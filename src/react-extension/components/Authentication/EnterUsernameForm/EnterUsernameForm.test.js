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
 * Unit tests on EnterUsernameForm in regard of specifications
 */
import EnterUsernameFormPage from "./EnterUsernameForm.test.page";
import {defaultAppContext, defaultProps} from "./EnterUsernameForm.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {waitFor} from "@testing-library/react";
import fetchMock from "fetch-mock-jest";
import {Response} from "node-fetch";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see the Enter Username Form Page", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The applicative context

  const mockFetchPost = (url, response) => fetchMock.post(url, response);
  const mockFetchGet = (url, response) => fetchMock.get(url, response);

  describe('As AN I can start adding a username', () => {
    /**
     * I should see the enter username form
     */
    beforeEach(() => {
      fetchMock.reset();
      page = new EnterUsernameFormPage(context, props);
    });

    it('As AN I should be redirected after enter a username with success', async() => {
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Please enter your email to continue.');
      // Fill the form
      page.insertUsername("admin@passbolt.com");
      await page.checkAgreedTerms();
      mockFetchPost("http://localhost/users/recover.json?api-version=v2", {});
      await page.next();
      expect(props.history.push).toHaveBeenCalledWith("/auth/login/check-mailbox");
    });

    it('As AN I should see a processing feedback while submitting the form', async() => {
      // Fill the form
      page.insertUsername("admin@passbolt.com");
      await page.checkAgreedTerms();

      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      mockFetchPost("http://localhost/users/recover.json?api-version=v2", requestMockImpl);

      page.nextWithoutWaitFor();
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.username.getAttribute("disabled")).not.toBeNull();
        expect(page.nextButton.getAttribute("disabled")).not.toBeNull();
        expect(page.nextButton.className).toBe('button primary disabled processing big');
        updateResolve();
      });
    });

    it('As AN I shouldn’t be able to submit the form if there is an invalid field', async() => {
      expect(page.exists()).toBeTruthy();
      await page.next();

      // Throw error message
      expect(page.usernameErrorMessage).toBe("A username is required.");
      expect(page.agreedTermsError).toBe("You have to accept it.");

      page.insertUsername("admin");
      await page.next();
      expect(page.usernameErrorMessage).toBe("The username should be a valid username address.");
    });

    it('As AN I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
      // Fill the form
      page.insertUsername("admin@passbolt.com");
      await page.checkAgreedTerms();

      // Mock the request function to make it return an error.
      const error = {
        status: 500
      };
      mockFetchPost("http://localhost/users/recover.json?api-version=v2", Promise.reject(error));

      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});

      await page.next();

      // Throw general error message
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("There was an unexpected error, please retry later...");
    });

    it('As AN I should be redirected to register', async() => {
      // Fill the form
      page.insertUsername("admin@passbolt.com");
      await page.checkAgreedTerms();

      // Mock the request function to make it return an error.
      mockFetchPost("http://localhost/users/recover.json?api-version=v2", new Response('{"header":{"message":"not found"}}', {url: 'http://localhost/users/recover.json?api-version=v2', status: 404}));
      mockFetchGet("http://localhost/setup/name.json?api-version=v2", {});

      await page.next();
      expect(props.history.push).toHaveBeenCalledWith("/setup/name");
    });

    it('As AN I should be redirected to not found', async() => {
      // Fill the form
      page.insertUsername("admin@passbolt.com");
      await page.checkAgreedTerms();

      // Mock the request function to make it return an error.
      mockFetchPost("http://localhost/users/recover.json?api-version=v2", new Response('{"header":{"message":"not found"}}', {url: 'http://localhost/users/recover.json?api-version=v2', status: 404}));
      mockFetchGet("http://localhost/setup/name.json?api-version=v2", new Response('{"header":{"message":"not found"}}', {url: 'http://localhost/users/recover.json?api-version=v2', status: 404}));
      await page.next();
      expect(props.history.push).toHaveBeenCalledWith("/auth/login/not-found");
    });
  });
});
