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
import GoogleSsoSettingsViewModel from "./GoogleSsoSettingsViewModel";
import GoogleSsoSettingsEntity from "../entity/ssoSettings/GoogleSsoSettingsEntity";
import AzureSsoSettingsViewModel from "./AzureSsoSettingsViewModel";

describe("GoogleSsoSettingsViewModel", () => {
  describe("::constructor", () => {
    it("should construct a ViewModel", () => {
      expect.assertions(2);

      const viewModelDto = defaultGoogleSsoSettingsViewModelDto();
      const viewModel = new GoogleSsoSettingsViewModel(viewModelDto);

      expect(viewModel.client_id).toStrictEqual(viewModelDto.client_id);
      expect(viewModel.client_secret).toStrictEqual(viewModelDto.client_secret);
    });

    it("should construct a default ViewModel with empty settings", () => {
      expect.assertions(3);

      expect(() => new GoogleSsoSettingsViewModel()).not.toThrow();
      expect(() => new GoogleSsoSettingsViewModel(null)).not.toThrow();
      expect(() => new GoogleSsoSettingsViewModel({})).not.toThrow();
    });
  });

  describe("::isDataDifferent", () => {
    each([{ client_id: "client-id" }, { client_secret: "this is a secret" }]).describe(
      "should return true if at least 1 difference is found between 2 ViewModel",
      (scenario) => {
        it(`for: ${JSON.stringify(scenario)}`, () => {
          expect.assertions(1);

          const viewModelA = new GoogleSsoSettingsViewModel(defaultGoogleSsoSettingsViewModelDto());
          const viewModelB = new GoogleSsoSettingsViewModel(defaultGoogleSsoSettingsViewModelDto(scenario));

          expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(true);
        });
      },
    );

    it("should return false if no difference is found between 2 ViewModel", () => {
      expect.assertions(1);

      const dto = defaultGoogleSsoSettingsViewModelDto();

      const viewModelA = new GoogleSsoSettingsViewModel(dto);
      const viewModelB = new GoogleSsoSettingsViewModel(dto);

      expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(false);
    });

    it("should return true if the type of the compared ViewModel is not matching the expected one", () => {
      expect.assertions(1);

      const viewModelA = new GoogleSsoSettingsViewModel(defaultGoogleSsoSettingsViewModelDto());
      const viewModelB = new AzureSsoSettingsViewModel(defaultAzureSsoSettingsViewModelDto());

      expect(viewModelA.isDataDifferent(viewModelB)).toStrictEqual(true);
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO with the same format of the API Entity", () => {
      expect.assertions(1);

      const defaultViewModel = defaultGoogleSsoSettingsViewModelDto();

      //entity dto with full data
      const viewModel = new GoogleSsoSettingsViewModel(defaultViewModel);

      //entity dto without ids and creation dates from API
      const expectedDto = {
        provider: GoogleSsoSettingsEntity.PROVIDER_ID,
        data: defaultViewModel,
      };

      const exportedDto = viewModel.toEntityDto();

      expect(exportedDto).toStrictEqual(expectedDto);
    });
  });

  describe("::cloneWithMutation", () => {
    it("should instantiante another entity with the new data", () => {
      expect.assertions(3);
      const viewModel = new GoogleSsoSettingsViewModel();

      const otherViewModel = viewModel.cloneWithMutation("client_secret", "secret");

      expect(viewModel === otherViewModel).toStrictEqual(false);
      expect(otherViewModel.client_secret).not.toStrictEqual(viewModel.client_secret);
      expect(otherViewModel.toEntityDto()).not.toStrictEqual(viewModel.toEntityDto());
    });

    it("should instantiante another entity even if data is actually unchanged", () => {
      expect.assertions(1);
      const viewModel = new GoogleSsoSettingsViewModel();

      const otherViewModel = viewModel.cloneWithMutation("client_secret", "");
      expect(viewModel === otherViewModel).toStrictEqual(false);
    });
  });

  describe("::validate", () => {
    each(["client_id", "client_secret"]).describe("should validates the required field", (requiredField) => {
      it(`for: ${requiredField}`, () => {
        expect.assertions(2);
        const viewModel = new GoogleSsoSettingsViewModel();
        delete viewModel[requiredField];

        const validationErrors = viewModel.validate();
        expect(validationErrors.hasErrors(requiredField)).toStrictEqual(true);
        expect(validationErrors.getError(requiredField, "required")).toBeTruthy();
      });
    });

    each([
      {
        dto: {
          client_id: null,
          client_secret: 42,
        },
        expectedErrors: {
          client_id: { type: "The client_id is not a valid string." },
          client_secret: { type: "The client_secret is not a valid string." },
        },
      },
    ]).describe("should validate the current data set", (scenario) => {
      it(`for: ${JSON.stringify(scenario.dto)}`, () => {
        const expectedErroneousField = Object.keys(scenario.expectedErrors);
        const expectedErroneousFieldCount = expectedErroneousField.length;
        expect.assertions(expectedErroneousFieldCount);

        const viewModel = new GoogleSsoSettingsViewModel(scenario.dto);
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
