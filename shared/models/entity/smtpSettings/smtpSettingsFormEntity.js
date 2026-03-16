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
import SmtpSettingsEntity from "./smtpSettingsEntity";
import SmtpNoneAuthenticationEntity from "./smtpNoneAuthenticationEntity";
import SmtpUsernameAuthenticationEntity from "./smtpUsernameAuthenticationEntity";
import SmtpUsernamePasswordAuthenticationEntity from "./smtpUsernamePasswordAuthenticationEntity";
import SmtpOAuthCredentialsGrantSettingsEntity from "./smtpOAuthCredentialsGrantSettingsEntity";
import DomainUtil from "../../../../react-extension/lib/Domain/DomainUtil";

const ENTITY_NAME = "SmtpSettingsForm";

const AUTHENTICATION_METHOD_NONE = "none";
const AUTHENTICATION_METHOD_USERNAME = "username";
const AUTHENTICATION_METHOD_USERNAME_PASSWORD = "username_password";
const AUTHENTICATION_METHOD_OAUTH = "oauth";

const AUTH_ENTITY_CLASSES = [
  SmtpNoneAuthenticationEntity,
  SmtpUsernameAuthenticationEntity,
  SmtpUsernamePasswordAuthenticationEntity,
  SmtpOAuthCredentialsGrantSettingsEntity,
];

const AUTH_FIELDS = [
  ...new Set(AUTH_ENTITY_CLASSES.flatMap((EntityClass) => Object.keys(EntityClass.getDefaultData()))),
];

/**
 * Form entity for SMTP settings with superset schema (all auth fields optional).
 */
class SmtpSettingsFormEntity extends EntityV2 {
  /**
   * Get the entity schema
   * @returns {object}
   */
  static getSchema() {
    const baseSchema = SmtpSettingsEntity.getSchema();

    // Derive auth field schemas from auth entities, made nullable for form permissiveness
    const authProperties = {};
    for (const field of AUTH_FIELDS) {
      for (const EntityClass of AUTH_ENTITY_CLASSES) {
        const prop = EntityClass.getSchema().properties[field];
        if (prop) {
          authProperties[field] = { ...prop, nullable: true };
          break;
        }
      }
    }

    return {
      type: "object",
      required: [...baseSchema.required],
      properties: {
        ...baseSchema.properties,
        ...authProperties,
        provider: {
          type: "string",
          nullable: true,
        },
      },
    };
  }

  /**
   * Marshall the entity props before validation.
   * Converts port from string to integer for schema validation.
   * @protected
   */
  marshall() {
    if (typeof this._props.port === "string") {
      const parsed = parseInt(this._props.port, 10);
      this._props.port = isNaN(parsed) ? this._props.port : parsed;
    }
  }

  /**
   * Override validate to ensure both schema and build rules run, even if schema has errors.
   * This allows all errors to be collected simultaneously for form display.
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

    let buildRulesError = null;
    try {
      this.validateBuildRules(options?.validateBuildRules);
    } catch (error) {
      if (!(error instanceof EntityValidationError)) {
        throw error;
      }
      buildRulesError = error;
    }

    // Merge errors
    if (!schemaError && !buildRulesError) {
      return null;
    }

    const mergedError = schemaError || new EntityValidationError();
    if (buildRulesError) {
      for (const field in buildRulesError.details) {
        // Only add build rule errors if schema didn't already flag the field
        if (!mergedError.hasError(field)) {
          const fieldErrors = buildRulesError.details[field];
          for (const rule in fieldErrors) {
            mergedError.addError(field, rule, fieldErrors[rule]);
          }
        }
      }
    }

    return mergedError;
  }

  /**
   * Validate the entity build rules.
   * @param {object} [options] Options.
   * @param {object} [options.siteSettings] The application site settings for email validation.
   * @throws {EntityValidationError}
   */
  validateBuildRules() {
    const errors = new EntityValidationError();
    const client = this._props.client;

    // Validate client hostname if non-empty
    if (client && client.length > 0) {
      if (!DomainUtil.isValidHostname(client)) {
        errors.addError("client", "hostname", "SMTP client should be a valid domain or IP address");
      }
    }

    if (errors.hasErrors()) {
      throw errors;
    }
  }

  /**
   * Returns only form-managed properties suitable for UI binding.
   * @returns {object}
   */
  toFormDto() {
    const dto = {
      host: this._props.host ?? "",
      port: this._props.port ?? "",
      tls: this._props.tls ?? true,
      client: this._props.client ?? "",
      sender_name: this._props.sender_name ?? "",
      sender_email: this._props.sender_email ?? "",
      provider: this._props.provider ?? null,
      source: this._props.source ?? null,
    };
    for (const field of AUTH_FIELDS) {
      dto[field] = this._props[field] ?? null;
    }
    return dto;
  }

