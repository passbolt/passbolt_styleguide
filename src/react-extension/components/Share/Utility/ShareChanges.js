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
 * @since         2.0.0
 */
const READ = 1;
// const UPDATE = 7;
const ADMIN = 15;

const CHANGE_STATUS_ADDED = "added";
const CHANGE_STATUS_MODIFIED = "modified";
const CHANGE_STATUS_REMOVED = "removed";

export default class ShareChanges {
  /**
   * Constructor
   * @param {array} resources
   * @param {array} folders
   */
  constructor(resources, folders) {
    this._folders = folders || [];
    this._resources = resources || [];
    this._permissions = [];
    this._aroPermissions = [];
    this._aros = {};
    this._acos = [];

    /*
     * Remap the resources and folder into an ACO array
     * Extend object with "_type" to keep distinction
     */
    this._resources.forEach((resource) => {
      resource._type = "Resource";
      this._acos.push(resource);
    });
    this._folders.forEach((folder) => {
      folder._type = "Folder";
      this._acos.push(folder);
    });

    // Build the permission list
    this._acos.forEach((aco) => {
      aco.permissions.forEach((permission) => {
        const aro = permission.user || permission.group;
        if (!this._aros[aro.id]) {
          this._aros[aro.id] = aro;
        }
        this._permissions.push(permission);
      });
    });
    this._changes = [];
    this._initiallyNewAroIds = new Set();
  }

  /**
   * @returns {string} Status of an aro granted its permissions during the session.
   */
  static get CHANGE_STATUS_ADDED() {
    return CHANGE_STATUS_ADDED;
  }

  /**
   * @returns {string} Status of an aro with pending changes to its original permissions.
   */
  static get CHANGE_STATUS_MODIFIED() {
    return CHANGE_STATUS_MODIFIED;
  }

  /**
   * @returns {string} Status of an aro whose permissions are pending deletion.
   */
  static get CHANGE_STATUS_REMOVED() {
    return CHANGE_STATUS_REMOVED;
  }

  // new
  getChanges() {
    return this._changes;
  }
  getResourcesChanges() {
    return this._changes.filter((element) => element.aco === "Resource");
  }
  getFoldersChanges() {
    return this._changes.filter((element) => element.aco === "Folder");
  }

  getAcos() {
    return this._acos;
  }

  /**
   * Check that a user is the original owner of the resources
   * @return {boolean}
   */
  isOriginalResourcesOwner() {
    return this._acos.reduce((carry, aco) => carry && aco.permission.type === ADMIN, true);
  }

  /**
   * Aggregate the permissions by user.
   * @return {object} The mapped permissions list
   *
   * {
   *    ARO_ID: {
   *      id: {string}, // The aro id
   *      aro: {object},
   *      type: int,
   *      permissions: array<object>
   *    }
   * }
   */
  aggregatePermissionsByAro() {
    // Aggregate the data as expected.
    const arosPermissions = this._permissions.reduce((carry, permission) => {
      let aroPermission = carry.find((_data) => _data.id === permission.aro_foreign_key);
      if (!aroPermission) {
        const aro = permission.user || permission.group;
        aroPermission = {
          id: aro.id,
          aro: aro,
          type: permission.type,
          permissions: [],
        };
        carry.push(aroPermission);
      }
      aroPermission.type = aroPermission.type === permission.type ? aroPermission.type : -1;
      aroPermission.permissions.push(permission);
      return carry;
    }, []);

    // Calculate varies details
    arosPermissions.forEach((aroPermissions) => {
      // permission type varies also in the case there is less permissions than resources shared.
      if (aroPermissions.permissions.length !== this._acos.length) {
        aroPermissions.type = -1;
      }
      if (aroPermissions.type === -1) {
        // For each permission, aggregate the resources aro has access.
        aroPermissions.variesDetails = this._acos.reduce(
          (carry, aco) => {
            const result = aroPermissions.permissions.filter((permission) => permission.aco_foreign_key === aco.id);
            const carryType = result[0]?.type || 0;
            const acoName = aco.metadata.name;
            carry[carryType].push(acoName);
            return carry;
          },
          { 0: [], 1: [], 7: [], 15: [] },
        );
      }
    });

    // Order the array by aros (user firstname / group name).
    arosPermissions.sort((a, b) => {
      const aValue = a.aro.profile ? a.aro.profile.first_name : a.aro.name;
      const bValue = b.aro.profile ? b.aro.profile.first_name : b.aro.name;
      if (aValue < bValue) {
        return -1;
      } else if (aValue > bValue) {
        return 1;
      }
      return 0;
    });

    this._aroPermissions = arosPermissions;
    return this._aroPermissions;
  }

