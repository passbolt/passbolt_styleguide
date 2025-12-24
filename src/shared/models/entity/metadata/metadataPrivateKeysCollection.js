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
import EntityV2Collection from "../abstract/entityV2Collection";
import MetadataPrivateKeyEntity from "./metadataPrivateKeyEntity";
import EntityValidationError from "../abstract/entityValidationError";

class MetadataPrivateKeysCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return MetadataPrivateKeyEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by ID.
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by user ID.
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection share the same metadata key ID.
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
      items: MetadataPrivateKeyEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @param {Set} [options.uniqueUserIdsSetCache] A set of unique user ids.
   * @throws {EntityValidationError} If a permission already exists with the same id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, { haystackSet: options?.uniqueIdsSetCache });
    this.assertNotExist("user_id", item._props.user_id, { haystackSet: options?.uniqueUserIdsSetCache });
    this.assertSameMetadataKeyId(item);
  }

  /**
   * Assert the collection is about the same metadata key.
   * @param {MetadataPrivateKeyEntity} item
   * @throws {EntityValidationError} if a secret for another resource already exist
   * @private
   */
  assertSameMetadataKeyId(item) {
    if (!item.metadataKeyId) {
      return;
    }

    const collectionMetadataKeyId = this._items.find((item) => Boolean(item.metadataKeyId))?.metadataKeyId;
    if (!collectionMetadataKeyId) {
      return;
    }

    if (item.metadataKeyId === collectionMetadataKeyId) {
      return;
    }

    const error = new EntityValidationError();
    error.addError(
      "metadata_key_id",
      "same_metadata_key",
      "The collection should not contain different metadata key ID.",
    );
    throw error;
  }

  /**
   * Returns true if the collection has at least 1 decrypted metadata private key.
   * @returns {boolean}
   */
  hasDecryptedPrivateKeys() {
    return this._items.some((item) => item.isDecrypted);
  }

  /**
   * Returns true if the collection has at least 1 encrypted metadata private key.
   * @returns {boolean}
   */
  hasEncryptedPrivateKeys() {
    return this._items.some((item) => !item.isDecrypted);
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
    const uniqueUserIdsSetCache = new Set(this.extract("user_id"));
    const onItemPushed = (item) => {
      uniqueIdsSetCache.add(item._props.id);
      uniqueUserIdsSetCache.add(item._props.user_id);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: { ...options?.validateBuildRules, uniqueIdsSetCache, uniqueUserIdsSetCache },
      ...options,
    };

    super.pushMany(data, entityOptions, options);
  }
}

export default MetadataPrivateKeysCollection;
