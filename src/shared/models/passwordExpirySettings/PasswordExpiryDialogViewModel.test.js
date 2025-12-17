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
import { overridenPasswordExpirySettingsEntityDto } from "./PasswordExpirySettingsDto.test.data";
import PasswordExpiryDialogViewModel, { PasswordExpiryOptionEnum } from "./PasswordExpiryDialogViewModel";
import { defaultPasswordExpiryDialogViewModelDto } from "./PasswordExpiryDialogViewModel.test.data";
import { defaultResourceDto } from "../entity/resource/resourceEntity.test.data";

describe("PasswordExpiryDialogViewModel", () => {
  describe("::constructor", () => {
    it("should construct a ViewModel", () => {
      expect.assertions(3);

      const viewModelDto = defaultPasswordExpiryDialogViewModelDto();
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);

      expect(viewModel.passwordExpiryDurationInDay).toStrictEqual(viewModelDto.passwordExpiryDurationInDay);
      expect(viewModel.passwordExpiryDate).toStrictEqual(viewModelDto.passwordExpiryDate);
      expect(viewModel.passwordExpiryOption).toStrictEqual(viewModelDto.passwordExpiryOption);
    });
  });

  describe("::fromEntityDto", () => {
    it("should build a ViewModel from a dto having the same structure of the corresponding API entity", () => {
      expect.assertions(3);

      jest.useFakeTimers().setSystemTime(new Date("2023-01-01T00:00:00.000Z"));

      const entityDto = overridenPasswordExpirySettingsEntityDto({
        default_expiry_period: 15,
      });
      const viewModel = PasswordExpiryDialogViewModel.fromEntityDto(entityDto);

      const expectedExpiryDate = "2023-01-16";

      expect(viewModel.passwordExpiryDurationInDay).toStrictEqual(entityDto.default_expiry_period);
      expect(viewModel.passwordExpiryDate).toStrictEqual(expectedExpiryDate);
      expect(viewModel.passwordExpiryOption).toStrictEqual(PasswordExpiryOptionEnum.AUTOMATIC);
    });

    it("should build a valid ViewModel when no data is provided", () => {
      expect.assertions(3);

      jest.useFakeTimers().setSystemTime(new Date("2023-01-01T00:00:00.000Z"));

      const viewModel = PasswordExpiryDialogViewModel.fromEntityDto(null);

      const expectedExpiryDate = "2023-04-01";

      expect(viewModel.passwordExpiryDurationInDay).toStrictEqual(90);
      expect(viewModel.passwordExpiryDate).toStrictEqual(expectedExpiryDate);
      expect(viewModel.passwordExpiryOption).toStrictEqual(PasswordExpiryOptionEnum.AUTOMATIC);
    });
  });

  it("::toDto", () => {
    expect.assertions(1);

    const viewModelDto = defaultPasswordExpiryDialogViewModelDto();
    const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);

    expect(viewModel.toDto()).toStrictEqual(viewModelDto);
  });

  describe("::getExpiryDateToApply", () => {
    it("should compute the right date when PasswordExpiryOptionEnum.AUTOMATIC is selected", () => {
      expect.assertions(1);

      jest.useFakeTimers().setSystemTime(new Date("2023-01-01T00:00:00.000Z"));

      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryOption: PasswordExpiryOptionEnum.AUTOMATIC,
        passwordExpiryDurationInDay: 10,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);

      expect(viewModel.getExpiryDateToApply()).toStrictEqual("2023-01-11T00:00:00.000Z");
    });

    it("should return the selected date when PasswordExpiryOptionEnum.MANUAL is selected", () => {
      expect.assertions(1);

      jest.useFakeTimers().setSystemTime(new Date("2023-01-01T00:00:00.000Z"));

      const passwordExpiryDate = "2023-12-12";
      const expectedDate = `${passwordExpiryDate}T00:00:00.000Z`;
      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryOption: PasswordExpiryOptionEnum.MANUAL,
        passwordExpiryDate: passwordExpiryDate,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);

      expect(viewModel.getExpiryDateToApply()).toStrictEqual(expectedDate);
    });

    it("should return null when PasswordExpiryOptionEnum.NEVER is provided", () => {
      expect.assertions(1);

      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryOption: PasswordExpiryOptionEnum.NEVER,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);

      expect(viewModel.getExpiryDateToApply()).toStrictEqual(null);
    });
  });

  describe("::mapResourcesToPasswordExpiryDto", () => {
    it("should map a resource list to a password expiry dto list with the right date when option is AUTOMATIC", () => {
      expect.assertions(2);

      jest.useFakeTimers().setSystemTime(new Date("2023-01-01T00:00:00.000Z"));

      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryOption: PasswordExpiryOptionEnum.AUTOMATIC,
        passwordExpiryDate: 30,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);

      const resources = [defaultResourceDto({ name: "res1" }), defaultResourceDto({ name: "res2" })];

      const resourcesMapped = viewModel.mapResourcesToPasswordExpiryDto(resources);
      const expectedExpiryDate = "2023-01-31T00:00:00.000Z";

      expect(resourcesMapped.length).toStrictEqual(resources.length);
      expect(resourcesMapped).toStrictEqual([
        { id: resources[0].id, expired: expectedExpiryDate },
        { id: resources[1].id, expired: expectedExpiryDate },
      ]);
    });

    it("should map a resource list to a password expiry dto list with the right date when option is MANUAL", () => {
      expect.assertions(2);

      jest.useFakeTimers().setSystemTime(new Date("2023-01-01T00:00:00.000Z"));

      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryOption: PasswordExpiryOptionEnum.MANUAL,
        passwordExpiryDate: "2023-01-15",
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);

      const resources = [defaultResourceDto({ name: "res1" }), defaultResourceDto({ name: "res2" })];

      const resourcesMapped = viewModel.mapResourcesToPasswordExpiryDto(resources);
      const expectedExpiryDate = "2023-01-15T00:00:00.000Z";

      expect(resourcesMapped.length).toStrictEqual(resources.length);
      expect(resourcesMapped).toStrictEqual([
        { id: resources[0].id, expired: expectedExpiryDate },
        { id: resources[1].id, expired: expectedExpiryDate },
      ]);
    });

    it("should map a resource list to a password expiry dto list with the right date when option is NEVER", () => {
      expect.assertions(2);

      jest.useFakeTimers().setSystemTime(new Date("2023-01-01T00:00:00.000Z"));

      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryOption: PasswordExpiryOptionEnum.NEVER,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);

      const resources = [defaultResourceDto({ name: "res1" }), defaultResourceDto({ name: "res2" })];

      const resourcesMapped = viewModel.mapResourcesToPasswordExpiryDto(resources);
      const expectedExpiryDate = null;

      expect(resourcesMapped.length).toStrictEqual(resources.length);
      expect(resourcesMapped).toStrictEqual([
        { id: resources[0].id, expired: expectedExpiryDate },
        { id: resources[1].id, expired: expectedExpiryDate },
      ]);
    });
  });

  describe("::validate", () => {
    it("should get no error if all the fields are valid", () => {
      expect.assertions(1);
      const viewModelDto = defaultPasswordExpiryDialogViewModelDto();
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(false);
    });

    it("should get no error if AUTOMATIC is set and MANUAL input is invalid", () => {
      expect.assertions(1);
      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryDate: null,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(false);
    });

    it("should get no error if MANUAL is set and AUTOMATIC input is invalid", () => {
      expect.assertions(1);
      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryDurationInDay: "",
        passwordExpiryOption: PasswordExpiryOptionEnum.MANUAL,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(false);
    });

    it("should get no error if NEVER is set and AUTOMATIC input and MANUAL input are invalid", () => {
      expect.assertions(1);
      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryDate: "",
        passwordExpiryDurationInDay: "",
        passwordExpiryOption: PasswordExpiryOptionEnum.NEVER,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(false);
    });

    it("should get error if MANUAL is set and has invalid input", () => {
      expect.assertions(2);
      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryDate: "",
        passwordExpiryOption: PasswordExpiryOptionEnum.MANUAL,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(true);
      expect(validationErrors.hasError("passwordExpiryDate")).toStrictEqual(true);
    });

    it("should get error if AUTOMATIC is set and has invalid input", () => {
      expect.assertions(2);
      const viewModelDto = defaultPasswordExpiryDialogViewModelDto({
        passwordExpiryDurationInDay: "",
        passwordExpiryOption: PasswordExpiryOptionEnum.AUTOMATIC,
      });
      const viewModel = new PasswordExpiryDialogViewModel(viewModelDto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(true);
      expect(validationErrors.hasError("passwordExpiryDurationInDay")).toStrictEqual(true);
    });
  });
});
