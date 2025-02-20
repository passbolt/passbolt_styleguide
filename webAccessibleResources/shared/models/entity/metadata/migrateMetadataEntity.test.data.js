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
 * @since         4.12.0
 */

/**
 * Build default metadata types settings for v4 instance.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultMigrateMetadataDto = (data = {}) => {
  const defaultData = {
    migrate_resources_to_v5: false,
    migrate_folders_to_v5: true,
    migrate_tags_to_v5: true,
    migrate_comments_to_v5: true,
    migrate_personal_content: true,
  };
  return Object.assign(defaultData, data);
};
