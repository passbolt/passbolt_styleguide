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
 * @since         5.12.0
 */

import SecretDataEntity, { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";
import assertString from "validator/es/lib/util/assertString";

class SecretDataV5StandalonePinCodeEntity extends SecretDataEntity {
  /**
   * Get the secret data v5 standalone pin code schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: ["object_type", "pin_code"],
      properties: {
        ...SecretDataEntity.getSchema().properties,
        pin_code: {
          type: "string",
          pattern: /^\d+$/,
          minLength: 4,
          maxLength: 12,
        },
        description: {
          type: "string",
          maxLength: 50000,
          nullable: true,
        },
      },
    };
  }

  /**
   * Return the default secret data v5 standalone pin code.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV5StandalonePinCodeEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      object_type: SECRET_DATA_OBJECT_TYPE,
      pin_code: "",
    };

    return new SecretDataV5StandalonePinCodeEntity({ ...defaultData, ...data }, options);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {string | undefined}
   */
  static getDefaultProp(propName) {
    assertString(propName);
    switch (propName) {
      case "pin_code":
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
    return this.pinCode !== secretDto.pin_code || this.description !== secretDto.description;
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get pin code
   * @returns {string} pin code
   */
  get pinCode() {
    return this._props.pin_code;
  }

  /**
   * Get description
   * @returns {string|null} description
   */
  get description() {
    return this._props.description || null;
  }
}

export default SecretDataV5StandalonePinCodeEntity;
