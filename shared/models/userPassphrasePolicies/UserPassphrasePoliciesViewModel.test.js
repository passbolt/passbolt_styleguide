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
 * @since         4.3.0
 */
import each from "jest-each";
import {
  defaultUserPassphrasePoliciesEntityDto,
  defaultUserPassphrasePoliciesViewModelDto,
  userPassphrasePoliciesEntityDtoFromApi,
} from "./UserPassphrasePoliciesDto.test.data";
import UserPassphrasePoliciesViewModel from "./UserPassphrasePoliciesViewModel";

describe("UserPassphrasePoliciesViewModel", () => {
  describe("::constructor", () => {
    it("should construct a ViewModel", () => {
      expect.assertions(2);

      const viewModelDto = defaultUserPassphrasePoliciesViewModelDto();
      const viewModel = new UserPassphrasePoliciesViewModel(viewModelDto);

      expect(viewModel.entropy_minimum).toStrictEqual(viewModelDto.entropy_minimum);
      expect(viewModel.external_dictionary_check).toStrictEqual(viewModelDto.external_dictionary_check);
    });

    it("should construct a default ViewModel with empty settings", () => {
      expect.assertions(3);

      expect(() => new UserPassphrasePoliciesViewModel()).not.toThrow();
      expect(() => new UserPassphrasePoliciesViewModel(null)).not.toThrow();
      expect(() => new UserPassphrasePoliciesViewModel({})).not.toThrow();
    });
  });

  describe("::fromEntityDto", () => {
    it("should build a ViewModel from a dto having the same structure of the corresponding API entity", () => {
      expect.assertions(2);

      const entityDto = userPassphrasePoliciesEntityDtoFromApi();
      const viewModel = UserPassphrasePoliciesViewModel.fromEntityDto(entityDto);

      expect(viewModel.external_dictionary_check).toStrictEqual(entityDto.external_dictionary_check);
      expect(viewModel.entropy_minimum).toStrictEqual(entityDto.entropy_minimum);
    });

    it("should build a valid ViewModel when no data is provided", () => {
      expect.assertions(2);

      const viewModel = UserPassphrasePoliciesViewModel.fromEntityDto(null);

      expect(viewModel.external_dictionary_check).toStrictEqual(false);
      expect(viewModel.entropy_minimum).toStrictEqual(50);
    });
  });

  describe("::isDataDifferent", () => {
    each([
      { entropy_minimum: 150 },
      { external_dictionary_check: false },
      { external_dictionary_check: false, entropy_minimum: 200 },
    ]).describe("should return true if at least 1 difference is found between 2 ViewModel", (scenario) => {
      it(`for: ${JSON.stringify(scenario)}`, () => {
        expect.assertions(1);

        const viewModelA = new UserPassphrasePoliciesViewModel(defaultUserPassphrasePoliciesViewModelDto());
        const viewModelB = new UserPassphrasePoliciesViewModel(defaultUserPassphrasePoliciesViewModelDto(scenario));

        expect(UserPassphrasePoliciesViewModel.isDataDifferent(viewModelA, viewModelB)).toStrictEqual(true);
      });
    });

    it("should return false if no difference is found between 2 ViewModel", () => {
      expect.assertions(1);

      const viewModelA = new UserPassphrasePoliciesViewModel(defaultUserPassphrasePoliciesViewModelDto());
      const viewModelB = new UserPassphrasePoliciesViewModel(defaultUserPassphrasePoliciesViewModelDto());

      expect(UserPassphrasePoliciesViewModel.isDataDifferent(viewModelA, viewModelB)).toStrictEqual(false);
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO with the same format of the API Entity", () => {
      expect.assertions(1);

      //entity dto with full data from API
      const viewModel = UserPassphrasePoliciesViewModel.fromEntityDto(userPassphrasePoliciesEntityDtoFromApi());

      //entity dto without ids and creation dates from API
      const expectedDto = defaultUserPassphrasePoliciesEntityDto();
      const exportedDto = viewModel.toEntityDto();

      expect(exportedDto).toStrictEqual(expectedDto);
    });
  });

  describe("::cloneWithMutation", () => {
    it("should instantiante another entity with the new data", () => {
      expect.assertions(3);
      const viewModel = new UserPassphrasePoliciesViewModel();

      const otherViewModel = viewModel.cloneWithMutation("entropy_minimum", 200);

      expect(viewModel === otherViewModel).toStrictEqual(false);
      expect(otherViewModel.entropy_minimum).not.toStrictEqual(viewModel.entropy_minimum);
      expect(otherViewModel.toEntityDto()).not.toStrictEqual(viewModel.toEntityDto());
    });

    it("should instantiante another entity even if data is actually unchanged", () => {
      expect.assertions(1);
      const viewModel = new UserPassphrasePoliciesViewModel();

      const otherViewModel = viewModel.cloneWithMutation("entropy_minimum", viewModel.entropy_minimum);
      expect(viewModel === otherViewModel).toStrictEqual(false);
    });
  });

  describe("::validate", () => {
    each(["entropy_minimum", "external_dictionary_check"]).describe(
      "should validates the required field",
      (requiredField) => {
        it(`for: ${requiredField}`, () => {
          expect.assertions(2);
          const viewModel = new UserPassphrasePoliciesViewModel();
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
          entropy_minimum: "string",
          external_dictionary_check: "string",
        },
        expectedErrors: {
          entropy_minimum: { type: "The entropy_minimum is not a valid integer." },
          external_dictionary_check: { type: "The external_dictionary_check is not a valid boolean." },
        },
      },
      {
        dto: {
          entropy_minimum: 30,
        },
        expectedErrors: {
          entropy_minimum: { minimum: "The entropy_minimum should be greater or equal to 50." },
        },
      },
      {
        dto: {
          entropy_minimum: 250,
        },
        expectedErrors: {
          entropy_minimum: { maximum: "The entropy_minimum should be lesser or equal to 224." },
        },
      },
    ]).describe("should validate the current data set", (scenario) => {
      it(`for: ${JSON.stringify(scenario.dto)}`, () => {
        const expectedErroneousField = Object.keys(scenario.expectedErrors);
        const expectedErroneousFieldCount = expectedErroneousField.length;
        expect.assertions(expectedErroneousFieldCount);

        const viewModel = new UserPassphrasePoliciesViewModel(scenario.dto);
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
