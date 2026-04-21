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
 * @since         4.4.0
 */
import each from "jest-each";
import {
  defaultPasswordExpirySettingsViewModelDto,
  passwordExpirySettingsEntityDtoFromApi,
  defaultPasswordExpirySettingsEntityDto,
} from "./PasswordExpirySettingsDto.test.data";
import PasswordExpirySettingsViewModel from "./PasswordExpirySettingsViewModel";

describe("PasswordExpirySettingsViewModel", () => {
  describe("::constructor", () => {
    it("should construct a ViewModel", () => {
      expect.assertions(4);

      const viewModelDto = defaultPasswordExpirySettingsViewModelDto();
      const viewModel = new PasswordExpirySettingsViewModel(viewModelDto);

      expect(viewModel.automatic_expiry).toStrictEqual(viewModelDto.automatic_expiry);
      expect(viewModel.automatic_update).toStrictEqual(viewModelDto.automatic_update);
      expect(viewModel.default_expiry_period).toStrictEqual(viewModelDto.default_expiry_period);
      expect(viewModel.policy_override).toStrictEqual(viewModelDto.policy_override);
    });

    it("should construct a default ViewModel with empty settings", () => {
      expect.assertions(3);

      expect(() => new PasswordExpirySettingsViewModel()).not.toThrow();
      expect(() => new PasswordExpirySettingsViewModel(null)).not.toThrow();
      expect(() => new PasswordExpirySettingsViewModel({})).not.toThrow();
    });
  });

  describe("::fromEntityDto", () => {
    it("should build a ViewModel from a dto having the same structure of the corresponding API entity", () => {
      expect.assertions(2);

      const entityDto = passwordExpirySettingsEntityDtoFromApi();
      const viewModel = PasswordExpirySettingsViewModel.fromEntityDto(entityDto);

      expect(viewModel.external_dictionary_check).toStrictEqual(entityDto.external_dictionary_check);
      expect(viewModel.entropy_minimum).toStrictEqual(entityDto.entropy_minimum);
    });

    it("should build a valid ViewModel when no data is provided", () => {
      expect.assertions(4);

      const viewModel = PasswordExpirySettingsViewModel.fromEntityDto(null);

      expect(viewModel.automatic_expiry).toStrictEqual(false);
      expect(viewModel.automatic_update).toStrictEqual(false);
      expect(viewModel.default_expiry_period).toStrictEqual(null);
      expect(viewModel.policy_override).toStrictEqual(false);
    });
  });

  describe("::isDataDifferent", () => {
    each([
      { automatic_update: false },
      { policy_override: true },
      { automatic_expiry: false },
      { default_expiry_period: 60 },
    ]).describe("should return true if at least 1 difference is found between 2 ViewModel", (scenario) => {
      it(`for: ${JSON.stringify(scenario)}`, () => {
        expect.assertions(1);

        const viewModelA = new PasswordExpirySettingsViewModel(defaultPasswordExpirySettingsViewModelDto());
        const viewModelB = new PasswordExpirySettingsViewModel(defaultPasswordExpirySettingsViewModelDto(scenario));

        expect(PasswordExpirySettingsViewModel.isDataDifferent(viewModelA, viewModelB)).toStrictEqual(true);
      });
    });

    it("should return false if no difference is found between 2 ViewModel", () => {
      expect.assertions(1);

      const viewModelA = new PasswordExpirySettingsViewModel(defaultPasswordExpirySettingsViewModelDto());
      const viewModelB = new PasswordExpirySettingsViewModel(defaultPasswordExpirySettingsViewModelDto());

      expect(PasswordExpirySettingsViewModel.isDataDifferent(viewModelA, viewModelB)).toStrictEqual(false);
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO with the same format of the API Entity", () => {
      expect.assertions(1);

      //entity dto with full data from API
      const viewModel = PasswordExpirySettingsViewModel.fromEntityDto(passwordExpirySettingsEntityDtoFromApi());

      //entity dto without ids and creation dates from API
      const expectedDto = defaultPasswordExpirySettingsEntityDto();
      const exportedDto = viewModel.toEntityDto();

      expect(exportedDto).toStrictEqual(expectedDto);
    });
  });

  describe("::cloneWithMutation", () => {
    it("should instantiante another entity with the new data", () => {
      expect.assertions(3);
      const viewModel = new PasswordExpirySettingsViewModel();

      const otherViewModel = viewModel.cloneWithMutation("automatic_update", true);

      expect(viewModel === otherViewModel).toStrictEqual(false);
      expect(otherViewModel.automatic_update).not.toStrictEqual(viewModel.automatic_update);
      expect(otherViewModel.toEntityDto()).not.toStrictEqual(viewModel.toEntityDto());
    });

    it("should instantiante another entity even if data is actually unchanged", () => {
      expect.assertions(1);
      const viewModel = new PasswordExpirySettingsViewModel();

      const otherViewModel = viewModel.cloneWithMutation("entropy_minimum", viewModel.entropy_minimum);
      expect(viewModel === otherViewModel).toStrictEqual(false);
    });
  });

  describe("::validate", () => {
    each(["automatic_expiry", "automatic_update"]).describe("should validates the required field", (requiredField) => {
      it(`for: ${requiredField}`, () => {
        expect.assertions(2);
        const viewModel = new PasswordExpirySettingsViewModel();
        delete viewModel[requiredField];

        const validationErrors = viewModel.validate();
        expect(validationErrors.hasErrors(requiredField)).toStrictEqual(true);
        expect(validationErrors.getError(requiredField, "required")).toBeTruthy();
      });
    });

    each([
      {
        dto: { id: 50 },
        expectedErrors: { id: { type: "The id is not a valid string." } },
      },
      {
        dto: { automatic_expiry: 50 },
        expectedErrors: { automatic_expiry: { type: "The automatic_expiry is not a valid boolean." } },
      },
      {
        dto: { automatic_update: 50 },
        expectedErrors: { automatic_update: { type: "The automatic_update is not a valid boolean." } },
      },
      {
        dto: { policy_override: 50 },
        expectedErrors: { policy_override: { type: "The policy_override is not a valid boolean." } },
      },
      {
        dto: { default_expiry_period: -1 },
        expectedErrors: { default_expiry_period: { type: "The default_expiry_period is not a valid null." } },
      },
    ]).describe("should validate the current data set with PasswordExpirySettingsEntity", (scenario) => {
      it(`for: ${JSON.stringify(scenario.dto)}`, () => {
        const expectedErroneousField = Object.keys(scenario.expectedErrors);
        const expectedErroneousFieldCount = expectedErroneousField.length;
        expect.assertions(expectedErroneousFieldCount);

        const viewModel = new PasswordExpirySettingsViewModel();
        const field = Object.keys(scenario.dto)[0];
        viewModel[field] = scenario.dto[scenario.dto];
        const validationErrors = viewModel.validate();

        for (let i = 0; i < expectedErroneousFieldCount; i++) {
          const erroneousField = expectedErroneousField[i];
          const errors = validationErrors.getError(erroneousField);
          expect(errors).toStrictEqual(scenario.expectedErrors[erroneousField]);
        }
      });
    });

    each([
      {
        dto: { id: 50 },
        expectedErrors: { id: { type: "The id is not a valid string." } },
      },
      {
        dto: { automatic_expiry: 50 },
        expectedErrors: { automatic_expiry: { type: "The automatic_expiry is not a valid boolean." } },
      },
      {
        dto: { automatic_update: 50 },
        expectedErrors: { automatic_update: { type: "The automatic_update is not a valid boolean." } },
      },
      {
        dto: { policy_override: 50 },
        expectedErrors: { policy_override: { type: "The policy_override is not a valid boolean." } },
      },
      {
        dto: { default_expiry_period: -1 },
        expectedErrors: { default_expiry_period: { type: "The default_expiry_period is not a valid integer." } },
      },
    ]).describe("should validate the current data set with PasswordExpiryProSettingsEntity", (scenario) => {
      it(`for: ${JSON.stringify(scenario.dto)}`, () => {
        const expectedErroneousField = Object.keys(scenario.expectedErrors);
        const expectedErroneousFieldCount = expectedErroneousField.length;
        expect.assertions(expectedErroneousFieldCount);

        const viewModel = new PasswordExpirySettingsViewModel();
        const field = Object.keys(scenario.dto)[0];
        viewModel[field] = scenario.dto[scenario.dto];
        const validationErrors = viewModel.validate(true);

        for (let i = 0; i < expectedErroneousFieldCount; i++) {
          const erroneousField = expectedErroneousField[i];
          const errors = validationErrors.getError(erroneousField);
          expect(errors).toStrictEqual(scenario.expectedErrors[erroneousField]);
        }
      });
    });
  });
});
