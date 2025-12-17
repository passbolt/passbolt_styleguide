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

import EntitySchema from "../entity/abstract/entitySchema";
import ResourceV5PasswordStringViewModel from "./ResourceV5PasswordStringViewModel";
import { v4 as uuid } from "uuid";
import { defaultResourceViewModelDto, minimalResourceViewModelDto } from "./resourceViewModel.test.data";
import { defaultResourceDto } from "../entity/resource/resourceEntity.test.data";
import { TEST_RESOURCE_TYPE_V5_PASSWORD_STRING } from "../entity/resourceType/resourceTypeEntity.test.data";
import { DateTime } from "luxon";
import ResourceViewModel from "./ResourceViewModel";

describe("ResourceV5PasswordStringViewModel", () => {
  describe("::createFromEntity", () => {
    it("should create the right resourceViewModel given an entity", () => {
      expect.assertions(11);
      const resourceDto = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
        expired: DateTime.now().toISO(),
        folder_parent_id: uuid(),
      });

      const resourceViewModel = ResourceV5PasswordStringViewModel.createFromEntity(resourceDto);
      expect(resourceViewModel).toBeInstanceOf(ResourceV5PasswordStringViewModel);
      expect(resourceViewModel.id).toStrictEqual(resourceDto.id);
      expect(resourceViewModel.resource_type_id).toStrictEqual(TEST_RESOURCE_TYPE_V5_PASSWORD_STRING);
      expect(resourceViewModel.name).toStrictEqual(resourceDto.metadata.name);
      expect(resourceViewModel.uri).toStrictEqual(resourceDto.metadata.uris[0]);
      expect(resourceViewModel.username).toStrictEqual(resourceDto.metadata.username);
      expect(resourceViewModel.password).toBeUndefined();
      expect(resourceViewModel.description).toStrictEqual(resourceDto.metadata.description);
      expect(resourceViewModel.totp).toBeUndefined();
      expect(resourceViewModel.folder_parent_id).toStrictEqual(resourceDto.folder_parent_id);
      expect(resourceViewModel.expired).toStrictEqual(resourceDto.expired);
    });
  });

  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(
        ResourceV5PasswordStringViewModel.name,
        ResourceV5PasswordStringViewModel.getSchema(),
      );
    });

    it("schema not have 'id' field set as required in CREATE_MODE", () => {
      expect.assertions(1);

      const schema = ResourceV5PasswordStringViewModel.getSchema(ResourceViewModel.CREATE_MODE);

      expect(schema.required).not.toContain("id");
    });

    it("schema have 'id' field set as required in EDIT_MODE", () => {
      expect.assertions(1);

      const schema = ResourceV5PasswordStringViewModel.getSchema(ResourceViewModel.EDIT_MODE);

      expect(schema.required).toContain("id");
    });
  });

  describe("::resourceTypeSlug", () => {
    it("should return the right slug", () => {
      expect.assertions(1);

      expect(ResourceV5PasswordStringViewModel.resourceTypeSlug).toStrictEqual("v5-password-string");
    });
  });

  describe("::updateSecret", () => {
    it("should update the fields to encrypt", () => {
      expect.assertions(4);

      const dto = defaultResourceViewModelDto();
      const viewModel = new ResourceV5PasswordStringViewModel(dto);

      const secretDto = {
        password: "another password",
      };

      const newViewModel = viewModel.updateSecret(secretDto);

      expect(newViewModel).not.toBe(viewModel);
      expect(newViewModel.password).toStrictEqual(secretDto.password);
      expect(newViewModel.description).toStrictEqual(dto.description);
      expect(newViewModel.totp).toBeUndefined();
    });
  });

  describe("::canToggleDescription", () => {
    it("should return true", () => {
      expect.assertions(1);

      const viewModel = new ResourceV5PasswordStringViewModel();

      expect(viewModel.canToggleDescription()).toStrictEqual(true);
    });
  });

  describe("::isDescriptionUnencrypted", () => {
    it("should return true", () => {
      expect.assertions(1);
      const viewModel = new ResourceV5PasswordStringViewModel();
      expect(viewModel.isDescriptionUnencrypted()).toStrictEqual(true);
    });
  });

  describe("::toResourceDto", () => {
    it("should return a DTO in the expected format and without unknown fields", () => {
      expect.assertions(9);
      const dto = defaultResourceViewModelDto();
      const viewModel = new ResourceV5PasswordStringViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.id).toBeUndefined();
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
      expect.assertions(9);
      const dto = defaultResourceViewModelDto({
        folder_parent_id: uuid(),
        expired: "2024-09-16T15:09:11.579Z",
      });
      const viewModel = new ResourceV5PasswordStringViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.id).toBeUndefined();
      expect(resultDto.metadata.name).toStrictEqual(dto.name);
      expect(resultDto.metadata.uris).toStrictEqual([dto.uri]);
      expect(resultDto.metadata.username).toStrictEqual(dto.username);
      expect(resultDto.metadata.description).toStrictEqual(dto.description);
      expect(resultDto.metadata.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(resultDto.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(resultDto.folder_parent_id).toStrictEqual(dto.folder_parent_id);
      expect(resultDto.expired).toStrictEqual(dto.expired);
    });

    it("should return the default values if none provided", () => {
      expect.assertions(5);
      const dto = minimalResourceViewModelDto();
      const viewModel = new ResourceV5PasswordStringViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.metadata.uris).toStrictEqual([]);
      expect(resultDto.metadata.username).toStrictEqual("");
      expect(resultDto.metadata.description).toStrictEqual("");
      expect(resultDto.folder_parent_id).toBeNull();
      expect(resultDto.expired).toBeUndefined();
    });

    it("should return a dto with an id if it is set", () => {
      expect.assertions(1);
      const dto = minimalResourceViewModelDto({ id: uuid() });
      const viewModel = new ResourceV5PasswordStringViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.id).toStrictEqual(dto.id);
    });
  });

  describe("::toSecretDto", () => {
    it("should return the password as a pure string", () => {
      expect.assertions(1);
      const expectedPassword = "this is the expected password";
      const viewModel = new ResourceV5PasswordStringViewModel({ password: expectedPassword });
      expect(viewModel.toSecretDto()).toStrictEqual(expectedPassword);
    });
  });

  describe("::validate", () => {
    it("should validate the data if everything is correct", () => {
      expect.assertions(1);
      const dto = defaultResourceViewModelDto();
      const viewModel = new ResourceV5PasswordStringViewModel(dto);
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
      const viewModel = new ResourceV5PasswordStringViewModel(dto);
      const validationErrors = viewModel.validate();
      expect(validationErrors.hasErrors()).toStrictEqual(true);
      expect(validationErrors.hasError("name", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("uri", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("username", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("password", "type")).toStrictEqual(true);
      expect(validationErrors.hasError("description", "type")).toStrictEqual(true);
    });
  });

  describe("::areSecretsDifferent", () => {
    it("should return true if the secrets are similar but the data structure is different (aka resource type is different)", () => {
      expect.assertions(1);
      const originalDto = {
        password: "a password",
        description: "",
      };
      const viewModel1 = new ResourceV5PasswordStringViewModel(originalDto);
      expect(viewModel1.areSecretsDifferent(originalDto)).toStrictEqual(true);
    });

    it("should return false if both secret have a similar structure and content", () => {
      expect.assertions(1);
      const originalDto = { password: "test" };
      const viewModel1 = new ResourceV5PasswordStringViewModel(originalDto);
      expect(viewModel1.areSecretsDifferent(originalDto)).toStrictEqual(false);
    });

    it("should return true if the data structure is the same but the secret is different", () => {
      expect.assertions(1);
      const originalDto = { password: "test" };
      const viewModel1 = new ResourceV5PasswordStringViewModel({ password: "something else" });
      expect(viewModel1.areSecretsDifferent(originalDto)).toStrictEqual(true);
    });
  });
});
