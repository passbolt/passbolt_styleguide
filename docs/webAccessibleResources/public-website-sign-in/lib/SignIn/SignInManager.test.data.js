/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.7.0
 */

import MockPort from "../../../react-extension/test/mock/MockPort";

/**
 * Create button for sign-in in DOM
 * @type {string}
 */
export const domElementWithExtensionSignIn =
  '<div>' +
  '  <button type="button" id="extension-sign-in"/>' +
  '</div>';

/**
 * Create one buttons for sign-in in DOM
 * @type {string}
 */
export const domElementWithNoExtensionSignIn =
  '<div>' +
  '  <button type="button" id="other-button"/>' +
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
