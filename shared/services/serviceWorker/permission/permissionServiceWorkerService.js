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

import PermissionsCollection from "../../../models/entity/permission/permissionsCollection";
import { assertArrayUUID, assertUuid } from "../../../utils/assertions";

export const PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY = "passbolt.permissions.find-aco-permissions-for-display";
export const PERMISSIONS_FIND_BY_IDS_FOR_SHARE = "passbolt.permissions.find-by-ids-for-share";
export const SHARE_RESOURCES_SAVE = "passbolt.share.resources.save";
export const SHARE_FOLDERS_SAVE = "passbolt.share.folders.save";
export const RESOURCES_CREATE = "passbolt.resources.create";
export const RESOURCES_UPDATE = "passbolt.resources.update";

export default class PermissionServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the permissions for a given ACO (Access Control Object).
   * @param {string} acoId The UUID of the ACO (e.g. resource or folder id).
   * @param {string} acoType The type of the ACO (e.g. "Resource" or "Folder").
   * @returns {Promise<PermissionsCollection>}
   */
  async findPermissions(acoId, acoType) {
    const dtos = await this.port.request(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, acoId, acoType);
    return new PermissionsCollection(dtos, { assertAtLeastOneOwner: false });
  }

  /**
   * Find the permissions of the given resources, tailored for the share process, in a single request.
   * @param {Array<string>} resourcesIds The ids of the resources to retrieve the permissions for.
   * @returns {Promise<Array<object>>} The resource DTOs, each carrying its `id` and `permissions`.
   */
  async findByIdsForShare(resourcesIds) {
    return this.port.request(PERMISSIONS_FIND_BY_IDS_FOR_SHARE, resourcesIds);
  }

  /**
   * Save the permission changes for the given resources.
   * @param {Array<string>} resourcesIds The UUIDs of the resources to update the permissions for.
   * @param {Array<object>} permissionChangesDto The permission changes to apply.
   * @returns {Promise<*>}
   * @throws {Error} If resourcesIds is not a non-empty array of UUIDs.
   */
  async saveResourcesPermissions(resourcesIds, permissionChangesDto) {
    if (!Array.isArray(resourcesIds) || resourcesIds.length === 0) {
      throw new Error("The given resourcesIds should be a non-empty array.");
    }
    assertArrayUUID(resourcesIds, "The given resourcesIds should only contain valid UUIDs.");
    return this.port.request(SHARE_RESOURCES_SAVE, resourcesIds, permissionChangesDto);
  }

  /**
   * Save the permission changes for the given folder.
   * @param {string} folderId The UUID of the folder to update the permissions for.
   * @param {Array<object>} permissionChangesDto The permission changes to apply.
   * @returns {Promise<*>}
   * @throws {Error} If folderId is not a valid UUID.
   */
  async saveFoldersPermissions(folderId, permissionChangesDto) {
    assertUuid(folderId, "The given folderId should be a valid UUID.");
    return this.port.request(SHARE_FOLDERS_SAVE, folderId, permissionChangesDto);
  }

  /**
   * Create a resource, optionally sharing it with the given recipients in the same orchestrated call.
   * @param {object} resourceDto The resource DTO to create.
   * @param {object|string} secretDto The secret DTO to encrypt for the resource.
   * @param {Array<object>} [permissionChanges] The operator-confirmed permission changes to apply.
   * @returns {Promise<*>}
   */
  async createResource(resourceDto, secretDto, permissionChanges) {
    return this.port.request(RESOURCES_CREATE, resourceDto, secretDto, permissionChanges);
  }

  /**
   * Update a resource, optionally re-sharing it with the given recipients in the same orchestrated call.
   * @param {object} resourceDto The resource DTO to update.
   * @param {object|string} secretDto The secret DTO to encrypt for the resource.
   * @param {Array<object>} [permissionChanges] The operator-confirmed permission changes to apply.
   * @returns {Promise<*>}
   */
  async updateResource(resourceDto, secretDto, permissionChanges) {
    return this.port.request(RESOURCES_UPDATE, resourceDto, secretDto, permissionChanges);
  }
}
