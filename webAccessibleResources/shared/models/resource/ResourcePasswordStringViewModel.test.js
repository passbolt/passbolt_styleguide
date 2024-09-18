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
import ResourcePasswordStringViewModel from "./ResourcePasswordStringViewModel";
import {v4 as uuid} from "uuid";
import {defaultResourceViewModelDto, minimalResourceViewModelDto} from "./resourceViewModel.test.data";

describe("ResourcePasswordStringViewModel", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourcePasswordStringViewModel.name, ResourcePasswordStringViewModel.getSchema());
    });
  });

  describe("::resourceTypeSlug", () => {
    it("should return the right slug", () => {
      expect.assertions(1);

      expect(ResourcePasswordStringViewModel.resourceTypeSlug).toStrictEqual("password-string");
    });
  });

  describe("::canToggleDescription", () => {
    it("should return true", () => {
      expect.assertions(1);

      const viewModel = new ResourcePasswordStringViewModel();

      expect(viewModel.canToggleDescription()).toStrictEqual(true);
    });
  });

  describe("::isDescriptionUnencrypted", () => {
    it("should return true", () => {
      expect.assertions(1);
      const viewModel = new ResourcePasswordStringViewModel();
      expect(viewModel.isDescriptionUnencrypted()).toStrictEqual(true);
    });
  });

  describe("::toResourceDto", () => {
    it("should return a DTO in the expected format and without unknown fields", () => {
      expect.assertions(8);
      const dto = defaultResourceViewModelDto();
      const viewModel = new ResourcePasswordStringViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.metadata.name).toStrictEqual(dto.name);
      expect(resultDto.metadata.uris).toStrictEqual([dto.uri]);
      expect(resultDto.metadata.username).toStrictEqual(dto.username);
      expect(resultDto.metadata.description).toStrictEqual(dto.description);
      expect(resultDto.metadata.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(resultDto.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(resultDto.folder_parent_id).toBeNull();
      expect(resultDto.expired).toBeUndefined();
    });

    it("should return a DTO with the folder_parent_id and expired fields", () => {
      expect.assertions(2);
      const dto = defaultResourceViewModelDto({
        folder_parent_id: uuid(),
        expired: "2024-09-16T15:09:11.579Z",
      });
      const viewModel = new ResourcePasswordStringViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.folder_parent_id).toStrictEqual(dto.folder_parent_id);
      expect(resultDto.expired).toStrictEqual(dto.expired);
    });

    it("should return the default values if none provided", () => {
      expect.assertions(5);
      const dto = minimalResourceViewModelDto();
      const viewModel = new ResourcePasswordStringViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.metadata.uris).toStrictEqual([]);
      expect(resultDto.metadata.username).toStrictEqual("");
      expect(resultDto.metadata.description).toStrictEqual("");
      expect(resultDto.folder_parent_id).toBeNull();
      expect(resultDto.expired).toBeUndefined();
    });
  });

  describe("::toSecretDto", () => {
    it("should return the password as a pure string", () => {
      expect.assertions(1);
      const expectedPassword = "this is the expected password";
      const viewModel = new ResourcePasswordStringViewModel({password: expectedPassword});
      expect(viewModel.toSecretDto()).toStrictEqual(expectedPassword);
    });
  });

  describe("::validate", () => {
    it("should validate the data if everything is correct", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const viewModel = new ResourcePasswordStringViewModel(dto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(false);
    });

    it("should return a validation error for each invalid field", () => {
      expect.assertions(6);
      const dto = minimalResourceViewModelDto({
        name: 42,
        uri: 42,
        username: 42,
        password: 42,
        description: 42,
        resource_type_id: 42,
        folder_parent_id: 42,
        expired: 42,
      });
      const viewModel = new ResourcePasswordStringViewModel(dto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(true);
      expect(validationErrors.hasError("name", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("uri", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("username", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("password", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("description", "type")).toStrictEqual(true);
    });
  });

  describe(":validateField", () => {
    it("should validate the field if it is correct", () => {
      const dto = defaultResourceViewModelDto();
      const fields = Object.keys(dto);
      expect.assertions(fields.length);

      const viewModel = new ResourcePasswordStringViewModel(dto);
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
        resource_type_id: 42,
        folder_parent_id: 42,
        expired: 42,
      });
      const fields = Object.keys(dto);
      expect.assertions(fields.length);

      const viewModel = new ResourcePasswordStringViewModel(dto);
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const validationErrors = viewModel.validateField(field);
        expect(validationErrors.hasErrors(field, "type")).toStrictEqual(true);
      }
    });
  });
});
