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
 * Unit tests on GetUrlForSsoIdentificationService in regard of specifications
 */
import {ApiClientOptions} from "../../../lib/apiClient/apiClientOptions";
import GetUrlForSsoIdentificationService from "./GetUrlForSsoIdentificationService";
import {enableFetchMocks} from "jest-fetch-mock";
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import each from 'jest-each';

beforeEach(() => {
  jest.clearAllMocks();
  enableFetchMocks();
});

const scenarios = [
  {providerId: 'azure'},
  {providerId: 'google'},
];

each(scenarios).describe("GetUrlForSsoIdentificationService", scenario => {
  describe(`GetUrlForSsoIdentificationService::getUrl (with provider '${scenario.providerId}')`, () => {
    it('Should return an URL for SSO identification given the provider id', async() => {
      expect.assertions(3);
      const baseUrl = "http://localhost:6006/";
      const apiClientOptions = new ApiClientOptions()
        .setBaseUrl(baseUrl);

      const expectedUrlCall = `${baseUrl}/sso/recover/${scenario.providerId}.json?api-version=v2`;
      const expectedUrl = "https://login.microsoftonline.us";

      const service = new GetUrlForSsoIdentificationService(apiClientOptions);

      fetch.doMockOnce(req => {
        expect(req.method).toStrictEqual("POST");
        expect(req.url).toStrictEqual(expectedUrlCall);
        return mockApiResponse({url: expectedUrl});
      });

      return expect(service.getUrl(scenario.providerId)).resolves.toStrictEqual(new URL(expectedUrl));
    });

    it('Should throw an Error if the domain in the response is not the exoected one', () => {
      expect.assertions(1);
      const apiClientOptions = new ApiClientOptions()
        .setBaseUrl("http://localhost:6006");

      const service = new GetUrlForSsoIdentificationService(apiClientOptions);

      fetch.doMockOnce(() => mockApiResponse({url: 'https://evil.com'}));

      const exepectedError = new Error('The url should be part of the list of supported single sign-on urls.');
      return expect(service.getUrl(scenario.providerId)).rejects.toStrictEqual(exepectedError);
    });
  });
});
