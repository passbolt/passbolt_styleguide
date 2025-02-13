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

class SecretDataEntity extends EntityV2 {
  /**
   * Get session keys bundle data entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [],
      "properties": {
        "object_type": {
          "type": "string",
          "enum": ["PASSBOLT_SECRET_DATA"],

        },
      }
    };
  }
}

export default SecretDataEntity;
