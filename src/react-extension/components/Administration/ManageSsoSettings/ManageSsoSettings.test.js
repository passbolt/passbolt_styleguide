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
import {defaultProps} from "./ManageSsoSettings.test.data";
import {
  defaultSsoSettings,
  withAdfsSsoSettings,
  withAzureSsoSettings,
  withGoogleSsoSettings,
  withOAuth2SsoSettings,
} from "../../../contexts/AdminSsoContext.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {v4 as uuid} from "uuid";
import TestSsoSettingsDialog from "../TestSsoSettingsDialog/TestSsoSettingsDialog";
import {waitForTrue} from "../../../../../test/utils/waitFor";

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

      await waitForTrue(() => Boolean(page.providerButtons.length));

      const visibleProviderCount = SsoProviders.filter(provider => !provider.hiddenIfDisabled).length;

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Single Sign-On");
      expect(page.providerButtons.length).toBe(visibleProviderCount);
    });

    it('As a signed-in administrator on the administration workspace, I can see the SSO settings populated with the current settings: with Azure settings', async() => {
      expect.assertions(19);
      const settingsData = withAzureSsoSettings();
      settingsData.data.prompt = 'none';
      settingsData.data.email_claim = 'upn';

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);

      const exepectedRedirectUrl = `${props.context.userSettings.getTrustedDomain()}/sso/${settingsData.provider}/redirect`;

      const page = new ManageSsoSettingsPage(props);

      await waitForTrue(() => Boolean(page.url));

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

      expect(page.url_value).toBe(settingsData.data.url);
      expect(page.redirect_url.value).toBe(exepectedRedirectUrl);
      expect(page.tenant_id.value).toBe(settingsData.data.tenant_id);
      expect(page.client_id.value).toBe(settingsData.data.client_id);
      expect(page.client_secret.value).toBe(settingsData.data.client_secret);
      expect(page.client_secret_expiry.value).toBe(settingsData.data.client_secret_expiry);
      expect(page.prompt_value).toBe("None");
      expect(page.email_claim_value).toBe("UPN");
    });

    it('As a signed-in administrator on the administration workspace, I can see the SSO settings populated with the current settings: with Google settings', async() => {
      expect.assertions(9);
      const settingsData = withGoogleSsoSettings();

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);

      const exepectedRedirectUrl = `${props.context.userSettings.getTrustedDomain()}/sso/${settingsData.provider}/redirect`;

      const page = new ManageSsoSettingsPage(props);

      await waitForTrue(() => Boolean(page.google_client_id));

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
      const error = new Error("Something went wrong!");
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => { throw error; });

      new ManageSsoSettingsPage(props);

      await waitForTrue(() => Boolean(props.dialogContext.open.mock.calls.length));

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
    });

    it("As an administrator I can disable SSO Settings", async() => {
      expect.assertions(4);
      const settingsData = withAzureSsoSettings();

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);
      props.context.port.addRequestListener("passbolt.sso.delete-settings", async settingsId => {
        expect(settingsId).toStrictEqual(settingsData.id);
      });

      //avoid the page's dialogContext to be overriden by the data props
      delete props.dialogContext;
      const page = new ManageSsoSettingsPage(props);

      await waitForTrue(() => Boolean(page.url));

      await page.toggleSsoSettings();

      expect(page.toolbarActionsSaveSettingsButton.hasAttribute("disabled")).toBeFalsy();

      await page.saveSettings(() => Boolean(page.deleteConfirmationDialog));

      expect(page.deleteConfirmationDialog).toBeTruthy();

      await page.confirmDelete();

      expect(page.deleteConfirmationDialog).toBeFalsy();
    });
  });

  describe("As a signed-in administrator I can save the SSO server settings", () => {
    it('As a signed-in administrator when the “Single Sign On” settings have not changed but exists already, I can trigger the “Save settings” action', async() => {
      expect.assertions(1);
      const settingsData = withAzureSsoSettings();
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);

      const page = new ManageSsoSettingsPage(props);

      await waitForTrue(() => Boolean(page.url));

      expect(page.toolbarActionsSaveSettingsButton.hasAttribute("disabled")).toBeFalsy();
    });

    it('As a signed-in administrator when the “Single Sign On” settings have not changed and there is no config, I cannot trigger the “Save settings” action', async() => {
      expect.assertions(1);
      const settingsData = defaultSsoSettings();
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);

      const page = new ManageSsoSettingsPage(props);

      expect(page.toolbarActionsSaveSettingsButton.hasAttribute("disabled")).toBeTruthy();
    });

    it('As AD I cannot save the SSO settings before testing them (with Azure settings)', async() => {
      expect.assertions(2);
      const settingsData = withAzureSsoSettings();
      const props = defaultProps();

      const formData = {
        url: "https://login.microsoftonline.us",
        client_id: uuid(),
        tenant_id: uuid(),
        client_secret: uuid(),
        client_secret_expiry: "2050-12-31",
        prompt: "None",
        email_claim: "UPN",
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
            client_secret_expiry: `${formData.client_secret_expiry} 00:00:00`,
            prompt: promptValue,
            email_claim: emailClaimValue,
            login_hint: true,
          },
        });
        return Object.assign({}, settingsData, ssoSettings);
      });

      const page = new ManageSsoSettingsPage(props);

      await waitForTrue(() => Boolean(page.url));

      await page.toggleAdvancedSettings();
      await page.setFormWith(formData);

      await page.saveSettings(() => props.dialogContext.open.mock.calls.length > 0);

      expect(props.dialogContext.open).toHaveBeenCalledWith(TestSsoSettingsDialog, expect.objectContaining({
        provider: SsoProviders.find(provider => provider.id === "azure"),
        configurationId: settingsData.id,
        handleClose: expect.any(Function),
        onSuccessfulSettingsActivation: expect.any(Function),
      }));
    });

    it('As AD I cannot save the SSO settings before testing them (with Google settings)', async() => {
      expect.assertions(2);
      const settingsData = withGoogleSsoSettings();
      const props = defaultProps();

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

      await waitForTrue(() => Boolean(page.google_client_id));

      await page.setFormWith(formData);

      await page.saveSettings(() => props.dialogContext.open.mock.calls.length > 0);

      expect(props.dialogContext.open).toHaveBeenCalledWith(TestSsoSettingsDialog, expect.objectContaining({
        provider: SsoProviders.find(provider => provider.id === "google"),
        configurationId: settingsData.id,
        handleClose: expect.any(Function),
        onSuccessfulSettingsActivation: expect.any(Function),
      }));
    });

    it('As AD I cannot save the SSO settings before testing them (with OAuth2 settings)', async() => {
      expect.assertions(2);
      const settingsData = withOAuth2SsoSettings({
        providers: ["azure", "google", "oauth2"],
      });
      const props = defaultProps();

      const formData = {
        oauth2_url: "https://localhost.com/realms/new-passbolt",
        oauth2_client_id: "Passbolt",
        oauth2_client_secret: uuid(),
        oauth2_scope: "openid",
        oauth2_openid_configuration_path: "/.well-known/openid-configuration",
      };

      props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);
      props.context.port.addRequestListener("passbolt.sso.save-draft", async ssoSettings => {
        expect(ssoSettings).toStrictEqual({
          provider: settingsData.provider,
          data: {
            url: formData.oauth2_url,
            client_id: formData.oauth2_client_id,
            client_secret: formData.oauth2_client_secret,
            scope: formData.oauth2_scope,
            openid_configuration_path: formData.oauth2_openid_configuration_path,
          },
        });
        return Object.assign({}, settingsData, ssoSettings);
      });

      const page = new ManageSsoSettingsPage(props);

      await waitForTrue(() => Boolean(page.oauth2_client_id));

      await page.setFormWith(formData);

      await page.saveSettings(() => props.dialogContext.open.mock.calls.length > 0);

      expect(props.dialogContext.open).toHaveBeenCalledWith(TestSsoSettingsDialog, expect.objectContaining({
        provider: SsoProviders.find(provider => provider.id === "oauth2"),
        configurationId: settingsData.id,
        handleClose: expect.any(Function),
        onSuccessfulSettingsActivation: expect.any(Function),
      }));
    });
  });

  it('As AD I cannot save the SSO settings before testing them (with AD FS settings)', async() => {
    expect.assertions(2);
    const settingsData = withAdfsSsoSettings();
    const props = defaultProps();

    const formData = {
      adfs_url: "https://localhost.com/realms/new-passbolt",
      adfs_client_id: "Passbolt",
      adfs_client_secret: uuid(),
      adfs_scope: "openid",
      adfs_openid_configuration_path: "/.well-known/openid-configuration",
    };

    props.context.port.addRequestListener("passbolt.sso.get-current", async() => settingsData);
    props.context.port.addRequestListener("passbolt.sso.save-draft", async ssoSettings => {
      expect(ssoSettings).toStrictEqual({
        provider: settingsData.provider,
        data: {
          url: formData.adfs_url,
          client_id: formData.adfs_client_id,
          client_secret: formData.adfs_client_secret,
          scope: formData.adfs_scope,
          openid_configuration_path: formData.adfs_openid_configuration_path,
        },
      });
      return Object.assign({}, settingsData, ssoSettings);
    });

    const page = new ManageSsoSettingsPage(props);

    await waitForTrue(() => Boolean(page.adfs_client_id));

    await page.setFormWith(formData);

    await page.saveSettings(() => props.dialogContext.open.mock.calls.length > 0);

    expect(props.dialogContext.open).toHaveBeenCalledWith(TestSsoSettingsDialog, expect.objectContaining({
      provider: SsoProviders.find(provider => provider.id === "adfs"),
      configurationId: settingsData.id,
      handleClose: expect.any(Function),
      onSuccessfulSettingsActivation: expect.any(Function),
    }));
  });
});
