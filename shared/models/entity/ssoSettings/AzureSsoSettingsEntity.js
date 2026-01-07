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
 * @since         4.5.0
 */
import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";

const ENTITY_NAME = "AzureSsoSettings";
const AZURE = "azure";

const SUPPORTED_URLS = [
  "https://login.microsoftonline.com",
  "https://login.microsoftonline.us",
  "https://login.partner.microsoftonline.cn",
];

const AZURE_SUPPORTED_URLS = /^https:\/\/login\.(microsoftonline\.(com|us)|partner\.microsoftonline\.cn)$/;

/**
 * Entity related to the SSO settings
 */
class AzureSsoSettingsEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(azureSsoSettingsDto, options = {}) {
    const sanitizedAzureSsoSettingsDto = AzureSsoSettingsEntity.sanitizeDto(azureSsoSettingsDto);
    super(
      EntitySchema.validate(
        AzureSsoSettingsEntity.ENTITY_NAME,
        sanitizedAzureSsoSettingsDto,
        AzureSsoSettingsEntity.getSchema(),
      ),
      options,
    );
  }

  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["url", "client_id", "tenant_id", "client_secret", "client_secret_expiry"],
      properties: {
        url: {
          type: "string",
          pattern: AZURE_SUPPORTED_URLS,
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
          format: "date-time",
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

  /*
   * ==================================================
   * Sanitization
   * ==================================================
   */
  /**
   * Sanitize Azure Sso Settings dto.
   * @param {object} dto The dto to sanitiaze
   * @returns {object}
   */
  static sanitizeDto(dto) {
    dto = Object.assign({}, dto); // shallow clone.

    // Set the default values to ensure backward compatibility
    if (!dto?.email_claim) {
      dto.email_claim = "email";
    }
    if (!dto?.prompt) {
      dto.prompt = "login";
    }
    if (typeof dto.login_hint === "undefined") {
      dto.login_hint = true;
    }

    return dto;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * AzureSsoSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * AzureSsoSettingsEntity.PROVIDER_ID
   * @returns {string}
   */
  static get PROVIDER_ID() {
    return AZURE;
  }

  /**
   * AzureSsoSettingsEntity.SUPPORTED_URLS
   * @returns {Array<string>}
   */
  static get SUPPORTED_URLS() {
    return SUPPORTED_URLS;
  }
}

export default AzureSsoSettingsEntity;
