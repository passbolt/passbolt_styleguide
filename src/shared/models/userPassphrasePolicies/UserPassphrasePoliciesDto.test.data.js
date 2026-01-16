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

import { v4 as uuid } from "uuid";

/**
 * The default user passprhase policies ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultUserPassphrasePoliciesViewModelDto = (data = {}) => {
  const defaultData = {
    external_dictionary_check: true,
    entropy_minimum: 50,
  };

  return Object.assign(defaultData, data);
};

/**
 * The default user passprhase policies Entity DTO
 * This DTO has the same structure has the one served by the API/Bext
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultUserPassphrasePoliciesEntityDto = (data = {}) => {
  const defaultData = {
    external_dictionary_check: true,
    entropy_minimum: 112,
  };

  return Object.assign(defaultData, data);
};

/**
 * A user passprhase policies Entity DTO as registered on the API
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const userPassphrasePoliciesEntityDtoFromApi = (data = {}) => {
  const defaultData = defaultUserPassphrasePoliciesEntityDto({
    id: uuid(),
    created: "2023-08-06T10:05:46+00:00",
    created_by: uuid(),
    modified: "2023-08-06T10:05:46+00:00",
    modified_by: uuid(),
  });

  return Object.assign(defaultData, data);
};
