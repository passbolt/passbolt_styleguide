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

import secretDataEntity from "./secretDataEntity";

class SecretDataV4DefaultEntity extends secretDataEntity {
  /**
   * @inheritDoc
   */
  constructor(dto = {}, options = {}) {
    super(dto, options);
  }
  /**
   * Get the secret data v4 default schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "password",
      ],
      "properties": {
        "password": {
          "type": "string",
          "maxLength": 4096,
        },
        "description": {
          "type": "string",
          "maxLength": 10000,
          "nullable": true,
        },

      }
    };
  }

  /**
   * Return the default secret data v4 default.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV4DefaultEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      password: "",
    };

    return new SecretDataV4DefaultEntity({...defaultData, ...data}, options);
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

  /**
   * Get description
   * @returns {string} description
   */
  get description() {
    return this._props.description;
  }
}

export default SecretDataV4DefaultEntity;
