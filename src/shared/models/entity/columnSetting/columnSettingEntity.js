/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */
import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";


const ENTITY_NAME = 'ColumnSetting';
const COLUMN_ID_MAX_LENGTH = 255;

/**
 * Column setting entity
 */
class ColumnSettingEntity extends Entity {
  /**
   * ColumnSetting entity constructor
   *
   * @param {Object} columnSettingDto columnSetting DTO
   * @throws EntityValidationError if the dto cannot be converted into an entity
   */
  constructor(columnSettingDto) {
    super(EntitySchema.validate(
      ColumnSettingEntity.ENTITY_NAME,
      columnSettingDto,
      ColumnSettingEntity.getSchema()
    ));
  }

  /**
   * Get local entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "id",
        "label"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": /^[a-zA-Z]+$/,
          "maxLength": COLUMN_ID_MAX_LENGTH,
        },
        "width": {
          "type": "number"
        },
        "position": {
          "type": "integer"
        },
        "show": {
          "type": "boolean"
        }
      }
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get the id
   * @returns {string}
   */
  get id() {
    return this._props.id;
  }

  /**
   * Get column width
   * @returns {number}
   */
  get width() {
    return this._props.width;
  }

  /**
   * Get column position
   * @returns {number}
   */
  get position() {
    return this._props.position;
  }

  /**
   * Get column show
   * @returns {boolean}
   */
  get show() {
    return this._props.show;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * ColumnSettingEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default ColumnSettingEntity;
