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
import { ApiClientOptions } from "./apiClientOptions";
import { v4 as uuid } from "uuid";

describe("ApiClientOption testsuite", () => {
  it("should build the API client options if the given base URL is fine", () => {
    expect(() => {
      new ApiClientOptions().setBaseUrl("https://localhost");
    }).not.toThrow();
  });

  it("should throw an error if url is empty", () => {
    expect(() => {
      new ApiClientOptions().setBaseUrl();
    }).toThrow(TypeError);
  });

  it("should throw an error if url is not correct", () => {
    expect(() => {
      new ApiClientOptions().setBaseUrl("url");
    }).toThrow(TypeError);
  });

  it("should throw an error if url is not correct type", () => {
    expect(() => {
      new ApiClientOptions().setBaseUrl({ url: "nope" });
    }).toThrow(TypeError);
  });

  it("should throw an error if resource name is empty", () => {
    expect(() => {
      new ApiClientOptions().setResourceName();
    }).toThrow(TypeError);
  });

  it("should throw an error if resource name is not a string", () => {
    expect(() => {
      new ApiClientOptions().setResourceName({ test: "test" });
    }).toThrow(TypeError);
  });

  it("should return no headers if there is no CSRF token", async () => {
    jest.spyOn(browser.cookies, "get").mockImplementation(() => null);

    const apiClientOptions = new ApiClientOptions().setBaseUrl("https://localhost");
    const headers = await apiClientOptions.getHeaders();

    expect(headers).toBeFalsy();
  });

  it("should return the headers with the right CSRF token", async () => {
    const csrfToken = uuid();
    jest.spyOn(browser.cookies, "get").mockImplementation(() => ({ value: csrfToken }));

    const apiClientOptions = new ApiClientOptions().setBaseUrl("https://localhost");
    const headers = await apiClientOptions.getHeaders();

    expect(headers).toStrictEqual({ "X-CSRF-Token": csrfToken });
  });

  describe("Should return the right cookie value when browser API is not available", () => {
    let originalBrowserCookies;
    beforeAll(() => {
      originalBrowserCookies = browser.cookies;
      delete browser.cookies;
    });

    afterAll(() => {
      browser.cookies = originalBrowserCookies;
    });

    it("should return no headers if there is no CSRF token and browser API is not available", async () => {
      document.cookie = null;
      const apiClientOptions = new ApiClientOptions().setBaseUrl("https://localhost");
      const headers = await apiClientOptions.getHeaders();

      expect(headers).toBeFalsy();
    });

    it("should return the headers with the right CSRF token and browser API is not available", async () => {
      const csrfToken = uuid();
      document.cookie = `csrfToken=${csrfToken}`;

      const apiClientOptions = new ApiClientOptions().setBaseUrl("https://localhost");
      const headers = await apiClientOptions.getHeaders();

      expect(headers).toStrictEqual({ "X-CSRF-Token": csrfToken });
    });
  });
});
