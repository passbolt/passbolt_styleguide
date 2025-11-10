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
 * @since         4.10.1
 */
import EntityV2 from "../abstract/entityV2";
import SessionKeysBundleDataEntity from "./sessionKeysBundleDataEntity";
import EntityValidationError from "../abstract/entityValidationError";
import EntitySchema from "../abstract/entitySchema";

const PGP_STRING_MAX_LENGTH = 10_000_000;

class SessionKeysBundleEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.data && typeof this._props.data !== 'string') {
      this._data = new SessionKeysBundleDataEntity(this._props.data, {...options, clone: false});
      delete this._props.data;
    }
  }
  /**
   * Get session keys bundle entity schema
   * @throws TypeError unsupported
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "data",
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        "user_id": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        "created": {
          "type": "string",
          "format": "date-time",
          "nullable": true,
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "nullable": true,
        },
        "created_by": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        // Associated models
        "data": {"anyOf": [
          {
            "type": "string",
            "maxLength": PGP_STRING_MAX_LENGTH,
            "pattern": /^-----BEGIN PGP MESSAGE-----\r?\n((?:[!-9;-~]+:\s?.*\r?\n)*\r?\n)((?:[A-Za-z0-9+/]{1,76}\r?\n)*)([A-Za-z0-9+/]{1,76}={0,2}\r?\n)(=[A-Za-z0-9+/]{4}\r?\n)-----END PGP MESSAGE-----\s*$/
          },
          SessionKeysBundleDataEntity.getSchema()
        ]},
      },
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

  /*
   * ==================================================
   * Getters
   * ==================================================
   */
  /**
   * Get session keys bundle id
   * @returns {(string|null)} uuid
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get session keys bundle data
   * @returns {(SessionKeysBundleDataEntity|string)}
   */
  get data() {
    return this.isDecrypted ? this._data : this._props.data;
  }

  /**
   * Get user id
   * @returns {string | null}
   */
  get userId() {
    return this._props.user_id || null;
  }

  /**
   * Get modified
   * @returns {string | null}
   */
  get modified() {
    return this._props.modified || null;
  }

  /*
   * ==================================================
   * Setters
   * ==================================================
   */
  /**
   * Set data
   * @param {SessionKeysBundleDataEntity|object|string} data
   */
  set data(data) {
    if (data instanceof SessionKeysBundleDataEntity) {
      this._data = new SessionKeysBundleDataEntity(data.toDto(), {validate: false});
      delete this._props.data;
    } else if (typeof data === "object") {
      this._data = new SessionKeysBundleDataEntity(data);
      delete this._props.data;
    } else {
      EntitySchema.validateProp("data", data, SessionKeysBundleEntity.getSchema().properties.data.anyOf[0]);
      this._props.data = data;
      delete this._data;
    }
  }

  /*
   * ==================================================
   * Other associated properties methods
   * ==================================================
   */
  /**
   * Check if the data is decrypted.
   * @returns {boolean}
   */
  get isDecrypted() {
    return Boolean(this._data);
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  /**
   * Return a DTO ready to be sent to API
   *
   * @returns {object}
   */
  toDto() {
    const result = Object.assign({}, this._props);
    result.data = result.data || this._data.toDto();
    return result;
  }
}

export default SessionKeysBundleEntity;
