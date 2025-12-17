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
 * @since         4.10.1
 */
import { v4 as uuidv4 } from "uuid";

/**
 * Returns a DTO object suitable for the SessionKeyEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultSessionKeyDto = (data = {}) => {
  const defaultData = {
    foreign_model: "Resource",
    foreign_id: uuidv4(),
    session_key: "9:901D6ED579AFF935F9F157A5198BCE48B50AD87345DEADBA06F42C5D018C78CC",
    modified: new Date().toISOString(),
    ...data,
  };

  return defaultData;
};
