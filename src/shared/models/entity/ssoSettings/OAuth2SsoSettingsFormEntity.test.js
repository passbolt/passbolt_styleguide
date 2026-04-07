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
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {
  defaultOAuth2SsoSettingsFormEntityDto,
  oAuth2SsoSettingsEntityDtoFromApi,
} from "../../ssoSettings/SsoSettingsViewModel.test.data";
import OAuth2SsoSettingsFormEntity from "./OAuth2SsoSettingsFormEntity";
import OAuth2SsoSettingsEntity from "./OAuth2SsoSettingsEntity";
import EntityValidationError from "../abstract/entityValidationError";

describe("OAuth2SsoSettingsFormEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(OAuth2SsoSettingsFormEntity.ENTITY_NAME, OAuth2SsoSettingsFormEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsFormEntity, "id");
      assertEntityProperty.notRequired(OAuth2SsoSettingsFormEntity, "id");
    });

    it("validates url property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsFormEntity, "url");
      assertEntityProperty.required(OAuth2SsoSettingsFormEntity, "url");
    });

    it("validates openid_configuration_path property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsFormEntity, "openid_configuration_path");
      assertEntityProperty.required(OAuth2SsoSettingsFormEntity, "openid_configuration_path");
      assertEntityProperty.minLength(OAuth2SsoSettingsFormEntity, "openid_configuration_path", 1);
    });

    it("validates scope property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsFormEntity, "scope");
      assertEntityProperty.required(OAuth2SsoSettingsFormEntity, "scope");
      assertEntityProperty.minLength(OAuth2SsoSettingsFormEntity, "scope", 1);
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsFormEntity, "client_id");
      assertEntityProperty.required(OAuth2SsoSettingsFormEntity, "client_id");
      assertEntityProperty.minLength(OAuth2SsoSettingsFormEntity, "client_id", 1);
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(OAuth2SsoSettingsFormEntity, "client_secret");
      assertEntityProperty.required(OAuth2SsoSettingsFormEntity, "client_secret");
      assertEntityProperty.minLength(OAuth2SsoSettingsFormEntity, "client_secret", 1);
    });
  });

  describe("::constructor", () => {
    it("should construct a OAuth2SsoSettingsFormEntity with valid data", () => {
      expect.assertions(5);

      const dto = defaultOAuth2SsoSettingsFormEntityDto();
      const formEntity = new OAuth2SsoSettingsFormEntity(dto);

      expect(formEntity.url).toStrictEqual(dto.url);
      expect(formEntity.openid_configuration_path).toStrictEqual(dto.openid_configuration_path);
      expect(formEntity.scope).toStrictEqual(dto.scope);
      expect(formEntity.client_id).toStrictEqual(dto.client_id);
      expect(formEntity.client_secret).toStrictEqual(dto.client_secret);
    });

    it("should throw if required fields are missing", () => {
      expect.assertions(1);

      expect(() => new OAuth2SsoSettingsFormEntity({})).toThrow(EntityValidationError);
    });

    it("should construct a OAuth2SsoSettingsFormEntity with an id", () => {
      expect.assertions(1);

      const id = uuid();
      const dto = defaultOAuth2SsoSettingsFormEntityDto({ id });
      const formEntity = new OAuth2SsoSettingsFormEntity(dto);

      expect(formEntity.id).toStrictEqual(id);
    });

    it("should not throw without validation", () => {
      expect.assertions(1);

      expect(() => new OAuth2SsoSettingsFormEntity({}, { validate: false })).not.toThrow();
    });
  });

  describe("::ENTITY_NAME", () => {
    it("should return the entity name", () => {
      expect.assertions(1);

      expect(OAuth2SsoSettingsFormEntity.ENTITY_NAME).toStrictEqual("OAuth2SsoSettingsForm");
    });
  });

  describe("::provider", () => {
    it("should return the OAuth2 provider id", () => {
      expect.assertions(1);

      const formEntity = new OAuth2SsoSettingsFormEntity(defaultOAuth2SsoSettingsFormEntityDto());
      expect(formEntity.provider).toStrictEqual(OAuth2SsoSettingsEntity.PROVIDER_ID);
    });
  });

  describe("::toFormDto", () => {
    it("should return a flat DTO with id and all data fields", () => {
      expect.assertions(1);

      const id = uuid();
      const dto = defaultOAuth2SsoSettingsFormEntityDto({ id });
      const formEntity = new OAuth2SsoSettingsFormEntity(dto);

      expect(formEntity.toFormDto()).toStrictEqual({
        id,
        url: dto.url,
        openid_configuration_path: dto.openid_configuration_path,
        scope: dto.scope,
        client_id: dto.client_id,
        client_secret: dto.client_secret,
      });
    });
  });

  describe("::toEntityDto", () => {
    it("should return a DTO with the API entity format", () => {
      expect.assertions(1);

      const dto = defaultOAuth2SsoSettingsFormEntityDto();
      const formEntity = new OAuth2SsoSettingsFormEntity(dto);

      expect(formEntity.toEntityDto()).toStrictEqual({
        provider: OAuth2SsoSettingsEntity.PROVIDER_ID,
        data: {
          url: dto.url,
          openid_configuration_path: dto.openid_configuration_path,
          scope: dto.scope,
          client_id: dto.client_id,
          client_secret: dto.client_secret,
        },
      });
    });
  });

  describe("::fromEntityDto", () => {
    it("should create a OAuth2SsoSettingsFormEntity from an Entity DTO", () => {
      expect.assertions(6);

      const apiDto = oAuth2SsoSettingsEntityDtoFromApi();
      const formEntity = OAuth2SsoSettingsFormEntity.fromEntityDto(apiDto);

      expect(formEntity.id).toStrictEqual(apiDto.id);
      expect(formEntity.url).toStrictEqual(apiDto.data.url);
      expect(formEntity.openid_configuration_path).toStrictEqual(apiDto.data.openid_configuration_path);
      expect(formEntity.scope).toStrictEqual(apiDto.data.scope);
      expect(formEntity.client_id).toStrictEqual(apiDto.data.client_id);
      expect(formEntity.client_secret).toStrictEqual(apiDto.data.client_secret);
    });
  });

  describe("::createDefault", () => {
    it("should create a FormEntity without validation", () => {
      expect.assertions(1);

      expect(() => OAuth2SsoSettingsFormEntity.createDefault()).not.toThrow();
    });

    it("should accept default config values", () => {
      expect.assertions(2);

      const formEntity = OAuth2SsoSettingsFormEntity.createDefault({
        url: "https://example.com",
        scope: "openid",
      });

      expect(formEntity.url).toStrictEqual("https://example.com");
      expect(formEntity.scope).toStrictEqual("openid");
    });
  });

  describe("::validate", () => {
    it("should return an empty EntityValidationError when data is valid", () => {
      expect.assertions(2);

      const dto = defaultOAuth2SsoSettingsFormEntityDto();
      const formEntity = new OAuth2SsoSettingsFormEntity(dto);
      const result = formEntity.validate();

      expect(result).toBeInstanceOf(EntityValidationError);
      expect(result.hasErrors()).toStrictEqual(false);
    });

    it.each([
      {
        dto: {
          url: 42,
          openid_configuration_path: 42,
          scope: 42,
          client_id: 42,
          client_secret: 42,
        },
        expectedErrors: {
          url: { type: "The url is not a valid string." },
          openid_configuration_path: { type: "The openid_configuration_path is not a valid string." },
          scope: { type: "The scope is not a valid string." },
          client_id: { type: "The client_id is not a valid string." },
          client_secret: { type: "The client_secret is not a valid string." },
        },
      },
      {
        dto: {
          url: "not a URL",
          openid_configuration_path: "",
          scope: "",
          client_id: "",
          client_secret: "",
        },
        expectedErrors: {
          url: { pattern: "The url is not valid." },
          openid_configuration_path: {
            minLength: "The openid_configuration_path should be 1 character in length minimum.",
          },
          scope: { minLength: "The scope should be 1 character in length minimum." },
          client_id: { minLength: "The client_id should be 1 character in length minimum." },
          client_secret: { minLength: "The client_secret should be 1 character in length minimum." },
        },
      },
    ])("should return validation errors for $dto", ({ dto, expectedErrors }) => {
      expect.assertions(5);

      const formEntity = new OAuth2SsoSettingsFormEntity(dto, { validate: false });
      const validationErrors = formEntity.validate();

      const errorFieldNames = Object.keys(expectedErrors);
      for (const errorField of errorFieldNames) {
        expect(validationErrors.getError(errorField)).toStrictEqual(expectedErrors[errorField]);
      }
    });
  });
});
