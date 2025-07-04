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
 * @since         4.10.0
 */
import EntityV2 from "../../abstract/entityV2";
import IconEntity from "./IconEntity";
import CustomFieldsCollection from "../../customField/customFieldsCollection";

const ENTITY_NAME = 'ResourceMetadataEntity';
const RESOURCE_NAME_MAX_LENGTH = 255;
const RESOURCE_USERNAME_MAX_LENGTH = 255;
const RESOURCE_URI_MAX_LENGTH = 1024;
const RESOURCE_DESCRIPTION_MAX_LENGTH = 10000;
const METADATA_OBJECT_TYPE = "PASSBOLT_RESOURCE_METADATA";

class ResourceMetadataEntity extends EntityV2 {
  /**
   * Get resource metadata entity schema
   * @throws TypeError unsupported
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "name",
        "resource_type_id"
      ],
      "properties": {
        "object_type": {
          "type": "string",
          "enum": [METADATA_OBJECT_TYPE]
        },
        "resource_type_id": {
          "type": "string",
          "format": "uuid"
        },
        "name": {
          "type": "string",
          "maxLength": RESOURCE_NAME_MAX_LENGTH
        },
        "username": {
          "type": "string",
          "maxLength": RESOURCE_USERNAME_MAX_LENGTH,
          "nullable": true,
        },
        "uris": {
          "type": "array",
          "items": {
            "type": "string",
            "maxLength": RESOURCE_URI_MAX_LENGTH
          }
        },
        "description": {
          "type": "string",
          "maxLength": RESOURCE_DESCRIPTION_MAX_LENGTH,
          "nullable": true,
        },
        "icon": IconEntity.getSchema(),
        "custom_fields": CustomFieldsCollection.getSchema(),
      },
    };
  }

  /**
   * @inheritDoc
   * @returns {{icon: IconEntity, custom_fields: CustomFieldsCollection}}
   */
  static get associations() {
    return {
      icon: IconEntity,
      custom_fields: CustomFieldsCollection,
    };
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  /**
   * Return a DTO ready to be sent to API or content code
   *
   * @param {object} [contain] optional
   * @returns {object}
   */
  toDto(contain) {
    const result = Object.assign({}, this._props);
    if (!contain) {
      return result;
    }

    if (this._icon && contain.icon) {
      result.icon = this._icon.toDto();
    }

    if (this._customFields && contain.custom_fields) {
      result.custom_fields = this._customFields.toDto();
    }
    return result;
  }

  /**
   * @inheritdoc
   */
  createAssociations(options = {}) {
    if (!this._props.icon) {
      super.createAssociations(options);
      return;
    }

    try {
      this._icon = new IconEntity(this._props.icon, options);
    } catch (e) {
      /*
       * The error is not thrown to avoid breaking the app because of the icon.
       * The app will use default data instead for the icons.
       */
      console.warn("The associated icon entity could not be set.", e);
    }

    delete this._props.icon;
    super.createAssociations(options);
  }

  /**
   * Get resource metadata object type
   * @returns {string|null} ResourceMetadataEntity.METADATA_OBJECT_TYPE
   */
  get objectType() {
    return this._props.object_type || null;
  }

  /**
   * Get resource metadata name
   * @returns {string} admin or user
   */
  get name() {
    return this._props.name;
  }

  /**
   * Get resource metadata username
   * @returns {string} username
   */
  get username() {
    return this._props.username;
  }

  /**
   * Get resource metadata description
   * @returns {(string|null)} description
   */
  get description() {
    return this._props.description || null;
  }

  /**
   * Get the resource type if any
   * @returns {(string)} uuid
   */
  get resourceTypeId() {
    return this._props.resource_type_id;
  }

  /**
   * Returns the resource metadata uris
   */
  get uris() {
    return this._props.uris || [];
  }

  /**
   * Returns the icon associated entity
   * @returns {IconEntity|null}
   */
  get icon() {
    return this._icon || null;
  }

  /**
   * Returns the custom fields associated collection
   * @returns {CustomFieldsCollection|null}
   */
  get customFields() {
    return this._customFields || null;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * ResourceMetadataEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * ResourceMetadataEntity.METADATA_OBJECT_TYPE
   * @returns {string}
   */
  static get METADATA_OBJECT_TYPE() {
    return METADATA_OBJECT_TYPE;
  }

  /**
   * ResourceMetadataEntity.URI_MAX_LENGTH
   * @returns {number}
   */
  static get URI_MAX_LENGTH() {
    return RESOURCE_URI_MAX_LENGTH;
  }

  /**
   * ResourceMetadataEntity.DEFAULT_CONTAIN
   * @return {object}
   */
  static get DEFAULT_CONTAIN() {
    return {
      icon: true,
      custom_fields: true,
    };
  }
}

export default ResourceMetadataEntity;
