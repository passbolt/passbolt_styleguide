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
import ColumnsSettingCollection from "../columnSetting/columnsSettingCollection";
import RowsSettingEntity from "../rowsSetting/rowsSettingEntity";
import SorterEntity from "../sorter/sorterEntity";


const ENTITY_NAME = 'GridUserSetting';

/**
 * Grid setting entity
 */
class GridUserSettingEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(gridSettingDto, options = {}) {
    super(EntitySchema.validate(
      GridUserSettingEntity.ENTITY_NAME,
      gridSettingDto,
      GridUserSettingEntity.getSchema()
    ), options);

    // Associations
    if (this._props.columns_setting) {
      this._columns_setting = new ColumnsSettingCollection(this._props.columns_setting, {clone: false});
    }

    this._rows_setting = RowsSettingEntity.createFromDefault(this._props.rows_setting);

    if (this._props.sorter) {
      this._sorter = new SorterEntity(this._props.sorter, {clone: false});
    }

    delete this._props._columns_setting;
    delete this._props._rows_setting;
    delete this._props.sorter;
  }

  /**
   * Get local entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "columns_setting",
        "sorter"
      ],
      "properties": {
        "columns_setting": ColumnsSettingCollection.getSchema(),
        "sorter": SorterEntity.getSchema(),
        "rows_setting": RowsSettingEntity.getSchema(),
      }
    };
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */

  /**
   * Return a DTO ready to be sent to API
   *
   * @param {object} [contain] optional
   * @returns {object}
   */
  toDto(contain) {
    const result = Object.assign({}, this._props);
    if (!contain) {
      return result;
    }
    if (this.columnsSetting && contain.columns_setting) {
      result.columns_setting = this.columnsSetting.toDto();
    }
    if (this.rowsSetting && contain.rows_setting) {
      result.rows_setting = this.rowsSetting.toDto();
    }
    if (this.sorter && contain.sorter) {
      result.sorter = this.sorter.toDto();
    }

    return result;
  }

  /**
   * Customizes JSON stringification behavior
   * @returns {*}
   */
  toJSON() {
    return this.toDto(GridUserSettingEntity.ALL_CONTAIN_OPTIONS);
  }

  /*
   * ==================================================
   * Associated properties methods
   * ==================================================
   */
  /**
   * Get the associated columns
   * @returns {(ColumnsSettingCollection|[])}
   */
  get columnsSetting() {
    return this._columns_setting;
  }

  /**
   * Get the associated rows setting
   * @returns {RowsSettingEntity || null)}
   */
  get rowsSetting() {
    return this._rows_setting || null;
  }

  /**
   * Get the associated sorter
   * @returns {(SorterEntity|null)}
   */
  get sorter() {
    return this._sorter;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * GridSettingEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * GridSettingEntity.ALL_CONTAIN_OPTIONS
   * @returns {object} all contain options that can be used in toDto()
   */
  static get ALL_CONTAIN_OPTIONS() {
    return {columns_setting: true, sorter: true};
  }
}

export default GridUserSettingEntity;
