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
 * @since         5.11.0
 */

export const TABS_OPEN_RESOURCE_URI = "passbolt.tabs.open-resource-uri";

export default class TabsServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Open the given url string in a new tab
   * @param {string} urlString
   * @returns {Promise<void>}
   */
  async openResourceUriInNewTab(urlString) {
    await this.port.request(TABS_OPEN_RESOURCE_URI, urlString);
  }
}
