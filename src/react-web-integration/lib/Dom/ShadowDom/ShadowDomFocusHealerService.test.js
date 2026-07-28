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

    it("should not invalidate any cache nor signal a re-scan when the focused element is not a field", () => {
      expect.assertions(2);

      const div = document.createElement("div");
      ShadowDomFocusHealerService.installFocusinHealer();

      ShadowDomFocusHealerService._focusinHandler({ composedPath: () => [div, document.body, document] });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });

    it("should not invalidate any cache nor signal a re-scan when the focused field is outside a shadow dom", () => {
      expect.assertions(2);

      const input = document.createElement("input");
      ShadowDomFocusHealerService.installFocusinHealer();

      ShadowDomFocusHealerService._focusinHandler({ composedPath: () => [input, document.body, document] });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });

    it("should invalidate the parent scope and signal a re-scan when the focused field is inside a shadow dom", () => {
      expect.assertions(3);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);
      ShadowDomFocusHealerService.installFocusinHealer();

      ShadowDomFocusHealerService._focusinHandler({
        composedPath: () => [input, shadowRoot, host, document.body, document],
      });

      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledTimes(1);
      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(document);
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).toHaveBeenCalledWith(document, [], true);
    });

    it("should invalidate the parent scopes of late-attached nested roots", () => {
      expect.assertions(4);

      const outerHost = document.createElement("div");
      const outerRoot = outerHost.attachShadow({ mode: "open" });
      document.body.appendChild(outerHost);
      const innerHost = document.createElement("div");
      const innerRoot = innerHost.attachShadow({ mode: "open" });
      outerRoot.appendChild(innerHost);
      const input = document.createElement("input");
      innerRoot.appendChild(input);
      ShadowDomFocusHealerService.installFocusinHealer();

      ShadowDomFocusHealerService._focusinHandler({
        composedPath: () => [input, innerRoot, innerHost, outerRoot, outerHost, document.body, document],
      });

      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledTimes(2);
      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(outerRoot);
      expect(ShadowRootCacheService.invalidate).toHaveBeenCalledWith(document);
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
      ShadowDomFocusHealerService.installFocusinHealer();

      ShadowDomFocusHealerService._focusinHandler({
        composedPath: () => [input, shadowRoot, host, document.body, document],
      });

      expect(ShadowRootCacheService.invalidate).not.toHaveBeenCalled();
      expect(ShadowMutationObserverService.notifyShadowMutationSubscribers).not.toHaveBeenCalled();
    });
  });
});
