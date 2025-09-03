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
 * @since         5.5.0
 */

import EntitySchema from "../abstract/entitySchema";
import EntityV2 from "../abstract/entityV2";
import EntityValidationError from "../abstract/entityValidationError";

const SECRET_TOKEN_LENGTH = 46;
const SECRET_TOKEN_PATTERN = "^pb_[A-Za-z0-9]{43}$";
const EMPTY_SECRET_VALUE = "pb_0000000000000000000000000000000000000000000";

/**
 * SCIM Settings Entity class
 * Represents SCIM settings with validation and serialization capabilities
 */
class ScimSettingsEntity extends EntityV2 {
  /**
   * Get SCIM settings entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "scim_user_id",
      ],
      properties: {
        id: {
          type: "string",
          format: "uuid",
          nullable: true
        },
        scim_user_id: {
          type: "string",
          format: "uuid"
        },
        setting_id: {
          type: "string",
          format: "uuid",
          nullable: true
        },
        secret_token: {
          type: "string",
          length: SECRET_TOKEN_LENGTH,
          pattern: SECRET_TOKEN_PATTERN,
          nullable: true
        }
      }
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
   * @returns {object}
   */
  toDto() {
    return Object.assign({}, this._props);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get the SCIM settings id
   * @returns {string|null} uuid or null
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get the SCIM user id
   * @returns {string} uuid
   */
  get scimUserId() {
    return this._props.scim_user_id;
  }

  /**
   * Get the setting id
   * @returns {string} uuid
   */
  get settingId() {
    return this._props.setting_id;
  }

  /**
   * Get the secret token
   * @returns {string|null} secret token or null
   */
  get secretToken() {
    return this._props.secret_token || null;
  }

  /**
   * Sets the secret token for the SCIM settings entity.
   *
   * @param {string} secretToken - The secret token to be set.
   * @throws {Error} If the secret token does not conform to the schema.
   */
  set secretToken(secretToken) {
    EntitySchema.validateProp("secret_token", secretToken, this.cachedSchema.properties.secret_token);
    this._props.secret_token = secretToken;
  }

  /**
   * ScimSettingsEntity.SECRET_TOKEN_LENGTH
   * @returns {string}
   */
  static get SECRET_TOKEN_LENGTH() {
    return SECRET_TOKEN_LENGTH;
  }

  /**
   * The secret value with empty format
   * @returns {string}
   */
  static get EMPTY_SECRET_VALUE() {
    return EMPTY_SECRET_VALUE;
  }

  /**
   * Generate a random secret token that matches the SCIM settings pattern
   * @returns {string} A secret token starting with "pb_" followed by 36 random alphanumeric characters
   */
  static generateScimSecretToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const prefix = 'pb_';
    const secretLength = ScimSettingsEntity.SECRET_TOKEN_LENGTH - prefix.length;

    // Rejection sampling to avoid modulo bias
    const secret = [];
    const max = 256 - (256 % chars.length); // 256 - (256 % 62) = 248
    const randomValues = new Uint8Array(secretLength * 2); // overshoot to reduce loops

    while (secret.length < secretLength) {
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < randomValues.length && secret.length < secretLength; i++) {
        const v = randomValues[i];
        if (v < max) {
          secret.push(chars[v % chars.length]);
        }
      }
    }

    return prefix + secret.join('');
  }


  /**
   * Create a SCIM settings entity from a DTO
   * Validates that id is present and secret_token is not present
   *
   * @param {object} scimSettingsDto - The SCIM settings DTO
   * @returns {ScimSettingsEntity} The created entity
   * @throws {EntityValidationError} If validation fails
   */
  static createFromScimSettingsFind(scimSettingsDto) {
    const scimSettingsEntity = new ScimSettingsEntity(scimSettingsDto);
    const entityValidationError = new EntityValidationError();

    // Assert with ScimSettingsEntity that id should be mandatory
    if (!scimSettingsEntity.id) {
      entityValidationError.addError("id", "required", "SCIM settings id is mandatory");
    }

    // Should throw an error if secret_token exists
    if (scimSettingsEntity.secretToken) {
      entityValidationError.addError("secretToken", "empty", "SCIM settings should not contain secret_token");
    }

    if (entityValidationError.hasErrors()) {
      throw entityValidationError;
    }

    scimSettingsEntity.secretToken = EMPTY_SECRET_VALUE;

    return scimSettingsEntity;
  }

  /**
   * Create a SCIM settings entity for creation
   * Validates that secret_token is present
   *
   * @param {object} scimSettingsDto - The SCIM settings DTO
   * @returns {ScimSettingsEntity} The created entity
   * @throws {EntityValidationError} If validation fails
   */
  static createFromScimSettingsCreation(scimSettingsDto) {
    const scimSettingsEntity = new ScimSettingsEntity(scimSettingsDto);
    const entityValidationError = new EntityValidationError();

    // Assert with ScimSettingsEntity that secret_token should be mandatory
    if (!scimSettingsEntity.secretToken) {
      entityValidationError.addError("secretToken", "required", "SCIM settings secret_token is mandatory.");
    }
    if (entityValidationError.hasErrors()) {
      throw entityValidationError;
    }

    return scimSettingsEntity;
  }

  /**
   * Create a SCIM settings entity for update
   * Validates that setting_id is not present
   *
   * @param {object} scimSettingsDto - The SCIM settings DTO
   * @returns {ScimSettingsEntity} The created entity
   * @throws {EntityValidationError} If validation fails
   */
  static createFromScimSettingsUpdate(scimSettingsDto) {
    const scimSettingsEntity = new ScimSettingsEntity(scimSettingsDto);
    const entityValidationError = new EntityValidationError();

    // Assert with ScimSettingsEntity that should throw an error if setting_id exists
    if (scimSettingsEntity.settingId) {
      entityValidationError.addError("settingId", "empty", "SCIM settings should not contain setting_id.");
    }
    if (entityValidationError.hasErrors()) {
      throw entityValidationError;
    }

    return scimSettingsEntity;
  }
}

export default ScimSettingsEntity;
