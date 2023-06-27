/**
 *import { userDirectoryContext } from '../../../../react-extension/contexts/Administration/AdministrationMfa/AdministrationMfaContext';
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
 * @since         3.8.3
 */


import {enableFetchMocks} from 'jest-fetch-mock';
import {AdminSelfRegistrationContextProvider} from "../../../../react-extension/contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";
import {defaultProps} from '../../../../react-extension/components/Administration/DisplaySelfRegistrationAdministration/ConfirmSaveSelfRegistrationSettings/ConfirmSaveSelfRegistrationSettings.test.data';
import SelfRegistrationFormService from './SelfRegistrationFormService';
import SelfRegistrationDomainsViewModel from '../../../models/selfRegistration/SelfRegistrationDomainsViewModel';
import MapObject from '../../../../react-extension/lib/Map/MapObject';

beforeEach(() => {
  jest.resetModules();
});

describe("SelfRegistrationFormService", () => {
  let selfRegistrationContext, // The selfRegistrationContext to test
    selfRegistrationFormService;
  const translation = message => message;
  const props = defaultProps(); // The props to pass
  const uuid = "2bb8b096-06ce-4c9a-a627-ec30ce045a83";

  beforeEach(() => {
    jest.resetAllMocks();
    selfRegistrationContext = new AdminSelfRegistrationContextProvider(props);
    mockState(selfRegistrationContext);
    selfRegistrationFormService = new SelfRegistrationFormService(translation);
    enableFetchMocks();
  });


  describe("UserDirectoryFormService::validateInput", () => {
    it("should return required message", async() => {
      expect.assertions(1);
      const errors = new Map();
      await selfRegistrationFormService.validateInput(uuid, "", errors);
      expect(errors.get(uuid)).toEqual("A domain is required.");
    });

    it("should return a message to reject domain format", async() => {
      expect.assertions(1);
      const errors = new Map();
      await selfRegistrationFormService.validateInput(uuid, "localhost", errors);
      expect(errors.get(uuid)).toEqual("This should be a valid domain");
    });

    it("should call checkDuplicateValue", async() => {
      jest.spyOn(selfRegistrationFormService, "checkDuplicateValue");
      const errors = new Map();
      await selfRegistrationFormService.validateInput(uuid, "hello.world", errors);
      expect.assertions(1);
      expect(selfRegistrationFormService.checkDuplicateValue).toHaveBeenCalled();
    });
  });

  describe("UserDirectoryFormService::checkDuplicateValue", () => {
    it("should return a message which indicate that the domain already exist", async() => {
      selfRegistrationFormService.fields = ["passbolt.com", "passbolt.com"];
      expect.assertions(1);
      const errors = new Map();
      await selfRegistrationFormService.checkDuplicateValue(errors);
      expect(MapObject.listValues(errors)).toEqual(["This domain already exist", "This domain already exist"]);
    });

    it("should not return a message", async() => {
      const domains = new SelfRegistrationDomainsViewModel(
        {data: {"allowed_domains": ["passbolt.com"]}}
      );
      await selfRegistrationContext.setDomains(domains);
      expect.assertions(1);
      const errors = new Map();
      await selfRegistrationFormService.checkDuplicateValue(errors);
      expect(errors.size).toEqual(0);
    });
  });
});

function mockState(adminSelfRegistrationContext) {
  const setStateMock = state => {
    let newState;
    if (typeof state  === 'function') {
      newState = state(adminSelfRegistrationContext.state);
    } else {
      newState = state;
    }
    adminSelfRegistrationContext.state = Object.assign(adminSelfRegistrationContext.state, newState);
  };
  jest.spyOn(adminSelfRegistrationContext, "setState").mockImplementation(setStateMock);
}
