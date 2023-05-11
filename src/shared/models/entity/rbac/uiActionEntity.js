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
 * @since         4.1.0
 */
import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";

const ENTITY_NAME = 'UiAction';
const UI_ACTION_NAME_LENGTH = 255;

class UiActionEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto) {
    super(EntitySchema.validate(
      UiActionEntity.ENTITY_NAME,
      dto,
      UiActionEntity.getSchema()
    ));
  }

  /**
   * Get resource entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "id",
        "name"
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "name": {
          "type": "string",
          "maxLength": UI_ACTION_NAME_LENGTH
        },
      }
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get id
   * @returns {string} uuid
   */
  get id() {
    return this._props.id;
  }

  /**
   * Get name
   * @returns {string}
   */
  get name() {
    return this._props.name;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */

  /**
   * UiActionEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default UiActionEntity;
