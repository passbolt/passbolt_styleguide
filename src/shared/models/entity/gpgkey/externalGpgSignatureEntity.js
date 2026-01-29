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
 * @since         5.1.0
 */
import EntityV2 from "../abstract/entityV2";

const FINGERPRINT_MIN_LENGTH = 40;
const FINGERPRINT_MAX_LENGTH = 40;

class ExternalGpgSignatureEntity extends EntityV2 {
  /**
   * Get external gpg signature entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["issuer_fingerprint", "is_verified", "created"],
      properties: {
        issuer_fingerprint: {
          type: "string",
          minLength: FINGERPRINT_MIN_LENGTH,
          maxLength: FINGERPRINT_MAX_LENGTH,
        },
        is_verified: {
          type: "boolean",
        },
        created: {
          type: "string",
          format: "date-time",
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
   * Get gpg signature issuer fingerprint
   * @returns {string}
   */
  get issuerFingerprint() {
    return this._props.issuer_fingerprint;
  }

  /**
   * Return true if the signature is verified.
   * @returns {boolean}
   */
  get isVerified() {
    return this._props.is_verified;
  }

  /**
   * Get time at when the signature has been created
   * @returns {string}
   */
  get created() {
    return this._props.created;
  }
}

export default ExternalGpgSignatureEntity;
