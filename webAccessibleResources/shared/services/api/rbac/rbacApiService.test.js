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
 * @since         4.6.0
 */

import {enableFetchMocks} from "jest-fetch-mock";
import RbacApiService from "./rbacApiService";
import {defaultApiClientOptions} from "../../../lib/apiClient/apiClientOptions.test.data";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import {defaultSettingsRbacsCollectionData, userSettingsRbacsCollectionData} from "../../../models/entity/rbac/rbacsCollection.test.data";
import PassboltServiceUnavailableError from "../../../lib/Error/PassboltServiceUnavailableError";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe('RbacApiService', () => {
  const apiClientOptions = defaultApiClientOptions();
  const rbacApiService = new RbacApiService(apiClientOptions);

  describe('static methods', () => {
    it('should return the ressource name', () => {
      expect.assertions(1);

      expect(RbacApiService.RESOURCE_NAME).toEqual("/rbacs");
    });

    it('should return the supported contain options', () => {
      expect.assertions(1);

      expect(RbacApiService.getSupportedContainOptions()).toEqual(["action", "ui_action"]);
    });
  });

  describe('::findAll', () => {
    it('should call the API to retrieve all rbacs', async() => {
      expect.assertions(2);

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.findAll();

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to retrieve all rbacs with contain options <action>', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.endsWith("contain%5Baction%5D=1")).toBeTruthy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.findAll({
        action: true,
      });

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to retrieve all rbacs with contain options <ui_action>', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.endsWith("contain%5Bui_action%5D=1")).toBeTruthy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.findAll({
        ui_action: true,
      });

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to retrieve all rbacs with without contain options if it is unsupported', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.includes("contain")).toBeFalsy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.findAll({unsupported: true});

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });


    it('should raise an error in case an API error occured', async() => {
      expect.assertions(1);

      const error = {message: "The service is unavailable"};
      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, () => Promise.reject(error));

      expect(async() => await rbacApiService.findAll()).rejects.toThrowError(PassboltServiceUnavailableError);
    });
  });

  describe('::updateAll', () => {
    it('should call the API to update all rbacs', async() => {
      expect.assertions(2);

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("PUT");
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.updateAll(userSettingsRbacsCollectionData);

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to uptade all rbacs with contain options <action>', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("PUT");
        expect(req.url.endsWith("contain%5Baction%5D=1")).toBeTruthy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.updateAll(userSettingsRbacsCollectionData, {
        action: true,
      });

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to uptade all rbacs with contain options <ui_action>', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("PUT");
        expect(req.url.endsWith("contain%5Bui_action%5D=1")).toBeTruthy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.updateAll(userSettingsRbacsCollectionData, {
        ui_action: true,
      });

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should not call the API to update all rbacs with without contain options if it is unsupported', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("PUT");
        expect(req.url.includes("contain")).toBeFalsy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.updateAll({unsupported: true});

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });


    it('should raise an error in case an API error occured', async() => {
      expect.assertions(1);

      const error = {message: "The service is unavailable"};
      fetch.doMockOnceIf(/rbacs\.json\?api-version=v2/, () => Promise.reject(error));

      expect(async() => await rbacApiService.updateAll()).rejects.toThrowError(PassboltServiceUnavailableError);
    });
  });

  describe('::findMe', () => {
    it('should call the API to retrieve all rbacs', async() => {
      expect.assertions(2);

      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.findMe();

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to retrieve all rbacs with contain options <action>', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.endsWith("contain%5Baction%5D=1")).toBeTruthy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.findMe({
        action: true,
      });

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to retrieve all rbacs with contain options <ui_action>', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.endsWith("contain%5Bui_action%5D=1")).toBeTruthy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.findMe({ui_action: true});

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should not call the API to retrieve all rbacs with without contain options if it is unsupported', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.includes("contain")).toBeFalsy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacApiService.findMe({unsupported: true});

      expect(result.body).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should raise an error in case an API error occured', async() => {
      expect.assertions(1);

      const error = {message: "The service is unavailable"};
      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, () => Promise.reject(error));

      expect(async() => await rbacApiService.findMe()).rejects.toThrowError(PassboltServiceUnavailableError);
    });
  });
});
