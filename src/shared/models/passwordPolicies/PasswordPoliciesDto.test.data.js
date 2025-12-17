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
 * @since         4.2.0
 */

import { v4 as uuid } from "uuid";
import { defaultPasswordGeneratorSettingsDto } from "./PasswordGeneratorSettingsDto.test.data";
import { defaultPassphraseGeneratorSettingsDto } from "./PassphraseGeneratorSettingsDto.test.data";

/**
 * The default password policies DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultPasswordPoliciesDto = (data = {}) => ({
  default_generator: "password",
  external_dictionary_check: true,
  password_generator_settings: defaultPasswordGeneratorSettingsDto(),
  passphrase_generator_settings: defaultPassphraseGeneratorSettingsDto(),
  source: "default",
  ...data,
});

/**
 * The configured password policies DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const configuredPasswordPoliciesDto = (data = {}) =>
  defaultPasswordPoliciesDto({
    id: uuid(),
    created: "2023-07-01T13:59:11+00:00",
    created_by: uuid(),
    modified: "2023-08-01T13:59:11+00:00",
    modified_by: uuid(),
    ...data,
  });
