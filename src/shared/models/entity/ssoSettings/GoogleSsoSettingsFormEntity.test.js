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

import { v4 as uuid } from "uuid";
import {
  defaultGoogleSsoSettingsFormEntityDto,
  googleSsoSettingsEntityDtoFromApi,
} from "../../ssoSettings/SsoSettingsViewModel.test.data";
import GoogleSsoSettingsFormEntity from "./GoogleSsoSettingsFormEntity";
import GoogleSsoSettingsEntity from "./GoogleSsoSettingsEntity";
import EntityValidationError from "../abstract/entityValidationError";

describe("GoogleSsoSettingsFormEntity", () => {
  describe("::constructor", () => {
    it("should create a new GoogleSsoSettingsFormEntity with valid data", () => {
      expect.assertions(2);

      const dto = defaultGoogleSsoSettingsFormEntityDto();
      const formEntity = new GoogleSsoSettingsFormEntity(dto);

      expect(formEntity.client_id).toStrictEqual(dto.client_id);
      expect(formEntity.client_secret).toStrictEqual(dto.client_secret);
    });

    it("should throw if required fields are missing", () => {
      expect.assertions(1);

      expect(() => new GoogleSsoSettingsFormEntity({})).toThrow(EntityValidationError);
    });

    it("should create a new GoogleSsoSettingsFormEntity with an id", () => {
      expect.assertions(1);

      const id = uuid();
      const dto = defaultGoogleSsoSettingsFormEntityDto({ id });
      const formEntity = new GoogleSsoSettingsFormEntity(dto);

      expect(formEntity.id).toStrictEqual(id);
    });

    it("should not throw without validation", () => {
      expect.assertions(1);

      expect(() => new GoogleSsoSettingsFormEntity({}, { validate: false })).not.toThrow();
    });
  });

  describe("::ENTITY_NAME", () => {
    it("should return the entity name", () => {
      expect.assertions(1);

      expect(GoogleSsoSettingsFormEntity.ENTITY_NAME).toStrictEqual("GoogleSsoSettingsForm");
    });
  });

  describe("::provider", () => {
    it("should return the Google provider id", () => {
      expect.assertions(1);

      const formEntity = new GoogleSsoSettingsFormEntity(defaultGoogleSsoSettingsFormEntityDto());
      expect(formEntity.provider).toStrictEqual(GoogleSsoSettingsEntity.PROVIDER_ID);
    });
  });

  describe("::toFormDto", () => {
    it("should return a flat DTO with id and all data fields", () => {
      expect.assertions(1);

      const id = uuid();
      const dto = defaultGoogleSsoSettingsFormEntityDto({ id });
      const formEntity = new GoogleSsoSettingsFormEntity(dto);

      expect(formEntity.toFormDto()).toStrictEqual({
        id,
        client_id: dto.client_id,
        client_secret: dto.client_secret,
      });
    });
  });

  describe("::toEntityDto", () => {
    it("should return a DTO with the entity format", () => {
      expect.assertions(1);

      const dto = defaultGoogleSsoSettingsFormEntityDto();
      const formEntity = new GoogleSsoSettingsFormEntity(dto);

      expect(formEntity.toEntityDto()).toStrictEqual({
        provider: GoogleSsoSettingsEntity.PROVIDER_ID,
        data: {
          client_id: dto.client_id,
          client_secret: dto.client_secret,
        },
      });
    });
  });

  describe("::fromEntityDto", () => {
    it("should create a GoogleSsoSettingsFormEntity from an Entity DTO", () => {
      expect.assertions(3);

      const apiDto = googleSsoSettingsEntityDtoFromApi();
      const formEntity = GoogleSsoSettingsFormEntity.fromEntityDto(apiDto);

      expect(formEntity.id).toStrictEqual(apiDto.id);
      expect(formEntity.client_id).toStrictEqual(apiDto.data.client_id);
      expect(formEntity.client_secret).toStrictEqual(apiDto.data.client_secret);
    });
  });

  describe("::createDefault", () => {
    it("should create a FormEntity without validation", () => {
      expect.assertions(1);

      expect(() => GoogleSsoSettingsFormEntity.createDefault()).not.toThrow();
    });

    it("should accept default config values", () => {
      expect.assertions(1);

      const formEntity = GoogleSsoSettingsFormEntity.createDefault({
        client_id: "default-id",
      });

      expect(formEntity.client_id).toStrictEqual("default-id");
    });
  });

  describe("::validate", () => {
    it("should return an empty EntityValidationError when data is valid", () => {
      expect.assertions(2);

      const dto = defaultGoogleSsoSettingsFormEntityDto();
      const formEntity = new GoogleSsoSettingsFormEntity(dto);
      const result = formEntity.validate();

      expect(result).toBeInstanceOf(EntityValidationError);
      expect(result.hasErrors()).toStrictEqual(false);
    });

    it.each([
      {
        dto: {
          client_id: 42,
          client_secret: 42,
        },
        expectedErrors: {
          client_id: { type: "The client_id is not a valid string." },
          client_secret: { type: "The client_secret is not a valid string." },
        },
      },
      {
        dto: {
          client_id: "",
          client_secret: "",
        },
        expectedErrors: {
          client_id: { minLength: "The client_id should be 1 character in length minimum." },
          client_secret: { minLength: "The client_secret should be 1 character in length minimum." },
        },
      },
    ])("should return validation errors for $dto", ({ dto, expectedErrors }) => {
      expect.assertions(2);

      const formEntity = new GoogleSsoSettingsFormEntity(dto, { validate: false });
      const validationErrors = formEntity.validate();

      const errorFieldNames = Object.keys(expectedErrors);
      for (const errorField of errorFieldNames) {
        expect(validationErrors.getError(errorField)).toStrictEqual(expectedErrors[errorField]);
      }
    });
  });
});