  /**
   * Check if an aro has some changes
   * @param {string} aroId The aro identifier
   * @return {boolean}
   */
  hasChanges(aroId) {
    const change = this._changes.find((change) => change.aro_foreign_key === aroId);
    return change !== undefined;
  }

  /**
   * Derive the pending change status of an aro.
   * @param {string} aroId The aro identifier
   * @returns {string|null} A ShareChanges.CHANGE_STATUS_* value, or null when unchanged.
   */
  getAroChangeStatus(aroId) {
    if (this._initiallyNewAroIds.has(aroId)) {
      /*
       * An aro marked as initially new, typically while creating a resource, has no real original
       * permission to diff against: it always displays as added, whatever its pending changes,
       * including a pending deletion. The dialog handles deletion of such an aro by dropping its
       * row entirely rather than freezing it on a "removed" state; see ShareDialog.handlePermissionDelete.
       */
      return CHANGE_STATUS_ADDED;
    }
    const changes = this._changes.filter((change) => change.aro_foreign_key === aroId);
    if (!changes.length) {
      return null;
    }
    if (changes.every((change) => change.delete)) {
      return CHANGE_STATUS_REMOVED;
    }
    /*
     * An aro missing a permission on some acos stages only new permissions when aligned on a
     * single type: the original permissions, not the shape of the changes, discriminate a
     * modified aro from an added one.
     */
    if (!this._hasOriginalPermissions(aroId)) {
      return CHANGE_STATUS_ADDED;
    }
    return CHANGE_STATUS_MODIFIED;
  }

  /**
   * Check if an aro had a permission on any of the acos when the dialog opened.
   * @param {string} aroId The aro identifier
   * @returns {boolean}
   * @private
   */
  _hasOriginalPermissions(aroId) {
    return this._permissions.some((permission) => permission.aro_foreign_key === aroId);
  }

  /**
   * Add new permission for a given aro
   * @return {object} The mapped permission
   *
   * {
   *    ARO_ID: {
   *      id: {string}, // The aro id
   *      aro: {object},
   *      type: int,
   *      permissions: array<object>
   *    }
   * }
   */
  addAroPermissions(aro) {
    const type = READ;
    this._aros[aro.id] = aro;
    this.updateAroPermissions(aro.id, READ);

    return {
      id: aro.id,
      aro: aro,
      type: type,
      permissions: [],
    };
  }

  /**
   * Update aro's permissions.
   * @param {string} aroId The aro to update the permissions for
   * @param {int} type
   */
  updateAroPermissions(aroId, type) {
    this._removeAroChanges(aroId);
    this._acos.forEach((aco) => {
      const permissionOriginal = this.getAcoAroPermission(aco, aroId);
      if (permissionOriginal) {
        if (permissionOriginal.type !== type) {
          const permissionChange = JSON.parse(JSON.stringify(permissionOriginal));
          permissionChange.type = type;
          this._changes.push(permissionChange);
        }
      } else {
        const aro = this._aros[aroId];
        const permissionChange = this._buildChange(aco, aro, type);
        this._changes.push(permissionChange);
      }
    });
  }

  /**
   * Used to initialise the ShareChanges list with already "changed" permissions.
   * For example when creating a new shared resource, the permissions must be shown as "new"
   * instead of "already existing".
   * @param {PermissionEntity} permission
   */
  markPermissionHasChanged(permission) {
    const permissionChange = this._buildChange(permission.permissions[0].aco, permission.aro, permission.type);
    this._changes.push(permissionChange);
    this._initiallyNewAroIds.add(permission.aro.id);
  }

