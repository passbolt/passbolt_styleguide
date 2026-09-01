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

import FormScraper from "../DomExtraction/FormScraper";
import FieldScraperService from "./FieldScraperService";
import ScrapingIdentityService from "./ScrapingIdentityService";
import ScrapingCacheService from "./ScrapingCacheService";
import ShadowMutationObserverService from "../ShadowDom/ShadowMutationObserverService";
import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";
import { SCRAPED_ATTRS } from "../../lib/InForm/ScrapingDictionary";
import { TEXT_FIELDS } from "../../lib/InForm/OrphanDictionary";

// Shortest adaptive re-scrape delay, applied to a lone mutation.
export const RESCRAPE_MIN_DELAY = 1000;
// Longest adaptive re-scrape delay, the ceiling reached under sustained DOM churn.
export const RESCRAPE_MAX_DELAY = 5000;

/**
 * Turns the extraction skeleton (real forms + validated pseudo-forms) into a {@link PageScraping}
 * payload — per-form and per-field records plus a per-form field-type histogram — without re-walking the
 * DOM. Can run incrementally ({@link startIncremental}): subscribes to the shared shadow-mutation
 * channel, drops the cache of touched subtrees, and re-scrapes on an adaptive debounce inside
 * `requestIdleCallback`. Strictly read-only — the host DOM is never mutated.
 */
class PageScraperService {
  // Unsubscribe closure from the shadow-mutation subscription, held for teardown.
  static _unsubscribe = null;
  // Consumer callback fed a fresh PageScraping on every emit; doubles as the "incremental active" flag.
  static _onScrape = null;
  // The last skeleton handed to startIncremental, reused by every re-scrape.
  static _lastSkeleton = null;
  // Pending adaptive-debounce timer handle (trailing edge of a mutation burst).
  static _debounceHandle = null;
  // Pending `requestIdleCallback` (or `setTimeout` fallback) handle for the deferred re-scrape.
  static _idleHandle = null;
  // Burst reschedule count; the debounce delay scales with it. Reset to 0 once the re-scrape fires.
  static _burstCount = 0;

  /**
   * Scraped attribute names, as a `Set` for O(1) lookup in the mutation hot path.
   * @private
   * @type {Set<string>}
   */
  static _scrapedAttrs = new Set(SCRAPED_ATTRS);

  /**
   * Orchestrate the full page payload: issue a stable id per container, delegate container data to
   * {@link FormScraper} and each field to {@link FieldScraperService}, and aggregate a per-form
   * `fieldTypes` histogram. Read-only; falls back to {@link _lastSkeleton} when called with no argument.
   *
   * @param {object[]} [formElements] The extraction skeleton; defaults to the last one.
   * @returns {PageScraping} The finalized page payload.
   */
  static scrape(formElements) {
    const skeletons = formElements ?? PageScraperService._lastSkeleton ?? [];
    const forms = [];
    const fields = [];

    for (const skeleton of skeletons) {
      const scraped = PageScraperService._scrapeForm(skeleton);
      if (scraped) {
        forms.push(scraped.form);
        fields.push(...scraped.fields);
      }
    }

    // Globals are guarded so a re-scrape never throws in a document-less context, symmetrical with the
    // `window` guards in `_runRescrape` / `stop`.
    return {
      url: typeof location !== "undefined" ? location.href : "",
      documentUrl: typeof document !== "undefined" ? document.URL : "",
      title: typeof document !== "undefined" ? document.title : "",
      forms,
      fields,
    };
  }

  /**
   * Scrape a single skeleton container: issue its stable id, delegate container data to
   * {@link FormScraper} and each field to {@link FieldScraperService}, and tally the `fieldTypes` histogram.
   * @private
   * @param {object} skeleton The skeleton container entry.
   * @returns {?{form: FormScraping, fields: FieldScraping[]}} The form and its fields, or `null` when the
   *   container is not an element.
   */
  static _scrapeForm(skeleton) {
    const containerElement = skeleton?.containerElement;
    if (!ShadowDomQueryService.isElement(containerElement)) {
      return null;
    }

    const formId = ScrapingIdentityService.formId(containerElement);
    const form = FormScraper.scrape(containerElement, formId);
    const fields = [];

    for (const field of skeleton.fields ?? []) {
      const element = PageScraperService._fieldElementOf(field);
      if (!ShadowDomQueryService.isElement(element)) {
        continue;
      }

      const fieldRecord = FieldScraperService.scrape(element, formId);
      fields.push(fieldRecord);
      PageScraperService._incrementFieldTypeCount(form, fieldRecord.type);
    }

    return { form, fields };
  }

