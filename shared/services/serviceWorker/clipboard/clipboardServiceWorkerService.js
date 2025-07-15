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
 * @since         5.3.2
 */

import assertString from "validator/es/lib/util/assertString";

const CLIPBOARD_COPY_TEMPRORARILY_EVENT = "passbolt.clipboard.copy-temporarily";
const CLIPBOARD_COPY_EVENT = "passbolt.clipboard.copy";
const CLIPBOARD_CANCEL_FLUSH_EVENT = "passbolt.clipboard.cancel-content-flush";

export default class ClipboardServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Temporarily copies the given content to the clipboard.
   * The copy is delegated to service worker such it can ensure a copy in any circumstances.
   * So, even when not in a "secure" context (like HTTP) the copy can be done.
   * @param {string} clipboardContent the data to copy to clipboard.
   * @returns {Promise<void>}
   * @throws {TypeError} if the given parameter is not a valid string
   */
  async copyTemporarily(clipboardContent) {
    assertString(clipboardContent);
    await this.port.request(CLIPBOARD_COPY_TEMPRORARILY_EVENT, clipboardContent);
  }

  /**
   * Copies the given content to the clipboard.
   * The copy is delegated to service worker such it can ensure a copy in any circumstances.
   * So, even when not in a "secure" context (like HTTP) the copy can be done.
   * @param {string} clipboardContent the data to copy to clipboard.
   * @returns {Promise<void>}
   * @throws {TypeError} if the given parameter is not a valid string
   */
  async copy(clipboardContent) {
    assertString(clipboardContent);
    await this.port.request(CLIPBOARD_COPY_EVENT, clipboardContent);
  }

  /**
   * Asks the service worker to cancel the flush of the temporary content if any.
   * @returns {Promise<void>}
   */
  async cancelClipboardFlush() {
    await this.port.request(CLIPBOARD_CANCEL_FLUSH_EVENT);
  }
}
