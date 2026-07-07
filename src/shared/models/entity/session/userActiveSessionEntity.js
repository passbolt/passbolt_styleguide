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
import EntitySchema from "../abstract/entitySchema";

export const USER_ACTIVE_SESSION_ONLINE = "online";
export const USER_ACTIVE_SESSION_OFFLINE = "offline";

const SUPPORTED_USER_ACTIVE_SESSION_TYPES = [USER_ACTIVE_SESSION_ONLINE, USER_ACTIVE_SESSION_OFFLINE];

class UserActiveSessionEntity extends EntityV2 {
  /**
   * Get online session entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["is_authenticated", "type"],
      properties: {
        is_authenticated: {
          type: "boolean",
          format: "uuid",
        },
        is_mfa_authenticated: {
          type: "boolean",
          format: "uuid",
        },
        is_server_reachable: {
          type: "boolean",
          format: "uuid",
        },
        type: {
          type: "string",
          enum: SUPPORTED_USER_ACTIVE_SESSION_TYPES,
        },
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
   * Get the is server reachable
   * @returns {boolean}
   */
  get isServerReachable() {
    return this._props.is_server_reachable;
  }

  /**
   * Get the active session type
   * @returns {string}
   */
  get type() {
    return this._props.type;
  }

  /**
   * Get the last online logged in date
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
   * Set the is authenticated
   * @param {boolean} isAuthenticated
   */
  set isAuthenticated(isAuthenticated) {
    EntitySchema.validateProp("is_authenticated", isAuthenticated, this.cachedSchema.properties.is_authenticated);
    this._props.is_authenticated = isAuthenticated;
  }

  /**
   * Set the is mfa authenticated
   * @param {boolean} isMfaAuthenticated
   */
  set isMfaAuthenticated(isMfaAuthenticated) {
    EntitySchema.validateProp(
      "is_mfa_authenticated",
      isMfaAuthenticated,
      this.cachedSchema.properties.is_mfa_authenticated,
    );
    this._props.is_mfa_authenticated = isMfaAuthenticated;
  }

  /**
   * Set the is server reachable
   * @param {boolean} isServerReachable
   */
  set isServerReachable(isServerReachable) {
    EntitySchema.validateProp(
      "is_server_reachable",
      isServerReachable,
      this.cachedSchema.properties.is_server_reachable,
    );
    this._props.is_server_reachable = isServerReachable;
  }

  /**
   * Set the active session type
   * @param {string} type
   */
  set type(type) {
    EntitySchema.validateProp("type", type, this.cachedSchema.properties.type);
    this._props.type = type;
  }

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

export default UserActiveSessionEntity;
