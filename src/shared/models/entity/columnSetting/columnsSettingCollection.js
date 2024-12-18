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
import ColumnSettingEntity from "./columnSettingEntity";
import EntityCollection from "../abstract/entityCollection";
import EntitySchema from "../abstract/entitySchema";
import EntityCollectionError from "../abstract/entityCollectionError";


const ENTITY_NAME = 'ColumnsSetting';
const RULE_UNIQUE_ID = 'unique_id';

class ColumnsSettingCollection extends EntityCollection {
  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by ID.
   */
  constructor(columnsSettingCollectionDto, options = {}) {
    super(EntitySchema.validate(
      ColumnsSettingCollection.ENTITY_NAME,
      columnsSettingCollectionDto,
      ColumnsSettingCollection.getSchema()
    ), options);

    // Directly push into the private property _items[]
    this._props.forEach(columnSetting => {
      this.push(columnSetting);
    });

    // We do not keep original props
    this._props = null;
  }

  /**
   * Get locales collection schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "array",
      "items": ColumnSettingEntity.getSchema(),
    };
  }

  /*
   * ==================================================
   * Setters
   * ==================================================
   */
  /**
   * Push a copy of the resource to the list
   * @param {object} columnSetting DTO or ColumnSettingEntity
   */
  push(columnSetting) {
    if (!columnSetting || typeof columnSetting !== 'object') {
      throw new TypeError(`ColumnsSettingCollection push parameter should be an object.`);
    }
    if (columnSetting instanceof ColumnSettingEntity) {
      columnSetting = columnSetting.toDto(); // deep clone
    }
    const columnSettingEntity = new ColumnSettingEntity(columnSetting); // validate

    this.assertUniqueId(columnSettingEntity);

    super.push(columnSettingEntity);
  }

  /**
   * Remove a column by id.
   * @param {string} columnId The column id
   */
  removeById(columnId) {
    this._items = this.items.filter(columnSetting => columnSetting.id !== columnId);
  }

  /**
   * Create object from id property
   * @return {Object} The object with id keys
   */
  toHashTable() {
    // Get the columns setting with id as a key
    return this.items.reduce((result, column) => {
      result[column.id] = column.toDto();
      return result;
    }, {});
  }

  /**
   * Merge the collection by id
   * (warning: The order must not be changed from the source)
   * @param {ColumnsSettingCollection} columnsSettingCollection The columns setting collection to merge
   * @param {{keepUnknownValue: boolean}} [options] optional options The columns setting merge options
   *
   * @return {ColumnsSettingCollection} The new columns setting collection
   */
  deepMerge(columnsSettingCollection, options = {keepUnknownValue: true}) {
    const columnsToMerge = columnsSettingCollection.toDto();
    // Deep merge keeping the order from the source and add at the end the new entry
    const columnSettingCollectionDto = columnsToMerge.reduce((columnsMerged, columnToMerge) => {
      const index = columnsMerged.findIndex(column => column.id === columnToMerge.id); // Look for the columnsMerged has the same id while iterating
      // If column found need to merge with value of columnsToMerge
      if (index > -1) {
        columnsMerged[index] = Object.assign(columnsMerged[index], columnToMerge);
        return columnsMerged;
      }
      // If we don't find anything so columnToMerge is a unique entry
      if (options?.keepUnknownValue) {
        // Add columnToMerge if option keepUnknownValue is true
        return [...columnsMerged, columnToMerge];
      }
      // Ignore columnToMerge if option keepUnknownValue is false
      return columnsMerged;
    }, this.toDto()); // Initial values of reduce to merge
    return new this.constructor(columnSettingCollectionDto);
  }

  /**
   * Update the show value from the default column to replace the column
   * (warning: The order must not be changed from the default)
   * @param {string} id The id of the column
   * @param {boolean} show The show value to update
   *
   */
  updateColumnShowValueFromDefault(id, show) {
    const hasSameId = column => column.id === id;
    const columnSettingDto = this.constructor.DEFAULT.items.find(hasSameId).toDto();
    // Update the show value
    columnSettingDto.show = show;
    // Set the column setting
    const index = this.items.findIndex(hasSameId);
    this.items[index] = new ColumnSettingEntity(columnSettingDto);
  }

  /**
   * Has different show value compare to the columns setting collection
   * @param columnsSettingCollection The columns setting collection to compare with
   * @return {boolean}
   */
  hasDifferentShowValue(columnsSettingCollection) {
    if (columnsSettingCollection) {
      return this.items.some((column, index) => column?.show !== columnsSettingCollection.items[index]?.show);
    }
    return true;
  }

  /*
   * ==================================================
   * Assertions
   * ==================================================
   */
  /**
   * Assert there is no other column setting with the same id in the collection
   *
   * @param {ColumnSettingEntity} columnSetting
   * @throws {EntityValidationError} if a column setting with the same id already exist
   */
  assertUniqueId(columnSetting) {
    this.items.forEach((existingColumnSetting, index) => {
      if (existingColumnSetting.id && existingColumnSetting.id === columnSetting.id) {
        throw new EntityCollectionError(index, ColumnsSettingCollection.RULE_UNIQUE_ID, `ColumnSetting id ${columnSetting.id} already exists.`);
      }
    });
  }

  /*
   * ==================================================
   * Static getters
   * ==================================================
   */
  /**
   * ColumnsSettingCollection.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * ColumnsSettingCollection.RULE_UNIQUE_ID
   * @returns {string}
   */
  static get RULE_UNIQUE_ID() {
    return RULE_UNIQUE_ID;
  }

  /**
   * Default columns setting collection (Should be overridden)
   * @return {ColumnsSettingCollection}
   * @constructor
   */
  static get DEFAULT() {
    return new ColumnsSettingCollection([]);
  }

  /**
   * Merge the collection by id from the default
   * If the collection is null return the default
   * @param {ColumnsSettingCollection | null} columnsSettingCollection The columns setting collection to merge with the default
   * @param {{keepUnknownValue: boolean}} [options] optional options The columns setting merge options
   * @return {ColumnsSettingCollection} The new columns setting collection
   */
  static createFromDefault(columnsSettingCollection = null, options = {keepUnknownValue: true}) {
    if (columnsSettingCollection !== null) {
      return this.DEFAULT.deepMerge(columnsSettingCollection, options);
    }
    return this.DEFAULT;
  }
}

export default ColumnsSettingCollection;
