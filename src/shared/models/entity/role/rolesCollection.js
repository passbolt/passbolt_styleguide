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
 * @since         2.13.0
 */
import RoleEntity from "./roleEntity";
import EntityV2Collection from "../abstract/entityV2Collection";

const ENTITY_NAME = 'Roles';

class RolesCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return RoleEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items in the collection are unique by ID.
   * @throws {EntityCollectionError} Build Rule: Ensure the total content do not exceed the maximum allowed.
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
      "items": RoleEntity.getSchema(),
      "maxItems": 7,
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @throws {EntityValidationError} If a role already exists with the same id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, {haystackSet: options?.uniqueIdsSetCache});
    this.assertNotExist("name", item._props.name, {haystackSet: options?.uniqueNamesSetCache});
  }

  /**
   * @inheritDoc
   */
  pushMany(data, entityOptions = {}, options = {}) {
    const uniqueIdsSetCache = new Set(this.extract("id"));
    const uniqueNamesSetCache = new Set(this.extract("name"));

    const onItemPushed = item => {
      uniqueIdsSetCache.add(item._props.id);
      uniqueNamesSetCache.add(item._props.name);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: {...options?.validateBuildRules, uniqueIdsSetCache, uniqueNamesSetCache},
      ...options
    };

    super.pushMany(data, entityOptions, options);
  }

  /**
   * Removes from the collection all the roles that are reserved roles: (admin, user and guest)
   * @return {void} The function alters the collection itself.
   */
  filterByCustomRole() {
    this.filterByCallback(role => !role.isAReservedRole());
  }

  /**
   * Get a role given its id
   * @param {string} id
   * @return {RoleEntity|null}
   */
  getById(id) {
    return this._items.find(role => role.id === id) || null;
  }

  /*
   * ==================================================
   * Static getters
   * ==================================================
   */
  /**
   * RolesCollection.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default RolesCollection;
