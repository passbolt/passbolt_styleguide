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
 * Build minimal online session.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const minimalOnlineSessionDto = (data = {}) => ({
  is_authenticated: true,
  ...data,
});

/**
 * Build default online session.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultOnlineSessionDto = (data = {}) => ({
  is_authenticated: true,
  is_mfa_authenticated: true,
  last_online_logged_in: "2025-08-04T18:59:11+00:00",
  ...data,
});
