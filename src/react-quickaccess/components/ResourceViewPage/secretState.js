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
 * @since         5.18.0
 */

/**
 * The delay after which the clipboard content copied temporarily is flushed, in seconds.
 * @type {number}
 */
export const CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND = 30;

/**
 * The duration of the icons fade transition, in ms.
 * @type {number}
 */
export const TRANSITION_DURATION_IN_MS = 500;

/**
 * The copy action statuses.
 * @type {object}
 */
export const COPY_STATUSES = {
  DEFAULT: "default",
  PROCESSING: "processing",
  DONE: "done",
};

/**
 * The keys of the rows with a fixed name. A custom field row is keyed by the custom field id.
 * @type {object}
 */
export const SECRET_KEYS = {
  USERNAME: "username",
  PASSWORD: "password",
  TOTP: "totp",
  PIN_CODE: "pin_code",
  NOTE: "note",
};
