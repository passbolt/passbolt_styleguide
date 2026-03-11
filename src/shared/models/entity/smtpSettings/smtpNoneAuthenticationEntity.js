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

const ENTITY_NAME = "SmtpNoneAuthentication";

/**
 * Entity for SMTP no authentication method
 */
class SmtpNoneAuthenticationEntity extends EntityV2 {
  /**
   * Get the entity schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: [...SmtpSettingsEntity.getSchema().required],
      properties: {
        ...SmtpSettingsEntity.getSchema().properties,
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
    return {};
  }

  /**
   * Override toDto to always include username and password as null.
   * These fields are stripped by EntitySchema.validate() since they are not
   * in this entity's schema. Explicit nulls signal to the API that credentials
   * are cleared, and allow UI auth-method detection to work correctly.
   * @returns {object}
   */
  toDto() {
    return { ...super.toDto(), username: null, password: null };
  }

  /**
   * Get the entity name
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default SmtpNoneAuthenticationEntity;
