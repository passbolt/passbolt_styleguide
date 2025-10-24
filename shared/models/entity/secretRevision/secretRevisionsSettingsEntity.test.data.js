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
 * @since         5.7.0
 */

import {v4 as uuidv4} from "uuid";

/**
 * Build default secret revisions settings.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultSecretRevisionsSettingsDto = (data = {}) => {
  const defaultData = {
    id: uuidv4(),
    max_revisions: 2,
    allow_sharing_revisions: false,
  };

  return Object.assign(defaultData, data);
};
