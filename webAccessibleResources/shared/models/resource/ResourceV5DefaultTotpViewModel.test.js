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
import ResourceV5DefaultTotpViewModel from "./ResourceV5DefaultTotpViewModel";
import {v4 as uuid} from "uuid";
import {defaultResourcePasswordDescriptionTotpViewModelDto, defaultResourceViewModelDto, minimalResourceViewModelDto} from "./resourceViewModel.test.data";
import {TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP} from "../entity/resourceType/resourceTypeEntity.test.data";
import {DateTime} from "luxon";
import {defaultResourceDto} from "../entity/resource/resourceEntity.test.data";
import ResourceViewModel from "./ResourceViewModel";

describe("ResourceV5DefaultTotpViewModel", () => {
  describe("::createFromEntity", () => {
    it("should create the right resourceViewModel given an entity", () => {
      expect.assertions(11);
      const resourceDto = defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
        expired: DateTime.now().toISO(),
        folder_parent_id: uuid(),
      });

      const resourceViewModel = ResourceV5DefaultTotpViewModel.createFromEntity(resourceDto);
      expect(resourceViewModel).toBeInstanceOf(ResourceV5DefaultTotpViewModel);
      expect(resourceViewModel.id).toStrictEqual(resourceDto.id);
      expect(resourceViewModel.resource_type_id).toStrictEqual(TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP);
      expect(resourceViewModel.name).toStrictEqual(resourceDto.metadata.name);
      expect(resourceViewModel.uri).toStrictEqual(resourceDto.metadata.uris[0]);
      expect(resourceViewModel.username).toStrictEqual(resourceDto.metadata.username);
      expect(resourceViewModel.password).toBeUndefined();
      expect(resourceViewModel.description).toStrictEqual("Description");
      expect(resourceViewModel.totp).toBeNull();
      expect(resourceViewModel.folder_parent_id).toStrictEqual(resourceDto.folder_parent_id);
      expect(resourceViewModel.expired).toStrictEqual(resourceDto.expired);
    });
  });

  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourceV5DefaultTotpViewModel.name, ResourceV5DefaultTotpViewModel.getSchema());
    });

    it("schema not have 'id' field set as required in CREATE_MODE", () => {
      expect.assertions(1);

      const schema = ResourceV5DefaultTotpViewModel.getSchema(ResourceViewModel.CREATE_MODE);

      expect(schema.required).not.toContain("id");
    });

    it("schema have 'id' field set as required in EDIT_MODE", () => {
      expect.assertions(1);

      const schema = ResourceV5DefaultTotpViewModel.getSchema(ResourceViewModel.EDIT_MODE);

      expect(schema.required).toContain("id");
    });
  });

  describe("::resourceTypeSlug", () => {
    it("should return the right slug", () => {
      expect.assertions(1);

      expect(ResourceV5DefaultTotpViewModel.resourceTypeSlug).toStrictEqual("v5-default-with-totp");
    });
  });

  describe("::updateSecret", () => {
    it("should update the fields to encrypt", () => {
      expect.assertions(4);

      const dto = defaultResourceViewModelDto();
      const viewModel = new ResourceV5DefaultTotpViewModel(dto);

      const secretDto = {
        password: "another password",
        description: "another description as well",
        totp: defaultTotpViewModelDto({
          secret_key: "a new totp secret key",
        })
      };

      const newViewModel = viewModel.updateSecret(secretDto);

      expect(newViewModel).not.toBe(viewModel);
      expect(newViewModel.password).toStrictEqual(secretDto.password);
      expect(newViewModel.description).toStrictEqual(secretDto.description);
      expect(newViewModel.totp).toStrictEqual(secretDto.totp);
    });
  });

  describe("::canToggleDescription", () => {
    it("should return false", () => {
      expect.assertions(1);

      const viewModel = new ResourceV5DefaultTotpViewModel();

      expect(viewModel.canToggleDescription()).toStrictEqual(false);
    });
  });

  describe("::isDescriptionUnencrypted", () => {
    it("should return false", () => {
      expect.assertions(1);
      const viewModel = new ResourceV5DefaultTotpViewModel();
      expect(viewModel.isDescriptionUnencrypted()).toStrictEqual(false);
    });
  });

  describe("::toResourceDto", () => {
    it("should return a DTO in the expected format and without unknown fields", () => {
      expect.assertions(9);
      const dto = defaultResourceViewModelDto();
      const viewModel = new ResourceV5DefaultTotpViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.id).toBeUndefined();
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
      expect.assertions(9);
      const dto = defaultResourceViewModelDto({
        folder_parent_id: uuid(),
        expired: "2024-09-16T15:09:11.579Z",
      });

      const viewModel = new ResourceV5DefaultTotpViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.id).toBeUndefined();
      expect(resultDto.metadata.name).toStrictEqual(dto.name);
      expect(resultDto.metadata.uris).toStrictEqual([dto.uri]);
      expect(resultDto.metadata.username).toStrictEqual(dto.username);
      expect(resultDto.metadata.description).toBeUndefined();
      expect(resultDto.metadata.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(resultDto.resource_type_id).toStrictEqual(dto.resource_type_id);
      expect(resultDto.folder_parent_id).toStrictEqual(dto.folder_parent_id);
      expect(resultDto.expired).toStrictEqual(dto.expired);
    });

    it("should return the default values if none provided", () => {
      expect.assertions(2);
      const dto = minimalResourceViewModelDto();
      const viewModel = new ResourceV5DefaultTotpViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.metadata.uris).toStrictEqual([]);
      expect(resultDto.metadata.username).toStrictEqual("");
    });

    it("should return a dto with an id if it is set", () => {
      expect.assertions(1);
      const dto = minimalResourceViewModelDto({id: uuid()});
      const viewModel = new ResourceV5DefaultTotpViewModel(dto);
      const resultDto = viewModel.toResourceDto();

      expect(resultDto.id).toStrictEqual(dto.id);
    });
  });

  describe("::toSecretDto", () => {
    it("should return the secret in the right format", () => {
      expect.assertions(1);
      const expectedTotp = defaultTotpViewModelDto({
        secret_key: "new totp key",
      });

      const expectedSecret = {
        password: "this is the expected password",
        description: "The description",
        totp: expectedTotp,
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP};

      const viewModel = new ResourceV5DefaultTotpViewModel(expectedSecret);
      const secretDto = viewModel.toSecretDto();
      expect(secretDto).toStrictEqual(expectedSecret);
    });
  });

  describe("::validate", () => {
    it("should validate the data if everything is correct", () => {
      expect.assertions(1);
      const dto = defaultResourcePasswordDescriptionTotpViewModelDto();
      const viewModel = new ResourceV5DefaultTotpViewModel(dto);
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
      const viewModel = new ResourceV5DefaultTotpViewModel(dto);
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

  describe("::areSecretsDifferent", () => {
    it("should return true if the secrets are similar but the data structure is different (aka resource type is different)", () => {
      expect.assertions(1);
      const originalDto = {
        password: "a password",
        description: "",
        totp: defaultTotpViewModelDto(),
        other: "wrong",
      };
      const viewModel1 = new ResourceV5DefaultTotpViewModel(originalDto);
      expect(viewModel1.areSecretsDifferent(originalDto)).toStrictEqual(true);
    });

    it("should return false if both secret have a similar structure and content", () => {
      expect.assertions(1);
      const originalDto = {
        password: "test",
        description: "a description",
        totp: defaultTotpViewModelDto(),
      };
      const viewModel1 = new ResourceV5DefaultTotpViewModel(originalDto);
      expect(viewModel1.areSecretsDifferent(originalDto)).toStrictEqual(false);
    });

    it("should return true if the data structure is the same but the secret is different", () => {
      expect.assertions(1);
      const originalDto = {
        password: "test",
        description: "a description",
        totp: defaultTotpViewModelDto(),
      };
      const otherDto = {
        password: "test-other",
        description: "a description",
        totp: defaultTotpViewModelDto(),
      };
      const viewModel1 = new ResourceV5DefaultTotpViewModel(otherDto);
      expect(viewModel1.areSecretsDifferent(originalDto)).toStrictEqual(true);
    });

    it("should return true if both the totp are different but the other fields are identical", () => {
      expect.assertions(1);
      const originalDto = {
        password: "test",
        description: "a description",
        totp: defaultTotpViewModelDto({
          secret_key: "it's dangerous to go alone"
        }),
      };
      const otherDto = {
        password: "test",
        description: "a description",
        totp: defaultTotpViewModelDto(),
      };
      const viewModel1 = new ResourceV5DefaultTotpViewModel(otherDto);
      expect(viewModel1.areSecretsDifferent(originalDto)).toStrictEqual(true);
    });
  });
});
