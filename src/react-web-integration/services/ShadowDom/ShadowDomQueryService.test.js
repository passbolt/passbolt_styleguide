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

import browser from "webextension-polyfill";
import ShadowDomQueryService from "./ShadowDomQueryService";
import ShadowRootCacheService from "./ShadowRootCacheService";
import ShadowMutationObserverService from "./ShadowMutationObserverService";

describe("ShadowDomQueryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    ShadowMutationObserverService._shadowRootsObservers = new WeakMap();
    ShadowMutationObserverService._shadowMutationSubscribers = new Set();

    document.body.innerHTML = "";
  });

  afterEach(() => {
    delete browser.dom;
  });

  describe("ShadowDomQueryService::isElement", () => {
    it("should return true for an element", () => {
      expect.assertions(1);

      expect(ShadowDomQueryService.isElement(document.createElement("div"))).toBe(true);
    });

    it("should return false for non-element nodes and nullish values", () => {
      expect.assertions(4);

      const shadowRoot = document.createElement("div").attachShadow({ mode: "open" });

      expect(ShadowDomQueryService.isElement(document.createTextNode("hello"))).toBe(false);
      expect(ShadowDomQueryService.isElement(document)).toBe(false);
      expect(ShadowDomQueryService.isElement(shadowRoot)).toBe(false);
      expect(ShadowDomQueryService.isElement(null)).toBe(false);
    });
  });

  describe("ShadowDomQueryService::isDocument", () => {
    it("should return true for a document, including one of another window", () => {
      expect.assertions(2);

      expect(ShadowDomQueryService.isDocument(document)).toBe(true);
      expect(ShadowDomQueryService.isDocument(document.implementation.createHTMLDocument())).toBe(true);
    });

    it("should return false for an element, a shadow root and nullish values", () => {
      expect.assertions(3);

      const shadowRoot = document.createElement("div").attachShadow({ mode: "open" });

      expect(ShadowDomQueryService.isDocument(document.createElement("div"))).toBe(false);
      expect(ShadowDomQueryService.isDocument(shadowRoot)).toBe(false);
      expect(ShadowDomQueryService.isDocument(null)).toBe(false);
    });
  });

  describe("ShadowDomQueryService::isShadowRoot", () => {
    it("should return true for a shadow root", () => {
      expect.assertions(1);

      const shadowRoot = document.createElement("div").attachShadow({ mode: "open" });

      expect(ShadowDomQueryService.isShadowRoot(shadowRoot)).toBe(true);
    });

    it("should return false for an element, the document and nullish values", () => {
      expect.assertions(3);

      expect(ShadowDomQueryService.isShadowRoot(document.createElement("div"))).toBe(false);
      expect(ShadowDomQueryService.isShadowRoot(document)).toBe(false);
      expect(ShadowDomQueryService.isShadowRoot(null)).toBe(false);
    });

    it("should return false for a plain document fragment", () => {
      expect.assertions(1);

      expect(ShadowDomQueryService.isShadowRoot(document.createDocumentFragment())).toBe(false);
    });
  });

  describe("ShadowDomQueryService::querySelectorAllDeep", () => {
    it("should return the matching elements of the DOM", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input type='text'/></div>";
      const input = document.querySelector("input");

      expect(ShadowDomQueryService.querySelectorAllDeep(document, "input")).toEqual([input]);
    });

    it("should return the matching elements inside a shadow root", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);

      expect(ShadowDomQueryService.querySelectorAllDeep(document, "input")).toEqual([input]);
    });

    it("should return the matching elements inside nested shadow roots", () => {
      expect.assertions(1);

      const outerHost = document.createElement("div");
      const outerRoot = outerHost.attachShadow({ mode: "open" });
      document.body.appendChild(outerHost);
      const innerHost = document.createElement("div");
      const innerRoot = innerHost.attachShadow({ mode: "open" });
      outerRoot.appendChild(innerHost);
      const input = document.createElement("input");
      innerRoot.appendChild(input);

      expect(ShadowDomQueryService.querySelectorAllDeep(document, "input")).toEqual([input]);
    });

    it("should return the matching elements inside a closed shadow root", () => {
      expect.assertions(2);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "closed" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);
      browser.dom = {
        openOrClosedShadowRoot: jest.fn((element) => (element === host ? shadowRoot : null)),
      };

      expect(ShadowDomQueryService.querySelectorAllDeep(document, "input")).toEqual([input]);
      expect(browser.dom.openOrClosedShadowRoot).toHaveBeenCalledWith(host);
    });

    it("should search inside the shadow dom of the element itself", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);

      expect(ShadowDomQueryService.querySelectorAllDeep(host, "input")).toEqual([input]);
    });
  });

  describe("ShadowDomQueryService::containsDeep", () => {
    it("should return true when the node is the ancestor itself", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");

      expect(ShadowDomQueryService.containsDeep(form, form)).toBe(true);
    });

    it("should return true for a child of the ancestor", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><div><input type='text'/></div></form>";
      const form = document.querySelector("form");
      const input = document.querySelector("input");

      expect(ShadowDomQueryService.containsDeep(form, input)).toBe(true);
    });

    it("should return true for a node inside a shadow root of the ancestor", () => {
      expect.assertions(2);

      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      form.appendChild(host);

      expect(form.contains(input)).toBe(false);
      expect(ShadowDomQueryService.containsDeep(form, input)).toBe(true);
    });

    it("should return true for a node inside nested shadow roots of the ancestor", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");
      const outerHost = document.createElement("div");
      const outerRoot = outerHost.attachShadow({ mode: "open" });
      form.appendChild(outerHost);
      const innerHost = document.createElement("div");
      const innerRoot = innerHost.attachShadow({ mode: "open" });
      outerRoot.appendChild(innerHost);
      const input = document.createElement("input");
      innerRoot.appendChild(input);

      expect(ShadowDomQueryService.containsDeep(form, input)).toBe(true);
    });

    it("should return false for a node outside the ancestor", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form></form><div><input type='text'/></div>";
      const form = document.querySelector("form");
      const input = document.querySelector("input");

      expect(ShadowDomQueryService.containsDeep(form, input)).toBe(false);
    });

    it("should return false for a node inside a shadow root that is not under the ancestor", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");
      const host = document.createElement("div");
      host.attachShadow({ mode: "open" });
      form.appendChild(host);

      const otherHost = document.createElement("div");
      const otherRoot = otherHost.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      otherRoot.appendChild(input);
      document.body.appendChild(otherHost);

      expect(ShadowDomQueryService.containsDeep(form, input)).toBe(false);
    });
  });

  describe("ShadowDomQueryService::hasAncestorMatchingDeep", () => {
    it("should return true when an ancestor of the element matches", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form><div><input type='text'/></div></form>";
      const input = document.querySelector("input");

      expect(ShadowDomQueryService.hasAncestorMatchingDeep(input, "form")).toBe(true);
    });

    it("should return true when the matching ancestor is outside a shadow dom", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form id='container'></form>";
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.getElementById("container").appendChild(host);

      expect(ShadowDomQueryService.hasAncestorMatchingDeep(input, "form")).toBe(true);
    });

    it("should return true when the matching ancestor is outside a closed shadow dom", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form id='container'></form>";
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "closed" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.getElementById("container").appendChild(host);

      expect(ShadowDomQueryService.hasAncestorMatchingDeep(input, "form")).toBe(true);
    });

    it("should never match the element itself", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");

      expect(ShadowDomQueryService.hasAncestorMatchingDeep(form, "form")).toBe(false);
    });

    it("should return false when no ancestor matches", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input type='text'/></div>";
      const input = document.querySelector("input");

      expect(ShadowDomQueryService.hasAncestorMatchingDeep(input, "form")).toBe(false);
    });
  });

  describe("ShadowDomQueryService::deepActiveElement", () => {
    it("should return document.activeElement for a focused light-DOM element", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input type='text'/>";
      const input = document.querySelector("input");
      input.focus();

      expect(ShadowDomQueryService.deepActiveElement()).toBe(input);
    });

    it("should descend through nested open shadow roots to the truly focused element", () => {
      expect.assertions(2);

      const outerHost = document.createElement("div");
      const outerRoot = outerHost.attachShadow({ mode: "open" });
      document.body.appendChild(outerHost);
      const innerHost = document.createElement("div");
      const innerRoot = innerHost.attachShadow({ mode: "open" });
      outerRoot.appendChild(innerHost);
      const input = document.createElement("input");
      innerRoot.appendChild(input);
      input.focus();

      // document.activeElement only exposes the outermost host; deepActiveElement reaches the input.
      expect(document.activeElement).toBe(outerHost);
      expect(ShadowDomQueryService.deepActiveElement()).toBe(input);
    });

    it("should descend into a same-origin iframe holding the focus", () => {
      expect.assertions(2);

      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      const input = iframe.contentDocument.createElement("input");
      iframe.contentDocument.body.appendChild(input);
      input.focus();
      // jsdom does not propagate the frame focus to the embedder, mirror what a browser reports.
      jest.spyOn(document, "activeElement", "get").mockReturnValue(iframe);

      expect(document.activeElement).toBe(iframe);
      expect(ShadowDomQueryService.deepActiveElement()).toBe(input);
    });

    it("should stop at the frame when nothing is focused inside it", () => {
      expect.assertions(1);

      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      jest.spyOn(document, "activeElement", "get").mockReturnValue(iframe);

      expect(ShadowDomQueryService.deepActiveElement()).toBe(iframe);
    });

    it("should stop at the frame when its document cannot be reached", () => {
      expect.assertions(1);

      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      jest.spyOn(iframe, "contentDocument", "get").mockImplementation(() => {
        throw new Error("cross-origin");
      });
      jest.spyOn(document, "activeElement", "get").mockReturnValue(iframe);

      expect(ShadowDomQueryService.deepActiveElement()).toBe(iframe);
    });
  });

  describe("ShadowDomQueryService::scopeRoot", () => {
    it("should return the document for an element in the DOM", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input type='text'/></div>";
      const input = document.querySelector("input");

      expect(ShadowDomQueryService.scopeRoot(input)).toBe(document);
    });

    it("should return the shadow root for an element in it", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);

      expect(ShadowDomQueryService.scopeRoot(input)).toBe(shadowRoot);
    });

    it("should return the shadow root for an element in a closed shadow dom", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "closed" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);

      expect(ShadowDomQueryService.scopeRoot(input)).toBe(shadowRoot);
    });

    it("should fall back to the document for a detached element", () => {
      expect.assertions(1);

      const detached = document.createElement("div");

      expect(ShadowDomQueryService.scopeRoot(detached)).toBe(document);
    });

    it("should return the owning document for an element of another document", () => {
      expect.assertions(1);

      const iframeDocument = document.implementation.createHTMLDocument();
      const input = iframeDocument.createElement("input");
      iframeDocument.body.appendChild(input);

      expect(ShadowDomQueryService.scopeRoot(input)).toBe(iframeDocument);
    });
  });

  describe("ShadowDomQueryService::shadowPiercingParentElement", () => {
    it("should return the slot element for a web component", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const slot = document.createElement("slot");
      shadowRoot.appendChild(slot);
      const slotted = document.createElement("span");
      host.appendChild(slotted);
      document.body.appendChild(host);

      expect(ShadowDomQueryService.shadowPiercingParentElement(slotted)).toBe(slot);
    });

    it("should return the standard parent for a regular element", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='parent'><input type='text'/></div>";
      const input = document.querySelector("input");

      expect(ShadowDomQueryService.shadowPiercingParentElement(input)).toBe(document.getElementById("parent"));
    });

    it("should return the host when reaching the top of a shadow tree", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);

      expect(ShadowDomQueryService.shadowPiercingParentElement(input)).toBe(host);
    });

    it("should return the host when reaching the top of a closed shadow tree", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "closed" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      document.body.appendChild(host);

      expect(ShadowDomQueryService.shadowPiercingParentElement(input)).toBe(host);
    });

    it("should return null for the document root element", () => {
      expect.assertions(1);

      expect(ShadowDomQueryService.shadowPiercingParentElement(document.documentElement)).toBeNull();
    });

    it("should return null for a non-element node", () => {
      expect.assertions(1);

      const textNode = document.createTextNode("hello");

      expect(ShadowDomQueryService.shadowPiercingParentElement(textNode)).toBeNull();
    });
  });

  describe("ShadowDomQueryService::piercingAncestors", () => {
    it("should return the full ancestors chain", () => {
      expect.assertions(1);

      const container = document.createElement("section");
      document.body.appendChild(container);
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      container.appendChild(host);

      expect(ShadowDomQueryService.piercingAncestors(input)).toEqual([
        input,
        host,
        container,
        document.body,
        document.documentElement,
      ]);
    });

    it("should return an empty array when no element is provided", () => {
      expect.assertions(1);

      expect(ShadowDomQueryService.piercingAncestors(null)).toEqual([]);
    });
  });

  describe("ShadowDomQueryService::closestDeep", () => {
    it("should return the element itself when it matches", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form></form>";
      const form = document.querySelector("form");

      expect(ShadowDomQueryService.closestDeep(form, "form")).toBe(form);
    });

    it("should return the closest matching ancestor", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form id='container'></form>";
      const form = document.getElementById("container");
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      form.appendChild(host);

      expect(ShadowDomQueryService.closestDeep(input, "form")).toBe(form);
    });

    it("should return the closest matching ancestor outside a closed shadow dom", () => {
      expect.assertions(1);

      document.body.innerHTML = "<form id='container'></form>";
      const form = document.getElementById("container");
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "closed" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      form.appendChild(host);

      expect(ShadowDomQueryService.closestDeep(input, "form")).toBe(form);
    });

    it("should return null when no ancestor matches", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input type='text'/></div>";
      const input = document.querySelector("input");

      expect(ShadowDomQueryService.closestDeep(input, "form")).toBeNull();
    });
  });
});
