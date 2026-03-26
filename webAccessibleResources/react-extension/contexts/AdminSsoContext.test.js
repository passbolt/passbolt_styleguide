/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.11.0
 */
import {
  defaultProps,
  defaultSsoSettings,
  withAzureSsoSettings,
  withGoogleSsoSettings,
  withOAuth2SsoSettings,
  withAdfsSsoSettings,
  withPingOneSsoSettings,
} from "./AdminSsoContext.test.data";
import { AdminSsoContextProvider } from "./AdminSsoContext";

describe("AdminSsoContext", () => {
  let adminSsoContext;
  const props = defaultProps();

  beforeEach(() => {
    jest.resetAllMocks();
    adminSsoContext = new AdminSsoContextProvider(props);
    const setStateMock = (state, callback) => {
      adminSsoContext.state = Object.assign(adminSsoContext.state, state);
      if (callback) {
        callback();
      }
    };
    jest.spyOn(adminSsoContext, "setState").mockImplementation(setStateMock);
  });

  describe("AdminSsoContextProvider::loadSsoConfiguration", () => {
    it("should load Azure SSO configuration and store it in its state", async () => {
      expect.assertions(4);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.state.isLoaded).toBe(true);
      expect(adminSsoContext.state.ssoConfig.provider).toBe("azure");
      expect(adminSsoContext.state.ssoConfig.client_id).toBe(azureSettings.data.client_id);
      expect(adminSsoContext.formSettings).not.toBeNull();
    });

    it("should load Google SSO configuration and store it in its state", async () => {
      expect.assertions(3);
      const googleSettings = withGoogleSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => googleSettings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.state.isLoaded).toBe(true);
      expect(adminSsoContext.state.ssoConfig.provider).toBe("google");
      expect(adminSsoContext.state.ssoConfig.client_id).toBe(googleSettings.data.client_id);
    });

    it("should load OAuth2 SSO configuration and store it in its state", async () => {
      expect.assertions(3);
      const oauth2Settings = withOAuth2SsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => oauth2Settings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.state.isLoaded).toBe(true);
      expect(adminSsoContext.state.ssoConfig.provider).toBe("oauth2");
      expect(adminSsoContext.state.ssoConfig.client_id).toBe(oauth2Settings.data.client_id);
    });

    it("should load ADFS SSO configuration and store it in its state", async () => {
      expect.assertions(3);
      const adfsSettings = withAdfsSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => adfsSettings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.state.isLoaded).toBe(true);
      expect(adminSsoContext.state.ssoConfig.provider).toBe("adfs");
      expect(adminSsoContext.state.ssoConfig.client_id).toBe(adfsSettings.data.client_id);
    });

    it("should load PingOne SSO configuration and store it in its state", async () => {
      expect.assertions(4);
      const pingOneSettings = withPingOneSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => pingOneSettings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.state.isLoaded).toBe(true);
      expect(adminSsoContext.state.ssoConfig.provider).toBe("pingone");
      expect(adminSsoContext.state.ssoConfig.client_id).toBe(pingOneSettings.data.client_id);
      expect(adminSsoContext.state.ssoConfig.environment_id).toBe(pingOneSettings.data.environment_id);
    });

    it("should load configuration with no provider and store null ssoConfig", async () => {
      expect.assertions(2);
      const noProviderSettings = defaultSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => noProviderSettings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.state.isLoaded).toBe(true);
      expect(adminSsoContext.state.ssoConfig).toBeNull();
    });

    it("should open error dialog on API error", async () => {
      expect.assertions(2);
      const error = new Error("API error");
      props.context.port.addRequestListener("passbolt.sso.get-current", () => {
        throw error;
      });

      const result = await adminSsoContext.loadSsoConfiguration();

      expect(result).toStrictEqual({});
      expect(props.dialogContext.open).toHaveBeenCalled();
    });
  });

  describe("AdminSsoContextProvider::getSsoProviderFormEntity", () => {
    it("should return null for unknown provider", () => {
      expect.assertions(1);
      const result = adminSsoContext.getSsoProviderFormEntity({ provider: "unknown" });
      expect(result).toBeNull();
    });

    it("should return null for missing provider", () => {
      expect.assertions(1);
      const result = adminSsoContext.getSsoProviderFormEntity({});
      expect(result).toBeNull();
    });

    it("should return null for null settings", () => {
      expect.assertions(1);
      const result = adminSsoContext.getSsoProviderFormEntity(null);
      expect(result).toBeNull();
    });
  });

  describe("AdminSsoContextProvider::setValue", () => {
    it("should update the ssoConfig when a value is set", async () => {
      expect.assertions(2);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.setValue("client_id", "new-client-id");

      expect(adminSsoContext.state.ssoConfig.client_id).toBe("new-client-id");
      expect(adminSsoContext.formSettings.client_id).toBe("new-client-id");
    });

    it("should trigger validation if form has already been validated", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.validateData();
      const validateSpy = jest.spyOn(adminSsoContext, "validateData");

      adminSsoContext.setValue("client_id", "updated-client-id");

      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("AdminSsoContextProvider::hasFormChanged", () => {
    it("should return false when no changes have been made", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.hasFormChanged()).toBe(false);
    });

    it("should return true when changes have been made", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.setValue("client_id", "new-client-id");

      expect(adminSsoContext.hasFormChanged()).toBe(true);
    });

    it("should return true when sso is disabled but was previously configured", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.disableSso();

      expect(adminSsoContext.hasFormChanged()).toBe(true);
    });

    it("should return false when neither original nor form settings exist", () => {
      expect.assertions(1);
      expect(adminSsoContext.hasFormChanged()).toBe(false);
    });
  });

  describe("AdminSsoContextProvider::changeProvider", () => {
    it("should change the provider and cache the previous config", async () => {
      expect.assertions(2);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.changeProvider({ id: "google" });

      expect(adminSsoContext.state.ssoConfig.provider).toBe("google");
      expect(adminSsoContext.cachedSsoConfig["azure"]).not.toBeUndefined();
    });

    it("should restore cached config when switching back to a previous provider", async () => {
      expect.assertions(2);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      const originalClientId = adminSsoContext.state.ssoConfig.client_id;

      adminSsoContext.changeProvider({ id: "google" });
      adminSsoContext.changeProvider({ id: "azure" });

      expect(adminSsoContext.state.ssoConfig.provider).toBe("azure");
      expect(adminSsoContext.state.ssoConfig.client_id).toBe(originalClientId);
    });

    it("should not change provider if disabled", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.changeProvider({ id: "google", disabled: true });

      expect(adminSsoContext.state.ssoConfig.provider).toBe("azure");
    });
  });

  describe("AdminSsoContextProvider::disableSso", () => {
    it("should set ssoConfig to null and cache the current config", async () => {
      expect.assertions(3);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.disableSso();

      expect(adminSsoContext.state.ssoConfig).toBeNull();
      expect(adminSsoContext.formSettings).toBeNull();
      expect(adminSsoContext.cachedSsoConfig["azure"]).not.toBeUndefined();
    });
  });

  describe("AdminSsoContextProvider::isSsoConfigActivated", () => {
    it("should return false when no config is set", () => {
      expect.assertions(1);
      expect(adminSsoContext.isSsoConfigActivated()).toBe(false);
    });

    it("should return true when a config is loaded", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.isSsoConfigActivated()).toBe(true);
    });
  });

  describe("AdminSsoContextProvider::canDeleteSettings", () => {
    it("should return false when no existing config and sso is not disabled", () => {
      expect.assertions(1);
      expect(adminSsoContext.canDeleteSettings()).toBe(false);
    });

    it("should return true when existing config is disabled", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.disableSso();

      expect(adminSsoContext.canDeleteSettings()).toBe(true);
    });
  });

  describe("AdminSsoContextProvider::validateData", () => {
    it("should return true for valid data", async () => {
      expect.assertions(1);
      const googleSettings = withGoogleSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => googleSettings);

      await adminSsoContext.loadSsoConfiguration();

      expect(adminSsoContext.validateData()).toBe(true);
    });

    it("should return false for invalid data", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.setValue("client_id", "");

      expect(adminSsoContext.validateData()).toBe(false);
    });

    it("should set hasBeenValidated state to true", async () => {
      expect.assertions(1);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.validateData();

      expect(adminSsoContext.state.hasBeenValidated).toBe(true);
    });
  });

  describe("AdminSsoContextProvider::getErrors", () => {
    it("should return null before validation", () => {
      expect.assertions(1);
      expect(adminSsoContext.getErrors()).toBeNull();
    });

    it("should return errors after validation with invalid data", async () => {
      expect.assertions(2);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.setValue("client_id", "");
      adminSsoContext.validateData();

      const errors = adminSsoContext.getErrors();
      expect(errors).not.toBeNull();
      expect(errors.hasError("client_id")).toBe(true);
    });
  });

  describe("AdminSsoContextProvider::saveAndTestConfiguration", () => {
    it("should save draft and open test dialog", async () => {
      expect.assertions(2);
      const azureSettings = withAzureSsoSettings();
      const draftResponse = { ...azureSettings, id: "draft-id" };
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);
      props.context.port.addRequestListener("passbolt.sso.save-draft", () => draftResponse);

      await adminSsoContext.loadSsoConfiguration();
      await adminSsoContext.saveAndTestConfiguration();

      expect(props.dialogContext.open).toHaveBeenCalled();
      expect(adminSsoContext.state.ssoConfig.provider).toBe("azure");
    });

    it("should handle save draft error", async () => {
      expect.assertions(2);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);
      props.context.port.addRequestListener("passbolt.sso.save-draft", () => {
        throw new Error("Save error");
      });

      await adminSsoContext.loadSsoConfiguration();
      await adminSsoContext.saveAndTestConfiguration();

      expect(props.dialogContext.open).toHaveBeenCalled();
      expect(adminSsoContext.state.processing).toBe(false);
    });
  });

  describe("AdminSsoContextProvider::deleteSettings", () => {
    it("should delete settings and reset state", async () => {
      expect.assertions(3);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);
      props.context.port.addRequestListener("passbolt.sso.delete-settings", () => {});

      await adminSsoContext.loadSsoConfiguration();
      await adminSsoContext.deleteSettings();

      expect(adminSsoContext.state.ssoConfig).toBeNull();
      expect(adminSsoContext.formSettings).toBeNull();
      expect(adminSsoContext.originalSettings).toBeNull();
    });

    it("should handle delete error", async () => {
      expect.assertions(2);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);
      props.context.port.addRequestListener("passbolt.sso.delete-settings", () => {
        throw new Error("Delete error");
      });

      await adminSsoContext.loadSsoConfiguration();
      await adminSsoContext.deleteSettings();

      expect(props.dialogContext.open).toHaveBeenCalled();
      expect(adminSsoContext.state.processing).toBe(false);
    });
  });

  describe("AdminSsoContextProvider::handleSettingsActivation", () => {
    it("should mark SSO config as existing and update original settings", async () => {
      expect.assertions(2);
      const azureSettings = withAzureSsoSettings();
      props.context.port.addRequestListener("passbolt.sso.get-current", () => azureSettings);

      await adminSsoContext.loadSsoConfiguration();
      adminSsoContext.handleSettingsActivation();

      expect(adminSsoContext.isSsoConfigExisting).toBe(true);
      expect(adminSsoContext.originalSettings).not.toBeNull();
    });
  });
});
