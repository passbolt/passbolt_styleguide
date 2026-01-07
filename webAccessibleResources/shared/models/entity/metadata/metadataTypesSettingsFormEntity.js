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

import MetadataTypesSettingsEntity, {
  RESOURCE_TYPE_VERSION_4,
  RESOURCE_TYPE_VERSION_5,
} from "./metadataTypesSettingsEntity";
import EntityValidationError from "../abstract/entityValidationError";
import ResourceTypesCollection from "../resourceType/resourceTypesCollection";
import MetadataKeysCollection from "./metadataKeysCollection";

const formProperties = [
  "default_resource_types",
  "allow_creation_of_v5_resources",
  "allow_creation_of_v4_resources",
  "allow_v4_v5_upgrade",
  "allow_v5_v4_downgrade",
];

class MetadataTypesSettingsFormEntity extends MetadataTypesSettingsEntity {
  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toFormDto() {
    return formProperties.reduce((result, prop) => {
      if (typeof this._props[prop] !== "undefined") {
        result[prop] = this._props[prop];
      }
      return result;
    }, {});
  }

  /**
   * Verify the data health. This intends for administrators, helping them adjust settings to prevent unusual or
   * problematic situations. By instance enabling a metadata types without active related content types.
   * @param {ResourceTypesCollection} resourceTypes
   * @param {MetadataKeysCollection} metadataKeysCollection
   * @returns {EntityValidationError|null}
   */
  verifyHealth(resourceTypes, metadataKeysCollection) {
    let result = null;
    if (typeof resourceTypes === "undefined") {
      return result;
    }
    if (typeof metadataKeysCollection === "undefined") {
      return result;
    }
    if (!(resourceTypes instanceof ResourceTypesCollection)) {
      throw new TypeError("The parameter 'resourceTypes' is not a valid 'ResourceTypesCollection' type.");
    }
    if (!(metadataKeysCollection instanceof MetadataKeysCollection)) {
      throw new TypeError("The parameter 'metadataKeysCollection' is not a valid 'MetadataKeysCollection' type.");
    }

    const hasV4ResourceTypes = resourceTypes.hasSomeOfVersion(RESOURCE_TYPE_VERSION_4);
    const hasV5ResourceTypes = resourceTypes.hasSomeOfVersion(RESOURCE_TYPE_VERSION_5);

    if (this.allowCreationOfV4Resources && !hasV4ResourceTypes) {
      result = result || new EntityValidationError();
      result.addError("allow_creation_of_v4_resources", "resource_types_deleted", "Resource types v4 are deleted.");
    }
    if (this.isDefaultResourceTypeV4 && !hasV4ResourceTypes) {
      result = result || new EntityValidationError();
      result.addError("default_resource_types", "resource_types_v4_deleted", "Resource types v4 are deleted.");
    }
    if (this.allowCreationOfV5Resources && !hasV5ResourceTypes) {
      result = result || new EntityValidationError();
      result.addError("allow_creation_of_v5_resources", "resource_types_deleted", "Resource types v5 are deleted.");
    }
    if (this.isDefaultResourceTypeV5 && !hasV5ResourceTypes) {
      result = result || new EntityValidationError();
      result.addError("default_resource_types", "resource_types_v5_deleted", "Resource types v5 are deleted.");
    }
    if (this.allowV5V4Downgrade && !hasV4ResourceTypes) {
      result = result || new EntityValidationError();
      result.addError("allow_v5_v4_downgrade", "resource_types_deleted", "Resource types v4 are deleted.");
    }
    if (this.allowV5V4Downgrade && !this.allowCreationOfV4Resources) {
      result = result || new EntityValidationError();
      result.addError("allow_v5_v4_downgrade", "allow_creation", "Resource types v4 creation is not allowed.");
    }
    if (this.allowV4V5Upgrade && !hasV5ResourceTypes) {
      result = result || new EntityValidationError();
      result.addError("allow_v4_v5_upgrade", "resource_types_deleted", "Resource types v5 are deleted.");
    }
    if (this.allowV4V5Upgrade && !this.allowCreationOfV5Resources) {
      result = result || new EntityValidationError();
      result.addError("allow_v4_v5_upgrade", "allow_creation", "Resource types v5 creation is not allowed.");
    }

    const activeMetadataKeysCollection = metadataKeysCollection.items.filter((metadataKey) => !metadataKey.expired);
    if (activeMetadataKeysCollection.length === 0 && this.allowCreationOfV5Resources) {
      result = result || new EntityValidationError();
      result.addError("allow_creation_of_v5_resources", "active_metadata_key", "No active metadata key defined.");
    }

    return result;
  }
}

export default MetadataTypesSettingsFormEntity;
