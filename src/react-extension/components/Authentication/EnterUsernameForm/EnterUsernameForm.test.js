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
import {defaultProps} from "./EnterUsernameForm.test.data";
import {waitFor} from "@testing-library/react";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see the Enter Username Form Page", () => {
  let page; // The page to test against

  describe('As AN I can start adding a username', () => {
    it('As AN I should be able to submit a valid username', async() => {
      const props = defaultProps();
      jest.spyOn(props.apiTriageContext, 'onTriageRequested').mockImplementation(() => {});
      page = new EnterUsernameFormPage(props);

      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Please enter your email to continue.');

      // Fill the form
      page.insertUsername("admin@passbolt.com");
      await page.checkAgreedTerms();
      await page.next();
      expect(props.apiTriageContext.onTriageRequested).toHaveBeenCalledWith("admin@passbolt.com");
    });

    it('As AN I should be able to submit a username with success with no terms or privacy policy required by the API', async() => {
      const siteSettingsFixtureClone = JSON.parse(JSON.stringify(siteSettingsFixture));
      siteSettingsFixtureClone.passbolt.legal = {};
      const siteSettings = new SiteSettings(siteSettingsFixtureClone);
      const props = defaultProps({context: {siteSettings}});
      jest.spyOn(props.apiTriageContext, 'onTriageRequested').mockImplementation(() => {});
      page = new EnterUsernameFormPage(props);

      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Please enter your email to continue.');
      await page.isReady();

      // Fill the form
      page.insertUsername("admin@passbolt.com");
      await page.next();
      expect(props.apiTriageContext.onTriageRequested).toHaveBeenCalledWith("admin@passbolt.com");
    });

    it('As AN I should see a processing feedback while submitting the form', async() => {
      const props = defaultProps();
      page = new EnterUsernameFormPage(props);

      // Fill the form
      page.insertUsername("admin@passbolt.com");
      await page.checkAgreedTerms();

      page.nextWithoutWaitFor();
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.username.getAttribute("disabled")).not.toBeNull();
        expect(page.nextButton.getAttribute("disabled")).not.toBeNull();
        expect(page.nextButton.className).toBe('button primary disabled processing big full-width');
      });
    });

    it('As AN I shouldn’t be able to submit the form if there is an invalid field', async() => {
      const props = defaultProps();
      page = new EnterUsernameFormPage(props);

      expect(page.exists()).toBeTruthy();
      await page.isReady();
      await page.next();

      // Throw error message
      expect(page.usernameErrorMessage).toBe("A username is required.");

      page.insertUsername("admin");
      await page.next();
      expect(page.usernameErrorMessage).toBe("Please enter a valid email address.");
    });
  });

  /*
   * @todo to move to the relative apiTriageContext tests
   * it('As AN I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
   *   const props = getUsernameFormProps();
   *   page = new EnterUsernameFormPage(props);
   *
   *   page.insertUsername("admin@passbolt.com");
   *   await page.checkAgreedTerms();
   *
   *   // Mock the request function to make it return an error.
   *   const error = {
   *     status: 500
   *   };
   *   mockFetchPost("http://localhost/users/recover.json?api-version=v2", Promise.reject(error));
   *
   *   jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
   *
   *   await page.next();
   *
   *   // Throw general error message
   *   expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("There was an unexpected error, please retry later...");
   * });
   *
   * it('As AN I should be redirected to register if no account match and the registration is public', async() => {
   *   const siteSettingsResult = '{"body":{"passbolt":{"registration":{"public":true},"legal":{"privacy_policy":{"url":"https://www.passbolt.com/privacy"},"terms":{"url":"https://www.passbolt.com/terms"}}}}}';
   *   mockFetchGet("http://localhost/settings.json?api-version=v2", new Response(siteSettingsResult, {url: 'http://localhost/settings.json?api-version=v2', status: 200}), {overwriteRoutes: true});
   *   page = new EnterUsernameFormPage(props);
   *
   *   // Fill the form
   *   page.insertUsername("admin@passbolt.com");
   *   await page.checkAgreedTerms();
   *
   *   // Mock the request function to make it return an error.
   *   mockFetchPost("http://localhost/users/recover.json?api-version=v2", new Response('{"header":{"message":"not found"}}', {url: 'http://localhost/users/recover.json?api-version=v2', status: 404}));
   *   mockFetchGet("http://localhost/setup/name.json?api-version=v2", {});
   *
   *   await page.next();
   *   expect(props.context.setContext).toHaveBeenCalledWith({"username": "admin@passbolt.com"});
   *   expect(props.history.push).toHaveBeenCalledWith("/setup/name");
   * });
   *
   * it('As AN I should be redirected to error if no account match and the registration is not public', async() => {
   *   // Fill the form
   *   page.insertUsername("admin@passbolt.com");
   *   await page.checkAgreedTerms();
   *
   *   // Mock the request function to make it return an error.
   *   mockFetchPost("http://localhost/users/recover.json?api-version=v2", new Response('{"header":{"message":"not found"}}', {url: 'http://localhost/users/recover.json?api-version=v2', status: 404}));
   *   mockFetchGet("http://localhost/setup/name.json?api-version=v2", new Response('{"header":{"message":"not found"}}', {url: 'http://localhost/users/recover.json?api-version=v2', status: 404}));
   *   await page.next();
   *   expect(props.history.push).toHaveBeenCalledWith("/auth/login/error");
   * });
   */
});
