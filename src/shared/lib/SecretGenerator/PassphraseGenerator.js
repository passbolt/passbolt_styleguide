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
 */
import { default as PassphraseGeneratorWords } from "./PassphraseGeneratorWords";

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
 * Returns randomly a word from a given list of word and apply the given word case
 * @param words A list of words
 * @param wordCase A case strategy to apply to the word
 */
function extractWordWithCase(words, wordCase) {
  const extractWord = () => words[randomNumberRange(0, words.length)];
  const toCamelCase = word => word.charAt(0).toUpperCase() + word.slice(1);
  switch (wordCase) {
    case "lowercase": return  extractWord().toLowerCase(); break;
    case "uppercase": return  extractWord().toUpperCase(); break;
    case "camelcase": return  toCamelCase(extractWord()); break;
    default: return extractWord()
  }
}

/**
 * Passphrase generator using diceware method from a file containing words
 */
export const PassphraseGenerator = {
  generate: configuration => {
    const wordCase = configuration.default_options.word_case;
    const words = PassphraseGeneratorWords['en-UK'];
    const extractWordMapper = () => extractWordWithCase(words, wordCase);
    const wordsGenerated = Array.from({length:configuration.default_options.word_count}, extractWordMapper);
    return wordsGenerated.join(configuration.default_options.separator);
  }
};
