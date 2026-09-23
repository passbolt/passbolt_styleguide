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
 * @since         5.16.0
 */

import { assertArrayUUID, assertUuid } from "../../../utils/assertions";

export const MOVE_FOLDER_BY_ID = "passbolt.folders.move-by-id";
export const MOVE_RESOURCES_BY_IDS = "passbolt.resources.move-by-ids";

/**
 * Bridge to the service worker for move operations.
 * The permissions to apply travel with the move: the service worker applies them to the items the
 * operator owns, then moves everything. Without them the items move and keep their permissions.
 */
export default class MoveItemsServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Move a folder to a destination folder, applying the permissions the operator confirmed.
   * @param {string} folderId The UUID of the folder to move.
   * @param {string|null} destinationFolderId The UUID of the destination folder, or null for the root.
   * @param {Map<string, PermissionsCollection>|null} [confirmedPermissions] The permissions the
   *   operator confirmed, keyed by item id. Null to keep the permissions as they are.
   * @returns {Promise<*>}
   * @throws {Error} If folderId is not a valid UUID.
   * @throws {Error} If destinationFolderId is neither null nor a valid UUID.
   */
  async moveFolder(folderId, destinationFolderId, confirmedPermissions = null) {
    assertUuid(folderId, "The given folderId should be a valid UUID.");
    if (destinationFolderId !== null) {
      assertUuid(destinationFolderId, "The given destinationFolderId should be a valid UUID or null.");
    }
    const permissionsDto = this.serializeConfirmedPermissions(confirmedPermissions);
    return await this.port.request(MOVE_FOLDER_BY_ID, folderId, destinationFolderId, permissionsDto);
  }

  /**
   * Move resources to a destination folder, applying the permissions the operator confirmed.
   * @param {Array<string>} resourceIds The UUIDs of the resources to move.
   * @param {string|null} destinationFolderId The UUID of the destination folder, or null for the root.
   * @param {Map<string, PermissionsCollection>|null} [confirmedPermissions] The permissions the
   *   operator confirmed, keyed by item id. Null to keep the permissions as they are.
   * @returns {Promise<*>}
   * @throws {Error} If resourceIds is not a non-empty array.
   * @throws {TypeError} If resourceIds contains a value that is not a valid UUID.
   * @throws {Error} If destinationFolderId is neither null nor a valid UUID.
   */
  async moveResources(resourceIds, destinationFolderId, confirmedPermissions = null) {
    if (!Array.isArray(resourceIds) || resourceIds.length === 0) {
      throw new Error("The given resourceIds should be a non-empty array.");
    }
    assertArrayUUID(resourceIds, "The given resourceIds should only contain valid UUIDs.");
    if (destinationFolderId !== null) {
      assertUuid(destinationFolderId, "The given destinationFolderId should be a valid UUID or null.");
    }
    const permissionsDto = this.serializeConfirmedPermissions(confirmedPermissions);
    return await this.port.request(MOVE_RESOURCES_BY_IDS, resourceIds, destinationFolderId, permissionsDto);
  }

  /**
   * Serialize the confirmed permissions for the service worker, grouped per item id.
   * @param {Map<string, PermissionsCollection>|null} confirmedPermissions
   * @returns {Object<string, Array<object>>|null}
   * @private
   */
  serializeConfirmedPermissions(confirmedPermissions) {
    if (!confirmedPermissions) {
      return null;
    }
    return Object.fromEntries([...confirmedPermissions].map(([itemId, permissions]) => [itemId, permissions.toDto()]));
  }
}
