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

    it("should match a child when the matchDescendants option is set", () => {
      expect.assertions(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      shadowRoot.appendChild(document.createElement("input"));
      container.appendChild(host);

      expect(ShadowDomQueryService.hasAncestorMatchingDeep(container, "input", { matchDescendants: true })).toBe(true);
    });

    it("should ignore descendants when the matchDescendants option is not set", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'><input type='text'/></div>";
      const container = document.getElementById("container");

      expect(ShadowDomQueryService.hasAncestorMatchingDeep(container, "input")).toBe(false);
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
