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
 * @since         4.1.0
 */

import RbacEntity from "./rbacEntity";
import RoleEntity from "../role/roleEntity";
import EntityV2Collection from "../abstract/entityV2Collection";

class RbacsCollection extends EntityV2Collection {
  /**
   * @inheritDoc
   */
  get entityClass() {
    return RbacEntity;
  }

  /**
   * @inheritDoc
   * @throws {EntityCollectionError} Build Rule: Ensure all items with an ID in the collection has a unique ID.
   */
  constructor(dtos = [], options = {}) {
    super(dtos, options);
  }

  /**
   * Get the collection schema
   *
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "array",
      "items": RbacEntity.getSchema(),
    };
  }

  /**
   * @inheritDoc
   * @param {Set} [options.uniqueIdsSetCache] A set of unique ids.
   * @throws {EntityValidationError} If a metadata key already exists with the same id.
   */
  validateBuildRules(item, options = {}) {
    this.assertNotExist("id", item._props.id, {haystackSet: options?.uniqueIdsSetCache});
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */

  /**
   * Return a DTO used to bulk update the rbacs
   *
   * @returns {array}
   */
  toBulkUpdateDto() {
    return this.items.map(rbac => rbac.toUpdateDto());
  }

  /*
   * ==================================================
   * Finders
   * ==================================================
   */

  /**
   * Find the first rbac matching the given role identifier and ui action name.
   * @param {RoleEntity} role The role
   * @param {string} name The ui action name
   * @returns {RbacEntity}
   * @throws {Error} If the role parameter is not a role entity
   * @throws {Error} If the name parameter is not a string
   */
  findRbacByRoleAndUiActionName(role, name) {
    if (!(role instanceof RoleEntity)) {
      throw new Error('The role parameter should be a role entity.');
    }
    if (typeof name !== 'string' && !(name instanceof String)) {
      throw new Error('The name parameter should be a valid string.');
    }

    return this.items.find(rbac => rbac.roleId === role.id && rbac.uiAction?.name === name);
  }

  /**
   * Find the first rbac matching the given ui action name.
   * @param {string} name The ui action name
   * @returns {RbacEntity}
   * @throws {Error} If the name parameter is not a string
   */
  findRbacByUiActionName(name) {
    if (typeof name !== 'string' && !(name instanceof String)) {
      throw new Error('The name parameter should be a valid string.');
    }

    return this.items.find(rbac => rbac.uiAction?.name === name);
  }

  /**
   * Find the first rbac matching the given role identifier and action name.
   * @param {RoleEntity} role The role
   * @param {string} name The action name
   * @returns {RbacEntity}
   * @throws {Error} If the role parameter is not a role entity
   * @throws {Error} If the name parameter is not a string
   */
  findRbacByRoleAndActionName(role, name) {
    if (!(role instanceof RoleEntity)) {
      throw new Error('The role parameter should be a role entity.');
    }
    if (typeof name !== 'string' && !(name instanceof String)) {
      throw new Error('The name parameter should be a valid string.');
    }

    return this.items.find(rbac => rbac.roleId === role.id && rbac.action?.name === name);
  }

  /**
   * Find the first rbac matching the given action name.
   * @param {string} name The action name
   * @returns {RbacEntity}
   * @throws {Error} If the name parameter is not a string
   */
  findRbacByActionName(name) {
    if (typeof name !== 'string' && !(name instanceof String)) {
      throw new Error('The name parameter should be a valid string.');
    }

    return this.items.find(rbac => rbac.action?.name === name);
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
    const onItemPushed = item => {
      uniqueIdsSetCache.add(item._props.id);
    };

    options = {
      onItemPushed: onItemPushed,
      validateBuildRules: {...options?.validateBuildRules, uniqueIdsSetCache},
      ...options
    };

    super.pushMany(data, entityOptions, options);
  }

  /**
   * Remove a rbac
   * @param {RbacEntity} rbac The rbac entity to remove.
   */
  remove(rbac) {
    const length = this.items.length;
    let i = 0;
    for (; i < length; i++) {
      const existingRbac = this.items[i];
      if (existingRbac.id === rbac.id) {
        this._items.splice(i, 1);
        return;
      }
    }
  }
}

export default RbacsCollection;
