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
import EntityV2 from "../../abstract/entityV2";
import EntityValidationError from "../../abstract/entityValidationError";

export const KEEPASS_ICON_SET = "keepass-icon-set";
export const PASSBOLT_ICON_SET = "passbolt-icon-set";

export default class IconEntity extends EntityV2 {
  /**
   * Get icon entity schema
   * @throws TypeError unsupported
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [],
      "properties": {
        "type": {
          "type": "string",
          "enum": [KEEPASS_ICON_SET, PASSBOLT_ICON_SET]
        },
        "value": {
          "type": "integer",
          "minimum": 0,
          "nullable": true,
        },
        "background_color": {
          "type": "string",
          "pattern": /^#(?:[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/,
          "nullable": true,
        },
      },
    };
  }

  /**
   * @inheritDoc
   */
  validateBuildRules() {
    if (Boolean(this._props.value) && !this._props.type) {
      const error = new EntityValidationError();
      error.addError("type", "required_with_value", "The property type must be set if the property value is set");
      throw error;
    }
  }

  /**
   * Returns the type of the icon set used.
   * @returns {string\null}
   */
  get type() {
    return this._props.type || null;
  }

  /**
   * Returns the value/ID of the icon if any.
   * @returns {number|null}
   */
  get value() {
    return this._props.value || null;
  }

  /**
   * Returns the color to use as background if any.
   * @returns {string|null}
   */
  get backgroundColor() {
    return this._props.background_color || null;
  }
}
