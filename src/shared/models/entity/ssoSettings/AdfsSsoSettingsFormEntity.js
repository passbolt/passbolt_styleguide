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
import AdfsSsoSettingsEntity from "./AdfsSsoSettingsEntity";

class AdfsSsoSettingsFormEntity extends EntityV2 {
  /**
   * Get the entity schema for form validation.
   * @returns {object}
   */
  static getSchema() {
    const baseEntitySchema = AdfsSsoSettingsEntity.getSchema();
    return {
      type: "object",
      required: ["url", "openid_configuration_path", "scope", "client_id", "client_secret"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        url: baseEntitySchema.properties.url,
        openid_configuration_path: baseEntitySchema.properties.openid_configuration_path,
        scope: baseEntitySchema.properties.scope,
        client_id: baseEntitySchema.properties.client_id,
        client_secret: baseEntitySchema.properties.client_secret,
      },
    };
  }

  /**
   * Override validate to collect schema errors without throwing.
   * @param {object} [options] Options
   * @returns {EntityValidationError}
   */
  validate(options = {}) {
    const schema = options?.schema ?? this.cachedSchema;
    let schemaError = null;

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
   * Returns the entity id.
   * @returns {string|undefined}
   */
  get id() {
    return this._props.id;
  }

  get url() {
    return this._props.url;
  }

  get openid_configuration_path() {
    return this._props.openid_configuration_path;
  }

  get scope() {
    return this._props.scope;
  }

  get client_id() {
    return this._props.client_id;
  }

  get client_secret() {
    return this._props.client_secret;
  }

  /**
   * Returns the provider identifier.
   * @returns {string}
   */
  get provider() {
    return AdfsSsoSettingsEntity.PROVIDER_ID;
  }

  /**
   * Returns form-managed properties suitable for UI binding.
   * @returns {object}
   */
  toFormDto() {
    return {
      id: this._props.id,
      provider: this.provider,
      url: this._props.url ?? null,
      openid_configuration_path: this._props.openid_configuration_path ?? null,
      scope: this._props.scope ?? null,
      client_id: this._props.client_id ?? null,
      client_secret: this._props.client_secret ?? null,
    };
  }

  /**
   * Returns a DTO with the API entity structure: {provider, data: {...}}.
   * @returns {object}
   */
  toEntityDto() {
    return {
      provider: this.provider,
      data: {
        url: this._props.url,
        openid_configuration_path: this._props.openid_configuration_path,
        scope: this._props.scope,
        client_id: this._props.client_id,
        client_secret: this._props.client_secret,
      },
    };
  }

  /**
   * Creates a FormEntity from an API entity DTO.
   * @param {object} settings The API settings object with {id, provider, data: {...}}
   * @returns {AdfsSsoSettingsFormEntity}
   */
  static fromEntityDto(settings) {
    const data = settings.data;
    const dto = {
      id: settings?.id,
      url: data.url,
      openid_configuration_path: data.openid_configuration_path,
      scope: data.scope,
      client_id: data.client_id,
      client_secret: data.client_secret,
    };
    return new AdfsSsoSettingsFormEntity(dto, { validate: false });
  }

  /**
   * Creates a default FormEntity from provider default config.
   * @param {object} defaultConfig The default config from SsoProviders.data
   * @returns {AdfsSsoSettingsFormEntity}
   */
  static createDefault(defaultConfig = {}) {
    return new AdfsSsoSettingsFormEntity(defaultConfig, { validate: false });
  }
}

export default AdfsSsoSettingsFormEntity;
