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
import MetadataKeyEntity from "./metadataKeyEntity";

const FINGERPRINT_MIN_LENGTH = 40;
const FINGERPRINT_MAX_LENGTH = 40;

class MetadataTrustedKeyEntity extends EntityV2 {
  /**
   * Get external gpg signature entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "fingerprint",
        "signed"
      ],
      "properties": {
        "fingerprint": {
          "type": "string",
          "pattern": /^[a-f0-9]{40}$/im,
          "minLength": FINGERPRINT_MIN_LENGTH,
          "maxLength": FINGERPRINT_MAX_LENGTH
        },
        "signed": {
          "type": "string",
          "format": "date-time"
        }
      }
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get trusted key fingerprint
   * @returns {string}
   */
  get fingerprint() {
    return this._props.fingerprint;
  }

  /**
   * Get time at when the key has been signed
   * @returns {string}
   */
  get signed() {
    return this._props.signed;
  }

  /**
   * Check if a given metadata key is trusted.
   * @param {MetadataKeyEntity} metadataKey The metadata key to check.
   * @returns {boolean}
   * @throws {TypeError} If `metadataKey` parameter is not of type MetadataKeyEntity
   */
  isMetadataKeyTrusted(metadataKey) {
    if (!(metadataKey instanceof MetadataKeyEntity)) {
      throw new TypeError("The metadataKey is not of MetadataKeyEntity type");
    }
    return metadataKey.fingerprint === this.fingerprint;
  }
}

export default MetadataTrustedKeyEntity;
