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
 * @since         5.11.0
 */

import EntityV2 from "../abstract/entityV2";
import EntitySchema from "../abstract/entitySchema";
import EntityValidationError from "../abstract/entityValidationError";
import GoogleSsoSettingsEntity from "./GoogleSsoSettingsEntity";

const ENTITY_NAME = "GoogleSsoSettingsForm";

class GoogleSsoSettingsFormEntity extends EntityV2 {
  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    const baseSchema = GoogleSsoSettingsEntity.getSchema();

    return {
      ...baseSchema,
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        ...baseSchema.properties,
      },
    };
  }

  /**
   * Get the provider name
   * @returns {string}
   */
  get provider() {
    return GoogleSsoSettingsEntity.PROVIDER_ID;
  }

  /**
   * Get the id
   * @returns {string}
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get the client id
   * @returns {string}
   */
  get client_id() {
    return this._props.client_id || null;
  }

  /**
   * Get the client secret
   * @returns {string}
   */
  get client_secret() {
    return this._props.client_secret || null;
  }

  /**
   * Validates the current form data against the schema.
   * @returns {EntityValidationError}
   */
  validate(options = {}) {
    let schemaError = null;
    const schema = options?.schema ?? this.cachedSchema;

    try {
      EntitySchema.validate(this.constructor.name, { ...this._props }, schema);
    } catch (error) {
      if (!(error instanceof EntityValidationError)) {
        throw error;
      }
      schemaError = error;
    }

    return schemaError || new EntityValidationError();
  }

  /**
   * Returns a DTO with the same data structure as the form entity.
   * @returns {object}
   */
  toFormDto() {
    return {
      id: this._props.id,
      client_id: this._props.client_id,
      client_secret: this._props.client_secret,
    };
  }

  /**
   * Returns a DTO with the same data structure of the API entity.
   * @returns {object}
   */
  toEntityDto() {
    const dto = this.toDto();

    delete dto.id;

    return {
      provider: this.provider,
      data: {
        ...dto,
      },
    };
  }

  /**
   * Parse an entity DTO to create a new GoogleSsoSettingsFormEntity
   * @param {Object} dto The API response
   * @returns {GoogleSsoSettingsFormEntity} The parsed entity
   */
  static fromEntityDto({ id, data } = {}) {
    const dto = {
      id,
      client_id: data.client_id,
      client_secret: data.client_secret,
    };

    return new GoogleSsoSettingsFormEntity(dto, { validate: false });
  }

  static createDefault(defaultConfig = {}) {
    return new GoogleSsoSettingsFormEntity(defaultConfig, { validate: false });
  }

  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default GoogleSsoSettingsFormEntity;
