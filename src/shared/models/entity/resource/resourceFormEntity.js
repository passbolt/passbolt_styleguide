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
  RESOURCE_TYPE_V5_TOTP_SLUG
} from "../resourceType/resourceTypeSchemasDefinition";

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
   * Note: This function sets secret association properties if a secret dto is present. Not supported:
   *   - create empty secret according to the resource type
   * @param {object} [options] Options
   *
   * @throws {Error} If no secret entity class has been found.
   */
  createAssociations(options = {}) {
    if (this._props.resource_type_id && options.resourceTypes instanceof ResourceTypesCollection) {
      this.resourceTypes = options.resourceTypes;
      if (this._props.secret) {
        const secretEntityClass = this.getSecretEntityClassByResourceType(this._props.resource_type_id);
        if (!secretEntityClass) {
          throw new Error(`No secret association class has been found in resource types.`);
        }
        this._secret = new secretEntityClass(this._props.secret);
        delete this._props.secret;
      }
    }
    super.createAssociations(options);
  }

  /**
   * Get the secret entity class by resource type id
   * @param {string} resourceTypeId
   * @private
   */
  getSecretEntityClassByResourceType(resourceTypeId) {
    const resourceType = this.resourceTypes.getFirstById(resourceTypeId);
    switch (resourceType.slug) {
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

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
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
      result.metadata = this.metadata.toDto();
    }
    if (this._secret) {
      result.secret = this.secret.toDto();
    }

    return result;
  }
}

export default ResourceFormEntity;
