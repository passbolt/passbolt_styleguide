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

import EntitySchema from "../entity/abstract/entitySchema";
import {defaultTotpViewModelDto} from "../totp/TotpDto.test.data";
import ResourcePasswordDescriptionTotpViewModel from "./ResourcePasswordDescriptionTotpViewModel";
import {v4 as uuid} from "uuid";
import {defaultResourcePasswordDescriptionTotpViewModelDto, defaultResourceViewModelDto, minimalResourceViewModelDto} from "./resourceViewModel.test.data";
import {resourceTypesCollectionDto} from "../entity/resourceType/resourceTypesCollection.test.data";

describe("ResourcePasswordDescriptionTotpViewModel", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourcePasswordDescriptionTotpViewModel.name, ResourcePasswordDescriptionTotpViewModel.getSchema());
    });
  });

  describe("::resourceTypeSlug", () => {
    it("should return the right slug", () => {
      expect.assertions(1);

      expect(ResourcePasswordDescriptionTotpViewModel.resourceTypeSlug).toStrictEqual("password-description-totp");
    });
  });

  describe("::canToggleDescription", () => {
    it("should return false", () => {
      expect.assertions(1);

      const viewModel = new ResourcePasswordDescriptionTotpViewModel();

      expect(viewModel.canToggleDescription()).toStrictEqual(false);
    });
  });

  describe("::isDescriptionUnencrypted", () => {
    it("should return false", () => {
      expect.assertions(1);
      const viewModel = new ResourcePasswordDescriptionTotpViewModel();
      expect(viewModel.isDescriptionUnencrypted()).toStrictEqual(false);
    });
  });

  describe("::toResourceDto", () => {
    it("should return a DTO in the expected format and without unknown fields", () => {
      expect.assertions(8);
      const dto = defaultResourceViewModelDto();
      const viewModel = new ResourcePasswordDescriptionTotpViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.metadata.name).toStrictEqual(dto.name);
      expect(resultDto.metadata.uris).toStrictEqual([dto.uri]);
      expect(resultDto.metadata.username).toStrictEqual(dto.username);
      expect(resultDto.metadata.description).toBeUndefined();
      expect(resultDto.metadata.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(resultDto.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(resultDto.folder_parent_id).toBeNull();
      expect(resultDto.expired).toBeUndefined();
    });

    it("should return a DTO with the additional information provided", () => {
      expect.assertions(5);
      const dto = defaultResourceViewModelDto({
        folder_parent_id: uuid(),
        expired: "2024-09-16T15:09:11.579Z",
      });

      const viewModel = new ResourcePasswordDescriptionTotpViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.metadata.name).toStrictEqual(dto.name);
      expect(resultDto.metadata.uris).toStrictEqual([dto.uri]);
      expect(resultDto.metadata.username).toStrictEqual(dto.username);
      expect(resultDto.folder_parent_id).toStrictEqual(dto.folder_parent_id);
      expect(resultDto.expired).toStrictEqual(dto.expired);
    });

    it("should return the default values if none provided", () => {
      expect.assertions(2);
      const dto = minimalResourceViewModelDto();
      const viewModel = new ResourcePasswordDescriptionTotpViewModel(dto);
      const resultDto = viewModel.toResourceDto(resourceTypesCollectionDto());

      expect(resultDto.metadata.uris).toStrictEqual([]);
      expect(resultDto.metadata.username).toStrictEqual("");
    });
  });

  describe("::toSecretDto", () => {
    it("should return the secret in the right format", () => {
      expect.assertions(1);
      const resourceTypes = resourceTypesCollectionDto();
      const expectedTotp = defaultTotpViewModelDto({
        secret_key: "new totp key",
      });

      const expectedResourceType = resourceTypes.find(resourceType => resourceType.slug === "password-description-totp");
      const expectedSecret = {
        password: "this is the expected password",
        description: "The description",
        totp: expectedTotp,
        resource_type_id: expectedResourceType.id};

      const viewModel = new ResourcePasswordDescriptionTotpViewModel(expectedSecret);
      const secretDto = viewModel.toSecretDto(resourceTypesCollectionDto());
      expect(secretDto).toStrictEqual(expectedSecret);
    });
  });

  describe("::validate", () => {
    it("should validate the data if everything is correct", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const viewModel = new ResourcePasswordDescriptionTotpViewModel(dto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(false);
    });

    it("should return a validation error for each invalid field", () => {
      expect.assertions(7);
      const dto = minimalResourceViewModelDto({
        name: 42,
        uri: 42,
        username: 42,
        password: 42,
        description: 42,
        totp: 42,
        resource_type_id: 42,
        folder_parent_id: 42,
        expired: 42,
      });
      const viewModel = new ResourcePasswordDescriptionTotpViewModel(dto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(true);
      expect(validationErrors.hasError("name", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("uri", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("username", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("password", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("description", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("totp", "type")).toStrictEqual(true);
    });
  });

  describe(":validateField", () => {
    it("should validate the field if it is correct", () => {
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const fields = Object.keys(dto);
      expect.assertions(fields.length);

      const viewModel = new ResourcePasswordDescriptionTotpViewModel(dto);
      for (let i = 0; i < fields.length; i++) {
        const validationErrors = viewModel.validateField(fields[i]);
        expect(validationErrors.hasErrors()).toStrictEqual(false);
      }
    });

    it("should return a validation error for each invalid field", () => {
      expect.assertions(6);
      const dto = minimalResourceViewModelDto({
        name: 42,
        uri: 42,
        username: 42,
        password: 42,
        description: 42,
        totp: 42,
        resource_type_id: 42,
        folder_parent_id: 42,
        expired: 42,
      });
      const fields = Object.keys(dto);
      expect.assertions(fields.length);

      const viewModel = new ResourcePasswordDescriptionTotpViewModel(dto);
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const validationErrors = viewModel.validateField(field);
        expect(validationErrors.hasErrors(field, "type")).toStrictEqual(true);
      }
    });
  });
});
