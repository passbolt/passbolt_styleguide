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
import { defaultAdfsSsoSettingsViewModelDto } from "../../ssoSettings/SsoSettingsViewModel.test.data";
import AdfsSsoSettingsFormEntity from "./AdfsSsoSettingsFormEntity";
import AdfsSsoSettingsEntity from "./AdfsSsoSettingsEntity";

describe("AdfsSsoSettingsFormEntity", () => {
  describe("::constructor", () => {
    it("should construct a FormEntity with validate: false", () => {
      expect.assertions(2);

      const dto = defaultAdfsSsoSettingsViewModelDto();
      const entity = new AdfsSsoSettingsFormEntity(dto, { validate: false });

      expect(entity.client_id).toStrictEqual(dto.client_id);
      expect(entity.client_secret).toStrictEqual(dto.client_secret);
    });
  });

  describe("::provider", () => {
    it("should return the adfs provider id", () => {
      expect.assertions(1);
      const entity = new AdfsSsoSettingsFormEntity(defaultAdfsSsoSettingsViewModelDto(), { validate: false });
      expect(entity.provider).toStrictEqual(AdfsSsoSettingsEntity.PROVIDER_ID);
    });
  });

  describe("::toFormDto", () => {
    it("should return a DTO suitable for form binding", () => {
      expect.assertions(1);
      const dto = defaultAdfsSsoSettingsViewModelDto();
      const entity = new AdfsSsoSettingsFormEntity(dto, { validate: false });
      const formDto = entity.toFormDto();

      expect(formDto).toStrictEqual({
        id: undefined,
        provider: AdfsSsoSettingsEntity.PROVIDER_ID,
        url: dto.url,
        openid_configuration_path: dto.openid_configuration_path,
        scope: dto.scope,
        client_id: dto.client_id,
        client_secret: dto.client_secret,
      });
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO with the same format of the API Entity", () => {
      expect.assertions(1);

      const dto = defaultAdfsSsoSettingsViewModelDto();
      const entity = new AdfsSsoSettingsFormEntity(dto, { validate: false });

      const expectedDto = {
        provider: AdfsSsoSettingsEntity.PROVIDER_ID,
        data: dto,
      };

      expect(entity.toEntityDto()).toStrictEqual(expectedDto);
    });
  });

  describe("::fromEntityDto", () => {
    it("should create from an API entity DTO", () => {
      expect.assertions(2);
      const dto = defaultAdfsSsoSettingsViewModelDto();
      const settings = { id: "some-uuid", provider: "adfs", data: dto };
      const entity = AdfsSsoSettingsFormEntity.fromEntityDto(settings);

      expect(entity).toBeInstanceOf(AdfsSsoSettingsFormEntity);
      expect(entity.client_id).toStrictEqual(dto.client_id);
    });
  });

  describe("::createDefault", () => {
    it("should create a default entity from provider config", () => {
      expect.assertions(1);
      const entity = AdfsSsoSettingsFormEntity.createDefault({ url: "https://adfs.example.com" });
      expect(entity).toBeInstanceOf(AdfsSsoSettingsFormEntity);
    });
  });

  describe("::hasDiffProps", () => {
    it("should detect differences between two entities", () => {
      expect.assertions(2);

      const dto = defaultAdfsSsoSettingsViewModelDto();
      const entityA = new AdfsSsoSettingsFormEntity(dto, { validate: false });
      const entityB = new AdfsSsoSettingsFormEntity(dto, { validate: false });

      expect(entityA.hasDiffProps(entityB)).toStrictEqual(false);

      entityB.set("client_secret", "different-secret", { validate: false });
      expect(entityA.hasDiffProps(entityB)).toStrictEqual(true);
    });
  });

  describe("::validate", () => {
    each(["client_id", "client_secret"]).describe("should validate the required field", (requiredField) => {
      it(`for: ${requiredField}`, () => {
        expect.assertions(2);
        const dto = defaultAdfsSsoSettingsViewModelDto();
        delete dto[requiredField];
        const entity = new AdfsSsoSettingsFormEntity(dto, { validate: false });

        const validationErrors = entity.validate();
        expect(validationErrors.hasErrors(requiredField)).toStrictEqual(true);
        expect(validationErrors.getError(requiredField, "required")).toBeTruthy();
      });
    });

    each([
      {
        dto: {
          url: 42,
          openid_configuration_path: 42,
          scope: 42,
          client_id: null,
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
    ]).describe("should validate the current data set", (scenario) => {
      it(`for: ${JSON.stringify(scenario.dto)}`, () => {
        const expectedErroneousField = Object.keys(scenario.expectedErrors);
        const expectedErroneousFieldCount = expectedErroneousField.length;
        expect.assertions(expectedErroneousFieldCount);

        const entity = new AdfsSsoSettingsFormEntity(scenario.dto, { validate: false });
        const validationErrors = entity.validate();

        for (let i = 0; i < expectedErroneousFieldCount; i++) {
          const erroneousField = expectedErroneousField[i];
          const errors = validationErrors.getError(erroneousField);
          expect(errors).toStrictEqual(scenario.expectedErrors[erroneousField]);
        }
      });
    });

    it("should return no errors when data is valid", () => {
      expect.assertions(1);

      const dto = defaultAdfsSsoSettingsViewModelDto();
      const entity = new AdfsSsoSettingsFormEntity(dto, { validate: false });

      expect(entity.validate().hasErrors()).toStrictEqual(false);
    });
  });
});
