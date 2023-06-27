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
import {ApiClientOptions} from "../../../lib/apiClient/apiClientOptions";
import GetRecoverUrlService from "./GetRecoverUrlService";
import {v4 as uuid} from 'uuid';
import {enableFetchMocks} from "jest-fetch-mock";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";

beforeEach(() => {
  jest.clearAllMocks();
  enableFetchMocks();
});

describe("GetRecoverUrlService", () => {
  describe('GetRecoverUrlService::getRecoverUrl', () => {
    it('Should run the SSO login process and get back an URL for the user to proceed', () => {
      expect.assertions(2);
      const siteDomain = "https://www.passbolt.test/";
      const expectedUrl = `${siteDomain}/setup/install`;
      const apiClientOptions = new ApiClientOptions()
        .setBaseUrl("http://localhost:6006");

      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);
      const token = uuid();

      const expectedDto = {
        token: token,
        case: "default"
      };

      const response = {url: expectedUrl};

      fetch.doMockOnce(async req => {
        const dto = JSON.parse(await req.text());
        expect(dto).toStrictEqual(expectedDto);
        return mockApiResponse(response);
      });

      return expect(service.getRecoverUrl(token)).resolves.toStrictEqual(new URL(expectedUrl));
    });

    it('Should throw an Error if the domain in the response is not the exoected one', () => {
      expect.assertions(1);
      const siteDomain = "https://www.passbolt.test/";
      const apiClientOptions = new ApiClientOptions()
        .setBaseUrl("http://localhost:6006");

      const service = new GetRecoverUrlService(new URL(siteDomain), apiClientOptions);

      const response = {url: "https://evil.com"};
      fetch.doMockOnce(() => mockApiResponse(response));

      const expectedError = new Error('The url should be from the same origin.');
      return expect(service.getRecoverUrl(uuid())).rejects.toStrictEqual(expectedError);
    });
  });
});
