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

const ENTITY_NAME = "OfflineSettings";

class OfflineSettingsEntity extends EntityV2 {
  /**
   * Get OfflineSettingsEntity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["session_duration", "maximum_retention_period"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        session_duration: {
          type: "number",
        },
        maximum_retention_period: {
          type: "number",
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

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * OfflineSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
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
   * @returns {string|null}
   */
  get sessionDuration() {
    return this._props.session_duration || null;
  }

  /**
   * Get the maximum offline data retention period after which
   * it will be considered stale and flushed
   * @returns {(string|null)}
   */
  get maximumRetentionPeriod() {
    return this._props.maximum_retention_period || null;
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
