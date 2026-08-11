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

import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";
import PageScraperHelpers from "./PageScraperHelpers";
import TextNormalizer from "../../lib/InForm/TextNormalizer";
import {
  LABEL_TIERS,
  LABEL_BOUNDARY_TAGS,
  LABEL_SKIP_TAGS,
  LABEL_ANCESTOR_TAGS,
  MAX_LABEL_ANCESTOR_HOPS,
  MAX_SCRAPED_STRING_LENGTH,
} from "../../lib/InForm/ScrapingDictionary";

/**
 * The (partial) per-field scraping payload this scraper reads from and writes back to. The whole
 * {@link FieldScraping} shape is owned by the field scraper (a later WP); {@link LabelScraper} only
 * touches the slice below and never inspects the rest.
 * @typedef {object} FieldScraping
 * @property {Element} element The live field element the label is elected for (read-only, never mutated).
 * @property {{placeholder?: string}} [inputDescription] Attributes captured in the Phase 1 scrape; the
 *   `placeholder` is reused by the placeholder tier so the DOM is not read twice.
 * @property {{text: string, source: ?string}} [label] Written by {@link LabelScraper.enrich}: the elected
 *   label text and the tier that produced it (a {@link LABEL_TIERS} entry, or `null` when none matched).
 * @property {AriaState} [ariaState] Written by {@link LabelScraper.enrich}: the field's ARIA state.
 */

/**
 * The accessibility state captured alongside the label.
 * @typedef {object} AriaState
 * @property {string} describedBy Resolved text of the `aria-describedby` targets (empty when none).
 * @property {boolean} hidden Whether `aria-hidden` is asserted true.
 * @property {boolean} disabled Whether `aria-disabled` is asserted true.
 * @property {boolean|string} hasPopup The `aria-haspopup` value: `false` when absent/"false", `true` for
 *   "true", otherwise the raw token ("menu", "listbox", "dialog"…).
 */

/**
 * Elects exactly one human label per scraped field and captures its ARIA state.
 *
 * A field's label has no single reliable source — it can live in a `<label for>`, a wrapping `<label>`,
 * a preceding sibling, a `placeholder`, an ARIA attribute, or an ancestor wrapper — and these vary by
 * site and break across shadow boundaries. {@link enrich} runs a confidence-ordered cascade
 * ({@link LABEL_TIERS}) and the first source that yields non-empty text wins; the winning tier is kept
 * as a confidence signal for downstream qualification/matching.
 *
 * Strictly read-only with respect to the host page: it clones subtrees (via {@link PageScraperHelpers})
 * before stripping nested controls and only ever mutates the {@link FieldScraping} object it is given.
 * Shadow boundaries are respected during root-scoped lookups and safely pierced during upward climbs.
 */
class LabelScraper {
  /**
   * Elect the field's label and capture its ARIA state, writing both back onto the payload.
   * @param {FieldScraping} fieldScraping The per-field payload to enrich in place.
   * @returns {FieldScraping} The same payload, for call-site chaining.
   */
  static enrich(fieldScraping) {
    const element = fieldScraping?.element;
    if (!ShadowDomQueryService.isElement(element)) {
      return fieldScraping;
    }

    fieldScraping.label = LabelScraper._electLabel(fieldScraping);
    fieldScraping.ariaState = LabelScraper._ariaState(element);

    return fieldScraping;
  }

  /**
   * Cascade orchestrator: consult each {@link LABEL_TIERS} source in order and return the first that
   * yields non-empty, cleaned text together with the tier that produced it.
   * @private
   * @param {FieldScraping} fieldScraping The per-field payload.
   * @returns {{text: string, source: ?string}} The elected label, or `{text: "", source: null}` when
   *   every tier came up empty.
   */
  static _electLabel(fieldScraping) {
    for (const tier of LABEL_TIERS) {
      const text = LabelScraper._clean(LabelScraper[tier](fieldScraping));
      if (text) {
        return { text, source: tier };
      }
    }

    return { text: "", source: null };
  }

