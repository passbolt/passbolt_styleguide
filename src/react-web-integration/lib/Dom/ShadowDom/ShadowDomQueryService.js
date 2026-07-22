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

import ShadowRootCacheService from "./ShadowRootCacheService";
import { MAX_PIERCE_DEPTH } from "./ShadowDomDictionary";

class ShadowDomQueryService {
  /**
   * querySelectorAll recursive call applied to all the shadow roots of the page, based on ShadowRootCacheService.
   * @param {Document|ShadowRoot|Element} root The root to query from.
   * @param {string} selector The selector to match elements against.
   * @return {Element[]} The matching elements.
   */
  static querySelectorAllDeep(root, selector) {
    const matches = Array.from(root.querySelectorAll(selector));

    const shadowRoots = ShadowRootCacheService.getCachedShadowRoots(root);
    for (const shadowRoot of shadowRoots) {
      matches.push(...ShadowDomQueryService.querySelectorAllDeep(shadowRoot, selector));
    }

    return matches;
  }

  /**
   * Check if an ancestor (including shadow roots) of `element` matches the given selector.
   * @param {Element} element The element from which to start the search.
   * @param {string} selector The selector.
   * @param {{matchDescendants?: boolean}} options matchDescendants: also search downwards (including shadow roots)
   * @return {boolean}
   */
  static hasAncestorMatchingDeep(element, selector, options = { matchDescendants: false }) {
    let parent = element;

    // Iterate through the DOM tree upwards until we find a match or reach the top
    do {
      parent = parent instanceof ShadowRoot ? parent.host : parent?.parentNode;
    } while (parent && (parent.nodeType !== Node.ELEMENT_NODE || !parent.matches(selector)));

    // If `parent` is not defined, then we reached the top of the DOM tree without finding a match
    // So we look downwards if the option is set
    if (!parent && options.matchDescendants) {
      parent = ShadowDomQueryService.querySelectorAllDeep(element, selector).length > 0;
    }

    return Boolean(parent);
  }

  /**
   * Find the root of an element.
   * @param {Element} element The element to find the root of.
   * @return {ShadowRoot|Document} The ShadowRoot or the Document that contains the element.
   */
  static scopeRoot(element) {
    const root = element?.getRootNode();
    return root instanceof ShadowRoot || root instanceof Document ? root : document;
  }

  /**
   * Find the parent *element* of a given element, crossing shadow boundaries.
   * @param {Element} element The element to find the parent of
   * @return {Document|Element|null} The parent element
   */
  static shadowPiercingParentElement(element) {
    let parent = null;

    if (element.assignedSlot) {
      // Web component
      parent = element.assignedSlot;
    } else if (element.parentElement) {
      // Standard DOM
      parent = element.parentElement;
    } else {
      // Shadow DOM
      parent = ShadowDomQueryService.scopeRoot(element);
      if (parent instanceof ShadowRoot) {
        parent = parent.host;
      } else if (parent instanceof Document) {
        parent = null;
      }
    }

    return parent;
  }

  /**
   * Build the composed ancestors chain of an element (starting with the element itself), crossing
   * shadow boundaries. Guarded against cycles and capped by MAX_PIERCE_DEPTH.
   * @param {Element} element
   * @return {Element[]}
   */
  static piercingAncestors(element) {
    const ancestors = new Set();

    let current = element;
    if (current?.nodeType === Node.ELEMENT_NODE) {
      let depth = 0;

      do {
        depth++;
        ancestors.add(current);
        current = ShadowDomQueryService.shadowPiercingParentElement(current);
      } while (
        current &&
        current.nodeType === Node.ELEMENT_NODE &&
        !ancestors.has(current) &&
        depth < MAX_PIERCE_DEPTH
      );
    }

    return Array.from(ancestors);
  }

  /**
   * Return the nearest ancestor matching the selector.
   * @param {Element} element The element to start from.
   * @param {string} selector The selector to match ancestors against.
   * @return {Element|null}
   */
  static closestDeep(element, selector) {
    return ShadowDomQueryService.piercingAncestors(element).find((ancestor) => ancestor.matches(selector)) ?? null;
  }
}

export default ShadowDomQueryService;
