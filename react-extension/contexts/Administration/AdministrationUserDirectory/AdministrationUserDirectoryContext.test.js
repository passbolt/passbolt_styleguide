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

import {
  defaultProps,
  mockResult,
  mockUsers,
  mockErrors,
} from "../../../components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data";
import { enableFetchMocks } from "jest-fetch-mock";
import { AdminUserDirectoryContextProvider } from "./AdministrationUserDirectoryContext";
import { mockApiResponse, mockApiResponseError } from "../../../../../test/mocks/mockApiResponse";
import UserDirectoryModel from "../../../../shared/models/userDirectory/UserDirectoryModel";
import UserDirectoryDTO from "../../../../shared/models/userDirectory/UserDirectoryDTO";
import NotifyError from "../../../components/Common/Error/NotifyError/NotifyError";

describe("AdminUserDirectoryContext", () => {
  let adminUserDirectoryContext; // The adminUserDirectoryContext to test
  const props = defaultProps(null, mockUsers[4].id); // The props to pass

  const mockApiCalls = () => {
    fetch.doMockOnceIf(/directorysync\/settings*/, () => mockApiResponse(mockResult));
    fetch.doMockOnceIf(/users*/, () => mockApiResponse(mockUsers));
  };

  //Initialize context by default
  const initContext = async () => {
    mockApiCalls();
    await adminUserDirectoryContext.findUserDirectorySettings();
  };

  beforeEach(() => {
    jest.resetAllMocks();
    adminUserDirectoryContext = new AdminUserDirectoryContextProvider(props);
    const setStateMock = (state) =>
      (adminUserDirectoryContext.state = Object.assign(adminUserDirectoryContext.state, state));
    jest.spyOn(adminUserDirectoryContext, "setState").mockImplementation(setStateMock);
    enableFetchMocks();
  });

  describe("AdminUserDirectoryContext::findUserDirectorySettings", () => {
    it("should get the current settings and store it in its state", async () => {
      expect.assertions(3);

      // Mock the call to API
      mockApiCalls();
      const expectedResult = new UserDirectoryModel(mockResult);
      await adminUserDirectoryContext.findUserDirectorySettings();

      expect(adminUserDirectoryContext.getSettings()).toEqual(expectedResult);
      expect(adminUserDirectoryContext.getCurrentSettings()).toEqual(expectedResult);
      expect(adminUserDirectoryContext.isProcessing()).toBeFalsy();
    });

    it("should sort users", async () => {
      expect.assertions(2);

      // Mock the call to API
      mockApiCalls();
      jest.spyOn(adminUserDirectoryContext, "sortUsers");

      await adminUserDirectoryContext.findUserDirectorySettings();

      expect(adminUserDirectoryContext.sortUsers).toHaveBeenCalled();
      expect(adminUserDirectoryContext.getUsers()).toEqual(adminUserDirectoryContext.sortUsers(mockUsers));
    });

    it("should set processing to true when loading settings", async () => {
      expect.assertions(1);
      adminUserDirectoryContext.setProcessing(false);
      try {
        await adminUserDirectoryContext.findUserDirectorySettings();
      } catch {
        expect(adminUserDirectoryContext.isProcessing()).toBeTruthy();
      }
    });

    it("should show an error dialog if the settings couldn't be loaded from the API and still load the user settings", async () => {
      expect.assertions(3);

      const errorMessage = "Something went wrong! Probably due to a server key change";
      const expectedError = new Error(errorMessage);
      let hasUserEndpointBeenCalled = false;

      fetch.doMockOnceIf(/directorysync\/settings*/, () => mockApiResponseError(500, errorMessage));
      fetch.doMockOnceIf(/users*/, () => {
        hasUserEndpointBeenCalled = true;
        return mockApiResponse(mockUsers);
      });

      await adminUserDirectoryContext.findUserDirectorySettings();

      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expectedError });
      expect(hasUserEndpointBeenCalled).toBe(true);
    });
  });
  describe("AdminUserDirectoryContext::hasSettingsChanges", () => {
    beforeEach(async () => {
      await initContext();
    });
    it("should return true if settings is different then current setting", () => {
      expect.assertions(1);

      adminUserDirectoryContext.setSettings("userDirectoryToggle", false);

      expect(adminUserDirectoryContext.hasSettingsChanges()).toBeTruthy();
    });

    it("should return false if settings is different then current setting", () => {
      expect.assertions(1);

      adminUserDirectoryContext.setSettings("createGroups", false);
      adminUserDirectoryContext.setSettings("createGroups", true);

      expect(adminUserDirectoryContext.hasSettingsChanges()).toBeFalsy();
    });
  });

  describe("AdminUserDirectoryContext::clearContext", () => {
    beforeEach(async () => {
      await initContext();
    });
    it("should clear the context and set it by default", () => {
      expect.assertions(3);

      adminUserDirectoryContext.setSettings("userDirectoryToggle", true);
      adminUserDirectoryContext.clearContext();

      expect(adminUserDirectoryContext.isProcessing()).toBeTruthy();
      expect(adminUserDirectoryContext.getCurrentSettings()).toBe(null);
      expect(adminUserDirectoryContext.getSettings().userDirectoryToggle).toBeFalsy();
    });
  });

  describe("AdminUserDirectoryContext::save", () => {
    it("should save settings and call findUserDirectorySettings", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/directorysync\/settings.json/, async (req) => {
        const body = await JSON.parse(await req.text());
        const expectedDto = Object.assign({}, new UserDirectoryDTO(new UserDirectoryModel()));
        expect(body).toStrictEqual(expectedDto);
        return mockApiResponse(expectedDto);
      });

      const findSettings = jest
        .spyOn(adminUserDirectoryContext, "findUserDirectorySettings")
        .mockImplementation(() => null);

      await adminUserDirectoryContext.save();

      expect(adminUserDirectoryContext.isProcessing()).toBeTruthy();
      expect(findSettings).toHaveBeenCalled();
    });
  });

  describe("AdminUserDirectoryContext::delete", () => {
    it("should delete settings and call findUserDirectorySettings", async () => {
      expect.assertions(2);

      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse({}));
      const findSettings = jest.spyOn(adminUserDirectoryContext, "findUserDirectorySettings").mockImplementation();

      await adminUserDirectoryContext.delete();

      expect(adminUserDirectoryContext.isProcessing()).toBeTruthy();
      expect(findSettings).toHaveBeenCalled();
    });
  });

  describe("AdminUserDirectoryContext::test", () => {
    it("should test configuration", async () => {
      expect.assertions(2);

      fetch.doMockOnceIf(/directorysync\/settings\/test*/, () => mockApiResponse(mockResult));
      const result = await adminUserDirectoryContext.test();

      expect(adminUserDirectoryContext.isProcessing()).toBeFalsy();
      expect(result.body).toEqual(mockResult);
    });
  });

  describe("AdminUserDirectoryContext::simulateUsers", () => {
    it("should simulate configuration", async () => {
      expect.assertions(1);

      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockResult));
      const result = await adminUserDirectoryContext.simulateUsers();

      expect(result).toEqual(mockResult);
    });
  });

  describe("AdminUserDirectoryContext::synchronizeUsers", () => {
    it("should synchronize configuration", async () => {
      expect.assertions(1);

      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse(mockResult));
      const result = await adminUserDirectoryContext.synchronizeUsers();

      expect(result).toEqual(mockResult);
    });
  });

  describe("AdminUserDirectoryContext::setSettings", () => {
    it("should update settings object and not the current object", async () => {
      expect.assertions(2);

      await initContext();
      adminUserDirectoryContext.setSettings("userDirectoryToggle", false);

      expect(adminUserDirectoryContext.getCurrentSettings().userDirectoryToggle).toBeTruthy();
      expect(adminUserDirectoryContext.getSettings().userDirectoryToggle).toBeFalsy();
    });
  });

  describe("AdminUserDirectoryContext::errors", () => {
    it("should update error object with targeted property", async () => {
      expect.assertions(1);

      await initContext();
      adminUserDirectoryContext.setError("hostError", "error");

      expect(adminUserDirectoryContext.getErrors().hostError).toBe("error");
    });

    it("should init errors with default property", async () => {
      expect.assertions(1);
      expect(adminUserDirectoryContext.getErrors()).toEqual(adminUserDirectoryContext.initErrors());
    });

    it("should update error object with all properties ", async () => {
      expect.assertions(3);

      const mockError = mockErrors();
      adminUserDirectoryContext.setErrors(mockError);
      expect(adminUserDirectoryContext.getErrors().hostError).toEqual(mockError.hostError);
      expect(adminUserDirectoryContext.getErrors().domainError).toEqual(mockError.domainError);
      expect(adminUserDirectoryContext.getErrors().portError).toEqual(mockError.portError);
    });
  });
});
