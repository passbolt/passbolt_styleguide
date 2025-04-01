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
 * @since         4.5.0
 */
import EntityV2 from "../abstract/entityV2";

const RESOURCE_TOTP_KEY_MAX_LENGTH = 1024;
export const SUPPORTED_TOTP_ALGORITHMS = ["SHA1", "SHA256", "SHA512"];
const DEFAULT_ALGORITHM = SUPPORTED_TOTP_ALGORITHMS[0];
/**
 * Entity related to the TOTP
 */
class TotpEntity extends EntityV2 {
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
          minLength: 1,
          pattern: /^[A-Z2-7]+=*$/, // BASE32
          maxLength: RESOURCE_TOTP_KEY_MAX_LENGTH
        },
        period: {
          type: "integer",
          minimum: 1
        },
        digits: {
          type: "integer",
          minimum: 6,
          maximum: 8,
        },
        algorithm: {
          type: "string",
          enum: SUPPORTED_TOTP_ALGORITHMS
        }
      }
    };
  }

  /**
   * @inheritdoc
   */
  marshall() {
    /*
     * Sanitize secret_key:
     * - Replace white spaces.
     * - Capitalize characters.
     * - Remove all special characters.
     */
    if (typeof this._props.secret_key === "string") {
      this._props.secret_key = this._props.secret_key?.replace(/(\W|_|\s)/g, '').toUpperCase();
    }

    /*
     * Sanitize algorithm
     * - Capitalize characters.
     */
    if (typeof this._props.algorithm === "string") {
      this._props.algorithm = this._props.algorithm?.toUpperCase();
    }
    super.marshall();
  }

  /**
   * Return the default totp.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {TotpEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      secret_key: "",
      period: 30,
      digits: 6,
      algorithm: DEFAULT_ALGORITHM
    };

    return new TotpEntity({...defaultData, ...data}, options);
  }

  /**
   * Create TOTP from URL
   * @param url {URL}
   * @param {object} [options] Options.
   * @return {TotpEntity}
   */
  static createTotpFromUrl(url, options) {
    const totp = {
      secret_key: url.searchParams.get('secret'),
      algorithm: url.searchParams.get('algorithm') || DEFAULT_ALGORITHM,
      digits: parseInt(url.searchParams.get('digits'), 10) || 6,
      period: parseInt(url.searchParams.get('period'), 10) || 30,
    };
    return new TotpEntity(totp, options);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get resource id
   * @returns {string} base32 secret key
   */
  get secretKey() {
    return this._props.secret_key;
  }

  /**
   * Get period
   * @returns {number} period
   */
  get period() {
    return this._props.period;
  }

  /**
   * Get digits
   * @returns {number} digits
   */
  get digits() {
    return this._props.digits;
  }

  /**
   * Get algorithm
   * @returns {string} algorithm
   */
  get algorithm() {
    return this._props.algorithm;
  }

  /**
   * Has secret key value
   * @returns {boolean}
   */
  get hasSecretKey() {
    return this.secretKey?.length > 0;
  }
}

export default TotpEntity;
