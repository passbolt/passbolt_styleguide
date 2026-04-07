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
import SaveSmtpSettingsService from "./saveSmtpSettingsService";
import { defaultApiClientOptions } from "../../lib/apiClient/apiClientOptions.test.data";
import { mockApiResponse } from "../../../../test/mocks/mockApiResponse";
import {
  defaultSmtpNoneAuthenticationEntityDto,
  defaultSmtpUsernameAuthenticationEntityDto,
  defaultSmtpUsernamePasswordAuthenticationEntityDto,
  defaultSmtpOAuthCredentialsGrantSettingsEntityDto,
} from "../../models/entity/smtpSettings/smtpSettingsEntity.test.data";
import SmtpSettingsEntity from "../../models/entity/smtpSettings/smtpSettingsEntity";
import SmtpNoneAuthenticationEntity from "../../models/entity/smtpSettings/smtpNoneAuthenticationEntity";
import SmtpUsernameAuthenticationEntity from "../../models/entity/smtpSettings/smtpUsernameAuthenticationEntity";
import SmtpUsernamePasswordAuthenticationEntity from "../../models/entity/smtpSettings/smtpUsernamePasswordAuthenticationEntity";
import SmtpOAuthCredentialsGrantSettingsEntity from "../../models/entity/smtpSettings/smtpOAuthCredentialsGrantSettingsEntity";
import PassboltServiceUnavailableError from "../../lib/Error/PassboltServiceUnavailableError";

describe("SaveSmtpSettingsService", () => {
  let service;

  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
    service = new SaveSmtpSettingsService(defaultApiClientOptions());
  });

  describe("::save", () => {
    it("should send the entity DTO to the API", async () => {
      expect.assertions(1);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);

      fetch.doMockOnceIf(/smtp\/settings\.json/, async (req) => {
        const requestData = JSON.parse(req.body);
        expect(requestData).toStrictEqual(entity.toDto());
        return mockApiResponse(dto);
      });

      await service.save(entity);
    });

    it("should return the correct entity subtype from the API response", async () => {
      expect.assertions(2);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse(dto));

      const result = await service.save(entity);

      expect(result).toBeInstanceOf(SmtpNoneAuthenticationEntity);
      expect(result.toDto()).toMatchObject({ host: dto.host, port: dto.port });
    });

    it("should return the correct entity subtype for username auth", async () => {
      expect.assertions(1);

      const dto = defaultSmtpUsernameAuthenticationEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse(dto));

      const result = await service.save(entity);

      expect(result).toBeInstanceOf(SmtpUsernameAuthenticationEntity);
    });

    it("should return the correct entity subtype for username+password auth", async () => {
      expect.assertions(1);

      const dto = defaultSmtpUsernamePasswordAuthenticationEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse(dto));

      const result = await service.save(entity);

      expect(result).toBeInstanceOf(SmtpUsernamePasswordAuthenticationEntity);
    });

    it("should return the correct entity subtype for OAuth credentials grant auth", async () => {
      expect.assertions(1);

      const dto = defaultSmtpOAuthCredentialsGrantSettingsEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => mockApiResponse(dto));

      const result = await service.save(entity);

      expect(result).toBeInstanceOf(SmtpOAuthCredentialsGrantSettingsEntity);
    });

    it("should throw if the API call fails", async () => {
      expect.assertions(1);

      const dto = defaultSmtpNoneAuthenticationEntityDto();
      const entity = SmtpSettingsEntity.createFromSettings(dto);

      fetch.doMockOnceIf(/smtp\/settings\.json/, () => Promise.reject({ message: "The service is unavailable" }));

      await expect(service.save(entity)).rejects.toThrow(PassboltServiceUnavailableError);
    });
  });
});
