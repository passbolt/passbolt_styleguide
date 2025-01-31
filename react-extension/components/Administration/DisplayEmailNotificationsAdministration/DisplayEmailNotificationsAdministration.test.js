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
import "../../../../../test/mocks/mockPortal.js";
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
import {waitForTrue} from "../../../../../test/utils/waitFor";

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
      expect.assertions(35);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      //passwords
      expect(page.passwordCreate.checked).toBeTruthy();
      expect(page.passwordUpdate.checked).toBeTruthy();
      expect(page.passwordDelete.checked).toBeTruthy();
      expect(page.passwordShare.checked).toBeTruthy();

      //folders
      expect(page.folderCreate.checked).toBeTruthy();
      expect(page.folderUpdate.checked).toBeTruthy();
      expect(page.folderDelete.checked).toBeTruthy();
      expect(page.folderShare.checked).toBeTruthy();

      //comments
      expect(page.commentAdd.checked).toBeTruthy();

      //group membership
      expect(page.groupDelete.checked).toBeTruthy();
      expect(page.groupUserAdd.checked).toBeTruthy();
      expect(page.groupUserDelete.checked).toBeTruthy();
      expect(page.groupUserUpdate.checked).toBeTruthy();

      //group manager
      expect(page.groupManagerUpdate.checked).toBeTruthy();
      expect(page.groupManagerRequestAddUser.checked).toBeTruthy();

      //Registration and recovery: Admin
      expect(page.userSetupCompletedAdmins.checked).toBeTruthy();
      expect(page.userRecoverCompletedAdmins.checked).toBeTruthy();
      expect(page.userRecoverAbortedAdmins.checked).toBeTruthy();

      //Registration and recovery: User
      expect(page.userCreate.checked).toBeTruthy();
      expect(page.userRecover.checked).toBeTruthy();
      expect(page.userRecoverCompleted.checked).toBeTruthy();
      //when users completed the recover of theri account..

      //Account Recovery: Admin
      expect(page.accountRecoveryRequestedAllAdmins.checked).toBeTruthy();
      expect(page.accountRecoverySettingsUpdate.checked).toBeTruthy();
      expect(page.accountRecoveryRespondedAdmin.checked).toBeTruthy();
      expect(page.accountRecoveryRespondedAllAdmins.checked).toBeTruthy();

      //Account Recovery: User
      expect(page.accountRecoveryRequestedUser.checked).toBeTruthy();
      expect(page.accountRecoveryRespondedApproved.checked).toBeTruthy();
      expect(page.accountRecoveryRespondedRejected.checked).toBeTruthy();

      //Password expiry
      expect(page.passwordExpiryExpired.checked).toBeTruthy();

      //Email Content Visibility
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
      const error = {message: "Unable to reach the server, an unexpected error occurred"};

      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => Promise.reject(error));

      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
      await page.saveSettings();

      await waitFor(() => {});
      // Throw general error message
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith(error.message);
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
      expect.assertions(34);
      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => mockApiResponse(settings));
      page = new DisplayEmailNotificationsAdministrationPage(context, props);

      function expectDisabled(field) {
        expect(field.getAttribute("disabled")).not.toBeNull();
      }

      //passwords
      expectDisabled(page.passwordCreate);
      expectDisabled(page.passwordUpdate);
      expectDisabled(page.passwordDelete);
      expectDisabled(page.passwordShare);

      //folders
      expectDisabled(page.folderCreate);
      expectDisabled(page.folderUpdate);
      expectDisabled(page.folderDelete);
      expectDisabled(page.folderShare);

      //comments
      expectDisabled(page.commentAdd);

      //group membership
      expectDisabled(page.groupDelete);
      expectDisabled(page.groupUserAdd);
      expectDisabled(page.groupUserDelete);
      expectDisabled(page.groupUserUpdate);

      //group manager
      expectDisabled(page.groupManagerUpdate);
      expectDisabled(page.groupManagerRequestAddUser);

      //Registration and recovery: Admin
      expectDisabled(page.userSetupCompletedAdmins);
      expectDisabled(page.userRecoverCompletedAdmins);
      expectDisabled(page.userRecoverAbortedAdmins);

      //Registration and recovery: User
      expectDisabled(page.userCreate);
      expectDisabled(page.userRecover);
      expectDisabled(page.userRecoverCompleted);
      //when users completed the recover of theri account..

      //Account Recovery: Admin
      expectDisabled(page.accountRecoveryRequestedAllAdmins);
      expectDisabled(page.accountRecoverySettingsUpdate);
      expectDisabled(page.accountRecoveryRespondedAdmin);
      expectDisabled(page.accountRecoveryRespondedAllAdmins);

      //Account Recovery: User
      expectDisabled(page.accountRecoveryRequestedUser);
      expectDisabled(page.accountRecoveryRespondedApproved);
      expectDisabled(page.accountRecoveryRespondedRejected);

      //Password expiry
      expectDisabled(page.passwordExpiryExpired);

      //Email Content Visibility
      expectDisabled(page.showUsername);
      expectDisabled(page.showUri);
      expectDisabled(page.showSecret);
      expectDisabled(page.showDescription);
      expectDisabled(page.showComment);
    });
  });

  describe("As AD I should not be able to see the source of the configuration", () => {
    it("when it's coming from the database", async() => {
      expect.assertions(1);

      const settings = defaultEmailNotificationSettings();
      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => mockApiResponse(settings));

      const context = defaultAppContext(); // The applicative context
      const props = defaultProps(); // The props to pass
      const page = new DisplayEmailNotificationsAdministrationPage(context, props);
      await waitForTrue(() => Boolean(page.settingsSource));

      expect(page.settingsSource.textContent).toStrictEqual('This current configuration source is: database.');
    });

    it("when it's coming from a file", async() => {
      expect.assertions(1);

      const settings = defaultEmailNotificationSettings({
        sources_database: false,
        sources_file: true,
      });
      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => mockApiResponse(settings));

      const context = defaultAppContext(); // The applicative context
      const props = defaultProps(); // The props to pass
      const page = new DisplayEmailNotificationsAdministrationPage(context, props);
      await waitForTrue(() => Boolean(page.settingsSource));

      expect(page.settingsSource.textContent).toStrictEqual('This current configuration source is: file.');
    });

    it("when it's coming from a environment variables", async() => {
      expect.assertions(1);

      const settings = defaultEmailNotificationSettings({
        sources_database: false,
        sources_file: false,
      });

      fetch.doMockOnceIf(/settings\/emails\/notifications*/, () => mockApiResponse(settings));

      const context = defaultAppContext(); // The applicative context
      const props = defaultProps(); // The props to pass
      const page = new DisplayEmailNotificationsAdministrationPage(context, props);
      await waitForTrue(() => Boolean(page.settingsSource));

      expect(page.settingsSource.textContent).toStrictEqual('This current configuration source is: environment variables.');
    });
  });
});
