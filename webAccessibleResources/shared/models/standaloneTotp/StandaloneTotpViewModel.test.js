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
import StandaloneTotpViewModel from "./StandaloneTotpViewModel";
import {defaultStandaloneTotpViewModelDto} from "./StandaloneTotpDto.test.data";


describe("StandaloneTotpViewModel", () => {
  describe("constructor", () => {
    it("should construct a ViewModel", () => {
      expect.assertions(6);

      const viewModelDto = defaultStandaloneTotpViewModelDto();
      const viewModel = new StandaloneTotpViewModel(viewModelDto);

      expect(viewModel.name).toStrictEqual(viewModelDto.name);
      expect(viewModel.uri).toStrictEqual(viewModelDto.uri);
      expect(viewModel.secret_key).toStrictEqual(viewModelDto.secret_key);
      expect(viewModel.period).toStrictEqual(viewModelDto.period);
      expect(viewModel.digits).toStrictEqual(viewModelDto.digits);
      expect(viewModel.algorithm).toStrictEqual(viewModelDto.algorithm);
    });

    it("should construct a default ViewModel with empty settings", () => {
      expect.assertions(7);

      const viewModel = new StandaloneTotpViewModel();

      expect(() => new StandaloneTotpViewModel({})).not.toThrow();
      expect(viewModel.name).toStrictEqual("");
      expect(viewModel.uri).toStrictEqual("");
      expect(viewModel.secret_key).toStrictEqual("");
      expect(viewModel.period).toStrictEqual(30);
      expect(viewModel.digits).toStrictEqual(6);
      expect(viewModel.algorithm).toStrictEqual(StandaloneTotpViewModel.SUPPORTED_ALGORITHMS[0]);
    });

    it("should construct a ViewModel from url", () => {
      expect.assertions(7);
      const url = new URL('otpauth://totp/pro.passbolt.local:admin@passbolt.com?issuer=pro.passbolt.local&secret=OFL3VF3OU4BZP45D4ZME6KTF654JRSSO4Q2EO6FJFGPKHRHYSVJA');
      const viewModel = StandaloneTotpViewModel.createStandaloneTotpFromUrl(url);

      expect(() => new StandaloneTotpViewModel({})).not.toThrow();
      expect(viewModel.name).toStrictEqual(url.pathname.substring(7).split(":").join(": "));
      expect(viewModel.uri).toStrictEqual(url.searchParams.get('issuer'));
      expect(viewModel.secret_key).toStrictEqual(url.searchParams.get('secret'));
      expect(viewModel.period).toStrictEqual(30);
      expect(viewModel.digits).toStrictEqual(6);
      expect(viewModel.algorithm).toStrictEqual(StandaloneTotpViewModel.SUPPORTED_ALGORITHMS[0]);
    });
  });

  describe("::toEntityDto", () => {
    it("should export the current data as DTO", () => {
      expect.assertions(2);

      const viewModelDto = defaultStandaloneTotpViewModelDto();
      //entity dto with full data
      const viewModel = new StandaloneTotpViewModel(viewModelDto);

      //expected dto
      const expectedResourceDto = {
        name: viewModelDto.name,
        uri: viewModelDto.uri
      };
      const expectedSecretDto = {
        totp: {
          secret_key: viewModelDto.secret_key,
          period: viewModelDto.period,
          digits: viewModelDto.digits,
          algorithm: viewModelDto.algorithm
        }
      };

      const resourceDto = viewModel.toResourceDto();
      const secretDto = viewModel.toSecretDto();

      expect(resourceDto).toStrictEqual(expectedResourceDto);
      expect(secretDto).toStrictEqual(expectedSecretDto);
    });
  });

  describe("::validate", () => {
    it("should validates the required field", () => {
      expect.assertions(8);
      const viewModel = new StandaloneTotpViewModel();
      viewModel.period = "";
      viewModel.digits = "";

      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors("name")).toStrictEqual(true);
      expect(validationErrors.hasErrors("secret_key")).toStrictEqual(true);
      expect(validationErrors.hasErrors("digits")).toStrictEqual(true);
      expect(validationErrors.hasErrors("period")).toStrictEqual(true);
      expect(validationErrors.getError("name", "notEmpty")).toBeTruthy();
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

        const viewModel = new StandaloneTotpViewModel(scenario.dto);
        const validationErrors = viewModel.validate();

        for (let i = 0; i < expectedErroneousFieldCount; i++) {
          const erroneousField = expectedErroneousField[i];
          const errors = validationErrors.getError(erroneousField);
          expect(errors).toStrictEqual(scenario.expectedErrors[erroneousField]);
        }
      });
    });

    it("should not construct a ViewModel from url if it is not valid", () => {
      expect.assertions(1);
      const url = new URL('otpauth://totp/pro.passbolt.local:admin@passbolt.com?issuer=pro.passbolt.local&secret=OFL3VF3OU4BZP45D4ZME6KTF654ùJRSSO4Q2EO6FJFGPKHRHYSVJA');
      try {
        StandaloneTotpViewModel.createStandaloneTotpFromUrl(url);
      } catch (error) {
        expect(error.message).toStrictEqual("Could not validate entity StandaloneTotpViewModel.");
      }
    });
  });
});
