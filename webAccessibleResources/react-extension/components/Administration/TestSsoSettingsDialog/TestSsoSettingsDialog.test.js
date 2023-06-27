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
 * Unit tests on TestSsoSettingsDialog in regard of specifications
 */
import SsoProviders from "../ManageSsoSettings/SsoProviders.data";
import {waitFor} from "@testing-library/react";
import {defaultProps} from "./TestSsoSettingsDialog.test.data";
import {v4 as uuid} from "uuid";
import TestSsoSettingsDialogPage from "../TestSsoSettingsDialog/TestSsoSettingsDialog.test.page";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.resetModules();
});

describe("TestSsoSettingsDialog", () => {
  describe("As a signed-in administrator I can save the SSO server settings", () => {
    /*
     * Covers as well:
     * As AD I cannot save the SSO settings before testing them
     */
    it('As AD I should see a dialog to invite me to test the SSO settings before saving them', async() => {
      expect.assertions(4);

      const props = defaultProps();
      const page = new TestSsoSettingsDialogPage(props);

      expect(page.title.textContent).toBe("Test Single Sign-On configuration");
      expect(page.ssoLoginButton).toBeTruthy();
      expect(page.saveButton).toBeTruthy();
      expect(page.saveButton.classList.contains("disabled")).toBeTruthy();
    });

    it('As AD I need to successfully sign in with the new SSO settings before saving them (happy path)', async() => {
      expect.assertions(8);

      const expectedSsoToken = uuid();
      const expectedConfigurationId = uuid();
      const expectedProviderId = "azure";

      const props = defaultProps({
        configurationId: expectedConfigurationId,
        provider: SsoProviders.find(provider => provider.id === expectedProviderId),
        onClose: jest.fn()
      });

      let ssoLoginResolve = null;
      props.context.port.addRequestListener('passbolt.sso.dry-run', async configurationId => {
        expect(configurationId).toBe(expectedConfigurationId);
        return new Promise(resolve => {
          ssoLoginResolve = resolve;
        });
      });

      props.context.port.addRequestListener("passbolt.sso.activate-settings", async(configurationId, ssoToken) => {
        expect(configurationId).toBe(expectedConfigurationId);
        expect(ssoToken).toBe(expectedSsoToken);
      });

      props.context.port.addRequestListener("passbolt.sso.generate-sso-kit", providerId => {
        expect(providerId).toBe(expectedProviderId);
      });

      const page = new TestSsoSettingsDialogPage(props);
      await waitFor(() => {});

      expect(page.saveButton.classList.contains("disabled")).toBeTruthy();

      await page.clickOnLogin();

      await ssoLoginResolve(expectedSsoToken);

      await waitFor(() => {
        if (page.saveButton.classList.contains("disabled")) {
          throw new Error("page is not ready yet");
        }
      });

      expect(page.title.textContent).toBe("Save Single Sign-On configuration");

      expect(page.saveButton.classList.contains("disabled")).toBeFalsy();
      await page.saveSettings();

      await waitFor(() => {
        if (props.onClose.mock.calls.length === 0) {
          throw new Error("page is not ready yet");
        }
      });

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('As AD I need to successfully sign in with the new SSO settings before saving them (error from API during test)', async() => {
      expect.assertions(2);

      const expectedError = new Error("Something went wrong!");

      const props = defaultProps({
        configurationId: uuid(),
        provider: SsoProviders.find(provider => provider.id === "azure")
      });

      props.context.port.addRequestListener('passbolt.sso.dry-run', async() => {
        throw expectedError;
      });

      const page = new TestSsoSettingsDialogPage(props);
      await waitFor(() => {});

      expect(page.saveButton.classList.contains("disabled")).toBeTruthy();

      await page.clickOnLogin();

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: expectedError});
    });

    it('As AD I need to successfully sign in with the new SSO settings before saving them (error from API during activation)', async() => {
      expect.assertions(3);

      const expectedError = new Error("Something went wrong!");

      const props = defaultProps({
        configurationId: uuid(),
        provider: SsoProviders.find(provider => provider.id === "azure")
      });

      props.context.port.addRequestListener('passbolt.sso.dry-run', async() => uuid());
      props.context.port.addRequestListener("passbolt.sso.activate-settings", async() => {
        throw expectedError;
      });

      const page = new TestSsoSettingsDialogPage(props);
      await waitFor(() => {});

      expect(page.saveButton.classList.contains("disabled")).toBeTruthy();

      await page.clickOnLogin();

      await waitFor(() => {
        if (page.saveButton.classList.contains("disabled")) {
          throw new Error("page is not ready yet");
        }
      });

      expect(page.saveButton.classList.contains("disabled")).toBeFalsy();
      await page.saveSettings();

      await waitFor(() => {});

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: expectedError});
    });

    it("As AD I can't save the SSO settings on a failed sign in test attempt", async() => {
      expect.assertions(3);

      const expectedError = new Error("User closed the popup!");
      expectedError.name = 'UserAbortsOperationError';

      const props = defaultProps({
        configurationId: uuid(),
        provider: SsoProviders.find(provider => provider.id === "azure")
      });

      props.context.port.addRequestListener('passbolt.sso.dry-run', async() => {
        throw expectedError;
      });

      const page = new TestSsoSettingsDialogPage(props);
      await waitFor(() => {});

      expect(page.saveButton.classList.contains("disabled")).toBeTruthy();

      await page.clickOnLogin();

      expect(props.dialogContext.open).not.toHaveBeenCalledWith();
      expect(page.saveButton.classList.contains("disabled")).toBeTruthy();
    });
  });
});
