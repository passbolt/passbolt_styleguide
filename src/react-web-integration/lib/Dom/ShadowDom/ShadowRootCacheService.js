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

class ShadowRootCacheService {
  /**
   * We use a WeakMap to store the shadow roots of a given root. This allows us to avoid memory leaks.
   * It is not intended to be mutated outside of this class.
   * @private
   * @type {WeakMap<Document|ShadowRoot|Element, ShadowRoot[]>}
   */
  static _shadowRootsCache = new WeakMap();

  /**
   * Return the shadow roots under `element`
   * If the values were already computed, return the cached value.
   * @param {Document|ShadowRoot|Element} element
   * @return {Array<ShadowRoot>}
   */
  static getCachedShadowRoots(element) {
    let shadowRoots = ShadowRootCacheService._shadowRootsCache.get(element);

    if (!shadowRoots) {
      shadowRoots = ShadowRootCollectorService.collectShadowRoots(element);
      ShadowRootCacheService._shadowRootsCache.set(element, shadowRoots);
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
    ShadowRootCacheService._shadowRootsCache.delete(element);
  }
}

export default ShadowRootCacheService;