  /**
   * Returns a DTO suitable for creating an API entity via SmtpSettingsEntity.createFromSettings().
   * Strips form-only fields and normalizes values.
   * @returns {object}
   */
  toApiDto() {
    const dto = this.toDto();
    delete dto.provider;
    // Normalize empty client to null for the API
    if (dto.client === "") {
      dto.client = null;
    }
    return dto;
  }

  /**
   * Detects the provider based on the current host/port/tls settings.
   * @param {Array<object>} providersList The list of available SMTP providers.
   * @returns {string} The provider ID string or "other".
   */
  detectProvider(providersList) {
    const host = this._props.host;
    const port = parseInt(this._props.port, 10);
    const tls = this._props.tls;

    for (let i = 0; i < providersList.length; i++) {
      const provider = providersList[i];
      const foundConfiguration = provider.availableConfigurations?.find(
        (config) => config.host === host && config.port === port && config.tls === tls,
      );
      if (foundConfiguration) {
        return provider.id;
      }
    }
    return "other";
  }

  /**
   * Changes the authentication method by resetting all auth fields and applying the target entity's defaults.
   * @param {string} method One of "none", "username", "username_password", "oauth".
   */
  changeAuthenticationMethod(method) {
    const entityClass = this._getAuthenticationEntityClass(method);
    const defaults = entityClass.getDefaultData();

    const currentValues = {};
    for (const field of AUTH_FIELDS) {
      // Save current values
      currentValues[field] = this._props[field];
      // Reset all auth fields to null
      this._props[field] = null;
    }

    // Apply defaults, preserving existing values for active fields
    for (const [key, defaultValue] of Object.entries(defaults)) {
      if (defaultValue !== null) {
        this._props[key] = currentValues[key] ?? defaultValue;
      }
    }
  }

  /**
   * Maps an authentication method string to the corresponding entity class.
   * @param {string} method The authentication method.
   * @returns {typeof EntityV2} The entity class.
   * @private
   */
  _getAuthenticationEntityClass(method) {
    switch (method) {
      case AUTHENTICATION_METHOD_NONE:
        return SmtpNoneAuthenticationEntity;
      case AUTHENTICATION_METHOD_USERNAME:
        return SmtpUsernameAuthenticationEntity;
      case AUTHENTICATION_METHOD_USERNAME_PASSWORD:
        return SmtpUsernamePasswordAuthenticationEntity;
      case AUTHENTICATION_METHOD_OAUTH:
        return SmtpOAuthCredentialsGrantSettingsEntity;
      default:
        throw new Error(`Unknown authentication method: ${method}`);
    }
  }

  /**
   * Applies provider default configuration to the entity.
   * @param {object} providerData The provider object with defaultConfiguration and id.
   */
  applyProviderDefaults(providerData) {
    if (providerData.defaultConfiguration) {
      const config = providerData.defaultConfiguration;
      if (config.host !== undefined) {
        this._props.host = config.host;
      }
      if (config.port !== undefined) {
        this._props.port = config.port;
      }
      if (config.tls !== undefined) {
        this._props.tls = config.tls;
      }
    }
    this._props.provider = providerData.id;
  }

  /**
   * Returns the current authentication method based on the auth fields state.
   * @returns {string} "oauth", "none", "username", or "username_password".
   */
  getAuthenticationMethod() {
    if (this._props.client_id !== null && this._props.client_id !== undefined) {
      return AUTHENTICATION_METHOD_OAUTH;
    }
    if (this._props.username === null || this._props.username === undefined) {
      return AUTHENTICATION_METHOD_NONE;
    }
    if (this._props.password === null || this._props.password === undefined) {
      return AUTHENTICATION_METHOD_USERNAME;
    }
    return AUTHENTICATION_METHOD_USERNAME_PASSWORD;
  }

  /**
   * Creates a default empty SmtpSettingsFormEntity for initializing the form.
   * @returns {SmtpSettingsFormEntity}
   */
  static createDefault() {
    return new SmtpSettingsFormEntity(
      {
        host: "",
        port: "",
        tls: true,
        client: "",
        sender_email: "",
        sender_name: "Passbolt",
        ...SmtpUsernamePasswordAuthenticationEntity.getDefaultData(),
      },
      { validate: false },
    );
  }

  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  static get AUTHENTICATION_METHOD_NONE() {
    return AUTHENTICATION_METHOD_NONE;
  }

  static get AUTHENTICATION_METHOD_USERNAME() {
    return AUTHENTICATION_METHOD_USERNAME;
  }

  static get AUTHENTICATION_METHOD_USERNAME_PASSWORD() {
    return AUTHENTICATION_METHOD_USERNAME_PASSWORD;
  }

  static get AUTHENTICATION_METHOD_OAUTH() {
    return AUTHENTICATION_METHOD_OAUTH;
  }

  static get AUTH_FIELDS() {
    return AUTH_FIELDS;
  }
}

export default SmtpSettingsFormEntity;
