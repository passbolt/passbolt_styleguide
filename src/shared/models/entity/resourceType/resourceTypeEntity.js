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
 * @since         3.0.0
 */
import EntityV2 from "../../entity/abstract/entityV2";
import EntitySchema from "../abstract/entitySchema";
import {RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5} from "../metadata/metadataTypesSettingsEntity";
import ResourceTypeSchemasDefinition, {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG, RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG, RESOURCE_TYPE_V5_TOTP_SLUG, RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG
} from "./resourceTypeSchemasDefinition";

const RESOURCE_TYPE_NAME_MAX_LENGTH = 255;
const RESOURCE_TYPE_SLUG_MAX_LENGTH = 64;
const RESOURCE_TYPE_DESCRIPTION_MAX_LENGTH = 255;

export const PASSWORD_RESOURCE_TYPES = [
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG
];

export const TOTP_RESOURCE_TYPES = [
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
];

export const STANDALONE_TOTP_RESOURCE_TYPES = [
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
];

export const PASSWORD_STRING_RESOURCE_TYPES = [
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG
];

export const SECRET_DESCRIPTION_RESOURCE_TYPES = [
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG
];

export const METADATA_DESCRIPTION_RESOURCE_TYPES = [
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG,
  RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG
];

export const CUSTOM_FIELDS_RESOURCE_TYPES = [
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG
];

class ResourceTypeEntity extends EntityV2 {
  /**
   * @inheritdoc
   */
  marshall() {
    if (typeof this._props.slug !== "string" || !(this._props.slug in ResourceTypeSchemasDefinition.SCHEMAS)) {
      //if the slug is not suppported or invalid, we ensure the validation fails on `definition`.
      delete this._props.definition;
      return;
    }

    const resourceTypeDefinitionSchema = ResourceTypeSchemasDefinition.SCHEMAS[this._props.slug];
    const definition = Object.assign({}, resourceTypeDefinitionSchema);
    this._props.definition = definition;
  }

  /**
   * Get resource type entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "id",
        "name",
        "slug",
        "definition",
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "maxLength": RESOURCE_TYPE_NAME_MAX_LENGTH
        },
        "slug": {
          "type": "string",
          "minLength": 1,
          "maxLength": RESOURCE_TYPE_SLUG_MAX_LENGTH
        },
        "definition": {
          "type": "object"
        },
        "description": {
          "type": "string",
          "maxLength": RESOURCE_TYPE_DESCRIPTION_MAX_LENGTH,
          "nullable": true,
        },
        "resources_count": {
          "type": "integer",
        },
        "created": {
          "type": "string",
          "format": "date-time"
        },
        "modified": {
          "type": "string",
          "format": "date-time"
        },
        "deleted": {
          "type": "string",
          "format": "date-time",
          "nullable": true,
        }
      }
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get resource type id
   * @returns {string} uuid
   */
  get id() {
    return this._props.id;
  }

  /**
   * Get resource type slug
   * @returns {string} slug
   */
  get slug() {
    return this._props.slug;
  }

  /**
   * Get resource type definition (JSON compatible schema)
   * @returns {object} definition
   */
  get definition() {
    return this._props.definition;
  }

  /**
   * Get the resources count
   * @returns {integer|null}
   */
  get resourcesCount() {
    return this._props.resources_count || null;
  }

  /**
   * Set the deleted property
   * @param {string|null} deleted
   */
  set deleted(deleted) {
    const propSchema = ResourceTypeEntity.getSchema().properties.deleted;
    if (propSchema?.nullable && deleted === null) {
      this._props.deleted = deleted;
      return;
    }

    EntitySchema.validateProp("deleted", deleted, propSchema);
    this._props.deleted = deleted;
  }

  /**
   * Has totp
   * @returns {boolean}
   */
  hasTotp() {
    return TOTP_RESOURCE_TYPES.includes(this.slug);
  }

  /**
   * Has password
   * @returns {boolean}
   */
  hasPassword() {
    return PASSWORD_RESOURCE_TYPES.includes(this.slug);
  }

  /**
   * Has custom fields
   * @returns {boolean}
   */
  hasCustomFields() {
    return CUSTOM_FIELDS_RESOURCE_TYPES.includes(this.slug);
  }

  /**
   * Is standalone totp
   * @returns {boolean}
   */
  isStandaloneTotp() {
    return STANDALONE_TOTP_RESOURCE_TYPES.includes(this.slug);
  }

  /**
   * Is password string
   * @returns {boolean}
   */
  isPasswordString() {
    return PASSWORD_STRING_RESOURCE_TYPES.includes(this.slug);
  }

  /**
   * Has secret description
   * @returns {boolean}
   */
  hasSecretDescription() {
    return SECRET_DESCRIPTION_RESOURCE_TYPES.includes(this.slug);
  }

  /**
   * Has metadata description
   * @returns {boolean}
   */
  hasMetadataDescription() {
    return METADATA_DESCRIPTION_RESOURCE_TYPES.includes(this.slug);
  }

  /**
   * return the resource type version
   * @returns {string}
   */
  get version() {
    return this.slug.startsWith("v5") ? RESOURCE_TYPE_VERSION_5 : RESOURCE_TYPE_VERSION_4;
  }

  /**
   * Is v5 version
   * @returns {boolean}
   */
  isV5() {
    return this.version === RESOURCE_TYPE_VERSION_5;
  }

  /**
   * Is v4 version
   * @returns {boolean}
   */
  isV4() {
    return this.version === RESOURCE_TYPE_VERSION_4;
  }

  /**
   * Is resource type deleted
   * @returns {boolean}
   */
  isDeleted() {
    return typeof(this._props.deleted) !== "undefined"
      && this._props.deleted !== null;
  }
}

export default ResourceTypeEntity;
