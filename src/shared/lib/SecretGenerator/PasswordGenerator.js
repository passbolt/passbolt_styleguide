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
import SecretComplexity from "../Secret/SecretComplexity";


/**
 * The list of look-alike substitution
 */
const lookAlikeSubstitutions = {
  "O": "o",
  "l": "I",
}

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
 * @param password A given password
 */
function excludeLookAlikeCharacters(password) {
  if (!password) {
    return password;
  }
  let newPassword = '';
  const replaceLookAlikeCharacter = character => lookAlikeSubstitutions[character] || character;
  for (let character of password) {
    newPassword += replaceLookAlikeCharacter(character);
  }
  return newPassword;
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

  if (availableMasks.length > 0 && (secretLength >= configuration.default_options.min_length && secretLength <=  configuration.default_options.max_length)) {
    // Build the mask to use to generate a secret.
    availableMasks.forEach(currentMask => mask = [...mask, ...currentMask.characters]);


    /*
     * Generate a password which should fit the expected entropy.
     * Try maximum 10 times.
     */
    let j = 0;
    const expectedEntropy = SecretComplexity.calculEntropy(secretLength, mask.length);


    do {
      secret = '';
      for (let i = 0; i < secretLength; i++) {
        secret += mask[randomNumberRange(0, mask.length - 1)];
      }
      if (mustExcludeLookAlikeCharacters) {
        secret = excludeLookAlikeCharacters(secret);
      }
    } while (SecretComplexity.entropy(secret) < expectedEntropy && j++ < 10);
  }
  return secret;
}


export const PasswordGenerator = {generate};
