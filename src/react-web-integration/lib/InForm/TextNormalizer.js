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

/**
 * Any sequence of Unicode control characters and/or whitespace.
 * @type {RegExp}
 */
const CONTROL_AND_WHITESPACE = /[\p{C}\s]+/gu;

/**
 * Strips only the U+0300–U+036F accent marks (é → e) once letters are split from their accents;
 * Removing every Unicode mark (\p{M}) instead would also delete vowel signs that Indic and Thai scripts need.
 * @type {RegExp}
 */
const COMBINING_DIACRITICS = /[\u0300-\u036f]/g;

/**
 * Acronym to word boundary inside camelCase, e.g. "HTMLParser" → "HTML Parser".
 * @type {RegExp}
 */
const ACRONYM_BOUNDARY = /(\p{Lu}+)(\p{Lu}\p{Ll})/gu;

/**
 * The common camelCase boundary: a lowercase letter or digit immediately followed by an uppercase letter.
 * @type {RegExp}
 */
const CAMEL_BOUNDARY = /([\p{Ll}\p{N}])(\p{Lu})/gu;

/**
 * Any sequence of characters that are neither letters nor digits (Unicode-aware).
 * Used as the token delimiter when scraping UI text.
 * @type {RegExp}
 */
const NON_ALPHANUMERIC = /[^\p{L}\p{N}]+/u;

/**
 * Common visual separators (whitespace, underscore, hyphen, dot, slash).
 * @type {RegExp}
 */
const VISUAL_SEPARATORS = /[\s_\-./]+/g;

/**
 * Tokens shorter than this are dropped by {@link TextNormalizer.tokenize} as noise (stray letters, single digits) that add nothing to inference.
 * @type {number}
 */
const MIN_TOKEN_LENGTH = 2;

/**
 * Null-safe cast to string.
 * @param {*} value The raw, possibly nullish, input.
 * @returns {string} The value as a string, or "" when nullish.
 */
function toSafeString(value) {
  return value == null ? "" : String(value);
}

/**
 * Module-private preparation step. It:
 *  1. splits accented letters into base letter + accent mark;
 *  2. removes only those accent marks (é → e), leaving Indic and Thai vowel signs intact;
 *  3. inserts a space at each camelCase boundary so glued words become separate words.
 *
 * @param {*} value The raw input (null-safe).
 * @returns {string} The folded string. Not lowercased and not trimmed — callers own casing/trimming.
 */
function fold(value) {
  return toSafeString(value)
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .replace(ACRONYM_BOUNDARY, "$1 $2")
    .replace(CAMEL_BOUNDARY, "$1 $2");
}

/**
 * Normalise scraped DOM text before running keyword/regex inference on it (field classification, button/label detection).
 */
class TextNormalizer {
  /**
   * Casts the input to a string, replaces every sequence of control characters and whitespace with a single space, then trims.
   *
   * @param {*} input The raw text.
   * @returns {string} The normalised string, possibly empty.
   */
  static normalize(input) {
    return toSafeString(input).replace(CONTROL_AND_WHITESPACE, " ").trim();
  }

  /**
   * Splits UI text (button labels, headings) into lowercase words, dropping accents, camelCase and words shorter than {@link MIN_TOKEN_LENGTH}.
   *
   * @param {*} input The raw text.
   * @returns {string} The words joined by single spaces, or "" if none remain.
   */
  static tokenize(input) {
    return fold(input)
      .toLowerCase()
      .split(NON_ALPHANUMERIC)
      .filter((token) => token.length >= MIN_TOKEN_LENGTH)
      .join(" ");
  }

  /**
   * Lowercases the text, drops accents and camelCase, and turns separators into single spaces; short words like "id" or "cc" are kept.
   *
   * @param {*} input The raw text.
   * @returns {string} The cleaned text, or "" if nothing remains.
   */
  static normalizeForMatch(input) {
    return fold(input).replace(VISUAL_SEPARATORS, " ").toLowerCase().trim();
  }
}

export default TextNormalizer;
