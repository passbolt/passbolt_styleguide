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
 * @since         3.8.0
 */

/**
 * Unit tests on ManageSmtpAdministrationSettings in regard of specifications
 */
import SmtpProviders from "./SmtpProviders.data";
import {ManageSmtpAdministrationSettings} from "./ManageSmtpAdministrationSettings";
import ManageSmtpAdministrationSettingsPage from "./ManageSmtpAdministrationSettings.test.page";
import {waitFor} from "@testing-library/react";
import {defaultProps} from "./ManageSmtpAdministrationSettings.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import {
  defaultSmtpSettings,
  withoutSmtpSettings,
  withExistingSmtpSettings,
  withAwsSesSmtpSettings,
  withKnownProviderSmtpSettings,
  withNoAuthenticationMethod,
  withUsernameAuthenticationMethod,
} from "../../../contexts/AdminSmtpSettingsContext.test.data";
import {enableFetchMocks} from "jest-fetch-mock";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("ManageSmtpAdministrationSettings", () => {
  describe("As AD I should see the SMTP settings", () => {
    it('As a signed-in administrator I can see the SMTP settings screen', async() => {
      expect.assertions(4);
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(withoutSmtpSettings()));

      const page = new ManageSmtpAdministrationSettingsPage(defaultProps());

      await waitFor(() => {});

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Email server");
      expect(page.providerButtons).toBeTruthy();
      expect(page.providerButtons.length).toBe(SmtpProviders.length);
    });

    it('As a signed-in administrator I can see a provider different than “other” corresponding setting page', async() => {
      expect.assertions(10);
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(withoutSmtpSettings()));

      const page = new ManageSmtpAdministrationSettingsPage(defaultProps());

      await waitFor(() => {});

      const otherSmtpProviderIndex = SmtpProviders.findIndex(provider => provider.id === "other");
      await page.selectProvider(otherSmtpProviderIndex);

      const initialForm = {
        username: "username test",
        password: "password test",
        sender_name: "sender name test",
        sender_email: "sender email test",
      };

      await page.setFormWith(initialForm);

      expect(page.providerValue).toBe("Other");
      expect(page.username.value).toBe(initialForm.username);
      expect(page.password.value).toBe(initialForm.password);
      expect(page.sender_name.value).toBe(initialForm.sender_name);
      expect(page.sender_email.value).toBe(initialForm.sender_email);

      const gmailSmtpProviderIndex = SmtpProviders.findIndex(provider => provider.id === "google-mail");
      await page.selectProviderInSelectField(gmailSmtpProviderIndex);

      expect(page.providerValue).toBe("Google Mail");
      expect(page.username.value).toBe(initialForm.username);
      expect(page.password.value).toBe(initialForm.password);
      expect(page.sender_name.value).toBe(initialForm.sender_name);
      expect(page.sender_email.value).toBe(initialForm.sender_email);
    });

    it('As a signed-in administrator in the Email server settings I can read the SMTP server password via the show button', async() => {
      expect.assertions(2);
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(withoutSmtpSettings()));

      const page = new ManageSmtpAdministrationSettingsPage(defaultProps());

      await waitFor(() => {});

      const providerIndex = 0;
      await page.selectProvider(providerIndex);

      const passwordField = page.password;
      expect(passwordField.getAttribute("type")).toBe("password");

      await page.togglePasswordShow();
      expect(passwordField.getAttribute("type")).toBe("text");
    });

    it('As a signed-in administrator in the Email server settings with a provider selected, I can see the full list of providers in the “Email provider” dropdown', async() => {
      expect.assertions(2);
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(withoutSmtpSettings()));

      const page = new ManageSmtpAdministrationSettingsPage(defaultProps());

      await waitFor(() => {});

      const providerIndex = 0;
      await page.selectProvider(providerIndex);

      expect(page.providerSelectFieldItems.length).toBe(SmtpProviders.length - 1);
      expect(page.providerValue).toBe(SmtpProviders[providerIndex].name);
    });

    it('As a signed-in administrator in the Email server settings with a selected provider, I can see the advanced settings of the provider pre-populated', async() => {
      expect.assertions(6);
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(withoutSmtpSettings()));

      const page = new ManageSmtpAdministrationSettingsPage(defaultProps());

      await waitFor(() => {});

      const otherSmtpProviderIndex = SmtpProviders.findIndex(provider => provider.id === "other");
      await page.selectProvider(otherSmtpProviderIndex);

      expect(page.host.value).toBe("");
      expect(page.tlsValue).toBe("Yes");
      expect(page.port.value).toBe("");

      const gmailSmtpProviderIndex = SmtpProviders.findIndex(provider => provider.id === "google-mail");
      await page.selectProviderInSelectField(gmailSmtpProviderIndex);
      await page.showAdvancedSettings();
      const provider = SmtpProviders[gmailSmtpProviderIndex];
      expect(page.host.value).toBe(provider.defaultConfiguration.host);
      expect(page.tlsValue).toBe(provider.defaultConfiguration.tls ? "Yes" : "No");
      expect(page.port.value).toBe(provider.defaultConfiguration.port.toString());
    });
  });

  describe("As a signed-in administrator I can see the current SMTP settings", () => {
    it('As a signed-in administrator on the administration workspace, I can see the Email server settings populated with the configuration file settings', async() => {
      expect.assertions(8);
      const props = defaultProps();
      const smtpSettings = withExistingSmtpSettings({client: "passbolt.dev", source: "file"});
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.username.value).toBe(smtpSettings.username);
      expect(page.password.value).toBe(smtpSettings.password);
      expect(page.host.value).toBe(smtpSettings.host);
      expect(page.tlsValue).toBe(smtpSettings.tls ? "Yes" : "No");
      expect(page.port.value).toBe(smtpSettings.port.toString());
      expect(page.client.value).toBe(smtpSettings.client.toString());
      expect(page.sender_email.value).toBe(smtpSettings.sender_email);
      expect(page.sender_name.value).toBe(smtpSettings.sender_name);
    });

    it('As a signed-in administrator when the Email server settings are configured via configuration file, I can see a source warning message when I modify a field.', async() => {
      expect.assertions(2);
      const props = defaultProps();
      const smtpSettings = withExistingSmtpSettings({source: "file"});
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.settingsFromFileWarningMessage).toBeFalsy();

      await page.setFormWith({username: "test"});

      expect(page.settingsFromFileWarningMessage).toBeTruthy();
    });

    it('As a signed-in administrator when the Email server settings are configured via configuration file, I can see a source warning message when I modify a field.', async() => {
      expect.assertions(2);
      const props = defaultProps();
      const smtpSettings = withExistingSmtpSettings({source: "env"});
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.settingsFromFileWarningMessage).toBeFalsy();

      await page.setFormWith({username: "test"});

      expect(page.settingsFromFileWarningMessage).toBeTruthy();
    });

    it('As a signed-in administrator when the Email server settings are configured via the database, I do not see a source warning message when I modify a field. ', async() => {
      expect.assertions(2);
      const props = defaultProps();
      const smtpSettings = withExistingSmtpSettings({source: "db"});
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.settingsFromFileWarningMessage).toBeFalsy();

      await page.setFormWith({username: "test"});

      expect(page.settingsFromFileWarningMessage).toBeFalsy();
    });

    it('As a signed-in administrator in the Email server settings I can see that a selected provider changes to “Other” when I modify the settings', async() => {
      expect.assertions(2);
      const props = defaultProps();
      const smtpSettings = withAwsSesSmtpSettings();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      const awsSesProvider = SmtpProviders.find(provider => provider.id === "aws-ses");
      const otherProvider = SmtpProviders.find(provider => provider.id === "other");

      expect(page.providerValue).toBe(awsSesProvider.name);

      await page.showAdvancedSettings();
      await page.setFormWith({host: `${awsSesProvider.defaultConfiguration.host}comcom`});

      expect(page.providerValue).toBe(otherProvider.name);
    });

    it('As a signed-in administrator in the Email server settings I can see that manual settings change to a specific provider when the setting match the default provider settings', async() => {
      expect.assertions(2);
      const props = defaultProps();
      const smtpSettings = withExistingSmtpSettings({
        tls: true,
        port: 587
      });
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      const awsSesProvider = SmtpProviders.find(provider => provider.id === "aws-ses");
      const otherProvider = SmtpProviders.find(provider => provider.id === "other");

      //By default, the TLS selected value in the component state is Yes. To ensure more coverage we pick a config without TLS.
      const aweSesConfiguration = awsSesProvider.availableConfigurations.find(configuration => configuration.port === 25);

      expect(page.providerValue).toBe(otherProvider.name);

      await page.setFormWith({
        host: aweSesConfiguration.host,
        port: aweSesConfiguration.port,
      });
      const desiredTlsValue = aweSesConfiguration.tls ? "Yes" : "No";
      if (page.tlsValue !== desiredTlsValue) {
        await page.setTls(aweSesConfiguration.tls);
      }

      expect(page.providerValue).toBe(awsSesProvider.name);
    });

    it('As a signed-in administrator in the Email server settings I can see an error dialog with error details if an error occurs during the fetch of the SMTP settings', async() => {
      expect.assertions(1);
      const expectedError = new PassboltApiFetchError("Something went wrong");
      const props = defaultProps({
        dialogContext: {
          open: jest.fn()
        }
      });
      fetch.doMockOnceIf(/smtp\/settings.json/, () => { throw expectedError; });
      new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {
        error: expectedError
      });
    });

    it('As a signed-in administrator in the Email server settings I can see that a selected authentication method is set to “Username and password” if both username and password returned by the API are set', async() => {
      expect.assertions(3);
      const props = defaultProps();
      const smtpSettings = withExistingSmtpSettings();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.authenticationMethodValue).toBe(ManageSmtpAdministrationSettings.AUTHENTICATION_METHOD_USERNAME_PASSWORD);
      expect(page.username.value).toBe(smtpSettings.username);
      expect(page.password.value).toBe(smtpSettings.password);
    });

    it('As a signed-in administrator in the Email server settings I can see that a selected authentication method is set to “Username only” if username is set but password returned by the API is set to null', async() => {
      expect.assertions(3);
      const props = defaultProps();
      const smtpSettings = withUsernameAuthenticationMethod();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.authenticationMethodValue).toBe(ManageSmtpAdministrationSettings.AUTHENTICATION_METHOD_USERNAME);
      expect(page.username.value).toBe(smtpSettings.username);
      expect(page.isPasswordVisible).toBeFalsy();
    });

    it('As a signed-in administrator in the Email server settings I can see that a selected authentication method is set to “None” if username and password returned by the API are set to null', async() => {
      expect.assertions(3);
      const props = defaultProps();
      const smtpSettings = withNoAuthenticationMethod();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.authenticationMethodValue).toBe(ManageSmtpAdministrationSettings.AUTHENTICATION_METHOD_NONE);
      expect(page.isUsernameVisible).toBeFalsy();
      expect(page.isPasswordVisible).toBeFalsy();
    });
  });

  describe("As a signed-in administrator I can access the different help pages", () => {
    it("As a signed-in administrator I can access the Email server help page", async() => {
      expect.assertions(1);
      const props = defaultProps();
      const smtpSettings = withExistingSmtpSettings();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.passboltHelpPage).toBeTruthy();
    });

    it("As a signed-in administrator in the “Email server” setting, after choosing a provider different than 'Other' I can see a second helpbox", async() => {
      expect.assertions(5);
      const props = defaultProps();
      const smtpSettings = withExistingSmtpSettings();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      const awsSesSmtpProviderIndex = SmtpProviders.findIndex(provider => provider.id === "aws-ses");
      await page.selectProviderInSelectField(awsSesSmtpProviderIndex);

      expect(page.passboltHelpPage).toBeTruthy();
      expect(page.smtpProviderHelpPage).toBeTruthy();
      expect(page.smtpProviderHelpPage.getAttribute("href")).toBe(SmtpProviders[awsSesSmtpProviderIndex].help_page);
      expect(page.smtpProviderHelpPage.getAttribute("target")).toBe("_blank");
      expect(page.smtpProviderHelpPage.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("As a signed-in administrator in the “Email server” setting, I cannot see the second helpbox when the provider is 'Other'", async() => {
      const smtpSettings = withKnownProviderSmtpSettings();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      expect.assertions(4);
      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.passboltHelpPage).toBeTruthy();
      expect(page.smtpProviderHelpPage).toBeTruthy();

      const otherSmtpProviderIndex = SmtpProviders.findIndex(provider => provider.id === "other");
      await page.selectProviderInSelectField(otherSmtpProviderIndex - 1);

      expect(page.passboltHelpPage).toBeTruthy();
      expect(page.smtpProviderHelpPage).toBeFalsy();
    });

    it("As a signed-in administrator in the “Email server” setting, I can see error message on fields that are not valid", async() => {
      const smtpSettings = withExistingSmtpSettings();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      expect.assertions(14);
      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      const emptyFields = {
        username: "",
        password: "",
        sender_email: "",
        sender_name: "",
        host: "",
        port: "",
        client: "passbolt.dev:9090"
      };
      await page.setFormWith(emptyFields);
      await page.clickOn(page.toolbarActionsSaveButton, () => true);

      expect(page.username_error).toBeFalsy();
      expect(page.password_error).toBeFalsy();
      expect(page.sender_email_error.textContent).toBe("Sender email is required");
      expect(page.sender_name_error.textContent).toBe("Sender name is required");
      expect(page.host_error.textContent).toBe("SMTP Host is required");
      expect(page.port_error.textContent).toBe("Port must be a valid number");
      expect(page.client_error.textContent).toBe("SMTP client should be a valid domain or IP address");

      const withFieldErroneous = {
        username: 1234,
        password: 1234,
        sender_email: "email at passbolt dot com",
        sender_name: 1234,
        host: "this is no host",
        port: -1,
        client: "passboltveryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryeryerylongdomain.subdomain.dev",
      };
      await page.setFormWith(withFieldErroneous);

      expect(page.username_error).toBeFalsy();
      expect(page.password_error).toBeFalsy();
      expect(page.sender_email_error.textContent).toBe("Sender email must be a valid email");
      expect(page.sender_name_error?.textContent).toBeFalsy();
      expect(page.host_error?.textContent).toBeFalsy();
      expect(page.port_error.textContent).toBe("Port must be a number between 1 and 65535");
      expect(page.client_error.textContent).toBe("SMTP client should be a valid domain or IP address");
    });
  });

  describe("As a signed-in administrator I can save the Email server settings", () => {
    it("As a signed-in administrator when the “Email server” settings have not changed, I cannot trigger the “Save settings” action", async() => {
      const smtpSettings = withKnownProviderSmtpSettings();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      expect.assertions(1);
      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);

      await waitFor(() => {});

      expect(page.isSaveButtonEnabled()).toBeFalsy();
    });

    it("As a signed-in administrator saving the “Email server” settings, I cannot edit the form", async() => {
      expect.assertions(8);

      const smtpSettings = withKnownProviderSmtpSettings();
      const formToSave = {
        username: "username test",
        password: "password test",
        sender_name: "sender name test",
        sender_email: "sender@passbolt.com",
      };
      const expectedSettingsToSave = {
        ...smtpSettings,
        ...formToSave
      };

      //first call is a GET call for the settings
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      //second call is a POST to save the settings
      let promiseResolution = null;
      fetch.doMockOnceIf(/smtp\/settings.json/, data => new Promise(resolve => {
        const requestBody = JSON.parse(data.body.toString());
        expect(requestBody).toStrictEqual(expectedSettingsToSave);
        promiseResolution = resolve;
      }));

      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);
      await waitFor(() => {});

      expect(page.username.disabled).toBe(false);

      await page.setFormWith(formToSave);
      expect(page.isSaveButtonEnabled()).toBe(true);

      await page.saveSettings();
      expect(page.isSaveButtonEnabled()).toBe(false);

      expect(page.username.disabled).toBe(true);
      promiseResolution(mockApiResponse(expectedSettingsToSave));

      await waitFor(() => {});

      expect(page.isSaveButtonEnabled()).toBe(true);

      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The SMTP settings have been saved successfully");
    });

    it("As a signed-in administrator on the “Email server” settings page, I can edit the form after saving the settings with success", async() => {
      expect.assertions(1);

      const smtpSettings = withKnownProviderSmtpSettings();
      const formToSave = {
        username: "username test",
        password: "password test",
        sender_name: "sender name test",
        sender_email: "sender@passbolt.com"
      };

      //first call is a GET call for the settings
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      //second call is a POST to save the settings
      let promiseResolution = null;
      fetch.doMockOnceIf(/smtp\/settings.json/, () => new Promise(resolve => {
        promiseResolution = resolve;
      }));

      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);
      await waitFor(() => {});

      await page.setFormWith(formToSave);
      await page.saveSettings();

      promiseResolution();
      await waitFor(() => {});

      expect(page.username.disabled).toBe(false);
    });

    it("As a signed-in administrator on the “Email server” settings page, I can edit the form after an unsuccessful attempt to save the settings", async() => {
      expect.assertions(1);

      const smtpSettings = withKnownProviderSmtpSettings();
      const formToSave = {
        username: "username test",
        password: "password test",
        sender_name: "sender name test",
        sender_email: "sender@passbolt.com"
      };

      //first call is a GET call for the settings
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      //second call is a POST to save the settings
      let promiseRejection = null;
      fetch.doMockOnceIf(/smtp\/settings.json/, () => new Promise((resolve, reject) => {
        promiseRejection = reject;
      }));

      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);
      await waitFor(() => {});

      await page.setFormWith(formToSave);
      await page.saveSettings();

      promiseRejection();
      await waitFor(() => {});

      expect(page.username.disabled).toBe(false);
    });

    it("As a signed-in administrator on the “Email server” settings page, I can update the authentication method to 'None' and save the form", async() => {
      expect.assertions(6);

      const smtpSettings = withKnownProviderSmtpSettings();
      const expectedSettingsToSave = {
        ...smtpSettings,
        username: null,
        password: null
      };

      //first call is a GET call for the settings
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      //second call is a POST to save the settings
      let promiseResolution = null;
      fetch.doMockOnceIf(/smtp\/settings.json/, data => new Promise(resolve => {
        const requestBody = JSON.parse(data.body.toString());
        expect(requestBody).toStrictEqual(expectedSettingsToSave);
        promiseResolution = resolve;
      }));

      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);
      await waitFor(() => {});

      await page.selectAuthenticationMethod(0);

      expect(page.isSaveButtonEnabled()).toBe(true);
      expect(page.isUsernameVisible).toBe(false);
      expect(page.isPasswordVisible).toBe(false);

      await page.saveSettings();
      promiseResolution(mockApiResponse(expectedSettingsToSave));
      await waitFor(() => {});

      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The SMTP settings have been saved successfully");
    });

    it("As a signed-in administrator on the “Email server” settings page, I can update the authentication method to 'Username only' and save the form", async() => {
      expect.assertions(6);

      const smtpSettings = withKnownProviderSmtpSettings();
      const expectedSettingsToSave = {
        ...smtpSettings,
        username: 'username-only',
        password: null
      };

      //first call is a GET call for the settings
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      //second call is a POST to save the settings
      let promiseResolution = null;
      fetch.doMockOnceIf(/smtp\/settings.json/, data => new Promise(resolve => {
        const requestBody = JSON.parse(data.body.toString());
        expect(requestBody).toStrictEqual(expectedSettingsToSave);
        promiseResolution = resolve;
      }));

      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);
      await waitFor(() => {});

      await page.selectAuthenticationMethod(1);

      expect(page.isSaveButtonEnabled()).toBe(true);
      expect(page.isUsernameVisible).toBe(true);
      expect(page.isPasswordVisible).toBe(false);

      await page.setFormWith({username: expectedSettingsToSave.username});
      await page.saveSettings();
      promiseResolution(mockApiResponse(expectedSettingsToSave));
      await waitFor(() => {});

      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The SMTP settings have been saved successfully");
    });

    it("As a signed-in administrator in the “Email server” setting, I cannot save the “Email server” setting when the form does not validate\nAs a signed-in administrator when the SMTP server is configured, I can save the Email server setting when the form validates", async() => {
      expect.assertions(2);

      const sender_email = "sender@passbolt.com";
      const smtpSettings = withKnownProviderSmtpSettings();

      const expectedSettingsToSave = {
        ...smtpSettings,
        sender_email
      };

      //first call is a GET call for the settings
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      //second call is a POST to save the settings
      let hasBeenCalledAlready = false;
      fetch.doMockOnceIf(/smtp\/settings.json/, async data => {
        const requestBody = JSON.parse(data.body.toString());
        expect(requestBody).toStrictEqual(expectedSettingsToSave);

        //we expect just one call as saving an invalid shouldn't produce an API call
        expect(hasBeenCalledAlready).toBe(false);
        hasBeenCalledAlready = true;
      });

      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);
      await waitFor(() => {});

      await page.setFormWith({sender_email: ""});

      // equivalent of `await page.saveSettings()` without the check of form change state is it shouldn't change.
      await page.clickOn(page.toolbarActionsSaveButton, () => true);

      await page.setFormWith({sender_email});

      await page.saveSettings();
    });

    it("As a signed-in administrator I can cancel the “Email server” settings when I do not click on the save button and leave the page", async() => {
      expect.assertions(8);

      const smtpSettings = withKnownProviderSmtpSettings();
      const newData = {
        username: "username test",
        password: "password test",
        sender_name: "sender name test",
        sender_email: "sender@passbolt.com"
      };

      //2 calls expected due to mounting component twice
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      const props = defaultProps();
      const page = new ManageSmtpAdministrationSettingsPage(props);
      await waitFor(() => {});

      await page.setFormWith(newData);

      page.unmountManagerComponent();
      await waitFor(() => {});

      expect(page.username).toBeNull();
      expect(page.password).toBeNull();
      expect(page.sender_name).toBeNull();
      expect(page.sender_email).toBeNull();

      page.remountManagerComponent();
      await waitFor(() => {});

      expect(page.username.value).toBe(smtpSettings.username);
      expect(page.password.value).toBe(smtpSettings.password);
      expect(page.sender_name.value).toBe(smtpSettings.sender_name);
      expect(page.sender_email.value).toBe(smtpSettings.sender_email);
    });

    it('As a signed-in administrator when the “Email server” settings are empty, I cannot trigger the “Send test email” workflow', async() => {
      expect.assertions(2);

      const smtpSettings = defaultSmtpSettings();
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      const page = new ManageSmtpAdministrationSettingsPage(defaultProps());
      await waitFor(() => {});

      expect(page.exists).toBeTruthy();
      expect(page.toolbarActionsTestButton.hasAttribute("disabled")).toBeTruthy();
    });

    it('As a signed-in administrator in the “Email server” setting, I cannot trigger the “Send test email” workflow when the form does not validate\nAs a signed-in administrator when the “Email server” settings form validate, I can trigger the “Send test email” workflow', async() => {
      expect.assertions(2);
      const sender_email = "sender@passbolt.com";
      const smtpSettings = withKnownProviderSmtpSettings();

      //first call is a GET call for the settings
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));

      const page = new ManageSmtpAdministrationSettingsPage(defaultProps());
      await waitFor(() => {});

      await page.setFormWith({sender_email: ""});

      // equivalent of `await page.saveSettings()` without the check of form change state is it shouldn't change.
      await page.clickOn(page.toolbarActionsTestButton, () => true);
      expect(page.sender_email_error.textContent).toBe("Sender email is required");

      await page.setFormWith({sender_email});

      await page.testSettings();

      expect(page.sendTestEmailDialog).toBeTruthy();
    });

    it('As a signed-in administrator on the “Send test email” dialog, I can see the “Email sent” dialog when the test email was successfully sent', async() => {
      expect.assertions(3);
      const props = defaultProps();
      const smtpSettings = withKnownProviderSmtpSettings();
      const debugLog = {
        debug: [{message: "everything is fine"}]
      };

      //first call is a GET call for the settings
      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(smtpSettings));
      fetch.doMockOnceIf(/smtp\/email.json/, async data => {
        const requestBody = JSON.parse(data.body.toString());
        expect(requestBody).toStrictEqual({
          ...smtpSettings,
          email_test_to: props.context.loggedInUser.username
        });

        return mockApiResponse(debugLog);
      });

      const page = new ManageSmtpAdministrationSettingsPage(props);
      await waitFor(() => {});

      // equivalent of `await page.saveSettings()` without the check of form change state is it shouldn't change.
      await page.clickOn(page.toolbarActionsTestButton, () => true);
      await page.testSettings();

      expect(page.sendTestEmailDialog).toBeTruthy();

      await page.runTestFromDialog();

      await page.showLogs();

      expect(page.logDetails.value).toBe(JSON.stringify(debugLog.debug, null, 4));
    });
  });
});
