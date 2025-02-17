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
 * @since         4.12.0
 */
import EntityV2 from "../abstract/entityV2";
import PassboltResponseHeaderEntity from "./PassboltResponseHeaderEntity";

class PassboltResponseEntity extends EntityV2 {
  constructor(dto, options = {}) {
    super(dto, options);
    if (this._props.header) {
      this._header = new PassboltResponseHeaderEntity(this._props.header, options);
      delete this._props.header;
    }
  }

  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "header",
        "body",
      ],
      "properties": {
        "header": {
          "type": "object",
        },
        "body": {
          "anyOf": [{
            "type": "string",
          }, {
            "type": "object"
          }],
          "nullable": true,
        }
      }
    };
  }

  /**
   * Returns the header part of the API response.
   * @returns {PassboltResponseHeaderEntity}
   */
  get header() {
    return this._header;
  }
}

export default PassboltResponseEntity;
