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

import { defaultPassphraseGeneratorSettingsDto } from "../../shared/models/passwordPolicies/PassphraseGeneratorSettingsDto.test.data";
import { defaultPasswordGeneratorSettingsDto } from "../../shared/models/passwordPolicies/PasswordGeneratorSettingsDto.test.data";
import { configuredPasswordPoliciesDto } from "../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";

export const defaultPrepareResourceContext = (data = {}) => {
  const defaultData = {
    getSettings: () =>
      configuredPasswordPoliciesDto({
        password_generator_settings: defaultPasswordGeneratorSettingsDto({
          min_length: 8,
          max_length: 128,
        }),
        passphrase_generator_settings: defaultPassphraseGeneratorSettingsDto({
          min_words: 4,
          max_words: 40,
        }),
      }),
    onPrepareResource: jest.fn(),
    onPasswordGenerated: jest.fn(),
    consumeLastGeneratedPassword: jest.fn(() => "aBcD10-é??????????"),
    consumePreparedResource: jest.fn(),
    resetSecretGeneratorSettings: jest.fn(),
  };
  return Object.assign(defaultData, data);
};
