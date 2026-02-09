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
 * @since         5.10.0
 */
import { v4 as uuidv4 } from "uuid";

export const SETTINGS_SOURCE_DEFAULT = "default";
export const SETTINGS_SOURCE_ENV = "env";
export const SETTINGS_SOURCE_DB = "db";
export const SETTINGS_SOURCE_FILE = "file";

/**
 * Build default export policies settings DTO.
 * @param {object} data The data to override the default DTO.
 * @returns {object}
 */
export const defaultExportPoliciesSettingsDto = (data = {}) => ({
  allow_csv_format: true,
  source: SETTINGS_SOURCE_DEFAULT,
  ...data,
});

/**
 * Build export policies settings DTO with env source.
 * @param {object} data The data to override the default DTO.
 * @returns {object}
 */
export const envExportPoliciesSettingsDto = (data = {}) => ({
  allow_csv_format: false,
  source: SETTINGS_SOURCE_ENV,
  ...data,
});

/**
 * Build export policies settings DTO with db source.
 * @param {object} data The data to override the default DTO.
 * @returns {object}
 */
export const dbExportPoliciesSettingsDto = (data = {}) => ({
  allow_csv_format: true,
  source: SETTINGS_SOURCE_DB,
  ...data,
});

/**
 * Build export policies settings DTO with file source.
 * @param {object} data The data to override the default DTO.
 * @returns {object}
 */
export const fileExportPoliciesSettingsDto = (data = {}) => ({
  allow_csv_format: false,
  source: SETTINGS_SOURCE_FILE,
  ...data,
});

/**
 * Build export policies settings DTO with all metadata fields.
 * @param {object} data The data to override the default DTO.
 * @returns {object}
 */
export const exportPoliciesSettingsWithMetadataDto = (data = {}) => {
  const defaultData = {
    id: uuidv4(),
    allow_csv_format: true,
    source: SETTINGS_SOURCE_DB,
    created: "2024-01-01T00:00:00.000Z",
    created_by: uuidv4(),
    modified: "2024-01-02T00:00:00.000Z",
    modified_by: uuidv4(),
  };
  return Object.assign(defaultData, data);
};
