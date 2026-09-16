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

import ShadowRootCollectorService from "./ShadowRootCollectorService";
import ShadowMutationObserverService from "./ShadowMutationObserverService";

class ShadowRootCacheService {
  /**
   * We use a WeakMap to store the shadow roots of a given root.
   * It is not intended to be mutated outside of this class.
   * @private
   * @type {WeakMap<Document|ShadowRoot|Element, ShadowRoot[]>}
   */
  static _shadowRootsCache = new WeakMap();

  /**
   * Find the shadow roots under `element` and put them in the cache
   * @param {Document|ShadowRoot|Element} element
   * @return {Array<ShadowRoot>}
   */
  static initCachedShadowRoots(element) {
    const shadowRoots = ShadowRootCollectorService.collectShadowRoots(element);
    ShadowRootCacheService._shadowRootsCache.set(element, shadowRoots);

    // Initialize the mutation observer on the element
    ShadowMutationObserverService.observeShadowRootChanges(element);

    return shadowRoots;
  }

  /**
   * Return the shadow roots under `element`:
   * - the cached ones for a document or a shadow root,
   * - the ones of its scope whose host it contains for an element.
   *
   * @param {Document|ShadowRoot|Element} element
   * @return {Array<ShadowRoot>}
   */
  static getCachedShadowRoots(element) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      // An element keeps no cache and no observer
      const root = element.getRootNode();
      const scope = root.nodeType === Node.DOCUMENT_NODE || root.host ? root : document;

      return ShadowRootCacheService.getCachedShadowRoots(scope).filter((shadowRoot) => {
        const host = ShadowRootCollectorService.getHost(shadowRoot);
        return Boolean(host) && element.contains(host);
      });
    }

    let shadowRoots = ShadowRootCacheService.peekCache(element);

    if (!shadowRoots) {
      shadowRoots = ShadowRootCacheService.initCachedShadowRoots(element);
    }

    return shadowRoots;
  }

  /**
   * Get the cached shadow roots for an element, if any
   * @param {Document|ShadowRoot|Element} element
   * @return {ShadowRoot[] | undefined}
   */
  static peekCache(element) {
    return ShadowRootCacheService._shadowRootsCache.get(element);
  }

  /**
   * Set the cached shadow roots for an element
   * @param {Document|ShadowRoot|Element} element
   * @param {ShadowRoot[]} newShadowRoots
   */
  static setCache(element, newShadowRoots) {
    ShadowRootCacheService._shadowRootsCache.set(element, newShadowRoots);
  }

  /**
   * Delete the cache entry for an element.
   * @param {Document|ShadowRoot|Element} element
   */
  static invalidate(element) {
    ShadowMutationObserverService.disconnectObserver(element);
    ShadowRootCacheService._shadowRootsCache.delete(element);
  }
}

export default ShadowRootCacheService;
