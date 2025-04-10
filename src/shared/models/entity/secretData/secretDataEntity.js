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
 * @since         5.0.0
 */

import EntityV2 from "../abstract/entityV2";

export const SECRET_DATA_OBJECT_TYPE = "PASSBOLT_SECRET_DATA";

class SecretDataEntity extends EntityV2 {
  /**
   * Get the secret data schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [],
      "properties": {
        "object_type": {
          "type": "string",
          "enum": [SECRET_DATA_OBJECT_TYPE],
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
   * Get object type
   * @returns {string} object_type
   */
  get objectType() {
    return this._props.object_type;
  }
}

export default SecretDataEntity;
