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
 * Build default metadata types settings for v4 instance.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultMetadataTypesSettingsV4Dto = (data = {}) => {
  const defaultData = {
    default_resource_types: "v4",
    default_folder_type: "v4",
    default_tag_type: "v4",
    default_comment_type: "v4",
    allow_creation_of_v5_resources: false,
    allow_creation_of_v5_folders: false,
    allow_creation_of_v5_tags: false,
    allow_creation_of_v5_comments: false,
    allow_creation_of_v4_resources: true,
    allow_creation_of_v4_folders: true,
    allow_creation_of_v4_tags: true,
    allow_creation_of_v4_comments: true,
    allow_v4_v5_upgrade: false,
    allow_v5_v4_downgrade: false,
  };
  return Object.assign(defaultData, data);
};

/**
 * Build default metadata types settings for v6 instance.
 * All content types are migrated to v5, and no content type can be created in v4.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultMetadataTypesSettingsV6Dto = (data = {}) => {
  const defaultData = {
    default_resource_types: "v5",
    default_folder_type: "v5",
    default_tag_type: "v5",
    default_comment_type: "v5",
    allow_creation_of_v5_resources: true,
    allow_creation_of_v5_folders: true,
    allow_creation_of_v5_tags: true,
    allow_creation_of_v5_comments: true,
    allow_creation_of_v4_resources: false,
    allow_creation_of_v4_folders: false,
    allow_creation_of_v4_tags: false,
    allow_creation_of_v4_comments: false,
    allow_v4_v5_upgrade: false,
    allow_v5_v4_downgrade: false,
  };
  return Object.assign(defaultData, data);
};

/**
 * Build default metadata types settings for v5.0 fresh instance.
 * Resources should be created by default in v5, and v4 resources are not accepted.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultMetadataTypesSettingsV50FreshDto = (data = {}) => {
  const defaultData = {
    default_resource_types: "v5",
    default_folder_type: "v4",
    default_tag_type: "v4",
    default_comment_type: "v4",
    allow_creation_of_v5_resources: true,
    allow_creation_of_v5_folders: false,
    allow_creation_of_v5_tags: false,
    allow_creation_of_v5_comments: false,
    allow_creation_of_v4_resources: false,
    allow_creation_of_v4_folders: true,
    allow_creation_of_v4_tags: true,
    allow_creation_of_v4_comments: true,
    allow_v4_v5_upgrade: false,
    allow_v5_v4_downgrade: false,
  };
  return Object.assign(defaultData, data);
};

/**
 * Build default metadata types settings for v5.0 instance currently migrating from v4.
 * Resources should be created by default in v4, and v5 resources are accepted.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto = (data = {}) => {
  const defaultData = {
    default_resource_types: "v4",
    default_folder_type: "v4",
    default_tag_type: "v4",
    default_comment_type: "v4",
    allow_creation_of_v5_resources: true,
    allow_creation_of_v5_folders: false,
    allow_creation_of_v5_tags: false,
    allow_creation_of_v5_comments: false,
    allow_creation_of_v4_resources: true,
    allow_creation_of_v4_folders: true,
    allow_creation_of_v4_tags: true,
    allow_creation_of_v4_comments: true,
    allow_v4_v5_upgrade: true,
    allow_v5_v4_downgrade: true,
  };
  return Object.assign(defaultData, data);
};

/**
 * Build default metadata types settings for v5.0 migrated from v4 with support of v4.
 * Resources should be created by default in v5, and v4 resources are accepted.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultMetadataTypesSettingsV50OMigratedFromV4WithSupportV4Dto = (data = {}) => {
  const defaultData = {
    default_resource_types: "v5",
    default_folder_type: "v4",
    default_tag_type: "v4",
    default_comment_type: "v4",
    allow_creation_of_v5_resources: true,
    allow_creation_of_v5_folders: false,
    allow_creation_of_v5_tags: false,
    allow_creation_of_v5_comments: false,
    allow_creation_of_v4_resources: true,
    allow_creation_of_v4_folders: true,
    allow_creation_of_v4_tags: true,
    allow_creation_of_v4_comments: true,
    allow_v4_v5_upgrade: true,
    allow_v5_v4_downgrade: false,
  };
  return Object.assign(defaultData, data);
};