  /**
   * Delete aro's permissions.
   * @param {string} aroId The aro to delete the permissions for
   */
  deleteAroPermissions(aroId) {
    this._removeAroChanges(aroId);
    this._acos.forEach((aco) => {
      const permissionOriginal = this.getAcoAroPermission(aco, aroId);
      if (permissionOriginal) {
        const permissionChange = JSON.parse(JSON.stringify(permissionOriginal));
        permissionChange.delete = true;
        this._changes.push(permissionChange);
      }
    });
  }

  /**
   * Undo every pending change of an aro, restoring it to its original state.
   * The original permissions are never mutated, removing the aro's changes is the restore.
   * The initially new markers survive by design, such an aro falls back to the added status.
   * @param {string} aroId The aro to revert the changes for
   */
  revertAroPermissions(aroId) {
    this._removeAroChanges(aroId);
  }

  /**
   * Get the aggregated permission type an aro had when the dialog opened.
   * @param {string} aroId The aro identifier
   * @returns {int|null} 1|7|15, -1 when it varies across the acos, null when the aro had none.
   */
  getOriginalAroPermissionType(aroId) {
    const originals = this._permissions.filter((permission) => permission.aro_foreign_key === aroId);
    if (!originals.length) {
      return null;
    }
    if (originals.length !== this._acos.length) {
      return -1;
    }
    return originals.every((permission) => permission.type === originals[0].type) ? originals[0].type : -1;
  }

  /**
   * Get the permission for a given resource and a given aro
   * @param {object} aco The resource or Folder to get the aro permission for
   * @param {string} aroId The User or Group to get the resource or folder permission for
   * @returns {object}
   */
  getAcoAroPermission(aco, aroId) {
    return this._permissions.find(
      (permission) => permission.aro_foreign_key === aroId && permission.aco_foreign_key === aco.id,
    );
  }

  /**
   * Get the resources with no owners after applying the changes.
   * @returns {Resource.List}
   */
  getResourcesWithNoOwner() {
    return this._acos.filter((aco) => {
      const changes = this._changes.filter((change) => change.aco_foreign_key === aco.id);
      // Check if a new owner is promoted.
      const grantedOwner = changes.find((change) => change.type === ADMIN && !change.delete);
      if (grantedOwner) {
        return false;
      }
      // Check if there is at least one of the original owners after applying the change.
      const originalOwnersPermissionsIds = this._permissions.reduce((carry, permission) => {
        if (permission.aco_foreign_key === aco.id && permission.type === ADMIN) {
          carry = [...carry, permission.id];
        }
        return carry;
      }, []);
      // Check if owner was removed
      const revokedOwners = changes.filter(
        (change) => (change.delete || change.type !== ADMIN) && originalOwnersPermissionsIds.indexOf(change.id) !== -1,
      );

      return revokedOwners.length === originalOwnersPermissionsIds.length;
    });
  }

  /**
   * Remove all the permissions changes related to a given aro.
   * @param {string} aroId  The aro to delete the changes for
   * @private
   */
  _removeAroChanges(aroId) {
    this._acos.forEach((aco) => {
      this._changes = this._changes.filter(
        (change) => !(change.aco_foreign_key === aco.id && change.aro_foreign_key === aroId),
      );
    });
  }

  /**
   * Build a permission change
   * @param {object} aco The resource or folder to build a change for
   * @param {object} aro The aro to build a change for
   * @param {int} type The type of permission
   * @returns {object}
   * {
   *   {
   *     is_new: boolean,
   *     aro: string,
   *     aro_foreign_key: string
   *     aco: string,
   *     aco_foreign_key: string,
   *     type: int
   *   }
   * }
   *
   * @private
   */
  _buildChange(aco, aro, type) {
    return {
      is_new: true,
      aro: aro.profile ? "User" : "Group",
      aro_foreign_key: aro.id,
      aco: aco._type,
      aco_foreign_key: aco.id,
      type: type,
    };
  }
}
