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

import ShadowMutationObserverService from "./ShadowMutationObserverService";
import ShadowRootCacheService from "./ShadowRootCacheService";

describe("ShadowMutationObserverService", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    ShadowMutationObserverService._shadowRootsObservers = new WeakMap();
    ShadowMutationObserverService._shadowMutationSubscribers = new Set();

    document.body.innerHTML = "";
  });

  describe("ShadowMutationObserverService::applyIncrementalMutationsToCache", () => {
    it("should return false when the root has no cache entry", () => {
      expect.assertions(1);

      const root = document.createElement("div");

      expect(ShadowMutationObserverService.applyIncrementalMutationsToCache(root, [])).toBe(false);
    });

    it("should append shadow roots discovered in the added nodes", () => {
      expect.assertions(2);

      const root = document.createElement("div");
      document.body.appendChild(root);
      ShadowRootCacheService.setCache(root, []);
      const child = document.createElement("div");
      const childRoot = child.attachShadow({ mode: "open" });
      root.appendChild(child);

      const result = ShadowMutationObserverService.applyIncrementalMutationsToCache(root, [
        { addedNodes: [child], removedNodes: [] },
      ]);

      expect(result).toBe(true);
      expect(ShadowRootCacheService.peekCache(root)).toEqual([childRoot]);
    });

    it("should ignore non-element added nodes", () => {
      expect.assertions(2);

      const root = document.createElement("div");
      document.body.appendChild(root);
      ShadowRootCacheService.setCache(root, []);
      const textNode = document.createTextNode("hello");

      const result = ShadowMutationObserverService.applyIncrementalMutationsToCache(root, [
        { addedNodes: [textNode], removedNodes: [] },
      ]);

      expect(result).toBe(false);
      expect(ShadowRootCacheService.peekCache(root)).toEqual([]);
    });

    it("should drop cached hosts that are no longer attached under the root", () => {
      expect.assertions(2);

      const root = document.createElement("div");
      document.body.appendChild(root);
      const orphanHost = document.createElement("div");
      const orphanRoot = orphanHost.attachShadow({ mode: "open" });
      ShadowRootCacheService.setCache(root, [orphanRoot]);

      const result = ShadowMutationObserverService.applyIncrementalMutationsToCache(root, [
        { addedNodes: [], removedNodes: [orphanHost] },
      ]);

      expect(result).toBe(true);
      expect(ShadowRootCacheService.peekCache(root)).toEqual([]);
    });

    it("should not append shadow roots already present in the cache", () => {
      expect.assertions(2);

      const root = document.createElement("div");
      document.body.appendChild(root);
      const child = document.createElement("div");
      const childRoot = child.attachShadow({ mode: "open" });
      root.appendChild(child);
      ShadowRootCacheService.setCache(root, [childRoot]);

      const result = ShadowMutationObserverService.applyIncrementalMutationsToCache(root, [
        { addedNodes: [child], removedNodes: [] },
      ]);

      expect(result).toBe(false);
      expect(ShadowRootCacheService.peekCache(root)).toEqual([childRoot]);
    });

    it("should not mutate the previously cached array in place (copy-on-write)", () => {
      expect.assertions(3);

      const root = document.createElement("div");
      document.body.appendChild(root);
      const existingHost = document.createElement("div");
      const existingRoot = existingHost.attachShadow({ mode: "open" });
      root.appendChild(existingHost);
      const original = [existingRoot];
      ShadowRootCacheService.setCache(root, original);
      const newChild = document.createElement("div");
      newChild.attachShadow({ mode: "open" });
      root.appendChild(newChild);

      ShadowMutationObserverService.applyIncrementalMutationsToCache(root, [
        { addedNodes: [newChild], removedNodes: [] },
      ]);

      expect(original).toHaveLength(1);
      expect(ShadowRootCacheService.peekCache(root)).not.toBe(original);
      expect(ShadowRootCacheService.peekCache(root)).toHaveLength(2);
    });
  });

  describe("ShadowMutationObserverService::subscribeToShadowMutations", () => {
    it("should register the callback in the subscribers set", () => {
      expect.assertions(1);

      const callback = jest.fn();

      ShadowMutationObserverService.subscribeToShadowMutations(callback);

      expect(ShadowMutationObserverService._shadowMutationSubscribers.has(callback)).toBe(true);
    });

    it("should remove the callback from the subscribers set when the returned closure is called", () => {
      expect.assertions(1);

      const callback = jest.fn();
      const unsubscribe = ShadowMutationObserverService.subscribeToShadowMutations(callback);

      unsubscribe();

      expect(ShadowMutationObserverService._shadowMutationSubscribers.has(callback)).toBe(false);
    });
  });

  describe("ShadowMutationObserverService::notifyShadowMutationSubscribers", () => {
    it("should invoke every registered subscriber with the mutation batch", () => {
      expect.assertions(1);

      const root = document.createElement("div");
      const mutations = [{ addedNodes: [], removedNodes: [] }];
      const callback = jest.fn();
      ShadowMutationObserverService._shadowMutationSubscribers.add(callback);

      ShadowMutationObserverService.notifyShadowMutationSubscribers(root, mutations, true);

      expect(callback).toHaveBeenCalledWith(root, mutations, true);
    });

    it("should isolate a throwing subscriber so the others still run", () => {
      expect.assertions(2);

      jest.spyOn(console, "warn").mockImplementation();
      const root = document.createElement("div");
      const throwingCallback = jest.fn(() => {
        throw new Error("boom");
      });
      const goodCallback = jest.fn();
      ShadowMutationObserverService._shadowMutationSubscribers.add(throwingCallback);
      ShadowMutationObserverService._shadowMutationSubscribers.add(goodCallback);

      expect(() => ShadowMutationObserverService.notifyShadowMutationSubscribers(root, [], false)).not.toThrow();
      expect(goodCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe("ShadowMutationObserverService::observeShadowRootChanges", () => {
    it("should install an observer that forwards batches to the cache update and the subscribers", () => {
      expect.assertions(3);

      let capturedCallback;
      const observeMock = jest.fn();
      jest.spyOn(window, "MutationObserver").mockImplementation((callback) => {
        capturedCallback = callback;
        return { observe: observeMock, disconnect: jest.fn() };
      });
      const root = document.createElement("div");
      const applySpy = jest
        .spyOn(ShadowMutationObserverService, "applyIncrementalMutationsToCache")
        .mockReturnValue(true);
      const notifySpy = jest
        .spyOn(ShadowMutationObserverService, "notifyShadowMutationSubscribers")
        .mockImplementation();

      ShadowMutationObserverService.observeShadowRootChanges(root);

      expect(observeMock).toHaveBeenCalledWith(
        root,
        expect.objectContaining({
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: expect.any(Array),
        }),
      );

      const mutations = [{ addedNodes: [], removedNodes: [] }];
      capturedCallback(mutations);

      expect(applySpy).toHaveBeenCalledWith(root, mutations);
      expect(notifySpy).toHaveBeenCalledWith(root, mutations, true);
    });

    it("should install an observer that watches the attributes", () => {
      expect.assertions(2);

      const observeMock = jest.fn();
      jest
        .spyOn(window, "MutationObserver")
        .mockImplementation(() => ({ observe: observeMock, disconnect: jest.fn() }));
      const root = document.createElement("div");

      ShadowMutationObserverService.observeShadowRootChanges(root);

      const [, options] = observeMock.mock.calls[0];
      expect(options.attributes).toBe(true);
      expect(options.attributeFilter).toContain("type");
    });

    it("should install at most one observer per root", () => {
      expect.assertions(1);

      const observerSpy = jest
        .spyOn(window, "MutationObserver")
        .mockImplementation(() => ({ observe: jest.fn(), disconnect: jest.fn() }));
      const root = document.createElement("div");

      ShadowMutationObserverService.observeShadowRootChanges(root);
      ShadowMutationObserverService.observeShadowRootChanges(root);

      expect(observerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("ShadowMutationObserverService::disconnectObserver", () => {
    it("should disconnect and forget the observer of a root", () => {
      expect.assertions(2);

      const disconnectMock = jest.fn();
      jest
        .spyOn(window, "MutationObserver")
        .mockImplementation(() => ({ observe: jest.fn(), disconnect: disconnectMock }));
      const root = document.createElement("div");

      ShadowMutationObserverService.observeShadowRootChanges(root);
      ShadowMutationObserverService.disconnectObserver(root);

      expect(disconnectMock).toHaveBeenCalledTimes(1);
      expect(ShadowMutationObserverService._shadowRootsObservers.has(root)).toBe(false);
    });

    it("should do nothing for a root that is not observed", () => {
      expect.assertions(1);

      const root = document.createElement("div");

      expect(() => ShadowMutationObserverService.disconnectObserver(root)).not.toThrow();
    });
  });
});
