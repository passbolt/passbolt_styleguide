/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import PasswordConfiguration from './PasswordConfiguration';
import {
  defaultPassphraseConfiguration,
  defaultPasswordConfiguration,
  defaultOrganisationPasswordPoliciesSettings
} from './PasswordConfiguration.test.data';

const asJSON = data => JSON.parse(JSON.stringify(data));

describe("PasswordConfiguration", () => {
  it("should init with the given passphrase configuration", () => {
    const configuration = defaultPassphraseConfiguration();
    const config = new PasswordConfiguration(configuration);
    expect(asJSON(config)).toStrictEqual(configuration);
  });

  it("should init with the given password configuration", () => {
    const configuration = defaultPasswordConfiguration();
    const config = new PasswordConfiguration(configuration);
    expect(asJSON(config)).toStrictEqual(configuration);
  });

  it("should init with the given passphrase configuration and organisation settings", () => {
    const configuration = defaultPassphraseConfiguration();
    const settings = defaultOrganisationPasswordPoliciesSettings();
    const config = new PasswordConfiguration(configuration, settings);
    const expectedResult = {
      default_options: {
        max_word: config.default_options.max_word,
        min_word: config.default_options.min_word,
        separator: settings.wordsSeparator,
        word_case: settings.wordCase,
        word_count: settings.passphraseWordsLength,
      },
      name: config.name,
      type: "passphrase",
    };
    expect(asJSON(config)).toStrictEqual(expectedResult);
  });

  it("should init with the given password configuration and organisation settings", () => {
    const configuration = defaultPasswordConfiguration();
    const settings = defaultOrganisationPasswordPoliciesSettings();
    const config = new PasswordConfiguration(configuration, settings);
    const masks = [...configuration.masks];
    masks.forEach(mask => { mask.active = mask.name === "emojis"; });

    const expectedResult = {
      default_options: {
        length: settings.passwordLength,
        look_alike: settings.lookAlikeCharacters,
        max_length: configuration.default_options.max_length,
        min_length: configuration.default_options.min_length,
      },
      name: config.name,
      type: "password",
      masks: masks
    };
    expect(asJSON(config)).toStrictEqual(expectedResult);
  });
});
