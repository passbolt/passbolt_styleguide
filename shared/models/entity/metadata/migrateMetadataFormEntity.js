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

import EntityValidationError from "../abstract/entityValidationError";
import {V4_TO_V5_RESOURCE_TYPE_MAPPING} from "../resourceType/resourceTypeSchemasDefinition";
import ResourceTypesCollection from "../resourceType/resourceTypesCollection";
import MetadataKeysCollection from "./metadataKeysCollection";
import MetadataTypesSettingsEntity, {RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5} from "./metadataTypesSettingsEntity";
import MigrateMetadataEntity from "./migrateMetadataEntity";

class MigrateMetadataFormEntity extends MigrateMetadataEntity {
  /**
   * Verify the data health. This intends for administrators, helping them adjust settings to prevent unusual or
   * problematic situations. By instance strating migration without v5 resource types enabled.
   * @param {ResourceTypesCollection} resourceTypesCollection
   * @param {MetadataTypesSettingsEntity} metadataTypesSettings
   * @param {MetadataKeysCollection} metadataKeysCollection
   * @returns {EntityValidationError|null}
   */
  verifyHealth(resourceTypesCollection, metadataTypesSettings, metadataKeysCollection) {
    if (typeof resourceTypesCollection === "undefined") {
      return null;
    }
    if (typeof metadataTypesSettings === "undefined") {
      return null;
    }
    if (typeof metadataKeysCollection === "undefined") {
      return null;
    }

    if (!(resourceTypesCollection instanceof ResourceTypesCollection)) {
      throw new TypeError("The parameter 'resourceTypesCollection' is not a valid 'ResourceTypesCollection' type.");
    }
    if (!(metadataTypesSettings instanceof MetadataTypesSettingsEntity)) {
      throw new TypeError("The parameter 'metadataTypesSettings' is not a valid 'MetadataTypesSettingsEntity' type.");
    }
    if (!(metadataKeysCollection instanceof MetadataKeysCollection)) {
      throw new TypeError("The parameter 'metadataKeysCollection' is not a valid 'MetadataKeysCollection' type.");
    }

    let result = this._verifyGlobalHealth(metadataKeysCollection);
    result = this._verifyMigrateResourcesToV5Health(result, resourceTypesCollection, metadataTypesSettings, metadataKeysCollection);
    result = this._verifyMigrateFoldersToV5Health(result, metadataTypesSettings, metadataKeysCollection);
    result = this._verifyMigrateTagsToV5Health(result, metadataTypesSettings, metadataKeysCollection);
    result = this._verifyMigrateCommentsToV5Health(result, metadataTypesSettings, metadataKeysCollection);
    return result;
  }

  /**
   * Verify the global data health.
   * @param {MetadataKeysCollection} metadataKeysCollection
   * @returns {EntityValidationError|null}
   */
  _verifyGlobalHealth(metadataKeysCollection) {
    const activeMetadataKeysCollection = metadataKeysCollection.items.filter(metadataKey => !metadataKey.expired);
    if (activeMetadataKeysCollection.length > 0) {
      return null;
    }
    const result = new EntityValidationError();
    result.addError("global_form", "active_metadata_key", "No active metadata key defined.");
    return result;
  }

