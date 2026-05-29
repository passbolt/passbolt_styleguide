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
 * @since         5.13.0
 */
import EntityV2 from "../abstract/entityV2";
import PermissionsCollection from "./permissionsCollection";
import GroupsCollection from "../group/groupsCollection";
import UsersCollection from "../user/usersCollection";

const ENTITY_NAME = "PermissionSnapshot";

/**
 * An immutable capture of the permission state of an ACO at a point in time, together with the
 * full set of groups and users referenced by those permissions. Used by the permission-confirmation
 * workflow to guarantee that the permission set displayed to the operator is exactly the one applied.
 */
class PermissionSnapshotEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(dto, options);

    if (this._props.permissions) {
      this._permissions = new PermissionsCollection(this._props.permissions, {
        ...options,
        clone: false,
        assertAtLeastOneOwner: false,
      });
      delete this._props.permissions;
    }
    if (this._props.groups) {
      this._groups = new GroupsCollection(this._props.groups, { ...options, clone: false });
      delete this._props.groups;
    }
    if (this._props.users) {
      this._users = new UsersCollection(this._props.users, { ...options, clone: false });
      delete this._props.users;
    }
  }

  /**
   * Get permission snapshot entity schema.
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["permissions", "groups", "users", "created"],
      properties: {
        created: {
          type: "string",
          format: "date-time",
        },
        permissions: PermissionsCollection.getSchema(),
        groups: GroupsCollection.getSchema(),
        users: UsersCollection.getSchema(),
      },
    };
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */
  /**
   * Return a DTO ready to be persisted or compared.
   * @returns {object}
   */
  toDto() {
    return {
      ...this._props,
      permissions: this._permissions.toDto(),
      groups: this._groups.toDto(),
      users: this._users.toDto(),
    };
  }

  /**
   * Customizes JSON stringification behavior.
   * @returns {object}
   */
  toJSON() {
    return this.toDto();
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */
  /**
   * Get the snapshot creation date.
   * @returns {string} ISO8601 date-time
   */
  get created() {
    return this._props.created;
  }

  /*
   * ==================================================
   * Associated properties getters
   * ==================================================
   */
  /**
   * Get the permissions captured by the snapshot.
   * @returns {PermissionsCollection}
   */
  get permissions() {
    return this._permissions;
  }

  /**
   * Get the groups referenced by the snapshot permissions.
   * @returns {GroupsCollection}
   */
  get groups() {
    return this._groups;
  }

  /**
   * Get the users referenced by the snapshot permissions.
   * @returns {UsersCollection}
   */
  get users() {
    return this._users;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * PermissionSnapshotEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default PermissionSnapshotEntity;
