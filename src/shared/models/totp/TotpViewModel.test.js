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
import {defaultTotpViewModelDto} from "./TotpDto.test.data";
import TotpViewModel from "./TotpViewModel";

describe("TotpViewModel", () => {
  describe("constructor", () => {
    it("should construct a ViewModel", () => {
      expect.assertions(4);

      const viewModelDto = defaultTotpViewModelDto();
      const viewModel = new TotpViewModel(viewModelDto);

      expect(viewModel.secret_key).toStrictEqual(viewModelDto.secret_key);
      expect(viewModel.period).toStrictEqual(viewModelDto.period);
      expect(viewModel.digits).toStrictEqual(viewModelDto.digits);
      expect(viewModel.algorithm).toStrictEqual(viewModelDto.algorithm);
    });

    it("should construct a default ViewModel with empty settings", () => {
      expect.assertions(5);

      const viewModel = new TotpViewModel();

      expect(() => new TotpViewModel({})).not.toThrow();
      expect(viewModel.secret_key).toStrictEqual("");
      expect(viewModel.period).toStrictEqual(30);
      expect(viewModel.digits).toStrictEqual(6);
      expect(viewModel.algorithm).toStrictEqual(TotpViewModel.SUPPORTED_ALGORITHMS[0]);
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO", () => {
      expect.assertions(1);

      const viewModelDto = defaultTotpViewModelDto();
      //entity dto with full data
      const viewModel = new TotpViewModel(viewModelDto);

      // expected dto
      const expectedDto = {
        totp: {...viewModelDto}
      };
      const exportedDto = viewModel.toSecretDto();

      expect(exportedDto).toStrictEqual(expectedDto);
    });
  });

  describe("::cloneWithMutation", () => {
    it("should instantiate another entity with the new data", () => {
      expect.assertions(3);
      const viewModel = new TotpViewModel();

      const otherViewModel = viewModel.cloneWithMutation("secret_key", "DAV3DS4ERAAF5QGH");

      expect(viewModel === otherViewModel).toStrictEqual(false);
      expect(otherViewModel.secret_key).not.toStrictEqual(viewModel.secret_key);
      expect(otherViewModel.toSecretDto()).not.toStrictEqual(viewModel.toSecretDto());
    });

    it("should instantiate another entity even if data is actually unchanged", () => {
      expect.assertions(1);
      const viewModel = new TotpViewModel();

      const otherViewModel = viewModel.cloneWithMutation("secret_key", viewModel.secret_key);
      expect(viewModel === otherViewModel).toStrictEqual(false);
    });
  });

  describe("::validate", () => {
    it("should validates the required field", () => {
      expect.assertions(6);
      const viewModel = new TotpViewModel();
      viewModel.period = "";
      viewModel.digits = "";

      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors("secret_key")).toStrictEqual(true);
      expect(validationErrors.hasErrors("digits")).toStrictEqual(true);
      expect(validationErrors.hasErrors("period")).toStrictEqual(true);
      expect(validationErrors.getError("secret_key", "notEmpty")).toBeTruthy();
      expect(validationErrors.getError("digits", "type")).toBeTruthy();
      expect(validationErrors.getError("period", "type")).toBeTruthy();
    });

    each([
      {
        dto: {
          secret_key: "???",
          digits: 9,
          period: 0
        },
        expectedErrors: {
          secret_key: {pattern: "The secret_key is not valid."},
          digits: {lte: "The digits should be lesser or equal to 8."},
          period: {gte: "The period should be greater or equal to 1."}
        }
      },
      {
        dto: {
          secret_key: "DAV3DS4ERAAF5QGH",
          digits: 5
        },
        expectedErrors: {
          digits: {gte: "The digits should be greater or equal to 6."},
        }
      },
    ]).describe("should validate the current data set", scenario => {
      it(`for: ${JSON.stringify(scenario.dto)}`, () => {
        const expectedErroneousField = Object.keys(scenario.expectedErrors);
        const expectedErroneousFieldCount = expectedErroneousField.length;
        expect.assertions(expectedErroneousFieldCount);

        const viewModel = new TotpViewModel(scenario.dto);
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
