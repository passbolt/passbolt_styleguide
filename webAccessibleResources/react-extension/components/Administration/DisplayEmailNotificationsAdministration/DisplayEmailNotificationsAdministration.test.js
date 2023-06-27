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
 * Unit tests on DisplayEmailNotificationsAdministration in regard of specifications
 */
import {
  defaultEmailNotificationSettings,
  defaultProps,
} from "./DisplayEmailNotificationsAdministration.test.data";
import DisplayEmailNotificationsAdministrationPage from "./DisplayEmailNotificationsAdministration.test.page";
import {waitFor} from "@testing-library/react";
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import {enableFetchMocks} from "jest-fetch-mock";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("See the Email Notifications Settings", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const settings = defaultEmailNotificationSettings();
  describe('As AD I should see the Email Notifications on the administration settings page', () => {
    /**
     * I should see the Email Notifications provider activation state on the administration settings page
     */
    beforeEach(() => {
      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => mockApiResponse(settings));
      page = new DisplayEmailNotificationsAdministrationPage(context, props);
    });

    it('As AD I should see if all fields is available for my Passbolt instance on the administration settings page', async() => {
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      // check fields in the form
      expect(page.passwordCreate.checked).toBeTruthy();
      expect(page.passwordUpdate.checked).toBeTruthy();
      expect(page.passwordDelete.checked).toBeTruthy();
      expect(page.passwordShare.checked).toBeTruthy();
      expect(page.folderCreate.checked).toBeTruthy();
      expect(page.folderUpdate.checked).toBeTruthy();
      expect(page.folderDelete.checked).toBeTruthy();
      expect(page.folderShare.checked).toBeTruthy();
      expect(page.commentAdd.checked).toBeTruthy();
      expect(page.groupDelete.checked).toBeTruthy();
      expect(page.groupUserAdd.checked).toBeTruthy();
      expect(page.groupUserDelete.checked).toBeTruthy();
      expect(page.groupUserUpdate.checked).toBeTruthy();
      expect(page.groupManagerUpdate.checked).toBeTruthy();
      expect(page.userCreate.checked).toBeTruthy();
      expect(page.userRecover.checked).toBeTruthy();
      expect(page.showUsername.checked).toBeTruthy();
      expect(page.showUri.checked).toBeTruthy();
      expect(page.showSecret.checked).toBeTruthy();
      expect(page.showDescription.checked).toBeTruthy();
      expect(page.showComment.checked).toBeTruthy();
    });

    it('As AD I should save email notifications on the administration settings page and see a confirmation message', async() => {
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      //Call to save the settings
      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => mockApiResponse({}));
      //Call to API to retrieve the settings
      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => mockApiResponse(settings));

      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      await page.checkCommentAdd();
      await page.saveSettings();

      await waitFor(() => {});

      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The email notification settings were updated.");
      // We expect the button to be disable
      expect(page.isSaveButtonEnabled()).toBeFalsy();
    });

    it('As AD I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      await page.checkCommentAdd();

      // Mock the request function to make it return an error.
      const error = {message: "The service is unavailable"};

      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => Promise.reject(error));

      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
      await page.saveSettings();

      await waitFor(() => {});
      // Throw general error message
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("The service is unavailable");
    });

    it('As AD I should not be able to click on save if there is no change', async() => {
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      await page.checkCommentAdd();
      //We set the value by default
      await page.checkCommentAdd();
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
    });

    it('I should see all fields disabled”', () => {
      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => mockApiResponse(settings));
      page = new DisplayEmailNotificationsAdministrationPage(context, props);
      expect(page.passwordCreate.getAttribute("disabled")).not.toBeNull();
      expect(page.passwordUpdate.getAttribute("disabled")).not.toBeNull();
      expect(page.passwordDelete.getAttribute("disabled")).not.toBeNull();
      expect(page.passwordShare.getAttribute("disabled")).not.toBeNull();
      expect(page.folderCreate.getAttribute("disabled")).not.toBeNull();
      expect(page.folderUpdate.getAttribute("disabled")).not.toBeNull();
      expect(page.folderDelete.getAttribute("disabled")).not.toBeNull();
      expect(page.folderShare.getAttribute("disabled")).not.toBeNull();
      expect(page.commentAdd.getAttribute("disabled")).not.toBeNull();
      expect(page.groupDelete.getAttribute("disabled")).not.toBeNull();
      expect(page.groupUserAdd.getAttribute("disabled")).not.toBeNull();
      expect(page.groupUserDelete.getAttribute("disabled")).not.toBeNull();
      expect(page.groupUserUpdate.getAttribute("disabled")).not.toBeNull();
      expect(page.groupManagerUpdate.getAttribute("disabled")).not.toBeNull();
      expect(page.userCreate.getAttribute("disabled")).not.toBeNull();
      expect(page.userRecover.getAttribute("disabled")).not.toBeNull();
      expect(page.showUsername.getAttribute("disabled")).not.toBeNull();
      expect(page.showUri.getAttribute("disabled")).not.toBeNull();
      expect(page.showSecret.getAttribute("disabled")).not.toBeNull();
      expect(page.showDescription.getAttribute("disabled")).not.toBeNull();
      expect(page.showComment.getAttribute("disabled")).not.toBeNull();
    });
  });
});
