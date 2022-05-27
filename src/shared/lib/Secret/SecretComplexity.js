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
 * @since         2.14.0
 */
import PwnedPasswords from "./PwnedPasswords";

const STRENGTH = [
  {
    id: 'not_available',
    label: 'n/a',
    strength: 0
  },
  {
    id: 'very-weak',
    label: 'very weak',
    strength: 1
  },
  {
    id: 'weak',
    label: 'weak',
    strength: 60
  },
  {
    id: 'fair',
    label: 'fair',
    strength: 80
  },
  {
    id: 'strong',
    label: 'strong',
    strength: 112
  },
  {
    id: 'very-strong',
    label: 'very strong',
    strength: 128
  }
];

const MASKS = {
  'alpha': {
    size: 26,
    data: 'abcdefghijklmnopqrstuvwxyz',
    pattern: /[a-z]/
  },
  'uppercase': {
    size: 26,
    data: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    pattern: /[A-Z]/
  },
  'digit': {
    size: 10,
    data: '0123456789',
    pattern: /[0-9]/
  },
  'special': {
    size: 32,
    // ASCII Code = 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126
    data: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
    pattern: /[!"#$%&\'\(\)*+,\-./:;<=>?@\[\\\]^_`{|}~]/
  }
};

export default class SecretComplexity {
  /**
   * Generate a random number in the given range.
   * @param min {int} The min limit
   * @param max {int} The mas limit
   * @returns {int}
   */
  static randomRange(min, max) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    const random = arr[0] / (0xffffffff + 1);

    return Math.floor(random * (max - min + 1)) + min;
  }

  /**
   * Calculate the entropy regarding the given primitives.
   * @param length {int} The number of characters
   * @param maskSize {int} The number of possibility for each character
   * @return {int}
   */
  static calculEntropy(length, maskSize) {
    return (length && maskSize) ? length * (Math.log(maskSize) / Math.log(2)) : 0;
  }

  /**
   * Mesure the entropy of a password.
   * @param pwd {srtring} The password to test the entropy
   * @return {int}
   */
  static entropy(pwd = '') {
    let maskSize = 0;

    for (const i in MASKS) {
      if (pwd.match(MASKS[i].pattern)) {
        maskSize += MASKS[i].size;
      }
    }

    return this.calculEntropy(pwd.length, maskSize);
  }

  /**
   * Get the entropy level regarding the mesure of the entropy.
   * @param txt {string} The text to work on
   * @return {Object} The text strength, an element of the STRENGTH array.
   */
  static getStrength(txt) {
    txt = txt || "";
    const entropy = this.entropy(txt);

    const strength = STRENGTH.reduce((accumulator, item) => {
      if (!accumulator) { return item; }
      if (item.strength > accumulator.strength && entropy >= item.strength) { return item; }
      return accumulator;
    });

    return strength;
  }

  /**
   * Check if a text matches multiple masks.
   * @param txt {string} The text to
   * @returns {array} The list of masks as following :
   *   {
   *     alpha: true,
   *     uppercase: false,
   *     ...
   *   }
   */
  static matchMasks(txt) {
    const matches = {};
    for (const i in MASKS) {
      matches[i] = false;
      if (txt.match(MASKS[i].pattern)) {
        matches[i] = true;
      }
    }

    return matches;
  }

  /**
   * Generate a password following the system settings.
   * @param {int} [length] (optional) The password length. Default 18.
   * @param {array} [masks] (optional) The list of masks to use. Default all.
   * @return {string}
   */
  static generate(length, masks) {
    let secret = '';
    let mask = [];
    length = length || 18;
    masks = masks || ["alpha", "uppercase", "digit", "special"];

    // Build the mask to use to generate a secret.
    for (const i in masks) {
      mask = [...mask, ...MASKS[masks[i]].data];
    }

    /*
     * Generate a password which should fit the expected entropy.
     * Try maximum 10 times.
     */
    let j = 0;
    const expectedEntropy = this.calculEntropy(length, mask.length);

    do {
      secret = '';
      for (let i = 0; i < length; i++) {
        secret += mask[this.randomRange(0, mask.length - 1)];
      }
    } while (this.entropy(secret) < expectedEntropy && j++ < 10);

    return secret;
  }

  /**
   * Dictionary check
   */
  static async ispwned(password) {
    const count = await PwnedPasswords.pwnedPasswords(password);
    return (count > 0);
  }
}
