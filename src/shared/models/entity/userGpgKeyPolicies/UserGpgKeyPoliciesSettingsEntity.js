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
import {GPG_KEY_TYPE_EDDSA, GPG_KEY_TYPE_RSA} from "../gpgkey/gpgkeyEntity";

const SETTINGS_SOURCE_FILE = "file";
const SETTINGS_SOURCE_ENV = "env";
const SETTINGS_SOURCE_DEFAULT = "default";

class UserGpgKeyPoliciesSettingsEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "preferred_key_type",
      ],
      "properties": {
        "preferred_key_type": {
          "type": "string",
          "enum": [GPG_KEY_TYPE_RSA, GPG_KEY_TYPE_EDDSA]
        },
        "source": {
          "type": "string",
          "enum": [SETTINGS_SOURCE_FILE, SETTINGS_SOURCE_ENV, SETTINGS_SOURCE_DEFAULT]
        }
      }
    };
  }

  /**
   * @inheritDoc
   */
  marshall() {
    if (this._props.preferred_key_type && typeof this._props.preferred_key_type === "string") {
      this._props.preferred_key_type = this._props.preferred_key_type?.toLowerCase();
    }

    super.marshall();
  }

  /**
   * Create user gpg key policies settings based one default.
   * @param {object} data the data to override the default with
   * @returns {UserGpgKeyPoliciesSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      preferred_key_type: GPG_KEY_TYPE_RSA,
      source: SETTINGS_SOURCE_DEFAULT
    };

    return new UserGpgKeyPoliciesSettingsEntity({...defaultData, ...data});
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
   * Source of the settings
   * @returns {string}
   */
  get source() {
    return this._props.source;
  }
}

export default UserGpgKeyPoliciesSettingsEntity;
