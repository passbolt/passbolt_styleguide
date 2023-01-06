/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */

/**
 * A utility class for copying text to the clipboard.
 * @class ClipBoard
 */

class ClipBoard {
  /**
   * Copies the given text to the clipboard.
   * @static
   * @param {string} text - The text to copy to the clipboard.
   * @returns {Promise}
   */
  static async copy(text, port) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        ClipBoard.copyWithBrowserExtension(text, port);
      }
    } else {
      ClipBoard.copyWithBrowserExtension(text, port);
    }
  }

  static copyWithBrowserExtension(text, port) {
    port.request("passbolt.clipboard.copy", text);
  }
}


export default ClipBoard;
