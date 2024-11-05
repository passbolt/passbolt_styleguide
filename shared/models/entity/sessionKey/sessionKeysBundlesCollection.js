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

class SessionKeysBundlesCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return SessionKeysBundleEntity;
  }

  /*
   * ==================================================
   * Validation
   * ==================================================
   */

  /**
   * Get session keys bundle collection schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "array",
      "items": SessionKeysBundleEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique session keys bundle ids.
   * @param {Set} [options.uniqueUserIdsSetCache] A set of unique session keys bundle user id.
   * @throws {EntityValidationError} If a session key already exists with the same foreign_id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, {haystackSet: options?.uniqueIdsSetCache});
    this.assertNotExist("user_id", item._props.user_id, {haystackSet: options?.uniqueUserIdsSetCache});
  }

  /**
   * Transform into dto.
   * @returns {array}
   */
  toDto(contains = {}) {
    return this._items.map(entity => entity.toDto(contains));
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
    const uniqueForeignIdsSetCache = new Set(this.extract("id"));
    const uniqueSessionKeysBundleSetCache = new Set(this.extract("user_id"));

    const onItemPushed = item => {
      uniqueForeignIdsSetCache.add(item._props.id);
      uniqueSessionKeysBundleSetCache.add(item._props.user_id);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: {...options?.validateBuildRules, uniqueForeignIdsSetCache},
      ...options
    };

    super.pushMany(data, entityOptions, options);
  }

  /**
   * Has some decrypted session keys bundles
   * @returns {boolean}
   */
  hasSomeDecryptedSessionKeysBundles() {
    return this.items.some(sessionKeysBundleEntity => sessionKeysBundleEntity.isDecrypted);
  }
}

export default SessionKeysBundlesCollection;
