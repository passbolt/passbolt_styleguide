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

import MigrateMetadataFormEntity from "./migrateMetadataFormEntity";
import ResourceTypesCollection from "../resourceType/resourceTypesCollection";
import EntityValidationError from "../abstract/entityValidationError";
import {
  resourceTypesCollectionDto,
  resourceTypesV4CollectionDto,
} from "../resourceType/resourceTypesCollection.test.data";
import {resourceTypeV5DefaultDto} from "../resourceType/resourceTypeEntity.test.data";
import MetadataKeysCollection from "./metadataKeysCollection";
import MetadataTypesSettingsEntity from "./metadataTypesSettingsEntity";
import {defaultMetadataTypesSettingsV4Dto, defaultMetadataTypesSettingsV50FreshDto} from "./metadataTypesSettingsEntity.test.data";
import {defaultMetadataKeysDtos} from "./metadataKeysCollection.test.data";
import {defaultMetadataKeyDto} from "./metadataKeyEntity.test.data";
import {DateTime} from "luxon";

describe("migrateMetadataFormEntity", () => {
  describe("::verifyHealth", () => {
    it("does not identify issues if no resource types are provided", () => {
      expect.assertions(1);

      const settings = new MigrateMetadataFormEntity({});
      expect(settings.verifyHealth()).toBeNull();
    });

    it("throws if resource types parameter is not of the expected type", () => {
      expect.assertions(1);

      const metadataKeys = new MetadataKeysCollection();
      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const settings = new MigrateMetadataFormEntity({});
      expect(() => settings.verifyHealth(42, metadataTypesSettings, metadataKeys)).toThrow(TypeError);
    });

    it("throws if resource types parameter is not of the expected type", () => {
      expect.assertions(1);

      const resourceTypesCollection = new ResourceTypesCollection();
      const metadataKeys = new MetadataKeysCollection();
      const settings = new MigrateMetadataFormEntity({});
      expect(() => settings.verifyHealth(resourceTypesCollection, 42, metadataKeys)).toThrow(TypeError);
    });

    it("throws if resource types parameter is not of the expected type", () => {
      expect.assertions(1);

      const resourceTypesCollection = new ResourceTypesCollection();
      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const settings = new MigrateMetadataFormEntity({});
      expect(() => settings.verifyHealth(resourceTypesCollection, metadataTypesSettings, 42)).toThrow(TypeError);
    });

    it("does not identify issues if all allowed resource types are not deleted.", () => {
      expect.assertions(1);

      const settings = new MigrateMetadataFormEntity({});
      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      expect(settings.verifyHealth(resourceTypes)).toBeNull();
    });

    it("add an error if there are no V5 resource types to migrate to", () => {
      expect.assertions(4);

      const resourceTypes = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const metadataKeysCollection = new MetadataKeysCollection(defaultMetadataKeysDtos());
      const settings = new MigrateMetadataFormEntity({});
      const healthIssues = settings.verifyHealth(resourceTypes, metadataTypesSettings, metadataKeysCollection);

      expect(healthIssues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(healthIssues.details)).toHaveLength(1);
      expect(healthIssues.hasError("migrate_resources_to_v5", "resource_types_v5_deleted")).toBeTruthy();
      expect(healthIssues.getError("migrate_resources_to_v5", "resource_types_v5_deleted")).toStrictEqual("Resource types v5 are deleted.");
    });

    it("add an error if there are missing V5 resource types to migrate to", () => {
      expect.assertions(4);

      const resourceTypes = new ResourceTypesCollection([...resourceTypesV4CollectionDto(), resourceTypeV5DefaultDto()]);
      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const metadataKeysCollection = new MetadataKeysCollection(defaultMetadataKeysDtos());
      const settings = new MigrateMetadataFormEntity({});
      const healthIssues = settings.verifyHealth(resourceTypes, metadataTypesSettings, metadataKeysCollection);

      expect(healthIssues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(healthIssues.details)).toHaveLength(1);
      expect(healthIssues.hasError("migrate_resources_to_v5", "resource_types_v5_partially_deleted")).toBeTruthy();
      expect(healthIssues.getError("migrate_resources_to_v5", "resource_types_v5_partially_deleted")).toStrictEqual("Some resource types v5 are missing.");
    });

    it("add an error if there is no metadata keys from to migrate with", () => {
      expect.assertions(3);

      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const metadataKeysCollection = new MetadataKeysCollection([]);
      const settings = new MigrateMetadataFormEntity({});
      const healthIssues = settings.verifyHealth(resourceTypes, metadataTypesSettings, metadataKeysCollection);

      expect(healthIssues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(healthIssues.details)).toHaveLength(2);
      expect(healthIssues.hasError("global_form", "active_metadata_key")).toBeTruthy();
    });

    it("add an error if there is are metadata keys but no active ones to migrate with", () => {
      expect.assertions(4);

      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const metadataKeysCollection = new MetadataKeysCollection([defaultMetadataKeyDto({
        expired: DateTime.now().toISO()
      })]);
      const settings = new MigrateMetadataFormEntity({});
      const healthIssues = settings.verifyHealth(resourceTypes, metadataTypesSettings, metadataKeysCollection);

      expect(healthIssues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(healthIssues.details)).toHaveLength(2);
      expect(healthIssues.hasError("global_form", "active_metadata_key")).toBeTruthy();
      expect(healthIssues.getError("global_form", "active_metadata_key")).toStrictEqual("No active metadata key defined.");
    });

    it("add an error if there is are metadata keys but no active ones to migrate with", () => {
      expect.assertions(6);

      const resourceTypes = new ResourceTypesCollection(resourceTypesCollectionDto());
      const metadataTypesSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto());
      const metadataKeysCollection = new MetadataKeysCollection([]);
      const settings = new MigrateMetadataFormEntity({});
      const healthIssues = settings.verifyHealth(resourceTypes, metadataTypesSettings, metadataKeysCollection);

      expect(healthIssues).toBeInstanceOf(EntityValidationError);
      expect(Object.keys(healthIssues.details)).toHaveLength(2);
      expect(healthIssues.hasError("migrate_resources_to_v5", "allow_v4_v5_upgrade")).toBeTruthy();
      expect(healthIssues.getError("migrate_resources_to_v5", "allow_v4_v5_upgrade")).toStrictEqual("Resource types v5 creation is not allowed.");
      expect(healthIssues.hasError("migrate_resources_to_v5", "allow_creation_of_v5_resources")).toBeTruthy();
      expect(healthIssues.getError("migrate_resources_to_v5", "allow_creation_of_v5_resources")).toStrictEqual("Resource types v5 creation is not allowed.");
    });
  });
});
