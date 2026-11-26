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
import EntityValidationError from "../abstract/entityValidationError";
import PasskeyHmacCredentialsEntity from "./passkeyHmacCredentialsEntity";
import { PASSKEY_RP_ID_MAX_LENGTH, PASSKEY_RP_ID_REGEXP } from "../../../utils/passkeyRpIdUtils";
import {
  PASSKEY_BASE64URL_REGEXP,
  PASSKEY_CREDENTIAL_ID_MAX_LENGTH,
  PASSKEY_CREDENTIAL_ID_MIN_LENGTH,
  PASSKEY_ES256_ALGORITHM,
} from "../../../constants/passkey.const";

const PASSKEY_USER_DISPLAY_NAME_MAX_LENGTH = 255;

/**
 * The passkey properties of a passkey secret.
 */
class PasskeySecretEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      type: "object",
      required: ["rp_id", "credential_id", "algorithm", "private_key"],
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
        // COSE algorithm identifier of the credential.
        algorithm: {
          type: "integer",
          enum: [PASSKEY_ES256_ALGORITHM],
        },
        // PKCS#8 DER of an ECDSA P-256 key, with or without its public key.
        private_key: {
          type: "string",
          minLength: 90,
          maxLength: 256,
          pattern: PASSKEY_BASE64URL_REGEXP,
        },
        user_display_name: {
          type: "string",
          maxLength: PASSKEY_USER_DISPLAY_NAME_MAX_LENGTH,
          nullable: true,
        },
        hmac_credentials: PasskeyHmacCredentialsEntity.getSchema(),
      },
    };
  }

  /**
   * @inheritDoc
   */
  static get associations() {
    return {
      hmac_credentials: PasskeyHmacCredentialsEntity,
    };
  }

  /**
   * @inheritDoc
   * The schema object type lets null through: the PRF secrets are either absent or valid.
   * @throws {EntityValidationError} If the PRF secrets are null.
   */
  validateBuildRules() {
    if (this._props.hmac_credentials === null) {
      const error = new EntityValidationError();
      error.addError("hmac_credentials", "type", "The hmac_credentials is not a valid object.");
      throw error;
    }
  }

  /**
   * @inheritDoc
   */
  toDto() {
    const result = { ...this._props };
    if (this._hmacCredentials) {
      result.hmac_credentials = this._hmacCredentials.toDto();
    }
    return result;
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
   * Get the COSE algorithm identifier
   * @returns {number}
   */
  get algorithm() {
    return this._props.algorithm;
  }

  /**
   * Get the private key
   * @returns {string} base64url PKCS#8
   */
  get privateKey() {
    return this._props.private_key;
  }

  /**
   * Get the user display name
   * @returns {string|null}
   */
  get userDisplayName() {
    return this._props.user_display_name ?? null;
  }

  /**
   * Get the PRF secrets
   * @returns {PasskeyHmacCredentialsEntity|null}
   */
  get hmacCredentials() {
    return this._hmacCredentials ?? null;
  }
}

export default PasskeySecretEntity;
