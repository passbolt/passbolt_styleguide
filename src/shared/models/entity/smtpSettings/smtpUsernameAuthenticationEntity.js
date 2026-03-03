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

const ENTITY_NAME = "SmtpUsernameAuthentication";

/**
 * Entity for SMTP username-only authentication method
 */
class SmtpUsernameAuthenticationEntity extends EntityV2 {
  /**
   * Get the entity schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: [...SmtpSettingsEntity.getSchema().required, "username"],
      properties: {
        ...SmtpSettingsEntity.getSchema().properties,
        username: {
          type: "string",
          maxLength: 256,
        },
      },
    };
  }

  /**
   * Get the default data for this authentication method.
   * @returns {object}
   */
  static getDefaultData() {
    return { username: "", password: null, tenant_id: null, client_id: null, client_secret: null };
  }

  /**
   * Get the entity name
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default SmtpUsernameAuthenticationEntity;
