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
}

export default FolderServiceWorkerService;