  /**
   * Tier 1 — Explicit. Native `.labels` association first; then, since that is commonly empty inside a
   * shadow tree, a `<label for>` resolved within the field's own root; then a wrapping `<label>`
   * ancestor climbed across shadow boundaries.
   * @private
   * @param {FieldScraping} fieldScraping The per-field payload.
   * @returns {string} The raw label text, or "" when no explicit association exists.
   */
  static _explicit(fieldScraping) {
    const element = fieldScraping.element;

    // Native association. `.labels` covers both `for=` and wrapping labels in the light DOM.
    const nativeLabels = element.labels;
    if (nativeLabels && nativeLabels.length > 0) {
      const text = Array.from(nativeLabels)
        .map((label) => PageScraperHelpers.textWithoutFields(label))
        .join(" ");
      if (TextNormalizer.normalize(text)) {
        return text;
      }
    }

    // Explicit `for=` association, resolved within the field's root (Document or ShadowRoot) so the
    // lookup never leaks across a shadow boundary. `.labels` is often empty here, hence the fallback.
    const root = ShadowDomQueryService.scopeRoot(element);
    const forLabel = LabelScraper._labelForField(root, element);
    if (forLabel) {
      return PageScraperHelpers.textWithoutFields(forLabel);
    }

    // Wrapping `<label>` ancestor, piercing shadow boundaries on the way up.
    const wrappingLabel = ShadowDomQueryService.closestDeep(element, "label");
    if (wrappingLabel) {
      return PageScraperHelpers.textWithoutFields(wrappingLabel);
    }

    return "";
  }

  /**
   * Find the `<label for>` bound to the field by its `id`, then its `name`, scoped to `root`.
   * @private
   * @param {Document|ShadowRoot} root The field's root node.
   * @param {Element} element The field element.
   * @returns {?Element} The matching label, or `null`.
   */
  static _labelForField(root, element) {
    for (const attr of ["id", "name"]) {
      const value = element.getAttribute(attr);
      if (!value) {
        continue;
      }
      const match = root.querySelector(`label[for="${LabelScraper._cssEscape(value)}"]`);
      if (match) {
        return match;
      }
    }

    return null;
  }

  /**
   * Tier 2 — Sibling. Walk the field's previous siblings (text and element nodes), skipping
   * {@link LABEL_SKIP_TAGS} and stopping at a {@link LABEL_BOUNDARY_TAGS} boundary (reaching another
   * control means the text belongs to a different field).
   * @private
   * @param {FieldScraping} fieldScraping The per-field payload.
   * @returns {string} The raw sibling text preceding the field, or "".
   */
  static _sibling(fieldScraping) {
    const parts = [];
    let sibling = fieldScraping.element.previousSibling;

    while (sibling) {
      if (ShadowDomQueryService.isElement(sibling)) {
        if (LabelScraper._isBoundary(sibling)) {
          break;
        }
        if (!LABEL_SKIP_TAGS.includes(sibling.nodeName)) {
          parts.unshift(sibling.textContent);
        }
      } else if (sibling.nodeType === Node.TEXT_NODE) {
        parts.unshift(sibling.textContent);
      }
      sibling = sibling.previousSibling;
    }

    return parts.join(" ");
  }

  /**
   * Whether a sibling element is (or wraps) a form control, i.e. crossing it would spill into another
   * field's territory.
   * @private
   * @param {Element} element The sibling to test.
   * @returns {boolean} true when the element is or contains a {@link LABEL_BOUNDARY_TAGS} control.
   */
  static _isBoundary(element) {
    if (LABEL_BOUNDARY_TAGS.includes(element.nodeName)) {
      return true;
    }

    return element.querySelector(LABEL_BOUNDARY_TAGS.join(",").toLowerCase()) !== null;
  }

  /**
   * Tier 3 — Placeholder. Reuse the placeholder captured during the Phase 1 scrape rather than reading
   * the DOM again.
   * @private
   * @param {FieldScraping} fieldScraping The per-field payload.
   * @returns {string} The captured placeholder, or "".
   */
  static _placeholder(fieldScraping) {
    return fieldScraping.inputDescription?.placeholder ?? "";
  }

  /**
   * Tier 4 — ARIA. Direct `aria-label` text, else the concatenated text of the `aria-labelledby`
   * targets resolved within the field's root.
   * @private
   * @param {FieldScraping} fieldScraping The per-field payload.
   * @returns {string} The raw ARIA label text, or "".
   */
  static _aria(fieldScraping) {
    const element = fieldScraping.element;

    const ariaLabel = element.getAttribute("aria-label");
    if (TextNormalizer.normalize(ariaLabel)) {
      return ariaLabel;
    }

    const labelledBy = element.getAttribute("aria-labelledby");
    if (labelledBy) {
      return LabelScraper._resolveIdRefs(element, labelledBy);
    }

    return "";
  }

