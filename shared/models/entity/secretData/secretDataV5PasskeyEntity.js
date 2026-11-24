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
import SecretDataEntity, { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";
import { RESOURCE_TYPE_V5_PASSKEY_SLUG } from "../resourceType/resourceTypeSchemasDefinition";
import PasskeyHmacCredentialsEntity from "../passkey/passkeyHmacCredentialsEntity";
import { PASSKEY_RP_ID_MAX_LENGTH, PASSKEY_RP_ID_REGEXP } from "../../../utils/passkeyRpIdUtils";
import assertString from "validator/es/lib/util/assertString";
import EntityValidationError from "../abstract/entityValidationError";
import {
  PASSKEY_BASE64URL_REGEXP,
  PASSKEY_CREDENTIAL_ID_MAX_LENGTH,
  PASSKEY_CREDENTIAL_ID_MIN_LENGTH,
  PASSKEY_ES256_ALGORITHM,
} from "../../../constants/passkey.const";

const PASSKEY_USERNAME_MAX_LENGTH = 255;
const PASSKEY_USER_DISPLAY_NAME_MAX_LENGTH = 255;
const SECRET_PROPERTIES = [
  "rp_id",
  "credential_id",
  "user_handle",
  "username",
  "user_display_name",
  "algorithm",
  "private_key",
];
const HMAC_CREDENTIALS_PROPERTIES = ["algorithm", "cred_with_uv", "cred_without_uv"];

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
        "resource_type_slug",
        "rp_id",
        "credential_id",
        "user_handle",
        "username",
        "algorithm",
        "private_key",
      ],
      properties: {
        ...SecretDataEntity.getSchema().properties,
        // The type the secret was written for, whatever resource type the server labels it with.
        resource_type_slug: {
          type: "string",
          enum: [RESOURCE_TYPE_V5_PASSKEY_SLUG],
        },
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
        // WebAuthn user.name, equal to the metadata username.
        username: {
          type: "string",
          maxLength: PASSKEY_USERNAME_MAX_LENGTH,
        },
        user_display_name: {
          type: "string",
          maxLength: PASSKEY_USER_DISPLAY_NAME_MAX_LENGTH,
          nullable: true,
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
   * Return the default secret data v5 passkey. A passkey is only created by a registration, which sets every property.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV5PasskeyEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      object_type: SECRET_DATA_OBJECT_TYPE,
      resource_type_slug: RESOURCE_TYPE_V5_PASSKEY_SLUG,
    };

    return new SecretDataV5PasskeyEntity({ ...defaultData, ...data }, options);
  }

  /**
   * Return the default secret property.
   * @param {string} propName the property
   * @returns {undefined} A passkey has no default secret property.
   */
  static getDefaultProp(propName) {
    assertString(propName);
    return;
  }

  /**
   * Are secret different
   * @param {object} secretDto
   * @returns {boolean}
   */
  areSecretsDifferent(secretDto) {
    const hmacCredentials = this.hmacCredentials?.toDto();
    return (
      SECRET_PROPERTIES.some((prop) => this._props[prop] !== secretDto?.[prop]) ||
      HMAC_CREDENTIALS_PROPERTIES.some((prop) => hmacCredentials?.[prop] !== secretDto?.hmac_credentials?.[prop])
    );
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
   * Get the user handle
   * @returns {string} base64url
   */
  get userHandle() {
    return this._props.user_handle;
  }

  /**
   * Get the username
   * @returns {string}
   */
  get username() {
    return this._props.username;
  }

  /**
   * Get the user display name
   * @returns {string|null}
   */
  get userDisplayName() {
    return this._props.user_display_name ?? null;
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
   * Get the PRF secrets
   * @returns {PasskeyHmacCredentialsEntity|null}
   */
  get hmacCredentials() {
    return this._hmacCredentials ?? null;
  }
}

export default SecretDataV5PasskeyEntity;
