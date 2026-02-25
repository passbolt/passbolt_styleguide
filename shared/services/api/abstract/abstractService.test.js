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
 * @since         3.0.0
 */
import { ApiClientOptions } from "../../../lib/apiClient/apiClientOptions";
import AbstractService from "./abstractService";

describe("Abstract service", () => {
  it("constructor works", () => {
    const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
    const service = new AbstractService(options, "test");

    // Basics
    let t = () => {
      service.assertValidId("test");
    };
    expect(t).toThrow(TypeError);
    t = () => {
      service.assertNonEmptyData(null);
    };
    expect(t).toThrow(TypeError);
  });

  it("constructor works", () => {
    const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
    const service = new AbstractService(options, "test");

    const formated = service.formatContainOptions({ user: true, "user.profile": false }, [
      "user",
      "user.profile",
      "user.profile.avatar",
      "gpgkey",
    ]);
    expect(formated).toEqual({ "contain[user]": "1", "contain[user.profile]": "0" });
  });

  describe("::formatPageOptions", () => {
    describe("it should handle sole 'sorts' option", () => {
      it("should return the 'sorts' data formatted as expected", () => {
        expect.assertions(1);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        const supportedOptions = ["Resource.modified", "Entity.id"];

        const formatedPageOptions = service.formatPageOptions(
          { sorts: { "Resource.modified": "asc", "Entity.id": "desc" } },
          supportedOptions,
        );

        const expectedFormatedSorts = {
          ["sort[Resource.modified]"]: "asc",
          ["sort[Entity.id]"]: "desc",
        };

        expect(formatedPageOptions).toStrictEqual(expectedFormatedSorts);
      });

      it("should return the 'sorts' data formatted as expected and remove the unsupported options", () => {
        expect.assertions(1);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        const supportedOptions = ["Resource.modified"];

        const formatedPageOptions = service.formatPageOptions(
          { sorts: { "Resource.modified": "asc", "Entity.id": "desc" } },
          supportedOptions,
        );

        const expectedFormatedSorts = {
          ["sort[Resource.modified]"]: "asc",
        };
        expect(formatedPageOptions).toStrictEqual(expectedFormatedSorts);
      });

      it("should return an empty array if no 'sorts' given options is supported", () => {
        expect.assertions(1);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        const supportedOptions = ["Resources.modified asc"];

        const formatedPageOptions = service.formatPageOptions({ orders: ["Entity.id desc"] }, supportedOptions);

        expect(formatedPageOptions).toStrictEqual({});
      });
    });

    describe("it should handle sole 'limit' option", () => {
      it("should return the 'limit' data formatted as expected", () => {
        expect.assertions(1);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        const formatedPageOptions = service.formatPageOptions({ limit: 1000 }, []);

        const expectedFormatedLimit = { limit: "1000" };

        expect(formatedPageOptions).toStrictEqual(expectedFormatedLimit);
      });

      it("should throw an error if 'limit' is not valid", async () => {
        expect.assertions(2);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        await expect(() => service.formatPageOptions({ limit: "test" })).toThrowError();
        await expect(() => service.formatPageOptions({ limit: "10" })).toThrowError();
      });

      it("should ignore 'limit' if it is falsy", async () => {
        expect.assertions(4);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        expect(service.formatPageOptions({ limit: 0 })).toStrictEqual({});
        expect(service.formatPageOptions({ limit: false })).toStrictEqual({});
        expect(service.formatPageOptions({ limit: null })).toStrictEqual({});
        expect(service.formatPageOptions({ limit: undefined })).toStrictEqual({});
      });
    });

    describe("it should handle sole 'page' option", () => {
      it("should ignore the parameter page if no limit is given", () => {
        expect.assertions(1);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        const formatedPageOptions = service.formatPageOptions({ page: 42 }, []);

        const expectedFormatedLimit = {};

        expect(formatedPageOptions).toStrictEqual(expectedFormatedLimit);
      });

      it("should set the parameter page if limit is given", () => {
        expect.assertions(1);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        const formatedPageOptions = service.formatPageOptions({ page: 42, limit: 42 }, []);

        const expectedFormatedLimit = { page: "42", limit: "42" };

        expect(formatedPageOptions).toStrictEqual(expectedFormatedLimit);
      });

      it("should throw an error if 'page' is not valid", async () => {
        expect.assertions(2);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        await expect(() => service.formatPageOptions({ limit: 1, page: "test" })).toThrowError();
        await expect(() => service.formatPageOptions({ limit: 1, page: "10" })).toThrowError();
      });

      it("should ignore 'page' if it is falsy", async () => {
        expect.assertions(4);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        expect(service.formatPageOptions({ limit: 1, page: 0 })).toStrictEqual({ limit: "1" });
        expect(service.formatPageOptions({ limit: 1, page: false })).toStrictEqual({ limit: "1" });
        expect(service.formatPageOptions({ limit: 1, page: null })).toStrictEqual({ limit: "1" });
        expect(service.formatPageOptions({ limit: 1, page: undefined })).toStrictEqual({ limit: "1" });
      });
    });

    describe("it should handle all parameters option", () => {
      it("should set the parameters as expected if all of them are fine", () => {
        expect.assertions(1);

        const options = new ApiClientOptions().setBaseUrl("https://test.passbolt.test/");
        const service = new AbstractService(options, "test");

        const supportedSortFields = ["Resource.name", "Resource.modified"];

        const formatedPageOptions = service.formatPageOptions(
          {
            limit: 42,
            page: 42,
            sorts: { "Resource.name": "desc", "Resource.modified": "asc" },
          },
          supportedSortFields,
        );

        const expectedFormatedLimit = {
          limit: "42",
          page: "42",
          "sort[Resource.name]": "desc",
          "sort[Resource.modified]": "asc",
        };

        expect(formatedPageOptions).toStrictEqual(expectedFormatedLimit);
      });
    });
  });
});
