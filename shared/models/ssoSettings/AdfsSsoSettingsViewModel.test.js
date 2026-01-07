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
 * @since         4.6.0
 */
import each from "jest-each";
import {
  defaultGoogleSsoSettingsViewModelDto,
  defaultAdfsSsoSettingsViewModelDto,
} from "./SsoSettingsViewModel.test.data";
import AdfsSsoSettingsViewModel from "./AdfsSsoSettingsViewModel";
import AdfsSsoSettingsEntity from "../entity/ssoSettings/AdfsSsoSettingsEntity";
import GoogleSsoSettingsViewModel from "./GoogleSsoSettingsViewModel";

describe("AdfsSsoSettingsViewModel", () => {
  describe("::constructor", () => {
    it("should construct a ViewModel", () => {
      expect.assertions(2);

      const viewModelDto = defaultAdfsSsoSettingsViewModelDto();
      const viewModel = new AdfsSsoSettingsViewModel(viewModelDto);

      expect(viewModel.client_id).toStrictEqual(viewModelDto.client_id);
      expect(viewModel.client_secret).toStrictEqual(viewModelDto.client_secret);
    });

    it("should construct a default ViewModel with empty settings", () => {
      expect.assertions(3);

      expect(() => new AdfsSsoSettingsViewModel()).not.toThrow();
      expect(() => new AdfsSsoSettingsViewModel(null)).not.toThrow();
      expect(() => new AdfsSsoSettingsViewModel({})).not.toThrow();
    });
  });

  describe("::isDataDifferent", () => {
    each([
      { url: "https://openid.passbolt.com/test" },
      { client_id: "client-id" },
      { client_secret: "this is a secret" },
      { openid_configuration_path: "/.not-very-well-known/openid-configuration" },
      { scope: "openid" },
    ]).describe("should return true if at least 1 difference is found between 2 ViewModel", (scenario) => {
      it(`for: ${JSON.stringify(scenario)}`, () => {
        expect.assertions(1);

        const viewModelA = new AdfsSsoSettingsViewModel(defaultAdfsSsoSettingsViewModelDto());
        const viewModelB = new AdfsSsoSettingsViewModel(defaultAdfsSsoSettingsViewModelDto(scenario));

        expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(true);
      });
    });

    it("should return false if no difference is found between 2 ViewModel", () => {
      expect.assertions(1);

      const dto = defaultAdfsSsoSettingsViewModelDto();

      const viewModelA = new AdfsSsoSettingsViewModel(dto);
      const viewModelB = new AdfsSsoSettingsViewModel(dto);

      expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(false);
    });

    it("should return true if the type of the compared ViewModel is not matching the expected one", () => {
      expect.assertions(1);

      const viewModelA = new AdfsSsoSettingsViewModel(defaultAdfsSsoSettingsViewModelDto());
      const viewModelB = new GoogleSsoSettingsViewModel(defaultGoogleSsoSettingsViewModelDto());

      expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(true);
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO with the same format of the API Entity", () => {
      expect.assertions(1);

      const defaultViewModel = defaultAdfsSsoSettingsViewModelDto();

      //entity dto with full data
      const viewModel = new AdfsSsoSettingsViewModel(defaultViewModel);

      //entity dto without ids and creation dates from API
      const expectedDto = {
        provider: AdfsSsoSettingsEntity.PROVIDER_ID,
        data: defaultViewModel,
      };
      const exportedDto = viewModel.toEntityDto();

      expect(exportedDto).toStrictEqual(expectedDto);
    });
  });

  describe("::cloneWithMutation", () => {
    it("should instantiante another entity with the new data", () => {
      expect.assertions(3);
      const viewModel = new AdfsSsoSettingsViewModel();

      const otherViewModel = viewModel.cloneWithMutation("client_secret", "secret");

      expect(viewModel === otherViewModel).toStrictEqual(false);
      expect(otherViewModel.client_secret).not.toStrictEqual(viewModel.client_secret);
      expect(otherViewModel.toEntityDto()).not.toStrictEqual(viewModel.toEntityDto());
    });

    it("should instantiante another entity even if data is actually unchanged", () => {
      expect.assertions(1);
      const viewModel = new AdfsSsoSettingsViewModel();

      const otherViewModel = viewModel.cloneWithMutation("client_secret", "");
      expect(viewModel === otherViewModel).toStrictEqual(false);
    });
  });

  describe("::validate", () => {
    each(["client_id", "client_secret"]).describe("should validates the required field", (requiredField) => {
      it(`for: ${requiredField}`, () => {
        expect.assertions(2);
        const viewModel = new AdfsSsoSettingsViewModel();
        delete viewModel[requiredField];

        const validationErrors = viewModel.validate();
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

        const viewModel = new AdfsSsoSettingsViewModel(scenario.dto);
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
