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

    /** @type {Map<string, Array<object>>} The original permissions, by aro id. */
    this._permissionsByAro = new Map();
    /** @type {Map<string, Map<string, object>>} The original permission, by aro id then aco id. */
    this._permissionByAroByAco = new Map();
    this._acos.forEach((aco) => {
      aco.permissions.forEach((permission) => {
        const aro = permission.user || permission.group;
        if (!this._aros[aro.id]) {
          this._aros[aro.id] = aro;
        }
        this._permissions.push(permission);
        this._indexPermission(permission);
      });
    });
    // The items the operator owns, the only ones a change can be staged on. What is displayed still
    // covers every item (see aggregatePermissionsByAro).
    this._stageableAcos = this._acos.filter((aco) => aco.permission?.type === ADMIN);
    /** @type {Map<string, Array<object>>} The pending permission changes, by aro id. */
    this._changesByAro = new Map();
    /** @type {Set<string>} The ids of the aros marked as initially new. */
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

  /**
   * Get every pending permission change, grouped by aro and in staging order within each aro.
   * @returns {Array<object>}
   */
  getChanges() {
    const changes = [];
    this._changesByAro.forEach((aroChanges) => {
      changes.push(...aroChanges);
    });
    return changes;
  }
  getResourcesChanges() {
    return this.getChanges().filter((element) => element.aco === "Resource");
  }
  getFoldersChanges() {
    return this.getChanges().filter((element) => element.aco === "Folder");
  }

  getAcos() {
    return this._acos;
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
    return this._changesByAro.has(aroId) || this._initiallyNewAroIds.has(aroId);
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
    const changes = this._changesByAro.get(aroId);
    if (!changes?.length) {
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
    return this._permissionsByAro.has(aroId);
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
   * Update aro's permissions on the items the operator owns only, whatever level was picked.
   * @param {string} aroId The aro to update the permissions for
   * @param {int} type
   */
  updateAroPermissions(aroId, type) {
    this._removeAroChanges(aroId);
    // Selecting "varies" reverts the aro to its original per-resource permissions (no change emitted).
    if (type === -1) {
      return;
    }
    this._stageableAcos.forEach((aco) => {
      const permissionOriginal = this.getAcoAroPermission(aco, aroId);
      if (permissionOriginal) {
        if (permissionOriginal.type !== type) {
          const permissionChange = JSON.parse(JSON.stringify(permissionOriginal));
          permissionChange.type = type;
          this._pushChange(permissionChange);
        }
      } else {
        const aro = this._aros[aroId];
        this._pushChange(this._buildChange(aco, aro, type));
      }
    });
  }

  /**
   * Update aro's permissions with a level per item, rather than one level for all of them, to seed
   * a move. A null level removes the permission, and an item absent from the map is left alone.
   * @param {object} aro The recipient to stage the permissions for, registered when not already known.
   * @param {Map<string, (int|null)>} targetTypeByAcoId The level (1|7|15) per item id, or null for the
   *   items the recipient must end up without a permission on.
   */
  updateAroPermissionsByAco(aro, targetTypeByAcoId) {
    this._aros[aro.id] = aro;
    this._removeAroChanges(aro.id);
    this._stageableAcos.forEach((aco) => {
      if (!targetTypeByAcoId.has(aco.id)) {
        return;
      }
      const type = targetTypeByAcoId.get(aco.id);
      const permissionOriginal = this.getAcoAroPermission(aco, aro.id);
      if (type === null) {
        if (permissionOriginal) {
          const permissionChange = JSON.parse(JSON.stringify(permissionOriginal));
          permissionChange.delete = true;
          this._pushChange(permissionChange);
        }
        return;
      }
      if (!permissionOriginal) {
        this._pushChange(this._buildChange(aco, aro, type));
        return;
      }
      if (permissionOriginal.type !== type) {
        const permissionChange = JSON.parse(JSON.stringify(permissionOriginal));
        permissionChange.type = type;
        this._pushChange(permissionChange);
      }
    });
  }

  /**
   * On a move, stage the permissions each re-permissioned item ends up with. A recipient missing
   * from an item's resulting set gets a removal staged on that item.
   * @param {Array<object>} targetRows The resulting permissions, aggregated by aro.
   * @param {Array<string>} acoIds The re-permissioned item ids. The other items are left alone.
   */
  stageTargetPermissions(targetRows, acoIds) {
    for (const row of targetRows) {
      this._aros[row.aro.id] = row.aro;
    }
    for (const aroId of Object.keys(this._aros)) {
      const targetTypeByAcoId = new Map();
      for (const acoId of acoIds) {
        targetTypeByAcoId.set(acoId, null);
      }
      const targetRow = targetRows.find((row) => row.aro.id === aroId);
      if (targetRow) {
        for (const permission of targetRow.permissions) {
          targetTypeByAcoId.set(permission.aco_foreign_key, permission.type);
        }
      }
      this.updateAroPermissionsByAco(this._aros[aroId], targetTypeByAcoId);
    }
  }

  /**
   * Used to initialise the ShareChanges list with already "changed" permissions.
   * For example when creating a new shared resource, the permissions must be shown as "new"
   * instead of "already existing".
   * @param {PermissionEntity} permission
   */
  markPermissionHasChanged(permission) {
    const permissionChange = this._buildChange(permission.permissions[0].aco, permission.aro, permission.type);
    this._pushChange(permissionChange);
    this._initiallyNewAroIds.add(permission.aro.id);
  }

  /**
   * Delete aro's permissions, on the items the operator owns only.
   * @param {string} aroId The aro to delete the permissions for
   */
  deleteAroPermissions(aroId) {
    this._removeAroChanges(aroId);
    this._stageableAcos.forEach((aco) => {
      const permissionOriginal = this.getAcoAroPermission(aco, aroId);
      if (permissionOriginal) {
        const permissionChange = JSON.parse(JSON.stringify(permissionOriginal));
        permissionChange.delete = true;
        this._pushChange(permissionChange);
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
    const originals = this._permissionsByAro.get(aroId);
    if (!originals?.length) {
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
    return this._permissionByAroByAco.get(aroId)?.get(aco.id);
  }

  /**
   * Get the resources with no owners after applying the changes.
   * @returns {Resource.List}
   */
  getResourcesWithNoOwner() {
    const allChanges = this.getChanges();
    return this._acos.filter((aco) => {
      const changes = allChanges.filter((change) => change.aco_foreign_key === aco.id);
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
   * Index an original permission by aro, and by aco within its aro.
   * @param {object} permission The permission to index
   * @private
   */
  _indexPermission(permission) {
    const aroId = permission.aro_foreign_key;
    if (!this._permissionsByAro.has(aroId)) {
      this._permissionsByAro.set(aroId, []);
      this._permissionByAroByAco.set(aroId, new Map());
    }
    this._permissionsByAro.get(aroId).push(permission);

    const permissionByAcoId = this._permissionByAroByAco.get(aroId);
    if (!permissionByAcoId.has(permission.aco_foreign_key)) {
      permissionByAcoId.set(permission.aco_foreign_key, permission);
    }
  }

  /**
   * Stage a permission change, indexed by its aro.
   * @param {object} change The change to stage
   * @private
   */
  _pushChange(change) {
    const aroChanges = this._changesByAro.get(change.aro_foreign_key);
    if (aroChanges) {
      aroChanges.push(change);
    } else {
      this._changesByAro.set(change.aro_foreign_key, [change]);
    }
  }

  /**
   * Remove all the permissions changes related to a given aro.
   * @param {string} aroId  The aro to delete the changes for
   * @private
   */
  _removeAroChanges(aroId) {
    this._changesByAro.delete(aroId);
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
