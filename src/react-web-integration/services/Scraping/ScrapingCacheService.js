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

import TextNormalizer from "../../lib/InForm/TextNormalizer";
import { QUALIFICATION_TOKEN_ATTRS } from "../../lib/InForm/ScrapingDictionary";

/**
 * A structured, per-field scraping payload produced by the scraper. Opaque to this cache — the cache
 * only stores and returns it, never inspects it. Its shape is owned by the field scraper (a later WP).
 * @typedef {object} FieldScraping
 */

/**
 * Per-field memoization of scraping results, keyed by the live DOM element. A WeakMap is used instead
 * of a DOM attribute or an expando on purpose — consistent with the P1 zero-pollution identity design
 * (see `ScrapingIdentityService`): the cache never touches the node, so it stays invisible to the host
 * page and is collected together with each node, and can neither leak nor return stale data for a
 * detached element.
 */
class ScrapingCacheService {
  /**
   * Element → scraped payload cache. WeakMap so an entry is garbage collected together with its node,
   * never leaking and never handing back a payload for a detached element.
   * @private
   * @type {WeakMap<Element, FieldScraping>}
   */
  static _payloadByElement = new WeakMap();

  /**
   * Element → qualification-token cache. WeakMap for the same GC-with-the-node guarantee.
   * @private
   * @type {WeakMap<Element, Set<string>>}
   */
  static _keywordsByElement = new WeakMap();

  /**
   * Return the cached scraping payload for an element, or `null` when it has not been scraped yet.
   * @param {Element} element The scraped field element.
   * @returns {FieldScraping} The cached payload, or `null` on a miss.
   */
  static getField(element) {
    return ScrapingCacheService._payloadByElement.get(element) ?? null;
  }

  /**
   * Cache (or overwrite) the scraping payload for an element and return it, so a caller can inline the
   * store: `return ScrapingCacheService.setField(element, payload)`.
   * @param {Element} element The scraped field element.
   * @param {FieldScraping} payload The freshly scraped payload to memoize.
   * @returns {FieldScraping} The same `payload`, for call-site chaining.
   */
  static setField(element, payload) {
    ScrapingCacheService._payloadByElement.set(element, payload);
    return payload;
  }

  /**
   * Drop an element from both caches so its next scrape is recomputed. Invalidation is the caller's
   * responsibility: whoever observes the DOM must call this whenever one of the element's
   * {@link SCRAPED_ATTRS} mutates, otherwise a stale payload/token set can be returned.
   * @param {Element} element The element whose cached results are now stale.
   * @returns {void}
   */
  static invalidate(element) {
    ScrapingCacheService._payloadByElement.delete(element);
    ScrapingCacheService._keywordsByElement.delete(element);
  }

  /**
   * Lazily compute and cache the field's deduplicated qualification tokens: the raw values of a fixed
   * list of Passbolt-relevant attributes ({@link QUALIFICATION_TOKEN_ATTRS}), tokenized. The field's
   * value/text is never read — structural metadata only.
   *
   * Tokenization is delegated wholesale to {@link TextNormalizer.tokenize} (single, shared tokenizer —
   * no bespoke camelCase/splitting logic here); this method only concatenates the source attributes and
   * memoizes the resulting `Set`.
   *
   * @param {Element} element The field element to derive tokens from.
   * @returns {Set<string>} The deduplicated qualification tokens (possibly empty).
   */
  static keywords(element) {
    const cached = ScrapingCacheService._keywordsByElement.get(element);
    if (cached) {
      return cached;
    }

    const raw = QUALIFICATION_TOKEN_ATTRS.map((attr) => element.getAttribute(attr))
      .filter(Boolean)
      .join(" ");
    // tokenize() returns space-joined tokens (or ""); filter(Boolean) drops the empty-string split.
    const tokens = new Set(TextNormalizer.tokenize(raw).split(" ").filter(Boolean));
    ScrapingCacheService._keywordsByElement.set(element, tokens);

    return tokens;
  }
}

export default ScrapingCacheService;
