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
import SecretDataEntity from "./secretDataEntity";
import assertString from "validator/es/lib/util/assertString";

class SecretDataV4StandaloneTotpEntity extends SecretDataEntity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.totp) {
      this._totp = new TotpEntity(this._props.totp, { ...options, clone: false });
      delete this._props.totp;
    }
  }
  /**
   * Get the secret data v4 standalone schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: ["totp"],
      properties: {
        totp: TotpEntity.getSchema(),
      },
    };
  }

  /**
   * @inheritDoc
   */
  static get associations() {
    return {
      totp: TotpEntity,
    };
  }

  /**
   * Return the default secret data v4 totp.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV4StandaloneTotpEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      totp: TotpEntity.createFromDefault({}, { validate: false }).toDto(),
    };

    return new SecretDataV4StandaloneTotpEntity({ ...defaultData, ...data }, options);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {object | undefined}
   */
  static getDefaultProp(propName) {
    assertString(propName);
    switch (propName) {
      case "totp":
        return TotpEntity.createFromDefault({}, { validate: false }).toDto();
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
    return Object.keys(totp).some((key) => totp[key] !== secretDto.totp?.[key]);
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

export default SecretDataV4StandaloneTotpEntity;
