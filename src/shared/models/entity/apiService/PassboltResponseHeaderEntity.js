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
import PassboltResponsePaginationHeaderEntity from "./PassboltResponsePaginationHeaderEntity";

class PassboltResponseHeaderEntity extends EntityV2 {
  constructor(dto, options = {}) {
    super(dto, options);
    if (this._props.pagination) {
      this._pagination = new PassboltResponsePaginationHeaderEntity(this._props.pagination, options);
      delete this._props.pagination;
    }
  }

  /**
   * Get entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [],
      "properties": {
        "pagination": {
          "type": "object",
        },
      }
    };
  }
}

export default PassboltResponseHeaderEntity;
