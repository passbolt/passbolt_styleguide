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
import {
  defaultSsoSettings,
  withAzureSsoSettings,
  withGoogleSsoSettings,
} from "../../../contexts/AdminSsoContext.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {v4 as uuid} from "uuid";
import TestSsoSettingsDialog from "../TestSsoSettingsDialog/TestSsoSettingsDialog";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("ManageSsoSettings", () => {
  describe("As a signed-in administrator I can enable the SSO organisation settings", () => {
    it('As a signed-in administrator on the administration workspace, I can see the SSO settings populated with the current settings: without settings', async() => {
      expect.assertions(3);
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => defaultSsoSettings());

      const page = new ManageSsoSettingsPage(props);

      await waitFor(() => {
        if (page.providerButtons.length === 0) {
          throw new Error("Page is not loaded yet");
        }
      });

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Single Sign-On");
      expect(page.providerButtons.length).toBe(SsoProviders.length);
    });

    it('As a signed-in administrator on the administration workspace, I can see the SSO settings populated with the current settings: with Azure settings', async() => {
      expect.assertions(19);
      const settingsData = withAzureSsoSettings();

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);

      const exepectedRedirectUrl = `${props.context.userSettings.getTrustedDomain()}/sso/${settingsData.provider}/redirect`;

      const page = new ManageSsoSettingsPage(props);

      await waitFor(() => {
        if (!page.url) {
          throw new Error("Page is not loaded yet");
        }
      });

      await page.toggleAdvancedSettings();

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Single Sign-On");
      expect(page.providerButtons.length).toBe(0);
      expect(page.url).toBeTruthy();
      expect(page.redirect_url).toBeTruthy();
      expect(page.tenant_id).toBeTruthy();
      expect(page.client_id).toBeTruthy();
      expect(page.client_secret).toBeTruthy();
      expect(page.client_secret_expiry).toBeTruthy();
      expect(page.prompt).toBeTruthy();
      expect(page.email_claim).toBeTruthy();

      expect(page.url.value).toBe(settingsData.data.url);
      expect(page.redirect_url.value).toBe(exepectedRedirectUrl);
      expect(page.tenant_id.value).toBe(settingsData.data.tenant_id);
      expect(page.client_id.value).toBe(settingsData.data.client_id);
      expect(page.client_secret.value).toBe(settingsData.data.client_secret);
      expect(page.client_secret_expiry.value).toBe(settingsData.data.client_secret_expiry);
      expect(page.prompt.value).toBe(settingsData.data.prompt);
      expect(page.email_claim.value).toBe(settingsData.data.email_claim);
    });

    it('As a signed-in administrator on the administration workspace, I can see the SSO settings populated with the current settings: with Google settings', async() => {
      expect.assertions(9);
      const settingsData = withGoogleSsoSettings();

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);

      const exepectedRedirectUrl = `${props.context.userSettings.getTrustedDomain()}/sso/${settingsData.provider}/redirect`;

      const page = new ManageSsoSettingsPage(props);

      await waitFor(() => {
        if (!page.google_client_id) {
          throw new Error("Page is not loaded yet");
        }
      });

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Single Sign-On");
      expect(page.providerButtons.length).toBe(0);
      expect(page.redirect_url).toBeTruthy();
      expect(page.google_client_id).toBeTruthy();
      expect(page.google_client_secret).toBeTruthy();

      expect(page.redirect_url.value).toBe(exepectedRedirectUrl);
      expect(page.google_client_id.value).toBe(settingsData.data.client_id);
      expect(page.google_client_secret.value).toBe(settingsData.data.client_secret);
    });

    it("As a signed-in administrator on the administration workspace, I can see a dialog with detailed error if the settings can't be read from the server", async() => {
      expect.assertions(1);
      const mockDialogContext = {
        dialogContext: {
          open: jest.fn()
        }
      };

      const error = new Error("Something went wrong!");
      const props = defaultProps(mockDialogContext);
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => { throw error; });

      new ManageSsoSettingsPage(props);

      await waitFor(() => {
        const callCount = mockDialogContext.dialogContext.open.mock.calls.length;
        if (!callCount) {
          throw new Error("Call to dialog has not been done yet");
        }
      });

      expect(mockDialogContext.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });

    it("As an administrator I can disable SSO Settings", async() => {
      expect.assertions(4);
      const settingsData = withAzureSsoSettings();

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);
      props.context.port.addRequestListener("passbolt.sso.delete-settings", async settingsId => {
        expect(settingsId).toStrictEqual(settingsData.id);
      });

      const page = new ManageSsoSettingsPage(props);

      await waitFor(() => {
        if (!page.url) {
          throw new Error("Page is not loaded yet");
        }
      });

      await page.toggleSsoSettings();

      expect(page.toolbarActionsSaveSettingsButton.hasAttribute("disabled")).toBeFalsy();

      await page.saveSettings(() => Boolean(page.deleteConfirmationDialog));

      expect(page.deleteConfirmationDialog).toBeTruthy();

      await page.confirmDelete();

      expect(page.deleteConfirmationDialog).toBeFalsy();
    });
  });

  describe("As a signed-in administrator I can save the SSO server settings", () => {
    it('As a signed-in administrator when the “Single Sign On” settings have not changed, I cannot trigger the “Save settings” action', async() => {
      expect.assertions(2);
      const settingsData = withAzureSsoSettings();
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);

      const page = new ManageSsoSettingsPage(props);

      await waitFor(() => {
        if (!page.url) {
          throw new Error("Page is not loaded yet");
        }
      });

      expect(page.toolbarActionsSaveSettingsButton.hasAttribute("disabled")).toBeTruthy();

      await page.setFormWith({
        tenant_id: "tenant id test"
      });

      expect(page.toolbarActionsSaveSettingsButton.hasAttribute("disabled")).toBeFalsy();
    });

    it('As AD I cannot save the SSO settings before testing them (with Azure settings)', async() => {
      expect.assertions(2);
      const settingsData = withAzureSsoSettings();
      const mockDialogContext = {
        dialogContext: {
          open: jest.fn()
        }
      };
      const props = defaultProps(mockDialogContext);

      const formData = {
        prompt: "None",
        email_claim: "UPN",
        url: "https://fakeurl.passbolt.com/",
        client_id: uuid(),
        tenant_id: uuid(),
        client_secret: uuid(),
        client_secret_expiry: "2050-12-31"
      };

      const promptValue = "none";
      const emailClaimValue = "upn";

      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);
      props.context.port.addRequestListener("passbolt.sso.save-draft", async ssoSettings => {
        expect(ssoSettings).toStrictEqual({
          provider: settingsData.provider,
          data: {
            url: formData.url,
            tenant_id: formData.tenant_id,
            client_id: formData.client_id,
            client_secret: formData.client_secret,
            client_secret_expiry: formData.client_secret_expiry,
            prompt: promptValue,
            email_claim: emailClaimValue,
          },
        });
        return Object.assign({}, settingsData, ssoSettings);
      });

      const page = new ManageSsoSettingsPage(props);

      await waitFor(() => {
        if (!page.url) {
          throw new Error("Page is not loaded yet");
        }
      });

      await page.toggleAdvancedSettings();
      await page.setFormWith(formData);

      await page.saveSettings(() => mockDialogContext.dialogContext.open.mock.calls.length > 0);

      expect(mockDialogContext.dialogContext.open).toHaveBeenCalledWith(TestSsoSettingsDialog, expect.objectContaining({
        provider: SsoProviders.find(provider => provider.id === "azure"),
        configurationId: settingsData.id,
        handleClose: expect.any(Function),
        onSuccessfulSettingsActivation: expect.any(Function),
      }));
    });

    it('As AD I cannot save the SSO settings before testing them (with Google settings)', async() => {
      expect.assertions(2);
      const settingsData = withGoogleSsoSettings();
      const mockDialogContext = {
        dialogContext: {
          open: jest.fn()
        }
      };
      const props = defaultProps(mockDialogContext);

      const formData = {
        google_client_id: uuid(),
        google_client_secret: uuid(),
      };

      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);
      props.context.port.addRequestListener("passbolt.sso.save-draft", async ssoSettings => {
        expect(ssoSettings).toStrictEqual({
          provider: settingsData.provider,
          data: {
            client_id: formData.google_client_id,
            client_secret: formData.google_client_secret,
          },
        });
        return Object.assign({}, settingsData, ssoSettings);
      });

      const page = new ManageSsoSettingsPage(props);

      await waitFor(() => {
        if (!page.google_client_id) {
          throw new Error("Page is not loaded yet");
        }
      });

      await page.setFormWith(formData);

      await page.saveSettings(() => mockDialogContext.dialogContext.open.mock.calls.length > 0);

      expect(mockDialogContext.dialogContext.open).toHaveBeenCalledWith(TestSsoSettingsDialog, expect.objectContaining({
        provider: SsoProviders.find(provider => provider.id === "google"),
        configurationId: settingsData.id,
        handleClose: expect.any(Function),
        onSuccessfulSettingsActivation: expect.any(Function),
      }));
    });
  });
});
