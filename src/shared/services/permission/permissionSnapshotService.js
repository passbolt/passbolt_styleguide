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
import PermissionEntity from "../../models/entity/permission/permissionEntity";
import PermissionsCollection from "../../models/entity/permission/permissionsCollection";
import UserEntity from "../../models/entity/user/userEntity";
import GroupEntity from "../../models/entity/group/groupEntity";
import PermissionSnapshotEntity from "../../models/entity/permission/permissionSnapshotEntity";

/**
 * Higher-level orchestrator that composes the keyring, permission, and group service-worker
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
   * Returns one snapshot per resource, aligned with the given ids (a snapshot targets a single ACO).
   * The keyring is synchronised, the permissions fetched, and the referenced groups resolved once for
   * the whole selection, keeping the number of requests constant regardless of its size.
   * @param {Array<string>} resourcesIds The ids of the resources being shared.
   * @returns {Promise<Array<PermissionSnapshotEntity>>}
   */
  async buildSnapshotForResourcesShare(resourcesIds) {
    if (resourcesIds.length === 0) {
      return [];
    }
    await this.keyringServiceWorkerService.synchroniseKeyring();

    const resourcesDtos = await this.permissionServiceWorkerService.findByIdsForShare(resourcesIds);
    const permissionsById = new Map();
    for (const resourceDto of resourcesDtos) {
      permissionsById.set(
        resourceDto.id,
        new PermissionsCollection(resourceDto.permissions ?? [], { assertAtLeastOneOwner: false }),
      );
    }

    // Fail loudly if the batch did not return every selected resource.
    const missingResourceId = resourcesIds.find((resourceId) => !permissionsById.has(resourceId));
    if (missingResourceId) {
      throw new Error(`The permissions of the resource ${missingResourceId} could not be retrieved.`);
    }

    // Resolve every referenced group across the selection in a single deduplicated request.
    const allGroupIds = [...permissionsById.values()].flatMap((permissions) => this._referencedGroupIds(permissions));
    const groupsById = new Map();
    if (allGroupIds.length) {
      const groups = await this.groupServiceWorkerService.findByIdsForShare([...new Set(allGroupIds)]);
      for (const group of groups.items) {
        groupsById.set(group.id, group);
      }
    }

    return resourcesIds.map((resourceId) => {
      const permissions = permissionsById.get(resourceId);
      const groups = this._referencedGroupIds(permissions)
        .map((groupId) => groupsById.get(groupId))
        .filter(Boolean);
      return this._toSnapshot(permissions, groups);
    });
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
    const permissions = await this.permissionServiceWorkerService.findPermissions(acoId, acoType);
    const groupIds = this._referencedGroupIds(permissions);
    // No group permissions: skip the round-trip to the service worker entirely.
    let groups = [];
    if (groupIds.length) {
      groups = (await this.groupServiceWorkerService.findByIdsForShare(groupIds)).items;
    }
    return this._toSnapshot(permissions, groups);
  }

  /**
   * Extract the ids of the groups referenced by a permission set.
   * @param {PermissionsCollection} permissions The permission set to inspect.
   * @returns {Array<string>}
   * @private
   */
  _referencedGroupIds(permissions) {
    return permissions.items
      .filter((permission) => permission.aro === PermissionEntity.ARO_GROUP)
      .map((permission) => permission.aroForeignKey);
  }

  /**
   * Assemble the immutable snapshot from a permission set and the groups it references. The user
   * list is derived from those groups' members (deduplicated); directly-permissioned users are not
   * resolved separately, their data travels in the permissions.
   * @param {PermissionsCollection} permissions The permission set to capture.
   * @param {Array<GroupEntity>} groups The groups referenced by the permission set.
   * @returns {PermissionSnapshotEntity}
   * @private
   */
  _toSnapshot(permissions, groups) {
    const usersById = new Map();
    for (const group of groups) {
      for (const groupUser of group.groupsUsers?.items ?? []) {
        if (groupUser.user && !usersById.has(groupUser.user.id)) {
          usersById.set(groupUser.user.id, groupUser.user.toDto(UserEntity.ALL_CONTAIN_OPTIONS));
        }
      }
    }
    return new PermissionSnapshotEntity({
      permissions: permissions.toDto(),
      groups: groups.map((group) => group.toDto(GroupEntity.ALL_CONTAIN_OPTIONS)),
      users: [...usersById.values()],
      created: new Date().toISOString(),
    });
  }
}
