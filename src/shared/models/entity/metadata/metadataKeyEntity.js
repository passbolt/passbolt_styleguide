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
import MetadataPrivateKeysCollection from "./metadataPrivateKeysCollection";

const PGP_STRING_MAX_LENGTH = 10_000;

class MetadataKeyEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    // Associations
    if (this._props.metadata_private_keys) {
      this._metadata_private_keys = new MetadataPrivateKeysCollection(this._props.metadata_private_keys, {...options, clone: false});
      delete this._props.metadata_private_keys;
    }
  }

  /**
   * Get metadata private key entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "fingerprint",
        "armored_key",
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
          "nullable": true,
        },
        "fingerprint": {
          "type": "string",
          "pattern": /^[a-f0-9]{40}$/im
        },
        "armored_key": {
          "type": "string",
          "maxLength": PGP_STRING_MAX_LENGTH,
          "pattern": /^-----BEGIN PGP PRIVATE KEY BLOCK-----\n(.*\n)*\n([a-zA-Z0-9/+]*\n)*[a-zA-Z0-9/+=]*\n=[a-zA-Z0-9/+=]{4}\n-----END PGP PRIVATE KEY BLOCK-----$/m,
        },
        "created": {
          "type": "string",
          "format": "date-time",
          "nullable": true
        },
        "created_by": {
          "type": "string",
          "format": "uuid",
          "nullable": true
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "nullable": true
        },
        "modified_by": {
          "type": "string",
          "format": "uuid",
          "nullable": true
        },
        "deleted": {
          "type": "string",
          "format": "date-time",
          "nullable": true,
        },
        "metadata_private_keys": MetadataPrivateKeysCollection.getSchema(),
      }
    };
  }

  /**
   * Returns the metadataPrivateKeys collection
   * @returns {MetadataPrivateKeysCollection|null}
   */
  get metadataPrivateKeys() {
    return this._metadata_private_keys || null;
  }
}

export default MetadataKeyEntity;
