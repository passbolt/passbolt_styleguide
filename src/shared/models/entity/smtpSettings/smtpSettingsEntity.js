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
import SmtpNoneAuthenticationEntity from "./smtpNoneAuthenticationEntity";
import SmtpUsernameAuthenticationEntity from "./smtpUsernameAuthenticationEntity";
import SmtpUsernamePasswordAuthenticationEntity from "./smtpUsernamePasswordAuthenticationEntity";
import SmtpOAuthCredentialsGrantSettingsEntity from "./smtpOAuthCredentialsGrantSettingsEntity";

const ENTITY_NAME = "SmtpSettings";
const SETTINGS_SOURCE_DEFAULT = "default";
const SETTINGS_SOURCE_ENV = "env";
const SETTINGS_SOURCE_DB = "db";
const SETTINGS_SOURCE_FILE = "file";

/**
 * Entity for common SMTP settings fields
 */
class SmtpSettingsEntity extends EntityV2 {
  /**
   * Get the entity schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: ["host", "port", "sender_name", "sender_email"],
      properties: {
        id: { type: "string", format: "uuid" },
        created: { type: "string", format: "date-time" },
        modified: { type: "string", format: "date-time" },
        source: {
          type: "string",
          enum: [SETTINGS_SOURCE_DEFAULT, SETTINGS_SOURCE_ENV, SETTINGS_SOURCE_DB, SETTINGS_SOURCE_FILE],
        },
        host: {
          type: "string",
          minLength: 1,
          maxLength: 256,
        },
        port: {
          type: "integer",
          minimum: 1,
          maximum: 65535,
        },
        tls: {
          type: "boolean",
          nullable: true,
        },
        client: {
          type: "string",
          nullable: true,
          maxLength: 2048,
        },
        sender_name: {
          type: "string",
          minLength: 1,
          maxLength: 256,
        },
        sender_email: {
          type: "string",
          format: "email",
          maxLength: 256,
        },
      },
    };
  }

  /**
   * Builds the appropriate SMTP auth entity subclass from flat settings.
   * @param {object} settings The SMTP settings dto
   * @param {object} [options] The entity constructor options. Check the constructors options parameters of the entities
   *   this factory is building to know more.
   * @returns {SmtpNoneAuthenticationEntity|SmtpUsernameAuthenticationEntity|
   *           SmtpUsernamePasswordAuthenticationEntity|SmtpOAuthCredentialsGrantSettingsEntity}
   */
  static createFromSettings(settings, options = {}) {
    if ("client_id" in settings && settings.client_id !== null) {
      return new SmtpOAuthCredentialsGrantSettingsEntity(settings, options);
    } else if (!("username" in settings) || settings.username === null) {
      return new SmtpNoneAuthenticationEntity(settings, options);
    } else if (!("password" in settings) || settings.password === null) {
      return new SmtpUsernameAuthenticationEntity(settings, options);
    }
    return new SmtpUsernamePasswordAuthenticationEntity(settings, options);
  }

  /**
   * Get the entity name
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
  /**
   * SmtpSettingsEntity.SETTINGS_SOURCE_DEFAULT
   * @returns {string}
   */
  static get SETTINGS_SOURCE_DEFAULT() {
    return SETTINGS_SOURCE_DEFAULT;
  }

  /**
   * SmtpSettingsEntity.SETTINGS_SOURCE_ENV
   * @returns {string}
   */
  static get SETTINGS_SOURCE_ENV() {
    return SETTINGS_SOURCE_ENV;
  }

  /**
   * SmtpSettingsEntity.SETTINGS_SOURCE_DB
   * @returns {string}
   */
  static get SETTINGS_SOURCE_DB() {
    return SETTINGS_SOURCE_DB;
  }

  /**
   * SmtpSettingsEntity.SETTINGS_SOURCE_FILE
   * @returns {string}
   */
  static get SETTINGS_SOURCE_FILE() {
    return SETTINGS_SOURCE_FILE;
  }
}

export default SmtpSettingsEntity;
