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
 * @since         5.13.0
 */

import { enableFetchMocks } from "jest-fetch-mock";
import UserApiService from "./userApiService";
import { defaultApiClientOptions } from "../../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";
import { defaultUserDto } from "../../../models/entity/user/userEntity.test.data";
import { defaultUsersDtos } from "../../../models/entity/user/usersCollection.test.data";
import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";
import PassboltServiceUnavailableError from "../../../lib/Error/PassboltServiceUnavailableError";
import { TEST_ROLE_USER_ID } from "../../../models/entity/role/roleEntity.test.data";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("UserApiService", () => {
  const apiClientOptions = defaultApiClientOptions();
  const userApiService = new UserApiService(apiClientOptions);

  describe("static methods", () => {
    it("should return the resource name", () => {
      expect.assertions(1);

      expect(UserApiService.RESOURCE_NAME).toEqual("users");
    });

    it("should return all supported contain options", () => {
      expect.assertions(1);

      expect(UserApiService.getSupportedContainOptions()).toEqual([
        "LastLoggedIn",
        "is_mfa_enabled",
        "last_logged_in",
        "gpgkey",
        "groups_users",
        "profile",
        "role",
        "account_recovery_user_setting",
        "pending_account_recovery_request",
        "missing_metadata_key_ids",
      ]);
    });

    it("should return all supported filter options", () => {
      expect.assertions(1);

      expect(UserApiService.getSupportedFiltersOptions()).toEqual([
        "search",
        "has-groups",
        "has-access",
        "is-admin",
        "is-active",
        "has-role-id",
      ]);
    });

    it("should return all supported order options", () => {
      expect.assertions(1);

      expect(UserApiService.getSupportedOrdersOptions()).toEqual([
        "Profile.first_name DESC",
        "Profile.first_name ASC",
        "Profile.last_name DESC",
        "Profile.last_name ASC",
        "Profile.created DESC",
        "Profile.created ASC",
        "Profile.modified DESC",
        "Profile.modified ASC",
      ]);
    });

    describe("::remapToLegacyContain", () => {
      it("should return undefined if no contains is given", () => {
        expect.assertions(1);

        expect(UserApiService.remapToLegacyContain(undefined)).toBeUndefined();
      });

      it("should remap last_logged_in to LastLoggedIn", () => {
        expect.assertions(2);

        const contains = { last_logged_in: true };
        const result = UserApiService.remapToLegacyContain(contains);

        expect(result.LastLoggedIn).toBe(true);
        expect(result.last_logged_in).toBeUndefined();
      });

      it("should not modify contains that do not have last_logged_in", () => {
        expect.assertions(1);

        const contains = { profile: true };
        const result = UserApiService.remapToLegacyContain(contains);

        expect(result).toEqual({ profile: true });
      });
    });
  });

  describe("::get", () => {
    it("should call the API to retrieve a user by id", async () => {
      expect.assertions(3);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}.json`), async (req) => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse(userDto);
      });

      const result = await userApiService.get(userDto.id);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userDto);
    });

    it("should call the API with contains options", async () => {
      expect.assertions(3);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}.json`), async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).toContain("contain%5Bprofile%5D=1");
        return mockApiResponse(userDto);
      });

      await userApiService.get(userDto.id, { profile: true });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the user id is not a valid uuid", async () => {
      expect.assertions(2);

      await expect(() => userApiService.get("not-a-uuid")).rejects.toThrow(Error);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}.json`), () => Promise.reject(new Error()));

      await expect(() => userApiService.get(userDto.id)).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::findAll", () => {
    it("should call the API to retrieve all users", async () => {
      expect.assertions(4);

      const usersDto = defaultUsersDtos();
      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse(usersDto);
      });

      const result = await userApiService.findAll();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(PassboltResponseEntity);
      expect(result.body).toEqual(usersDto);
    });

    it("should call the API with contain options", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).toContain("contain%5Bprofile%5D=1");
        return mockApiResponse([]);
      });

      await userApiService.findAll({ profile: true });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should remap last_logged_in to LastLoggedIn in the request", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).toContain("contain%5BLastLoggedIn%5D=1");
        return mockApiResponse([]);
      });

      await userApiService.findAll({ last_logged_in: true });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should call the API with filter options", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).toContain("filter%5Bis-active%5D=1");
        return mockApiResponse([]);
      });

      await userApiService.findAll({}, { "is-active": true });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should call the API with order options", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).toContain("order%5B%5D=Profile.first_name+ASC");
        return mockApiResponse([]);
      });

      await userApiService.findAll({}, {}, { "Profile.first_name ASC": true });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should ignore unsupported contain options", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).not.toContain("contain");
        return mockApiResponse([]);
      });

      await userApiService.findAll({ unsupported: true });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should ignore unsupported filter options", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).not.toContain("filter");
        return mockApiResponse([]);
      });

      await userApiService.findAll({}, { unsupported: true });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      fetch.doMockOnceIf(/users\.json/, () => Promise.reject(new Error()));

      await expect(() => userApiService.findAll()).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::findByRoleId", () => {
    it("should call findAll with a has-role-id filter", async () => {
      expect.assertions(3);

      const usersDto = [defaultUserDto({ role_id: TEST_ROLE_USER_ID })];
      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).toContain(`filter%5Bhas-role-id%5D=${TEST_ROLE_USER_ID}`);
        return mockApiResponse(usersDto);
      });

      const result = await userApiService.findByRoleId(TEST_ROLE_USER_ID);
      expect(result).toBeInstanceOf(PassboltResponseEntity);
    });

    it("should throw an error if the role id is not a valid uuid", async () => {
      expect.assertions(2);

      await expect(() => userApiService.findByRoleId("not-a-uuid")).rejects.toThrow(Error);
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe("::create", () => {
    it("should call the API to create a user", async () => {
      expect.assertions(4);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(/users\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        expect(JSON.parse(req.body)).toEqual(userDto);
        return mockApiResponse(userDto);
      });

      const result = await userApiService.create(userDto);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userDto);
    });

    it("should throw an error if no data is provided", async () => {
      expect.assertions(2);

      await expect(() => userApiService.create()).rejects.toThrow(Error);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      fetch.doMockOnceIf(/users\.json/, () => Promise.reject(new Error()));

      await expect(() => userApiService.create(defaultUserDto())).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::update", () => {
    it("should call the API to update a user", async () => {
      expect.assertions(4);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}.json`), async (req) => {
        expect(req.method).toStrictEqual("PUT");
        expect(JSON.parse(req.body)).toEqual(userDto);
        return mockApiResponse(userDto);
      });

      const result = await userApiService.update(userDto.id, userDto);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userDto);
    });

    it("should throw an error if the user id is not a valid uuid", async () => {
      expect.assertions(2);

      await expect(() => userApiService.update("not-a-uuid", defaultUserDto())).rejects.toThrow(Error);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should throw an error if no user data is provided", async () => {
      expect.assertions(2);

      const userDto = defaultUserDto();
      await expect(() => userApiService.update(userDto.id)).rejects.toThrow(Error);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}.json`), () => Promise.reject(new Error()));

      await expect(() => userApiService.update(userDto.id, userDto)).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::delete", () => {
    it("should call the API to delete a user", async () => {
      expect.assertions(3);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}.json`), async (req) => {
        expect(req.method).toStrictEqual("DELETE");
        return mockApiResponse();
      });

      await userApiService.delete(userDto.id);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0][0]).toContain(userDto.id);
    });

    it("should call the API with transfer data", async () => {
      expect.assertions(3);

      const userDto = defaultUserDto();
      const transfer = { owners: [{ id: "some-uuid" }] };
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}.json`), async (req) => {
        expect(req.method).toStrictEqual("DELETE");
        expect(JSON.parse(req.body)).toEqual({ transfer });
        return mockApiResponse();
      });

      await userApiService.delete(userDto.id, transfer);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should call the API as a dry run", async () => {
      expect.assertions(3);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}/dry-run.json`), async (req) => {
        expect(req.method).toStrictEqual("DELETE");
        return mockApiResponse();
      });

      await userApiService.delete(userDto.id, {}, true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0][0]).toContain("dry-run");
    });

    it("should throw an error if the user id is not a valid uuid", async () => {
      expect.assertions(2);

      await expect(() => userApiService.delete("not-a-uuid")).rejects.toThrow(Error);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      const userDto = defaultUserDto();
      fetch.doMockOnceIf(new RegExp(`users/${userDto.id}.json`), () => Promise.reject(new Error()));

      await expect(() => userApiService.delete(userDto.id)).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::resendInvite", () => {
    it("should call the API to resend an invite", async () => {
      expect.assertions(3);

      const username = "ada@passbolt.com";
      fetch.doMockOnceIf(/users\/recover\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        expect(JSON.parse(req.body)).toEqual({ username });
        return mockApiResponse();
      });

      await userApiService.resendInvite(username);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      fetch.doMockOnceIf(/users\/recover\.json/, () => Promise.reject(new Error()));

      await expect(() => userApiService.resendInvite("ada@passbolt.com")).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::keepSessionAlive", () => {
    it("should call the API and return true", async () => {
      expect.assertions(3);

      fetch.doMockOnceIf(/users\/me\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse();
      });

      const result = await userApiService.keepSessionAlive();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      fetch.doMockOnceIf(/users\/me\.json/, () => Promise.reject(new Error()));

      await expect(() => userApiService.keepSessionAlive()).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("::requestHelpCredentialsLost", () => {
    it("should call the API with the request help dto", async () => {
      expect.assertions(3);

      const requestHelpDto = { username: "ada@passbolt.com", case: "lost-passphrase" };
      fetch.doMockOnceIf(/users\/recover\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        expect(JSON.parse(req.body)).toEqual(requestHelpDto);
        return mockApiResponse();
      });

      await userApiService.requestHelpCredentialsLost(requestHelpDto);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      fetch.doMockOnceIf(/users\/recover\.json/, () => Promise.reject(new Error()));

      await expect(() =>
        userApiService.requestHelpCredentialsLost({ username: "ada@passbolt.com", case: "lost-passphrase" }),
      ).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
