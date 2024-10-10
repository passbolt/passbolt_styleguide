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
 * @since         4.10.0
 */
import ResourcePasswordDescriptionTotpViewModel from "./ResourcePasswordDescriptionTotpViewModel";
import ResourcePasswordDescriptionViewModel from "./ResourcePasswordDescriptionViewModel";
import ResourcePasswordStringViewModel from "./ResourcePasswordStringViewModel";
import {
  defaultResourcePasswordDescriptionTotpViewModelDto,
  defaultResourceViewModelDto
} from "./resourceViewModel.test.data";
import ResourceTypeEntity from "../entity/resourceType/resourceTypeEntity";
import {
  resourceTypePasswordAndDescriptionDto, resourceTypePasswordDescriptionTotpDto,
  resourceTypePasswordStringDto, resourceTypeV5DefaultDto, resourceTypeV5DefaultTotpDto
} from "../entity/resourceType/resourceTypeEntity.test.data";
import ResourceV5DefaultViewModel from "./ResourceV5DefaultViewModel";
import ResourceV5DefaultTotpViewModel from "./ResourceV5DefaultTotpViewModel";
import ResourceViewModelFactory from "./ResourceViewModelFactory";

describe("ResourceViewModelFactory", () => {
  describe("::createFromResourceType", () => {
    it("should create a new ResourcePasswordDescriptionViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceType(resourceType, dto);
      expect(resourceViewModel instanceof ResourcePasswordDescriptionViewModel).toBeTruthy();
    });

    it("should create a new ResourcePasswordStringViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypePasswordStringDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceType(resourceType, dto);
      expect(resourceViewModel instanceof ResourcePasswordStringViewModel).toBeTruthy();
    });

    it("should create a new ResourcePasswordDescriptionTotpViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypePasswordDescriptionTotpDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceType(resourceType, dto);
      expect(resourceViewModel instanceof ResourcePasswordDescriptionTotpViewModel).toBeTruthy();
    });

    it("should create a new ResourceV5DefaultViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceType(resourceType, dto);
      expect(resourceViewModel instanceof ResourceV5DefaultViewModel).toBeTruthy();
    });

    it("should create a new ResourceV5DefaultTotpViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultTotpDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceType(resourceType, dto);
      expect(resourceViewModel instanceof ResourceV5DefaultTotpViewModel).toBeTruthy();
    });

    it("should throw an error if no view model has been found", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultDto());
      resourceType._props.slug = "test";
      expect(() => ResourceViewModelFactory.createFromResourceType(resourceType, dto)).toThrowError(new Error("No ViewModel has been found for the resource type."));
    });
  });
});
