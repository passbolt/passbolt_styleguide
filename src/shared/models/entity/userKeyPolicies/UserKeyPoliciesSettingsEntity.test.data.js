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
 * @since         5.1.1
 */

/**
 * Build default user key policies settings dto.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const defaultUserKeyPoliciesSettingsDto = (data = {}) => ({
  preferred_key_type: "curve",
  preferred_key_curve: "curve25519_legacy+ed25519_legacy",
  source: "default",
  ...data,
});

export const rsaUserKeyPoliciesSettingsDto = (data = {}) => ({
  preferred_key_type: "rsa",
  preferred_key_size: 4096,
  source: "env",
  ...data,
});
