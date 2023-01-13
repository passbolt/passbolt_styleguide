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
 * @since         3.10.0
 */

import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {enableFetchMocks} from 'jest-fetch-mock';
import {AdminMfaPolicyContextProvider} from './AdministrationMfaPolicyContext';
import MfaPolicyViewModel from '../../../../shared/models/mfaPolicy/MfaPolicyViewModel';
import {MfaPolicyEnumerationTypes} from '../../../../shared/models/mfaPolicy/MfaPolicyEnumeration';
import {settingDto, defaultProps} from '../../../components/Administration/DisplayMfaPolicyAdministration/DisplayMfaPolicyAdministration.test.data';

describe("AdministrationMfaPolicyContext", () => {
  let adminMfaPolicyContextProvider; // The adminMfaPolicyContextProvider to test
  const props = defaultProps(); // The props to pass

  const mockApiCalls = () => {
    fetch.doMockOnceIf(/mfa-policies\/settings*/, () => mockApiResponse(settingDto));
  };

  //Initialize context by default
  const initContext = async() => {
    mockApiCalls();
    await adminMfaPolicyContextProvider.findSettings();
  };

  beforeEach(() => {
    jest.resetAllMocks();
    adminMfaPolicyContextProvider = new AdminMfaPolicyContextProvider(props);
    mockState(adminMfaPolicyContextProvider);
    enableFetchMocks();
  });

  describe("AdministrationMfaPolicyContext::findSettings", () => {
    it("should get the current settings and store it in its state", async() => {
      expect.assertions(3);

      // Mock the call to API
      mockApiCalls();
      const expectedResult = new MfaPolicyViewModel(settingDto);
      await adminMfaPolicyContextProvider.findSettings();
      expect(adminMfaPolicyContextProvider.getSettings()).toEqual(expectedResult);
      expect(adminMfaPolicyContextProvider.getCurrentSettings()).toEqual(expectedResult);
      expect(adminMfaPolicyContextProvider.isProcessing()).toBeFalsy();
    });
    it("should set processing to true when loading settings", async() => {
      expect.assertions(1);

      adminMfaPolicyContextProvider.setProcessing(false);
      try {
        await adminMfaPolicyContextProvider.findSettings();
      } catch {
        expect(adminMfaPolicyContextProvider.isProcessing()).toBeTruthy();
      }
    });
  });

  describe("AdministrationMfaPolicyContext::hasSettingsChanges", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should return true if settings is different then current setting", () => {
      expect.assertions(1);
      adminMfaPolicyContextProvider.setSettings("policy", MfaPolicyEnumerationTypes.MANDATORY);
      expect(adminMfaPolicyContextProvider.hasSettingsChanges()).toBeTruthy();
    });

    it("should return false if settings is different then current setting", () => {
      expect.assertions(1);

      adminMfaPolicyContextProvider.setSettings("policy", MfaPolicyEnumerationTypes.MANDATORY);
      adminMfaPolicyContextProvider.setSettings("policy", MfaPolicyEnumerationTypes.OPTIN);
      expect(adminMfaPolicyContextProvider.hasSettingsChanges()).toBeFalsy();
    });
  });

  describe("AdministrationMfaPolicyContext::clearContext", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should clear the context and set it by default", () => {
      expect.assertions(3);

      adminMfaPolicyContextProvider.setSettings("policy", MfaPolicyEnumerationTypes.MANDATORY);
      adminMfaPolicyContextProvider.clearContext();

      expect(adminMfaPolicyContextProvider.isProcessing()).toBeTruthy();
      expect(adminMfaPolicyContextProvider.getCurrentSettings()).toEqual(new MfaPolicyViewModel());
      expect(adminMfaPolicyContextProvider.getSettings()).toEqual(new MfaPolicyViewModel());
    });
  });

  describe("AdministrationMfaPolicyContext::save", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("As a logged in administrator I can update the “MFA policy” setting", async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/mfa-policies\/settings*/, () => mockApiResponse({}));
      jest.spyOn(adminMfaPolicyContextProvider, "findSettings").mockImplementation();

      await adminMfaPolicyContextProvider.save();

      //Save should set processing to false in any case
      expect(adminMfaPolicyContextProvider.isProcessing()).toBeTruthy();
      expect(adminMfaPolicyContextProvider.findSettings).toHaveBeenCalled();
      expect(JSON.parse(fetch.mock.calls[1][1].body)).toEqual(expect.objectContaining(settingDto));
    });
  });
});


function mockState(adminMfaPolicyContextProvider) {
  const setStateMock = state => {
    let newState;
    if (typeof state  === 'function') {
      newState = state(adminMfaPolicyContextProvider.state);
    } else {
      newState = state;
    }
    adminMfaPolicyContextProvider.state = Object.assign(adminMfaPolicyContextProvider.state, newState);
  };
  jest.spyOn(adminMfaPolicyContextProvider, "setState").mockImplementation(setStateMock);
}
