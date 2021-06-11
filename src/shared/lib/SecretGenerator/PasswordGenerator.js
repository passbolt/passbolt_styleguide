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

import {SecretGeneratorComplexity} from "./SecretGeneratorComplexity";

/**
 * The list of look-alike substitution
 */
const charactersToExclude = ["O", "l", "|", "I", "0", "1"];

/**
 * Returns a number between the given min and max
 * @param min The minimum number
 * @param max The maximum number
 */
function randomNumberRange(min, max) {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  const random = arr[0] / (0xffffffff + 1);
  return Math.floor(random * (max - min + 1)) + min;
}

/**
 * Exclude look-alike characters
 * @param characterArray A given character array
 */
function excludeLookAlikeCharacters(characterArray) {
  if (!characterArray) {
    return characterArray;
  }
  let newCharacterArray = [];
  const isNotLookAlikeCharacter = character => charactersToExclude.includes(character);
  const isEmoji = character => character.length > 1;
  const isCharacterToKeep = character => isEmoji(character) || isNotLookAlikeCharacter(character);
  for (let character of characterArray) {
    if(isCharacterToKeep(character)) {
      newCharacterArray.push(character);
    }
  }
  return newCharacterArray;
}

/**
 * Returns a generated password given a generator configuration
 * @param configuration The generator configuration
 */
function generate(configuration) {
  const mustExcludeLookAlikeCharacters = configuration.default_options.look_alike;
  let secret = '';
  let mask = [];

  const availableMasks = configuration.masks.filter(mask => mask.active);
  const secretLength = configuration.default_options.length;

  const canGenerate = availableMasks.length > 0 &&
    (secretLength >= configuration.default_options.min_length &&
      secretLength <=  configuration.default_options.max_length);

  if (canGenerate) {
    // Build the mask to use to generate a secret.
    mask = availableMasks.reduce((mask, currentMask) => [...mask, ...currentMask.characters], []);
    if (mustExcludeLookAlikeCharacters) {
      mask = excludeLookAlikeCharacters(mask);
    }

    /*
     * Generate a password which should fit the expected entropy.
     * Try maximum 10 times.
     */
    let attempt = 0;
    const expectedEntropy = SecretGeneratorComplexity.calculEntropy(secretLength, mask.length);

    do {
      secret = '';
      for (let i = 0; i < secretLength; i++) {
        secret += mask[randomNumberRange(0, mask.length - 1)];
      }
    } while (SecretGeneratorComplexity.entropyPassword(secret) < expectedEntropy && attempt++ < 10);
  }
  return secret;
}

export const PasswordGenerator = {generate};
