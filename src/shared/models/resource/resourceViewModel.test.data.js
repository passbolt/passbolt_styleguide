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
 * @since         4.9.4
 */

import {v4 as uuid} from "uuid";
import {defaultTotpViewModelDto} from "../entity/totp/totpDto.test.data";

export const minimalResourceViewModelDto = (data = {}) => ({
  name: "Resource view model name",
  password: "Here a password",
  resource_type_id: uuid(),
  ...data
});

export const defaultResourceViewModelDto = (data = {}) => minimalResourceViewModelDto({
  uri: "https://www.passbolt.com",
  username: "ada@passbolt.com",
  description: "This is a description",
  ...data,
});

export const defaultResourcePasswordDescriptionTotpViewModelDto = (data = {}) => defaultResourceViewModelDto({
  totp: defaultTotpViewModelDto(),
  ...data
});
