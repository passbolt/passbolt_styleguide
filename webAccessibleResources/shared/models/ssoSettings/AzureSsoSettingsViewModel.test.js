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
 * @since         4.5.0
 */
import each from "jest-each";
import {
  defaultAzureSsoSettingsViewModelDto,
  defaultGoogleSsoSettingsViewModelDto,
} from "./SsoSettingsViewModel.test.data";
import AzureSsoSettingsViewModel from "./AzureSsoSettingsViewModel";
import AzureSsoSettingsEntity from "../entity/ssoSettings/AzureSsoSettingsEntity";
import GoogleSsoSettingsViewModel from "./GoogleSsoSettingsViewModel";

describe("AzureSsoSettingsViewModel", () => {
  describe("::constructor", () => {
    it("should construct a ViewModel", () => {
      expect.assertions(7);

      const viewModelDto = defaultAzureSsoSettingsViewModelDto();
      const viewModel = new AzureSsoSettingsViewModel(viewModelDto);

      expect(viewModel.url).toStrictEqual(viewModelDto.url);
      expect(viewModel.client_id).toStrictEqual(viewModelDto.client_id);
      expect(viewModel.tenant_id).toStrictEqual(viewModelDto.tenant_id);
      expect(viewModel.client_secret).toStrictEqual(viewModelDto.client_secret);
      expect(viewModel.client_secret_expiry).toStrictEqual(viewModelDto.client_secret_expiry.substring(0, 10));
      expect(viewModel.email_claim).toStrictEqual(viewModelDto.email_claim);
      expect(viewModel.prompt).toStrictEqual(viewModelDto.prompt);
    });

    it("should construct a default ViewModel with empty settings", () => {
      expect.assertions(3);

      expect(() => new AzureSsoSettingsViewModel()).not.toThrow();
      expect(() => new AzureSsoSettingsViewModel(null)).not.toThrow();
      expect(() => new AzureSsoSettingsViewModel({})).not.toThrow();
    });
  });

  describe("::isDataDifferent", () => {
    each([
      { url: "https://test.passbolt.com" },
      { client_id: "client-id" },
      { tenant_id: "tenant_id" },
      { client_secret: "this is a secret" },
      { client_secret_expiry: "2023-12-12" },
      { email_claim: "upn" },
      { prompt: "none" },
    ]).describe("should return true if at least 1 difference is found between 2 ViewModel", (scenario) => {
      it(`for: ${JSON.stringify(scenario)}`, () => {
        expect.assertions(1);

        const viewModelA = new AzureSsoSettingsViewModel(defaultAzureSsoSettingsViewModelDto());
        const viewModelB = new AzureSsoSettingsViewModel(defaultAzureSsoSettingsViewModelDto(scenario));

        expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(true);
      });
    });

    it("should return false if no difference is found between 2 ViewModel", () => {
      expect.assertions(1);

      const dto = defaultAzureSsoSettingsViewModelDto();

      const viewModelA = new AzureSsoSettingsViewModel(dto);
      const viewModelB = new AzureSsoSettingsViewModel(dto);

      expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(false);
    });

    it("should return true if the type of the compared ViewModel is not matching the expected one", () => {
      expect.assertions(1);

      const viewModelA = new AzureSsoSettingsViewModel(defaultAzureSsoSettingsViewModelDto());
      const viewModelB = new GoogleSsoSettingsViewModel(defaultGoogleSsoSettingsViewModelDto());

      expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(true);
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO with the same format of the API Entity", () => {
      expect.assertions(1);

      const defaultViewModel = defaultAzureSsoSettingsViewModelDto();

      //entity dto with full data
      const viewModel = new AzureSsoSettingsViewModel(defaultViewModel);

      //entity dto without ids and creation dates from API
      const expectedDto = {
        provider: AzureSsoSettingsEntity.PROVIDER_ID,
        data: defaultViewModel,
      };

      const exportedDto = viewModel.toEntityDto();

      expect(exportedDto).toStrictEqual(expectedDto);
    });
  });

  describe("::cloneWithMutation", () => {
    it("should instantiante another entity with the new data", () => {
      expect.assertions(3);
      const viewModel = new AzureSsoSettingsViewModel();

      const otherViewModel = viewModel.cloneWithMutation("client_secret", "secret");

      expect(viewModel === otherViewModel).toStrictEqual(false);
      expect(otherViewModel.client_secret).not.toStrictEqual(viewModel.client_secret);
      expect(otherViewModel.toEntityDto()).not.toStrictEqual(viewModel.toEntityDto());
    });

    it("should instantiante another entity even if data is actually unchanged", () => {
      expect.assertions(1);
      const viewModel = new AzureSsoSettingsViewModel();

      const otherViewModel = viewModel.cloneWithMutation("client_secret", "");
      expect(viewModel === otherViewModel).toStrictEqual(false);
    });
  });

  describe("::validate", () => {
    each(["url", "client_id", "tenant_id", "client_secret", "client_secret_expiry", "email_claim", "prompt"]).describe(
      "should validates the required field",
      (requiredField) => {
        it(`for: ${requiredField}`, () => {
          expect.assertions(2);
          const viewModel = new AzureSsoSettingsViewModel();
          delete viewModel[requiredField];

          const validationErrors = viewModel.validate();
          expect(validationErrors.hasErrors(requiredField)).toStrictEqual(true);
          expect(validationErrors.getError(requiredField, "required")).toBeTruthy();
        });
      },
    );

    each([
      {
        dto: {
          url: 42,
          client_id: null,
          tenant_id: {},
          client_secret: 42,
          client_secret_expiry: 42,
          email_claim: false,
          prompt: true,
        },
        expectedErrors: {
          url: { type: "The url is not a valid string." },
          client_id: { type: "The client_id is not a valid string." },
          tenant_id: { type: "The tenant_id is not a valid string." },
          client_secret: { type: "The client_secret is not a valid string." },
          client_secret_expiry: { format: "The client_secret_expiry is not a valid date-time." },
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
          client_secret_expiry: "this is not a date",
          email_claim: "test",
          prompt: "test",
        },
        expectedErrors: {
          url: { pattern: "The url is not valid." },
          client_id: { format: "The client_id is not a valid uuid." },
          tenant_id: { format: "The tenant_id is not a valid uuid." },
          client_secret: { minLength: "The client_secret should be 1 character in length minimum." },
          client_secret_expiry: { format: "The client_secret_expiry is not a valid date-time." },
          email_claim: { enum: "The email_claim value is not included in the supported list." },
          prompt: { enum: "The prompt value is not included in the supported list." },
        },
      },
    ]).describe("should validate the current data set", (scenario) => {
      it(`for: ${JSON.stringify(scenario.dto)}`, () => {
        const expectedErroneousField = Object.keys(scenario.expectedErrors);
        const expectedErroneousFieldCount = expectedErroneousField.length;
        expect.assertions(expectedErroneousFieldCount);

        const viewModel = new AzureSsoSettingsViewModel(scenario.dto);
        const validationErrors = viewModel.validate();

        for (let i = 0; i < expectedErroneousFieldCount; i++) {
          const erroneousField = expectedErroneousField[i];
          const errors = validationErrors.getError(erroneousField);
          expect(errors).toStrictEqual(scenario.expectedErrors[erroneousField]);
        }
      });
    });
  });
});
