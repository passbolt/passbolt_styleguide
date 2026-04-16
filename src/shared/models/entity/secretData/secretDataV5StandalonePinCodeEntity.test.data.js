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
 * @since         5.12.0
 */

import { SECRET_DATA_OBJECT_TYPE } from "./secretDataEntity";

/**
 * Returns a default DTO object suitable for the SecretDataV5StandalonePinCodeEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultSecretDataV5StandalonePinCodeDto = (data = {}) => ({
  object_type: SECRET_DATA_OBJECT_TYPE,
  pin_code: "123456",
  description: "this is a secret description",
  ...data,
});
