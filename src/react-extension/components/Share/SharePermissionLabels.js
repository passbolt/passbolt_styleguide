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
 * @since         5.16.0
 */

/**
 * The translated permission level labels, keyed by permission type.
 * @param {function} t The translation function
 * @returns {object} {0: "No access", 1: "Can read", 7: "Can edit", 15: "Is owner"}
 */
export function getSharePermissionLabels(t) {
  return {
    0: t("No access"),
    1: t("Can read"),
    7: t("Can edit"),
    15: t("Is owner"),
  };
}
