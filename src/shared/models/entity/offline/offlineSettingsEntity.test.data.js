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
 * @since         5.13.0
 */

import { v4 as uuid } from "uuid";

export const defaultOfflineSettingsDto = (data = {}) => {
  const defaultData = {
    max_session_duration: 3600,
    data_retention_period: 1,
    max_items: 1000,
  };
  return Object.assign(defaultData, data);
};

export const defaultOfflineSettingsDtoFromApi = (data = {}) => {
  const id = data.id || uuid();
  const defaultData = defaultOfflineSettingsDto({
    id,
    created: "2025-08-06T10:05:46+00:00",
    created_by: uuid(),
    modified: "2025-08-06T10:05:46+00:00",
    modified_by: uuid(),
  });
  return Object.assign(defaultData, data);
};
