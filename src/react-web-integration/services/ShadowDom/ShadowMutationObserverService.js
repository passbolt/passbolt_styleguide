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
import ShadowRootCacheService from "./ShadowRootCacheService";
import { OBSERVE_OPTIONS } from "./ShadowDomDictionary";

class ShadowMutationObserverService {
  /**
   * Mapping between roots and observers.
   * Not intended to be mutated outside of this class.
   * @private
   * @type {WeakMap<Document|ShadowRoot|Element, MutationObserver>}
   */
  static _shadowRootsObservers = new WeakMap();

  /**
   * Mutation subscribers list.
   * Not intended to be mutated outside of this class.
   * @private
   * @type {Set<Function>}
   */
  static _shadowMutationSubscribers = new Set();

  /**
   * Update the cache for `root` according to the given mutations.
   * @param {Document|ShadowRoot|Element} root
   * @param {MutationRecord[]} mutations
   * @return {boolean} true when the root's children changed.
   */
  static applyIncrementalMutationsToCache(root, mutations) {
    // Get the shadow root cache for the given root
    const cached = ShadowRootCacheService.peekCache(root);
    if (!cached) {
      return false;
    }

    let foundRoots;
    // Filter out shadow roots whose host was removed
    let hasRemovals = mutations.some((mutation) => mutation.removedNodes.length > 0);
    if (hasRemovals) {
      foundRoots = cached.filter((shadowRoot) => shadowRoot.host && root.contains(shadowRoot.host));
      // We reuse this flag to indicate whether we actually removed any roots
      hasRemovals = foundRoots.length < cached.length;
    } else {
      foundRoots = [...cached];
    }

    // Detect new shadow roots from added elements
    const seenRoots = new Set(foundRoots);
    mutations.forEach((mutation) => {
      const addedRoots = Array.from(mutation.addedNodes).reduce((acc, addedNode) => {
        if (addedNode.nodeType === Node.ELEMENT_NODE) {
          acc.push(...ShadowRootCollectorService.collectShadowRoots(addedNode, seenRoots));
        }

        return acc;
      }, []);

      foundRoots.push(...addedRoots);
    });

    const rootsChanged = hasRemovals || foundRoots.length > cached.length;

    // Update cache in case of new shadow roots or removals
    if (rootsChanged) {
      ShadowRootCacheService.setCache(root, foundRoots);
    }

    return rootsChanged;
  }

  /**
   * Register a subscriber to the shadow root mutations
   * @param {(root: Document|ShadowRoot|Element, mutations: MutationRecord[], shadowRootsChanged: boolean) => void} callback
   * @return {() => void} unsubscribe closure — must be called in the consumer's teardown.
   */
  static subscribeToShadowMutations(callback) {
    ShadowMutationObserverService._shadowMutationSubscribers.add(callback);
    return () => ShadowMutationObserverService._shadowMutationSubscribers.delete(callback);
  }

  /**
   * Notify every subscriber
   * @param {Document|ShadowRoot|Element} root
   * @param {MutationRecord[]} mutations
   * @param {boolean} shadowRootsChanged
   */
  static notifyShadowMutationSubscribers(root, mutations, shadowRootsChanged) {
    for (const callback of ShadowMutationObserverService._shadowMutationSubscribers) {
      try {
        callback(root, mutations, shadowRootsChanged);
      } catch (error) {
        console.warn("ShadowMutationObserverService shadow-mutation subscriber threw", error);
      }
    }
  }

  /**
   * Set up a MutationObserver on `root` to update the cache and inform the subscribers.
   * If a `root` is already being observed, nothing happens.
   * @param {Document|ShadowRoot|Element} root The root to observe
   */
  static observeShadowRootChanges(root) {
    if (ShadowMutationObserverService._shadowRootsObservers.has(root)) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      const shadowRootsChanged = ShadowMutationObserverService.applyIncrementalMutationsToCache(root, mutations);
      ShadowMutationObserverService.notifyShadowMutationSubscribers(root, mutations, shadowRootsChanged);
    });

    observer.observe(root, OBSERVE_OPTIONS);
    ShadowMutationObserverService._shadowRootsObservers.set(root, observer);
  }

  /**
   * Disconnect and delete the observer installed on `root`, if any.
   * @param {Document|ShadowRoot|Element} root The observed root to stop observing.
   */
  static disconnectObserver(root) {
    const observer = ShadowMutationObserverService._shadowRootsObservers.get(root);

    if (observer) {
      observer.disconnect();
      ShadowMutationObserverService._shadowRootsObservers.delete(root);
    }
  }
}

export default ShadowMutationObserverService;
