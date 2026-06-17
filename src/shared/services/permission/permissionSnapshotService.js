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
import KeyringServiceWorkerService from "../serviceWorker/keyring/keyringServiceWorkerService";
import PermissionServiceWorkerService from "../serviceWorker/permission/permissionServiceWorkerService";
import GroupServiceWorkerService from "../serviceWorker/group/groupServiceWorkerService";
import UserServiceWorkerService from "../serviceWorker/user/userServiceWorkerService";
import PermissionEntity from "../../models/entity/permission/permissionEntity";
import PermissionSnapshotEntity from "../../models/entity/permission/permissionSnapshotEntity";

/**
 * Higher-level orchestrator that composes the keyring, permission, group, and user service-worker
 * services to build an immutable permission snapshot. The snapshot is used by the permission-review
 * workflow to guarantee that the permission set displayed to the operator is exactly the one applied
 * when secrets are encrypted and shared.
 */
export default class PermissionSnapshotService {
  /**
   * @param {object} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.keyringServiceWorkerService = new KeyringServiceWorkerService(port);
    this.permissionServiceWorkerService = new PermissionServiceWorkerService(port);
    this.groupServiceWorkerService = new GroupServiceWorkerService(port);
    this.userServiceWorkerService = new UserServiceWorkerService(port);
  }

  /**
   * Build the initial permission snapshot shown to the operator before a resource is created.
   * The new resource does not exist yet; its permissions will inherit from the parent folder,
   * so the snapshot captures the parent folder's current permission set together with every
   * group and user referenced by it. Forces a keyring synchronisation first so the operator
   * validates against the latest keys.
   * @param {string} parentFolderId The id of the folder the new resource will be created under.
   * @returns {Promise<PermissionSnapshotEntity>}
   */
  async buildSnapshotForResourceCreation(parentFolderId) {
    return this._buildSnapshot(parentFolderId, PermissionEntity.ACO_FOLDER);
  }

  /**
   * Build the permission snapshot shown to the operator while editing an existing resource.
   * Unlike creation, the permissions are captured from the resource itself (not from a parent
   * folder) so the operator reviews exactly who will receive the re-encrypted secret.
   * @param {string} resourceId The id of the resource being edited.
   * @returns {Promise<PermissionSnapshotEntity>}
   */
  async buildSnapshotForResourceEdition(resourceId) {
    return this._buildSnapshot(resourceId, PermissionEntity.ACO_RESOURCE);
  }

  /**
   * Build the permission snapshot shown to the operator while sharing a folder. The permissions are
   * captured from the folder itself so the operator reviews and edits the folder's own permission
   * set before the share is propagated to its content. Also used to re-snapshot the folder for drift
   * detection.
   * @param {string} folderId The id of the folder being shared.
   * @returns {Promise<PermissionSnapshotEntity>}
   */
  async buildSnapshotForFolderShare(folderId) {
    return this._buildSnapshot(folderId, PermissionEntity.ACO_FOLDER);
  }

  /**
   * Build the permission snapshots shown to the operator while sharing a selection of resources.
   * Each resource is captured independently (a snapshot's permission set targets a single ACO), so
   * this returns one snapshot per resource, aligned with the given ids. A single-resource share is
   * simply a selection of one. The keyring is synchronised once for the whole selection rather than
   * per resource.
   * @param {Array<string>} resourcesIds The ids of the resources being shared.
   * @returns {Promise<Array<PermissionSnapshotEntity>>}
   */
  async buildSnapshotForResourcesShare(resourcesIds) {
    if (resourcesIds.length === 0) {
      return [];
    }
    await this.keyringServiceWorkerService.synchroniseKeyring();
    return Promise.all(
      resourcesIds.map((resourceId) =>
        this._buildSnapshotForSynchronisedKeyring(resourceId, PermissionEntity.ACO_RESOURCE),
      ),
    );
  }

  /**
   * Build an immutable permission snapshot for an ACO together with every group and user
   * referenced by its permissions. Forces a keyring synchronisation first so the operator
   * validates against the latest keys.
   * @param {string} acoId The id of the ACO (folder for creation, resource for edition).
   * @param {string} acoType The ACO type (PermissionEntity.ACO_FOLDER or ACO_RESOURCE).
   * @returns {Promise<PermissionSnapshotEntity>}
   * @private
   */
  async _buildSnapshot(acoId, acoType) {
    await this.keyringServiceWorkerService.synchroniseKeyring();
    return this._buildSnapshotForSynchronisedKeyring(acoId, acoType);
  }

  /**
   * Build an immutable permission snapshot for an ACO together with every group and user
   * referenced by its permissions, assuming the keyring has already been synchronised by the
   * caller.
   * @param {string} acoId The id of the ACO (folder for creation, resource for edition).
   * @param {string} acoType The ACO type (PermissionEntity.ACO_FOLDER or ACO_RESOURCE).
   * @returns {Promise<PermissionSnapshotEntity>}
   * @private
   */
  async _buildSnapshotForSynchronisedKeyring(acoId, acoType) {
    const permissions = await this.permissionServiceWorkerService.findPermissions(acoId, acoType);
    return this._buildSnapshotFromPermissions(permissions);
  }

  /**
   * Resolve the groups and users referenced by a permission set and assemble the immutable snapshot.
   * @param {PermissionsCollection} permissions The permission set to capture.
   * @returns {Promise<PermissionSnapshotEntity>}
   * @private
   */
  async _buildSnapshotFromPermissions(permissions) {
    const groupIds = permissions.items
      .filter((permission) => permission.aro === PermissionEntity.ARO_GROUP)
      .map((permission) => permission.aroForeignKey);
    // The groups carry their memberships (groups_users); their member users are resolved alongside
    // the directly-permissioned users so the dialog can list a group's members when expanded.
    const groups = await this.groupServiceWorkerService.getByIds(groupIds);
    const memberUserIds = groups.items.flatMap((group) =>
      (group.groupsUsers?.items ?? []).map((groupUser) => groupUser.userId),
    );
    const userIds = [
      ...new Set([
        ...permissions.items
          .filter((permission) => permission.aro === PermissionEntity.ARO_USER)
          .map((permission) => permission.aroForeignKey),
        ...memberUserIds,
      ]),
    ];
    const users = await this.userServiceWorkerService.getByIds(userIds);
    return new PermissionSnapshotEntity({
      permissions: permissions.toDto(),
      groups: groups.toDto(),
      users: users.toDto(),
      created: new Date().toISOString(),
    });
  }
}
