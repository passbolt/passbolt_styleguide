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

import SecretDataEntity from "./secretDataEntity";

class secretDataV5PasswordStringEntity extends SecretDataEntity {
  /**
   * Get the secret data v5 default schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "object_type",
        "password",
      ],
      "properties": {
        ...SecretDataEntity.getSchema().properties,
        "password": {
          "type": "string",
          "maxLength": 4096,
          "nullable": true
        }
      }
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get password
   * @returns {string} password
   */
  get password() {
    return this._props.password;
  }
}

export default secretDataV5PasswordStringEntity;
