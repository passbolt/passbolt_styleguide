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
 * Lowest common denominator of the classification cascade: a stateless, value-free, DOM-free matching
 * primitive. Every tier that reasons about a name, id, label or autocomplete string funnels through
 * it, so its matching semantics set detection accuracy in a single place. Only attribute/label
 * metadata is ever passed in — never a user-typed field value.
 */
class KeywordMatchingService {
  /**
   * Match against a keyword set with a deliberate recall-vs-precision rule: substring on the
   * CONCATENATED form (recall — catches all-attached attributes like `confirmpassword`), exact
   * segment for SHORT_AMBIGUOUS tokens (precision — `new` ⊄ `newsletter`). Empty input returns false.
   * @param {string} normalizedText The output of `TextNormalizer.normalizeForMatch` (space-segmented).
   * @param {string[]} set The keyword set to test against.
   * @returns {boolean} Whether any keyword matches.
   */
  static matchesAny(normalizedText, set) {
    if (!normalizedText) {
      return false;
    }
    const concatenated = normalizedText.replace(/\s/g, "");
    const segments = new Set(normalizedText.split(" "));
    return set.some((keyword) => {
      // normalizeForMatch emits NFD; keywords are authored precomposed (NFC), so align the needle
      // before comparing — otherwise CJK/Hangul keywords never match their own decomposed input.
      const needle = keyword.normalize("NFD");
      // SHORT_AMBIGUOUS tokens must stand as their own segment (precision: `new` ⊄ `newsletter`);
      // every other keyword matches as a substring of the attached form (recall: `confirmpassword`).
      return SHORT_AMBIGUOUS.has(keyword) ? segments.has(needle) : concatenated.includes(needle);
    });
  }

  /**
   * Role derived from the `autocomplete` attribute — the LAST significant token, which is the most
   * specific one. Tokens are scanned right-to-left and the first hit in {@link AUTOCOMPLETE_ROLE} is
   * returned. "off"/"on" carry no role signal and map to nothing.
   * @param {string} autoComplete The raw autocomplete attribute (null-safe).
   * @returns {string|null} A {@link FieldRole} value, or null when no token maps to a role.
   */
  static roleFromAutocomplete(autoComplete) {
    const tokens = (autoComplete || "").toLowerCase().split(/\s+/).filter(Boolean);
    for (let i = tokens.length - 1; i >= 0; i--) {
      // hasOwnProperty guard: a plain-object lookup would otherwise resolve "constructor",
      // "toString"… to Object.prototype members and return a non-role value.
      if (Object.prototype.hasOwnProperty.call(AUTOCOMPLETE_ROLE, tokens[i])) {
        return AUTOCOMPLETE_ROLE[tokens[i]];
      }
    }
    return null;
  }
}

export default KeywordMatchingService;
