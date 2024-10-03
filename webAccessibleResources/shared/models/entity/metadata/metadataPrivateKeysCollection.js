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
import EntityV2Collection from "passbolt-styleguide/src/shared/models/entity/abstract/entityV2Collection";
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
      "type": "array",
      "items": MetadataPrivateKeyEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @throws {EntityValidationError} If a permission already exists with the same id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, {haystackSet: options?.uniqueIdsSetCache});
    this.assertNotExist("user_id", item._props.user_id, {haystackSet: options?.uniqueUserIdsSetCache});
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

    const collectionMetadataKeyId = this._items.find(item => Boolean(item.metadataKeyId))?.metadataKeyId;
    if (!collectionMetadataKeyId) {
      return;
    }

    if (item.metadataKeyId === collectionMetadataKeyId) {
      return;
    }

    const error = new EntityValidationError();
    error.addError("metadata_key_id", "same_metadata_key", "The collection should not contain different metadata key ID.");
    throw error;
  }

  /**
   * Get the most recently created key in the collection if any.
   * The key with a non null creation date and having the most recent date set is returned.
   * If keys do not have creation date, the last one is returned.
   * If no key is found in the collection, `null` is returned.
   *
   * @returns {MetadataPrivateKeyEntity|null}
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
    const onItemPushed = item => {
      uniqueIdsSetCache.add(item._props.id);
      uniqueUserIdsSetCache.add(item._props.user_id);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: {...options?.validateBuildRules, uniqueIdsSetCache, uniqueUserIdsSetCache},
      ...options
    };

    super.pushMany(data, entityOptions, options);
  }
}

export default MetadataPrivateKeysCollection;
