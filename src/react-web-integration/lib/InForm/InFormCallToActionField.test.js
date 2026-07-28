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

import InFormCallToActionField from "./InFormCallToActionField";
import InFormFieldGeometryService from "./InFormFieldGeometryService";
import ShadowRootCacheService from "../Dom/ShadowDom/ShadowRootCacheService";
import ShadowMutationObserverService from "../Dom/ShadowDom/ShadowMutationObserverService";
import DomUtils from "../Dom/DomUtils";
import { initializeWindow } from "./InformManager.test.data";

describe("InFormCallToActionField", () => {
  beforeAll(() => {
    initializeWindow();
  });

  beforeEach(() => {
    jest.spyOn(ShadowMutationObserverService, "observeShadowRootChanges").mockImplementation();

    ShadowRootCacheService._shadowRootsCache = new WeakMap();
    ShadowMutationObserverService._shadowRootsObservers = new WeakMap();
    ShadowMutationObserverService._shadowMutationSubscribers = new Set();

    document.body.innerHTML = "";
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Build a call to action field
  const buildCallToActionField = () => {
    const field = document.createElement("input");
    field.type = "text";

    document.body.appendChild(field);

    const host = document.createElement("div");
    const shadowRoot = host.attachShadow({ mode: "open" });

    document.body.appendChild(host);

    return new InFormCallToActionField(field, "username", shadowRoot);
  };

  describe("InFormCallToActionField::findAll", () => {
    it("should return the matching fields without duplicates", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='outer'><input type='text'/></div>";
      const outer = document.getElementById("outer");

      expect(InFormCallToActionField.findAll("#outer, #outer input")).toEqual([outer]);
    });

    it("should concatenate all matches", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input type='text'/>";
      const field = document.querySelector("input");
      const iframeField = document.createElement("input");
      const shadowField = document.createElement("input");
      jest.spyOn(InFormCallToActionField, "findAllInIframes").mockReturnValue([iframeField]);
      jest.spyOn(InFormCallToActionField, "findAllInShadowDom").mockReturnValue([shadowField]);

      expect(InFormCallToActionField.findAll("input")).toEqual([field, iframeField, shadowField]);
    });
  });

  describe("InFormCallToActionField::findAllInIframes", () => {
    it("should return the matching fields of the accessible iframes", () => {
      expect.assertions(1);

      const iframeDocument = document.implementation.createHTMLDocument();
      const field = iframeDocument.createElement("input");
      iframeDocument.body.appendChild(field);
      jest.spyOn(DomUtils, "getAccessibleAndSameDomainIframes").mockReturnValue([{ contentDocument: iframeDocument }]);

      expect(InFormCallToActionField.findAllInIframes("input")).toEqual([field]);
    });
  });

  describe("InFormCallToActionField::findAllInShadowDom", () => {
    it("should return the matching fields from shadow roots", () => {
      expect.assertions(1);

      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const field = document.createElement("input");
      shadowRoot.appendChild(field);
      document.body.appendChild(host);

      expect(InFormCallToActionField.findAllInShadowDom("input")).toEqual([field]);
    });

    it("should return the matching fields from nested shadow roots", () => {
      expect.assertions(1);

      const outerHost = document.createElement("div");
      const outerRoot = outerHost.attachShadow({ mode: "open" });
      document.body.appendChild(outerHost);
      const innerHost = document.createElement("div");
      const innerRoot = innerHost.attachShadow({ mode: "open" });
      outerRoot.appendChild(innerHost);
      const field = document.createElement("input");
      innerRoot.appendChild(field);

      expect(InFormCallToActionField.findAllInShadowDom("input")).toEqual([field]);
    });

    it("should not return the fields of the DOM", () => {
      expect.assertions(1);

      document.body.innerHTML = "<input type='text'/>";

      expect(InFormCallToActionField.findAllInShadowDom("input")).toEqual([]);
    });
  });

  describe("InFormCallToActionField::calculateFieldPosition", () => {
    it("should delegate the position calculation to the geometry service", () => {
      expect.assertions(2);

      const callToActionField = buildCallToActionField();
      const position = { top: 42, left: 84 };
      const calculateSpy = jest.spyOn(InFormFieldGeometryService, "calculateFieldPosition").mockReturnValue(position);

      expect(callToActionField.calculateFieldPosition()).toBe(position);
      expect(calculateSpy).toHaveBeenCalledWith(callToActionField.field, callToActionField.shadowRoot);
    });
  });

  describe("InFormCallToActionField::handleScrollEvent", () => {
    it("should register a scroll listener on the field scroll parent", () => {
      expect.assertions(2);

      const scrollableParent = { addEventListener: jest.fn(), removeEventListener: jest.fn() };
      jest.spyOn(InFormFieldGeometryService, "getScrollParent").mockReturnValue(scrollableParent);

      const callToActionField = buildCallToActionField();

      expect(callToActionField.scrollableFieldParent).toBe(scrollableParent);
      expect(scrollableParent.addEventListener).toHaveBeenCalledWith("scroll", callToActionField.removeIframe);
    });
  });

  describe("InFormCallToActionField::cacheViewableRect", () => {
    it("should cache the rectangle coordinates of the field", () => {
      expect.assertions(2);

      const callToActionField = buildCallToActionField();

      expect(callToActionField.viewableRect).not.toBeNull();

      const rect = { top: 10, left: 20, width: 300, height: 40 };
      jest.spyOn(callToActionField.field, "getBoundingClientRect").mockReturnValue(rect);

      callToActionField.cacheViewableRect();

      expect(callToActionField.viewableRect).toBe(rect);
    });
  });

  describe("InFormCallToActionField::onClick", () => {
    it("should store the callback to call on click", () => {
      expect.assertions(1);

      const callToActionField = buildCallToActionField();
      const callback = jest.fn();

      callToActionField.onClick(callback);

      expect(callToActionField.callToActionClickCallback).toBe(callback);
    });
  });

  describe("InFormCallToActionField::handleInsertionEvent", () => {
    it("should insert the CTA immediately when the field is already focused inside a shadow dom", () => {
      expect.assertions(2);

      const fieldHost = document.createElement("div");
      const fieldRoot = fieldHost.attachShadow({ mode: "open" });
      const field = document.createElement("input");
      fieldRoot.appendChild(field);
      document.body.appendChild(fieldHost);

      field.focus();
      expect(document.activeElement).toBe(fieldHost);

      const insertSpy = jest.spyOn(InFormCallToActionField.prototype, "insertInformCallToActionIframe");

      new InFormCallToActionField(field, "username", fieldRoot);

      expect(insertSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("InFormCallToActionField::insertInformCallToActionIframe", () => {
    it("should not create a second iframe when one is already inserted", async () => {
      expect.assertions(1);

      const callToActionField = buildCallToActionField();
      const iframe = document.createElement("iframe");
      iframe.id = callToActionField.iframeId;
      callToActionField.shadowRoot.appendChild(iframe);
      callToActionField.createCallToActionIframe = jest.fn();

      await callToActionField.insertInformCallToActionIframe();

      expect(callToActionField.createCallToActionIframe).not.toHaveBeenCalled();
    });

    it("should create the iframe and handle its click event", async () => {
      expect.assertions(2);

      const callToActionField = buildCallToActionField();
      const iframe = { addEventListener: jest.fn() };
      callToActionField.createCallToActionIframe = jest.fn().mockResolvedValue(iframe);
      callToActionField.handleCallToActionClicked = jest.fn();

      await callToActionField.insertInformCallToActionIframe();

      expect(callToActionField.createCallToActionIframe).toHaveBeenCalledTimes(1);
      expect(callToActionField.handleCallToActionClicked).toHaveBeenCalledWith(iframe);
    });
  });

  describe("InFormCallToActionField::handleCallToActionClicked", () => {
    it("should track the mouse over the CTA iframe", () => {
      expect.assertions(3);

      const callToActionField = buildCallToActionField();
      const iframe = { addEventListener: jest.fn() };

      callToActionField.handleCallToActionClicked(iframe);
      clearInterval(callToActionField.callToActionClickWatcher);

      expect(iframe.addEventListener).toHaveBeenCalledTimes(2);

      const mouseOverHandler = iframe.addEventListener.mock.calls.find(([event]) => event === "mouseover")[1];
      const mouseOutHandler = iframe.addEventListener.mock.calls.find(([event]) => event === "mouseout")[1];
      mouseOverHandler();

      expect(callToActionField.isCallToActionMousingOver).toBe(true);

      mouseOutHandler();

      expect(callToActionField.isCallToActionMousingOver).toBe(false);
    });
  });

  describe("InFormCallToActionField::removeInFormCallToAction", () => {
    it("should not remove the iframe when the user is mousing over the CTA", () => {
      expect.assertions(1);

      const callToActionField = buildCallToActionField();
      callToActionField.isCallToActionMousingOver = true;
      callToActionField.removeIframe = jest.fn();

      callToActionField.removeInFormCallToAction();

      expect(callToActionField.removeIframe).not.toHaveBeenCalled();
    });

    it("should not remove the iframe when the field is the active element", () => {
      expect.assertions(1);

      const callToActionField = buildCallToActionField();
      callToActionField.field.focus();
      callToActionField.removeIframe = jest.fn();

      callToActionField.removeInFormCallToAction();

      expect(callToActionField.removeIframe).not.toHaveBeenCalled();
    });

    it("should remove the iframe", () => {
      expect.assertions(1);

      const callToActionField = buildCallToActionField();
      callToActionField.removeIframe = jest.fn();

      callToActionField.removeInFormCallToAction();

      expect(callToActionField.removeIframe).toHaveBeenCalledTimes(1);
    });
  });

  describe("InFormCallToActionField::removeInFormCallToActionWhenMouseOut", () => {
    it("should not remove the iframe when the mouse moves on the CTA host", () => {
      expect.assertions(1);

      const callToActionField = buildCallToActionField();
      callToActionField.removeIframe = jest.fn();

      callToActionField.removeInFormCallToActionWhenMouseOut({ relatedTarget: callToActionField.shadowRoot.host });

      expect(callToActionField.removeIframe).not.toHaveBeenCalled();
    });

    it("should remove the iframe when the mouse moves out", () => {
      expect.assertions(1);

      const callToActionField = buildCallToActionField();
      callToActionField.removeIframe = jest.fn();

      callToActionField.removeInFormCallToActionWhenMouseOut({ relatedTarget: null });

      expect(callToActionField.removeIframe).toHaveBeenCalledTimes(1);
    });
  });

  describe("InFormCallToActionField::removeIframe", () => {
    it("should remove the iframe and disconnect its port", () => {
      expect.assertions(2);

      const callToActionField = buildCallToActionField();
      const iframe = document.createElement("iframe");
      iframe.id = callToActionField.iframeId;
      callToActionField.shadowRoot.appendChild(iframe);
      jest.spyOn(window.port, "emit");

      callToActionField.removeIframe();

      expect(callToActionField.shadowRoot.querySelector("iframe")).toBeNull();
      expect(window.port.emit).toHaveBeenCalledWith("passbolt.port.disconnect", "InFormCallToAction");
    });

    it("should not affect other iframes", () => {
      expect.assertions(2);

      const callToActionField = buildCallToActionField();
      const iframe = document.createElement("iframe");
      iframe.id = "another-CTA-iframe";
      callToActionField.shadowRoot.appendChild(iframe);
      jest.spyOn(window.port, "emit");

      callToActionField.removeIframe();

      expect(callToActionField.shadowRoot.querySelector("iframe")).toBe(iframe);
      expect(window.port.emit).not.toHaveBeenCalled();
    });
  });

  describe("InFormCallToActionField::destroy", () => {
    it("should remove the field listeners, the scroll listener and the iframe", () => {
      expect.assertions(3);

      const scrollableParent = { addEventListener: jest.fn(), removeEventListener: jest.fn() };
      jest.spyOn(InFormFieldGeometryService, "getScrollParent").mockReturnValue(scrollableParent);
      const callToActionField = buildCallToActionField();
      const removeFieldListenerSpy = jest.spyOn(callToActionField.field, "removeEventListener");
      callToActionField.removeIframe = jest.fn();

      callToActionField.destroy();

      expect(removeFieldListenerSpy).toHaveBeenCalledTimes(4);
      expect(scrollableParent.removeEventListener).toHaveBeenCalledWith("scroll", callToActionField.removeIframe);
      expect(callToActionField.removeIframe).toHaveBeenCalledTimes(1);
    });
  });
});
