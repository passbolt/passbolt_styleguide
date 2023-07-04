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

import {defaultProps} from "../../../../react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data";
import {enableFetchMocks} from 'jest-fetch-mock';
import {AdminUserDirectoryContextProvider} from "./AdministrationUserDirectoryContext";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {mockResult, mockUsers} from '../../../components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data';
import UserDirectoryModel from '../../../../shared/models/userDirectory/UserDirectoryModel';
import UserDirectoryDTO from '../../../../shared/models/userDirectory/UserDirectoryDTO';
import {mockErrors} from '../../../components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data';

describe("AdminUserDirectoryContext", () => {
  let adminUserDirectoryContext; // The adminUserDirectoryContext to test
  const props = defaultProps(null, mockUsers[4].id); // The props to pass

  const mockApiCalls = () => {
    fetch.doMockOnceIf(/directorysync\/settings*/, () => mockApiResponse(mockResult));
    fetch.doMockOnceIf(/users*/, () => mockApiResponse(mockUsers));
  };

  //Initialize context by default
  const initContext = async() => {
    mockApiCalls();
    await adminUserDirectoryContext.findUserDirectorySettings();
  };

  beforeEach(() => {
    jest.resetAllMocks();
    adminUserDirectoryContext = new AdminUserDirectoryContextProvider(props);
    const setStateMock = state => adminUserDirectoryContext.state = Object.assign(adminUserDirectoryContext.state, state);
    jest.spyOn(adminUserDirectoryContext, "setState").mockImplementation(setStateMock);
    enableFetchMocks();
  });

  describe("AdminUserDirectoryContext::findUserDirectorySettings", () => {
    it("should get the current settings and store it in its state", async() => {
      // Mock the call to API
      mockApiCalls();
      const expectedResult = new UserDirectoryModel(mockResult);
      await adminUserDirectoryContext.findUserDirectorySettings();

      expect.assertions(3);

      expect(adminUserDirectoryContext.getSettings()).toEqual(expectedResult);
      expect(adminUserDirectoryContext.getCurrentSettings()).toEqual(expectedResult);
      expect(adminUserDirectoryContext.isProcessing()).toBeFalsy();
    });
    it("should sort users", async() => {
      // Mock the call to API
      mockApiCalls();
      jest.spyOn(adminUserDirectoryContext, "sortUsers");

      await adminUserDirectoryContext.findUserDirectorySettings();

      expect.assertions(2);

      expect(adminUserDirectoryContext.sortUsers).toHaveBeenCalled();
      expect(adminUserDirectoryContext.getUsers()).toEqual(adminUserDirectoryContext.sortUsers(mockUsers));
    });
    it("should set processing to true when loading settings", async() => {
      adminUserDirectoryContext.setProcessing(false);
      try {
        await adminUserDirectoryContext.findUserDirectorySettings();
      } catch {
        expect.assertions(1);
        expect(adminUserDirectoryContext.isProcessing()).toBeTruthy();
      }
    });
  });
  describe("AdminUserDirectoryContext::hasSettingsChanges", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should return true if settings is different then current setting", () => {
      adminUserDirectoryContext.setSettings("userDirectoryToggle", false);

      expect.assertions(1);

      expect(adminUserDirectoryContext.hasSettingsChanges()).toBeTruthy();
    });

    it("should return false if settings is different then current setting", () => {
      adminUserDirectoryContext.setSettings("createGroups", false);
      adminUserDirectoryContext.setSettings("createGroups", true);

      expect.assertions(1);

      expect(adminUserDirectoryContext.hasSettingsChanges()).toBeFalsy();
    });
  });

  describe("AdminUserDirectoryContext::clearContext", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should clear the context and set it by default", () => {
      adminUserDirectoryContext.setSettings("userDirectoryToggle", true);
      adminUserDirectoryContext.clearContext();

      expect.assertions(3);

      expect(adminUserDirectoryContext.isProcessing()).toBeTruthy();
      expect(adminUserDirectoryContext.getCurrentSettings()).toBe(null);
      expect(adminUserDirectoryContext.getSettings().userDirectoryToggle).toBeFalsy();
    });
  });

  describe("AdminUserDirectoryContext::save", () => {
    it("should save settings and call findUserDirectorySettings", async() => {
      fetch.doMockOnceIf(/directorysync\/settings.json/, async req => {
        const body = await JSON.parse(await req.text());
        const expectedDto = Object.assign({}, new UserDirectoryDTO(new UserDirectoryModel()));
        delete expectedDto.fields_mapping;
        expect(body).toStrictEqual(expectedDto);
        return mockApiResponse(expectedDto);
      });

      const findSettings = jest.spyOn(adminUserDirectoryContext, "findUserDirectorySettings").mockImplementation(() => null);

      await adminUserDirectoryContext.save();

      expect.assertions(3);

      expect(adminUserDirectoryContext.isProcessing()).toBeTruthy();
      expect(findSettings).toHaveBeenCalled();
    });
  });

  describe("AdminUserDirectoryContext::delete", () => {
    it("should delete settings and call findUserDirectorySettings", async() => {
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse({}));
      const findSettings = jest.spyOn(adminUserDirectoryContext, "findUserDirectorySettings").mockImplementation();

      await adminUserDirectoryContext.delete();

      expect.assertions(2);

      expect(adminUserDirectoryContext.isProcessing()).toBeTruthy();
      expect(findSettings).toHaveBeenCalled();
    });
  });

  describe("AdminUserDirectoryContext::test", () => {
    it("should test configuration", async() => {
      fetch.doMockOnceIf(/directorysync\/settings\/test*/, () => mockApiResponse(mockResult));
      const result = await adminUserDirectoryContext.test();

      expect.assertions(2);

      expect(adminUserDirectoryContext.isProcessing()).toBeFalsy();
      expect(result.body).toEqual(mockResult);
    });
  });


  describe("AdminUserDirectoryContext::simulateUsers", () => {
    it("should simulate configuration", async() => {
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockResult));
      const result = await adminUserDirectoryContext.simulateUsers();

      expect.assertions(1);

      expect(result).toEqual(mockResult);
    });
  });

  describe("AdminUserDirectoryContext::synchronizeUsers", () => {
    it("should synchronize configuration", async() => {
      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse(mockResult));
      const result = await adminUserDirectoryContext.synchronizeUsers();

      expect.assertions(1);

      expect(result).toEqual(mockResult);
    });
  });

  describe("AdminUserDirectoryContext::setSettings", () => {
    it("should update settings object and not the current object", async() => {
      await initContext();
      adminUserDirectoryContext.setSettings("userDirectoryToggle", false);

      expect.assertions(2);

      expect(adminUserDirectoryContext.getCurrentSettings().userDirectoryToggle).toBeTruthy();
      expect(adminUserDirectoryContext.getSettings().userDirectoryToggle).toBeFalsy();
    });
  });

  describe("AdminUserDirectoryContext::errors", () => {
    it("should update error object with targeted property", async() => {
      await initContext();
      adminUserDirectoryContext.setError("hostError", "error");

      expect.assertions(1);

      expect(adminUserDirectoryContext.getErrors().hostError).toBe("error");
    });

    it("should init errors with default property", async() => {
      expect(adminUserDirectoryContext.getErrors()).toEqual(adminUserDirectoryContext.initErrors());
    });

    it("should update error object with all properties ", async() => {
      const mockError = mockErrors();
      adminUserDirectoryContext.setErrors(mockError);
      expect.assertions(3);
      expect(adminUserDirectoryContext.getErrors().hostError).toEqual(mockError.hostError);
      expect(adminUserDirectoryContext.getErrors().domainError).toEqual(mockError.domainError);
      expect(adminUserDirectoryContext.getErrors().portError).toEqual(mockError.portError);
    });
  });
});

