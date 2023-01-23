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
import {mockMfaSettings, noMfaDefined} from './MFAContext.test.data';

describe("MFAContext", () => {
  let mfaContextProvider; // The MFAContextProvider to test
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(props.context.port, "request").mockImplementation(() => MfaPolicyEnumerationTypes.MANDATORY);
    mfaContextProvider = new MfaContextProvider(props);
    mockState(mfaContextProvider);
  });

  describe("MFAContext::findPolicy", () => {
    it("should get the current policy and store it in its state", async() => {
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

  describe("AdministrationMfaPolicyContext::findMfaSettings", () => {
    it("should retrieve data for current mfa settings", async() => {
      expect.assertions(3);
      jest.spyOn(props.context.port, "request").mockImplementation(() => mockMfaSettings());
      await mfaContextProvider.findMfaSettings();

      expect(mfaContextProvider.hasMfaSettings()).toBeTruthy();

      jest.spyOn(props.context.port, "request").mockImplementation(() => mockMfaSettings(noMfaDefined));
      await mfaContextProvider.findMfaSettings();

      expect(mfaContextProvider.hasMfaSettings()).toBeFalsy();


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

