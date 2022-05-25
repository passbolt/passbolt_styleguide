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
import {default as PassphraseGeneratorWords} from "./PassphraseGeneratorWords";

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
  const extractWord = () => words[randomNumberRange(0, words.length - 1)];
  const toCamelCase = word => word.charAt(0).toUpperCase() + word.slice(1);
  switch (wordCase) {
    case "lowercase":
      return extractWord().toLowerCase();
    case "uppercase":
      return extractWord().toUpperCase();
    case "camelcase":
      return toCamelCase(extractWord());
    default:
      return extractWord();
  }
}

/**
 * Detects if the given secret is a Passbolt passphrase.
 * If yes, it returns the number of words, the separator and the flag to tell it's a passphrase
 * @param secret
 */
function detectPassphrase(secret) {
  if (!secret) {
    return {
      isPassphrase: false
    };
  }

  // Remove all the words from the dictionary present in the secret and keep the count.
  const separatorsSecret = PassphraseGeneratorWords['en-UK'].reduce((result, word) => {
    const remainingSecret = result.remainingSecret.replace(new RegExp(word, 'g'), '');
    const newNumberReplacement = (result.remainingSecret.length - remainingSecret.length) / word.length;
    return {
      numberReplacement: result.numberReplacement + newNumberReplacement,
      remainingSecret: remainingSecret
    };
  }, {numberReplacement: 0, remainingSecret: secret.toLowerCase()});

  // From the remaining, check if a separator can be identified.
  const numberSeparators = separatorsSecret.numberReplacement - 1;
  const lengthSeparators = separatorsSecret.remainingSecret.length / numberSeparators;
  const cannotBeSplitSeparatorsWithSameLength = separatorsSecret.remainingSecret.length % numberSeparators !== 0;
  const hasEmptySeparator = separatorsSecret.remainingSecret.length == 0;
  if (cannotBeSplitSeparatorsWithSameLength) {
    return {
      isPassphrase: false
    };
  }
  if (hasEmptySeparator) {
    return {
      numberWords: separatorsSecret.numberReplacement,
      separator: '',
      isPassphrase: true
    };
  }

  const firstSeparator = separatorsSecret.remainingSecret.substring(0, lengthSeparators);
  const firstSeparatorRegexEscaped = String(firstSeparator).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1');
  const isPassphrase = separatorsSecret.remainingSecret.replace(new RegExp(firstSeparatorRegexEscaped, 'g'), '').length === 0;
  return {
    numberWords: separatorsSecret.numberReplacement,
    separator: firstSeparator,
    isPassphrase: isPassphrase && !secret.startsWith(firstSeparator) && !secret.endsWith(firstSeparator)
  };
}

/**
 * Passphrase generator using diceware method from a file containing words
 */
export const PassphraseGenerator = {
  generate: configuration => {
    const wordCount = configuration.default_options.word_count;
    const canGenerate = wordCount >=  configuration.default_options.min_word && wordCount <=  configuration.default_options.max_word;
    if (canGenerate) {
      const wordCase = configuration.default_options.word_case;
      const words = PassphraseGeneratorWords['en-UK'];
      const extractWordMapper = () => extractWordWithCase(words, wordCase);
      const wordsGenerated = Array.from({length: wordCount}, extractWordMapper);
      const secret = wordsGenerated.join(configuration.default_options.separator);
      return secret;
    }
    return '';
  },
  detectPassphrase
};
