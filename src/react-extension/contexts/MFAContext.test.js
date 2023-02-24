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

import {defaultProps} from '../components/HandleStatusCheck/HandleStatusCheck.test.data';
import {MfaContextProvider} from './MFAContext';
import {MfaPolicyEnumerationTypes} from '../../shared/models/mfaPolicy/MfaPolicyEnumeration';
import {MfaMandatoryPolicy, mockMfaSettings, noMfaUserDefinedWithoutTotp, noMfaUserDefinedWithTotp} from './MFAContext.test.data';
import {enableFetchMocks} from 'jest-fetch-mock';
import {defaultAppContext} from './ApiAppContext.test.data';
import {mockApiResponse} from '../../../test/mocks/mockApiResponse';
import {MfaOptInPolicy} from './MFAContext.test.data';

describe("MFAContext", () => {
  let mfaContextProvider; // The MFAContextProvider to test
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(props.context.port, "request").mockImplementation(() => MfaMandatoryPolicy);
    mfaContextProvider = new MfaContextProvider(props);
    mockState(mfaContextProvider);
    enableFetchMocks();
  });

  describe("MFAContext::findPolicy", () => {
    it("should get the current policy and store it in its state, using Browser extension", async() => {
      expect.assertions(2);

      await mfaContextProvider.findPolicy();
      expect(mfaContextProvider.getPolicy()).toEqual(MfaPolicyEnumerationTypes.MANDATORY);
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });

    it("should get the current policy and store it in its state, using API", async() => {
      fetch.doMockOnceIf(/mfa-policies\/settings*/, () => mockApiResponse(MfaMandatoryPolicy));

      mfaContextProvider = new MfaContextProvider(defaultProps({
        context: defaultAppContext()
      }));
      mockState(mfaContextProvider);

      expect.assertions(2);

      await mfaContextProvider.findPolicy();
      expect(mfaContextProvider.getPolicy()).toEqual(MfaPolicyEnumerationTypes.MANDATORY);
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });
  });



  describe("AdministrationMfaPolicyContext::clearContext", () => {
    it("should clear the context and set it by default", async() => {
      expect.assertions(3);
      await mfaContextProvider.findPolicy();

      expect(mfaContextProvider.getPolicy()).toEqual(MfaPolicyEnumerationTypes.MANDATORY);
      mfaContextProvider.clearContext();

      expect(mfaContextProvider.isProcessing()).toBeTruthy();
      expect(mfaContextProvider.getPolicy()).toEqual(null);
    });
  });

  describe("AdministrationMfaPolicyContext::checkMfaChoiceRequired", () => {
    it("should return false if policy is not mandatory", async() => {
      expect.assertions(2);
      jest.spyOn(props.context.port, "request").mockImplementation(() => MfaOptInPolicy);

      await mfaContextProvider.findPolicy();
      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.getPolicy()).toEqual(MfaPolicyEnumerationTypes.OPTIN);
      expect(mfaContextProvider.isMfaChoiceRequired()).toBeFalsy();
    });

    it("should return false if settings are defined", async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation(event => {
        if (event === "passbolt.mfa-policy.get-policy") { return MfaMandatoryPolicy; }
        if (event === "passbolt.mfa-policy.get-mfa-settings") { return noMfaUserDefinedWithoutTotp.settings; }
      });

      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.isMfaChoiceRequired()).toBeFalsy();
    });

    it("should return true if settings are not defined and organisation settings are defined", async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation(event => {
        if (event === "passbolt.mfa-policy.get-policy") { return MfaMandatoryPolicy; }
        if (event === "passbolt.mfa-policy.get-mfa-settings") {
          return noMfaUserDefinedWithTotp.settings;
        }
      });

      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.isMfaChoiceRequired()).toBeTruthy();
    });

    it("should return false if settings are not defined and organisation settings are not defined", async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation(event => {
        if (event === "passbolt.mfa-policy.get-policy") { return MfaMandatoryPolicy; }
        if (event === "passbolt.mfa-policy.get-mfa-settings") {
          return noMfaUserDefinedWithoutTotp.settings;
        }
      });

      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.isMfaChoiceRequired()).toBeFalsy();
    });

    it("should return false if settings are not defined and organisation settings are not defined", async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation(event => {
        if (event === "passbolt.mfa-policy.get-policy") { return MfaPolicyEnumerationTypes.MANDATORY; }
        if (event === "passbolt.mfa-policy.get-mfa-settings") {
          return noMfaUserDefinedWithoutTotp.settings;
        }
      });

      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.isMfaChoiceRequired()).toBeFalsy();
    });
  });


  describe("AdministrationMfaPolicyContext::findMfaSettings", () => {
    it("should retrieve data for current mfa settings, using browser extension", async() => {
      expect.assertions(3);
      jest.spyOn(props.context.port, "request").mockImplementation(() => mockMfaSettings());
      await mfaContextProvider.findMfaSettings();

      expect(mfaContextProvider.hasMfaSettings()).toBeTruthy();

      jest.spyOn(props.context.port, "request").mockImplementation(() => mockMfaSettings(noMfaUserDefinedWithTotp));
      await mfaContextProvider.findMfaSettings();

      expect(mfaContextProvider.hasMfaSettings()).toBeTruthy();
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });

    it("should retrieve data for current mfa settings, using API", async() => {
      expect.assertions(2);

      fetch.doMockOnceIf(/mfa\/setup*/, () => mockApiResponse(mockMfaSettings(noMfaUserDefinedWithTotp)));

      mfaContextProvider = new MfaContextProvider(defaultProps({
        context: defaultAppContext()
      }));
      mockState(mfaContextProvider);

      await mfaContextProvider.findMfaSettings();

      expect(mfaContextProvider.hasMfaSettings()).toBeTruthy();
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
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

