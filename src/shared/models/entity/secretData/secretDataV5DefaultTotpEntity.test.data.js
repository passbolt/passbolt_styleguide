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
 * @since         5.0.0
 */

import {defaultTotpDto} from "../totp/totpDto.test.data";
import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";

/**
 * The minimal default secret v5 default totp entity
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const minimalSecretDataV5DefaultTotpEntityDto = (data = {}) => ({
  object_type: SECRET_DATA_OBJECT_TYPE,
  password: null,
  totp: defaultTotpDto(),
  ...data,
});

/**
 * The default secret v5 default totp entity
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultSecretDataV5DefaultTotpEntityDto = (data = {}) => minimalSecretDataV5DefaultTotpEntityDto({
  password: "this-is-a-secret-password",
  description: "this-is-a-default-description",
  ...data,
});
