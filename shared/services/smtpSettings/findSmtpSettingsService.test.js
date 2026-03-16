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
import FindSmtpSettingsService from "./findSmtpSettingsService";
import { defaultApiClientOptions } from "../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse } from "../../../../test/mocks/mockApiResponse";
import {
  defaultSmtpNoneAuthenticationEntityDto,
  defaultSmtpUsernamePasswordAuthenticationEntityDto,
  defaultSmtpOAuthCredentialsGrantSettingsEntityDto,
} from "../../models/entity/smtpSettings/smtpSettingsEntity.test.data";
import SmtpNoneAuthenticationEntity from "../../models/entity/smtpSettings/smtpNoneAuthenticationEntity";
import SmtpUsernamePasswordAuthenticationEntity from "../../models/entity/smtpSettings/smtpUsernamePasswordAuthenticationEntity";
import SmtpOAuthCredentialsGrantSettingsEntity from "../../models/entity/smtpSettings/smtpOAuthCredentialsGrantSettingsEntity";
import PassboltServiceUnavailableError from "../../lib/Error/PassboltServiceUnavailableError";

describe("FindSmtpSettingsService", () => {
  let service;

  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
    service = new FindSmtpSettingsService(defaultApiClientOptions());
  });

  describe("::find", () => {
    it("should return a SmtpNoneAuthenticationEntity when no authentication fields are present", async () => {
      expect.assertions(2);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse(dto));

      const result = await service.find();

      expect(result).toBeInstanceOf(SmtpNoneAuthenticationEntity);
      expect(result.toDto()).toMatchObject({ host: dto.host, port: dto.port });
    });

    it("should return a SmtpUsernamePasswordAuthenticationEntity when username+password are present", async () => {
      expect.assertions(1);

      const dto = defaultSmtpUsernamePasswordAuthenticationEntityDto();
      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse(dto));

      const result = await service.find();

      expect(result).toBeInstanceOf(SmtpUsernamePasswordAuthenticationEntity);
    });

    it("should return a SmtpOAuthCredentialsGrantSettingsEntity when client_id is present", async () => {
      expect.assertions(1);

      const dto = defaultSmtpOAuthCredentialsGrantSettingsEntityDto();
      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse(dto));

      const result = await service.find();

      expect(result).toBeInstanceOf(SmtpOAuthCredentialsGrantSettingsEntity);
    });

    it("should throw if the API call fails", async () => {
      expect.assertions(1);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => Promise.reject({ message: "The service is unavailable" }));

      await expect(service.find()).rejects.toThrow(PassboltServiceUnavailableError);
    });
  });
});
