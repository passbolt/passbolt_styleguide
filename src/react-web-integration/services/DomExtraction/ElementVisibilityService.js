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
 * Opacity below which an element is treated as invisible. Only catches near-transparent opacity set
 * directly on the element (not on an ancestor wrapper). Mirrors `InFormManager`.
 * @type {number}
 */
export const OPACITY_VISIBILITY_THRESHOLD = 0.4;

/**
 * Minimum rendered size (CSS px) on either dimension. Rejects 0x0 and sub-pixel "ghost" masking fields.
 * @type {number}
 */
export const MIN_VIEWABLE_DIMENSION_PX = 1;

class ElementVisibilityService {
  /**
   * Determine whether a DOM element is rendered (not hidden by CSS and occupying a meaningful
   * surface). Read-only. Filters honeypots and hidden inputs before form analysis and autofill.
   *
   * Ordered cheapest-rejection-first: `checkVisibility` → opacity → `getBoundingClientRect`.
   * Note: point-in-time sample — does not track viewport, clipping/occlusion, nor mid-transition
   * opacity; callers must re-evaluate after `transitionend`/`animationend`.
   *
   * @param {?Node} element The node to evaluate. Non-element nodes resolve to `false` (no throw).
   * @returns {boolean} `true` if the element is rendered and sized.
   */
  static isElementViewable(element) {
    // Non-element nodes lack the style/layout APIs below. `nodeType` is realm-agnostic, unlike
    // `instanceof Element`; optional chaining also covers null/undefined.
    if (element?.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    // CSS visibility first: rejects display:none, visibility:hidden/collapse, content-visibility and
    // strict-0 opacity (element or ancestor) without resolving computed style.
    const hasNativeCheck = typeof element.checkVisibility === "function";
    if (hasNativeCheck) {
      // The opacity/visibility flags were renamed from the Chrome 105 names (`checkOpacity`/
      // `checkVisibilityCSS`) to the spec names (`opacityProperty`/`visibilityProperty`). WebIDL
      // drops unknown keys, so we pass both spellings to stay correct on Chromium and Firefox.
      const isVisible = element.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true,
        opacityProperty: true,
        visibilityProperty: true,
        contentVisibilityAuto: true,
      });
      if (!isVisible) {
        return false;
      }
    }

    // Resolved lazily (only after checkVisibility passes) and once: legacy needs display/visibility,
    // both paths need opacity.
    const style = getComputedStyle(element);

    // Legacy fallback (no `checkVisibility`): checkVisibility already covers these on the modern path.
    if (
      !hasNativeCheck &&
      (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse")
    ) {
      return false;
    }

    // Opacity is a string; only reject a finite value below the threshold (unparseable "" / "auto"
    // must not read as 0). See {@link OPACITY_VISIBILITY_THRESHOLD} for the self-borne-only scope.
    const opacity = parseFloat(style.opacity);
    if (Number.isFinite(opacity) && opacity < OPACITY_VISIBILITY_THRESHOLD) {
      return false;
    }

    // Layout-triggering, so deferred to last.
    const rect = element.getBoundingClientRect();
    return rect.width >= MIN_VIEWABLE_DIMENSION_PX && rect.height >= MIN_VIEWABLE_DIMENSION_PX;
  }
}

export default ElementVisibilityService;
