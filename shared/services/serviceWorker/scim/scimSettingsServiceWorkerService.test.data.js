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

import { v4 as uuidv4 } from "uuid";
import ScimSettingsEntity from "../../../models/entity/scimSettings/scimSettingsEntity";

/**
 * Default SCIM settings DTO
 * @param {Object} [data={}] - Optional overrides for the default values
 * @returns {Object}
 */
export const defaultScimSettingsDto = (data = {}) => ({
  id: uuidv4(),
  scim_user_id: uuidv4(),
  setting_id: uuidv4(),
  secret_token: "pb_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefg",
  ...data,
});

/**
 * SCIM settings DTO without secret_token
 * @param {Object} [data={}] - Optional overrides for the default values
 */
export const scimSettingsWithoutSecretTokenDto = (data = {}) => {
  const scimSettingsDto = defaultScimSettingsDto(data);
  scimSettingsDto.secret_token = ScimSettingsEntity.EMPTY_SECRET_VALUE;

  return scimSettingsDto;
};

/**
 * SCIM settings DTO without id
 * @param {Object} [data={}] - Optional overrides for the default values
 * @returns {Object}
 */
export const scimSettingsWithoutIdDto = (data = {}) => {
  const scimSettingsDto = defaultScimSettingsDto(data);
  delete scimSettingsDto.id;

  return scimSettingsDto;
};

/**
 * SCIM settings DTO with invalid secret_token
 * @param {Object} [data={}] - Optional overrides for the default values
 * @returns {Object}
 */
export const scimSettingsWithInvalidSecretTokenDto = (data = {}) => ({
  id: uuidv4(),
  scim_user_id: uuidv4(),
  setting_id: uuidv4(),
  secret_token: "invalid_token",
  ...data,
});
