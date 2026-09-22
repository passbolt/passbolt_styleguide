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
import ShadowRootResolverService from "./ShadowRootResolverService";

describe("ShadowRootResolverService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete browser.dom;
  });

  describe("ShadowRootResolverService::resolveShadowRoot", () => {
    it("should return an open shadow root without calling the extension API", () => {
      expect.assertions(2);

      const element = document.createElement("div");
      const shadowRoot = element.attachShadow({ mode: "open" });

      browser.dom = { openOrClosedShadowRoot: jest.fn() };

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBe(shadowRoot);
      expect(browser.dom.openOrClosedShadowRoot).not.toHaveBeenCalled();
    });

    it("should return null for an element that cannot host a shadow root", () => {
      expect.assertions(2);

      const element = document.createElement("input");
      browser.dom = { openOrClosedShadowRoot: jest.fn() };

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBeNull();
      expect(browser.dom.openOrClosedShadowRoot).not.toHaveBeenCalled();
    });

    it("should return a closed shadow root using the extension API", () => {
      expect.assertions(2);

      const element = document.createElement("div");
      const shadowRoot = element.attachShadow({ mode: "closed" });

      browser.dom = { openOrClosedShadowRoot: jest.fn().mockReturnValue(shadowRoot) };

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBe(shadowRoot);
      expect(browser.dom.openOrClosedShadowRoot).toHaveBeenCalledWith(element);
    });

    it("should call the extension API for a custom element", () => {
      expect.assertions(2);

      const element = document.createElement("login-form");
      browser.dom = { openOrClosedShadowRoot: jest.fn().mockReturnValue(null) };

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBeNull();
      expect(browser.dom.openOrClosedShadowRoot).toHaveBeenCalledWith(element);
    });

    it("should not call the extension API for an SVG element", () => {
      expect.assertions(2);

      const element = document.createElementNS("http://www.w3.org/2000/svg", "font-face");
      browser.dom = { openOrClosedShadowRoot: jest.fn() };

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBeNull();
      expect(browser.dom.openOrClosedShadowRoot).not.toHaveBeenCalled();
    });

    it("should resolve a shadow root on an element from an iframe", () => {
      expect.assertions(1);

      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      const element = iframe.contentDocument.createElement("div");
      const shadowRoot = element.attachShadow({ mode: "open" });

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBe(shadowRoot);

      iframe.remove();
    });

    it("should fall back to the element openOrClosedShadowRoot property when shadowRoot is nullish", () => {
      expect.assertions(2);

      const element = document.createElement("div");
      const shadowRoot = element.attachShadow({ mode: "closed" });

      element.openOrClosedShadowRoot = shadowRoot;
      browser.dom = { openOrClosedShadowRoot: jest.fn() };

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBe(shadowRoot);
      expect(browser.dom.openOrClosedShadowRoot).not.toHaveBeenCalled();
    });

    it("should ignore a Firefox user-agent widget shadow root exposed on a media element", () => {
      // Regression: on Firefox `openOrClosedShadowRoot` also exposes user-agent widget shadow roots (the
      // native controls of <video>/<audio>, <input type=range|date>...). Resolving and observing those
      // storms the MutationObserver during media playback and crashes the tab. Non-host elements must be
      // gated out before this property is ever read.
      expect.assertions(4);

      const video = document.createElement("video");
      video.openOrClosedShadowRoot = document.createElement("div").attachShadow({ mode: "closed" });

      const rangeInput = document.createElement("input");
      rangeInput.type = "range";
      rangeInput.openOrClosedShadowRoot = document.createElement("div").attachShadow({ mode: "closed" });

      browser.dom = { openOrClosedShadowRoot: jest.fn() };

      expect(ShadowRootResolverService.resolveShadowRoot(video)).toBeNull();
      expect(ShadowRootResolverService.resolveShadowRoot(rangeInput)).toBeNull();
      expect(browser.dom.openOrClosedShadowRoot).not.toHaveBeenCalled();
      // A legitimate open author shadow root on the same media element is still not resolvable (can't attach one),
      // but a candidate host keeps resolving its Firefox closed root.
      const div = document.createElement("div");
      div.openOrClosedShadowRoot = document.createElement("div").attachShadow({ mode: "closed" });
      expect(ShadowRootResolverService.resolveShadowRoot(div)).toBe(div.openOrClosedShadowRoot);
    });

    it("should return null when no shadow root can be resolved", () => {
      expect.assertions(1);

      const element = document.createElement("div");

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBeNull();
    });

    it("should return null and handle when the extension API throws", () => {
      expect.assertions(2);

      const element = document.createElement("div");
      browser.dom = {
        openOrClosedShadowRoot: jest.fn(() => {
          throw new Error("Cannot access shadow root");
        }),
      };
      const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      expect(ShadowRootResolverService.resolveShadowRoot(element)).toBeNull();
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });
});
