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
 * @since         5.4.0
 */
import { enableFetchMocks } from "jest-fetch-mock";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";
import { defaultMetadataGettingStartedSettingsDto } from "../../../models/entity/metadata/metadataGettingStartedSettingsEntity.test.data";
import { defaultApiClientOptions } from "../../../lib/apiClient/apiClientOptions.test.data";
import MetadataGettingStartedSettingsApiService from "./metadataGettingStartedSettingsApiService";
import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";

beforeEach(() => {
  jest.clearAllMocks();
  enableFetchMocks();
});

describe("MetadataGettingStartedSettingsApiService", () => {
  describe("::get", () => {
    it("should return a PassboltResponseEntity with the API response", async () => {
      expect.assertions(2);

      const apiClientOptions = defaultApiClientOptions();
      const service = new MetadataGettingStartedSettingsApiService(apiClientOptions);
      const expectedDto = defaultMetadataGettingStartedSettingsDto();

      fetch.doMockIf(/\/metadata\/settings\/getting-started\.json/, () => mockApiResponse(expectedDto));

      const result = await service.get();

      expect(result).toBeInstanceOf(PassboltResponseEntity);
      expect(result.body).toStrictEqual(expectedDto);
    });

    it("should throw an error response if something goes wrong when fetching the API", async () => {
      expect.assertions(1);

      const apiClientOptions = defaultApiClientOptions();
      const service = new MetadataGettingStartedSettingsApiService(apiClientOptions);

      fetch.doMockIf(/\/metadata\/settings\/getting-started\.json/, () => {
        throw new Error("Something goes wrong! ");
      });

      await expect(() => service.get()).rejects.toThrowError();
    });
  });
});
