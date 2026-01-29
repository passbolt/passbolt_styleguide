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
import SessionKeyEntity from "./sessionKeyEntity";

class SessionKeysCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return SessionKeyEntity;
  }

  /*
   * ==================================================
   * Validation
   * ==================================================
   */

  /**
   * Get session keys collection schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "array",
      items: SessionKeyEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueForeignIdsSetCache] A set of unique foreign ids.
   * @param {Set} [options.uniqueSessionKeysSetCache] A set of unique session keys.
   * @throws {EntityValidationError} If a session key already exists with the same foreign_id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("foreign_id", item._props.foreign_id, { haystackSet: options?.uniqueForeignIdsSetCache });
    /*
     * Do not validate session keys yet to not impact performance
     * TODO enable it when performance is under control
     * this.assertNotExist("session_key", item._props.session_key, {haystackSet: options?.uniqueSessionKeysSetCache});
     */
  }

  /**
   * Transform into dto.
   * @returns {array}
   */
  toDto(contains = {}) {
    return this._items.map((entity) => entity.toDto(contains));
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
    const uniqueForeignIdsSetCache = new Set(this.extract("foreign_id"));
    /*
     * TODO enable it when performance is under control
     * const uniqueSessionKeysSetCache = new Set(this.extract("session_key"));
     */
    const onItemPushed = (item) => {
      uniqueForeignIdsSetCache.add(item._props.foreign_id);
      /*
       * TODO enable it when performance is under control
       * uniqueSessionKeysSetCache.add(item._props.session_key);
       */
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: { ...options?.validateBuildRules, uniqueForeignIdsSetCache },
      ...options,
    };

    super.pushMany(data, entityOptions, options);
  }

  /*
   * ==================================================
   * Filters
   * ==================================================
   */

  /**
   * Filter out the session keys not matching the given foreign model and foreignIds.
   */
  filterOutSessionKeysNotMatchingForeignModelAndForeignIds(foreignModel, foreignIds) {
    this.filterByCallback(
      (sessionKey) => sessionKey.foreignModel === foreignModel && foreignIds.includes(sessionKey.foreignId),
    );
  }

  /**
   * Removes the given session from the collection.
   * @param {SessionKeyEntity} sessionKeyToRemove
   */
  remove(sessionKeyToRemove) {
    this.filterByCallback((sessionKey) => sessionKey !== sessionKeyToRemove);
  }
}

export default SessionKeysCollection;
