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
   * Check if the node is an element.
   * @param {Node} node The node to check
   * @returns {boolean} true if the node is an element
   */
  static isElement = (node) => node?.nodeType === Node.ELEMENT_NODE;

  /**
   * Check if the node is a document.
   * @param {Node} node The node to check
   * @returns {boolean} true if the node is a document
   */
  static isDocument = (node) => node?.nodeType === Node.DOCUMENT_NODE;

  /**
   * Check if the node is a shadow root.
   * @param {Node} node The node to check
   * @returns {boolean} true if the node is a shadow root
   */
  static isShadowRoot = (node) => node?.nodeType === Node.DOCUMENT_FRAGMENT_NODE && Boolean(node.host);

  /**
   * querySelectorAll recursive call applied to all the shadow roots of the page, based on ShadowRootCacheService.
   * @param {Document|ShadowRoot|Element} root The root to query from.
   * @param {string} selector The selector to match elements against.
   * @return {Element[]} The matching elements.
   */
  static querySelectorAllDeep(root, selector) {
    const matches = Array.from(root.querySelectorAll(selector));

    for (const shadowRoot of ShadowRootCacheService.getCachedShadowRoots(root)) {
      matches.push(...ShadowDomQueryService.querySelectorAllDeep(shadowRoot, selector));
    }

    return matches;
  }

  /**
   * Check if `node` is `ancestor` or one of its descendants, through shadow dom boundaries.
   * @param {Document|ShadowRoot|Element} ancestor The containing candidate.
   * @param {Node} node The node to look for.
   * @return {boolean} true if `ancestor` contains `node`.
   */
  static containsDeep(ancestor, node) {
    if (ancestor === node || ancestor.contains(node)) {
      return true;
    }

    return ShadowRootCacheService.getCachedShadowRoots(ancestor).some((shadowRoot) =>
      ShadowDomQueryService.containsDeep(shadowRoot, node),
    );
  }

  /**
   * Check if an ancestor (including shadow roots) of `element` matches the given selector.
   * @param {Element} element The element from which to start the search.
   * @param {string} selector The selector.
   * @return {boolean}
   */
  static hasAncestorMatchingDeep(element, selector) {
    let parent = element;

    // Iterate through the DOM tree upwards until we find a match or reach the top
    do {
      parent = ShadowDomQueryService.isShadowRoot(parent) ? parent.host : parent?.parentNode;
    } while (parent && (!ShadowDomQueryService.isElement(parent) || !parent.matches(selector)));

    return Boolean(parent);
  }

  /**
   * The deepest active element, descending through open shadow roots and same-origin iframes.
   *
   * `document.activeElement` only exposes the outermost DOM elements: it reports the host for a focus
   * held inside a shadow root, and the frame element for a focus held inside an iframe. Both are
   * walked down here so a field served in a same-origin iframe — a supported scenario, page
   * classification walks those documents — is recognised as focused like any other.
   * @return {Element|null} The deepest focused element or `document.activeElement` when not nested.
   */
  static deepActiveElement() {
    let active = document?.activeElement ?? null;

    for (let depth = 0; depth < MAX_PIERCE_DEPTH; depth++) {
      const nested = active?.shadowRoot?.activeElement ?? ShadowDomQueryService.frameActiveElement(active);
      if (!nested) {
        return active;
      }
      active = nested;
    }

    return active;
  }

  /**
   * The element holding focus inside a frame, when the given element is a frame we can reach into.
   * @param {Element} element The candidate frame element.
   * @return {Element|null} The focused element inside the frame, or null when there is no descent to make.
   */
  static frameActiveElement(element) {
    if (element?.tagName !== "IFRAME" && element?.tagName !== "FRAME") {
      return null;
    }

    // Null when the frame has no content document, and when it is not same origin-domain: nothing to descend into.
    const contentDocument = element.contentDocument;

    const active = contentDocument?.activeElement ?? null;
    return active && active !== contentDocument.body && active !== contentDocument.documentElement ? active : null;
  }

  /**
   * Find the root of an element.
   * @param {Element} element The element to find the root of.
   * @return {ShadowRoot|Document} The ShadowRoot or the Document that contains the element.
   */
  static scopeRoot(element) {
    const root = element?.getRootNode();
    return ShadowDomQueryService.isDocument(root) || ShadowDomQueryService.isShadowRoot(root) ? root : document;
  }

  /**
   * Find the parent *element* of a given element, crossing shadow boundaries.
   * @param {Element} element The element to find the parent of
   * @return {Document|Element|null} The parent element
   */
  static shadowPiercingParentElement(element) {
    if (element.assignedSlot) {
      // Web component
      return element.assignedSlot;
    }

    if (element.parentElement) {
      // Standard DOM
      return element.parentElement;
    }

    // Shadow DOM
    const root = ShadowDomQueryService.scopeRoot(element);
    return ShadowDomQueryService.isShadowRoot(root) ? root.host : null;
  }

  /**
   * Build the ancestors chain of an element (starting with the element itself), crossing shadow boundaries.
   * @param {Element} element
   * @return {Element[]}
   */
  static piercingAncestors(element) {
    const ancestors = new Set();

    let current = element;
    if (ShadowDomQueryService.isElement(current)) {
      let depth = 0;

      do {
        depth++;
        ancestors.add(current);
        current = ShadowDomQueryService.shadowPiercingParentElement(current);
      } while (ShadowDomQueryService.isElement(current) && !ancestors.has(current) && depth < MAX_PIERCE_DEPTH);
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
