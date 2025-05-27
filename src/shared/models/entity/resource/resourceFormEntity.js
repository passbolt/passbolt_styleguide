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
 * @since         5.0.0
 */
import EntityV2 from "../abstract/entityV2";
import ResourceMetadataEntity from "./metadata/resourceMetadataEntity";
import SecretDataV4DefaultEntity from "../secretData/secretDataV4DefaultEntity";
import SecretDataV5DefaultEntity from "../secretData/secretDataV5DefaultEntity";
import SecretDataV5DefaultTotpEntity from "../secretData/secretDataV5DefaultTotpEntity";
import SecretDataV5StandaloneTotpEntity from "../secretData/secretDataV5StandaloneTotpEntity";
import SecretDataV5PasswordStringEntity from "../secretData/secretDataV5PasswordStringEntity";
import SecretDataV4DefaultTotpEntity from "../secretData/secretDataV4DefaultTotpEntity";
import SecretDataV4StandaloneTotpEntity from "../secretData/secretDataV4StandaloneTotpEntity";
import SecretDataV4PasswordStringEntity from "../secretData/secretDataV4PasswordStringEntity";
import SecretDataEntity from "../secretData/secretDataEntity";
import ResourceTypesCollection from "../resourceType/resourceTypesCollection";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG,
  V4_TO_V5_RESOURCE_TYPE_MAPPING
} from "../resourceType/resourceTypeSchemasDefinition";
import assertString from "validator/es/lib/util/assertString";
import {ResourceEditCreateFormEnumerationTypes} from "../../resource/ResourceEditCreateFormEnumerationTypes";
import EntityValidationError from "../abstract/entityValidationError";

class ResourceFormEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  constructor(dtos = {}, options = {}) {
    super(dtos, options);
  }

  /**
   *  @inheritDoc
   * @returns {{metadata: ResourceMetadataEntity, secret: SecretDataEntity}}
   */
  static get associations() {
    return {
      metadata: ResourceMetadataEntity,
      secret: SecretDataEntity
    };
  }

  /**
   * Get resource entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "metadata",
        "resource_type_id",
        "secret"
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "resource_type_id": {
          "type": "string",
          "format": "uuid"
        },
        "folder_parent_id": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        "expired": {
          "type": "string",
          "format": "date-time",
          "nullable": true,
        },
        // Associated models
        "metadata": ResourceMetadataEntity.getSchema(),
        "secret": {"anyOf": [
          SecretDataV5DefaultEntity.getSchema(),
          SecretDataV5DefaultTotpEntity.getSchema(),
          SecretDataV5StandaloneTotpEntity.getSchema(),
          SecretDataV5PasswordStringEntity.getSchema(),
          SecretDataV4DefaultEntity.getSchema(),
          SecretDataV4DefaultTotpEntity.getSchema(),
          SecretDataV4StandaloneTotpEntity.getSchema(),
          SecretDataV4PasswordStringEntity.getSchema()
        ]},
      }
    };
  }

  /**
   * Create the association entity: its schema and its build rules.
   * Only for secret association get the entity class according the resource type
   *
   * Note:
   *  - This function sets secret association properties if a secret dto is present. (In that case it's possible to have null or undefined property. This is useful for edition and validation)
   *  - This function will create default secret if there is no secret (This is useful for the creation)
   *
   * @param {object} [options] Options
   *
   * @throws {Error} If no secret entity class has been found.
   */
  createAssociations(options = {}) {
    const validationErrors = new EntityValidationError();

    if (this._props.resource_type_id && options.resourceTypes instanceof ResourceTypesCollection) {
      this.resourceTypes = options.resourceTypes;
      const resourceType = this.resourceTypes.getFirstById(this._props.resource_type_id);
      const secretEntityClass = this.getSecretEntityClassByResourceType(resourceType.slug);
      if (!secretEntityClass) {
        throw new Error(`No secret association class has been found in resource types.`);
      }
      try {
        // For editing and validation, it's important to keep null or undefined property and not set with default value
        if (this._props.secret) {
          this._secret = new secretEntityClass(this._props.secret, options);
        } else {
          this._secret = secretEntityClass.createFromDefault(this._props.secret, options);
        }
      } catch (error) {
        if (error instanceof EntityValidationError) {
          validationErrors.addAssociationError("secret", error);
        } else {
          throw error;
        }
      }

      delete this._props.secret;
    }

    try {
      super.createAssociations(options);
    } catch (error) {
      Object.assign(validationErrors.details, error.details);
    }
    // Throw error if some issues were gathered
    if (validationErrors.hasErrors()) {
      throw validationErrors;
    }
  }

  /**
   * Get the secret entity class by resource type id
   * @param {string} resourceTypeSlug
   * @private
   */
  getSecretEntityClassByResourceType(resourceTypeSlug) {
    assertString(resourceTypeSlug);
    switch (resourceTypeSlug) {
      case RESOURCE_TYPE_V5_DEFAULT_SLUG:
        return SecretDataV5DefaultEntity;
      case RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG:
        return SecretDataV5DefaultTotpEntity;
      case RESOURCE_TYPE_V5_TOTP_SLUG:
        return SecretDataV5StandaloneTotpEntity;
      case RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG:
        return SecretDataV5PasswordStringEntity;
      case RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG:
        return SecretDataV4DefaultEntity;
      case RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG:
        return SecretDataV4DefaultTotpEntity;
      case RESOURCE_TYPE_TOTP_SLUG:
        return SecretDataV4StandaloneTotpEntity;
      case RESOURCE_TYPE_PASSWORD_STRING_SLUG:
        return SecretDataV4PasswordStringEntity;
      default:
        return null;
    }
  }

  /**
   * Add secret property to the entity.
   * If secret should mutate get the entity class according the resource type
   *  - Set the new secret association
   *  - Set the resource type id
   * Finally
   *  - Set the property in the secret association
   *
   * Note: This function set secret property.
   * @param {string} secret The secret to add
   * @param {object} [options] Options
   *
   * @throws {Error} If no secret entity class has been found.
   * @throws {Error} If secret is not a string.
   */
  addSecret(secret, options) {
    assertString(secret);
    // If unknown secret do nothing
    if (!Object.values(ResourceEditCreateFormEnumerationTypes).includes(secret)) {
      return;
    }
    // Get the current resource type
    const currentResourceType = this.resourceTypes.getFirstById(this.resourceTypeId);
    // Get the string behind "secret." (secret.password.test => password.test)
    const secretPropName = secret.match(/secret\.(.+)$/)?.[1];
    // Verify if the current resource type has the secret property
    if (!this.isResourceTypeHasSecretProperty(currentResourceType, secret)) {
      const resourceDto = this.toDto();
      // Set an empty value to have the property defined and find the matching resource type (Will be set with a default value later)
      resourceDto.secret[secretPropName] = "";
      // Get the resource type slug to mutate when adding secret
      const mutateResourceType = this.resourceTypes.getResourceTypeMatchingResource(resourceDto, currentResourceType.version);
      // Get the secret entity class associate
      const secretEntityClass = this.getSecretEntityClassByResourceType(mutateResourceType.slug);
      if (!secretEntityClass) {
        throw new Error(`No secret association class has been found in resource types.`);
      }
      // Set the secret with the actual secret data
      this.set("secret", new secretEntityClass(this.secret.toDto(), {validate: false}));
      // If current resource type is V4 and password string
      if (currentResourceType.isV4() && currentResourceType.isPasswordString()) {
        // Set the secret description with the metadata description
        this.set("secret.description", this.metadata?.description || "", options);
        // Set the metadata description with empty value
        this.set("metadata.description", null, options);
      }

      // Set the resource type id
      this.set("resource_type_id", mutateResourceType.id);
      this.set("metadata.resource_type_id", mutateResourceType.id);
    }
    // Set the secret to add
    this.set(secret, this.secret.constructor.getDefaultProp(secretPropName), options);
  }

  /**
   * Delete secret property to the entity.
   * - Delete the property in the secret association
   * If secret should mutate get the entity class according the resource type
   *  - Set the new secret association
   *  - Set the resource type id
   *
   * Note: This function set secret property.
   * @param {string} secret The secret to delete
   * @param {object} [options] Options
   *
   * @throws {Error} If no secret entity class has been found.
   * @throws {Error} If secret is not a string.
   */
  deleteSecret(secret, options) {
    assertString(secret);
    // If unknown secret do nothing
    if (!Object.values(ResourceEditCreateFormEnumerationTypes).includes(secret)) {
      return;
    }
    // Get the string behind a "secret." (secret.password => password and secret.password.test => password.test)
    const secretPropName = secret.match(/secret\.(.+)$/)?.[1];
    // Delete the secret property
    const resourceDto = this.toDto();
    delete resourceDto.secret[secretPropName];
    // Get the current resource type
    const currentResourceType = this.resourceTypes.getFirstById(this.resourceTypeId);
    // Get the resource type slug to mutate when deleting secret
    const mutateResourceType = this.resourceTypes.getResourceTypeMatchingResource(resourceDto, currentResourceType.version);
    if (currentResourceType.id !== mutateResourceType.id) {
      // Get the secret entity class associate
      const secretEntityClass = this.getSecretEntityClassByResourceType(mutateResourceType.slug);
      if (!secretEntityClass) {
        throw new Error(`No secret association class has been found in resource types.`);
      }
      // Set the secret with the new secret data
      this.set("secret", new secretEntityClass(resourceDto.secret, options));
      // Set the resource type id
      this.set("resource_type_id", mutateResourceType.id);
      this.set("metadata.resource_type_id", mutateResourceType.id);
    } else {
      // Set the secret with the new secret data
      this.set("secret", new this._secret.constructor(resourceDto.secret, options));
    }
  }

  /**
   * Convert metadata description to note and resource type to V4 password and description encrypted
   * @param {object} [options] Options
   *
   * @throws {Error} If no secret entity class has been found.
   */
  convertToNote(options) {
    const resourceType = this.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    const secretEntityClass = this.getSecretEntityClassByResourceType(resourceType?.slug);
    if (!secretEntityClass) {
      throw new Error(`No secret association class has been found in resource types.`);
    }
    // Set the secret with the new secret data
    this.set("secret", new secretEntityClass(this.secret.toDto(), options));
    // Set the secret description with the metadata description
    this.set("secret.description", this.metadata?.description || "", options);
    // Set the metadata description with empty value
    this.set("metadata.description", null, options);
    // Set the resource type id
    this.set("resource_type_id", resourceType.id);
    this.set("metadata.resource_type_id", resourceType.id);
  }

  /**
   * Convert note to metadata description and resource type to V4 password string
   * @param {object} [options] Options
   *
   * @throws {Error} If no secret entity class has been found.
   */
  convertToMetadataDescription(options) {
    const resourceType = this.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_STRING_SLUG);
    const secretEntityClass = this.getSecretEntityClassByResourceType(resourceType?.slug);
    if (!secretEntityClass) {
      throw new Error(`No secret association class has been found in resource types.`);
    }
    // Set the metadata description with the secret description
    this.set("metadata.description", this.secret?.description || "", options);
    // Set the secret description with empty value
    this.set("secret.description", null, options);
    // Set the secret with the new secret data
    this.set("secret", new secretEntityClass(this.secret.toDto(), options));
    // Set the resource type id
    this.set("resource_type_id", resourceType.id);
    this.set("metadata.resource_type_id", resourceType.id);
  }

  /**
   * Is resource type has secret property
   * @param {ResourceTypeEntity} resourceType The resource type
   * @param {string} secretProp The secret property
   * @returns {boolean}
   */
  isResourceTypeHasSecretProperty(resourceType, secretProp) {
    assertString(secretProp);
    switch (secretProp) {
      case ResourceEditCreateFormEnumerationTypes.PASSWORD:
        return resourceType.hasPassword();
      case ResourceEditCreateFormEnumerationTypes.TOTP:
        return resourceType.hasTotp();
      case ResourceEditCreateFormEnumerationTypes.NOTE:
        return resourceType.hasSecretDescription();
      default:
        return false;
    }
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get resource type id
   * @returns {string} resource type id
   */
  get resourceTypeId() {
    return this._props.resource_type_id;
  }

  /**
   * Get resource form metadata
   * @returns {ResourceMetadataEntity} metadata
   */
  get metadata() {
    return this._metadata;
  }

  /**
   * Get resource form secret
   * @returns {SecretDataEntity} secret
   */
  get secret() {
    return this._secret;
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  /**
   * @inheritDoc
   */
  toDto() {
    const result = Object.assign({}, this._props);

    if (this._metadata) {
      result.metadata = this.metadata.toDto(ResourceMetadataEntity.DEFAULT_CONTAIN);
    }
    if (this._secret) {
      result.secret = this.secret.toDto();
    }

    return result;
  }

  /**
   * To resource DTO
   * @returns {*}
   */
  toResourceDto() {
    const result = Object.assign({}, this._props);

    if (this._metadata) {
      result.metadata = this.metadata.toDto(ResourceMetadataEntity.DEFAULT_CONTAIN);
    }

    return result;
  }

  /**
   * To secret DTO
   * @returns {*|null}
   */
  toSecretDto() {
    if (this._secret) {
      return this.secret.toDto();
    }
    return null;
  }

  /**
   * Verifies data integrity to inform users if fields exceed their maximum allowed size
   * @return {EntityValidationError|null} Validation errors or null if no errors are detected
   */
  verifyHealth() {
    let validationError = null;

    // Verify secret data
    if (this.secret) {
      validationError = this.validateMaxLengthAgainstSchema(
        this.secret.toDto(),
        this.secret,
        validationError
      );
      // Verify secret totp association
      if (this.secret.totp) {
        validationError = this.validateMaxLengthAgainstSchema(
          this.secret.totp.toDto(),
          this.secret.totp,
          validationError
        );
      }
    }
    // Verify metadata
    if (this.metadata) {
      validationError = this.validateMaxLengthAgainstSchema(
        this.metadata.toDto(ResourceMetadataEntity.DEFAULT_CONTAIN),
        this.metadata,
        validationError
      );
    }

    return validationError;
  }

  /**
   * Validates maxLength fields against a given schema
   * @param {Object} dataObject - The association or properties to validate
   * @param {Entity} entity - The entity
   * @param {EntityValidationError|null} currentError - The existing error object or null
   * @return {EntityValidationError|null} The updated or unchanged error object
   * @private
   */
  validateMaxLengthAgainstSchema(dataObject, entity, currentError) {
    let error = currentError;
    Object.entries(dataObject).forEach(([fieldName, fieldValue]) => {
      const fieldSchema = entity.constructor.getSchema().properties[fieldName];

      if (!fieldSchema) { return; }
      if (fieldSchema.type === "array" && Array.isArray(fieldValue)) {
      // Validate array elements
        const maxItemLength = fieldSchema.items?.maxLength;
        if (typeof maxItemLength !== "undefined") {
          fieldValue.forEach((value, index) => {
            if (value?.length >= maxItemLength) {
              error = error || new EntityValidationError();
              error.addError(
                `${fieldName}.${index}`,
                "maxLength",
                `${fieldName} at index ${index} exceeds maximum length limit`
              );
            }
          });
        }
      } else {
      // Validate simple fields
        const maxLength = fieldSchema.maxLength;
        if (typeof maxLength !== "undefined" && fieldValue?.length >= maxLength) {
          error = error || new EntityValidationError();
          error.addError(
            fieldName,
            "maxLength",
            `${fieldName} exceeds maximum length limit`
          );
        }
      }
    });
    return error;
  }

  /**
   * @inheritdoc
   */
  validate(options = {}) {
    const validationErrors = super.validate(Object.assign(
      options,
      {
        skipSchemaAssociationValidation: true
      }
    ));
    return validationErrors;
  }

  /**
   * Remove empty secret
   * @param {object} [options] Options
   *
   * Note: This function remove only empty Totp on:
   * V4:
   *  - password, description and Totp
   * V5:
   *  - DefaultTotp
   *
   * Not supported:
   *   - Other resource type
   */
  removeEmptySecret(options) {
    //If totp has no value then remove it
    if (this.secret instanceof SecretDataV4DefaultTotpEntity || this.secret instanceof SecretDataV5DefaultTotpEntity) {
      if (!this.secret.totp.hasSecretKey) {
        this.deleteSecret(ResourceEditCreateFormEnumerationTypes.TOTP, options);
      }
    }
  }

  /**
   * Add required secret
   * @param {object} [options] Options
   *
   * Note: This function add password on:
   * V4:
   *  - password and description if not set add empty password
   * V5:
   *  - Default if password is not set add null password
   *
   * Not supported:
   *   - Other resource type
   */
  addRequiredSecret(options) {
    const resourceType = this.resourceTypes.getFirstById(this._props.resource_type_id);
    if (resourceType.hasPassword() && this.secret.password == null) {
      if (resourceType.isV5()) {
        this.secret.set("password", null, options);
      } else if (resourceType.isV4()) {
        this.secret.set("password", "", options);
      }
    }
  }

  /**
   * Upgrade resource v4 to resource v5
   * @returns {void}
   */
  upgradeToV5() {
    const resourceType = this.resourceTypes.getFirstById(this.resourceTypeId);
    const v5ResourceTypeSlug = V4_TO_V5_RESOURCE_TYPE_MAPPING[resourceType?.slug];
    //Do nothing if slug cannot be found
    if (v5ResourceTypeSlug) {
      const v5ResourceType = this.resourceTypes.getFirstBySlug(v5ResourceTypeSlug);
      this.set("resource_type_id", v5ResourceType.id);
      this.set("metadata.resource_type_id", v5ResourceType.id);
      this.set("metadata.object_type", ResourceMetadataEntity.METADATA_OBJECT_TYPE);
    }
  }

  /**
   * @inheritdoc
   */
  marshall() {
    if (!this._props.metadata) {
      this._props.metadata = {
        resource_type_id: this._props.resource_type_id,
        name: "",
        uris: [],
        object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
      };
    }
  }
}

export default ResourceFormEntity;
