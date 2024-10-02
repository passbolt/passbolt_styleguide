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

const PGP_STRING_MAX_LENGTH = 10_000;

class MetadataPrivateKeyEntity extends EntityV2 {
  /**
   * Get metadata private key entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "user_id",
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
        },
        "data": {
          "type": "string",
          "nullable": true,
          "maxLength": PGP_STRING_MAX_LENGTH,
          "pattern": /^-----BEGIN PGP MESSAGE-----\n(.*\n)*\n([a-zA-Z0-9/+]{64}\n)*[a-zA-Z0-9/+=]{1,64}\n=[a-zA-Z0-9/+=]{4}\n-----END PGP MESSAGE-----$/m,
        },
        "armored_key": {
          "type": "string",
          "nullable": true,
          "maxLength": PGP_STRING_MAX_LENGTH,
          "pattern": /^-----BEGIN PGP PRIVATE KEY BLOCK-----\n(.*\n)*\n([a-zA-Z0-9/+]{64}\n)*[a-zA-Z0-9/+=]{1,64}\n=[a-zA-Z0-9/+=]{4}\n-----END PGP PRIVATE KEY BLOCK-----$/m,
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
   * @throws {EntityValidationError} if both `data` and `armoredKey` are defined or if none is defined.
   */
  validateBuildRules() {
    this.assertNoConflictBetweenDataAndArmoredKey();
  }

  /**
   * Asserts that only one of `data` and `armoredKey` is defined
   * @throws {EntityValidationError} if both `data` and `armoredKey` are defined or if none is defined.
   */
  assertNoConflictBetweenDataAndArmoredKey() {
    const isDataDefined = Boolean(this._props.data);
    const isArmoredKeyDefined = Boolean(this._props.armored_key);
    if (isDataDefined && isArmoredKeyDefined) {
      const error = new EntityValidationError();
      error.addError("data:armored_key", 'only-one-defined', '`data` and `armored_key` cannot be both defined at the same time');
      throw error;
    }

    if (!isDataDefined && !isArmoredKeyDefined) {
      const error = new EntityValidationError();
      error.addError("data:armored_key", 'at-least-one-defined', '`data` and `armored_key` cannot be both undefined at the same time');
      throw error;
    }
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get the key in its armored format if it has been decrypted from the data.
   * @returns {string|null}
   */
  get armoredKey() {
    return this._props.armored_key || null;
  }

  /**
   * Get the raw data unencrypted if it hasn't been decrypted already.
   * @returns {string|null}
   */
  get data() {
    return this._props.data || null;
  }

  /**
   * Set the key in its armored format.
   * The key should be the result of the decrypted data.
   * @param {string} armoredKey
   * @throws {EntityValidationError} if the `armoredKey` is not valid
   */
  set armoredKey(armoredKey) {
    EntitySchema.validateProp("armored_key", armoredKey, this.cachedSchema.properties.armored_key);
    this._props.armored_key = armoredKey;
    delete this._props.data;
  }

  /**
   * Set the data.
   * The data should be the key encrypted.
   * @param {string} armoredKey
   * @throws {EntityValidationError} if the `data` is not valid
   */
  set data(data) {
    EntitySchema.validateProp("data", data, this.cachedSchema.properties.data);
    this._props.data = data;
    delete this._props.armored_key;
  }

  /**
   * Returns true if the data has been decrypted already.
   * @returns {boolean}
   */
  get isDecrypted() {
    return Boolean(this._props.armored_key);
  }
}

export default MetadataPrivateKeyEntity;
