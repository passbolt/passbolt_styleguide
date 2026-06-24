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
import { v4 as uuidv4 } from "uuid";

/**
 * Returns a default offline item dto object.
 * @param {object} data
 * @returns {object}
 */
export const defaultOfflineItemDto = (data = {}) => {
  return {
    id: data.id || uuidv4(),
    foreign_model: data.foreign_model || "Resource",
    foreign_key: data.foreign_key || uuidv4(),
    user_id: data.user_id || uuidv4(),
    created: data.created || "2026-05-07T08:16:00+00:00",
    created_by: data.created_by || uuidv4(),
    ...data,
  };
};
