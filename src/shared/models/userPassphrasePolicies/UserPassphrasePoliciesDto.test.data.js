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
 * The default user passprhase policies DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultUserPassphrasePoliciesDto = (data = {}) => {
  const defaultData = {
    external_dictionary_check: true,
    entropy_minimum: 50,
  };

  return Object.assign(defaultData, data);
};
