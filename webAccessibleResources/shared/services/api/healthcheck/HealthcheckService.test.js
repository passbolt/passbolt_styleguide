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
 * @since         5.17.0
 */

import { enableFetchMocks } from "jest-fetch-mock";
import HealthcheckService from "./HealthcheckService";
import { defaultApiClientOptions } from "../../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";
import PassboltServiceUnavailableError from "../../../lib/Error/PassboltServiceUnavailableError";
import { defaultHealthcheckCheckDto } from "../../../models/entity/healthcheck/healthcheck.test.data";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("HealthcheckService", () => {
  const checksDto = [defaultHealthcheckCheckDto()];

  describe("::fetchHealthcheck", () => {
    it("should call the api asking for the v5 format", async () => {
      expect.assertions(3);

      const service = new HealthcheckService(defaultApiClientOptions());

      fetch.doMockOnceIf(/healthcheck\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        expect(req.url).toStrictEqual("https://localhost/healthcheck.json?api-version=v5");
        return mockApiResponse(checksDto);
      });

      await service.fetchHealthcheck();

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should return the response body untouched, a flat list of checks", async () => {
      expect.assertions(1);

      const service = new HealthcheckService(defaultApiClientOptions());
      fetch.doMockOnceIf(/healthcheck\.json/, () => mockApiResponse(checksDto));

      const result = await service.fetchHealthcheck();

      expect(result).toEqual(checksDto);
    });

    it("should return undefined if the response has no body", async () => {
      expect.assertions(1);

      const service = new HealthcheckService(defaultApiClientOptions());
      fetch.doMockOnceIf(/healthcheck\.json/, () => Promise.resolve(JSON.stringify({ header: {} })));

      const result = await service.fetchHealthcheck();

      expect(result).toBeUndefined();
    });

    it("should raise an error in case an API error occurred", async () => {
      expect.assertions(2);

      const service = new HealthcheckService(defaultApiClientOptions());
      fetch.doMockOnceIf(/healthcheck\.json/, () => Promise.reject(new Error()));

      await expect(() => service.fetchHealthcheck()).rejects.toThrow(PassboltServiceUnavailableError);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