  /**
   * Resolve a skeleton field's element, reading both shapes: real forms carry `{ element }`, pseudo-forms
   * `{ fieldElement }`.
   * @private
   * @param {{element?: Element, fieldElement?: Element}} field The skeleton field entry.
   * @returns {Element|undefined} The field element, or `undefined` for a malformed entry.
   */
  static _fieldElementOf(field) {
    return field?.fieldElement ?? field?.element;
  }

  /**
   * Increment a form's `fieldTypes` histogram (in place). A field with no type adds no bucket.
   * @private
   * @param {FormScraping} formRecord The form record whose histogram is updated.
   * @param {?string} type The scraped field's input type, if any.
   * @returns {void}
   */
  static _incrementFieldTypeCount(formRecord, type) {
    if (!type) {
      return;
    }
    formRecord.fieldTypes[type] = (formRecord.fieldTypes[type] || 0) + 1;
  }

  /**
   * Start keeping the payload current incrementally: remember the skeleton and the `onScrape` callback,
   * subscribe to the shadow-mutation channel, then emit an initial snapshot. Idempotent — restarts tear
   * down the prior session.
   *
   * @param {object[]} formElements The extraction skeleton to keep scraping.
   * @param {(pageScraping: PageScraping) => void} onScrape The callback fed every fresh payload.
   * @returns {?PageScraping} The initial snapshot (also delivered to `onScrape`), or `undefined` when
   *   `onScrape` is nullish — with no callback there is nothing to deliver, so it is a no-op.
   */
  static startIncremental(formElements, onScrape) {
    PageScraperService.stop();

    // Without a callback there is nothing to deliver and `_onMutation` would early-return anyway: skip
    // the subscription entirely rather than install a dead one.
    if (!onScrape) {
      return;
    }

    PageScraperService._lastSkeleton = formElements;
    PageScraperService._onScrape = onScrape;
    PageScraperService._unsubscribe = ShadowMutationObserverService.subscribeToShadowMutations(
      PageScraperService._onMutation,
    );

    const payload = PageScraperService.scrape(formElements);
    onScrape(payload);

    return payload;
  }

  /**
   * Shadow-mutation subscriber: invalidate the caches touched by each relevant mutation (topology change,
   * scraped-attribute change, or in-form label text change) and schedule a re-scrape. Attribute records
   * only reach here for names in the shared observer's `attributeFilter`, kept a superset of
   * {@link SCRAPED_ATTRS} (a test guards the invariant).
   *
   * @param {Document|ShadowRoot|Element} root The observed root (unused).
   * @param {MutationRecord[]} mutations The batch of mutations.
   * @param {boolean} shadowRootsChanged Whether the batch added or removed shadow roots.
   * @returns {void}
   */
  static _onMutation(root, mutations, shadowRootsChanged) {
    if (!PageScraperService._onScrape) {
      return;
    }

    let relevant = Boolean(shadowRootsChanged);

    for (const mutation of mutations) {
      const isTopologyChange =
        mutation.type === "childList" && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0);

      if (isTopologyChange) {
        relevant = true;
        // Removed nodes are already detached from the target, so purge their own subtrees explicitly too.
        PageScraperService._invalidateSubtree(mutation.target);
        for (const node of mutation.addedNodes) {
          PageScraperService._invalidateSubtree(node);
        }
        for (const node of mutation.removedNodes) {
          PageScraperService._invalidateSubtree(node);
        }
        // A label / heading node added or removed re-elects the label of the sibling fields it describes.
        PageScraperService._invalidateFieldsAround(mutation.target);
      } else if (mutation.type === "attributes" && PageScraperService._scrapedAttrs.has(mutation.attributeName)) {
        relevant = true;
        PageScraperService._invalidateSubtree(mutation.target);
      } else if (mutation.type === "characterData") {
        // Text rewritten in place: relevant only when it belongs to a scraped form, so unrelated page text (a ticking clock, a live region) does not trigger needless re-scrapes.
        if (PageScraperService._invalidateFieldsAround(mutation.target)) {
          relevant = true;
        }
      }
    }

