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
import PasskeySecretEntity from "../passkey/passkeySecretEntity";
import assertString from "validator/es/lib/util/assertString";
import EntityValidationError from "../abstract/entityValidationError";

const PASSKEY_USERNAME_MAX_LENGTH = 255;
const PASSKEY_PROPERTIES = ["rp_id", "credential_id", "algorithm", "private_key", "user_display_name"];
const HMAC_CREDENTIALS_PROPERTIES = ["algorithm", "cred_with_uv", "cred_without_uv"];

class SecretDataV5PasskeyEntity extends SecretDataEntity {
  /**
   * Get the secret data v5 passkey schema
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: ["object_type", "resource_type_slug", "username", "passkey"],
      properties: {
        ...SecretDataEntity.getSchema().properties,
        // The type the secret was written for, whatever resource type the server labels it with.
        resource_type_slug: {
          type: "string",
          enum: [RESOURCE_TYPE_V5_PASSKEY_SLUG],
        },
        // WebAuthn user.name, equal to the metadata username.
        username: {
          type: "string",
          maxLength: PASSKEY_USERNAME_MAX_LENGTH,
        },
        passkey: PasskeySecretEntity.getSchema(),
      },
    };
  }

  /**
   * @inheritDoc
   */
  static get associations() {
    return {
      passkey: PasskeySecretEntity,
    };
  }

  /**
   * @inheritDoc
   * The schema object type lets null through.
   * @throws {EntityValidationError} If the passkey is null.
   */
  validateBuildRules() {
    if (this._props.passkey === null) {
      const error = new EntityValidationError();
      error.addError("passkey", "type", "The passkey is not a valid object.");
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
    const passkey = this._passkey.toDto();
    const otherPasskey = secretDto?.passkey;
    return (
      this._props.username !== secretDto?.username ||
      PASSKEY_PROPERTIES.some((prop) => passkey[prop] !== otherPasskey?.[prop]) ||
      HMAC_CREDENTIALS_PROPERTIES.some(
        (prop) => passkey.hmac_credentials?.[prop] !== otherPasskey?.hmac_credentials?.[prop],
      )
    );
  }

  /**
   * @inheritDoc
   */
  toDto() {
    const result = { ...this._props };
    if (this._passkey) {
      result.passkey = this._passkey.toDto();
    }
    return result;
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the username
   * @returns {string}
   */
  get username() {
    return this._props.username;
  }

  /**
   * Get the passkey properties
   * @returns {PasskeySecretEntity|null}
   */
  get passkey() {
    return this._passkey ?? null;
  }

  /**
   * Get the relying party id
   * @returns {string}
   */
  get rpId() {
    return this._passkey.rpId;
  }

  /**
   * Get the credential id
   * @returns {string} base64url
   */
  get credentialId() {
    return this._passkey.credentialId;
  }

  /**
   * Get the user display name
   * @returns {string|null}
   */
  get userDisplayName() {
    return this._passkey.userDisplayName;
  }

  /**
   * Get the COSE algorithm identifier
   * @returns {number}
   */
  get algorithm() {
    return this._passkey.algorithm;
  }

  /**
   * Get the private key
   * @returns {string} base64url PKCS#8
   */
  get privateKey() {
    return this._passkey.privateKey;
  }

  /**
   * Get the PRF secrets
   * @returns {PasskeyHmacCredentialsEntity|null}
   */
  get hmacCredentials() {
    return this._passkey.hmacCredentials;
  }
}

export default SecretDataV5PasskeyEntity;
