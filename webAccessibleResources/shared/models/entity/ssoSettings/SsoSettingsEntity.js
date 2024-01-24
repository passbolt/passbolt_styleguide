/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.6.0
 */
import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";
import AzureSsoSettingsEntity from "./AzureSsoSettingsEntity";
import GoogleSsoSettingsEntity from "./GoogleSsoSettingsEntity";
import OAuth2SsoSettingsEntity from "./OAuth2SsoSettingsEntity";

const ENTITY_NAME = "SsoSettings";

/**
 * Entity related to the SSO settings
 */
class SsoSettingsEntity extends Entity {
  /**
   * Setup entity constructor
   *
   * @param {Object} ssoSettingsDto SSO settings DTO
   * @throws EntityValidationError if the dto cannot be converted into an entity
   */
  constructor(ssoSettingsDto) {
    super(EntitySchema.validate(
      SsoSettingsEntity.ENTITY_NAME,
      ssoSettingsDto,
      SsoSettingsEntity.getSchema()
    ));

    // Sso settings associations.
    if (this._props.data) {
      this._data = SsoSettingsEntity.buildSsoProviderSettingsFromData(this._props.provider, this._props.data);
      delete this._props.data;
    }
  }

  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "providers": {
          "type": "array",
          "items": {
            "type": "string"
          },
        },
        "provider": {
          "anyOf": [{
            "type": "string",
            "enum": SsoSettingsEntity.AVAILABLE_PROVIDERS,
          }, {
            "type": "null"
          }],
        },
        "data": {
          "type": "object",
        },
        "created": {
          "type": "string",
          "format": "date-time"
        },
        "modified": {
          "type": "string",
          "format": "date-time"
        },
        "created_by": {
          "type": "string",
          "format": "uuid"
        },
        "modified_by": {
          "type": "string",
          "format": "uuid"
        },
      }
    };
  }

  /*
   * ==================================================
   * Custom validators
   * ==================================================
   */

  /**
   * Return the corresponding SSO Settings Entity
   * @param {string} providerId
   * @returns {AzureSsoSettingsEntity|GoogleSsoSettingsEntity|OAuth2SsoSettingsEntity}
   * @throws {Error} if the given provider is not supported.
   * @private
   */
  static buildSsoProviderSettingsFromData(providerId, data) {
    switch (providerId) {
      case (AzureSsoSettingsEntity.PROVIDER_ID):
        return new AzureSsoSettingsEntity(data);
      case (GoogleSsoSettingsEntity.PROVIDER_ID):
        return new GoogleSsoSettingsEntity(data);
      case (OAuth2SsoSettingsEntity.PROVIDER_ID):
        return new OAuth2SsoSettingsEntity(data);
      default:
        /*
         * We don't throw an Error here as this could happen.
         * It's the case if we remove the currently configured provider from the available list on the API.
         * To avoid a crash, we just return null.
         */
        return null;
    }
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  /**
   * Customizes JSON stringification behavior
   * @returns {Object}
   */
  toJSON() {
    return this.toDto(SsoSettingsEntity.DEFAULT_CONTAIN);
  }

  /**
   * Return a DTO ready to be sent to API or content code
   * @param {Object} contains The contains
   * @returns {Object}
   */
  toDto(contains = {}) {
    const result = Object.assign({}, this._props);

    if (contains?.data && this._data) {
      result.data = this._data.toDto();
    }

    return result;
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get the id
   * @returns {string}
   */
  get id() {
    return this._props.id;
  }

  /**
   * Get the provider
   * @returns {string}
   */
  get provider() {
    return this._props.provider;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * SsoSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * SsoSettingsEntity.DEFAULT_CONTAIN
   *
   * @returns {Object}
   * @private
   */
  static get DEFAULT_CONTAIN() {
    return {
      data: true,
    };
  }

  /**
   * SsoSettingsEntity.AVAILABLE_PROVIDERS
   * @returns {Array<string>}
   */
  static get AVAILABLE_PROVIDERS() {
    return [
      AzureSsoSettingsEntity.PROVIDER_ID,
      GoogleSsoSettingsEntity.PROVIDER_ID,
      OAuth2SsoSettingsEntity.PROVIDER_ID,
    ];
  }
}

export default SsoSettingsEntity;
