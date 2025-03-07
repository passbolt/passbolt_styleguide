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

import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";

/**
 * Returns a minimum DTO object suitable for the SecretDataV5PasswordStringEntity
 * @param {object} data
 * @returns {object}
 */
export const minimalDefaultSecretDataV5PasswordStringDto = (data = {}) => ({
  object_type: SECRET_DATA_OBJECT_TYPE,
  password: null,
  ...data,
});

/**
 * Returns a default DTO object suitable for the SecretDataV5PasswordStringEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultSecretDataV5PasswordStringDto = (data = {}) => ({
  ...minimalDefaultSecretDataV5PasswordStringDto(data),
  password: "this-is-a-secret-password"
});