  /**
   * Verify the data health regarding the migration of the resources.
   * @param {EntityValidationError|null}
   * @param {ResourceTypesCollection} resourceTypesCollection
   * @param {MetadataTypesSettingsEntity} metadataTypesSettings
   * @returns {EntityValidationError|null}
   */
  _verifyMigrateResourcesToV5Health(result, resourceTypesCollection, metadataTypesSettings) {
    if (this._props.migrate_resources_to_v5 && !metadataTypesSettings.allowV4V5Upgrade) {
      result = result || new EntityValidationError();
      result.addError("migrate_resources_to_v5", "allow_v4_v5_upgrade", "Resource types v5 creation is not allowed.");
    }

    if (this._props.migrate_resources_to_v5 && !metadataTypesSettings.allowCreationOfV5Resources) {
      result = result || new EntityValidationError();
      result.addError("migrate_resources_to_v5", "allow_creation_of_v5_resources", "Resource types v5 creation is not allowed.");
    }

    const hasV5ResourceTypes = resourceTypesCollection.hasSomeOfVersion(RESOURCE_TYPE_VERSION_5);
    if (this._props.migrate_resources_to_v5 && !hasV5ResourceTypes) {
      result = result || new EntityValidationError();
      result.addError("migrate_resources_to_v5", "resource_types_v5_deleted", "Resource types v5 are deleted.");
      return result;
    }

    const v4ResourceTypes = resourceTypesCollection.items.filter(resourceType => resourceType.version === RESOURCE_TYPE_VERSION_4);
    const hasAllMatchingV5ResourceTypes = v4ResourceTypes.every(resourceTypes => resourceTypesCollection.hasOneWithSlug(V4_TO_V5_RESOURCE_TYPE_MAPPING[resourceTypes.slug]));
    if (this._props.migrate_resources_to_v5 && !hasAllMatchingV5ResourceTypes) {
      result = result || new EntityValidationError();
      result.addError("migrate_resources_to_v5", "resource_types_v5_partially_deleted", "Some resource types v5 are missing.");
    }

    return result;
  }

  /**
   * Verify the data health regarding the migration of the folders.
   * @param {EntityValidationError|null}
   * @param {MetadataTypesSettingsEntity} metadataTypesSettings
   * @returns {EntityValidationError|null}
   */
  _verifyMigrateFoldersToV5Health(result, metadataTypesSettings) {
    if (this._props.migrate_folders_to_v5 && !metadataTypesSettings.allowV4V5Upgrade) {
      result = result || new EntityValidationError();
      result.addError("migrate_folders_to_v5", "allow_v4_v5_upgrade", "Folders v5 creation is not allowed.");
    }

    if (this._props.migrate_folders_to_v5 && !metadataTypesSettings.allowCreationOfV5Folders) {
      result = result || new EntityValidationError();
      result.addError("migrate_folders_to_v5", "allow_creation_of_v5_folders", "Folders v5 creation is not allowed.");
    }

    return result;
  }

  /**
   * Verify the data health regarding the migration of the tags.
   * @param {EntityValidationError|null}
   * @param {MetadataTypesSettingsEntity} metadataTypesSettings
   * @returns {EntityValidationError|null}
   */
  _verifyMigrateTagsToV5Health(result, metadataTypesSettings) {
    if (this._props.migrate_tags_to_v5 && !metadataTypesSettings.allowV4V5Upgrade) {
      result = result || new EntityValidationError();
      result.addError("migrate_tags_to_v5", "allow_v4_v5_upgrade", "Tags v5 creation is not allowed.");
    }

    if (this._props.migrate_tags_to_v5 && !metadataTypesSettings.allowCreationOfV5Folders) {
      result = result || new EntityValidationError();
      result.addError("migrate_tags_to_v5", "allow_creation_of_v5_tags", "Tags v5 creation is not allowed.");
    }

    return result;
  }

  /**
   * Verify the data health regarding the migration of the comments.
   * @param {EntityValidationError|null}
   * @param {MetadataTypesSettingsEntity} metadataTypesSettings
   * @returns {EntityValidationError|null}
   */
  _verifyMigrateCommentsToV5Health(result, metadataTypesSettings) {
    if (this._props.migrate_comments_to_v5 && !metadataTypesSettings.allowV4V5Upgrade) {
      result = result || new EntityValidationError();
      result.addError("migrate_comments_to_v5", "allow_v4_v5_upgrade", "Comments v5 creation is not allowed.");
    }

    if (this._props.migrate_comments_to_v5 && !metadataTypesSettings.allowCreationOfV5Folders) {
      result = result || new EntityValidationError();
      result.addError("migrate_comments_to_v5", "allow_creation_of_v5_comments", "Comments v5 creation is not allowed.");
    }

    return result;
  }
}

export default MigrateMetadataFormEntity;
