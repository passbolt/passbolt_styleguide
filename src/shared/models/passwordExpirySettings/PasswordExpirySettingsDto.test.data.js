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
 * @since         4.4.0
 */

import { v4 as uuid } from "uuid";

/**
 * The default password expiry settings ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultPasswordExpirySettingsViewModelDto = (data = {}) => {
  const defaultData = {
    automatic_update: true,
    policy_override: false,
    automatic_expiry: true,
    default_expiry_period: null,
  };

  return Object.assign(defaultData, data);
};

/**
 * The disabled password expiry settings ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const disabledPasswordExpirySettingsViewModelDto = (data = {}) => {
  const defaultData = {
    automatic_update: false,
    policy_override: false,
    automatic_expiry: false,
    default_expiry_period: null,
  };

  return Object.assign(defaultData, data);
};

/**
 * The default password expiry settings Entity DTO
 * This DTO has the same structure has the one served by the API/Bext
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultPasswordExpirySettingsEntityDto = (data = {}) => {
  const defaultData = {
    automatic_update: true,
    automatic_expiry: true,
    policy_override: false,
    default_expiry_period: null,
  };

  return Object.assign(defaultData, data);
};

/**
 * The default password expiry settings Entity DTO
 * This DTO has the same structure has the one served by the API/Bext
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const overridenPasswordExpirySettingsEntityDto = (data = {}) => {
  const defaultData = {
    automatic_update: true,
    automatic_expiry: true,
    policy_override: true,
    default_expiry_period: 30,
  };

  return Object.assign(defaultData, data);
};

/**
 * A password expiry settings Entity DTO as registered on the API
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const passwordExpirySettingsEntityDtoFromApi = (data = {}) => {
  const defaultData = defaultPasswordExpirySettingsEntityDto({
    id: uuid(),
    created: "2023-08-06T10:05:46+00:00",
    created_by: uuid(),
    modified: "2023-08-06T10:05:46+00:00",
    modified_by: uuid(),
  });

  return Object.assign(defaultData, data);
};
