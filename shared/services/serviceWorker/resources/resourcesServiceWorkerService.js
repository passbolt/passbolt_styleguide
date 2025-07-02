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
import {isValidUuid} from "../../../utils/assertions";

export const RESOURCES_UPDATE_LOCAL_STORAGE_BY_PARENT_FOLDER_ID = "passbolt.resources.update-local-storage-by-folder-parent-id";

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
    if (!isValidUuid(parentFolderId)) {
      throw new Error("The given parentFolderId should be a valid UUID");
    }
    await this.port.request(RESOURCES_UPDATE_LOCAL_STORAGE_BY_PARENT_FOLDER_ID, parentFolderId);
  }
}

export default ResourcesServiceWorkerService;
