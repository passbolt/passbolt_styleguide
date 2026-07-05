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
 * @since         5.13.0
 */
import EntityV2 from "../abstract/entityV2";

const PASSKEY_CREDENTIAL_ID_MAX_LENGTH = 1024;
const PASSKEY_RP_ID_MAX_LENGTH = 253;
const PASSKEY_USER_HANDLE_MAX_LENGTH = 1024;
const PASSKEY_USER_NAME_MAX_LENGTH = 255;
const PASSKEY_KEY_MAX_LENGTH = 4096;
const PASSKEY_CREATED_MAX_LENGTH = 64;

// COSE algorithm identifier for ES256 (ECDSA w/ SHA-256), the default passkey algorithm.
export const PASSKEY_ALGORITHM_ES256 = -7;

/**
 * Entity related to a WebAuthn passkey credential stored on behalf of a third-party relying party.
 * The private key never leaves the encrypted secret; this entity only models its (decrypted) shape.
 */
class PasskeyEntity extends EntityV2 {
  /**
   * Get current view model schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["credential_id", "rp_id", "private_key", "algorithm"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        credential_id: {
          type: "string",
          maxLength: PASSKEY_CREDENTIAL_ID_MAX_LENGTH,
        },
        rp_id: {
          type: "string",
          maxLength: PASSKEY_RP_ID_MAX_LENGTH,
        },
        user_handle: {
          type: "string",
          maxLength: PASSKEY_USER_HANDLE_MAX_LENGTH,
          nullable: true,
        },
        user_name: {
          type: "string",
          maxLength: PASSKEY_USER_NAME_MAX_LENGTH,
          nullable: true,
        },
        user_display_name: {
          type: "string",
          maxLength: PASSKEY_USER_NAME_MAX_LENGTH,
          nullable: true,
        },
        private_key: {
          type: "string",
          maxLength: PASSKEY_KEY_MAX_LENGTH,
        },
        public_key: {
          type: "string",
          maxLength: PASSKEY_KEY_MAX_LENGTH,
          nullable: true,
        },
        algorithm: {
          type: "integer",
        },
        counter: {
          type: "integer",
          minimum: 0,
          nullable: true,
        },
        discoverable: {
          type: "boolean",
          nullable: true,
        },
        label: {
          type: "string",
          maxLength: PASSKEY_USER_NAME_MAX_LENGTH,
          nullable: true,
        },
        created: {
          type: "string",
          maxLength: PASSKEY_CREATED_MAX_LENGTH,
          nullable: true,
        },
        deleted_at: {
          type: "string",
          maxLength: PASSKEY_CREATED_MAX_LENGTH,
          nullable: true,
        },
      },
    };
  }

  /**
   * Return the default passkey.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {PasskeyEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      credential_id: "",
      rp_id: "",
      private_key: "",
      algorithm: PASSKEY_ALGORITHM_ES256,
      counter: 0,
    };

    return new PasskeyEntity({ ...defaultData, ...data }, options);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the passkey id (uuid, used for per-passkey management inside a secret).
   * @returns {string|null}
   */
  get id() {
    return this._props.id ?? null;
  }

  /**
   * Get the user-defined label.
   * @returns {string|null}
   */
  get label() {
    return this._props.label ?? null;
  }

  /**
   * Get the credential id (base64url).
   * @returns {string}
   */
  get credentialId() {
    return this._props.credential_id;
  }

  /**
   * Get the relying party id.
   * @returns {string}
   */
  get rpId() {
    return this._props.rp_id;
  }

  /**
   * Get the user handle (base64url).
   * @returns {string|null}
   */
  get userHandle() {
    return this._props.user_handle ?? null;
  }

  /**
   * Get the user name.
   * @returns {string|null}
   */
  get userName() {
    return this._props.user_name ?? null;
  }

  /**
   * Get the user display name.
   * @returns {string|null}
   */
  get userDisplayName() {
    return this._props.user_display_name ?? null;
  }

  /**
   * Get the private key (encoded).
   * @returns {string}
   */
  get privateKey() {
    return this._props.private_key;
  }

  /**
   * Get the public key (encoded), if stored.
   * @returns {string|null}
   */
  get publicKey() {
    return this._props.public_key ?? null;
  }

  /**
   * Get the COSE algorithm identifier.
   * @returns {number}
   */
  get algorithm() {
    return this._props.algorithm;
  }

  /**
   * Get the signature counter.
   * @returns {number}
   */
  get counter() {
    return this._props.counter ?? 0;
  }

  /**
   * Whether the credential is discoverable (resident).
   * @returns {boolean}
   */
  get discoverable() {
    return this._props.discoverable ?? false;
  }

  /**
   * Get the creation timestamp.
   * @returns {string|null}
   */
  get created() {
    return this._props.created ?? null;
  }
}

export default PasskeyEntity;
