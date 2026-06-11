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
