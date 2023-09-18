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
 * @since         4.3.0
 */

/**
 * Resource with string password DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretPasswordStringDto = (data = {}) => ({
  password: "secret-password",
  ...data
});

/**
 * Resource with encrypted description DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretPasswordAndDescriptionDto = (data = {}) => ({
  password: "secret-password",
  description: "secret-description",
  ...data
});

/**
 * Resource with encrypted description and TOTP DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretPasswordDescriptionTotpDto = (data = {}) => ({
  password: "secret-password",
  description: "secret-description",
  totp: {
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret_key: "i73r3rn22atgcmdlqmotr2q7erukgmri46bvzxzlc6jbkckmtlpa",
  },
  ...data
});

/**
 * Resource TOTP DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretTotpDto = (data = {}) => ({
  totp: {
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret_key: "i73r3rn22atgcmdlqmotr2q7erukgmri46bvzxzlc6jbkckmtlpa",
  },
  ...data
});
