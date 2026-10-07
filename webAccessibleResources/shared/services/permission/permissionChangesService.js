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
}
