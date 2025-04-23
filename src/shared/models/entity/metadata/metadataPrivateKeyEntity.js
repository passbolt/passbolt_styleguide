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
import EntitySchema from "../abstract/entitySchema";
import EntityV2 from "../abstract/entityV2";
import EntityValidationError from "../abstract/entityValidationError";
import MetadataPrivateKeyDataEntity from "./metadataPrivateKeyDataEntity";

const PGP_STRING_MAX_LENGTH = 10_000;

class MetadataPrivateKeyEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto);

    if (this._props.data && typeof this._props.data !== 'string') {
      this._data = new MetadataPrivateKeyDataEntity(this._props.data, {...options, clone: false});
      delete this._props.data;
    }
  }

  /**
   * Get metadata private key entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "user_id",
        "data"
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        "metadata_key_id": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        "user_id": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        "data_signed_by_current_user": {
          "type": "string",
          "format": "date-time",
          "nullable": true
        },
        "data": {
          "anyOf": [{
            "type": "string",
            "maxLength": PGP_STRING_MAX_LENGTH,
            "pattern": /^-----BEGIN PGP MESSAGE-----([\r\n])([ -9;-~]{1,76}: [ -~]{1,76}([\r\n]))*\n([a-zA-Z0-9\/+=]{1,76}([\r\n]))*=[a-zA-Z0-9\/+=]{4}([\r\n])-----END PGP MESSAGE-----([\r\n]*)$/,
          }, {
            "type": "object",
          }],
        },
        "created": {
          "type": "string",
          "format": "date-time"
        },
        "created_by": {
          "type": "string",
          "format": "uuid"
        },
        "modified": {
          "type": "string",
          "format": "date-time"
        },
        "modified_by": {
          "type": "string",
          "format": "uuid"
        },
      }
    };
  }

  /**
   * @inheritDoc
   */
  validateBuildRules() {
    if (Boolean(this._props.data) && Boolean(this._data)) {
      const error = new EntityValidationError();
      const message = "The property data and _data cannot be set at the same time";
      error.addError("data", "only-one-defined", message);
      throw error;
    }
  }

  /**
   * Customizes JSON stringification behavior
   * @returns {object}
   */
  toDto() {
    const result = Object.assign({}, this._props);

    const data = this.data;
    result.data = data instanceof MetadataPrivateKeyDataEntity
      ? data.toDto()
      : data;

    return result;
  }

  /**
   * Return JSON stringification without data property
   * @returns {object}
   */
  toContentCodeConfirmTrustRequestDto() {
    const result = this.toDto();
    delete result.data;
    return result;
  }

  /**
   * Customizes JSON stringification behavior
   * @returns {object}
   */
  toJSON() {
    return this.toDto();
  }

  /**
   * @inheritdoc
   */
  marshall() {
    this._props.data_signed_by_current_user = null;
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get the raw data unencrypted if it hasn't been decrypted already.
   * @returns {string | MetadataPrivateKeyDataEntity}
   */
  get data() {
    return this.isDecrypted
      ? this._data
      : this._props.data;
  }

  /**
   * Get the metadata key id if any or null.
   * @returns {string|null}
   */
  get metadataKeyId() {
    return this._props.metadata_key_id || null;
  }

  /**
   * Returns true if the data has been decrypted already.
   * @returns {boolean}
   */
  get isDecrypted() {
    return Boolean(this._data);
  }

  /**
   * Returns the user_id
   * @returns {string}
   */
  get userId() {
    return this._props.user_id;
  }

  /**
   * Returns the data_signed_by_current_user
   * @returns {string|null}
   */
  get isDataSignedByCurrentUser() {
    return this._props.data_signed_by_current_user || null;
  }

  /*
   * ==================================================
   * Dynamic properties setters
   * ==================================================
   */

  /**
   * Set the data.
   * The data should be a MetadataPrivateKeyData or a string containing an encrypted MetadataPrivateKeyData.
   * @param {string|MetadataPrivateKeyDataEntity} data
   * @throws {EntityValidationError} if the `data` is not valid
   */
  set data(data) {
    EntitySchema.validateProp("data", data, this.cachedSchema.properties.data);

    if (typeof data === "string") {
      this._props.data = data;
      delete this._data;
    } else {
      this._data = new MetadataPrivateKeyDataEntity(data.toDto(), {clone: true, validate: false});
      delete this._props.data;
    }
  }

  /**
   * Set the data_signed_by_current_user property.
   * The value should be a date time string and can be nullable.
   * @param {string|null} value
   * @throws {EntityValidationError} if the `dataSignedByCurrentUser` is not valid
   */
  set isDataSignedByCurrentUser(value) {
    EntitySchema.validateProp("data_signed_by_current_user", value, this.cachedSchema.properties.data_signed_by_current_user);
    this._props.data_signed_by_current_user = value;
  }
}

export default MetadataPrivateKeyEntity;
