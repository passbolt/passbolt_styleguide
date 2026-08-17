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
  LABEL_FOR_ATTRS,
  MAX_LABEL_ANCESTOR_HOPS,
  MAX_SCRAPED_STRING_LENGTH,
} from "../../lib/InForm/ScrapingDictionary";

/**
 * Finds the best label for a form field (and its ARIA state) by trying several sources in order of
 * reliability, keeping the first non-empty one and recording which source it came from.
 */
class LabelScraperService {
  /**
   * Elect the field's label and capture its ARIA state, writing both back onto the payload.
   * @param {FieldScraping} fieldScraping The per-field payload: reads `element` (and `inputDescription.placeholder`),
   *   writes `label` ({text, source}) and `ariaState`.
   * @returns {FieldScraping} The same payload, for call-site chaining.
   */
  static enrich(fieldScraping) {
    const element = fieldScraping?.element;
    if (!ShadowDomQueryService.isElement(element)) {
      return fieldScraping;
    }

    fieldScraping.label = LabelScraperService._electLabel(fieldScraping);
    fieldScraping.ariaState = LabelScraperService._ariaState(element);

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
      const text = LabelScraperService._clean(LabelScraperService[tier](fieldScraping));
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

    // Native association. `.labels` covers both `for=` and wrapping labels in the light DOM. Guarded
    // (like every non-final source below) so an empty native `<label>` falls through to the next
    // source rather than short-circuiting the tier with whitespace.
    const nativeLabels = element.labels;
    if (nativeLabels && nativeLabels.length > 0) {
      const text = Array.from(nativeLabels)
        .map((label) => PageScraperHelpers.textWithoutFields(label))
        .join(" ");
      if (LabelScraperService._hasText(text)) {
        return text;
      }
    }

    // Explicit `for=` association, resolved within the field's own root so the lookup never leaks
    // across a shadow boundary (nor onto the live document for a detached field). `.labels` is often
    // empty here, hence the fallback.
    const root = LabelScraperService._root(element);
    const forLabel = LabelScraperService._labelForField(root, element);
    if (forLabel) {
      const text = PageScraperHelpers.textWithoutFields(forLabel);
      if (LabelScraperService._hasText(text)) {
        return text;
      }
    }

    // Wrapping `<label>` ancestor, piercing shadow boundaries on the way up. Final source: no
    // emptiness guard needed since `_clean` blanks a whitespace result and the cascade moves on.
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
    for (const attr of LABEL_FOR_ATTRS) {
      const value = element.getAttribute(attr);
      if (!value) {
        continue;
      }
      const match = root.querySelector(`label[for="${LabelScraperService._cssEscape(value)}"]`);
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
        if (LabelScraperService._isBoundary(sibling)) {
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
    if (LabelScraperService._hasText(ariaLabel)) {
      return ariaLabel;
    }

    const labelledBy = element.getAttribute("aria-labelledby");
    if (labelledBy) {
      return LabelScraperService._resolveIdRefs(element, labelledBy);
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
        const text = PageScraperHelpers.textWithoutFields(current);
        if (LabelScraperService._hasText(text)) {
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
   * @returns {{describedBy: string, hidden: boolean, disabled: boolean, hasPopup: boolean|string}} The captured state.
   */
  static _ariaState(element) {
    const describedBy = element.getAttribute("aria-describedby");

    return {
      describedBy: describedBy
        ? LabelScraperService._clean(LabelScraperService._resolveIdRefs(element, describedBy))
        : "",
      hidden: LabelScraperService._ariaBoolean(element, "aria-hidden"),
      disabled: LabelScraperService._ariaBoolean(element, "aria-disabled"),
      hasPopup: LabelScraperService._ariaToken(element, "aria-haspopup"),
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
    const root = LabelScraperService._root(element);

    return idRefs
      .split(/\s+/)
      .filter(Boolean)
      .map((id) => {
        const target = LabelScraperService._byId(root, id);
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

    return root.querySelector(`#${LabelScraperService._cssEscape(id)}`);
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
    // An absent, empty (`aria-haspopup` / `aria-haspopup=""`) or "false" token all mean "no popup" per
    // WAI-ARIA, so they collapse to the boolean `false` rather than leaking an empty string downstream.
    if (value === null || value === "" || value === "false") {
      return false;
    }
    if (value === "true") {
      return true;
    }

    return value;
  }

  /**
   * The field's own root, used to scope `for=` and IDREF lookups. Deliberately not
   * {@link ShadowDomQueryService.scopeRoot}: for a detached field that helper falls back to the live
   * `document`, which would resolve a `for=` / `aria-labelledby` against an unrelated element elsewhere
   * on the page. `getRootNode()` keeps a detached field scoped to its own subtree, so nothing leaks in.
   * @private
   * @param {Element} element The field element.
   * @returns {Node} The field's root node (Document, ShadowRoot, DocumentFragment, or the field itself).
   */
  static _root(element) {
    return element.getRootNode();
  }

  /**
   * Whether raw scraped text carries anything beyond control/whitespace characters. Used by the tiers
   * for intra-tier fallthrough: it lets a whitespace-only candidate (an empty native `<label>`, a
   * blank `aria-label`, a `for=` target with no text) skip to the tier's next source instead of
   * short-circuiting it. Kept distinct from {@link LabelScraperService._clean}, which owns the final
   * normalisation of the value that leaves the scraper — tiers themselves return raw text.
   * @private
   * @param {*} text The raw candidate text (null-safe).
   * @returns {boolean} true when normalisation leaves non-empty text.
   */
  static _hasText(text) {
    return TextNormalizer.normalize(text) !== "";
  }

  /**
   * Normalise scraped text and cap it at {@link MAX_SCRAPED_STRING_LENGTH}. The single normalisation
   * boundary of the scraper: applied once per outward-facing value — the elected label in
   * {@link LabelScraperService._electLabel} and the `describedBy` state in {@link LabelScraperService._ariaState} —
   * never inside a tier, so the tiers stay free to return raw text.
   * @private
   * @param {*} text The raw text (null-safe).
   * @returns {string} The cleaned, length-capped text.
   */
  static _clean(text) {
    const normalized = TextNormalizer.normalize(text);
    if (normalized.length <= MAX_SCRAPED_STRING_LENGTH) {
      return normalized;
    }

    // Cap on code points, not UTF-16 code units, so an astral character (emoji, rare CJK…) straddling
    // the limit is never split into a lone, invalid surrogate at the tail of the label.
    return Array.from(normalized).slice(0, MAX_SCRAPED_STRING_LENGTH).join("");
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

export default LabelScraperService;
