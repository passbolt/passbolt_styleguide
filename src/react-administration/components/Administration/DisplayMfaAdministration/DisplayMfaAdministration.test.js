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
import {defaultAppContext, defaultProps, mockMfaSettings} from "./DisplayMfaAdministration.test.data";
import fetchMock from "fetch-mock-jest";
import DisplayMfaAdministrationPage from "./DisplayMfaAdministration.test.page";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Create Dialog User", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockFetch = (url, data) => fetchMock.get(url, data);

  describe('As AD I should see the MFA provider activation state on the administration settings page', () => {
    /**
     * I should see the MFA provider activation state on the administration settings page
     */
    beforeEach(() => {
      mockFetch("http://localhost:3000/mfa/settings.json?api-version=v2", mockMfaSettings);
      page = new DisplayMfaAdministrationPage(context, props);
    });

    it('As AD I should see if all fields is available for my Passbolt instance on the administration settings page', async() => {
      await waitFor(() => {
      });
      expect(page.displayMfaAdministration.exists()).toBeTruthy();
      // check fields in the form
      expect(page.displayMfaAdministration.totp.checked).toBe(true);
      expect(page.displayMfaAdministration.yubikey.checked).toBe(true);
      expect(page.displayMfaAdministration.duo.checked).toBe(false);
      await page.displayMfaAdministration.click(page.displayMfaAdministration.duo);

      expect(page.displayMfaAdministration.yubikeyClientIdentifier.value).toBe(mockMfaSettings.body.yubikey.clientId);
      expect(page.displayMfaAdministration.yubikeySecretKey.value).toBe(mockMfaSettings.body.yubikey.secretKey);
      expect(page.displayMfaAdministration.duoHostname.value).toBe("");
      expect(page.displayMfaAdministration.duoIntegrationKey.value).toBe("");
      expect(page.displayMfaAdministration.duoSalt.value).toBe("");
      expect(page.displayMfaAdministration.duoSecretKey.value).toBe("");
    });
  });

  describe('As AD I see all fields disabled if mfa setting are not yet fetched', () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given the groups section
     * And the groups are not loaded yet
     * Then I should see the loading message “Retrieving groups”
     */

    beforeEach(() => {
      page = new DisplayMfaAdministrationPage(context, props);
    });

    it('I should see all fields disabled”', () => {
      expect(page.displayMfaAdministration.totp.getAttribute("disabled")).not.toBeNull();
      expect(page.displayMfaAdministration.yubikey.getAttribute("disabled")).not.toBeNull();
      expect(page.displayMfaAdministration.duo.getAttribute("disabled")).not.toBeNull();
    });
  });
});
