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
 * @since         5.18.0
 */
import EntityV2 from "../abstract/entityV2";
import EntitySchema from "../abstract/entitySchema";

/**
 * The session timestamps decide offline retention and session start.
 */
class SessionTimestampsEntity extends EntityV2 {
  /**
   * Get the session timestamps entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["last_logged_in", "last_seen_online"],
      properties: {
        last_logged_in: {
          type: "string",
          format: "date-time",
        },
        last_seen_online: {
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
   * Get the last logged in date
   * @returns {string}
   */
  get lastLoggedIn() {
    return this._props.last_logged_in;
  }

  /**
   * Get the last seen online date
   * @returns {string}
   */
  get lastSeenOnline() {
    return this._props.last_seen_online;
  }

  /*
   * ==================================================
   * Dynamic properties setters
   * ==================================================
   */

  /**
   * Set the last logged in date
   * @param {string} date
   */
  set lastLoggedIn(date) {
    EntitySchema.validateProp("last_logged_in", date, this.cachedSchema.properties.last_logged_in);
    this._props.last_logged_in = date;
  }

  /**
   * Set the last seen online date
   * @param {string} date
   */
  set lastSeenOnline(date) {
    EntitySchema.validateProp("last_seen_online", date, this.cachedSchema.properties.last_seen_online);
    this._props.last_seen_online = date;
  }
}

export default SessionTimestampsEntity;
