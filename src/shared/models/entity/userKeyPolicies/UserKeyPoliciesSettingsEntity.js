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
 * @since         5.1.1
 */
import EntityV2 from "../abstract/entityV2";
import EntityValidationError from "../abstract/entityValidationError";
import {
  GPG_KEY_TYPE_RSA,
  GPG_KEY_TYPE_CURVE,
  GPG_KEY_SIZE_RSA_3072,
  GPG_KEY_SIZE_RSA_4096,
  GPG_KEY_CURVE_25519,
} from "../gpgkey/gpgkeyEntity";

const SETTINGS_SOURCE_FILE = "file";
const SETTINGS_SOURCE_ENV = "env";
const SETTINGS_SOURCE_DEFAULT = "default";

class UserKeyPoliciesSettingsEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      type: "object",
      required: ["preferred_key_type"],
      properties: {
        preferred_key_type: {
          type: "string",
          enum: [GPG_KEY_TYPE_RSA, GPG_KEY_TYPE_CURVE],
        },
        preferred_key_size: {
          type: "integer",
          enum: [GPG_KEY_SIZE_RSA_3072, GPG_KEY_SIZE_RSA_4096],
          nullable: true,
        },
        preferred_key_curve: {
          type: "string",
          enum: [GPG_KEY_CURVE_25519],
          nullable: true,
        },
        source: {
          type: "string",
          enum: [SETTINGS_SOURCE_FILE, SETTINGS_SOURCE_ENV, SETTINGS_SOURCE_DEFAULT],
        },
      },
    };
  }

  /**
   * @inheritDoc
   */
  marshall() {
    if (this._props.preferred_key_type && typeof this._props.preferred_key_type === "string") {
      this._props.preferred_key_type = this._props.preferred_key_type?.toLowerCase();
    }

    if (this._props.preferred_key_type === GPG_KEY_TYPE_RSA && !this._props.preferred_key_size) {
      this._props.preferred_key_size = GPG_KEY_SIZE_RSA_3072;
    }

    if (this._props.preferred_key_type === GPG_KEY_TYPE_CURVE && !this._props.preferred_key_curve) {
      this._props.preferred_key_curve = GPG_KEY_CURVE_25519;
    }

    super.marshall();
  }

  /**
   * @inheritDoc
   */
  validateBuildRules() {
    if (this._props.preferred_key_type === GPG_KEY_TYPE_RSA && Boolean(this._props.preferred_key_curve)) {
      const error = new EntityValidationError();
      error.addError(
        "preferred_key_curve",
        "unwanted_preferred_key_curve",
        `The 'preferred_key_curve' should be null if preferred_key_type is set to '${GPG_KEY_TYPE_RSA}'`,
      );
      throw error;
    }

    if (this._props.preferred_key_type === GPG_KEY_TYPE_CURVE && Boolean(this._props.preferred_key_size)) {
      const error = new EntityValidationError();
      error.addError(
        "preferred_key_size",
        "unwanted_preferred_key_size",
        `The 'preferred_key_size' should be null if preferred_key_type is set to '${GPG_KEY_TYPE_CURVE}'`,
      );
      throw error;
    }

    super.marshall();
  }

  /**
   * Create user gpg key policies settings based one default.
   * @param {object} data the data to override the default with
   * @returns {UserKeyPoliciesSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      preferred_key_type: GPG_KEY_TYPE_RSA,
      source: SETTINGS_SOURCE_DEFAULT,
    };

    return new UserKeyPoliciesSettingsEntity({ ...defaultData, ...data });
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the preferred key type.
   * @returns {string}
   */
  get preferredKeyType() {
    return this._props.preferred_key_type;
  }

  /**
   * Get the preferred key size.
   * @returns {number|null}
   */
  get preferredKeySize() {
    return this._props.preferred_key_size || null;
  }

  /**
   * Get the preferred key curve.
   * @returns {string|null}
   */
  get preferredKeyCurve() {
    return this._props.preferred_key_curve || null;
  }

  /**
   * Source of the settings
   * @returns {string}
   */
  get source() {
    return this._props.source;
  }
}

export default UserKeyPoliciesSettingsEntity;
