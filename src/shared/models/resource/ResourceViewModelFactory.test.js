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
  defaultResourceViewModelDto,
} from "./resourceViewModel.test.data";
import ResourceTypeEntity from "../entity/resourceType/resourceTypeEntity";
import {
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordDescriptionTotpDto,
  resourceTypePasswordStringDto,
  resourceTypeV5DefaultDto,
  resourceTypeV5DefaultTotpDto,
  resourceTypeV5PasswordStringDto,
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
} from "../entity/resourceType/resourceTypeEntity.test.data";
import ResourceV5DefaultViewModel from "./ResourceV5DefaultViewModel";
import ResourceV5DefaultTotpViewModel from "./ResourceV5DefaultTotpViewModel";
import ResourceViewModelFactory from "./ResourceViewModelFactory";
import { defaultResourceDto } from "../entity/resource/resourceEntity.test.data";
import { DateTime } from "luxon";
import { v4 as uuid } from "uuid";
import ResourceV5PasswordStringViewModel from "./ResourceV5PasswordStringViewModel";

describe("ResourceViewModelFactory", () => {
  describe("::createFromResourceType", () => {
    it("should create a new ResourcePasswordDescriptionViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(
        resourceType,
        dto,
      );
      expect(resourceViewModel instanceof ResourcePasswordDescriptionViewModel).toBeTruthy();
    });

    it("should create a new ResourcePasswordStringViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypePasswordStringDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(
        resourceType,
        dto,
      );
      expect(resourceViewModel instanceof ResourcePasswordStringViewModel).toBeTruthy();
    });

    it("should create a new ResourcePasswordDescriptionTotpViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypePasswordDescriptionTotpDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(
        resourceType,
        dto,
      );
      expect(resourceViewModel instanceof ResourcePasswordDescriptionTotpViewModel).toBeTruthy();
    });

    it("should create a new ResourceV5DefaultViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(
        resourceType,
        dto,
      );
      expect(resourceViewModel instanceof ResourceV5DefaultViewModel).toBeTruthy();
    });

    it("should create a new ResourceV5DefaultTotpViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultTotpDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(
        resourceType,
        dto,
      );
      expect(resourceViewModel instanceof ResourceV5DefaultTotpViewModel).toBeTruthy();
    });

    it("should create a new ResourceV5PasswordStringViewModel", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypeV5PasswordStringDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(
        resourceType,
        dto,
      );
      expect(resourceViewModel instanceof ResourceV5PasswordStringViewModel).toBeTruthy();
    });

    it("should throw an error if no view model has been found", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultDto());
      resourceType._props.slug = "test";
      expect(() =>
        ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(resourceType, dto),
      ).toThrowError(new Error("No ViewModel has been found for the resource type."));
    });
  });

  describe("::createFromResourceTypeFromEntity", () => {
    it("should create a new ResourcePasswordDescriptionViewModel from entity", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        expired: DateTime.now().toISO(),
        folder_parent_id: uuid(),
      });

      jest.spyOn(ResourcePasswordDescriptionViewModel, "createFromEntity");

      const resourceType = new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndEntityDto(resourceType, resourceDto);
      expect(resourceViewModel instanceof ResourcePasswordDescriptionViewModel).toBeTruthy();
      expect(ResourcePasswordDescriptionViewModel.createFromEntity).toHaveBeenCalledWith(resourceDto);
    });

    it("should create a new ResourcePasswordStringViewModel from entity", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        expired: DateTime.now().toISO(),
        folder_parent_id: uuid(),
      });

      jest.spyOn(ResourcePasswordStringViewModel, "createFromEntity");

      const resourceType = new ResourceTypeEntity(resourceTypePasswordStringDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndEntityDto(resourceType, resourceDto);
      expect(resourceViewModel instanceof ResourcePasswordStringViewModel).toBeTruthy();
      expect(ResourcePasswordStringViewModel.createFromEntity).toHaveBeenCalledWith(resourceDto);
    });

    it("should create a new ResourcePasswordDescriptionTotpViewModel from entity", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
        expired: DateTime.now().toISO(),
        folder_parent_id: uuid(),
      });

      jest.spyOn(ResourcePasswordDescriptionTotpViewModel, "createFromEntity");

      const resourceType = new ResourceTypeEntity(resourceTypePasswordDescriptionTotpDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndEntityDto(resourceType, resourceDto);
      expect(resourceViewModel instanceof ResourcePasswordDescriptionTotpViewModel).toBeTruthy();
      expect(ResourcePasswordDescriptionTotpViewModel.createFromEntity).toHaveBeenCalledWith(resourceDto);
    });

    it("should create a new ResourceV5DefaultViewModel from entity", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        expired: DateTime.now().toISO(),
        folder_parent_id: uuid(),
      });

      jest.spyOn(ResourceV5DefaultViewModel, "createFromEntity");

      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndEntityDto(resourceType, resourceDto);
      expect(resourceViewModel instanceof ResourceV5DefaultViewModel).toBeTruthy();
      expect(ResourceV5DefaultViewModel.createFromEntity).toHaveBeenCalledWith(resourceDto);
    });

    it("should create a new ResourceV5DefaultTotpViewModel from entity", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
        expired: DateTime.now().toISO(),
        folder_parent_id: uuid(),
      });

      jest.spyOn(ResourceV5DefaultTotpViewModel, "createFromEntity");

      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultTotpDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndEntityDto(resourceType, resourceDto);
      expect(resourceViewModel instanceof ResourceV5DefaultTotpViewModel).toBeTruthy();
      expect(ResourceV5DefaultTotpViewModel.createFromEntity).toHaveBeenCalledWith(resourceDto);
    });

    it("should create a new ResourceV5DefaultTotpViewModel from entity", () => {
      expect.assertions(2);
      const resourceDto = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
        expired: DateTime.now().toISO(),
        folder_parent_id: uuid(),
      });

      jest.spyOn(ResourceV5PasswordStringViewModel, "createFromEntity");

      const resourceType = new ResourceTypeEntity(resourceTypeV5PasswordStringDto());
      const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndEntityDto(resourceType, resourceDto);
      expect(resourceViewModel instanceof ResourceV5PasswordStringViewModel).toBeTruthy();
      expect(ResourceV5PasswordStringViewModel.createFromEntity).toHaveBeenCalledWith(resourceDto);
    });

    it("should throw an error if no view model has been found from entity", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const resourceType = new ResourceTypeEntity(resourceTypeV5DefaultDto());
      resourceType._props.slug = "test";
      expect(() => ResourceViewModelFactory.createFromResourceTypeAndEntityDto(resourceType, dto)).toThrowError(
        new Error("No ViewModel has been found for the resource type."),
      );
    });
  });
});
