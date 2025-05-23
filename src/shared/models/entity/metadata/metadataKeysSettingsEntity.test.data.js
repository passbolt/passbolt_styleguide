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
 * @since         4.10.0
 */

/**
 * Build default metadata types settings.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultMetadataKeysSettingsDto = (data = {}) => {
  const defaultData = {
    allow_usage_of_personal_keys: true,
    zero_knowledge_key_share: false,
  };
  return Object.assign(defaultData, data);
};
