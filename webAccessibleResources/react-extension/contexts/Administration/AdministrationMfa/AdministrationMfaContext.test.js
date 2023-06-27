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

import {defaultProps} from "../../../../react-extension/components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.test.data";
import {AdminMfaContextProvider} from "./AdministrationMfaContext";
import {enableFetchMocks} from 'jest-fetch-mock';
import {mockMfaSettings, mockDuoError} from "../../../../react-extension/components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.test.data";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import MfaModel from '../../../../shared/models/Mfa/MfaModel';
import {mockDefaultMfaModel} from '../../../components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.test.data';
import MfaDTO from '../../../../shared/models/Mfa/MfaDTO';

describe("AdminMfaContext", () => {
  let adminMfaContext; // The adminMfaContext to test
  const props = defaultProps(); // The props to pass

  //Initialize context by default
  const initContext = async() => {
    fetch.doMock(() => mockApiResponse(mockMfaSettings));
    await adminMfaContext.findMfaSettings();
  };

  beforeEach(() => {
    jest.resetAllMocks();
    adminMfaContext = new AdminMfaContextProvider(props);
    const setStateMock = state => adminMfaContext.state = Object.assign(adminMfaContext.state, state);
    jest.spyOn(adminMfaContext, "setState").mockImplementation(setStateMock);
    enableFetchMocks();
  });
  describe("AdminMfaContext::findMfaSettings", () => {
    it("should get the current settings and store it in its state", async() => {
      // Mock the call to API
      const mockApiSettingsFetch = fetch.doMockOnceIf(/mfa\/settings.json/, () => mockApiResponse(mockMfaSettings));
      const expectedResult = new MfaModel(mockMfaSettings);
      await adminMfaContext.findMfaSettings();

      expect.assertions(4);

      expect(mockApiSettingsFetch).toHaveBeenCalledTimes(1);
      expect(adminMfaContext.getSettings()).toEqual(expectedResult);
      expect(adminMfaContext.getCurrentSettings()).toEqual(expectedResult);
      expect(adminMfaContext.isProcessing()).toBeFalsy();
    });

    it("should initialize with default value if object is empty", async() => {
      // Mock the call to API
      const mockApiSettingsFetch = fetch.doMockOnceIf(/mfa\/settings.json/, () => mockApiResponse({}));
      await adminMfaContext.findMfaSettings();

      expect.assertions(4);

      expect(mockApiSettingsFetch).toHaveBeenCalledTimes(1);
      expect(adminMfaContext.getSettings()).toEqual(mockDefaultMfaModel);
      expect(adminMfaContext.getCurrentSettings()).toEqual(mockDefaultMfaModel);
      expect(adminMfaContext.isProcessing()).toBeFalsy();
    });

    it("should set processing to true when loading settings", async() => {
      adminMfaContext.setProcessing(false);
      try {
        await adminMfaContext.findMfaSettings();
      } catch {
        expect.assertions(1);
        expect(adminMfaContext.isProcessing()).toBeTruthy();
      }
    });
  });

  describe("AdminMfaContext::hasSettingsChanges", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should return true if settings is different then current setting", () => {
      adminMfaContext.setSettings("duoToggle", false);

      expect.assertions(1);

      expect(adminMfaContext.hasSettingsChanges()).toBeTruthy();
    });

    it("should return false if settings is different then current setting", () => {
      adminMfaContext.setSettings("duoToggle", false);
      adminMfaContext.setSettings("duoToggle", true);

      expect.assertions(1);

      expect(adminMfaContext.hasSettingsChanges()).toBeFalsy();
    });
  });

  describe("AdminMfaContext::clearContext", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should clear the context and set it by default", () => {
      adminMfaContext.setSettings("duoToggle", true);
      adminMfaContext.setSettings("yubikeyToggle", true);
      adminMfaContext.setSettings("toptToggle", true);
      adminMfaContext.clearContext();

      expect.assertions(5);

      expect(adminMfaContext.isProcessing()).toBeTruthy();
      expect(adminMfaContext.getCurrentSettings()).toBe(null);
      expect(adminMfaContext.getSettings().duoToggle).toBeFalsy();
      expect(adminMfaContext.getSettings().toptToggle).toBeFalsy();
      expect(adminMfaContext.getSettings().yubikeyToggle).toBeFalsy();
    });
  });

  describe("AdminMfaContext::save", () => {
    it("should save settings and call findMfaSettings", async() => {
      fetch.doMockOnceIf(/mfa\/settings.json/, () => mockApiResponse({}));
      const findSettings = jest.spyOn(adminMfaContext, "findMfaSettings").mockImplementation();

      await adminMfaContext.save();

      expect.assertions(3);

      expect(adminMfaContext.isProcessing()).toBeTruthy();
      expect(findSettings).toHaveBeenCalled();
      expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(expect.objectContaining(new MfaDTO()));
    });
  });

  describe("AdminMfaContext::setSettings", () => {
    it("should update settings object and not the current object", async() => {
      await initContext();
      adminMfaContext.setSettings("duoToggle", false);

      expect.assertions(2);

      expect(adminMfaContext.getCurrentSettings().duoToggle).toBeTruthy();
      expect(adminMfaContext.getSettings().duoToggle).toBeFalsy();
    });
  });

  describe("AdminMfaContext::errors", () => {
    it("should update error object with targeted property", async() => {
      await initContext();
      adminMfaContext.setError("duoSaltError", "error");

      expect.assertions(1);

      expect(adminMfaContext.getErrors().duoSaltError).toBe("error");
    });

    it("should init errors with default property", async() => {
      expect.assertions(1);
      expect(adminMfaContext.getErrors()).toEqual(adminMfaContext.initErrors());
    });

    it("should update error object with all properties ", async() => {
      const mockError = mockDuoError();
      adminMfaContext.setErrors(mockError);

      expect.assertions(4);

      expect(adminMfaContext.getErrors().duoSaltError).toEqual(mockError.duoSaltError);
      expect(adminMfaContext.getErrors().duoIntegrationKeyError).toEqual(mockError.duoIntegrationKeyError);
      expect(adminMfaContext.getErrors().duoHostnameError).toEqual(mockError.duoHostnameError);
      expect(adminMfaContext.getErrors().duoSecretKeyError).toEqual(mockError.duoSecretKeyError);
    });
  });
});


