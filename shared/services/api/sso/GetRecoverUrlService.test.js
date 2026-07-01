/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.12.0
 */

/**
 * Unit tests on GetRecoverUrlService in regard of specifications
 */
import { ApiClientOptions } from "../../../lib/apiClient/apiClientOptions";
import GetRecoverUrlService from "./GetRecoverUrlService";
import { v4 as uuid } from "uuid";
import { enableFetchMocks } from "jest-fetch-mock";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";

beforeEach(() => {
  jest.clearAllMocks();
  enableFetchMocks();
});

describe("GetRecoverUrlService", () => {
  describe("GetRecoverUrlService::getRecoverUrl", () => {
    it("Should run the SSO login process and get back an URL for the user to proceed", () => {
      expect.assertions(2);
      const siteDomain = "https://www.passbolt.test/";
      const expectedUrl = `${siteDomain}setup/recover/${uuid()}/${uuid()}`;
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");

      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);
      const token = uuid();

      const expectedDto = {
        token: token,
        case: "default",
      };

      const response = { url: expectedUrl };

      fetch.doMockOnce(async (req) => {
        const dto = JSON.parse(await req.text());
        expect(dto).toStrictEqual(expectedDto);
        return mockApiResponse(response);
      });

      return expect(service.getRecoverUrl(token)).resolves.toStrictEqual(new URL(expectedUrl));
    });

    it("Should throw an Error if the domain in the response is not the expected one", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");

      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const response = { url: "https://evil.com" };
      fetch.doMockOnce(() => mockApiResponse(response));

      const expectedError = new Error("The url should be from the same origin.");
      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(expectedError);
    });

    const structuralError = new Error("The url should point to a valid recover or start page.");

    it("Should throw an Error if the same origin URL does not point to a setup page", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      fetch.doMockOnce(() => mockApiResponse({ url: `${siteDomain}admin/dashboard` }));

      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(structuralError);
    });

    it("Should throw an Error if the setup path segments are not valid UUIDs", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      fetch.doMockOnce(() => mockApiResponse({ url: `${siteDomain}setup/recover/not-a-uuid/also-bad` }));

      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(structuralError);
    });

    it("Should throw an Error if the setup path is missing a UUID segment", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      fetch.doMockOnce(() => mockApiResponse({ url: `${siteDomain}setup/recover/${uuid()}` }));

      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(structuralError);
    });

    it("Should throw an Error if the setup segment is only a suffix of another path segment", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      fetch.doMockOnce(() => mockApiResponse({ url: `${siteDomain}xsetup/recover/${uuid()}/${uuid()}` }));

      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(structuralError);
    });

    it("Should throw an Error if a foreign origin smuggles a valid setup path in its query string", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const url = `https://something.else.com/anything?back=${siteDomain}setup/recover/${uuid()}/${uuid()}`;
      fetch.doMockOnce(() => mockApiResponse({ url }));

      const expectedError = new Error("The url should be from the same origin.");
      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(expectedError);
    });

    it("Should throw an Error if a foreign origin smuggles a valid setup path in its fragment", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const url = `https://something.else.com/anything#back=${siteDomain}setup/recover/${uuid()}/${uuid()}`;
      fetch.doMockOnce(() => mockApiResponse({ url }));

      const expectedError = new Error("The url should be from the same origin.");
      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(expectedError);
    });

    it("Should throw an Error if a same origin URL smuggles a valid setup path in its query string", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const url = `${siteDomain}anything?back=${siteDomain}setup/recover/${uuid()}/${uuid()}`;
      fetch.doMockOnce(() => mockApiResponse({ url }));

      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(structuralError);
    });

    it("Should throw an Error if a same origin URL smuggles a valid setup path in its fragment", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const url = `${siteDomain}anything#back=/setup/recover/${uuid()}/${uuid()}`;
      fetch.doMockOnce(() => mockApiResponse({ url }));

      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(structuralError);
    });

    it("Should resolve a valid start URL", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const expectedUrl = `${siteDomain}setup/start/${uuid()}/${uuid()}`;
      fetch.doMockOnce(() => mockApiResponse({ url: expectedUrl }));

      return expect(service.getRecoverUrl(uuid())).resolves.toStrictEqual(new URL(expectedUrl));
    });

    it("Should resolve a valid URL for an installation served under a base path", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/subfolder/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const expectedUrl = `${siteDomain}setup/recover/${uuid()}/${uuid()}`;
      fetch.doMockOnce(() => mockApiResponse({ url: expectedUrl }));

      return expect(service.getRecoverUrl(uuid())).resolves.toStrictEqual(new URL(expectedUrl));
    });

    it("Should resolve a valid URL with a trailing slash", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const expectedUrl = `${siteDomain}setup/recover/${uuid()}/${uuid()}/`;
      fetch.doMockOnce(() => mockApiResponse({ url: expectedUrl }));

      return expect(service.getRecoverUrl(uuid())).resolves.toStrictEqual(new URL(expectedUrl));
    });

    it("Should resolve a valid URL with uppercase hexadecimal UUID segments", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const expectedUrl = `${siteDomain}setup/recover/A1B2C3D4-1111-4111-8111-ABCDEF123456/${uuid()}`;
      fetch.doMockOnce(() => mockApiResponse({ url: expectedUrl }));

      return expect(service.getRecoverUrl(uuid())).resolves.toStrictEqual(new URL(expectedUrl));
    });

    it("Should resolve a valid URL carrying a query string and a fragment", () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions().setBaseUrl("http://localhost:6006");
      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const expectedUrl = `${siteDomain}setup/recover/${uuid()}/${uuid()}?foo=bar#frag`;
      fetch.doMockOnce(() => mockApiResponse({ url: expectedUrl }));

      return expect(service.getRecoverUrl(uuid())).resolves.toStrictEqual(new URL(expectedUrl));
    });
  });
});
