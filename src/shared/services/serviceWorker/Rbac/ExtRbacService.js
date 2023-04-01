/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.0.0
 */

class ExtRbacService {
  /**
   * @param {Port} port The extension communication port
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Check if the current user can use the given action
   * @param {string} name The name of the action to check
   * @return {Promise<boolean>}
   */
  canIUseUiAction(name) {
    return this.port.request('passbolt.rbac.can-i-use-ui-action', name);
  }
}

export default ExtRbacService;
