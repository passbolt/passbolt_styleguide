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

import ShadowDomFocusHealerService from "./ShadowDomFocusHealerService";
import ShadowRootCacheService from "./ShadowRootCacheService";
import ShadowMutationObserverService from "./ShadowMutationObserverService";

describe("ShadowDomFocusHealerService", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    jest.spyOn(document, "addEventListener").mockImplementation();
    jest.spyOn(ShadowRootCacheService, "invalidate").mockImplementation();
    jest.spyOn(ShadowMutationObserverService, "notifyShadowMutationSubscribers").mockImplementation();

    ShadowDomFocusHealerService._focusinHandler = null;

    document.body.innerHTML = "";
  });

  describe("ShadowDomFocusHealerService::installFocusinHealer", () => {
    it("should register a focusin listener on the document", () => {
      expect.assertions(1);

      ShadowDomFocusHealerService.installFocusinHealer();

      expect(document.addEventListener).toHaveBeenCalledWith("focusin", ShadowDomFocusHealerService._focusinHandler, {
        capture: true,
      });
    });

    it("should install the listener at most once", () => {
      expect.assertions(1);

      ShadowDomFocusHealerService.installFocusinHealer();
      ShadowDomFocusHealerService.installFocusinHealer();

      expect(document.addEventListener).toHaveBeenCalledTimes(1);
    });
  });

  describe("ShadowDomFocusHealerService::focusHandler", () => {
    let focusHandler;

    beforeEach(() => {
      ShadowDomFocusHealerService.installFocusinHealer();
      focusHandler = ShadowDomFocusHealerService._focusinHandler;
    });

    it("should not invalidate any cache nor trigger a rescan when the focused element is not a field", () => {
      expect.assertions(2);

      const div = document.createElement("div");

      focusHandler({ composedPath: () => [div, document.body, document] });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });

    it("should not invalidate any cache nor trigger a rescan when the focused element is not a field inside a shadow dom", () => {
      expect.assertions(2);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      shadowRoot.appendChild(div);
      document.body.appendChild(host);

      focusHandler({ composedPath: () => [div, shadowRoot, host, document.body, document] });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });

    it("should not invalidate any cache nor trigger a rescan when the focused field is outside a shadow dom", () => {
      expect.assertions(2);

      const input = document.createElement("input");

      focusHandler({ composedPath: () => [input, document.body, document] });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });

    it("should invalidate the parent scope and trigger a rescan when the focused field is inside a shadow dom", () => {
      expect.assertions(3);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);

      focusHandler({ composedPath: () => [input, shadowRoot, host, document.body, document] });

      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledTimes(1);
      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(document);
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledWith(document, [], true);
    });

    it("should invalidate the parent scope when the shadow root in the path is not an instance of ShadowRoot (cross-realm/isolated world)", () => {
      // In a content script's isolated world, nodes returned by composedPath() are not
      // necessarily `instanceof ShadowRoot`. The healer must rely on duck-typing, not `instanceof`.
      expect.assertions(3);

      const host = document.createElement("div");
      const input = document.createElement("input");
      document.body.appendChild(host);
      // A shadow-root-like node that duck-types as a shadow root but is NOT `instanceof ShadowRoot`.
      const crossRealmShadowRoot = { nodeType: Node.DOCUMENT_FRAGMENT_NODE, host };
      expect(crossRealmShadowRoot instanceof ShadowRoot).toBe(false);

      focusHandler({ composedPath: () => [input, crossRealmShadowRoot, host, document.body, document] });

      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(document);
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledWith(document, [], true);
    });

    it("should invalidate the parent scopes of late-attached nested roots", () => {
      expect.assertions(5);

      const outerHost = document.createElement("div");
      const outerRoot = outerHost.attachShadow({ mode: "open" });
      document.body.appendChild(outerHost);
      const innerHost = document.createElement("div");
      const innerRoot = innerHost.attachShadow({ mode: "open" });
      outerRoot.appendChild(innerHost);
      const input = document.createElement("input");
      innerRoot.appendChild(input);

      focusHandler({
        composedPath: () => [input, innerRoot, innerHost, outerRoot, outerHost, document.body, document],
      });

      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledTimes(2);
      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(outerRoot);
      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(document);
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledTimes(1);
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledWith(document, [], true);
    });

    it("should not invalidate when the focused field is inside a known shadow root", () => {
      expect.assertions(2);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);

      jest.spyOn(ShadowRootCacheService, "peekCache").mockReturnValue([shadowRoot]);

      focusHandler({ composedPath: () => [input, shadowRoot, host, document.body, document] });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });

    it("should invalidate the parent scope when its cache is populated but does not know the focused shadow root", () => {
      expect.assertions(2);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);
      const knownHost = document.createElement("div");
      const knownShadowRoot = knownHost.attachShadow({ mode: "open" });
      document.body.appendChild(knownHost);

      jest.spyOn(ShadowRootCacheService, "peekCache").mockReturnValue([knownShadowRoot]);

      focusHandler({ composedPath: () => [input, shadowRoot, host, document.body, document] });

      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(document);
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledWith(document, [], true);
    });

    it("should invalidate only the scope of the unknown root when its parent root is already known", () => {
      expect.assertions(3);

      const outerHost = document.createElement("div");
      const outerRoot = outerHost.attachShadow({ mode: "open" });
      document.body.appendChild(outerHost);
      const innerHost = document.createElement("div");
      const innerRoot = innerHost.attachShadow({ mode: "open" });
      outerRoot.appendChild(innerHost);
      const input = document.createElement("input");
      innerRoot.appendChild(input);

      // The document knows about the outer root, but the outer root does not know about the inner one yet.
      jest
        .spyOn(ShadowRootCacheService, "peekCache")
        .mockImplementation((element) => (element === document ? [outerRoot] : undefined));

      focusHandler({
        composedPath: () => [input, innerRoot, innerHost, outerRoot, outerHost, document.body, document],
      });

      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledTimes(1);
      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(outerRoot);
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledWith(document, [], true);
    });
  });
});
