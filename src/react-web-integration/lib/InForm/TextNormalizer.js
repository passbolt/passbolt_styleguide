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
 * Any run of Unicode control characters (\p{C}: Cc, Cf, Cs, Co, Cn) and/or whitespace. Collapsed to a
 * single space so invisible formatting/bidi characters never survive into inference.
 * @type {RegExp}
 */
const CONTROL_AND_WHITESPACE = /[\p{C}\s]+/gu;

/**
 * The Combining Diacritical Marks block only (U+0300–U+036F). Deliberately NOT the generic \p{M}
 * category: stripping all marks would destroy vowel signs that carry meaning in Brahmic (Devanagari,
 * Bengali, Tamil…) and Thai scripts. This range folds Latin/Greek/Cyrillic accents (é → e) after NFD.
 * @type {RegExp}
 */
const COMBINING_DIACRITICS = /[\u0300-\u036f]/g;

/**
 * Acronym-to-word boundary inside camelCase, e.g. "HTMLParser" → "HTML Parser". Applied before the
 * lower→upper boundary so a trailing capitalised word is split off a preceding uppercase run.
 * @type {RegExp}
 */
const ACRONYM_BOUNDARY = /(\p{Lu}+)(\p{Lu}\p{Ll})/gu;

/**
 * The common camelCase boundary: a lowercase letter or digit immediately followed by an uppercase
 * letter, e.g. "userName" → "user Name", "field2Label" → "field2 Label".
 * @type {RegExp}
 */
const CAMEL_BOUNDARY = /([\p{Ll}\p{N}])(\p{Lu})/gu;

/**
 * Any run of characters that are neither letters nor digits (Unicode-aware). Used as the token
 * delimiter when scraping UI text.
 * @type {RegExp}
 */
const NON_ALPHANUMERIC = /[^\p{L}\p{N}]+/u;

/**
 * Common visual separators (whitespace, underscore, hyphen, dot, slash) folded to a single space so
 * "sign-up", "sign_up", "sign.up" and "sign up" all match the same keyword.
 * @type {RegExp}
 */
const VISUAL_SEPARATORS = /[\s_\-./]+/g;

/**
 * Tokens shorter than this are dropped by {@link TextNormalizer.tokenize} as noise (stray letters,
 * single digits) that add nothing to inference.
 * @type {number}
 */
const MIN_TOKEN_LENGTH = 2;

/**
 * Null-safe cast to string. Anything nullish becomes an empty string; everything else is coerced with
 * `String()`. Centralised so every public method shares identical input handling.
 * @param {*} value The raw, possibly nullish, input.
 * @returns {string} The value as a string, or "" when nullish.
 */
function toSafeString(value) {
  return value == null ? "" : String(value);
}

/**
 * Module-private preparation step shared by {@link TextNormalizer.tokenize} and
 * {@link TextNormalizer.normalizeForMatch}. It:
 *  1. NFD-decomposes so accents split into base letter + combining mark;
 *  2. strips ONLY the Combining Diacritical Marks block (see {@link COMBINING_DIACRITICS}) so
 *     Latin/Greek/Cyrillic accents fold while Brahmic/Thai vowel signs stay intact;
 *  3. injects spaces at camelCase boundaries so glued identifiers become separate words.
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
 * Pure, stateless text helper used to normalise scraped DOM text before running keyword/regex
 * inference on it (field classification, button/label detection). Operates entirely in memory: no DOM
 * access, no retained state, all methods static. Guarantees i18n safety by never destructively
 * normalising complex non-Latin scripts.
 */
class TextNormalizer {
  /**
   * Base normalisation: null-safe cast, then collapse every run of Unicode control characters and
   * whitespace into a single space, and trim. Keeps human-visible content while removing invisible
   * formatting/bidi characters and irregular spacing.
   *
   * @param {*} input The raw text (null-safe; non-strings are coerced).
   * @returns {string} The normalised string, possibly empty.
   */
  static normalize(input) {
    return toSafeString(input).replace(CONTROL_AND_WHITESPACE, " ").trim();
  }

  /**
   * Tokenise UI text (button labels, headings) for scraping. Folds diacritics and camelCase,
   * lowercases, splits on any non-alphanumeric run, drops tokens shorter than
   * {@link MIN_TOKEN_LENGTH}, and re-joins the survivors with single spaces.
   *
   * @param {*} input The raw text (null-safe).
   * @returns {string} Space-joined lowercase tokens, or "" when nothing survives.
   */
  static tokenize(input) {
    return fold(input)
      .toLowerCase()
      .split(NON_ALPHANUMERIC)
      .filter((token) => token.length >= MIN_TOKEN_LENGTH)
      .join(" ");
  }

  /**
   * Normalise a string for keyword/regex matching during field classification. Folds diacritics and
   * camelCase, replaces common visual separators (space, `_`, `-`, `.`, `/`) with single spaces,
   * lowercases, and trims. Unlike {@link TextNormalizer.tokenize} it preserves short tokens so
   * matches like "id" or "cc" survive.
   *
   * @param {*} input The raw text (null-safe).
   * @returns {string} The match-ready string, possibly empty.
   */
  static normalizeForMatch(input) {
    return fold(input).replace(VISUAL_SEPARATORS, " ").toLowerCase().trim();
  }
}

export default TextNormalizer;
