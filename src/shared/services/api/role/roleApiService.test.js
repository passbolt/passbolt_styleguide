/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.10.0
 */

import { enableFetchMocks } from "jest-fetch-mock";
import RoleApiService from "./roleApiService";
import { defaultApiClientOptions } from "../../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";
import { customRoleDto, TEST_ROLE_USER_ID } from "../../../models/entity/role/roleEntity.test.data";
import { rolesCollectionDto } from "../../../models/entity/role/rolesCollection.test.data";
import PassboltServiceUnavailableError from "../../../lib/Error/PassboltServiceUnavailableError";
import { FAIL_STRING_SCENARIOS } from "../../../../../test/assert/assertEntityProperty";
import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("RoleApiService", () => {
  const apiClientOptions = defaultApiClientOptions();
  const roleApiService = new RoleApiService(apiClientOptions);

  describe("static methods", () => {
    it("should return the resource name", () => {
      expect.assertions(1);

      expect(RoleApiService.RESOURCE_NAME).toEqual("roles");
    });
  });

  describe("::findAll", () => {
    it("should call the API to retrieve all roles", async () => {
      expect.assertions(4);

      fetch.doMockOnceIf(/roles\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse(rolesCollectionDto);
      });

      const result = await roleApiService.findAll();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(PassboltResponseEntity);
      expect(result.body).toEqual(rolesCollectionDto);
    });

    it("should return an empty array if the response body is empty", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/roles\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse();
      });

      const result = await roleApiService.findAll();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result.body).toEqual([]);
    });

    it("should return an empty array if the response body is not an array", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/roles\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse({});
      });

      const result = await roleApiService.findAll();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result.body).toEqual([]);
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      const error = new Error();
      fetch.doMockOnceIf(/roles\.json/, () => Promise.reject(error));

      await expect(() => roleApiService.findAll()).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::create", () => {
    it("should call the API to create a role", async () => {
      expect.assertions(5);

      const roleDto = customRoleDto();
      fetch.doMockOnceIf(/roles\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        const body = JSON.parse(req.body);
        expect(body).toEqual(roleDto);
        return mockApiResponse(roleDto);
      });

      const result = await roleApiService.create(roleDto);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(PassboltResponseEntity);
      expect(result.body).toEqual(roleDto);
    });

    it("should throw a TypeError if roleDto is not provided", async () => {
      expect.assertions(2);

      await expect(() => roleApiService.create()).rejects.toThrow("Role creation failed, invalid role data.");
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should throw a TypeError if roleDto.name is not provided", async () => {
      expect.assertions(2);

      await expect(() => roleApiService.create({})).rejects.toThrow("Role creation failed, invalid role data.");
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should throw a TypeError if roleDto.name is not a string", async () => {
      expect.assertions(6);

      for (let name of FAIL_STRING_SCENARIOS) {
        await expect(() => roleApiService.create({ name })).rejects.toThrow(TypeError);
      }

      expect(fetch).not.toHaveBeenCalled();
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      const error = new Error();
      fetch.doMockOnceIf(/roles\.json/, () => Promise.reject(error));

      await expect(() => roleApiService.create(customRoleDto())).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::update", () => {
    it("should call the API to update a role", async () => {
      expect.assertions(5);

      const roleDto = customRoleDto({ name: "Updated" });
      fetch.doMockOnceIf(new RegExp(`roles/${roleDto.id}.json`), async (req) => {
        expect(req.method).toStrictEqual("PUT");
        expect(JSON.parse(req.body)).toEqual(roleDto);
        return mockApiResponse(roleDto);
      });

      const result = await roleApiService.update(roleDto.id, roleDto);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(PassboltResponseEntity);
      expect(result.body).toEqual(roleDto);
    });

    it("should throw a TypeError if id is missing", async () => {
      expect.assertions(2);

      await expect(() => roleApiService.update(null, customRoleDto())).rejects.toThrow(
        "Role update failed, role id is required.",
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should throw a TypeError if id is not a valid uuid", async () => {
      expect.assertions(2);

      await expect(() => roleApiService.update("test", null)).rejects.toThrow(
        "Role update failed, role id is not a valid uuid.",
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should throw a TypeError if roleDto is missing", async () => {
      expect.assertions(2);

      await expect(() => roleApiService.update(TEST_ROLE_USER_ID, null)).rejects.toThrow(
        "Role update failed, invalid role data.",
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should throw a TypeError if roleDto.name is missing", async () => {
      expect.assertions(2);

      const roleDto = customRoleDto({ name: undefined });
      await expect(() => roleApiService.update(roleDto.id, roleDto)).rejects.toThrow(
        "Role update failed, invalid role data.",
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should throw a TypeError if roleDto.name is not a string", async () => {
      expect.assertions(6);

      for (let name of FAIL_STRING_SCENARIOS) {
        const roleDto = customRoleDto({ name });
        await expect(() => roleApiService.update(roleDto.id, roleDto)).rejects.toThrow(TypeError);
      }
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      const error = new Error();
      const roleDto = customRoleDto();
      fetch.doMockOnceIf(new RegExp(`roles/${roleDto.id}.json`), () => Promise.reject(error));

      await expect(() => roleApiService.update(roleDto.id, roleDto)).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::delete", () => {
    it("should call the API to delete a role", async () => {
      expect.assertions(3);

      const roleId = TEST_ROLE_USER_ID;
      fetch.doMockOnceIf(new RegExp(`roles/${roleId}.json`), async (req) => {
        expect(req.method).toStrictEqual("DELETE");
        return mockApiResponse();
      });

      const result = await roleApiService.delete(roleId);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(PassboltResponseEntity);
    });

    it("should throw a TypeError if the role id is not a valid uuid", async () => {
      expect.assertions(2);

      const roleId = "test";
      await expect(() => roleApiService.delete(roleId)).rejects.toThrow(
        "Role deletion failed, roleId is not a valid uuid.",
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      const error = new Error();
      const roleId = TEST_ROLE_USER_ID;
      fetch.doMockOnceIf(new RegExp(`roles/${roleId}.json`), () => Promise.reject(error));

      await expect(() => roleApiService.delete(roleId)).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
