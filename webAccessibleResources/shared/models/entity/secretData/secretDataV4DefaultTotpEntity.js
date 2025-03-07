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

class SecretDataV4DefaultTotpEntity extends SecretDataV4DefaultEntity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.totp) {
      this._totp = new TotpEntity(this._props.totp, {...options, clone: false});
      delete this._props.totp;
    }
  }
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

export default SecretDataV4DefaultTotpEntity;
