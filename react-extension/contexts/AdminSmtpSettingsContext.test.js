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
import { defaultAppContext } from "./ApiAppContext.test.data";
import {
  defaultSmtpSettingsDto,
  withExistingSmtpSettingsApiDto,
  withExistingSmtpSettingsFormDto,
  withGmailSmtpSettingsApiDto,
} from "./AdminSmtpSettingsContext.test.data";
import { AdminSmtpSettingsContextProvider } from "./AdminSmtpSettingsContext";
import { mockApiResponse } from "../../../test/mocks/mockApiResponse";
import { enableFetchMocks } from "jest-fetch-mock";
import SmtpProviders from "../components/Administration/ManageSmtpAdministrationSettings/SmtpProviders.data";

describe("AdminSmtpSettingsContext", () => {
  let adminSmtpContext; // The AdminSmtpSettingsContext to test
  const props = {
    // The props to pass
    context: defaultAppContext(),
    adminSmtpSettingsContext: defaultSmtpSettingsDto(),
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
    },
    dialogContext: {
      open: jest.fn(),
    },
    t: (s) => s,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    adminSmtpContext = new AdminSmtpSettingsContextProvider(props);
    const setStateMock = (state, callback) => {
      adminSmtpContext.state = Object.assign(adminSmtpContext.state, state);
      if (callback) {
        callback();
      }
    };
    jest.spyOn(adminSmtpContext, "setState").mockImplementation(setStateMock);
    enableFetchMocks();
  });

  describe("AdminSmtpSettingsContextProvider::findSmtpSettings", () => {
    it("should get the current SMTP settings and store them in its state with the corresponding provider", async () => {
      const currentSmtpSettings = withExistingSmtpSettingsApiDto();

      const mockApiSmtpSettingsFetch = fetch.doMockOnceIf(/smtp\/settings.json/, () =>
        mockApiResponse(currentSmtpSettings),
      );

      const expectedSettings = withExistingSmtpSettingsFormDto();

      await adminSmtpContext.findSmtpSettings();

      expect.assertions(2);
      expect(mockApiSmtpSettingsFetch).toHaveBeenCalledTimes(1);
      expect(adminSmtpContext.getCurrentSmtpSettings()).toStrictEqual(expectedSettings);
    });
  });

  describe("AdminSmtpSettingsContextProvider::saveSettings()", () => {
    it("should get the current SMTP settings and store them in its state with the corresponding provider", async () => {
      expect.assertions(4);

      const currentSmtpSettings = withExistingSmtpSettingsApiDto({ client: null });

      const newFormData = {
        username: "other username test",
        password: "other passphrase test",
        host: "smtp.other.com",
        port: 25,
        client: null,
        tls: false,
        sender_email: "othertest@passbolt.com",
        sender_name: "other Passbolt test",
      };

      const smtpSettingsCallMock = fetch.doMockOnceIf(/smtp\/settings.json/, () =>
        mockApiResponse(currentSmtpSettings),
      );

      fetch.doMockOnceIf(/smtp\/settings.json/, (req) => {
        const requestData = JSON.parse(req.body);
        const expectedData = {
          ...currentSmtpSettings,
          ...newFormData,
          tls: false,
        };
        expect(requestData).toStrictEqual(expectedData);
        return mockApiResponse(expectedData);
      });

      await adminSmtpContext.findSmtpSettings();
      for (const key in newFormData) {
        adminSmtpContext.setData({ [key]: newFormData[key] });
      }

      await adminSmtpContext.saveSmtpSettings();
      const settings = await adminSmtpContext.getCurrentSmtpSettings();

      expect(smtpSettingsCallMock).toHaveBeenCalledTimes(2);
      expect(settings.source).toEqual("db");
      expect(adminSmtpContext.isSettingsModified()).toBe(false);
    });
  });

  describe("AdminSmtpSettingsContextProvider::isSettingsModified()", () => {
    it("should return false when no changes have been made", async () => {
      expect.assertions(1);
      const currentSmtpSettings = withExistingSmtpSettingsApiDto();

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.findSmtpSettings();

      expect(adminSmtpContext.isSettingsModified()).toBe(false);
    });

    it("should return true when changes have been made", async () => {
      expect.assertions(1);
      const currentSmtpSettings = withExistingSmtpSettingsApiDto();

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.findSmtpSettings();
      adminSmtpContext.setData({ host: "new-host.com" });

      expect(adminSmtpContext.isSettingsModified()).toBe(true);
    });

    it("should return false after saving", async () => {
      expect.assertions(2);
      const currentSmtpSettings = withExistingSmtpSettingsApiDto();

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.findSmtpSettings();
      adminSmtpContext.setData({ host: "new-host.com" });

      expect(adminSmtpContext.isSettingsModified()).toBe(true);

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.saveSmtpSettings();
      // Flush microtask queue to ensure async save callback completes
      await new Promise((resolve) => process.nextTick(resolve));

      expect(adminSmtpContext.isSettingsModified()).toBe(false);
    });
  });

  describe("AdminSmtpSettingsContextProvider::setData()", () => {
    it("should auto-detect provider when Gmail host/port/tls is set", async () => {
      expect.assertions(1);
      const currentSmtpSettings = withExistingSmtpSettingsApiDto({
        host: "smtp.example.com",
        client: null,
        username: null,
        password: null,
      });

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.findSmtpSettings();

      adminSmtpContext.setData({ host: "smtp.gmail.com", port: 587, tls: true });

      expect(adminSmtpContext.getCurrentSmtpSettings().provider).toBe("google-mail");
    });

    it("should set username and password to null when auth method transitions to none", async () => {
      expect.assertions(2);
      const currentSmtpSettings = withExistingSmtpSettingsApiDto({ host: "smtp.example.com", client: null });

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.findSmtpSettings();

      adminSmtpContext.setData({ username: null, password: null });
      const settings = adminSmtpContext.getCurrentSmtpSettings();

      expect(settings.username).toBeNull();
      expect(settings.password).toBeNull();
    });
  });

  describe("AdminSmtpSettingsContextProvider::changeProvider()", () => {
    it("should apply provider default configuration when changing provider", async () => {
      expect.assertions(4);
      const currentSmtpSettings = withExistingSmtpSettingsApiDto({
        host: "smtp.example.com",
        port: 25,
        tls: false,
        client: null,
        username: null,
        password: null,
      });

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.findSmtpSettings();

      const gmailProvider = SmtpProviders.find((p) => p.id === "google-mail");
      adminSmtpContext.changeProvider(gmailProvider);

      const settings = adminSmtpContext.getCurrentSmtpSettings();
      expect(settings.host).toBe(gmailProvider.defaultConfiguration.host);
      expect(settings.port).toBe(gmailProvider.defaultConfiguration.port);
      expect(settings.tls).toBe(gmailProvider.defaultConfiguration.tls);
      expect(settings.provider).toBe("google-mail");
    });

    it("should not update state when changing to the same provider", async () => {
      expect.assertions(1);
      const currentSmtpSettings = withGmailSmtpSettingsApiDto();

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.findSmtpSettings();

      const setStateSpy = jest.spyOn(adminSmtpContext, "setState");
      const gmailProvider = SmtpProviders.find((p) => p.id === "google-mail");
      adminSmtpContext.changeProvider(gmailProvider);
      adminSmtpContext.changeProvider(gmailProvider); // second call should be a no-op

      expect(setStateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("AdminSmtpSettingsContextProvider::getErrors()", () => {
    it("should return null before validation", async () => {
      expect.assertions(1);
      expect(adminSmtpContext.getErrors()).toBeNull();
    });

    it("should return an EntityValidationError with the relevant errors after validation", async () => {
      expect.assertions(2);
      const currentSmtpSettings = withExistingSmtpSettingsApiDto({ client: null });

      fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      await adminSmtpContext.findSmtpSettings();
      adminSmtpContext.setData({ sender_email: "not-an-email" });

      const isValid = adminSmtpContext.validateData();
      expect(isValid).toBe(false);

      const errors = adminSmtpContext.getErrors();
      expect(errors.hasError("sender_email")).toBe(true);
    });
  });
});
