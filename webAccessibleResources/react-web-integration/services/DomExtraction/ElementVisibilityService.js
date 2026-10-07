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
   * Whether an element is rendered AND occupies a meaningful surface. The size floor rejects 0x0 /
   * sub-pixel "ghost" masking fields. Use for fields; for page-level checks prefer {@link isElementRendered}.
   * @param {?Node} element The node to evaluate. Non-element nodes resolve to `false` (no throw).
   * @returns {boolean} `true` if the element is rendered and sized.
   */
  static isElementViewable(element) {
    return ElementVisibilityService.isElementRendered(element) && ElementVisibilityService.hasViewableSize(element);
  }

  /**
   * Whether an element is rendered (not hidden by CSS), WITHOUT any box-size requirement. Use for page-level
   * checks (<html>/<body>) that can be 0px while fully visible (fixed/absolute container, e.g. my.nutanix.com).
   * Ordered cheapest-rejection-first: `checkVisibility` → opacity.
   * @param {?Node} element The node to evaluate. Non-element nodes resolve to `false` (no throw).
   * @returns {boolean} `true` if the element is rendered, regardless of size.
   */
  static isElementRendered(element) {
    // `nodeType` is realm-agnostic (unlike `instanceof Element`) and optional chaining covers null.
    if (element?.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    // Rejects display:none, visibility:hidden/collapse, content-visibility and strict-0 opacity.
    const hasNativeCheck = typeof element.checkVisibility === "function";
    if (hasNativeCheck) {
      // Chrome 105 (`checkOpacity`/`checkVisibilityCSS`) and spec (`opacityProperty`/`visibilityProperty`)
      // flag names both passed; WebIDL drops unknown keys, so this stays correct on Chromium and Firefox.
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

    const style = getComputedStyle(element);

    // Legacy fallback: `checkVisibility` already covers display/visibility on the modern path.
    if (
      !hasNativeCheck &&
      (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse")
    ) {
      return false;
    }

    // Only reject a finite opacity below the threshold ("" / "auto" must not read as 0).
    const opacity = parseFloat(style.opacity);
    if (Number.isFinite(opacity) && opacity < OPACITY_VISIBILITY_THRESHOLD) {
      return false;
    }

    return true;
  }

  /**
   * Whether an element occupies a meaningful surface (rejects 0x0 / sub-pixel). Layout-triggering.
   * @param {Element} element
   * @returns {boolean}
   */
  static hasViewableSize(element) {
    const rect = element.getBoundingClientRect();
    return rect.width >= MIN_VIEWABLE_DIMENSION_PX && rect.height >= MIN_VIEWABLE_DIMENSION_PX;
  }
}

export default ElementVisibilityService;
