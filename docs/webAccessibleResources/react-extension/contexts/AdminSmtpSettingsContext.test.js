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
import {defaultAppContext} from "./ApiAppContext.test.data";
import {defaultSmtpSettings} from "./AdminSmtpSettingsContext.test.data";
import {AdminSmtpSettingsContextProvider} from "./AdminSmtpSettingsContext";
import {v4 as uuid} from "uuid";
import {mockApiResponse} from "../../../test/mocks/mockApiResponse";
import {enableFetchMocks} from "jest-fetch-mock";
import SmtpProviders from "../components/Administration/ManageSmtpAdministrationSettings/SmtpProviders.data";

describe("AdminSmtpSettingsContext", () => {
  let adminSmtpContext; // The AdminSmtpSettingsContext to test
  const props = { // The props to pass
    context: defaultAppContext(),
    adminSmtpSettingsContext: defaultSmtpSettings(),
    actionFeedbackContext: {
      displaySuccess: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    },
    t: s => s
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
    it("should get the current SMTP settings and store them in its state with the corresponding provider", async() => {
      const currentSmtpSettings = {
        id: uuid(),
        source: "db",
        username: "username test",
        password: "passphrase test",
        host: "smtp.passbolt.com",
        port: 587,
        client: "passbolt.dev",
        tls: true,
        sender_email: "test@passbolt.com",
        sender_name: "Passbolt test",
        created_by: uuid(),
        modified_by: uuid(),
        created: "2022-10-11T08:09:00+00:00",
        modified: "2022-10-11T08:09:00+00:00",
      };

      const mockApiSmtpSettingsFetch = fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));
      const otherProvider = SmtpProviders.find(provider => provider.id === "other");
      const expectedSettings = {...currentSmtpSettings, provider: otherProvider};

      await adminSmtpContext.findSmtpSettings();

      expect.assertions(2);
      expect(mockApiSmtpSettingsFetch).toHaveBeenCalledTimes(1);
      expect(adminSmtpContext.getCurrentSmtpSettings()).toStrictEqual(expectedSettings);
    });
  });

  describe("AdminSmtpSettingsContextProvider::saveSettings()", () => {
    it("should get the current SMTP settings and store them in its state with the corresponding provider", async() => {
      expect.assertions(3);

      const currentSmtpSettings = {
        id: uuid(),
        source: "db",
        username: "username test",
        password: "passphrase test",
        host: "smtp.passbolt.com",
        port: 587,
        tls: true,
        client: null,
        sender_email: "test@passbolt.com",
        sender_name: "Passbolt test",
        created_by: uuid(),
        modified_by: uuid(),
        created: "2022-10-11T08:09:00+00:00",
        modified: "2022-10-11T08:09:00+00:00",
      };

      const newFormData = {
        username: "other username test",
        password: "other passphrase test",
        host: "smtp.other.com",
        port: 25,
        client: "",
        tls: false,
        sender_email: "othertest@passbolt.com",
        sender_name: "other Passbolt test",
      };

      const smtpSettingsCallMock = fetch.doMockOnceIf(/smtp\/settings.json/, () => mockApiResponse(currentSmtpSettings));

      fetch.doMockOnceIf(/smtp\/settings.json/, req => {
        const requestData = JSON.parse(req.body);
        const expectedData = {
          ...currentSmtpSettings,
          ...newFormData,
          tls: false
        };
        expect(requestData).toStrictEqual(expectedData);
        return mockApiResponse(expectedData);
      });

      await adminSmtpContext.findSmtpSettings();

      for (const key in newFormData) {
        adminSmtpContext.setData(key, newFormData[key]);
      }

      await adminSmtpContext.saveSmtpSettings();
      const settings = await adminSmtpContext.getCurrentSmtpSettings();

      // 1 call is a GET, the other is the POST
      expect(smtpSettingsCallMock).toHaveBeenCalledTimes(2);
      expect(settings.source).toEqual("db");
    });
  });
});
