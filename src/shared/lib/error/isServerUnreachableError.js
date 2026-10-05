/**
 * Passly - Open source password manager for teams
 * Copyright (c) 2026 Svaroh
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Svaroh
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://passly.svaroh.net Passly
 * @since         6.0.23
 */

/**
 * What the api client says when the request never reached the server.
 * @see src/shared/lib/apiClient/apiClient.js
 */
export const SERVER_UNREACHABLE_MESSAGES = [
  "Unable to reach the server, you are not connected to the network",
  "Unable to reach the server, an unexpected error occurred",
];

/**
 * Whether a failure only means the server could not be reached.
 *
 * It is not an application error, and it is not something to interrupt anyone with: the vault is held on this device
 * and goes on working. Everything the server did answer, however unwelcome, stays a real error and keeps its dialog.
 *
 * @param {Error|string|null} candidate the error, or the message, to judge
 * @returns {boolean}
 */
export default function isServerUnreachableError(candidate) {
  if (!candidate) {
    return false;
  }

  if (candidate.name === "PassboltServiceUnavailableError") {
    return true;
  }

  const message = typeof candidate === "string" ? candidate : candidate.message;

  return SERVER_UNREACHABLE_MESSAGES.some((unreachableMessage) => message?.includes(unreachableMessage));
}
