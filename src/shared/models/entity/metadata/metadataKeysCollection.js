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
import CollectionValidationError from "../abstract/collectionValidationError";
import EntityV2Collection from "../abstract/entityV2Collection";
import MetadataKeyEntity from "./metadataKeyEntity";

class MetadataKeysCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return MetadataKeyEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by ID.
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by fingerprint.
   */
  constructor(dtos = [], options = {}) {
    super(dtos, options);
  }

  /*
   * ==================================================
   * Validation
   * ==================================================
   */

  /**
   * Get metadata private keys collection schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "array",
      items: MetadataKeyEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @param {Set} [options.uniqueFingerprintsSetCache] A set of unique fingerprints.
   * @throws {EntityValidationError} If a metadata key already exists with the same id.
   * @throws {EntityValidationError} If a metadata key already exists with the same fingerprint.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, { haystackSet: options?.uniqueIdsSetCache });
    this.assertNotExist("fingerprint", item._props.fingerprint, { haystackSet: options?.uniqueFingerprintsSetCache });
  }

  /**
   * Assert that all metadate private key fingerprint match with their public key fingerprint
   *
   * @throws {CollectionValidationError} if one of the decrypted metadata private key fingerprint is not equal to its metadata public key.
   */
  assertFingerprintsPublicAndPrivateKeysMatch() {
    this._items.forEach((metadataKey, index) => {
      try {
        metadataKey.assertFingerprintPublicAndPrivateKeysMatch(index);
      } catch (error) {
        const collectionValidationError = new CollectionValidationError();
        collectionValidationError.addItemValidationError(index, error);
        throw collectionValidationError;
      }
    });
  }

  /**
   * Get the most recently created key in the collection if any.
   * The key with a non null creation date and having the most recent date set is returned.
   * If keys do not have creation date, the last one is returned.
   * If no key is found in the collection, `null` is returned.
   *
   * @returns {MetadataKeyEntity|null}
   */
  getFirstByLatestCreated() {
    if (!this.length) {
      return null;
    }

    return this._items.reduce((latestCreatedItem, item) => {
      if (!latestCreatedItem.created) {
        return item;
      } else if (!item.created) {
        return latestCreatedItem;
      } else {
        return item.created > latestCreatedItem.created ? item : latestCreatedItem;
      }
    });
  }

  /**
   * Transform into dto.
   * @returns {array}
   */
  toDto(contains = {}) {
    return this._items.map((entity) => entity.toDto(contains));
  }

  /**
   * Returns true if at least one of the Metadata key has a decrypted private key.
   * @returns {boolean}
   */
  hasDecryptedKeys() {
    return this._items.some((metadataKey) => metadataKey.metadataPrivateKeys?.hasDecryptedPrivateKeys());
  }

  /**
   * Returns true if at least one of the Metadata key has an encrypted private key.
   * @returns {boolean}
   */
  hasEncryptedKeys() {
    return this._items.some((metadataKey) => metadataKey.metadataPrivateKeys?.hasEncryptedPrivateKeys());
  }

  /**
   * Filter out the resources which metadata is encrypted.
   */
  filterOutMissingMetadataPrivateKeys() {
    this.filterByCallback((metadataKey) => metadataKey.metadataPrivateKeys?.length);
  }

  /*
   * ==================================================
   * Setters
   * ==================================================
   */

  /**
   * @inheritDoc
   */
  pushMany(data, entityOptions = {}, options = {}) {
    const uniqueIdsSetCache = new Set(this.extract("id"));
    const uniqueFingerprintsSetCache = new Set(this.extract("fingerprint"));
    const onItemPushed = (item) => {
      uniqueIdsSetCache.add(item._props.id);
      uniqueFingerprintsSetCache.add(item._props.fingerprint);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: { ...options?.validateBuildRules, uniqueIdsSetCache, uniqueFingerprintsSetCache },
      ...options,
    };

    super.pushMany(data, entityOptions, options);
  }
}

export default MetadataKeysCollection;
