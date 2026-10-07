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
import PropTypes from "prop-types";

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
 * The state of a secret row as the page gives it to a section, the plaintext only while the row is revealed.
 */
export const secretRowStatePropType = PropTypes.shape({
  revealed: PropTypes.bool, // Is the value revealed
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // The plaintext, given only while revealed (the totp dto for a TOTP row)
  decrypting: PropTypes.bool, // Is the secret decrypting for this row
  copyStatus: PropTypes.oneOf(Object.values(COPY_STATUSES)), // The copy action status
  showTimer: PropTypes.bool, // Display the clipboard flush timer next to the copy action
  onCopy: PropTypes.func, // The copy handler
  onPreview: PropTypes.func, // The preview toggle handler
});
