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
import SmtpSettingsEntity from "./smtpSettingsEntity";

const ENTITY_NAME = "SmtpOAuthCredentialsGrantSettings";

/**
 * Entity for SMTP OAuth (Client Credentials) authentication method
 */
class SmtpOAuthCredentialsGrantSettingsEntity extends EntityV2 {
  /**
   * Get the entity schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        ...SmtpSettingsEntity.getSchema().required,
        "oauth_username",
        "tenant_id",
        "client_id",
        "client_secret",
      ],
      properties: {
        ...SmtpSettingsEntity.getSchema().properties,
        oauth_username: {
          type: "string",
          format: "email",
          maxLength: 256,
        },
        tenant_id: {
          type: "string",
          format: "uuid",
        },
        client_id: {
          type: "string",
          format: "uuid",
        },
        client_secret: {
          type: "string",
          minLength: 1,
          maxLength: 256,
        },
        username: {
          type: "string",
          nullable: true,
        },
        password: {
          type: "string",
          nullable: true,
        },
      },
    };
  }

  /**
   * Marshall the entity
   * Coerce port from string to integer (the API may return port as a string).
   */
  marshall() {
    if (typeof this._props.port === "string") {
      this._props.port = parseInt(this._props.port, 10);
    }
    super.marshall();
  }

  /**
   * Get the default data for this authentication method.
   * @returns {object}
   */
  static getDefaultData() {
    return { oauth_username: "", password: null, tenant_id: "", client_id: "", client_secret: "" };
  }

  /**
   * Get the entity name
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default SmtpOAuthCredentialsGrantSettingsEntity;
