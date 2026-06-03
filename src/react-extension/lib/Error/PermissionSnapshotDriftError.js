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
 * @since         5.13.0
 */

/**
 * Raised by a permission-touching workflow when the parent ACO's permission state has changed
 * between the initial snapshot (taken at workflow start) and the submit-time snapshot (taken
 * right before encryption + API call). The flow's error handler propagates this through the
 * standard `NotifyError` dialog and terminates so the operator can retry from a fresh baseline.
 */
class PermissionSnapshotDriftError extends Error {
  /**
   * @param {string} message Localized message explaining the drift to the operator.
   */
  constructor(message) {
    super(message);
    this.name = "PermissionSnapshotDriftError";
  }
}

export default PermissionSnapshotDriftError;
