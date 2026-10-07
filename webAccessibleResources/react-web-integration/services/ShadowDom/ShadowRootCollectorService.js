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

import ShadowRootResolverService from "./ShadowRootResolverService";
import { IGNORED_SUBTREES } from "./ShadowDomDictionary";

class ShadowRootCollectorService {
  /**
   * Host element for every shadow root we have ever collected.
   * @private
   * @type {WeakMap<ShadowRoot, Element>}
   */
  static _hostByShadowRoot = new WeakMap();

  /**
   * Return the host element captured for a shadow root at collection time, or `undefined` if unknown.
   * Safe to call on a root whose host is gone: it never touches `shadowRoot.host`.
   * @param {ShadowRoot} shadowRoot
   * @return {Element|undefined}
   */
  static getHost(shadowRoot) {
    return ShadowRootCollectorService._hostByShadowRoot.get(shadowRoot);
  }

  /**
   * Find the shadow roots contained in `element` and its descendants
   *
   * @param {Document|ShadowRoot|Element} element The element to search for shadow roots in.
   * @param {Set<ShadowRoot>} seen Already known roots to avoid duplication
   * @return {Array<ShadowRoot>} The found shadow roots
   */
  static collectShadowRoots(element, seen = new Set()) {
    const shadowRoots = [];

    if (!IGNORED_SUBTREES.has(element.nodeName)) {
      // Try to resolve the shadow root of the element itself.
      // We consider that if `element` IS a shadow root, it is already known.
      // Also, if it is a document, there is no direct shadow root to resolve.
      if (element.nodeType === Node.ELEMENT_NODE) {
        ShadowRootCollectorService._collect(element, seen, shadowRoots);
      }

      // Walk the DOM to find all elements that may contain shadow roots
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, (child) =>
        IGNORED_SUBTREES.has(child.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
      );

      // For each accepted element, try to resolve its shadow root and add it to the list if it's not already
      while (walker.nextNode()) {
        ShadowRootCollectorService._collect(walker.currentNode, seen, shadowRoots);
      }
    }

    return shadowRoots;
  }

  /**
   * Find `element`'s shadow root and record it (along with `element` as its host) and push it in `shadowRoots`.
   * @private
   * @param {Element} element The candidate host element.
   * @param {Set<ShadowRoot>} seen Already known roots to avoid duplication.
   * @param {ShadowRoot[]} shadowRoots The accumulator to push newly found roots into.
   * @return {void}
   */
  static _collect(element, seen, shadowRoots) {
    const shadowRoot = ShadowRootResolverService.resolveShadowRoot(element);
    if (shadowRoot && !seen.has(shadowRoot)) {
      seen.add(shadowRoot);
      ShadowRootCollectorService._hostByShadowRoot.set(shadowRoot, element);
      shadowRoots.push(shadowRoot);
    }
  }
}

export default ShadowRootCollectorService;
