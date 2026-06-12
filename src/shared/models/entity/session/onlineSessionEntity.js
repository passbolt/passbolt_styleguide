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
 * @since         5.13.0
 */
import EntityV2 from "../abstract/entityV2";

class OnlineSessionEntity extends EntityV2 {
  /**
   * Get online session entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["is_authenticated"],
      properties: {
        is_authenticated: {
          type: "boolean",
          format: "uuid",
        },
        is_mfa_authenticated: {
          type: "boolean",
          format: "uuid",
        },
        last_online_logged_in: {
          type: "string",
          format: "date-time",
        },
      },
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the is authenticated
   * @returns {boolean}
   */
  get isAuthenticated() {
    return this._props.is_authenticated;
  }

  /**
   * Get the is mfa authenticated
   * @returns {boolean}
   */
  get isMfaAuthenticated() {
    return this._props.is_mfa_authenticated;
  }

  /**
   * Get the last online logged in date
   * @returns {string}
   */
  get lastOnlineLoggedIn() {
    return this._props.last_online_logged_in;
  }
}

export default OnlineSessionEntity;
