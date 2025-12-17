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
import { defaultScimSettingsDto } from "./scimSettingsEntity.test.data";
import { v4 as uuidv4 } from "uuid";

export const defaultScimSettingsFormDto = (data = {}) => {
  const defaultData = defaultScimSettingsDto(data);
  return defaultData;
};

export const minimalScimSettingsFormDto = (data = {}) => ({
  scim_user_id: uuidv4(),
  setting_id: uuidv4(),
  ...data,
});

export const scimSettingsFormDtoWithNullSecretToken = (data = {}) => ({
  ...defaultScimSettingsFormDto(data),
  secret_token: null,
});

export const scimSettingsFormDtoWithInvalidSecretToken = (data = {}) => ({
  ...defaultScimSettingsFormDto(data),
  secret_token: "invalid_token_pattern",
});

export const scimSettingsFormDtoWithInvalidSecretTokenLength = (data = {}) => ({
  ...defaultScimSettingsFormDto(data),
  secret_token: "pb_123",
});
