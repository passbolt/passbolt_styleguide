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

class PassboltResponsePaginationHeaderEntity extends EntityV2 {
  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "count",
        "limit",
        "page",
      ],
      "properties": {
        "count": {
          "type": "integer",
          "minimum": 0
        },
        "limit": {
          "type": "integer",
          "minimum": 0,
          "nullable": true,
        },
        "page": {
          "type": "integer",
          "minimum": 0
        },
      }
    };
  }

  /**
   * Returns the "count" property of the pagintion entity.
   * @returns {number}
   */
  get count() {
    return this._props.count;
  }

  /**
   * Returns the "limit" property of the pagintion entity.
   * @returns {number|null}
   */
  get limit() {
    return this._props.limit;
  }

  /**
   * Returns the "page" property of the pagintion entity.
   * @returns {number}
   */
  get page() {
    return this._props.page;
  }

  /**
   * Returns the page count computed based on the pagination data.
   * @returns {number}
   */
  get pageCount() {
    const count = parseInt(this._props.count, 10);
    const limit = parseInt(this._props.limit, 10);
    return Math.ceil(count / limit);
  }
}

export default PassboltResponsePaginationHeaderEntity;
