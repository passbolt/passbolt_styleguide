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
 * @since         5.0.0
 */


export const GET_CSRF_TOKEN_EVENT = "passbolt.auth.get-csrf-token";

class CsrfTokenServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get a csrf token from the service worker.
   * @returns {Promise<String>}
   */
  async getCsrfToken() {
    const keyInfoDto = await this.port.request(GET_CSRF_TOKEN_EVENT);
    return keyInfoDto;
  }
}

export default CsrfTokenServiceWorkerService;
