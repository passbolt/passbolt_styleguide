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
 * @since         4.10.1
 */
import EntityV2Collection from "../abstract/entityV2Collection";
import SessionKeysBundleEntity from "./sessionKeysBundleEntity";
import EntityValidationError from "../abstract/entityValidationError";

const BUILD_RULE_DIFFERENT_USER_ID = "different_user_id";

class SessionKeysBundlesCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return SessionKeysBundleEntity;
  }

  /**
   * Get session keys bundle collection schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "array",
      items: SessionKeysBundleEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique session keys bundle ids.
   * @param {Set} [options.uniqueUserIdsSetCache] A set of unique session keys bundle user id.
   * @throws {EntityValidationError} If a session key already exists with the same foreign_id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, { haystackSet: options?.uniqueIdsSetCache });
    this.assertSameUserId(item);
  }

  /**
   * Assert the collection has the same user_id.
   *
   * @param {SessionKeysBundleEntity} sessionKeysBundle The session keys bundle
   * @throws {EntityValidationError} if a user id is not the same in the collection
   * @private
   */
  assertSameUserId(sessionKeysBundle) {
    if (!this.items.length) {
      return;
    }
    if (typeof sessionKeysBundle._props.user_id === "undefined") {
      return;
    }

    const collectionUserId = this.items[0].userId;
    if (sessionKeysBundle._props.user_id !== collectionUserId) {
      const error = new EntityValidationError();
      const message = `The collection has different user id: ${collectionUserId} != ${sessionKeysBundle._props.user_id}.`;
      error.addError("user_id", BUILD_RULE_DIFFERENT_USER_ID, message);
      throw error;
    }
  }

  /**
   * Transform into dto.
   * @returns {array}
   */
  toDto(contains = {}) {
    return this._items.map((entity) => entity.toDto(contains));
  }

  /**
   * @inheritDoc
   */
  pushMany(data, entityOptions = {}, options = {}) {
    const uniqueIdsSetCache = new Set(this.extract("id"));

    const onItemPushed = (item) => {
      uniqueIdsSetCache.add(item._props.id);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: { ...options?.validateBuildRules, uniqueIdsSetCache },
      ...options,
    };

    super.pushMany(data, entityOptions, options);
  }

  /**
   * Has some decrypted session keys bundles
   * @returns {boolean}
   */
  hasSomeDecryptedSessionKeysBundles() {
    return this.items.some((sessionKeysBundleEntity) => sessionKeysBundleEntity.isDecrypted);
  }

  /**
   * Has some encrypted session keys bundles
   * @returns {boolean}
   */
  hasSomeEncryptedSessionKeysBundles() {
    return this.items.some((sessionKeysBundleEntity) => !sessionKeysBundleEntity.isDecrypted);
  }

  /**
   * Order by the most recently modified session key in the collection if any.
   * The key with a non null modified date and having the most recent date will be the first.
   * If keys do not have modified date, the last one will be the first.
   * If no session key bundle is found in the collection, do nothing.
   *
   */
  sortByModified() {
    this._items.sort((sessionKeysBundleEntityA, sessionKeysBundleEntityB) => {
      if (!sessionKeysBundleEntityA.modified) {
        return 1;
      } else if (!sessionKeysBundleEntityB.modified) {
        return -1;
      } else {
        return sessionKeysBundleEntityB.modified > sessionKeysBundleEntityA.modified ? 1 : -1;
      }
    });
  }

  /**
   * Get the session key modified most recently.
   * @return {SessionKeysBundleEntity|void}
   */
  getByLatestModified() {
    if (!this.length) {
      return;
    }
    return this.items.reduce((result, currentItem) => (currentItem.modified > result.modified ? currentItem : result));
  }
}

export default SessionKeysBundlesCollection;