    if (relevant) {
      PageScraperService._scheduleRescrape();
    }
  }

  /**
   * Drop the cache for a node and every {@link TEXT_FIELDS} descendant (shadow-piercing). Non-elements ignored.
   * @param {Node} node The mutated node whose cached scrapes are now stale.
   * @returns {void}
   */
  static _invalidateSubtree(node) {
    if (!ShadowDomQueryService.isElement(node)) {
      return;
    }

    ScrapingCacheService.invalidate(node);
    for (const field of ShadowDomQueryService.querySelectorAllDeep(node, TEXT_FIELDS)) {
      ScrapingCacheService.invalidate(field);
    }
  }

  /**
   * Invalidate the fields of the form(s) enclosing or enclosed by a mutated text/label node — sibling
   * fields whose elected label changed but that {@link _invalidateSubtree} misses. Scoped to the skeleton
   * containers; same-tree containment only (`contains` does not pierce shadow boundaries).
   *
   * @private
   * @param {Node} node The mutated text (or container) node.
   * @returns {boolean} `true` if at least one scraped form's fields were invalidated.
   */
  static _invalidateFieldsAround(node) {
    let element = node;
    if (!ShadowDomQueryService.isElement(element)) {
      element = node?.parentElement;
      if (!ShadowDomQueryService.isElement(element)) {
        return false;
      }
    }

    let invalidated = false;
    for (const skeleton of PageScraperService._lastSkeleton ?? []) {
      const container = skeleton?.containerElement;
      // The text lives inside the form (a label) or wraps it (an ancestor heading).
      if (ShadowDomQueryService.isElement(container) && (container.contains(element) || element.contains(container))) {
        PageScraperService._invalidateSubtree(container);
        invalidated = true;
      }
    }
    return invalidated;
  }

  /**
   * Schedule the trailing re-scrape with an adaptive debounce ({@link RESCRAPE_MIN_DELAY} × burst, capped
   * at {@link RESCRAPE_MAX_DELAY}).
   * @private
   * @returns {void}
   */
  static _scheduleRescrape() {
    PageScraperService._burstCount++;
    const delay = Math.min(RESCRAPE_MIN_DELAY * PageScraperService._burstCount, RESCRAPE_MAX_DELAY);

    if (PageScraperService._debounceHandle !== null) {
      clearTimeout(PageScraperService._debounceHandle);
    }
    PageScraperService._debounceHandle = setTimeout(PageScraperService._runRescrape, delay);
  }

  /**
   * Fire the coalesced re-scrape inside `requestIdleCallback` (falling back to `setTimeout(0)` on Safari)
   * and deliver the payload to the `onScrape` callback.
   * @private
   * @returns {void}
   */
  static _runRescrape() {
    PageScraperService._debounceHandle = null;
    PageScraperService._burstCount = 0;

    const emitScrape = () => {
      PageScraperService._idleHandle = null;
      const payload = PageScraperService.scrape();
      PageScraperService._onScrape?.(payload);
    };

    if (typeof window?.requestIdleCallback === "function") {
      PageScraperService._idleHandle = window.requestIdleCallback(emitScrape, { timeout: RESCRAPE_MAX_DELAY });
    } else {
      PageScraperService._idleHandle = setTimeout(emitScrape, 0);
    }
  }

  /**
   * Stop the incremental machinery cleanly — cancel pending timers, unsubscribe, and clear all state.
   * Idempotent.
   * @returns {void}
   */
  static stop() {
    if (PageScraperService._debounceHandle !== null) {
      clearTimeout(PageScraperService._debounceHandle);
    }
    if (PageScraperService._idleHandle !== null) {
      if (typeof window?.cancelIdleCallback === "function") {
        window.cancelIdleCallback(PageScraperService._idleHandle);
      } else {
        clearTimeout(PageScraperService._idleHandle);
      }
    }
    PageScraperService._unsubscribe?.();

    PageScraperService._unsubscribe = null;
    PageScraperService._onScrape = null;
    PageScraperService._lastSkeleton = null;
    PageScraperService._debounceHandle = null;
    PageScraperService._idleHandle = null;
    PageScraperService._burstCount = 0;
  }
}

export default PageScraperService;
