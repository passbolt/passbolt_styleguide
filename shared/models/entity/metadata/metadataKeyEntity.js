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
import EntityValidationError from "../abstract/entityValidationError";
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
      this.assertSameMetadataKeyId();
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
          "pattern": /^-----BEGIN PGP PUBLIC KEY BLOCK-----\n(.*\n)*\n([a-zA-Z0-9/+]*\n)*[a-zA-Z0-9/+=]*\n=[a-zA-Z0-9/+=]{4}\n-----END PGP PUBLIC KEY BLOCK-----$/m,
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
   * @inheritDoc
   * @throws {EntityValidationError} if the collection of metadata private keys references a different metadata key id.
   */
  validateBuildRules() {
    /*
     * The following assetion cannot be executed as the build rules validation is executed prior to the association initialization.
     * this.assertSameMetadataKeyId();
     */
  }

  /**
   * Asserts that only one of `data` and `armoredKey` is defined
   * @throws {EntityValidationError} if the collection of metadata private keys references a different metadata key id.
   */
  assertSameMetadataKeyId() {
    const privateMetadataKeysLength = this._metadata_private_keys?.length || 0;
    if (privateMetadataKeysLength === 0) {
      return;
    }

    const keyId = this._props.id;
    const privateKeyId = this._metadata_private_keys.items[0].metadataKeyId;

    if (keyId !== privateKeyId) {
      const error = new EntityValidationError();
      error.addError("id:metadata_private_keys", 'same_id', '`id` and the `metadata_private_keys.id` should be the same');
      throw error;
    }
  }

  /**
   * Returns the metadataPrivateKeys collection
   * @returns {MetadataPrivateKeysCollection|null}
   */
  get metadataPrivateKeys() {
    return this._metadata_private_keys || null;
  }

  /**
   * Get the created date of the metadata key if any or null.
   * @returns {string|null}
   */
  get created() {
    return this._props.created || null;
  }
}

export default MetadataKeyEntity;
