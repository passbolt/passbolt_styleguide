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
 * @since         5.5.0
 */

import ScimSettingsEntity from "./scimSettingsEntity";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

/**
 * The number of years a freshly generated secret token remains valid.
 * @type {number}
 */
const SECRET_TOKEN_VALIDITY_YEARS = 1;

class ScimSettingsFormEntity extends ScimSettingsEntity {
  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["scim_user_id", "setting_id"],
      properties: {
        ...ScimSettingsEntity.getSchema().properties,
      },
    };
  }

  /**
   * Create default SCIM settings for a user
   *
   * @param {string} userId - The user ID to associate with the SCIM settings
   * @returns {object} Default SCIM settings object
   */
  static createFromDefault(userId) {
    return new ScimSettingsFormEntity({
      scim_user_id: userId,
      setting_id: uuidv4(),
      secret_token: this.generateScimSecretToken(),
      expired: ScimSettingsFormEntity.defaultExpiryDate(),
    });
  }

  /**
   * Get the default expiry date for a freshly generated secret token, set one year in the future.
   * @returns {string} The expiry date formatted as an ISO date (YYYY-MM-DD).
   */
  static defaultExpiryDate() {
    return DateTime.now().plus({ years: SECRET_TOKEN_VALIDITY_YEARS }).toISODate();
  }
}

export default ScimSettingsFormEntity;
