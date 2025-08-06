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
import {enableFetchMocks} from "jest-fetch-mock";
import {defaultApiClientOptions} from "../../lib/apiClient/apiClientOptions.test.data";
import MetadataGettingStartedSettingsEntity from "../../models/entity/metadata/metadataGettingStartedSettingsEntity";
import {enableMetadataGettingStartedSettingsDto} from "../../models/entity/metadata/metadataGettingStartedSettingsEntity.test.data";
import {mockApiResponse, mockApiResponseError} from "../../../../test/mocks/mockApiResponse";
import FindMetadataGettingStartedSettingsService from "./findMetadataGettingStartedSettingsService";

beforeEach(() => {
  jest.clearAllMocks();
  enableFetchMocks();
});

describe("FindMetadataGettingStartedSettingsService", () => {
  describe("::findGettingStartedSettings", () => {
    it("should return an entity made from the api response", async() => {
      expect.assertions(2);

      const expectedDto = enableMetadataGettingStartedSettingsDto();
      const apiClienOptions = defaultApiClientOptions();
      const service = new FindMetadataGettingStartedSettingsService(apiClienOptions);

      fetch.doMockIf(/\/metadata\/settings\/getting-started\.json/, () => mockApiResponse(expectedDto));

      const result = await service.findGettingStartedSettings();

      expect(result).toBeInstanceOf(MetadataGettingStartedSettingsEntity);
      expect(result.enabled).toStrictEqual(expectedDto.enabled);
    });

    it("should return an entity with disabled settings if an error occurs", async() => {
      expect.assertions(2);

      const apiClienOptions = defaultApiClientOptions();
      const service = new FindMetadataGettingStartedSettingsService(apiClienOptions);

      fetch.doMockIf(/\/metadata\/settings\/getting-started\.json/, () => mockApiResponseError(500, "Something went wrong!"));

      const result = await service.findGettingStartedSettings();

      expect(result).toBeInstanceOf(MetadataGettingStartedSettingsEntity);
      expect(result.enabled).toStrictEqual(false);
    });
  });
});
