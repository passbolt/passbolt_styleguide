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
 * @since         5.15.0
 */

import { SHORT_AMBIGUOUS, AUTOCOMPLETE_ROLE } from "./KeywordsDictionary";

/**
 * Tests a normalized text against a keyword set.
 */
class KeywordMatchingService {
  /**
   * Returns true when a keyword of the set is found in the text.
   * Short tokens must match a whole segment, the others match as substring.
   * @param {string} normalizedText The normalized text.
   * @param {string[]} set The keyword set.
   * @returns {boolean} Whether any keyword matches.
   */
  static matchesAny(normalizedText, set) {
    if (!normalizedText) {
      return false;
    }
    const concatenated = normalizedText.replace(/\s/g, "");
    const segments = new Set(normalizedText.split(" "));
    return set.some((keyword) => {
      // The text has its accented letters split into base letter + accent mark, so split the keyword the same way before comparing.
      const needle = keyword.normalize("NFD");
      // Short ambiguous tokens must match a whole segment
      return SHORT_AMBIGUOUS.has(keyword) ? segments.has(needle) : concatenated.includes(needle);
    });
  }

  /**
   * Returns the role of the last autocomplete token which maps to one.
   * @param {string} autoComplete The raw autocomplete attribute.
   * @returns {string|null} A FieldRole, or null.
   */
  static roleFromAutocomplete(autoComplete) {
    const tokens = (autoComplete || "").toLowerCase().split(/\s+/).filter(Boolean);
    for (let i = tokens.length - 1; i >= 0; i--) {
      // hasOwnProperty guard so "constructor" or "toString", for example, are ignored
      if (Object.prototype.hasOwnProperty.call(AUTOCOMPLETE_ROLE, tokens[i])) {
        return AUTOCOMPLETE_ROLE[tokens[i]];
      }
    }
    return null;
  }
}

export default KeywordMatchingService;
