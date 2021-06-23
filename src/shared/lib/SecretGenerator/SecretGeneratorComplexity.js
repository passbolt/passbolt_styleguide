import {default as PassphraseGeneratorWords} from "./PassphraseGeneratorWords";

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

const MASKS = [
  {
    "name": "upper",
    "label": "A-Z",
    "characters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    "name": "lower",
    "label": "a-z",
    "characters": "abcdefghijklmnopqrstuvwxyz"
  },
  {
    "name": "digit",
    "label": "0-9",
    "characters": "0123456789",
  },
  {
    "name": "parenthesis",
    "label": "{ [ ( | ) ] ] }",
    "characters": "([|])",
    "active": true
  },
  {
    "name": "special_char1",
    "label": "# $ % & @ ^ ~",
    "characters": "#$%&@^~",
    "active": true
  },
  {
    "name": "special_char2",
    "label": ". , : ;",
    "characters": ".,:;",
    "active": true
  },
  {
    "name": "special_char5",
    "label": "< * + ! ? =",
    "characters": "<*+!?=",
    "active": true
  },
  {
    "name": "emoji",
    "label": "😘",
    "characters": "😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
  }
];

const NUMBER_OF_ASCII_CHARACTER = 128;
const NUMBER_OF_WORD_CASE = 3;

export const SecretGeneratorComplexity = {
  entropyPassword : (password = '') => {
    let maskSize = 0;
    let useMask = false;
    const passwordCharacters = password.split('');
    for (const mask of MASKS) {
      useMask = passwordCharacters.some(character => mask.characters.includes(''+character));
      if (useMask) {
        maskSize += mask.characters.length;
      }
    }
    return calculEntropy(password.length, maskSize);
  },
  entropyPassphrase : (numberOfWords = 0, separator = '') => {
    const words = PassphraseGeneratorWords['en-UK'];
    // determine a constant for separator
    const maskSize = (separator.length * NUMBER_OF_ASCII_CHARACTER) + words.length + NUMBER_OF_WORD_CASE;
    return calculEntropy(numberOfWords, maskSize);
  },
  strength : (entropy = 0) => {
    const strength = STRENGTH.reduce((accumulator, item) => {
      if (!accumulator) { return item; }
      if (item.strength > accumulator.strength && entropy >= item.strength) { return item; }
      return accumulator;
    });

    return strength;
  },
  calculEntropy
};

/**
 * Calculate the entropy regarding the given primitives.
 * @param length {int} The number of characters
 * @param maskSize {int} The number of possibility for each character
 * @return {int}
 */
function calculEntropy(length, maskSize) {
  return (length && maskSize) ? length * (Math.log(maskSize) / Math.log(2)) : 0;
}