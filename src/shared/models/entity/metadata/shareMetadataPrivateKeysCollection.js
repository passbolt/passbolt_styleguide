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
 * @since         5.2.0
 */

import EntityV2Collection from "../../entity/abstract/entityV2Collection";
import EntityValidationError from "../..//entity/abstract/entityValidationError";
import MetadataPrivateKeyEntity from "./metadataPrivateKeyEntity";

class ShareMetadataPrivateKeysCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return MetadataPrivateKeyEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection use the same user ID.
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection have a different metadata key ID.
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
   * @param {MetadataPrivateKeyEntity} item The metadata private key.
   * @param {object} options.
   * @param {Set} [options.uniqueMetadataKeyIdUserIdSetCache] A set of unique tuple metadata key id - user id.
   * @throws {EntityValidationError} if a secret already exists with the same metadata key id and user id.
   */
  validateBuildRules(item, options) {
    this.assertUniqueMetadataKeyIdUserId(item, { haystackSet: options?.uniqueMetadataKeyIdUserIdSetCache });
  }

  /**
   * Assert the collection is about the same metadata_key_id and user id.
   * @param {MetadataPrivateKeyEntity} item
   * @param {object} options.
   * @param {Set} [options.haystackSet] A set of unique metadata_key_id and user_ids tuples.
   * @throws {EntityValidationError} if a metadata private key already exists with the same metadata private key id and user id.
   * @private
   */
  assertUniqueMetadataKeyIdUserId(item, options) {
    if (!item.userId || !item.metadataKeyId) {
      return;
    }

    let haystackSet = options?.haystackSet;

    // If not given initialize the haystack set with the values of the items properties.
    if (!haystackSet) {
      haystackSet = new Set(this.items.map((item) => `${item.metadataKeyId}:${item.userId}`));
    }

    const metadataKeyIdUserIdKey = `${item.metadataKeyId}:${item.userId}`;

    if (haystackSet.has(metadataKeyIdUserIdKey)) {
      const error = new EntityValidationError();
      const message = `The collection already includes an element that has a couple metadata_key_id:user_id (${metadataKeyIdUserIdKey}) with an identical value.`;
      error.addError("metadata_key_id:user_id", "unique", message);
      throw error;
    }
  }

  /*
   * ==================================================
   * Setters
   * ==================================================
   */
  /**
   * @inheritDoc
   * This method creates a cache of unique metadata_key_id and users id tuple to improve the build rules performance.
   */
  pushMany(data, entityOptions = {}, options = {}) {
    const uniqueMetadataKeyIdUserIdSetCache = new Set(this.items.map((item) => `${item.metadataKeyId}:${item.userId}`));
    const onItemPushed = (item) => {
      uniqueMetadataKeyIdUserIdSetCache.add(`${item.metadataKeyId}:${item.userId}`);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: { ...options?.validateBuildRules, uniqueMetadataKeyIdUserIdSetCache },
      ...options,
    };

    super.pushMany(data, entityOptions, options);
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
}

export default ShareMetadataPrivateKeysCollection;
