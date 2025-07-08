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
 * @since         5.4.0
 */

export const RESOURCE_ACTIVITIES_FIND_ALL_EVENT = "passbolt.actionlogs.find-all-for";
export const LIMIT_ACTIVITIES_PER_PAGE = 5;

class ActivitiesServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find activities per page and limit from a resource id
   * @param {string} resourceId The resource Id
   * @param {object} options Options
   * @param {number} options.page The page number
   * @param {number} options.limit The limit of activities per page
   * @returns {object} The activities
   */
  async findAllFromResourceId(resourceId, {page, limit = LIMIT_ACTIVITIES_PER_PAGE}) {
    return await this.port.request(RESOURCE_ACTIVITIES_FIND_ALL_EVENT, "Resource", resourceId, {limit, page});
  }
}

export default ActivitiesServiceWorkerService;
