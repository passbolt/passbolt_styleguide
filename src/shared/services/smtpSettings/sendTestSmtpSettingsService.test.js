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
import SendTestSmtpSettingsService from "./sendTestSmtpSettingsService";
import { defaultApiClientOptions } from "../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse } from "../../../../test/mocks/mockApiResponse";
import {
  defaultSmtpNoneAuthenticationEntityDto,
  defaultSmtpOAuthCredentialsGrantSettingsEntityDto,
} from "../../models/entity/smtpSettings/smtpSettingsEntity.test.data";
import SmtpSettingsEntity from "../../models/entity/smtpSettings/smtpSettingsEntity";
import PassboltServiceUnavailableError from "../../lib/Error/PassboltServiceUnavailableError";

describe("SendTestSmtpSettingsService", () => {
  let service;

  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
    service = new SendTestSmtpSettingsService(defaultApiClientOptions());
  });

  describe("::send", () => {
    it("should send the entity DTO + email_test_to to the API", async () => {
      expect.assertions(1);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);
      const recipient = "test@example.com";

      fetch.doMockOnceIf(/smtp\/email\.json/, async (req) => {
        const requestData = JSON.parse(req.body);
        expect(requestData).toStrictEqual({ ...entity.toDto(), email_test_to: recipient });
        return mockApiResponse({ debug: [] });
      });

      await service.send(entity, recipient);
    });

    it("should return the response body", async () => {
      expect.assertions(1);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);

      fetch.doMockOnceIf(/smtp\/email\.json/, () => mockApiResponse({ debug: [] }));

      const result = await service.send(entity, "test@example.com");

      expect(result).toStrictEqual({ debug: [] });
    });

    it("should work correctly with an OAuth entity", async () => {
      expect.assertions(2);

      const dto = defaultSmtpOAuthCredentialsGrantSettingsEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);
      const recipient = "oauth@example.com";

      fetch.doMockOnceIf(/smtp\/email\.json/, async (req) => {
        const requestData = JSON.parse(req.body);
        expect(requestData).toStrictEqual({ ...entity.toDto(), email_test_to: recipient });
        return mockApiResponse({ debug: [] });
      });

      const result = await service.send(entity, recipient);
      expect(result).toStrictEqual({ debug: [] });
    });

    it("should throw if the API call fails", async () => {
      expect.assertions(1);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);

      fetch.doMockOnceIf(/smtp\/email\.json/, () => Promise.reject({ message: "The service is unavailable" }));

      await expect(service.send(entity, "test@example.com")).rejects.toThrow(PassboltServiceUnavailableError);
    });
  });
});
