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
 * @since         5.2.0
 */

import EntityV2 from "../abstract/entityV2";

export const ROW_SETTING_HEIGHT_COMPACT = "compact";
export const ROW_SETTING_HEIGHT_COMFORTABLE = "comfortable";

/**
 * Row setting entity
 */
export default class RowsSettingEntity extends EntityV2 {
  /**
   * Get local entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "height",
      ],
      "properties": {
        "height": {
          "type": "string",
          "enum": [ROW_SETTING_HEIGHT_COMPACT, ROW_SETTING_HEIGHT_COMFORTABLE]
        },
      }
    };
  }

  /**
   * @inheritdoc
   */
  marshall() {
    if (!this._props.height) {
      this._props.height = ROW_SETTING_HEIGHT_COMPACT;
    }

    super.marshall();
  }

  /**
   * Return the default settings overriden with the given data if any.
   * @param {object} data
   * @returns {RowsSettingEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      height: ROW_SETTING_HEIGHT_COMPACT,
    };

    return new RowsSettingEntity({...defaultData, ...data});
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
  get height() {
    return this._props.height;
  }
}
