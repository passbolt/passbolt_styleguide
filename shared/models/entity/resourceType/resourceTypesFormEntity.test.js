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
 * @since         4.12.0
 */

import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import ResourceTypesFormEntity from "./resourceTypesFormEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {resourceTypesCollectionDto} from "./resourceTypesCollection.test.data";
import {
  defaultResourceTypesFormDto,
  resourceTypesCollectionWithCountDto,
  withDeletedResourceTypes,
  withDeletedResourceTypesHavingResources
} from "./resourceTypesFormEntity.test.data";
import ResourceTypesCollection from "./resourceTypesCollection";
import {defaultMetadataKeysDtos} from "../../../../shared/models/entity/metadata/metadataKeysCollection.test.data";
import {
  defaultMetadataTypesSettingsV50FreshDto,
  defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto
} from "../metadata/metadataTypesSettingsEntity.test.data";
import MetadataTypesSettingsEntity from "../metadata/metadataTypesSettingsEntity";
import MetadataKeysCollection from "../metadata/metadataKeysCollection";

describe("ResourceTypesFormEntity", () => {
  describe("ResourceTypesFormEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(ResourceTypesFormEntity.name, ResourceTypesFormEntity.getSchema());
    });

    it("validates password_v4 property", () => {
      assertEntityProperty.boolean(ResourceTypesFormEntity, "password_v4");
      assertEntityProperty.required(ResourceTypesFormEntity, "password_v4");
    });

    it("validates password_v5 property", () => {
      assertEntityProperty.boolean(ResourceTypesFormEntity, "password_v5");
      assertEntityProperty.required(ResourceTypesFormEntity, "password_v5");
    });

    it("validates totp_v4 property", () => {
      assertEntityProperty.boolean(ResourceTypesFormEntity, "totp_v4");
      assertEntityProperty.required(ResourceTypesFormEntity, "totp_v4");
    });

    it("validates totp_v5 property", () => {
      assertEntityProperty.boolean(ResourceTypesFormEntity, "totp_v5");
      assertEntityProperty.required(ResourceTypesFormEntity, "totp_v5");
    });

    it("validates password_v4_count property", () => {
      assertEntityProperty.integer(ResourceTypesFormEntity, "password_v4_count");
      assertEntityProperty.required(ResourceTypesFormEntity, "password_v4_count");
    });

    it("validates password_v5_count property", () => {
      assertEntityProperty.integer(ResourceTypesFormEntity, "password_v5_count");
      assertEntityProperty.required(ResourceTypesFormEntity, "password_v5_count");
    });

    it("validates totp_v4_count property", () => {
      assertEntityProperty.integer(ResourceTypesFormEntity, "totp_v4_count");
      assertEntityProperty.required(ResourceTypesFormEntity, "totp_v4_count");
    });

    it("validates totp_v5_count property", () => {
      assertEntityProperty.integer(ResourceTypesFormEntity, "totp_v5_count");
      assertEntityProperty.required(ResourceTypesFormEntity, "totp_v5_count");
    });

    it("validates has_v4_resource_types property", () => {
      assertEntityProperty.boolean(ResourceTypesFormEntity, "has_v4_resource_types");
      assertEntityProperty.required(ResourceTypesFormEntity, "has_v4_resource_types");
    });

    it("validates has_v5_resource_types property", () => {
      assertEntityProperty.boolean(ResourceTypesFormEntity, "has_v5_resource_types");
      assertEntityProperty.required(ResourceTypesFormEntity, "has_v5_resource_types");
    });

    it("validates resource_types property", () => {
      const dto = defaultResourceTypesFormDto();
      const successScenarios = [
        {scenario: "valid resource_types collection", value: new ResourceTypesCollection(resourceTypesCollectionDto())},
        {scenario: "valid resource_types collection dto", value: resourceTypesCollectionDto()},
      ];
      const failScenarios = [
        {scenario: "invalid resource_types type: integer", value: 42},
      ];
      assertEntityProperty.required(ResourceTypesFormEntity, "resource_types");
      assertEntityProperty.assertAssociation(ResourceTypesFormEntity, "resource_types", dto, successScenarios, failScenarios);
    });
  });

  describe("::validateBuildRules", () => {
    it("should not throw an error if everything is fine", () => {
      expect.assertions(1);

      const dto = defaultResourceTypesFormDto();
      expect(() => new ResourceTypesFormEntity(dto)).not.toThrow();
    });

    it("should throw an error if the data does not validate", () => {
      expect.assertions(1);

      const expectedError = new EntityValidationError();
      expectedError.addError("password_v4", "has_content", "One (or more) resource type v4 having a password is deleted but its resources_count is not 0.");
      expectedError.addError("password_v5", "has_content", "One (or more) resource type v4 having a totp is deleted but its resources_count is not 0.");
      expectedError.addError("totp_v4", "has_content", "One (or more) resource type v5 having a password is deleted but its resources_count is not 0.");
      expectedError.addError("totp_v5", "has_content", "One (or more) resource type v5 having a totp is deleted but its resources_count is not 0.");

      expectedError.addError("password_v4", "minimum_requirement", "At least one content type should be allowed");
      expectedError.addError("password_v5", "minimum_requirement", "At least one content type should be allowed");
      expectedError.addError("totp_v4", "minimum_requirement", "At least one content type should be allowed");
      expectedError.addError("totp_v5", "has_cominimum_requirementntent", "At least one content type should be allowed");

      const dto = withDeletedResourceTypesHavingResources();
      expect(() => new ResourceTypesFormEntity(dto)).toThrow(expectedError);
    });

    it("should throw an error if the resource_types is not a valid ResourceTypesCollection", () => {
      const expectedError = new EntityValidationError();
      expectedError.addError("resource_types", "type", "The resource_types is not a valid ResourceTypesCollection.");

      const dto = withDeletedResourceTypesHavingResources({resource_types: []});
      expect(() => new ResourceTypesFormEntity(dto)).toThrow(expectedError);
    });
  });

  describe("::verifyHealth", () => {
    it("does not identify issues if no resource types are provided", () => {
      expect.assertions(1);

      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto());
      const metadataKeysCollection = new MetadataKeysCollection(defaultMetadataKeysDtos());
      const settings = new ResourceTypesFormEntity(defaultResourceTypesFormDto());

      expect(settings.verifyHealth(metadataTypesSettings, metadataKeysCollection)).toBeNull();
    });

    it("throws if metadataTypesSettings parameter is not of the expected type", () => {
      expect.assertions(1);

      const metadataKeysCollection = new MetadataKeysCollection(defaultMetadataKeysDtos());
      const settings = new ResourceTypesFormEntity(defaultResourceTypesFormDto());

      expect(() => settings.verifyHealth(42, metadataKeysCollection)).toThrow(TypeError);
    });

    it("throws if metadataKeysCollection parameter is not of the expected type", () => {
      expect.assertions(1);

      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto());
      const settings = new ResourceTypesFormEntity(defaultResourceTypesFormDto());

      expect(() => settings.verifyHealth(metadataTypesSettings, 42)).toThrow(TypeError);
    });

    it("return health issues if any", () => {
      expect.assertions(1);

      const expectedError = new EntityValidationError();
      expectedError.addError("totp_v4", "is_creation_alowed", "Creation of resource type v4 is allowed but all resource types having totp are deleted.");
      expectedError.addError("password_v5", "is_creation_alowed", "Creation of resource type v5 is allowed but all resource types having passwords are deleted.");
      expectedError.addError("totp_v5", "is_creation_alowed", "Creation of resource type v5 is allowed but all resource types having totp are deleted.");

      expectedError.addError("password_v5", "active_metadata_key", "No active metadata key defined.");
      expectedError.addError("totp_v5", "active_metadata_key", "No active metadata key defined.");

      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto({allow_creation_of_v4_resources: true}));
      const metadataKeysCollection = new MetadataKeysCollection([]);
      const settings = new ResourceTypesFormEntity(withDeletedResourceTypes({
        password_v4: true,
      }));

      const healthIssues = settings.verifyHealth(metadataTypesSettings, metadataKeysCollection);
      expect(healthIssues).toStrictEqual(expectedError);
    });

    it("return password_v4 health issues if any", () => {
      expect.assertions(1);

      const expectedError = new EntityValidationError();
      expectedError.addError("password_v4", "is_creation_alowed", "Creation of resource type v4 is allowed but all resource types having passwords are deleted.");

      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto({allow_creation_of_v4_resources: true}));
      const metadataKeysCollection = new MetadataKeysCollection([]);
      const settings = new ResourceTypesFormEntity(defaultResourceTypesFormDto({
        password_v4: false,
        password_v4_count: 0,
      }));

      const healthIssues = settings.verifyHealth(metadataTypesSettings, metadataKeysCollection);
      expect(healthIssues).toStrictEqual(expectedError);
    });

    it("return is_creation_not_allowed v5 health issues if any", () => {
      expect.assertions(1);

      const expectedError = new EntityValidationError();
      expectedError.addError("totp_v5", "is_creation_not_alowed", "Creation of resource type v5 is not allowed.");
      expectedError.addError("password_v5", "is_creation_not_alowed", "Creation of resource type v5 is not allowed.");

      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto({allow_creation_of_v5_resources: false, default_resource_types: "v4", allow_creation_of_v4_resources: true}));
      const metadataKeysCollection = new MetadataKeysCollection([]);
      const settings = new ResourceTypesFormEntity(defaultResourceTypesFormDto());

      const healthIssues = settings.verifyHealth(metadataTypesSettings, metadataKeysCollection);
      expect(healthIssues).toStrictEqual(expectedError);
    });

    it("return is_creation_not_allowed v5 health issues if any", () => {
      expect.assertions(1);

      const expectedError = new EntityValidationError();
      expectedError.addError("totp_v4", "is_creation_not_alowed", "Creation of resource type v4 is not allowed.");
      expectedError.addError("password_v4", "is_creation_not_alowed", "Creation of resource type v4 is not allowed.");

      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const metadataKeysCollection = new MetadataKeysCollection([]);
      const settings = new ResourceTypesFormEntity(defaultResourceTypesFormDto());

      const healthIssues = settings.verifyHealth(metadataTypesSettings, metadataKeysCollection);
      expect(healthIssues).toStrictEqual(expectedError);
    });
  });

  describe("::createFormResourcesTypesCollection", () => {
    it("should create a ResourceTypesFormEntity for a ResourceTypesCollection", () => {
      expect.assertions(10);

      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionWithCountDto());
      const resourceTypesFormEntity = ResourceTypesFormEntity.createFormResourcesTypesCollection(resourceTypes);

      expect(resourceTypesFormEntity).toBeInstanceOf(ResourceTypesFormEntity);
      expect(resourceTypesFormEntity._resource_types).toStrictEqual(resourceTypes);
      expect(resourceTypesFormEntity._props.password_v4).toStrictEqual(true);
      expect(resourceTypesFormEntity._props.password_v5).toStrictEqual(true);
      expect(resourceTypesFormEntity._props.totp_v4).toStrictEqual(true);
      expect(resourceTypesFormEntity._props.totp_v5).toStrictEqual(true);
      expect(resourceTypesFormEntity._props.password_v4_count).toStrictEqual(18);
      expect(resourceTypesFormEntity._props.password_v5_count).toStrictEqual(14);
      expect(resourceTypesFormEntity._props.totp_v4_count).toStrictEqual(15);
      expect(resourceTypesFormEntity._props.totp_v5_count).toStrictEqual(3);
    });
  });
});
