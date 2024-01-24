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
import {defaultApiClientOptions} from "../../../lib/apiClient/apiClientOptions.test.data";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import {defaultSettingsRbacsCollectionData} from "../../../models/entity/rbac/rbacsCollection.test.data";
import RbacMeService from "./rbacMeService";
import PassboltServiceUnavailableError from "../../../lib/Error/PassboltServiceUnavailableError";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe('RbacMeService', () => {
  const apiClientOptions = defaultApiClientOptions();
  const rbacMeService = new RbacMeService(apiClientOptions);


  describe('static methods', () => {
    it('should return the ressource name', () => {
      expect.assertions(1);

      expect(RbacMeService.RESOURCE_NAME).toEqual("/rbacs/me");
    });

    it('should return the supported contain options', () => {
      expect.assertions(1);

      expect(RbacMeService.getSupportedContainOptions()).toEqual(["action", "ui_action"]);
    });
  });

  describe('findMe', () => {
    it('should call the API to retrieve all rbacs', async() => {
      expect.assertions(2);

      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacMeService.findMe();

      expect(result).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to retrieve all rbacs with contain options <action>', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.endsWith("contain%5Baction%5D=1")).toBeTruthy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacMeService.findMe({
        action: true,
      });

      expect(result).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should call the API to retrieve all rbacs with contain options <ui_action>', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.endsWith("contain%5Bui_action%5D=1")).toBeTruthy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacMeService.findMe({ui_action: true});

      expect(result).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should not call the API to retrieve all rbacs with without contain options if it is unsupported', async() => {
      expect.assertions(3);

      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, async req => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url.includes("contain")).toBeFalsy();
        return mockApiResponse(defaultSettingsRbacsCollectionData);
      });

      const result = await rbacMeService.findMe({unsupported: true});

      expect(result).toEqual(defaultSettingsRbacsCollectionData);
    });

    it('should raise an error in case an API error occured', async() => {
      expect.assertions(1);

      const error = {message: "The service is unavailable"};
      fetch.doMockOnceIf(/rbacs\/me\.json\?api-version=v2/, () => Promise.reject(error));

      expect(async() => await rbacMeService.findMe()).rejects.toThrowError(PassboltServiceUnavailableError);
    });
  });
});
