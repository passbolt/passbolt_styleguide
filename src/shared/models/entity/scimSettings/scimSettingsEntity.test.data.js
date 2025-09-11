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
 * @since         5.5.0
 */
import {v4 as uuidv4} from "uuid";

/**
 * Returns a minimum DTO object suitable for the ScimSettingsEntity
 * @param {object} data
 * @returns {object}
 */
export const minimalScimSettingsDto = (data = {}) => ({
  scim_user_id: uuidv4(),
  setting_id: uuidv4(),
  ...data,
});

/**
 * Returns a default DTO object suitable for the ScimSettingsEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultScimSettingsDto = (data = {}) => ({
  id: uuidv4(),
  scim_user_id: uuidv4(),
  setting_id: uuidv4(),
  secret_token: "pb_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefg",
  ...data,
});

/**
 * Returns a DTO object with null secret_token
 * @param {object} data
 * @returns {object}
 */
export const scimSettingsDtoWithNullSecretToken = (data = {}) => ({
  ...defaultScimSettingsDto(data),
  secret_token: null,
});

/**
 * Returns a DTO object with null secret_token and setting_id
 * @param {object} data
 * @returns {object}
 */
export const scimSettingsDtoForUpdating = (data = {}) => ({
  ...scimSettingsDtoWithNullSecretToken(data),
  setting_id: null,
});


/**
 * Returns a DTO object with invalid secret_token pattern
 * @param {object} data
 * @returns {object}
 */
export const scimSettingsDtoWithInvalidSecretToken = (data = {}) => ({
  ...defaultScimSettingsDto(data),
  secret_token: "invalid_token_pattern",
});

/**
 * Returns a DTO object with invalid secret_token length
 * @param {object} data
 * @returns {object}
 */
export const scimSettingsDtoWithInvalidSecretTokenLength = (data = {}) => ({
  ...defaultScimSettingsDto(data),
  secret_token: "pb_1234567890890abcdef123",
});
