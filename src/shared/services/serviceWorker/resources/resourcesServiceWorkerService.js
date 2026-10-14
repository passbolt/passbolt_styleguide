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
 * @since         5.3.0
 */
import { assertUuid } from "../../../utils/assertions";

export const RESOURCES_UPDATE_LOCAL_STORAGE_BY_PARENT_FOLDER_ID =
  "passbolt.resources.update-local-storage-by-folder-parent-id";

export const RESOURCES_FIND_ALL_IDS_BY_IS_SHARED_WITH_GROUP = "passbolt.resources.find-all-ids-by-is-shared-with-group";

class ResourcesServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Update the resources local storage for the given parent folder id
   * @returns {Promise<void>}
   */
  async updateResourceLocalStorageForParentFolderId(parentFolderId) {
    assertUuid(parentFolderId, "The given parentFolderId should be a valid UUID");
    await this.port.request(RESOURCES_UPDATE_LOCAL_STORAGE_BY_PARENT_FOLDER_ID, parentFolderId);
  }

  /**
   * Find the ids of the resources shared with the given group.
   * @param {string} groupId The group id
   * @returns {Promise<array<string>>} The ids of the resources shared with the group
   */
  async findAllIdsByIsSharedWithGroup(groupId) {
    assertUuid(groupId, "The given groupId should be a valid UUID");
    return (await this.port.request(RESOURCES_FIND_ALL_IDS_BY_IS_SHARED_WITH_GROUP, groupId)) || [];
  }
}

export default ResourcesServiceWorkerService;
