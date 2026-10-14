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
 * @since         5.16.0
 */

import EntityV2 from "../../abstract/entityV2";

class ScimEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      type: "object",
      required: ["isScimTokenNotExpired", "isScimTokenNotNearExpiry"],
      properties: {
        isScimTokenNotExpired: {
          type: "boolean",
        },
        isScimTokenNotNearExpiry: {
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
   * Get the flag informing whether the secret token is not expired.
   * @returns {boolean}
   */
  get isScimTokenNotExpired() {
    return this._props.isScimTokenNotExpired;
  }

  /**
   * Get the flag informing whether the secret token is not near expiry.
   * @returns {boolean}
   */
  get isScimTokenNotNearExpiry() {
    return this._props.isScimTokenNotNearExpiry;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */

  /**
   * ScimEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return "Scim";
  }
}

export default ScimEntity;