  /**
   * Tier 5 — Ancestor. Climb up to {@link MAX_LABEL_ANCESTOR_HOPS} hops (piercing shadow boundaries)
   * for a {@link LABEL_ANCESTOR_TAGS} container that wraps this field alone — an ancestor holding more
   * than one control is too broad to name a single field — and return its text minus nested controls.
   * @private
   * @param {FieldScraping} fieldScraping The per-field payload.
   * @returns {string} The nearest qualifying ancestor's text, or "".
   */
  static _ancestor(fieldScraping) {
    let current = ShadowDomQueryService.shadowPiercingParentElement(fieldScraping.element);
    let hops = 0;

    while (ShadowDomQueryService.isElement(current) && hops < MAX_LABEL_ANCESTOR_HOPS) {
      // Density gate: reject an ancestor wrapping more than the field itself (1:1 label-to-field).
      if (LABEL_ANCESTOR_TAGS.includes(current.nodeName) && PageScraperHelpers.fieldCount(current) <= 1) {
        const text = TextNormalizer.normalize(PageScraperHelpers.textWithoutFields(current));
        if (text) {
          return text;
        }
      }
      current = ShadowDomQueryService.shadowPiercingParentElement(current);
      hops++;
    }

    return "";
  }

  /**
   * Capture the field's ARIA state: the resolved `aria-describedby` text plus the hidden / disabled /
   * haspopup flags.
   * @private
   * @param {Element} element The field element.
   * @returns {AriaState} The captured state.
   */
  static _ariaState(element) {
    const describedBy = element.getAttribute("aria-describedby");

    return {
      describedBy: describedBy ? LabelScraper._clean(LabelScraper._resolveIdRefs(element, describedBy)) : "",
      hidden: LabelScraper._ariaBoolean(element, "aria-hidden"),
      disabled: LabelScraper._ariaBoolean(element, "aria-disabled"),
      hasPopup: LabelScraper._ariaToken(element, "aria-haspopup"),
    };
  }

  /**
   * Resolve a space-separated IDREF list to the concatenated text of its targets, scoped to the field's
   * root and stripped of any nested control value.
   * @private
   * @param {Element} element The field element the IDREFs are relative to.
   * @param {string} idRefs The raw IDREF list (`aria-labelledby` / `aria-describedby`).
   * @returns {string} The concatenated target text, or "".
   */
  static _resolveIdRefs(element, idRefs) {
    const root = ShadowDomQueryService.scopeRoot(element);

    return idRefs
      .split(/\s+/)
      .filter(Boolean)
      .map((id) => {
        const target = LabelScraper._byId(root, id);
        return target ? PageScraperHelpers.textWithoutFields(target) : "";
      })
      .join(" ");
  }

  /**
   * Resolve an id within a root, preferring `getElementById` and falling back to an escaped selector.
   * @private
   * @param {Document|ShadowRoot} root The root to resolve within.
   * @param {string} id The element id.
   * @returns {?Element} The matching element, or `null`.
   */
  static _byId(root, id) {
    if (typeof root.getElementById === "function") {
      return root.getElementById(id);
    }

    return root.querySelector(`#${LabelScraper._cssEscape(id)}`);
  }

  /**
   * Read a boolean ARIA state attribute (only an explicit "true" asserts the state).
   * @private
   * @param {Element} element The field element.
   * @param {string} attr The attribute name.
   * @returns {boolean} Whether the state is asserted true.
   */
  static _ariaBoolean(element, attr) {
    return element.getAttribute(attr) === "true";
  }

  /**
   * Read a tri-state ARIA token: `false` when absent or "false", `true` for "true", otherwise the raw
   * token value.
   * @private
   * @param {Element} element The field element.
   * @param {string} attr The attribute name.
   * @returns {boolean|string} The parsed token.
   */
  static _ariaToken(element, attr) {
    const value = element.getAttribute(attr);
    if (value === null || value === "false") {
      return false;
    }
    if (value === "true") {
      return true;
    }

    return value;
  }

  /**
   * Normalise scraped text and cap it at {@link MAX_SCRAPED_STRING_LENGTH}.
   * @private
   * @param {*} text The raw text (null-safe).
   * @returns {string} The cleaned, length-capped text.
   */
  static _clean(text) {
    return TextNormalizer.normalize(text).slice(0, MAX_SCRAPED_STRING_LENGTH);
  }

  /**
   * Escape a string for safe use inside a CSS selector, using the native `CSS.escape` when available
   * and a conservative polyfill otherwise (backslash-escaping every non-identifier character).
   * @private
   * @param {string} value The raw attribute value.
   * @returns {string} The escaped value.
   */
  static _cssEscape(value) {
    if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
      return CSS.escape(value);
    }

    return String(value).replace(/[^\w-]/g, (character) => `\\${character}`);
  }
}

export default LabelScraper;
