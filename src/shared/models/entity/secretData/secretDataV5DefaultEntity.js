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

import SecretDataEntity, {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";
import assertString from "validator/es/lib/util/assertString";
import CustomFieldsCollection from "../customField/customFieldsCollection";
import CustomFieldEntity from "../customField/customFieldEntity";

class SecretDataV5DefaultEntity extends SecretDataEntity {
  /**
   * Get the secret data v5 default schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "object_type",
        "password",
      ],
      "properties": {
        ...SecretDataEntity.getSchema().properties,
        "password": {
          "type": "string",
          "maxLength": 4096,
          "nullable": true
        },
        "description": {
          "type": "string",
          "maxLength": 10000,
          "nullable": true,
        },
        "custom_fields": CustomFieldsCollection.getSchema(),
      }
    };
  }

  /**
   * @inheritDoc
   */
  static get associations() {
    return {
      custom_fields: CustomFieldsCollection,
    };
  }

  /**
   * @inheritdoc
   */
  marshall() {
    // Set object type in case of secret has not object_type (example: after a migration v4 to v5)
    if (!this._props.object_type) {
      this._props.object_type = SECRET_DATA_OBJECT_TYPE;
    }
  }

  /**
   * Return the default secret data v5 default.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV5DefaultEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      object_type: SECRET_DATA_OBJECT_TYPE,
      password: "",
    };

    return new SecretDataV5DefaultEntity({...defaultData, ...data}, options);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {string | CustomFieldsCollection | undefined}
   */
  static getDefaultProp(propName) {
    assertString(propName);
    switch (propName) {
      case "password":
        return "";
      case "description":
        return "";
      case "custom_fields":
        return new CustomFieldsCollection([CustomFieldEntity.createFromDefault()]).toDto();
      default:
        return;
    }
  }

  /**
   * Are secret different
   * @param secretDto
   * @returns {boolean}
   */
  areSecretsDifferent(secretDto) {
    if (this.password !== secretDto.password || this.description !== secretDto.description) {
      return true;
    }

    const isCustomFieldDefined = typeof(this._customFields) !== "undefined" && this._customFields !== null;
    const isOtherCustomFieldDefined = typeof(secretDto.custom_fields) !== "undefined" && secretDto.custom_fields !== null;
    if (!isCustomFieldDefined && !isOtherCustomFieldDefined) {
      return false;
    }

    const otherCollection = new CustomFieldsCollection(secretDto.custom_fields, {validate: false});
    const isCustomFieldsDifferent = CustomFieldsCollection.areCollectionsDifferent(this._customFields, otherCollection);

    return isCustomFieldsDifferent;
  }

  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toDto() {
    const result = Object.assign({}, this._props);

    if (this.customFields) {
      result.custom_fields = this.customFields.toDto();
    }

    return result;
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get password
   * @returns {string} password
   */
  get password() {
    return this._props.password;
  }

  /**
   * Get description
   * @returns {string} description
   */
  get description() {
    return this._props.description;
  }

  /**
   * Get the associated custom fields collection
   * @returns {CustomFieldsCollection | null}
   */
  get customFields() {
    return this._customFields || null;
  }
}

export default SecretDataV5DefaultEntity;
