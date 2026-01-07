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
 * @since         3.3.0
 *
 * Generate a password following a configuration.
 * @param configuration The generator configuration
 */

import { MASKS, SecretGeneratorComplexity } from "./SecretGeneratorComplexity";

/**
 * The list of look-alike substitution
 */
const charactersToExclude = ["O", "l", "|", "I", "0", "1"];

/**
 * Returns a number between the given min and max
 * @param {integer} min The minimum number
 * @param {integer} max The maximum number
 */
function randomNumberRange(min, max) {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  const random = arr[0] / (0xffffffff + 1);
  return Math.floor(random * (max - min + 1)) + min;
}

/**
 * Exclude look-alike characters
 * @param {Array<String>|null} characterArray A given character array
 * @return {array}
 */
function excludeLookAlikeCharacters(characterArray) {
  if (!characterArray) {
    return characterArray;
  }

  const filterExcludedCharacters = (newCharacterArray, character) => {
    if (!charactersToExclude.includes(character)) {
      newCharacterArray.push(character);
    }
    return newCharacterArray;
  };
  return characterArray.reduce(filterExcludedCharacters, []);
}

/**
 * Returns a generated password given a generator configuration
 * @param {PasswordGeneratorSettingsDto} configuration The generator configuration
 */
function generate(configuration) {
  const maskNameList = Object.entries(MASKS);
  const availableMasks = [];
  maskNameList.forEach(([maskName]) => {
    if (configuration[maskName]) {
      availableMasks.push(MASKS[maskName]);
    }
  });

  const secretLength = configuration.length;
  const canGenerate =
    availableMasks.length > 0 && secretLength >= configuration.min_length && secretLength <= configuration.max_length;

  if (!canGenerate) {
    return "";
  }

  // Build the mask to use to generate a secret.
  let mask = [];
  mask = availableMasks.reduce((mask, currentMask) => [...mask, ...currentMask.characters], []);
  if (configuration.exclude_look_alike_chars) {
    mask = excludeLookAlikeCharacters(mask);
  }

  /*
   * Generate a password. Try to maximize the entropy of this one by fixing a goal entropy, if not reached keep
   * the password with the highest entropy. Try maximum 10 times.
   */
  let secret = "";
  let attempt = 0;
  let secretEntropy = 0;
  const goalEntropy = Math.floor(SecretGeneratorComplexity.calculEntropy(secretLength, mask.length));

  do {
    let newSecret = "";
    for (let i = 0; i < secretLength; i++) {
      newSecret += mask[randomNumberRange(0, mask.length - 1)];
    }
    const newSecretEntropy = SecretGeneratorComplexity.entropyPassword(newSecret);
    if (newSecretEntropy > secretEntropy) {
      secret = newSecret;
      secretEntropy = newSecretEntropy;
    }
  } while (secretEntropy < goalEntropy && attempt++ < 10);

  return secret;
}

export const PasswordGenerator = { generate };
