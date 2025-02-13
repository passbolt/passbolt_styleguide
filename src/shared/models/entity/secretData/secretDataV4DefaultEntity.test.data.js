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
 * @since         5.0.0
 */
``;

/**
 * Returns a minimum DTO object suitable for the SecretDataV4DefaultEntity
 * @param {object} data
 * @returns {object}
 */
export const minimalDefaultSecretDataV4DefaultData = (data = {}) => ({
  password: "this-is-a-secret-password",
  ...data,
});

/**
 * Returns a default DTO object suitable for the SecretDataV4DefaultEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultSecretDataV4DefaultData = (data = {}) => ({
  ...minimalDefaultSecretDataV4DefaultData(data),
  description: "this is a secret description",
});
