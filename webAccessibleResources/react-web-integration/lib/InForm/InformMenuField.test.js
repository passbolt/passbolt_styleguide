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

import InFormMenuField from "./InformMenuField";
import InFormFieldGeometryService from "./InFormFieldGeometryService";
import { initializeWindow } from "./InformManager.test.data";

describe("InFormMenuField", () => {
  beforeAll(() => {
    initializeWindow();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    document.body.innerHTML = "";
  });

  const buildMenuField = () => {
    const field = document.createElement("input");
    field.type = "text";
    document.body.appendChild(field);
    const host = document.createElement("div");
    const shadowRoot = host.attachShadow({ mode: "open" });
    document.body.appendChild(host);

    /** Mock create element to add a content window property in the iframe due to jest issue with iframe in shadow dom **/
    const iframe = document.createElement("iframe");
    jest.spyOn(document, "createElement").mockImplementation((elementName) => {
      if (elementName === "iframe") {
        const iframeMock = iframe.cloneNode();
        Object.defineProperty(iframeMock, "contentWindow", {
          value: {},
        });
        return iframeMock;
      }

      return Document.prototype.createElement.call(document, elementName);
    });

    jest.spyOn(InFormMenuField.prototype, "insertInformMenuIframe");
    return new InFormMenuField(field, shadowRoot);
  };

  describe("InFormMenuField::constructor", () => {
    it("should initialize the field, the shadow root and the scroll parent", () => {
      expect.assertions(5);

      const menuField = buildMenuField();

      expect(menuField.field).toBe(document.querySelector("input"));
      expect(menuField.shadowRoot.host).toBe(document.querySelector("div"));
      expect(menuField.isMenuMousingOver).toBe(false);
      expect(menuField.scrollableFieldParent).toBe(window);
      expect(menuField.insertInformMenuIframe).toHaveBeenCalledTimes(1);
    });
  });

  describe("InFormMenuField::insertInformMenuIframe", () => {
    it("should not create a second iframe when one is already inserted", async () => {
      expect.assertions(1);

      const menuField = buildMenuField();
      const iframe = document.createElement("iframe");
      iframe.id = menuField.iframeId;
      menuField.shadowRoot.appendChild(iframe);
      menuField.createMenuIframe = jest.fn();

      await menuField.insertInformMenuIframe();

      expect(menuField.createMenuIframe).not.toHaveBeenCalled();
    });

    it("should create the iframe and handle its click", async () => {
      expect.assertions(2);

      const menuField = buildMenuField();
      const iframe = { addEventListener: jest.fn() };
      menuField.createMenuIframe = jest.fn().mockResolvedValue(iframe);
      menuField.handleMenuClicked = jest.fn();

      await menuField.insertInformMenuIframe();

      expect(menuField.createMenuIframe).toHaveBeenCalledTimes(1);
      expect(menuField.handleMenuClicked).toHaveBeenCalledWith(iframe);
    });
  });

  describe("InFormMenuField::calculateIframePosition", () => {
    it("should position the menu below the field, right-aligned", () => {
      expect.assertions(1);

      const menuField = buildMenuField();
      jest
        .spyOn(menuField.field, "getBoundingClientRect")
        .mockReturnValue({ top: 100, left: 500, width: 300, height: 40 });

      expect(menuField.calculateIframePosition()).toEqual({ top: 140, left: 433 });
    });

    it("should position the menu taking account of shadow root host", () => {
      expect.assertions(1);

      const menuField = buildMenuField();
      jest
        .spyOn(menuField.field, "getBoundingClientRect")
        .mockReturnValue({ top: 100, left: 500, width: 300, height: 40 });
      jest
        .spyOn(menuField.shadowRoot.host, "getBoundingClientRect")
        .mockReturnValue({ top: 10, left: 20, width: 0, height: 0 });

      expect(menuField.calculateIframePosition()).toEqual({ top: 130, left: 413 });
    });

    it("should prevent negative coordinates", () => {
      expect.assertions(1);

      const menuField = buildMenuField();
      jest.spyOn(menuField.field, "getBoundingClientRect").mockReturnValue({ top: 10, left: 0, width: 20, height: 20 });

      expect(menuField.calculateIframePosition()).toEqual({ top: 30, left: 0 });
    });
  });

  describe("InFormMenuField::handleMenuClicked", () => {
    it("should track the mouse over the menu iframe state", () => {
      expect.assertions(3);

      const menuField = buildMenuField();
      const iframe = { addEventListener: jest.fn() };

      menuField.handleMenuClicked(iframe);

      expect(iframe.addEventListener).toHaveBeenCalledTimes(2);

      const mouseOverHandler = iframe.addEventListener.mock.calls.find(([event]) => event === "mouseover")[1];
      const mouseOutHandler = iframe.addEventListener.mock.calls.find(([event]) => event === "mouseout")[1];
      mouseOverHandler();

      expect(menuField.isMenuMousingOver).toBe(true);

      mouseOutHandler();

      expect(menuField.isMenuMousingOver).toBe(false);
    });
  });

  describe("InFormMenuField::removeInFormMenu", () => {
    it("should not remove the iframe when the user is mousing over the menu", () => {
      expect.assertions(1);

      const menuField = buildMenuField();
      menuField.isMenuMousingOver = true;
      menuField.removeIframe = jest.fn();

      menuField.removeInFormMenu();

      expect(menuField.removeIframe).not.toHaveBeenCalled();
    });

    it("should not remove the iframe when the field is the active element", () => {
      expect.assertions(1);

      const menuField = buildMenuField();
      menuField.field.focus();
      menuField.removeIframe = jest.fn();

      menuField.removeInFormMenu();

      expect(menuField.removeIframe).not.toHaveBeenCalled();
    });

    it("should remove the iframe", () => {
      expect.assertions(1);

      const menuField = buildMenuField();
      menuField.removeIframe = jest.fn();

      menuField.removeInFormMenu();

      expect(menuField.removeIframe).toHaveBeenCalledTimes(1);
    });
  });

  describe("InFormMenuField::removeIframe", () => {
    it("should remove the matching iframe and disconnect its port", () => {
      expect.assertions(2);

      const menuField = buildMenuField();
      const iframe = document.createElement("iframe");
      iframe.id = menuField.iframeId;
      menuField.shadowRoot.appendChild(iframe);
      jest.spyOn(window.port, "emit");

      menuField.removeIframe();

      expect(menuField.shadowRoot.querySelector("iframe")).toBeNull();
      expect(window.port.emit).toHaveBeenCalledWith("passbolt.port.disconnect", "InFormMenu");
    });

    it("should not remove the other iframes", () => {
      expect.assertions(2);

      const menuField = buildMenuField();
      const iframe = document.createElement("iframe");
      iframe.id = "another-menu-iframe";
      menuField.shadowRoot.appendChild(iframe);
      jest.spyOn(window.port, "emit");

      menuField.removeIframe();

      expect(menuField.shadowRoot.querySelector("iframe")).toBe(iframe);
      expect(window.port.emit).not.toHaveBeenCalled();
    });
  });

  describe("InFormMenuField::handleScrollEvent", () => {
    it("should register a scroll listener on the field scroll parent", () => {
      expect.assertions(2);

      const scrollableParent = { addEventListener: jest.fn(), removeEventListener: jest.fn() };
      jest.spyOn(InFormFieldGeometryService, "getScrollParent").mockReturnValue(scrollableParent);

      const menuField = buildMenuField();

      expect(menuField.scrollableFieldParent).toBe(scrollableParent);
      expect(scrollableParent.addEventListener).toHaveBeenCalledWith("scroll", menuField.removeIframe);
    });
  });

  describe("InFormMenuField::destroy", () => {
    it("should remove everything", () => {
      expect.assertions(3);

      const scrollableParent = { addEventListener: jest.fn(), removeEventListener: jest.fn() };
      jest.spyOn(InFormFieldGeometryService, "getScrollParent").mockReturnValue(scrollableParent);
      const menuField = buildMenuField();
      const removeFieldListenerSpy = jest.spyOn(menuField.field, "removeEventListener");
      menuField.removeIframe = jest.fn();

      menuField.destroy();

      expect(removeFieldListenerSpy).toHaveBeenCalledWith("blur", menuField.removeInFormMenu);
      expect(scrollableParent.removeEventListener).toHaveBeenCalledWith("scroll", menuField.removeIframe);
      expect(menuField.removeIframe).toHaveBeenCalledTimes(1);
    });
  });
});
