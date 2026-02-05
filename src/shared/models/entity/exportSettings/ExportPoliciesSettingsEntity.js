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
 * @since         5.10.0
 */
import EntityV2 from "../abstract/entityV2";

const SETTINGS_SOURCE_DEFAULT = "default";
const SETTINGS_SOURCE_ENV = "env";
const SETTINGS_SOURCE_DB = "db";

class ExportPoliciesSettingsEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      type: "object",
      required: ["allow_csv_format", "source"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        allow_csv_format: {
          type: "boolean",
        },
        source: {
          type: "string",
          enum: [SETTINGS_SOURCE_DEFAULT, SETTINGS_SOURCE_ENV, SETTINGS_SOURCE_DB],
        },
        created: {
          type: "string",
          format: "date-time",
        },
        created_by: {
          type: "string",
          format: "uuid",
        },
        modified: {
          type: "string",
          format: "date-time",
        },
        modified_by: {
          type: "string",
          format: "uuid",
        },
      },
    };
  }

  /**
   * Create export policies settings based on default.
   * @param {object} data The data to override the default with.
   * @returns {ExportPoliciesSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      allow_csv_format: false,
      source: SETTINGS_SOURCE_DEFAULT,
    };
    return new ExportPoliciesSettingsEntity({ ...defaultData, ...data });
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the entity id.
   * @returns {string|null}
   */
  get id() {
    return this._props.id || null;
  }

  /**
   * Get the allow CSV format flag.
   * @returns {boolean}
   */
  get allowCsvFormat() {
    return this._props.allow_csv_format;
  }

  /**
   * Get the source of the settings.
   * @returns {string}
   */
  get source() {
    return this._props.source;
  }

  /**
   * Get the created date.
   * @returns {string|null}
   */
  get created() {
    return this._props.created || null;
  }

  /**
   * Get the created by user id.
   * @returns {string|null}
   */
  get createdBy() {
    return this._props.created_by || null;
  }

  /**
   * Get the modified date.
   * @returns {string|null}
   */
  get modified() {
    return this._props.modified || null;
  }

  /**
   * Get the modified by user id.
   * @returns {string|null}
   */
  get modifiedBy() {
    return this._props.modified_by || null;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */

  /**
   * ExportPoliciesSettingsEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return "ExportPoliciesSettings";
  }

  /**
   * ExportPoliciesSettingsEntity.SETTINGS_SOURCE_DEFAULT
   * @returns {string}
   */
  static get SETTINGS_SOURCE_DEFAULT() {
    return SETTINGS_SOURCE_DEFAULT;
  }

  /**
   * ExportPoliciesSettingsEntity.SETTINGS_SOURCE_ENV
   * @returns {string}
   */
  static get SETTINGS_SOURCE_ENV() {
    return SETTINGS_SOURCE_ENV;
  }

  /**
   * ExportPoliciesSettingsEntity.SETTINGS_SOURCE_DB
   * @returns {string}
   */
  static get SETTINGS_SOURCE_DB() {
    return SETTINGS_SOURCE_DB;
  }
}

export default ExportPoliciesSettingsEntity;
