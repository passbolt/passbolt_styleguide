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
import {defaultAppContext, defaultProps, mockMfaSettings} from "./DisplayMfaAdministration.test.data";
import DisplayMfaAdministrationPage from "./DisplayMfaAdministration.test.page";
import {waitFor} from "@testing-library/react";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

beforeEach(() => {
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
      page = new DisplayMfaAdministrationPage(context, props);
    });

    it('As AD I should see if all fields is available for my Passbolt instance on the administration settings page', async() => {
      await waitFor(() => {
      });
      expect(page.exists()).toBeTruthy();
      // check fields in the form
      expect(page.totp.checked).toBeTruthy();
      expect(page.yubikey.checked).toBeTruthy();
      expect(page.duo.checked).toBe(false);
      await page.checkDuo();

      expect(page.yubikeyClientIdentifier.value).toBe(mockMfaSettings.body.yubikey.clientId);
      expect(page.yubikeySecretKey.value).toBe(mockMfaSettings.body.yubikey.secretKey);
      expect(page.duoHostname.value).toBe("");
      expect(page.duoIntegrationKey.value).toBe("");
      expect(page.duoSalt.value).toBe("");
      expect(page.duoSecretKey.value).toBe("");
    });

    it('As AD I should save mfa on the administration settings page', async() => {
      await waitFor(() => {});
      await page.checkYubikey();
      expect(props.administrationWorkspaceContext.onSaveEnabled).toHaveBeenCalled();
      const propsUpdated = {
        administrationWorkspaceContext: {
          must: {
            save: true
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
          onSaveEnabled: jest.fn(),
          onGetMfaRequested: () => mockMfaSettings,
          onSaveMfaRequested: jest.fn()
        }
      };
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const result = {
        "duo": null,
        "providers": ["totp"],
        "yubikey": null,
      };
      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.administrationWorkspaceContext.onSaveMfaRequested).toHaveBeenCalledWith(result);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The multi factor authentication settings for the organization were updated.");
      expect(propsUpdated.administrationWorkspaceContext.onResetActionsSettings).toHaveBeenCalled();
    });

    it('As AD I should see a processing feedback while submitting the form', async() => {
      await waitFor(() => {});
      await page.checkYubikey();

      const propsUpdated = {
        administrationWorkspaceContext: {
          must: {
            save: true
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
          onSaveEnabled: jest.fn(),
          onGetMfaRequested: () => mockMfaSettings,
          onSaveMfaRequested: jest.fn()
        }
      };
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onSaveMfaRequested').mockImplementation(requestMockImpl);

      page.rerender(context, propsUpdated);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.totp.getAttribute("disabled")).not.toBeNull();
        expect(page.yubikey.getAttribute("disabled")).not.toBeNull();
        expect(page.duo.getAttribute("disabled")).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I shouldn’t be able to submit the form if there is an invalid field', async() => {
      await waitFor(() => {});
      await page.checkDuo();
      page.fillYubikeyClientIdentifier("");
      page.fillYubikeySecret("");

      const propsUpdated = {
        administrationWorkspaceContext: {
          must: {
            save: true
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
          onSaveEnabled: jest.fn()
        }
      };

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      // Throw error message
      expect(page.yubikeyClientIdentifierErrorMessage).toBe("A client identifier is required.");
      expect(page.yubikeySecretKeyErrorMessage).toBe("A secret key is required.");
      expect(page.duoHostnameErrorMessage).toBe("A hostname is required.");
      expect(page.duoIntegrationKeyErrorMessage).toBe("An integration key is required.");
      expect(page.duoSaltErrorMessage).toBe("A salt is required.");
      expect(page.duoSecretKeyErrorMessage).toBe("A secret key is required.");
    });

    it('As AD I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
      await waitFor(() => {});
      await page.checkYubikey();

      const propsUpdated = {
        administrationWorkspaceContext: {
          must: {
            save: true
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
          onSaveEnabled: jest.fn(),
          onGetMfaRequested: () => mockMfaSettings,
          onSaveMfaRequested: jest.fn()
        }
      };

      // Mock the request function to make it return an error.
      const error = {message: "The service is unavailable"};
      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onSaveMfaRequested').mockImplementation(() => Promise.reject(error));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      // Throw general error message
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("The service is unavailable");
    });
  });

  describe('As AD I see all fields disabled if mfa setting are not yet fetched', () => {
    /**
     * Given the mfa settings
     * And the mfa settings are not loaded yet
     */

    it('I should see all fields disabled”', () => {
      page = new DisplayMfaAdministrationPage(context, props);
      expect(page.totp.getAttribute("disabled")).not.toBeNull();
      expect(page.yubikey.getAttribute("disabled")).not.toBeNull();
      expect(page.duo.getAttribute("disabled")).not.toBeNull();
    });
  });
});
