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

const CUSTOM_FIELD_TYPE = {
  TEXT: "text",
  PASSWORD: "password",
  BOOLEAN: "boolean",
  NUMBER: "number",
  URI: "uri",
};

const CUSTOM_FIELD_TEXT_MAX_LENGTH = 5000;
const CUSTOM_FIELD_PASSWORD_MAX_LENGTH = 4096;

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
    let validataionError;

    if (!this._props.metadata_key && !this._props.secret_key) {
      validataionError = new EntityValidationError();
      validataionError.addError("key", "metadata_key-secret_key", "The custom field key should be defined in either the metadata_key or the secret_key");
    }

    if (this._props.metadata_key && this._props.secret_key) {
      validataionError = validataionError || new EntityValidationError();
      validataionError.addError("key", "metadata_key-secret_key", "The custom field key should be defined in only one of either the metadata_key or the secret_key");
    }

    if (!this._props.metadata_value && !this._props.secret_value) {
      validataionError = validataionError || new EntityValidationError();
      validataionError.addError("value", "metadata_value-secret_value", "The custom field value should be defined in either the metadata_value or the secret_value");
    }

    if (this._props.metadata_value && this._props.secret_value) {
      validataionError = validataionError || new EntityValidationError();
      validataionError.addError("value", "metadata_value-secret_value", "The custom field value should be defined in only one of either the metadata_value or the secret_value");
    }

    if (this._props.secret_key && this._props.metadata_value) {
      validataionError = validataionError || new EntityValidationError();
      validataionError.addError("value", "secret_key-metadata_value", "The custom field value should not be set in metadata_value if the ket is defined in the secret_key");
    }

    const value = this._props.secret_value || this._props.metadata_value;
    if (this._props.type === CUSTOM_FIELD_TYPE.TEXT) {
      if (typeof value !== "string") {
        validataionError = validataionError || new EntityValidationError();
        validataionError.addError("value", "value-type", "The type and the value type should match");
      } else if (value.length > 5000) {
        validataionError = validataionError || new EntityValidationError();
        validataionError.addError("value", "maxLength", `The length of the value should not exceed ${CUSTOM_FIELD_TEXT_MAX_LENGTH} characters`);
      }
    } else if (this._props.type === CUSTOM_FIELD_TYPE.PASSWORD) {
      if (typeof value !== "string") {
        validataionError = validataionError || new EntityValidationError();
        validataionError.addError("value", "value-type", "The type and the value type should match");
      } else if (value.length > 4096) {
        validataionError = validataionError || new EntityValidationError();
        validataionError.addError("value", "maxLength", `The length of the value should not exceed ${CUSTOM_FIELD_PASSWORD_MAX_LENGTH} characters`);
      }
    } else if (this._props.type === CUSTOM_FIELD_TYPE.URI && typeof value !== "string") {
      validataionError = validataionError || new EntityValidationError();
      validataionError.addError("value", "value-type", "The type and the value type should match");
    } else if (this._props.type === CUSTOM_FIELD_TYPE.NUMBER && typeof value !== "number") {
      validataionError = validataionError || new EntityValidationError();
      validataionError.addError("value", "value-type", "The type and the value type should match");
    } else if (this._props.type === CUSTOM_FIELD_TYPE.BOOLEAN && typeof value !== "boolean") {
      validataionError = validataionError || new EntityValidationError();
      validataionError.addError("value", "value-type", "The type and the value type should match");
    }

    if (validataionError) {
      throw validataionError;
    }
  }

  /**
   * Returns the value of the custom field.
   * @returns {string|number|boolean}
   */
  get value() {
    return this._props.secret_value || this._props.metadata_value;
  }
}

export default CustomFieldEntity;
