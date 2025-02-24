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
import EntityV2 from "../abstract/entityV2";
import EntityValidationError from "../abstract/entityValidationError";
import MetadataKeysCollection from "../metadata/metadataKeysCollection";
import MetadataTypesSettingsEntity from "../metadata/metadataTypesSettingsEntity";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
} from "../resourceType/resourceTypeSchemasDefinition";
import ResourceTypesCollection from "../resourceType/resourceTypesCollection";

const partialCheckboxesMapping = {
  passwordV4: [
    RESOURCE_TYPE_PASSWORD_STRING_SLUG,
    RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  ],
  totpV4: [
    RESOURCE_TYPE_TOTP_SLUG,
  ],
  passwordV5: [
    RESOURCE_TYPE_V5_DEFAULT_SLUG,
    RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  ],
  totpV5: [
    RESOURCE_TYPE_V5_TOTP_SLUG,
  ],
};

const fullResourceTypesMapping = {
  passwordV4: [
    RESOURCE_TYPE_PASSWORD_STRING_SLUG,
    RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
    RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  ],
  totpV4: [
    RESOURCE_TYPE_TOTP_SLUG,
    RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  ],
  passwordV5: [
    RESOURCE_TYPE_V5_DEFAULT_SLUG,
    RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
    RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  ],
  totpV5: [
    RESOURCE_TYPE_V5_TOTP_SLUG,
    RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  ],
};

class ResourceTypesFormEntity extends EntityV2 {
  /**
   * @constructor
   * @param {object} resourceTypeFormDto
   */
  constructor(resourceTypeFormDto, options) {
    super(resourceTypeFormDto, options);

    if (this._props.resource_types) {
      this._resource_types = new ResourceTypesCollection(this._props.resource_types);
    }
  }

  /**
   * Get resource type form entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "password_v4",
        "password_v5",
        "totp_v4",
        "totp_v5",
        "password_v4_count",
        "password_v5_count",
        "totp_v4_count",
        "totp_v5_count",
        "resource_types",
      ],
      "properties": {
        "password_v4": {
          "type": "boolean",
        },
        "password_v5": {
          "type": "boolean",
        },
        "totp_v4": {
          "type": "boolean",
        },
        "totp_v5": {
          "type": "boolean",
        },
        "password_v4_count": {
          "type": "integer",
        },
        "password_v5_count": {
          "type": "integer",
        },
        "totp_v4_count": {
          "type": "integer",
        },
        "totp_v5_count": {
          "type": "integer",
        },
        "resource_types": ResourceTypesCollection.getSchema(), // all resource types collection (available and deleted)
      }
    };
  }

  /**
   * Creates a resource type form entity based on the given resource types collection
   * @param {ResourceTypesCollection} resource_types
   * @returns {ResourceTypesFormEntity}
   */
  static createFormResourcesTypesCollection(resource_types) {
    if (!(resource_types instanceof ResourceTypesCollection)) {
      throw new TypeError("The parameter 'resource_types' is not a valid 'ResourceTypesCollection' type.");
    }

    const availableResourceTypesDto = resource_types.items.filter(rt => !rt.isDeleted());
    const availableResourceTypes = new ResourceTypesCollection(availableResourceTypesDto);

    const password_v4 = this._areAllResourceTypesAvailable(partialCheckboxesMapping.passwordV4, availableResourceTypes);
    const password_v5 = this._areAllResourceTypesAvailable(partialCheckboxesMapping.passwordV5, availableResourceTypes);
    const totp_v4 = this._areAllResourceTypesAvailable(partialCheckboxesMapping.totpV4, availableResourceTypes);
    const totp_v5 = this._areAllResourceTypesAvailable(partialCheckboxesMapping.totpV5, availableResourceTypes);

    const password_v4_count = this._getResourcesCountForResourceTypeFamily(fullResourceTypesMapping.passwordV4, resource_types);
    const password_v5_count = this._getResourcesCountForResourceTypeFamily(fullResourceTypesMapping.passwordV5, resource_types);
    const totp_v4_count = this._getResourcesCountForResourceTypeFamily(fullResourceTypesMapping.totpV4, resource_types);
    const totp_v5_count = this._getResourcesCountForResourceTypeFamily(fullResourceTypesMapping.totpV5, resource_types);

    return new ResourceTypesFormEntity({
      password_v4,
      password_v5,
      totp_v4,
      totp_v5,
      password_v4_count,
      password_v5_count,
      totp_v4_count,
      totp_v5_count,
      resource_types
    });
  }

  /**
   * Returns the sum of the quantity of resource for all the given resource types.
   * @param {Array<string>} requiredResourceSlugs
   * @param {ResourceTypesCollection} resourceTypesCollection
   * @returns {integer}
   * @private
   */
  static _getResourcesCountForResourceTypeFamily(requiredResourceSlugs, resourceTypesCollection) {
    let count = 0;
    for (let i = 0; i < requiredResourceSlugs.length; i++) {
      count += resourceTypesCollection.getFirstBySlug(requiredResourceSlugs[i]).resourcesCount;
    }
    return count;
  }

