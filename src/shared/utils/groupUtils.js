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
 * @since         5.4.0
 */

/**
 * Returns a string containing `${groupname}` of the given group or `Unknown group` if no data is available.
 * @param {Group} group
 * @param {function} [t] a translation function. Not necessary if called in a context where it is sure the group.name is defined
 * @returns {string}
 */
export const getGroupFormattedName = (group, t = null) => (group?.name ? group.name : t("Unknown group"));
