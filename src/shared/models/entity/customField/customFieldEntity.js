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
 * @since         5.3.0
 */

import EntityV2 from "../abstract/entityV2";
import EntityValidationError from "../abstract/entityValidationError";
import {v4 as uuidv4} from "uuid";

export const CUSTOM_FIELD_TYPE = {
  TEXT: "text",
  PASSWORD: "password",
  BOOLEAN: "boolean",
  NUMBER: "number",
  URI: "uri",
};

const CUSTOM_FIELD_TEXT_MAX_LENGTH = 5000;
const CUSTOM_FIELD_PASSWORD_MAX_LENGTH = 4096;
const CUSTOM_FIELD_URI_MAX_LENGTH = 1024;

class CustomFieldEntity extends EntityV2 {
  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "id",
        "type",
      ],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        type: {
          type: "string",
          enum: [CUSTOM_FIELD_TYPE.TEXT, CUSTOM_FIELD_TYPE.PASSWORD, CUSTOM_FIELD_TYPE.BOOLEAN, CUSTOM_FIELD_TYPE.NUMBER, CUSTOM_FIELD_TYPE.URI],
        },
        metadata_key: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        metadata_value: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "number",
            },
            {
              type: "boolean",
            },
          ],
          nullable: true,
        },
        secret_key: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        secret_value: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "number",
            },
            {
              type: "boolean",
            },
          ],
          nullable: true,
        },
      }
    };
  }

  /**
   * @inheritdoc
   */
  validateBuildRules() {
    let validationError;

    const {metadata_key, metadata_value, secret_key, secret_value, type} = this._props;
    const isMetadataKeyDefined = typeof metadata_key !== "undefined" && metadata_key !== null;
    const isSecretKeyDefined = typeof secret_key !== "undefined" && secret_key !== null;
    if (!isMetadataKeyDefined && !isSecretKeyDefined) {
      validationError = new EntityValidationError();
      validationError.addError("key", "metadata_key-secret_key", "The custom field key should be defined in either the metadata_key or the secret_key");
    }

    if (isMetadataKeyDefined && isSecretKeyDefined) {
      validationError = validationError || new EntityValidationError();
      validationError.addError("key", "metadata_key-secret_key", "The custom field key should be defined in only one of either the metadata_key or the secret_key");
    }

    const isMetadataValueDefined = typeof metadata_value !== "undefined" && metadata_value !== null;
    const isSecretValueDefined = typeof secret_value !== "undefined" && secret_value !== null;
    if (!isMetadataValueDefined && !isSecretValueDefined) {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "metadata_value-secret_value", "The custom field value should be defined in either the metadata_value or the secret_value");
    }

    if (isMetadataValueDefined && isSecretValueDefined) {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "metadata_value-secret_value", "The custom field value should be defined in only one of either the metadata_value or the secret_value");
    }

    if (isSecretKeyDefined && isMetadataValueDefined) {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "secret_key-metadata_value", "The custom field value should not be set in metadata_value if the ket is defined in the secret_key");
    }

    const value = secret_value ?? metadata_value;
    if (typeof value !== "string" && (type === CUSTOM_FIELD_TYPE.TEXT || type === CUSTOM_FIELD_TYPE.PASSWORD || type === CUSTOM_FIELD_TYPE.URI)) {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "value-type", "The type and the value type should match");
    } else if (type === CUSTOM_FIELD_TYPE.NUMBER && typeof value !== "number") {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "value-type", "The type and the value type should match");
    } else if (type === CUSTOM_FIELD_TYPE.BOOLEAN && typeof value !== "boolean") {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "value-type", "The type and the value type should match");
    } else if (type === CUSTOM_FIELD_TYPE.TEXT && value.length > 5000) {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "maxLength", `The length of the value should not exceed ${CUSTOM_FIELD_TEXT_MAX_LENGTH} characters`);
    } else if (type === CUSTOM_FIELD_TYPE.PASSWORD && value.length > 4096) {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "maxLength", `The length of the value should not exceed ${CUSTOM_FIELD_PASSWORD_MAX_LENGTH} characters`);
    } else if (type === CUSTOM_FIELD_TYPE.URI && value.length > 1024) {
      validationError = validationError || new EntityValidationError();
      validationError.addError("value", "maxLength", `The length of the value should not exceed ${CUSTOM_FIELD_URI_MAX_LENGTH} characters`);
    }

    if (validationError) {
      throw validationError;
    }
  }

  /**
   * Returns the key of the custom field.
   * @returns {string}
   */
  get key() {
    return this._props.metadata_key ?? this._props.secret_key;
  }

  /**
   * Returns the value of the custom field.
   * @returns {string|number|boolean}
   */
  get value() {
    return this._props.secret_value ?? this._props.metadata_value;
  }

  /**
   * Returns a CustomFieldEntity with default data set.
   * @param {object} data
   * @returns {CustomFieldEntity}
   * @static
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      id: data.id || uuidv4(),
      type: CUSTOM_FIELD_TYPE.TEXT,
      metadata_key: "",
      secret_value: "",
      ...data,
    };
    return new CustomFieldEntity(defaultData);
  }

  /**
   * Returns true if both parameters are different
   * @param {CustomFieldEntity} a
   * @param {CustomFieldEntity} b
   * @returns {boolean}
   * @throws {TypeError} if one of the given parameters is not of type CustomFieldEntity
   */
  static areFieldsDifferent(a, b) {
    if (!(a instanceof CustomFieldEntity) || !(b instanceof CustomFieldEntity)) {
      throw new TypeError("Both paramerters must be of type CustomFieldEntity");
    }

    return a._props.id !== b._props.id
      || a._props.type !== b._props.type
      || a._props.metadata_key !== b._props.metadata_key
      || a._props.metadata_value !== b._props.metadata_value
      || a._props.secret_key !== b._props.secret_key
      || a._props.secret_value !== b._props.secret_value;
  }

  /**
   * Returns true if the key and the value is empty;
   * @returns {boolean}
   */
  isEmpty() {
    return !this.key && !this.value;
  }
}

export default CustomFieldEntity;
