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
 * @since         5.7.0
 */

export const ADD_RESOURCE_TO_FAVORITES = "passbolt.favorite.add";
export const REMOVE_RESOURCE_FROM_FAVORITES = "passbolt.favorite.delete";

class FavoriteServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Add a resource to the favorites given a resource id.
   * @param {string} resourceId The resource Id
   * @returns {Promise<void>}
   */
  async addToFavorites(resourceId) {
    await this.port.request(ADD_RESOURCE_TO_FAVORITES, resourceId);
  }

  /**
   * Remove a resource from favorites given a resource id.
   * @param {string} resourceId The resource Id
   * @returns {Promise<void>}
   */
  async removeFromFavorites(resourceId) {
    await this.port.request(REMOVE_RESOURCE_FROM_FAVORITES, resourceId);
  }
}

export default FavoriteServiceWorkerService;
