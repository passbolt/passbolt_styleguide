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
import SmtpTestSettingsApiService from "./smtpTestSettingsApiService";
import { defaultApiClientOptions } from "../../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";
import { defaultSmtpTestEmailDto } from "./smtpTestSettingsApiService.test.data";
import PassboltServiceUnavailableError from "../../../lib/Error/PassboltServiceUnavailableError";
import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("SmtpTestSettingsApiService", () => {
  const apiClientOptions = defaultApiClientOptions();
  const service = new SmtpTestSettingsApiService(apiClientOptions);

  describe("::create", () => {
    it("should call the API to send a test email and return a PassboltResponseEntity", async () => {
      expect.assertions(3);

      const sendTestEmailDto = defaultSmtpTestEmailDto();
      const responseBody = { message: "Email sent" };
      fetch.doMockOnceIf(/smtp\/email\.json/, async (req) => {
        expect(req.method).toStrictEqual("POST");
        return mockApiResponse(responseBody);
      });

      const result = await service.create(sendTestEmailDto);
      expect(result).toBeInstanceOf(PassboltResponseEntity);
      expect(result.body).toEqual(responseBody);
    });

    it("should call the API with the provided DTO", async () => {
      expect.assertions(1);

      const sendTestEmailDto = defaultSmtpTestEmailDto();
      fetch.doMockOnceIf(/smtp\/email\.json/, async (req) => {
        const body = await req.json();
        expect(body).toEqual(sendTestEmailDto);
        return mockApiResponse({});
      });

      await service.create(sendTestEmailDto);
    });

    it("should raise an error if the API call fails", async () => {
      expect.assertions(1);

      fetch.doMockOnceIf(/smtp\/email\.json/, () => Promise.reject({ message: "The service is unavailable" }));

      expect(async () => await service.create({ email_test_to: "test@passbolt.com" })).rejects.toThrow(
        PassboltServiceUnavailableError,
      );
    });
  });
});
