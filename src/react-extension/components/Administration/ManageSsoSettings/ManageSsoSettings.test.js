/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */

/**
 * Unit tests on ManageSsoSettings in regard of specifications
 */
import SsoProviders from "./SsoProviders.data";
import ManageSsoSettingsPage from "./ManageSsoSettings.test.page";
import {waitFor} from "@testing-library/react";
import {defaultProps} from "./ManageSsoSettings.test.data";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import {
  defaultSsoSettings,
  withAzureSsoSettings,
} from "../../../contexts/AdminSsoContext.test.data";
import {enableFetchMocks} from "jest-fetch-mock";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("ManageSsoSettings", () => {
  describe("As a signed-in administrator I can enable the SSO organisation settings", () => {
    it('As a signed-in administrator on the administration workspace, I can see the SSO settings populated with the current settings: without settings', async() => {
      expect.assertions(4);
      fetch.doMockOnceIf(/sso\/settings.json/, () => mockApiResponse(defaultSsoSettings()));

      const page = new ManageSsoSettingsPage(defaultProps());

      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Single Sign-On");
      expect(page.providerButtons).toBeTruthy();
      expect(page.providerButtons.length).toBe(SsoProviders.length);
    });

    it('As a signed-in administrator on the administration workspace, I can see the SSO settings populated with the current settings: without Azure settings', async() => {
      expect.assertions(13);
      const settingsData = withAzureSsoSettings();
      const providerDefaultConfig = SsoProviders.find(provider => provider.id === settingsData.provider);
      fetch.doMockOnceIf(/sso\/settings.json/, () => mockApiResponse(settingsData));

      const page = new ManageSsoSettingsPage(defaultProps());

      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Single Sign-On");
      expect(page.providerButtons.length).toBe(0);
      expect(page.url).toBeTruthy();
      expect(page.redirect_url).toBeTruthy();
      expect(page.tenant_id).toBeTruthy();
      expect(page.client_id).toBeTruthy();
      expect(page.client_secret).toBeTruthy();

      expect(page.url.value).toBe(settingsData.data.url);
      expect(page.redirect_url.value).toBe(providerDefaultConfig.defaultConfig.redirect_url);
      expect(page.tenant_id.value).toBe(settingsData.data.tenant_id);
      expect(page.client_id.value).toBe(settingsData.data.client_id);
      expect(page.client_secret.value).toBe(settingsData.data.client_secret);
    });

    it("As a signed-in administrator on the administration workspace, I can see a dialog with detailed error if the settings can't be read from the server", async() => {
      expect.assertions(1);
      const mockDialogContext = {
        dialogContext: {
          open: jest.fn()
        }
      };
      const error = new Error("Something went wrong!");
      fetch.doMockOnceIf(/sso\/settings.json/, () => { throw error; });

      new ManageSsoSettingsPage(defaultProps(mockDialogContext));

      await waitFor(() => {
        const callCount = mockDialogContext.dialogContext.open.mock.calls.length;
        if (!callCount) {
          throw new Error("Call to dialog has not been done yet");
        }
      });

      expect(mockDialogContext.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });
  });
});
