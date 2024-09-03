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
 * @since         4.4.0
 */

import EntityValidationError from "../entity/abstract/entityValidationError";
import EntitySchema from "../entity/abstract/entitySchema";
import {RESOURCE_TOTP_KEY_MAX_LENGTH,} from "../../constants/inputs.const";

/**
 * Model related to the TOTP
 */
class TotpViewModel {
  /**
   * Constructor
   * @param {object} [resource]
   */
  constructor(resource = {}) {
    this.secret_key = resource.secret_key || "";
    this.period = resource.period ?? 30;
    this.digits = resource.digits ?? 6;
    this.algorithm = resource.algorithm || TotpViewModel.SUPPORTED_ALGORITHMS[0];
  }

  /**
   * Get current view model schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "secret_key",
        "period",
        "digits",
        "algorithm",
      ],
      properties: {
        secret_key: {
          type: "string",
          notEmpty: true,
          pattern: /^\s*[A-Za-z2-7\s]+=*\s*$/, // BASE32 pattern including lowercase and space before and after
          maxLength: RESOURCE_TOTP_KEY_MAX_LENGTH
        },
        period: {
          type: "number",
          gte: 1
        },
        digits: {
          type: "number",
          lte: 8,
          gte: 6
        },
        algorithm: {
          type: "string",
          notEmpty: true,
          enum: TotpViewModel.SUPPORTED_ALGORITHMS
        }
      }
    };
  }

  /**
   * Returns a DTO with the same data structure of the secret entity dto.
   * @returns {object}
   */
  toSecretDto() {
    return {
      totp: {
        algorithm:  this.algorithm,
        digits: this.digits,
        period: this.period,
        secret_key: this.secret_key.replaceAll(/\s+/g, "").toUpperCase(),
      },
    };
  }

  /**
   * Clone the current object and modify the clone with the given value on the given field
   * @param {string} field the field to change
   * @param {string|number|boolean|null|undefined} value the value to apply on the field
   * @returns {TotpViewModel} the cloned object with the field modified
   */
  cloneWithMutation(field, value) {
    const clone = {
      ...this,
      [field]: value
    };
    return new this.constructor(clone);
  }

  /**
   * Returns true if both the data to be encrypted are different
   * @param {TotpViewModel} a
   * @param {TotpViewModel} b
   * @returns {boolean}
   */
  static areSecretsDifferent(a, b) {
    const keys = [
      "secret_key",
      "period",
      "digits",
      "algorithm",
    ];
    return keys.some(key => a[key] !== b[key]);
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate() {
    try {
      EntitySchema.validate(this.constructor.name, this, this.constructor.getSchema());
    } catch (error) {
      return error;
    }

    return new EntityValidationError();
  }

  /**
   * Validate field
   * @param field
   * @return {EntityValidationError}
   */
  validateField(field) {
    try {
      EntitySchema.validateProp(field, this[field], this.constructor.getSchema().properties[field]);
    } catch (error) {
      return error;
    }

    return new EntityValidationError();
  }

  /**
   * Is warning size fields
   * @param field
   * @return {boolean}
   */
  isWarningSizeField(field) {
    const schema = this.constructor.getSchema();
    return this[field].length >= schema.properties[field].maxLength;
  }

  /**
   * Supported algorithms
   * @return {string[]}
   * @constructor
   */
  static get SUPPORTED_ALGORITHMS() {
    return ["SHA1", "SHA256", "SHA512"];
  }
}

export default TotpViewModel;
