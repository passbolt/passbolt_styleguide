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

import ScrapingIdentityService from "./ScrapingIdentityService";
import ScrapingCacheService from "./ScrapingCacheService";
import LabelScraperService from "./LabelScraperService";
import { MAX_SCRAPED_STRING_LENGTH, AUTOCOMPLETE_ATTRS, OPT_OUT_ATTRS } from "../../lib/InForm/ScrapingDictionary";

/**
 * Builds the per-field, value-free `FieldScraping` record consumed by the scraping pipeline.
 *
 * Purely structural: the field's value is never read (no `value`, not even a `hasValue` flag) — a hard
 * security guarantee. {@link build} is the cacheable structural core; {@link scrape} is the public,
 * cache-assisted entry. Read-only — the host DOM is never mutated.
 */
class FieldScraperService {
  /**
   * Build the value-free `FieldScraping` record for a field, then delegate to
   * {@link LabelScraperService.enrich} for the elected `label` and `ariaState`.
   *
   * Kept separate from {@link scrape}, which owns the cache policy — do not merge the two.
   *
   * @param {Element} element The field element.
   * @param {string} formId The id inherited from the container skeleton (never null).
   * @returns {FieldScraping} The label-enriched, element-free payload.
   */
  static build(element, formId) {
    const tagName = element.nodeName.toUpperCase();
    // Untyped only applies to <input>; a non-input control (e.g. contenteditable) carries no `type`.
    const type = tagName === "INPUT" ? (element.type || "text").toLowerCase() : "";

    const record = {
      // Live node attached transiently: LabelScraperService.enrich reads `element` off the payload.
      // Stripped again below before the record is returned or cached (see the note near enrich).
      element,
      fieldId: ScrapingIdentityService.fieldId(element),
      formId,
      tagName,
      type,
      attributes: {
        id: FieldScraperService._clip(element.id),
        name: FieldScraperService._clip(element.getAttribute("name")),
        class: FieldScraperService._clip(element.getAttribute("class")),
        autocomplete: FieldScraperService._clip(element.getAttribute("autocomplete")),
        pattern: FieldScraperService._clip(element.getAttribute("pattern")),
        maxLength: element.maxLength > 0 ? element.maxLength : null,
        inputMode: FieldScraperService._clip(element.getAttribute("inputmode")),
        role: FieldScraperService._clip(element.getAttribute("role")),
        required: element.hasAttribute("required"),
        readonly: element.hasAttribute("readonly"),
        // Native disabled state — distinct from `aria-disabled`, which is captured in `ariaState`.
        disabled: element.disabled === true || element.hasAttribute("disabled"),
        tabIndex: element.tabIndex,
      },
      // Human-visible descriptors, held apart from `attributes` as label / inference features. Read via
      // `textContent` (never `innerText`) so gathering them triggers no layout reflow.
      inputDescription: {
        placeholder: FieldScraperService._clip(element.getAttribute("placeholder")),
        ariaLabel: FieldScraperService._clip(element.getAttribute("aria-label")),
        ariaLabelledby: FieldScraperService._clip(element.getAttribute("aria-labelledby")),
        ariaDescribedby: FieldScraperService._clip(element.getAttribute("aria-describedby")),
        ariaDetails: FieldScraperService._clip(element.getAttribute("aria-details")),
        title: FieldScraperService._clip(element.getAttribute("title")),
        alt: FieldScraperService._clip(element.getAttribute("alt")),
        innerText: FieldScraperService._clip(element.textContent),
      },
      // Raw site-authored form-type hint, left untouched apart from lowercasing.
      dataFormType: FieldScraperService._clip(element.getAttribute("data-form-type")).toLowerCase(),
      // Normalised autocomplete elected from the standardised + legacy variants.
      autoComplete: FieldScraperService._autoComplete(element),
      // Vendor "do not autofill" opt-out markers (NOT `autocomplete=off`, which is ignored everywhere).
      optOut: FieldScraperService._optOut(element),
    };

    LabelScraperService.enrich(record);

    // Drop the live-node reference before the record leaves this method. ScrapingCacheService keys its
    // WeakMap on the element, and a cached value that strongly holds its own key would pin the node in
    // memory — defeating the cache's "collected together with the node" guarantee (a real leak on
    // long-lived SPAs). Downstream never needs the node: it maps back via `fieldId`.
    delete record.element;

    return record;
  }

  /**
   * Cache-assisted entry. Return the cached payload while still bound to the same form; otherwise build
   * and memoize a fresh one. The `formId` guard re-scrapes a field re-parented to another form (SPA).
   *
   * @param {Element} element The field element.
   * @param {string} formId The id of the container the field is currently attributed to.
   * @returns {FieldScraping} The cached or freshly built payload.
   */
  static scrape(element, formId) {
    const cached = ScrapingCacheService.getField(element);
    if (cached && cached.formId === formId) {
      return cached;
    }

    return ScrapingCacheService.setField(element, FieldScraperService.build(element, formId));
  }

  /**
   * Coerce a value to a string and cap it at {@link MAX_SCRAPED_STRING_LENGTH} characters.
   * @private
   * @param {*} value The raw value (null-safe).
   * @returns {string} The clipped string ("" when null / undefined).
   */
  static _clip(value) {
    return value == null ? "" : String(value).slice(0, MAX_SCRAPED_STRING_LENGTH);
  }

  /**
   * Elect the field's autocomplete hint: the first present of the {@link AUTOCOMPLETE_ATTRS} variants,
   * trimmed and lowercased.
   * @private
   * @param {Element} element The field element.
   * @returns {string} The normalised autocomplete token, or "".
   */
  static _autoComplete(element) {
    const raw = AUTOCOMPLETE_ATTRS.map((attr) => element.getAttribute(attr)).find(Boolean);
    return (raw || "").trim().toLowerCase();
  }

  /**
   * Whether the field carries a vendor opt-out marker ({@link OPT_OUT_ATTRS}) asking password managers
   * not to autofill it.
   * @private
   * @param {Element} element The field element.
   * @returns {boolean} true when at least one opt-out attribute is present.
   */
  static _optOut(element) {
    return OPT_OUT_ATTRS.some((attr) => element.hasAttribute(attr));
  }
}

export default FieldScraperService;
