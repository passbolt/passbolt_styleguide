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

export const defaultPassphraseConfiguration = data => {
  const defaultData = {
    default_options: {
      word_count: 7,
      max_word: 15,
      min_word: 5,
      separator: " ",
      word_case: "lowercase"
    },
    name: "default passphrase configuration",
    type: "passphrase",
  };
  return Object.assign(defaultData, data);
};

export const defaultPasswordConfiguration = data => {
  const defaultData = {
    default_options: {
      length: 12,
      min_length: 10,
      max_length: 20,
      look_alike: false
    },
    masks: [
      {
        name: "digits",
        label: "digits characters",
        characters: "0123456789",
        active: true,
      },
      {
        name: "lower",
        label: "lowercase characters",
        characters: "abcdefghijklmnopqrstuvwxyz",
        active: true,
      },
      {
        name: "upper",
        label: "upercase characters",
        characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        active: true,
      },
      {
        name: "emojis",
        label: "emojis",
        characters: "😁😍😘",
        active: false,
      }
    ],
    name: "default password configuration",
    type: "password",
  };
  return Object.assign(defaultData, data);
};

export const defaultSecretConfigurationSettings = data => {
  const defaultData = {
    default_generator: "password",
    generators: [
      defaultPassphraseConfiguration(),
      defaultPasswordConfiguration(),
    ]
  };
  return Object.assign(defaultData, data);
};

export const defaultOrganisationPasswordPoliciesSettings = data => {
  const defaultData = {
    passwordLength: 18,
    lookAlikeCharacters: false,
    passphraseWordsLength: 10,
    wordsSeparator: " custom separator ",
    wordCase: "camelcase",
    digits: false,
    lower: false,
    upper: false,
    emojis: true,
  };
  return Object.assign(defaultData, data);
};
