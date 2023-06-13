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
 * @since         2.13.0
 */
import {ApiClient} from "./apiClient";
import {ApiClientOptions} from "./apiClientOptions";
import {enableFetchMocks} from 'jest-fetch-mock';
import each from "jest-each";
import {v4 as uuid} from "uuid";
import PassboltBadResponseError from "../Error/PassboltBadResponseError";
import PassboltServiceUnavailableError from "../Error/PassboltServiceUnavailableError";
import PassboltApiFetchError from "../Error/PassboltApiFetchError";

beforeEach(() => {
  jest.clearAllMocks();
  enableFetchMocks();
});

//@todo: put in a mock lib like it is done in passbolt-browser-extension
const mockApiResponseError = (status, errorMessage, body = {}) => Promise.resolve({
  status: status,
  body: JSON.stringify({
    header: {
      message: errorMessage,
      status: status
    },
    body: body
  })
});

const mockApiResponse = (body = {}, header = {}) => Promise.resolve(JSON.stringify({header: header, body: body}));

describe("Unit testing apiClient with mocked fetch", () => {
  const responseHtml = '<html><head></head><body></body></html>';
  const responseJson = JSON.stringify({
    header: {
      test: "test"
    },
    body: {
      resource: {}
    }
  });

  const url = 'https://test.passbolt.com/passbolt-unit-test';
  const resourceName = 'fake-resource';
  const options = (new ApiClientOptions())
    .setBaseUrl(url)
    .setResourceName(resourceName);

  each([
    {responseBody: responseHtml, method: "GET"},
    {responseBody: responseHtml, method: "POST"},
    {responseBody: responseJson, method: "GET"},
    {responseBody: responseJson, method: "POST"},
  ]).describe(`Should call the endpoint and return the response as-is with sendRequest`, scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(4);
      const testClient = new ApiClient(options);

      const currentUrl = new URL(url);
      const spyOnAssertUrl = jest.spyOn(testClient, "assertUrl");
      const spyOnAssertMethod = jest.spyOn(testClient, "assertMethod");
      const spyOnAssertBody = jest.spyOn(testClient, "assertBody");

      fetch.mockResponseOnce(async() => scenario.responseBody);
      const result = await testClient.sendRequest(scenario.method, currentUrl);
      expect(result.text()).resolves.toStrictEqual(scenario.responseBody);
      expect(spyOnAssertUrl).toHaveBeenLastCalledWith(currentUrl);
      expect(spyOnAssertMethod).toHaveBeenLastCalledWith(scenario.method);
      expect(spyOnAssertBody).not.toHaveBeenCalled();
    });
  });

  each([
    {responseBody: responseJson, method: "GET"},
    {responseBody: responseJson, method: "POST"},
  ]).describe(`should call the endpoint and parse the response as JSON with fetchAndHandleResponse`, scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(4);
      const testClient = new ApiClient(options);

      const currentUrl = new URL(url);
      const spyOnAssertUrl = jest.spyOn(testClient, "assertUrl");
      const spyOnAssertMethod = jest.spyOn(testClient, "assertMethod");
      const spyOnAssertBody = jest.spyOn(testClient, "assertBody");

      fetch.mockResponseOnce(async() => scenario.responseBody);
      const result = await testClient.fetchAndHandleResponse(scenario.method, currentUrl);
      expect(result).toStrictEqual(JSON.parse(scenario.responseBody));
      expect(spyOnAssertUrl).toHaveBeenLastCalledWith(currentUrl);
      expect(spyOnAssertMethod).toHaveBeenLastCalledWith(scenario.method);
      expect(spyOnAssertBody).not.toHaveBeenCalled();
    });
  });

  it("should throw an exception if server respond with an error", async() => {
    expect.assertions(1);
    const testClient = new ApiClient(options);
    const currentUrl = new URL(url);
    const errorMessage = "Something went wrong!";

    fetch.mockResponse(() => { throw new Error(errorMessage); });

    expect(testClient.fetchAndHandleResponse("POST", currentUrl)).rejects.toThrowError(PassboltServiceUnavailableError);
  });

  it("should throw an exception if server respond with an error", async() => {
    expect.assertions(1);
    const testClient = new ApiClient(options);
    const currentUrl = new URL(url);
    const errorMessage = "Something went wrong!";

    fetch.mockResponse(() => mockApiResponseError(500, errorMessage));

    expect(testClient.fetchAndHandleResponse("POST", currentUrl)).rejects.toThrowError(new PassboltApiFetchError(errorMessage));
  });

  it("should throw an exception if response is not JSON but JSON is expected", async() => {
    expect.assertions(1);
    const testClient = new ApiClient(options);
    const currentUrl = new URL(url);

    fetch.mockResponse(async() => responseHtml);

    expect(testClient.fetchAndHandleResponse("POST", currentUrl)).rejects.toThrowError(PassboltBadResponseError);
  });

  const assertUrlEmptyError = new TypeError('ApliClient.assertUrl error: url is required.');
  const assertUrlInvalidError = new TypeError('ApliClient.assertUrl error: url should be a valid URL object.');
  const assertUrlInvalidProtocolError = new TypeError('ApliClient.assertUrl error: url protocol should only be https or http.');
  each([
    {url: null, error: assertUrlEmptyError},
    {url: undefined, error: assertUrlEmptyError},
    {url: false, error: assertUrlEmptyError},
    {url: 0, error: assertUrlEmptyError},

    {url: 1, error: assertUrlInvalidError},
    {url: "test", error: assertUrlInvalidError},
    {url: "file:///etc/", error: assertUrlInvalidError},
    {url: 'https://www.passbolt.com', error: assertUrlInvalidError},

    {url: new URL("file:///etc/"), error: assertUrlInvalidProtocolError},
    {url: new URL('ssh://passbolt.com'), error: assertUrlInvalidProtocolError},
    {url: new URL('chrome-extension://passbolt.com'), error: assertUrlInvalidProtocolError},
  ]).describe("should throw an Error if the URL can't be asserted", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(3);
      const testClient = new ApiClient(options);
      const spy = jest.spyOn(testClient, "assertUrl");

      fetch.mockResponse(async() => responseJson);
      try {
        await testClient.sendRequest("GET", scenario.url);
      } catch (e) {
        expect(e).toStrictEqual(scenario.error);
      }

      try {
        await testClient.fetchAndHandleResponse("GET", scenario.url);
      } catch (e) {
        expect(e).toStrictEqual(scenario.error);
      }
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  each([
    {url: new URL("https://www.passbolt.com")},
    {url: new URL("https://www.passbolt.com/sub-folder/")},
    {url: new URL('https://www.google.com')},
  ]).describe("should successfully assert the URL if it's correct", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, () => {
      expect.assertions(3);
      const testClient = new ApiClient(options);
      const spy = jest.spyOn(testClient, "assertUrl");

      fetch.mockResponse(async() => responseJson);
      expect(testClient.sendRequest("GET", scenario.url)).resolves.not.toThrow();
      expect(testClient.fetchAndHandleResponse("GET", scenario.url)).resolves.not.toThrow();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  const assertMethodTypeError = new TypeError('ApiClient.assertValidMethod method should be a string.');
  each([
    {method: null, error: assertMethodTypeError},
    {method: undefined, error: assertMethodTypeError},
    {method: false, error: assertMethodTypeError},
    {method: 0, error: assertMethodTypeError},
    {method: 1, error: assertMethodTypeError},
  ]).describe("should throw an Error if the method is not a string", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(3);
      const testClient = new ApiClient(options);
      const spy = jest.spyOn(testClient, "assertMethod");
      const currentUrl = new URL(url);

      fetch.mockResponse(async() => responseJson);
      try {
        await testClient.sendRequest(scenario.method, currentUrl);
      } catch (e) {
        expect(e).toStrictEqual(scenario.error);
      }

      try {
        await testClient.fetchAndHandleResponse(scenario.method, currentUrl);
      } catch (e) {
        expect(e).toStrictEqual(scenario.error);
      }

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  each([
    {method: "HEAD"},
    {method: "OPTION"},
    {method: "head"},
    {method: "option"},
  ]).describe("should throw an Error if the method is not unsupported", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(3);
      const testClient = new ApiClient(options);
      const spy = jest.spyOn(testClient, "assertMethod");
      const assertMethodUnsupportedError = new TypeError(`ApiClient.assertValidMethod error: method ${scenario.method} is not supported.`);
      const currentUrl = new URL(url);

      fetch.mockResponse(async() => responseJson);
      try {
        await testClient.sendRequest(scenario.method, currentUrl);
      } catch (e) {
        expect(e).toStrictEqual(assertMethodUnsupportedError);
      }

      try {
        await testClient.fetchAndHandleResponse(scenario.method, currentUrl);
      } catch (e) {
        expect(e).toStrictEqual(assertMethodUnsupportedError);
      }

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  each([
    {method: "GET"},
    {method: "POST"},
    {method: "PUT"},
    {method: "DELETE"},
    {method: "get"},
    {method: "post"},
    {method: "put"},
    {method: "delete"},
  ]).describe("should successfully assert the method if it's correct", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, () => {
      expect.assertions(3);
      const testClient = new ApiClient(options);
      const spy = jest.spyOn(testClient, "assertMethod");
      const currentUrl = new URL(url);

      fetch.mockResponse(async() => responseJson);
      expect(testClient.sendRequest(scenario.method, currentUrl)).resolves.not.toThrow();
      expect(testClient.fetchAndHandleResponse(scenario.method, currentUrl)).resolves.not.toThrow();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  const assertIdEmptyError = new TypeError('ApiClient.assertValidId error: id cannot be empty');
  const assertIdTypeError = new TypeError('ApiClient.assertValidId error: id should be a string');
  each([
    {id: null, error: assertIdEmptyError},
    {id: undefined, error: assertIdEmptyError},
    {id: false, error: assertIdEmptyError},
    {id: 0, error: assertIdEmptyError},
    {id: {}, error: assertIdTypeError},
  ]).describe("should throw an Error if the ID can't be asserted", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(1);
      const testClient = new ApiClient(options);

      try {
        testClient.assertValidId(scenario.id);
      } catch (e) {
        expect(e).toStrictEqual(scenario.error);
      }
    });
  });

  each([
    {id: "https://www.passbolt.com"},
    {id: uuid()},
    {id: "me"},
    {id: "test.json"},
  ]).describe("should successfully assert the ID if it's correct", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, () => {
      expect.assertions(1);
      const testClient = new ApiClient(options);

      expect(() => testClient.assertValidId(scenario.id)).not.toThrow();
    });
  });

  const assertBodyError = new TypeError(`ApiClient.assertBody error: body should be a string.`);
  each([
    {body: 1, error: assertBodyError},
    {body: true, error: assertBodyError},
    {body: [], error: assertBodyError},
    {body: {}, error: assertBodyError},
  ]).describe("should throw an Error if the body is not a string", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(3);
      const testClient = new ApiClient(options);
      const spy = jest.spyOn(testClient, "assertBody");
      const currentUrl = new URL(url);

      fetch.mockResponse(async() => responseJson);
      try {
        await testClient.sendRequest("POST", currentUrl, scenario.body);
      } catch (e) {
        expect(e).toStrictEqual(assertBodyError);
      }

      try {
        await testClient.fetchAndHandleResponse("POST", currentUrl, scenario.body);
      } catch (e) {
        expect(e).toStrictEqual(assertBodyError);
      }

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  each([
    {body: null},
    {body: undefined},
    {body: 0},
  ]).describe("should ignore the body if it has a falsy value", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(5);
      const testClient = new ApiClient(options);
      const spy = jest.spyOn(testClient, "assertBody");
      const currentUrl = new URL(url);

      fetch.mockResponse(async req => {
        const body = await req.text();
        expect(body).toStrictEqual("");
        return responseJson;
      });
      expect(testClient.sendRequest("POST", currentUrl, scenario.body)).resolves.not.toThrow();
      expect(testClient.fetchAndHandleResponse("POST", currentUrl, scenario.body)).resolves.not.toThrow();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  each([
    {body: JSON.stringify({string: 'string', object: {}, array: []})},
    {body: uuid()},
  ]).describe("should send the given body if it is a string", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(5);
      const testClient = new ApiClient(options);
      const spy = jest.spyOn(testClient, "assertBody");
      const currentUrl = new URL(url);

      fetch.mockResponse(async req => {
        const body = await req.text();
        expect(body).toStrictEqual(scenario.body);
        return responseJson;
      });
      expect(testClient.sendRequest("POST", currentUrl, scenario.body)).resolves.not.toThrow();
      expect(testClient.fetchAndHandleResponse("POST", currentUrl, scenario.body)).resolves.not.toThrow();

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  const userUuid = uuid();
  each([
    {
      expectedUrl: 'https://test.passbolt.com/resource.json?api-version=v2',
      url: "https://test.passbolt.com/resource",
      options: undefined
    },
    {
      expectedUrl: `https://test.passbolt.com/resource.json?api-version=v2&filter%5Bhas-users%5D=${userUuid}`,
      url: "https://test.passbolt.com/resource",
      options: {'filter[has-users]': userUuid}
    },
    {
      expectedUrl: `https://test.passbolt.com/resource.json?api-version=v2&filter%5Bhas-users%5D=${userUuid}&filter%5Bsearch%5D=something`,
      url: "https://test.passbolt.com/resource",
      options: {
        'filter[has-users]': userUuid,
        'filter[search]': "something"
      }
    },
    {
      expectedUrl: 'https://test.passbolt.com/resource.json?api-version=v2&contain%5Bpermissions.user.profile%5D=1',
      url: "https://test.passbolt.com/resource",
      options: {
        'contain[permissions.user.profile]': "1"
      }
    },
    {
      expectedUrl: 'https://test.passbolt.com/resource.json?api-version=v2&contain%5Bpermissions.user.profile%5D=1&contain%5Bpermissions.group%5D=1',
      url: "https://test.passbolt.com/resource",
      options: {
        'contain[permissions.user.profile]': "1",
        'contain[permissions.group]': "1"
      }
    },
    {
      expectedUrl: `https://test.passbolt.com/resource.json?api-version=v2&filter%5Bhas-users%5D=${userUuid}&contain%5Bpermissions.user.profile%5D=1`,
      url: "https://test.passbolt.com/resource",
      options: {
        'filter[has-users]': userUuid,
        'contain[permissions.user.profile]': "1"
      }
    },
    {
      expectedUrl: `https://test.passbolt.com/resource.json?api-version=v2&filter%5Bhas-users%5D=${userUuid}&filter%5Bsearch%5D=something&contain%5Bpermissions.user.profile%5D=1&contain%5Bpermissions.group%5D=1`,
      url: "https://test.passbolt.com/resource",
      options: {
        'filter[has-users]': userUuid,
        'filter[search]': "something",
        'contain[permissions.user.profile]': "1",
        'contain[permissions.group]': "1"
      }
    },
  ]).describe("should run the build URL properly", scenario => {
    it(`scenario: ${JSON.stringify(scenario)}`, async() => {
      expect.assertions(1);
      const testClient = new ApiClient(options);
      const url = testClient.buildUrl(scenario.url, scenario.options);
      expect(url.toString()).toStrictEqual(scenario.expectedUrl);
    });
  });

  it("should call GET with an id for a resource", async() => {
    expect.assertions(5);
    const testClient = new ApiClient(options);
    const spyFetch = jest.spyOn(testClient, "fetchAndHandleResponse");
    const spyAssertId = jest.spyOn(testClient, "assertValidId");

    const resourceId = uuid();
    const responseData = {
      id: resourceId,
      data: 'fake-data'
    };
    const expectedResponse = JSON.parse(await mockApiResponse(responseData));

    fetch.mockResponse(() => mockApiResponse(responseData));

    const result = await testClient.get(resourceId);

    expect(result).toStrictEqual(expectedResponse);
    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch).toHaveBeenCalledWith("GET", new URL(`${url}/${resourceName}/${resourceId}.json?api-version=v2`));
    expect(spyAssertId).toHaveBeenCalledTimes(1);
    expect(spyAssertId).toHaveBeenCalledWith(resourceId);
  });

  it("should call DELETE with an id for a resource", async() => {
    expect.assertions(5);
    const testClient = new ApiClient(options);
    const spyFetch = jest.spyOn(testClient, "fetchAndHandleResponse");
    const spyAssertId = jest.spyOn(testClient, "assertValidId");

    const resourceId = uuid();
    const responseData = {
      id: resourceId,
      data: 'fake-data'
    };
    const expectedResponse = JSON.parse(await mockApiResponse(responseData));

    fetch.mockResponse(() => mockApiResponse(responseData));

    const result = await testClient.delete(resourceId);

    expect(result).toStrictEqual(expectedResponse);
    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch).toHaveBeenCalledWith("DELETE", new URL(`${url}/${resourceName}/${resourceId}.json?api-version=v2`), null);
    expect(spyAssertId).toHaveBeenCalledTimes(1);
    expect(spyAssertId).toHaveBeenCalledWith(resourceId);
  });

  it("should call DELETE (dry-run) with an id for a resource", async() => {
    expect.assertions(5);
    const testClient = new ApiClient(options);
    const spyFetch = jest.spyOn(testClient, "fetchAndHandleResponse");
    const spyAssertId = jest.spyOn(testClient, "assertValidId");

    const resourceId = uuid();
    const responseData = {
      id: resourceId,
      data: 'fake-data'
    };
    const expectedResponse = JSON.parse(await mockApiResponse(responseData));

    fetch.mockResponse(() => mockApiResponse(responseData));

    const result = await testClient.delete(resourceId, null, {}, true);

    expect(result).toStrictEqual(expectedResponse);
    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch).toHaveBeenCalledWith("DELETE", new URL(`${url}/${resourceName}/${resourceId}/dry-run.json?api-version=v2`), null);
    expect(spyAssertId).toHaveBeenCalledTimes(1);
    expect(spyAssertId).toHaveBeenCalledWith(resourceId);
  });

  it("should call GET (find all) without id", async() => {
    expect.assertions(3);
    const testClient = new ApiClient(options);
    const spy = jest.spyOn(testClient, "fetchAndHandleResponse");

    const responseData = [{
      id: uuid(),
      data: 'fake-data'
    },
    {
      id: uuid(),
      data: 'fake-data'
    }];
    const expectedResponse = JSON.parse(await mockApiResponse(responseData));

    fetch.mockResponse(() => mockApiResponse(responseData));

    const result = await testClient.findAll();

    expect(result).toStrictEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("GET", new URL(`${url}/${resourceName}.json?api-version=v2`));
  });

  it("should call POST (create) without id", async() => {
    expect.assertions(3);
    const testClient = new ApiClient(options);
    const spy = jest.spyOn(testClient, "fetchAndHandleResponse");

    const resourceId = uuid();
    const body = {
      data: 'fake-data'
    };
    const responseData = {id: resourceId, ...body};
    const expectedResponse = JSON.parse(await mockApiResponse(responseData));

    fetch.mockResponse(() => mockApiResponse(responseData));

    const result = await testClient.create(body);

    expect(result).toStrictEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("POST", new URL(`${url}/${resourceName}.json?api-version=v2`), JSON.stringify(body));
  });

  it("should call PUT (update) with an id for a resource", async() => {
    expect.assertions(5);
    const testClient = new ApiClient(options);
    const spyFetch = jest.spyOn(testClient, "fetchAndHandleResponse");
    const spyAssertId = jest.spyOn(testClient, "assertValidId");

    const resourceId = uuid();
    const body = {
      id: resourceId,
      data: 'fake-data'
    };
    const responseData = {id: resourceId, ...body};
    const expectedResponse = JSON.parse(await mockApiResponse(responseData));

    fetch.mockResponse(() => mockApiResponse(responseData));

    const result = await testClient.update(resourceId, body);

    expect(result).toStrictEqual(expectedResponse);
    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch).toHaveBeenCalledWith("PUT", new URL(`${url}/${resourceName}/${resourceId}.json?api-version=v2`), JSON.stringify(body));
    expect(spyAssertId).toHaveBeenCalledTimes(1);
    expect(spyAssertId).toHaveBeenCalledWith(resourceId);
  });

  it("should call PUT (update dry-run) with an id for a resource", async() => {
    expect.assertions(5);
    const testClient = new ApiClient(options);
    const spyFetch = jest.spyOn(testClient, "fetchAndHandleResponse");
    const spyAssertId = jest.spyOn(testClient, "assertValidId");

    const resourceId = uuid();
    const body = {
      id: resourceId,
      data: 'fake-data'
    };
    const responseData = {id: resourceId, ...body};
    const expectedResponse = JSON.parse(await mockApiResponse(responseData));

    fetch.mockResponse(() => mockApiResponse(responseData));

    const result = await testClient.update(resourceId, null, {}, true);

    expect(result).toStrictEqual(expectedResponse);
    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch).toHaveBeenCalledWith("PUT", new URL(`${url}/${resourceName}/${resourceId}/dry-run.json?api-version=v2`), null);
    expect(spyAssertId).toHaveBeenCalledTimes(1);
    expect(spyAssertId).toHaveBeenCalledWith(resourceId);
  });
});
