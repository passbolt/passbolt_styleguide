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
import { isValidUuid } from "../../../utils/assertions";
import OfflineItemEntity from "../../../models/entity/offline/offlineItemEntity";

export const OFFLINE_MARK_RESOURCE_OFFLINE_EVENT = "passbolt.offline.mark-resource-offline";
export const OFFLINE_UNMARK_ITEM_OFFLINE_EVENT = "passbolt.offline.unmark-item-offline";

class OfflineModeServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Mark a resource available offline.
   * @param {string} resourceId The resource id.
   * @throws {Error} If the resource id is not valid.
   */
  async markResource(resourceId) {
    if (!isValidUuid(resourceId)) {
      throw new Error("The given resourceID should be a valid UUID");
    }
    const offlineItemDto = await this.port.request(OFFLINE_MARK_RESOURCE_OFFLINE_EVENT, resourceId);
    return new OfflineItemEntity(offlineItemDto);
  }

  /**
   * Unmark an item available offline.
   * @param {string} id The Offline item id.
   * @return {Promise<null>}
   */
  async unmarkItem(id) {
    if (!isValidUuid(id)) {
      throw new Error("The given id should be a valid UUID");
    }
    return await this.port.request(OFFLINE_UNMARK_ITEM_OFFLINE_EVENT, id);
  }
}
export default OfflineModeServiceWorkerService;
