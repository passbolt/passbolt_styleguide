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
 * Secret generator complexity
 * Entropy calculate following https://generatepasswords.org/how-to-calculate-entropy/
 */

import PassphraseGeneratorWords from "./PassphraseGeneratorWords";
import GraphemeSplitter from "grapheme-splitter";

export const ENTROPY_THRESHOLDS = {
  NOT_AVAILABLE: 0,
  VERY_WEAK: 1,
  WEAK: 60,
  FAIR: 80,
  STRONG: 112,
  VERY_STRONG: 128,
};

const STRENGTH = [
  {
    id: "not_available",
    label: "n/a",
    strength: ENTROPY_THRESHOLDS.NOT_AVAILABLE,
  },
  {
    id: "very-weak",
    label: "Very weak",
    strength: ENTROPY_THRESHOLDS.VERY_WEAK,
  },
  {
    id: "weak",
    label: "Weak",
    strength: ENTROPY_THRESHOLDS.WEAK,
  },
  {
    id: "fair",
    label: "Fair",
    strength: ENTROPY_THRESHOLDS.FAIR,
  },
  {
    id: "strong",
    label: "Strong",
    strength: ENTROPY_THRESHOLDS.STRONG,
  },
  {
    id: "very-strong",
    label: "Very strong",
    strength: ENTROPY_THRESHOLDS.VERY_STRONG,
  },
];

export const MASKS = {
  mask_upper: {
    label: "A-Z",
    characters: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
  },
  mask_lower: {
    label: "a-z",
    characters: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
  },
  mask_digit: {
    label: "0-9",
    characters: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  mask_char1: {
    label: "# $ % & @ ^ ~",
    characters: ["#", "$", "%", "&", "@", "^", "~"],
  },
  mask_parenthesis: {
    label: "{ [ ( | ) ] }",
    characters: ["{", "(", "[", "|", "]", ")", "}"],
  },
  mask_char2: {
    label: ". , : ;",
    characters: [".", ",", ":", ";"],
  },
  mask_char3: {
    label: "' \" `",
    characters: ["'", '"', "`"],
  },
  mask_char4: {
    label: "/ \\ _ -",
    characters: ["/", "\\", "_", "-"],
  },
  mask_char5: {
    label: "< * + ! ? =",
    characters: ["<", "*", "+", "!", "?", "="],
  },
  mask_emoji: {
    label: "😘",
    // Based on the initial emoticons block (introduce in unicode v6), not updated since 2015 (unicode v8), see https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)
    characters: [
      "😀",
      "😁",
      "😂",
      "😃",
      "😄",
      "😅",
      "😆",
      "😇",
      "😈",
      "😉",
      "😊",
      "😋",
      "😌",
      "😍",
      "😎",
      "😏",
      "😐",
      "😑",
      "😒",
      "😓",
      "😔",
      "😕",
      "😖",
      "😗",
      "😘",
      "😙",
      "😚",
      "😛",
      "😜",
      "😝",
      "😞",
      "😟",
      "😠",
      "😡",
      "😢",
      "😣",
      "😤",
      "😥",
      "😦",
      "😧",
      "😨",
      "😩",
      "😪",
      "😫",
      "😬",
      "😭",
      "😮",
      "😯",
      "😰",
      "😱",
      "😲",
      "😳",
      "😴",
      "😵",
      "😶",
      "😷",
      "😸",
      "😹",
      "😺",
      "😻",
      "😼",
      "😽",
      "😾",
      "😿",
      "🙀",
      "🙁",
      "🙂",
      "🙃",
      "🙄",
      "🙅",
      "🙆",
      "🙇",
      "🙈",
      "🙉",
      "🙊",
      "🙋",
      "🙌",
      "🙍",
      "🙎",
      "🙏",
    ],
  },
};

const NUMBER_OF_WORD_CASE = 3;
const LOOK_ALIKE_CHARS = ["O", "l", "|", "I", "0", "1"];

const ALL_CHARS = Object.values(MASKS).flatMap((mask) => mask.characters);

export const SecretGeneratorComplexity = {
  /**
   * Evaluate the maximum entropy a password can be with the given generator configuration.
   * @param {PasswordGeneratorSettingsDto} passwordGeneratorSettings the password generator settings
   * @returns {number}
   */
  evaluateMaxPasswordEntropy: (passwordGeneratorSettings) => {
    const allCharactersUsed = Object.entries(MASKS)
      // Filter out not selected masks.
      .filter(([maskName]) => passwordGeneratorSettings[maskName])
      // Aggregate characters of all selected masks.
      .reduce((accuumulator, [maskName]) => [...accuumulator, ...MASKS[maskName].characters], [])
      // Filter out look alike characters if requested by the configuration.
      .filter((char) => !passwordGeneratorSettings.exclude_look_alike_chars || !LOOK_ALIKE_CHARS.includes(char));

    return calculEntropy(passwordGeneratorSettings.length, allCharactersUsed.length);
  },

  /**
   * Calculate a password entropy.
   * @param {string} password The password
   * @returns {Number}
   */
  entropyPassword: (password = "") => {
    const splitter = new GraphemeSplitter();
    const passwordCharacters = splitter.splitGraphemes(password);
    let maskSize = 0;

    for (const [maskName] of Object.entries(MASKS)) {
      const mask = MASKS[maskName];
      const useMask = passwordCharacters.some((character) => mask.characters.includes(character));
      if (useMask) {
        maskSize += mask.characters.length;
      }
    }

    const unknownMaskSet = new Set(passwordCharacters.filter((character) => !ALL_CHARS.includes(character)));

    return calculEntropy(passwordCharacters.length, maskSize + unknownMaskSet.size);
  },

  /**
   * Calculate a passphrase entropy.
   * @param {integer} numberOfWords The number of words
   * @param {string} separator The passphrase separator
   * @returns {number}
   */
  entropyPassphrase: (numberOfWords = 0, separator = "") => {
    const words = PassphraseGeneratorWords["en-UK"];
    // determine a constant for separator
    const wordMaskSize = words.length * NUMBER_OF_WORD_CASE;
    return calculEntropy(numberOfWords, wordMaskSize) + SecretGeneratorComplexity.entropyPassword(separator);
  },

  /**
   * Get the strength relative to an entropy
   * @param {number} entropy The entropy
   * @returns {{strength: number, id: string, label: string}|{strength: number, id: string, label: string}|{strength: number, id: string, label: string}|{strength: number, id: string, label: string}|{strength: number, id: string, label: string}}
   */
  strength: (entropy = 0) =>
    STRENGTH.reduce((accumulator, item) => {
      if (!accumulator) {
        return item;
      }
      if (item.strength > accumulator.strength && entropy >= item.strength) {
        return item;
      }
      return accumulator;
    }),
  calculEntropy,
};

/**
 * Calculate the entropy regarding the given primitives.
 * @param {number} length The number of characters
 * @param {number} maskSize The number of possibility for each character
 * @return {number}
 */
function calculEntropy(length, maskSize) {
  return length && maskSize ? length * (Math.log(maskSize) / Math.log(2)) : 0;
}
