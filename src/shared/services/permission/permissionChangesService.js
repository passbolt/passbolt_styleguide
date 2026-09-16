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
import PermissionEntity from "../../models/entity/permission/permissionEntity";
import PermissionsCollection from "../../models/entity/permission/permissionsCollection";

/**
 * Permission-change transformations for the share-scope-confirmation workflow.
 */
export default class PermissionChangesService {
  /**
   * Build the `is_new` permission entries the resource-creation workflow sends to
   * `passbolt.share.resources.save` after the resource has been created operator-only. Starts
   * from the parent-folder snapshot the operator reviewed, folds in the operator's ShareDialog
   * edits (deletes, type updates, autocomplete adds), and emits the result as `is_new` rows
   * targeting the new resource. The operator's own row is excluded (the resource was created
   * with it).
   * @param {PermissionSnapshotEntity} snapshot The snapshot shown in ShareDialog.
   * @param {Array<object>} dialogChanges Deltas as `ShareChanges.getResourcesChanges()` emits them.
   * @param {string} resourceId Id of the freshly-created resource.
   * @returns {Array<object>} `is_new`-flagged permission DTOs in the shape `share.resources.save` accepts.
   */
  buildResourcePermissionChanges(snapshot, dialogChanges, resourceId) {
    const finalByAroId = new Map();
    for (const permission of snapshot.permissions.items) {
      finalByAroId.set(permission.aroForeignKey, {
        is_new: true,
        aro: permission.aro,
        aro_foreign_key: permission.aroForeignKey,
        aco: PermissionEntity.ACO_RESOURCE,
        aco_foreign_key: resourceId,
        type: permission.type,
      });
    }
    for (const change of dialogChanges) {
      if (change.delete) {
        finalByAroId.delete(change.aro_foreign_key);
      } else if (change.is_new) {
        finalByAroId.set(change.aro_foreign_key, {
          ...change,
          aco: PermissionEntity.ACO_RESOURCE,
          aco_foreign_key: resourceId,
        });
      } else {
        const existing = finalByAroId.get(change.aro_foreign_key);
        if (existing) {
          existing.type = change.type;
        }
      }
    }
    return [...finalByAroId.values()];
  }

  /**
   * For each moved item, the complete list of permissions it must end up with: the ones it has
   * today with the dialog's staged changes folded in, which the service worker applies as they are.
   * @param {Array<{id: string, permissions: PermissionsCollection}>} items The items seeded into the dialog, with the permissions they have today.
   * @param {Array<object>} changes The DTO-shape permission changes emitted by ShareDialog.
   * @param {string} aco The moved items' ACO type (PermissionEntity.ACO_RESOURCE or ACO_FOLDER).
   * @returns {Map<string, PermissionsCollection>} The resulting permissions, keyed by item id.
   */
  buildAuthoritativeMovePermissions(items, changes, aco) {
    // Group the changes by item, so somebody granted on one item never spreads to the others.
    const changesByItemId = new Map();
    for (const change of changes) {
      const itemChanges = changesByItemId.get(change.aco_foreign_key);
      itemChanges ? itemChanges.push(change) : changesByItemId.set(change.aco_foreign_key, [change]);
    }
    const targetByItemId = new Map();
    for (const item of items) {
      const toEntry = (aroForeignKey, aro, type) => ({
        aro,
        aro_foreign_key: aroForeignKey,
        aco,
        aco_foreign_key: item.id,
        type,
      });
      // Keyed by user/group id, so a change replaces the seeded permission rather than adding to it.
      const targetByAro = new Map();
      for (const permission of item.permissions.items) {
        targetByAro.set(permission.aroForeignKey, toEntry(permission.aroForeignKey, permission.aro, permission.type));
      }
      for (const change of changesByItemId.get(item.id) ?? []) {
        if (change.delete) {
          targetByAro.delete(change.aro_foreign_key);
        } else {
          targetByAro.set(change.aro_foreign_key, toEntry(change.aro_foreign_key, change.aro, change.type));
        }
      }
      targetByItemId.set(
        item.id,
        new PermissionsCollection([...targetByAro.values()], { assertAtLeastOneOwner: false }),
      );
    }
    return targetByItemId;
  }

  /**
   * Whether the move actually changes anything for the item, by recipient and by level. Permission
   * ids and aco fields are ignored: they always differ between the two lists.
   * @param {PermissionsCollection} currentPermissions The item's current permissions.
   * @param {PermissionsCollection} appliedPermissions The permissions the item would end up with.
   * @returns {boolean}
   */
  hasPermissionsDelta(currentPermissions, appliedPermissions) {
    const toTypeByAro = (permissions) =>
      new Map(permissions.items.map((permission) => [permission.aroForeignKey, permission.type]));
    const currentByAro = toTypeByAro(currentPermissions);
    const appliedByAro = toTypeByAro(appliedPermissions);
    if (currentByAro.size !== appliedByAro.size) {
      return true;
    }
    for (const [aroForeignKey, type] of currentByAro) {
      if (appliedByAro.get(aroForeignKey) !== type) {
        return true;
      }
    }
    return false;
  }
}
