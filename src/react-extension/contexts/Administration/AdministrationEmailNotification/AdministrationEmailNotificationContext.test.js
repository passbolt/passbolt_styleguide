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

import {defaultEmailNotificationSettings, defaultProps, withoutSourceNotificationSettings} from "../../../components/Administration/DisplayEmailNotificationsAdministration/DisplayEmailNotificationsAdministration.test.data";
import {AdminEmailNotificationContextProvider} from "./AdministrationEmailNotificationContext";
import {enableFetchMocks} from "jest-fetch-mock";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import EmailNotificationModel from "../../../../shared/models/emailNotification/EmailNotificationModel";
import EmailNotificationDTO from "../../../../shared/models/emailNotification/EmailNotificationDTO";



describe("AdminEmailNotificationContext", () => {
  let adminEmailNotificationContext; // The adminEmailNotificationContext to text
  const props = defaultProps(); // The props to pass

  //Initialize context by default
  const initContext = async() => {
    const settings = defaultEmailNotificationSettings();
    fetch.doMock(() => mockApiResponse(settings));
    await adminEmailNotificationContext.findEmailNotificationSettings();
  };

  beforeEach(() => {
    jest.resetAllMocks();
    adminEmailNotificationContext = new AdminEmailNotificationContextProvider(props);
    const setStateMock = state => adminEmailNotificationContext.state = Object.assign(adminEmailNotificationContext.state, state);
    jest.spyOn(adminEmailNotificationContext, "setState").mockImplementation(setStateMock);
    enableFetchMocks();
  });

  describe("AdminEmailNotificationContext::findEmailNotificationSettings", () => {
    it("should get the current settings and store it in its state", async() => {
      // Mock the call to API
      const mockApiSettingsFetch = fetch.doMockOnceIf(/settings\/emails\/notifications\.json/, () => mockApiResponse(defaultEmailNotificationSettings()));
      const expectedResult = new EmailNotificationModel(defaultEmailNotificationSettings());
      await adminEmailNotificationContext.findEmailNotificationSettings();

      expect.assertions(4);

      expect(mockApiSettingsFetch).toHaveBeenCalledTimes(1);
      expect(adminEmailNotificationContext.getSettings()).toEqual(expectedResult);
      expect(adminEmailNotificationContext.getCurrentSettings()).toEqual(expectedResult);
      expect(adminEmailNotificationContext.isProcessing()).toBeFalsy();
    });

    it("should initialize with default value if object is empty", async() => {
      // Mock the call to API
      const mockApiSettingsFetch = fetch.doMockOnceIf(/settings\/emails\/notifications\.json/, () => mockApiResponse({}));
      const expectedResult = new EmailNotificationModel(withoutSourceNotificationSettings());
      await adminEmailNotificationContext.findEmailNotificationSettings();

      expect.assertions(4);

      expect(mockApiSettingsFetch).toHaveBeenCalledTimes(1);
      expect(adminEmailNotificationContext.getSettings()).toEqual(expectedResult);
      expect(adminEmailNotificationContext.getCurrentSettings()).toEqual(expectedResult);
      expect(adminEmailNotificationContext.isProcessing()).toBeFalsy();
    });

    it("should set processing to true when loading settings", async() => {
      adminEmailNotificationContext.setProcessing(false);
      try {
        await adminEmailNotificationContext.findEmailNotificationSettings();
      } catch {
        expect(adminEmailNotificationContext.isProcessing()).toBeTruthy();
      }
    });
  });

  describe("AdminEmailNotificationContext::hasSettingsChanges", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should return true if settings is different then current setting", () => {
      adminEmailNotificationContext.setSettings("passwordCreate", false);

      expect.assertions(1);

      expect(adminEmailNotificationContext.hasSettingsChanges()).toBeTruthy();
    });

    it("should return false if settings is different then current setting", () => {
      adminEmailNotificationContext.setSettings("passwordCreate", false);
      adminEmailNotificationContext.setSettings("passwordCreate", true);

      expect.assertions(1);

      expect(adminEmailNotificationContext.hasSettingsChanges()).toBeFalsy();
    });
  });


  describe("AdminEmailNotificationContext::clearContext", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should clear the context and set it by default", () => {
      adminEmailNotificationContext.setSettings("passwordCreate", false);

      adminEmailNotificationContext.clearContext();

      expect.assertions(3);

      expect(adminEmailNotificationContext.isProcessing()).toBeTruthy();
      expect(adminEmailNotificationContext.getCurrentSettings()).toBe(null);
      expect(adminEmailNotificationContext.getSettings().passwordCreate).toBeTruthy();
    });
  });

  describe("AdminEmailNotificationContext::save", () => {
    it("should save settings and call findEmailNotificationSettings", async() => {
      fetch.doMockOnceIf(/settings\/emails\/notifications\.json/, () => mockApiResponse({}));
      const findEmailNotificationSettings = jest.spyOn(adminEmailNotificationContext, "findEmailNotificationSettings").mockImplementation();

      await adminEmailNotificationContext.save();

      expect.assertions(3);

      expect(adminEmailNotificationContext.isProcessing()).toBeTruthy();
      expect(findEmailNotificationSettings).toHaveBeenCalled();
      expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(expect.objectContaining(new EmailNotificationDTO()));
    });
  });

  describe("AdminEmailNotificationContext::setSettings", () => {
    it("should update settings object and not the current object", async() => {
      await initContext();
      adminEmailNotificationContext.setSettings("passwordUpdate", false);

      expect.assertions(2);

      expect(adminEmailNotificationContext.getCurrentSettings().passwordUpdate).toBeTruthy();
      expect(adminEmailNotificationContext.getSettings().passwordUpdate).toBeFalsy();
    });
  });
});
