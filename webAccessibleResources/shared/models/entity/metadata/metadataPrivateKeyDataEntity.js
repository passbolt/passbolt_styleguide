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
 * @since         4.10.0
 */
import EntityV2 from "../abstract/entityV2";

const PGP_STRING_MAX_LENGTH = 10_000;
const DOMAIN_MAX_LENGTH = 1024;
const PASSPHRASE_MAX_LENGTH = 1024;

class MetadataPrivateKeyDataEntity extends EntityV2 {
  /**
   * Get metadata private key data entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "object_type",
        "domain",
        "fingerprint",
        "armored_key",
        "passphrase",
      ],
      "properties": {
        "object_type": {
          "type": "string",
          "enum": ["PASSBOLT_METADATA_PRIVATE_KEY"]
        },
        "domain": {
          "type": "string",
          "maxLength": DOMAIN_MAX_LENGTH
        },
        "fingerprint": {
          "type": "string",
          "pattern": /^[a-f0-9]{40}$/im
        },
        "armored_key": {
          "type": "string",
          "maxLength": PGP_STRING_MAX_LENGTH,
          "pattern": /^-----BEGIN PGP PRIVATE KEY BLOCK-----([\r\n])([ -9;-~]{1,76}: [ -~]{1,76}([\r\n]))*\n([a-zA-Z0-9\/+=]{1,76}([\r\n]))*=[a-zA-Z0-9\/+=]{4}([\r\n])-----END PGP PRIVATE KEY BLOCK-----([\r\n]*)$/,
        },
        "passphrase": {
          "type": "string",
          "maxLength": PASSPHRASE_MAX_LENGTH,
        },
      }
    };
  }

  /**
   * Returns the armored_key field of the entity
   * @returns {string}
   */
  get armoredKey() {
    return this._props.armored_key;
  }

  /**
   * Returns the fingerprint field of the entity
   * @returns {string}
   */
  get fingerprint() {
    return this._props.fingerprint;
  }
}

export default MetadataPrivateKeyDataEntity;
