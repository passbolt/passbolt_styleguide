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
 * @since         4.12.0
 */
import ResourceTypesCollection from "../../../models/entity/resourceType/resourceTypesCollection";

export const RESOURCE_TYPE_FIND_DELETED_AND_NON_DELETED_EVENT = "passbolt.resource-type.find-all-by-deleted-and-non-deleted";

class ResourceTypesServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find all the resource types (deleted and available).
   * @returns {Promise<ResourceTypesCollection>}
   */
  async findAllByDeletedAndNonDeleted() {
    const resourceTypes = await this.port.request(RESOURCE_TYPE_FIND_DELETED_AND_NON_DELETED_EVENT);
    return new ResourceTypesCollection(resourceTypes);
  }
}

export default ResourceTypesServiceWorkerService;
