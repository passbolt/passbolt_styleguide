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
import PermissionServiceWorkerService from "../serviceWorker/permission/permissionServiceWorkerService";
import PermissionEntity from "../../models/entity/permission/permissionEntity";

/**
 * Permission-change transformations for the share-scope-confirmation workflow.
 */
export default class PermissionChangesService {
  /**
   * @param {object} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.permissionServiceWorkerService = new PermissionServiceWorkerService(port);
  }

  /**
   * Rebase ShareDialog deltas onto a freshly-created/touched resource. ShareDialog seeds itself
   * from the parent folder's snapshot, so deltas carry stale folder permission ids and a null
   * `aco_foreign_key`; this method swaps those for the resource's actual permission ids (looked
   * up by `aro_foreign_key`) and stamps the resource id. `is_new` deltas just get the stamp.
   * Deltas with no matching inherited permission are dropped (nothing to update/delete).
   * @param {Array<object>} changes Deltas as `ShareChanges.getResourcesChanges()` emits them.
   * @param {string} resourceId The resource the deltas should target.
   * @returns {Promise<Array<object>>} Rebased deltas, ready for `passbolt.share.resources.save`.
   */
  async rebaseChangesForResource(changes, resourceId) {
    const needsResourcePermLookup = changes.some((change) => !change.is_new);
    let resourcePermIdByAroId = null;
    if (needsResourcePermLookup) {
      const resourcePermissions = await this.permissionServiceWorkerService.findPermissions(
        resourceId,
        PermissionEntity.ACO_RESOURCE,
      );
      resourcePermIdByAroId = new Map(
        resourcePermissions.items.map((permission) => [permission.aroForeignKey, permission.id]),
      );
    }
    const rebased = [];
    for (const change of changes) {
      if (change.is_new) {
        rebased.push({ ...change, aco_foreign_key: resourceId });
        continue;
      }
      const realId = resourcePermIdByAroId.get(change.aro_foreign_key);
      if (!realId) {
        continue;
      }
      rebased.push({ ...change, id: realId, aco_foreign_key: resourceId });
    }
    return rebased;
  }
}
