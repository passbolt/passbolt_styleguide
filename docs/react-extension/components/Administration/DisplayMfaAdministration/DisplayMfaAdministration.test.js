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
 * Unit tests on DisplayMfaAdministration in regard of specifications
 */
import {defaultProps, mockMfaSettings} from "./DisplayMfaAdministration.test.data";
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import DisplayMfaAdministrationPage from "./DisplayMfaAdministration.test.page";
import {waitFor} from "@testing-library/react";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {enableFetchMocks} from 'jest-fetch-mock';

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("See the MFA settings", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe('As AD I should see the MFA provider activation state on the administration settings page', () => {
    /**
     * I should see the MFA provider activation state on the administration settings page
     */
    beforeEach(() => {
      fetch.doMockOnceIf(/mfa\/settings*/, () => mockApiResponse(mockMfaSettings));
      page = new DisplayMfaAdministrationPage(context, props);
    });

    it('As AD I should see if all fields is available for my Passbolt instance on the administration settings page', async() => {
      await waitFor(() => {});

      expect.assertions(9);

      expect(page.exists()).toBeTruthy();
      // check fields in the form
      expect(page.totp.checked).toBeTruthy();
      expect(page.yubikey.checked).toBeTruthy();
      expect(page.duo.checked).toBeTruthy();
      await page.checkDuo();

      expect(page.yubikeyClientIdentifier.value).toBe(mockMfaSettings.yubikey.clientId);
      expect(page.yubikeySecretKey.value).toBe(mockMfaSettings.yubikey.secretKey);
      expect(page.duoHostname).toBe(null);
      expect(page.duoClientId).toBe(null);
      expect(page.duoClientSecret).toBe(null);
    });

    it('As AD I should save mfa on the administration settings page', async() => {
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      //Call to save the settings
      fetch.doMockOnceIf(/mfa\/settings*/, () => mockApiResponse({}));
      //Call to API to retrieve the settings
      fetch.doMockOnceIf(/mfa\/settings*/, () => mockApiResponse(mockMfaSettings));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});


      await page.checkYubikey();
      await page.saveSettings();

      await waitFor(() => {});

      expect.assertions(3);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The multi factor authentication settings for the organization were updated.");
      // We expect the button to be disable
      expect(page.isSaveButtonEnabled()).toBeFalsy();
    });

    it('As AD I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      await page.checkYubikey();

      // Mock the request function to make it return an error.
      const error = {message: "The service is unavailable"};

      fetch.doMockOnceIf(/mfa\/settings*/, () => Promise.reject(error));

      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
      await page.saveSettings();

      await waitFor(() => {});

      expect.assertions(2);
      // Throw general error message
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("The service is unavailable");
    });

    it('As AD I should see an error message if inputs are empty', async() => {
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      page.fillYubikeySecret("");
      page.fillYubikeyClientIdentifier("");
      page.fillClientSecret("");
      page.fillClientId("");
      page.fillDuoHostname("");

      await page.saveSettings();

      await waitFor(() => {});

      expect.assertions(6);
      // Throw general error message
      expect(page.yubikeyClientIdentifierErrorMessage).toBe("A client identifier is required.");
      expect(page.yubikeySecretKeyErrorMessage).toBe("A secret key is required.");
      expect(page.duoHostnameErrorMessage).toBe("A hostname is required.");
      expect(page.duoClientIdErrorMessage).toBe("A client id is required.");
      expect(page.duoClientSecretErrorMessage).toBe("A client secret is required.");
    });


    it('As AD I should not be able to click on save if there is no change', async() => {
      expect.assertions(2);
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      await page.checkYubikey();
      //We set the value by default
      await page.checkYubikey();
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
    });

    it('As AD I want to see the passwords I entered in the MFA administration settings forms', async() => {
      await page.toggleObfuscate(page.duoClientSecretButton);
      await page.toggleObfuscate(page.yubikeySecretKeyButton);

      expect.assertions(2);

      expect(page.isObfuscated(page.yubikeySecretKeyButton)).toBeFalsy();
      expect(page.isObfuscated(page.duoClientSecretButton)).toBeFalsy();
    });

    it('I should see all fields disabled”', () => {
      fetch.doMockOnceIf(/mfa\/settings*/, () => mockApiResponse(mockMfaSettings));

      expect.assertions(3);

      page = new DisplayMfaAdministrationPage(context, props);
      expect(page.totp.getAttribute("disabled")).not.toBeNull();
      expect(page.yubikey.getAttribute("disabled")).not.toBeNull();
      expect(page.duo.getAttribute("disabled")).not.toBeNull();
    });
  });
});
