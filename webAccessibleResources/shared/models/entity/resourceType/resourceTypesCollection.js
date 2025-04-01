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
 * @since         2.13.0
 */
import EntityV2Collection from "../../entity/abstract/entityV2Collection";
import {RESOURCE_TYPE_VERSION_4} from "../metadata/metadataTypesSettingsEntity";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG, RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG, RESOURCE_TYPE_V5_TOTP_SLUG
} from "./resourceTypeSchemasDefinition";
import ResourceTypeEntity, {PASSWORD_RESOURCE_TYPES} from "./resourceTypeEntity";
import assertString from "validator/es/lib/util/assertString";

const SUPPORTED_RESOURCE_TYPES = [
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
];

class ResourceTypesCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return ResourceTypeEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by ID.
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by slug.
   */
  constructor(dtos = [], options = {}) {
    super(dtos, options);
  }

  /**
   * Get resources entity schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "array",
      "items": ResourceTypeEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @param {Set} [options.uniqueSlugsSetCache] A set of unique slugs.
   * @throws {EntityValidationError} If a permission already exists with the same id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, {haystackSet: options?.uniqueIdsSetCache});
    this.assertNotExist("slug", item._props.slug, {haystackSet: options?.uniqueSlugsSetCache});
  }

  /*
   * ==================================================
   * Assertions
   * ==================================================
   */

  /**
   * Is resource type id present (supported)
   * @param id The id
   * @return {boolean}
   */
  isResourceTypeIdPresent(id) {
    return this._items.some(resourceType => resourceType.id === id);
  }

  /*
   * ==================================================
   * Filter
   * ==================================================
   */

  /**
   * Filter by password resource types.
   * @return {void} The function alters the collection itself.
   */
  filterByPasswordResourceTypes() {
    this.filterByPropertyValueIn("slug", PASSWORD_RESOURCE_TYPES);
  }

  /**
   * Filter by resource type version.
   * @param {string} version the version used to filter the resource types
   * @return {void} The function alters the collection itself.
   */
  filterByResourceTypeVersion(version) {
    this.filterByCallback(resourceType => resourceType.version === version);
  }

  /*
   * ==================================================
   * Getters
   * ==================================================
   */

  /**
   * Get first by id
   * @param {string} id
   * @returns {ResourceTypeEntity}
   */
  getFirstById(id) {
    return this.getFirst("id", id);
  }

  /**
   * Get first by slug
   * @param {string} slug
   * @returns {ResourceTypeEntity}
   */
  getFirstBySlug(slug) {
    return this.getFirst("slug", slug);
  }

  /**
   * Has one with slug
   * @param {string} slug
   * @returns {boolean}
   */
  hasOneWithSlug(slug) {
    return Boolean(this.getFirstBySlug(slug));
  }

  /**
   * Has some passwords resource types
   * @param {string} [version] The version @todo adapt when v5 will be the default
   * @returns {boolean}
   */
  hasSomePasswordResourceTypes(version = RESOURCE_TYPE_VERSION_4) {
    return this.items.some(resourceType => resourceType.hasPassword() && resourceType.version === version);
  }

  /**
   * Has some totp resource types
   * @param {string} [version] The version @todo adapt when v5 will be the default
   * @returns {boolean}
   */
  hasSomeTotpResourceTypes(version = RESOURCE_TYPE_VERSION_4) {
    return this.items.some(resourceType => resourceType.hasTotp() && resourceType.version === version);
  }

  /**
   * Has some note resource types
   * @param {string} [version] The version @todo adapt when v5 will be the default
   * @returns {boolean}
   */
  hasSomeNoteResourceTypes(version = RESOURCE_TYPE_VERSION_4) {
    return this.items.some(resourceType => resourceType.hasSecretDescription() && resourceType.version === version);
  }

  /**
   * Has some metadata description resource types
   * @param {string} [version] The version @todo adapt when v5 will be the default
   * @returns {boolean}
   */
  hasSomeMetadataDescriptionResourceTypes(version = RESOURCE_TYPE_VERSION_4) {
    return this.items.some(resourceType => resourceType.hasMetadataDescription() && resourceType.version === version);
  }

  /**
   * Has some of the given version
   * @param {string} [version] The version
   * @returns {boolean}
   */
  hasSomeOfVersion(version = RESOURCE_TYPE_VERSION_4) {
    return this.items.some(resourceType => resourceType.version === version);
  }

  /**
   * Get the resource type matching the resource DTO in a specific version
   *
   * Note: This function returns only resource type that match in a specific version. Not supported:
   *   - password string v4;
   *   - password string v5;
   *   - several resource type having the same number of properties that match the resource DTO
   *
   * How the match is done:
   *  - First do not check resource type that is not matching the version
   *  - Second check all secret properties from resourceDto are include in the properties of a resource type (exclude some resource types)
   *  - Third count the number of secrets that is not set in the resource type vby the resourceDto
   *  - If all is set then it's a perfect match and return directly the resource type
   *  - Else count the number of property unset and keep the lowest
   *
   * Example: For a secret description only
   * There is no perfect match, so there is one unset property for v5 default and 2 for v5 default and TOTP
   * The best match is v5 default
   *
   * @param {object} resourceDto
   * @param {string} version
   *
   * @returns {ResourceTypeEntity} The resource type that match the resource DTO
   * @throws {Error} If the version is not a string.
   * @throws {Error} If the resource DTO is not an object with secret object.
   */
  getResourceTypeMatchingResource(resourceDto, version = RESOURCE_TYPE_VERSION_4) {
    assertString(version);
    // Check if the DTO is not null and a secret object
    if (resourceDto?.secret == null || typeof resourceDto.secret !== "object") {
      throw new TypeError("The resource DTO is not an expected object");
    }

    // The resource type that matched the most
    let resourceTypeMatch = null;
    // Score that should be closest to 0 if no resource type match perfectly
    let score = null;

    // The secret fields of the resource DTO
    const resourceSecretFields = Object.keys(resourceDto.secret);

    // Loop on all resource types
    for (const resourceType of this.items) {
      // Do not check for resource type that not match version or password string
      if (resourceType.version !== version || resourceType.isPasswordString()) {
        continue;
      }

      // Get all secret property fields
      const secretsFields = Object.keys(resourceType.definition.secret.properties);

      // Check if all secret fields from the DTO are in the resource type secret property fields
      const hasAllPropertyFields = resourceSecretFields.every(secretField => secretsFields.includes(secretField));

      if (hasAllPropertyFields) {
        // Get the number of properties that is not set to match the resource type
        const unsetPropertyCount = secretsFields.filter(field => !resourceSecretFields.includes(field)).length;

        // If all properties are set, that is a perfect match
        if (unsetPropertyCount === 0) {
          return resourceType;
        }
        // Else set the score and the resource type that matched the most
        if (!score || score > unsetPropertyCount) {
          score = unsetPropertyCount;
          resourceTypeMatch = resourceType;
        }
      }
    }
    // If no perfect match, return the resource type that matched the most
    return resourceTypeMatch;
  }

  /*
   * ==================================================
   * Setters
   * ==================================================
   */

  /**
   * @inheritDoc
   */
  pushMany(data, entityOptions = {}, options = {}) {
    const uniqueIdsSetCache = new Set(this.extract("id"));
    const uniqueSlugsSetCache = new Set(this.extract("slug"));

    const onItemPushed = item => {
      uniqueIdsSetCache.add(item.id);
      uniqueSlugsSetCache.add(item.slug);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: {...options?.validateBuildRules, uniqueIdsSetCache, uniqueSlugsSetCache},
      ...options
    };

    super.pushMany(data, entityOptions, options);
  }

  /**
   * The resource type is checked to ensure that it is supported first.
   * If it's not supported, the resource type is not added and does not throw any Error.
   *
   * @inheritDoc
   */
  push(data, entityOptions = {}, options = {}) {
    if (!SUPPORTED_RESOURCE_TYPES.includes(data?.slug)) {
      return;
    }
    super.push(data, entityOptions, options);
  }
}

export default ResourceTypesCollection;
