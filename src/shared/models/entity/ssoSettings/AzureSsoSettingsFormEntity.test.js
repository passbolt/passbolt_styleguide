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
import each from "jest-each";
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {
  defaultAzureSsoSettingsViewModelDto,
  azureSsoSettingsEntityDtoFromApi,
} from "../../ssoSettings/SsoSettingsViewModel.test.data";
import AzureSsoSettingsFormEntity from "./AzureSsoSettingsFormEntity";
import AzureSsoSettingsEntity from "./AzureSsoSettingsEntity";

describe("AzureSsoSettingsFormEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(AzureSsoSettingsFormEntity.ENTITY_NAME, AzureSsoSettingsFormEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.string(AzureSsoSettingsFormEntity, "id");
      assertEntityProperty.notRequired(AzureSsoSettingsFormEntity, "id");
      assertEntityProperty.uuid(AzureSsoSettingsFormEntity, "id");
    });

    it("validates url property", () => {
      assertEntityProperty.string(AzureSsoSettingsFormEntity, "url");
      assertEntityProperty.required(AzureSsoSettingsFormEntity, "url");
    });

    it("validates client_id property", () => {
      assertEntityProperty.string(AzureSsoSettingsFormEntity, "client_id");
      assertEntityProperty.required(AzureSsoSettingsFormEntity, "client_id");
      assertEntityProperty.uuid(AzureSsoSettingsFormEntity, "client_id");
    });

    it("validates tenant_id property", () => {
      assertEntityProperty.string(AzureSsoSettingsFormEntity, "tenant_id");
      assertEntityProperty.required(AzureSsoSettingsFormEntity, "tenant_id");
      assertEntityProperty.uuid(AzureSsoSettingsFormEntity, "tenant_id");
    });

    it("validates client_secret property", () => {
      assertEntityProperty.string(AzureSsoSettingsFormEntity, "client_secret");
      assertEntityProperty.required(AzureSsoSettingsFormEntity, "client_secret");
      assertEntityProperty.minLength(AzureSsoSettingsFormEntity, "client_secret", 1);
    });

    it("validates client_secret_expiry property", () => {
      assertEntityProperty.required(AzureSsoSettingsFormEntity, "client_secret_expiry");
    });

    it("validates email_claim property", () => {
      assertEntityProperty.string(AzureSsoSettingsFormEntity, "email_claim");
      assertEntityProperty.required(AzureSsoSettingsFormEntity, "email_claim");
      assertEntityProperty.enumeration(
        AzureSsoSettingsFormEntity,
        "email_claim",
        ["email", "preferred_username", "upn"],
        ["invalid"],
      );
    });

    it("validates prompt property", () => {
      assertEntityProperty.string(AzureSsoSettingsFormEntity, "prompt");
      assertEntityProperty.required(AzureSsoSettingsFormEntity, "prompt");
      assertEntityProperty.enumeration(AzureSsoSettingsFormEntity, "prompt", ["login", "none"], ["invalid"]);
    });

    it("validates login_hint property", () => {
      assertEntityProperty.boolean(AzureSsoSettingsFormEntity, "login_hint");
    });
  });

  describe("::constructor", () => {
    it("should construct a FormEntity with validate: false", () => {
      expect.assertions(8);

      const dto = defaultAzureSsoSettingsViewModelDto();
      const entity = new AzureSsoSettingsFormEntity(dto, { validate: false });

      expect(entity._props.url).toStrictEqual(dto.url);
      expect(entity._props.client_id).toStrictEqual(dto.client_id);
      expect(entity._props.tenant_id).toStrictEqual(dto.tenant_id);
      expect(entity._props.client_secret).toStrictEqual(dto.client_secret);
      expect(entity._props.client_secret_expiry).toStrictEqual(dto.client_secret_expiry.substring(0, 10));
      expect(entity._props.email_claim).toStrictEqual(dto.email_claim);
      expect(entity._props.prompt).toStrictEqual(dto.prompt);
      expect(entity._props.login_hint).toStrictEqual(dto.login_hint);
    });
  });

  describe("::provider", () => {
    it("should return the azure provider id", () => {
      expect.assertions(1);

      const entity = new AzureSsoSettingsFormEntity({}, { validate: false });
      expect(entity.provider).toStrictEqual(AzureSsoSettingsEntity.PROVIDER_ID);
    });
  });

  describe("::toFormDto", () => {
    it("should return a DTO suitable for form binding", () => {
      expect.assertions(1);

      const dto = defaultAzureSsoSettingsViewModelDto();
      const entity = new AzureSsoSettingsFormEntity(dto, { validate: false });
      const formDto = entity.toFormDto();

      expect(formDto).toStrictEqual({
        id: undefined,
        provider: AzureSsoSettingsEntity.PROVIDER_ID,
        url: dto.url,
        client_id: dto.client_id,
        tenant_id: dto.tenant_id,
        client_secret: dto.client_secret,
        client_secret_expiry: dto.client_secret_expiry.substring(0, 10),
        email_claim: dto.email_claim,
        prompt: dto.prompt,
        login_hint: dto.login_hint,
      });
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO with the same format of the API Entity", () => {
      expect.assertions(1);

      const dto = defaultAzureSsoSettingsViewModelDto();
      const entity = new AzureSsoSettingsFormEntity(dto, { validate: false });

      const expectedDto = {
        provider: AzureSsoSettingsEntity.PROVIDER_ID,
        data: dto,
      };

      expect(entity.toEntityDto()).toStrictEqual(expectedDto);
    });
  });

  describe("::fromEntityDto", () => {
    it("should create from an API entity DTO", () => {
      expect.assertions(2);

      const apiDto = azureSsoSettingsEntityDtoFromApi();
      const entity = AzureSsoSettingsFormEntity.fromEntityDto(apiDto);

      expect(entity).toBeInstanceOf(AzureSsoSettingsFormEntity);
      expect(entity._props.client_id).toStrictEqual(apiDto.data.client_id);
    });
  });

  describe("::createDefault", () => {
    it("should create a default entity from provider config", () => {
      expect.assertions(2);

      const defaultConfig = {
        url: "https://login.microsoftonline.com",
        client_id: "",
        client_secret: "",
        tenant_id: "",
        client_secret_expiry: "",
        prompt: "login",
        email_claim: "email",
        login_hint: true,
      };

      const entity = AzureSsoSettingsFormEntity.createDefault(defaultConfig);
      expect(entity).toBeInstanceOf(AzureSsoSettingsFormEntity);
      expect(entity._props.url).toStrictEqual("https://login.microsoftonline.com");
    });
  });

  describe("::set", () => {
    it("should mutate the entity in place", () => {
      expect.assertions(1);

      const entity = new AzureSsoSettingsFormEntity(defaultAzureSsoSettingsViewModelDto(), { validate: false });

      entity.set("client_secret", "new-secret", { validate: false });
      expect(entity._props.client_secret).toStrictEqual("new-secret");
    });
  });

  describe("::hasDiffProps", () => {
    it("should detect differences between two entities", () => {
      expect.assertions(2);

      const dto = defaultAzureSsoSettingsViewModelDto();
      const entityA = new AzureSsoSettingsFormEntity(dto, { validate: false });
      const entityB = new AzureSsoSettingsFormEntity(dto, { validate: false });

      expect(entityA.hasDiffProps(entityB)).toStrictEqual(false);

      entityB.set("client_secret", "different-secret", { validate: false });
      expect(entityA.hasDiffProps(entityB)).toStrictEqual(true);
    });
  });

  describe("::validate", () => {
    each(["url", "client_id", "tenant_id", "client_secret", "client_secret_expiry", "email_claim", "prompt"]).describe(
      "should validate the required field",
      (requiredField) => {
        it(`for: ${requiredField}`, () => {
          expect.assertions(2);

          const dto = defaultAzureSsoSettingsViewModelDto();
          delete dto[requiredField];
          const entity = new AzureSsoSettingsFormEntity(dto, { validate: false });

          const validationErrors = entity.validate();
          expect(validationErrors).not.toBeNull();
          expect(validationErrors.hasErrors(requiredField)).toStrictEqual(true);
        });
      },
    );

    each([
      {
        dto: {
          url: null,
          client_id: null,
          tenant_id: null,
          client_secret: null,
          client_secret_expiry: null,
          email_claim: null,
          prompt: null,
          login_hint: null,
        },
        expectedErrors: {
          url: { type: "The url is not a valid string." },
          client_id: { type: "The client_id is not a valid string." },
          tenant_id: { type: "The tenant_id is not a valid string." },
          client_secret: { type: "The client_secret is not a valid string." },
          client_secret_expiry: { type: "The client_secret_expiry is not a valid string." },
          email_claim: { type: "The email_claim is not a valid string." },
          prompt: { type: "The prompt is not a valid string." },
          login_hint: { type: "The login_hint is not a valid boolean." },
        },
      },
      {
        dto: {
          url: 42,
          client_id: 42,
          tenant_id: {},
          client_secret: 42,
          email_claim: false,
          prompt: true,
        },
        expectedErrors: {
          url: { type: "The url is not a valid string." },
          client_id: { type: "The client_id is not a valid string." },
          tenant_id: { type: "The tenant_id is not a valid string." },
          client_secret: { type: "The client_secret is not a valid string." },
          email_claim: { type: "The email_claim is not a valid string." },
          prompt: { type: "The prompt is not a valid string." },
        },
      },
      {
        dto: {
          url: "not a URL",
          client_id: "not a uuid",
          tenant_id: "not a uuid",
          client_secret: "",
          client_secret_expiry: "",
          email_claim: "test",
          prompt: "test",
        },
        expectedErrors: {
          client_id: { format: "The client_id is not a valid uuid." },
          tenant_id: { format: "The tenant_id is not a valid uuid." },
          client_secret: { minLength: "The client_secret should be 1 character in length minimum." },
          email_claim: { enum: "The email_claim value is not included in the supported list." },
          prompt: { enum: "The prompt value is not included in the supported list." },
        },
      },
    ]).describe("should validate the current data set", (scenario) => {
      it(`for: ${JSON.stringify(scenario.dto)}`, () => {
        const expectedErroneousField = Object.keys(scenario.expectedErrors);
        const expectedErroneousFieldCount = expectedErroneousField.length;
        expect.assertions(expectedErroneousFieldCount);

        const entity = new AzureSsoSettingsFormEntity(scenario.dto, { validate: false });
        const validationErrors = entity.validate();

        for (let i = 0; i < expectedErroneousFieldCount; i++) {
          const erroneousField = expectedErroneousField[i];
          const errors = validationErrors.getError(erroneousField);
          expect(errors).toStrictEqual(scenario.expectedErrors[erroneousField]);
        }
      });
    });

    it("should return null when data is valid", () => {
      expect.assertions(1);

      const dto = defaultAzureSsoSettingsViewModelDto();
      const entity = new AzureSsoSettingsFormEntity(dto, { validate: false });

      expect(entity.validate().hasErrors()).toStrictEqual(false);
    });
  });
});
