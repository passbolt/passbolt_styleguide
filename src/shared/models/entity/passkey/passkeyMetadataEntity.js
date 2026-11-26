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
import { PASSKEY_RP_ID_MAX_LENGTH, PASSKEY_RP_ID_REGEXP } from "../../../utils/passkeyRpIdUtils";
import {
  PASSKEY_BASE64URL_REGEXP,
  PASSKEY_CREDENTIAL_ID_MAX_LENGTH,
  PASSKEY_CREDENTIAL_ID_MIN_LENGTH,
} from "../../../constants/passkey.const";

/**
 * The passkey properties of a passkey resource metadata, read before the secret is decrypted.
 */
class PasskeyMetadataEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      type: "object",
      required: ["rp_id", "credential_id", "user_handle", "prf_support"],
      properties: {
        rp_id: {
          type: "string",
          minLength: 1,
          maxLength: PASSKEY_RP_ID_MAX_LENGTH,
          pattern: PASSKEY_RP_ID_REGEXP,
        },
        credential_id: {
          type: "string",
          minLength: PASSKEY_CREDENTIAL_ID_MIN_LENGTH,
          maxLength: PASSKEY_CREDENTIAL_ID_MAX_LENGTH,
          pattern: PASSKEY_BASE64URL_REGEXP,
        },
        // WebAuthn user.id: 1 to 64 bytes.
        user_handle: {
          type: "string",
          minLength: 2,
          maxLength: 86,
          pattern: PASSKEY_BASE64URL_REGEXP,
        },
        // Display only: true when the secret holds PRF secrets, which alone decide whether PRF is evaluated.
        prf_support: {
          type: "boolean",
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
   * Get the relying party id
   * @returns {string}
   */
  get rpId() {
    return this._props.rp_id;
  }

  /**
   * Get the credential id
   * @returns {string} base64url
   */
  get credentialId() {
    return this._props.credential_id;
  }

  /**
   * Get the user handle
   * @returns {string} base64url
   */
  get userHandle() {
    return this._props.user_handle;
  }

  /**
   * Get the PRF support
   * @returns {boolean}
   */
  get prfSupport() {
    return this._props.prf_support;
  }
}

export default PasskeyMetadataEntity;
