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
 * @since         5.12.0
 */

import SecretDataEntity from "./secretDataEntity";

export const PASSKEY_SECRET_OBJECT_TYPE = "PASSLY_PASSKEY";
export const PASSKEY_SECRET_SCHEMA_VERSION = 1;

class SecretDataV5PasskeyEntity extends SecretDataEntity {
  /**
   * Get the secret data v5 passkey schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "object_type",
        "schema_version",
        "credential_id",
        "rp_id",
        "user_handle",
        "user_name",
        "cose_alg",
        "public_key_cose",
        "private_key_pkcs8",
        "aaguid",
        "backup_eligible",
        "backup_state",
        "sign_count",
      ],
      properties: {
        object_type: {
          type: "string",
          enum: [PASSKEY_SECRET_OBJECT_TYPE],
        },
        schema_version: {
          type: "integer",
          enum: [PASSKEY_SECRET_SCHEMA_VERSION],
        },
        credential_id: {
          type: "string",
          maxLength: 8192,
          pattern: /^[\w-]+$/,
        },
        rp_id: {
          type: "string",
          maxLength: 253,
        },
        origin: {
          type: "string",
          maxLength: 1024,
          nullable: true,
        },
        user_handle: {
          type: "string",
          maxLength: 8192,
          pattern: /^[\w-]+$/,
        },
        user_name: {
          type: "string",
          maxLength: 255,
        },
        user_display_name: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        cose_alg: {
          type: "integer",
          enum: [-7],
        },
        public_key_cose: {
          type: "string",
          maxLength: 8192,
          pattern: /^[\w-]+$/,
        },
        private_key_pkcs8: {
          type: "string",
          maxLength: 8192,
          pattern: /^[\w-]+$/,
        },
        aaguid: {
          type: "string",
          format: "uuid",
        },
        backup_eligible: {
          type: "boolean",
        },
        backup_state: {
          type: "boolean",
        },
        sign_count: {
          type: "integer",
          minimum: 0,
        },
        transports: {
          type: "array",
          maxItems: 8,
          items: {
            type: "string",
            enum: ["ble", "hybrid", "internal", "nfc", "usb"],
          },
        },
        extensions: {
          type: "object",
          required: [],
          properties: {},
        },
        description: {
          type: "string",
          maxLength: 50000,
          nullable: true,
        },
      },
    };
  }

  /**
   * Return the default secret data v5 passkey.
   * This is only a fallback; passkeys are normally created by the WebAuthn provider.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV5PasskeyEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      object_type: PASSKEY_SECRET_OBJECT_TYPE,
      schema_version: PASSKEY_SECRET_SCHEMA_VERSION,
      credential_id: "",
      rp_id: "",
      user_handle: "",
      user_name: "",
      cose_alg: -7,
      public_key_cose: "",
      private_key_pkcs8: "",
      aaguid: "00000000-0000-0000-0000-000000000000",
      backup_eligible: false,
      backup_state: false,
      sign_count: 0,
      transports: ["internal"],
      extensions: {},
    };

    return new SecretDataV5PasskeyEntity({ ...defaultData, ...data }, options);
  }

  /**
   * Are secret different
   * @param secretDto
   * @returns {boolean}
   */
  areSecretsDifferent(secretDto = {}) {
    const current = this.toDto();
    const keys = Array.from(new Set([...Object.keys(current), ...Object.keys(secretDto)])).sort();
    return keys.some((key) => JSON.stringify(current[key] ?? null) !== JSON.stringify(secretDto[key] ?? null));
  }
}

export default SecretDataV5PasskeyEntity;
