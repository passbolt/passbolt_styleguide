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
import SecretDataV5DefaultEntity from "./secretDataV5DefaultEntity";
import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";
import assertString from "validator/es/lib/util/assertString";

class SecretDataV5DefaultTotpEntity extends SecretDataV5DefaultEntity {
  /**
   * Get the secret data default totp schema
   * @returns {object}
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "object_type",
        "password",
        "totp"
      ],
      "properties": {
        ...SecretDataV5DefaultEntity.getSchema().properties,
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
   * Return the default secret data v5 default totp.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV5DefaultTotpEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      object_type: SECRET_DATA_OBJECT_TYPE,
      password: "",
      totp: TotpEntity.createFromDefault({}, {validate: false}).toDto()
    };

    return new SecretDataV5DefaultTotpEntity({...defaultData, ...data}, options);
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
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toDto() {
    return {
      ...this._props,
      totp: this.totp.toDto(),
    };
  }

  /**
   * Get the totp association.
   * @returns {TotpEntity}
   */
  get totp() {
    return this._totp;
  }
}

export default SecretDataV5DefaultTotpEntity;