  /**
   * Returns true if all the required resource types are part of the available resource types collection
   * @param {Array<string>} requiredResourceTypes
   * @param {ResourceTypesCollection} availableResourceTypesCollection
   * @returns {boolean}
   * @private
   */
  static _areAllResourceTypesAvailable(requiredResourceTypes, availableResourceTypesCollection) {
    return requiredResourceTypes.every(slug => availableResourceTypesCollection.hasOneWithSlug(slug));
  }

  /**
   * @inheritDoc
   * @throws {EntityValidationError} If a resource type family is deleted but has resource associated.
   * @throws {EntityValidationError} If all the resource type are disabled.
   */
  validateBuildRules() {
    let error = null;
    if (!this._props.password_v4 && this._props.password_v4_count > 0) {
      error = error || new EntityValidationError();
      error.addError("password_v4", "has_content", "One (or more) resource type v4 having a password is deleted but its resources_count is not 0.");
    }
    if (!this._props.totp_v4 && this._props.totp_v4_count > 0) {
      error = error || new EntityValidationError();
      error.addError("totp_v4", "has_content", "One (or more) resource type v4 having a totp is deleted but its resources_count is not 0.");
    }
    if (!this._props.password_v5 && this._props.password_v5_count > 0) {
      error = error || new EntityValidationError();
      error.addError("password_v5", "has_content", "One (or more) resource type v5 having a password is deleted but its resources_count is not 0.");
    }
    if (!this._props.totp_v5 && this._props.totp_v5_count > 0) {
      error = error || new EntityValidationError();
      error.addError("totp_v5", "has_content", "One (or more) resource type v5 having a totp is deleted but its resources_count is not 0.");
    }
    if (!this._props.password_v4 && !this._props.totp_v4 && !this._props.password_v5 && !this._props.totp_v5) {
      const message = "At least one family of resource types should be selected";
      const rule = "minimum_requirement";

      error = error || new EntityValidationError();
      error.addError("password_v4", rule, message);
      error.addError("totp_v4", rule, message);
      error.addError("password_v5", rule, message);
      error.addError("totp_v5", rule, message);
    }

    if (error) {
      throw error;
    }
  }

  /**
   * Runs a health check for the form
   * @param {MetadataTypesSettingsEntity} metadataTypesSettings
   * @param {MetadataKeysCollection} metadataKeysCollection
   * @returns {EntityValidationError|null}
   */
  verifyHealth(metadataTypesSettings, metadataKeysCollection) {
    if (typeof metadataTypesSettings === "undefined") {
      return null;
    }
    if (typeof metadataKeysCollection === "undefined") {
      return null;
    }

    if (!(metadataTypesSettings instanceof MetadataTypesSettingsEntity)) {
      throw new TypeError("The parameter 'metadataTypesSettings' is not a valid 'MetadataTypesSettingsEntity' type.");
    }
    if (!(metadataKeysCollection instanceof MetadataKeysCollection)) {
      throw new TypeError("The parameter 'metadataKeysCollection' is not a valid 'MetadataKeysCollection' type.");
    }

    let result = null;
    if (metadataTypesSettings.allowCreationOfV4Resources && !this._props.password_v4) {
      result = new EntityValidationError();
      result.addError("password_v4", "is_creation_alowed", "Creation of resource type v4 is allowed but all resource types having passwords are deleted.");
    }

    if (metadataTypesSettings.allowCreationOfV4Resources && !this._props.totp_v4) {
      result = result || new EntityValidationError();
      result.addError("totp_v4", "is_creation_alowed", "Creation of resource type v4 is allowed but all resource types having totps are deleted.");
    }

    if (metadataTypesSettings.allowCreationOfV4Resources && !this._props.password_v5) {
      result = result || new EntityValidationError();
      result.addError("password_v5", "is_creation_alowed", "Creation of resource type v5 is allowed but all resource types having passwords are deleted.");
    }

    if (metadataTypesSettings.allowCreationOfV4Resources && !this._props.totp_v5) {
      result = result || new EntityValidationError();
      result.addError("totp_v5", "is_creation_alowed", "Creation of resource type v5 is allowed but all resource types having totps are deleted.");
    }

    const activeMetadataKeysCollection = metadataKeysCollection.items.filter(metadataKey => !metadataKey.expired);
    if (activeMetadataKeysCollection.length === 0 && this._props.password_v5) {
      result = result || new EntityValidationError();
      result.addError("password_v5", "active_metadata_key", "No active metadata key defined.");
    }

    if (activeMetadataKeysCollection.length === 0 && this._props.totp_v5) {
      result = result || new EntityValidationError();
      result.addError("totp_v5", "active_metadata_key", "No active metadata key defined.");
    }

    return result;
  }

  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toFormDto() {
    return {
      password_v4: this._props.password_v4,
      password_v5: this._props.password_v5,
      totp_v4: this._props.totp_v4,
      totp_v5: this._props.totp_v5,
      password_v4_count: this._props.password_v4_count,
      password_v5_count: this._props.password_v5_count,
      totp_v4_count: this._props.totp_v4_count,
      totp_v5_count: this._props.totp_v5_count,
      resource_types: this._resource_types,
    };
  }
}

export default ResourceTypesFormEntity;
