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
 * @since         3.8.0
 */

import {defaultProps} from "../../../../react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data";
import {enableFetchMocks} from 'jest-fetch-mock';
import {AdminUserDirectoryContextProvider} from "../../../../react-extension/contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import UserDirectoryFormService from '../userDirectory/UserDirectoryFormService';

beforeEach(() => {
  jest.resetModules();
});

describe("UserDirectoryFormService", () => {
  let userDirectoryContext, // The userDirectoryContext to test
    userDirectoryFormService;
  const translation = message => message;
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    userDirectoryContext = new AdminUserDirectoryContextProvider(props);
    const setStateMock = state => userDirectoryContext.state = Object.assign(userDirectoryContext.state, state);
    jest.spyOn(userDirectoryContext, "setState").mockImplementation(setStateMock);
    UserDirectoryFormService.killInstance();
    userDirectoryFormService = UserDirectoryFormService.getInstance(userDirectoryContext, translation);
    enableFetchMocks();
  });

  describe("UserDirectoryFormService::getInstance", () => {
    it("should be a singleton", () => {
      expect.assertions(1);
      expect(userDirectoryFormService).toBeDefined();
    });

    it("should not create a new instance -", () => {
      const newInstance = UserDirectoryFormService.getInstance();
      expect.assertions(1);
      expect(userDirectoryFormService).toEqual(newInstance);
    });
  });


  describe("UserDirectoryFormService::killInstance", () => {
    it("should kill the instance and create a new one", () => {
      UserDirectoryFormService.killInstance();
      userDirectoryFormService = UserDirectoryFormService.getInstance(null, null);
      expect.assertions(1);
      expect(userDirectoryFormService).toEqual({"context": null, "translate": null});
    });
  });

  describe("UserDirectoryFormService::validateHostInput", () => {
    it("should return required message", () => {
      userDirectoryContext.setSettings("host", "");
      const requiredMessage = {"hostError": "A host is required."};
      const result = userDirectoryFormService.validateHostInput();
      expect.assertions(2);
      expect(result).toEqual(requiredMessage);
      expect(userDirectoryContext.getErrors().hostError).toEqual(requiredMessage.hostError);
    });
    it("should not return message", () => {
      userDirectoryContext.setSettings("host", "192.0.0.0");
      const result = userDirectoryFormService.validateHostInput();
      expect.assertions(2);
      expect(result.hostError).toEqual(null);
      expect(userDirectoryContext.getErrors().hostError).toEqual(null);
    });
  });

  describe("UserDirectoryFormService::validatePortInput", () => {
    it("should return required message", () => {
      userDirectoryContext.setSettings("port", "");
      const requiredMessage = {"portError": "A port is required."};
      const result = userDirectoryFormService.validatePortInput();
      expect.assertions(2);
      expect(result).toEqual(requiredMessage);
      expect(userDirectoryContext.getErrors().portError).toEqual(requiredMessage.portError);
    });
    it("should return regex message", () => {
      //Only numbers are allowed
      userDirectoryContext.setSettings("port", "ABC");
      const regExMessage = {"portError": "Only numeric characters allowed."};
      const result = userDirectoryFormService.validatePortInput();
      expect.assertions(2);
      expect(result).toEqual(regExMessage);
      expect(userDirectoryContext.getErrors().portError).toEqual(regExMessage.portError);
    });
    it("should not return message", () => {
      userDirectoryContext.setSettings("port", "389");
      const result = userDirectoryFormService.validatePortInput();
      expect.assertions(2);
      expect(result.portError).toEqual(null);
      expect(userDirectoryContext.getErrors().portError).toEqual(null);
    });
  });

  describe("UserDirectoryFormService::validateDomainInput", () => {
    it("should return required message", () => {
      userDirectoryContext.setSettings("domain", "");
      const requiredMessage = {"domainError": "A domain name is required."};
      const result = userDirectoryFormService.validateDomainInput();
      expect.assertions(2);
      expect(result).toEqual(requiredMessage);
      expect(userDirectoryContext.getErrors().domainError).toEqual(requiredMessage.domainError);
    });
    it("should not return message", () => {
      userDirectoryContext.setSettings("domain", "passbolt.com");
      const result = userDirectoryFormService.validateDomainInput();
      expect.assertions(2);
      expect(result.domainError).toEqual(null);
      expect(userDirectoryContext.getErrors().domainError).toEqual(null);
    });
  });
});


