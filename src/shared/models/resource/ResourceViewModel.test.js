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

import {resourceTypesCollectionDto} from "../entity/resourceType/resourceTypesCollection.test.data";
import {defaultTotpViewModelDto} from "../totp/TotpDto.test.data";
import ResourcePasswordDescriptionTotpViewModel from "./ResourcePasswordDescriptionTotpViewModel";
import ResourcePasswordDescriptionViewModel from "./ResourcePasswordDescriptionViewModel";
import ResourcePasswordStringViewModel from "./ResourcePasswordStringViewModel";
import ResourceViewModel from "./ResourceViewModel";
import {minimalResourceViewModelDto} from "./resourceViewModel.test.data";

describe("ResourceViewModel", () => {
  describe("::getSchema", () => {
    it("should throw an error if used from the abstract class", () => {
      expect.assertions(1);
      expect(() => ResourceViewModel.getSchema()).toThrowError(new Error("The ViewModel class should declare its schema."));
    });
  });

  describe("::resourceTypeSlug", () => {
    it("should throw an error if used from the abstract class", () => {
      expect.assertions(1);
      expect(() => ResourceViewModel.resourceTypeSlug).toThrowError(new Error("The ViewModel class should declare its resource type slug."));
    });
  });

  describe("::canToggleDescription", () => {
    it("should throw an error if used from the abstract class", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.canToggleDescription()).toThrowError(new Error("The ViewModel class should declare if description can be toggled."));
    });
  });

  describe("::isDescriptionUnencrypted", () => {
    it("should throw an error as it is using an abstract method", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.isDescriptionUnencrypted()).toThrowError(new Error("The ViewModel class should declare if description is unencrypted."));
    });
  });

  describe("::toResourceDto", () => {
    it("should throw an error as it is using an abstract method", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.toResourceDto()).toThrowError(new Error("The ViewModel class should declare how to export to a resource dto."));
    });
  });

  describe("::toSecretDto", () => {
    it("should throw an error as it is using an abstract method", () => {
      expect.assertions(1);
      const viewModel = new ResourceViewModel();
      expect(() => viewModel.toSecretDto()).toThrowError(new Error("The ViewModel class should declare how to export to a secret dto."));
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
    it("should return true if the resource type slugs are different", () => {
      expect.assertions(1);
      const viewModel1 = new ResourcePasswordDescriptionViewModel(minimalResourceViewModelDto());
      const viewModel2 = new ResourcePasswordStringViewModel(minimalResourceViewModelDto());
      expect(ResourceViewModel.areSecretsDifferent(viewModel1, viewModel2)).toStrictEqual(true);
    });

    it("should return false if both ViewModels have the same slug and the same secret for: ResourcePasswordStringViewModel", () => {
      expect.assertions(1);
      const data = {password: "test"};
      const viewModel1 = new ResourcePasswordStringViewModel(data);
      const viewModel2 = new ResourcePasswordStringViewModel(data);
      expect(ResourceViewModel.areSecretsDifferent(viewModel1, viewModel2, resourceTypesCollectionDto())).toStrictEqual(false);
    });

    it("should return false if both ViewModels have the same slug and the same secret for: ResourcePasswordDescriptionViewModel", () => {
      expect.assertions(1);
      const data = {password: "test", description: "here it goes"};
      const viewModel1 = new ResourcePasswordDescriptionViewModel(data);
      const viewModel2 = new ResourcePasswordDescriptionViewModel(data);
      expect(ResourceViewModel.areSecretsDifferent(viewModel1, viewModel2, resourceTypesCollectionDto())).toStrictEqual(false);
    });

    it("should return false if both ViewModels have the same slug and the same secret for: ResourcePasswordStringViewModel", () => {
      expect.assertions(1);
      const data = {password: "test", description: "here it goes", totp: defaultTotpViewModelDto()};
      const viewModel1 = new ResourcePasswordDescriptionTotpViewModel(data);
      const viewModel2 = new ResourcePasswordDescriptionTotpViewModel(data);
      expect(ResourceViewModel.areSecretsDifferent(viewModel1, viewModel2, resourceTypesCollectionDto())).toStrictEqual(false);
    });

    it("should return true if both ViewModels have the same slug but not the same secret for: ResourcePasswordStringViewModel", () => {
      expect.assertions(1);
      const viewModel1 = new ResourcePasswordStringViewModel({password: "test"});
      const viewModel2 = new ResourcePasswordStringViewModel({password: "test2"});
      expect(ResourceViewModel.areSecretsDifferent(viewModel1, viewModel2, resourceTypesCollectionDto())).toStrictEqual(true);
    });

    it("should return false if both ViewModels have the same slug and the same secret for: ResourcePasswordDescriptionViewModel", () => {
      expect.assertions(1);
      const viewModel1 = new ResourcePasswordDescriptionViewModel({password: "test", description: "here it goes"});
      const viewModel2 = new ResourcePasswordDescriptionViewModel({password: "test", description: "here it goes again"});
      expect(ResourceViewModel.areSecretsDifferent(viewModel1, viewModel2, resourceTypesCollectionDto())).toStrictEqual(true);
    });

    it("should return false if both ViewModels have the same slug and the same secret for: ResourcePasswordStringViewModel", () => {
      expect.assertions(1);
      const viewModel1 = new ResourcePasswordDescriptionTotpViewModel({password: "test", description: "here it goes", totp: defaultTotpViewModelDto()});
      const viewModel2 = new ResourcePasswordDescriptionTotpViewModel({password: "test", description: "here it goes", totp: defaultTotpViewModelDto({secret_key: "another-key"})});
      expect(ResourceViewModel.areSecretsDifferent(viewModel1, viewModel2, resourceTypesCollectionDto())).toStrictEqual(true);
    });
  });
});
