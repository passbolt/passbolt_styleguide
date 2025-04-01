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
import assertString from "validator/es/lib/util/assertString";

class secretDataV4PasswordStringEntity extends SecretDataEntity {
  /**
   * Get session keys bundle data entity schema
   * @returns {Object} schema
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
      }
    };
  }

  /**
   * Return the default secret data v4 password string.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {secretDataV4PasswordStringEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      password: "",
    };

    return new secretDataV4PasswordStringEntity({...defaultData, ...data}, options);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {string | undefined}
   */
  static getDefaultProp(propName) {
    assertString(propName);
    switch (propName) {
      case "password":
        return "";
      default:
        return;
    }
  }

  /**
   * Are secret different
   * @param secretDto
   * @returns {boolean}
   */
  areSecretsDifferent(secretDto) {
    return this.password !== secretDto.password;
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

export default secretDataV4PasswordStringEntity;
