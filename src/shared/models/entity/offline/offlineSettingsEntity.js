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

// 5 minutes, 15 minutes, 1 hour, 1 day
export const SESSION_DURATION_ALLOWED = Object.freeze([300, 900, 3600, 86400]);
// 1 day, 7 days, 14 days, 30 days
export const DATA_RETENTION_PERIOD_ALLOWED = Object.freeze([1, 7, 14, 30]);

class OfflineSettingsEntity extends EntityV2 {
  /**
   * Get OfflineSettingsEntity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["max_session_duration", "data_retention_period", "max_items"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        max_session_duration: {
          type: "integer",
          enum: SESSION_DURATION_ALLOWED,
        },
        data_retention_period: {
          type: "integer",
          enum: DATA_RETENTION_PERIOD_ALLOWED,
        },
        max_items: {
          type: "integer",
          minimum: 1000,
          maximum: 1000,
        },
        created: {
          type: "string",
          format: "date-time",
        },
        modified: {
          type: "string",
          format: "date-time",
        },
        created_by: {
          type: "string",
          format: "uuid",
        },
        modified_by: {
          type: "string",
          format: "uuid",
        },
      },
    };
  }

  /**
   * @inheritDoc
   */
  marshall() {
    if (this._props.max_items == null) {
      this._props.max_items = 1000;
    }
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get the id
   * @returns {(string)}
   */
  get id() {
    return this._props.id;
  }

  /**
   * Get the session duration
   * @returns {integer|null}
   */
  get sessionDuration() {
    return this._props.max_session_duration || null;
  }

  /**
   * Get the maximum offline data retention period after which
   * it will be considered stale and flushed
   * @returns {(integer|null)}
   */
  get maximumRetentionPeriod() {
    return this._props.data_retention_period || null;
  }

  /**
   * Get created date
   * @returns {(string|null)} date
   */
  get created() {
    return this._props.created || null;
  }

  /**
   * Get modified date
   * @returns {(string|null)} date
   */
  get modified() {
    return this._props.modified || null;
  }

  /**
   * Get created by user id
   * @returns {(string|null)} uuid
   */
  get createdBy() {
    return this._props.created_by || null;
  }

  /**
   * Get modified by user id
   * @returns {(string|null)} date
   */
  get modifiedBy() {
    return this._props.modified_by || null;
  }
}

export default OfflineSettingsEntity;
