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

import PasskeyEntity from "../passkey/passkeyEntity";
import SecretDataEntity, { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";

class SecretDataV5PasskeyEntity extends SecretDataEntity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.passkey) {
      this._passkey = new PasskeyEntity(this._props.passkey, { ...options, clone: false });
      delete this._props.passkey;
    }
  }

  /**
   * Get the secret data v5 passkey schema.
   *
   * The credential material (private key, credential id, signature counter, ...) is kept in
   * the encrypted secret. The relying party id and user name are also stored here in addition
   * to the (encrypted) metadata, so a single decryption gives everything needed to satisfy a
   * WebAuthn assertion.
   *
   * @returns {object}
   */
  static getSchema() {
    return {
      type: "object",
      required: ["object_type", "passkey"],
      properties: {
        ...SecretDataEntity.getSchema().properties,
        passkey: PasskeyEntity.getSchema(),
      },
    };
  }

  /**
   * @inheritDoc
   */
  static get associations() {
    return {
      passkey: PasskeyEntity,
    };
  }

  /**
   * @inheritdoc
   */
  marshall() {
    // Set object type in case the secret has no object_type (example: legacy import).
    if (!this._props.object_type) {
      this._props.object_type = SECRET_DATA_OBJECT_TYPE;
    }
  }

  /**
   * Return the default secret data v5 passkey.
   * @param {object} data the data to override the default with
   * @param {object} [options] Options.
   * @returns {SecretDataV5PasskeyEntity}
   */
  static createFromDefault(data = {}, options) {
    const defaultData = {
      object_type: SECRET_DATA_OBJECT_TYPE,
      passkey: PasskeyEntity.createFromDefault({}, { validate: false }).toDto(),
    };

    return new SecretDataV5PasskeyEntity({ ...defaultData, ...data }, options);
  }

  /**
   * Are secrets different.
   * @param {object} secretDto
   * @returns {boolean}
   */
  areSecretsDifferent(secretDto) {
    const passkey = this.passkey.toDto();
    return Object.keys(passkey).some((key) => passkey[key] !== secretDto?.passkey?.[key]);
  }

  /**
   * @inheritdoc
   */
  toDto() {
    const result = Object.assign({}, this._props);

    if (this.passkey) {
      result.passkey = this.passkey.toDto();
    }

    return result;
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the passkey association.
   * @returns {PasskeyEntity}
   */
  get passkey() {
    return this._passkey;
  }
}

export default SecretDataV5PasskeyEntity;
