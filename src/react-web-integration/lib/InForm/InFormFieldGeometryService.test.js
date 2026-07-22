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

import InFormFieldGeometryService from "./InFormFieldGeometryService";

describe("InFormFieldGeometryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    document.body.innerHTML = "";
  });

  describe("InFormFieldGeometryService::getFieldWithLowestCommonAncestor", () => {
    it("should return null when there is no CTA field", () => {
      expect.assertions(1);

      const clickedField = document.createElement("input");

      expect(InFormFieldGeometryService.getFieldWithLowestCommonAncestor(clickedField, [])).toBeNull();
    });

    it("should return the only CTA field when there is a single one", () => {
      expect.assertions(1);

      const clickedField = document.createElement("input");
      const ctaField = { field: document.createElement("input") };

      expect(InFormFieldGeometryService.getFieldWithLowestCommonAncestor(clickedField, [ctaField])).toBe(ctaField);
    });

    it("should return the CTA field sharing the closest common ancestor", () => {
      expect.assertions(1);

      document.body.innerHTML = `
        <div id='page'>
          <form id='near'>
            <input id='clicked' type='text'/>
            <input id='sibling' type='password'/>
          </form>
          <form id='far'>
            <input id='other' type='password'/>
          </form>
        </div>`;
      const clickedField = document.getElementById("clicked");
      const ctaField = { field: document.getElementById("sibling") };
      const ctaField2 = { field: document.getElementById("other") };

      const result = InFormFieldGeometryService.getFieldWithLowestCommonAncestor(clickedField, [ctaField, ctaField2]);

      expect(result).toBe(ctaField);
    });

    it("should pair fields across a shadow boundary", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='container'></div><div id='outside'><input id='other'/></div>";
      const container = document.getElementById("container");
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const clickedField = document.createElement("input");
      shadowRoot.appendChild(clickedField);
      container.appendChild(host);
      const containerCtaField = { field: document.createElement("input") };
      container.appendChild(containerCtaField.field);
      const outsideCtaField = { field: document.getElementById("other") };

      const result = InFormFieldGeometryService.getFieldWithLowestCommonAncestor(clickedField, [
        outsideCtaField,
        containerCtaField,
      ]);

      expect(result).toBe(containerCtaField);
    });
  });

  describe("InFormFieldGeometryService::getScrollParent", () => {
    it("should return the window when no ancestor is scrollable", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div><input type='text'/></div>";
      const input = document.querySelector("input");

      expect(InFormFieldGeometryService.getScrollParent(input)).toBe(window);
    });

    it("should return the window when no node is provided", () => {
      expect.assertions(1);

      expect(InFormFieldGeometryService.getScrollParent(null)).toBe(window);
    });

    it("should return the window for a non-element node", () => {
      expect.assertions(1);

      expect(InFormFieldGeometryService.getScrollParent(document)).toBe(window);
    });

    it("should return the first ancestor with an auto overflow", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='scrollable'><div><input type='text'/></div></div>";
      const scrollable = document.getElementById("scrollable");
      scrollable.style.overflow = "auto";
      const input = document.querySelector("input");

      expect(InFormFieldGeometryService.getScrollParent(input)).toBe(scrollable);
    });

    it("should return the first ancestor with a scroll overflow", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='scrollable'><input type='text'/></div>";
      const scrollable = document.getElementById("scrollable");
      scrollable.style.overflow = "scroll";
      const input = document.querySelector("input");

      expect(InFormFieldGeometryService.getScrollParent(input)).toBe(scrollable);
    });

    it("should find the scrollable parent across a shadow boundary", () => {
      expect.assertions(1);

      document.body.innerHTML = "<div id='scrollable'></div>";
      const scrollable = document.getElementById("scrollable");
      scrollable.style.overflow = "auto";
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      shadowRoot.appendChild(input);
      scrollable.appendChild(host);

      expect(InFormFieldGeometryService.getScrollParent(input)).toBe(scrollable);
    });
  });

  describe("InFormFieldGeometryService::calculateFieldPosition", () => {
    it("should position the CTA relative to the viewport when no shadow root is provided", () => {
      expect.assertions(1);

      const field = document.createElement("input");
      document.body.appendChild(field);
      jest.spyOn(field, "getBoundingClientRect").mockReturnValue({ top: 100, left: 200, width: 300, height: 40 });

      expect(InFormFieldGeometryService.calculateFieldPosition(field)).toEqual({ top: 111, left: 475 });
    });

    it("should position the CTA relative to the shadow root host", () => {
      expect.assertions(1);

      const field = document.createElement("input");
      document.body.appendChild(field);
      jest.spyOn(field, "getBoundingClientRect").mockReturnValue({ top: 100, left: 200, width: 300, height: 40 });
      const host = document.createElement("div");
      const shadowRoot = host.attachShadow({ mode: "open" });
      document.body.appendChild(host);
      jest.spyOn(host, "getBoundingClientRect").mockReturnValue({ top: 10, left: 20, width: 0, height: 0 });

      expect(InFormFieldGeometryService.calculateFieldPosition(field, shadowRoot)).toEqual({ top: 101, left: 455 });
    });

    it("should add the iframe offset for a field living inside a same-origin iframe", () => {
      expect.assertions(1);

      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      jest.spyOn(iframe, "getBoundingClientRect").mockReturnValue({ top: 50, left: 60, width: 500, height: 500 });
      const field = iframe.contentDocument.createElement("input");
      iframe.contentDocument.body.appendChild(field);
      jest.spyOn(field, "getBoundingClientRect").mockReturnValue({ top: 100, left: 200, width: 300, height: 40 });

      expect(InFormFieldGeometryService.calculateFieldPosition(field)).toEqual({ top: 161, left: 535 });
    });
  });
});
