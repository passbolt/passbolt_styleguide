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
 * Returns a DTO object suitable for the PasskeyHmacCredentialsEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultPasskeyHmacCredentialsDto = (data = {}) => ({
  algorithm: "hmac-sha256",
  cred_with_uv: "4Kq6Bm8-l_UqCF_YNagyT6J2HxKa5DAGjbBFJbdrlQE",
  cred_without_uv: "_xRz7NJyQFi8hVFLoITHvgl2qI_BJOk7YNNfTuhS6wE",
  ...data,
});
