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

import TotpEntity from "../totp/totpEntity";
import SecretDataV4DefaultEntity from "./secretDataV4DefaultEntity";
import assertString from "validator/es/lib/util/assertString";

class SecretDataV4DefaultTotpEntity extends SecretDataV4DefaultEntity {
  /**
   * Get session keys bundle data entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "password",
        "totp"
      ],
      "properties": {
        ...SecretDataV4DefaultEntity.getSchema().properties,
        "totp": TotpEntity.getSchema(),
      }
    };
  }

  /**
   * @inheritDoc
   */
  static get associations() {
    return {
      totp: TotpEntity
    };
  }

  /**
   * Return the default secret data v4 default totp.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV4DefaultTotpEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      password: "",
      totp: TotpEntity.createFromDefault({}, {validate: false}).toDto()
    };

    return new SecretDataV4DefaultTotpEntity({...defaultData, ...data}, options);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {string | object | undefined}
   */
  static getDefaultProp(propName) {
    assertString(propName);
    switch (propName) {
      case "password":
        return "";
      case "description":
        return "";
      case "totp":
        return TotpEntity.createFromDefault({}, {validate: false}).toDto();
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
    const totp = this.totp.toDto();
    const isTotpDifferent = Object.keys(totp).some(key => totp[key] !== secretDto.totp?.[key]);
    return this.password !== secretDto.password || isTotpDifferent || this.description !== secretDto.description;
  }

  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toDto() {
    const result = Object.assign({}, this._props);

    if (this.totp) {
      result.totp = this.totp.toDto();
    }

    return result;
  }

  /**
   * Get the totp association.
   * @returns {TotpEntity}
   */
  get totp() {
    return this._totp;
  }
}

export default SecretDataV4DefaultTotpEntity;
