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
 * @since         2.13.0
 */
import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import EntityV2 from "../abstract/entityV2";
import SecretDataEntity from "../secretData/secretDataEntity";

class SecretEntity extends EntityV2 {
  /**
   * @inheritDoc
   * @throws {EntityValidationError} Build Rule: Verify the data is a valid openpgp message.
   */
  constructor(dto, options = {}) {
    super(dto, options);
  }

  /**
   * Get secret entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["data"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        user_id: {
          type: "string",
          format: "uuid",
        },
        resource_id: {
          type: "string",
          format: "uuid",
        },
        secret_revision_id: {
          type: "string",
          format: "uuid",
          nullable: true,
        },
        data: {
          type: "string",
        },
        created: {
          type: "string",
          format: "date-time",
        },
        created_by: {
          type: "string",
          format: "uuid",
          nullable: true,
        },
        modified: {
          type: "string",
          format: "date-time",
        },
        modified_by: {
          type: "string",
          format: "uuid",
          nullable: true,
        },
      },
    };
  }

  /**
   * @inheritDoc
   * @throw {EntityValidationError} If the data is not formatted as a valid pgp message.
   */
  validateBuildRules() {
    SecretEntity.assertValidMessage(this._props.data);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get secret id
   * @returns {string|null} uuid
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get secret data
   * @returns {string|SecretDataEntity} an armored pgp message or a secret data entity
   */
  get data() {
    return this.isDataDecrypted ? this._data : this._props.data;
  }

  /**
   * Get secret user id
   * @returns {string|null} uuid
   */
  get userId() {
    return this._props.user_id || null;
  }

  /**
   * Get secret resource id
   * @returns {string|null} uuid
   */
  get resourceId() {
    return this._props.resource_id || null;
  }

  /**
   * Get secret revision id
   * @returns {string|null} uuid
   */
  get secretRevisionId() {
    return this._props.secret_revision_id || null;
  }

  /**
   * Returns true if the data has been decrypted already.
   * @returns {boolean}
   */
  get isDataDecrypted() {
    return Boolean(this._data);
  }

  /*
   * ==================================================
   * Dynamic properties setters
   * ==================================================
   */

  /**
   * Set the data.
   * The data should be a MetadataPrivateKeyData or a string containing an encrypted MetadataPrivateKeyData.
   * @param {string|SecretDataEntity} data
   * @throws {EntityValidationError} if the `data` is not valid
   */
  set data(data) {
    if (typeof data === "string") {
      EntitySchema.validateProp("data", data, this.cachedSchema.properties.data);
      this._props.data = data;
      delete this._data;
    } else {
      // TODO should use assertions "assertType" later when it has been added in the styleguide
      if (!(data instanceof SecretDataEntity)) {
        throw new TypeError("The given data is not of type SecretDataEntity");
      }
      this._data = new data.constructor(data.toDto(), { clone: true, validate: false });
      delete this._props.data;
    }
  }

  /**
   * Assert a given OpenPGP armored message block is valid
   * @param {string} message
   * @throws {EntityValidationError} if the message is not a valid armored block
   * TODO a-fA-F0-9\=... before readArmored
   * TODO this format validation should be part of the json schema.
   */
  static assertValidMessage(message) {
    const error = new EntityValidationError("This is not a valid OpenPGP armored message");
    if (!message || typeof message !== "string" || message === "") {
      error.addError("data", "empty", "The OpenPGP armored message should not be empty.");
      throw error;
    }
    if (!message.match(/-----BEGIN PGP MESSAGE-----/)) {
      error.addError("data", "begin", "The OpenPGP armored message should contain a start delimiter.");
      throw error;
    }
    if (!message.match(/-----END PGP MESSAGE-----/)) {
      error.addError("data", "end", "The OpenPGP armored message should contain an end delimiter.");
      throw error;
    }
  }

  /**
   * Returns a DTO
   * @param {object} [contain]
   * @returns {object}
   */
  toDto(contain = {}) {
    const result = Object.assign({}, this._props);

    if (!contain) {
      return result;
    }
    if (this._data && contain.data) {
      result.data = this._data.toDto();
    }

    return result;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * SecretEntity.ALL_CONTAIN_OPTIONS
   * @returns {object} all contain options that can be used in toDto()
   */
  static get ALL_CONTAIN_OPTIONS() {
    return { data: true };
  }
}

export default SecretEntity;
