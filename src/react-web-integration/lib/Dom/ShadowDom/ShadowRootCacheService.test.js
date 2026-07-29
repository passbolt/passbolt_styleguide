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
import ShadowRootCollectorService from "./ShadowRootCollectorService";
import ShadowMutationObserverService from "./ShadowMutationObserverService";

describe("ShadowRootCacheService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("ShadowRootCacheService::getCachedShadowRoots", () => {
    it("should collect and cache the shadow roots when there is no cache entry", () => {
      expect.assertions(4);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const collectSpy = jest.spyOn(ShadowRootCollectorService, "collectShadowRoots").mockReturnValue([shadowRoot]);

      const result = ShadowRootCacheService.getCachedShadowRoots(document);

      expect(result).toEqual([shadowRoot]);
      expect(collectSpy).toHaveBeenCalledWith(document);
      expect(ShadowRootCacheService._shadowRootsCache.get(document)).toBe(result);
      expect(ShadowMutationObserverService.observeShadowRootChanges).toHaveBeenCalledWith(document);
    });

    it("should return the cached shadow roots", () => {
      expect.assertions(5);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const collectSpy = jest.spyOn(ShadowRootCollectorService, "collectShadowRoots").mockReturnValue([shadowRoot]);

      const first = ShadowRootCacheService.getCachedShadowRoots(document);
      const second = ShadowRootCacheService.getCachedShadowRoots(document);

      expect(first.length).toEqual(1);
      expect(first[0]).toBe(shadowRoot);
      expect(second).toBe(first);
      expect(collectSpy).toHaveBeenCalledTimes(1);
      expect(ShadowMutationObserverService.observeShadowRootChanges).toHaveBeenCalledTimes(1);
    });

    it("should cache empty results", () => {
      expect.assertions(2);

      const collectSpy = jest.spyOn(ShadowRootCollectorService, "collectShadowRoots").mockReturnValue([]);

      ShadowRootCacheService.getCachedShadowRoots(document);
      const result = ShadowRootCacheService.getCachedShadowRoots(document);

      expect(result).toEqual([]);
      expect(collectSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("ShadowRootCacheService::peekCache", () => {
    it("should return undefined for an element that was never cached", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      expect(ShadowRootCacheService.peekCache(host)).toBeUndefined();
    });

    it("should return the cached shadow roots for a cached element", () => {
      expect.assertions(3);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      ShadowRootCacheService._shadowRootsCache.set(document, [shadowRoot]);

      const cache = ShadowRootCacheService.peekCache(document);
      expect(cache.length).toEqual(1);
      expect(cache[0]).toBe(shadowRoot);
      expect(ShadowRootCacheService.peekCache(document)).toEqual([shadowRoot]);
    });
  });

  describe("ShadowRootCacheService::setCache", () => {
    it("should directly set the cache", () => {
      expect.assertions(2);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      ShadowRootCacheService.setCache(document, [shadowRoot]);

      const cache = ShadowRootCacheService._shadowRootsCache.get(document);
      expect(cache.length).toEqual(1);
      expect(cache[0]).toBe(shadowRoot);
    });
  });

  describe("ShadowRootCacheService::invalidate", () => {
    it("should delete the cache entry for an element", () => {
      expect.assertions(4);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });

      expect(ShadowRootCacheService._shadowRootsCache.get(document)).toBeUndefined();

      ShadowRootCacheService._shadowRootsCache.set(document, [shadowRoot]);
      const cache = ShadowRootCacheService._shadowRootsCache.get(document);
      expect(cache.length).toEqual(1);
      expect(cache[0]).toBe(shadowRoot);

      ShadowRootCacheService.invalidate(document);

      expect(ShadowRootCacheService._shadowRootsCache.get(document)).toBeUndefined();
    });
  });
});
