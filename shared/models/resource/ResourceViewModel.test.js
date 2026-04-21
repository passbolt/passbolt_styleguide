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
 * @since         4.9.4
 */
import ResourcePasswordDescriptionTotpViewModel from "./ResourcePasswordDescriptionTotpViewModel";
import ResourcePasswordDescriptionViewModel from "./ResourcePasswordDescriptionViewModel";
import ResourcePasswordStringViewModel from "./ResourcePasswordStringViewModel";
import ResourceViewModel from "./ResourceViewModel";

describe("ResourceViewModel", () => {
  describe("::createFromEntity", () => {
    it("should throw an error if used from the abstract class", () => {
      expect.assertions(1);
      expect(() => ResourceViewModel.createFromEntity()).toThrowError(
        new Error("The ViewModel class should declare how to create a ResourceViewModel from a resource entity."),
      );
    });
  });

  describe("::getSchema", () => {
    it("should throw an error if used from the abstract class", () => {
      expect.assertions(1);
      expect(() => ResourceViewModel.getSchema()).toThrowError(
        new Error("The ViewModel class should declare its schema."),
      );
    });
  });

  describe("::resourceTypeSlug", () => {
    it("should throw an error if used from the abstract class", () => {
      expect.assertions(1);
      expect(() => ResourceViewModel.resourceTypeSlug).toThrowError(
        new Error("The ViewModel class should declare its resource type slug."),
      );
    });
  });

  describe("::updateSecret", () => {
    it("should throw an error if used from the abstract class", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.updateSecret()).toThrowError(
        new Error("The ViewModel class should declare how to update its secret fields."),
      );
    });
  });

  describe("::canToggleDescription", () => {
    it("should throw an error if used from the abstract class", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.canToggleDescription()).toThrowError(
        new Error("The ViewModel class should declare if description can be toggled."),
      );
    });
  });

  describe("::isDescriptionUnencrypted", () => {
    it("should throw an error as it is using an abstract method", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.isDescriptionUnencrypted()).toThrowError(
        new Error("The ViewModel class should declare if description is unencrypted."),
      );
    });
  });

  describe("::toResourceDto", () => {
    it("should throw an error as it is using an abstract method", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.toResourceDto()).toThrowError(
        new Error("The ViewModel class should declare how to export to a resource dto."),
      );
    });
  });

  describe("::toSecretDto", () => {
    it("should throw an error as it is using an abstract method", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.toSecretDto()).toThrowError(
        new Error("The ViewModel class should declare how to export to a secret dto."),
      );
    });
  });

  describe("::cloneWithMutation", () => {
    it("should create another viewModel of the same type but with the value updated for: ResourcePasswordStringViewModel", () => {
      expect.assertions(2);
      const expectedValue = "new name";
      const viewModel = new ResourcePasswordStringViewModel();
      const viewModelUpdated = viewModel.cloneWithMutation("name", expectedValue);

      expect(viewModelUpdated.name).toStrictEqual(expectedValue);
      expect(viewModelUpdated).not.toBe(viewModel);
    });

    it("should create another viewModel of the same type but with the value updated for: ResourcePasswordDescriptionViewModel", () => {
      expect.assertions(2);
      const expectedValue = "new name";
      const viewModel = new ResourcePasswordDescriptionViewModel();
      const viewModelUpdated = viewModel.cloneWithMutation("name", expectedValue);

      expect(viewModelUpdated.name).toStrictEqual(expectedValue);
      expect(viewModelUpdated).not.toBe(viewModel);
    });

    it("should create another viewModel of the same type but with the value updated for: ResourcePasswordDescriptionTotpViewModel", () => {
      expect.assertions(2);
      const expectedValue = "new name";
      const viewModel = new ResourcePasswordDescriptionTotpViewModel();
      const viewModelUpdated = viewModel.cloneWithMutation("name", expectedValue);

      expect(viewModelUpdated.name).toStrictEqual(expectedValue);
      expect(viewModelUpdated).not.toBe(viewModel);
    });

    it("should create another viewModel of the same type but not set a value from an unknown field", () => {
      expect.assertions(2);
      const newValue = "new name";
      const viewModel = new ResourcePasswordStringViewModel();
      const viewModelUpdated = viewModel.cloneWithMutation("unknown-field", newValue);

      expect(viewModelUpdated["unknown-field"]).not.toBe(newValue);
      expect(viewModelUpdated).toStrictEqual(viewModel);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should throw an error as it is using an abstract method", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.areSecretsDifferent()).toThrowError(
        new Error("The ViewModel class should declare how to compare secrets."),
      );
    });
  });
});
