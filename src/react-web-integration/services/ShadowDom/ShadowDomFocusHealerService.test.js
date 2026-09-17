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
    ShadowDomFocusHealerService._isFieldTracked = null;
    ShadowDomFocusHealerService.resetHealAttempts();

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

    it("should store the tracked-field predicate provided at install time", () => {
      // Guards against the wiring regression where the predicate was silently dropped, disabling the
      // light-DOM heal that recovers login fields revealed in non-<dialog> modals (e.g. totalcasino.pl).
      expect.assertions(1);

      const isFieldTracked = () => true;

      ShadowDomFocusHealerService.installFocusinHealer(isFieldTracked);

      expect(ShadowDomFocusHealerService._isFieldTracked).toBe(isFieldTracked);
    });

    it("should refresh the tracked-field predicate on a subsequent install without re-adding the listener", () => {
      expect.assertions(2);

      const firstPredicate = () => true;
      const secondPredicate = () => false;

      ShadowDomFocusHealerService.installFocusinHealer(firstPredicate);
      ShadowDomFocusHealerService.installFocusinHealer(secondPredicate);

      expect(ShadowDomFocusHealerService._isFieldTracked).toBe(secondPredicate);
      expect(document.addEventListener).toHaveBeenCalledTimes(1);
    });
  });

  describe("ShadowDomFocusHealerService::uninstallFocusinHealer", () => {
    it("should remove the focusin listener and forget the tracked-field callback", () => {
      expect.assertions(3);

      jest.spyOn(document, "removeEventListener").mockImplementation();
      ShadowDomFocusHealerService.installFocusinHealer(() => true);
      const handler = ShadowDomFocusHealerService._focusinHandler;

      ShadowDomFocusHealerService.uninstallFocusinHealer();

      expect(document.removeEventListener).toHaveBeenCalledWith("focusin", handler, { capture: true });
      expect(ShadowDomFocusHealerService._focusinHandler).toBeNull();
      expect(ShadowDomFocusHealerService._isFieldTracked).toBeNull();
    });

    it("should do nothing when no listener is installed", () => {
      expect.assertions(1);

      jest.spyOn(document, "removeEventListener").mockImplementation();

      ShadowDomFocusHealerService.uninstallFocusinHealer();

      expect(document.removeEventListener).not.toHaveBeenCalled();
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

    it("should not invalidate any cache nor trigger a rescan when the focused field is outside a shadow dom and no tracked-field predicate is wired", () => {
      expect.assertions(2);

      const input = document.createElement("input");

      focusHandler({ composedPath: () => [input, document.body, document] });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });

    it("should trigger a synchronous rescan when a focused light-DOM input is not yet backed by a call-to-action", () => {
      expect.assertions(2);

      const input = document.createElement("input");
      ShadowDomFocusHealerService.installFocusinHealer(() => false);

      focusHandler({ composedPath: () => [input, document.body, document] });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledWith(document, [], true);
    });

    it("should not trigger a rescan when the focused light-DOM input is already tracked", () => {
      expect.assertions(1);

      const input = document.createElement("input");
      ShadowDomFocusHealerService.installFocusinHealer((focused) => focused === input);

      focusHandler({ composedPath: () => [input, document.body, document] });

      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });

    it("should offer the light-DOM heal at most once per input until the attempts are reset", () => {
      expect.assertions(2);

      const input = document.createElement("input");
      ShadowDomFocusHealerService.installFocusinHealer(() => false);

      focusHandler({ composedPath: () => [input, document.body, document] });
      focusHandler({ composedPath: () => [input, document.body, document] });

      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledTimes(1);

      ShadowDomFocusHealerService.resetHealAttempts();
      focusHandler({ composedPath: () => [input, document.body, document] });

      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledTimes(2);
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
