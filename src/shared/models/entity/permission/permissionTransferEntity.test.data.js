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
 * @since         4.9.3
 */

import { v4 as uuidv4 } from "uuid";

/**
 * Build the default permission transfer Dto needed
 * @param {Object} [data]
 * @returns {Object}
 */
export const defaultPermissionTransferDto = (data = {}) => ({
  id: uuidv4(),
  aco_foreign_key: uuidv4(),
  ...data,
});
