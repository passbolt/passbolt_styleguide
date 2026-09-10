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

export const FOLDER_UPDATE_EVENT = "passbolt.folders.update";
export const FOLDER_DELETE_EVENT = "passbolt.folders.delete";
import { assertUuid } from "../../../../shared/utils/assertions";
class FolderServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }
  /**
   * update a folder's name
   * @param {Object} folderDto {id, name}
   * @return {Promise<Object>}
   */
  async update(folderDto) {
    return this.port.request(FOLDER_UPDATE_EVENT, folderDto);
  }
  /**
   * Delete a folder.
   * @param {string} folderId The folder id
   * @param {boolean} [cascade = false] Also delete the folder content (sub-folders and resources)
   * @returns {Promise<void>}
   */
  async delete(folderId, cascade = false) {
    assertUuid(folderId);
    await this.port.request(FOLDER_DELETE_EVENT, folderId, cascade);
  }
}

export default FolderServiceWorkerService;
