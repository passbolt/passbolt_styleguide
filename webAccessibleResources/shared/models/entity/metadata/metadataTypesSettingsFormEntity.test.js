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
 * @since         4.11.0
 */

import MetadataTypesSettingsFormEntity from "./metadataTypesSettingsFormEntity";
import {
  defaultMetadataTypesSettingsV4Dto,
  defaultMetadataTypesSettingsV50FreshDto, defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto
} from "./metadataTypesSettingsEntity.test.data";
import ResourceTypesCollection from "../resourceType/resourceTypesCollection";
import EntityValidationError from "../abstract/entityValidationError";
import {
  resourceTypesCollectionDto,
  resourceTypesV4CollectionDto,
  resourceTypesV5CollectionDto
} from "../resourceType/resourceTypesCollection.test.data";

describe("MetadataTypesSettingsFormEntity", () => {
  describe("::toFormDto", () => {
    it("should export only the properties handled by the form", () => {
      expect.assertions(1);

      const dto = defaultMetadataTypesSettingsV50FreshDto();
      const settings = new MetadataTypesSettingsFormEntity(dto);

      const expectedDto = {
        default_resource_types: "v5",
        allow_creation_of_v5_resources: true,
        allow_creation_of_v4_resources: false,
        allow_v4_v5_upgrade: false,
        allow_v5_v4_downgrade: false,
      };
      expect(settings.toFormDto()).toStrictEqual(expectedDto);
    });

    it("exports even if invalid", () => {
      expect.assertions(1);

      const settings = new MetadataTypesSettingsFormEntity({
        default_resource_types: "v4",
        allow_creation_of_v5_resources: false,
        allow_creation_of_v4_resources: false,
      }, {validate: false});

      const expectedDto = {
        default_resource_types: "v4",
        allow_creation_of_v5_resources: false,
        allow_creation_of_v4_resources: false,
      };
      expect(settings.toFormDto()).toStrictEqual(expectedDto);
    });
  });

  describe("::verifyHealth", () => {
    it("does not identify issues if no resource types are provided", () => {
      expect.assertions(1);

      const dto = defaultMetadataTypesSettingsV4Dto();
      const settings = new MetadataTypesSettingsFormEntity(dto);
      expect(settings.verifyHealth()).toBeNull();
    });

    it("throws if resource types parameter is not of the expected type", () => {
      expect.assertions(1);

      const dto = defaultMetadataTypesSettingsV4Dto();
      const settings = new MetadataTypesSettingsFormEntity(dto);
      expect(() => settings.verifyHealth(42)).toThrow(TypeError);
    });

    it("does not identify issues if all allowed resource types are not deleted.", () => {
      expect.assertions(1);

      const dto = defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto();
      const settings = new MetadataTypesSettingsFormEntity(dto);
      new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(settings.verifyHealth()).toBeNull();
    });

    it("identifies issues if default resource type is v4 and all resource types v4 have been deleted", () => {
      expect.assertions(4);

      const dto = defaultMetadataTypesSettingsV4Dto();
      const settings = new MetadataTypesSettingsFormEntity(dto);
      const resourceTypes = new ResourceTypesCollection();
      const issues = settings.verifyHealth(resourceTypes);
      expect(issues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(issues.details)).toHaveLength(2);
      expect(issues.hasError("allow_creation_of_v4_resources", "resource_types_deleted")).toBeTruthy();
      expect(issues.hasError("default_resource_types", "resource_types_v4_deleted")).toBeTruthy();
    });

    it("identifies issues if default resource type is v5 and all resource types v5 have been deleted", () => {
      expect.assertions(4);

      const dto = defaultMetadataTypesSettingsV50FreshDto();
      const settings = new MetadataTypesSettingsFormEntity(dto);
      const resourceTypes = new ResourceTypesCollection();
      const issues = settings.verifyHealth(resourceTypes);
      expect(issues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(issues.details)).toHaveLength(2);
      expect(issues.hasError("allow_creation_of_v5_resources", "resource_types_deleted")).toBeTruthy();
      expect(issues.hasError("default_resource_types", "resource_types_v5_deleted")).toBeTruthy();
    });

    it("identifies issues if default resource type is v5, resource types v4 are allowed but all resources types v4 are deleted", () => {
      expect.assertions(3);

      const dto = defaultMetadataTypesSettingsV50FreshDto({allow_creation_of_v4_resources: true});
      const settings = new MetadataTypesSettingsFormEntity(dto);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const issues = settings.verifyHealth(resourceTypes);
      expect(issues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(issues.details)).toHaveLength(1);
      expect(issues.hasError("allow_creation_of_v4_resources", "resource_types_deleted")).toBeTruthy();
    });

    it("identifies issues if default resource type is v4, resource types v5 are allowed but all resources types v5 are deleted", () => {
      expect.assertions(3);

      const dto = defaultMetadataTypesSettingsV4Dto({allow_creation_of_v5_resources: true});
      const settings = new MetadataTypesSettingsFormEntity(dto);
      const resourceTypes = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const issues = settings.verifyHealth(resourceTypes);
      expect(issues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(issues.details)).toHaveLength(1);
      expect(issues.hasError("allow_creation_of_v5_resources", "resource_types_deleted")).toBeTruthy();
    });
  });
});
