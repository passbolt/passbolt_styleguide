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
 * @since         5.18.0
 */
import EntityV2 from "../abstract/entityV2";
import { PASSKEY_BASE64URL_REGEXP, PASSKEY_HMAC_ALGORITHM } from "../../../constants/passkey.const";

// A 32 bytes secret in unpadded base64url.
const HMAC_SECRET_LENGTH = 43;

/**
 * The PRF secrets of a passkey, in the shape of the FIDO Credential Exchange Format hmacCredentials.
 */
class PasskeyHmacCredentialsEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      type: "object",
      required: ["algorithm", "cred_with_uv", "cred_without_uv"],
      properties: {
        algorithm: {
          type: "string",
          enum: [PASSKEY_HMAC_ALGORITHM],
        },
        cred_with_uv: {
          type: "string",
          minLength: HMAC_SECRET_LENGTH,
          maxLength: HMAC_SECRET_LENGTH,
          pattern: PASSKEY_BASE64URL_REGEXP,
        },
        cred_without_uv: {
          type: "string",
          minLength: HMAC_SECRET_LENGTH,
          maxLength: HMAC_SECRET_LENGTH,
          pattern: PASSKEY_BASE64URL_REGEXP,
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
   * Get the algorithm
   * @returns {string}
   */
  get algorithm() {
    return this._props.algorithm;
  }

  /**
   * Get the secret used when the user was verified, the one PRF results derive from.
   * @returns {string} base64url
   */
  get credWithUv() {
    return this._props.cred_with_uv;
  }

  /**
   * Get the secret used when the user was not verified.
   * @returns {string} base64url
   */
  get credWithoutUv() {
    return this._props.cred_without_uv;
  }
}

export default PasskeyHmacCredentialsEntity;
