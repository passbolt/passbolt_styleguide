/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import MockPort from "../../../react-extension/test/mock/MockPort";

/**
 * Create a login form in DOM
 * @type {string}
 */
export const domElementBasicLogin =
  '<div>' +
  '  <input type="text" id="username" name="usename" />' +
  '  <input type="password" id="password" name="password" />' +
  '</div>';

/**
 * Create a login form in DOM
 * @type {string}
 */
export const domElementWithNoUsernamePassword =
  '<div>' +
  '  <input type="text" id="search" name="search" />' +
  '</div>';

/**
 * Mock global variable in window
 */
export const initializeWindow = () => {
  window.port = new MockPort();
  window.port._port = {
    onDisconnect: {
      addListener: () => {}
    }
  };
};