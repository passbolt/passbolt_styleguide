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
 * @since         5.11.0
 */

import { enableFetchMocks } from "jest-fetch-mock";
import SmtpSettingsApiService from "./smtpSettingsApiService";
import { defaultApiClientOptions } from "../../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";
import { defaultSmtpSettingsEntityDto } from "../../../models/entity/smtpSettings/smtpSettingsEntity.test.data";
import PassboltServiceUnavailableError from "../../../lib/Error/PassboltServiceUnavailableError";
import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("SmtpSettingsApiService", () => {
  const apiClientOptions = defaultApiClientOptions();
  const service = new SmtpSettingsApiService(apiClientOptions);

  describe("::find", () => {
    it("should call the API to retrieve SMTP settings and return a PassboltResponseEntity", async () => {
      expect.assertions(3);

      const dto = defaultSmtpSettingsEntityDto({ client: "localhost" });
      fetch.doMockOnceIf(/smtp\/settings\.json/, async (req) => {
        expect(req.method).toStrictEqual("GET");
        return mockApiResponse(dto);
      });

      const result = await service.find();
      expect(result).toBeInstanceOf(PassboltResponseEntity);
      expect(result.body).toEqual(dto);
    });

    it("should normalize tls null to false in the response body", async () => {
      expect.assertions(1);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse(defaultSmtpSettingsEntityDto({ tls: null })));

      const result = await service.find();
      expect(result.body.tls).toBe(false);
    });

    it("should raise an error if the API call fails", async () => {
      expect.assertions(1);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => Promise.reject({ message: "The service is unavailable" }));

      expect(async () => await service.find()).rejects.toThrowError(PassboltServiceUnavailableError);
    });
  });

  describe("::create", () => {
    it("should call the API to save SMTP settings and return a PassboltResponseEntity", async () => {
      expect.assertions(3);

      const dto = defaultSmtpSettingsEntityDto({ client: "localhost" });
      fetch.doMockOnceIf(/smtp\/settings\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        return mockApiResponse(dto);
      });

      const result = await service.create(dto);
      expect(result).toBeInstanceOf(PassboltResponseEntity);
      expect(result.body).toEqual(dto);
    });

    it("should normalize tls null to false in the response body", async () => {
      expect.assertions(1);

      const dto = defaultSmtpSettingsEntityDto({ tls: false });
      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse({ ...dto, tls: null }));

      const result = await service.create(dto);
      expect(result.body.tls).toBe(false);
    });

    it("should raise an error if the API call fails", async () => {
      expect.assertions(1);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => Promise.reject({ message: "The service is unavailable" }));

      expect(async () => await service.create(defaultSmtpSettingsEntityDto())).rejects.toThrowError(
        PassboltServiceUnavailableError,
      );
    });
  });
});
