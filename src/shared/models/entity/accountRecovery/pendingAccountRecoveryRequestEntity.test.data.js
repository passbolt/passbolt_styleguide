/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.7.0
 */

import {v4 as uuidv4} from "uuid";

export const pendingAccountRecoveryRequestDto = (data = {}) => ({
  id: uuidv4(),
  status: "pending",
  created: "2020-05-04T20:31:45+00:00",
  modified: "2020-05-04T20:31:45+00:00",
  created_by: uuidv4(),
  modified_by: uuidv4(),
  ...data
});
