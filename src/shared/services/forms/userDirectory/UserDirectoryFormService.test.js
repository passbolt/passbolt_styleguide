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

import { defaultProps } from "../../../../react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data";
import { enableFetchMocks } from "jest-fetch-mock";
import { AdminUserDirectoryContextProvider } from "../../../../react-extension/contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import UserDirectoryFormService from "../userDirectory/UserDirectoryFormService";

beforeEach(() => {
  jest.resetModules();
});

describe("UserDirectoryFormService", () => {
  let userDirectoryContext, // The userDirectoryContext to test
    userDirectoryFormService;
  const translation = (message) => message;
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    userDirectoryContext = new AdminUserDirectoryContextProvider(props);
    const setStateMock = (state) => (userDirectoryContext.state = Object.assign(userDirectoryContext.state, state));
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
      expect.assertions(1);
      const newInstance = UserDirectoryFormService.getInstance();
      expect(userDirectoryFormService).toEqual(newInstance);
    });
  });

  describe("UserDirectoryFormService::killInstance", () => {
    it("should kill the instance and create a new one", () => {
      expect.assertions(1);
      UserDirectoryFormService.killInstance();
      userDirectoryFormService = UserDirectoryFormService.getInstance(null, null);
      expect(userDirectoryFormService).toEqual({ context: null, translate: null });
    });
  });

  describe("UserDirectoryFormService::validate", () => {
    it("should set error message to all erroneous fields and return false", () => {
      expect.assertions(2);

      userDirectoryContext.setSettings("host", "");
      userDirectoryContext.setSettings("port", "");
      userDirectoryContext.setSettings("domain", "");
      userDirectoryContext.setAdUserFieldsMappingSettings("username", "");
      userDirectoryContext.setOpenLdapGroupFieldsMappingSettings("users", "");

      const expectedErrors = {
        hostError: "A host is required.",
        portError: "A port is required.",
        domainError: "A domain name is required.",
        fieldsMappingAdUserUsernameError: "The user username field mapping cannot be empty",
        fieldsMappingOpenLdapGroupUsersError: "The group users field mapping cannot be empty",
      };
      const result = userDirectoryFormService.validate();
      expect(result).toEqual(false);
      expect(userDirectoryContext.getErrors()).toStrictEqual(expectedErrors);
    });

    it("should reset error message and return true", () => {
      expect.assertions(2);

      userDirectoryContext.setSettings("host", "192.0.0.0");
      userDirectoryContext.setSettings("port", "389");
      userDirectoryContext.setSettings("domain", "passbolt.com");
      userDirectoryContext.setAdUserFieldsMappingSettings("username", "uniquePrincipalName");
      userDirectoryContext.setOpenLdapGroupFieldsMappingSettings("users", "member");

      const expectedErrors = {
        hostError: null,
        portError: null,
        domainError: null,
        fieldsMappingAdUserUsernameError: null,
        fieldsMappingOpenLdapGroupUsersError: null,
      };
      const result = userDirectoryFormService.validate();
      expect(result).toEqual(true);
      expect(userDirectoryContext.getErrors()).toStrictEqual(expectedErrors);
    });
  });

  describe("UserDirectoryFormService::validateHostInput", () => {
    it("should return required message", () => {
      expect.assertions(1);
      userDirectoryContext.setSettings("host", "");
      const expectedErrorMessage = "A host is required.";
      const result = userDirectoryFormService.validateHostInput();
      expect(result).toEqual(expectedErrorMessage);
    });

    it("should not return message", () => {
      expect.assertions(1);
      userDirectoryContext.setSettings("host", "192.0.0.0");
      const result = userDirectoryFormService.validateHostInput();
      expect(result).toEqual(null);
    });
  });

  describe("UserDirectoryFormService::validatePortInput", () => {
    it("should return required message", () => {
      expect.assertions(1);
      userDirectoryContext.setSettings("port", "");
      const requiredMessage = "A port is required.";
      const result = userDirectoryFormService.validatePortInput();
      expect(result).toEqual(requiredMessage);
    });

    it("should return regex message", () => {
      expect.assertions(1);
      //Only numbers are allowed
      userDirectoryContext.setSettings("port", "ABC");
      const regExMessage = "Only numeric characters allowed.";
      const result = userDirectoryFormService.validatePortInput();
      expect(result).toEqual(regExMessage);
    });

    it("should not return message", () => {
      expect.assertions(1);
      userDirectoryContext.setSettings("port", "389");
      const result = userDirectoryFormService.validatePortInput();
      expect(result).toEqual(null);
    });
  });

  describe("UserDirectoryFormService::validateDomainInput", () => {
    it("should return required message", () => {
      expect.assertions(1);
      userDirectoryContext.setSettings("domain", "");
      const requiredMessage = "A domain name is required.";
      const result = userDirectoryFormService.validateDomainInput();
      expect(result).toEqual(requiredMessage);
    });

    it("should not return message", () => {
      expect.assertions(1);
      userDirectoryContext.setSettings("domain", "passbolt.com");
      const result = userDirectoryFormService.validateDomainInput();
      expect(result).toEqual(null);
    });
  });

  describe("UserDirectoryFormService::validateFieldsMappingAdUserUsernameInput", () => {
    it("should return required message", () => {
      expect.assertions(1);
      const requiredMessage = "The user username field mapping cannot be empty";

      userDirectoryContext.setAdUserFieldsMappingSettings("username", "");
      const result = userDirectoryFormService.validateFieldsMappingAdUserUsernameInput();

      expect(result).toEqual(requiredMessage);
    });

    it("should not return message", () => {
      expect.assertions(1);

      userDirectoryContext.setAdUserFieldsMappingSettings("username", "uniquePrincipalName");
      const result = userDirectoryFormService.validateFieldsMappingAdUserUsernameInput();

      expect(result).toEqual(null);
    });
  });

  describe("UserDirectoryFormService::validateOpenLdapFieldsMappingGroupUsersInput", () => {
    it("should return required message", () => {
      expect.assertions(1);
      const requiredMessage = "The group users field mapping cannot be empty";

      userDirectoryContext.setOpenLdapGroupFieldsMappingSettings("users", "");
      const result = userDirectoryFormService.validateOpenLdapFieldsMappingGroupUsersInput();

      expect(result).toEqual(requiredMessage);
    });

    it("should not return message", () => {
      expect.assertions(1);

      userDirectoryContext.setOpenLdapGroupFieldsMappingSettings("users", "member");
      const result = userDirectoryFormService.validateOpenLdapFieldsMappingGroupUsersInput();

      expect(result).toEqual(null);
    });
  });
});
