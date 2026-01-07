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

const ENTITY_NAME = "Sorter";

/**
 * Sorter entity for table to display with data
 */
class SorterEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(sorterDto, options = {}) {
    super(EntitySchema.validate(SorterEntity.ENTITY_NAME, sorterDto, SorterEntity.getSchema()), options);
  }

  /**
   * Get local entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["propertyName", "asc"],
      properties: {
        propertyName: {
          type: "string",
        },
        asc: {
          type: "boolean",
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
   * Get the property name
   * @returns {string}
   */
  get propertyName() {
    return this._props.propertyName;
  }

  /**
   * Get ascending boolean
   * @returns {boolean}
   */
  get asc() {
    return this._props.asc;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * SorterEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default SorterEntity;
