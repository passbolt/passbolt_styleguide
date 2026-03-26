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
import AzureSsoSettingsEntity from "./AzureSsoSettingsEntity";

const ENTITY_NAME = "AzureSsoSettingsForm";

class AzureSsoSettingsFormEntity extends EntityV2 {
  /**
   * Get the entity schema for form validation.
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "url",
        "client_id",
        "tenant_id",
        "client_secret",
        "client_secret_expiry",
        "email_claim",
        "prompt",
        "login_hint",
      ],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        url: {
          type: "string",
        },
        client_id: {
          type: "string",
          format: "uuid",
        },
        tenant_id: {
          type: "string",
          format: "uuid",
        },
        client_secret: {
          type: "string",
          minLength: 1,
        },
        client_secret_expiry: {
          type: "string",
        },
        email_claim: {
          type: "string",
          enum: ["email", "preferred_username", "upn"],
        },
        prompt: {
          type: "string",
          enum: ["login", "none"],
        },
        login_hint: {
          type: "boolean",
        },
      },
    };
  }

  /**
   * Marshall the entity props before validation.
   * Truncates client_secret_expiry to date-only format for the form.
   * @protected
   */
  marshall() {
    if (this._props.client_secret_expiry) {
      this._props.client_secret_expiry = this._props.client_secret_expiry.toString().substring(0, 10);
    }
    if (typeof this._props.login_hint === "undefined") {
      this._props.login_hint = true;
    }
  }

  /**
   * Override validate to collect both schema and build rule errors.
   * @param {object} [options] Options
   * @returns {EntityValidationError|null}
   */
  validate(options = {}) {
    this.marshall();
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
   * Returns the entity id.
   * @returns {string|undefined}
   */
  get id() {
    return this._props.id;
  }

  get url() {
    return this._props.url;
  }

  get client_id() {
    return this._props.client_id;
  }

  get tenant_id() {
    return this._props.tenant_id;
  }

  get client_secret() {
    return this._props.client_secret;
  }

  get client_secret_expiry() {
    return this._props.client_secret_expiry;
  }

  get email_claim() {
    return this._props.email_claim;
  }

  get prompt() {
    return this._props.prompt;
  }

  get login_hint() {
    return this._props.login_hint;
  }

  /**
   * Returns the provider identifier.
   * @returns {string}
   */
  get provider() {
    return AzureSsoSettingsEntity.PROVIDER_ID;
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
      client_id: this._props.client_id ?? null,
      tenant_id: this._props.tenant_id ?? null,
      client_secret: this._props.client_secret ?? null,
      client_secret_expiry: this._props.client_secret_expiry ?? null,
      email_claim: this._props.email_claim ?? null,
      prompt: this._props.prompt ?? null,
      login_hint: this._props.login_hint ?? true,
    };
  }

  /**
   * Returns a DTO with the API entity structure: {provider, data: {...}}.
   * @returns {object}
   */
  toEntityDto() {
    let clientSecretExpiry = this._props.client_secret_expiry;
    if (clientSecretExpiry) {
      clientSecretExpiry += " 00:00:00";
    }

    return {
      provider: this.provider,
      data: {
        url: this._props.url,
        client_id: this._props.client_id,
        tenant_id: this._props.tenant_id,
        client_secret: this._props.client_secret,
        client_secret_expiry: clientSecretExpiry,
        email_claim: this._props.email_claim,
        prompt: this._props.prompt,
        login_hint: this._props.login_hint,
      },
    };
  }

  /**
   * Creates a FormEntity from an API entity DTO.
   * @param {object} settings The API settings object with {id, provider, data: {...}}
   * @returns {AzureSsoSettingsFormEntity}
   */
  static fromEntityDto(settings) {
    const data = settings.data;
    const dto = {
      id: settings?.id,
      url: data.url,
      client_id: data.client_id,
      tenant_id: data.tenant_id,
      client_secret: data.client_secret,
      client_secret_expiry: data.client_secret_expiry,
      email_claim: data.email_claim,
      prompt: data.prompt,
      login_hint: data.login_hint,
    };
    return new AzureSsoSettingsFormEntity(dto, { validate: false });
  }

  /**
   * Creates a default FormEntity from provider default config.
   * @param {object} defaultConfig The default config from SsoProviders.data
   * @returns {AzureSsoSettingsFormEntity}
   */
  static createDefault(defaultConfig = {}) {
    return new AzureSsoSettingsFormEntity(defaultConfig, { validate: false });
  }

  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default AzureSsoSettingsFormEntity;
